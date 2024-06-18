import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions
} from 'react-native'
import { Audio } from 'expo-av'
import React, { useRef, useState} from 'react'
import useApi, { fetchDataApi } from '../../hook/useApi'
import { strUcFirst, removeAfterDash } from '../../utils/utils'
import type { ApiResponseType, PokemonDetail } from '../../type'
import { useBackSound } from '../../utils/soundLoader'
import { useFonts } from '../../utils/fontLoader'
import { sounds } from '../../resources'
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParamList} from "../navigationType";

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
    useBackSound(sounds.pTitleScreen)
    useFonts()

    const {data} = useApi<ApiResponseType[]>('https://pokeapi.co/api/v2/pokemon?limit=649&offset=0')
    const results = data?.results ?? []

    const handlePress = async (pokemon: any) => {
        const pokemonData: PokemonDetail = await fetchDataApi(pokemon.url);
        const soundObject = new Audio.Sound();

        try {
            await soundObject.loadAsync({ uri: pokemonData.cries.latest });
            await soundObject.playAsync();
            await soundObject.setVolumeAsync(1);
        } catch (error) {
            console.error('Error playing sound:', error);
        }

        navigation.navigate('Details')
    };

    const scrollViewRef = useRef(null);
    const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);
    const ITEM_HEIGHT = 70; // Adjust this value based on your item height

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        setSelectedPokemonIndex(index);
    };

    // resizeMode="repeat"
    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../resources/image/pokedex.webp')} style={styles.imageBackground}>
                <ScrollView
                    ref={scrollViewRef}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}>
                    {results.map((pokemon: any, index: number) => {
                        const id = (index + 1).toString().padStart(3, '0');
                        return (
                            <TouchableOpacity key={pokemon.name} onPress={() => handlePress(pokemon)} style={index === selectedPokemonIndex ? styles.selectedItem : null}>
                                <ImageBackground key={pokemon.name} source={require('../../resources/image/background_pokemon_select.png')} style={styles.button}>
                                    <Image source={{ uri: 'https://img.pokemondb.net/sprites/black-white/normal/' + pokemon.name + '.png'}} style={styles.pokemonImageDex} />
                                    <Text style={styles.textImageDex} key={pokemon.name}>{id} {strUcFirst(removeAfterDash(pokemon.name))}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>►</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    },
    selectedItem: {
        transform: [{ translateX: 10 }],
    },
    arrowContainer: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -Dimensions.get('window').height / 2 }],
        zIndex: 1,
    },
    arrow: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});
