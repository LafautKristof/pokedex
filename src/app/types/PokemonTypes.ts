export type PokemonRes = {
    apiId: number;
    name: string;
    data: Data;
    species: Species;
    evolution_chain: EvolutionChain;
    type_relations: TypeRelation[];
};

export type Data = {
    sprites: Sprites;
    types: Types[];
    height: number;
    weight: number;
    stats: { base_stat: number; stat: { name: string } }[];
    base_experience: number;
    abilities: { ability: { name: string }; is_hidden: boolean }[];
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
    flavor_text_entries: { flavor_text: string; language: { name: string } }[];
};

export type Pokedex = {
    _id?: string;
    userId: string;
    pokemonId: number;
    caughtAt: Date;
    __v?: number;
};

export type TypeRelation = {
    name: string;
    damage_relations: DamageRelations;
};

export type DamageRelations = {
    double_damage_from: { name: string; url: string }[];
    double_damage_to: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    half_damage_to: { name: string; url: string }[];
    no_damage_from: { name: string; url: string }[];
    no_damage_to: { name: string; url: string }[];
};
