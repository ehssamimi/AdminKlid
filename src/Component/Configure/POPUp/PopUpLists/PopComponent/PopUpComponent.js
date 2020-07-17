import React , {useState} from 'react';
import {Card,CardBody} from 'reactstrap'
import RowShowShowColEdit from "../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import {AddModal} from "../../../../functions/ServerConnection";
import {error_Notification, RemoveElement, success_Notification} from "../../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../../Common/ISLodader/IsLoader";

const PopUpComponent = (props) => {
    const [isLoader, setIsLoader] = useState( false);
const handelDelete=async ()=>{
    console.log("delete")
    let data={
        "location": props.type,
        "text": props.text
    }
    setIsLoader(true)
    let{state,Description}=await AddModal("remove ",JSON.stringify(data))
    setIsLoader(false)
    if (state===200){
        success_Notification("پیام ورودی با موفقیت حذف شد! ")
        RemoveElement(props.location)
    }else {
        error_Notification(state,Description)
    }
}

    return (
        <IsLoaderComponent isLoader={isLoader} >
            <Card className="mt-2" id={props.location} >
                <CardBody>
                    <div className="w-100 Fs3">
                        <div className="d-flex">
                            <RowShowShowColEdit label={"مکان"} value={props.location}    labelClass="Fs1" valueClass="Fs1"/>
                            <button className="btn, btn-outline-primary Fs1 ml-auto br10px" onClick={handelDelete }>حذف</button>
                        </div>

                        <p className="FS2">{props.text}</p>
                    </div>
                </CardBody>

            </Card>
        </IsLoaderComponent>


    );
};

export default PopUpComponent;