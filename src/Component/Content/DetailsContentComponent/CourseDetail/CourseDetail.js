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
import HeaderContentNavigation from "../../HeaderContentNavigation/HeaderContentNavigation";


const CourseDetail = (props) => {
    const {match: {params}} =  props;
    const [course,setCourses]=useState( );
    const [id,setid]=useState( params.id);
    const [Lesson_index,setLesson_index]=useState(100);
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
    // console.log("params.id");
    // console.log(params.id);

    return (

        <div>
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :
                    <div className="w-100"  >
                        <HeaderContentNavigation list={[{"name":"دوره ها", "address":"/content"},{"name":course["name"], "address":`/content/course/${params.id}`}]}/>

                        <AddLesson  {...props} id={params.id}  index={ params.index} updateContent={getData} />
                        <div dir="ltr" className="mt-5">

                            <Card className='w-100 flex-row  m-0  br-product ' style={{height:"auto",minHeight:"40vh"}}>
                                {/********** product off and percentage*********/}


                                <div className='col-8 d-flex flex-column align-items-center justify-content-center'>
                                    {/*<p className="fs-13vw color-gray">{course['name']}</p>*/}
                                    <div className='d-flex  w-100 flex-wrap justify-content-center' dir='rtl'>
                                        <RowShowShowColEdit label={"اسم"} value={course["name"] } className='p-0 d-flex justify-content-center col-6' />
                                        <RowShowShowColEdit label={"رشته"} value={course["field"] } className='p-0 d-flex justify-content-center col-6' />
                                        <RowShowShowColEdit label={"پایه"} value={course["grade"] } className='p-0 d-flex justify-content-center col-6' />
                                        <RowShowShowColEdit label={"قیمت"} value={course["price"] } className='p-0 d-flex justify-content-center col-6' />
                                        <RowShowShowColEdit label={"فغال"} value={course["is_active"]?"فعال":"غیر فعال" } className='p-0 d-flex justify-content-center col-6' />
                                        <RowShowShowColEdit label={"تولید"} value={convertBaseData(course.create_at) } className='p-0 d-flex justify-content-center col-6' />
                                        <div className="mr-3 green-them cursor-pointer" onClick={( )=>{ toggle('demo',[course.demo_video_cover,course.demo_video])}}>
                                            <span className= ' '    ><FaRegPlayCircle/></span>
                                            <span className= '  mr-2'    > مشاهده پیش نمایش  </span>
                                        </div>
                                        <div className="mr-3 green-them">
                                            <span className=' '><FiDownload/></span>
                                            <span className=' mr-2'>
                                        <a href={course.schedule} target="_blank" download
                                           className="second-color ml-1 ">دانلود جزوه</a>
                                        </span>
                                        </div>


                                        {/*{Keys ?*/}
                                        {/*Keys.map((todo, index) =>*/}
                                        {/*<RowShowShowColEdit label={todo} value={sub[todo]} key={index} col={todo==='ادرس'?'col-12':'col-6'} className='p-0 d-flex justify-content-center' />*/}
                                        {/*) : ''*/}
                                        {/*}*/}
                                    </div>
                                    <div className=' w-100  '>
                                        <div className="     text-center" dir='rtl'>
                                            <p>{course['description']}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className='col-4 p-0 position-relative'>
                                    {/**********background top-right********/}
                                    <div className="quarter-circle-top-right">

                                    </div>
                                    <div className="w-100 d-flex product-div-img-detail h-100 " >
                                        <div className='col-9 h-100 d-flex align-items-center justify-content-end'>
                                            {/***********image Product*******/}
                                            <img src={course['image'] || ax} alt="ax" className="w-75 h-75"/>
                                        </div>
                                        <div className='col-3 '>
                                            <div className=' w-100 h-100   d-flex  flex-column mt-3 justify-content-start   '>
                                                {/***************Buttons********/}
                                                {/*<div className='col-3 d-flex flex-column justify-content-around '>*/}
                                                    {/*/!***************Delete Button********!/*/}
                                                    {/*<div  className="w-100 d-flex btn btn-primary justify-content-center align-items-center">*/}
                                                        {/*<button*/}
                                                            {/*className=' w-100 d-flex justify-content-center   cursor-pointer b-0     btn-primary'   onClick={ deleteToggle}> <span className='glyph-icon iconsminds-folder-close'></span>*/}
                                                        {/*</button>*/}
                                                    {/*</div>*/}
                                                    {/*/!***************edit Button********!/*/}
                                                    {/*<NavLink to={`/content/product/add/${id}`} className="w-100 d-flex btn btn-secondary justify-content-center align-items-center">*/}
                                                        {/*<button*/}
                                                            {/*className=' w-100 d-flex justify-content-center   cursor-pointer b-0    btn-secondary'> <span className='glyph-icon iconsminds-folder-edit'></span>*/}
                                                        {/*</button>*/}
                                                    {/*</NavLink>*/}
                                                {/*</div>*/}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <div className="row mt-5" dir="rtl">
                                {course.lessons.map((item, index) =>

                                    <LessonCardMain {...item}  key={index}  {...props} index={index} updateContent={getData} getCourseID={getCourseID} changeIndex={ ()=>{setLesson_index(index)}}/>

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

export default CourseDetail;