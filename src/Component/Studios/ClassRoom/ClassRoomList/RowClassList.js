import React, {useState, useEffect} from 'react';
import RowShowShowColEdit from "../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import {RowShowShowEditWithoutLabel} from "../../../Common/RowShowShowColEdit/ShowInRowComponents";

const RowClassList = (props) => {
    const [option, setoption] = useState({});
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        const live_information = {
            "websocket": "ws://localhost:8000/live/ehsan.flv",
            "hls": "http://localhost:8000/live/ehsan/index.m3u8",
            "rtmp": "rtmp://localhost/live/ehsan",
            "dash": "http://localhost:8000/live/ehsan/index.mpd",
            "http_flv": "http://localhost:8000/live/ehsan.flv"
        };
        setoption({"label":Object.keys(live_information),"value":Object.values(live_information)})
    },[]);
    // console.log( "option.label");
    // console.log( option.label);


    return (
        <div className="w-100">

                <div className="row m-0 card-body">
                    <RowShowShowColEdit label={"دوره"} value={"حال است "}   className={"col-6"}/>
                    <RowShowShowColEdit label={"دوره"} value={"حال است "}   className={"col-6"}/>
                    <RowShowShowColEdit label={"دوره"} value={"حال است "}   className={"col-6"}/>
                    <RowShowShowColEdit label={"دوره"} value={"حال است "}   className={"col-6"}/>
                    {
                        option.label?  option.label.map((value,index)=> <RowShowShowColEdit label={value } value={option.value[index]} key={index}  className={"col-12"}/>):""
                    }



                </div>


        </div>
    );
};

export default RowClassList;

