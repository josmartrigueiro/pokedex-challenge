import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

interface LoadingScreenProps {
	className?: string;
}

export function LoadingScreen({ className }: LoadingScreenProps) {
	return (
		<div
			className={cn("min-h-screen flex items-center justify-center", className)}
		>
			<div className="relative">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
				<div className="relative w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full flex items-center justify-center">
					<Spinner className="text-blue-600 dark:text-blue-400" />
				</div>
			</div>
		</div>
	);
}
