import React, {useState, useEffect} from 'react';
import {DeleteID, DeleteLesson} from "../../../functions/ServerConnection";
import {error_Notification, formatNumber, success_Notification} from "../../../functions/componentHelpFunction";
import {TweenMax} from "gsap/TweenMax";
import Card from "@material-ui/core/Card/Card";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import LabelValueRow from "../../../Common/LabalValue/LabelValue";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {Button} from "reactstrap";
import {ModalDelete} from "../../../Common/Modals/ModalDelete/ModalDelete";










const LessonCardMain = (props) => {

    const {match: {params}} =  props;




    let{name,additional_percentage_chapters,additional_percentage_course,chapter_count,image,price_for_chapters,price_for_course,price}=props;
    let course_id=params.id

    const [count, setCount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        // Update the document title using the browser API

        document.title = `You clicked ${count} times`;
    });
    const handelDelete = async() => {
        setIsOpen(false);

        let Data={
            "course_id": course_id,
            "lesson_name": name
        };

        let {state ,Description}=await DeleteLesson(JSON.stringify(Data));
        if (state===200 ) {
            success_Notification("حذف شد");
            // props.updateContent();
            const $el = document.getElementById(`${name}`);
            const duration = 2;
            const from = { opacity: 0};
            TweenMax.to($el, duration, from);
            setTimeout(() => {
                $el.remove();
            }, 2000)

        } else {
            error_Notification(state, Description)
        }
        setIsOpen(!isOpen)
    };
    const handelEdit=()=>{
        console.log("edit");

        props.getCourseID(props.index)
        // props.changeIndex( )


    };


    return (
        <div className=" col-sm-12 col-md-4 p-0">
            <Card className="m-2 br20px h-100 h-min-24vw  box-shadow-custom  " id={name}>
                <Link to={`/content/lesson/${course_id}/${props.index}/${name}`} className="pt-4">

                    <CardMedia
                        className="hpx200 "
                        image={image}
                        title="Course Section"
                    />

                    <CardContent>
                        <div className="row col-12 m-0">
                            {/*<div className="d-inline-block  ">*/}
                                {/*<div className="d-flex flex-column" dir="rtl">*/}
                                    {/*<span className="header-color "> {formatNumber(price)} تومان </span>*/}
                                    {/*/!*{off!==0?<span className="  red-color  text-decoration-line-through">{ formatNumber(price) } تومان</span>:""}*!/*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <span className="header-color mr-auto  ">{name}</span>

                        </div>

                        <div className="row pl-3">
                            {/*<LabelValueRow label={"درصد مازاد فصل"} value={additional_percentage_chapters} className="col-sm-12 col-md-6"/>*/}
                            {/*<LabelValueRow label={"درصد مازاد دوره"} value={additional_percentage_course} className="col-sm-12 col-md-6"/>*/}
                            <LabelValueRow label={"تعداد فصل"} value={chapter_count} className="col-sm-12 col-md-6"/>
                            <LabelValueRow label={"قیمت"} value={price} className="col-sm-12 col-md-6"/>
                            <LabelValueRow label={"قیمت برای فصل"} value={price_for_chapters}
                                           className="col-sm-12 col-md-6   "/>
                            <LabelValueRow label={"قیمت برای دوره"} value={price_for_course}
                                           className="col-sm-12 col-md-6     "/>

                        </div>
                    </CardContent>
                </Link>
                <CardActions className="d-flex justify-content-center">
                    <Button onClick={() => {
                        setIsOpen(!isOpen)
                    }} className="btn red-background">حذف</Button>
                    <Link to={`/content/course/${course_id}/${props.index}`}  >
                    <Button onClick={handelEdit} className="btn btn-warning">ویرایش</Button>
                    </Link>
                </CardActions>


                <ModalDelete isOpen={isOpen} toggle={() => {
                    setIsOpen(!isOpen)
                }} item={name} deleteComponent={handelDelete}/>
            </Card>
        </div>


    );
};
export default LessonCardMain;