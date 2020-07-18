import React, {Component} from 'react';
import {Card, Table} from "reactstrap";
// import {Button, Card, CardBody} from "reactstrap";
import $ from "jquery";
import {AddClassRoomToStudio, DeleteClassRoomFromStudio, loadStudio} from "../../../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../../../functions/componentHelpFunction";
import {
    bgClassroomConfige, bgClassroomConfige2,
    changeIndexToHoures,
    changeTime,
    convertshamcytomiladi
} from "../../../../../functions/Functions";
import IsLoaderComponent from "../../../../../Common/ISLodader/IsLoader";
import {ModalDelete} from "../../../../../Common/Modals/ModalDelete/ModalDelete";

let row = [{id: 7}, {id: 7.5}, {id: 8}, {id: 8.5}, {id: 9}, {id: 9.5}, {id: 10}, {id: 10.5}, {id: 11}, {id: 11.5}, {id: 12}, {id:12.5},
    {id: 13}, {id: 13.5}, {id: 14}, {id: 14.5}, {id: 15}, {id: 15.5}, {id: 16}, {id: 16.5}, {id: 17}, {id: 17.5}, {id: 18}, {id:18.5},
    {id: 19}, {id: 19.5}, {id: 20}, {id: 20.5}, {id: 21}, {id: 21.5}, {id: 22}, {id: 22.5}, {id: 23}, {id: 23.5}, {id: 24}];
let days=["شنبه","یکشنبه","دوشنبه","سهشنبه","چهارشنبه","پنجشنبه","جمعه"];


class StudioTable extends Component {
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

