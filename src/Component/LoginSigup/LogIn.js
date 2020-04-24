import React, {useState ,useRef} from 'react';
import logo from './../Common/img/Logo.png'

import { TweenMax} from "gsap/TweenMax";
import  { Link } from 'react-router-dom'


import FormSignUp from "./FormSignUp";

import VerificationState from "./VerificationState";
import FormLogin from "./FormLogin";
const Login = (props) => {
    const Redirect = useRef(null);

    const[formType,setformType]=useState("login");
    const [type, setType] = useState("");

    const ActiveLoader=(value,duration)=>{
        const $el = document.getElementById(`img-bg-login`);

        if (value===0){
            TweenMax.to($el, duration, {width: '0'});
        }else if(value===50){
            TweenMax.to($el, duration, {width: '50%'});
        }else if (value===100){
            TweenMax.to($el, duration, {width: '100%'});
        }
    };
    const handelChangeForm=(value)=>{

        if (value==="signUp"||value==="login"){
            ActiveLoader(100,1);
            setTimeout(function(){  ActiveLoader(50, 1); }, 1000);
            setTimeout(function(){    setformType(value); }, 700);

        }else {
            console.log(value);
            setformType(value);
        }
    };


    const handelType=async (type)=>{
        setType(type)

        // Redirect.current.click();
    }

    return (
        <div className="row w-100   overflow-hidden justify-content-end wrapper-login min-h-100vh ">
            <div className="  h-100 bg-login d-flex justify-content-center align-items-center    "
                style={{width:'50%', overFlow:"hidden"}} id="img-bg-login">

                <div className="">
                    <img src={logo} alt="logo" className="logo-login"/>
                </div>

            </div>

            {

                    <div className="w-100  d-flex justify-content-start">


                        {formType==="login"? <FormLogin header={"خوش  آمدید به"} subHeader={"آکادمی آنلاین کلید "}  handelType={handelType}
                                                        btn_txt={"ارسال کد تایید"} handelChangeForm={handelChangeForm} loading={ActiveLoader}  />:""}


                        {formType==="signUp"? <FormSignUp header={"خوش  آمدید به"} subHeader={"آکادمی آنلاین کلید "}  handelType={handelType}
                                                          btn_txt={"ارسال کد تایید"} handelChangeForm={handelChangeForm} loading={ActiveLoader}/>:""}


                         {formType==="validate"?  <VerificationState header={" ادامه بدهید ..."} subHeader={"تقریبا تمومه"} type={type}
                                                                       btn_txt={"ورود"} loading={ActiveLoader}  handelChangeForm={handelChangeForm}/>:""}


                     </div>

            }




            <Link to='/access-level'  className="d-none" ref={Redirect} />


        </div>
    );
};

export default Login;