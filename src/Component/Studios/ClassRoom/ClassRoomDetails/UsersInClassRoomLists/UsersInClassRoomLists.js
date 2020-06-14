import React, {Component, useState} from 'react';
import {GetAllUser} from "../../../../functions/ServerConnection";
import {error_Notification} from "../../../../functions/componentHelpFunction";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../Common/Loader/Loader";
import PreviewUserCard from "../../../../User/UserShowAll/Subs/PreviewUserCard";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import {Card, CardBody, CardTitle, Table} from "reactstrap";
import PreviewUserInClassroomList from "./PreviewUserInClassroomList";

export default function UsersInClassRoomLists() {

    const [productSeparate, setproductSeparate] = useState([]);
    const [pageStart, setpageStart] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const loadMore=async()=>{

        // ***get all product and current page ***
        let {state,Description}=await GetAllUser(pageStart);
        console.log("Description");
        console.log(Description);
        console.log("pageStart")
        console.log(pageStart)


        // let Response = await GetAllProduct(pageStart);
        if (Response!=='error') {
            let{users,page}=Description;
            // *** modify  products to our label value ***
            let productsSeparate = users;
            // *******update state*****
            setproductSeparate([...productSeparate,...productsSeparate]);
            console.log(productSeparate);
            setpageStart(page+1);
            // ***** check if product length is zero then stop loop****
            sethasMore(users.length !== 0);
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
            <Colxx xxs="6">
                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                            striped
                        </CardTitle>

                        <Table striped>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                            </thead>
                            <tbody>

                                {productSeparate.length>0 && Array.isArray(productSeparate)  ?
                                    productSeparate.map((todo, index) =>
                                        <PreviewUserInClassroomList/>

                                    ) : ''
                                }

                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Colxx>



        </InfiniteScroll>
    );
}

