import React, {Component} from 'react';
import {
    InputGroup,
    CustomInput, InputGroupAddon, Button,
} from "reactstrap";
 import ax from './../../Common/img/deault.svg'
import {ModalCropImage} from "../CropImg/ModalsCollection";



class ImgComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            src:ax,touched:true,
            ImgName:undefined,count:1,isOpenImg:false,

        }
    }
    // const [isOpenImg, setIsOpenImg] = useState(false);
      HandelImg=(file,Destination , label ,base64)=>{
        // let file=e.target.files;
        // let DATA=file[0];
        // if (file && file.length > 0) {
        //     const reader = new FileReader();
        //     reader.addEventListener("load", () =>
        //         setImgValue({data:reader.result,file:DATA})
        //     );
        //     reader.readAsDataURL(e.target.files[0]);
        // }

        // GetImgFile(file,Destination , label ,base64){
        console.log(file);
        console.log(Destination);
        console.log(label);
        console.log(base64);


        // setImgValue({data:base64,file:file});
          this.setState({ src: base64,ImgName:file.name ,touched:false});
          let{Type}=this.props;
          this.props.GetData(Type,file);
        // this.setState({
        //     ax1File:file ,ax1:base64
        // });


          this.setState(prevState => ({
              isOpenImg: !prevState.isOpenImg
          }));


        // this.setState(prevState => ({
        //     isOpen: !prevState.isOpen
        // }));
        // }






    };




    static getDerivedStateFromProps(props, state) {
        if (props.img !== state.src && props.img!==undefined &&  state.count===1) {
            return {
                src: props.img!==undefined? props.img:ax,
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
                    <div className="w-100   mb-3">
                        <label onClick={()=>{
                            this.setState(prevState => ({isOpenImg: !prevState.isOpenImg}));}}
                               className="btn btn-outline-primary  br10px  col-md-6 col-sm-12 offset-md-3 sendButton-shadow d-flex text-center justify-content-center" htmlFor="upload_img">
                            {this.state.ImgName||" آپلود عکس"}
                        </label>
                        {/*<input type="file" id="upload_img" className={"d-none"} onChange={HandelImg} />*/}
                    </div>

                    {/*<CustomInput*/}
                        {/*type="file"*/}
                        {/*id={this.props.label}*/}
                        {/*name="customFile"*/}
                        {/*onChange={this.onSelectFile.bind(this)}*/}
                        {/*label={ImgName}*/}

                    {/*/>*/}
                    {/*<InputGroupAddon addonType="append"  >*/}
                    {/*<Button outline color="primary">*/}
                        {/*{this.props.label}*/}
                    {/*</Button>*/}
                    {/*</InputGroupAddon>*/}



                </InputGroup>
                {errors[`${Type}`]  && touched  ? (
                    <div className="invalid-feedback d-block">
                        {errors[`${Type}`]}
                    </div>
                ) : null}
                {src && (
                    <div className='hpx200 w-100 h-100'>
                        <img  alt="img" className='img-self-fill br10px' src={src} />
                    </div>
                )}
                <ModalCropImage isOpen={this.state.isOpenImg} toggle={()=>{
                    this.setState(prevState => ({
                        isOpenImg: !prevState.isOpenImg
                    }));

                }} label={'انتخاب عکس'} aspect={1/1} GetImgFile={this.HandelImg}  />

            </div>
        );
    }
}

export default ImgComponent;