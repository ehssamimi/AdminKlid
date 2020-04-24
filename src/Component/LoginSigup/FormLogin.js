
import React, {useState, useContext, useEffect} from 'react';
import {SelectedInput, TextInput} from "../Common/Forms/textInput/TextInput";
import {Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import validator from "validator";
 import {NotificationContainer, NotificationManager} from "react-notifications";
import {validatephoneNumber} from "../functions/componentHelpFunction";
import {GetLogin, GetUserDropDown, GetVerifycationCode, Regestry} from "../functions/ServerConnection";
const FormLogin = (props) => {

    let{header,subHeader ,btn_txt,handelType,handelChangeForm,loading}=props;
    const [values, setvalues] = useState({ "phoneNumber":""});

    const [error, seterror] = useState({ "phoneNumber":""});


    const onChange = (value, names) => {

        setvalues({...values, [names]: value});

    };

    const validateForm=(callback)=> {
        let errors={ "phoneNumber":""};

        let formValidate=true;

        if (validator.isEmpty(values.phoneNumber)) {
            formValidate = false;
            errors['phoneNumber']="شماره تلفن همراه خود را وارد کنید  ";
        }else if (!validatephoneNumber(values.phoneNumber)) {
            formValidate = false;
            errors['phoneNumber']="شماره ای که وارد کرده اید غیر مجاز است !  ";
        }

        seterror(errors);
        return callback(formValidate)
    };


    const handelSubmit = async (e) => {
        e.preventDefault();
        validateForm(async (validate)=>{

            if (validate){


                loading(100, 1);
                let {state ,Description} = await GetLogin(values.phoneNumber);
                // console.log(state ,Description)
                setTimeout(function(){
                    loading(50, 1);
                }, 1000);
                if (state===200 ) {
                    // NotificationManager.success("کد احاز هویت با موفقیت برای شما ارسال شد ", "موفق شدید ");
                    localStorage.setItem("phoneNumber_K",values.phoneNumber)
                    let {state  ,Description } = await GetVerifycationCode(values.phoneNumber);
                    if (state ===200){
                        // console.log(Description )
                        handelType("login")
                        handelChangeForm("validate");
                    } else {
                        console.log("not validate Code");
                        NotificationManager.error(state , Description )
                    }

                } else {
                    NotificationManager.error(state, Description)
                }


            }else {
                // console.log( 'error' )
                // console.log( error )
            }
        })

    };


    return (
        <div className="w-50 h-100  overflow-hidden "     dir="rtl" >
            <div className="w-100 h-100  d-flex justify-content-center overflow-hidden">
                <div className="  col-8" style={{marginTop:'4.5rem'}}>
                    <p className="header-color" style={{fontSize:"1.5rem"}}>{header}  </p>
                    <p className="header-color font-weight-bold  mb-2 mt-2" style={{fontSize:"3rem"}}>{subHeader} </p>
                    <div className="row m-0  w-100">

                        <Col sm={12} className="d-flex   flex-column justify-content-between   ml-r-auto mt-5  ">
                            <Form onSubmit={handelSubmit} className="mt-5">

                                <TextInput onChange={onChange} label={'شماره تلفن همراه'} id={'phoneNumber'}
                                           placeholder={"********09"} type={"number"}
                                           is_required={true} value={values.phoneNumber}
                                           error={error.phoneNumber}/>


                                <button
                                    className="btn green-background  br10px text-white  h-input-s col-sm-12 col-md-8 col-5 sendButton-shadow mt-3"
                                    type="submit">{btn_txt}
                                </button>
                                {
                                    handelChangeForm === undefined ? "" :
                                        <p className="mt-2">ثبت نام نکرده اید ؟<span onClick={() => {
                                            handelChangeForm("signUp")
                                        }} className="mt-2 cursor-pointer font-weight-bold">همین حالا ثبت نام کنید</span></p>
                                }
                            </Form>

                        </Col>
                    </div>

                </div>
            </div>

            <NotificationContainer />
        </div>
    );
};

export default FormLogin;