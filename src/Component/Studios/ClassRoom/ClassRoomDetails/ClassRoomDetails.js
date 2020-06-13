import React, {Component} from 'react';
import AutoSuggestEdit from "../../../Common/AutoSuggestEdit/AutoSuggestEdit";
import {GetProgressive, SuggestName, SuggestUser} from "../../../functions/ServerConnection";
import {AutoSuggestNameVAlue, AutoSuggestUsers} from "../../../functions/componentHelpFunction";
import AutoSuggestEditwithOutLowerCase from "../../../Common/AutoSuggestEdit/AutoSuggestEditwithOutLowerCase";

class ClassRoomDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",error:"",
            data:"",isOpenModal:false,isLoader:true,
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
        this.setState({
            value
        });
        let data = await this.getName(value);
        this.setState({
            data
        });

        console.log("value");
        console.log(value);
    };
    render() {
        return (
            <div>

                <span className="FsFooterLogin mb-3">انتخاب نام ویدیو:</span>
                <AutoSuggestEditwithOutLowerCase
                    placeholder={ "لطفا نام ویدیو را وارد کنید"}
                    data={this.state.data}
                    value={this.state.value}
                    onChange={value => { this.onChangeValue(value)}}
                />

            </div>
        );
    }
}

export default ClassRoomDetails;