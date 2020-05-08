import React, {useState, useEffect} from 'react';
import FormSignUp from "../../LoginSigup/FormSignUp";

const UserSignUp = (props) => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div className="w-100">
            <FormSignUp/>

        </div>
    );
};

export default UserSignUp;