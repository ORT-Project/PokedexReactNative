import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font';

export default function App() {

    useEffect(() => {
        let sound;
        const playSound = async () => {
            sound = new Audio.Sound();
            try {
                await sound.loadAsync(require('../../assets/pokemon_titlescreen.mp3'));
                await sound.playAsync();

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

    const images = [];
    for (let i = 0; i < 40; i++) {
        images.push(
            <TouchableOpacity onPress={handlePress}>
                <ImageBackground key={i} source={require('../resources/image/background_pokemon_select.png')} style={styles.button}>
                    <Image source={require('../resources/image/reshiram.png')} style={styles.pokemonImageDex} />
                    <Text style={styles.textImageDex}>001 Reshiram</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    const handlePress = () => {
        console.log('Button pressed!');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../resources/image/rosa.webp')} style={styles.imageBackground}>
                <ScrollView>
                    {images}
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
            flex: 1
        },
        button: {
            marginTop: 6,
            alignItems: 'right',
            width: 307,
            height: 46
        },
        pokemonImageDex: {
            marginTop: 6,
            marginLeft: 16,
            width: 36,
            height: 36
        },
        textImageDex: {
            fontFamily: 'PokemonBW',
            fontSize: 26,
            marginTop: 14,
            marginLeft: 80,
            color: '#fff',
            position: 'absolute'
        }
});