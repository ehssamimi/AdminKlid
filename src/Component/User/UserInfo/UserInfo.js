import React, {useState, useEffect} from 'react';
import ExtentionDiv from "../../Common/ExtentionDiv/ExtentionDiv";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import PersonalProgram from "./PersonalProgram/PersonalProgram";

const UserInfo = (props) => {
    let name="احسان صمیمی راد";
    // const [count, setCount] = useState(1);
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });

    return (
        <div>
            <div className="d-flex align-items-center ">
                <span className="second-color FssubmitLogin">اطلاعات کاربر:</span>
                <span  className="primary-color FsHeaderLogin1 ml-2">{name}</span>
            </div>

            <ExtentionDiv name={"اطلاعات فردی"}  >
                <PersonalInfo/>
            </ExtentionDiv>

            <ExtentionDiv name={"برنامه شخصی"}  >
                <PersonalProgram/>
            </ExtentionDiv>





        </div>
    );
};

export default UserInfo;

