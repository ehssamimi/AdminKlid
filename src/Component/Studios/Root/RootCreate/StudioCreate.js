import React, {Component} from 'react';
import {CardBody, Table} from "reactstrap";
import PreviewUserInClassroomList
    from "../../ClassRoom/ClassRoomDetails/UsersInClassRoomLists/PreviewUserInClassroomList";
import $ from "jquery";

let row = [{id: 7}, {id: 7.5}, {id: 8}, {id: 8.5}, {id: 9}, {id: 9.5}, {id: 10}, {id: 10.5}, {id: 11}, {id: 11.5}, {id: 12}, {id:12.5},
    {id: 13}, {id: 13.5}, {id: 14}, {id: 14.5}, {id: 15}, {id: 15.5}, {id: 16}, {id: 16.5}, {id: 17}, {id: 17.5}, {id: 18}, {id:18.5},
    {id: 19}, {id: 19.5}, {id: 20}, {id: 20.5}, {id: 21}, {id: 21.5}, {id: 22}, {id: 22.5}, {id: 23}, {id: 23.5}, {id: 24}];
let days=["شنبه","یکشنبه","دوشنبه","سهشنبه","چهارشنبه","پنجشنبه","جمعه"];
let Default={
    row,days
}


class StudioCreate extends Component {
    constructor(props) {
        super(props);
        this.state={
            days:"",
            start:"",
            end:""
        }
    }


    handelClick=(hour,day,id,index)=>{

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

            let i;
            for (i = less; i <= big; i++) {
                 $(`#${i+day}`).addClass("bg-success");
            }
            this.setState({
                start:less
            })

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


    };
    render() {
        return (
            <div id="table">
                <Table  striped>
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
                        <tr key={item.id }>
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
                <div id="ss" className="text-black"> sds</div>
            </div>
        );
    }
}

export default StudioCreate;
