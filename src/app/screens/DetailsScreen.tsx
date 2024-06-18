import React from 'react'
import {Button, StyleSheet} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParamList} from "../navigationType";

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function DetailsScreen({ navigation }: Props) {
    return (
        <Button title='Home' onPress={() => navigation.navigate('Home')}></Button>
    )
}

const styles = StyleSheet.create({

    }
)
