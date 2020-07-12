// import React, {useEffect, useState} from 'react';
import React, {Component} from 'react';

import {GetAllUser, SuggestUser, UserActioninclassroom} from "../../../../functions/ServerConnection";
import {AutoSuggestUsers, error_Notification, success_Notification} from "../../../../functions/componentHelpFunction";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../Common/Loader/Loader";
 import {Colxx} from "../../../../../components/common/CustomBootstrap";
import {CardTitle, InputGroup, Table} from "reactstrap";
import PreviewUserInClassroomList from "./PreviewUserInClassroomList";
import IsLoaderComponent from "../../../../Common/ISLodader/IsLoader";
import AutoSuggestEditwithOutLowerCase from "../../../../Common/AutoSuggestEdit/AutoSuggestEditwithOutLowerCase";



class UsersInClassRoomLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productSeparate: [],
            pageStart: 1,
            hasMore: true,
            value: "",error:"",finalNumber:"",
            data:"",isLoader:true,
            func1:this.updateList.bind(this),
        }


    }

    async componentDidMount(){
        let data=await this.getName("احسان");
        this.setState({
            isLoader:false,   data
        });
    }
    getName=async (value)=>{
        // let{state ,Description }= await SuggestName(value);
        let{state ,Description }= await SuggestUser(value);
        console.log("Description");
        console.log( Description);
        let Values={name:"",value:""};
        if (state===200){
            // Values=AutoSuggestNameVAlue(Description)
            Values=AutoSuggestUsers(Description.users);
            console.log(Values)
        }
        return  Values
    };
    onChangeValue=async(value)=>{
        function hasNumber(myString) {
            return /\d/.test(myString);
        }
        console.log(hasNumber(value));


        console.log("suggest");
        this.setState({
            value
        });
        let data = await this.getName(value);
        console.log(data.length===0)
        if (hasNumber(value) && data.length===0){
            let thenum = value.match(/\d+/)[0] // "3"
            if (thenum.length===11){
                this.setState({
                    finalNumber:thenum ,
                    error:""
                })
            }

        } else {
            this.setState({
                finalNumber:""
            })
        }


        console.log(data);
        this.setState({
            data
        });
        // }


    };
    handelSending=async ()=>{
        if (this.state.finalNumber !== "") {
            this.setState({
                isLoader:true
            });
            let data = await this.getName(this.state.finalNumber);
            let user_id = data[0].value;
            let class_id = this.props.match.params.id;
            let {state, Description} = await UserActioninclassroom("add", class_id, user_id, null);
            this.setState({
                isLoader:false
            });
            if (state === 200) {
                this.updateList();
                success_Notification("کاربر با موفقیت به کلاس اضافه شد");
            } else {
                error_Notification(state, Description);
            }

        } else {
            this.setState({
                error: "کاربر حتما باید انتخاب شود"
            })
        }


    }




    loadMore=async()=>{
          let{ pageStart}=this.state


        // ***get all product and current page ***

        // let {state,Description}=await GetAllUser(pageStart);
        let {state,Description}=await UserActioninclassroom("list", this.props.match.params.id, null, pageStart);



        // let Response = await GetAllProduct(pageStart);
        if (state ===200) {
            let{users,page}=Description;
            // *** modify  products to our label value ***
            let productsSeparate = users;
            // *******update state*****
            if (pageStart===1){
                this.setState({
                    productSeparate:[...productsSeparate]
                },()=>{
                    console.log("productSeparate")
                    console.log(this.state.productSeparate)
                })
             } else {
                this.setState(prevState => ({
                    productSeparate:[...prevState.productSeparate,...productsSeparate]
                }),()=>{
                    console.log("productSeparate")
                    console.log(this.state.productSeparate)
                })
                // setproductSeparate([...productSeparate,...productsSeparate]);

            }
            this.setState({
                pageStart:page+1,
                hasMore:users.length !== 0
            })

        }else {
            error_Notification('Network Error')
        }

    };


      updateList=()=>{
          this.setState({
              pageStart:1,
              hasMore:true
          })

    }


    render() {
        let{hasMore,productSeparate}=this.state;
        return (
            <div className="w-100">
                <br/>
                <InfiniteScroll
                    className="row rtl m-0"
                    pageStart={0}
                    loadMore={this.loadMore.bind(this)}
                    hasMore={hasMore}
                    loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
                >
                    <div className="w-100 mt-4">

                        <CardTitle>
                           <h2> لیست کاربران</h2>
                        </CardTitle>
                        <div className="w-100 pl-1">
                            <Table striped>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="text-center">نام و نام خانوادگی</th>
                                    <th className="text-center">شماره تماس</th>
                                    <th className="text-center">ادمین اضافه کننده</th>
                                    <th className="text-center">اکشن</th>
                                </tr>
                                </thead>
                                <tbody>

                                {productSeparate.length>0 && Array.isArray(productSeparate)  ?
                                    productSeparate.map((todo, index) =>
                                        <PreviewUserInClassroomList key={index} {...todo} index={index} class_id={this.props.match.params.id} updateList={this.updateList}/>

                                    ) : ''
                                }

                                </tbody>
                            </Table>
                        </div>



                    </div>



                </InfiniteScroll>

                <div>



                    <CardTitle className="mt-4 mb-1">
                        <span>اضافه کردن کاربر </span>
                    </CardTitle>
                    <IsLoaderComponent isLoader={this.state.isLoader}>
                        <div className="w-100 row m-0">

                            <div className="w-100" dir="ltr">

                                <InputGroup>
                                    <button className="default  ml-auto btn  br10px btn-outline-primary " onClick={ this.handelSending}>ارسال</button>
                                    <div className="col-11 p-0">
                                        <AutoSuggestEditwithOutLowerCase
                                            placeholder={ "لطفا نام یا شماره تماس کاربر را وارد کنید"}
                                            data={this.state.data}
                                            value={this.state.value}
                                            onChange={value => { this.onChangeValue(value)}}
                                        />
                                        {this.state.error!=="" ? (
                                            <div className="invalid-feedback d-block">
                                                {this.state.error}
                                            </div>
                                        ) : null}
                                    </div>
                                </InputGroup>

                            </div>

                        </div>

                    </IsLoaderComponent>






                </div>
            </div>
        );
    }
}

export default UsersInClassRoomLists;




