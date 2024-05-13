import { useEffect, useMemo, useState } from "react"
import { UserData } from "./types";


type Info = {
    page: number;
    results: number;
    seed: string;
    version: number;
}

type CountriesData = { info: Info, results: Array<UserData> }
export const useGetUsers = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<CountriesData>()
    useEffect(() => {
        getUsers().then((data: CountriesData) => {
            setData(data)
        }).finally(() => { setLoading(false) })
    }, [setLoading])

    const countires = useMemo(() => {
        const set = new Set<string>()
        const map = new Map<string, UserData[]>()
        data?.results.reduce((acc, item) => {
            const country = item.location.country
            acc.add(country)
            if (!map.get(country)) {
                map.set(country, [])
            }
            map.get(country)?.push(item)
            return acc
        }, set)

        const list = Array.from(set)
        list.sort((a, b) => (map.get(a)?.length || 0) - (map.get(b)?.length || 0))
        return { list, map }
    }, [data])
    return { loading, data, countires }
}

const getUsers = () => fetch("https://randomuser.me/api/?results=100").then((response) => response.json());