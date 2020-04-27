import React, {useState, useEffect} from 'react';
import {DeleteID, DeleteLesson} from "../../../functions/ServerConnection";
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

const TeacherCardMain = (props) => {

    const {match: {params}} =  props;
    console.log(params.id);



    let{name,image,demo_video,demo_video_cover, total_videos_time   }=props;
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

        let Data={
            "course_id": course_id,
            "lesson_name": name
        };

        let {state ,Description}=await DeleteLesson(JSON.stringify(Data));
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
                <Link to={`#`} className="pt-4">

                    <CardMedia
                        className="hpx200 "
                        image={image}
                        title="Course Section"
                    />

                    <CardContent>



                        <div className="row pl-3" dir="rtl">

                            <LabelValueRow label={"نام معلم"} value={name} className="col-sm-12 col-md-6"/>
                            <LabelValueRow label={"زمان تقریبی ویدیو"} value={total_videos_time} className="col-sm-12 col-md-6"/>

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
                    {/*<Link to={`/content/courses/${course_id}`}  >*/}
                    <Button onClick={handelEdit} className="btn btn-warning">ویرایش</Button>
                    {/*</Link>*/}
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
export default TeacherCardMain;
