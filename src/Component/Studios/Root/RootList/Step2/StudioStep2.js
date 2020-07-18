import React, {useState, useEffect} from 'react';
import StudioTable from "./StudioTable/StudioTable";
import ClassRoomList from "../../../ClassRoom/ClassRoomList/ClassRoomList";
 import ClassRoomListRow from "./ClassRoomListRow/ClassRoomListRow";
const StudioStep2 = (props) => {
    const [list, setLists] = useState([]);
    const [id, setId] = useState("");
    const [type, setType] = useState("");
    const selectClassRoom=(id,value)=>{
        console.log(id);
        console.log(value.value);
        setId(id)
        setType(value)
    }

    return (
        <div className="row m-0">
            <div className="col-12 p-0">
                <ClassRoomList type={"selected"} selectClassRoom={selectClassRoom} ClassId={id}/>
                {/*<ClassRoomListRow list={list}/>*/}
                {/*<StudioClassRoomLIst list={list}/>*/}
            </div>
            <div className="col-12 p-0 mt-2">
                <StudioTable {...props} GetClassRoomList={(value)=>{setLists(value)}} id={id} type={type} />
            </div>
        </div>
    );
};

export default StudioStep2;