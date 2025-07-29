import type { Pokemon } from "@/types/pokemon";
import { useEffect, useMemo, useState } from "react";
import { usePokemonList } from "./use-pokemon";

const BATCH_SIZE = 20;
const PRELOAD_THRESHOLD = 5; // Carregar próximo batch quando restam 5 itens

interface UseVirtualListOptions {
	searchTerm?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

interface UseVirtualListResult {
	displayedPokemon: Pokemon[];
	isLoading: boolean;
	hasMore: boolean;
	loadMore: () => void;
	totalLoaded: number;
	error: Error | null;
}

export function useVirtualList({
	searchTerm = "",
	sortBy = "id",
	sortOrder = "asc",
}: UseVirtualListOptions = {}): UseVirtualListResult {
	const [currentBatch, setCurrentBatch] = useState(1);
	const [allLoadedPokemon, setAllLoadedPokemon] = useState<Pokemon[]>([]);

	// Carrega apenas a quantidade necessária
	const totalToLoad = currentBatch * BATCH_SIZE;
	const { data: newPokemon, isLoading, error } = usePokemonList(totalToLoad);

	// Atualiza a lista completa quando novos dados chegam
	useEffect(() => {
		if (newPokemon && newPokemon.length > allLoadedPokemon.length) {
			setAllLoadedPokemon(newPokemon);
		}
	}, [newPokemon, allLoadedPokemon.length]);

	// Filtros e ordenação aplicados apenas aos dados já carregados
	const displayedPokemon = useMemo(() => {
		let filtered = [...allLoadedPokemon];

		// Filtro de busca
		if (searchTerm) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(searchLower) ||
					p.types.some((type) => type.toLowerCase().includes(searchLower)) ||
					p.id.toString().includes(searchLower),
			);
		}

		// Ordenação
		filtered.sort((a, b) => {
			let aValue: string | number;
			let bValue: string | number;

			switch (sortBy) {
				case "name":
					aValue = a.name.toLowerCase();
					bValue = b.name.toLowerCase();
					break;
				case "powerLevel":
					aValue = a.powerLevel;
					bValue = b.powerLevel;
					break;
				default:
					aValue = a.id;
					bValue = b.id;
					break;
			}

			if (typeof aValue === "string") {
				const comparison = aValue.localeCompare(bValue as string);
				return sortOrder === "asc" ? comparison : -comparison;
			}
			const comparison = (aValue as number) - (bValue as number);
			return sortOrder === "asc" ? comparison : -comparison;
		});

		return filtered;
	}, [allLoadedPokemon, searchTerm, sortBy, sortOrder]);

	const hasMore = totalToLoad < 1010; // PokeAPI tem ~1010 Pokémon
	const totalLoaded = allLoadedPokemon.length;

	const loadMore = () => {
		if (!isLoading && hasMore) {
			setCurrentBatch((prev) => prev + 1);
		}
	};

	// Auto-load quando próximo do fim da lista
	useEffect(() => {
		const shouldPreload =
			!isLoading &&
			hasMore &&
			displayedPokemon.length > 0 &&
			totalLoaded - displayedPokemon.length <= PRELOAD_THRESHOLD;

		if (shouldPreload) {
			loadMore();
		}
	}, [displayedPokemon.length, totalLoaded, isLoading, hasMore, loadMore]);

	return {
		displayedPokemon,
		isLoading,
		hasMore,
		loadMore,
		totalLoaded,
		error,
	};
}
