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
import HeaderContentNavigation from "../../HeaderContentNavigation/HeaderContentNavigation";


const LessonDetails = (props) => {
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

    console.log("course");
    console.log(course);
    // const {match: {params}} =  props;


    return (

        <div>
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :
                    <div className="w-100"  >
                        <HeaderContentNavigation list={[{"name":"دوره ها", "address":"/content"},{"name":` دوره : ${course["name"]}`, "address":`/content/course/${params.id}`},{"name":` درس : ${params.lesson}`, "address":`/content/lesson/${params.id}/${params.index}/${params.lesson}`}]}/>


                        <AddTeacher2  {...props} id={params.id} Lesson_index={params.index} Lesson_name={params.lesson}  index={params.TeacherIndex} updateContent={getData}/>
                        <div dir="ltr" className="mt-5">

                            <div className="row mt-5" dir="rtl">
                                {course.lessons[params.index].teachers.map((item, index) =>

                                        <TeacherCardMain {...item}  key={index}  {...props} index={index} updateContent={getData} getCourseID={getCourseID}/>

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

export default LessonDetails;