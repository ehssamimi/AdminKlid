import React  from 'react';
import {Card, CardBody} from "reactstrap";
import Button from "@material-ui/core/Button/Button";

const TodayText = (props) => {


    return (
        <div className="mt-5 brt-s pt-5">
            <h3 className="text-right mb-2">سخن امروز</h3>
            <Card className="br20px box-shadow-custom  ">
                <CardBody className="d-flex flex-column justify-content-around align-items-center h-today ">
                    <div className="text-left w-100">
                        <p className="header-color font-weight-bold">{props.name}:</p>
                        <p className="text-break second-color pl-4 pr-2">{props.text}</p>
                    </div>

                </CardBody>
            </Card>

        </div>
    );
};

export default TodayText;