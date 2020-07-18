import React, {useState, useEffect} from 'react';
import {Input, InputGroup} from "reactstrap";
import $ from 'jquery'
import io from "socket.io-client";


const InputSendMessage = (props) => {
    const [value, setvalue] = useState(" ");

    const onFormSubmit = e => {
        e.preventDefault();
        props.sendMessage(value)
         setvalue(" ");

    }
    const onchange = e => {
        setvalue(e.target.value)
    }
    const handleKeyDown = e => {
         if (e.key === 'Enter' && !e.shiftKey) {
             onFormSubmit(e)
        }
    }



    return (
        <div className="w-100 position-relative   ">
            <form onSubmit={ onFormSubmit}>
                <InputGroup>

                    <textarea placeholder="تایپ کنید ..." className="col-12   text-break form-control" style={{ paddingLeft:"8em" }} onChange={ onchange}  onKeyDown={ handleKeyDown} value={value} />
                    {/*<button className="default  ml-auto btn  br10px btn-outline-primary " type="submit">ارسال</button>*/}
                    <button className=" default  ml-auto btn h-input-s br5px  btn-outline-primary  position-absolute zIndex-3  text-center" style={{"left":0,width:"8em"}} type="submit">ارسال</button>

                </InputGroup>

            </form>
        </div>
    );
};

export default InputSendMessage;


