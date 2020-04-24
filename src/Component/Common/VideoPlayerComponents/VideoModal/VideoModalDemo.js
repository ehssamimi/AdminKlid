import React, {useState, useEffect} from 'react';
import VideoPlayerMain from "../VideoPlayerMain";
import PlayVideo169 from "../PlayVideo/PlayVideo";
import profile from "../../../../Common/img/profile.jpg";
import CheckBoxCustom from "../../CheckBoxCustom/CheckBoxCustom";
import {FaRegDotCircle, FaCheck,FaAngleRight,FaAngleLeft} from "react-icons/fa";
import {GiStopwatch} from "react-icons/gi";
import {FiDownload} from "react-icons/fi";
import ShowMoreDescription from "../../../Main/Main-Courses/IntroducingCoursse/ShowMoreDescription/ShowMoreDescription";

const VideoModalDemo = (props) => {
    // const [count, setCount] = useState(1);
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });

    return (
        <div className="w-100  " dir="rtl">
            <div style={{height:"100%"}}>
                <PlayVideo169 video={props.video} img={props.img}/>
            </div>

        </div>
    );
};

export default VideoModalDemo;