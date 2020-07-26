import React, {useState, useEffect} from 'react';
import UploadIcon from './../../../../../../../../assets/common/img/UploadIcons.png'
import {ModalDelete} from "../../../../../../../Common/Modals/ModalDelete/ModalDelete";
import {DeleteFileFromClass} from "../../../../../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../../../../../functions/componentHelpFunction";

const Tab3UploadFile = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    let{title,url,file_name,file_size,class_id}= props;
    useEffect(() => {



        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    const DeleteContent = async () => {
        console.log("delete-content")

        let {state, Description} = await DeleteFileFromClass(class_id, file_name)
        if (state === 200) {
            success_Notification("محتوای مورد نظر حذف شد ")
            props.updateList();
        } else {
            error_Notification(state, Description)
        }
        setIsOpen(false)
    }


    return (
        <div className="col-4     mt-3 p-0">
            <div className= "upload-bubble tri-right round green-background border-chat-left " >
                <div className="pointer-circle closeBtnModal d-flex justify-content-center align-items-center " onClick={()=>setIsOpen(true)}>
                    <span className="close " style={{marginTop:"18%"}}  >&times;</span>
                </div>
                <div className="talktext">
                    {/*<p className="chat-header  IranSans mb-0 text-right FS01">{"استاد امین بابازاده"}</p>*/}
                    <p className=  "  IranSans text-justify mb-0 FS02 text-white"  >{title}</p>
                    <div className="text-left mb-2">
                        <div className="row">
                            <div className="col-sm-12 col-md-9">
                                <p className=" IranSans mb-0 text-right FS01 hidden-txt text-white mb-0 font-weight-light">{file_name}</p>
                                <p className=  "  IranSans text-justify mb-0 FS01 text-white font-weight-light"  >{file_size}</p>
                            </div>
                            <div className="col-sm-12 col-md-3 pr-3  pt-2 pb-2 text-left font-weight-light">
                                <a href={url} target="_blank" download>
                                    <img src={UploadIcon} alt={"upload-Icon"}/>
                                </a>
                            </div>

                        </div>

                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <span className= "chat-header  IranSans  FS01 " >{"12:22"}</span>
                    </div>
                </div>
            </div>
            <ModalDelete    isOpen={isOpen} toggle={()=> setIsOpen(false)} item={"محتوا"} deleteComponent={DeleteContent }    />
        </div>
    );
};

export default Tab3UploadFile;