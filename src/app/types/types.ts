export type PokemonRes = {
    apiId: number;
    name: string;
    data: Data;
    species: Species;
    evolution_chain: EvolutionChain;
};

export type Data = {
    sprites: Sprites;
    types: Types[];
};

export type Sprites = {
    other: Other;
};

export type Other = {
    dream_world: Dreamworld;
    "official-artwork": OfficialArtwork;
    showdown: Showdown;
};
export type Dreamworld = {
    front_default: string | null;
};
export type OfficialArtwork = {
    front_default: string | null;
};
export type Showdown = {
    front_default: string | null;
};

export type Types = {
    slot: number;
    type: Type;
};
export type Type = {
    name: string;
    url: string;
};

export type EvolutionChain = {
    chain: EvolutionDetail;
};

export type EvolutionDetail = {
    species: { name: string; url: string };
    evolves_to: EvolutionDetail[];
};

export type Species = {
    name: string;
    color: { name: string; url: string };
    generation: { name: string; url: string };
    habitat?: { name: string; url: string } | null;
};

export type Pokedex = {
    _id: string;
    userId: string;
    pokemonId: number;
    caughtAt: Date;
};
