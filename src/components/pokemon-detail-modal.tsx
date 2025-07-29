import { cn } from "@/lib/utils";
import type { Pokemon } from "@/types/pokemon";
import {
	modalContainerVariant,
	modalImageVariant,
	modalItemVariant,
} from "@/utils/variants-animation";
import { ImageOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Spinner } from "./ui/spinner";

interface PokemonDetailModalProps {
	pokemon: Pokemon;
	trigger: React.ReactNode;
	className?: string;
}

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

export function PokemonDetailModal({
	pokemon,
	trigger,
	className,
}: PokemonDetailModalProps) {
	const [open, setOpen] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [imageLoadError, setImageLoadError] = useState(false);

	const primaryType = pokemon.types[0];
	const primaryTypeColors = typeColors[primaryType] || {
		bg: "bg-gray-400",
		text: "text-white",
	};

	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const fallbackImages = [
		pokemon.image,
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`,
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
	];

	const handleImageError = () => {
		if (currentImageIndex < fallbackImages.length - 1) {
			setCurrentImageIndex((prev) => prev + 1);
			setIsImageLoading(true);
			setImageLoadError(false);
		} else {
			setImageLoadError(true);
			setIsImageLoading(false);
		}
	};

	const handleImageLoad = () => {
		setIsImageLoading(false);
		setImageLoadError(false);
	};

	const getDisplayImage = () => {
		return fallbackImages[currentImageIndex];
	};

	const powerPercentage = Math.min((pokemon.powerLevel / 1000) * 100, 100);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent
				className={cn(
					"max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-0",
					"bg-gradient-to-br from-white via-gray-50 to-gray-100",
					"border-2 border-gray-200/60 shadow-2xl",
					className,
				)}
				from="bottom"
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			>
				<motion.div
					variants={modalContainerVariant}
					initial="initial"
					animate="animate"
					exit="exit"
					className="relative"
				>
					<div className="relative px-6 pt-6 pb-4 rounded-t-xl bg-white border-b border-gray-200">
						<div
							className={cn(
								"absolute top-0 left-0 right-0 h-1 rounded-t-xl",
								primaryTypeColors.bg,
							)}
						/>

						<motion.div variants={modalItemVariant} className="relative z-10">
							<div className="flex items-start justify-between mb-2 mr-8">
								<div className="flex-1">
									<DialogTitle className="text-2xl md:text-3xl font-bold capitalize leading-tight text-gray-900">
										{pokemon.name}
									</DialogTitle>
									<p className="text-sm font-medium text-gray-600">
										#{String(pokemon.id).padStart(3, "0")}
									</p>
								</div>

								<div className="flex gap-2 flex-wrap">
									{pokemon.types.map((type) => {
										const colors = typeColors[type] || typeColors.normal;
										return (
											<Badge
												key={type}
												className={cn(
													"text-xs font-bold px-3 py-1.5 border-0 shadow-md capitalize",
													colors.bg,
													colors.text,
													"hover:shadow-lg transition-all duration-200 hover:scale-105",
												)}
											>
												{type}
											</Badge>
										);
									})}
								</div>
							</div>
						</motion.div>
					</div>

					<div className="px-6 py-6 space-y-6">
						<div className="grid md:grid-cols-2 gap-6 items-center">
							<motion.div variants={modalImageVariant} className="relative">
								<div className="relative w-full aspect-square max-w-xs mx-auto">
									<div
										className={cn(
											"absolute inset-4 rounded-full opacity-10",
											primaryTypeColors.bg,
										)}
									/>

									{isImageLoading && !imageLoadError && (
										<div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-full">
											<Spinner className="text-blue-500" />
										</div>
									)}
									{imageLoadError && (
										<div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-full text-gray-500">
											<ImageOff className="text-gray-400 mb-4 size-10" />
											<div className="text-sm font-bold uppercase tracking-wide">
												{pokemon.name}
											</div>
											<div className="text-xs mt-1">Image not available</div>
										</div>
									)}

									{!imageLoadError && (
										<img
											key={`${pokemon.id}-modal-${currentImageIndex}`}
											src={getDisplayImage()}
											alt={pokemon.name}
											onError={handleImageError}
											onLoad={handleImageLoad}
											className={cn(
												"relative z-10 w-full h-full object-contain drop-shadow-lg transition-opacity duration-300",
												isImageLoading ? "opacity-0" : "opacity-100",
											)}
										/>
									)}

									<div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 rounded-full pointer-events-none" />
								</div>
							</motion.div>

							<motion.div variants={modalItemVariant} className="space-y-4">
								<div>
									<h3 className="text-lg font-semibold text-gray-800 mb-3">
										Power Level
									</h3>

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
													animate={{ width: `${powerPercentage}%` }}
													transition={{
														duration: 0.8,
														delay: 0.2,
														ease: "easeOut",
													}}
												/>
											</div>

											<div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-1">
												<div className="w-1 h-1 bg-white/50 rounded-full" />
												<div className="w-1 h-1 bg-white/50 rounded-full" />
												<div className="w-1 h-1 bg-white/50 rounded-full" />
												<div className="w-1 h-1 bg-white/50 rounded-full" />
											</div>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
									<div className="text-center p-3 bg-gray-50/80 rounded-xl">
										<p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
											Primary
										</p>
										<p className="font-semibold text-gray-800 capitalize">
											{primaryType}
										</p>
									</div>

									<div className="text-center p-3 bg-gray-50/80 rounded-xl">
										<p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
											Types
										</p>
										<p className="font-semibold text-gray-800">
											{pokemon.types.length}
										</p>
									</div>
								</div>
							</motion.div>
						</div>

						<motion.div variants={modalItemVariant}>
							<div className="p-5 bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-2 border-blue-100 rounded-xl">
								<h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full" />
									About {pokemon.name}
								</h4>
								<p className="text-sm text-gray-700 leading-relaxed">
									<span className="font-semibold capitalize">
										{pokemon.name}
									</span>{" "}
									is a powerful {pokemon.types.join("/")} type Pokémon with a
									combat power of{" "}
									<span className="font-bold text-gray-900">
										{pokemon.powerLevel}
									</span>
									. This makes it a{" "}
									<span className="font-semibold text-blue-700">
										{pokemon.powerLevel > 600
											? "legendary-tier"
											: pokemon.powerLevel > 400
												? "elite-level"
												: pokemon.powerLevel > 200
													? "battle-ready"
													: "developing"}
									</span>{" "}
									Pokémon that excels in {primaryType}-type combat and
									specialized abilities.
								</p>
							</div>
						</motion.div>

						<motion.div
							variants={modalItemVariant}
							className="flex justify-center pt-2"
						>
							<button
								type="button"
								className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
								onClick={() => console.log(`Share ${pokemon.name}`)}
							>
								Share Pokémon
							</button>
						</motion.div>
					</div>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
}
