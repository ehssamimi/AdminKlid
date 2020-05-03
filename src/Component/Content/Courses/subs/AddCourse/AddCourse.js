// import React, {useState, useEffect} from 'react';
import React, {Component} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {Form, Formik} from "formik";
import {FormInput, FormSelect} from "../../../../Common/ComponentFunctional/FormFeilds";
import {
    AddCourseDetail, AddFileToCourse,
    AddPermission,
    GetUserDropDown,
    loadCourse,
    loadMainCourse, UpdateCourseDetail
} from "../../../../functions/ServerConnection";
import {
    error_Notification,
    LabelValueOption,
    success_Notification,
    validatephoneNumber
} from "../../../../functions/componentHelpFunction";
import * as Yup from "yup";
// import {NotificationManager} from "react-notifications";
import Loader from "../../../../Common/Loader/Loader";
import ax from './../../../../Common/img/alex-simpson-8DaRtnotCoQ-unsplash.png'
import ImgComponent from "../../../../Common/ImgComponents/ImgComponent";
import AddPDf from "../../../../Common/AddPdf/AddPDf";
import {NotificationManager} from "react-notifications";
import validator from "validator";
import AddVideoConvert from "../../../../Common/AddVideoConver/AddVideoConvert";
const SignupSchema = Yup.object().shape({

    Name: Yup.string()
        .required("نام اجباری است!"),
    Description: Yup.string()
        .required("توضیحات اجباری است!"),
    grade: Yup.object()
        .required("پایه اجباری است !"),


});




class AddCourse extends Component {

    constructor(props) {
        super(props);

        this.state={
            collapse:false,
            Option:{},
            isLoader:true,
            initialValue:{Name:'', Description:"" , grade: '', field: ''},DefaultValue:{Name:'', Description:"" , grade: '', field: ''},pdf:"",
            Img:{"img_data":{"main":undefined,"cover":undefined},"img_file":{"main":undefined,"cover":undefined}},
            id:"",
            FileError:{"main":"","cover":"","pdf":""}
        }
    }
      async componentDidMount(){

              this.setState({
                  isLoader:true
              })
            const{state,Description }= await GetUserDropDown();
            if (state===200 ) {
                this.setState({
                    Option:Description
                })

            } else {
                error_Notification(state, Description)
                // NotificationManager.error(state, Description);
            }
              this.setState({
                  isLoader:false
              })
            // setIsLoader(false);

    }

   async  componentDidUpdate(props){
       console.log("props.id");
       console.log(props.id);
       if ( props.id !== this.state.id ) {
           this.updateValues(props.id);
       }

        // let{id}=this.props;
        // if (id.length>0){
        //     if (this.state.id===""){
        //        this.updateValues(id);
        //     }
        // }

    }

     updateValues = async (id) => {
        this.setState({
            isLoader:true,
            id,collapse:true
        });
        const{state,Description }= await loadCourse(id);

        if (state===200 ) {
            let initialValue= {
                Name: Description.name,
                Description: Description.description,
                grade: {"label": Description.grade, "value": Description.grade},
                field: {"label": Description.field, "value": Description.field}
            };
            console.log(Description);
            this.setState((prevState) => ({
                Img: {...prevState.Img,"img_data":{"main":Description.image,"cover":Description.demo_video_cover}},
                initialValue,
                DefaultValue:initialValue
            }));

        } else {
            error_Notification(state, Description)
        }
        this.setState({
            isLoader:false
        })
    }


     toggle = () => {
        this.setState((prevState) => ({
            collapse: !prevState.collapse
        }))
    };


      validateForm=(callback)=> {
        // let errors={"name":"","class":"","fields":"","phoneNumber":""};
         let FileError={"main":"","cover":"","pdf":""};
         let{Img: {img_data,img_file},pdf}=this.state;

        let formValidate=true;
          if (this.state.id === "") {

              if (img_file.main===undefined) {
                  formValidate = false;
                  FileError['main'] = "عکس اصلی باید انتخاب شود  ";
              }
              if (img_file.cover===undefined) {
                  formValidate = false;
                  FileError['cover'] = "عکس کاور ویدیو باید انتخاب شود ";
              }
              // if (pdf==="") {
              //     formValidate = false;
              //     FileError['pdf'] = "پی دی اف این دوره باید انتخاب شود ";
              // }

          }
          console.log("FileError");
          console.log(FileError);

          this.setState({
              FileError
          })
        return callback(formValidate)
    };


