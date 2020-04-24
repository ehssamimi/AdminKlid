 import React, { useState,useEffect } from 'react';
import Loader from "../../../Common/Loader/Loader";
import {Card, CardBody, CardTitle , Row} from "reactstrap";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import {  Form} from "formik";
import {
    error_Notification,
    permissionOptionReverse,
    PermissionOptions,
    success_Notification,RoleOptions,roleOptionReverse
} from "../../../functions/componentHelpFunction";
import {SuggestPermission, updateRole, SuggestRole, AddUserRole, GetUserRole
} from "../../../functions/ServerConnection";
import TextField from '@material-ui/core/TextField';
import AutoSuggestMU from "./../../Role/Create/subs/AutoSuggestM-U/AutoSuggestM-U";
import validator from 'validator';

export default function CreateUserRole (props){
    const [isLoder,setisLoder] =useState(false);
    const [Id,setId] =useState(':Id');
    const [permissonInitioal,setpermissonInitioal] =useState([]);
    const [rolesInitioal,setrolesInitioal] =useState([]);
    const [values,setvalues] =useState({ user_id:"",permissions:"",roles:""});
    const [error,seterror] =useState({user_id:"",permissions:"",roles:""});
    useEffect( () => {
        const {match: {params}} = props;

        async function getUserRoleFunc(user_id) {
            let {state,Description}=  await GetUserRole(user_id);
            if (state===200){
                console.log(Description)
                // ***change permission name to an object for autosuggest options****
                let Permission=PermissionOptions(Description.permissions_list);
                setpermissonInitioal(Permission)
                // ***change role name to an object for autosuggest options****
                let Roles=RoleOptions(Description.roles_list);
                setrolesInitioal(Roles)
                // *****set initial value for update data******
                setvalues({ user_id:user_id,permissions:Permission,roles:Roles});
            } else {
                error_Notification(state,Description)
            }

        }
        if (params.Id!==':Id'){
            setId(params.Id);
            getUserRoleFunc(params.Id);

        }
    },values,permissonInitioal,rolesInitioal);
    // ****get option permission from auto suggest *******
    const getOption=async(name)=>{
        console.log("set option");
        console.log(name);
        const permission=await SuggestPermission(name);
        let {state,Description}=permission;
        if (state===200){
            console.log(Description);
            return Description
        }else {
            error_Notification(state,Description)
        }

    };
    // ****get option permission from auto suggest *******
    const getRuleOption=async(name)=>{
        console.log("set option");
        console.log(name);
        const permission=await SuggestRole(name);
        let {state,Description}=permission;
        if (state===200){
            console.log(Description);
            return Description
        }else {
            error_Notification(state,Description)
        }

    };
    // ****get select value from auto suggest *******
    const getValues=(value,name)=>{
        if (name==='roles') {
            setvalues({ ... values,roles:value})
        }else {
            setvalues({ ... values,permissions:value})
        }

    };

    // *** validation form condition *******
    const validateForm=(callback)=> {
        let errors={user_id:"",permissions:"",roles:""};

        let formValidate=true;

        //name
        if (validator.isEmpty(values.user_id)) {
            formValidate = false;
            errors['user_id']="فیلد شماره تلفن  خالی است ";

        }
        if (validator.isEmpty(values.roles.toString())) {
            formValidate = false;
            errors['roles']="فیلد  نقش ها  خالی است ";
        }
        //permission
        if (validator.isEmpty(values.permissions.toString())) {
            formValidate = false;
            errors['permissions']="قیلد permission  شما خالی است! ";
        }
        //desc


        seterror(errors);
        return callback(formValidate)

    };
    // *** submit form for add or update *******
    const  handleSubmit = async (e) => {
        e.preventDefault();

        validateForm(async (validate)=>{
            let permissions_name=""
            if (values.permissions.length>0){
                permissions_name=permissionOptionReverse(values.permissions)
            }
             let role_name=""
            if (values.roles.length>0  ){
                console.log('values.roles')
                console.log(values.roles)
                role_name=roleOptionReverse(values.roles)
            }

            if (validate){

                // **************check its update or just add **********
                if (Id!==':Id') {


                    setisLoder(true);
                    let Data= {
                        "user_id": Id,
                        "roles_list": role_name,
                        "permissions_list": permissions_name
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
                    let User={state:200,Description:{id:values.user_id}};
                    let{state,Description}=User;
                    if (state===200) {
                        let Data= {
                            "user_id": Description.id,
                            "roles_list": role_name,
                            "permissions_list": permissions_name
                                };
                        let Register = await AddUserRole(JSON.stringify(Data));
                        setisLoder(false);

                        let {state, Description} = Register;
                        if (state===200) {
                            console.log('Description')
                            console.log(Description)
                            let{added,updated}=Description
                            if (added) {
                                success_Notification( "کاربر جدید با موفقیت ثبت شد ")
                            }else if (updated) {
                                success_Notification( "اطلاعات کاربر با موفقیت به روز رسانی شد  ")

                            }
                        
                        } else {
                            error_Notification(state,Description)
                        }


                    }else {
                        setisLoder(false);
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
                                    <span>create permission </span>
                                </div>
                            </CardTitle>
                            <Form className="av-tooltip tooltip-label-bottom w-100 row m-0" onSubmit={handleSubmit}>
                                <div className="col-8 offset-2   d-flex flex-column justify-content-between">
                                    <div className="w-100 row m-0 ">
                                        <div className="col-12"   >
                                            <TextField
                                                className="col-12 ltr m-2  "
                                                error={error.user_id.length>2?true:false}
                                                helperText={error.user_id.length>2? error.user_id :""}
                                                id="phoneNumber"
                                                label="phoneNumber"
                                                value={Id!==':Id'?Id:values.user_id}
                                                variant="outlined"
                                                onChange={(e)=>setvalues({ ... values,user_id:e.target.value})}
                                            />
                                        </div>

                                        <AutoSuggestMU GetValues={getValues} getOption={getOption}
                                                       error={error.permissions}
                                                       DefaultValue={permissonInitioal} name={"permissions"} getnamefromOption={'permission_name'}
                                        />
                                        <AutoSuggestMU GetValues={getValues} getOption={getRuleOption}
                                                       error={error.roles}
                                                       DefaultValue={rolesInitioal} name={"roles"} getnamefromOption={'role_name'}
                                        />



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