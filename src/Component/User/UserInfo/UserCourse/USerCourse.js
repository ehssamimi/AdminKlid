import React, {useState, useEffect} from 'react';
import {CarouselMain} from "../../../Common/Carousel/CarouselMain";
import ShowUserItemsCourse from "./ShowUserItemsCourse/ShowUserItemsCourse";
import AddUserItemsCourse from "./AddUserItemsCourse/AddUserItemsCourse";
import {GetUserInfo} from "../../../functions/ServerConnection";
import {getProfileValue} from "../../../functions/componentHelpFunction";
import {NotificationManager} from "react-notifications";
import Loader from "../../../Common/Loader/Loader";

const UserCourse = (props) => {

    const{match:{params}}=props;
    const [owned_product, set_owned_product] = useState({});
    const [isLoader, setIsLoader] = useState(false);

    useEffect(  () => {

        getData(params.phoneNumber);


    },[]);

    const updateItem=()=>{
        getData(params.phoneNumber);
    };
    async function getData( phone_number) {
        setIsLoader(true);
        let {state ,Description } =await GetUserInfo(phone_number);
        if(state===200){
            set_owned_product(Description.owned_product);
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
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :

                    <div className="w-100 h-100">
                        <AddUserItemsCourse  {...props} updateItem={updateItem}/>

                        <ShowUserItemsCourse {...props} {...owned_product}/>

                    </div>
            }
        </div>

    );
};

export default UserCourse;