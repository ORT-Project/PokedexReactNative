export interface PokemonType {
    name: string;
    url: string;
}

export interface ApiResponseType {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonType[];
}

export interface Ability {
    name: string;
    url: string;
}

export interface AbilityItem {
    ability: Ability;
    is_hidden: boolean;
    slot: number;
}

export interface Cries {
    latest: string;
    legacy: string;
}

export interface PokemonDetail {
    abilities: AbilityItem[];
    base_experience: number;
    cries: Cries;
}
