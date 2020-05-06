
import React, {useState, useContext, useEffect} from 'react';
import {SelectedInput, TextInput} from "../Common/Forms/textInput/TextInput";
import {Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import validator from "validator";
import {GetLogin, GetUserDropDown, GetVerifycationCode, Regestry} from "../functions/ServerConnection";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {validatephoneNumber} from "../functions/componentHelpFunction";
 import ModalCustomVideo from "../Common/Modal/ModalCustom";
String.prototype.toEnglishDigit = function() { var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']; var replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; var replaceString = this; var regex; for (var i = 0; i < find.length; i++) { regex = new RegExp(find[i], "g"); replaceString = replaceString.replace(regex, replace[i]); } return replaceString; };
const FormLogin = (props) => {
    const   [isOpen,setIsOpen]= useState(false);
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
        return callback(false)
     };


    const handelSubmit = async (e) => {
        e.preventDefault();
        validateForm(async (validate)=>{

            if (validate){
                let englishNumber=values.phoneNumber.toString().toEnglishDigit() ;

                // let englishNumber=Number( englisghString.toString());
                // console.log("englishNumber")
                // console.log(englisghString.toString())
                // console.log(englisghString)



                loading(100, 1);
                let {state ,Description} = await GetLogin(englishNumber);
                // console.log(state ,Description)
                setTimeout(function(){
                    loading(50, 1);
                }, 1000);
                if (state===200 ) {
                    // NotificationManager.success("کد احاز هویت با موفقیت برای شما ارسال شد ", "موفق شدید ");
                    localStorage.setItem("phoneNumber_K",englishNumber);
                    let {state  ,Description } = await GetVerifycationCode(englishNumber);
                    if (state ===200){
                        // console.log(Description )
                        handelType("login");
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
        <div className="col-sm-12 col-md-6 h-100  overflow-hidden  p-0"     dir="rtl" >
            <div className="w-100 h-100  d-flex justify-content-center overflow-hidden">
                <div className="   col-10 col-xl-8   " style={{marginTop:'5.5rem'}}>
                    <p className="header-color FsHeaderLogin1 mb-0"  >{header}  </p>
                    <p className="header-color font-weight-bold  mb-2 mt-5 FsHeaderLogin2  " style={{ whiteSpace: "break-spaces"}}>{subHeader} </p>
                    <div className="row m-0  w-100">

                        <Col sm={12} className="d-flex   flex-column justify-content-between   ml-r-auto  p-0  ">
                            <Form onSubmit={handelSubmit} className="mt-login-form col-10 p-0 bgInput">

                                <TextInput onChange={onChange} label={'شماره تلفن همراه'} id={'phoneNumber'}
                                           placeholder={"****-***-**09"} type={"number"}
                                           is_required={false} value={values.phoneNumber}
                                           error={error.phoneNumber}/>


                                <button
                                    className="btn green-background  br10px text-white  h-input-s col-9 col-md-9 col-lg-6  sendButton-shadow mt-3 text-bold"
                                    type="submit">{btn_txt}
                                </button>
                                {/*{*/}
                                    {/*handelChangeForm === undefined ? "" :*/}
                                        {/*<p className="mt-3 FsFooterLogin">ثبت نام نکرده اید ؟<span*/}
                                            {/*// onClick={() => {handelChangeForm("signUp")}}*/}
                                            {/*onClick={()=>setIsOpen(!isOpen)}*/}


                                            {/*className="mt-2 cursor-pointer font-weight-bold">همین حالا ثبت نام کنید</span></p>*/}
                                {/*}*/}
                            </Form>

                        </Col>
                    </div>

                </div>
            </div>

            {/*<RestricSignUp isOpen={isOpen} toggle={()=>setIsOpen(!isOpen)} text={"متاسفانه در حال حاظر امکان ثبت نام وجود ندارد لطفا با پشتیبانی تماس بگیرید "}/>*/}

            <NotificationContainer />
        </div>
    );
};

export default FormLogin;