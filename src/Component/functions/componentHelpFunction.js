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
        "موفق شدید",
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
    if ( sub!==undefined&&sub.length>0) {

        let SubCat=[];
        sub.map((each,index)=>{
            let subRow= { value: each , label: each  };
            SubCat.push(subRow);
        });
        return SubCat;
    }else {
        return [];
    }

}
export const AutoSuggestUsers=(sub)=>{

        let SubCat=[];
        sub.map((each,index)=>{
            let simpleName=each.name+"("+each.phone_number+")";
            let subRow= { name:each.name + each.phone_number  , value: each.id  };
            SubCat.push(subRow);
        });
        return SubCat;
}
export const AutoSuggestNameVAlue =(sub)=>{
        let SubCat=[];
        sub.map((each,index)=>{
            let subRow= { name: each , value: each  };
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
export const getProfileValue=(data)=>{
    let{profile,personal_info,education,parent,address,personal_schedule}=data;

    return ({
        "name": personal_info.name,
        "profile_img":profile.image_id,
        "phoneNumber":personal_info.phone_number,
        "ID": personal_info.ssn,
        "class":  education.grade,
        "fields": education.field,
        "average_num": education.gpa,
        "schoolName": education.school_name,
        "Schoolkind":education.school_type,
        "country": address.province,
        "city": address.city,
        "parent_name": parent.name,
        "parent_num": parent.phone_number,
        "parent_verify":parent['verify'],
        "personal_code": data.code.code,
        "is_used": data.code.is_used,
        "parent_code":parent.code!==null?parent.code.code:"--",
        "personal_schedule": personal_schedule
    } )
}
export const LabelValueSingle=(value)=>{

    return { value: value , label: value  };
}
export const RemoveElement=(id)=>{

    const $el = document.getElementById(`${id}`);
    $el.classList.add("opacity-0")
    const duration = 2;
    const from = { opacity: 0};
    TweenMax.to($el, duration, from);
    setTimeout(() => {
        $el.remove();
    }, 2000)
}

// code: {code: 9721, create_at: "2020-05-04T11:32:56.059000", is_used: true}
// create_at: "2020-04-19T21:20:33.475000"
// education: {grade: "نهم", field: "ریاضی فیزیک", gpa: 18, school_name: "شهید بهشتی", school_type: "تیزهوشان"}
// email: {email: null, is_active: false}
// institute_info: {our_student: false}
// is_active: true
// parent: {code: {…}, name: "محمد", phone_number: "09112571484"}
// personal_schedule:
//     request_at: "2020-04-19T21:20:33.475000"
// request_schedule: false
// schedule: "https://5e7df4522174ce0011232b00.liara.space/user-service/system/personal_schedule/5ea0132cd8cbe2eb0b7e2361/None?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=11CAOPNDQWXGU8FVAUF2J%2F20200509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200509T080121Z&X-Amz-Expires=25200&X-Amz-SignedHeaders=host&X-Amz-Signature=9eec2843355b25b9656a99564d26c9e5feaa44e23868cca9ff794ac4df593692"
// __proto__: Object
// profile: {image_id: "https://5e7df4522174ce0011232b00.liara.space/user-…74d33933f8ec845e0d5413afbd61d618c06958a5fc6d1254d"}