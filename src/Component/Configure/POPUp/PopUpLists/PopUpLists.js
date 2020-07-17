import React, {useState, useEffect} from 'react';
import {ModalList} from "../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import PopUpComponent from "./PopComponent/PopUpComponent";
import {Card,CardBody} from "reactstrap";

const PopUpLists = (props) => {
    const [list, setList] = useState({});
    const [isLoader, setIsLoader] = useState(true);
    useEffect(() => {
        async function getmodals() {
          let{state,Description}= await ModalList()
            setIsLoader(false)
            console.log(Description)
            if (state===200){
                setList(Description)
             }else {
                error_Notification(state,Description)
            }

        }
         getmodals()
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
console.log(list)
    return (
        <div>
            <IsLoaderComponent isLoader={isLoader}>


                {
                    (list.homepage!==undefined &&   list.homepage!==null)?<PopUpComponent text={ list.homepage} location={"صفحه اصلی"} type={"homepage"}/>:""
                }
                {
                    (list.user_panel!==undefined &&   list.user_panel!==null)?<PopUpComponent text={ list.user_panel} location={"پروفایل کاربری"} type={"user_panel"}/>:""
                }
                {
                    (list.course_page!==undefined &&   list.course_page!==null)?<PopUpComponent text={ list.course_page} location={"صفحه لیست دوره ها"} type={"course_page"}/>:""
                }
                {
                    ( list.course_page===null && list.user_panel===null && list.homepage===null)?<Card><CardBody ><p className="Fs2 text-center">پیامی ثبت نشده است! <a
                        href="/configure/modal/add">اولین پیام خود را ثبت کنید!</a> </p></CardBody></Card>  :""
                }

            </IsLoaderComponent>


        </div>
    );
};

export default PopUpLists;