import { PokemonRes } from "../types/types";

export function getSprite(pokemon: PokemonRes): string {
    return (
        pokemon.data.sprites.other["official-artwork"]?.front_default ??
        pokemon.data.sprites.other.dream_world?.front_default ??
        pokemon.data.sprites.other.showdown?.front_default ??
        "/placeholder.png"
    );
}
