import React, {Component, useState} from 'react';
import {NavLink} from "react-router-dom";
import { FaRegEdit,FaTrashAlt } from "react-icons/fa";

export default function  HeaderCardAuthAdmin(props){

    let { id,name, Toggle,edit}=props;
    return (

            <div className='d-flex line w-100'>
                <h2 className=" col-10 p-0 text-left" dir="ltr">{name} </h2>
                <div className="d-flex ml-auto justify-content-center align-items-center mr-2" >
                    <div className="    circle-border-icon d-flex justify-content-center align-items-center p-2 " onClick={Toggle}><FaTrashAlt/></div>
                    {
                        edit? <NavLink to={`/access-level/trusted_service/create/${id}`} className="d-flex">
                            <div className="   circle-border-icon ml-2 d-flex justify-content-center align-items-center p-2"  ><FaRegEdit/></div>
                        </NavLink>:""
                    }

                </div>
            </div>

    )
}