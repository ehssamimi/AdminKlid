import React, {useState, useEffect} from 'react';
import {  GetUserDropDown} from "../../../functions/ServerConnection";
import {error_Notification, LabelValueOption } from "../../../functions/componentHelpFunction";
import {Card , CardTitle} from "reactstrap";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {Form, Formik} from "formik";
import { FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";
import * as Yup from "yup";
 import ClassRoomLoader from "./ClassRoomLoader/ClassRoomLoader";
const SignupSchema = Yup.object().shape({
    // grade: Yup.object()
    //     .required("پایه اجباری است !"),
    // field: Yup.object()
    //     .required("رشته اجباری است !"),
    // lesson_names: Yup.object()
    //     .required("درس اجباری است !"),

});
const ClassRoomList = (props) => {
    const [IsLoadComponents, setIsLoadComponents] = useState(false);
    const [isLoader, setIsLoader] = useState(true);
    const [Option, setOptions] = useState({});
    const[initialValue,setInitialValue]=useState({  grade: '', field: '',lesson_names:"" });



    useEffect(() => {
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
    const handleSubmit = async (values, {setSubmitting}) => {


        const payload = {
            ...values,
        };
        setInitialValue({  grade: payload.grade.value, field: payload.field.value,lesson_names:payload.lesson_names.value });
        console.log("validate");
        console.log( payload );
        setIsLoadComponents(true);
        // console.log(payload);

        // **********send validate data*********

        // let Data={
        //     "information": {
        //         "grade": payload.grade.value,
        //         "field": payload.field.value,
        //         "lesson_name":payload.lesson_names.value
        //     },
        //     "payment": {
        //         "price": payload.price
        //     },
        //     "live_information": {
        //         "key": payload.Name
        //     },
        //     "time_range": {
        //         "start": {
        //             "year": 0,
        //             "month": 0,
        //             "day": 0,
        //             "hour": 0,
        //             "minute": 0
        //         },
        //         "end": {
        //             "year": 0,
        //             "month": 0,
        //             "day": 0,
        //             "hour": 0,
        //             "minute": 0
        //         }
        //     }
        // };
        // setIsLoader(true);
        // let{state,Description}= await Getallclassroom(payload.grade.value,payload.field.value,payload.lesson_names.value);
        // await Getallclassroom(payload.grade.value,payload.field.value,payload.lesson_names.value);
        // setIsLoader(false);
        // if (state === 200) {
        //     success_Notification("کلاس مورد نظر ثبت شده است ")
        // } else {
        //     error_Notification(state, Description)
        // }

    };



    return (
        <div>
            <Card>
                <div className={ props.type==="selected"?"card-body":"card-body"}>
                    <CardTitle>
                        <span>انتخاب کلاس</span>
                    </CardTitle>
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
                                      touched
                                   }) => (
                                    <Form className="av-tooltip tooltip-label-bottom w-100 row m-0">


                                        <div
                                            className=" col-sm-12 col-md-11  d-flex flex-column justify-content-between p-0">
                                            <div className="w-100 row m-0 ">


                                                <FormSelect label='پایه' option={LabelValueOption(Option.grade_type)}
                                                            name='grade'
                                                            placeHolder='پایه خود را وارد کنید' values={values}
                                                            DivClass={props.type==="selected"?"col-12 p-0":"col-sm-12 col-md-4  "} setFieldTouched={setFieldTouched}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors} touched={touched}/>
                                                <FormSelect label='رشته' option={LabelValueOption(Option.field_type)}
                                                            name='field'
                                                            placeHolder='رشته خود را وارد کنید'
                                                            setFieldValue={setFieldValue}
                                                            DivClass={props.type==="selected"?"col-12 p-0":"col-sm-12 col-md-4  "} setFieldTouched={setFieldTouched}
                                                            values={values}
                                                            errors={errors} touched={touched}/>
                                                <FormSelect label='درس' option={LabelValueOption(Option.lesson_names)}
                                                            name='lesson_names'
                                                            placeHolder='در مورد نظر را وارد کنید' values={values}
                                                            DivClass={props.type==="selected"?"col-12 p-0":"col-sm-12 col-md-4  "} setFieldTouched={setFieldTouched}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors} touched={touched}/>

                                            </div>
                                        </div>


                                        <div className={props.type==="selected"?"col-12 p-0":"col-6 offset-3 "} >
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
                </div>
            </Card>
            {
                IsLoadComponents ?
                    <ClassRoomLoader  attributes={initialValue} {...props} />
                    : ""
            }


        </div>
    );
};

export default ClassRoomList;