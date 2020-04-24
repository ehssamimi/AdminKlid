import React, {useState, useEffect} from 'react';
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import {formatNumber} from "../../../functions/componentHelpFunction";
import {Link} from "react-router-dom"
import cookie from "react-cookies";



const CourseCarsBuy = (props) => {

    let{img,title,course,grade,button,cost,sellCost,sub_text,id}=props;
    console.log(img);
    const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API

        document.title = `You clicked ${count} times`;
    });
    const handelAddCourse=()=>{

        console.log("we bought this course")
    };

    return (

        <Card  className= "m-2 br20px h-100 h-min-24vw  box-shadow-custom" >


            <CardMedia
                className={props.class}
                image={img}
                title="Course Section"
            />
            <CardContent>
                <div className="row col-12">
                    <span className="header-color">{ title}</span>
                    <div className="d-inline-block ml-auto ">
                        <div className="d-flex flex-column">
                            <span className="header-color">{ formatNumber((cost))}</span>
                            <span className="  red-color  text-decoration-line-through">{ formatNumber(sellCost ) }</span>
                        </div>

                    </div>

                </div>

                <div >
                    <span className="second-color">{course} </span>
                    <span> {grade? "|"+ grade:""} </span>

                </div>


            </CardContent>

            <CardActions className="w-100 d-flex justify-content-center">
                <Button className="btn green-background text-white col-6 fontFamily-Sans sendButton-shadow" onClick={handelAddCourse}>
                    {button}
                </Button>
            </CardActions>
            <div className="d-flex justify-content-center">
                {
                    sub_text?  <Link to={`/courses/${id}`}  className="pt-4"> {sub_text } </Link>:""
                }

            </div>
        </Card>

    );
};

export default CourseCarsBuy;