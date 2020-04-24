import React, { useState } from 'react';
import {   Modal, ModalBody } from 'reactstrap';

const ModalCustomVideo = (props) => {
    const {
        isOpen, toggle
    } = props;



    return (
        <div>

            <Modal isOpen={isOpen} toggle={()=>{toggle('toggle')}} className="br20px" size={props.size|| 'lg' }>
                <ModalBody className="p-0 br20px">
                    {props.children}
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalCustomVideo;