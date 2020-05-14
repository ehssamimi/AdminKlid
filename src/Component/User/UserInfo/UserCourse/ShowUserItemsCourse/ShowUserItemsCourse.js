import React, {useState, useEffect} from 'react';
import {CarouselMain} from "../../../../Common/Carousel/CarouselMain";

const ShowUserItemsCourse = (props) => {
    let{chapters,courses,lessons}=props;
     let{match:{params}}=props;
     return (
        <div className="w-100">

            {
                (courses!==undefined&&courses.length>0)?
                    <div    className={["row w-100 ",  "mt-4" ].join(" ") } dir={"ltr"}>
                        <CarouselMain type={"userFile"}
                                      UpdateCoursList={()=>{}}
                                      getCourseID={()=>{}}
                                      files={courses}
                                      off={0}
                                      sub_text={"مشاهده اطلاعات "}
                                      header={"دوره ها  "}
                                      phoneNumber={params.phoneNumber}

                        />

                    </div>

                    :
                    <div className="d-flex flex-column">
                        <p className="carousel-header">دوره ها</p>
                        <p className="FsFooterLogin mt-4 ml-4"> دور ای برای این دانش آموز ثبت نشده است  </p>
                    </div>

            }


            {
                (chapters!==undefined&&chapters.length>0)?
                    <div    className={["row w-100 ",  "mt-4" ].join(" ") } dir={"ltr"}>
                        <CarouselMain type={"userFile"}
                                      UpdateCoursList={()=>{}}
                                      getCourseID={()=>{}}
                                      files={chapters}
                                      off={0}
                                      sub_text={"مشاهده اطلاعات "}
                                      header={"فصل ها  "}/>


                    </div>

                    :
                    <div className="d-flex flex-column mt-4 ml-4">
                        <p className="FsHeaderCarousal">فصل ها</p>
                        <p className="FsFooterLogin ">فصلی برای این دانش آموز ثبت نشده است</p>
                    </div>
            }
            {
                (lessons!==undefined&&lessons.length>0)?
                    <div    className={["row w-100 ",  "mt-4" ].join(" ") } dir={"ltr"}>
                        <CarouselMain type={"userFile"}
                                      UpdateCoursList={()=>{}}
                                      getCourseID={()=>{}}
                                      files={lessons}
                                      off={0}
                                      sub_text={"مشاهده اطلاعات "}
                                      header={"فصل ها  "}/>


                    </div>

                    :
                    <div className="d-flex flex-column mt-4 ml-4">
                        <p className="FsHeaderCarousal">درس ها</p>
                        <p className="FsFooterLogin ">درسی برای این دانش آموز ثبت نشده است</p>
                    </div>
            }
        </div>
    );
};

export default ShowUserItemsCourse;