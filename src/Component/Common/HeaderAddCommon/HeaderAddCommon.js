import React, {useState, useEffect} from 'react';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

const HeaderAddCommon = (props) => {
    const newPage = () => {
        let elem = document.getElementById("refresh");
        elem.click();
    };
    let{collapse,toggle,item,id,to}=props;
    return (
        <div className="d-flex align-items-center">
            <Button color="primary"  className=" p-0 d-flex align-items-center justify-content-center"  onClick={toggle}>
                {
                    collapse? <span color="primary" className="glyph-icon simple-icon-minus fs25rem  "></span>: <span color="primary" className="glyph-icon simple-icon-plus fs25rem  "></span>
                }
            </Button>
            {
                id===undefined?<span className="fs13vw ml-3"> اضافه کردن {item}</span>:
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <span className="fs13vw ml-3"  onClick={toggle}>به روز رسانی  {item} </span>
                        <span className="fs13vw d-flex align-items-center"  onClick={ newPage} dir="ltr"> <span color="primary" className="glyph-icon iconsminds-add-file fs25rem  ml-3 "></span>اضافه کردن دوره جدید</span>

                    </div>
            }

            <Link to={to } id="refresh"/>
        </div >
    );
};

export default  HeaderAddCommon;