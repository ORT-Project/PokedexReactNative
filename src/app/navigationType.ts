import {PokemonDetail} from "../type";

export type StackParamList = {
    Home: undefined;
    Details: any;
};

export type DetailsScreenRouteProp = {
    params: any;
    Details: { pokemon: PokemonDetail, id: string }
}
