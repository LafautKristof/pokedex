export type ItemsRes = {
    apiId: number;
    name: string;
    category: string;
    pocket: string;
    data: Data;
};

export type Data = {
    cost: number;
    effect_entries: EffectEntries[];

    flavor_text_entries: FlavorTextEntries[];

    held_by_pokemon: HeldByPokemon[];
    name: string;

    sprites: Sprites;
};

export type Sprites = {
    default: string;
};

export type EffectEntries = {
    effect: string;
    language: {
        name: string;
        url: string;
    };
};

export type FlavorTextEntries = {
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
};

export type HeldByPokemon = {
    pokemon: {
        name: string;
        url: string;
    };
};
