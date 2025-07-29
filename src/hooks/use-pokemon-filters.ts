import type { Pokemon } from "@/types/pokemon";
import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

interface PokemonFilters {
	search: string;
	sortBy: string;
	sortOrder: "asc" | "desc";
}

interface UsePokemonFiltersResult {
	search: string;
	sortBy: string;
	sortOrder: "asc" | "desc";
	setSearch: (search: string) => void;
	setSortBy: (sortBy: string) => void;
	setSortOrder: (sortOrder: "asc" | "desc") => void;
	setSort: (sortBy: string, sortOrder: "asc" | "desc") => void;
	clearFilters: () => void;
	filterAndSortPokemon: (pokemon: Pokemon[]) => Pokemon[];
}

export function usePokemonFilters(): UsePokemonFiltersResult {
	const searchParams = useSearch({ strict: false }) as Record<string, string>;

	const search = searchParams?.search || "";
	const sortBy = searchParams?.sortBy || "id";
	const sortOrder = (searchParams?.sortOrder as "asc" | "desc") || "asc";

	const updateSearch = (newParams: Partial<PokemonFilters>) => {
		const url = new URL(window.location.href);
		const currentParams = { search, sortBy, sortOrder };
		const updatedParams = { ...currentParams, ...newParams };

		url.searchParams.delete("search");
		url.searchParams.delete("sortBy");
		url.searchParams.delete("sortOrder");

		if (updatedParams.search) {
			url.searchParams.set("search", updatedParams.search);
		}
		if (updatedParams.sortBy && updatedParams.sortBy !== "id") {
			url.searchParams.set("sortBy", updatedParams.sortBy);
		}
		if (updatedParams.sortOrder && updatedParams.sortOrder !== "asc") {
			url.searchParams.set("sortOrder", updatedParams.sortOrder);
		}

		window.history.pushState({}, "", url.toString());
	};

	const setSearch = (newSearch: string) => {
		updateSearch({ search: newSearch });
	};

	const setSortBy = (newSortBy: string) => {
		updateSearch({ sortBy: newSortBy });
	};

	const setSortOrder = (newSortOrder: "asc" | "desc") => {
		updateSearch({ sortOrder: newSortOrder });
	};

	const setSort = (newSortBy: string, newSortOrder: "asc" | "desc") => {
		updateSearch({ sortBy: newSortBy, sortOrder: newSortOrder });
	};

	const clearFilters = () => {
		const url = new URL(window.location.href);
		url.search = "";
		window.history.pushState({}, "", url.toString());
	};

	const filterAndSortPokemon = useMemo(() => {
		return (pokemon: Pokemon[]): Pokemon[] => {
			let filtered = [...pokemon];

			if (search) {
				const searchLower = search.toLowerCase();
				filtered = filtered.filter(
					(p) =>
						p.name.toLowerCase().includes(searchLower) ||
						p.types.some((type) => type.toLowerCase().includes(searchLower)) ||
						p.id.toString().includes(searchLower),
				);
			}

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
		};
	}, [search, sortBy, sortOrder]);

	return {
		search,
		sortBy,
		sortOrder,
		setSearch,
		setSortBy,
		setSortOrder,
		setSort,
		clearFilters,
		filterAndSortPokemon,
	};
}
