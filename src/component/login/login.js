import React,{Component} from 'react';
import Header from '../../header';

const url = "https://foodscapejwt-production.up.railway.app/api/auth/login"

class Login extends Component{

    constructor(props){
        super(props);

        this.state={
            email:'',
            password:'',
            message:''
        }
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit = () =>{
        fetch(url,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((res) => res.json())
        .then((data)=>{
            if(data.auth === false){
                this.setState({message:data.token})
            }
            else{
                sessionStorage.setItem('LoginToken', data.token);
                this.props.history.push('/')
            }
        })
    }

    render(){
        return(
            <>
                <Header/>
                <div className="container">
                    <br/>
                    <div className="panel panel-primary">

                        <div className="panel panel-heading">
                            Login Form
                        </div>

                        <div className="panel panel-body">
                            <h3 style={{color:'red'}}>{this.state.message}</h3>
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label form="form-control" for="email">Email</label>
                                        <input className="form-control" id="email" type="email" name="email" onChange={this.handleChange}></input>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label form="form-control" for="email">Password</label>
                                        <input className="form-control" id="password" type="password" name="password" onChange={this.handleChange}></input>
                                    </div>
                                </div>
                            </div>
                            <center>
                                <button className="btn btn-success" onClick={this.handleSubmit} style={{width:"10%"}}>Login</button>
                            </center>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login