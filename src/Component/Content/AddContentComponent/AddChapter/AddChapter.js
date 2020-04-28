import React, {Component} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {Form, Formik} from "formik";
import {FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";
import {
    AddChapterUrl,
    AddCourseDetail, AddFileToChapter, AddFileToCourse, AddFileToLesson, AddFileToTeacher, AddLessonUrl,
    AddPermission, AddTecherUrl,
    GetUserDropDown,
    loadCourse,
    loadMainCourse, UpdateCourseDetail, UpdateLessonDetail, UpdateTeacherDetail
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
const SignupSchema = Yup.object().shape({

    name: Yup.string()
        .required("نام اجباری است!"),
    total_video_times: Yup.number().required("تعیین زمان تقریبی اجباری است!").moreThan(  1, "باید بیشتر از یک باشد ").positive("باید بزرگتر از صفر باشد "),


});





class AddChapter extends Component {
    constructor(props) {
        super(props);

        this.state={
            collapse:false,
            isLoader:false,
            initialValue:{name:'', total_video_times:''  },DefaultValue:{name:'', total_video_times:'' },
            Img:{"img_data":{"main":undefined},"img_file":{"main":undefined }},
            id:props.id,EditCourse:undefined,
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
                EditCourse: props.index,model:state.func1(props.index)
            };
        }
        // Return null if the state hasn't changed
        return null;
    }




    async  componentDidUpdate(props){
        // console.log("props.index");
        // console.log(props.index);
        // console.log("this.state.EditCourse");
        // console.log(this.state.EditCourse);
        // console.log(props.index !== this.state.EditCourse);
        const {match: {params}} =  props;
        // console.log("params");
        // console.log(params);

        // if ( params.index !== this.state.EditCourse ) {
        //
        //
        //     this.updateValues(params.index);
        // }





        // let{id}=this.props;
        // if (id.length>0){
        //     if (this.state.id===""){
        //        this.updateValues(id);
        //     }
        // }

    }

    updateValues = async (index) => {
        console.log("we are in update ")
        this.setState({
            collapse:true,EditCourse:index, isLoader:true
        });


        const{state,Description }= await loadCourse(this.state.id);
        let EditCourse= Description.lessons[this.props.Lesson_index].teachers[index];
        let Img={"img_data":{"main":EditCourse.image},"img_file":{"main":undefined }} ;




        let Data = {
            name:EditCourse.name,
            total_video_times:EditCourse.total_video_times
        };

        this.setState({
            initialValue:Data,DefaultValue:Data,isLoader:false,Img
        });

        return true;


        // Lesson_index





        //

        //
        //
        // if (state===200 ) {
        //
        //
        // } else {
        //     error_Notification(state, Description)
        // }

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
                        "lesson_name":this.props.Lesson_name,
                        "teacher_name":this.props.Teacher,
                        "name": payload.name,
                        "total_video_times": payload.total_video_times
                    };

                    let {state, Description}= await AddChapterUrl(JSON.stringify(Data));
                    if (state===200 ) {
                        // let{course_id}=Description;
                        let {state:state2, Description:Description2}= await AddFileToChapter(this.state.Img.img_file['main'],this.state.id,'teacher_image',this.props.Lesson_name,this.props.Teacher,payload.name);
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


                    // "lesson_name":this.props.Lesson_name,
                    //     "name": payload.name,





                    if (payload.name !== DefaultValue.name || payload.total_video_times !== DefaultValue.total_video_times) {

                        let Data = {
                            "course_id": this.state.id,
                            "lesson_name":this.props.Lesson_name,
                            "name": DefaultValue.name,

                            // "course_id": "string",
                            // "lesson_name": "string",
                            // "name": "string",
                            // "new_name": "string",
                            // "total_videos_time": 0


                        };
                        if (payload.name !== DefaultValue.name ) {
                            Data["new_name"]=payload.name;
                        }

                        if ( payload.total_video_times !== DefaultValue.total_video_times ) {
                            Data["total_video_times"] = payload.total_video_times;
                        }


                        console.log("Data");
                        console.log(Data);
                        let {state, Description}= await UpdateTeacherDetail(JSON.stringify(Data));
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
                        let {state:state2, Description:Description2}= await AddFileToTeacher(this.state.Img.img_file['main'],this.state.id,'teacher_image',this.props.Lesson_name,payload.name);
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
                <div onClick={this.toggle} className="d-flex align-items-center">
                    <Button color="primary"  className=" p-0 d-flex align-items-center justify-content-center">
                        {
                            collapse? <span color="primary" className="glyph-icon simple-icon-minus fs25rem  "></span>: <span color="primary" className="glyph-icon simple-icon-plus fs25rem  "></span>
                        }
                    </Button>
                    {
                        this.state.EditCourse===""?<span className="fs13vw ml-3">اضافه کردن</span>:<span className="fs13vw ml-3">به روز رسانی</span>
                    }


                </div >
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
                                                        <FormInput label='زمان تقریبی کلی' type='number' name='total_video_times'
                                                                   placeHolder='زمان تقریبی کلی را وارد کنید'
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>
                                                        {/*<FormInput label='تعداد فصل' type='number' name='chapter_count'*/}
                                                        {/*placeHolder='تعداد فصل ها را وارد کنید'*/}
                                                        {/*DivClass="col-sm-12  " setFieldTouched={setFieldTouched}*/}
                                                        {/*errors={errors} touched={touched}/>*/}
                                                        {/*<FormInput label='مازاد درصد دوره' type='number' name='additional_percentage_course'*/}
                                                        {/*placeHolder='مازاد درصد دوره زا وارد کنید'*/}
                                                        {/*DivClass="col-sm-12  " setFieldTouched={setFieldTouched}*/}
                                                        {/*errors={errors} touched={touched}/>*/}
                                                        {/*<FormInput label='مازاد درصد فصل' type='number' name='additional_percentage_chapters'*/}
                                                        {/*placeHolder='مازاد درصد فصل را وارد کنید '*/}
                                                        {/*DivClass="col-sm-12  " setFieldTouched={setFieldTouched}*/}
                                                        {/*errors={errors} touched={touched}/>*/}

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
            </div>
        );
    }
}

export default AddChapter;

