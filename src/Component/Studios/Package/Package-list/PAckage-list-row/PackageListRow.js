import React, {Component, useState} from 'react';
import {ActivePackage, DeleteClassRoom, DeletePackage} from "../../../../functions/ServerConnection";
import {error_Notification, RemoveElement, success_Notification} from "../../../../functions/componentHelpFunction";
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
    const [isActive, setIsActive] = useState(false);
    const [Activate, setActivate] = useState(props.is_active);

    console.log(props);

    let{is_active,id,information:{grade,field },name}=props;
    const handelDelete = async() => {
        let {state ,Description}=await DeletePackage(id);
        if (state===200 ) {
            success_Notification("حذف شد");
            RemoveElement(id)

        } else {
            error_Notification(state, Description)
        }
        setIsOpen(!isOpen)
    };
    const handelَActive = async() => {
        let {state ,Description}=await ActivePackage(id);
        if (state===200 ) {
            success_Notification(!Activate?"فعال شد":"غیرفعال شد");
            setActivate(!Activate);

        } else {
            error_Notification(state, Description)
        }
        setIsActive(!isActive);
        setActivate(!Activate);
    };

    return (
        <Card className="mt-2 box-shadow-custom br20px col-sm-12 col-md-6 col-lg-4" id={id}>



            <Link to={`/studio/package/detail/${id}`}  >
                <div className="row m-0 card-body">
                    <RowShowShowColEdit label={"دوره"} value={grade}   className={"col-6 d-flex justify-content-start p-0"}/>
                    <RowShowShowColEdit label={"رشته"} value={field}   className={"col-6  d-flex justify-content-start p-0"}/>
                    <RowShowShowColEdit label={"فعال"} value={Activate?"هست":"نیست"}   className={"col-6  d-flex justify-content-start p-0"}/>

                </div>
            </Link>
            <CardActions className="d-flex justify-content-center">
                <Button onClick={()=>{setIsOpen(!isOpen)}} className="btn red-background">حذف</Button>
                <Link to={`/studio/package/update/${id}`}  >
                    <Button   className="btn btn-warning">ویرایش</Button>
                </Link>
                <Button onClick={()=>{setIsActive(!isActive)}} className="btn btn-primary">{!Activate?"فعال":"غیر فعال"}</Button>


            </CardActions>
                 <ModalDelete isOpen={isOpen} toggle={()=>{setIsOpen(!isOpen)}} item={"پکیج"}  deleteComponent={handelDelete}/>
            <ModalDelete isOpen={isActive} toggle={()=>{setIsActive(!isActive)}} item={"پکیج"} type={!Activate?"فعال کردن":"غیرفعال کردن"}  deleteComponent={handelَActive}/>


        </Card>

    );
};

export default PackageListRow;
