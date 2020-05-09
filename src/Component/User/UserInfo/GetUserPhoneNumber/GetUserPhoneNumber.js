import React, {useState, useEffect} from 'react';
import {Card, CardBody, Form} from 'reactstrap'
import {TextInput} from "../../../Common/Forms/textInput/TextInput";

const GetUserPhoneNumber = (props) => {
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [error, seterror] = useState('');
    useEffect(() => {
        // Update the document title using the browser API
     });
    const getPhone=(e)=>{
        e.preventDefault();
        console.log("phoneNumber")
        console.log(phoneNumber)
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

            </Card>

        </div>
    );
};

export default GetUserPhoneNumber;