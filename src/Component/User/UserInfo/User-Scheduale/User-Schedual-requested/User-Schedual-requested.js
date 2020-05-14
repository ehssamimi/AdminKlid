import React, {useState, useEffect} from 'react';
import {GetAllUserRequested} from "../../../../functions/ServerConnection";
import {error_Notification} from "../../../../functions/componentHelpFunction";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../Common/Loader/Loader";
import UserSchedule from "../subs/UserSchedule/UserSchedule";
import img from "../../../../../assets/common/img/default_pic@3x.png";

const UserSchedualRequested = (props) => {
    const [productSeparate, setproductSeparate] = useState([]);
    const [pageStart, setpageStart] = useState(1);
    const [hasMore, sethasMore] = useState(true);


    const loadMore=async()=>{

        // ***get all product and current page ***
        let {state,Description}=await GetAllUserRequested(pageStart);
        console.log("Description");
        console.log(Description);
        console.log("pageStart")
        console.log(pageStart)


        // let Response = await GetAllProduct(pageStart);
        if (state===200) {
            let{data,page}=Description;
            // *** modify  products to our label value ***
            let productsSeparate = data;
            // *******update state*****
            setproductSeparate([...productSeparate,...productsSeparate]);
            console.log(productSeparate);
            setpageStart(page+1);
            // ***** check if product length is zero then stop loop****
            sethasMore(data.length !== 0);
        }else {
            error_Notification(state,Description)
        }
    };

    return (
        <div>
            {
                productSeparate===[]?
                    <p>کاربری درخواست جدید نداده است </p>:

                    <InfiniteScroll
                        className="row rtl m-0"
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={hasMore}
                        loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
                    >
                        <div className='d-flex  w-100  flex-wrap'  >
                            {productSeparate.length>0 && Array.isArray(productSeparate)  ?
                                productSeparate.map((todo, index) =>
                                    <div className="col-12 col-sm-6 col-md-4 "  key={index}>
                                        <UserSchedule {...todo}   image={img}   />

                                    </div>


                                ) : ''
                            }
                        </div>
                    </InfiniteScroll>



            }
        </div>

    );
};

export default UserSchedualRequested;