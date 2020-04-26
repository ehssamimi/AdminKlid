import React, {useState, useEffect} from 'react';
import {loadCourse, loadMainCourse} from "../../functions/ServerConnection";
import {NotificationManager} from "react-notifications";
import Loader from "../../Common/Loader/Loader";
import {CarouselMain} from "../../Common/Carousel/CarouselMain";
import ax from './../../Common/img/alex-simpson-8DaRtnotCoQ-unsplash.png'
import {NavLink} from "react-router-dom";
import {Card} from "reactstrap";
import {RowShowShowColEdit} from "../../Common/RowShowShowColEdit/ShowInRowComponents";
import {convertBaseData} from "../../functions/componentHelpFunction";


const CourseDetail = (props) => {
    const [course,setCourses]=useState( );
    const [id,setid]=useState( );
    const [isLoader, setIsLoader] = useState(true);
    useEffect(() => {
        // Update the document title using the browser API

        async function  getData(){


            const{state,Description }= await loadCourse("5e96169a01d73623037c281d");
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
        getData()

    }, [ ] );
    const deleteToggle=()=>{
        console.log("delete")
    };






    return (
        <div>
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :
                    <div className="w-100" dir="ltr">
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
                                            <div className='col-3 d-flex flex-column justify-content-around '>
                                                {/***************Delete Button********/}
                                                <div  className="w-100 d-flex btn btn-primary justify-content-center align-items-center">
                                                    <button
                                                        className=' w-100 d-flex justify-content-center   cursor-pointer b-0     btn-primary'   onClick={ deleteToggle}> <span className='glyph-icon iconsminds-folder-close'></span>
                                                    </button>
                                                </div>
                                                {/***************edit Button********/}
                                                <NavLink to={`/content/product/add/${id}`} className="w-100 d-flex btn btn-secondary justify-content-center align-items-center">
                                                    <button
                                                        className=' w-100 d-flex justify-content-center   cursor-pointer b-0    btn-secondary'> <span className='glyph-icon iconsminds-folder-edit'></span>
                                                    </button>
                                                </NavLink>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>








                        {course.lessons.map((item, index) =>
                            <div>

                            </div>
                            // {/*<div  key={index} className={["row w-100 ", index===0?"mt-4":"mt-14"].join(" ") }>*/}
                            //     {/*<CarouselMain type={"courseMain"}*/}
                            //         {/*// files={file}*/}
                            //                   {/*files={item.courses}*/}
                            //                   {/*off={0}*/}
                            //                   {/*sub_text={"مشاهده اطلاعات "}*/}
                            //                   {/*header={item.grade}/>*/}
                            // {/*</div>*/}

                        )
                        }
                    </div>


            }
        </div>
    );
};

export default CourseDetail;