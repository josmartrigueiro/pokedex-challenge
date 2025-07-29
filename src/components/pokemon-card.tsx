import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import type { Pokemon, PokemonCardProps } from "@/types/pokemon";
import {
	pokemonCardVariant,
	pokemonImageVariant,
} from "@/utils/variants-animation";
import { ImageOff } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const typeColors: Record<string, { bg: string; text: string }> = {
	normal: { bg: "bg-gray-400", text: "text-white" },
	fire: { bg: "bg-red-500", text: "text-white" },
	water: { bg: "bg-blue-500", text: "text-white" },
	electric: { bg: "bg-yellow-400", text: "text-black" },
	grass: { bg: "bg-green-600", text: "text-white" },
	ice: { bg: "bg-cyan-400", text: "text-white" },
	fighting: { bg: "bg-red-600", text: "text-white" },
	poison: { bg: "bg-purple-500", text: "text-white" },
	ground: { bg: "bg-yellow-600", text: "text-white" },
	flying: { bg: "bg-indigo-400", text: "text-white" },
	psychic: { bg: "bg-pink-500", text: "text-white" },
	bug: { bg: "bg-green-500", text: "text-white" },
	rock: { bg: "bg-yellow-800", text: "text-white" },
	ghost: { bg: "bg-purple-700", text: "text-white" },
	dragon: { bg: "bg-indigo-700", text: "text-white" },
	dark: { bg: "bg-gray-800", text: "text-white" },
	steel: { bg: "bg-gray-500", text: "text-white" },
	fairy: { bg: "bg-pink-300", text: "text-black" },
};

export function PokemonCard({ pokemon, onClick, className }: PokemonCardProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [hasTriedAllImages, setHasTriedAllImages] = useState(false);
	const [showLoadingTimeout, setShowLoadingTimeout] = useState(false);

	const primaryType = pokemon.types[0];
	const primaryTypeColors = typeColors[primaryType] || {
		bg: "bg-gray-400",
		text: "text-white",
	};

	const fallbackImages = [
		pokemon.image,
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`,
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
	];

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isImageLoading) {
				setShowLoadingTimeout(true);
				setHasTriedAllImages(true);
				setIsImageLoading(false);
			}
		}, 5000);

		return () => clearTimeout(timer);
	}, [isImageLoading]);

	const handleImageError = () => {
		if (currentImageIndex < fallbackImages.length - 1) {
			setTimeout(() => {
				setCurrentImageIndex((prev) => prev + 1);
				setIsImageLoading(true);
			}, 500);
		} else {
			setHasTriedAllImages(true);
			setIsImageLoading(false);
		}
	};

	const handleImageLoad = () => {
		setIsImageLoading(false);
		setShowLoadingTimeout(false);
	};

	return (
		<motion.div
			variants={pokemonCardVariant}
			initial="initial"
			animate="animate"
			whileHover="hover"
			whileTap="tap"
			onClick={onClick}
			className={cn("cursor-pointer", className)}
		>
			<div className="group relative">
				<div className="absolute inset-0 bg-gradient-to-br from-red-500 via-blue-500 to-yellow-400 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />

				<div className="relative bg-white/95 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
					<div className={cn("h-2 w-full", primaryTypeColors.bg)} />

					<div className="p-6">
						<div className="absolute -top-1 -right-1">
							<div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
								#{String(pokemon.id).padStart(3, "0")}
							</div>
						</div>

						<div className="flex justify-center mb-6 mt-2">
							<motion.div variants={pokemonImageVariant} className="relative">
								<div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full -m-4 group-hover:from-gray-50 group-hover:to-gray-100 transition-colors duration-300" />

								<div className="relative w-28 h-28 mx-auto">
									{isImageLoading && !showLoadingTimeout && (
										<div className="absolute inset-0 flex items-center justify-center">
											<Spinner />
										</div>
									)}

									{(hasTriedAllImages || showLoadingTimeout) &&
									!isImageLoading ? (
										<div className="absolute inset-0 flex items-center justify-center text-gray-400">
											<ImageOff className="w-8 h-8" />
										</div>
									) : (
										<img
											src={fallbackImages[currentImageIndex]}
											alt={pokemon.name}
											width={112}
											height={112}
											className={cn(
												"w-full h-full object-contain transition-all duration-300",
												(isImageLoading || hasTriedAllImages) && "opacity-0",
											)}
											loading="lazy"
											onError={handleImageError}
											onLoad={handleImageLoad}
										/>
									)}
								</div>

								<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full -m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</motion.div>
						</div>

						<h3 className="text-xl font-bold text-gray-800 text-center mb-4 capitalize tracking-wide">
							{pokemon.name}
						</h3>

						<div className="flex justify-center gap-2 mb-6">
							{pokemon.types.map((type) => {
								const colors = typeColors[type] || {
									bg: "bg-slate-400",
									text: "text-white",
								};
								return (
									<span
										key={type}
										className={cn(
											"px-3 py-1.5 rounded-full text-xs font-semibold capitalize shadow-sm border border-white/20",
											colors.bg,
											colors.text,
										)}
									>
										{type}
									</span>
								);
							})}
						</div>

						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium text-gray-600">
									Power Level
								</span>
								<span className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
									{pokemon.powerLevel}
								</span>
							</div>

							<div className="relative">
								<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
									<motion.div
										className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full shadow-sm"
										initial={{ width: 0 }}
										animate={{ width: `${(pokemon.powerLevel / 1000) * 100}%` }}
										transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
									/>
								</div>

								<div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-1">
									<div className="w-1 h-1 bg-white/50 rounded-full" />
									<div className="w-1 h-1 bg-white/50 rounded-full" />
									<div className="w-1 h-1 bg-white/50 rounded-full" />
									<div className="w-1 h-1 bg-white/50 rounded-full" />
									<div className="w-1 h-1 bg-white/50 rounded-full" />
								</div>
							</div>
						</div>

						<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-blue-400 to-yellow-400 opacity-30" />
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export type { Pokemon };
