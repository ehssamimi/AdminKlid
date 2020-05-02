import React, {useState, useEffect} from 'react';
import {loadCourse, loadMainCourse} from "../../../functions/ServerConnection";
import {NotificationManager} from "react-notifications";
import Loader from "../../../Common/Loader/Loader";
import {CarouselMain} from "../../../Common/Carousel/CarouselMain";
import ax from '../../../Common/img/alex-simpson-8DaRtnotCoQ-unsplash.png'
import {NavLink} from "react-router-dom";
import {Card} from "reactstrap";
import {RowShowShowColEdit} from "../../../Common/RowShowShowColEdit/ShowInRowComponents";
import {convertBaseData} from "../../../functions/componentHelpFunction";
import ModalCustomVideo from "../../../Common/Modals/ModalCustom";
import VideoModalDemo from "../../../Common/VideoPlayerComponents/VideoModal/VideoModalDemo";
import VideoModal from "../../../Common/VideoPlayerComponents/VideoModal/VideoModal";
import {FaRegPlayCircle} from "react-icons/fa";
import {FiDownload} from "react-icons/fi";
import LessonCardMain from "../../PreviewContentComponent/LessonCardMain/LessonCardMain";
import {Link} from "react-scroll/modules";
import AddLesson from "../../AddContentComponent/AddLesson/AddLesson";
import TeacherCardMain from "../../PreviewContentComponent/TeacherCardMain/TeacherCardMain";
import AddTeachers from "../../AddContentComponent/AddTeachers/AddTeachers";
import AddTeacher2 from "../../AddContentComponent/AddTeachers/AddTeacher2";
import AddChapter from "../../AddContentComponent/AddChapter/AddChapter";
import ChapterCardMain from "../../PreviewContentComponent/ChapterCardMain/ChapterCardMain";
import HeaderContentNavigation from "../../HeaderContentNavigation/HeaderContentNavigation";


