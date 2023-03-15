import React from 'react';
import {Link} from 'react-router-dom';
import './QuickDisplay.css'

const listMeal = ({mealData}) =>{
    if(mealData){
        return mealData.map((item)=>{
            return(
                <Link to={`/Listing/${item.mealtype_id}`} key={item.mealtype_id}>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                            <div className="tileContainer">
                                <div className="tileComponent1">
                                    <img src={item.meal_image} alt="Meal"/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                        {item.mealtype}
                                    </div>
                                    <div className="componentSubHeading">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                </Link>
            )
        }
    )}

}

const QuickDisplay = (props) =>{
    return(
        <>
            {listMeal(props)}
        </>
    )
}

export default QuickDisplay