import React, {useState, useEffect} from 'react';
import {Card, CardBody, Form} from 'reactstrap'
import {TextInput} from "../../../Common/Forms/textInput/TextInput";
import {Link} from "react-router-dom";
import validator from "validator";
import {validatephoneNumber} from "../../../functions/componentHelpFunction";
import {RegestryUser} from "../../../functions/ServerConnection";
import {NotificationManager} from "react-notifications";

const GetUserPhoneNumber = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, seterror] = useState("");
    useEffect(() => {
        // Update the document title using the browser API
     });
    const validateForm=(callback)=> {
        let errors="";

        let formValidate=true;

        if (validator.isEmpty(phoneNumber)) {
            formValidate = false;
            errors ="شماره تلفن دانش آموز را وارد کنید  ";
        }else if (!validatephoneNumber(phoneNumber)) {
            formValidate = false;
            errors ="شماره ای که وارد کرده اید غیر مجاز است !  ";
        }




console.log("errors");
console.log(errors);
        seterror(errors);
        return callback(formValidate)
    };


    const getPhone=(e)=>{
        e.preventDefault();
        validateForm(async (validate)=>{

            if (validate){
                console.log("phoneNumber");
                console.log(phoneNumber);
                let goUser=document.getElementById("profile");
                goUser.click();

            }else {
                console.log( 'error' );
                console.log( error );
            }
        })


    }

    return (
        <div>
            <Card className="br20px">
                <CardBody>
                    <TextInput onChange={value=>(setPhoneNumber(value))} label={'شماره تلفن همراه'} id={'phoneNumber'}
                               placeholder={"********09"} type={"number"} DivClass={"col-6"}
                               is_required={true} value={phoneNumber}
                               error={error }/>
                    <button className="btn btn-primary" onClick={getPhone}>send</button>
                </CardBody>
                <Link to={`/user/info/${phoneNumber}`} id="profile" className="pt-4 d-none">go user profile</Link>

            </Card>

        </div>
    );
};

export default GetUserPhoneNumber;