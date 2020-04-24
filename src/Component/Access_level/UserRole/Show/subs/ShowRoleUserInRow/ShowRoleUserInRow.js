import React, { useState } from 'react';
import {ModalDelete} from "../../../../../Common/Modals/ModalDelete/ModalDelete";
import { DeleteRole} from "../../../../../functions/ServerConnection";
import {NavLink} from "react-router-dom";
import {error_Notification, RemoveItem, success_Notification} from "../../../../../functions/componentHelpFunction";

export function ShowProperties(props) {
    let{content}=props;
    return<span className="btn  badge-outline-primary m-1   content_card" >{content}</span>
}


export default function  ShowRoleUserInRow(props){
    const [openModal,setOpenModal]=useState(false);
     let { user_id,permissions_list,roles_list,id}=props.content;
    const handelDelete=async()=>{
        let Response = await DeleteRole(id);
        setOpenModal(!openModal);
        let{state,Description}=Response;
        if (state===200) {
            success_Notification("role شما حذف شد ");
            RemoveItem(id)
        }else{
            error_Notification(state,Description)
        }

    };

    return (

        <article className="card2 mainCard" dir='rtl'  id={id}>
            <div className="card-content">
                <div className='d-flex line'>
                    <h2 className="col-10">{user_id} </h2>
                    <div className="d-flex ml-auto justify-content-center align-items-center" >
                        <div className="glyph-icon simple-icon-trash circle-border-icon " onClick={()=>{setOpenModal(!openModal)}}></div>
                        <NavLink to={`/access-level/user-role/create/${user_id}`} className="d-flex">
                            <div className="glyph-icon iconsminds-file-edit circle-border-icon ml-2 "  ></div>
                        </NavLink>
                    </div>
                </div>
                <div className="pt-2 line ">
                    <h6 className='header_card '>permissions</h6>
                    {permissions_list.length>0   ?
                        permissions_list.map((todo, index) =>
                            <ShowProperties  content={todo}  key={index} class={' col-sm-6 col-lg-3  '}/>
                        ) : ''
                    }
                </div>
                <div className="pt-2  ">
                    <h6 className='header_card '>roles</h6>
                    {roles_list.length>0   ?
                        roles_list.map((todo, index) =>
                            <ShowProperties  content={todo}  key={index} class={' col-sm-6 col-lg-3  '}/>
                        ) : ''
                    }
                </div>
            </div>
            <ModalDelete isOpen={openModal} toggle={()=>{setOpenModal(!openModal)}} item ="نقش" deleteComponent={handelDelete}/>
        </article>
    );
}