import React, {useState, useEffect} from 'react';
import Card from "@material-ui/core/Card/Card";
 import CardContent from "@material-ui/core/CardContent/CardContent";
import {FiDownload} from "react-icons/fi";
import {convertData} from "../../../functions/Functions";
import LabelValueRow from "../../../Common/LabalValue/LabelValue";

const DownloadPdf=(props)=>{
    let {schedule,request_at}=props;
    return (
        <div className="col-12  mt-2">
            <div className="d-flex ">
                <LabelValueRow label={"درخواست برنامه در"} value={request_at?convertData(request_at):""} className="col-6   justify-content-start FsFooterLogin "/>

                <div className=" FssubmitLogin d-flex align-items-center ml-auto">
                      <span className=' mr-2 '>
                        <a href={ schedule} target="_blank" download  className="second-color ml-1 ">دانلود برنامه درسی </a>
                      </span>
                      <span className='green-them '><FiDownload/></span>
                </div>
            </div>

        </div>
    )
};
const HaveNotPdf=(props)=>{
    let {message,request_at}=props;
     return (
        <div className="col-12  mt-3  ">

            {
                message==="requested"?
                    <div className="    FssubmitLogin d-flex align-items-center">
                        <p className="FssubmitLogin">این داش آموز در تاریخ {request_at?convertData(request_at):""} درخواست   برنامه داده است و هنوز برنامه ای برای او ثبت نشده است </p>
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
    const [message, setmessage] = useState(props.message);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });


    // request_at: "2020-04-19T21:20:33.475000"
// request_schedule: false
// schedule: "https://5e7df4
//     useEffect(() => {

    let{pdf}=props;
    console.log("pdf");
    console.log(pdf);
    // :{request_at,request_schedule,schedule}
    return (
        <div className="m-2 w-100" dir="rtl">

                    <div>
                        {
                            pdf.request_schedule ?

                                // count !== null ?
                                //
                                //     <DownloadPdf schedule={"#"}/>
                                //
                                <HaveNotPdf message={"requested"} {...pdf}/> :

                                <DownloadPdf {...pdf}/>

                        }
                    </div>

        </div>
    );
};

export default PersonalProgram;