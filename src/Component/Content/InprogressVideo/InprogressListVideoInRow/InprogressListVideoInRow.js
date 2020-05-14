import React, {useState, useEffect} from 'react';
import {Card,CardBody,Progress} from "reactstrap";
import AddVideoConvert from "../../../Common/AddVideoConver/AddVideoConvert";
import {GetProgressive, GetUserInfo, ResetEachVideoInProgress} from "../../../functions/ServerConnection";
import {error_Notification, getProfileValue, success_Notification} from "../../../functions/componentHelpFunction";
import {NotificationManager} from "react-notifications";
import {  TweenMax} from "gsap/TweenMax";
import {handelTypeVideo} from "../../../functions/Functions";
import {RowShowShowColEdit} from "../../../Common/RowShowShowColEdit/ShowInRowComponents";

const InProgressListVideo = (props) => {


    let{location}=props;
  console.log(props)
    // action: "item_video"
    // file_name: "riazi_sajjadi_yazdahom_fasle6_part10.mp4"
    // index: 0
    // is_complete: false
    // last_update: "2020-05-11T17:22:10.807000"
    // location: {course_id: "5ea9d7291314a6b4f5d06bbe", lesson_name: "حسابان 1", teacher_name: "مهندس سجادی", chapter_name: "حد و پیوستگی", item_name: "پارت 9"}
    // percentage: 95
    // state: "queue"
    // task_id: "351354aa-7fa8-469c-9f0d-722d98c41298"
    // text: "
    // Transcoding...(95%) 0:02:00 left [###############################################################################################-----]"
    // time_left: "0:02:00 left"


    const [time_left, settime_left] = useState(props.time_left);
    const [state, setstate] = useState(props.state);
    const [percentage, setpercentage] = useState(props.percentage);
    const [type, setType] = useState("");
    const [intervalId, setintervalId] = useState('');
    // const [kind, setkind] = useState('');
    //
    // let vv = handelTypeVideo(props.action)
    // setkind(vv);
     useEffect((props) => {



        async function getData(  ) {

            var intervalId = setInterval( await  timer, 30000);
            setintervalId(intervalId)

        }
         getData()
         SetTypeValue(percentage)
        return ()=>( clearInterval(intervalId))
    },[]);


    const timer=async ( )=>{
        let {state ,Description }=await GetProgressive(props.action,props.location );
        console.log(Description)
        let{percentage,is_complete,time_left}=Description
        settime_left(time_left);setstate(Description.state); setpercentage(percentage);SetTypeValue(percentage)
        if (is_complete===true){

            setTimeout(function(){
                const $el = document.getElementById(props.index);
                const duration = 2;
                const from = { opacity: 0};
                TweenMax.to($el, duration, from);
                setTimeout(function(){
                    const $el = document.getElementById(props.index);
                    $el.remove();


                }, 21000);

            }, 10000);

            clearInterval(intervalId);
        }


    }

    const SetTypeValue=(percentage)=>{
        if (percentage>0&&percentage<20) {
            setType("info");

        }
        if (percentage>20&&percentage<70) {
            setType("success");

        }
        if (percentage>70&&percentage<100) {
            setType("warning");


        }    if ( percentage===100) {
            setType("danger");

        }
    }
    const handelReset=async()=>{

        let {state ,Description}=ResetEachVideoInProgress(props.task_id);
        if (state===200){
            success_Notification("موفق شدید " ,"این ویدیو دوباره بارگذاری می شود")
        } else {
            error_Notification(state,Description)
        }
    }



    return (
        <Card className="w-100 m-2 " id={props.index}>
            <CardBody >
                <div>

                    <div className="d-flex  mb-2" >
                        {/*{<span className="second-color">{item.content.course_name}</span>}*/}
                        {/*{item.content.grade?<span className="second-color"><span className="second-color ml-2"> | </span>{item.content.grade}</span>:""}*/}
                        {location.lesson_name?<span className="second-color"><span className="second-color  ">  </span>{location.lesson_name}</span>:""}
                        {location.teacher_name?<span className="second-color"><span className="second-color ml-2"> | </span>{location.teacher_name}</span>:""}
                        {location.chapter_name?<span className="second-color"><span className="second-color ml-2"> | </span>{location.chapter_name}</span>:""}
                        {location.item_name?<span className="second-color"><span className="second-color ml-2"> | </span>{location.item_name}</span>:""}
                        {/*{chapter?<span className="second-color"><span className="second-color ml-2"> | </span>{chapter}</span>:""}*/}

                    </div>
                    <RowShowShowColEdit label={`  ویدیو   ${handelTypeVideo(props.action)}`} value={props.file_name } className='p-0 d-flex justify-content-start col-12 mt-2 mb-2' />


                </div>

                <div className="d-flex flex-column col-12" >
                    <div className="d-flex justify-content-between align-items-start mt-1   ">
                        <span className="fs16calc"> زمان باقی مانده :{ time_left}</span> <span className="btn btn-danger" onClick={handelReset}>ریست</span>
                    </div>
                    <Progress bar animated color={type } value={percentage} className={percentage>0?"br10px p-2 text-black-color ":""}>{percentage +"%"+ " " +state  }</Progress>
                </div>
            </CardBody>

        </Card>

    );
};

export default InProgressListVideo;