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