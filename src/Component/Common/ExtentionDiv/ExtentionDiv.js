import React, {useState, useEffect} from 'react';
import {FaMinus, FaPlus} from "react-icons/fa";
import {Card,Collapse} from "reactstrap";

const ExtentionDiv = (props) => {
    const [collapse, setCollapse,] = useState(false);
    let{name}=props;

    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
    });

    return (
        <Card className={["mt-3 w-100  pl-sm-4 pr-sm-4 d-flex align-items-center box-shadow-custom"].join(" ")} dir='rtl' id={props.id} >
            <div className='  w-100  ' >
                <div className='d-flex justify-content-start align-items-center  FssubmitLogin ' onClick={()=>{setCollapse(!collapse)}} >
                    {
                        collapse?

                            <span className= ' border-Carousel p-1 p-sm-2 mr-1 mr-sm-3' ><FaMinus/></span>

                            :
                            <span className= ' border-Carousel p-1 p-sm-2 mr-1 mr-sm-3' > <FaPlus/></span>

                    }
                    <div className="d-flex w-100 FssubmitLogin align-items-center">

                        <div className='mr-1 col-7 p-0'>
                            {name}
                        </div>

                    </div>

                </div>
                {/*className="d-flex justify-content-start"*/}
            </div>
            <Collapse  className='w-100   ' isOpen={ collapse} >
                <div   className='w-100   ' dir="ltr">
                    {props.children}
                </div>
            </Collapse>

        </Card>
    );
};

export default ExtentionDiv;