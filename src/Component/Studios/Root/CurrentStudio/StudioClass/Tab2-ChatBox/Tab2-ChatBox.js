import React, {useState, useEffect,Component} from 'react';
// import React, {Component} from 'react';
import ChatRightTop from "./Chat-right-top/Chat-right-top";
import ChatLeftRight from "./ChatLeftRight/ChatLeftRight";
import InputSendMessage from "./InputSendMessage/InputSendMessage";
import io from "socket.io-client";
import PackageListRow from "../../../../Package/Package-list/PAckage-list-row/PackageListRow";
import {GetAllUser, GetHistoryChat, GetUserProfileImg} from "../../../../../functions/ServerConnection";
import TestChat from "./TEST-CHAT";
import {error_Notification} from "../../../../../functions/componentHelpFunction";
import InfiniteScrollReverse from "react-infinite-scroll-reverse";
import Loader from "../../../../../Common/Loader/Loader";
import PreviewUserCard from "../../../../../User/UserShowAll/Subs/PreviewUserCard";
import profile from "../../../../../../assets/common/img/profile-pic-l-5.jpg";

// const   socket = io.connect('http://live.kelidiha.com:3004/live_class', {
//     transportOptions: {
//         polling: {
//             extraHeaders: {
//                 'token': "5e82a422dc5d87cead3bab42",
//                 "gpid": "5efa3bafcd52cdd9ea00ddc2",
//                 "classid": "includeamin"
//             }
//         }
//     },
//     path: '/ws/socket.io'
// });

