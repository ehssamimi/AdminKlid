import * as Const from "../../constants/ServerConst";
import axios from "axios";

// export async  function  sendImg(file,permission){
//     let formData = new FormData();
//     formData.append("PermissionLevel", permission);
//     formData.append("file", file);
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//      };
//     var resp='';
//
//     await axios.post(`${Const.Download_Server_URL}upload/data-form`, formData, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let {UploadId} = response.data;
//         resp=UploadId;
//      }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp
//     // let { UploadId } = res.data ;
//     // let { status } = res ;
//     //  if (status===200) {
//     //     return UploadId
//     // }else {
//     //     return "error"
//     // }
// }
// export async  function  GetCatNameFunction(Name){
//     let formData = new FormData();
//     formData.append("Name", Name);
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     var resp="";
//      await axios.post(`${Const.HomePage}admin/category/add`,formData, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let { ItemId } = response.data ;
//         resp=ItemId;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//     // let { ItemId } = res.data ;
//     // let { status } = res ;
//     // if (status===200) {
//     //     return ItemId
//     // }else {
//     //     return "error"
//     // }
// }
// export async  function  UpdateCategories(CatId,Position,Image,DestinationId){
//     let formData = new FormData();
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         // 'category_id': CatId,
//         'category_id': CatId,
//     };
//     formData.append("Position",Position);
//     formData.append("Image",Image);
//     formData.append("DestinationId",DestinationId);
//     var resp="";
//     await axios.put(`${Const.HomePage}admin/category/${CatId}/items/update`,formData, {headers: headers}).then(function (response) {
//          // console.log(response);
//          let { status } = response ;
//          resp=status;
//      }).catch(function (error) {
//          console.log(error);
//          resp='error'
//      });
//     return resp;
//     // console.log(res);
//     // let { ItemId } = res.data ;
//     // let { status } = res ;
//     // if (status===200) {
//     //     return status
//     // }else {
//     //     return "error"
//     // }
//
// }
// export async  function  GetCategoriesAll(){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/categories`, {headers: headers});
//     let { Items } = res.data ;
//     return Items
//
// }
// export async  function  GetCategorieyDetail(Name){
//     // console.log(Name);
//     // console.log(`${Const.HomePage}admin/category/${Name}`);
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/category/${Name}`, {headers: headers});
//     let { data } = res ;
//     // console.log(res);
//     // console.log(data);
//     return data;
// }
// export async  function  DeleteCategoriey(Name){
//     // console.log(Name);
//     // console.log(`${Const.HomePage}admin/category/${Name}`);
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//     let resp ={state:false,Description:""};
//     await axios.delete(`${Const.HomePage}admin/category/${Name}/delete`, {headers: headers}).then(function (response) {
//         console.log(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//     }).catch(function (error) {
//         console.log(error);
//         console.log(error.response.data.detail[0]['Name']);
//         resp ={state:false,Description:error.response.data.detail[0]['Name']};
//     });
//     return resp;
//
//
//
//
// // let resp='';
// //  await axios.delete(`${Const.HomePage}admin/category/${Name}/delete`, {headers: headers}).then(function (response) {
// //         // console.log(response);
// //         let { status } = response ;
// //         resp=status;
// //     }).catch(function (error) {
// //         console.log(error);
// //         resp='error'
// //     });
// //     return resp;
//
// }
export async  function  GetCategoriesNameID(){

    let headers = {
        'Token': Const.Token,
        'Id': Const.ID,
    };

    let res = await axios.get(`${Const.product}admin/category/get/list-image-id`, {headers: headers});
       let { status,data} = res ;

    if (status===200) {
        return data
    }else {
        return ""
    }


}
export async  function  GetProductNameID(name){

    let headers = {
        'Token': Const.Token,
        'Id': Const.ID,
    };

    let res = await axios.get(`${Const.product}admin/homepage/product-list?name=${name}`, {headers: headers});
    console.log(res);

       let { status,data} = res ;

    if (status===200) {
        return data
    }else {
        return ""
    }


}
//
//
//
// // *****Add Package******
// export async  function  allPackage(){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/packages`, {headers: headers});
//     let { Items } = res.data ;
//     return Items
//
// }
// export async  function  GetPackageDetail(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/package/${Name}`, {headers: headers});
//     let { data } = res ;
//     return data;
// }
// export async function addPackage(Name) {
//     let formData = new FormData();
//     formData.append("Name", Name);
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     var resp="";
//
//     await axios.post(`${Const.HomePage}admin/packages/add`, formData, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let {ItemId} = response.data;
//         // let { status } = response ;
//         resp=ItemId;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//     // let {ItemId} = res.data;
//     // let {status} = res;
//     // if (status === 200) {
//     //     return ItemId
//     // } else {
//     //     return ""
//     // }
// }
// export async  function  UpdatePackage(CatId,Position,Image,DestinationId){
//     let formData = new FormData();
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         // 'category_id': CatId,
//         // 'category_id': CatId,
//     };
//     formData.append("Position",Position);
//     formData.append("Image",Image);
//     formData.append("DestinationId",DestinationId);
//     var resp="";
//     await axios.put(`${Const.HomePage}admin/packages/${CatId}/items/update`,formData, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let { status } = response ;
//         resp=status;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//     // console.log(res);
//     // let { ItemId } = res.data ;
//     // let { status } = res ;
//     // return status
// }
// export async  function  DeletePackage(ID){
//     // console.log(Name);
//     // console.log(`${Const.HomePage}admin/category/${Name}`);
//     // {category_id}?package_id=5db67bae8e652a4cabb3374a
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//     var resp="";
//       await axios.delete(`${Const.HomePage}admin/package/${ID}`, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let { status } = response ;
//         resp=status;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
// //     let { status } = res ;
// //     console.log(res);
// //     // console.log(data);
// //     return status;
// }
//
//
// // *********Slider*********
export async  function  GetDestination( ) {
    let headers = {
        'Token': Const.Token,
        'Id': Const.ID
    };
    let res = await axios.get(`${Const.HomePage}banners/destinations`, {headers: headers});
    let {data} = res;
    return data
}
// export async  function  AddSlider(Name,Number){
//     let formData = new FormData();
//     formData.append("Name", Name);
//     formData.append("Number", Number );
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     var resp ="";
//      await axios.post(`${Const.HomePage}admin/slider/add`,formData, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let {ItemId} = response.data;
//         resp=ItemId;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp
//     // let { ItemId } = res.data ;
//     // let { status } = res ;
//     // // return status
//     // if (status===200) {
//     //     return ItemId
//     // }else {
//     //     return "error"
//     // }
// }
// export async  function  UpdateSliders(SliderName,Position,Image,Destination ,DestinationId){
//     let formData = new FormData();
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         // 'category_id': CatId,
//     };
//     formData.append("Position",Position);
//     formData.append("Image",Image);
//     formData.append("DestinationId",DestinationId);
//     formData.append("Destination",Destination);
//     var resp ="";
//       await axios.put(`${Const.HomePage}admin/slider/${SliderName}/items/update`,formData, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let {status} = response ;
//         resp=status;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//     // console.log(res);
//     // let { ItemId } = res.data ;
//     // let { status } = res ;
//     // return status
// }
// export async  function  allMainSlider(){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     var resp ="";
//      await axios.get(`${Const.HomePage}admin/sliders`, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let {Items} = response.data;
//         resp=Items;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//
//     // let { Items } = res.data ;
//     // return Items
//
// }
// export async  function  GetSliderDetail(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//     let res = await axios.get(`${Const.HomePage}admin/slider/${Name}`, {headers: headers});
//     let { data } = res ;
//     // console.log(res);
//     // console.log(data);
//     return data;
// }
// export async  function  DeleteSlider(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//
//     let resp ={state:false,Description:""};
//     await axios.delete(`${Const.HomePage}admin/slider/${Name}/delete`, {headers: headers}).then(function (response) {
//         console.log(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//     }).catch(function (error) {
//         console.log(error);
//         console.log(error.response.data.detail[0]['Name']);
//         resp ={state:false,Description:error.response.data.detail[0]['Name']};
//     });
//     return resp;
//
//     // let res = await axios.delete(`${Const.HomePage}admin/slider/${Name}/delete`, {headers: headers});
//     // let { status } = res ;
//     // console.log(res);
//     // return status;
// }
//
// // *****Add Baner******
//
// export async function addBaner(Name,Image,Destination,DestinationId) {
//     let formData = new FormData();
//     formData.append("Name", Name);
//     formData.append("Image", Image);
//     formData.append("Destination", Destination);
//     formData.append("DestinationId", DestinationId);
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     var resp='';
//     await axios.post(`${Const.HomePage}banners/add`, formData, {headers: headers}).then(function (response) {
//
//         // console.log(response);
//         let {ItemId} = response.data;
//          resp=ItemId;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//     //  let {ItemId} = res.data;
//     // let {status} = res;
//     // if (status === 200) {
//     //     return ItemId
//     // } else {
//     //     return "error"
//     // }
// }
// export async  function  GetBanners( ) {
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//     };
//     let res = await axios.get(`${Const.HomePage}banners`, {headers: headers});
//     let {data} = res;
//     return data.Items
// }
// export async  function  GetBannersDetail(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//     let res = await axios.get(`${Const.HomePage}banners/${Name}`, {headers: headers});
//     let { data } = res ;
//
//     return data;
// }
// export async  function  DeleteBanner(id){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//     };
//
//     let resp ={state:false,Description:""};
//     await axios.delete(`${Const.HomePage}banners/${id}`, {headers: headers}).then(function (response) {
//         console.log(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//     }).catch(function (error) {
//         console.log(error);
//         console.log(error.response.data.detail[0]['Name']);
//         resp ={state:false,Description:error.response.data.detail[0]['Name']};
//     });
//     return resp;
//
// }
// export async  function  GetBanerDetail(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//
//     let res = await axios.get(`${Const.HomePage}banners/${Name}`, {headers: headers});
//     let { data } = res ;
//
//     return data;
// }
//
// // ****************Query***********
// export async  function  GetQueryKeys(){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/query/keys`, {headers: headers});
//     let { Keys } = res.data ;
//
//     return Keys;
// }
//
// // *************Item list*********
// export async  function  GetAllItemList( ) {
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//     };
//     let res = await axios.get(`${Const.HomePage}admin/item-lists`, {headers: headers});
//     let {data} = res;
//     // console.log(data);
//     return data
// }
// export async function addItemList(Title,QueryKey) {
//     let formData = new FormData();
//     formData.append("Title", Title);
//     formData.append("QueryKey", QueryKey);
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp="";
//    await axios.post(`${Const.HomePage}admin/item-list/add`, formData, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let {ItemId} = response.data;
//         let { status } = response ;
//         resp=status;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//     // let {ItemId} = res.data;
//     // console.log(res);
//     // let {status} = res;
//     // if (status === 200) {
//     //     return ItemId
//     // } else {
//     //     return ""
//     // }
// }
// export async  function  GetItemList(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/item-list/${Name}/get`, {headers: headers});
//     let { data } = res ;
//
//     return data;
// }
// export async  function  GetItemDetail(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/item-list/${Name}/get/loaded`, {headers: headers});
//     let { data } = res ;
//
//     return data;
// }
// export async  function  DeleteCitemList(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//     };
//     let resp ={state:false,Description:""};
//     await axios.delete(`${Const.HomePage}admin/item-list/${Name}/delete`, {headers: headers}).then(function (response) {
//         console.log(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//     }).catch(function (error) {
//         console.log(error);
//         console.log(error.response.data.detail[0]['Name']);
//         resp ={state:false,Description:error.response.data.detail[0]['Name']};
//     });
//     return resp;
//
//     // let headers = {
//     //     'Token': Const.Token,
//     //     'Id': Const.ID
//     //     // 'category_name':Name,
//     // };
//     // let res = await axios.delete(`${Const.HomePage}admin/item-list/${Name}/delete`, {headers: headers});
//     // let { status } = res ;
//     // console.log(res);
//     // return status;
// }
//
// // *************headerSlider**********
// export async  function  AddHeaderSlider(Name,Number){
//     let formData = new FormData();
//     formData.append("Name",Name);
//     formData.append("Number", Number );
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//
//     let res = await axios.post(`${Const.HomePage}admin/header/slider/add`,formData, {headers: headers});
//     let { ItemId } = res.data ;
//     let { status } = res ;
//     if (status===200) {
//         return ItemId
//     }else {
//         return ""
//     }
// }
// export async  function  UpdateHeaderSliders(SliderName,Position,Image,Destination ,DestinationId){
//
//     let formData = new FormData();
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         // 'category_id': CatId,
//     };
//     formData.append("Position",Position);
//     formData.append("Image",Image);
//     formData.append("DestinationId",DestinationId);
//     formData.append("Destination",Destination);
//     let res = await axios.put(`${Const.HomePage}admin/header/slider/${SliderName}/items/update`,formData, {headers: headers});
//     // console.log(res);
//     let { ItemId } = res.data ;
//     let { status } = res ;
//     return status
// }
// export async  function  allHeaderSlider(){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/header/sliders`, {headers: headers});
//     let { Items } = res.data ;
//     return Items
// }
// export async  function  GetHeaderSliderDetail(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//     let res = await axios.get(`${Const.HomePage}admin/header/slider/${Name}`, {headers: headers});
//     let { data } = res ;
//     // console.log(res);
//     // console.log(data);
//     return data;
// }
// export async  function  DeleteHeaderSlider(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//
//
//     let resp ={state:false,Description:""};
//     await axios.delete(`${Const.HomePage}admin/header/slider/${Name}/delete`, {headers: headers}).then(function (response) {
//         console.log(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//     }).catch(function (error) {
//         console.log(error);
//         console.log(error.response.data.detail[0]['Name']);
//         resp ={state:false,Description:error.response.data.detail[0]['Name']};
//     });
//     return resp;
//
//     // let res = await axios.delete(`${Const.HomePage}admin/header/slider/${Name}/delete`, {headers: headers});
//     // let { status } = res ;
//     // console.log(res);
//     // return resp;
// }
//
// // *************************HomePages*******************
// export async  function  GetHomePageTemp(){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//
//     let res = await axios.get(`${Const.HomePage}homepage`, {headers: headers});
//     // console.log(res.data);
//     let { Body,Header } = res.data ;
//     // console.log(Body );
//     return res.data
//
// }
// export async  function  GetAllHomePages( ){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//
//     let res = await axios.get(`${Const.HomePage}admin/homepages`, {headers: headers});
//     // console.log(res.data);
//     let { Items } = res.data ;
//     // console.log(Body );
//     return Items
//
// }
// export async  function  GetHomePageLoad(name){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     var resp ="";
//         await axios.get(`${Const.HomePage}admin/homepage/${name}/load`, {headers: headers}).then(function (response) {
//         console.log(response.data);
//         // let {Items} = response.data;
//         resp=response.data;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//     // console.log(res.data);
//     // let { Body,Header,Footer } = res.data ;
//     // console.log(Body );
//     // return res.data
//     // return Body
//
// }
// // /admin/homepage/init/{homepage_name}
// export async  function  AddHomePages(Name){
//     let formData = new FormData();
//     formData.append("Name", Name);
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ="";
//     await axios.post(`${Const.HomePage}admin/homepage/init/${Name}`,formData, {headers: headers}).then(function (response) {
//         // console.log(response);
//         let {ItemId} = response.data;
//         let { status } = response ;
//         resp=ItemId;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
//     // let { ItemId } = res.data ;
//     // let { status } = res ;
//     // if (status===200) {
//     //     return ItemId
//     // }else {
//     //     return ""
//     // }
// }
// export async  function  UpdateHomePage(Data){
//     // let formData = new FormData();
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         // 'category_id': CatId,
//     };
//     // formData.append("Position",Position);
//     // formData.append("Image",Image);
//     // formData.append("DestinationId",DestinationId);
//     // formData.append("Destination",Destination);
//     let resp ="";
//     await axios.put(`${Const.HomePage}admin/homepage/update`, Data, {headers: headers}).then(function (response) {
//         // console.log(response);
//         // let {ItemId} = response.data;
//         let {status} = response;
//         resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp = 'error';
//     });
//     return resp;
//     // console.log(res);
//     // let { ItemId } = res.data ;
//     // let { status } = res ;
//     // return status
// }
// export async  function  ActiveHomePages(Name){
//     // let formData = new FormData();
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         // 'category_id': CatId,
//     };
//     // console.log(error);
//     // console.log(error.response.data.detail[0]['Name']);
//     // resp ={state:false,Description:error.response.data.detail[0]['Name']};
//     let resp ={state:false,Description:""};
//     await   axios.put(`${Const.HomePage}admin/homepage/${Name}/active`, {headers: headers}).then(function (response) {
//         console.log(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//     }).catch(function (error) {
//           resp ={state:false,Description:error.response.data.detail};
//     });
//     return resp;
//
//
//
//     let res = await axios.put(`${Const.HomePage}admin/homepage/${Name}/active`,  {headers: headers});
//     console.log(res);
//     let { ItemId } = res.data ;
//     let { status } = res ;
//     return status
// }
// export async  function  DeleteHomePages(Name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID
//         // 'category_name':Name,
//     };
//     let res = await axios.delete(`${Const.HomePage}admin/homepage/${Name}`, {headers: headers});
//     let { status } = res ;
//     console.log(res);
//     return status;
// }
//
//
// // ***************************************************************************ChiChiMan**********************************************
// // ******SignUp***********
// export async  function  RegisterChichiMan(Data){
//      let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//      };
//     let resp ={state:false,Description:""};
//     console.log(Data);
//     await axios.post(`${Const.ChichiMan}admin/chichiman/register`, Data).then(function (response) {
//         let {status} = response;
//         // let{State,Description}=JSON.parse(response.data);
//         let{State,Description}= response.data ;
//          // console.log(response);
//         if (status===200 ){
//              resp ={state:State,Description:Description};
//          }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//            resp ={state:false,Description:error.message};
//      });
//     return resp;
// }
// export async  function  GetVerificationCode(phoneNumber){
//      let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//          "accept": "application/json"
//      };
//     let resp ={state:false,Description:""};
//      await axios.get(`${Const.ChichiMan}chichiman/code/${phoneNumber}`, {headers: headers}).then(function (response) {
//         let {status} = response;
//         // let{State,Description}=JSON.parse(response.data);
//         let{State,Description}= response.data ;
//          // console.log(response);
//         if (status===200 ){
//              resp ={state:State,Description:Description};
//          }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//            resp ={state:false,Description:error.message};
//      });
//     return resp;
// }
// export async  function  VerifyChichiManPhoneNumber(phoneNumber,code){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//      await axios.get(`${Const.ChichiMan}chichiman/verify/${phoneNumber}/${code}` ,{headers: headers}).then(function (response) {
//         let {status} = response;
//         // let{State,Description}=JSON.parse(response.data);
//         let{State,Description}= response.data ;
//         // console.log(response);
//         if (status===200 ){
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export async  function  UpdateChichiManPersonalInfo(data){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//      await axios.post(`${Const.ChichiMan}admin/chichiman/info/personal`,data  ,{headers: headers}).then(function (response) {
//         let {status} = response;
//         let{State,Description}= response.data ;
//         // let{State,Description}=JSON.parse(response.data);
//         // console.log(response);
//         if (status===200 ){
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export async  function  UpdateChichiManVehicleInfo(data){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//      await axios.post(`${Const.ChichiMan}admin/chichiman/info/delivery`,data  ,{headers: headers}).then(function (response) {
//         let {status} = response;
//         let{State,Description}= response.data ;
//         // console.log(response);
//         if (status===200 ){
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export async  function  UpdateChichiManContactInfo(data){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//      await axios.post(`${Const.ChichiMan}admin/chichiman/info/contract`,data ,{headers: headers}).then(function (response) {
//         let {status} = response;
//         let{State,Description}= response.data ;
//         // console.log(response);
//         if (status===200 ){
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export async  function  UpdateChichiManBankInfo(data){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//     await axios.post(`${Const.ChichiMan}admin/chichiman/info/bank`,data ,{headers: headers}).then(function (response) {
//         let {status} = response;
//         let{State,Description}= response.data ;
//         // console.log(response);
//         if (status===200 ){
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// // ******Show-List***********
// export async  function  ChichiManListSummery(Page){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         "accept": "application/json"
//     };
//     let resp ={state:false,Description:""};
//     await axios.get(`${Const.ChichiMan}admin/panel/chichimans-list?page=${Page}`, {headers: headers}).then(function (response) {
//         console.log(response);
//          let{Code,Description}= response.data ;
//         // console.log(response);
//         if (Code===200 ){
//             resp ={Code:Code,Description:Description,};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export async  function  ChichiManIfoDetail(id,boolian=true){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         "accept": "application/json"
//     };
//     let resp ={state:false,Description:""};
//
//     await axios.get(`${Const.ChichiMan}admin/chichiman/detail?_id=${id}&formatted=${boolian}`, {headers: headers}).then(function (response) {
//         console.log(response);
//         let{status,data}= response ;
//         console.log(data);
//         if (status===200 ){
//             resp=data;
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// // **************************Content**************
//
// // **************product********
// export async  function  GetAllProduct(id){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         'Content-Type': 'application/x-www-form-urlencoded'
//     };
//     var resp ="";
//     await axios.get(`${Const.product}admin/product/all?page=${id}`, {headers: headers}).then(function (response) {
//          // console.log(response );
//         let {Description}=response.data;
//         // let {Items} = response.data;
//         resp=Description;
//     }).catch(function (error) {
//         console.log(error);
//         console.log(error.message);
//         resp='error'
//     });
//     return resp;
// }
// export async  function  GetProductDetail(id){
//
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     var resp ="";
//     await axios.get(`${Const.product}admin/product/${id}`, {headers: headers}).then(function (response) {
//          // console.log(response.data);
//         let {Description}=response.data;
//         // let {Items} = response.data;
//         resp=Description;
//     }).catch(function (error) {
//         console.log(error);
//         resp='error'
//     });
//     return resp;
// }
// export  async  function  AddProduct(data){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         "accept": "application/json"
//     };
//     console.log(data);
//     let resp ={state:false,Description:""};
//     await axios.post(`${Const.product}admin/product/add`, data , {headers: headers}).then(function (response) {
//         console.log(response);
//         let{State,Description}= response.data ;
//         // console.log(response);
//         if (State===200 ){
//             resp ={state:State,Description:Description};
//         }else {
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  UpdateProduct(data){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         "accept": "application/json"
//     };
//     console.log('data');
//     console.log(data);
//     let resp ={state:false,Description:""};
//     await axios.post(`${Const.product}admin/product/update`, data , {headers: headers}).then(function (response) {
//         console.log(response);
//         let{State,Description}= response.data ;
//         // console.log(response);
//         if (State===200 ){
//             resp ={state:State,Description:Description};
//         }else {
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  DeleteProduct(UniqueValue ){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//      };
//     let formData = new FormData();
//     formData.append("UniqueValue",UniqueValue);
//     console.log(UniqueValue );
//     let resp ={state:false,Description:""};
//     await axios.post(`${Const.product}admin/product/delete`, formData , {headers: headers}).then(function (response) {
//         console.log(response);
//         let{State,Description}= response.data ;
//         // console.log(response);
//         if (State===200 ){
//             resp ={state:State,Description:Description};
//         }else {
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  ProductDetail(id){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     // console.log(id);
//     let resp ={state:false,Description:""};
//     await axios.get(`${Const.product}admin/product/${id}` , {headers: headers}).then(function (response) {
//         let {status} = response;
//         let{State,Description}= response.data ;
//         // console.log(response);
//         // console.log(Description);
//         if (status===200 ){
//             resp ={state:State,Description:Description};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  getProductinSubCategogy(name,page){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     // console.log(id);
//     let resp ={state:false,Description:""};
//     await axios.get(`${Const.product}admin/product/in/${name}?page=${page}` , {headers: headers}).then(function (response) {
//         let {status} = response;
//         let{State,Description}= response.data ;
//         console.log(response);
//         // console.log(Description);
//         if (status===200 ){
//             resp ={state:State,Description:Description};
//         }else {
//             resp ={state:State,Description:Description};
//
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
//
// // **************category********
// export async  function  AddCategory(Data){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//     console.log(Data);
//     await axios.post(`${Const.product}admin/category/add`, Data).then(function (response) {
//         console.log(response);
//          // let{State,data}=JSON.parse(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export async  function  DeleteCategory(name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//      await axios.delete(`${Const.product}admin/category/delete/${name}`).then(function (response) {
//         console.log(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//      }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  UpdateCategory(id,imag_id ){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         "accept": "application/json"
//     };
//     let resp ={state:false,Description:""};
//     // console.log(`${Const.product}category/image/update?Id=${id}&new_image=${imag_id}`);
//     await axios.get(`${Const.product}category/image/update?Id=${id}&new_image=${imag_id}`).then(function (response) {
//         let {status} = response;
//         console.log( response );
//         // data: "d"
//         // status: 200
//         var data= (response.data);
//         // console.log(Result);
//         if (status===200 ){
//             resp = {state:status,Description:data};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  getAllCategories( ){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//     await axios.get(`${Const.product}category/get/all-name`).then(function (response) {
//         let {status} = response;
//         // console.log( (response.data))
//         let{Result}= (response.data);
//         // console.log(Result);
//         if (status===200 ){
//             resp = Result;
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  getAllCategoriesList( ){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//     await axios.get(`${Const.product}admin/category/get-all`).then(function (response) {
//          // console.log( (response ))
//         let{data,status}= (response );
//         // console.log(data)
//         // console.log(status)
//         // console.log(Result);
//         if (status===200 ){
//             resp = data;
//         }else{
//             resp = "not recognize error";
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  getCategoryDetailwithId(id){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//     await axios.get(`${Const.product}admin/category/get/detail?key=id&value=${id}`).then(function (response) {
//         // console.log( (response ))
//         let{data,status}= (response );
//         // console.log(data)
//         // console.log(status)
//         // console.log(Result);
//         if (status===200 ){
//             resp = data;
//         }else{
//             resp = "not recognize error";
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// export  async  function  getCategoryDetailwithName(name){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//     };
//     let resp ={state:false,Description:""};
//     await axios.get(`${Const.product}admin/category/get/detail?key=name&value=${name}`).then(function (response) {
//         // console.log( (response ))
//         let{data,status}= (response );
//         // console.log(data)
//         // console.log(status)
//         // console.log(Result);
//         if (status===200 ){
//             resp = data;
//         }else{
//             resp = "not recognize error";
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }
// //************subCategory
// export async  function  Add_Remove_SubCategory(action,category,subcategory){
//     let headers = {
//         'Token': Const.Token,
//         'Id': Const.ID,
//         "accept": "application/json"
//     };
//     let resp ={state:false,Description:""};
//      await axios.post(`${Const.product}admin/category/sub-category/${action}?category=${category}&sub_category=${subcategory}`, null,{headers: headers}).then(function (response) {
//         console.log(response);
//         // let{State,data}=JSON.parse(response);
//         let{status,data}= response ;
//         console.log(status);
//         console.log( data);
//         if (status===200 ){
//             resp ={state:status,Description:data};
//         }else {
//             resp ={state:status,Description:data};
//         }
//         // resp = status;
//     }).catch(function (error) {
//         console.log(error);
//         resp ={state:false,Description:error.message};
//     });
//     return resp;
// }

// **********Login/Out********
export async  function  Regestry(Data){

    let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    };
    console.log(Data);


    var resp ="";
    await axios.post(`${Const.user}register`, Data, {headers: headers}).then(function (response) {
        console.log(response );
        let {Description}=response.data;
        // let {Items} = response.data;
        resp={state:200,Description:Description};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  GetLogin(phoneNumber){

    let headers = {
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.user}login?phone_number=${phoneNumber}`, {headers: headers}).then(function (response) {
        console.log(response );
        resp={state:200,Description:response.data};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  GetVerifycationCode(phoneNumber){

    let headers = {

        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.admin_route}activation-code?phone_number=${phoneNumber}`, {headers: headers}).then(function (response) {
        console.log(response );
        resp={state:200,Description:response.data};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  ResendVerifycationCode(phoneNumber){

    let headers = {

        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.user}sms/resend?phone_number=${phoneNumber}`, {headers: headers}).then(function (response) {
        console.log(response );
        resp={state:200,Description:response.data};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  Verify(type,phoneNumber,code){

    let headers = {

        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.user}${type}/phone_number/verify?phone_number=${phoneNumber}&code=${code}`, {headers: headers}).then(function (response) {
        console.log(response );
        resp={state:200,Description:response.data};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  LogOut(){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.user}logout`, {headers: headers}).then(function (response) {
        console.log(response );
        resp={state:200,Description:response.data};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
};
export async  function  GetUserDropDown( ){

    let headers = {

        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.user}drop-down`, {headers: headers}).then(function (response) {
        console.log(response );
        resp={state:200,Description:response.data};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}

// **********Content********

export async  function  loadMainCourse( ){

    let headers = {
        'token':Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.ResourceUser}course/courses`, {headers: headers}).then(function (response) {
        // console.log(response );
        resp={state:200,Description:response.data};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else if (response.status===422){
            resp={state:422,Description:response.statusText}
        }else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  loadCourse(id ){

    let headers = {
        'token':Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.ResourceAdmin}course/course/detail?course_id=${id}`, {headers: headers}).then(function (response) {
        // console.log(response );
        resp={state:200,Description:response.data};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else if (response.status===422){
            resp={state:422,Description:response.statusText}
        }else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  AddCourseDetail(Data){

    let headers = {
        'Token': Const.Token,
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
    };
    console.log(Data);


    var resp ="";
    await axios.post(`${Const.ResourceAdmin}course/add`, Data, {headers: headers}).then(function (response) {
        console.log(response );

        // let {Items} = response.data;
        resp={state:200,Description:response.data};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  UpdateCourseDetail(Data){

    let headers = {
        'Token': Const.Token,
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
    };
    console.log(Data);


    var resp ="";
    await axios.put(`${Const.ResourceAdmin}course/update`, Data, {headers: headers}).then(function (response) {
        console.log(response );

        // let {Items} = response.data;
        resp={state:200,Description:response.data};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  DeleteID(Course_id){

    let headers = {
        'Token': Const.Token,
         'accept': 'application/json',
    };
    console.log(Course_id);


    var resp ="";
    await axios.delete(`${Const.ResourceAdmin}course/delete?course_id=${Course_id}`, {headers: headers}).then(function (response) {
        console.log(response );
        let {Description}=response.data;
        // let {Items} = response.data;
        resp={state:200,Description:Description};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}

export async  function  AddFileToCourse(file, Course_id, action){
    let formData = new FormData();
    // actions:schedule_pdf  course_image

    formData.append("file", file);

    let headers = {
        'Token': Const.Token,
        'Id': Const.ID,
     };
    var resp='';

    await axios.post(`${Const.ResourceAdmin}course/content/upload?course_id=${Course_id}&action=${action}`, formData, {headers: headers}).then(function (response) {
        // console.log(response);
        console.log(response );

        resp={state:200,Description:response.data};
     }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        console.log(error.response.statusText);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText.toString()}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp

}







// *************user*****
export async  function  GetUserInfo(phone_number){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.User}admin_route/users/get_user_id?phone_number=${phone_number}`, {headers: headers}).then(function (response) {
        console.log(response );


        resp={state:200,Description:response.data };
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
// ************permission**********
export async  function  GetAllPermission(page_number){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.Liara_Url}permissions/get-all?page=${page_number}`, {headers: headers}).then(function (response) {
        console.log(response );

        let {permissions,page}=response.data;
        resp={state:200,Description:permissions,page:page};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  Getpermission(permission_name){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.Liara_Url}permissions/get?name=${permission_name}`, {headers: headers}).then(function (response) {
        console.log(response );

        // let {permissions }=response.data;
        resp={state:200,Description:response.data };
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  SuggestPermission(name){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.Liara_Url}permissions/drop-down?permission_name=${name}`, {headers: headers}).then(function (response) {
        console.log(response );


        resp={state:200,Description:response.data.data };
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  AddPermission(Data){

    let headers = {
        'Token': Const.Token,
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
    };
    console.log(Data);


    var resp ="";
    await axios.post(`${Const.Liara_Url}permissions/add`, Data, {headers: headers}).then(function (response) {
        console.log(response );
        let {Description}=response.data;
        // let {Items} = response.data;
        resp={state:200,Description:Description};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  DeletePermission(name){
    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };


    let resp ={state:false,Description:""};
    await axios.delete(`${Const.Liara_Url}permissions?name=${name}`, {headers: headers}).then(function (response) {
        console.log(response);
        let{status,data}= response ;
        console.log(status);
        console.log( data);

            resp ={state:status,Description:data};

            resp ={state:status,Description:data};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;



}

// **********role*********
export async  function  GetAllRole(page_number){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.Liara_Url}role/get-all?page=${page_number}`, {headers: headers}).then(function (response) {
        console.log(response );
        let {roles,page}=response.data;
        resp={state:200,Description:roles,page:page};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  Getrole(role_name){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.Liara_Url}role/get?role_name=${role_name}`, {headers: headers}).then(function (response) {
        console.log(response );

        // let {permissions }=response.data;
        resp={state:200,Description:response.data };
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  AddRole(Data){

    let headers = {
        'Token': Const.Token,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    console.log(Data);


    var resp ="";
    await axios.post(`${Const.Liara_Url}role/add`, Data, {headers: headers}).then(function (response) {
        console.log(response );
        let {Description}=response.data;
        // let {Items} = response.data;
        resp={state:200,Description:Description};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  updateRole(Data){

    let headers = {
        'Token': Const.Token,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    console.log(Data);


    var resp ="";
    await axios.put(`${Const.Liara_Url}role/permissions/update`, Data, {headers: headers}).then(function (response) {

        let {Description}=response.data;
        // let {Items} = response.data;
        resp={state:200,Description:Description};

    }).catch(function (error) {

        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  DeleteRole(name){
    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };


    let resp ={state:false,Description:""};
    await axios.delete(`${Const.Liara_Url}role/delete?role_name=${name}`, {headers: headers}).then(function (response) {
        console.log(response);
        let{status,data}= response ;
        console.log(status);
        console.log( data);

        resp ={state:status,Description:data};

        resp ={state:status,Description:data};

    }).catch(function (error) {
        console.log(error);
        // console.log(error.response.data.detail[0]['Name']);
        // resp ={state:false,Description:error.response.data.detail[0]['Name']};
        resp='error'
    });
    return resp;



}
export async  function  SuggestRole(name){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.Liara_Url}role/drop-down?role_name=${name}`, {headers: headers}).then(function (response) {
        console.log(response );


        resp={state:200,Description:response.data.data };
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}

// *************User-Role********
export async  function  AddUserRole(Data){

    let headers = {
        'Token': Const.Token,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    console.log(Data);


    var resp ="";
    await axios.post(`${Const.Liara_Url}user_role_permission/add`, Data, {headers: headers}).then(function (response) {
        console.log(response );

        // let {Items} = response.data;
        resp={state:200,Description:response.data};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  GetAllUserRole(page_number){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.Liara_Url}user_role_permission/get-all?page=${page_number}`, {headers: headers}).then(function (response) {
        console.log(response );
        let {user_role_permissions,page}=response.data;
        resp={state:200,Description:user_role_permissions,page:page};
     }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  GetUserRole(user_id){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };

    var resp ="";
    await axios.get(`${Const.Liara_Url}user_role_permission?user_id=${user_id}`, {headers: headers}).then(function (response) {
        console.log(response );

        // let {permissions }=response.data;
        resp={state:200,Description:response.data };
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}

// *************Trusted-service********
export async  function  AddTrustedService(Data){

    let headers = {
        'Token': Const.Token,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
    console.log(Data);


    var resp ="";
    await axios.post(`${Const.Liara_Url}trusted_service/add`, Data, {headers: headers}).then(function (response) {


        // let {Items} = response.data;
        resp={state:200,Description:response.data};

    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        }else if (response.status===422){
            resp={state:422,Description:response.statusText}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  GetAllTrustedService(page_number){

    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };
    var resp ="";
    await axios.get(`${Const.Liara_Url}trusted_service/get-all?page=${page_number}`, {headers: headers}).then(function (response) {
        console.log(response );
        let {trusted_services,page}=response.data;
        resp={state:200,Description:trusted_services,page:page};
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        let {response}=error;
        if (response===undefined){
            resp={state: 400,Description: error.message}
        } else{
            resp={state:response.status||400,Description:response.data.detail||error.message}
        }
    });
    return resp;
}
export async  function  DeleteTrustedService(name){
    let headers = {
        'Token': Const.Token,
        'accept': 'application/json'
    };
    let resp ={state:false,Description:""};
    await axios.delete(`${Const.Liara_Url}trusted_service/remove?service_name=${name}`, {headers: headers}).then(function (response) {
        console.log(response);
        let{status,data}= response ;
        resp ={state:status,Description:data};
    }).catch(function (error) {
        console.log(error);
        // console.log(error.response.data.detail[0]['Name']);
        // resp ={state:false,Description:error.response.data.detail[0]['Name']};
        resp='error'
    });
    return resp;



}
