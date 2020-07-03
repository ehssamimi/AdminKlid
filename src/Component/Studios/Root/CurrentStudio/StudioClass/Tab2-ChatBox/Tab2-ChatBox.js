import React, {useState, useEffect} from 'react';
// import React, {Component} from 'react';
import ChatRightTop from "./Chat-right-top/Chat-right-top";
import ChatLeftRight from "./ChatLeftRight/ChatLeftRight";
import InputSendMessage from "./InputSendMessage/InputSendMessage";
import io from "socket.io-client";
import PackageListRow from "../../../../Package/Package-list/PAckage-list-row/PackageListRow";


const Tab2ChatBox = (props) => {
    const [messages, setMessage] = useState([]);
    const [InitialData, setInitialData] = useState({});
    const   socket = io.connect('http://live.kelidiha.com:3004/live_class', {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'token': "5e82a422dc5d87cead3bab42",
                    "gpid": "5efa3bafcd52cdd9ea00ddc2",
                    "classid": "includeamin"
                }
            }
        },
        path: '/ws/socket.io'
    });


    useEffect(() => {


        socket.on('set_user_info', (data) => {
            console.log("set_user_info")
            console.log(data)
            setInitialData(data)
            // document.getElementById("user_id").textContent = data.message.user_id;
            // document.getElementById("name").textContent = data.message.name;
            // document.getElementById('chat').disabled = false;
            // document.getElementById('send').disabled = false;
        })
        socket.on('gp_msg',(data)=>{
            console.log("gp_msg")
            console.log(data)
            setMessage(prevMessages=>[...prevMessages,data])

            // console.log(data)
            // add_to_history(data)
        })






        // Update the document title using the browser API
        // return //for componentDidMount

    }, []);
    const sendMessage=(value)=>{
        let message = {
            cn: value,
            ct: "txt",
            gid: "5efa3bafcd52cdd9ea00ddc2",
            sn: InitialData.message.name,
            sid: InitialData.message.user_id
        }

        console.log(message)
        socket.emit('send_packet',message)
        console.log("sendMessage")
        console.log(value)
        // setMessage(prevMessages=>[...prevMessages,message])

    }


    return (
        <div className="row col-12">
            <ChatLeftRight chatBg={"bg-chat-mySelf border-chat-mySelf"}/>
            <ChatLeftRight chatBg={"bg-chat-other border-chat-other"}/>
            {/*<ChatRightTop chatBg={"green-background border-chat-left"}/>*/}
            {
                messages.length>0?
                    messages.map((item,index)=> <ChatRightTop chatBg={"green-background border-chat-left"}  key={index} {...item}/> )
                    :""
            }


            <InputSendMessage sendMessage={sendMessage}/>


        </div>
    );
};

export default Tab2ChatBox;
