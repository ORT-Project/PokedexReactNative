import { Audio } from 'expo-av'
import { useEffect } from 'react'
export const useBackSound = (soundSource: string) => {

    useEffect(() => {
        let sound: any;
        const playSound = async () => {
            sound = new Audio.Sound();
            try {
                await sound.loadAsync(soundSource);
                await sound.playAsync();
                await sound.setVolumeAsync(0.4);
                await sound.setIsLoopingAsync(true)
            } catch (error) {
                console.log(error);
            }
        };

        playSound().then(() => {
            console.log('Musique lancée avec succès');
        }).catch((err) => {
            console.error(`Une erreur est survenue lors du lancement de la musique : ${err}`)
        })

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);
}

export const handleOneTimeSound = async (soundSource: string) => {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync({ uri: soundSource });
        await soundObject.playAsync();
        await soundObject.setVolumeAsync(1);
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}
