import React, {Component} from 'react';

// import 'react-dropzone-uploader/dist/styles.css'
import {getencodering, uploadDropZone} from "../../functions/ServerConnection";
import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import Select from "react-select";
import {FormGroup} from "reactstrap";
import {error_Notification, success_Notification} from "../../functions/componentHelpFunction";

var ReactDOMServer = require('react-dom/server');
// const selectData = [
//     { label: "فایل صوتی", value: "item_audio", key: 0 },
//     { label: "محتوای قابل دانلود", value: "downloadable_content", key: 1 },
//  ];

class AddDropZone extends Component {
    constructor(props) {
        super(props);
        this.state={
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
            acceptedFiles: "image/*, audio/*, video/*, text/*, application/*",
            autoProcessQueue: false,
            maxFilesize: 2000,
            timeout:30000000,
            maxFiles:1,
            maxfilesreached: 2000,
            maxfilesexceeded: 2000,
            paramName: "file",

            dictDefaultMessage:"فایل را بکشید یا کلیک کنید  ",

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
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    validateForm=(callback)=> {
        // let errors={"name":"","class":"","fields":"","phoneNumber":""};
        let  Errors={"type":"","content":"" };
        let{nameList,selectedOption}=this.state;

        let formValidate=true;


            if (nameList.length===0) {
                formValidate = false;
                Errors['content'] = "محتوا باید انتخاب شود  ";
            }
            if (selectedOption==="") {
                formValidate = false;
                Errors['type'] = "نوع محتوا  باید انتخاب شود ";
            }


        // console.log("Error");
        // console.log(Errors);

        this.setState({
            Errors
        },()=>{
            // console.log(this.state.Errors)
        })
        return callback(formValidate)
    };
    handleRemove() {
        this.setState({
            nameList:[]
        })
    }


    async handleFileAdded(file,event) {
        console.log("event");
        console.log(event);
        let{nameList}=this.state;
        nameList.push(file.name);
        console.log(this.props.ListData);
        let data={
            "course_id": this.props.ListData.course_id,
            "lesson_name": this.props.ListData.lesson_name,
            "teacher_name": this.props.ListData.teacher_name,
            "chapter_name": this.props.ListData.chapter_name,
            "item_name": this.props.ListData.item_name
        };
        console.log(data);
        let {state,Description}=await getencodering(JSON.stringify(data));
        this.setState({
            encodering_code:Description
        });
         console.log(Description);

    }

    handlePost(e) {
        e.preventDefault();
        this.validateForm(async (validate)=> {
            if (validate) {
                this.dropzone.processQueue();

            } else {
                console.log("we cant sending")
                console.log(this.state.Errors)
            }
        })
     }


    async handelComplete(e) {

        console.log("this file sending complete");
        console.log("this.state.encodering_code");
        let data=this.state.encodering_code;
        data["file_name"]=this.state.nameList[0];
        console.log(data );
        console.log("selectedOption" );
        console.log(this.state.selectedOption.value );

        let {state, Description} = await uploadDropZone(data.file_name, this.state.selectedOption.value, data.course_id, data.lesson_name, data.teacher_name, data.chapter_name, data.item_name);
        console.log(state);
        console.log(Description);
        if (state!==200) {
            error_Notification(state  , Description  );
        }else {
            success_Notification("محتوای جدید با موفقیت ثبت شد ")
        }
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

                <div className="w-100  d-flex justify-content-center mb-3">
                    <button onClick={this.handlePost.bind(this)} className="btn btn-outline-primary  br10px  col-md-6 col-sm-12   sendButton-shadow d-flex text-center justify-content-center">ارسال و آپلود محتوا</button>
                </div>
                <div className="w-100 mb-3 ">
                    <FormGroup className="form-group has-float-label br20px">
                    <label>
                        نوع محتوا
                    </label>
                    <Select
                        components={{Input: CustomSelectInput}}
                        className="react-select  l-h-25 "
                        classNamePrefix="react-select  "
                        name="form-field-name"
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.props.selectData}
                    />
                        {this.state.Errors[`type`]  ? (
                            <div className="invalid-feedback d-block">
                                {this.state.Errors[`type`]}
                            </div>
                        ) : null}
                    </FormGroup>
                </div>

                <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}/>
                {this.state.Errors[`content`]  ? (
                    <div className="invalid-feedback d-block">
                        {this.state.Errors[`content`]}
                    </div>
                ) : null}

            </div>
        );
    }
}

export default AddDropZone;

