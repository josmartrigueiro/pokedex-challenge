import { cn } from "@/lib/utils";
import {
	activeFiltersContainerVariant,
	activeFiltersContentVariant,
	filtersBadgeVariant,
	filtersContainerVariant,
	filtersItemVariant,
} from "@/utils/variants-animation";
import { Search, SortAsc, SortDesc, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Separator } from "./ui/separator";

interface PokemonFiltersProps {
	search: string;
	sortBy: string;
	sortOrder: "asc" | "desc";
	onSearchChange: (search: string) => void;
	onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
	onClearAll: () => void;
	className?: string;
}

const sortOptions = [
	{ value: "name", label: "Name" },
	{ value: "powerLevel", label: "Power Level" },
];

interface FilterBadgeProps {
	children: React.ReactNode;
	onRemove: () => void;
	type: "search" | "sort";
}

function FilterBadge({ children, onRemove, type }: FilterBadgeProps) {
	const colorClasses = {
		search:
			"bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200/60 text-blue-700 hover:from-blue-100 hover:to-cyan-100 shadow-sm",
		sort: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200/60 text-purple-700 hover:from-purple-100 hover:to-pink-100 shadow-sm",
	};

	const buttonClasses = {
		search:
			"bg-blue-200/80 hover:bg-blue-300 text-blue-600 hover:text-blue-700 shadow-sm",
		sort: "bg-purple-200/80 hover:bg-purple-300 text-purple-600 hover:text-purple-700 shadow-sm",
	};

	return (
		<motion.div
			variants={filtersBadgeVariant}
			initial="initial"
			animate="animate"
			exit="exit"
			className={cn(
				"inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm transition-all duration-200",
				colorClasses[type],
			)}
		>
			<span className="text-xs">{children}</span>
			<button
				type="button"
				onClick={onRemove}
				className={cn(
					"w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200",
					buttonClasses[type],
				)}
				aria-label="Remove filter"
			>
				<X className="w-3 h-3" />
			</button>
		</motion.div>
	);
}

export function PokemonFilters({
	search,
	sortBy,
	sortOrder,
	onSearchChange,
	onSortChange,
	onClearAll,
	className,
}: PokemonFiltersProps) {
	const hasActiveFilters =
		search ||
		(sortBy !== "id" && sortOptions.some((opt) => opt.value === sortBy));

	return (
		<motion.div
			variants={filtersContainerVariant}
			initial="initial"
			animate="animate"
			className={cn("w-full max-w-5xl mx-auto mb-8", className)}
		>
			<div className="bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-3xl shadow p-4 lg:p-6">
				<div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center">
					<motion.div
						variants={filtersItemVariant}
						className="w-full lg:flex-1 lg:max-w-2xl"
					>
						<div className="relative group">
							<input
								type="text"
								placeholder="Search Pokémon..."
								className={cn(
									"w-full h-11 lg:h-12 pl-11 lg:pl-12 pr-4 text-base bg-gray-50/50 border border-gray-200/60 rounded-xl lg:rounded-2xl",
									"placeholder:text-gray-400 text-gray-700",
									"focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none",
									"transition-all duration-200",
									"lg:placeholder:text-base placeholder:text-sm",
								)}
								value={search}
								onChange={(e) => onSearchChange(e.target.value)}
							/>
							<div className="absolute left-3.5 lg:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
								<Search className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
							</div>
						</div>
					</motion.div>

					<motion.div
						variants={filtersItemVariant}
						className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center"
					>
						<span className="text-sm font-medium text-gray-500 lg:whitespace-nowrap">
							Sort by:
						</span>

						<div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4 items-center">
							<div className="flex gap-2">
								{sortOptions.map((option) => (
									<button
										type="button"
										key={option.value}
										onClick={() => {
											if (sortBy === option.value) {
												onSortChange("id", "asc");
											} else {
												onSortChange(option.value, sortOrder);
											}
										}}
										className={cn(
											"text-sm font-medium rounded-xl transition-all duration-200",
											"border border-gray-200/60 hover:shadow",
											"px-3 py-1.5 lg:px-4 lg:py-2",
											sortBy === option.value
												? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow"
												: "bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900",
										)}
									>
										{option.label}
									</button>
								))}
							</div>

							<button
								type="button"
								onClick={() =>
									onSortChange(sortBy, sortOrder === "asc" ? "desc" : "asc")
								}
								className={cn(
									"rounded-xl border border-gray-200/60 bg-white/80 hover:bg-white",
									"transition-all duration-200 hover:shadow-md group flex items-center justify-center",
									"px-3 py-1.5 lg:px-4 lg:py-2 lg:h-10",
								)}
								title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
							>
								{sortOrder === "asc" ? (
									<SortAsc className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:text-gray-800" />
								) : (
									<SortDesc className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:text-gray-800" />
								)}
							</button>
						</div>
					</motion.div>
				</div>

				<AnimatePresence>
					{hasActiveFilters && (
						<motion.div
							variants={activeFiltersContainerVariant}
							initial="initial"
							animate="animate"
							exit="exit"
							className="overflow-hidden"
						>
							<Separator className="my-3 lg:my-4" />

							<motion.div
								variants={activeFiltersContentVariant}
								className="flex flex-wrap gap-2 lg:gap-3 items-center pb-0.5"
							>
								<motion.span
									variants={activeFiltersContentVariant}
									className="text-xs font-medium text-gray-500"
								>
									Active filters:
								</motion.span>

								<div className="flex flex-wrap gap-2 lg:gap-3">
									<AnimatePresence mode="popLayout">
										{search && (
											<FilterBadge
												key="search-filter"
												type="search"
												onRemove={() => onSearchChange("")}
											>
												Search: "{search}"
											</FilterBadge>
										)}

										{sortBy !== "id" &&
											sortOptions.some((opt) => opt.value === sortBy) && (
												<FilterBadge
													key="sort-filter"
													type="sort"
													onRemove={() => onSortChange("id", "asc")}
												>
													Sort:{" "}
													{
														sortOptions.find((opt) => opt.value === sortBy)
															?.label
													}{" "}
													({sortOrder})
												</FilterBadge>
											)}
									</AnimatePresence>

									<motion.button
										variants={activeFiltersContentVariant}
										type="button"
										onClick={onClearAll}
										className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
									>
										Clear all
									</motion.button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
