import { emptyStateVariant } from "@/utils/variants-animation";
import { Database, RotateCcw, Search } from "lucide-react";
import { motion } from "motion/react";
import { memo } from "react";
import { Button } from "./ui/button";

interface PokedexEmptyStateProps {
	type: "no-results" | "no-pokemon" | "loading";
	className?: string;
	onRetry?: () => void;
}

export const PokedexEmptyState = memo(function PokedexEmptyState({
	type,
	className,
	onRetry,
}: PokedexEmptyStateProps) {
	if (type === "no-results") {
		return (
			<motion.div
				variants={emptyStateVariant}
				initial="initial"
				animate="animate"
				className={`text-center py-16 ${className || ""}`}
			>
				<div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-6">
					<Search className="w-10 h-10 text-blue-600 dark:text-blue-400" />
				</div>

				<p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
					No Pokémon found
				</p>

				<p className="text-gray-600 dark:text-gray-400 text-base max-w-md mx-auto leading-relaxed">
					Try adjusting your search terms or filters to discover more Pokémon
				</p>

				{onRetry && (
					<div className="mt-6">
						<Button onClick={onRetry} variant="outline" className="gap-2">
							<RotateCcw className="w-4 h-4" />
							Clear Filters
						</Button>
					</div>
				)}
			</motion.div>
		);
	}

	if (type === "no-pokemon") {
		return (
			<motion.div
				variants={emptyStateVariant}
				initial="initial"
				animate="animate"
				className={`text-center py-16 ${className || ""}`}
			>
				<div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center mb-6">
					<Database className="w-10 h-10 text-red-600 dark:text-red-400" />
				</div>

				<p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
					No Pokémon data available
				</p>

				<p className="text-gray-600 dark:text-gray-400 text-base">
					Unable to load Pokémon information at this time
				</p>
			</motion.div>
		);
	}

	return null;
});
