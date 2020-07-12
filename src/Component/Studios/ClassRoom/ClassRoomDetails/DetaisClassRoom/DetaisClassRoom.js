import React, {useState, useEffect} from 'react';
import {Button, Card, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";
import RowShowShowColEdit from "../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import PreviewVideoComponent from "../../../../Common/PreviewVideoComponent/PreviewVideoComponent";
import defaultImg from "../../../../../assets/common/img/default_pic@3x.png";
import IsLoaderComponent from "../../../../Common/ISLodader/IsLoader";


const DetailsClassRoom = (props) => {
    // const [count, setCount] = useState(1);
     useEffect(() => {
        // Update the document title using the browser API
        console.log(props);

     },[props]);
//
    const {active,id,information:{grade,field,lesson_name},payment: {price},live_urls:{dash,hls,http_flv,key,rtmp,websocket}}=props;

    return (
     <IsLoaderComponent isLoader={props.information===undefined}>
         <div>



             <div className="row m-0 " id={id}>
                 <div className="w-100">
                     <CardTitle>
                         <h2>مشخصات کلاس</h2>
                     </CardTitle>
                 </div>
                 <div className="row col-12 pl-4     ">
                     <RowShowShowColEdit label={"دوره"} value={grade} labelClass={"FsFooterLogin   " }  valueClass={"FsFooterLogin gray1  "}   className={"col-4 d-flex justify-content-start p-0 vertical-middle"}/>
                     <RowShowShowColEdit label={"رشته"} value={field}  labelClass={"FsFooterLogin" }  valueClass={"FsFooterLogin gray1"} className={"col-4  d-flex justify-content-start p-0 vertical-middle"}/>
                     <RowShowShowColEdit label={"درس"} value={lesson_name} labelClass={"FsFooterLogin" }  valueClass={"FsFooterLogin gray1"}  className={"col-4  d-flex justify-content-start p-0 vertical-middle"}/>
                     <RowShowShowColEdit label={"فعال"} value={active?"هست":"نیست"}  labelClass={"FsFooterLogin" }  valueClass={"FsFooterLogin gray1"} className={"col-4  d-flex justify-content-start p-0 vertical-middle"}/>
                     <RowShowShowColEdit label={"قیمت"} value={price} labelClass={"FsFooterLogin" }  valueClass={"FsFooterLogin gray1"}  className={"col-4  d-flex justify-content-start p-0 vertical-middle"}/>
                     <RowShowShowColEdit label={"کلید"} value={key} labelClass={"FsFooterLogin" }  valueClass={"FsFooterLogin gray1"}  className={"col-4  d-flex justify-content-start p-0 vertical-middle"}/>
                 </div>



                 {/*<div className="col-4 p-0">*/}
                 {/*    <PreviewVideoComponent video={[defaultImg, dash]} label={"پخش dash"}/>*/}

                 {/*</div>*/}
                 {/*<div className="col-4 p-0">*/}
                 {/*    <PreviewVideoComponent video={[defaultImg, hls]} label={"پخش hls"}/>*/}

                 {/*</div>*/}
                 {/*<div className="col-4 p-0">*/}
                 {/*    <PreviewVideoComponent video={[defaultImg, http_flv]} label={"پخش http_flv"}/>*/}

                 {/*</div>*/}
                 {/*<div className="col-4 p-0">*/}
                 {/*    <PreviewVideoComponent video={[defaultImg, rtmp]} label={"پخش rtmp"}/>*/}

                 {/*</div>*/}
                 {/*<div className="col-4 p-0">*/}
                 {/*    <PreviewVideoComponent video={[defaultImg, websocket]} label={"پخش websocket"}/>*/}

                 {/*</div>*/}


             </div>









         </div>
     </IsLoaderComponent>

    );
};

export default DetailsClassRoom;