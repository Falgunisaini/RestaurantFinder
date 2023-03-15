import React,{Component} from 'react';
import axios from 'axios';
import ListingDisplay from './listingDisplay';
import Header from '../../header'
import './listing.css';
import CuisineFilter from '../filters/CuisineFilter'
import CostFilter from '../filters/CostFilter';
import SortFilter from '../filters/SortFilter'

const url="https://foodscapenodeapi-production.up.railway.app/restaurants?mealtype_id="

class Listing extends Component{
    constructor(props){
        super(props);

        this.state={
            restaurantList:''
        }
    }

    setDataPerFilter = (data) =>{
        this.setState({restaurantList:data})
    }

    render(){
        return(
            <>
                <Header/>
                <div className="row" id="ListingComp1">
                    <div id="mainListing">
                        <div id="filter">
                            <center>
                                <h3>Filter</h3>
                            </center>
                            &nbsp;
                            <CuisineFilter mealId={this.props.match.params.mealId}
                            restaurantPerCuisine = { (data)=>{this.setDataPerFilter(data)} } />

                            <CostFilter mealId={this.props.match.params.mealId}
                            restaurantPerCost = { (data)=>{this.setDataPerFilter(data)} } />
                            
                            <SortFilter mealId={this.props.match.params.mealId}
                            restaurantPerSort = { (data)=>{this.setDataPerFilter(data)} } />
                        </div>
                        <ListingDisplay listData={this.state.restaurantList}/>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount(){
        let mealid = this.props.match.params.mealId;
        sessionStorage.setItem('mealId',mealid)
        axios.get(`${url}${mealid}`)
        .then((res)=>{
            this.setState({restaurantList:res.data});
        })
    }
}

export default Listing