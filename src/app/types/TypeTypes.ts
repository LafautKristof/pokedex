export type TypeRes = {
    apiId: number;
    name: string;
    damage_relations: DamageRelations;
    pokemon: Pokemon[];
};

export type DamageRelations = {
    double_damage_from: { name: string; url: string }[];
    double_damage_to: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    half_damage_to: { name: string; url: string }[];
    no_damage_from: { name: string; url: string }[];
    no_damage_to: { name: string; url: string }[];
};

export type Pokemon = {
    name: string;
    url: string;
};
