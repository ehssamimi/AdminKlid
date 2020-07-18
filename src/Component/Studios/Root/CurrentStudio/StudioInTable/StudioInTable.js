import React, {useState, useEffect, Component} from 'react';
 import {  loadStudio} from "../../../../functions/ServerConnection";
import {
    bgClassroomConfige,
    bgClassroomConfige2,
    changeTime,
    convertshamcytomiladi
} from "../../../../functions/Functions";
import $ from "jquery";
 import IsLoaderComponent from "../../../../Common/ISLodader/IsLoader";
import {Card, Table} from "reactstrap";
import {error_Notification} from "../../../../functions/componentHelpFunction";
let row = [{id: 7}, {id: 7.5}, {id: 8}, {id: 8.5}, {id: 9}, {id: 9.5}, {id: 10}, {id: 10.5}, {id: 11}, {id: 11.5}, {id: 12}, {id:12.5},
    {id: 13}, {id: 13.5}, {id: 14}, {id: 14.5}, {id: 15}, {id: 15.5}, {id: 16}, {id: 16.5}, {id: 17}, {id: 17.5}, {id: 18}, {id:18.5},
    {id: 19}, {id: 19.5}, {id: 20}, {id: 20.5}, {id: 21}, {id: 21.5}, {id: 22}, {id: 22.5}, {id: 23}, {id: 23.5}, {id: 24}];
let days=["شنبه","یکشنبه","دوشنبه","سهشنبه","چهارشنبه","پنجشنبه","جمعه"];
function search(nameKey, myArray){
    console.log("nameKey")
    console.log(nameKey) ;
    console.log("myArray")
    console.log(myArray)

    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].label === nameKey) {
            console.log("true")
            return myArray[i];
        }else {
            console.log("false")
            return false;
        }
    }
}


class StudioInTable extends Component {
    constructor(props) {
        super(props);
        this.state={
            days:"",
            start:"",
            end:"",
            ClassLists:[],
            id:"",
            isLoader:true,
            isOpen:false,
            DeleteIndex:""
        }
    }
    async componentDidMount(){

        let {state,Description}=await loadStudio(this.props.match.params.id);

        if (state === 200) {
            this.setState({
                isLoader: false
            })

            console.log("plan" );
            console.log(Description.plan);

            function convertIndex(x){
                return (x-7)*2
            }

            let j=1;let descibe=[],ClassLists=this.state.ClassLists
            let dayss=Object.values(Description.plan);
            console.log("dayss" );
            console.log(dayss);

            function eachDay(item, index){
                console.log(item);
                let {bg ,border ,mainColor ,SecondColor }=bgClassroomConfige2(item);
                for (let i = convertIndex(item.start); i <= convertIndex(item.end); i++) {

                     $(`#${i+days[index]}`).addClass([ "selectedTab", bg ]).find("a").attr("href",`/studio/root/class/${item.class_id}`).find("div").addClass(border)  ;

                    $(`#${i+days[index]}`).find(".lesson").addClass(mainColor).html(item.class_information.lesson_name)
                    $(`#${i+days[index]}`).find(".grade").addClass(SecondColor).html(item.class_information.grade+" - "+item.class_information.field)
                    $(`#${i+days[index]}`).find(".addClassNumber").html(j);




                    // /class/:id?
                }

                ClassLists.push({
                    "day": convertshamcytomiladi(days[index]),
                    "start": item.start,
                    "end": item.end,
                    "class_id": item.class_id,
                    "class_type": item.class_type
                });
                let repeat=search(item.class_information.grade+" - "+item.class_information.field+" - "+item.class_information.lesson_name,descibe)
                // console.log("repeat")
                // console.log(repeat)
                // descibe.push({"id":j,"bg":bg, "label":item.class_information.grade+" - "+item.class_information.field+" - "+item.class_information.lesson_name})
                // j=j+1
                if (repeat===false || repeat===undefined){
                    console.log("repeat-false")
                    descibe.push({"id":j,"bg":bg, "label":item.class_information.grade+" - "+item.class_information.field+" - "+item.class_information.lesson_name})
                    j=j+1
                }else {

                }



                // let repeat=search(item.class_information.grade+" - "+item.class_information.field+" - "+item.class_information.lesson_name,descibe)



            }

            function handelDay(day,index){
                day.map(item=> eachDay(item,index));
            }
            dayss.map((item,index)=> handelDay(item,index) )

            this.props.GetClassRoomList(descibe)
            this.setState({
                ClassLists, isLoader:false
            });



        }else {
            error_Notification( state, Description)
        }

    }





    handelClick=async (hour,day,id,index)=>{
        console.log("this is click")

    };


