import React, { useState} from 'react';
import {ModalDelete} from "../../../../Common/Modals/ModalDelete/ModalDelete";
import {DeletePermission} from "../../../../functions/ServerConnection";
import {error_Notification,success_Notification,RemoveItem} from "../../../../functions/componentHelpFunction";
import HeaderCardAuthAdmin from "../../../Common/HeaderCardAuthAdmin/HeaderCardAuthAdmin";
export default function  ShowPermissionRow(props){
    const [openModal,setOpenModal]=useState(false);
    let {permission_name,description,id}=props.content;
    const handelDelete=async()=>{
        let Response = await DeletePermission(permission_name);
        setOpenModal(!openModal);
        let{state,Description}=Response;
        if (state===200) {
            success_Notification("permission شما حذف شد ");
            RemoveItem(id)
        }else{
            error_Notification(state,Description)
        }
    };

    return (

        <article className="card mainCard" dir='rtl' id={id}>
            <div className="card-content">
                <HeaderCardAuthAdmin id={permission_name} name={permission_name} Toggle={()=>{setOpenModal(!openModal)}}  edit={false}/>

                {/*<div className='d-flex'>*/}
                    {/*<h2>{permission_name} </h2>*/}
                    {/*<div className="d-flex ml-auto justify-content-center align-items-center" onClick={()=>{setOpenModal(!openModal)}}>*/}
                        {/*<div className="glyph-icon simple-icon-trash circle-border-icon " ></div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <p className="text-left">{description} </p>
            </div>
            <ModalDelete isOpen={openModal} toggle={()=>{setOpenModal(!openModal)}} item ="مشخصه" deleteComponent={handelDelete}/>
        </article>
    );
}

