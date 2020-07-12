import React, {Component} from 'react';
import IsLoaderComponent from "../../../Common/ISLodader/IsLoader";
import {GetClassroom} from "../../../functions/ServerConnection";
import DetailsClassRoom from "./DetaisClassRoom/DetaisClassRoom";
import UsersInClassRoomLists from "./UsersInClassRoomLists/UsersInClassRoomLists";
import {Card,CardBody} from "reactstrap";
import HeaderContentNavigation from "../../../Content/HeaderContentNavigation/HeaderContentNavigation";

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

        let{state ,Description}= await GetClassroom(params.id);
        this.setState({
            isLoader:false,Description
        });


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


                            <HeaderContentNavigation list={[{"name": "لیست کلاس ها", "address": "/studio/classroom/list"},
                                {
                            "name": `  جزییات کلاس`,
                            "address": `/studio/classroom/detail/${this.props.match.params.id}`
                        }
                        ]}/>



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