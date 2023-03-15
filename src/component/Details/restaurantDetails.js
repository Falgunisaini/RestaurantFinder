import axios from 'axios';
import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import MenuDisplay from './menuDisplay';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './details.css';
import Header from '../../header'

const url="https://foodscapenodeapi-production.up.railway.app/details"
const menu_url="https://foodscapenodeapi-production.up.railway.app/menu"

class Details extends Component{

    constructor(props){
        super(props);
        console.log("PROPS>>", props)

        this.state={
            details:'',
            menuList:'',
            userItems:'',
            mealId: sessionStorage.getItem('mealId')
        }
    }

    addToCart = (data1,data2) =>{
        console.log("DATA>>>>",data1)
        console.log("DATA>>>>",data2)
        sessionStorage.setItem("quantity",JSON.stringify(data2))
        this.setState({ userItems: data1,quantity:data2 });
    }


    proceed = () => {
        sessionStorage.setItem('menu', JSON.stringify(this.state.userItems))
        this.props.history.push(`/placeOrder/${this.state.details.restaurant_name}`)
    }

    render(){
        let {details} = this.state;
        return(
            <>
                <Header/>
                <div className="displayMain">
                    <div className="tileImage">
                        <div className="imageClass">
                            <img src={details.restaurant_thumb} alt={details.restaurant_name}/>
                        </div>
                    </div>
                    <div className="tileContent">
                        <div id="restContent">
                            <h1 id="restName">{details.restaurant_name}</h1>
                            <span id="cfeedback">205 Customer Reviews</span>
                            <h4>Old Price: <strike>Rs. 1350</strike></h4>
                            <h4>New Price: Rs. {details.cost}</h4>
                            <h3>We Provide Best Service!</h3>
                            <div>
                                <div className="icons">
                                    <img src="https://i.ibb.co/2FbpqtH/sentizied.jpg" alt="santizied"/>
                                </div>
                                <div className="icons">
                                    <img src="https://i.ibb.co/9GxKrXY/home-delivery.png" alt="home_delivery"/>
                                </div>
                            </div>
                            <div id="tabs">
                                <Tabs>
                                    <TabList>
                                        <Tab>Details</Tab>
                                        <Tab>Contact</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <h2>{details.restaurant_name}</h2>
                                        <p>
                                            <b>{details.restaurant_name}</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                        </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Address: {details.address}</p>
                                        <p>Contact Number: {details.contact_number}</p>
                                    </TabPanel>
                                </Tabs>
                                <Link to={`/listing/${this.state.mealId}`} className="btn btn-danger">
                                    Back
                                </Link> &nbsp;
                                <button className="btn btn-success" onClick={this.proceed}>Proceed</button>
                            </div>
                        </div>
                    </div>
                    <MenuDisplay menuData={this.state.menuList} finalOrder={(data1,data2)=>{this.addToCart(data1,data2)}}/>
                </div>
            </>  
        )
    }

    async componentDidMount(){
        let restid = this.props.location.search.split('=')[1];
        let response = await axios.get(`${url}/${restid}`)
        let mealData = await axios.get(`${menu_url}/${restid}`)
        this.setState({details:response.data[0],menuList:mealData.data})
    }

}

export default Details