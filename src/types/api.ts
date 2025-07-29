import type { Pokemon } from "./pokemon";

// PokeAPI response types
export interface PokeApiPokemon {
	id: number;
	name: string;
	sprites: {
		other: {
			"official-artwork": {
				front_default: string | null;
			};
			home: {
				front_default: string | null;
			};
		};
		front_default: string | null;
	};
	types: Array<{
		type: {
			name: string;
		};
	}>;
	stats: Array<{
		base_stat: number;
		stat: {
			name: string;
		};
	}>;
}

export interface PokeApiResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<{
		name: string;
		url: string;
	}>;
}

export interface PokemonListResponse {
	pokemon: Pokemon[];
	nextOffset?: number;
	hasMore: boolean;
	total: number;
}

// Re-export Pokemon type
export type { Pokemon } from "./pokemon";
