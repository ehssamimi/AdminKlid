import React, {Component} from 'react';
import {SuggestUser, useractioninclassroom} from "../../../../functions/ServerConnection";
import {AutoSuggestUsers, error_Notification, success_Notification} from "../../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../../Common/ISLodader/IsLoader";
import AutoSuggestEditwithOutLowerCase from "../../../../Common/AutoSuggestEdit/AutoSuggestEditwithOutLowerCase";

class AddUserToClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",error:"",finalNumber:"",
            data:"",isOpenModal:false,isLoader:false,
            currentCount:0,type:"info",textPercent:"ََشروع",time_left:0
        }
    }
    async componentDidMount(){
        let data=await this.getName("احسان");

        // let {state ,Description }=await GetProgressive(this.props.action,this.props.ListData );
        // console.log(Description)
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
    handelSending=async ()=>{
        if (this.state.finalNumber !== "") {
            this.setState({
                isLoader:true
            });
            let data = await this.getName(this.state.finalNumber);
            let user_id = data[0].value;
            let class_id = this.props.match.params.id;
            let {state, Description} = await useractioninclassroom("add", class_id, user_id, null);
            this.setState({
                isLoader:false
            });
            if (state === 200) {
                success_Notification("کاربر با موفقیت به کلاس اضافه شد");
            } else {
                error_Notification(state, Description);
            }

        } else {
            this.setState({
                error: "کاربر حتما باید انتخاب شود"
            })
        }


    }
    render() {
        return (
            <div>
                <IsLoaderComponent isLoader={this.state.isLoader}>

                    <span className="FsFooterLogin mb-3">انتخاب کاربر:</span>
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
                    <button onClick={this.handelSending}>add</button>
                </IsLoaderComponent>


            </div>
        );
    }
}

export default AddUserToClass;



