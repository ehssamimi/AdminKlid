import React, {useState, useEffect} from 'react';
import VideoPlayerMain from "../VideoPlayerMain";
import PlayVideo169 from "../PlayVideo/PlayVideo";
import profile from "../../../../Common/img/profile.jpg";
import CheckBoxCustom from "../../CheckBoxCustom/CheckBoxCustom";
import {FaRegDotCircle, FaCheck,FaAngleRight,FaAngleLeft} from "react-icons/fa";
import {GiStopwatch} from "react-icons/gi";
import {FiDownload} from "react-icons/fi";
import ShowMoreDescription from "../../../Main/Main-Courses/IntroducingCoursse/ShowMoreDescription/ShowMoreDescription";
import {Link} from "react-router-dom";

const VideoModal = (props) => {
    // const [count, setCount] = useState(1);
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });
    let{index ,items}=props.file;

    // video: "https://stream.kelidiha.com/item/video/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWU4MmE0MjJkYzVkODdjZWFkM2JhYjQyIiwib3RoZXJzIjp7fSwic2VlZCI6OTE4NjN9.sXUiLnLmHQq1NsXJIMB4TGhgcnEcZMoMG-N1yaLatHw/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/2YXZgdin2YfbjNmFINin2YjZhNuM2Yc=/index.m3u8"
// video_cover: "https://stream.kelidiha.com/public/item/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/2YXZgdin2YfbjNmFINin2YjZhNuM2Yc=/video_cover/image.png"
// audio: "https://stream.kelidiha.com/item/item_audio/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWU4MmE0MjJkYzVkODdjZWFkM2JhYjQyIiwib3RoZXJzIjp7fSwic2VlZCI6OTE4NjN9.sXUiLnLmHQq1NsXJIMB4TGhgcnEcZMoMG-N1yaLatHw/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/2YXZgdin2YfbjNmFINin2YjZhNuM2Yc=/audio.mp3"
// description: "string"
// name: "مفاهیم اولیه"
// downloadable_content: "https://stream.kelidiha.com/item/item_downloadable_content/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWU4MmE0MjJkYzVkODdjZWFkM2JhYjQyIiwib3RoZXJzIjp7fSwic2VlZCI6OTE4NjN9.sXUiLnLmHQq1NsXJIMB4TGhgcnEcZMoMG-N1yaLatHw/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/2YXZgdin2YfbjNmFINin2YjZhNuM2Yc=/pdf.pdf"
// time_to_done: 3
// is_free: false
// is_locked: false
// is_seen: false
    console.log(items[index].downloadable_content)




    return (
        <div className="w-100 h-min-20em" dir="rtl">
          <div style={{height:"60%"}}>
              <PlayVideo169 video={items[index].video} img={items[index].video_cover}/>
          </div>
            <div style={{height:"40%"}}>
                <div className="col-12 pl-3 pr-0 pt-2 pb-2    ">
                    <div className=" d-flex align-items-center">
                        <div className="mr-3 green-them">
                            <span className= ' ' ><GiStopwatch/></span>
                            <span className= ' mr-2 ml-1' >{items[index].time_to_done} </span>
                        </div>
                        <div className="mr-3 green-them">
                            <span className= ' ' ><FiDownload/></span>
                            <span className=' mr-2'>
                                <a href={items[index].downloadable_content} target="_blank" download className="second-color ml-1 ">دانلود جزوه</a>
                            </span>

                        </div>
                        <div className="mr-3 second-color">
                            {
                                !items[index].is_seen?<div className="d-flex">
                                        <span className= ' '    ><FaCheck/></span>
                                        <span className= '  mr-2 ml-1'    > شما این درس را قبلا مشاهده کرده اید </span>
                                    </div>:
                                    <div className="ml-auto">
                                        <span className= ' '    ><FaRegDotCircle/></span>
                                        <span className= '  mr-2 ml-1'    > شما این درس را قبلا مشاهده نکرده اید </span>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="mt-4">

                        <ShowMoreDescription header={items[index].name} class="pl-3 pr-3"
                                             desc={items[index].description}/>

                    </div>


                    <div className="d-flex second-color pl-3 pr-3 mt-4 mb-3">
                        <div>
                            <span className= ' ' ><FaAngleRight/></span>
                            <span className= ' mr-2' > جلسه قبلی </span>
                        </div>
                        <div  className="ml-auto">
                            <span className= ' mr-2' > جلسه بعدی </span>
                            <span className= ' ' ><FaAngleLeft/></span>
                        </div>
                    </div>


                </div>


            </div>
        </div>
    );
};

export default VideoModal;