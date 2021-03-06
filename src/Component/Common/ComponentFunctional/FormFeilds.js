import {FormGroup, Label} from "reactstrap";
import {Field, Form, Formik} from "formik";
import React from "react";
import {
    FormikCustomCheckboxGroup,
    FormikCustomRadioGroup,
    FormikReactSelect
} from "../../../containers/form-validations/FormikFields";

export  function FormInput(props) {
    let{label,name,placeHolder,setFieldTouched,errors,touched,type,component,row,DivClass}=props;
    return<div className={DivClass}>

    <FormGroup className="form-group has-float-label position-relative">
        <Label>
            <span>{label}</span>
        </Label>
        <Field className="form-control" name={name}   onBlur={setFieldTouched} type={type}
               component={component}
               rows={row}
               placeholder={placeHolder} />
        {errors[`${name}`]  && touched[`${name}`] ? (
            <div className="invalid-feedback d-block">
                {errors[`${name}`]}
            </div>
        ) : null}
    </FormGroup>
    </div>
}
export function FormSelect(props) {

    let{label,name,setFieldValue,setFieldTouched,errors,touched,option,values,DivClass}=props;
   return<div className={DivClass}>
       <FormGroup className="form-group has-float-label br20px">
       <Label>
           <span>{label}</span>
       </Label>
       <FormikReactSelect
           name={name}
           id={name}
           value={values[`${name}`]}
           options={option}
           onChange={setFieldValue}
           onBlur={setFieldTouched}
           // className="br20px"
       />
       {errors[`${name}`]  && touched[`${name}`] ? (
           <div className="invalid-feedback d-block">
               {errors[`${name}`]}
           </div>
       ) : null}
   </FormGroup>
   </div>
}
export function FormCheckBox(props) {

    let{label,name,setFieldValue,setFieldTouched,errors,touched,option,values,DivClass}=props;

   return<div className={DivClass}>
       <FormGroup className="error-l-175">
           <Label className="d-block">{label}</Label>
           <FormikCustomRadioGroup
               inline
               name={name}
               id={name}
               label={label}
               value={values[`${name}`]}
               onChange={setFieldValue}
               onBlur={setFieldTouched}
               options={option}
           />
           {errors[`${name}`]  && touched[`${name}`] ? (
               <div className="invalid-feedback d-block">
                   {errors[`${name}`]}
               </div>
           ) : null}
       </FormGroup>

   </div>
}


