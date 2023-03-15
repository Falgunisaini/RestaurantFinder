import React,{Component} from 'react';
import axios from 'axios';

const url = "https://foodscapenodeapi-production.up.railway.app/filter"

class CostFilter extends Component{

    filterCost = (event) =>{
        let Cost = (event.target.value).split('-');
        let lcost = Cost[0];
        let hcost = Cost[1];
        let mealId = this.props.mealId;
        let CostUrl = "";

        if(event.target.value === ""){
            CostUrl = `${url}/${mealId}`
        }
        else{
            CostUrl = `${url}/${mealId}?lcost=${lcost}&hcost=${hcost}`
        }
        axios.get(CostUrl)
        .then((res) => {this.props.restaurantPerCost(res.data)}
        )
    }

    render(){
        return(
            <div id="costDiv">
                <center>
                    <h4 id="filterSubHeading">Cost</h4>
                </center>
                <div style={{marginLeft:'15%'}} onChange={this.filterCost}>
                    <label className="radio">
                        <input type="radio" value="" name="Cost"/>All
                    </label>
                    <label className="radio">
                        <input type="radio" value="99-399" name="Cost"/>Rs. 99-399
                    </label>
                    <label className="radio">
                        <input type="radio" value="399-699" name="Cost"/>Rs. 399-699
                    </label>
                    <label className="radio">
                        <input type="radio" value="699-999" name="Cost"/>Rs. 699-999
                    </label>
                    <label className="radio">
                        <input type="radio" value="999-1599" name="Cost"/>Rs. 999-1599
                    </label>
                </div>
            </div>
        )
    }
}

export default CostFilter