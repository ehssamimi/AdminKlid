import React, {useState, useEffect} from 'react';
import {GetClassroom} from "../../../../../functions/ServerConnection";
import RowShowShowColEdit from "../../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import IsLoaderComponent from "../../../../../Common/ISLodader/IsLoader";

const ClassDetailInRoot = (props) => {
    const [Description, setDescription] = useState([]);
    const [isLoader, setisLoader] = useState(true);
    useEffect(async () => {
        // Update the document title using the browser API
        // return //for componentDidMount
        await getClassDetail(props.match.params.id)
        setisLoader(false);
    }, [props]);
    const getClassDetail=async (id)=>{
      let {state,Description}=  await GetClassroom(id)
        console.log(Description);
        setDescription(Description)
        // const {active,id,information:{grade,field,lesson_name},payment: {price},live_urls:{dash,hls,http_flv,rtmp,websocket}}=Description;
    }
    if (Description.length!==0){

    }



    return (
        <IsLoaderComponent isLoader={isLoader}>
            <div>
                {
                    Description.length!==0 && Array.isArray(Description)?
                        <div>
                            <RowShowShowColEdit label={"دوره"} value={Description.information.grade}   className={"col-4 d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"رشته"} value={Description.information.field}   className={"col-4  d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"درس"} value={Description.information.lesson_name}   className={"col-4  d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"فعال"} value={Description.active?"هست":"نیست"}   className={"col-4  d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"قیمت"} value={Description.payment.price}   className={"col-4  d-flex justify-content-start p-0"}/>
                        </div>:""
                }

            </div>
        </IsLoaderComponent>


    );
};

export default ClassDetailInRoot;
