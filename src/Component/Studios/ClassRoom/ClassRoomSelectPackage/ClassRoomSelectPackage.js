import React, {useState,useEffect} from 'react';
import RowShowShowColEdit from "../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import {Button, Card, CardBody} from "reactstrap"
import PreviewVideoComponent from "../../../Common/PreviewVideoComponent/PreviewVideoComponent";
import defaultImg from'./../../../../assets/common/img/default_pic@3x.png'
import {Link} from "react-router-dom";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {ModalDelete} from "../../../Common/Modals/ModalDelete/ModalDelete";
import {ActionCladdToPackage, DeleteClassRoom} from "../../../functions/ServerConnection";
import {error_Notification, RemoveElement, success_Notification} from "../../../functions/componentHelpFunction";
import {TweenMax} from "gsap/TweenMax";

const ClassRoomSelectPackage = (props) => {
    const [IsInclude, setIsInclude] = useState(false);
    console.log(props);
    let{id,information:{grade,field,lesson_name},live_information:{dash,hls,http_flv,rtmp,websocket},payment: {price}}=props;

    useEffect(() => {
        const array=props.classess.map(item=>item.id===props.id );
        console.log(array);
        let x=array.includes(true);
        setIsInclude(x)

        // Update the document title using the browser API
     },[props]);

    const handelAddPackage = async(action) => {
        let {state ,Description}=await ActionCladdToPackage(action,props.packageId,props.id  );
        if (state===200 ) {

            success_Notification(action==="add"?"کلاس مورد نظر اضافه شد":"کلاس مورد نظر با موفقیت حذف شد");
            props.UpdateClassList();
            RemoveElement(id);
        } else {
            error_Notification(state, Description)
        }
     };
console.log(IsInclude);
    return (
        <Card className="mt-2 box-shadow-custom br20px" id={id}>




                <div className="row m-0 card-body">
                    <RowShowShowColEdit label={"دوره"} value={grade}   className={"col-6 d-flex justify-content-start p-0"}/>
                    <RowShowShowColEdit label={"رشته"} value={field}   className={"col-6  d-flex justify-content-start p-0"}/>
                    <RowShowShowColEdit label={"درس"} value={lesson_name}   className={"col-6  d-flex justify-content-start p-0"}/>
                    <RowShowShowColEdit label={"هزینه"} value={price }   className={"col-6  d-flex justify-content-start p-0"}/>


                </div>

            <CardActions className="d-flex justify-content-center">


                {
                    IsInclude?<Button className="btn btn-danger br10px" onClick={()=>handelAddPackage("remove")} >حذف </Button>:<Button  className="btn btn-warning br10px" onClick={()=>handelAddPackage("add")}>اضافه کردن </Button>
                }



            </CardActions>




        </Card>

    );
};

export default ClassRoomSelectPackage;



