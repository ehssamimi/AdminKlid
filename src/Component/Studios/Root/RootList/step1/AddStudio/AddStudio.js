import * as Yup from "yup";
import {Component} from "react";
import {
  AddStudios,
} from "../../../../../functions/ServerConnection";
import {
    error_Notification,
     success_Notification
} from "../../../../../functions/componentHelpFunction";
import HeaderAddCommon from "../../../../../Common/HeaderAddCommon/HeaderAddCommon";
import {Card, CardBody, Collapse} from "reactstrap";
import Loader from "../../../../../Common/Loader/Loader";
import {Form, Formik} from "formik";
 import {FormInput, FormSelect} from "../../../../../Common/ComponentFunctional/FormFeilds";
import React from "react";
import IsLoaderComponent from "../../../../../Common/ISLodader/IsLoader";

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
        let {state, Description} = await AddStudios(JSON.stringify(Data));
        if (state === 200) {
            success_Notification("اطلاعات شما با موفقیت ثبت شد");
            this.setState({
                isLoader: false
            });
            console.log("Description")
            console.log(Description)
           this.props.HandelAdd(Description.message)


        } else {
            error_Notification(state, Description);
            this.setState({
                isLoader: false
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
                            <IsLoaderComponent  isLoader={ isLoader}>
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

                                            <div className=" col-sm-12    d-flex flex-column justify-content-between">
                                                <div className="w-100 row m-0 ">

                                                    <FormInput label='نام' type='text' name='Name'
                                                               placeHolder='نام استودیو را وارد کنید !'
                                                               DivClass="col-10  " setFieldTouched={setFieldTouched}
                                                               errors={errors} touched={touched}/>


                                                    <button className="col-sm-2 col-md-1  h-100   ml-auto btn  text-center  br10px btn-outline-primary form-control "
                                                            type="submit">
                                                        ارسال
                                                    </button>


                                                </div>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                            </IsLoaderComponent>

                        </CardBody>
                    </Card>
                </Collapse>

            </div>
        );
    }
}

export default AddStudio;
