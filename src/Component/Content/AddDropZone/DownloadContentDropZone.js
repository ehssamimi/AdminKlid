import React, {Component} from 'react';
import {FiDownload} from "react-icons/fi";

class DownloadContentDropZone extends Component {
    constructor(props) {
        super(props);
        this.state={
            content:undefined,touched:true,audio:undefined,
            ImgName:'',count:1
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (((props.content !== state.content && props.content!==undefined)||(props.audio !== state.audio && props.audio!==undefined ))&&  state.count===1) {
            return {
                content: props.content,
                audio: props.audio,
                count:2
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    render() {
        let{content,audio}=this.state;

        return (
            <div>
                {
                    this.state.content !== undefined && this.state.content !==null ?
                        <div className="mr-3 mt-3 green-them">
                            <span className=' '><FiDownload/></span>
                            <span className=' mr-2'>
                                        <a href={this.state.content} target="_blank" download
                                           className="second-color ml-1 ">دانلود جزوه</a>
                                        </span>
                        </div> : " "
                }
                {
                    this.state.audio !== undefined && this.state.audio !==null?


                        <div className="mt-3 green-them">

                                    <span className=' mr-2'>
                                            <audio src={this.state.audio} controls={true} autoPlay={false}/>

                                        </span>
                        </div> : ""
                }

            </div>
        );
    }
}

export default DownloadContentDropZone;