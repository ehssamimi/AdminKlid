import React, {useState, useEffect} from 'react';
import {Card} from "reactstrap";
import {RowShowShowColEdit} from "../../../Common/RowShowShowColEdit/ShowInRowComponents";
import {convertBaseData} from "../../../functions/componentHelpFunction";
import ax from "../../../Common/img/logo512.png";
import {NavLink} from "react-router-dom";
import {FaRegPlayCircle} from "react-icons/fa";
import {FiDownload} from "react-icons/fi";
import {GetUserDropDown, loadCourse} from "../../../functions/ServerConnection";
import {NotificationManager} from "react-notifications";
import Loader from "../../../Common/Loader/Loader";
import HeaderContentNavigation from "../../HeaderContentNavigation/HeaderContentNavigation";
import PreviewVideoComponent from "../../../Common/PreviewVideoComponent/PreviewVideoComponent";

const ItemDetails = (props) => {
    const {match: {params}} =  props;
     const [course,setCourses]=useState( );
    const [id,setid]=useState( params.id);
    const [isLoader, setIsLoader] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const[videos,setVideos]=useState({type:"",video:[]});
    useEffect(() => {
        // Update the document title using the browser API
        getData()

    }, [ ] );
    async function  getData(){

        console.log("id")
        console.log(id)
        const{state,Description }= await loadCourse(id);
        // convertBaseData(Description.create_at) ;
        // let{data , page , off }=Description;
        console.log("Description");
        console.log(Description);

        if (state===200 ) {
            let EditCourse= await Description.lessons[params.index].teachers[params.TeacherIndex].chapters[params.chapterIndex].items[params.itemIndex];

            setCourses(EditCourse);

            if (EditCourse===undefined){
                // const{state:state2,Description:DEscription2 }= await GetUserDropDown();

                window.location.reload();
            }

            setIsLoader(false);

        } else {
            NotificationManager.error(state, Description);
        }
        // setTimeout(function(){setIsLoader(false);}, 1500);
    };
    const toggle = (type,value) => {

        setIsOpenModal(!isOpenModal);
        if (type==="main"){
            setVideos({type,video:value});
        } else {
            setVideos({type,video:value});
        }
    };
    const deleteToggle=()=>{
        console.log("delete")
    };
    console.log("course");
    console.log(course);




    return (
        <div>
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :

                    <div className="w-100" dir="ltr">
                        <HeaderContentNavigation list={[{"name": "دوره ها", "address": "/content"}, {
                            "name": ` دوره : ${course["name"]}`,
                            "address": `/content/course/${params.id}`
                        }, {
                            "name": ` درس : ${params.lesson}`,
                            "address": `/content/lesson/${params.id}/${params.index}/${params.lesson}`
                        }, {
                            "name": ` استاد : ${params.teacher}`,
                            "address": `/content/teacher/${params.id}/${params.index}/${params.lesson}/${params.TeacherIndex}/${params.teacher}`
                        }, {
                            "name": ` فصل : ${params.chapter}`,
                            "address": `/content/chapter/${params.id}/${params.index}/${params.lesson}/${params.TeacherIndex}/${params.teacher}/${params.chapterIndex}/${params.chapter}/`
                        }]}/>

                        <Card className='w-100 flex-row  m-0  br-product ' style={{height: "auto", minHeight: "40vh"}}>
                            {/********** product off and percentage*********/}


                            <div className='col-8 d-flex flex-column align-items-center justify-content-center fs16calc'>
                                {/*<p className="fs-13vw color-gray">{course['name']}</p>*/}
                                <div className='d-flex  w-100 flex-wrap  ' dir='rtl'>
                                    <RowShowShowColEdit label={"اسم"} value={course["name"]}
                                                        className='p-0 d-flex justify-content-start col-6'/>
                                    <RowShowShowColEdit label={"رایگان"} value={course["is_free"]? "هست":"نیست"}
                                                        className='p-0 d-flex justify-content-start col-6'/>
                                    {/*<RowShowShowColEdit label={"فغال"} value={!course["is_locked"] ? "فعال" : "غیر فعال"}*/}
                                                        {/*className='p-0 d-flex justify-content-center col-6'/>*/}
                                    <RowShowShowColEdit label={"زمان تقریبی اتمام"} value={course["time_to_done"]}
                                                        className='p-0 d-flex justify-content-start col-6 mt-1'/>
                                    <RowShowShowColEdit label={"تولید"} value={convertBaseData(course.create_at)}
                                                        className='p-0 d-flex justify-content-start col-6 mt-1'/>
                                    <div className="d-flex  justify-content-start w-100">
                                        <div className="col-6 p-0">
                                            <PreviewVideoComponent video={ [course["video_cover"],course["video"]]}/>
                                        </div>

                                        <div className="mr-3 mt-3 green-them">
                                            <span className=' '><FiDownload/></span>
                                            <span className=' mr-2'>
                                        <a href={course.downloadable_content} target="_blank" download
                                           className="second-color ml-1 ">دانلود جزوه</a>
                                        </span>
                                        </div>
                                    </div>



                                    <div className="mt-3 green-them w-100 d-flex justify-content-start ">

                                    <span className=' mr-2'>
                                    <audio src={course.audio} controls={true} autoPlay={false}/>
                                    </span>
                                    </div>


                                    <RowShowShowColEdit label={"توضیحات"} value={course["description"]}
                                                        className='p-0 d-flex justify-content-start col-12'/>

                                </div>



                            </div>

                            <div className='col-4 p-0 position-relative'>
                                {/**********background top-right********/}
                                <div className="quarter-circle-top-right">

                                </div>
                                <div className="w-100 d-flex product-div-img-detail h-100 ">
                                    <div className='col-9 h-100 d-flex align-items-center justify-content-end'>
                                        {/***********image Product*******/}
                                        <img src={course["video_cover"] || ax} alt="ax" className="w-75 h-75"/>
                                    </div>
                                    <div className='col-3 '>
                                        <div
                                            className=' w-100 h-100   d-flex  flex-column mt-3 justify-content-start   '>
                                            {/***************Buttons********/}
                                            {/*<div className='col-3 d-flex flex-column justify-content-around '>*/}
                                                {/*/!***************Delete Button********!/*/}
                                                {/*<div*/}
                                                    {/*className="w-100 d-flex btn btn-primary justify-content-center align-items-center">*/}
                                                    {/*<button*/}
                                                        {/*className=' w-100 d-flex justify-content-center   cursor-pointer b-0     btn-primary'*/}
                                                        {/*onClick={deleteToggle}><span*/}
                                                        {/*className='glyph-icon iconsminds-folder-close'></span>*/}
                                                    {/*</button>*/}
                                                {/*</div>*/}
                                                {/*/!***************edit Button********!/*/}
                                                {/*<NavLink to={`/content/product/add/${id}`}*/}
                                                         {/*className="w-100 d-flex btn btn-secondary justify-content-center align-items-center">*/}
                                                    {/*<button*/}
                                                        {/*className=' w-100 d-flex justify-content-center   cursor-pointer b-0    btn-secondary'>*/}
                                                        {/*<span className='glyph-icon iconsminds-folder-edit'></span>*/}
                                                    {/*</button>*/}
                                                {/*</NavLink>*/}
                                            {/*</div>*/}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

            }
        </div>
    );
};

export default ItemDetails;













