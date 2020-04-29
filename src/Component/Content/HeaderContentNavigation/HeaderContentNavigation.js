import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { FaAngleLeft,FaDotCircle } from "react-icons/fa";
import {Button} from "reactstrap";

const HeaderContentNavigation = (props) => {



    return (
        <div className="w-100 row mb-3" dir="rtl">
            {
                props.list.map((item,index)=>
                    <div   className="d-flex align-items-center fs13vw second-color mr-1"  key={index}>

                        {
                            index===0?<span className="  mr-2 d-flex align-items-center"><FaDotCircle/></span>:<span className="mr-2 d-flex align-items-center"><FaAngleLeft/></span>
                        }
                        <Link to={item.address} className=" p-0 d-flex align-items-center justify-content-center">

                            <span className="">{item.name}</span>

                        </Link>

                    </div >







                 )
            }

        </div>
    );
};

export default HeaderContentNavigation;