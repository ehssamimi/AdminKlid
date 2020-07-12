import React, {useState, useEffect} from 'react';
import * as Yup from "yup";
import {AddClassroom, AddPackage, GetUserDropDown} from "../../../functions/ServerConnection";
import {error_Notification, LabelValueOption, success_Notification} from "../../../functions/componentHelpFunction";
import {Card, CardBody} from "reactstrap";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {Form, Formik} from "formik";
import {FormCheckBox, FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";



const SignupSchema = Yup.object().shape({

    Name: Yup.string()
        .required("نام اجباری است!"),
    grade: Yup.object()
        .required("پایه اجباری است !"),
    field: Yup.object()
        .required("رشته اجباری است !"),
    isActive: Yup.string().required("A radio option is required"),

});
const options = [

    { value: "نیست", label: "نیست" },
    { value: "هست", label: "هست" }
];

const PackageCreate = (props) => {
    const [isLoader, setIsLoader] = useState(true);
    const [Option, setOptions] = useState({});
    const[initialValue,setInitialValue]=useState({Name:'' , grade: "", field: '',isActive: ""});
    useEffect(() => {
        // Update the document title using the browser API
        async function  getDrops(){
            let{state ,Description}= await GetUserDropDown();
            setIsLoader(false);
            console.log(state);
            console.log(Description);

            if (state===200 ) {
                setOptions(Description)
            } else {
                error_Notification(state, Description)
                // NotificationManager.error(state, Description);
            }
            let{field_type,grade_type,lesson_names}=Description


        }
        getDrops();

    },[]);



    const handleSubmit = async (values, { setSubmitting }) => {


        const payload = {
            ...values,
        };
        console.log("payload");
        console.log(payload);

        // **********send validate data*********

        let Data= {
            "name": payload.Name,
            "information": {
            "grade": payload.grade.value,
                "field": payload.field.value
        },
            "is_active": payload.isActive !== "نیست"
        };
        console.log(Data);
        setIsLoader(true);
        let{state,Description}= await AddPackage(JSON.stringify(Data));
        setIsLoader(false);
        if (state === 200) {
            success_Notification("پکیج مورد نظر ثبت شده است ")
        } else {
            error_Notification(state, Description)
        }

    };


    return (
        <div>
            <Card>
                <CardBody>

                    {
                        <IsLoaderComponent isLoader={isLoader} >
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
                                        <div className="col-12 mb-3">
                                            <h2>ایجاد پکیج</h2>
                                        </div>


                                        <div
                                            className=" col-sm-12 col-md-11  d-flex flex-column justify-content-between pl-1">
                                            <div className="w-100 row m-0 ">
                                                <div className="w-100">
                                                    <FormInput label='نام' type='text' name='Name'
                                                               placeHolder='نام پکیج را وارد کنید !'
                                                               DivClass="col-sm-6  " setFieldTouched={setFieldTouched}
                                                               errors={errors} touched={touched}/>
                                                </div>

                                                <FormSelect label='پایه' option={LabelValueOption(Option.grade_type)}
                                                            name='grade'
                                                            placeHolder='پایه خود را وارد کنید' values={values}
                                                            DivClass="col-sm-4  " setFieldTouched={setFieldTouched}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors} touched={touched}/>
                                                <FormSelect label='رشته' option={LabelValueOption(Option.field_type)}
                                                            name='field'
                                                            placeHolder='رشته خود را وارد کنید'
                                                            setFieldValue={setFieldValue}
                                                            DivClass="col-sm-4  " setFieldTouched={setFieldTouched}
                                                            values={values}
                                                            errors={errors} touched={touched}/>

                                                <FormCheckBox label='فعال ' type='number' name='isActive'
                                                              placeHolder='زمان تقریبی اتمام قسمت  زارا وارد کنید'
                                                              DivClass="col-sm-4  " values={values} option={options}
                                                              setFieldTouched={setFieldTouched} setFieldValue={setFieldValue}
                                                              errors={errors} touched={touched}/>

                                            </div>
                                        </div>


                                        <div className="col-6 offset-3 ">
                                            <button className="btn btn-success text-center col-6 offset-3 "
                                                    type="submit">
                                                ارسال
                                            </button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </IsLoaderComponent>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

 export default PackageCreate;