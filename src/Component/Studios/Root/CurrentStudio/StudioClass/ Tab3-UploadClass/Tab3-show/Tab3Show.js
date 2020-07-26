// import React, {useState, useEffect} from 'react';
import React, {Component} from 'react';
import {ShowFileToClass, uploadFileToClass} from "../../../../../../functions/ServerConnection";
import IsLoaderComponent from "../../../../../../Common/ISLodader/IsLoader";
import {items} from "../../../../../../../data/carouselItems";
import {error_Notification} from "../../../../../../functions/componentHelpFunction";
import Tab3UploadFile from "./Tab3UploadFile/Tab3UploadFile";
import {Card} from "reactstrap";
import {CarouselMain} from "../../../../../../Common/Carousel/CarouselMain";



class Tab3Show extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoader:true,
            UploadList:undefined,
            newFile:""
            ,model:false,
            func1:this.getUploadList.bind(this)
        }
    }


    static getDerivedStateFromProps(props, state) {
        console.log("before");
        console.log("state.newFile");
        console.log(state.newFile);
        console.log("props.newFile");
        console.log(props.newFile);
        if (props.newFile !== state.newFile) {
            console.log("after");
            console.log("props.newFile");
            console.log(props.newFile);
            return {

                model:state.func1(props.index)

            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    componentDidMount() {
        this.getUploadList()
    }

    getUploadList = async () => {
        console.log("update list")
        let {state, Description} = await ShowFileToClass(this.props.class_id);
        if (state === 200) {
            console.log("show uploade")
            console.log(Description)
            this.setState({
                isLoader: false,
                UploadList: Description.files,
                newFile: this.props.newFile
            })

        } else {
            error_Notification(state, Description)
        }

    }


    render() {
        let{isLoader,UploadList}=this.state;
        return (
            <IsLoaderComponent isLoader={isLoader}>
                <div className="w-100" id="uploadFileDesktop">
                    <div className="w-100 h-100">
                        <div className="card-shadow-default  br-0  h-100 overflow-hidden">
                            <h4 className="  FsFooterLogin green-them font-weight-bold ml-4    header-chat-wide">
                                فایل های ضمیمه شده
                            </h4>
                            <div className="w-100   pb-4 overflow-scroll d-flex ">

                                {
                                    (UploadList!==undefined&&UploadList.length>0)?
                                        UploadList.map((item, index) =>
                                            <Tab3UploadFile key={index} {...item} {...this.props} updateList={()=>this.getUploadList()}/>
                                        ):" "
                                }

                            </div>
                        </div>
                    </div>
                </div>



            </IsLoaderComponent>
        );
    }
}

export default Tab3Show;


//
// const Tab3Show = (props) => {
//     const [isLoader, setIsLoader] = useState(true);
//     const [UploadList, setUploadList] = useState(undefined);
//     useEffect(() => {
//
//
//
//
//     }, []);
//
//     return (
//         <IsLoaderComponent isLoader={isLoader}>
//             <div className="w-100" id="uploadFileDesktop">
//                 <div className="w-100 h-100">
//                     <div className="card-shadow-default  br-0  h-100 overflow-hidden">
//                         <h4 className="  FsFooterLogin green-them font-weight-bold ml-4    header-chat-wide">
//                             فایل های ضمیمه شده
//                         </h4>
//                         <div className="w-100 pl-4 ml-5 pb-4 overflow-scroll d-flex ">
//
//                             {
//                                 (UploadList!==undefined&&UploadList.length>0)?
//
//                                     UploadList.map((item, index) =>
//                                         <Tab3UploadFile key={index} {...item} {...props}/>
//                                     ):" "
//                             }
//
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//
//
//         </IsLoaderComponent>
//     );
// };
//
// export default Tab3Show;