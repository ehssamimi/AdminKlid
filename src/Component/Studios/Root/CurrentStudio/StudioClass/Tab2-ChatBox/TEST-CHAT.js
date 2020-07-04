import React, {useState, useEffect} from 'react';
import {GetAllUser} from "../../../../../functions/ServerConnection";
import {error_Notification} from "../../../../../functions/componentHelpFunction";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../../Common/Loader/Loader";
import PreviewUserCard from "../../../../../User/UserShowAll/Subs/PreviewUserCard";
import InfiniteScrollReverse from "react-infinite-scroll-reverse";


export default function TestChat() {
    // const [count, setCount] = useState(1);
    const [productSeparate, setproductSeparate] = useState([]);
    const [pageStart, setpageStart] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const loadMore = async () => {
        // messages: (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // page: 1
        // content: " ahmad"
        // content_type: "txt"
        // create_at: "2020-07-04T14:22:36.103000"
        // group_id: "5efa3bafcd52cdd9ea00ddc2"
        // id: "5f00d6fc2f3d927653560124"
        // reply_to: null
        // sender_id: "5e82a422dc5d87cead3bab42"
        // sender_name: "amin jamal"
        // ***get all product and current page ***
        let {state, Description} = await GetAllUser(pageStart);
        console.log("Description");
        console.log(Description);
        console.log("pageStart")
        console.log(pageStart)


        // let Response = await GetAllProduct(pageStart);
        if (Response !== 'error') {
            let {users, page} = Description;
            // *** modify  products to our label value ***
            let productsSeparate = users;
            // *******update state*****
            setproductSeparate([...productSeparate, ...productsSeparate]);
            console.log(productSeparate);
            setpageStart(page + 1);
            // ***** check if product length is zero then stop loop****
            sethasMore(users.length !== 0);
        } else {
            error_Notification('Network Error')
        }
    };


    return (
        <InfiniteScrollReverse
            className="row rtl m-0 overFlow-scroll vh35"
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loadArea={10}
            loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
        >
            <div className='d-flex  w-100  flex-wrap'>
                {productSeparate.length > 0 && Array.isArray(productSeparate) ?
                    productSeparate.slice(0).reverse().map((todo, index) =>
                        <PreviewUserCard key={index} {...todo}/>
                    ) : ''
                }
            </div>
        </InfiniteScrollReverse>
    );

}