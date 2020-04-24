import React, {Component, useState} from 'react';
import {DeleteRole, DeleteTrustedService} from "../../../../../functions/ServerConnection";
import {error_Notification, RemoveItem, success_Notification} from "../../../../../functions/componentHelpFunction";
import {NavLink} from "react-router-dom";
import {ModalDelete} from "../../../../../Common/Modals/ModalDelete/ModalDelete";
import HeaderCardAuthAdmin from "../../../../Common/HeaderCardAuthAdmin/HeaderCardAuthAdmin";



export function ShowProperties(props) {
    let{content}=props;
    return<span className="btn  badge-outline-primary m-1   content_card" >{content}</span>
}


export default function  ShowTrustedServiceRow(props){

    const [openModal,setOpenModal]=useState(false);
    let { service_name,service_secret}=props.content;

    const handelDelete=async()=>{
        let Response = await DeleteTrustedService(service_name);
        setOpenModal(!openModal);
        let{state,Description}=Response;
        if (state===200) {
            success_Notification(" سرویس  شما حذف شد ");
            RemoveItem(service_name)
        }else{
            error_Notification(state,Description)
        }

    };

    return (

        <article className="card2 mainCard" dir='rtl'  id={service_name}>
            <div className="card-content">
                <HeaderCardAuthAdmin id={service_name} name={service_name} Toggle={()=>{setOpenModal(!openModal)}}  edit={true}/>
                <div className="pt-2   ">
                    <h6 className='header_card '>service secret</h6>
                    <h2 className="col-10 pl-0 pr-0 font-weight-normal">{service_secret} </h2>
                </div>

            </div>
            <ModalDelete isOpen={openModal} toggle={()=>{setOpenModal(!openModal)}} item ="trust service" deleteComponent={handelDelete}/>
        </article>
    );
}