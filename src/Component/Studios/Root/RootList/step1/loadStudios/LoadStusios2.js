import React, {Component} from 'react';
import { GetAllStudios} from "../../../../../functions/ServerConnection";
import {error_Notification, warning_Notification} from "../../../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../../../Common/ISLodader/IsLoader";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../../Common/Loader/Loader";

import StudioInRow from "../StudioInRow/StudioInRow";

class LoadStusios2 extends Component {
    constructor(props) {
        super(props);
        this.state={
            hasMore:true,
            productSeparate:[],
            page:1,
            isLoader:false,
            attributes:""
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.attributes !== state.attributes) {
            // console.log(props.attributes);
            return {
                attributes: props.attributes,
                isLoader:false,
                hasMore:true,
                page:1,
                productSeparate:[]
            };
        }
        // Return null if the state hasn't changed
        return null;
    }
    UpdateClassList=()=>{
        this.setState({
            isLoader:false,
            hasMore:true,
            page:1,
            productSeparate:[]
        })
    }

    loadMore=async()=>{
        // console.log("started loading");

        // ***get all product and current page ***
        let {state,Description}=await GetAllStudios(this.state.page);
        console.log("Description");
        console.log(Description);
        console.log("pageStart");
        console.log(this.state.page);



        // let Response = await GetAllProduct(pageStart);
        if (state===200) {
            // let{items,page}=Description;
            let{result,page}=Description;
            // *** modify  products to our label value ***
            let productsSeparate = result;
            console.log("productsSeparate");
            console.log(productsSeparate);
            if (productsSeparate.length===0){
                warning_Notification("استودیویی  ثبت نشده است","")
            }
            // *******update state*****
            this.setState(prevState => ({
                productSeparate:[...prevState.productSeparate,...productsSeparate],
                page:prevState.page+1,
                // hasMore:items.length !== 0
                hasMore:false
            }))

        }else {
            error_Notification('Network Error')
        }
    };
    render() {
        let{isLoader,productSeparate}=this.state;
        return (
            <div>
                <IsLoaderComponent isLoader={isLoader}>
                    <InfiniteScroll
                        className="row rtl m-0 w-100 flex-wrap "
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMore}
                        loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
                    >

                            {productSeparate.length>0 && Array.isArray(productSeparate)  ?
                                productSeparate.map((todo, index) =>
                                    <StudioInRow todo={todo} key={index} {...this.props} UpdateClassList={this.UpdateClassList}/>

                                ) : ''
                            }



                    </InfiniteScroll>

                </IsLoaderComponent>
            </div>
        );
    }
}

export default LoadStusios2;