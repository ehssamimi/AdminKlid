import React, {Component} from 'react';

import AddUserToClass from "./AddUserToClassRoom/AddUserToClass";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {GetClassroom} from "../../../functions/ServerConnection";
import {error_Notification} from "../../../functions/componentHelpFunction";
import RowClassList from "../ClassRoomList/RowClassList";
import DetailsClassRoom from "./DetaisClassRoom/DetaisClassRoom";
import UsersInClassRoomLists from "./UsersInClassRoomLists/UsersInClassRoomLists";

class ClassRoomDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

           isLoader:true,Description:""

        }
    }
   async componentDidMount(){
        let{match:{params}}=this.props;
        // console.log(params.id);

        let{state ,Description}= await GetClassroom(params.id);
        this.setState({
            isLoader:false,Description
        });

        // console.log(state);
        // console.log(Description);
        // let{payment: {price}}=Description

        // if (state===200 ) {
        //     setInitialValue({Name:"classical" , grade: {label:"دوره",value:"دوره"}, field:{label:"رشته",value:"رشته"} ,lesson_names:{label:"درس",value:"درس"} ,price:price})
        // } else {
        //     error_Notification(state, Description)
        //     // NotificationManager.error(state, Description);
        // }
    }
    UpdateClassList=()=>{
        this.setState({
            hasMore:true,
        })
    }


    render() {
        return (
            <div>
                <IsLoaderComponent isLoader={this.state.isLoader}>
                    <div>
                        <DetailsClassRoom {...this.state.Description}/>

                        <AddUserToClass{...this.props}/>
                        <UsersInClassRoomLists/>
                    </div>

                </IsLoaderComponent>
            </div>
        );
    }
}

export default ClassRoomDetails;