import { useEffect, useState } from "react";
import { fetchResultType } from './type'

// todo when unmounted make sure the fetching fn is stop
export const useFetchSessionData = () => {
    const [data, setData] = useState<fetchResultType>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // const abortController = new AbortController();

    const fetchSession = async () => {
        const URL = '/api/session'

        // const res = await fetch(URL, {
        //     signal: abortController.signal,
        // });

        const res = await fetch(URL);

        setIsLoading(true);

        const data = await res.json();

        return data
    };

    useEffect(() => {

        fetchSession().then((data) => {
            setData(data);
            setIsLoading(false)
        }).catch((err) => {
            setIsError(true)
            setIsLoading(false)
            throw err; 
        })

        // this return fn run... does after using the hooks does it unmounted ?
        // return () => abortController.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, isLoading, isError };
};
