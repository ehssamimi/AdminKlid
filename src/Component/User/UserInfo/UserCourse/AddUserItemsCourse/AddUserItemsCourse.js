import React, {useState, useEffect} from 'react';
import AutoSuggestMU from "../../../../Access_level/Role/Create/subs/AutoSuggestM-U/AutoSuggestM-U";
import {
    AddCourseToUser,
    Getpermission,
    Getrole,
    SuggestCourse,
    SuggestPermission
} from "../../../../functions/ServerConnection";
import {error_Notification, PermissionOptions, success_Notification} from "../../../../functions/componentHelpFunction";
import GetCourseMulti from "./GetCourseMulti/GetCourseMulti";

const AddUserItemsCourse = (props) => {
    const{match:{params}}=props;
    const [values,setvalues] =useState({name:"",desc:"",permissions:""});
    const [permissonInitioal,setpermissonInitioal] =useState([]);
    const [Id,setId] =useState("");
    const [error,seterror] =useState({name:"",desc:"",permissions:""});
    console.log("params");
    console.log(params.phoneNumber);

    const OOOOOOOO=[ {id: "5ea9e096aff01e1ac2db827a", name: "دوره یازدهم", grade: "یازدهم", field: "تجربی"},
        {id: "5ea9e5d703284a4a0f84a239", name: "دوره دوازدهم", grade: "دوازدهم", field: "ریاضی"},
        {id: "5ea9e660aff01e1ac2db827b", name: "دوره دوازدهم", grade: "دوازدهم", field: "انسانی"},
        {id: "5ea9f23003284a4a0f84a23a", name: "دوره دوازدهم", grade: "دوازدهم", field: "تجربی"},
        {id: "5eb03ed0bbd3ced76712c90c", name: "دوره دهم", grade: "دهم", field: "تجربی"}];

    const getOption=async(name)=>{
        console.log("set option");
        console.log(name);
        let optionValue=""
        if (name==="a"){
            optionValue= await SuggestCourse("د");
        }else {
            optionValue= await SuggestCourse(name);
        }

        let {state,Description}=optionValue

        if (state===200){
             return Description.result
         }else {
            error_Notification(state,Description)
        }

    };
    const getValues=(names ,name)=>{
        console.log(names)
        setvalues({ ... values,permissions:names})
    };
    const handelSubmit=async (e)=>{
        e.preventDefault();
        let Courses=[];
        values.permissions.map((item,index)=>Courses.push(item.id));

        let Data={
            "course_ids": Courses
        };
        let{state,Description}=await AddCourseToUser('add',params.phoneNumber,Data);
        if (state===200){
            props.updateItem();
            success_Notification( "موفق شدید" ,"تعداد دوره های این کاربر به روز رسانی شد ")
        } else {
            error_Notification(state,Description)
        }


    };

    return (
        <div className=" formmmmmm text-left" dir="ltr">

            <GetCourseMulti getOption={getOption} error={error.permissions} GetValues={getValues}
                            DefaultValue={permissonInitioal} name={"دوره"}/>
            <span className="btn btn-primary" onClick={handelSubmit}>ارسال</span>
        </div>
    );
};

export default AddUserItemsCourse;