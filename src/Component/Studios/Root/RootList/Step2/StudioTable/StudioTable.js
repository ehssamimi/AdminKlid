import React, {Component} from 'react';
import {Card, Table} from "reactstrap";
// import {Button, Card, CardBody} from "reactstrap";
import $ from "jquery";
import {loadStudio} from "../../../../../functions/ServerConnection";
import {error_Notification} from "../../../../../functions/componentHelpFunction";

let row = [{id: 7}, {id: 7.5}, {id: 8}, {id: 8.5}, {id: 9}, {id: 9.5}, {id: 10}, {id: 10.5}, {id: 11}, {id: 11.5}, {id: 12}, {id:12.5},
    {id: 13}, {id: 13.5}, {id: 14}, {id: 14.5}, {id: 15}, {id: 15.5}, {id: 16}, {id: 16.5}, {id: 17}, {id: 17.5}, {id: 18}, {id:18.5},
    {id: 19}, {id: 19.5}, {id: 20}, {id: 20.5}, {id: 21}, {id: 21.5}, {id: 22}, {id: 22.5}, {id: 23}, {id: 23.5}, {id: 24}];
let days=["شنبه","یکشنبه","دوشنبه","سهشنبه","چهارشنبه","پنجشنبه","جمعه"];
let Default={
    row,days
}


class StudioTable extends Component {
    constructor(props) {
        super(props);
        this.state={
            days:"",
            start:"",
            end:""
        }
    }
    async componentDidMount(){
        // console.log(this.props)
        let {state,Description}=await loadStudio(this.props.match.params.id);
        console.log(Description );
        console.log(Description.plan);
        // class_id: "5ee35ccdcb43c6e677ce3ef8"
        // class_information: {grade: "هشتم", field: "none", lesson_name: "none"}
        // class_type: "public"
        // end: 12.5
        // start: 10
        function convertIndex(x){
            return (x-7)*2
        }

        // let{friday, monday, saturday, sunday, thursday, tuesday, wednesday}=Description.plan;

        let dayss=Object.values(Description.plan);
        function eachDay(item, index){
            console.log(index)

            for (let i = convertIndex(item.start); i <= convertIndex(item.end); i++) {
                let bg;
                if (item.class_type==="public"){
                    bg="bg-plum";
                 }else if (item.class_type==="special") {
                    bg="bg-coral";
                }else {
                    bg="bg-lightskyblue";
                }        // personal
                $(`#${i+days[index+1]}`).addClass([ "selectedTab", bg ]);
            }

        }

        function handelDay(day,index){
            day.map(item=> eachDay(item,index));
        }
        dayss.map((item,index)=> handelDay(item,index) )



    }

    handelClick=(hour,day,id,index)=>{
        if ( $(`#${id}`).hasClass( "selectedTab" )) {

        }else {




        let{start,end,days}=this.state;
    console.log(hour,day,id,index);
    if (start===""){
        $(`#${id}`).addClass("bg-success");
        console.log("aaaa")
        this.setState({
            start:index,
            end:index
        })

    }else {
        let diff=Math.abs(start-index);
        if (diff>1){
            console.log("cccccc")
            let less=index>start?start:index;
            let big=index>start?index:start;
            let i;let validate=true;
            for (i = less; i <= big; i++) {
                if ($(`#${i+day}`).hasClass("selectedTab")){
                    validate=false;
                }
            }

            if (validate){
                for (i = less; i <= big; i++) {

                    $(`#${i+day}`).addClass("bg-success");
                }
                this.setState({
                    start:less
                })
            } else {
                error_Notification("زمان بندی کلاس باید پیوسته باشد!")
            }


         }else {
            console.log("bbbbbbb")
            $(`#${id}`).addClass("bg-success");
            this.setState({
                start:index
            })
        }

        // index+days[0]


    }




        if (days!== day) {
            $("#table").find(".bg-success").removeClass("bg-success");
            this.setState({
                days:day,
                start:"",
                end:""
            });
        } else {
            this.setState({
                days:day
            });
        }
        }

    };


    render() {
        return (
            <div id="table">
                <Card>
                <Table  bordered>
                    <thead>
                    <tr>
                        <th>ساعت </th>
                        {days.map(item =>
                            <th key={item }>{item }</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {row.map((item,index) =>
                        <tr key={item.id+index }>
                            <th scope="row">{item.id }</th>
                            <td id={index+days[0]}  onClick={()=> this.handelClick(item.id,days[0],index+days[0],index)}> </td>
                            <td id={index+days[1]}  onClick={()=>  this.handelClick(item.id,days[1],index+days[1],index)}>  </td>
                            <td id={index+days[2]}  onClick={()=>  this.handelClick(item.id,days[2],index+days[2],index)}> </td>
                            <td id={index+days[3]}  onClick={()=>  this.handelClick(item.id,days[3],index+days[3],index)}> </td>
                            <td id={index+days[4]}  onClick={()=>  this.handelClick(item.id,days[4],index+days[4],index)}> </td>
                            <td id={index+days[5]}  onClick={()=> this.handelClick(item.id,days[5],index+days[5],index)}> </td>
                            <td id={index+days[6]}  onClick={()=>  this.handelClick(item.id,days[6],index+days[6],index)}> </td>
                            <td id={index+days[7]}  onClick={()=> this.handelClick(item.id,days[7],index+days[7],index)}> </td>

                        </tr>
                    )}


                    </tbody>
                </Table>
                </Card>

                <div id="ss" className="text-black"> sds</div>
            </div>
        );
    }
}

export default StudioTable;
