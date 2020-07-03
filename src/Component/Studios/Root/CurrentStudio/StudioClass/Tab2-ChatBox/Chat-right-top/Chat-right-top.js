import React, {useState, useEffect} from 'react';
import profile from "../../../../../../../assets/common/img/profile-pic-l-5.jpg";

const ChatRightTop = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    console.log(props);


    return (
        <div className="col-12 row  mt-3 p-0">
            <div className="width-chat-profile position-relative">
               <div className="profile-pic-chat  br-r50  p-05 position-absolute br-g">
                    <img src={  profile} alt="profile" className="img-self-cover br-r50 br-y "/>
                </div>
            </div>

                <div className={["talk-bubble tri-right round-top-right   right-top    ",`${props.chatBg}`].join(" ")}>
                <div className="talktext">
                    <p className="chat-header  IranSans">{props.sn}</p>
                    <p className={["lineHeight3 IranSans  ",`${props.chatBg.includes("bg-chat-other")?"text-black":"text-white"}`].join(" ")}   >{props.cn}</p>
                    <div className="w-100 d-flex justify-content-end">
                        <span className= "chat-header  IranSans " >17:35</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatRightTop;