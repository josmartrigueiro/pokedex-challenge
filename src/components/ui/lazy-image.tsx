import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
	src: string;
	alt: string;
	className?: string;
	fallback?: string;
	loading?: "lazy" | "eager";
}

export function LazyImage({
	src,
	alt,
	className,
	fallback = "/pokeball-fallback.png",
	loading = "lazy",
}: LazyImageProps) {
	const [imageSrc, setImageSrc] = useState<string>("");
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (loading === "eager") {
			setImageSrc(src);
			return;
		}

		const img = imgRef.current;
		if (!img) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					setImageSrc(src);
					observer.unobserve(img);
				}
			},
			{ rootMargin: "50px" },
		);

		observer.observe(img);

		return () => {
			observer.unobserve(img);
		};
	}, [src, loading]);

	const handleLoad = () => {
		setImageLoaded(true);
	};

	const handleError = () => {
		setImageError(true);
		setImageSrc(fallback);
	};

	return (
		<div className={cn("relative overflow-hidden", className)}>
			{!imageLoaded && !imageError && (
				<div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />
			)}
			<img
				ref={imgRef}
				src={imageSrc}
				alt={alt}
				className={cn(
					"w-full h-full object-cover transition-opacity duration-300 rounded-2xl",
					imageLoaded ? "opacity-100" : "opacity-0",
					className,
				)}
				onLoad={handleLoad}
				onError={handleError}
				loading={loading}
			/>
		</div>
	);
}