          this.SetInitial()
        this.setState({
            isLoader:false
        })
    }

     SetInitial=async ()=>{
         let {state,Description}=await loadStudio(this.props.match.params.id);
         console.log("plan" );
         console.log(Description.plan);

         function convertIndex(x){
             return (x-7)*2
         }

         let j=1;let descibe=[],ClassLists=this.state.ClassLists
         let dayss=Object.values(Description.plan);
         console.log("plan" );
         console.log(dayss);

         function eachDay(item, index){
             // console.log(item);

             // let bg=bgClassroomConfige(item);
             // for (let i = convertIndex(item.start); i <= convertIndex(item.end); i++) {
             //
             //     $(`#${i+days[index]}`).addClass([ "selectedTab", bg ]).html(j);
             //
             // }
             let {bg ,border ,mainColor ,SecondColor }=bgClassroomConfige2(item);
             for (let i = convertIndex(item.start); i <= convertIndex(item.end); i++) {
             // .find("a").attr("href",`/studio/root/class/${item.class_id}`)

                 $(`#${i+days[index]}`).addClass([ "selectedTab", bg ]).find("div").addClass(border)  ;

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


             descibe.push({"id":j,"bg":bg, "label":item.class_information.grade+" - "+item.class_information.field+" - "+item.class_information.lesson_name})
             j=j+1
         }

         function handelDay(day,index){
             day.map(item=> eachDay(item,index));
         }
         dayss.map((item,index)=> handelDay(item,index) )

         this.props.GetClassRoomList(descibe)
         this.setState({
             ClassLists
         });
    }



    handelClick=async (hour,day,id,index)=>{


// **************check Delete Or add with content ******
//         *****Delete classRoom from Studio***
        if ( $(`#${id}`).hasClass( "selectedTab" )) {
            this.setState({
                // DeleteIndex:parseInt($(`#${id}`).html())-1,
                DeleteIndex:parseInt( $(`#${id}`).find(".addClassNumber").html())-1,
                isOpen:true
            })




        }else {
            // btn-secondary

            //         *****Add classRoom from Studio***
// ********************check classRoom selected or Not *****************
            //         *****classRoomSelected***
            if (this.props.id !== "") {
                if (this.state.days !== day ) {
                    $("#table").find(".btn-secondary-withOut-hover").removeClass(" btn-secondary-withOut-hover");
                    $(`#${id}`).addClass(" btn-secondary-withOut-hover");
                    console.log("aaaaaaaa")
                    this.setState({
                        days: day,
                        start: index,
                        end: index
                    });
                } else  {
                    let {start, end, days} = this.state;
                    console.log(hour, day, id, index);
                    let diff = Math.abs(start - index);
                    if (diff > 1) {
                        console.log("cccccc")
                        let less = index > start ? start : index;
                        let big = index > start ? index : start;
                        let i;
                        let validate = true;
                        for (i = less; i <= big; i++) {
                            if ($(`#${i + day}`).hasClass("selectedTab")) {
                                validate = false;
                            }
                        }

                        if (validate) {
                            for (i = less; i <= big; i++) {

                                $(`#${i + day}`).addClass(" btn-secondary-withOut-hover");
                            }
                            this.setState({
                                start: less, end: big
                            })
                        } else {
                            error_Notification("زمان بندی کلاس باید پیوسته باشد!")
                        }


                    } else {
                        console.log("bbbbbbb")
                        $(`#${id}`).addClass(" btn-secondary-withOut-hover");
                        if (this.state.start === "") {
                            this.setState({
                                start: index
                            })
                        } else {
                            this.setState({
                                end: index
                            })
                        }

                    }

                }
                //         *****classRoomNotSelected***
            } else {
                error_Notification("از تب انتخاب کلاس جسنجو کنید!", "ابتدا باید کلاس مورد نظر انتخاب شود")
            }



        }
    };
    async handelSend (){

        let start=changeIndexToHoures(this.state.start);
        let end=changeIndexToHoures(this.state.end);

        let Data={
            "studio_id":this.props.match.params.id,
            "day": convertshamcytomiladi(this.state.days),
            "start": start,
            "end": end,
            "class_id": this.props.id,
            "class_type": this.props.type.value
        };

        console.log(Data);
        this.setState({
            isLoader:true
        })
        let{ state,Description}=await AddClassRoomToStudio(JSON.stringify(Data));
        this.setState({
            isLoader:false
        })
        console.log(state);
        console.log(Description);
        if (state===200){
            this.setState({
                days: "",
                start: "",
                end: "",
                ClassLists: [],
                id: "",
                isOpen: false,
                DeleteIndex: ""
            })
             success_Notification("کلاس جدید اضافه شد");
               await this.SetInitial();

        }else {
            error_Notification(state,Description);
            await this.SetInitial();
        }


    };
    handelDelete =async ()=>{

        let Data=this.state.ClassLists[this.state.DeleteIndex];
        console.log("this.props.match" )
        console.log(this.props.match.params.id)
        console.log("Data" )
        console.log(Data )

        Data["studio_id"]=this.props.match.params.id;
        console.log(Data);
        this.setState({
            isLoader:true
        })
        let {state ,Description}=await DeleteClassRoomFromStudio(Data);
        if (state===200){
            this.setState({
                days: "",
                start: "",
                end: "",
                ClassLists: [],
                id: "",
                isOpen: false,
                DeleteIndex: ""
            })
            success_Notification("کلاس موزد نظر حذف شد ");
            this.SetInitial();

        }else {
            error_Notification(state,Description);
            this.SetInitial();
        }
        this.setState({
            isLoader:false,
            isOpen:false
        })


        // let{state,Description}=DeleteClassRoomFromStudio(data)
    };


    render() {
        // console.log(this.state);
        return (

            <IsLoaderComponent isLoader={this.state.isLoader}>

                <div id="table">
                    <div className="row m-0 pt-4">
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
                    <Card>



                        <Table  bordered>
                            <thead className="pt-2">
                            <tr>
                                <th className="Fs-Table-h   br-th-column br-th-row">ساعت  </th>
                                {days.map(item =>
                                    <th key={item } className="Fs-Table-h w-135 br-th-row mainColor table-br-b text-center">{item }</th>
                                )}


                                {/*<th>ساعت </th>*/}
                                {/*{days.map(item =>*/}
                                {/*    <th key={item }>{item }</th>*/}
                                {/*)}*/}
                            </tr>
                            </thead>
                            <tbody>
                            {/*{row.map((item,index) =>*/}
                            {/*    <tr key={item.id+index }>*/}
                            {/*        <th scope="row">{item.id }</th>*/}
                            {/*        <td className="a" id={index+days[0]}  onClick={()=> this.handelClick(item.id,days[0],index+days[0],index)}> </td>*/}
                            {/*        <td className="a" id={index+days[1]}  onClick={()=>  this.handelClick(item.id,days[1],index+days[1],index)}>  </td>*/}
                            {/*        <td className="a" id={index+days[2]}  onClick={()=>  this.handelClick(item.id,days[2],index+days[2],index)}> </td>*/}
                            {/*        <td className="a"  id={index+days[3]}  onClick={()=>  this.handelClick(item.id,days[3],index+days[3],index)}> </td>*/}
                            {/*        <td className="a"  id={index+days[4]}  onClick={()=>  this.handelClick(item.id,days[4],index+days[4],index)}> </td>*/}
                            {/*        <td className="a" id={index+days[5]}  onClick={()=> this.handelClick(item.id,days[5],index+days[5],index)}> </td>*/}
                            {/*        <td className="a" id={index+days[6]}  onClick={()=>  this.handelClick(item.id,days[6],index+days[6],index)}> </td>*/}

                            {/*    </tr>*/}
                            {/*)}*/}
                            {row.map((item,index) =>
                                <tr key={item.id+index } className="Fs-Table    ">
                                    <th scope="     " className={"p-s-0 br-th-column   green-them FsFooterLogin text-right position-relative"}  ><span className={"spanInTh"} >{changeTime(item.id) }</span> <span style={{opacity:0}}> x</span></th>
                                    {days.map((day,iterate) =>
                                        <td className="p-0 m-0 align-middle w-135 wrapper-login table-br"
                                            id={index + days[iterate]}
                                            onClick={() => this.handelClick(item.id, days[iterate], index + days[iterate], index)}>

                                                <div className="pl-2 pr-1 d-none d-sm-block cursor-pointer">
                                                    <p className="mb-0 lesson FsFooterLogin text-right font-weight-bold"></p>
                                                    <p className="mb-0 grade FS0 text-right IranSans"></p>
                                                </div>
                                                <div className=" d-sm-none addClassNumber" >

                                                </div>

                                        </td>
                                    )}

                                </tr>
                            )}

                            </tbody>
                        </Table>
                    </Card>
                    <div className="w-100 mt-2 d-flex justify-content-end">
                        <button  className="btn Btn-Submit-Primary col-sm-3     " onClick={this.handelSend.bind(this)}>ارسال</button>

                    </div>

                </div>
                <ModalDelete isOpen={this.state.isOpen} toggle={() =>
                    this.setState(prevState=>({
                        isOpen:!prevState.isOpen
                    }))
                } item={"کلاس"} deleteComponent={this.handelDelete}/>
            </IsLoaderComponent>

        );
    }
}

export default StudioTable;
