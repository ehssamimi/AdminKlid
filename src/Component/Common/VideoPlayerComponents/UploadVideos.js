import React, {Component} from 'react';


import VideoPlayerMain from "./VideoPlayerMain";
const videoJsOptions = {
    autoplay: false,
    fluid: true,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    // width: 720,
    // height: 300,
    aspectRatio: '16:9',
    controls: true,
    nativeControlsForTouch:true,
    sources: [
        {
            src: 'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8',
            // type: 'video/m3u8',
        },
    ],
};
const videoJsOptions2 = {
    autoplay: false,
    fluid: true,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    // width: 720,
    // height: 300,
    aspectRatio: '16:9',
    controls: true,
    nativeControlsForTouch:true,
    sources: [
        {
            src: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" ,
            type:"application/x-mpegURL"

        },
    ],
};
class UploadVideos extends Component {
    render() {
        return (
            <div>
                <div className="col-6">
                    <VideoPlayerMain {...videoJsOptions} />
                </div>  <div className="col-6">
                    <VideoPlayerMain {...videoJsOptions2} />
                </div>

            </div>

        );
    }
}

export default UploadVideos;