import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useFetchToken = () => {
    const [token, setToken] = useState<unknown>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const { getToken } = useAuth();


    const fetchSession = async () => {
        const data  = await getToken();

        setIsLoading(true);

        // remove any
        return data as unknown
    };

    useEffect(() => {

        fetchSession().then((data) => {
            setToken(data);
            setIsLoading(false)
        }).catch((_) => {
            setIsError(true)
            setIsLoading(false)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { token, isLoading, isError };
};
