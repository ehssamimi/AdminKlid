import React, {Component} from 'react';

class RowShowShowColEdit extends Component {
    render() {
        let{label,value,col,className,labelClass,valueClass}=this.props;
        return (
            <div className={['d-flex','collapseSpanHeight','align-items-end','mt-2' , col,className||''].join(' ')} dir='rtl'>
                <span className={['collapseValue gray' ,labelClass||''].join(' ')}>{label} <span className='pr-2'>:</span></span>
                <span className={['collapseValue' ,valueClass||''].join(' ')}>{value}</span>
            </div>
        );
    }
}

export default RowShowShowColEdit;