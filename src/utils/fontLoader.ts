import * as Font from 'expo-font';

export const loadPokemonFonts = async () => {
    try {
        await Font.loadAsync({
            'PokemonBW': require('../../assets/font/pokemon_classic.ttf'),
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
