import axios from 'axios'
import {useEffect, useState} from 'react'

export default function useApi<T>(path: string) {
    const [data, setData] = useState<any>()
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            axios.get<T>(path)
                .then(response => {
                    setData(response.data)
                }).catch((error) => {
                setError(error)
            })
        }
        fetchData()
    }, [])
    return {
        data,
        error
    }
}


export const fetchDataApi = async <T>(path: string): Promise<T> => {
    const response = await axios.get<T>(path);
    return response.data;
};
