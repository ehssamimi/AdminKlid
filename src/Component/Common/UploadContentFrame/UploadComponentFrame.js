import React, {Component} from 'react';
import Iframe from 'react-iframe';
import $ from "jquery";



class UploadComponentFrame extends Component {

    constructor(props) {
        super(props);
        this.state={
            URL:"https://upload.liara.run/?action=item_audio",
            action:""
        }
    }
    // "course_id":this.props.id,"lesson_name":this.props.Lesson_name,"teacher_name":

    static getDerivedStateFromProps(props, state) {
        if (props.action !== state.action) {
            let URL = `https://upload.liara.run/?action=${props.action}`;

            if (props.ListData.course_id) {
                URL = URL + `&&file_name=&&course_id=${props.ListData.course_id}`;
            }
            if (props.ListData.lesson_name) {
                URL = URL + `&&lesson_name=${props.ListData.lesson_name}`;
            }
            if (props.ListData.teacher_name) {
                URL = URL + `&&teacher_name=${props.ListData.teacher_name}`;
            }
            if (props.ListData.chapter_name) {
                URL = URL + `&&chapter_name=${props.ListData.chapter_name}`;
            }
            if (props.ListData.item_name) {
                URL = URL + `&&item_name=${props.ListData.item_name}`;
            }

            return {
                action: props.action,
                URL,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    //
    // componentDidUpdate(props) {
    //
    //     if (props.action !== this.state.action) {
    //         let URL = `https://upload.liara.run/?action=${props.action}&&file_name=&&course_id=${props.ListData.course_id}`;
    //         if (props.ListData.lesson_name) {
    //             URL = URL + `&&lesson_name=${props.ListData.lesson_name}`;
    //         }
    //         if (props.ListData.teacher_name) {
    //             URL = URL + `&&teacher_name=${props.ListData.teacher_name}`;
    //         }
    //         if (props.ListData.chapter_name) {
    //             URL = URL + `&&chapter_name=${props.ListData.chapter_name}`;
    //         }
    //         if (props.ListData.item_name) {
    //             URL = URL + `&&item_name=${props.ListData.item_name}`;
    //         }
    //         this.setState({
    //             URL,action:props.action
    //         });
    //
    //
    //         console.log("URL");
    //         console.log(URL);
    //     }
    // }






    render() {
        return (
            <div>
                {/*<Iframe url="https://upload.liara.run/?action=item_audio&&file_name=&&course_id=5ea9c1901314a6b4f5d06bbd&&lesson_name=%D9%81%DB%8C%D8%B2%DB%8C%DA%A9&&teacher_name=%D8%A7%D8%B3%D8%AA%D8%A7%D8%AF%20%D8%AF%D8%A7%D9%88%D9%88%D8%AF%20%D9%85%D8%AD%D9%85%D9%88%D8%AF%DB%8C&&chapter_name=%DA%A9%D8%A7%D8%B1%20%D9%88%20%D8%A7%D9%86%D8%B1%DA%98%DB%8C&&item_name=1"*/}



                <Iframe url={this.state.URL}
                        width="100%"
                        height="350px"
                        id="Iframe"
                        className="myClassname"
                        display="initial"
                        position="relative"/>
            </div>
        );
    }
}

export default UploadComponentFrame;