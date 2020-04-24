import React, { useState,useEffect } from 'react';
import Loader from "../../../Common/Loader/Loader";
import {Card, CardBody, CardTitle , Row} from "reactstrap";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import {  Form} from "formik";




export default function FormCardAuthAdmin (props){
    let{isLoder,name,handleSubmit,classForm,ClassBtnSend}=props

    return isLoder?   // *******checking for submit form or get category Option is then loader start then loader close**********
        <div className='d-flex justify-content-center align-items-center'>
            <div className='col-6'>
                <Loader/>
            </div>
        </div>
        :

        <div  className="w-100  rtl text-left  formmmmmm "     >
            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <div className='d-flex justify-content-start'>
                                    <span>{name} </span>
                                </div>
                            </CardTitle>
                            <Form className="av-tooltip tooltip-label-bottom w-100 row m-0 d-flex justify-content-center" onSubmit={handleSubmit}>
                                <div className="col-8 mlr-auto   d-flex flex-column justify-content-between">
                                    <div className="w-100 row m-0 text-left">
                                        {props.children}

                                        <div className="w-100 ">
                                            <button className="btn btn-success text-center col-6 offset-3 "
                                                    type="submit">
                                                فرستادن
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>



                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        </div>
};