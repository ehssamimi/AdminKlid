import React, { useState,useEffect } from 'react';
import { CardBody ,Button} from "reactstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import VideoPlayerMain from "../VideoPlayerComponents/VideoPlayerMain";
 import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
 import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {  TweenMax} from "gsap/TweenMax";
import  Play from'./../img/play_on_video.png'
import  lock from'./../img/lock_on_video.png'
import {formatNumber} from "../../../Component/functions/componentHelpFunction";
import {Link} from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';
import ax1 from "../../Common/img/alex-simpson-8DaRtnotCoQ-unsplash.png";
// import {CourseBuy} from "../../../Common/Const/ServerConnection";
import { useHistory } from 'react-router-dom';
 import LabelValueRow from "../LabalValue/LabelValue";
import {ModalDelete} from "../Modals/ModalDelete/ModalDelete";
import {DeleteID} from "../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../functions/componentHelpFunction";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const PreModal=(props)=>{
    let{img,is_locked,toggle,name,video,audio,video_cover,description ,index,items}=props;
    // let  main={"video":video!==null?video:audio,"video_cover":video_cover,"description":description};

    // items: Array(1)
// 0:
// video: "https://stream.kelidiha.com/item/video/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWU4MmE0MjJkYzVkODdjZWFkM2JhYjQyIiwib3RoZXJzIjp7fSwic2VlZCI6OTE4NjN9.sXUiLnLmHQq1NsXJIMB4TGhgcnEcZMoMG-N1yaLatHw/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/2YXZgdin2YfbjNmFINin2YjZhNuM2Yc=/index.m3u8"
// video_cover: "https://stream.kelidiha.com/public/item/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/2YXZgdin2YfbjNmFINin2YjZhNuM2Yc=/video_cover/image.png"
// audio: "https://stream.kelidiha.com/item/item_audio/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWU4MmE0MjJkYzVkODdjZWFkM2JhYjQyIiwib3RoZXJzIjp7fSwic2VlZCI6OTE4NjN9.sXUiLnLmHQq1NsXJIMB4TGhgcnEcZMoMG-N1yaLatHw/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/2YXZgdin2YfbjNmFINin2YjZhNuM2Yc=/audio.mp3"
// description: "string"
// name: "مفاهیم اولیه"
// downloadable_content: "https://stream.kelidiha.com/item/item_downloadable_content/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWU4MmE0MjJkYzVkODdjZWFkM2JhYjQyIiwib3RoZXJzIjp7fSwic2VlZCI6OTE4NjN9.sXUiLnLmHQq1NsXJIMB4TGhgcnEcZMoMG-N1yaLatHw/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/2KjYrti02YbYr9mH/2KfZhtiq2q-Ysdin2YQ=/2YXZgdin2YfbjNmFINin2YjZhNuM2Yc=/pdf.pdf"
// time_to_done: 3
// is_free: false
// is_locked: false
// is_seen: false

    let main={index:index,items:items};

    // {"src":Video_src,img:ax2,type:"lock"}
    return(

        <div className="w-100 hpx200 position-relative pl-3 " >
            {
                !is_locked ?
                    <img src={video_cover} alt="main img" className="img-self-cover br10px filter-img-course cursor-pointer" onClick={() => {
                        toggle('main', main)
                    }}/> : <img src={video_cover} alt="main img" className="img-self-cover br10px filter-img-course cursor-pointer"/>
            }

            {
                !is_locked? <img src={Play} alt="play" className="img-cover-preLoader cursor-pointer"/>:<img src={lock} alt="lock" className="img-cover-preLoader"/>
            }
            <p className="pt-2 pb-0 second-color">درس {index+1} {name}</p>
        </div>

    )
};




const CourseCard = (props) => {
    // const classes = useStyles();

    return (
        <Card  className="m-2 br20px">

                <CardMedia
                    className="hpx200 "
                    image={props.image}
                    title="Course Section"
                />
                <CardContent>
                    <p className="header-color">{props.name}</p>
                    <div className="second-color">
                        {props.lesson_name?props.lesson_name+" | ":""}  {props.grade}  {props.field? " | "+ props.field:""}
                    </div>

                </CardContent>

            <CardActions className="w-100 d-flex justify-content-center mb-2">
                <a href={`/course/${props.id}`} className="w-100 text-center ">
                    <Button className="btn green-background text-white col-6 fontFamily-Sans br10px">
                        {props.kind==="course"?"مشاهده دوره ":""}
                        {props.kind==="chapter"?"مشاهده قسمت ":""}
                        {props.kind==="lesson"?"مشاهده درس ":""}
                    </Button>

                </a>


            </CardActions>
        </Card>
    );
};

