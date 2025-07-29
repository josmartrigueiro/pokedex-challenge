import { usePagination } from "@/hooks/use-pagination";
import { usePokemonList } from "@/hooks/use-pokemon";
import { usePokemonFilters } from "@/hooks/use-pokemon-filters";
import { cn } from "@/lib/utils";
import {
	loadingVariant,
	pokedexContainerVariant,
} from "@/utils/variants-animation";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { PokedexEmptyState } from "./pokedex-empty-state";
import { PokedexGrid } from "./pokedex-grid";
import { PokedexHeader } from "./pokedex-header";
import { PokemonFilters } from "./pokemon-filters";
import { PokemonPagination } from "./pokemon-pagination";
import { Spinner } from "./ui/spinner";

interface PokedexProps {
	className?: string;
}

export function Pokedex({ className }: PokedexProps) {
	const prevPageRef = useRef<number>(1);
	const itemsPerPage = 16;

	const { data: pokemon, isLoading, error } = usePokemonList(200);

	const {
		search,
		sortBy,
		sortOrder,
		setSearch,
		setSort,
		clearFilters,
		filterAndSortPokemon,
	} = usePokemonFilters();

	const filteredAndSortedPokemon = useMemo(() => {
		return pokemon ? filterAndSortPokemon(pokemon) : [];
	}, [pokemon, filterAndSortPokemon]);

	const { currentPage, totalPages, startIndex, endIndex, goToPage } =
		usePagination({
			itemsPerPage,
			totalItems: filteredAndSortedPokemon.length,
		});

	const currentPagePokemon = useMemo(() => {
		return filteredAndSortedPokemon.slice(startIndex, endIndex);
	}, [filteredAndSortedPokemon, startIndex, endIndex]);

	useEffect(() => {
		if (currentPage !== prevPageRef.current) {
			window.scrollTo({ top: 0 });
			prevPageRef.current = currentPage;
		}
	}, [currentPage]);

	const handleRetryClick = useCallback(() => {
		window.location.reload();
	}, []);

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<p className="text-red-600 mb-2">Failed to load Pokémon data</p>
					<button
						type="button"
						onClick={handleRetryClick}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			variants={pokedexContainerVariant}
			initial="initial"
			animate="animate"
			className={cn("w-full max-w-7xl mx-auto px-4 py-8", className)}
		>
			<PokedexHeader />

			{!isLoading && !error && (
				<PokemonFilters
					search={search}
					sortBy={sortBy}
					sortOrder={sortOrder}
					onSearchChange={setSearch}
					onSortChange={setSort}
					onClearAll={clearFilters}
				/>
			)}

			{isLoading && (
				<motion.div
					variants={loadingVariant}
					initial="initial"
					animate="animate"
					className="flex gap-2 items-center justify-center min-h-[400px]"
				>
					<Spinner className=" text-blue-600 dark:text-blue-400" />
					<p className="text-gray-800 dark:text-gray-200 font-medium">
						Loading Pokédex...
					</p>
				</motion.div>
			)}

			{currentPagePokemon.length > 0 && (
				<PokedexGrid pokemon={currentPagePokemon} />
			)}

			{filteredAndSortedPokemon.length > itemsPerPage && (
				<PokemonPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={goToPage}
					totalItems={filteredAndSortedPokemon.length}
					itemsPerPage={itemsPerPage}
				/>
			)}

			{pokemon &&
				pokemon.length > 0 &&
				filteredAndSortedPokemon.length === 0 && (
					<PokedexEmptyState type="no-results" onRetry={clearFilters} />
				)}

			{pokemon && pokemon.length === 0 && (
				<PokedexEmptyState type="no-pokemon" />
			)}
		</motion.div>
	);
}
