import React, {useState, useEffect} from 'react';
import UploadComponentFrame from "../../Common/UploadContentFrame/UploadComponentFrame";
import AddVideoConvert from "../../Common/AddVideoConver/AddVideoConvert";
import AddDropZone from "../AddDropZone/AddDropZone";
import VideoRowDropzone from "../AddDropZone/Video-Row-Dropzone";

const AddVideo = (props) => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div className="col-6">
            {/*<UploadComponentFrame  action={"raw-video"} ListData="" />*/}
        <VideoRowDropzone action={"raw-video"} ListData={{
            "course_id": "none",
            "lesson_name": "none",
            "teacher_name": "none",
            "chapter_name": "none",
            "item_name": "none"
        }}/>


        </div>
    );
};

export default AddVideo;