import { useState, useEffect } from "react";
import "./style.css";

interface Pokemon {
    id: number;
    name: string;
    type: string;
    height: number;
    weight: number;
    image: string;
}

interface PokedexProps {
    pokemon: Pokemon;
}

export default function({ pokemon }: PokedexProps) {
    const [marked, setMarked] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(
            `favorite-${pokemon.id}`
        );

        if (saved !== null) {
            setMarked(JSON.parse(saved));
        }
    }, [pokemon.id]);

    useEffect(() => {
        localStorage.setItem(
            `favorite-${pokemon.id}`,
            JSON.stringify(marked)
        );
    }, [marked, pokemon.id]);

    const switchMarked = () => {
        setMarked((prev) => !prev);
    };

    return (
        <div className="container">
            <section className="pokemons-card">
                <h2>
                    {marked && "❤️"}
                    {pokemon.name}
                </h2>

                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                />

                <p>Tipo (Type): {pokemon.type}</p>
                <p>Altura (Height): {pokemon.height} m</p>
                <p>Peso (Weight): {pokemon.weight} kg</p>

                <button onClick={switchMarked}>
                    {marked
                        ? "Desfavoritar"
                        : "Favoritar"}
                </button>
            </section>
        </div>
    );
}