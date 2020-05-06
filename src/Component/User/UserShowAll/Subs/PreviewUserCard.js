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
    let{name,grade,field,image,phoneNumber }=props;
    // const [count, setCount] = useState(1);
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });

    return (
        <div className="  MainCardCourseHeight  col-sm-6 col-md-4   ">
            <Card  className= "     br20px  box-shadow-custom FsFooterLogin w-100 h-100   m-1 " id={phoneNumber}>
                <Link to={`/content/course/${phoneNumber}`}  className="pt-4">


                    {/*<CardMedia*/}
                    {/*// className={props.class}*/}
                    {/*className={'this is courseeeeeeeeeeeeeeeeee'}*/}
                    {/*image={image}*/}
                    {/*title="Course Section"*/}
                    {/*/>*/}
                    <CardMedia
                        className="hpx200 "
                        image={ image}
                        title="Course Section"
                    />

                    {/*<img src={image} alt={image}/>*/}
                    <CardContent>


                        <div className="d-flex col-12 justify-content-center text-center">
                            <span className="header-color text-center  ">{ name}</span>
                        </div>

                        <LabelValueRow label={"شماره تماس"} value={phoneNumber} className="d-flex col-12 justify-content-center text-center   "/>




                        <div className="row pl-3 justify-content-end">
                            {/*<span className="second-color">{grade} </span>*/}
                            {/*<span className="second-color"> {field? "|"+ field:""} </span>*/}
                            {
                                field!==""? <LabelValueRow label={"رشته"} value={field} className="col-sm-12 col-md-6  "/>:""
                            }


                            <LabelValueRow label={"پایه"} value={grade} className="col-sm-12 col-md-6  "/>

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