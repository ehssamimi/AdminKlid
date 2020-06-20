import React, {Component, useState} from 'react';
import {DeleteClassRoom} from "../../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../../functions/componentHelpFunction";
import {TweenMax} from "gsap/TweenMax";
import {Button, Card} from "reactstrap";
import {Link} from "react-router-dom";
import RowShowShowColEdit from "../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import PreviewVideoComponent from "../../../../Common/PreviewVideoComponent/PreviewVideoComponent";
import defaultImg from "../../../../../assets/common/img/default_pic@3x.png";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {ModalDelete} from "../../../../Common/Modals/ModalDelete/ModalDelete";



const PackageListRow = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log(props);
    // id: "5eede639b6b169988e473de5"
    // information: {grade: "یازدهم", field: "تجربی"}
    // is_active: false
    // name: "new"
    let{is_active,id,information:{grade,field },name}=props;
    const handelDelete = async() => {
        let {state ,Description}=await DeleteClassRoom(id);
        if (state===200 ) {
            success_Notification("حذف شد");
            const $el = document.getElementById(`${id}`);
            props.UpdateClassList();
            console.log($el);
            $el.classList.add("opacity-0")
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

    return (
        <Card className="mt-2 box-shadow-custom br20px" id={id}>



            <Link to={`/studio/classroom/detail/${id}`}  >
                <div className="row m-0 card-body">
                    <RowShowShowColEdit label={"دوره"} value={grade}   className={"col-6 d-flex justify-content-start p-0"}/>
                    <RowShowShowColEdit label={"رشته"} value={field}   className={"col-6  d-flex justify-content-start p-0"}/>
                      <RowShowShowColEdit label={"فعال"} value={is_active?"هست":"نیست"}   className={"col-6  d-flex justify-content-start p-0"}/>





                </div>
            </Link>
            <CardActions className="d-flex justify-content-center">
                <Button onClick={()=>{setIsOpen(!isOpen)}} className="btn red-background">حذف</Button>
                <Link to={`/studio/classroom/edit/${id}`}  >
                    <Button   className="btn btn-warning">ویرایش</Button>
                </Link>

            </CardActions>



            <ModalDelete isOpen={isOpen} toggle={()=>{setIsOpen(!isOpen)}} item={"کلاس"}  deleteComponent={handelDelete}/>

        </Card>

    );
};

export default PackageListRow;
