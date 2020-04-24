import React, { useState } from 'react';
import Loader from "../../../Common/Loader/Loader";
import {Card, CardBody, CardTitle , Row} from "reactstrap";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import {  Form, Formik} from "formik";
import {error_Notification, success_Notification } from "../../../functions/componentHelpFunction";
import * as Yup from "yup";
import {AddPermission} from "../../../functions/ServerConnection";
import {FormInput } from "../../../Common/ComponentFunctional/FormFeilds";

const SignupSchema = Yup.object().shape({

    Name: Yup.string()
        .required("نام اجباری است!"),

    Description: Yup.string()
        .required("توضیحات اجباری است!"),
});

const initialValue={
    Name:'',
    Description:"" ,
}

export default function CreatePermission (){
    const [initialValues,setInitialValues] =useState(initialValue);
    const [isLoder,setisLoder] =useState(false);
    const  handleSubmit = async (values, { setSubmitting }) => {
        console.log("start sending");
        console.log(values);

        const payload = {
            ...values,
            // isOff: values.isOff.value,
            // Category: values.Category.value,
            // sub_category: values.sub_category.value,
        };

// **************check its update or just add **********


            // **********send validate data*********
                setisLoder(true);

                let Data={
                   "permission_name": payload.Name,
                    "description": payload.Description
                };

                let Register = await AddPermission(JSON.stringify(Data));

                 setisLoder(false);

                let {state, Description} = Register;
                if (state===200 ) {
                    success_Notification( "اطلاعات شما با موفقیت ثبت شد")
                } else {
                    error_Notification(state, Description)
                }

    };


    return isLoder?   // *******checking for submit// *********
        <div className='d-flex justify-content-center align-items-center'>
            <div className='col-6'>
                <Loader/>
            </div>
        </div>
        :

    <div dir='rtl'>
        <Row className="mb-4">
            <Colxx xxs="12">
                <Card>
                    <CardBody>
                        <CardTitle>
                            <div className='d-flex justify-content-start'>
                                <span>ایجاد permission</span>
                            </div>
                        </CardTitle>
                        <Formik
                            initialValues={
                                initialValues
                            }
                            validationSchema={SignupSchema}
                            onSubmit={ handleSubmit}
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
                                <Form className="av-tooltip tooltip-label-bottom w-100 row m-0" >
                                    <div className="col-8 offset-2   d-flex flex-column justify-content-between">
                                        <div className="w-100 row m-0 ">

                                            <FormInput  label='نام' type='text' name='Name' placeHolder='نام permission را وارد کنید !' DivClass="col-sm-12  " setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                            <FormInput label='توضیحات' component='textarea' rows="4"  type='text' name='Description' placeHolder='توضیحات را وارد کنید' DivClass="col-sm-12 "  setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                        </div>
                                        <div className="w-100 ">
                                            <button className="btn btn-success text-center col-6 offset-3 " type="submit">
                                                فرستادن
                                            </button>
                                        </div>

                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
    </div>
};