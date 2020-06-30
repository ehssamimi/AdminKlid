

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


const StudioClass = (props) => {
    const [activeSecondTab, setactiveSecondTab] = useState("1");

    useEffect(() => {
        console.log(props.match.params.id)
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);


    const toggleSecondTab=(tab)=> {
        if (activeSecondTab !== tab) {
            setactiveSecondTab(tab);
        }
    }

    return (



        <Colxx xxs="12"  >
            <Card className="mb-4">
                <CardHeader className="pl-0 pr-0">
                    <Nav tabs className=" card-header-tabs  ml-0 mr-0">
                        <NavItem className="w-25 text-center">
                            <a href="#" className={classnames({
                                    active: activeSecondTab === "1",
                                    "nav-link": true
                                })}
                                onClick={() => {
                                    toggleSecondTab("1");
                                }}
                            >مشاهده کلاس</a>

                        </NavItem>
                        <NavItem className="w-25 text-center">
                            <a href="#" className={classnames({
                                active: activeSecondTab === "2",
                                "nav-link": true
                            })}
                               onClick={() => {
                                   toggleSecondTab("2");
                               }}
                            >Tab 2</a>
                        </NavItem>
                        <NavItem className="w-25 text-center">
                            <a href="#" className={classnames({
                                active: activeSecondTab === "3",
                                "nav-link": true
                            })}
                               onClick={() => {
                                   toggleSecondTab("3");
                               }}
                            >Tab 3</a>
                        </NavItem>
                    </Nav>
                </CardHeader>

                <TabContent activeTab={ activeSecondTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Colxx sm="12">
                                <CardBody>
                                    <Card className="mt-2 box-shadow-custom br20px" >
                                        <CardBody>
                                            <ClassDetailInRoot {...props} />
                                            {/*<DetailsClassRoom {...this.state.Description}/>*/}

                                        </CardBody>
                                    </Card>
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
                                    <Button outline size="sm" color="primary">
                                        Edit
                                    </Button>
                                </CardBody>
                            </Colxx>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Colxx sm="12">
                                <CardBody>
                                    <CardTitle className="mb-4">
                                        Cheesecake with Chocolate Cookies and Cream Biscuits
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