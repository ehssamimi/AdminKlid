import React, {useState, useContext, useEffect} from 'react';
import {SelectedInput, TextInput} from "../Common/Forms/textInput/TextInput";
import {Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import validator from "validator";
import {
    GetUserDropDown,
    GetVerifycationCode,
    Regestry,
    ResendVerifycationCode, Verify
} from "../functions/ServerConnection";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {UserContext} from "../Common/Context/UserProvider";
import {useHistory} from "react-router-dom";
const VerificationState = (props) => {
    let User=useContext(UserContext);
    let{header,subHeader ,btn_txt,type,handelChangeForm,loading}=props;
    const [values, setvalues] = useState({"verificationCode": "" });

    const [error, seterror] = useState({"verificationCode":"" });
    const [count, setCount] = useState( 60  );
    const history = useHistory();

    useEffect(  () => {

        countFunction()

    },[]);


    const countFunction=()=>{
        setInterval(function () {
            setCount(preCount=>preCount-1)
        },1000)
    };


    const onChange = (value, names) => {

        setvalues({...values, [names]: value});

    };

    const validateForm=(callback)=> {
        let errors={"verificationCode":"" };

        let formValidate=true;

        if (validator.isEmpty(values.verificationCode)) {
            formValidate = false;
            errors['verificationCode']="کد ارسالی به تلفن همراه خود را وارد کنید ";
        }

        seterror(errors);
        return callback(formValidate)
    };



    const handelSubmit = async (e) => {
        e.preventDefault();
        validateForm(async (validate)=>{

            if (validate){
                let VerificationCode=values.verificationCode.toString().toEnglishDigit();
                // let VerificationCode=Number(VerificationCodeString);



                console.log("کد فعال سازی");
                console.log( "type : "+type);
                console.log( "phoneNumber : "+localStorage.getItem("phoneNumber_K"));
                console.log( "cooe : "+VerificationCode);
                loading(100,1);


                let {state ,Description} = await Verify(type,localStorage.getItem("phoneNumber_K"),VerificationCode);
                console.log(state ,Description);

                 if (state===200 ) {
                    localStorage.setItem("token",Description.token);
                     let home= document.getElementById("UserAccess");
                     User.HandelLogin();
                     home.click();


                    //  history.push('/user-info');
                    // handelChangeForm("Profile");

                } else {
                    NotificationManager.error(state, Description);
                     setTimeout(function(){
                         loading(50, 1);

                     }, 1000);
                 }

            }else {
                console.log( 'error' )
                console.log( error )
            }
        })

    };
    const HandelResend = async (e) => {
        e.preventDefault();
        let {state ,Description} = await ResendVerifycationCode(localStorage.getItem("phoneNumber_K"));
        setCount(60);
        if (state===200 ) {
                NotificationManager.success("کد احاز هویت با موفقیت برای شما ارسال شد ", "موفق شدید ");
                console.log(Description);
        }else {
                NotificationManager.error(Description, state);
        }

    };


    return (
        <div className="col-sm-12 col-md-6 h-100  overflow-hidden   "     dir="rtl" >
            <div className="w-100 h-100  d-flex justify-content-center overflow-hidden">
                <div className="  col-10 col-xl-8 " style={{marginTop:'5.5rem'}}>
                    <p className="header-color FsHeaderLogin1 mb-0">{header}  </p>
                    <p className="header-color font-weight-bold  mb-2 mt-5 FsHeaderLogin2  " style={{ whiteSpace: "break-spaces"}}>{subHeader} </p>
                    <div className="row m-0  w-100">

                        <Col sm={12} className="d-flex   flex-column justify-content-between   ml-r-auto  p-0 ">
                            <Form onSubmit={handelSubmit} className="mt-login-form col-10 p-0 bgInput">

                                <TextInput onChange={onChange} label={"کد فعال سازی"} id={'verificationCode'}
                                           placeholder={"کد چهار رقمی"} type={"number"}
                                           is_required={false} value={values.verificationCode}
                                           error={error.verificationCode}/>
                                {
                                    count<0?<p onClick={HandelResend} className="">ارسال دوباره کد </p>:<p className="FsFooterLogin mt-2 color-placeHolder">ارسال مجدد کد فعال سازی تا {count} ثانیه </p>
                                }

                                <button
                                    className="btn green-background  br10px text-white col-8 h-input-s col-md-6 col-sm-12 sendButton-shadow  "
                                    type="submit">{btn_txt}
                                </button>


                            </Form>

                        </Col>
                    </div>

                </div>
            </div>
            <a href="/"  id="UserAccess" className="d-none">go user profile</a>

            <NotificationContainer />
        </div>
    );
};

export default VerificationState;