import React, {Component} from 'react';

import AddUserToClass from "./AddUserToClassRoom/AddUserToClass";
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {GetClassroom} from "../../../functions/ServerConnection";
import {error_Notification} from "../../../functions/componentHelpFunction";
import RowClassList from "../ClassRoomList/RowClassList";
import DetailsClassRoom from "./DetaisClassRoom/DetaisClassRoom";
import UsersInClassRoomLists from "./UsersInClassRoomLists/UsersInClassRoomLists";
import {Card,CardBody} from "reactstrap";

class ClassRoomDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User_id:"" ,
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
                        <Card className="mt-2 box-shadow-custom br20px" >
                            <CardBody>
                                <DetailsClassRoom {...this.state.Description}/>
                                <UsersInClassRoomLists {...this.props}  />
                                {/*<AddUserToClass {...this.props} updateList={(User_id)=>{this.setState(User_id)}}/>*/}
                                {/*<AddUserToClass {...this.props} />*/}



                            </CardBody>
                        </Card>

                    </div>

                </IsLoaderComponent>
            </div>
        );
    }
}

export default ClassRoomDetails;