import { cn } from "@/lib/utils";
import { paginationContainerVariant } from "@/utils/variants-animation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface PokemonPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	totalItems: number;
	itemsPerPage: number;
	className?: string;
}

export function PokemonPagination({
	currentPage,
	totalPages,
	onPageChange,
	totalItems,
	itemsPerPage,
	className,
}: PokemonPaginationProps) {
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const canGoPrevious = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	return (
		<motion.div
			variants={paginationContainerVariant}
			initial="initial"
			animate="animate"
			className={cn(
				"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-12 px-6 py-4",
				"bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-3xl shadow-sm",
				className,
			)}
		>
			<div className="text-sm text-gray-600 font-medium text-center sm:text-left">
				Showing <span className="text-gray-900">{startItem}</span> to{" "}
				<span className="text-gray-900">{endItem}</span> of{" "}
				<span className="text-gray-900">{totalItems}</span> Pokémon
			</div>

			<div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-3">
				<button
					type="button"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={!canGoPrevious}
					className={cn(
						"flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
						"border border-gray-200/60 hover:shadow-md sm:flex",
						canGoPrevious
							? "bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900"
							: "bg-gray-50/50 text-gray-400 cursor-not-allowed",
						"sm:px-4 px-3 sm:gap-2 gap-0",
					)}
				>
					<ChevronLeft className="w-4 h-4" />
					<span className="hidden sm:inline">Previous</span>
				</button>

				<div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/60 rounded-xl">
					<span className="text-blue-600 hidden sm:inline">Page</span>
					<span className="text-blue-800 font-bold">{currentPage}</span>
					<span className="text-gray-500">of</span>
					<span className="text-gray-700">{totalPages}</span>
				</div>

				<button
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={!canGoNext}
					className={cn(
						"flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
						"border border-gray-200/60 hover:shadow-md sm:flex",
						canGoNext
							? "bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900"
							: "bg-gray-50/50 text-gray-400 cursor-not-allowed",
						"sm:px-4 px-3 sm:gap-2 gap-0",
					)}
				>
					<span className="hidden sm:inline">Next</span>
					<ChevronRight className="w-4 h-4" />
				</button>
			</div>
		</motion.div>
	);
}
