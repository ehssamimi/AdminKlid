import React, {Component} from 'react';
import cakes from "../../../data/cakes";
import ReactAutoSuggest from "../../../components/common/ReactAutoSuggest";
import AutoSuggestEdit from "../AutoSuggestEdit/AutoSuggestEdit";
import {ConvertURl, GetProgressive, SuggestName} from "../../functions/ServerConnection";
import {
    AutoSuggestNameVAlue,
    error_Notification,
    LabelValueOption,
    success_Notification
} from "../../functions/componentHelpFunction";
import ModalCustomVideo from "../Modals/ModalCustom";
import VideoModalDemo from "../VideoPlayerComponents/VideoModal/VideoModalDemo";
import VideoModal from "../VideoPlayerComponents/VideoModal/VideoModal";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Progress, Spinner} from "reactstrap";
import Loader from "../Loader/Loader";

class AddVideoConvert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",error:"",
            data:"",isOpenModal:false,isLoader:true,
            currentCount:0,type:"info",textPercent:"ََشروع",time_left:0
        }
    }
    async componentDidMount(){
        let data=await this.getName("a");

        let {state ,Description }=await GetProgressive(this.props.action,this.props.ListData );
        console.log(Description)
        this.setState({
            isLoader:false
        });


        if (state===200){
           let newCount=Description.percentage;
            var is_complete = Description.is_complete;
            if(newCount <= 100 && !is_complete){
                if (newCount>0&&newCount<20) {

                    this.setState({
                        type:"info",
                        textPercent:" شروع آپلود ..",
                    });

                }
                if (newCount>20&&newCount<70) {

                    this.setState({
                        type:"success",
                        textPercent:"درحال آپلود...",
                    });

                }
                if (newCount>70&&newCount<100) {

                    this.setState({
                        type:"warning",
                        textPercent:"دیگه تمومه ...",
                    });

                }    if ( newCount===100) {

                    this.setState({
                        type:"danger",
                        textPercent:"در حال آماده سازی ...",
                    });

                }

                this.setState({
                    currentCount:Description.percentage,time_left:Description.time_left.split(" ")[0]
                });
                var intervalId = setInterval( await this.timer, 10000);
                // store intervalId in the state so it can be accessed later:
                this.setState({intervalId: intervalId});
            }
        }
         this.setState({
            data
        });


    }

    getName=async (value)=>{
        let{state ,Description }= await SuggestName(value);
        // console.log("Description");
        // console.log( Description);
        let Values={name:"",value:""};
        if (state===200){
            Values=AutoSuggestNameVAlue(Description)
        }
        return  Values
    };
    toggle=()=>{
        this.setState(prevState => (
            this.setState({
                isOpenModal: !prevState.isOpenModal
            })
        ))
    };
     onChangeValue=async(value)=>{
         this.setState({
             value
         });
         let data = await this.getName(value);
         this.setState({
             data
         });

        console.log("value");
        console.log(value);
    };

    handelConvert=async ()=>{
       if (this.state.value!==""){
           console.log(this.props.ListData);
           console.log(this.state.value);
           console.log(this.props.action);

           // let {state ,Description }=await ConvertURl(this.props.action,this.props.ListData,this.state.value);
           let {state ,Description }=await ConvertURl(this.props.action,this.props.ListData,this.state.value);
           // let {state ,Description }=await GetProgressive(this.props.action,this.props.ListData );


           if (state===200){




               var intervalId = setInterval( await this.timer, 10000);
               // store intervalId in the state so it can be accessed later:
               this.setState({intervalId: intervalId,
                   currentCount:3
               });
           }else {
               error_Notification(state , Description );
           }


       } else {
           this.setState({error:"نام ویدیو باید انتخاب شود "})
       }





    }
    componentWillUnmount(){

        clearInterval(this.state.intervalId);
    }
    timer=async()=>{

        if (this.currentCount!==0){

            let {state ,Description }=await GetProgressive(this.props.action,this.props.ListData );
            console.log(Description)
            if (state===200){

                var newCount = Description.percentage;
                var is_complete = Description.is_complete;
                if (newCount>0&&newCount<20) {

                    this.setState({
                        type:"info",
                        textPercent:" شروع آپلود ..",
                    });

                }
                if (newCount>20&&newCount<70) {

                    this.setState({
                        type:"success",
                        textPercent:"درحال آپلود...",
                    });

                }
                if (newCount>70&&newCount<100) {

                    this.setState({
                        type:"warning",
                        textPercent:"دیگه تمومه ...",
                    });

                }
                if ( newCount===100) {

                    this.setState({
                        type:"danger",
                        textPercent:"در حال آماده سازی ...",
                    });

                }


                if(newCount <= 100 && !is_complete) {
                    this.setState({ currentCount: newCount,time_left:Description.time_left.split(" ")[0] });
                } else {
                    this.setState({ currentCount: 0 });
                    this.toggle();
                    success_Notification("تبدیل با موفقیت به اتمام رسید");
                    clearInterval(this.state.intervalId);
                }
            }else {
                this.setState({ currentCount: 0 });
                this.toggle();
                error_Notification(state,Description)
            }

        }

    };




    render() {

        const data = cakes.map(item => {
            return { name: item.title }
        });
        let{currentCount,type,isLoader,time_left}=this.state;
        return (
            <div className="w-100">
                {
                    isLoader ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :

                        <div className="w-100">



                            {/*<div className="d-flex flex-column justify-content-center align-items-center col-6">*/}
                                {/*<CircularProgress variant="determinate" value={currentCount} color="secondary" classes="w-100 d-flex justify-content-center"/>*/}
                                {/*<span className="fs16calc"> زمان باقی مانده :{ time_left}</span>*/}
                            {/*</div>*/}





                            {
                                (currentCount>0 && currentCount<100)?
                                    <div className="d-flex flex-column col-12">
                                        <div className="d-flex justify-content-between align-items-start mt-1 ">
                                            <span className="fs16calc"> زمان باقی مانده :{ time_left}</span>
                                            <span className="btn btn-outline-primary ml-auto" onClick={this.toggle}>اضافه کردن ویدیو پیش نمایش </span>

                                        </div>

                                        <Progress bar animated color={this.state.type} value={this.state.currentCount} className={this.state.currentCount>0?"br10px p-2":""}>{this.state.currentCount +"%"+ " " +this.state.textPercent  }</Progress>
                                    </div>

                                    :""
                            }
                            {
                                currentCount===0||currentCount===100?<span className="btn btn-outline-primary" onClick={this.toggle}>اضافه کردن ویدیو پیش نمایش </span>:""

                            }




                            <ModalCustomVideo isOpen={this.state.isOpenModal} toggle={this.toggle}>

                                <div className="w-100 d-flex  justify-content-center hpx250 align-items-center">
                                    <div className="col-8  ">
                                        <span className="FsFooterLogin mb-3">انتخاب نام ویدیو:</span>
                                        <AutoSuggestEdit
                                            placeholder={ "لطفا نام ویدیو را وارد کنید"}
                                            data={this.state.data}
                                            value={this.state.value}
                                            onChange={value => { this.onChangeValue(value)}}
                                        />
                                        {
                                            this.state.error!==""?  <span className="red-color " style={{fontSize:"12px"}}> {this.state.error}</span>:""
                                        }
                                        {
                                            this.state.currentCount!==0?     <div className="mt-3 d-flex flex-column ">
                                                <span>لطفا منتظر بمانید ...</span>
                                                <Progress bar animated color={this.state.type} value={this.state.currentCount} className={this.state.currentCount>0?"br10px p-2":""}>{this.state.currentCount +"%"+ " " +this.state.textPercent  }</Progress>
                                            </div>:""
                                        }


                                         <span className="btn btn-primary mt-3" onClick={this.handelConvert}>convert</span>


                                    </div>

                                </div>


                            </ModalCustomVideo>


                        </div>
                }
            </div>







        );
    }
}

export default AddVideoConvert;