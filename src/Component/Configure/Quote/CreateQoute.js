import React, {useState, useEffect} from 'react';
import {GetUserDropDown, RegestryUser, UpdateQoute} from "../../functions/ServerConnection";
import {NotificationContainer, NotificationManager} from "react-notifications";
import validator from "validator";
import {validatephoneNumber} from "../../functions/componentHelpFunction";
import Loader from "../../Common/Loader/Loader";
import {Col, Form} from "reactstrap";
import {SelectedInput, TextInput} from "../../Common/Forms/textInput/TextInput";
import IsLoaderComponent from "../../Common/ISLodader/IsLoader";

const CreateQoute = (props) => {
    const [isLoader, setIsLoader] = useState(false);
    let{header,subHeader ,btn_txt,handelType,handelChangeForm,loading}=props;
    const [values, setvalues] = useState({"name":"","text":""});
     const [error, seterror] = useState(  {"name":"","text":""});


    const onChange = (value, names) => {

        setvalues({...values, [names]: value});


    };

    const validateForm=(callback)=> {
        let errors= {"name":"","text":""};

        let formValidate=true;

        if (validator.isEmpty(values.name)) {
            formValidate = false;
            errors['name']="نام خود را وارد کنید ";
        }
           if (validator.isEmpty(values.text)) {
            formValidate = false;
            errors['text']="نام خود را وارد کنید ";
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

                let {state ,Description} = await UpdateQoute(values.name,values.text );
                setIsLoader(false);
                if (state===200){
                    props.updateContent()
                    NotificationManager.success("موفق شدید", "متن جدید با موفقیت ثبت شد");
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
            <IsLoaderComponent isLoader={isLoader}>
                <div className="col-sm-12    h-100  overflow-hidden p-0 mt-sign-form"    dir="rtl" >
                    <div className="w-100 h-100  d-flex justify-content-center overflow-hidden">

                        <div className="d-flex m-0 justify-content-between w-100">

                            <Col sm={12} className="d-flex   flex-column justify-content-between   ml-r-auto  p-0 ">
                                <Form onSubmit={handelSubmit} className="  col-12 p-0 bgInput row"
                                      style={{marginTop: '2rem'}}>
                                    <div className="w-100">

                                        <TextInput onChange={onChange} label={'نام '} id={'name'}
                                                   placeholder={"نام"} type={"text"} className={"mt-2"}
                                                   is_required={true} value={values.name} DivClass={"col-6"}
                                                   error={error.name}/>
                                    </div>



                                    <TextInput onChange={onChange} label={'متن '} id={'text'}
                                               placeholder={"متن را وارد کنید "} type={"text"} className={"mt-2"}
                                               is_required={true} value={values.text} DivClass={"col-12"}
                                               error={error.text}/>


                                    <div className="w-100 d-flex justify-content-start">
                                        <button
                                            className="btn green-background  br10px text-white col-2 h-input-s d-flex justify-content-center  sendButton-shadow mt-2"
                                            type="submit">ثبت
                                        </button>
                                    </div>




                                </Form>

                            </Col>
                        </div>


                    </div>

                    <NotificationContainer />
                </div>

            </IsLoaderComponent>




        </div>



    );
};

export default CreateQoute;