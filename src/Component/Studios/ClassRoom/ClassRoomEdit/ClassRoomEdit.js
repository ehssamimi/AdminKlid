import React, {useState, useEffect} from 'react';
import {
    AddClassroom,
    AddCourseDetail,
    AddFileToCourse, GetClassroom,
    GetUserDropDown, updateClassRoom,
    UpdateCourseDetail
} from "../../../functions/ServerConnection";
import {Card, CardBody, Collapse} from "reactstrap";
import Loader from "../../../Common/Loader/Loader";
import {Form, Formik} from "formik";
import ImgComponent from "../../../Common/ImgComponents/ImgComponent";
import AddPDf from "../../../Common/AddPdf/AddPDf";
import AddVideoConvert from "../../../Common/AddVideoConver/AddVideoConvert";
import PreviewVideoComponent from "../../../Common/PreviewVideoComponent/PreviewVideoComponent";
import {FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";
import {error_Notification, LabelValueOption, success_Notification} from "../../../functions/componentHelpFunction";
import * as Yup from "yup";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
const SignupSchema = Yup.object().shape({

    Name: Yup.string()
        .required("نام اجباری است!"),
    // grade: Yup.object()
    //     .required("پایه اجباری است !"),
    // field: Yup.object()
    //     .required("رشته اجباری است !"),
    // lesson_names: Yup.object()
    //     .required("درس اجباری است !"),
    price: Yup.number()
        .required("هزینه اجباری است !"),



});

const ClassRoomEdit = (props) => {
    const [isLoader, setIsLoader] = useState(true);
    const [class_id, setClass_id] = useState("");

    const [Option, setOptions] = useState({});
    const[initialValue,setInitialValue]=useState({Name:'' , grade: "", field: '',lesson_names:"",price:""});
    useEffect(() => {
        // Update the document title using the browser API
        async function  getDrops(){
            let{state ,Description}= await GetUserDropDown();
            setIsLoader(false);


            if (state===200 ) {
                setOptions(Description)
            } else {
                error_Notification(state, Description)
                // NotificationManager.error(state, Description);
            }
            let{field_type,grade_type,lesson_names}=Description


        }

        async function  getClassDetails(){

            let{match:{params}}=props;
            // console.log(params.id);
            setClass_id(params.id);
            let{state ,Description}= await GetClassroom(params.id);
            setIsLoader(false);
            // console.log(state);
            // console.log(Description);
            let{payment: {price}}=Description

            if (state===200 ) {
                setInitialValue({Name:"classical" , grade: {label:"دوره",value:"دوره"}, field:{label:"رشته",value:"رشته"} ,lesson_names:{label:"درس",value:"درس"} ,price:price})
             } else {
                error_Notification(state, Description)
                // NotificationManager.error(state, Description);
            }



        }
        getDrops();
        getClassDetails();

    },[props]);



    const handleSubmit = async (values, { setSubmitting }) => {


        const payload = {
            ...values,
        };


        // **********send validate data*********

        let Data = {
            "class_id": class_id,
            "payment": {
                "price": payload.price
            },
            "live_information": {
                "key": payload.Name
            }
        };

        setIsLoader(true);
        let{state,Description}= await updateClassRoom(Data);
        setIsLoader(false);
        if (state === 200) {
            success_Notification("کلاس مورد نظر به روز رسانی شد ");
            setInitialValue({Name:payload.Name , grade: {label:"دوره",value:"دوره"}, field:{label:"رشته",value:"رشته"} ,lesson_names:{label:"درس",value:"درس"} ,price:payload.price})

        } else {
            error_Notification(state, Description)
        }

    };
    console.log("initialValue")
    console.log(initialValue)


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
                                enableReinitialize
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
                                      // enableReinitialize=true,
                                      isSubmitting
                                  }) => (
                                    <Form className="av-tooltip tooltip-label-bottom w-100 row m-0">


                                        <div
                                            className=" col-sm-12 col-md-11  d-flex flex-column justify-content-between">
                                            <div className="w-100 row m-0 ">


                                                <FormSelect label='پایه'
                                                            // option={LabelValueOption(Option.grade_type)}
                                                            name='grade'
                                                            placeHolder='پایه خود را وارد کنید' values={values}
                                                            DivClass="col-sm-4  " setFieldTouched={setFieldTouched}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors} touched={touched}/>
                                                <FormSelect label='رشته'
                                                            // option={LabelValueOption(Option.field_type)}
                                                            name='field'
                                                            placeHolder='رشته خود را وارد کنید'
                                                            setFieldValue={setFieldValue}
                                                            DivClass="col-sm-4  " setFieldTouched={setFieldTouched}
                                                            values={values}
                                                            errors={errors} touched={touched}/>
                                                <FormSelect label='درس'
                                                            // option={LabelValueOption(Option.lesson_names)}
                                                            name='lesson_names'
                                                            placeHolder='در مورد نظر را وارد کنید' values={values}
                                                            DivClass="col-sm-4  " setFieldTouched={setFieldTouched}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors} touched={touched}/>
                                                <FormInput label='کلید' type='text' name='Name'
                                                           placeHolder='نام permission را وارد کنید !'
                                                           DivClass="col-sm-6  " setFieldTouched={setFieldTouched}
                                                           errors={errors} touched={touched}/>
                                                <FormInput label='هزینه' type='number' name='price'
                                                           placeHolder='هزینه کلاس رو وارد کنید !'
                                                           DivClass="col-sm-6  " setFieldTouched={setFieldTouched}
                                                           errors={errors} touched={touched}/>


                                            </div>
                                        </div>


                                        <div className="col-6 offset-3 ">
                                            <button className="btn btn-success text-center col-6 offset-3 "
                                                    type="submit">
                                                فرستادن
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

export default ClassRoomEdit;