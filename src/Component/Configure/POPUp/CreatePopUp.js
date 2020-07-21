import React, {useState, useEffect} from 'react';
import {Card, CardBody} from 'reactstrap';
import {Form, Formik} from "formik";

import {FormInput, FormSelect} from "../../Common/ComponentFunctional/FormFeilds";
import {error_Notification, LabelValueOption, success_Notification} from "../../functions/componentHelpFunction";
import * as Yup from "yup";
import {AddModal} from "../../functions/ServerConnection";
import IsLoaderComponent from "../../Common/ISLodader/IsLoader";
const SignupSchema = Yup.object().shape({
    // Name: Yup.string()
    //     .required("نام اجباری است!"),
    Description: Yup.string()
        .required("توضیحات اجباری است!"),

});
const Option=['homepage', 'user_panel', 'course_page']

const CreatePopUp = (props) => {
    const [initialValue, setInitialValue] = useState( {location:'', Description:""});
    const [isLoader, setIsLoader] = useState( false);

        useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    const handleSubmit= async (values, { setSubmitting }) => {
        const payload = {
            ...values,
        };
        console.log("Submitv ")
        console.log(payload);
        // action,data
        let data={
            "location": payload.location.value,
            "text": payload.Description
        }
        setIsLoader(true)
        let{state,Description}=await AddModal("add",JSON.stringify(data))
        setIsLoader(false)
        if (state===200){
            success_Notification("پیام ورودی جدید ثبت شد ")
        }else {
            error_Notification(state,Description)
        }
        // Description: "aa aa"
        // location: {value: "course_page", label: "course_page"}


    }

    return (
        <div>
            <Card>
                <CardBody>

                    <IsLoaderComponent isLoader={isLoader}>
                        <Formik
                            initialValues={
                                initialValue
                            }
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                  handleSubmit,
                                  setFieldValue,
                                  setFieldTouched,
                                  handleChange,
                                  handleBlur,
                                  values,
                                  errors,
                                  touched,
                                  isSubmitting
                              }) => (
                                <Form className="av-tooltip tooltip-label-bottom w-100 row m-0">

                                    <div className=" col-sm-12    d-flex flex-column justify-content-between">
                                        <div className="w-100 row m-0 ">


                                            <FormSelect label='مقصد ' option={LabelValueOption(Option) } name='location'
                                                        placeHolder='مقصد خود را انتخاب کنبد' values={values}
                                                        DivClass="col-sm-6  " setFieldTouched={setFieldTouched} setFieldValue={setFieldValue}
                                                        errors={errors} touched={touched}/>



                                            <FormInput label='توضیحات' component='textarea' rows="4" type='text'
                                                       name='Description' placeHolder='توضیحات را وارد کنید'
                                                       DivClass="col-sm-12 " setFieldTouched={setFieldTouched}
                                                       errors={errors} touched={touched}/>



                                        </div>
                                    </div>


                                    <div className="col-6 offset-3 ">
                                        <button className="btn fS1vw btn btn-outline-primary text-center col-6 offset-3 "
                                                type="submit">
                                            ارسال
                                        </button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </IsLoaderComponent>

                </CardBody>
            </Card>


        </div>
    );
};

export default CreatePopUp;