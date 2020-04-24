import React, {Component} from 'react';
import {FormGroup, Label} from "reactstrap";
import AutoSuggestEdit from "../../../../../Common/AutoSuggestEdit/AutoSuggestEdit";
import {GetCategoriesNameID, GetDestination, GetProductNameID,SuggestPermission} from "../../../../../functions/ServerConnection";

class AddPermissionProperties extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedOption: "",selectData:[],   value: "",dataNAme:[],itemID:''
        };
    }
    async componentDidMount(){

        let permission=await SuggestPermission('a');
        console.log(permission);
        let Destination = await GetDestination();
        // this.changeProductFeild('ل');
        this.changeCategoryFeild(  );

        let selectData = [];
        for (let i = 0; i < Destination.ValidDestination.length; i++) {
            // console.log(Destination.ValidDestination[i]);
            let row = {label: Destination.ValidDestination[i], value: Destination.ValidDestination[i] };
            selectData.push(row);
        }
        this.setState({
            selectData
        })


    }


    async changeCategoryFeild(){


        let product=await GetCategoriesNameID();

        console.log(product);
        // console.log("aaaaaaaaaaaaaaa");
        // let selectData=[];
        // for (let i = 0; i < product.length; i++) {
        //     let row={value: product[i]['name'],label: product[i]['name'],destination:product[i]['_id'],image:product[i]['image']};
        //     selectData.push(row);
        // }
        const dataNAme = product.map(item => {
            return { name: item['name'] ,destination:item['_id']}
        });
        this.setState({
            dataNAme
        })
    }

    async changeProductFeild(name){
        let product=await GetProductNameID(name);

        // console.log(product);
        //  let selectData=[];
        //
        // for (let i = 0; i < product.length; i++) {
        //     let row={value: product[i]['Name'],label: product[i]['Name'],destination:product[i]['_id'] };
        //     selectData.push(row);
        // }

        const dataNAme = product.map(item => {
            return { name: item['Name'] ,destination:item['_id']}
        });
        // console.log('dataNAme');
        // console.log(dataNAme);


        this.setState({
            dataNAme
        })
    }


    handelChange(e, value){
        console.log('value '+value);
        this.setState({value:value});
        let {selectedOption,dataNAme}=this.state;

        if (value.length>0) {
            if (selectedOption['value']==='Category') {
                this.changeCategoryFeild(  );
            }else if (selectedOption['value']==='Product'){
                this.changeProductFeild(value)
            }
        }


        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter( key => predicate(obj[key]) )
                .reduce( (res, key) => (res[key] = obj[key], res), {} );

// Example use:
        console.log(Object.keys(dataNAme).length);
        if (Object.keys(dataNAme).length > 0) {
            var filtered = Object.filter(dataNAme, score => score['name'] === value);
            let row=Object.values(filtered)[0];
            if (row!==undefined){
                this.setState({
                    itemID:row['destination']
                },()=>{

                    // this.props.GetDestinationString(this.state.selectedOption.value,this.state.itemID)
                })
            }
            // console.log(row['destination']);
            // console.log(JSON.parse(row));
            // console.log(Object.values(filtered)[0]['destination'] );
        }





        // console.log('cat');
        // console.log(selectedOption['value']);
        // console.log('data name');
        // console.log(dataNAme);
        // console.log(value)


    }


    render() {
        return (

                <div className="col-12 ">

                    {
                        // selectedOption['value']!==undefined?
                            <FormGroup className="form-group has-float-label position-relative ">
                            <Label>
                                <span>نام نمونه مورد نظر</span>
                            </Label>
                            {
                                <AutoSuggestEdit
                                    placeholder={"نام نمونه مورد نظر را وارد کنید "}
                                    data={this.state.dataNAme}
                                    className="react-select"
                                    onChange={value => this.handelChange(this, value ||'n')}

                                />
                            }
                        </FormGroup>
                        // :''
                    }


                </div>

        );
    }
}

export default AddPermissionProperties;