import React, {useState, useEffect} from 'react';
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import {Card, CardBody, CardTitle, Table} from "reactstrap";

const PreviewUserInClassroomList = (props) => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
    );
};

export default PreviewUserInClassroomList;