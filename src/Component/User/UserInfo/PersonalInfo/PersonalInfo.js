import React, {useState, useEffect} from 'react';
import {Card, Col} from "reactstrap";
import LabelValueRow from "../../../Common/LabalValue/LabelValue";
import defaultImg from './../../../Common/img/deault.svg';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {GetUserProfile} from "../../../functions/ServerConnection";
import {getProfileValue} from "../../../functions/componentHelpFunction";


const PersonalInfo = (props) => {
    // const [isLoder, setisLoder] = useState(true);
    // const [values, setvalues] = useState( {});
    //
    // useEffect(  () => {
    //     //  async function getUserDropDown(user_id) {
    //     //
    //     //     const {state, Description}=await GetUserDropDown();
    //     //     if (state===200 ) {
    //     //         // setisLoder(false)
    //     //         const option={
    //     //             "school_type":Description.school_type, "field_type":Description.field_type, "grade_type":Description.grade_type
    //     //         };
    //     //         setOptions(option);
    //     //
    //     //     } else {
    //     //         NotificationManager.error(state, Description);
    //     //         // setisLoder(false);
    //     //         // error_Notification(state,Description)
    //     //     }
    //     //     // console.log(UserDropDown)
    //     //
    //     // }
    //     async function getUserInfo(token) {
    //
    //         const {state, Description}=await GetUserProfile();
    //         if (state===200 ) {
    //             setisLoder(false);
    //             console.log(Description);
    //
    //             let values=getProfileValue(Description);
    //
    //              setvalues(values);
    //          } else {
    //             NotificationManager.error(state, Description);
    //             setisLoder(false);
    //         }
    //         // console.log(UserDropDown)
    //
    //     }
    //     setisLoder(true);
    //     // getUserDropDown();
    //     getUserInfo();
    //
    //
    // },[]);
    // console.log(values)

let{values}=props;

 //     parent_verify: false
 //     profile_img: "https://5e7df4522174ce0011232b00.liara.space/user-service/system/profiles_pic/5ea0132cd8cbe2eb0b7e2361?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=11CAOPNDQWXGU8FVAUF2J%2F20200508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200508T090029Z&X-Amz-Expires=25200&X-Amz-SignedHeaders=host&X-Amz-Signature=69554c583910b85feb8f3b24b72e0225f2bed503d798ef2ecfdbf8fc269c8307"

    return (
        <div className="w-100 mt-3 h-100 pb-3" dir="rtl">

            <div className="w-100 h-100 ow m-0">
                <div className="row m-0  w-100    ">
                    <LabelValueRow label={"نام و نام خانوادگی"} value={values.name} className="col-6 col-md-6 col-lg-6    justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"شماره تماس"} value={values.phoneNumber} className="col-6 col-md-4 col-lg-4 col-lg-3  justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"پایه"} value={values.class} className="col-6 col-md-4 col-lg-4 col-lg-3  justify-content-start FsFooterLogin "/>
                    {
                        values.fields ? <LabelValueRow label={"رشته"} value={values.fields} className="col-6 col-md-4 justify-content-start FsFooterLogin "/> : ""
                    }
                    <LabelValueRow label={"استان"} value={values.country?values.country:"--"} className="col-6 col-md-4 col-lg-4 col-lg-3 col-xl-4justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"شهر"} value={values.city?values.city:"--"} className="col-6 col-md-4 col-lg-4 col-lg-3 col-xl-4 justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"نوع مدرسه"} value={values.Schoolkind?values.Schoolkind:"--"} className="col-6 col-md-4 col-lg-4 col-lg-3 col-xl-4 justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"نام مدرسه"} value={values.schoolName?values.schoolName:"--"} className="col-6 col-md-4 col-lg-4 col-lg-3 col-xl-4 justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"معدل سال قبل"} value={values.average_num?values.average_num:"--"} className="col-6 col-md-4 col-lg-4 col-lg-3 col-xl-4 justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"شماره ملی"} value={values.ID?values.ID:"--"} className="col-6 col-md-4 col-lg-4 col-lg-3 col-xl-4 justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"نام والد"} value={values.parent_name?values.parent_name:"--"} className="col-6 col-md-4 col-lg-4 col-lg-3 col-xl-4 justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"تماس والد"} value={values.parent_num?values.parent_num:"--"} className="col-6 col-md-4 col-lg-4 col-lg-3 col-xl-4 justify-content-start FsFooterLogin "/>
                    <LabelValueRow label={"آیا شماره والد درست یابی شده؟"} value={values.parent_verify?"بله":"خیر"} className="col-6    justify-content-start FsFooterLogin "/>

                    <div className="w-100 mt-3 brt-s row m-0">
                        <LabelValueRow label={"کد احراز هویت فردی"} value={values.personal_code} className="col-6   justify-content-start FsFooterLogin "/>
                        <LabelValueRow label={"کد احزاز هویت والد"} value={values.parent_code} className="col-6  justify-content-start FsFooterLogin "/>
                    </div>

                </div>


            </div>






        </div>
    );
};

export default PersonalInfo;