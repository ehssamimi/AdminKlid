import React, {useState, useEffect} from 'react';
import Card from "@material-ui/core/Card/Card";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {formatNumber} from "../../../functions/componentHelpFunction";
import LabelValueRow from "../../../Common/LabalValue/LabelValue";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {Button} from "reactstrap";
import {ModalDelete} from "../../../Common/Modals/ModalDelete/ModalDelete";

const PreviewUserCard = (props) => {
    let{name,grade,field,image,phone_number }=props;
    // const [count, setCount] = useState(1);
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });


    // field: "ریاضی فیزیک"
    // grade: "طرح"
    // image: "https://5e7df4522174ce0011232b00.liara.space/user-service/system/profiles_pic/5e82a422dc5d87cead3bab42?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=11CAOPNDQWXGU8FVAUF2J%2F20200508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200508T170134Z&X-Amz-Expires=25200&X-Amz-SignedHeaders=host&X-Amz-Signature=69ef1b07233f1c264f440c4421386abfb479a48d0eda44e33838efc92feb5517"
    // name: "amin jamal"
    // phone_number: "09119518867"
    //

    return (
        <div className="  MainCardCourseHeight  col-sm-6 col-md-4 mt-4  ">
            <Card  className= "     br20px  box-shadow-custom FsFooterLogin w-100 h-100   m-1 " id={phone_number}>
                <Link to={`/user/info/${phone_number}`}  className="pt-4">


                    {/*<CardMedia*/}
                    {/*// className={props.class}*/}
                    {/*className={'this is courseeeeeeeeeeeeeeeeee'}*/}
                    {/*image={image}*/}
                    {/*title="Course Section"*/}
                    {/*/>*/}
                    <CardMedia
                        className="hpx150 "
                        image={ image}
                        title="Course Section"
                    />

                    {/*<img src={"https://5e7df4522174ce0011232b00.liara.space/user-service/system/profiles_pic/default?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=11CAOPNDQWXGU8FVAUF2J%2F20200508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200508T170348Z&X-Amz-Expires=25200&X-Amz-SignedHeaders=host&X-Amz-Signature=79c4fc8adfa6d66e7280dfbc9d8c4012696385d6b4fa974bd53dca751393fee7"} alt={image}/>*/}
                    <CardContent>


                        <div className="d-flex col-12 justify-content-center text-center">
                            <span className="header-color text-center  ">{ name}</span>
                        </div>

                        <LabelValueRow label={"شماره تماس"} value={phone_number} className="d-flex col-12 justify-content-center text-center   "/>




                        <div className="row     m-0">
                            {/*<span className="second-color">{grade} </span>*/}
                            {/*<span className="second-color"> {field? "|"+ field:""} </span>*/}
                            {
                                field!==""? <LabelValueRow label={"رشته"} value={field} className="col-6 p-0 justify-content-center "/>:""
                            }


                            <LabelValueRow label={"پایه"} value={grade} className="col-6 p-0 justify-content-center "/>

                            {/*<span className="second-color pl-2"> {field } </span>*/}
                        </div>
                    </CardContent>
                </Link>
                {/*<CardActions className="d-flex justify-content-center">*/}
                {/*<Button onClick={()=>{setIsOpen(!isOpen)}} className="btn red-background">حذف</Button>*/}
                {/*<Link to={`/content/courses/${course_id}`}  >*/}
                {/*<Button onClick={handelEdit} className="btn btn-warning">ویرایش</Button>*/}
                {/*</Link>*/}

                {/*</CardActions>*/}




                {/*<ModalDelete isOpen={isOpen} toggle={()=>{setIsOpen(!isOpen)}} item={name}  deleteComponent={handelDelete}/>*/}
            </Card>
        </div>


    );
};

export default PreviewUserCard;