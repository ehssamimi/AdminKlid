import React, {useState, useEffect} from 'react';
import profile1 from "../../../../../../../assets/common/img/profile-pic-l-5.jpg";
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].sid === nameKey) {
            return myArray[i];
        }
    }
}

 const ChatRightTop = (props) => {
    const [profile, setProfile] = useState(profile1);
    useEffect(() => {
        let arr=search(props.sid,props.UsersIDImg["UsersIDImg"])
        console.log(props.sid)
        console.log(props.UsersIDImg["UsersIDImg"])
        console.log(arr)
        console.log(arr.profile)
         const reader = new FileReader();
        reader.onload = () => {

            setProfile( [reader.result])
        };
        reader.readAsDataURL(arr.profile );

        console.log("next user")

    }, [props]);


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
                        <span className= "chat-header  IranSans " >{props.time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatRightTop;