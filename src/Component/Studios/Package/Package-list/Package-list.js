import React, {useState} from 'react';
import {getPackage, UserActioninclassroom} from "../../../functions/ServerConnection";
import {Card, CardBody, CardTitle, InputGroup, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap';
import TextField from '@material-ui/core/TextField';


import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {error_Notification, success_Notification, warning_Notification} from "../../../functions/componentHelpFunction";
import PackageListRow from "./PAckage-list-row/PackageListRow";
import HeaderContentNavigation from "../../../Content/HeaderContentNavigation/HeaderContentNavigation";

const PackageList = (props) => {
    const [isloader, setIsLoader] = useState(false);
    const [value, setvalue] = useState("");
    const [packages, setPackages] = useState("");

    const handelSubmit=async (e)=>{
        e.preventDefault();
        if (value.length!==0){
            await HandelGetPackageList(value)
         } else {
            error_Notification("نا موفق", "فیلد نام اجباری است ");
        }
    };
    const HandelGetPackageList=async (value)=>{
        console.log("send");
        setIsLoader(true);
        let {state, Description} = await getPackage(value);
        if (state === 200) {
            console.log(Description.packages)
            if (Description.packages.length===0){
                warning_Notification("پکیجی با این مشخصات یافت نشد! ")
            }

            setPackages(Description.packages)
        } else {
            error_Notification(state, Description);
        }
        setIsLoader(false);
    }



    return (
        <div>
            <HeaderContentNavigation list={[{"name": "لیست پکیج ها", "address": "/studio/package/list"} ]}/>
            <Card>
                <CardBody>
                    <CardTitle className="mt-2 mb-2">
                        <span className="FsFooterLogin">وارد کردن نام یا رشته یا پایه</span>
                    </CardTitle>


                    <div className="w-100" dir="ltr">
                        <form>
                            <InputGroup>

                                <button className="default  ml-auto btn  br10px btn-outline-primary " type="submit" onClick={(e) =>handelSubmit(e)}>ارسال</button>


                                <Input placeholder="نام - پایه - رشته" className="col-10" onChange={(e) =>setvalue(`${e.target.value}`)} />

                            </InputGroup>
                        </form>

                    </div>
                </CardBody>
            </Card>

            <IsLoaderComponent isLoader={isloader}>
                <div className="row p-0 m-0">
                    {
                        packages.length>0?packages.map((item,index)=> <PackageListRow  key={index} {...item} UpdateList={()=>HandelGetPackageList(value)}/> ):""
                    }
                </div>


            </IsLoaderComponent>



        </div>
    );
};

export default PackageList;