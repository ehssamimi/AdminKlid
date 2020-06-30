import React, {useState, useEffect} from 'react';
import LoadStudios from "../RootList/step1/loadStudios/LoadStudios";

const Studios = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);

    return (
        <div>
            <LoadStudios type={"currentStudio"}/>
        </div>
    );
};

export default Studios;