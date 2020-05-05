 import React, {Component} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {Form, Formik} from "formik";
import {FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";
import {
    AddCourseDetail, AddFileToCourse, AddFileToLesson, AddLessonUrl,
    AddPermission,
    GetUserDropDown,
    loadCourse,
    loadMainCourse, UpdateCourseDetail, UpdateLessonDetail
} from "../../../functions/ServerConnection";
import {
    error_Notification,
    LabelValueOption,
    success_Notification,
    validatephoneNumber
} from "../../../functions/componentHelpFunction";
import * as Yup from "yup";
// import {NotificationManager} from "react-notifications";
 import ax from './../../../Common/img/deault.svg'

import ImgComponent from "../../../Common/ImgComponents/ImgComponent";
import AddPDf from "../../../Common/AddPdf/AddPDf";
import Loader from "../../../Common/Loader/Loader";
 import AddVideoConvert from "../../../Common/AddVideoConver/AddVideoConvert";
 import {Link} from "react-router-dom";
 import HeaderAddCommon from "../../../Common/HeaderAddCommon/HeaderAddCommon";

const SignupSchema = Yup.object().shape({

    name: Yup.string()
        .required("نام اجباری است!"),
    price: Yup.number().required("قیمت اجباری است!").moreThan(  1, "باید بیشتر از یک باشد ").positive("باید بزرگتر از صفر باشد "),
    chapter_count: Yup.number().required("تعداد فصول اجباری است!").moreThan(  1, "باید بیشتر از یک باشد ").positive("باید بزرگتر از صفر باشد "),
    additional_percentage_course: Yup.number()
        .required("درصد مازاد دوره اجباری است!").lessThan(  1, "باید کمتر از یک باشد ").positive("باید بزرگتر از صفر باشد "),
    additional_percentage_chapters: Yup.number()
        .required("درصد مازاد فصل اجباری است!").lessThan(  1, "باید کمتر از یک باشد ").positive("باید بزرگتر از صفر باشد "),


});





class AddLesson extends Component {
    constructor(props) {
        super(props);

        this.state={
            collapse:false,
            isLoader:false,
            initialValue:{name:'', price:"",chapter_count:'', additional_percentage_course:"",additional_percentage_chapters:''  },DefaultValue:{name:'', price:"",chapter_count:'', additional_percentage_course:"",additional_percentage_chapters:''  },
            Img:{"img_data":{"main":undefined},"img_file":{"main":undefined }},
            id:props.id,EditCourse:undefined ,
            FileError:{"main":"", "pdf":""},model:false,
            func1:this.updateValues.bind(this)
        }
    }
    async componentDidMount(props){

    }

    static getDerivedStateFromProps(props, state) {

        if (props.index !== state.EditCourse) {
            console.log("ffffffffffffffffffffffffff");
            console.log("props.index");
            console.log(props.index);
            return {
               model:state.func1(props.index)
            };
        }
        // Return null if the state hasn't changed
        return null;
    }




    async  componentDidUpdate(props){



        // if (this.state.EditCourse=undefined) {
        //     console.log("component did mount")
        //     this.setState({
        //         initialValue:{name:'', price:"",chapter_count:'', additional_percentage_course:"",additional_percentage_chapters:''  }
        //         ,DefaultValue:{name:'', price:"",chapter_count:'', additional_percentage_course:"",additional_percentage_chapters:''  },
        //         Img:{"img_data":{"main":undefined},"img_file":{"main":undefined }}
        //     });
        // }


    }

    updateValues = async (index) => {
        console.log("we are in update ");
        this.setState({
            collapse: true, EditCourse: index, isLoader: true
        });
        if (index!==undefined){
            const {state, Description} = await loadCourse(this.state.id);
            let EditCourse = Description.lessons[index];
            let Img = {"img_data": {"main": EditCourse.image}, "img_file": {"main": undefined}};


            let Data = {
                name: EditCourse.name,
                price: EditCourse.price,
                chapter_count: EditCourse.chapter_count,
                additional_percentage_course: EditCourse.additional_percentage_course,
                additional_percentage_chapters: EditCourse.additional_percentage_chapters
            };

            this.setState({
                initialValue: Data, DefaultValue: Data, isLoader: false, Img
            });

        }else {
            const {state, Description} = await loadCourse(this.state.id);

            let Data = {
                name: "",
                price: "",
                chapter_count: "",
                additional_percentage_course: "",
                additional_percentage_chapters: ""
            };
            let Img = {"img_data": {"main": undefined}, "img_file": {"main": undefined}};

            this.setState({
                initialValue:Data,DefaultValue:Data , Img ,isLoader: false
            });
        }
        return true;



    }


    toggle = () => {
        this.setState((prevState) => ({
            collapse: !prevState.collapse
        }))
    };


    validateForm=(callback)=> {
        // let errors={"name":"","class":"","fields":"","phoneNumber":""};
        let FileError={"main":"" };
        let{Img: {img_data,img_file} }=this.state;

        let formValidate=true;
        if (this.state.EditCourse === undefined) {
            if (img_file.main===undefined) {
                formValidate = false;
                FileError['main'] = "عکس اصلی باید انتخاب شود ";
            }


        }
        // console.log("FileError");
        // console.log(FileError);

        this.setState({
            FileError
        })
        return callback(formValidate)
    };


    handleSubmit = async (values, { setSubmitting }) => {

        this.validateForm(async (validate)=> {
            if (validate) {


                const payload = {
                    ...values,
                };

                // **********send validate data*********

                this.setState({
                    isLoader: true
                });
                // let Data = {
                //             "course_id": this.state.id,
                //             "name": payload.name,
                //             "price": payload.price,
                //             "chapter_count": payload.chapter_count,
                //             "additional_percentage_course": payload.additional_percentage_course,
                //             "additional_percentage_chapters": payload.additional_percentage_chapters
                //         };
                // console.log("axxxxxxxxxxx");
                // console.log(this.state.Img.img_file['main']);
                // console.log("Data");
                // console.log(Data);






                 if (this.state.EditCourse===undefined){
                    let Data = {
                        "course_id": this.state.id,
                        "name": payload.name,
                        "price": payload.price,
                        "chapter_count": payload.chapter_count,
                        "additional_percentage_course": payload.additional_percentage_course,
                        "additional_percentage_chapters": payload.additional_percentage_chapters
                    };
                    let {state, Description}= await AddLessonUrl(JSON.stringify(Data));
                    if (state===200 ) {
                        // let{course_id}=Description;
                        let {state:state2, Description:Description2}= await AddFileToLesson(this.state.Img.img_file['main'],this.state.id,'lesson_image',payload.name);
                        if (state2===200) {
                            success_Notification("درس مورد نظر با موفقیت به پایان رسید");
                            this.setState({
                                isLoader:false
                            });
                            this.props.updateContent();
                        }else{

                            error_Notification(state2, Description2);
                            this.setState({
                                isLoader:false
                            });
                        }
                    } else {
                        error_Notification(state , Description );
                        this.setState({
                            isLoader:false
                        });
                    }
                } else {

                     console.log("this.state.update course");


                     // console.log(this.state.);
                     let{DefaultValue}=this.state;

                     // {name: "ریاضی", price: 2000, chapter_count: 25, additional_percentage_course: 0.3, additional_percentage_chapters: 0.2}
                     // additional_percentage_chapters: 0.2
                     // additional_percentage_course: 0.3
                     // chapter_count: 25
                     // name: "ریاضی"
                     // price: 2000





                    if (payload.name !== DefaultValue.name || payload.price !== DefaultValue.price ||
                        payload.additional_percentage_chapters !== DefaultValue.additional_percentage_chapters || payload.additional_percentage_course !== DefaultValue.additional_percentage_course || payload.chapter_count !== DefaultValue.chapter_count) {
                        console.log("this is change data");
                        console.log(payload);
                        console.log(DefaultValue);
                        let Data = {
                            // "course_id": "string",
                            // "name": "string",
                            "course_id": this.state.id,
                            "name": DefaultValue.name,

                        };
                        if (payload.name !== DefaultValue.name ) {
                            Data["new_name"]=payload.name;
                        }

                        if (payload.price !== DefaultValue.price || payload.additional_percentage_chapters !== DefaultValue.additional_percentage_chapters ||
                            payload.additional_percentage_course !== DefaultValue.additional_percentage_course || payload.chapter_count !== DefaultValue.chapter_count) {
                            Data["price"] = payload.price;
                            Data["chapter_count"] = payload.chapter_count;
                            Data["additional_percentage_course"] = payload.additional_percentage_course;
                            Data["additional_percentage_chapters"] = payload.additional_percentage_chapters;
                        }


                        console.log("Data");
                        console.log(Data);
                        let {state, Description}= await UpdateLessonDetail(JSON.stringify(Data));
                        console.log(state);
                        console.log(Description);
                        if (state!==200) {
                            error_Notification(state  , Description  );
                            this.setState({
                                isLoader:false
                            });
                        }
                    }
                    //
                    if (this.state.Img.img_file['main'] !== undefined) {
                        let {state:state2, Description:Description2}= await AddFileToLesson(this.state.Img.img_file['main'],this.state.id,'lesson_image',DefaultValue.name);
                        if (state2!==200) {
                            error_Notification(state2 , Description2 );
                            this.setState({
                                isLoader:false
                            });
                        }
                    }

                    //
                    success_Notification( "اطلاعات شما با موفقیت به روز رسانی شد");
                    this.setState({
                        isLoader:false
                    });
                    this.props.updateContent();
                    this.updateValues(this.state.EditCourse);

                }




            }
        });

    };
    HandelAddImg=(type,value)=>{
            this.setState((prevState) => ({
                Img: {...prevState.Img,"img_file":{...prevState.Img.img_file,[type]:value}}
            }));

    };



    render() {

        let{collapse,Option,isLoader,initialValue,Img,id,FileError}=this.state;

        return (
            <div id="addSlider">

                <HeaderAddCommon collapse={collapse} toggle={this.toggle}   item={"درس"}
                                 id={this.state.EditCourse} to={`/content/course/${id}`}/>


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

                                                    <div className="col-md-4 col-sm-12">
                                                        <ImgComponent GetData={this.HandelAddImg}   label={"اضافه کردن عکس اصلی"} img={Img["img_data"]["main"]} Type="main"  errors={FileError}/>
                                                    </div>

                                                <div className=" col-sm-12 col-md-8  d-flex flex-column justify-content-between">
                                                    <div className="w-100 row m-0 ">


                                                        <FormInput label='نام' type='text' name='name'
                                                                   placeHolder='نام permission را وارد کنید !'
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>
                                                        <FormInput label='قیمت درس' type='number' name='price'
                                                                   placeHolder='قیمت درس را وارد کنید'
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>
                                                        <FormInput label='تعداد فصل' type='number' name='chapter_count'
                                                                   placeHolder='تعداد فصل ها را وارد کنید'
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>
                                                        <FormInput label='مازاد درصد دوره' type='number' name='additional_percentage_course'
                                                                   placeHolder='مازاد درصد دوره زا وارد کنید'
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>
                                                        <FormInput label='مازاد درصد فصل' type='number' name='additional_percentage_chapters'
                                                                   placeHolder='مازاد درصد فصل را وارد کنید '
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
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
                            }
                        </CardBody>
                    </Card>
                </Collapse>
                <Link to={`/content/courses` } id="refresh"/>
            </div>
        );
    }
}

export default AddLesson;

