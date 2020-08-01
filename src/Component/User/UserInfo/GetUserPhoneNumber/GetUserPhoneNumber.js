import React, {useState, useEffect,Component} from 'react';
import {Card, CardBody, CardTitle, Form, InputGroup} from 'reactstrap'
import {TextInput} from "../../../Common/Forms/textInput/TextInput";
import {Link} from "react-router-dom";
import validator from "validator";
import {
    AutoSuggestUsers,
    error_Notification,
    success_Notification,
    validatephoneNumber
} from "../../../functions/componentHelpFunction";
import {RegestryUser, SuggestUser, UserActioninclassroom} from "../../../functions/ServerConnection";
import {NotificationManager} from "react-notifications";
import AutoSuggestEditwithOutLowerCase from "../../../Common/AutoSuggestEdit/AutoSuggestEditwithOutLowerCase";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";

class GetUserPhoneNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productSeparate: [],
            pageStart: 1,
            hasMore: true,
            value: "",error:"",finalNumber:"",
            data:"",isLoader:true,

        }


    }

    async componentDidMount(){
        let data=await this.getName("احسان");
        this.setState({
            isLoader:false,   data
        });
    }
    getName=async (value)=>{
        // let{state ,Description }= await SuggestName(value);
        let{state ,Description }= await SuggestUser(value);
        console.log("Description");
        console.log( Description);
        let Values={name:"",value:""};
        if (state===200){
            // Values=AutoSuggestNameVAlue(Description)
            Values=AutoSuggestUsers(Description.users);
            console.log(Values)
        }
        return  Values
    };
    onChangeValue=async(value)=>{
        function hasNumber(myString) {
            return /\d/.test(myString);
        }
        console.log(hasNumber(value));


        console.log("suggest");
        this.setState({
            value
        });
        let data = await this.getName(value);
        console.log(data.length===0)
        if (hasNumber(value) && data.length===0){
            let thenum = value.match(/\d+/)[0] // "3"
            if (thenum.length===11){
                this.setState({
                    finalNumber:thenum ,
                    error:""
                })
            }

        } else {
            this.setState({
                finalNumber:""
            })
        }


        console.log(data);
        this.setState({
            data
        });
        // }


    };
    handelSending=async (e)=>{
        e.preventDefault();
        if (this.state.finalNumber !== "") {
            this.setState({
                isLoader:true
            });
            let data = await this.getName(this.state.finalNumber);
            let user_id = data[0].value;
            let class_id = this.props.match.params.id;
            console.log("this.state.finalNumber")
            console.log(this.state.finalNumber)
            console.log("data")
            console.log(data)
            let goUser=document.getElementById("profile");
                goUser.click();
            // let {state, Description} = await UserActioninclassroom("add", class_id, user_id, null);
            // this.setState({
            //     isLoader:false
            // });
            // if (state === 200) {
            //     this.updateList();
            //     success_Notification("کاربر با موفقیت به کلاس اضافه شد");
            // } else {
            //     error_Notification(state, Description);
            // }

        } else {
            this.setState({
                error: "کاربر حتما باید انتخاب شود"
            })
        }


    }




    render() {
        return (
            <div>
                <Card>
                <CardBody>
                <CardTitle className="mt-4 mb-1">
                    <span>ورود به پروفایل کاربری </span>
                </CardTitle>
                <IsLoaderComponent isLoader={this.state.isLoader}>
                    <div className="w-100 row m-0">

                        <div className="w-100" dir="ltr">
                            <form onSubmit={ this.handelSending}>
                            <InputGroup>

                                <button className="default  ml-auto btn  br10px btn-outline-primary " type="submit" onClick={ this.handelSending}>ارسال</button>
                                <div className="col-11 p-0">
                                    <AutoSuggestEditwithOutLowerCase
                                        placeholder={ "لطفا نام یا شماره تماس کاربر را وارد کنید"}
                                        data={this.state.data}
                                        value={this.state.value}
                                        onChange={value => { this.onChangeValue(value)}}
                                    />
                                    {this.state.error!=="" ? (
                                        <div className="invalid-feedback d-block">
                                            {this.state.error}
                                        </div>
                                    ) : null}
                                </div>
                            </InputGroup>
                            </form>

                        </div>

                    </div>

                </IsLoaderComponent>
                <Link to={`/user/info/${this.state.finalNumber}`} id="profile" className="pt-4 d-none">go user profile</Link>
                </CardBody>
                    </Card>

            </div>
        );
    }
}

export default GetUserPhoneNumber;











//
//
// const GetUserPhoneNumber = (props) => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [error, seterror] = useState("");
//     useEffect(() => {
//         // Update the document title using the browser API
//      });
//     const validateForm=(callback)=> {
//         let errors="";
//
//         let formValidate=true;
//
//         if (validator.isEmpty(phoneNumber)) {
//             formValidate = false;
//             errors ="شماره تلفن دانش آموز را وارد کنید  ";
//         }else if (!validatephoneNumber(phoneNumber)) {
//             formValidate = false;
//             errors ="شماره ای که وارد کرده اید غیر مجاز است !  ";
//         }
//
//
//
//
// console.log("errors");
// console.log(errors);
//         seterror(errors);
//         return callback(formValidate)
//     };
//
//
//     const getPhone=(e)=>{
//         e.preventDefault();
//         validateForm(async (validate)=>{
//
//             if (validate){
//                 console.log("phoneNumber");
//                 console.log(phoneNumber);
//                 let goUser=document.getElementById("profile");
//                 goUser.click();
//
//             }else {
//                 console.log( 'error' );
//                 console.log( error );
//             }
//         })
//
//
//     }
//
//     return (
//         <div>
//             <Card className="br20px">
//                 <CardBody>
//                     <div className="w-100 row m-0">
//
//                         <div className="w-100" dir="ltr">
//
//                             <InputGroup>
//                                 <button className="default  ml-auto btn  br10px btn-outline-primary " onClick={ this.handelSending}>ارسال</button>
//                                 <div className="col-11 p-0">
//                                     <AutoSuggestEditwithOutLowerCase
//                                         placeholder={ "لطفا نام یا شماره تماس کاربر را وارد کنید"}
//                                         data={this.state.data}
//                                         value={this.state.value}
//                                         onChange={value => { this.onChangeValue(value)}}
//                                     />
//                                     {this.state.error!=="" ? (
//                                         <div className="invalid-feedback d-block">
//                                             {this.state.error}
//                                         </div>
//                                     ) : null}
//                                 </div>
//                             </InputGroup>
//
//                         </div>
//
//                     </div>
//
//
//
//
//
//                     {/*<TextInput onChange={value=>(setPhoneNumber(value))} label={'شماره تلفن همراه'} id={'phoneNumber'}*/}
//                     {/*           placeholder={"********09"} type={"number"} DivClass={"col-6"}*/}
//                     {/*           is_required={true} value={phoneNumber}*/}
//                     {/*           error={error }/>*/}
//                     {/*<button className="btn btn-primary" onClick={getPhone}>send</button>*/}
//                 </CardBody>
//                 <Link to={`/user/info/${phoneNumber}`} id="profile" className="pt-4 d-none">go user profile</Link>
//
//             </Card>
//
//         </div>
//     );
// };
//
// export default GetUserPhoneNumber;