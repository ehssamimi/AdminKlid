import React, {useState, useEffect} from 'react';
import {ReactFlvPlayer} from 'react-flv-player'

const NewWebsocketPlayer = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js";
        script.async = true;

        document.body.appendChild(script);





        return () => {
            document.body.removeChild(script);
        }
    }, []);


    return (
        <div>
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