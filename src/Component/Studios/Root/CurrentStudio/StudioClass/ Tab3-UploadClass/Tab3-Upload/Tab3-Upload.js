import React, {Component} from 'react';
import {getencodering, uploadDropZone, uploadFileToClass} from "../../../../../../functions/ServerConnection";
import {error_Notification, formatBytes, success_Notification} from "../../../../../../functions/componentHelpFunction";
import DropzoneComponent from "react-dropzone-component";

import 'react-dropzone-uploader/dist/styles.css'
  import "dropzone/dist/min/dropzone.min.css";
import {TextInput} from "../../../../../../Common/Forms/textInput/TextInput";
// import CustomSelectInput from "../../../components/common/CustomSelectInput";
// import Select from "react-select";
// import {FormGroup} from "reactstrap";

var ReactDOMServer = require('react-dom/server');

class Tab3Upload extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"",
            fileSize:[],
            nameList: [],
            encodering_code: {},
            selectedOption: "",
            Errors:{"type":"","content":"" }
        };

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            // addRemoveLinks: true,
            thumbnailHeight: 160,
            acceptedFiles: "video/*,audio/*,image/*,text/*, application/*,.pdf ",
            autoProcessQueue: false,
            maxFilesize: 2000,
            timeout:30000000,
            maxFiles:1,
            maxfilesreached: 2000,
            maxfilesexceeded: 2000,
            paramName: "file",
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview mb-3">
                    <div className="d-flex flex-row ">
                        <div className="p-0 w-30 position-relative">
                            <div className="dz-error-mark">
                                <span>
                                    <i/>{" "}
                                    </span>
                            </div>
                            <div className="dz-success-mark">
                                <span>
                                    <i/>
                                </span>
                            </div>
                            <div className="preview-container">
                                {/*  eslint-disable-next-line jsx-a11y/alt-text */}
                                <img data-dz-thumbnail className="img-thumbnail border-0"/>
                                <i className="simple-icon-doc preview-icon"/>
                            </div>
                        </div>
                        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                            <div>
                                {" "}
                                <span data-dz-name/>{" "}
                            </div>
                            <div className="text-primary text-extra-small" data-dz-size/>
                            <div className="dz-progress">
                                <span className="dz-upload" data-dz-uploadprogress/>
                            </div>
                            <div className="dz-error-message">
                                <span data-dz-errormessage/>
                            </div>
                        </div>
                    </div>
                    <a href="#/" className="remove" data-dz-remove>
                        {" "}
                        <i className="glyph-icon simple-icon-trash"/>{" "}
                    </a>
                </div>
            ),
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: 'https://upload.liara.run/upload'
        };

        this.dropzone = null;
    }
    handleRemove() {
        this.setState({
            nameList:[],fileSize:[]
        })
    }
    validateForm=(callback)=> {
        // let errors={"name":"","class":"","fields":"","phoneNumber":""};
        let  Errors={"type":"","content":"" };
        let{nameList }=this.state;

        let formValidate=true;


        if (nameList.length===0) {
            formValidate = false;
            Errors['content'] = "محتوا باید انتخاب شود  ";
        }



        console.log("Error");
        console.log(Errors);

        this.setState({
            Errors
        },()=>{
            console.log(this.state.Errors)
        })
        return callback(formValidate)
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };


    async handleFileAdded(file,event) {
        console.log("event");
        console.log(event);
        let{nameList,fileSize}=this.state;
        nameList.push(file.name);

        fileSize.push(formatBytes(file.size));
        console.log(file);
        console.log(formatBytes(file.size));
        // let data={
        //     "course_id": this.props.ListData.course_id,
        //     "lesson_name": this.props.ListData.lesson_name,
        //     "teacher_name": this.props.ListData.teacher_name,
        //     "chapter_name": this.props.ListData.chapter_name,
        //     "item_name": this.props.ListData.item_name
        // };
        // console.log(data);
        // let {state,Description}=await getencodering(JSON.stringify(data));
        // this.setState({
        //     encodering_code:Description
        // });



    }

    handlePost(e) {
        e.preventDefault();
        this.validateForm(async (validate)=> {
            if (validate) {
                this.dropzone.processQueue();

            } else {
                console.log(this.state.Errors)
            }
        })
    }


    async handelComplete( ) {


        console.log("this file sending complete");
        console.log("this.state.encodering_code");
        let{nameList,title,fileSize}=this.state;
        console.log( "file_name") ;
        console.log( nameList) ;
        console.log( "class_id") ;
        console.log( this.props.class_id) ;
        console.log( "title") ;
        console.log(title) ;
        console.log( "file_size") ;
        console.log(fileSize[0]) ;



        // let data=this.state.encodering_code;

        let {state, Description} = await uploadFileToClass(nameList[0],title,this.props.class_id,fileSize[0] );
        //
        console.log(state);
        console.log(Description);
        if (state!==200) {
            error_Notification(state  , Description  );

        }else {
            success_Notification("محتوای جدید با موفقیت ثبت شد ")
            this.props.updateList(nameList[0]);
        }

    }

     handelChangeInput = (value,id) => {

         this.setState({
             title:value
         })
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            addedfile: this.handleFileAdded.bind(this ),
            removedfile:this.handleRemove.bind(this),
            success: this.handelComplete.bind(this ),
        }

        return (
            <div className="w-100">


                 <TextInput id={"title"}  label={"توضیحات"} onChange={this.handelChangeInput } error={""}/>


                <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}/>
                {this.state.Errors[`content`]  ? (
                    <div className="invalid-feedback d-block">
                        {this.state.Errors[`content`]}
                    </div>
                ) : null}

                <div className="w-100  d-flex justify-content-center mb-3">
                    <button onClick={this.handlePost.bind(this)} className="btn btn-outline-primary  br10px  col-md-6 col-sm-12   sendButton-shadow d-flex text-center justify-content-center">آپلود محتوا</button>
                </div>

            </div>
        );
    }
}

export default Tab3Upload;