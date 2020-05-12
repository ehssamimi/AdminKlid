import React, {useState, useEffect} from 'react';
import Card from "@material-ui/core/Card/Card";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {formatNumber} from "../../../../../functions/componentHelpFunction";
import LabelValueRow from "../../../../../Common/LabalValue/LabelValue";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {Button} from "reactstrap";
import {ModalDelete} from "../../../../../Common/Modals/ModalDelete/ModalDelete";
import AddPreviewPdf from "../../../../../Common/AddPdf/AddPreviewPdf";

const UserSchedule = (props) => {
    const [count, setCount] = useState(1);
    const [content, setcontent] = useState(null);
    const [error, setError] = useState("");


     // education_info: {grade: "یازدهم", field: "تجربی", gpa: null, school_name: null, school_type: null}
    // user_id: "5ea5d6f1e1dc9aca8dadd6f3"
    // user_info: {phone_number: "09386159245", name: "کوثر حاتمی", ssn: null}





    let{user_id,image,user_info:{name,phone_number},education_info:{field,grade},date}=props;
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
    const Handelcontent=(type, value)=>{
        setcontent(value)
    }

    return (
        <Card  className= "m-2 br20px h-100 MainCardCourseHeight  box-shadow-custom FsFooterLogin" id={user_id}>

                <CardMedia
                    className="hpx200 "
                    image={ image}
                    title="Course Section"
                />

                {/*<img src={image} alt={image}/>*/}
                <CardContent>
                    <div className="row col-12 m-0">
                        <LabelValueRow label={"نام"} value={name} className="col-sm-12  "/>
                        <LabelValueRow label={"شماره"} value={phone_number} className="col-sm-12  "/>
                    </div>

                    <div className="row pl-3 justify-content-end">

                        {
                            field!==""? <LabelValueRow label={"رشته"} value={field} className="col-sm-12 col-md-6"/>:""
                        }


                        <LabelValueRow label={"پایه"} value={grade} className="col-sm-12 col-md-6"/>

                        {/*<span className="second-color pl-2"> {field } </span>*/}
                    </div>
                </CardContent>

            <CardActions className="d-flex justify-content-center flex-column">
                <div className="w-100">
                    <AddPreviewPdf GetData={ Handelcontent}
                                   label={"اضافه کردن فایل "} img={content }
                                   Type="content" errors={error}/>

                </div>
                <div className="100">
                    <LabelValueRow label={"زمان"} value={date} className="col-sm-12 col-md-6 justify-content-center"/>

                </div>

                {/*<Button onClick={()=>{setIsOpen(!isOpen)}} className="btn red-background">حذف</Button>*/}
            </CardActions>





        </Card>
    );
};

export default UserSchedule;