    render() {
        // console.log(this.state);
        return (

            <IsLoaderComponent isLoader={this.state.isLoader}>
                <div className="row m-0">
                    <div>
                        <p className="mainColor FsHeaderLogin1 font-weight-bold">برنامه کلاسی آنلاین </p>
                    </div>
                    <div className=" d-flex ml-auto  align-items-center">
                        <div className="d-flex " >
                            <span>کلاس عمومی</span>
                            <div className="hollow-pointer-circle border-main-green  ml-1  "></div>
                        </div>
                        <div className="d-flex ml-2" >
                            <span>کلاس اختصاصی</span>
                            <div className="hollow-pointer-circle  border-table-red  ml-1  "></div>
                        </div>
                        <div className="d-flex ml-2" >
                            <span>کلاس انفرادی </span>
                            <div className="pointer-circle   bg-main  ml-1  "></div>
                        </div>

                    </div>
                </div>

                <div id="table">
                    <Card className="w-100 card-shadow-default br-0 br20px">
                        <Table  bordered>
                            <thead className="w-100">
                            <tr>
                                <th className="Fs-Table-h   br-th-column br-th-row">  </th>
                                {days.map(item =>
                                    <th key={item } className="Fs-Table-h w-135 br-th-row mainColor table-br-b text-center">{item }</th>
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {row.map((item,index) =>
                                <tr key={item.id+index } className="Fs-Table    ">
                                    <th scope="     " className={"p-s-0 br-th-column   green-them FsFooterLogin text-right position-relative"}  ><span className={"spanInTh"} >{changeTime(item.id) }</span> <span style={{opacity:0}}> x</span></th>
                                    {days.map((day,iterate) =>
                                        <td className="p-0 m-0 align-middle w-135 wrapper-login table-br"
                                            id={index + days[iterate]}
                                            onClick={() => this.handelClick(item.id, days[iterate], index + days[iterate], index)}>
                                            <a href="#">
                                                <div className="pl-2 pr-1 d-none d-sm-block">
                                                    <p className="mb-0 lesson FsFooterLogin text-right font-weight-bold"></p>
                                                    <p className="mb-0 grade FS0 text-right IranSans"></p>
                                                </div>
                                                <div className=" d-sm-none addClassNumber" >

                                                </div>
                                            </a>
                                        </td>
                                    )}

                                </tr>
                            )}


                            </tbody>
                        </Table>
                    </Card>

                </div>

            </IsLoaderComponent>

        );
    }


    // constructor(props) {
    //     super(props);
    //     this.state={
    //         days:"",
    //         start:"",
    //         end:"",
    //         ClassLists:[],
    //         id:"",
    //         isLoader:true,
    //         isOpen:false,
    //         DeleteIndex:""
    //     }
    // }
    // async componentDidMount(){
    //
    //       this.SetInitial()
    //     this.setState({
    //         isLoader:false
    //     })
    // }
    //
    // SetInitial=async ()=>{
    //     let {state,Description}=await loadStudio(this.props.match.params.id);
    //     console.log("plan" );
    //     console.log(Description.plan);
    //
    //     function convertIndex(x){
    //         return (x-7)*2
    //     }
    //
    //     let j=1;let descibe=[],ClassLists=this.state.ClassLists
    //     let dayss=Object.values(Description.plan);
    //     console.log("dayss" );
    //     console.log(dayss);
    //
    //     function eachDay(item, index){
    //         console.log(item);
    //         let bg=bgClassroomConfige(item);
    //         for (let i = convertIndex(item.start); i <= convertIndex(item.end); i++) {
    //
    //             $(`#${i+days[index]}`).addClass([ "selectedTab", bg ]).find("a").html(j).attr("href",`/studio/root/class/${item.class_id}`);
    //             // /class/:id?
    //
    //         }
    //         ClassLists.push({
    //             "day": convertshamcytomiladi(days[index]),
    //             "start": item.start,
    //             "end": item.end,
    //             "class_id": item.class_id,
    //             "class_type": item.class_type
    //         });
    //
    //
    //         descibe.push({"id":j,"bg":bg, "label":item.class_information.grade+" - "+item.class_information.field+" - "+item.class_information.lesson_name})
    //         j=j+1
    //     }
    //
    //     function handelDay(day,index){
    //         day.map(item=> eachDay(item,index));
    //     }
    //     dayss.map((item,index)=> handelDay(item,index) )
    //
    //     this.props.GetClassRoomList(descibe)
    //     this.setState({
    //         ClassLists
    //     });
    // }
    //
    //
    //
    // handelClick=async (hour,day,id,index)=>{
    //     console.log("this is click")
    //
    // };
    //
    //
    // render() {
    //     // console.log(this.state);
    //     return (
    //
    //         <IsLoaderComponent isLoader={this.state.isLoader}>
    //             <div id="table">
    //                 <Card>
    //                     <Table  bordered>
    //                         <thead>
    //                         <tr>
    //                             <th>ساعت </th>
    //                             {days.map(item =>
    //                                 <th key={item }>{item }</th>
    //                             )}
    //                         </tr>
    //                         </thead>
    //                         <tbody>
    //                         {row.map((item,index) =>
    //                             <tr key={item.id+index }>
    //                                 <th scope="row">{item.id }</th>
    //                                 <td className="a" id={index+days[0]}  onClick={()=> this.handelClick(item.id,days[0],index+days[0],index)}>
    //                                     <a href="#"></a> </td>
    //                                 <td className="a" id={index+days[1]}  onClick={()=>  this.handelClick(item.id,days[1],index+days[1],index)}> <a href="#"></a> </td>
    //                                 <td className="a" id={index+days[2]}  onClick={()=>  this.handelClick(item.id,days[2],index+days[2],index)}><a href="#"></a> </td>
    //                                 <td className="a"  id={index+days[3]}  onClick={()=>  this.handelClick(item.id,days[3],index+days[3],index)}> <a href="#"></a></td>
    //                                 <td className="a"  id={index+days[4]}  onClick={()=>  this.handelClick(item.id,days[4],index+days[4],index)}> <a href="#"></a></td>
    //                                 <td className="a" id={index+days[5]}  onClick={()=> this.handelClick(item.id,days[5],index+days[5],index)}><a href="#"></a> </td>
    //                                 <td className="a" id={index+days[6]}  onClick={()=>  this.handelClick(item.id,days[6],index+days[6],index)}> <a href="#"></a></td>
    //
    //                             </tr>
    //                         )}
    //
    //
    //                         </tbody>
    //                     </Table>
    //                 </Card>
    //
    //              </div>
    //
    //         </IsLoaderComponent>
    //
    //     );
    // }
}

export default StudioInTable;
