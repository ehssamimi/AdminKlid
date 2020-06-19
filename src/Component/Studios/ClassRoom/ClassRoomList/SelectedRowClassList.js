// import React, {useState, useEffect} from 'react';
import React, {Component} from 'react';
import {Card, CardBody, FormGroup} from 'reactstrap'
import RowShowShowColEdit from "../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import Select from "react-select";
import {LabelValueOption} from "../../../functions/componentHelpFunction";

const class_type=["public","special","personal"];

// const SelectedRowClassList = (props) => {
//     const [value, setValue] = useState({ value: "public" , label: "public"  });
//     const [classList, setClassList] = useState("");
//     // useEffect(() => {
//     //     // Update the document title using the browser API
//     //     document.title = `You clicked ${count} times`;
//     // });
//     let{active,id,information:{grade,field,lesson_name},live_information:{dash,hls,http_flv,rtmp,websocket},payment: {price}}=props;
//     const handelCLick=()=>{
//         props.selectClassRoom(id,value);
//
//         setClassList("br-red")
//
//          // props.ClassId!==id? setClassList(""): setClassList("br-red");
//
//     };
//     const handelChange=(v)=>{
//         setValue(v);
//         props.selectClassRoom("",value);
//         setClassList("");
//
//          // props.ClassId!==id? setClassList(""): setClassList("br-red");
//
//     };
//
//     return (
//         <Card className={`w-100 ${classList}`}  >
//             <CardBody className="w-100">
//                 <div className="row m-0 w-100 cursor-pointer"  onClick={ handelCLick}>
//                     <RowShowShowColEdit label={"دوره"} value={grade}   className={"col-6 d-flex justify-content-start p-0"}/>
//                     <RowShowShowColEdit label={"رشته"} value={field}   className={"col-6  d-flex justify-content-start p-0"}/>
//                     <RowShowShowColEdit label={"درس"} value={lesson_name}   className={"col-6  d-flex justify-content-start p-0"}/>
//                     <RowShowShowColEdit label={"هزینه"} value={price }   className={"col-6  d-flex justify-content-start p-0"}/>
//
//                 </div>
//                 <div className="w-100">
//                     <div className="w-100 mb-3 mt-3 ">
//                         <FormGroup className="form-group has-float-label br20px">
//                             <label>
//                                نوع کلاس
//                             </label>
//                             <Select
//                                 components={{Input: CustomSelectInput}}
//                                 className="react-select  l-h-25 "
//                                 classNamePrefix="react-select  "
//                                 name="form-field-name"
//                                 value={value}
//                                 // onChange={(value)=>{setValue(value)}}
//                                 onChange={(value)=>{handelChange(value)}}
//                                 options={LabelValueOption(class_type)}
//                             />
//
//                         </FormGroup>
//                     </div>
//                 </div>
//             </CardBody>
//         </Card>
//
//
//     );
// };
//
// export default SelectedRowClassList;



class SelectedRowClassList extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:{value: "public" , label: "public" },
            classList:"",id:this.props.id
        }
    }
      handelCLick=()=>{
        console.log(this.props.id,this.state.value)
        this.props.selectClassRoom(this.props.id,this.state.value);
        this.setState({
            classList:"br-red"
        });
    };
    static getDerivedStateFromProps(props, state) {
        if (props.ClassId !== state.id) {
            console.log("select another ");
            return {
                classList: "",
            };
        }
        // Return null if the state hasn't changed
        return null;
    }



    render() {
    let{active,id,information:{grade,field,lesson_name},live_information:{dash,hls,http_flv,rtmp,websocket},payment: {price}}=this.props;

    return (
            <Card className={`w-100 ${this.state.classList}`}  >
                <CardBody className="w-100">
                    <div className="row m-0 w-100 cursor-pointer"  onClick={ this.handelCLick}>
                        <RowShowShowColEdit label={"دوره"} value={grade}   className={"col-6 d-flex justify-content-start p-0"}/>
                        <RowShowShowColEdit label={"رشته"} value={field}   className={"col-6  d-flex justify-content-start p-0"}/>
                        <RowShowShowColEdit label={"درس"} value={lesson_name}   className={"col-6  d-flex justify-content-start p-0"}/>
                        <RowShowShowColEdit label={"هزینه"} value={price }   className={"col-6  d-flex justify-content-start p-0"}/>

                    </div>
                    <div className="w-100">
                        <div className="w-100 mb-3 mt-3 ">
                            <FormGroup className="form-group has-float-label br20px">
                                <label>
                                    نوع کلاس
                                </label>
                                <Select
                                    components={{Input: CustomSelectInput}}
                                    className="react-select  l-h-25 "
                                    classNamePrefix="react-select  "
                                    name="form-field-name"
                                    value={this.state.value}
                                    // onChange={(value)=>{setValue(value)}}
                                    onChange={(value)=>{this.setState({value})}}
                                    options={LabelValueOption(class_type)}
                                />

                            </FormGroup>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default SelectedRowClassList;
