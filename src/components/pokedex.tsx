import { usePokemonFilters } from "@/hooks/use-pokemon-filters";
import { useVirtualList } from "@/hooks/use-virtual-list";
import { cn } from "@/lib/utils";
import {
	loadingVariant,
	pokedexContainerVariant,
} from "@/utils/variants-animation";
import { motion } from "motion/react";
import { useCallback } from "react";
import { PokedexEmptyState } from "./pokedex-empty-state";
import { PokedexGrid } from "./pokedex-grid";
import { PokedexHeader } from "./pokedex-header";
import { PokemonFilters } from "./pokemon-filters";

import { PokemonSkeletonGrid } from "./ui/pokemon-skeleton";
import { Spinner } from "./ui/spinner";

interface PokedexProps {
	className?: string;
}

export function Pokedex({ className }: PokedexProps) {
	const {
		search,
		sortBy,
		sortOrder,
		setSearch,
		setSort,
		clearFilters,
		debouncedSearch,
	} = usePokemonFilters();

	// Use virtual list for optimized loading
	const {
		displayedPokemon: filteredAndSortedPokemon,
		isLoading,
		hasMore,
		loadMore,
		totalLoaded,
		error,
	} = useVirtualList({
		searchTerm: debouncedSearch,
		sortBy,
		sortOrder,
	});

	const currentPagePokemon = filteredAndSortedPokemon;

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
					className="space-y-6"
				>
					<div className="flex gap-2 items-center justify-center">
						<Spinner className="text-blue-600 dark:text-blue-400" />
						<p className="text-gray-800 dark:text-gray-200 font-medium">
							Loading Pokédex...
						</p>
					</div>
					<PokemonSkeletonGrid count={20} />
				</motion.div>
			)}

			{currentPagePokemon.length > 0 && (
				<PokedexGrid pokemon={currentPagePokemon} />
			)}

			{hasMore && !isLoading && filteredAndSortedPokemon.length > 0 && (
				<div className="flex justify-center mt-8">
					<button
						type="button"
						onClick={loadMore}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
					>
						Load More Pokémon ({totalLoaded} loaded)
					</button>
				</div>
			)}

			{totalLoaded > 0 && filteredAndSortedPokemon.length === 0 && (
				<PokedexEmptyState type="no-results" onRetry={clearFilters} />
			)}

			{!isLoading && totalLoaded === 0 && (
				<PokedexEmptyState type="no-pokemon" />
			)}
		</motion.div>
	);
}
