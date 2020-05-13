import React, {useState, useEffect} from 'react';
import ImgComponent from "../../Common/ImgComponents/ImgComponent";
import defaultImg from "../../Common/img/deault.svg";
import Loader from "../../Common/Loader/Loader";
import IsLoaderComponent from "../../Common/ISLodader/IsLoader";
import {loadMainCourse, UploadDefaultImg, UploadSchedule} from "../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../functions/componentHelpFunction";

const DefaultProfile = (props) => {
    const [error, setError] = useState({"main":""});
    const [file, setFile] = useState(defaultImg);
    const [DefaultImg, setDefaultImg] = useState(defaultImg);
    const [isLoader, setisLoader] = useState(false);

     useEffect(() => {
        // Update the document title using the browser API
     });
    const HandelAddImg = (type, value) => {
        console.log(value)
        setFile(value)
    };
   const validateForm=(callback)=> {
         let errors={"main":""};

        let formValidate=true;
        // if (this.state.EditCourse === undefined) {
            if (file===DefaultImg) {
                console.log("ssssssssssssssssssssss")
                formValidate = false;
                errors["main"] = "عکس  باید انتخاب شود ";
            }

       setError(errors);


        return callback(formValidate)
    };


    const handelSubmit=()=>{

        validateForm(async (validate) => {
            if (validate) {
                setisLoader(true);
                const{state,Description }= await UploadDefaultImg(file);
                setisLoader(false);
                setFile(Description.url);
                setDefaultImg(Description.url);
                console.log(Description.url);
                if (state===200){
                    success_Notification("موفق شدید" ,"عکس دیفالت جایگزین شد")
                } else {
                    error_Notification(state,Description);
                }


            }else {
                console.log(error)
            }
        })


    };
    console.log(error);

    return (
        <div>
            <IsLoaderComponent isLoader={isLoader}>
                <div className="col-md-4 col-sm-12">
                    <ImgComponent GetData={HandelAddImg}   label={"اضافه کردن عکس اصلی"} img={file} Type="main"  errors={error}/>
                    {/*<ImgComponent GetData={ HandelAddImg}   label={"اضافه کردن عکس اصلی"} img={defaultImg} Type="main"  errors={error}/>*/}
                    <button className="btn btn-primary" onClick={handelSubmit}>ارسال</button>
                </div>
            </IsLoaderComponent>





        </div>
    );
};

export default DefaultProfile;