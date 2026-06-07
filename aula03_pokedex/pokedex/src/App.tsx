import { useState, useEffect } from "react";
import "./App.css";
import Pokedex from "./pages/Pokedex";

function App() {
    const [pokemon, setPokemon] = useState("");
    const [pokemonData, setPokemonData] = useState<any[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("pokemon-list");

        if (saved) {
            setPokemonData(JSON.parse(saved));
        }

        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;

        localStorage.setItem(
            "pokemon-list",
            JSON.stringify(pokemonData)
        );
    }, [pokemonData, loaded]);

    const searchPokemon = async () => {
        if (!pokemon.trim()) return;

        try {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
            );

            if (!res.ok) {
                alert("Pokémon não encontrado");
                return;
            }

            const data = await res.json();

            const newPokemon = {
                id: data.id,
                name: data.name,
                type: data.types
                    .map(
                        (t: any) => t.type.name
                    )
                    .join(", "),
                height: data.height,
                weight: data.weight,
                image: data.sprites.front_default,
            };

            setPokemonData((prev) => {
                const exists = prev.some(
                    (p) => p.id === newPokemon.id
                );

                if (exists) {
                    alert("Este Pokémon já foi adicionado.");
                    return prev;
                }

                return [...prev, newPokemon];
            });

            setPokemon("");
        } catch (error) {
            console.error(
                "Erro ao buscar Pokémon:",
                error
            );

            alert(
                "error"
            );
        }
    };

    return (
        <div className="container">
            <h1>Pokédex</h1>

            <input
                type="text"
                placeholder="Digite um Pokémon"
                value={pokemon}
                className="pokemon-input"
                onChange={(e) =>
                    setPokemon(e.target.value)
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        searchPokemon();
                    }
                }}
            />

            <button
                onClick={searchPokemon}
                className="btn search-btn"
            >
                🔎
            </button>

            <Pokedex pokemons={pokemonData} />
        </div>
    );
}

export default App;