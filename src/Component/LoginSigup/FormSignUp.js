import React, {useState, useContext, useEffect} from 'react';
import {SelectedInput, TextInput} from "../Common/Forms/textInput/TextInput";
import {Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import validator from "validator";
import {GetUserDropDown, GetVerifycationCode, Regestry, RegestryUser} from "../functions/ServerConnection";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {validatephoneNumber} from "../functions/componentHelpFunction";
import Loader from "../Common/Loader/Loader";
const FormSignUp = (props) => {
    const [isLoader, setIsLoader] = useState(false);
    let{header,subHeader ,btn_txt,handelType,handelChangeForm,loading}=props;
    const [values, setvalues] = useState({"name":"","class":"","fields":"","phoneNumber":"","ID":"","average_num":"","Schoolkind":"","schoolName":""});
    const [nessesery, setNessesery] = useState(false);
    const [error, seterror] = useState({"name":"","class":"","fields":"","phoneNumber":"","ID":"","average_num":"","Schoolkind":"","schoolName":""});
    const [options, setOptions] = useState({"school_type": [], "field_type": [], "grade_type": []});

     useEffect(  () => {
        async function getUserDropDown( ) {
            setIsLoader(true);
            const {state, Description}=await GetUserDropDown();
            setIsLoader(false);
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

        if (names === "class") {
            if (value === "دهم" || value === "یازدهم" || value === "دوازدهم" || value === "طرح"|| value === "طرح انسانی"  || value === "فارغ التحصیل" || value === "کنکوری (دوازدهم)") {
                setNessesery(true);
            }else {
                setNessesery(false);
            }
        }

    };

    const validateForm=(callback)=> {
        let errors={"name":"","class":"","fields":"","phoneNumber":"","ID":"","average_num":"","Schoolkind":"","schoolName":""};

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
             // console.log(englisghString);
            // let englishNumber=Number(englisghString);

            // "name":"","class":"","fields":"","phoneNumber":"","ID":"","average_num":"","Schoolkind":"","schoolName":""
            if (validate){
                setIsLoader(true);
                 let Data= {
                    "personal_info": {
                    "phone_number":values.phoneNumber.toString() ,
                        "name": values.name,
                        "ssn": values.ID||""
                },
                    "education": {
                        "grade": values.class,
                        "field": values.fields || "",
                        "gpa": values.average_num || 0,
                        "school_name": values.schoolName || "",
                        "school_type": values.Schoolkind || ""
                    }
                };
                console.log("Data");
                console.log(Data);

                 let {state ,Description} = await RegestryUser(JSON.stringify(Data));
                setIsLoader(false);
                 if (state===200){
                     NotificationManager.success("موفق شدید", "کاربر جدید با موفقیت ثبت شد");
                 } else {
                     NotificationManager.error(state, Description);
                     console.log(state, Description)
                 }




            }else {
                console.log( 'error' );
                console.log( error );
            }
        })

    };


    return (
        <div className="w-100">
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                    <div className='col-6'>
                        <Loader/>
                    </div>
                </div> :

                    <div className="col-sm-12    h-100  overflow-hidden p-0 mt-sign-form"    dir="rtl" >
                        <div className="w-100 h-100  d-flex justify-content-center overflow-hidden">

                            <div className="d-flex m-0 justify-content-between w-100">

                                <Col sm={12} className="d-flex   flex-column justify-content-between   ml-r-auto  p-0 ">
                                    <Form onSubmit={handelSubmit} className="  col-12 p-0 bgInput row"
                                          style={{marginTop: '2rem'}}>

                                        <TextInput onChange={onChange} label={'شماره تلفن همراه'} id={'phoneNumber'}
                                                   placeholder={"********09"} type={"number"} DivClass={"col-6"}
                                                   is_required={true} value={values.phoneNumber}
                                                   error={error.phoneNumber}/>

                                        <TextInput onChange={onChange} label={'نام و نام خانوادگی'} id={'name'}
                                                   placeholder={"نام و نام خانوادگی"} type={"text"} className={"mt-4"}
                                                   is_required={true} value={values.name} DivClass={"col-6"}
                                                   error={error.name}/>
                                        <div className="col-12 row">

                                            <SelectedInput onChange={onChange} label={'پایه تحصیلی'} id={'class'}
                                                           type={"select"} className={"mt-4 "} DivClass={"col-6 padding-l-0"}
                                                           is_required={true} value={values.class} options={options.grade_type}
                                                           error={error.class}/>

                                            {
                                                nessesery ?
                                                    <SelectedInput onChange={onChange} label={'رشته تحصیلی'} id={'fields'}
                                                                   type={"select"} className={"mt-4 "} DivClass={"col-6    padding-r-0 pl-sm-4"}
                                                                   is_required={true} value={values.fields}
                                                                   options={options.field_type}
                                                                   error={error.fields}/> : ""
                                            }
                                        </div>


                                        <TextInput onChange={onChange} label={'نام مدرسه'} id={'schoolName'}
                                                   placeholder={"نام مدرسه"} type={"text"} is_required={false}
                                                   value={values.schoolName} className={"mt-4"} DivClass={"col-6"}
                                                   error={error.schoolName}/>
                                        <SelectedInput onChange={onChange} label={'نوع مدرسه '}
                                                       id={'Schoolkind'} className={"mt-4 "}
                                                       type={"select"} is_required={false}
                                                       value={values.Schoolkind} DivClass={"col-6"}
                                                       error={error.Schoolkind} options={options.school_type}/>
                                        <TextInput onChange={onChange} label={'شماره ملی'} id={'ID'}
                                                   placeholder={"شماره ملی"} type={"number"} is_required={false}
                                                   value={values.ID} className={"mt-4"} DivClass={"col-6"}
                                                   error={error.ID}/>

                                        <TextInput onChange={onChange} label={'معدل سال تحصیلی قبل'}
                                                   id={'average_num'} className={"mt-4"} DivClass={"col-6"}
                                                   placeholder={"معدل"} type={"number"}
                                                   is_required={false} value={values.average_num}
                                                   error={error.average_num}/>

                                        <div className="w-100 d-flex justify-content-center">
                                            <button
                                                className="btn green-background  br10px text-white col-4 h-input-s d-flex justify-content-center  sendButton-shadow mt-3"
                                                type="submit">ثبت کاربر جدید
                                            </button>
                                        </div>

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

                        <NotificationContainer />
                    </div>
            }
        </div>



    );
};

export default FormSignUp;