const VideoCardItem=(props)=>{
    const videoJsOptions = {
        autoplay: false,
        fluid: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        // width: 720,
        // height: 300,
        poster:props.poster,
        enableLowInitialPlaylist:true,
        aspectRatio: '16:9',
        controls: true,
        nativeControlsForTouch:true,
        sources: [
            {
                src: props.src,
                type:"application/x-mpegURL"
                // type: 'video/m3u8',
            },
        ],
    };

    return(
        <CardBody>
            <VideoPlayerMain {...videoJsOptions} />
            <div>
                {/*{label}*/}
            </div>
        </CardBody>

    )
};







const CourseCarsMain = (props) => {



    // const history = useHistory();
    // history.push('/login');
     let{name,grade,field,price,image,off,course_id,sub_text }=props;


    const [count, setCount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        // Update the document title using the browser API

        document.title = `You clicked ${count} times`;
    });
    const handelDelete = async() => {
      let {state ,Description}=await DeleteID(course_id);
        if (state===200 ) {
            success_Notification("حذف شد");
            const $el = document.getElementById(`${course_id}`);
            console.log($el);
            $el.classList.add("opacity-0")
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
        props.getCourseID(course_id)

    };


    return (

        <Card  className= "m-2 br20px h-100 h-min-24vw  box-shadow-custom" id={course_id}>
            <Link to={`/content/course/${course_id}`}  className="pt-4">


            {/*<CardMedia*/}
                {/*// className={props.class}*/}
                {/*className={'this is courseeeeeeeeeeeeeeeeee'}*/}
                {/*image={image}*/}
                {/*title="Course Section"*/}
            {/*/>*/}
            <CardMedia
                className="hpx200 "
                image={ image}
                title="Course Section"
            />

            {/*<img src={image} alt={image}/>*/}
            <CardContent>
                <div className="row col-12 m-0">
                    <div className="d-inline-block  ">
                        <div className="d-flex flex-column" dir="rtl" >
                            <span className="header-color " > {  off!==0?formatNumber(price-(price*off)):formatNumber(price)}  تومان </span>
                            {off!==0?<span className="  red-color  text-decoration-line-through">{ formatNumber(price) } تومان</span>:""}
                        </div>
                    </div>
                    <span className="header-color mr-auto  ">{ name}</span>

                </div>

                <div className="row pl-3 justify-content-end">
                    {/*<span className="second-color">{grade} </span>*/}
                    {/*<span className="second-color"> {field? "|"+ field:""} </span>*/}
                    {
                        field!==""? <LabelValueRow label={"رشته"} value={field} className="col-sm-12 col-md-6"/>:""
                    }


                    <LabelValueRow label={"پایه"} value={grade} className="col-sm-12 col-md-6"/>

                    {/*<span className="second-color pl-2"> {field } </span>*/}
                </div>
            </CardContent>
            </Link>
                <CardActions className="d-flex justify-content-center">
                    <Button onClick={()=>{setIsOpen(!isOpen)}} className="btn red-background">حذف</Button>
                    <Link to={`/content/courses/${course_id}`}  >
                        <Button onClick={handelEdit} className="btn btn-warning">ویرایش</Button>
                    </Link>

                </CardActions>




            <ModalDelete isOpen={isOpen} toggle={()=>{setIsOpen(!isOpen)}} item={name}  deleteComponent={handelDelete}/>
        </Card>

    );
};
// const LessonCardMain = (props) => {
//
//     // lessons: Array(1)
//     // 0:
//     // additional_percentage_chapters: 0.2
//     // additional_percentage_course: 0.1
//     // chapter_count: 10
//     // create_at: "2020-04-14T19:59:09.574000"
//     // image: "https://stream.kelidiha.com/public/lesson/5e96169a01d73623037c281d/2LHbjNin2LbbjA==/image.png"
//     // name: "ریاضی"
//     // price: 120000
//     // price_for_chapters: 36000
//     // price_for_course: 108000
//     // teachers: [{…}]
//
//     // const history = useHistory();
//     // history.push('/login');
    {/*const {match: {params}} = this.props;*/}
    {/*console.log(params);*/}



    {/*let{name,additional_percentage_chapters,additional_percentage_course,chapter_count,image,price_for_chapters,price_for_course,price}=props;*/}
    {/*let course_id="123146546wevfkl"*/}

    {/*const [count, setCount] = useState(1);*/}
    {/*const [isOpen, setIsOpen] = useState(false);*/}
    {/*useEffect(() => {*/}
//         // Update the document title using the browser API
//
//         document.title = `You clicked ${count} times`;
//     });
//     const handelDelete = async() => {
//       let {state ,Description}=await DeleteID(course_id);
//         if (state===200 ) {
//             success_Notification("حذف شد");
            {/*const $el = document.getElementById(`${course_id}`);*/}
            {/*const duration = 2;*/}
            {/*const from = { opacity: 0};*/}
            {/*TweenMax.to($el, duration, from);*/}
            {/*setTimeout(() => {*/}
//                 $el.remove();
//             }, 2000)
//
//         } else {
            {/*error_Notification(state, Description)*/}
         {/*}*/}
        {/*setIsOpen(!isOpen)*/}
    {/*};*/}
    {/*const handelEdit=()=>{*/}
        {/*console.log("edit");*/}
        {/*props.getCourseID(course_id)*/}

