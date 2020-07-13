import React, {useState, useEffect} from 'react';
 import {Card, CardBody, CardTitle} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

const ClassRoomListRow = (props) => {
console.log(props.list)

    return (
        <div className="mt-2">

            <Card>
                <CardBody>
                    <CardTitle>
                      <span>لیست کلاس ها</span>
                        <div className="row w-100 justify-content-between  ">
                            <div >
                                <span className={`log-indicator align-middle bg-plum `}/>
                                <span>public</span>
                            </div>
                            <div >
                                <span className={`log-indicator align-middle bg-coral `}/>
                                <span>special</span>
                            </div>
                            <div >
                                <span className={`log-indicator align-middle bg-lightskyblue `}/>
                                <span>personal</span>
                            </div>
                        </div>
                    </CardTitle>
                    <div className="dashboard-logs">
                        <PerfectScrollbar
                            options={{ suppressScrollX: true, wheelPropagation: false }}
                        >
                            <table className="table table-sm table-borderless">
                                <tbody>
                                {
                                    props.list?
                                        props.list.map((log, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <span className={`log-indicator align-middle ${log.bg}`}/>
                                                    </td>
                                                    <td>
                                                     <span className="font-weight-medium">{log.id}</span>
                                                    </td>
                                                    <td className="text-right">
                                                        <span className="text-muted">{log.label}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        :""
                                }

                                </tbody>
                            </table>
                        </PerfectScrollbar>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default ClassRoomListRow;