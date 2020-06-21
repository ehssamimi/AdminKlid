import React, {useState, useEffect} from 'react';
import {getPackage, useractioninclassroom} from "../../../functions/ServerConnection";
import {Card, CardBody, CardTitle, InputGroup, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap';
import TextField from '@material-ui/core/TextField';


import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
import PackageListRow from "./PAckage-list-row/PackageListRow";

const PackageList = (props) => {
    const [isloader, setIsLoader] = useState(false);
    const [value, setvalue] = useState("");
    const [packages, setPackages] = useState("");
    useEffect(() => {

      });
    const handelgetPackage=async (value)=>{
        let {state,Description}=getPackage(value);
        console.log(Description);


    };
    const handelSubmit=async (e)=>{
        e.preventDefault();
        if (value.length!==0){
            console.log("send");
            setIsLoader(true);
            let {state, Description} = await getPackage(value);
            if (state === 200) {
                console.log(Description.packages[0])
                 setPackages(Description.packages)
            } else {
                error_Notification(state, Description);
            }
            setIsLoader(false);
         } else {
            error_Notification("نا موفق", "فیلد نام اجباری است ");
        }
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle className="mt-4 mb-1">
                        <span>وارد کردن نام یا رشته یا پایه</span>
                    </CardTitle>


                    <div className="w-100" dir="ltr">

                        <InputGroup>

                            <button className="default  ml-auto btn  br10px btn-outline-primary " onClick={(e) =>handelSubmit(e)}>ارسال</button>


                            <Input placeholder="نام - پایه - رشته" className="col-10" onChange={(e) =>setvalue(`${e.target.value}`)} />

                        </InputGroup>



                    </div>
                </CardBody>
            </Card>

            <IsLoaderComponent isLoader={isloader}>
                <div className="row p-0 m-0">
                    {
                        packages.length>0?packages.map((item,index)=> <PackageListRow  key={index} {...item}/> ):""
                    }
                </div>


            </IsLoaderComponent>



        </div>
    );
};

export default PackageList;