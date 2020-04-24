import React, {useState, useEffect} from 'react';
import VideoPlayerMain from "../VideoPlayerMain";
import profile from "../../../../Common/img/profile.jpg";

const PlayVideo169 = (props) => {
    const videoJsOptions = {
        autoplay: false,
        fluid: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        // width: 720,
        // height: 300,
        // poster:props.poster,
        className:"br20px",
        poster:props.img,
        enableLowInitialPlaylist:true,
        aspectRatio: '16:9',
        controls: true,
        nativeControlsForTouch:true,
        sources: [
            {
                // src: props.src,
                src: props.video,
                type:"application/x-mpegURL"
                // type: 'video/m3u8',
            },
        ],
    };

    return (
        <div>
            <VideoPlayerMain {...videoJsOptions} />
        </div>
    );
};

export default PlayVideo169;