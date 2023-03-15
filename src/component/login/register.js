import React,{Component} from 'react';
import Header from '../../header'

const url = "https://foodscapejwt-production.up.railway.app/api/auth/register"

class Register extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            name:'',
            phone:'',
            email:'',
            password:''
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
        .then(this.props.history.push('/'))
    }


    render(){
        return(
            <>
                <Header/>
                <div className="container">
                    <br/>
                    <div className="panel panel-primary">
                        
                        <div className="panel panel-heading">
                            Register Form
                        </div>

                        <div className="panel panel-body">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label form="form-control" for="name">Name</label>
                                        <input className="form-control" id="name" type="text" name="name" onChange={this.handleChange} value={this.state.name}></input>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label form="form-control" for="phone">Phone No.</label>
                                        <input className="form-control" id="phone" name="phone" onChange={this.handleChange} value={this.state.phone}></input>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label form="form-control" for="email">Email</label>
                                        <input className="form-control" id="email" type="email" name="email" onChange={this.handleChange} value={this.state.email}></input>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label form="form-control" for="password">Password</label>
                                        <input className="form-control" id="password" type="password" name="password" onChange={this.handleChange} value={this.state.password}></input>
                                    </div>
                                </div>
                            </div>

                            <center>
                                <button className="btn btn-success" onClick={this.handleSubmit} style={{width:"20%"}}>Register</button>
                            </center>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Register