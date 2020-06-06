import React, {useState, useEffect} from 'react';
import UploadComponentFrame from "../../Common/UploadContentFrame/UploadComponentFrame";
import AddVideoConvert from "../../Common/AddVideoConver/AddVideoConvert";

const AddVideo = (props) => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div className="col-6">
            <UploadComponentFrame  action={"raw-video"} ListData="" />

        </div>
    );
};

export default AddVideo;