import NotificationManager from "../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";

export const error_Notification=(state,Description)=>{
    return NotificationManager.error(
        state,
        Description,
        3000,
        null,
        null,
        "error"
    );
};
export const success_Notification=(Response)=>{
    return NotificationManager.success(
        "تبریک",
        Response,
        3000,
        null,
        null,
        "success"
    );
};

// *****show all product***
export const getProductList=(Products)=>{
    let productSeparate=[];
    Products.map((each, index) => {
        let sub = {"تعداد": each['Count'],"تولید": each['Manufacture'],"دسته بندی": each['Category'] };
        let Main = {
            "name": each['Name'],
            "Attribute": each['Attribute'],
            "Description": each['Description'],
            "PrevPrice": each['PrevPrice'],
            "CurrentPrice": each['CurrentPrice'],
            "Images": each['Images'][0],
            "ViewCount": each['ViewCount'] ,
            "Off": each['Off'],
            "id":each['_id']
        };
        let row={'Main':Main,'sub':sub};
        productSeparate.push(row)
    });
    return productSeparate;
};

export function categoryDetails (categories) {
    let CategoryOption=[];let Subs={};
    categories.map((each, index) => {
        CategoryOption.push({value: each.name, label: each.name});
        let SubCatCondition = each.sub_categories !== undefined ?
            // ******** this function add sub category in array
            LabelValueOption(each.sub_categories)
            :[{ value:"زیر دسته بندی نداریم ", label: "we have not sub category" }] ;
        Subs[each.name]=SubCatCondition;
    });
    return{
        cat:CategoryOption,
        subCat:Subs
    }
}

            // *****set error*****
export function set_error(condition,error_message) {

    if (condition === '') {
        return{
            validate:false,error:error_message
        }
    }else {
        return{
            validate:true,error: ""
        }
    }
}

// *****GetDate******
export const GetData=(Data)=>{
    if (Data!==null){
        return `${Data.year}/${Data.month}/${Data.day}`;

    }else {
        return null
    }
};
// ************ Label-Value-Option*********
export const LabelValueOption=(sub)=>{
        let SubCat=[];
        sub.map((each,index)=>{
            let subRow= { value: each , label: each  };
            SubCat.push(subRow);
        });
        return SubCat;
}
// *************Remove item**********
export const RemoveItem=(id)=>{
    const $el = document.getElementById(id);
    const duration = 2;
    const from = { opacity: 0};
    TweenMax.to($el, duration, from);
    return setTimeout(() => {
        $el.remove();
    }, 2000)
};
// *************permission option******
export const PermissionOptions=(sub)=>{
    let SubCat=[];
    sub.map((each,index)=>{
        // let subRow= { value: each , label: each  };
        let subRow= {permission_name: each, description: each };
        SubCat.push(subRow);
    });
    return SubCat;
}
export const permissionOptionReverse=(sub)=>{
    let SubCat=[];
    sub.map((each,index)=>{
        // let subRow= { value: each , label: each  };
        let subRow= each.permission_name;
        SubCat.push(subRow);
    });
    return SubCat;
}
// *************Role option******
export const RoleOptions=(sub)=>{
    let SubCat=[];
    sub.map((each,index)=>{
        // let subRow= { value: each , label: each  };
        let subRow= {role_name: each, description: each };
        SubCat.push(subRow);
    });
    return SubCat;
}
export const roleOptionReverse=(sub)=>{
    let SubCat=[];
    sub.map((each,index)=>{
        // let subRow= { value: each , label: each  };
        let subRow= each.role_name;
        SubCat.push(subRow);
    });
    return SubCat;
}

export const   validatephoneNumber=(phonenumber) =>{
    var re = /^(\+98|0)?9\d{9}$/;
    return re.test(phonenumber);
}
export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export function gregorian_to_jalali(g_y, g_m, g_d) {
    function div(a, b) {
        return parseInt((a / b));
    }

    var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    var jalali = [];
    var gy = g_y - 1600;
    var gm = g_m - 1;
    var gd = g_d - 1;

    var g_day_no = 365 * gy + div(gy + 3, 4) - div(gy + 99, 100) + div(gy + 399, 400);

    for (var i = 0; i < gm; ++i)
        g_day_no += g_days_in_month[i];
    if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)))
    /* leap and after Feb */
        g_day_no++;
    g_day_no += gd;

    var j_day_no = g_day_no - 79;

    var j_np = div(j_day_no, 12053);
    /* 12053 = 365*33 + 32/4 */
    j_day_no = j_day_no % 12053;

    var jy = 979 + 33 * j_np + 4 * div(j_day_no, 1461);
    /* 1461 = 365*4 + 4/4 */

    j_day_no %= 1461;

    if (j_day_no >= 366) {
        jy += div(j_day_no - 1, 365);
        j_day_no = (j_day_no - 1) % 365;
    }
    for (  i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i)
        j_day_no -= j_days_in_month[i];
    var jm = i + 1;
    var jd = j_day_no + 1;
    jalali[0] = jy;
    jalali[1] = jm;
    jalali[2] = jd;
    return jalali;
    //return jalali[0] + "_" + jalali[1] + "_" + jalali[2];
    //return jy + "/" + jm + "/" + jd;
}
export function convertBaseData(data) {
    let eng_data = data.slice(0, 10);
    let eng_array = eng_data.split("-");
    let persian_array = gregorian_to_jalali(eng_array[0],eng_array[1],eng_array[2]);
    return persian_array.join("-") ;
    // console.log(eng_data);
    // console.log(eng_array);
}
