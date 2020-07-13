import React, {useState, useEffect} from 'react';
import LoadStudios from "./loadStudios/LoadStudios";
import AddStudio from "./AddStudio/AddStudio";
import LoadStusios2 from "./loadStudios/LoadStusios2";

const StudioSteps1 = (props) => {
    const [attributes, setAttributes] = useState("");
    useEffect(() => {
        // Update the document title using the browser API
     });

    return (
        <div>
            <AddStudio HandelAdd={(value)=>{setAttributes(value)}}/>
            {/*<LoadStudios/>*/}
            <LoadStusios2 attributes={attributes}/>
        </div>
    );
};

export default StudioSteps1;