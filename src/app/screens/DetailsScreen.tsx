import React from 'react'
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParamList, DetailsScreenRouteProp} from "../navigationType";
import {removeAfterDash, strUcFirst} from "../../utils/utils";
import {handleOneTimeSound} from "../../utils/soundLoader";
import { images } from '../../resources'

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
    route: DetailsScreenRouteProp;
};

export default function DetailsScreen({ navigation, route }: Readonly<Props>) {
    const { pokemonData: pokemon, id } = route.params;

    const getAllTypesBar = () => {
        return pokemon.types.map((item: any) => strUcFirst(item.type.name)).join(' - ');
    }
    const allTypesFormatted = getAllTypesBar()

    const handlePressPokemonSound = async (pokemon: any) => {
        await handleOneTimeSound(pokemon.cries.latest)
    };

    return (
    <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={images.bgPokedex} style={styles.imageBackground}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={images.pokeball} style={styles.icon} />
                    <Text style={styles.pokemonId}>{id}</Text>
                    <Text style={styles.pokemonName}>{strUcFirst(removeAfterDash(pokemon.name))}</Text>
                </View>
                <Image
                    source={{ uri: 'https://img.pokemondb.net/sprites/black-white/normal/' + pokemon.name + '.png'}}
                    style={styles.pokemonImage}
                />
                <View style={styles.info}>
                    <Text style={styles.label}>{allTypesFormatted}</Text>
                    <Text style={styles.details}>HT: {pokemon.height} cm</Text>
                    <Text style={styles.details}>WT: {pokemon.weight * 0.1} kg</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => handlePressPokemonSound(pokemon)}>
                        <Image source={images.pokemonCrieSound} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.closeButton} style={styles.image} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        imageBackground: {
            flex: 1,
            paddingTop: 200,
            paddingBottom: 150
        },
        container: {
            flex: 1,
            padding: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        icon: {
            width: 24,
            height: 24,
        },
        pokemonId: {
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 10,
        },
        pokemonName: {
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 10,
        },
        pokemonType: {
            fontSize: 16,
            marginLeft: 10,
            color: '#888',
        },
        pokemonImage: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginVertical: 20,
        },
        info: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10,
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        details: {
            fontSize: 14,
        },
        description: {
            fontSize: 14,
            textAlign: 'center',
            marginVertical: 20,
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        button: {
            fontSize: 14,
            color: '#00F',
        },
        image: {
            marginTop: 40,
            width: 50,
            height: 50,
        },
    }
)
