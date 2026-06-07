import PokeCard from "../components/Pokecard";

interface Pokemon {
    id: number;
    name: string;
    type: string;
    height: number;
    weight: number;
    image: string;
}

interface PokedexProps {
    pokemons: Pokemon[];
}

export default function Pokedex({
    pokemons,
}: PokedexProps) {
    return (
        <div className="pokedex">
            {pokemons.map((pokemon) => (
                <PokeCard
                    key={pokemon.id}
                    pokemon={pokemon}
                />
            ))}
        </div>
    );
}