      handleSubmit = async (values, { setSubmitting }) => {

            this.validateForm(async (validate)=> {
                if (validate) {
                    console.log("validate")


                   const payload = {
                       ...values,
                   };

        // **********send validate data*********

                    this.setState({
                        isLoader: true
                    });


                    if (this.state.id===""){
                        let Data = {
                            "name": payload.Name,
                            "grade": payload.grade.value,
                            "field": payload.field.value !== undefined ? payload.field.value : "",
                            "description": payload.Description
                        };
                        let {state, Description}= await AddCourseDetail(JSON.stringify(Data));
                        if (state===200 ) {
                            let{course_id}=Description;
                            let {state:state2, Description:Description2}= await AddFileToCourse(this.state.Img.img_file['main'],course_id,'course_image');
                            if (state2===200) {
                                let {state:state3, Description:Description3}= await AddFileToCourse(this.state.Img.img_file['cover'],course_id,'course_demo_cover');
                                console.log(Description3);
                                if (state3===200) {
                                    let {state:state4, Description:Description4}= await AddFileToCourse(this.state.pdf,course_id,'schedule_pdf');
                                    console.log(Description4);
                                    if (state4===200) {
                                        this.props.UpdateCoursList()
                                        success_Notification( "اطلاعات شما با موفقیت ثبت شد");
                                        this.setState({
                                            isLoader:false
                                        });
                                    }else{
                                        error_Notification(state4, Description4);
                                        this.setState({
                                            isLoader:false
                                        });
                                    }
                                }else{
                                    error_Notification(state3, Description3);
                                    this.setState({
                                        isLoader:false
                                    });
                                }

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
                        let{DefaultValue}=this.state;

                        if (payload.Name !== DefaultValue.Name || payload.Description !== DefaultValue.Description ||
                            payload.grade.value !== DefaultValue.grade.value || payload.field.value !== DefaultValue.field.value) {
                            let Data={
                                "course_id": this.state.id,
                                "name": payload.Name,
                                "grade": payload.grade.value,
                                "field": payload.field.value !== undefined ? payload.field.value : "",
                                "description": payload.Description
                            };
                            let {state, Description}= await UpdateCourseDetail(JSON.stringify(Data));
                            console.log(state);
                            console.log(Description);
                            if (state!==200) {
                                error_Notification(state  , Description  );
                                this.setState({
                                    isLoader:false
                                });
                            }
                        }
                        // Name: Description.name,
                        //     Description: Description.description,
                        //     grade: {"label": Description.grade, "value": Description.grade},
                        // field: {"label": Description.field, "value": Description.field}




                        if (this.state.Img.img_file['main'] !== undefined) {
                            let {state: state2, Description: Description2} = await AddFileToCourse(this.state.Img.img_file['main'], this.state.id, 'course_image');
                            if (state2!==200) {
                                error_Notification(state2 , Description2 );
                                this.setState({
                                    isLoader:false
                                });
                            }
                        }
                        if (this.state.Img.img_file['cover'] !== undefined) {
                            let {state: state3, Description: Description3} = await AddFileToCourse(this.state.Img.img_file['cover'], this.state.id, 'course_demo_cover');
                            if (state3!==200) {
                                error_Notification(state3 , Description3 );
                                this.setState({
                                    isLoader:false
                                });
                            }
                        }
                        if (this.state.Img.pdf !== undefined) {
                            let {state: state4, Description: Description4} = await AddFileToCourse(this.state.pdf, this.state.id, 'schedule_pdf');
                            if (state4!==200) {
                                error_Notification(state4 , Description4 );
                                this.setState({
                                    isLoader:false
                                });
                            }
                        }

                        success_Notification( "اطلاعات شما با موفقیت ثبت شد");
                        this.setState({
                            isLoader:false
                        });
                        this.props.UpdateCoursList();
                        this.updateValues(this.state.id);



                    }




               }
           });

    };
      HandelAddImg=(type,value)=>{

          if (type==="pdf"){
              this.setState({
                  pdf:value
              })
          }else  {

              this.setState((prevState) => ({
                  Img: {...prevState.Img,"img_file":{...prevState.Img.img_file,[type]:value}}
              }));
          }
    };

    render() {
          let{collapse,Option,isLoader,initialValue,Img,id,FileError}=this.state;



        return (
            <div>
                <div onClick={this.toggle} className="d-flex align-items-center">
                    <Button color="primary"  className=" p-0 d-flex align-items-center justify-content-center">
                        {
                            collapse? <span color="primary" className="glyph-icon simple-icon-minus fs25rem  "></span>: <span color="primary" className="glyph-icon simple-icon-plus fs25rem  "></span>
                        }
                    </Button>
                    {
                        id===""?<span className="fs13vw ml-3">اضافه کردن</span>:<span className="fs13vw ml-3">به روز رسانی</span>
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
                                                    <div className="col-md-4 col-sm-12">
                                                        <AddPDf GetData={this.HandelAddImg}   label={"اضافه کردن pdf"} Type="pdf" errors={FileError}/>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12">
                                                        <ImgComponent GetData={this.HandelAddImg}  label={"اضافه کردن عکس کاور"} img={Img["img_data"]["cover"]} Type="cover" errors={FileError} />
                                                    </div>
                                                </div>


                                                <div className=" col-sm-12 col-md-8  d-flex flex-column justify-content-between">
                                                    <div className="w-100 row m-0 ">

                                                        <FormInput label='نام' type='text' name='Name'
                                                                   placeHolder='نام permission را وارد کنید !'
                                                                   DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
                                                                   errors={errors} touched={touched}/>
                                                        <FormSelect label='پایه' option={LabelValueOption(Option.grade_type) } name='grade'
                                                                    placeHolder='پایه خود را وارد کنید' values={values}
                                                                    DivClass="col-sm-6  " setFieldTouched={setFieldTouched} setFieldValue={setFieldValue}
                                                                    errors={errors} touched={touched}/>



                                                        {
                                                            ( values.grade.value === "طرح انسانی"   ||values.grade.value === "دهم" || values.grade.value === "دوازدهم" || values.grade.value === "طرح" ||values.grade.value === "یازدهم" || values.grade.value === "فارغ التحصیل" || values.grade.value === "کنکوری (دوازدهم)")?
                                                                <FormSelect label='رشته' option={LabelValueOption(Option.field_type)} name='field'
                                                                            placeHolder='رشته خود را وارد کنید' setFieldValue={setFieldValue}
                                                                            DivClass="col-sm-6  " setFieldTouched={setFieldTouched} values={values}
                                                                            errors={errors} touched={touched}/>
                                                                :""
                                                        }

                                                        <FormInput label='توضیحات' component='textarea' rows="4" type='text'
                                                                   name='Description' placeHolder='توضیحات را وارد کنید'
                                                                   DivClass="col-sm-12 " setFieldTouched={setFieldTouched}
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
            </div>
        );
    }
}

export default AddCourse;




// const AddCourse = (props) => {
//     const [collapse, setCollapse] = useState(false);
//     const [Option, setOption] = useState({});
//     const [isLoader, setIsLoader] = useState(true);
//     const [initialValue, setinitialValue] = useState([]);
//     const [Img, setImg] = useState([]);
//
//     useEffect(( ) => {
//          console.log("props.id");
//          console.log(props.id);
//         if (props.id.length>1){
//             console.log("thi sis id lenght")
//         }
//
//         async function  getData(){
//             const{state,Description }= await GetUserDropDown();
//             const initialValue={
//                 Name:'',
//                 Description:"" ,
//                 // grade:LabelValueOption(Description.grade_type)[0],
//                 // field: LabelValueOption(Description.field_type)[0]
//                 grade: '',
//                 field: ''
//             };
//             setinitialValue(initialValue);
//
//
//             if (state===200 ) {
//
//                 setOption(Description)
//
//             } else {
//                 error_Notification(state, Description)
//                 // NotificationManager.error(state, Description);
//             }
//             setIsLoader(false);
//         }
//         getData()
//
//     }, [ ] );
//     // const onEntering = () => setStatus('Opening...');const onEntered = () => setStatus('Opened');const onExiting = () => setStatus('Closing...');const onExited = () => setStatus('Closed');
//
//     const toggle = () => setCollapse(!collapse);
//     const  handleSubmit = async (values, { setSubmitting }) => {
//         const payload = {
//             ...values,
//             // field: payload.field.value ,
//             // grade: payload.grade.value ,
//
//         };
//
//         // **********send validate data*********
//         setIsLoader(true);
//         let Data= {
//             "name": payload.Name,
//             "grade": payload.grade.value  ,
//             "field": payload.field.value!==undefined?payload.field.value:"" ,
//             "description": payload.Description
//         };
//         console.log(Data);
//
//         let {state, Description}= await AddCourseDetail(JSON.stringify(Data));
//
//         setIsLoader(false);
//         //  course_id: "5ea47cdd4f0bb72998eb6dd8"
//
//         if (state===200 ) {
//              console.log("Description");
//             console.log(Description);
//             success_Notification( "اطلاعات شما با موفقیت ثبت شد")
//         } else {
//             error_Notification(state, Description)
//         }
//
//     };
//     const HandelAddImg=(value)=>{
//          setImg(value);
//     }
//
//
//
//
//     return (
//         <div>
//             <div onClick={toggle} className="d-flex align-items-center">
//                 <Button color="primary"  className=" p-0 d-flex align-items-center justify-content-center">
//                     {
//                         collapse? <span color="primary" className="glyph-icon simple-icon-minus fs25rem  "></span>: <span color="primary" className="glyph-icon simple-icon-plus fs25rem  "></span>
//                     }
//                  </Button>
//                 <span className="fs13vw ml-3">اضافه کردن</span>
//
//
//             </div >
//               <Collapse
//                 isOpen={collapse}
//                 className="mt-3"
//                 // onEntering={onEntering}
//                 // onEntered={onEntered}
//                 // onExiting={onExiting}
//                 // onExited={onExited}
//             >
//                 <Card>
//                     <CardBody>
//
//                         {
//                             isLoader ? <div className='d-flex justify-content-center align-items-center'>
//                                     <div className='col-6'>
//                                         <Loader/>
//                                     </div>
//                                 </div> :
//                                 <Formik
//                                     initialValues={
//                                         initialValue
//                                     }
//                                     validationSchema={SignupSchema}
//                                     onSubmit={handleSubmit}
//                                 >
//                                     {({
//                                           handleSubmit,
//                                           setFieldValue,
//                                           setFieldTouched,
//                                           handleChange,
//                                           handleBlur,
//                                           values,
//                                           errors,
//                                           touched,
//                                           isSubmitting
//                                       }) => (
//                                         <Form className="av-tooltip tooltip-label-bottom w-100 row m-0">
//                                             <div className="row">
//                                                 <div className="col-md-4 col-sm-12">
//                                                     <ImgComponent GetData={HandelAddImg}   label={"اضافه کردن عکس اصلی"} />
//                                                 </div>
//                                                 <div className="col-md-4 col-sm-12">
//                                                     <AddPDf GetData={HandelAddImg}   label={"اضافه کردن pdf"}/>
//                                                 </div>
//                                                 <div className="col-md-4 col-sm-12">
//                                                     <ImgComponent GetData={HandelAddImg}  label={"اضافه کردن عکس کاور"}/>
//                                                 </div>
//                                             </div>
//
//
//                                             <div className=" col-sm-12 col-md-8  d-flex flex-column justify-content-between">
//                                                 <div className="w-100 row m-0 ">
//
//                                                     <FormInput label='نام' type='text' name='Name'
//                                                                placeHolder='نام permission را وارد کنید !'
//                                                                DivClass="col-sm-12  " setFieldTouched={setFieldTouched}
//                                                                errors={errors} touched={touched}/>
//                                                     <FormSelect label='پایه' option={LabelValueOption(Option.grade_type) } name='grade'
//                                                                 placeHolder='پایه خود را وارد کنید' values={values}
//                                                                 DivClass="col-sm-6  " setFieldTouched={setFieldTouched} setFieldValue={setFieldValue}
//                                                                 errors={errors} touched={touched}/>
//                                                     {
//                                                           ( values.grade.value === "دهم" || values.grade.value === "یازدهم" || values.grade.value === "فارغ التحصیل" || values.grade.value === "کنکوری (دوازدهم)")?
//                                                         <FormSelect label='رشته' option={LabelValueOption(Option.field_type)} name='field'
//                                                         placeHolder='رشته خود را وارد کنید' setFieldValue={setFieldValue}
//                                                         DivClass="col-sm-6  " setFieldTouched={setFieldTouched} values={values}
//                                                         errors={errors} touched={touched}/>
//                                                   :""
//                                                     }
//
//                                                     <FormInput label='توضیحات' component='textarea' rows="4" type='text'
//                                                                name='Description' placeHolder='توضیحات را وارد کنید'
//                                                                DivClass="col-sm-12 " setFieldTouched={setFieldTouched}
//                                                                errors={errors} touched={touched}/>
//
//                                                 </div>
//                                             </div>
//                                             <div className="col-6 offset-3 ">
//                                                 <button className="btn btn-success text-center col-6 offset-3 "
//                                                         type="submit">
//                                                     فرستادن
//                                                 </button>
//                                             </div>
//
//                                         </Form>
//                                     )}
//                                 </Formik>
//                         }
//                     </CardBody>
//                 </Card>
//             </Collapse>
//         </div>
//     );
// };
//
// export default AddCourse;