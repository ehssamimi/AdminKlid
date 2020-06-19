import React, {useState, useEffect} from 'react';
import LoadStudios from "./loadStudios/LoadStudios";
import AddStudio from "./AddStudio/AddStudio";

const StudioSteps1 = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
     });

    return (
        <div>
            <AddStudio/>
            <LoadStudios/>
        </div>
    );
};

export default StudioSteps1;