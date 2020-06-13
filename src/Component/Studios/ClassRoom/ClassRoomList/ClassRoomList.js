import React, {useState, useEffect} from 'react';
import {AddClassroom, Getallclassroom, GetUserDropDown} from "../../../functions/ServerConnection";
import {error_Notification, LabelValueOption, success_Notification} from "../../../functions/componentHelpFunction";
import {Card, CardBody} from "reactstrap";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {Form, Formik} from "formik";
import {FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";
import * as Yup from "yup";
import RowClassList from "./RowClassList";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../Common/Loader/Loader";
import PreviewUserCard from "../../../User/UserShowAll/Subs/PreviewUserCard";
const SignupSchema = Yup.object().shape({
    // grade: Yup.object()
    //     .required("پایه اجباری است !"),
    // field: Yup.object()
    //     .required("رشته اجباری است !"),
    // lesson_names: Yup.object()
    //     .required("درس اجباری است !"),

});
const ClassRoomList = (props) => {
    const [count, setCount] = useState(1);
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
        console.log("aaaaaa");

        const payload = {
            ...values,
        };
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
        await Getallclassroom(payload.grade.value,payload.field.value,payload.lesson_names.value);
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


                                        <div
                                            className=" col-sm-12 col-md-11  d-flex flex-column justify-content-between">
                                            <div className="w-100 row m-0 ">


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
                                                <FormSelect label='درس' option={LabelValueOption(Option.lesson_names)}
                                                            name='lesson_names'
                                                            placeHolder='در مورد نظر را وارد کنید' values={values}
                                                            DivClass="col-sm-4  " setFieldTouched={setFieldTouched}
                                                            setFieldValue={setFieldValue}
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

            <IsLoaderComponent isLoader={isLoader}>
                {/*<InfiniteScroll*/}
                    {/*className="row rtl m-0"*/}
                    {/*pageStart={0}*/}
                    {/*loadMore={loadMore}*/}
                    {/*hasMore={hasMore}*/}
                    {/*loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}*/}
                {/*>*/}
                    {/*<div className='col-6'  >*/}
                        {/*{productSeparate.length>0 && Array.isArray(productSeparate)  ?*/}
                            {/*productSeparate.map((todo, index) =>*/}
                                {/*<PreviewUserCard key={index} {...todo}/>*/}


                            {/*) : ''*/}
                        {/*}*/}
                    {/*</div>*/}
                {/*</InfiniteScroll>*/}

                <div className="col-6 ">
                    <RowClassList/>

                </div>
            </IsLoaderComponent>


        </div>
    );
};

export default ClassRoomList;