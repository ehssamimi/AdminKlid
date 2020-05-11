import React, {useState, useEffect} from 'react';
import {Progress} from "reactstrap";
import AddVideoConvert from "../../../Common/AddVideoConver/AddVideoConvert";
import {GetProgressive, GetUserInfo} from "../../../functions/ServerConnection";
import {getProfileValue} from "../../../functions/componentHelpFunction";
import {NotificationManager} from "react-notifications";
import {  TweenMax} from "gsap/TweenMax";

const InProgressListVideo = (props) => {

    // "location": {
    //     "course_id": "5ea9dac81314a6b4f5d06bbf",
    //         "lesson_name": "عربی",
    //         "teacher_name": "استاد مژگان فروتن",
    //         "chapter_name": "الدرس الاول : دوره هفتم و هشتم",
    //         "item_name": "پارت 3"
    // },
    // "action": "item_video",


    const [time_left, settime_left] = useState(props.time_left);
    const [state, setstate] = useState(props.state);
    const [percentage, setpercentage] = useState(props.percentage);
    const [type, setType] = useState("");
    const [intervalId, setintervalId] = useState('');
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



    return (

            <div className="d-flex flex-column col-12" id={props.index}>
                <div className="d-flex justify-content-between align-items-start mt-1   ">
                    <span className="fs16calc"> زمان باقی مانده :{ time_left}</span>

                </div>

                <Progress bar animated color={type } value={percentage} className={percentage>0?"br10px p-2 text-black-color ":""}>{percentage +"%"+ " " +state  }</Progress>
            </div>

    );
};

export default InProgressListVideo;