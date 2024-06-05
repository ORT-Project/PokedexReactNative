import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font';
import useApi from '../hook/useApi';
import axios from 'axios'

const fetchData = async (path: string) => {
      const response =  await axios.get<T>(path)
      return response.data
}

export default function App() {

    useEffect(() => {
        let sound;
        const playSound = async () => {
            sound = new Audio.Sound();
            try {
                await sound.loadAsync(require('../../assets/pokemon_titlescreen.mp3'));
                await sound.playAsync();
                sound.setVolumeAsync(0.4);

                // Configure the sound to loop when it finishes
                if (status.didJustFinish) {
                    sound.replayAsync();
                }
            } catch (error) {
                console.log(error);
            }
        };

        playSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    'PokemonBW': require('../../assets/font/pokemon_classic.ttf'),
                });
                setFontLoaded(true);
            } catch (error) {
                console.error(ActivityIndicator, error);
            }
        }

        loadFonts();
    }, []);

    const {data} = useApi('https://pokeapi.co/api/v2/pokemon?limit=649&offset=0')
    const results = data?.results ?? []

    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null);
    const  uniquePokemonData = useApi(selectedPokemonUrl);



    const handlePress = async (pokemon: any) => {
        const pokemonData = await fetchData(pokemon.url);
        const soundObject = new Audio.Sound();

        try {
            await soundObject.loadAsync({ uri: pokemonData.cries.latest });
            await soundObject.playAsync();
            soundObject.setVolumeAsync(1);
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    function strUcFirst(a) {
      return (a+'').charAt(0).toUpperCase() + (a+'').substr(1);
    }

    function removeAfterDash(str) {
      return str.split('-')[0];
    }

     return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground resizeMode="repeat" source={require('../resources/image/pokemon_bar.png')} style={styles.imageBackground}>
                <ScrollView>
                {results.map((pokemon: any, index: int) => {
                    const id = (index + 1).toString().padStart(3, '0');
                        return (
                            <TouchableOpacity key={pokemon.name} onPress={() => handlePress(pokemon)}>
                                <ImageBackground key={pokemon.name} source={require('../resources/image/background_pokemon_select.png')} style={styles.button}>
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
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        safeArea: {
            flex: 1,
            backgroundImage: 'red'
        },
        imageBackground: {
            flex: 1,
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
            marginLeft: 72,
            color: '#fff',
            position: 'absolute'
        }
});