import React, {useState, useEffect, Component} from 'react';
 import {  loadStudio} from "../../../../functions/ServerConnection";
import {bgClassroomConfige, convertshamcytomiladi} from "../../../../functions/Functions";
import $ from "jquery";
 import IsLoaderComponent from "../../../../Common/ISLodader/IsLoader";
import {Card, Table} from "reactstrap";
let row = [{id: 7}, {id: 7.5}, {id: 8}, {id: 8.5}, {id: 9}, {id: 9.5}, {id: 10}, {id: 10.5}, {id: 11}, {id: 11.5}, {id: 12}, {id:12.5},
    {id: 13}, {id: 13.5}, {id: 14}, {id: 14.5}, {id: 15}, {id: 15.5}, {id: 16}, {id: 16.5}, {id: 17}, {id: 17.5}, {id: 18}, {id:18.5},
    {id: 19}, {id: 19.5}, {id: 20}, {id: 20.5}, {id: 21}, {id: 21.5}, {id: 22}, {id: 22.5}, {id: 23}, {id: 23.5}, {id: 24}];
let days=["شنبه","یکشنبه","دوشنبه","سهشنبه","چهارشنبه","پنجشنبه","جمعه"];



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
        console.log("dayss" );
        console.log(dayss);

        function eachDay(item, index){
            console.log(item);
            let bg=bgClassroomConfige(item);
            for (let i = convertIndex(item.start); i <= convertIndex(item.end); i++) {

                $(`#${i+days[index]}`).addClass([ "selectedTab", bg ]).find("a").html(j).attr("href",`/studio/root/class/${item.class_id}`);
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
        console.log("this is click")

    };


    render() {
        // console.log(this.state);
        return (

            <IsLoaderComponent isLoader={this.state.isLoader}>
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
                                    <td className="a" id={index+days[0]}  onClick={()=> this.handelClick(item.id,days[0],index+days[0],index)}>
                                        <a href="#"></a> </td>
                                    <td className="a" id={index+days[1]}  onClick={()=>  this.handelClick(item.id,days[1],index+days[1],index)}> <a href="#"></a> </td>
                                    <td className="a" id={index+days[2]}  onClick={()=>  this.handelClick(item.id,days[2],index+days[2],index)}><a href="#"></a> </td>
                                    <td className="a"  id={index+days[3]}  onClick={()=>  this.handelClick(item.id,days[3],index+days[3],index)}> <a href="#"></a></td>
                                    <td className="a"  id={index+days[4]}  onClick={()=>  this.handelClick(item.id,days[4],index+days[4],index)}> <a href="#"></a></td>
                                    <td className="a" id={index+days[5]}  onClick={()=> this.handelClick(item.id,days[5],index+days[5],index)}><a href="#"></a> </td>
                                    <td className="a" id={index+days[6]}  onClick={()=>  this.handelClick(item.id,days[6],index+days[6],index)}> <a href="#"></a></td>

                                </tr>
                            )}


                            </tbody>
                        </Table>
                    </Card>

                 </div>

            </IsLoaderComponent>

        );
    }
}

export default StudioInTable;
