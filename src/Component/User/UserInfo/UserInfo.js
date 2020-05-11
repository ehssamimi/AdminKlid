import React, {useState, useEffect} from 'react';
import ExtentionDiv from "../../Common/ExtentionDiv/ExtentionDiv";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import PersonalProgram from "./PersonalProgram/PersonalProgram";
import {GetUserDropDown, GetUserInfo} from "../../functions/ServerConnection";
import Loader from "../../Common/Loader/Loader";
import {NotificationManager} from "react-notifications";
import {getProfileValue} from "../../functions/componentHelpFunction";
import {convertData} from "../../functions/Functions";
import UserCourse from "./UserCourse/USerCourse";

const UserInfo = (props) => {
     // const [count, setCount] = useState(1);
    const [isLoader, setIsLoader] = useState(false);
    const [values, setvalues] = useState({});
    const [owned_product, set_owned_product] = useState({});
    useEffect(  () => {
        async function getData( phone_number) {
            setIsLoader(true);
            let {state ,Description } =await GetUserInfo(phone_number);


            if(state===200){
                let values=getProfileValue(Description.user);
                setvalues(values);
                set_owned_product(Description.owned_product);
                setIsLoader(false);

                    return Description

            }
           else {
                NotificationManager.error(state, Description);
                return false;
            }
        }
        let{match:{params}}=props;

        getData(params.phoneNumber);


    },[]);







    // address: {province: "مازندران", city: "ساري"}
    // education: {grade: "نهم", field: "ریاضی فیزیک", gpa: 18, school_name: "شهید بهشتی", school_type: "تیزهوشان"}
    // parent: {name: "محمد", phone_number: "09112571484", verify: false}
    // personal_info: {phone_number: "09112561701", name: "احسان صمیمی راد", ssn: "2092204971"}
    // profile: {image_id: "https://5e7df4522174ce0011232b00.liara.space/user-…9926eabd0031e29149beb9efcc4c5cf2699f23830cd576bbd"}
    // __proto__: Object


    return (
        <div>
            {
                isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :
                    <div className="w-100">
                        <div className="d-flex align-items-center flex-column justify-content-center col-8 offset-2">
                            <div className="hpx200 col-6">
                                <img src={values.profile_img} alt="img_profile " className="img-self-cover br10px"/>
                            </div>
                            <div>
                                <span className="second-color FssubmitLogin">اطلاعات کاربر:</span>
                                <span className="primary-color FsHeaderLogin1 ml-2">{values.name}</span>
                            </div>

                        </div>

                        < ExtentionDiv name={"اطلاعات فردی"}  >
                            <PersonalInfo values={values}/>
                        </ExtentionDiv>

                        <ExtentionDiv name={"برنامه شخصی"}  >
                            <PersonalProgram pdf={values.personal_schedule}/>
                        </ExtentionDiv>


                        <ExtentionDiv name={"دوره های فردی "}  >
                           <UserCourse  {...props}/>
                        </ExtentionDiv>
                    </div>



            }




        </div>
    );
};

export default UserInfo;

