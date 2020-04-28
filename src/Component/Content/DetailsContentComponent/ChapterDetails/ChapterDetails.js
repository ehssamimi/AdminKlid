import React, {useState, useEffect} from 'react';
import {DeleteID, DeleteLesson, DeleteTecherUrl} from "../../../functions/ServerConnection";
import {error_Notification, formatNumber, success_Notification} from "../../../functions/componentHelpFunction";
import {TweenMax} from "gsap/TweenMax";
import Card from "@material-ui/core/Card/Card";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import LabelValueRow from "../../../Common/LabalValue/LabelValue";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {Button} from "reactstrap";
import {ModalDelete} from "../../../Common/Modals/ModalDelete/ModalDelete";
import ModalCustomVideo from "../../../Common/Modals/ModalCustom";
import VideoModalDemo from "../../../Common/VideoPlayerComponents/VideoModal/VideoModalDemo";
import VideoModal from "../../../Common/VideoPlayerComponents/VideoModal/VideoModal";
import {FaRegPlayCircle} from "react-icons/fa";
import {FiDownload} from "react-icons/fi";
import AddTeachers from "../../AddContentComponent/AddTeachers/AddTeachers";

const ChapterDetails = (props) => {

    const {match: {params}} =  props;
    console.log(params );

    {/*create_at: "2020-04-12T10:56:09.082000"*/}
    {/*demo_video: "https://stream.kelidiha.com/public/chapter/5e9318063414ab42e3239506/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/stream/index.m3u8"*/}
    {/*demo_video_cover: "https://stream.kelidiha.com/public/chapter/5e9318063414ab42e3239506/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/demo-video/image.png"*/}
    {/*image: "https://stream.kelidiha.com/public/chapter/5e9318063414ab42e3239506/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/image.png"*/}
    {/*items: [{…}]*/}
    {/*name: "انتگرال"*/}
    {/*price: 36000*/}
    {/*total_video_times: 4*/}



    let{name,image,demo_video,demo_video_cover, total_video_times,price   }=props;
    let course_id=params.id;

    const [count, setCount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoader, setIsLoader] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const[videos,setVideos]=useState({type:"",video:[]});
    useEffect(() => {
        // Update the document title using the browser API

        document.title = `You clicked ${count} times`;
    });
    const handelDelete = async() => {
        setIsOpen(false);

        // Course_id,Lesson_name,teacher_name
        const {match: {params}} =  props;
        let {state ,Description}=await DeleteTecherUrl(params.id,params.lesson,name);
        if (state===200 ) {
            success_Notification("حذف شد");
            // props.updateContent();
            const $el = document.getElementById(`${name}`);
            const duration = 2;
            const from = { opacity: 0};
            TweenMax.to($el, duration, from);
            setTimeout(() => {
                $el.remove();
            }, 2000)

        } else {
            error_Notification(state, Description)
        }
        setIsOpen(!isOpen)
    };
    const handelEdit=()=>{
        console.log("edit");

        props.getCourseID(props.index)

    };

    const toggle = (type,value) => {

        setIsOpenModal(!isOpenModal);
        if (type==="main"){
            setVideos({type,video:value});
        } else {
            setVideos({type,video:value});
        }
    };



    return (
        <div className=" col-sm-12 col-md-4 p-0">
            <Card className="m-2 br20px h-100 h-min-24vw  box-shadow-custom  " id={name}>
                {/*teacher/:id/:index/:lesson/:TeacherIndex/:teacher/:chapterIndex?*/}
                {/*/content/lesson/${course_id}/${props.index}/${name}*/}
                {/*lesson/:id/:index/:lesson/:TeacherIndex?*/}

                {/*TeacherIndex: "0"*/}
                {/*id: "5ea5b5b4d677657bec5531b2"*/}
                {/*index: "0"*/}
                {/*lesson: "احسان صمیمی راد"*/}





                {/*<Link to={`/content/teacher/${course_id}/${params.index}/${params.lesson}/${props.index}/${name}`} className="pt-4">*/}
                <Link to={`#`} className="pt-4">

                    <CardMedia
                        className="hpx200 "
                        image={image}
                        title="Course Section"
                    />

                    <CardContent>



                        <div className="row pl-3" dir="rtl">

                            <LabelValueRow label={"نام معلم"} value={name} className="col-sm-12 col-md-6"/>

                            <LabelValueRow label={"زمان تقریبی ویدیو"} value={total_video_times} className="col-sm-12 col-md-6"/>
                            <LabelValueRow label={"قیمت"} value={price} className="col-sm-12 col-md-6"/>

                            <div className="mr-3 green-them cursor-pointer col-sm-12 mt-3 d-flex justify-content-center" onClick={( )=>{ toggle('demo',[demo_video_cover,demo_video])}}>
                                <span className= ' '    ><FaRegPlayCircle/></span>
                                <span className= '  mr-2'    > مشاهده پیش نمایش  </span>
                            </div>

                        </div>
                    </CardContent>
                </Link>


                <CardActions className="d-flex justify-content-center mt-2">
                    <Button onClick={() => {
                        setIsOpen(!isOpen)
                    }} className="btn red-background">حذف</Button>
                    <Link to={`/content/teacher/${course_id}/${params.index}/${params.lesson}/${params.TeacherIndex}/${name}/${props.index}`}  >

                        <Button onClick={handelEdit} className="btn btn-warning">ویرایش</Button>
                    </Link>
                </CardActions>


                <ModalDelete isOpen={isOpen} toggle={() => {
                    setIsOpen(!isOpen)
                }} item={name} deleteComponent={handelDelete}/>
            </Card>

            <ModalCustomVideo isOpen={isOpenModal} toggle={toggle}>
                {
                    videos.type==="demo"?<VideoModalDemo  video={videos.video[1]} img={videos.video[0]}/>:""
                }
                {
                    videos.type==="main"?<VideoModal file={videos.video} />:""
                }

            </ModalCustomVideo>
        </div>


    );
};
export default ChapterDetails;
