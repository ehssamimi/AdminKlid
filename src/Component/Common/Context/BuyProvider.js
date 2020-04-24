import React, {useState, useEffect} from 'react';

import cookie from "react-cookies";
export const BuyContext=React.createContext() ;
const BuyProvider = ( props) => {
    const [Buy, setBuy] = useState([]);

    const handelBuyContent=( content)=>{
        setBuy(content)
    };

    useEffect(() => {
        let products=cookie.load('basket');
        if (products!==[]){
            handelBuyContent( cookie.load('basket'))
        }
        // Update the document title using the browser API

    },[]);
    let value={"buy":Buy,"SetBuy":handelBuyContent};

    return (
        <BuyContext.Provider value={value}>
            { props.children}
        </BuyContext.Provider>
    );
};

export default BuyProvider;

