import React, {useState, useEffect} from 'react';
import {ActionCladdToPackage} from "../../../../functions/ServerConnection";
import {error_Notification, RemoveElement, success_Notification} from "../../../../functions/componentHelpFunction";

const ClassRowInPackageTable = (props) => {
    const [count, setCount] = useState(1);

    const handelDelete= async ()=>{
        console.log("delete");
        let {state ,Description}=await ActionCladdToPackage("remove",props.packageId,props.id  );
        if (state===200 ) {
            success_Notification("کلاس مورد نظر حذف شد");
            props.UpdateClassList();
            // RemoveElement(id);
        } else {
            error_Notification(state, Description)
        }
    }


    let{id,information: {grade, field , lesson_name },index}=props

    return (

            <tr id={id}>
                <th scope="row">{index+1}</th>
                <td className="text-center">{grade}</td>
                <td className="text-center">{field}</td>
                <td className="text-center">{lesson_name}</td>
                <td  className="d-flex justify-content-center"><button className="  btn btn-outline-danger br10px" onClick={ handelDelete}>حذف</button></td>
            </tr>

    );
};

export default ClassRowInPackageTable;