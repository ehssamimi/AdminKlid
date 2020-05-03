import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card, Label, FormGroup} from 'reactstrap';
import {Form, Formik} from "formik";
import {FormCheckBox, FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";
import {
    AddFileToItem,
    AddItemUrl,
    loadCourse,
    UpdateChapterDetail, UpdateItemDetail,
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
import {FormikCustomRadioGroup} from "../../../../containers/form-validations/FormikFields";
import AddVoice from "../../../Common/AddVoice/AddVoice";
import AddPreviewPdf from "../../../Common/AddPdf/AddPreviewPdf";
import AddVideoConvert from "../../../Common/AddVideoConver/AddVideoConvert";
import PreviewVideoComponent from "../../../Common/PreviewVideoComponent/PreviewVideoComponent";
const SignupSchema = Yup.object().shape({

    name: Yup.string().required("نام اجباری است!"),
    time_to_done: Yup.number().required("تعیین زمان تقریبی اجباری است!").moreThan(1, "باید بیشتر از یک باشد ").positive("باید بزرگتر از صفر باشد "),
    isFree: Yup.string().required("A radio option is required"),
    Description: Yup.string()
        .required("توضیحات اجباری است!"),
});


const options = [

    { value: "نیست", label: "نیست" },
    { value: "هست", label: "هست" }
];

class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state={
            collapse:false,
            isLoader:false,videoURl:['a','b'],
            initialValue:{name:'', time_to_done:'' ,isFree: "",Description:""},DefaultValue:{name:'', time_to_done:'',isFree: "",Description:""},
            Img:{"img_data":{"main":undefined},"img_file":{"main":undefined }},
            id:props.id,EditCourse:undefined,content:{"file":undefined,"upload":undefined} ,voice:{"file":undefined,"upload":undefined},
            FileError:{"main":"", "content":"","voice":""},model:false,
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
        console.log("we are in update ");

        this.setState({
            collapse:true,EditCourse:index, isLoader:true
        });
        let{Lesson_index,TeacherIndex,chapterIndex}=this.props;

        const{state,Description }= await loadCourse(this.state.id);



        let EditCourse= Description.lessons[Lesson_index].teachers[TeacherIndex].chapters[chapterIndex].items[index];
        // console.log("EditCourse update update");
        // console.log(EditCourse);



        // video: "https://resourcealef.liara.run/admin/course/stream/item_video/5ea5777ec055423e3719c894/ZWhzYW4=/bWFtYWQ=/emlzdA==/d2VzdA==/index.m3u8"
        // video_cover: "https://stream.kelidiha.com/public/item/5ea5777ec055423e3719c894/ZWhzYW4=/bWFtYWQ=/emlzdA==/d2VzdA==/video_cover/image.png"

        // Object
        // audio: "https://resourcealef.liara.run/admin/course/stream/item_audio/5e9318063414ab42e3239506/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfYrdiz2KfZhiDYtdmF24zZhduMINix2KfYrw==/2q-ZiNqG24w=/dad.pdf"
        // create_at: "2020-05-02T20:23:05.612000"
        // description: "asas"
        // downloadable_content: "https://resourcealef.liara.run/admin/course/stream/item_downloadable_content/5e9318063414ab42e3239506/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfYrdiz2KfZhiDYtdmF24zZhduMINix2KfYrw==/2q-ZiNqG24w=/None"
        // is_free: false
        // is_locked: true
        // name: "گوچی"
        // time_to_done: 21
        // video: "https://resourcealef.liara.run/admin/course/stream/item_video/5e9318063414ab42e3239506/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfYrdiz2KfZhiDYtdmF24zZhduMINix2KfYrw==/2q-ZiNqG24w=/index.m3u8"
        // video_cover: "https://stream.kelidiha.com/public/item/5e9318063414ab42e3239506/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfYrdiz2KfZhiDYtdmF24zZhduMINix2KfYrw==/2q-ZiNqG24w=/video_cover/image.png"
        //
        //
        let Img={"img_data":{"main":EditCourse.video_cover},"img_file":{"main":undefined }} ;
        let content={"file":undefined,"upload":EditCourse.downloadable_content} ;let voice={"file":undefined,"upload":EditCourse.audio};


        let Data = {
            name:EditCourse.name,
            time_to_done:EditCourse.time_to_done,isFree: EditCourse.is_free? "هست" :"نیست",Description:EditCourse.description
        };



        this.setState({
            initialValue:Data,DefaultValue:Data,isLoader:false,Img,voice,content,videoURl:[EditCourse.video_cover,EditCourse.video]
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
        let FileError={"main":"", "content":"","voice":""};
        let{Img: {img_data,img_file} ,content,voice}=this.state;

        let formValidate=true;
        if (this.state.EditCourse === undefined) {
            if (img_file.main===undefined) {
                formValidate = false;
                FileError['main'] = "عکس اصلی باید انتخاب شود ";
            }
            // if (content===undefined) {
            //     formValidate = false;
            //     FileError['content'] = "محتوا باید انتخاب شود ";
            // }
            // if (voice===undefined) {
            //     formValidate = false;
            //     FileError['voice'] = "عکس اصلی باید انتخاب شود ";
            // }



        }
        // console.log("FileError");
        // console.log(FileError);

        this.setState({
            FileError
        })
        return callback(formValidate)
    };


    handleSubmit = async (values, { setSubmitting }) => {
        console.log(this.state.voice);

        this.validateForm(async (validate)=> {
            if (validate) {


                const payload = {
                    ...values,
                };
                console.log(payload);

                // **********send validate data*********

                this.setState({
                    isLoader: true
                });

                console.log("payload.isFree")
                console.log(payload.isFree)


                if (this.state.EditCourse===undefined){


                    let Data = {
                        "course_id": this.state.id,
                        "lesson_name": this.props.Lesson_name,
                        "teacher_name": this.props.Teacher,
                        "chapter_name": this.props.chapter,
                        "name": payload.name,
                        "description": payload.Description,
                        "time_to_done": payload.time_to_done,
                        "is_free": payload.isFree !== "نیست"
                    };
                    console.log(Data);

                    let {state, Description}= await AddItemUrl(JSON.stringify(Data));
                    if (state===200 ) {
                        let successData=true;
                        let {state:state2, Description:Description2}= await AddFileToItem(this.state.Img.img_file['main'],this.state.id,'item_video_cover',this.props.Lesson_name,this.props.Teacher,this.props.chapter,payload.name);
                        let des=Description2;
                        console.log(Description2);
                        if (state2 !== 200) {
                            successData = false ;
                            des=Description2;
                        }

                        if (this.state.content["file"] !== undefined) {
                            let {state: state3, Description: Description3} = await AddFileToItem(this.state.content["file"], this.state.id, 'item_downloadable_content', this.props.Lesson_name, this.props.Teacher, this.props.chapter, payload.name);

                            console.log(Description3);
                            if (state3 !== 200) {
                                successData = false;
                                des = Description3;
                            }

                        }
                        if (this.state.voice["file"] !== undefined) {
                            console.log("voice");
                            console.log(this.state.voice);
                            let {state: state4, Description: Description4} = await AddFileToItem(this.state.voice["file"], this.state.id, 'item_audio', this.props.Lesson_name, this.props.Teacher, this.props.chapter, payload.name);
                            console.log(Description4);
                            if (state4 !== 200) {
                                successData = false ;
                                des=Description4;
                            }
                        }


                        if (successData) {
                            success_Notification("درس مورد نظر با موفقیت به پایان رسید");
                            this.setState({
                                isLoader:false
                            });
                            this.props.updateContent();
                        }else{

                            error_Notification(state2, des);
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





                    if (payload.name !== DefaultValue.name || payload.time_to_done !== DefaultValue.time_to_done|| payload.isFree !== DefaultValue.isFree|| payload.Description !== DefaultValue.Description|| payload.is_free !== DefaultValue.is_free) {



                        let Data = {
                            "course_id": this.state.id,
                            "lesson_name":this.props.Lesson_name,
                            "teacher_name": this.props.Teacher,
                            "chapter_name": this.props.chapter,
                            "item_name": DefaultValue.name,

                        };




                        if ( payload.time_to_done !== DefaultValue.time_to_done ) {
                            Data["time_to_done"] = payload.time_to_done;
                        }

                        if ( payload.isFree !==DefaultValue.isFree  ) {
                            console.log("adddd is free to dtat");

                            Data["is_free"] =  payload.isFree !== "نیست";
                        }
                        if ( payload.description !== DefaultValue.description ) {
                            Data["description"] = payload.description;
                        }


                        console.log("Data");
                        console.log(Data);
                        
                        if (Object.keys(Data).length>5) {
                            let {state, Description}= await UpdateItemDetail(JSON.stringify(Data));
                            console.log(state);
                            console.log(Description);
                            if (state!==200) {
                                error_Notification(state  , Description  );
                                this.setState({
                                    isLoader:false
                                });
                            }
                        }

                    }
                    let successData=true;
                    let des='';
                    if (this.state.Img.img_file['main'] !== undefined) {
                        let {state:state2, Description:Description2}= await AddFileToItem(this.state.Img.img_file['main'],this.state.id,'item_video_cover',this.props.Lesson_name,this.props.Teacher,this.props.chapter,payload.name);
                        if (state2 !== 200) {
                            successData = false ;
                            des=Description2;
                        }
                    }


                    if (this.state.content["file"] !== undefined) {
                        let {state: state3, Description: Description3} = await AddFileToItem(this.state.content["file"], this.state.id, 'item_downloadable_content', this.props.Lesson_name, this.props.Teacher, this.props.chapter, payload.name);

                        console.log(Description3);
                        if (state3 !== 200) {
                            successData = false;
                            des = Description3;
                        }

                    }
                    if (this.state.voice["file"] !== undefined) {
                        console.log("voice");
                        console.log(this.state.voice);
                        let {state: state4, Description: Description4} = await AddFileToItem(this.state.voice["file"], this.state.id, 'item_audio', this.props.Lesson_name, this.props.Teacher, this.props.chapter, payload.name);
                        console.log(Description4);
                        if (state4 !== 200) {
                            successData = false ;
                            des=Description4;
                        }
                    }


                    if (successData){
                        success_Notification( "اطلاعات شما با موفقیت به روز رسانی شد");
                    } else {
                        error_Notification("error" , des );

                    }

                    this.setState({
                        isLoader:false
                    });
                    this.props.updateContent();
                    this.updateValues(this.props.index);


                }




            }
        });

    };
    HandelAddImg = (type, value) => {
        let content = {"file": undefined, "upload": undefined};
        let voice = {"file": undefined, "upload": undefined};


        console.log("value");
        console.log(value);
        if (type==="content"){
            content["file"]=value;
            this.setState({
                content
            })
        }else if(type==="voice"){
            voice["file"]=value;
            this.setState({
                voice
            })
        }
        else  {

            this.setState((prevState) => ({
                Img: {...prevState.Img,"img_file":{...prevState.Img.img_file,[type]:value}}
            }));
        }







    };

    render() {
        let{collapse,Option,isLoader,initialValue,Img,id,FileError,voice,content}=this.state;

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

                                                <div className="row">
                                                    <div className="col-md-4 col-sm-12">
                                                        <ImgComponent GetData={this.HandelAddImg}   label={"اضافه کردن عکس اصلی"} img={Img["img_data"]["main"]} Type="main"  errors={FileError}/>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12 d-flex flex-column">
                                                        <AddVoice GetData={this.HandelAddImg}
                                                                  label={"اضافه کردن وویس اصلی"} img={voice["upload"]}
                                                                  Type="voice" errors={FileError}/>
                                                        {
                                                            this.state.EditCourse!==undefined?
                                                                <PreviewVideoComponent video={ this.state.videoURl}/>:""
                                                        }



                                                    </div>
                                                    <div className="col-md-4 col-sm-12">
                                                        {/*<AddPreviewPdf/>*/}
                                                        <AddPreviewPdf GetData={this.HandelAddImg}
                                                                label={"اضافه کردن فایل "} img={content["upload"]}
                                                                Type="content" errors={FileError}/>
                                                        {/*<ImgComponent GetData={this.HandelAddImg}  label={"اضافه کردن صدا"} img={Img["img_data"]["cover"]} Type="cover" errors={FileError} />*/}
                                                    </div>
                                                </div>

                                                <div className=" col-sm-12 col-md-8  d-flex flex-column justify-content-between">
                                                    <div className="w-100 row m-0 ">

                                                        <FormInput label='نام' type='text' name='name'
                                                                   placeHolder='نام permission را وارد کنید !'
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>

                                                        <FormInput label='توضیحات' component='textarea' rows="4"
                                                                   type='text'
                                                                   name='Description' placeHolder='توضیحات را وارد کنید'
                                                                   DivClass="col-sm-12 "
                                                                   setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>

                                                        <FormInput label='زمان تقریبی' type='number' name='time_to_done'
                                                                   placeHolder='زمان تقریبی اتمام قسمت  زارا وارد کنید'
                                                                   DivClass="col-sm-12  "
                                                                   setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>

                                                        <FormCheckBox label='محتوای مورد نظر رایگان ' type='number' name='isFree'
                                                                   placeHolder='زمان تقریبی اتمام قسمت  زارا وارد کنید'
                                                                   DivClass="col-sm-12  " values={values} option={options}
                                                                   setFieldTouched={setFieldTouched} setFieldValue={setFieldValue}
                                                                   errors={errors} touched={touched}/>

                                                        {
                                                            this.state.EditCourse!==undefined?
                                                                <AddVideoConvert ListData={{"course_id":this.props.id,"lesson_name":this.props.Lesson_name,"teacher_name":this.props.Teacher ,"chapter_name": this.props.chapter,"item_name": this.state.DefaultValue["name"]}} action={"item_video"} />
                                                                : ""
                                                        }

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

export default AddItem;


