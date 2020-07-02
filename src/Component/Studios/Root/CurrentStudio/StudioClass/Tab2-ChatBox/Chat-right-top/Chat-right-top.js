import React, {useState, useEffect} from 'react';
import profile from "../../../../../../../assets/common/img/profile-pic-l-5.jpg";

const ChatRightTop = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);

    return (
        <div className="col-12 row m-0 p-0">
            <div className="width-chat-profile position-relative">
               <div className="profile-pic-chat  br-r50  p-05 position-absolute">
                    <img src={  profile} alt="profile" className="img-self-cover br-r50 br-y"/>
                </div>
            </div>

                <div className={["talk-bubble tri-right round-top-right   right-top    ",`${props.chatBg}`].join(" ")}>
                <div className="talktext">
                    <p>سهند میرزایی</p>
                    <p className="text-white   lineHeight3"  > اقا من مواردی که در بیان سینوس و کسینوس بود را متوجه نشدم میشه یه بار دیگه برام توضیح بدین اقا من مواردی که در بیان سینوس و کسینوس بود را متوجه نشدم میشه یه بار دیگه برام توضیح بدین!</p>
                </div>
            </div>
        </div>
    );
};

export default ChatRightTop;