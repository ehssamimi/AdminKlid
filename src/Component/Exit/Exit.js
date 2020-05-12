import React, {useState, useEffect} from 'react';
// import Loader from "../../assets/common/img/loader.svg";
import {LogOut} from "../functions/ServerConnection";
import {NotificationManager} from "react-notifications";
import Loader from "../Common/Loader/Loader";

const Exit = (props) => {
    const [isLoder, setisLoder] = useState(true);



    useEffect(()=>{
        async function Exit(user_id) {

            let {state ,Description}=await LogOut();
            console.log(Description);
            console.log(state);
            setisLoder(false);
            if (state===200 ) {

                await localStorage.clear();
                 NotificationManager.success(state, Description);
                let home= document.getElementById("home");
                home.click()
                // props.history.push('/');
                // return <Redirect to={'/'} />

            } else {
                NotificationManager.error(state, Description);

                // setisLoder(false);
                // error_Notification(state,Description)
            }

        }
        Exit()

    });




    return (
        <div>

            <div className='d-flex justify-content-center align-items-center'>
                <div className='col-6'>
                    <Loader/>
                 </div>
            </div>
            <a href="/"  id="home" className="d-none">go home</a>

        </div>
    );
};

export default Exit;