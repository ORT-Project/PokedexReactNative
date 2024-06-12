import * as Font from 'expo-font'
import {useEffect, useState} from 'react'

export const useFonts = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    'PokemonBW': require('../../assets/font/pokemon_classic.ttf'),
                });
                setFontLoaded(true);
            } catch (error) {
                console.error(error);
            }
        }

        loadFonts();
    }, []);

    return fontLoaded;
};
