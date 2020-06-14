import React, {useState, useEffect} from 'react';
import {Button, Card} from "reactstrap";
import {Link} from "react-router-dom";
import RowShowShowColEdit from "../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import PreviewVideoComponent from "../../../../Common/PreviewVideoComponent/PreviewVideoComponent";
import defaultImg from "../../../../../assets/common/img/default_pic@3x.png";


const DetailsClassRoom = (props) => {
    // const [count, setCount] = useState(1);
     useEffect(() => {
        // Update the document title using the browser API
        console.log(props);

     },[props]);
//
    const {active,id,information:{grade,field,lesson_name},payment: {price},live_urls:{dash,hls,http_flv,rtmp,websocket}}=props;

    return (
        <div>
            <Card className="mt-2 box-shadow-custom br20px" id={id}>


                    <div className="row m-0 card-body">
                        <RowShowShowColEdit label={"دوره"} value={grade}   className={"col-4 d-flex justify-content-start p-0"}/>
                        <RowShowShowColEdit label={"رشته"} value={field}   className={"col-4  d-flex justify-content-start p-0"}/>
                        <RowShowShowColEdit label={"درس"} value={lesson_name}   className={"col-4  d-flex justify-content-start p-0"}/>
                        <RowShowShowColEdit label={"فعال"} value={active?"هست":"نیست"}   className={"col-4  d-flex justify-content-start p-0"}/>
                        <RowShowShowColEdit label={"قیمت"} value={price}   className={"col-4  d-flex justify-content-start p-0"}/>

                        <div className="col-4 p-0">
                            <PreviewVideoComponent video={[defaultImg, dash]} label={"پخش dash"}/>

                        </div>
                        <div className="col-4 p-0">
                            <PreviewVideoComponent video={[defaultImg, hls]} label={"پخش hls"}/>

                        </div>
                        <div className="col-4 p-0">
                            <PreviewVideoComponent video={[defaultImg, http_flv]} label={"پخش http_flv"}/>

                        </div>
                        <div className="col-4 p-0">
                            <PreviewVideoComponent video={[defaultImg, rtmp]} label={"پخش rtmp"}/>

                        </div>
                        <div className="col-4 p-0">
                            <PreviewVideoComponent video={[defaultImg, websocket]} label={"پخش websocket"}/>

                        </div>


                    </div>







            </Card>

        </div>
    );
};

export default DetailsClassRoom;