import React, {useState, useEffect} from 'react';
import {GetClassroom} from "../../../../../functions/ServerConnection";
import RowShowShowColEdit from "../../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import IsLoaderComponent from "../../../../../Common/ISLodader/IsLoader";
import ax from "../../../../../Common/img/final cover.jpg"
import flv from "../../../../../../assets/flv.flv"
import {Button} from "reactstrap";
import VideoModalDemo from "../../../../../Common/VideoPlayerComponents/VideoModal/VideoModalDemo";
import ModalCustomVideo from "../../../../../Common/Modals/ModalCustom";
import NewWebsocketPlayer from "./NewWebsocketPlayer/NewWebsocketPlayer";
import NewHLSPlayer from "./NewHLSPlayer/NewHLSPlayer";
const video= "https://resource.kelidiha.com/admin/course/stream/item_video/5ea9dac81314a6b4f5d06bbf/2LLYqNin2YYg2KfZhtqv2YTbjNiz24w=/2K7Yp9mG2YUg2KfYs9iq2KfYryDYrNi52YHYsduM/TGVzc29uIDEgOiAgTXkgTmF0aW9uYWxpdHk=/2b7Yp9ix2KogMQ==/index.m3u8"
const video_cover= "https://stream.kelidiha.com/public/item/5ea9dac81314a6b4f5d06bbf/2LLYqNin2YYg2KfZhtqv2YTbjNiz24w=/2K7Yp9mG2YUg2KfYs9iq2KfYryDYrNi52YHYsduM/TGVzc29uIDEgOiAgTXkgTmF0aW9uYWxpdHk=/2b7Yp9ix2KogMQ==/video_cover/image.png"

const ClassDetailInRoot = (props) => {
    const [Description, setDescription] = useState([]);
    const [isLoader, setisLoader] = useState(true);
    useEffect(  () => {
        // Update the document title using the browser API
        // return //for componentDidMount
          getClassDetail(props.match.params.id)
        setisLoader(false);


    }, [props]);
    const getClassDetail=async (id)=>{
      let {state,Description}=  await GetClassroom(id)
         setDescription(Description)
        props.getGroupId(Description.group_chat_id);
        // console.log(Description)
         // const {active,id,information:{grade,field,lesson_name},payment: {price},live_urls:{dash,hls,http_flv,rtmp,websocket}}=Description;
    }



    return (
        <IsLoaderComponent isLoader={isLoader}>
            <div>
                {
                    Description.length!==0 && Description.information!==undefined?
                        <div className=" row m-0">
                            <RowShowShowColEdit label={"دوره"} value={Description.information.grade}   className={"col-4 d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"رشته"} value={Description.information.field}   className={"col-4  d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"درس"} value={Description.information.lesson_name}   className={"col-4  d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"فعال"} value={Description.active?"هست":"نیست"}   className={"col-4  d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"قیمت"} value={Description.payment.price}   className={"col-4  d-flex justify-content-start p-0"}/>
                            <RowShowShowColEdit label={"کلید"} value={Description.live_urls.key}   className={"col-4  d-flex justify-content-start p-0"}/>


                            <div className="w-100">
                                <Button outline size="sm" color="primary" className="float-right mt-3">
                                    شروع کلاس
                                </Button>
                            </div>

                            <div className="w-100 row    ">
                                <div   className={['h-15em','d-flex','flex-column', ' col-4 mt-3' ,'align-items-center'  ].join(' ')}>
                                    {/*<img src={ax} alt={Description.live_urls.dash} className=' br10px h-100 w-100'/>*/}
                                    {/*<VideoModalDemo  video={Description.live_urls.dash} img={video_cover} type={"application/dash+xml"}/>*/}
                                    {/*<NewHLSPlayer url={"https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd"}/>*/}
                                    <NewHLSPlayer url={Description.live_urls.dash}/>

                                    <label ><RowShowShowColEdit label={"پخش"} value={"dash" }  col={ 'col-12'} className='fS1vw'/>
                                    </label>
                                 </div>
                                <div   className={['h-15em','d-flex','flex-column', ' col-4 mt-3' ,'align-items-center'  ].join(' ')}>
                                    {/*<img src={ax} alt={Description.live_urls.hls} className=' br10px h-100 w-100'/>*/}
                                    {/*<VideoModalDemo  video={Description.live_urls.hls} img={video_cover} type='application/x-mpegURL'/>*/}
                                    {/*<NewHLSPlayer url={"https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"}/>*/}
                                    <NewHLSPlayer url={Description.live_urls.hls}/>

                                    <label ><RowShowShowColEdit label={"پخش"} value={ "hls"}  col={ 'col-12'} className='fS1vw'/>
                                    </label>
                                </div>
                                <div   className={['h-15em','d-flex','flex-column', ' col-4 mt-3' ,'align-items-center'  ].join(' ')}>
                                    {/*<img src={ax} alt={Description.live_urls.http_flv} className=' br10px h-100 w-100'/>*/}
                                    <NewWebsocketPlayer  url={Description.live_urls.http_flv}/>
                                    <label ><RowShowShowColEdit label={"پخش"} value={"http_flv" }  col={ 'col-12'} className='fS1vw'/>
                                    </label>
                                </div>
                                <div   className={['h-15em','d-flex','flex-column', ' col-4 mt-5' ,'align-items-center'  ].join(' ')}>
                                    {/*<img src={ax} alt={Description.live_urls.http_flv} className=' br10px h-100 w-100'/>*/}
                                    <VideoModalDemo  video={flv} img={ax} type="application/x-mpegURL"/>
                                    {/*<NewWebsocketPlayer  url={Description.live_urls.rtmp}/>*/}
                                    <label ><RowShowShowColEdit label={"پخش"} value={ "http_flv"}  col={ 'col-12'} className='fS1vw'/>
                                    </label>
                                </div>
                                <div   className={['h-15em','d-flex','flex-column', ' col-4 mt-5' ,'align-items-center'  ].join(' ')}>
                                    {/*<VideoModalDemo  video={"rtmp://example.fcod.llnwd.net/a1111/e11/test/example/file.flv"} img={Description.live_urls.rtmp} type='rtmp/mp4'/>*/}
                                    {/*<VideoModalDemo  video={video} img={Description.live_urls.rtmp} type='rtmp/mp4'/>*/}
                                    <NewWebsocketPlayer  url={Description.live_urls.rtmp}/>

                                    {/*<img src={ax} alt={Description.live_urls.rtmp} className=' br10px h-100 w-100'/>*/}


                                    <label ><RowShowShowColEdit label={"پخش"} value={"rtmp" }  col={ 'col-12'} className='fS1vw'/>
                                    </label>
                                </div>
                                <div   className={['h-15em','d-flex','flex-column', ' col-4 mt-5' ,'align-items-center'  ].join(' ')}>
                                    {/*<VideoModalDemo  video={Description.live_urls.websocket} img={ax} type='rtmp/mp4'/>*/}
                                    {/*<img src={ax} alt={Description.live_urls.websocket} className=' br10px h-100 w-100'/>*/}
                                    <NewWebsocketPlayer  url={Description.live_urls.websocket}/>

                                    <label ><RowShowShowColEdit label={"پخش"} value={"websocket" }  col={ 'col-12'} className='fS1vw'/>
                                    </label>
                                </div>
                            </div>

                        </div>:""
                }

            </div>
        </IsLoaderComponent>


    );
};

export default ClassDetailInRoot;