const TeacherDetails = (props) => {
    const {match: {params}} =  props;

    const [course,setCourses]=useState( );
    const [id,setid]=useState( params.id);
    const [Lesson_index,setLesson_index]=useState(0);
    const [isLoader, setIsLoader] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const[videos,setVideos]=useState({type:"",video:[]});


    useEffect(() => {
        // Update the document title using the browser API
        getData()

    }, [ ] );
    async function  getData(){


        const{state,Description }= await loadCourse(id);
        // convertBaseData(Description.create_at) ;
        // let{data , page , off }=Description;

        if (state===200 ) {

            console.log(Description);

            setCourses(Description)


            // let{Top,Teachers,Lesson}=seprateEachCourseData(Description);
            //
            // setData({...Data, Top,Teachers,Lesson})

        } else {
            NotificationManager.error(state, Description);
        }
        setIsLoader(false);
    }



    const deleteToggle=()=>{
        console.log("delete")
    };

    const toggle = (type,value) => {

        setIsOpenModal(!isOpenModal);
        if (type==="main"){
            setVideos({type,video:value});
        } else {
            setVideos({type,video:value});
        }
    };

    const getCourseID=(index)=>{
        let goTop=document.getElementById('goTop');
        goTop.click();
        setLesson_index(index);
        console.log("index");
        console.log(index);
    };

    // {name: "محصول الکی31", image: "https://stream.kelidiha.com/public/course/5ea5b5b4d677657bec5531b2/image.png", grade: "هفتم", field: "", demo_video: "https://stream.kelidiha.com/public/course/5ea5b5b4d677657bec5531b2/stream/index.m3u8", …}
    // create_at: "2020-04-26T12:18:01.637000"
    // demo_video: "https://stream.kelidiha.com/public/course/5ea5b5b4d677657bec5531b2/stream/index.m3u8"
    // demo_video_cover: "https://stream.kelidiha.com/public/course/5ea5b5b4d677657bec5531b2/demo-video/image.png"
    // description: "محصول لکی است "
    // field: ""
    // grade: "هفتم"
    // image: "https://stream.kelidiha.com/public/course/5ea5b5b4d677657bec5531b2/image.png"
    // is_active: false
    // lessons: Array(1)
    // 0:
    // additional_percentage_chapters: 0.2
    // additional_percentage_course: 0.1
    // chapter_count: 5
    // create_at: "2020-04-28T17:17:52.338000"
    // image: "https://stream.kelidiha.com/public/lesson/5ea5b5b4d677657bec5531b2/2KfYrdiz2KfZhiDYtdmF24zZhduMINix2KfYrw==/image.png"
    // name: "احسان صمیمی راد"
    // price: 20
    // price_for_chapters: 8
    // price_for_course: 18
    // teachers: Array(1)
    // 0:
    // chapters: Array(0)
    // length: 0
    // __proto__: Array(0)
    // create_at: "2020-04-28T17:17:51.923000"
    // demo_video: "https://stream.kelidiha.com/public/teachers/5ea5b5b4d677657bec5531b2/2KfYrdiz2KfZhiDYtdmF24zZhduMINix2KfYrw==/2qnZhdix2KjZhtiv/stream/index.m3u8"
    // demo_video_cover: "https://stream.kelidiha.com/public/teacher/5ea5b5b4d677657bec5531b2/2KfYrdiz2KfZhiDYtdmF24zZhduMINix2KfYrw==/2qnZhdix2KjZhtiv/demo-video/image.png"
    // image: "https://stream.kelidiha.com/public/teacher/5ea5b5b4d677657bec5531b2/2KfYrdiz2KfZhiDYtdmF24zZhduMINix2KfYrw==/2qnZhdix2KjZhtiv/image.png"
    // name: "کمربند"
    // total_videos_time: 312
    // __proto__: Object
    // length: 1
    // __proto__: Array(0)
    // __proto__: Object
    // length: 1
    // __proto__: Array(0)
    // name: "محصول الکی31"
    // price: 18
    // schedule: "https://stream.kelidiha.com/public/course/5ea5b5b4d677657bec5531b2/schedule.pdf"
    // __proto__: Object

    console.log("course");
    console.log(course);
    console.log("params");
    console.log(params);
    // const {match: {params}} =  props;
    // TeacherIndex: "0"
    // chapterIndex: undefined
    // id: "5ea5b5b4d677657bec5531b2"
    // index: "0"
    // lesson: "احسان صمیمی راد"
    // teacher: "کمربند"

    return (

        <div>
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :
                    <div className="w-100"  >
                        <HeaderContentNavigation list={[{"name":"دوره ها", "address":"/content"},{"name":` دوره : ${course["name"]}`, "address":`/content/course/${params.id}`},{"name":` درس : ${params.lesson}`, "address":`/content/lesson/${params.id}/${params.index}/${params.lesson}`},{"name":` استاد : ${params.teacher}`, "address":`/content/teacher/${params.id}/${params.index}/${params.lesson}/${params.TeacherIndex}/${params.teacher}`}]}/>


                        <AddChapter {...props} id={params.id} Lesson_index={params.index} Lesson_name={params.lesson}  Teacher={params.teacher} TeacherIndex={params.TeacherIndex} index={params.chapterIndex} updateContent={getData}/>

                        {/*<AddTeacher2  {...props} id={params.id} Lesson_index={params.index} Lesson_name={params.lesson}  index={params.TeacherIndex} updateContent={getData}/>*/}
                        <div dir="rtl" className="mt-5">

                            <div className="row mt-5">
                                 {course.lessons[params.index].teachers[params.TeacherIndex].chapters.map((item, index) =>
                                     <ChapterCardMain {...item}  key={index}  {...props} index={index} updateContent={getData} getCourseID={getCourseID}/>
                                     // *<TeacherCardMain {...item}  key={index}  {...props} index={index} updateContent={getData} getCourseID={getCourseID}/>*/}

                                    // </div>

                                )
                                }
                            </div>









                        </div>



                    </div>


            }

            <ModalCustomVideo isOpen={isOpenModal} toggle={toggle}>
                {
                    videos.type==="demo"?<VideoModalDemo  video={videos.video[1]} img={videos.video[0]}/>:""
                }
                {
                    videos.type==="main"?<VideoModal file={videos.video} />:""
                }

            </ModalCustomVideo>

            <Link name="first" activeClass="active" className="first" to="addSlider" spy={true} smooth={true} duration={900} offset={-130} id='goTop'>
                <button className='d-none' >go top</button>
            </Link>
        </div>
    );
};

export default TeacherDetails;