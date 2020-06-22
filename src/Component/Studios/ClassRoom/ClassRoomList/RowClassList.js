import React, {useState} from 'react';
import RowShowShowColEdit from "../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import {Button, Card, CardBody} from "reactstrap"
 import PreviewVideoComponent from "../../../Common/PreviewVideoComponent/PreviewVideoComponent";
import defaultImg from'./../../../../assets/common/img/default_pic@3x.png'
import {Link} from "react-router-dom";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {ModalDelete} from "../../../Common/Modals/ModalDelete/ModalDelete";
import {DeleteClassRoom} from "../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
import {TweenMax} from "gsap/TweenMax";

const RowClassList = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log(props);
    let{active,id,information:{grade,field,lesson_name},live_information:{dash,hls,http_flv,rtmp,websocket},payment: {price}}=props;
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
                    <RowShowShowColEdit label={"درس"} value={lesson_name}   className={"col-6  d-flex justify-content-start p-0"}/>
                    <RowShowShowColEdit label={"هزینه"} value={price }   className={"col-6  d-flex justify-content-start p-0"}/>
                    {/*<RowShowShowColEdit label={"فعال"} value={active?"هست":"نیست"}   className={"col-6  d-flex justify-content-start p-0"}/>*/}


                    <div className="col-6 p-0">
                        <PreviewVideoComponent video={[defaultImg, dash]} label={"پخش dash"}/>

                    </div>
                    <div className="col-6 p-0">
                        <PreviewVideoComponent video={[defaultImg, hls]} label={"پخش hls"}/>

                    </div>
                    <div className="col-6 p-0">
                        <PreviewVideoComponent video={[defaultImg, http_flv]} label={"پخش http_flv"}/>

                    </div>
                    <div className="col-6 p-0">
                        <PreviewVideoComponent video={[defaultImg, rtmp]} label={"پخش rtmp"}/>

                    </div>
                    <div className="col-6 p-0">
                        <PreviewVideoComponent video={[defaultImg, websocket]} label={"پخش websocket"}/>

                    </div>


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

export default RowClassList;

