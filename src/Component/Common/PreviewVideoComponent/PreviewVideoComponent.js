import React, {useState, useEffect} from 'react';
import {FaRegPlayCircle} from "react-icons/fa";
import ModalCustomVideo from "../Modals/ModalCustom";
import VideoModalDemo from "../VideoPlayerComponents/VideoModal/VideoModalDemo";
import VideoModal from "../VideoPlayerComponents/VideoModal/VideoModal";

const PreviewVideoComponent = (props) => {
    const [count, setCount] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });


    return (
        <div className={"w-100"}>
            <div className=" mt-3 mr-3 green-them cursor-pointer" onClick={() => setIsOpenModal(!isOpenModal)}>
                <span className=' '><FaRegPlayCircle/></span>
                <span className='  mr-2'> { props.label||"مشاهده پیش نمایش ویدیو"} </span>
            </div>


            <ModalCustomVideo isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>

                    <VideoModalDemo  video={props.video[1]} img={props.video[0]}/>

            </ModalCustomVideo>
        </div>
    );
};

export default PreviewVideoComponent;