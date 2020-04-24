import React, {Component} from 'react';
export const UserContext=React.createContext() ;




class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:'ehsan',
            isLogIn:!!localStorage.getItem("Login"),
            HandelLogin : () => {
                localStorage.setItem('Login', true);
                this.setState({
                    name:'',
                    isLogIn:true
                })

            }
        }
    }





    render() {
        return (

                <UserContext.Provider value={this.state}>
                    {this.props.children}
                </UserContext.Provider>


        );
    }
}

export default UserProvider;
/// <UserContext.Provider value={{ user:this.state,logout:this.HandelLogOut }}>