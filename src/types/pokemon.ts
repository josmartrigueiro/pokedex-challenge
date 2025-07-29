export interface Pokemon {
	id: number;
	name: string;
	image: string;
	types: string[];
	powerLevel: number;
}

export interface PokemonCardProps {
	pokemon: Pokemon;
	onClick?: () => void;
	className?: string;
}
