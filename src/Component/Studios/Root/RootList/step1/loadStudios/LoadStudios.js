import React, {useState, useEffect} from 'react';
import {GetAllStudios, GetAllUser} from "../../../../../functions/ServerConnection";
import {error_Notification} from "../../../../../functions/componentHelpFunction";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../../Common/Loader/Loader";
import {Button, Card, CardBody} from "reactstrap";
import {Link} from"react-router-dom"
 import PreviewUserCard from "../../../../../User/UserShowAll/Subs/PreviewUserCard";
import RowShowShowColEdit from "../../../../../Common/RowShowShowColEdit/RowShowShowColEdit";

const LoadStudios = (props) => {
    const [productSeparate, setproductSeparate] = useState([]);
    const [pageStart, setpageStart] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const loadMore=async()=>{

        // ***get all product and current page ***
        let {state,Description}=await GetAllStudios(pageStart);
        console.log("Description");
        console.log(Description);
        console.log("pageStart");
        console.log(pageStart);


         if (state===200) {
            let{result,page}=Description;
            // *** modify  products to our label value ***
            let productsSeparate = result;
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
                    productSeparate.map((todo, index) =>
                        <Link to={`/studio/root/details/${todo.id}`} key={index} className="col-3 m-2">

                            <Card >
                                <CardBody >
                                    <RowShowShowColEdit label={"نام"} value={todo.name}   className={"col-6 d-flex justify-content-start p-0"}/>

                                </CardBody>
                            </Card>
                        </Link>





                    ) : ''
                }
            </div>
        </InfiniteScroll>
    );
};

export default LoadStudios;