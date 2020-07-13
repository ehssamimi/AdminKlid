import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import $ from 'jquery'
import {parse_query_string, parse_rtmp_url, srs_init_rtc} from "../../../../../../functions/WEBRTC";
import RowShowShowColEdit from "../../../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
class ReactPlayerConf extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        var pc = null;
        var startPlay = function() {
            $('#rtc_media_player').show();
            var urlObject = parse_rtmp_url($("#txt_url").val());
            var schema = window.location.protocol;

            // Close PC when user replay.
            if (pc) {
                pc.close();
            }

            pc = new RTCPeerConnection(null);
            pc.onaddstream = function (event) {
                console.log('Start play, event: ', event);
                $('#rtc_media_player').prop('srcObject', event.stream);
            };

            new Promise(function(resolve, reject) {
                pc.addTransceiver("audio", {direction: "recvonly"});
                pc.addTransceiver("video", {direction: "recvonly"});

                pc.createOffer(function(offer){
                    resolve(offer);
                },function(reason){
                    reject(reason);
                });
            }).then(function(offer) {
                return pc.setLocalDescription(offer).then(function(){ return offer; });
            }).then(function(offer) {
                return new Promise(function(resolve, reject) {
                    var port = urlObject.port || 1985;

                    // @see https://github.com/rtcdn/rtc
                    //
                    //
                    //
                    //
                    //
                    //
                    // dn-draft
                    var api = urlObject.user_query.play || '/rtc/v1/play/';
                    if (api.lastIndexOf('/') != api.length - 1) {
                        api += '/';
                    }

                    var url = schema + '//' + urlObject.server + ':' + port + api;
                    for (var key in urlObject.user_query) {
                        if (key != 'api' && key != 'play') {
                            url += '&' + key + '=' + urlObject.user_query[key];
                        }
                    }
                    // Replace /rtc/v1/play/&k=v to /rtc/v1/play/?k=v
                    url = url.replace(api + '&', api + '?');

                    // @see https://github.com/rtcdn/rtcdn-draft
                    var data = {
                        api: url, streamurl: urlObject.url, clientip: null, sdp: offer.sdp
                    };
                    console.log("Generated offer: ", data);

                    $.ajax({
                        type: "POST", url: url, data: JSON.stringify(data),
                        contentType:'application/json', dataType: 'json'
                    }).done(function(data) {
                        console.log("Got answer: ", data);
                        resolve(data.sdp);
                    }).fail(function(reason){
                        reject(reason);
                    });
                });
            }).then(function(answer) {
                return pc.setRemoteDescription(new RTCSessionDescription({type: 'answer', sdp: answer}));
            }).catch(function(reason) {
                throw reason;
            });
        };

        $('#rtc_media_player').hide();
        var query = parse_query_string();
        srs_init_rtc("#txt_url", query);
        query.autostart='true';

        $("#btn_play").click(startPlay);
        if (query.autostart === 'true') {
            // For autostart, we should mute it, see https://www.jianshu.com/p/c3c6944eed5a
            $('#rtc_media_player').prop('muted', true);
            startPlay();
        }




    }


    render() {
        return (
            <div className="w-100">
                {/*<ReactPlayer id="rtc_media_player" url={this.props.url} />*/}
                <video id="rtc_media_player" controls autoPlay  className="w-100"/>
                <div className="form-inline">
                    {/*URL:*/}
                    <input type="text" id="txt_url" className="input-xxlarge d-none" value={this.props.url}/>
                    {/*<button className="btn btn-primary d-none" id="btn_play">播放视频</button>*/}
                    <div id="btn_play" className=' w-100 d-flex justify-content-center fS1vw'><RowShowShowColEdit label={"پخش"} value={"WebRTC"}  className='fS1vw btn btn-outline-primary'/></div>

                </div>


            </div>
        );
    }
}

export default ReactPlayerConf;