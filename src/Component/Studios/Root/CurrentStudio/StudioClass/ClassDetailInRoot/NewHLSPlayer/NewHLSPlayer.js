import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player'

const NewHLSPlayer = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    // console.log(props.url)

    return (


            <ReactPlayer
                className='react-player'
                // url={props.url}
                url={"http://live.kelidiha.com:8000/live/classical/index.m3u8"}
                width='100%'
                height='100%'
                // config={{
                //     file:{forceHLS:true}
                // }}
                controls={true}

            />

    );
};

export default NewHLSPlayer;