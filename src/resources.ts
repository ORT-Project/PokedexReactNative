interface Images {
    loadingScreen: any;
    backButton: any;
    closeButton: any;
    loadingGif: any;
    pokemonCrieSound: any;
    pokemonExample: any;
    bgRosa: any;
    bgPokedex: any;
    pokeball: any;
    pokemonItemDex: any;
}

export const images: Images = {
    loadingScreen: require('./resources/image/loading_screen.jpg'),
    backButton: require('./resources/image/back.png'),
    closeButton: require('./resources/image/close.png'),
    loadingGif: require('./resources/image/loading.gif'),
    pokemonCrieSound: require('./resources/image/meloetta.png'),
    pokemonExample: require('./resources/image/reshiram.png'),
    bgRosa: require('./resources/image/rosa.webp'),
    bgPokedex: require('./resources/image/pokedex.webp'),
    pokeball: require('./resources/image/pokeball.png'),
    pokemonItemDex: require('./resources/image/background_pokemon_select.png')
}

interface Sounds {
    pCenter: any;
    pTitleScreen: any;
}

export const sounds: Sounds = {
    pCenter: require('../assets/pokemon_center.mp3'),
    pTitleScreen: require('../assets/pokemon_titlescreen.mp3')
}
