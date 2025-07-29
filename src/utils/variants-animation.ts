import type { Variants } from "motion/react";

export const verticalBtnAnimationVariant = {
	initial: { opacity: 0, y: -15 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 15 },
};

export const opacityAnimationVariant = {
	initial: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

export const smoothLayoutTransition = {
	layout: {
		type: "spring" as const,
		stiffness: 200,
		damping: 25,
		mass: 1,
	},
};

export const verticalSlideTextVariant = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
	transition: {
		duration: 0.2,
		ease: "easeInOut",
	},
};

export const pokedexContainerVariant = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

export const pokedexHeaderVariant = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
};

export const pokedexGridVariant = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.3,
		},
	},
};

export const pokemonCardVariant: Variants = {
	initial: {
		opacity: 0,
		y: 12,
		scale: 0.97,
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring" as const,
			stiffness: 320,
			damping: 22,
			mass: 0.7,
		},
	},
	hover: {
		scale: 1.025,
		y: -2,
		transition: {
			type: "spring" as const,
			stiffness: 320,
			damping: 22,
			mass: 0.7,
		},
	},
	tap: {
		scale: 0.98,
		transition: { duration: 0.12, ease: "linear" as const },
	},
};

export const pokemonImageVariant: Variants = {
	initial: { scale: 1, rotateY: 0 },
	hover: {
		scale: 1.05,
		rotateY: 5,
		transition: {
			duration: 0.3,
			ease: "easeInOut" as const,
		},
	},
};

export const modalContainerVariant: Variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeOut" as const,
			staggerChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: "easeIn" as const,
		},
	},
};

export const modalItemVariant: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut" as const,
		},
	},
};

export const modalImageVariant: Variants = {
	initial: { opacity: 0, scale: 0.8 },
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: "easeOut" as const,
		},
	},
};

export const filtersContainerVariant: Variants = {
	initial: { opacity: 0, y: -20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut" as const,
			staggerChildren: 0.1,
		},
	},
};

export const filtersItemVariant: Variants = {
	initial: { opacity: 0, x: -20 },
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.2,
			ease: "easeOut" as const,
		},
	},
};

export const filtersBadgeVariant: Variants = {
	initial: { opacity: 0, y: 0 },
	animate: {
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: "easeOut" as const,
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.15,
			ease: "easeIn" as const,
		},
	},
};

export const activeFiltersContainerVariant: Variants = {
	initial: {
		opacity: 0,
		height: 0,
	},
	animate: {
		opacity: 1,
		height: "auto",
		transition: {
			duration: 0.4,
			ease: "easeInOut" as const,
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		height: 0,
		marginTop: 0,
		paddingTop: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut" as const,
		},
	},
};

export const activeFiltersContentVariant: Variants = {
	initial: { opacity: 0, y: -5 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut" as const,
			staggerChildren: 0.05,
		},
	},
	exit: {
		opacity: 0,
		y: -5,
		transition: {
			duration: 0.2,
			ease: "easeIn" as const,
		},
	},
};

export const emptyStateVariant: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
};

export const paginationContainerVariant = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut" as const,
		},
	},
};

export const loadingVariant = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
};
