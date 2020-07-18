import React, {Component } from 'react';
import IsLoaderComponent from "../../../../Common/ISLodader/IsLoader";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../Common/Loader/Loader";
 import RowClassList from "../RowClassList";
import {Getallclassroom, GetAllUser} from "../../../../functions/ServerConnection";
import {error_Notification, warning_Notification} from "../../../../functions/componentHelpFunction";
import SelectedRowClassList from "../SelectedRowClassList";
import ClassRoomSelectPackage from "../../ClassRoomSelectPackage/ClassRoomSelectPackage";

class ClassRoomLoader extends Component {
    constructor(props) {
        super(props);
        this.state={
            hasMore:false,
            productSeparate:[],
            page:1,
            isLoader:true,
            attributes:{  grade: '', field: '',lesson_names:"" }
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.attributes !== state.attributes) {
            // console.log(props.attributes);
            return {
                attributes: props.attributes,
                isLoader:false,
                hasMore:true,
                productSeparate:[]
            };
        }
        // Return null if the state hasn't changed
        return null;
    }
    UpdateClassList=()=>{
        // this.setState({
        //     hasMore:true,
        // })
    }

    loadMore=async()=>{
          // console.log("started loading");
          let{grade,field,lesson_names}=this.state.attributes;


        // ***get all product and current page ***

        let {state,Description}= await Getallclassroom(grade,field,lesson_names);

        // console.log("Description");
        // console.log(Description);
        // console.log("pageStart");
        // console.log(this.state.page);


        // let Response = await GetAllProduct(pageStart);
        if (state===200) {
            let{items,page}=Description;
            // *** modify  products to our label value ***
            let productsSeparate = items;
            console.log("productsSeparate");
            console.log(productsSeparate);
            if (productsSeparate.length===0){
                warning_Notification("کلاسی  ثبت نشده است","")
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
                        className="row rtl m-0 w-100  "
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMore}
                        loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
                    >

                         <div className='row rtl m-0 w-100 '  >
                                {productSeparate.length>0 && Array.isArray(productSeparate)  ?
                                    productSeparate.map((todo, index) =>

                                        <div key={index} className={ this.props.type==="selected"?"col-sm-12 col-md-6 col-lg-4 mt-2":"col-sm-12 col-md-6 col-lg-4"}>

                                            {
                                                this.props.type === "selected" ?
                                                    <SelectedRowClassList {...todo} {...this.props} /> :""
                                            }
                                            {
                                                this.props.type === undefined ?
                                                    <RowClassList  {...todo} UpdateClassList={this.UpdateClassList}/> :""
                                            }
                                            {
                                                this.props.type === "classPackage" ?
                                                    <ClassRoomSelectPackage  {...todo} {...this.props} /> :""
                                            }

                                        </div>



                                    ) :""
                                    // <div className="card card-body mt-3 text-center"><p className= "FsFooterLogin IranSans">کلاسی با این مشخصات ثبت نشده است  است </p></div>
                                }
                            </div>




                    </InfiniteScroll>

                </IsLoaderComponent>
            </div>
        );
    }
}

export default ClassRoomLoader;
