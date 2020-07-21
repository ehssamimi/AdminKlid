import React, {useState, useEffect} from 'react';
import {ReactFlvPlayer} from 'react-flv-player'
import RowShowShowColEdit from "../../../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import bg from './../../../../../../../assets/common/img/default_pic@3x.png'

const NewWebsocketPlayer = (props) => {
    const [url, setURL] = useState(false);
    useEffect(() => {

    }, []);
    const handelSetURL=()=>{
        console.log("setUrl")
        setURL(true)
    }

console.log(props.url)
    return (
        <div className="w-100">
            {
                url?          <ReactFlvPlayer
                        url ={props.url}
                        heigh = "100%"
                        width = "100%"
                        isMuted={false}
                        isLive={true}
                    />:
                    <img src={bg} alt="def" className={"w-100"} />

                }



            <div   className=' w-100 d-flex justify-content-center fS1vw' onClick={ handelSetURL}><RowShowShowColEdit
                label={"پخش"} value={"http_flv"} className='fS1vw btn btn-outline-primary'/></div>

        </div>

    );
};

export default NewWebsocketPlayer;