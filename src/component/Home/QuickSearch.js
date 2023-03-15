import React,{Component} from 'react';
import './QuickSearch.css'
import QuickDisplay from './QuickDisplay'
// import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';

const url = "https://foodscapenodeapi-production.up.railway.app/mealType";

class QuickSearch extends Component{
    constructor(props){
        super(props);

        this.state={
            mealType:''
        }
    }

    render() {
        return(
            <div id="quickSearch">
                <span id="quickHeading">
                    Quick Search
                </span>
                <span id="quickSubHeading">
                    Discover Restaurants by meal
                </span>
                <QuickDisplay mealData={this.state.mealType} />
            </div>
        )
    }

    // Api call on page load
    componentDidMount(){
        fetch(url,{method:'GET'})
        .then((res)=>res.json())
        .then((data) =>{
            this.setState({mealType:data})
        })
    }

}

export default QuickSearch

