import React, {Component} from 'react';
import ChatRightTop from "./Chat-right-top/Chat-right-top";
import ChatLeftRight from "./ChatLeftRight/ChatLeftRight";
import InputSendMessage from "./InputSendMessage/InputSendMessage";
 class Tab2ChatBox extends Component {
    render() {
        return (
            <div className="row col-12">
                <ChatLeftRight chatBg={"bg-chat-mySelf border-chat-mySelf"}/>
                <ChatLeftRight chatBg={"bg-chat-other border-chat-other"}/>
                <ChatRightTop chatBg={"green-background border-chat-left"}/>
                <InputSendMessage/>


            </div>
        );
    }
}

export default Tab2ChatBox;