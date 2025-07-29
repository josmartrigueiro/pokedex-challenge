import { pokedexHeaderVariant } from "@/utils/variants-animation";
import { motion } from "motion/react";
import { memo } from "react";
import { TextEffect } from "./ui/text-effect";

interface PokedexHeaderProps {
	className?: string;
}

export const PokedexHeader = memo(function PokedexHeader({
	className,
}: PokedexHeaderProps) {
	return (
		<motion.div
			variants={pokedexHeaderVariant}
			className={`text-center mb-12 ${className || ""}`}
		>
			<div className="flex items-center justify-center mb-6">
				<img
					src="/pokemonLogo.png"
					alt="Pokémon Logo"
					className="h-16 md:h-20 object-contain drop-shadow-lg"
				/>
			</div>

			<TextEffect
				className="text-gray-600 text-lg max-w-2xl mx-auto"
				per="char"
				preset="fade"
			>
				Explore the fascinating world of Pokémon! Discover their unique types,
				power levels, and more.
			</TextEffect>
		</motion.div>
	);
});
