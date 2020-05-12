import React, {useState, useEffect} from 'react';

const TestProject = (props) => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
<p>aaaaaaaaaaaaaaaaaaaaa</p>
        </div>
    );
};

export default TestProject;