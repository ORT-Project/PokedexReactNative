import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import useApi from "../hook/useApi";

export default function App() {
    const {data} = useApi('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    const results = data?.results ?? []
    return (
        <ScrollView>
            <View style={styles.container}>
                {results.map((pokemon: any) => (
                    <Text key={pokemon.name}>{pokemon.name}</Text>
                ))}
                <StatusBar style="auto"/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});