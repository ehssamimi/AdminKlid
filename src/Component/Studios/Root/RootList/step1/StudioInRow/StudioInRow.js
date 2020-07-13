import React, {useState, useEffect} from 'react';
import {Button, Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";
import RowShowShowColEdit from "../../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {ModalDelete} from "../../../../../Common/Modals/ModalDelete/ModalDelete";
import {DeleteStudios} from "../../../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../../../functions/componentHelpFunction";
import {TweenMax} from "gsap/TweenMax";

const StudioInRow = (props) => {
    const [count, setCount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const handelDelete = async(id) => {
        let data={
            "studio_id": id
        };
        console.log(data)
        let {state ,Description}=await DeleteStudios(data);
        if (state===200 ) {
             props.UpdateClassList()

        } else {
            error_Notification(state, Description)
        }
        setIsOpen(!isOpen)
    };
let{todo}=props;
    return (
        <Card className="col-2 m-2" id={todo.id}  >
            <Link to={props.type==="currentStudio"?`/studio/root/current/${todo.id}`:`/studio/root/details/${todo.id}`}   >
                 <CardBody >
                    <RowShowShowColEdit label={"نام"} value={todo.name}   className={"col-12 d-flex justify-content-center p-0"}/>
                </CardBody>
            </Link>
            <CardActions className="d-flex justify-content-center">
                <Button onClick={()=>{setIsOpen(!isOpen)}} className="btn red-background">حذف</Button>
            </CardActions>
            <ModalDelete isOpen={isOpen} toggle={()=>{setIsOpen(!isOpen)}} item={"استودیو"}  deleteComponent={()=>{handelDelete(todo.id)}}/>

        </Card>
    );
};

export default StudioInRow;
