import React, {useEffect, useState} from "react";
import {GetHistoryChat, GetUserProfileImg} from "../../../../../functions/ServerConnection";
import {error_Notification} from "../../../../../functions/componentHelpFunction";
import io from "socket.io-client";
import InfiniteScrollReverse from "react-infinite-scroll-reverse";
import Loader from "../../../../../Common/Loader/Loader";
import ChatRightTop from "./Chat-right-top/Chat-right-top";
import InputSendMessage from "./InputSendMessage/InputSendMessage";

const TestChat = (props) => {
    const [productSeparate, setproductSeparate] = useState([]);
    const [pageStart, setpageStart] = useState(1);
    const [hasMore, sethasMore] = useState(true);
    const [Users, setUsers] = useState([]);
    const [UsersIDImg, setUsersIDImg] = useState({UsersIDImg:[],UsersId:[]});

    const loadMore = async () => {
        // messages: (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // page: 1
        // content: " ahmad"
        // content_type: "txt"
        // create_at: "2020-07-04T14:22:36.103000"
        // group_id: "5efa3bafcd52cdd9ea00ddc2"
        // id: "5f00d6fc2f3d927653560124"
        // reply_to: null
        // sender_id: "5e82a422dc5d87cead3bab42"
        // sender_name: "amin jamal"
        // ***get all product and current page ***
        // let {state, Description} = await GetAllUser(pageStart);
        let {state, Description} = await GetHistoryChat("5efa3bafcd52cdd9ea00ddc2",pageStart,"5efa3bafcd52cdd9ea00ddc2");
        console.log("Description");
        console.log(Description);
        console.log("pageStart")
        console.log(pageStart)


        // let Response = await GetAllProduct(pageStart);
        if (Response !== 'error') {
            let {messages, page} = Description;
            // *** modify  products to our label value ***
            let productsSeparate =[];
            messages.map((item, index)=>{
                let product={}
                product["sn"]=item.sender_name;
                product["cn"]=item.content;
                product["si"]=item.sender_id;
                product["time"]=item.create_at.slice(11, 16);

                productsSeparate.push(product)
            })
            console.log(productsSeparate)
            for (let i=0;i<messages.length;i++){
                if (UsersIDImg["UsersId"].includes(messages[i].sender_id)){

                }else {
                    let {state ,Description }=await GetUserProfileImg(messages[i].sender_id);
                    console.log("Description")
                    console.log(Description)
                    let Ussers=UsersIDImg;
                    let Use={"si":messages[i].sender_id,"profile":Description}
                    Ussers["UsersId"].push(messages[i].sender_id);
                    Ussers["UsersIDImg"].push(Use);
                    setUsersIDImg(Ussers)
                }



            }
            // let {state ,Description }=await GetUserProfileImg(user_id);
            // *******update state*****
            setproductSeparate([...productSeparate, ...productsSeparate]);


            // await GetUserProfileImg("5e82a422dc5d87cead3bab42");
            // content: " ahmad"
            // content_type: "txt"
            // create_at: "2020-07-04T14:22:36.103000"
            // group_id: "5efa3bafcd52cdd9ea00ddc2"
            // id: "5f00d6fc2f3d927653560124"
            // reply_to: null
            // sender_id: "5e82a422dc5d87cead3bab42"
            // sender_name: "amin jamal"


            setpageStart(page + 1);
            // ***** check if product length is zero then stop loop****
            sethasMore(messages.length !== 0);
        } else {
            error_Notification('Network Error')
        }
    };







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


    useEffect(async () => {
        // await getHistorychat()


        async function getsockets() {
            socket.on('set_user_info', (data) => {
                // console.log("set_user_info")
                // console.log(data)
                setInitialData(data)
                // document.getElementById("user_id").textContent = data.message.user_id;
                // document.getElementById("name").textContent = data.message.name;
                // document.getElementById('chat').disabled = false;
                // document.getElementById('send').disabled = false;
            })
            // async function getNewChat(){
            //
            //
            //
            // }


            socket.on('gp_msg',(data)=>{
                console.log("gp_msg")
                var d = new Date();
                var h = d.getHours()+":"+d.getMinutes();
                console.log(h)
                data["time"]=h
                // await getHistorychat(data.sid)
                console.log(data)
                setMessage(prevMessages=>[...prevMessages,data])




                // cn: " پیام "
                // ct: "txt"
                // gid: "5efa3bafcd52cdd9ea00ddc2"
                // sid: "5e82a422dc5d87cead3bab42"
                // sn: "amin jamal"
                // time: "23:27"
            })
        }
        getsockets()


        // Update the document title using the browser API
        // return //for componentDidMount

    }, []);

    const getHistorychat=async ()=>{
        let {state ,Description }=await GetHistoryChat("5efa3bafcd52cdd9ea00ddc2",1,"5efa3bafcd52cdd9ea00ddc2");
        console.log(Description)
    }
    const getImgProfile=async (user_id)=>{
        let {state ,Description }=await GetUserProfileImg(user_id);
        console.log(Description)
    }



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
            {/*<ChatLeftRight chatBg={"bg-chat-mySelf border-chat-mySelf"}/>*/}
            {/*<ChatLeftRight chatBg={"bg-chat-other border-chat-other"}/>*/}


            <InfiniteScrollReverse
                className="row rtl m-0 overFlow-scroll vh35"
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loadArea={10}
                loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
            >
                <div className='d-flex  w-100  flex-wrap'>
                    {productSeparate.length > 0 && Array.isArray(productSeparate) ?
                        productSeparate.slice(0).reverse().map((todo, index) =>{
                                console.log("this is reader")
                            }

                            // <ChatRightTop chatBg={"green-background border-chat-left"}  key={index} {...todo} UsersIDImg={UsersIDImg}/>
                        ) : ''
                    }
                </div>
            </InfiniteScrollReverse>

            {
                messages.length>0?
                    messages.map((item,index)=> <ChatRightTop chatBg={"green-background border-chat-left"}  key={index} {...item}/> )
                    :""
            }




            <InputSendMessage sendMessage={sendMessage}/>


        </div>
    );
};

export default TestChat;