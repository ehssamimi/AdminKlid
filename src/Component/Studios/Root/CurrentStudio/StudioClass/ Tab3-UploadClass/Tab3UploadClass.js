import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader, CardTitle, Nav, NavItem, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {Colxx} from "../../../../../../components/common/CustomBootstrap";
import ClassDetailInRoot from "../ClassDetailInRoot/ClassDetailInRoot";
import Tab2ChatBox from "../Tab2-ChatBox/Tab2-ChatBox";
import Tab3Upload from "./Tab3-Upload/Tab3-Upload";
import Tab3Show from "./Tab3-show/Tab3Show";

const Tab3UploadClass = (props) => {
    const [activeSecondTab, setactiveSecondTab] = useState("1");
    const [newFile, setnewFile] = useState("");


    useEffect(() => {
        console.log("class id ")
        // console.log(props.match.params.id)
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);


    const toggleSecondTab=(tab)=> {
        if (activeSecondTab !== tab) {
            setactiveSecondTab(tab);
        }
    }



    return (
        <div>
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
                            >آپلود محتوا</a>
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
                            >مشاهده فایل ها</a>
                        </NavItem>

                    </Nav>
                </CardHeader>

                <TabContent activeTab={ activeSecondTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Colxx sm="12">
                                <CardBody>
                                    {/*<CardTitle className="mb-4  font-weight-bold">*/}
                                    {/*    <h3 className="FsFooterLogin IranSans">آپلود محتوا</h3>*/}
                                    {/*</CardTitle>*/}
                                    <Tab3Upload {...props} updateList={(value)=>{setnewFile(value)}}/>
                                </CardBody>
                            </Colxx>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Colxx sm="12">
                                <CardBody>
                                    <Tab3Show {...props} newFile={newFile}/>
                                </CardBody>
                            </Colxx>
                        </Row>
                    </TabPane>


                </TabContent>
            </Card>
        </div>
    );
};

export default Tab3UploadClass;