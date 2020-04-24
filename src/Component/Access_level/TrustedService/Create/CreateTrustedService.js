import React, {Component, useEffect, useState} from 'react';
import {
    AddTrustedService, updateRole
} from "../../../functions/ServerConnection";
import {
    error_Notification,
     success_Notification
} from "../../../functions/componentHelpFunction";
import validator from "validator";
import Loader from "../../../Common/Loader/Loader";
import {Card, CardBody, CardTitle, Row} from "reactstrap";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import {Form} from "formik";
import TextField from "@material-ui/core/TextField/TextField";
import AutoSuggestMU from "../../Role/Create/subs/AutoSuggestM-U/AutoSuggestM-U";



export default function CreateTrustedService (props){
    const [isLoder,setisLoder] =useState(false);
    const [Id,setId] =useState(':Id');

    const [values,setvalues] =useState({ name:""});
    const [error,seterror] =useState({name:""});
    useEffect( () => {
        const {match: {params}} = props;

        async function getUserRoleFunc(user_id) {
            // let {state,Description}=  await GetUserRole(user_id);
            // if (state===200){
            //     console.log(Description)
            //     // ***change permission name to an object for autosuggest options****
            //     let Permission=PermissionOptions(Description.permissions_list);
            //     setpermissonInitioal(Permission)
            //     // ***change role name to an object for autosuggest options****
            //     let Roles=RoleOptions(Description.roles_list);
            //     setrolesInitioal(Roles)
            //     // *****set initial value for update data******
            //     setvalues({ user_id:user_id,permissions:Permission,roles:Roles});
            // } else {
            //     error_Notification(state,Description)
            // }

        }
        if (params.Id!==':Id'){
            setId(params.Id);
            // getUserRoleFunc(params.Id);

        }
    },values );


    // *** validation form condition *******
    const validateForm=(callback)=> {
        let errors={name:""};

        let formValidate=true;

        //name
        if (validator.isEmpty(values.name)) {
            formValidate = false;
            errors['name']="نام سرویس را وارد کنید  ";

        }
        // if (validator.isEmpty(values.roles.toString())) {
        //     formValidate = false;
        //     errors['roles']="فیلد  نقش ها  خالی است ";
        // }
        // //permission
        // if (validator.isEmpty(values.permissions.toString())) {
        //     formValidate = false;
        //     errors['permissions']="قیلد permission  شما خالی است! ";
        // }
        // //desc


        seterror(errors);
        return callback(formValidate)

    };
    // *** submit form for add or update *******
    const  handleSubmit = async (e) => {
        e.preventDefault();

        validateForm(async (validate)=>{


            if (validate){

                // **************check its update or just add **********
                if (Id!==':Id') {


                    setisLoder(true);
                    let Data= {
                        "service_name": values.name
                    };
                    // **********update data*********
                    let Register = await updateRole(JSON.stringify(Data));
                    setisLoder(false);
                    console.log('Register')
                    console.log(Register)

                    let {state, Description} = Register;
                    if (state===200 ) {
                        success_Notification( "اطلاعات شما با موفقیت ثبت شد")
                    } else {
                        error_Notification(state,Description)
                    }

                }else {
                    setisLoder(true);
                    // let User=await GetUserInfo(values.user_id)


                        let Data= {
                            "service_name": values.name
                        };
                        let Register = await AddTrustedService(JSON.stringify(Data));
                        setisLoder(false);

                        let {state, Description} = Register;
                        if (state===200) {
                            console.log(Description);
                                success_Notification( `new service with secret service 
                                 ${Description.service_secret}
                                 is added
                                 `)
                        } else {
                            error_Notification(state,Description)
                        }



                }

            }else {
                console.log( 'error' )
                console.log( error )
            }
        })

    };


    return isLoder?   // *******checking for submit form or get category Option is then loader start then loader close**********
        <div className='d-flex justify-content-center align-items-center'>
            <div className='col-6'>
                <Loader/>
            </div>
        </div>
        :

        <div  className="w-100 " dir='rtl' >
            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <div className='d-flex justify-content-start'>
                                    <span>create trust service </span>
                                </div>
                            </CardTitle>
                            <Form className="av-tooltip tooltip-label-bottom w-100 row m-0" onSubmit={handleSubmit}>
                                <div className="col-8 offset-2   d-flex flex-column justify-content-between">
                                    <div className="w-100 row m-0 ">
                                        <div className="col-12"   >
                                            <TextField
                                                className="col-12 ltr m-2  "
                                                error={error.name.length>2?true:false}
                                                helperText={error.name.length>2? error.name :""}
                                                id="name"
                                                label="name"
                                                value={Id!==':Id'?Id:values.name}
                                                variant="outlined"
                                                onChange={(e)=>setvalues({ ... values,name:e.target.value})}
                                            />
                                        </div>
                                        <div className="w-100 ">
                                            <button className="btn btn-success text-center col-6 offset-3 "
                                                    type="submit">
                                                فرستادن
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>



                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        </div>
};