//     };
//
//
    {/*return (*/}

        {/*<Card  className= "m-2 br20px h-100 h-min-24vw  box-shadow-custom" id={course_id}>*/}
//             <Link to={`/content/course/${course_id}`}  className="pt-4">
//
//
//             {/*<CardMedia*/}
//                 {/*// className={props.class}*/}
//                 {/*className={'this is courseeeeeeeeeeeeeeeeee'}*/}
//                 {/*image={image}*/}
//                 {/*title="Course Section"*/}
//             {/*/>*/}
//             <CardMedia
//                 className="hpx200 "
//                 image={ image}
//                 title="Course Section"
//             />
//
//             {/*<img src={image} alt={image}/>*/}
//             <CardContent>
//                 <div className="row col-12 m-0">
//                     <div className="d-inline-block  ">
//                         <div className="d-flex flex-column" dir="rtl" >
//                             <span className="header-color " > { formatNumber(price)}  تومان </span>
//                             {/*{off!==0?<span className="  red-color  text-decoration-line-through">{ formatNumber(price) } تومان</span>:""}*/}
//                         </div>
//                     </div>
//                     <span className="header-color mr-auto  ">{ name}</span>
//
//                 </div>
//
//                 <div className="row pl-3">
//                     {/*<LabelValueRow label={"درصد مازاد فصل"} value={additional_percentage_chapters} className="col-sm-12 col-md-6"/>*/}
//                     {/*<LabelValueRow label={"درصد مازاد دوره"} value={additional_percentage_course} className="col-sm-12 col-md-6"/>*/}
//                     <LabelValueRow label={"تعداد فصل"} value={chapter_count} className="col-sm-12 col-md-6"/>
//                     <LabelValueRow label={"قیمت"} value={price} className="col-sm-12 col-md-6"/>
//                     <LabelValueRow label={"قیمت برای فصل"} value={price_for_chapters} className="col-sm-12 col-md-6"/>
//                     <LabelValueRow label={"قیمت برای دوره"} value={price_for_course} className="col-sm-12 col-md-6"/>
//
//                     {/*<span className="second-color pl-2"> {field } </span>*/}
//                 </div>
//             </CardContent>
//             </Link>
//                 <CardActions className="d-flex justify-content-center">
//                     <Button onClick={()=>{setIsOpen(!isOpen)}} className="btn red-background">حذف</Button>
//                     <Link to={`/content/courses/${course_id}`}  >
//                         <Button onClick={handelEdit} className="btn btn-warning">ویرایش</Button>
//                     </Link>
//                 </CardActions>
//
//
//
//
//             <ModalDelete isOpen={isOpen} toggle={()=>{setIsOpen(!isOpen)}} item={name}  deleteComponent={handelDelete}/>
//         </Card>
//
//     );
// };









const ButtonGroup = ({ next, previous, goToSlide , ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
        <div className="carousel-button-group">
            <span className= ' border-Carousel p-2 ml-3'  onClick={() => next()}><FaAngleLeft  /></span>
            <span  className={currentSlide === 0 ? 'disable border-Carousel p-2' : 'border-Carousel p-2'} onClick={() => previous()}><FaAngleRight/></span>
            {/*<button  onClick={() => goToSlide(currentSlide + 1)}> Go to any slide </button >*/}
        </div>
    );
};

export  function CarouselMain(props) {

    return <div className="position-relative hpx300  w-100  ">
        {/*h-header-slider*/}
        <div className="d-flex align-items-center ">
            <span className="carousel-header">{props.header} </span>
        </div>

        <Carousel
            additionalTransfrom={0}
             autoPlaySpeed={3000}
            centerMode={false}
            className={['pt-5', props.files.length>2?"":"d-flex justify-content-end"  ].join(' ')}
            containerClass="container-with-dots"
            customButtonGroup={props.files.length>2?<ButtonGroup />:""}
            // customDot={<CustomDot />}
            arrows={false}
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                }
            }}

            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {props.files.map((item,key) => {
                return (
                    <div key={key} id={key} className=""  >

                        {
                            props.type==="Course"?  <CourseCard {...item} kind={props.kind}/>: ""
                        }

                        {/*{*/}
                            {/*props.type==="Course"?  <CourseCard {...item}/>:<VideoCardItem {...item}  />*/}
                        {/*}*/}
                        {
                            props.type==="preModal"?  <PreModal {...item} {...props} index={key} items={props.files}/>:""
                        }
                        {
                            props.type==="courseMain"?  <CourseCarsMain {...item} {...props} index={key}  />:""
                        }
                        {/*{*/}
                            {/*props.type==="lesson"?  <LessonCardMain {...item} {...props} index={key}  />:""*/}
                        {/*}*/}

                    </div>
                );
            })}

        </Carousel>


    </div>
};