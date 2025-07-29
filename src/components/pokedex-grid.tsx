import type { Pokemon } from "@/types/pokemon";
import {
	pokedexGridVariant,
	pokemonCardVariant,
} from "@/utils/variants-animation";
import { motion } from "motion/react";
import { memo } from "react";
import { PokemonCard } from "./pokemon-card";
import { PokemonDetailModal } from "./pokemon-detail-modal";

interface PokedexGridProps {
	pokemon: Pokemon[];
	className?: string;
}

export const PokedexGrid = memo(function PokedexGrid({
	pokemon,
	className,
}: PokedexGridProps) {
	if (pokemon.length === 0) return null;

	return (
		<motion.div
			variants={pokedexGridVariant}
			className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className || ""}`}
		>
			{pokemon.map((poke) => (
				<motion.div key={poke.id} variants={pokemonCardVariant} layout>
					<PokemonDetailModal
						pokemon={poke}
						trigger={
							<div>
								<PokemonCard
									pokemon={poke}
									onClick={() => {}}
									className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
								/>
							</div>
						}
					/>
				</motion.div>
			))}
		</motion.div>
	);
});
