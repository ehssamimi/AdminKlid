import React, {Component} from 'react';
import ChatRightTop from "./Chat-right-top/Chat-right-top";
 class Tab2ChatBox extends Component {
    render() {
        return (
            <div className="row col-12">
                <ChatRightTop chatBg={"bg-chat-mySelf border-chat-mySelf"}/>
                <ChatRightTop chatBg={"bg-chat-other border-chat-other"}/>

            </div>
        );
    }
}

export default Tab2ChatBox;