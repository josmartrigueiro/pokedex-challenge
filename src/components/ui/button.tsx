import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"relative disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center group gap-2 whitespace-nowrap rounded-full rounded-lg text-sm font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					"border disabled:brightness-120 border-primary shadow-inner [text-shadow:0_1px_rgb(0_11_15_/_0.4)] shadow-[inset_0_1px_0_oklch(1_0_0_/_0.2),inset_0_-1px_0_oklch(0_0_0_/_0.2),0_1px_2px_oklch(0_0_0_/_0.2)] bg-[linear-gradient(180deg,oklch(0.52_0.09_177.52),oklch(0.46_0.103_177.52)_62%,oklch(0.42_0.08_177.52))] text-white shadow-xs transition-all bg-[linear-gradient(180deg,oklch(0.52_0.09_177.52),oklch(0.46_0.103_177.52)_62%,oklch(0.42_0.08_177.52))] hover:bg-[linear-gradient(180deg,oklch(0.54_0.095_177.52),oklch(0.48_0.108_177.52)_62%,oklch(0.44_0.085_177.52))] focus-visible:ring-ring",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 disabled:bg-red-500 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-primary border bg-background shadow-xs hover:bg-zinc-100 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3 gap-1.5",
				sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-11 px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
			shape: {
				pill: "rounded-full",
			},
		},
		defaultVariants: {
			variant: "default",
			shape: "pill",
			size: "lg",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
