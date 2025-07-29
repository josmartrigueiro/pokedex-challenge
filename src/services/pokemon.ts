import type {
	PokeApiPokemon,
	PokeApiResponse,
	Pokemon,
	PokemonListResponse,
} from "@/types/api";

const POKEMON_API_BASE_URL =
	import.meta.env.VITE_POKEMON_API_BASE_URL || "https://pokeapi.co/api/v2";

export const pokemonApi = {
	async fetchPokemonList(limit = 20, offset = 0): Promise<PokeApiResponse> {
		const response = await fetch(
			`${POKEMON_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch Pokemon list: ${response.status} ${response.statusText}`,
			);
		}

		return response.json();
	},

	async fetchPokemonDetails(urlOrId: string | number): Promise<PokeApiPokemon> {
		const url =
			typeof urlOrId === "string"
				? urlOrId
				: `${POKEMON_API_BASE_URL}/pokemon/${urlOrId}`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch Pokemon details: ${response.status} ${response.statusText}`,
			);
		}

		return response.json();
	},
};

export const pokemonTransformer = {
	calculatePowerLevel(stats: PokeApiPokemon["stats"]): number {
		const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);
		return Math.min(Math.round(totalStats * 1.5), 1000);
	},

	getBestImage(sprites: PokeApiPokemon["sprites"], id: number): string {
		return (
			sprites.other["official-artwork"].front_default ||
			sprites.other.home.front_default ||
			sprites.front_default ||
			`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
		);
	},

	transformPokemon(apiPokemon: PokeApiPokemon): Pokemon {
		return {
			id: apiPokemon.id,
			name: apiPokemon.name,
			image: this.getBestImage(apiPokemon.sprites, apiPokemon.id),
			types: apiPokemon.types.map((type) => type.type.name),
			powerLevel: this.calculatePowerLevel(apiPokemon.stats),
		};
	},
};

export const pokemonService = {
	async getPokemonList(limit = 20): Promise<Pokemon[]> {
		const listResponse = await pokemonApi.fetchPokemonList(limit);

		const pokemonPromises = listResponse.results.map((pokemon) =>
			pokemonApi.fetchPokemonDetails(pokemon.url),
		);

		const pokemonDetails = await Promise.all(pokemonPromises);

		return pokemonDetails.map((pokemon) =>
			pokemonTransformer.transformPokemon(pokemon),
		);
	},

	async getPokemonPage(limit = 20, offset = 0): Promise<PokemonListResponse> {
		const listResponse = await pokemonApi.fetchPokemonList(limit, offset);

		const pokemonPromises = listResponse.results.map((pokemon) =>
			pokemonApi.fetchPokemonDetails(pokemon.url),
		);

		const pokemonDetails = await Promise.all(pokemonPromises);

		return {
			pokemon: pokemonDetails.map((pokemon) =>
				pokemonTransformer.transformPokemon(pokemon),
			),
			nextOffset: listResponse.next ? offset + limit : undefined,
			hasMore: !!listResponse.next,
			total: listResponse.count,
		};
	},

	async getPokemonById(id: number): Promise<Pokemon> {
		const apiPokemon = await pokemonApi.fetchPokemonDetails(id);
		return pokemonTransformer.transformPokemon(apiPokemon);
	},
};
