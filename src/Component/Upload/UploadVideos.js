import React, {Component} from 'react';

import Videojs from './VideoJS';
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
            src: 'https://videoalef.liara.run/admin/video/download/5e852132d00393c477545043/index.m3u8',
            // type: 'video/m3u8',
        },
    ],
};
class UploadVideos extends Component {
    render() {
        return (
            <div>
                <div className="col-6">
                    <Videojs {...videoJsOptions} />
                </div>  <div className="col-6">
                    <Videojs {...videoJsOptions2} />
                </div>

            </div>

        );
    }
}

export default UploadVideos;