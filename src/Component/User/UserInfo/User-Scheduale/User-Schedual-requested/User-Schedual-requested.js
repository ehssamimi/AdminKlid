import React, {useState, useEffect} from 'react';

const UserSchedualRequested = (props) => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            requested
        </div>
    );
};

export default UserSchedualRequested;