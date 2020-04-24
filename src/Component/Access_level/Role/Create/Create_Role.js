import React, { useState,useEffect } from 'react';
import Loader from "../../../Common/Loader/Loader";
import {Card, CardBody, CardTitle , Row} from "reactstrap";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import { Form} from "formik";
import {
    error_Notification,
    permissionOptionReverse,
    PermissionOptions,
    success_Notification
} from "../../../functions/componentHelpFunction";
import {Getrole, SuggestPermission, Getpermission, AddRole, updateRole} from "../../../functions/ServerConnection";
import TextField from '@material-ui/core/TextField';
import AutoSuggestMU from "./subs/AutoSuggestM-U/AutoSuggestM-U";
import validator from 'validator';

import FormCardAuthAdmin from "../../Common/FormCardAuthAdmin/FormCardAuthAdmin";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    label: {
        // textTransform: 'capitalize',

        position: 'absolute',
        right:19,
         width:50,
        '&$focused':{
            color:'red',
            right: 10,
        }

    },
    focused:{

        right: 10,
    }

});




export default function CreateRole (props){
    const classes = useStyles();
    const [isLoder,setisLoder] =useState(false);
    const [Id,setId] =useState(':Id');
    const [permissonInitioal,setpermissonInitioal] =useState([]);

    const [values,setvalues] =useState({name:"",desc:"",permissions:""});
    const [error,seterror] =useState({name:"",desc:"",permissions:""});
     useEffect( () => {
        const {match: {params}} = props;
        const getPermission=async (name)=>{
            let permission=await Getpermission(name);
                console.log('permission');
                console.log(permission);
            return permission
        };
        async function getRole(name) {
            let {state,Description}=  await Getrole(name);
            if (state===200){
                // ***change permission name to an object for autosuggest options****
                 let Permission=PermissionOptions(Description.permission_list);
                setpermissonInitioal(Permission)
                // *****set initial value for update data******
                setvalues({name:Description.role_name,desc:Description.description,permissions:Permission});
            } else {
                error_Notification(state,Description)
            }

        }
        if (params.Id!==':Id'){
            setId(params.Id);
            getRole(params.Id);

        }
    },values,permissonInitioal);
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
    // ****get select value from auto suggest *******
    const getValues=(names ,name)=>{
        console.log(names)
        setvalues({ ... values,permissions:names})
    };
    // *** validation form condition *******
    const validateForm=(callback)=> {
        let errors={name:"",desc:"",permissions:""};

        let formValidate=true;

        //name
        if (validator.isEmpty(values.name)) {
            console.log("error is must be set ");
            formValidate = false;
            errors['name']="فیلد اسم خالی است ";

        }
        //permission
        if (validator.isEmpty(values.permissions.toString())) {
            formValidate = false;
            errors['permissions']="قیلد permission  شما خالی است! ";
        }
        //desc
        if (validator.isEmpty(values.desc)) {
            formValidate = false;
            errors['desc']="قیلد توضیحات شما خالی است!";

        }else if (!validator.isLength (values.desc , { min : 5 , max : 200 })) {
            formValidate=false;
            errors['desc']="قیلد توضیحات  بادی حداقل 5 کاراکتر و حداکثر 30 کاراکتر باشد !";
        }

        seterror(errors);
        return callback(formValidate)

    };
    // *** submit form for add or update *******
    const  handleSubmit = async (e) => {
        e.preventDefault();

        validateForm(async (validate)=>{

            if (validate){
                let permissions_name=permissionOptionReverse(values.permissions)
                // **************check its update or just add **********
                if (Id!==':Id') {

                    setisLoder(true);
                    let Data= {
                        "role_name":  Id,
                        "permissions":permissions_name,
                        "update_user_roles": true
                    };
                    // **********update data*********
                    let Register = await updateRole(JSON.stringify(Data));
                    setisLoder(false);
                    console.log('Register');
                    console.log(Register);

                    let {state, Description} = Register;
                    if (state===200 ) {
                        success_Notification( "اطلاعات شما با موفقیت ثبت شد")
                    } else {
                        error_Notification(state,Description)
                    }

                }else {

                    setisLoder(true);

                    let Data={
                        "role_name": values.name,
                        "description": values.desc,
                        "permission_list": permissions_name
                    };
                    console.log(Data);
                    // ********** add data*********
                    let Register = await AddRole(JSON.stringify(Data));

                    setisLoder(false);

                    let {state, Description} = Register;
                    if (state===200) {
                        success_Notification( "اطلاعات شما با موفقیت ثبت شد")
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

    return <FormCardAuthAdmin isLoder={isLoder} name={"create role"} handleSubmit={handleSubmit}   >

        <div className="w-100 row m-0 ">
            <AutoSuggestMU GetValues={getValues} getOption={getOption}
                           error={error.permissions}
                           DefaultValue={permissonInitioal} name={"permissions"} getnamefromOption={'permission_name'}
            />

            <div className="col-12"   >


                <TextField
                    className="col-12   position-relative m-2    "
                    error={error.name.length>2?true:false}
                    helperText={error.name.length>2? error.name :""}
                    id="Name"
                    // labelPlacement="top"
                    InputLabelProps={{
                        classes: {
                            root: classes.label,
                            focused: classes.focused,
                        },


                    }}
                    // required
                    label="Name"
                    value={Id!==':Id'?Id:values.name}
                    variant="outlined"
                    onChange={(e)=>setvalues({ ... values,name:e.target.value})}
                />
            </div>
            <div className="col-12">
                <TextField
                    className="col-12 m-2  "
                    id="desc"
                    label="desc"
                    value={values.desc}
                    error={error.desc.length > 2 ? true : false}
                    helperText={error.desc.length > 2 ? error.desc : ""}
                    multiline
                    rowsMax="4"
                    onChange={(e) => setvalues({...values, desc: e.target.value})}
                    variant="outlined"
                />
            </div>

        </div>
    </FormCardAuthAdmin>
};