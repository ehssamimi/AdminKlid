import React, {Component} from 'react';
import StudioTable from "./StudioTable/StudioTable";

class StudioStep2 extends Component {
    render() {
        return (
            <div>
                <StudioTable {...this.props}/>
            </div>
        );
    }
}

export default StudioStep2;