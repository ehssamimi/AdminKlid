import React, {useState, useContext, useEffect} from 'react';
import {SelectedInput, TextInput} from "../Common/Forms/textInput/TextInput";
import {Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import validator from "validator";
import {GetUserDropDown, GetVerifycationCode, Regestry} from "../functions/ServerConnection";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {validatephoneNumber} from "../functions/componentHelpFunction";
const FormSignUp = (props) => {

    let{header,subHeader ,btn_txt,handelType,handelChangeForm,loading}=props;
    const [values, setvalues] = useState({"name": "", "class": "", "fields": "","phoneNumber":""});
    const [nessesery, setNessesery] = useState(false);
    const [error, seterror] = useState({"name":"","class":"","fields":"","phoneNumber":""});
    const [options, setOptions] = useState({"school_type": [], "field_type": [], "grade_type": []});


    useEffect(  () => {
        async function getUserDropDown( ) {
            const {state, Description}=await GetUserDropDown();
            if (state===200 ) {
                const option={
                    "school_type":Description.school_type, "field_type":Description.field_type, "grade_type":Description.grade_type
                };
                console.log(Description.grade_type);
                setOptions(option);
            } else {
                NotificationManager.error(state, Description);
            }
        }
        getUserDropDown();


    },[]);
    const onChange = (value, names) => {

        setvalues({...values, [names]: value});
        // دهم"
        // 5: "یازدهم"
        // 6: "دوازدهم"
        // 7: "طرح"
        // 8: "طرح انسانی"
        // 9: "کنکوری (دوازدهم)"
        // 10: "فارغ التحصیل"
        if (names === "class") {
            if (value === "دهم" || value === "یازدهم" || value === "دوازدهم" || value === "طرح"|| value === "طرح انسانی"  || value === "فارغ التحصیل" || value === "دوازدهم (کنکوری)") {
                setNessesery(true);
            }else {
                setNessesery(false);
            }
        }

    };

    const validateForm=(callback)=> {
        let errors={"name":"","class":"","fields":"","phoneNumber":""};

        let formValidate=true;

        if (validator.isEmpty(values.name)) {
            formValidate = false;
            errors['name']="نام خود را وارد کنید ";
        }
        if (validator.isEmpty(values.phoneNumber)) {
            formValidate = false;
            errors['phoneNumber']="شماره تلفن همراه خود را وارد کنید  ";
        }else if (!validatephoneNumber(values.phoneNumber)) {
            formValidate = false;
            errors['phoneNumber']="شماره ای که وارد کرده اید غیر مجاز است !  ";
        }
        if (validator.isEmpty(values.class)) {
            formValidate = false;
            errors['class']="پایه تحصیلی خود را انتخاب کنید";
        }
        if (nessesery){
            if (validator.isEmpty(values.fields)) {
                formValidate = false;
                errors['fields']="پایه تحصیلی خود را انتخاب کنید";
            }
        }


        seterror(errors);
        return callback(formValidate)
    };


    const handelSubmit = async (e) => {
        e.preventDefault();
        validateForm(async (validate)=>{
            let englishNumber= values.phoneNumber.toString().toEnglishDigit();
            // console.log(englisghString);
            // let englishNumber=Number(englisghString);
            if (validate){
                console.log("send");
                loading(100,1);
                let Data= {
                    "personal_info": {
                    "phone_number":englishNumber.toString() ,
                        "name": values.name,
                        "ssn": ""
                },
                    "education": {
                    "grade": values.class,
                        "field": values.fields||"",
                        "gpa": 0,
                        "school_name": "",
                        "school_type": ""
                }
                };
                console.log(Data)
                loading(100, 1);
                let {state ,Description} = await Regestry(JSON.stringify(Data));
                console.log(state ,Description)
                setTimeout(function(){
                    loading(50, 1);
                    }, 1000);
                if (state===200 ) {
                    // NotificationManager.success("کد احاز هویت با موفقیت برای شما ارسال شد ", "موفق شدید ");
                    localStorage.setItem("phoneNumber_K",englishNumber)
                    let {state  ,Description } = await GetVerifycationCode(englishNumber);
                    if (state ===200){
                        console.log(Description )
                        handelType("register")
                        handelChangeForm("validate");
                    } else {
                        console.log("not validate Code");
                        NotificationManager.error(state , Description )
                    }

                } else {
                    NotificationManager.error(state, Description)
                }


            }else {
                console.log( 'error' )
                console.log( error )
            }
        })

    };


    return (
        <div className="col-sm-12 col-md-6  h-100  overflow-hidden p-0 mt-sign-form"    dir="rtl" >
            <div className="w-100 h-100  d-flex justify-content-center overflow-hidden">
                <div className=" col-10 col-xl-8  " style={{marginTop:'5.5rem'}}>
                    <p className="header-color FsHeaderLogin1 mb-0"  >{header}  </p>
                    <p className="header-color font-weight-bold  mb-2 mt-2 FsHeaderLogin2  " style={{ whiteSpace: "break-spaces"}}>{subHeader} </p>
                    <div className="row m-0  w-100">

                        <Col sm={12} className="d-flex   flex-column justify-content-between   ml-r-auto  p-0 ">
                            <Form onSubmit={handelSubmit} className="  col-10 p-0 bgInput" style={{marginTop:'2rem'}}>

                                <TextInput onChange={onChange} label={'شماره تلفن همراه'} id={'phoneNumber'}
                                           placeholder={"********09"} type={"number"}
                                           is_required={false} value={values.phoneNumber}
                                           error={error.phoneNumber}/>

                                <TextInput onChange={onChange} label={'نام و نام خانوادگی'} id={'name'}
                                           placeholder={"نام و نام خانوادگی"} type={"text"}  className={"mt-4"}
                                           is_required={false} value={values.name}
                                           error={error.name}/>

                                <SelectedInput onChange={onChange} label={'پایه تحصیلی'} id={'class'}
                                               type={"select"}  class_input={"mt-4"}
                                               is_required={false} value={values.class} options={options.grade_type}
                                               error={error.class}/>


                                {
                                    nessesery?
                                        <SelectedInput onChange={onChange} label={'رشته تحصیلی'} id={'fields'}
                                                       type={"select"} className={"mt-4"}
                                                       is_required={false} value={values.fields} options={options.field_type}
                                                       error={error.fields}/>:""
                                }


                                <button
                                    className="btn green-background  br10px text-white col-8 h-input-s   col-md-8 col-lg-5 sendButton-shadow mt-3"
                                    type="submit">{btn_txt}
                                </button>

                                {
                                    handelChangeForm === undefined ? "" :
                                        <p className="mt-3 FsFooterLogin">ثبت نام کرده اید ؟<span onClick={() => {
                                            handelChangeForm("login")
                                        }} className="mt-2 cursor-pointer font-weight-bold">وارد شوید</span></p>
                                }

                                {/*{*/}
                                    {/*handelChangeForm===undefined?"":<p  onClick={()=>{handelChangeForm("login")}}>همین الان ثبت نام کنید</p>*/}
                                {/*}*/}
                            </Form>

                        </Col>
                    </div>

                </div>
            </div>

            <NotificationContainer />
        </div>
    );
};

export default FormSignUp;