import React, {useState, useEffect} from 'react';

export const UrlContext=React.createContext() ;
const UrlProvider = (props) => {
    const [Url, setUrl] = useState("about");


    useEffect(() => {
        let{pathname}= props.history.location;
        let Url=pathname.split("/").reverse();
        setUrl(Url[0]);
    },[]);


    return (
        <UrlContext.Provider value={Url}>
            { props.children}
        </UrlContext.Provider>
    );
};

export default UrlProvider;