import React, {useState, useEffect} from 'react';
import {loadMainCourse} from "../../functions/ServerConnection";
import {CarouselMain} from "../../Common/Carousel/CarouselMain";
import {NotificationManager} from "react-notifications";
import Loader from "../../Common/Loader/Loader";

const Courses = (props) => {
    const [courses,setCourses]=useState({"data":[],off:[]});
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        // Update the document title using the browser API

        async function  getData(){
            const{state,Description }= await loadMainCourse();
            console.log(Description);
            let{data , page , off }=Description;

            if (state===200 ) {



                setCourses({"data":data})


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

    return (
        <div>
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :
                    <div className="w-100" dir="ltr">
                        {courses.data.map((item, index) =>
                            <div  key={index} className={["row w-100 ", index===0?"mt-4":"mt-14"].join(" ") }>
                                <CarouselMain type={"courseMain"}
                                    // files={file}
                                              files={item.courses}
                                              off={0}
                                              sub_text={"مشاهده اطلاعات "}
                                              header={item.grade}/>
                            </div>

                        )
                        }
                    </div>


            }
        </div>
    );
};

export default Courses;