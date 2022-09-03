import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {

    const [data,setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);

    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers : {
                "content-type" : "application/json"
            },
            body: JSON.stringify(postData)
        });
    }

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async (fetchOptions) => {
            setIsPending(true);

            try{
                const res = await fetch(url, {...fetchOptions, signal: controller.signal});
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                const json = await res.json();

                setIsPending(false);
                setData(json);
                setError(null);
            }catch(err){
                if(err.name === "AbortError"){
                    console.log("Fetch Was Aborted");
                }
                else{
                setError("Cannot Fetch Data");
                setIsPending(false);
                // console.log(err.message);
            }
        }
            
        };

        if(method === "GET"){
            fetchData();
        }
        if(method === "POST" && options){
            fetchData(options);
        }

        return () => {
            controller.abort();
        };
    },[url,method,options]);


    return { data, isPending, error, postData };
};


export default useFetch;