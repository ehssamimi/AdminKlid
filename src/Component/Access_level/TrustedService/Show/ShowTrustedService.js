import React, {Component, useState} from 'react';
import {GetAllTrustedService, GetAllUserRole} from "../../../functions/ServerConnection";
import {error_Notification} from "../../../functions/componentHelpFunction";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../Common/Loader/Loader";
import ShowTrustedServiceRow from "./subs/ShowTrustedServiceRow/ShowTrustedServiceRow";



export default function ShowTrustedService() {


    const [productSeparate, setproductSeparate] = useState([]);
    const [pageStart, setpageStart] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const loadMore=async()=>{


        // ***get all product and current page ***
        let Response = await GetAllTrustedService(pageStart);
        if (Response.state===200) {
            let{Description,page}=Response;
            // // *******update state*****
            setproductSeparate([...productSeparate,...Description]);

            setpageStart(page+1);
            // ***** check if product length is zero then stop loop****
            console.log(Description.length !== 0)

            sethasMore(Description.length !== 0);
        }else {
            let{state,Description}=Response;

            error_Notification(state,Description)
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
            <div className='w-100'>
                <section className="PermissionCard">
                    {productSeparate.length>0 && Array.isArray(productSeparate)  ?
                        productSeparate.map((todo, index) =>
                            <ShowTrustedServiceRow  content={todo}  key={index} class={' col-sm-6 col-lg-3  '}/>

                        ) : ''
                    }
                </section>
            </div>
        </InfiniteScroll>
    );
}