import React, {useState, useEffect} from 'react';
import {ReactFlvPlayer} from 'react-flv-player'

const NewWebsocketPlayer = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {

    }, []);

console.log(props.url)
    return (
        <div className="w-100">
            <ReactFlvPlayer
                // url = "ws://live.kelidiha.com:8000/live/lomos.flv"
                url ={props.url}
                heigh = "100%"
                width = "100%"
                isMuted={false}

            />

        </div>

    );
};

export default NewWebsocketPlayer;