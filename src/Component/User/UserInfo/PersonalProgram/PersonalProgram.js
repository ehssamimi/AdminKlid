import React, {useState, useEffect} from 'react';
import Card from "@material-ui/core/Card/Card";
 import CardContent from "@material-ui/core/CardContent/CardContent";
import {FiDownload} from "react-icons/fi";

const DownloadPdf=(props)=>{
    let {schedule}=props;
    return (
        <div className="col-12  mt-2">

            <div className="    FssubmitLogin d-flex align-items-center">
                            <span className=' mr-2 '>
                                <a href={schedule} target="_blank" download className="second-color ml-1 ">دانلود برنامه این دوره </a>
                            </span>
                <span className='green-them '><FiDownload/></span>
            </div>

        </div>
    )
}
const HaveNotPdf=(props)=>{
    let {message}=props;
     return (
        <div className="col-12  mt-3  ">

            {
                message==="requested"?
                    <div className="    FssubmitLogin d-flex align-items-center">
                        <p className="FssubmitLogin">این داش آموز درخواست  برنامه داده است و هنوز برنامه ای برای او ثبت نشده است </p>
                    </div>:
                    <div className="    FssubmitLogin d-flex align-items-center">
                        <p className="FssubmitLogin">این داش آموز هنوز برنامه ای درخواست نداده است  </p>
                    </div>
            }



        </div>
    )
};


const PersonalProgram = (props) => {
    const [count, setCount] = useState(1);
    const [message, setmessage] = useState("requested");
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div className="m-2 w-100" dir="rtl">




                    <div>
                        {
                            count !== null ?

                                <DownloadPdf schedule={"#"}/>

                                : <HaveNotPdf message={message}/>
                        }
                    </div>




        </div>
    );
};

export default PersonalProgram;