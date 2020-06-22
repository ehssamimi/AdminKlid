 import React, {useState, useEffect} from 'react';
import * as Yup from "yup";
import {
    getPackageDetail,
    GetUserDropDown, UpdatePackage
} from "../../../functions/ServerConnection";
import {
    error_Notification,
    LabelValueOption,
    LabelValueSingle,
    success_Notification
} from "../../../functions/componentHelpFunction";
import {Card, CardBody, CardTitle, Table} from "reactstrap";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {Form, Formik} from "formik";
import {FormCheckBox, FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";
 import {RowShowShowColEdit} from "../../../Common/RowShowShowColEdit/ShowInRowComponents";
 import ClassRoomList from "../../ClassRoom/ClassRoomList/ClassRoomList";
 import PreviewUserInClassroomList
     from "../../ClassRoom/ClassRoomDetails/UsersInClassRoomLists/PreviewUserInClassroomList";
 import ClassRowInPackageTable from "./ClassRowInPackageTable/ClassRowInPackageTable";



const SignupSchema = Yup.object().shape({

    Name: Yup.string()
        .required("نام اجباری است!"),
    grade: Yup.object()
        .required("پایه اجباری است !"),
    field: Yup.object()
        .required("رشته اجباری است !"),
    isActive: Yup.string().required("A radio option is required"),

});
const options = [
    { value: "نیست", label: "نیست" },
    { value: "هست", label: "هست" }
];

const PackageDetail = (props) => {
    const [isLoader, setIsLoader] = useState(true);
    const [Option, setOptions] = useState({});
    const [classess, setclassess] = useState([]);
    const[initialValue,setInitialValue]=useState({Name:'' , grade: "", field: '',isActive: ""});
    useEffect(() => {
        // Update the document title using the browser API
        async function  getDrops(){
            let{state ,Description}= await GetUserDropDown();



            if (state===200 ) {
                setOptions(Description);
                console.log(Description);
            } else {
                error_Notification(state, Description)
                // NotificationManager.error(state, Description);
            }


        }
        async function  getPackageDetails(){
             let {state, Description} = await getPackageDetail(props.match.params.id);
             if (state === 200) {
                console.log(Description);
                console.log(Description.information.field);
                // setInitialValue({Name:Description.name , grade:LabelValueSingle(Description.information.grade)  , field:LabelValueSingle(Description.information.field),isActive: Description.is_active?"هست":"نیست" })
                setInitialValue({Name:Description.name , grade:Description.information.grade , field:Description.information.field,isActive: Description.is_active?"هست":"نیست" })
                setclassess( Description.classes);

            } else {
                error_Notification(state, Description);
            }


            if (state===200 ) {
                setOptions(Description)
            } else {
                error_Notification(state, Description)
                // NotificationManager.error(state, Description);
            }
            await getDrops();
            setIsLoader(false);

        }

          getPackageDetails();

    },[props]);
    const UpdateClassList=async ()=>{
        let {state, Description} = await getPackageDetail(props.match.params.id);
        if (state === 200) {
                setclassess( Description.classes);
        } else {
            error_Notification(state, Description);
        }
    };



    const handleSubmit = async (values, { setSubmitting }) => {


        const payload = {
            ...values,
        };
        console.log("payload");
        console.log(payload);

        // **********send validate data*********

        let Data= {
            "id": props.match.params.id,
            "name": payload.Name,
            "information": {
                "grade": payload.grade.value,
                "field": payload.field.value
            },
            "is_active": payload.isActive !== "نیست",
            "classes": classess
        };



        // information:
        //     field: undefined
        // grade: "یازدهم"
        // __proto__: Object
        // is_active: false
        // name: "new"


        console.log(Data);
        setIsLoader(true);
        let{state,Description}= await UpdatePackage(JSON.stringify(Data));
        setIsLoader(false);
        if (state === 200) {
            success_Notification("پکیج مورد نظر ثبت شده است ")
        } else {
            error_Notification(state, Description)
        }

    };


    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle className="mt-2  mb-3">
                        <span>جزئیات پکیج</span>
                    </CardTitle>

                    {
                        <IsLoaderComponent isLoader={isLoader} >
                            <div className="row">
                                <RowShowShowColEdit label="نام " value={initialValue.Name} className="col-sm-6 col-md-4 col-lg-3 "/>
                                <RowShowShowColEdit label="دوره " value={initialValue.grade} className="col-sm-6 col-md-4 col-lg-3 "/>
                                <RowShowShowColEdit label="رشته " value={initialValue.field} className="col-sm-6 col-md-4 col-lg-3 "/>
                                <RowShowShowColEdit label="فعال " value={initialValue.isActive } className="col-sm-6 col-md-4 col-lg-3 "/>
                            </div>

                            <CardTitle className="mt-4  mb-3">
                                <span>لیست کلاس های موجود در پکیج</span>
                            </CardTitle>

                            <Table striped>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="text-center">پایه</th>
                                    <th className="text-center">رشته</th>
                                    <th className="text-center">درس</th>
                                    <th className="text-center">اکشن</th>
                                </tr>
                                </thead>
                                <tbody>

                                {classess.length>0 && Array.isArray(classess)  ?
                                    classess.map((todo, index) =>
                                        <ClassRowInPackageTable {...todo} key={index} index={index}  packageId={props.match.params.id} UpdateClassList={UpdateClassList}/>
                                    ) : ''
                                }

                                </tbody>
                            </Table>


                         </IsLoaderComponent >
                    }
                </CardBody>
            </Card>
            <div className="w-100 mt-3">
                <ClassRoomList type={"classPackage"} packageId={props.match.params.id} classess={classess} UpdateClassList={UpdateClassList}/>

            </div>

        </div>
    );
};

export default PackageDetail;