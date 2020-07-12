import React, {useState, useEffect} from 'react';
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import {Card, CardBody, CardTitle, Table} from "reactstrap";
import {ActionCladdToPackage, UserActioninclassroom} from "../../../../functions/ServerConnection";
import {error_Notification, RemoveElement, success_Notification} from "../../../../functions/componentHelpFunction";

const PreviewUserInClassroomList = (props) => {
    let{add_by,name,phone_number,user_id,class_id,index}=props;
    const handelDelete= async ()=>{
        console.log("delete");
        let {state ,Description}=await UserActioninclassroom("remove", class_id, user_id, null);
        if (state===200 ) {
            success_Notification("کاربر مورد نظر حذف شد");
            props.updateList();
             // RemoveElement(user_id);
        } else {
            error_Notification(state, Description)
        }
    };


     return (
        <tr id={user_id}>
            <th scope="row vertical-middle">{index+1}</th>
            <td className="text-center vertical-middle FsFooterLogin">{name}</td>
            <td className="text-center vertical-middle FsFooterLogin">{phone_number}</td>
            <td className="text-center vertical-middle FsFooterLogin">{add_by}</td>
            <td  className="d-flex justify-content-center"><button className="  btn btn-outline-danger br10px" onClick={ handelDelete}>حذف</button></td>
        </tr>
    );
};

export default PreviewUserInClassroomList;