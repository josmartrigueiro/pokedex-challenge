import { Pokedex } from "@/components/pokedex";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	pendingComponent: () => (
		<div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-purple-100 relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-red-100/30 via-blue-100/30 to-yellow-100/30" />
			<LoadingScreen className="relative z-10" />
		</div>
	),
});

function App() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-purple-100 relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-red-100/30 via-blue-100/30 to-yellow-100/30" />

			<img
				src="/vector1.webp"
				alt="Vector"
				width={300}
				draggable={false}
				height={300}
				className="absolute top-0 right-0 z-[1] object-cover object-center select-none opacity-20"
			/>
			<img
				src="/vector2.webp"
				alt="Vector"
				width={300}
				height={300}
				draggable={false}
				className="absolute top-0 left-0 z-[1] object-cover object-center select-none opacity-20"
			/>
			<img
				src="/vector5.webp"
				alt="Vector"
				width={300}
				draggable={false}
				height={300}
				className="absolute bottom-0 -left-44 z-[1] -rotate-90 object-cover object-center select-none opacity-20"
			/>
			<img
				src="/vector6.webp"
				alt="Vector"
				width={300}
				draggable={false}
				height={300}
				className="absolute -right-44 bottom-0 z-[1] rotate-90 object-cover object-center select-none opacity-20"
			/>

			<div className="relative z-10">
				<Pokedex />
			</div>
		</div>
	);
}
