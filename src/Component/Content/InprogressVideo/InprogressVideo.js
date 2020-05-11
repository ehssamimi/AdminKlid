import React, {useState, useEffect} from 'react';
import {GetAllInprogress, GetAllUser, GetUserInfo} from "../../functions/ServerConnection";
import {error_Notification, getProfileValue} from "../../functions/componentHelpFunction";
import {NotificationManager} from "react-notifications";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../Common/Loader/Loader";
import PreviewUserCard from "../../User/UserShowAll/Subs/PreviewUserCard";
import InProgressListVideo from "./InprogressListVideoInRow/InprogressListVideoInRow";

const InprogressVideo = (props) => {
    const [productSeparate, setproductSeparate] = useState([]);
    const [pageStart, setpageStart] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const loadMore=async()=>{

        // ***get all product and current page ***
        let {state,Description}=await GetAllInprogress(pageStart);
        console.log("Description");
        console.log(Description);
        console.log("pageStart")
        console.log(pageStart)


        // let Response = await GetAllProduct(pageStart);
        if (Response!=='error') {
            let{result,page}=Description;
            // *** modify  products to our label value ***
            let productsSeparate =  result;
            // *******update state*****
            setproductSeparate([...productSeparate,...productsSeparate]);
            console.log(productSeparate);
            setpageStart(page+1);
            // ***** check if product length is zero then stop loop****
            sethasMore(result.length !== 0);
         }else {
            error_Notification('Network Error')
        }
    };

    return (
        <InfiniteScroll
            className="row rtl m-0"
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
        >
            <div className='d-flex  w-100  flex-wrap'  >
                {productSeparate.length>0 && Array.isArray(productSeparate)  ?
                    productSeparate.map((item, index) =>
                       // {/*<PreviewUserCard key={index} {...todo}/>*/}
                  <InProgressListVideo key={index} {...item} index={index}/>
                    // "action": "item_video",
                    // "percentage": 78,
                    // "time_left": "0:13:31 left",
                    // "text": "\rTranscoding...(78%) 0:13:31 left [##############################################################################----------------------]",
                    // "is_complete": false,
                    // "file_name": "farsi-8-darse3-1.mp4",
                    // "task_id": "faf7e8ed-87b1-47af-bae3-e77cf79a0556",
                    // "state": "queue",
                    // "last_update": "2020-05-11T07:47:49.094000"

                    ) : ''
                }
            </div>
        </InfiniteScroll>
    );
};

export default InprogressVideo;