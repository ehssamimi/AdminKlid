import React, {useState, useEffect} from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import {loadMainCourse} from "../../functions/ServerConnection";
import {CarouselMain} from "../../Common/Carousel/CarouselMain";
import {NotificationManager} from "react-notifications";
import Loader from "../../Common/Loader/Loader";
import AddCourse from "./subs/AddCourse/AddCourse";
import {Link} from "react-scroll/modules";

const Courses = (props) => {
    const [courses,setCourses]=useState({"data":[],off:[]});
    const [isLoader, setIsLoader] = useState(true);
    const [id, setId] = useState("");
    async function  getData(){
        const{state,Description }= await loadMainCourse();
        let{data , page , off }=Description;

        if (state===200 ) {
            setCourses({"data":data})
        } else {
            NotificationManager.error(state, Description);
        }
        setIsLoader(false);
    }
    useEffect(() => {
        // Update the document title using the browser API


        getData()

    }, [ ] );
    const getCourseID=(id)=>{
        let goTop=document.getElementById('goTop');
        goTop.click();
         setId(id)
    };
    const UpdateCoursList=()=>{
        getData()
    };
    console.log("courses");
    console.log(courses);

    return (
        <div>
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :
                    <div className="w-100" dir="rtl">

                        <AddCourse id={id} UpdateCoursList={UpdateCoursList}/>


                        {courses.data.map((item, index) =>
                            <div  key={index} className={["row w-100 ", index===0?"mt-4":"mt-14"].join(" ") } dir={"ltr"}>
                                <CarouselMain type={"courseMain"}
                                    // files={file}
                                              getCourseID={getCourseID}
                                              files={item.courses}
                                              off={0}
                                              sub_text={"مشاهده اطلاعات "}
                                              header={item.grade}/>
                            </div>

                        )
                        }
                    </div>


            }
            <Link name="first" activeClass="active" className="first" to="addSlider" spy={true} smooth={true} duration={900} offset={-130} id='goTop'>
                <button className='d-none' >go top</button>
            </Link>
        </div>
    );
};

export default Courses;