import React, {useState, useEffect} from 'react';
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {UpdateAllPermission} from "../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";

const SetPermissionToAllVideo = (props) => {
    const [count, setCount] = useState(1);
    const [isLoader, setIsLoader] = useState(false);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
    const handelUpdate=async ()=>{
        console.log("click")
        setIsLoader(true);
    let {state ,Description}=await UpdateAllPermission();
        setIsLoader(false);
        console.log("click out")
        if (state===200){
            success_Notification( "موفق شدید" ,"دسترسی های دانش آموزان به روز رسانی شد");
        }else {
            error_Notification( state,Description);
        }

    };

    return (
        <>
        <IsLoaderComponent isLoader={isLoader}>
            <button className="btn btn-primary" onClick={handelUpdate}>به روز رسانی دسترسی ها </button>

        </IsLoaderComponent>

        </ >
    );
};

export default SetPermissionToAllVideo;