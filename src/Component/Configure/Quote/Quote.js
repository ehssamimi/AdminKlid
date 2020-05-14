import React, {useState, useEffect} from 'react';
import TodayText from "./TodayText";
import {Getqoute, GetUserInfo} from "../../functions/ServerConnection";
import {getProfileValue} from "../../functions/componentHelpFunction";
import {NotificationManager} from "react-notifications";
import IsLoaderComponent from "../../Common/ISLodader/IsLoader";
import CreateQoute from "./CreateQoute";

const Quote = (props) => {
    const [qoute, setqoute] = useState({} );
    const [isLoader, setIsLoader] = useState(false);
    useEffect(() => {
        getData();
    },[]);
    async function getData(  ) {
        setIsLoader(true);
        let {state ,Description } =await Getqoute();
        console.log("Description");
        console.log(Description);
        if(state===200){

            setqoute(Description)
            setIsLoader(false);

            return Description

        }
        else {
            NotificationManager.error(state, Description);
            return false;
        }
    }


    return (
        <div>
            <IsLoaderComponent isLoader={isLoader} >
                <CreateQoute updateContent={()=>{getData()}}/>









                <div dir="rtl mt-5 "  >
                    <TodayText {...qoute} />
                </div>
            </IsLoaderComponent>



        </div>
    );
};

export default Quote;