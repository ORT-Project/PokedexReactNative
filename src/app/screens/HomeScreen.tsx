import {
    StyleSheet,
    Text,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native'
import useApi, { fetchDataApi } from '../../hook/useApi'
import { strUcFirst, removeAfterDash } from '../../utils/utils'
import type { ApiResponseType, PokemonDetail } from '../../type'
import { useBackSound, } from '../../utils/soundLoader'
import {loadPokemonFonts} from '../../utils/fontLoader'
import { images, sounds } from '../../resources'
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParamList} from "../navigationType";
import {useEffect, useState } from 'react'

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Readonly<Props>) {
    useBackSound(sounds.pTitleScreen)

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = () => {
            loadPokemonFonts().then((loaded) => {
                setFontsLoaded(loaded);
            }).catch((error) => {
                // Gérer les erreurs si nécessaire
                console.error('Erreur lors du chargement des polices :', error);
            });
        };

        loadFonts();
    }, []);


    const {data} = useApi<ApiResponseType[]>('https://pokeapi.co/api/v2/pokemon?limit=649&offset=0')
    const results = data?.results ?? []

    const handlePress = async (pokemon: any, id: string) => {
        const pokemonData: PokemonDetail = await fetchDataApi(pokemon.url);
        // await handleOneTimeSound(pokemonData.cries.latest)
        navigation.navigate('Details', { pokemonData, id })
    };

    if (!fontsLoaded || !results) {
        return (
            <SafeAreaView style={styles.loadingSafeArea}>
                <ImageBackground source={images.bgPokedex} style={styles.imageBackgroundLoading}>
                    <Image source={images.loadingGif} style={styles.loadingImage}></Image>
                </ImageBackground>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={images.bgPokedex} style={styles.imageBackground}>
                <ScrollView>
                    {results.map((pokemon: any, index: number) => {
                        const id = (index + 1).toString().padStart(3, '0');
                        return (
                            <TouchableOpacity key={pokemon.name} onPress={() => handlePress(pokemon, id)}>
                                <ImageBackground key={pokemon.name} source={images.pokemonItemDex} style={styles.button}>
                                    <Image source={{ uri: 'https://img.pokemondb.net/sprites/black-white/normal/' + pokemon.name + '.png'}} style={styles.pokemonImageDex} />
                                    <Text style={styles.textImageDex} key={pokemon.name}>{id} {strUcFirst(removeAfterDash(pokemon.name))}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingSafeArea: {
        flex: 1,
    },
    imageBackgroundLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        paddingTop: 150,
        paddingBottom: 150
    },
    button: {
        marginTop: 6,
        width: 307,
        height: 46
    },
    pokemonImageDex: {
        marginLeft: 10,
        width: 50,
        height: 50
    },
    textImageDex: {
        fontFamily: 'PokemonBW',
        fontSize: 14,
        marginTop: 9,
        marginLeft: 76,
        color: '#fff',
        position: 'absolute'
    }
});
