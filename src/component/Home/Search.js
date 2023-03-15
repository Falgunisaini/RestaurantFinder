import React,{Component} from 'react';
import './Search.css'
import {withRouter} from 'react-router-dom'

const lurl = "https://foodscapenodeapi-production.up.railway.app/location";
const rurl= "https://foodscapenodeapi-production.up.railway.app/restaurants?state_id="

class Search extends Component{

    constructor(props){
        super(props);

        this.state={
            location:'',
            restData:''
        }
    }

    renderCity = (data) =>{
        if(data){
            return data.map((item)=>{
                return(
                    <option value={item.state_id} key={item.state_id}>{item.state}</option>
                )
            })
        }
        
    }

    renderRest = (data) =>{
        if(data){
            console.log("renderRest",data)
            return data.map((item)=>{
                return(
                    <option value={item.restaurant_id} key={item.restaurant_id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                )
            })
        }
        
    }

    handleCity = (event) =>{
        let stateId = event.target.value;
        fetch(`${rurl}${stateId}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.setState({restData:data})
            console.log("handleCity api", data)
        })
    }

    handleRest = (event) =>{
        let restId = event.target.value;
        console.log("Handle rest Id", restId)
        this.props.history.push(`/details?restId=${restId}`)
    }

    render() {
        return(
            <>
                <div id="search">
                    <div id="logo">
                        <span>FS!</span>
                    </div>
                    <div id="headline">
                        <h2>Find The Best Restaurant Near You!</h2>
                    </div>
                    <div id="dropdown">
                        <select id="city" onChange={this.handleCity} style={{borderRadius:'5%'}}>
                            <option>Select City</option>
                            {this.renderCity(this.state.location)}
                        </select>
                        &nbsp;
                        <select className="restaurant" id="hotels" onChange={this.handleRest} style={{borderRadius:'5%'}}>
                            <option>Select Restaurant</option>
                            {this.renderRest(this.state.restData)}
                        </select>
                    </div>              
                </div>

                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="https://i.ibb.co/wcFH3SJ/katherine-sousa-ln2-R1w-J8-TCM-unsplash.jpg" alt="carouselImage" id="sliderImg1"/>
                        </div>
                        <div className="item">
                            <img src="https://i.ibb.co/pKkGtgr/charlesdeluvio-D-v-DQMTf-AAU-unsplash.jpg" alt="carouselImage" id="sliderImg2"/>
                        </div>   
                        <div className="item">
                            <img src="https://i.ibb.co/sy2rRzh/hermes-rivera-Ww8e-QWj-MJWk-unsplash.jpg" alt="carouselImage" id="sliderImg3"/>
                        </div>
                    </div>

                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </>
        )
    }

    // To call api on page load
    componentDidMount(){
        fetch(lurl,{method:'GET'})
        .then((res) => res.json())
        .then((data)=>{
            this.setState({location:data})
        })
    }
}

export default withRouter(Search)