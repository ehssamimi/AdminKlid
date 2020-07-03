
import React, {useState, useEffect} from 'react';
import profile from "../../../../../../../assets/common/img/profile-pic-l-5.jpg";

const ChatLeftRight = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);


    return (
        <div className="col-12 row  mt-3 p-0" style={{direction:"ltr"}}>
            <div className="width-chat-profile position-relative">
                <div className="profile-pic-chat  br-r50  p-05 position-absolute br-g  ">
                    <img src={ profile} alt="profile" className="img-self-cover br-r50 br-y  "/>
                </div>
            </div>

            <div className={["talk-bubble tri-right round-top-left  left-top   ",`${props.chatBg}`].join(" ")}>
                <div className="talktext">
                    <p className="chat-header  IranSans d-flex justify-content-start">سهند میرزایی</p>
                    <p style={{direction:"rtl"}} className={["lineHeight3 IranSans text-justify ",`${props.chatBg.includes("bg-chat-other")?"text-black":"text-white"}`].join(" ")}   > اقا من مواردی که در بیان سینوس و کسینوس بود را متوجه نشدم میشه یه بار دیگه برام توضیح بدین اقا من مواردی که در بیان سینوس و کسینوس بود را متوجه نشدم میشه یه بار دیگه برام توضیح بدین!</p>
               <div className="w-100 d-flex justify-content-end">
                   <span className= "chat-header  IranSans " >17:35</span>
               </div>
                </div>
            </div>
        </div>
    );
};

export default ChatLeftRight;