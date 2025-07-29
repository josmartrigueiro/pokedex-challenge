import { pokemonService } from "@/services/pokemon";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 5; // 5 min
const GC_TIME = 1000 * 60 * 10; // 10 min

export function usePokemonList(limit = 20) {
	return useQuery({
		queryKey: ["pokemon-list", limit],
		queryFn: () => pokemonService.getPokemonList(limit),
		staleTime: STALE_TIME,
		gcTime: GC_TIME,
	});
}

export function usePokemonInfiniteList(limit = 20) {
	return useInfiniteQuery({
		queryKey: ["pokemon-infinite-list", limit],
		queryFn: ({ pageParam = 0 }) =>
			pokemonService.getPokemonPage(limit, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextOffset,
		staleTime: STALE_TIME,
		gcTime: GC_TIME,
		initialPageParam: 0,
	});
}

export function usePokemon(id: number) {
	return useQuery({
		queryKey: ["pokemon", id],
		queryFn: () => pokemonService.getPokemonById(id),
		enabled: !!id,
		staleTime: STALE_TIME,
		gcTime: GC_TIME,
	});
}
