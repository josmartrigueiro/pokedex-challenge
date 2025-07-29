import { cn } from "@/lib/utils";

interface PokemonSkeletonProps {
	className?: string;
}

export function PokemonSkeleton({ className }: PokemonSkeletonProps) {
	return (
		<div className={cn("animate-pulse", className)}>
			<div className="bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-3xl p-4 shadow-md">
				{/* Image skeleton */}
				<div className="w-full h-32 bg-gray-200 rounded-2xl mb-4" />

				{/* Name skeleton */}
				<div className="h-4 bg-gray-200 rounded-full mb-2" />

				{/* ID skeleton */}
				<div className="h-3 bg-gray-200 rounded-full w-16 mb-3" />

				{/* Types skeleton */}
				<div className="flex gap-2 mb-3">
					<div className="h-6 bg-gray-200 rounded-full w-16" />
					<div className="h-6 bg-gray-200 rounded-full w-20" />
				</div>

				{/* Power level skeleton */}
				<div className="h-3 bg-gray-200 rounded-full w-24" />
			</div>
		</div>
	);
}

interface PokemonSkeletonGridProps {
	count?: number;
	className?: string;
}

export function PokemonSkeletonGrid({
	count = 20,
	className,
}: PokemonSkeletonGridProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6",
				className,
			)}
		>
			{Array.from({ length: count }).map((_, index) => (
				<PokemonSkeleton key={`skeleton-${index}`} />
			))}
		</div>
	);
}
