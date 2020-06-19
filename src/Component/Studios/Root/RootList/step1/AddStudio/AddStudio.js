import * as Yup from "yup";
import {Component} from "react";
import {
    AddCourseDetail,
    AddFileToCourse, AddStudios,
    GetUserDropDown,
    loadCourse,
    UpdateCourseDetail
} from "../../../../../functions/ServerConnection";
import {
    error_Notification,
    LabelValueOption,
    success_Notification
} from "../../../../../functions/componentHelpFunction";
import HeaderAddCommon from "../../../../../Common/HeaderAddCommon/HeaderAddCommon";
import {Card, CardBody, Collapse} from "reactstrap";
import Loader from "../../../../../Common/Loader/Loader";
import {Form, Formik} from "formik";
 import {FormInput, FormSelect} from "../../../../../Common/ComponentFunctional/FormFeilds";
import React from "react";

const SignupSchema = Yup.object().shape({

    Name: Yup.string()
        .required("نام اجباری است!"),



});




class AddStudio extends Component {

    constructor(props) {
        super(props);

        this.state={
            collapse:false,
            isLoader:false,error:{Name:'' },
            initialValue:{Name:'' },DefaultValue:{Name:'' } ,
            id:undefined,

        }
    }










    toggle = () => {
        this.setState((prevState) => ({
            collapse: !prevState.collapse
        }))
    };





    handleSubmit = async (values, { setSubmitting }) => {


                console.log("validate");




                const payload = {
                    ...values,
                };

                // **********send validate data*********
        console.log(payload)
        let Data={
            "name": payload.Name
        }

        //
                this.setState({
                    isLoader: true
                });
        let {state, Description}= await AddStudios(JSON.stringify(Data));
        if (state===200){
            success_Notification( "اطلاعات شما با موفقیت ثبت شد");
            this.setState({
                isLoader:false
            });


         } else {
            error_Notification(state,Description);
            this.setState({
                isLoader:false
            });
        }








    };


    render() {
        let{collapse,isLoader,initialValue,id }=this.state;




        return (
            <div>
                <HeaderAddCommon collapse={collapse} toggle={this.toggle}   item={"استودیو"} id={id} to={'/studio/root/list'}/>
                <Collapse
                    isOpen={collapse}
                    className="mt-3"
                    // onEntering={onEntering}
                    // onEntered={onEntered}
                    // onExiting={onExiting}
                    // onExited={onExited}
                >
                    <Card>
                        <CardBody>

                            {
                                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                                        <div className='col-6'>
                                            <Loader/>
                                        </div>
                                    </div> :
                                    <Formik
                                        initialValues={
                                            initialValue
                                        }
                                        validationSchema={SignupSchema}
                                        onSubmit={this.handleSubmit}
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

                                                <div className=" col-sm-12 col-md-8  d-flex flex-column justify-content-between">
                                                    <div className="w-100 row m-0 ">

                                                        <FormInput label='نام' type='text' name='Name'
                                                                   placeHolder='نام استودیو را وارد کنید !'
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
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
                            }
                        </CardBody>
                    </Card>
                </Collapse>

            </div>
        );
    }
}

export default AddStudio;
