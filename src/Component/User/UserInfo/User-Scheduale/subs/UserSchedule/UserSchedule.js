import React, {useState, useEffect} from 'react';
import Card from "@material-ui/core/Card/Card";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {error_Notification, formatNumber, success_Notification} from "../../../../../functions/componentHelpFunction";
import LabelValueRow from "../../../../../Common/LabalValue/LabelValue";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {Button} from "reactstrap";
import {ModalDelete} from "../../../../../Common/Modals/ModalDelete/ModalDelete";
import AddPreviewPdf from "../../../../../Common/AddPdf/AddPreviewPdf";
import Loader from "../../../../../Common/Loader/Loader";
import {GetAllUser, UploadSchedule} from "../../../../../functions/ServerConnection";
import {Power4, TweenMax} from "gsap/TweenMax";

const UserSchedule = (props) => {
    const [count, setCount] = useState(1);
    const [content, setContent] = useState(null);
    const [error, setError] = useState("");
    const [isLoader, setisLoader] = useState(false);
    const [upload, setUpload] = useState(true);


     // education_info: {grade: "یازدهم", field: "تجربی", gpa: null, school_name: null, school_type: null}
    // user_id: "5ea5d6f1e1dc9aca8dadd6f3"
    // user_info: {phone_number: "09386159245", name: "کوثر حاتمی", ssn: null}





    let{user_id,image,user_info:{name,phone_number},education_info:{field,grade},date}=props;

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    const HandelSubmit=async ( )=>{
        setisLoader(true);
        let {state,Description}=await UploadSchedule(user_id,content);
        setisLoader(false);
        if (state===200){

            const $el = document.getElementById(`${user_id}`);
            const duration = 2;
            const from = { opacity: 0};
            TweenMax.to($el, duration, from);
            setTimeout(() => {
                $el.remove();
            }, 2000)

            success_Notification("موفق شدید","برنامه مورد نظر برای این دانش آموز ثبت شد ")
        } else {
            error_Notification(state,Description)
        }
    };

    return (
        <Card  className= "m-2 br20px h-100 MainCardCourseHeight  card-active-shadow   FsFooterLogin  " id={user_id}>

                <CardMedia
                    className="hpx200 "
                    image={ image}
                    title="Course Section"
                />

                {/*<img src={image} alt={image}/>*/}
                <CardContent>
                    <div className="row col-12 m-0 p-0">
                        <LabelValueRow label={"نام"} value={name} className="col-sm-12  "/>
                        <LabelValueRow label={"شماره"} value={phone_number} className="col-sm-12  "/>
                    </div>

                    <div className="row pl-3 justify-content-start">
                        <LabelValueRow label={"پایه"} value={grade} className="col-sm-12 col-md-6"/>

                        {
                            field!==null? <LabelValueRow label={"رشته"} value={field} className="col-sm-12 col-md-6"/>:""
                        }




                        {/*<span className="second-color pl-2"> {field } </span>*/}
                    </div>
                </CardContent>

            <CardActions className="d-flex justify-content-center flex-column">
                <div className="w-100">
                    {
                        props.allocate?"":
                            <div className="w-100">
                                {
                                    upload?
                                        <div className="w-100 d-flex justify-content-center">
                                            <button className="btn btn-primary" onClick={()=>{setUpload(false)}}>آپلود</button>
                                        </div>:

                                        <div className="w-100">

                                            {
                                                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                                                        <div className='col-6'>
                                                            <Loader/>
                                                        </div>
                                                    </div> :
                                                    <div className="w-100  ">
                                                        <AddPreviewPdf GetData={  (type, value)=>{setContent(value)}}
                                                                       label={"اضافه کردن فایل "} img={content }
                                                                       Type="content" errors={error}/>
                                                        <div className="d-flex justify-content-center">
                                                            <button className="btn btn-primary col-6   text-center" onClick={HandelSubmit}> ثبت </button>
                                                        </div>
                                                    </div>
                                            }


                                        </div>
                                }

                            </div>
                    }




                </div>
                <div className="100">
                    <LabelValueRow label={"زمان"} value={date} className="col-sm-12   justify-content-center"/>

                </div>

                {/*<Button onClick={()=>{setIsOpen(!isOpen)}} className="btn red-background">حذف</Button>*/}
            </CardActions>





        </Card>
    );
};

export default UserSchedule;