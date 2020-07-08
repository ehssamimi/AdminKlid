

import React, {useState, useEffect} from 'react';
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    Nav,
    NavItem,
    TabContent,
    TabPane,
    Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import classnames from "classnames";
import DetailsClassRoom from "../../../ClassRoom/ClassRoomDetails/DetaisClassRoom/DetaisClassRoom";
import UsersInClassRoomLists from "../../../ClassRoom/ClassRoomDetails/UsersInClassRoomLists/UsersInClassRoomLists";
import StudioInTable from "../StudioInTable/StudioInTable";
import ClassDetailInRoot from "./ClassDetailInRoot/ClassDetailInRoot";
import RowShowShowColEdit from "../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import Tab2ChatBox from "./Tab2-ChatBox/Tab2-ChatBox";


const StudioClass = (props) => {
    const [activeSecondTab, setactiveSecondTab] = useState("1");
    const [gid, setgid] = useState(null);

    useEffect(() => {
        console.log("class id ")
        console.log(props.match.params.id)
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);


    const toggleSecondTab=(tab)=> {
        if (activeSecondTab !== tab) {
            setactiveSecondTab(tab);
        }
    }
    const getGroupId=(gid)=>{
        setgid(gid)
        console.log(gid)
    }




    // <ClassDetailInRoot {...props} />


    return (


    <Colxx xxs="12" >
        <div className="col-12 mb-4 row m-0">
            <RowShowShowColEdit label={"زمان شروع کلاس"} value={"12:20"} valueClass="Fs1" labelClass="Fs1"  className={"col-4 d-flex justify-content-start p-0"}/>
            <RowShowShowColEdit label={"تعداد دانش آموزان آنلاین"} value={"27"}  valueClass="Fs1" labelClass="Fs1"  className={"col-4 d-flex justify-content-center p-0"}/>
            <RowShowShowColEdit label={"زمان پایان کلاس"} value={"2:30"}  valueClass="Fs1" labelClass="Fs1"  className={"col-4 d-flex justify-content-end p-0"}/>


        </div>
        <Card className="mb-4">
            <CardHeader className="pl-0 pr-0">
                <Nav tabs className=" card-header-tabs  ml-0 mr-0">
                    <NavItem className="w-25 text-center">
                        <a href="#" className={classnames({
                            active: activeSecondTab === "1",
                            "nav-link": true,
                            "Fs1":true
                        })}
                           onClick={() => {
                               toggleSecondTab("1");
                           }}
                        >مشاهده کلاس</a>
                    </NavItem>
                    <NavItem className="w-25 text-center">
                        <a href="#" className={classnames({
                            active: activeSecondTab === "2",
                            "nav-link": true,
                            "Fs1":true
                        })}
                           onClick={() => {
                               toggleSecondTab("2");
                           }}
                        >پیامها</a>
                    </NavItem>
                    <NavItem className="w-25 text-center">
                        <a href="#" className={classnames({
                            active: activeSecondTab === "3",
                            "nav-link": true,
                            "Fs1":true
                        })}
                           onClick={() => {
                               toggleSecondTab("3");
                           }}
                        >آپلود محتوا</a>
                    </NavItem>
                    <NavItem className="w-25 text-center">
                        <a href="#" className={classnames({
                            active: activeSecondTab === "4",
                            "nav-link": true,
                            "Fs1":true
                        })}
                           onClick={() => {
                               toggleSecondTab("4");
                           }}
                        >آزمون</a>
                    </NavItem>
                </Nav>
            </CardHeader>

            <TabContent activeTab={ activeSecondTab}>
                <TabPane tabId="1">
                    <Row>
                        <Colxx sm="12">
                            <CardBody>
                                <CardTitle className="mb-4 Fs0 font-weight-bold">
                                    مشخصات کلاس
                                </CardTitle>
                                <ClassDetailInRoot {...props} getGroupId={getGroupId}/>

                            </CardBody>
                        </Colxx>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Colxx sm="12">
                            <CardBody>
                                <CardTitle className="mb-4">
                                    Wedding Cake with Flowers Macarons and Blueberries
                                </CardTitle>
                                {
                                    gid!==null?<Tab2ChatBox gid={gid} classId={props.match.params.id}/>:""
                                }


                            </CardBody>
                        </Colxx>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Colxx sm="12">
                            <CardBody>
                                <CardTitle className="mb-4">
                                    3
                                </CardTitle>
                                <Button outline size="sm" color="primary">
                                    Edit
                                </Button>
                            </CardBody>
                        </Colxx>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row>
                        <Colxx sm="12">
                            <CardBody>
                                <CardTitle className="mb-4">
                                    4
                                </CardTitle>
                                <Button outline size="sm" color="primary">
                                    Edit
                                </Button>
                            </CardBody>
                        </Colxx>
                    </Row>
                </TabPane>
            </TabContent>
        </Card>
    </Colxx>



    );
};

export default StudioClass;