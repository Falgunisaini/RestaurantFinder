import React,{Component} from 'react';
import axios from 'axios';

const url= "https://foodscapenodeapi-production.up.railway.app/filter"

class SortFilter extends Component{

    filterSort = (event) =>{
        let sortId = event.target.value;
        let mealId = this.props.mealId;
        let SortUrl = "";
        if(sortId === ""){
            SortUrl = `${url}/${mealId}`
        }
        else{
            SortUrl = `${url}/${mealId}?sort=${sortId}`
        }
        axios.get(SortUrl)
        .then((res) => {this.props.restaurantPerSort(res.data)}
        )
    }

    render(){
        return(
            <div id="sortDiv">
                <center>
                    <h4 id="filterSubHeading">Sort</h4>
                </center>
                <div style={{marginLeft:'15%'}} onChange={this.filterSort}>
                    <label className="radio">
                        <input type="radio" value="1" name="cuisine"/>Low to High
                    </label>
                    <label className="radio">
                        <input type="radio" value="-1" name="cuisine"/>High to Low 
                    </label>
                </div>
            </div>
        )
    }
}

export default SortFilter