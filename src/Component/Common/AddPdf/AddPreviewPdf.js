import React, {useState, useEffect, Component} from 'react';
import ax from "../img/deault.svg";
import {Button, CustomInput, InputGroup, InputGroupAddon} from "reactstrap";
import {FiDownload} from "react-icons/fi";

class AddPreviewPdf extends Component {
    constructor(props) {
        super(props);
        this.state={
            src:undefined,touched:true,
            ImgName:'',count:1
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.img !== state.src && props.img!==undefined &&  state.count===1) {
            return {
                src: props.img,
                count:2
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    onSelectFile = e => {
        let file=e.target.files;
        let DATA=file[0];
        let{Type}=this.props;
        // console.log(DATA);
        this.props.GetData(Type,DATA);
        if (file && file.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result,ImgName:file[0].name ,touched:false})
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    render() {
        let{src,ImgName,touched}=this.state;
        let{Type,errors}=this.props;



        return (
            <div className='w-100 mb-5'>

                <InputGroup className="mb-3">
                    <CustomInput
                        type="file"
                        id={this.props.label}
                        name="customFile"
                        onChange={this.onSelectFile.bind(this)}
                        label={ImgName}

                    />
                    <InputGroupAddon addonType="append"  >
                        <Button outline color="primary">
                            {this.props.label}
                        </Button>
                    </InputGroupAddon>
                    {/*<InputGroupAddon addonType="append">Upload</InputGroupAddon>*/}
                </InputGroup>
                {errors[`${Type}`]  && touched  ? (
                    <div className="invalid-feedback d-block">
                        {errors[`${Type}`]}
                    </div>
                ) : null}
                {src && (





                    <div className="mr-3 mt-3 green-them">
                        <span className=' '><FiDownload/></span>
                        <span className=' mr-2'>
                                        <a href={src} target="_blank" download
                                           className="second-color ml-1 ">دانلود جزوه</a>
                                        </span>
                    </div>


                    // <div className='hpx200 w-100 h-100'>
                    //     <img  alt="img" className='img-self-fill br10px' src={src} />
                    // </div>
                )}





            </div>
        );
    }
}

export default AddPreviewPdf;