class Tab2ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state={
            messages:[],InitialData:[],productSeparate:[],pageStart:1,hasMore:true,UsersIDImg:{UsersIDImg:[],UsersId:[]},gid:null,
            socket: io.connect('http://live.kelidiha.com:3004/live_class', {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            'token': "5e82a422dc5d87cead3bab42",
                            "gpid": props.gid,
                            "classid": props.classId
                        }
                    }
                },
                path: '/ws/socket.io'
            })
        }
    }



    async componentDidMount() {

        const   socket = io.connect('http://live.kelidiha.com:3004/live_class', {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'token': "5e82a422dc5d87cead3bab42",
                        "gpid": this.props.gid,
                        "classid": this.props.classId
                    }
                }
            },
            path: '/ws/socket.io'
        });

        this.state.socket.on('set_user_info', (data) => {
            // console.log("set_user_info")
            console.log("componentDidMountcomponentDidMount")
            console.log(data)
            this.setState({
                InitialData:data
            })
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

        let ReciveData;
       socket.on('gp_msg',async (data)=>{
            console.log("gp_msg")
            var d = new Date();
            var h = d.getHours()+":"+d.getMinutes();
            console.log(h)
            data["time"]=h
            // await getHistorychat(data.sid)
            console.log(data)
            // setMessage(prevMessages=>[...prevMessages,data])
            let{UsersIDImg}=this.state;
            if ( UsersIDImg["UsersId"].includes(data.sid)){

                // this.setState(prevState => ({
                //     messages:[...prevState.messages,data]
                // }));
                let MList = this.state.productSeparate;
                console.log("MList")
                console.log(MList)
                MList.unshift(data);
                console.log(MList)
                this.setState({
                    productSeparate:MList
                })


            }else {
                let {state ,Description }=await GetUserProfileImg(data.sid);
                console.log("Description")
                console.log(Description)
                let Ussers=UsersIDImg;
                let Use={"sid":data.sid,"profile":Description}
                Ussers["UsersId"].push(data.sid);
                Ussers["UsersIDImg"].push(Use);
                // this.setState(prevState => ({
                //     messages:[...prevState.messages,data],
                //     UsersIDImg:Ussers
                // }));
                let MList = this.state.productSeparate;
                console.log("MList")
                console.log(MList)
                MList.unshift(data);
                console.log(MList)
                this.setState({
                    productSeparate:MList,
                    UsersIDImg:Ussers
                })



            }




            // cn: " asa"
            // ct: "txt"
            // gid: "5efa3bafcd52cdd9ea00ddc2"
            // sid: "5e82a422dc5d87cead3bab42"
            // sn: "amin jamal"
            // time: "23:36"
        })


        // await this.loadMore();

    }

      loadMore = async () => {
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
          let{UsersIDImg,pageStart}=this.state;
        let {state, Description} = await GetHistoryChat(this.props.gid,pageStart,"5efa3bafcd52cdd9ea00ddc2");
        console.log("Description");
        console.log(Description);
        console.log("pageStart")
        console.log(pageStart)


        // let Response = await GetAllProduct(pageStart);
        if (Response !== 'error') {
            let {messages, page} = Description;
            // *** modify  products to our label value ***


            // content: "hi im ehsan but in amin account"
            // content_type: "txt"
            // create_at: "2020-07-13T10:45:22.122000"
            // group_id: "5f0b520d0668b20bda5e957a"
            // id: "5f0c3e420c195e3a2d575bbc"
            // reply_to: null
            // sender_id: "5e82a422dc5d87cead3bab42"
            // sender_name: "amin jamal"
            // sender_type: "admin"


            // cn: " غهع"
            // ct: "txt"
            // gid: "5f0b520d0668b20bda5e957a"
            // sid: "5e82a422dc5d87cead3bab42"
            // sn: "amin jamal"
            // st: "admin"
            // time: "14:55"
            let productsSeparate =[];
            console.log(messages);
            messages.map((item, index)=>{
                let product={}
                product["sn"]=item.sender_name;
                product["cn"]=item.content;
                product["sid"]=item.sender_id;
                product["time"]=item.create_at.slice(11, 16);
                product["st"]=item.sender_type;

                productsSeparate.push(product)
            })

            for (let i=0;i<messages.length;i++){
                if (UsersIDImg["UsersId"].includes(messages[i].sender_id)){

                }else {
                    let {state ,Description }=await GetUserProfileImg(messages[i].sender_id);
                    console.log("Description")
                    console.log(Description)
                    let Ussers=UsersIDImg;
                    let Use={"sid":messages[i].sender_id,"profile":Description}
                    Ussers["UsersId"].push(messages[i].sender_id);
                    Ussers["UsersIDImg"].push(Use);
                    this.setState({
                        UsersIDImg:Ussers
                    })

                }

            }
            // let {state ,Description }=await GetUserProfileImg(user_id);
            // *******update state*****
            console.log(productsSeparate)
            console.log(this.state.productSeparate)
            console.log(this.state.pageStart)
            this.setState(prevState => ({
                productSeparate:[...prevState.productSeparate,...productsSeparate],
                pageStart:page + 1,
                hasMore:messages.length !== 0

            }),()=>{
                console.log(this.state.pageStart)
                console.log(this.state.productSeparate)
                console.log(this.state.UsersIDImg)
            });
            // setproductSeparate([...productSeparate, ...productsSeparate]);


            // await GetUserProfileImg("5e82a422dc5d87cead3bab42");
            // content: " ahmad"
            // content_type: "txt"
            // create_at: "2020-07-04T14:22:36.103000"
            // group_id: "5efa3bafcd52cdd9ea00ddc2"
            // id: "5f00d6fc2f3d927653560124"
            // reply_to: null
            // sender_id: "5e82a422dc5d87cead3bab42"
            // sender_name: "amin jamal"


            // setpageStart(page + 1);
            // ***** check if product length is zero then stop loop****
            // sethasMore(messages.length !== 0);
        } else {
            error_Notification('Network Error')
        }
    };

    static getDerivedStateFromProps(props, state) {
        if (props.gid !== state.gid) {
            return {
                gid: props.gid,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    sendMessage=(value)=>{
        let{InitialData}=this.state;
        let message = {
            cn: value,
            ct: "txt",
            gid: this.props.gid,
            sn: InitialData.message.name,
            sid: InitialData.message.user_id,
            st:"admin"
        }

        console.log(message)
        this.state.socket.emit('send_packet',message)
        console.log("sendMessage")
        console.log(value)
        // let ChatList=document.getElementById()
        // window.scrollTo(0,document.body.scrollHeight);
        // setMessage(prevMessages=>[...prevMessages,message])

    }


    render() {
        let{messages,productSeparate,hasMore,UsersIDImg}=this.state
        console.log(productSeparate);
        return (
            <div>


                <InfiniteScrollReverse
                    className="row rtl m-0 overFlow-y-scroll hpx300 pl-4 d-flex  w-100  flex-wrap align-items-end"
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={ hasMore}
                    loadArea={10}
                    loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
                >
                    {/*<div className='d-flex  w-100  flex-wrap align-items-end'>*/}
                        {productSeparate.length > 0 && Array.isArray(productSeparate) ?
                            productSeparate.slice(0).reverse().map((todo, index) =>
                                todo.st === "admin" ?
                                    <ChatRightTop chatBg={"green-background border-chat-left"}
                                                   key={index} {...todo} UsersIDImg={UsersIDImg}/>


                                    : <ChatLeftRight chatBg={"bg-chat-other border-chat-other"}
                                                     key={index} {...todo} UsersIDImg={UsersIDImg}/>



                            // <ChatRightTop chatBg={"green-background border-chat-left"}  key={index} {...todo} UsersIDImg={UsersIDImg}/>
                            ) : ''
                        }
                    {/*</div>*/}
                </InfiniteScrollReverse>



                {/*{*/}
                {/*    messages.length>0?*/}
                {/*        messages.map((item,index)=>*/}
                {/*                <ChatRightTop chatBg={"green-background border-chat-left"}  key={index} {...item} UsersIDImg={UsersIDImg}/>*/}
                {/*            // <ChatRightTop chatBg={"green-background border-chat-left"}  key={index} {...item}/>*/}

                {/*            )*/}
                {/*        :""*/}
                {/*}*/}
                <InputSendMessage sendMessage={this.sendMessage}/>

            </div>
        );
    }
}

export default Tab2ChatBox;
