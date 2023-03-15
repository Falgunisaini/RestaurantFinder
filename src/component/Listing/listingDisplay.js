import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';

const ListingDisplay = (props) => {

    const renderData = ({ listData }) => {
        if (listData) {
            if (listData.length > 0) {
                return listData.map((item) => {
                    return (
                        <div className="itemDiv" key={item.restaurant_id}>
                            <div className="row">
                                <div className="col-md-5">
                                    <img src={item.restaurant_thumb} className="itemImage" alt={item.restaurant_name} />
                                </div>
                                <div className="col-md-7" id="contentDiv">
                                    <div className="restaurant_name">
                                        <Link to={`/details?restId=${item.restaurant_id}`}>{item.restaurant_name}</Link>
                                        <h4 className="city_name">{item.address}</h4>
                                        <h4 className="rating">{item.rating_text}</h4>
                                        <h4 className="cost">Rs. {item.cost}</h4>

                                        <div className="labelDiv">
                                            {
                                                item.mealTypes.map((mealitem, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <span className="label label-success">
                                                                {mealitem.mealtype_name}
                                                            </span>
                                                            &nbsp;
                                                        </Fragment>
                                                    )
                                                })

                                            }
                                            
                                            <br/>

                                            {
                                                item.cuisines.map((cuisineitem, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <span className="label label-danger">
                                                                {cuisineitem.cuisine_name}
                                                            </span>
                                                            &nbsp;
                                                        </Fragment>
                                                    )
                                                })

                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            else {
                return (
                    <h2>No Data Found For This Filter!</h2>
                )
            }
        } else {
            return (
                <>
                    {/* <img src="/images/loader.gif" alt="loader" border="0"/> */}
                    <h1 id="loading">Loading....</h1>
                </>
            )
        }
    }

    return (
        <div id="content">
            {renderData(props)}
        </div>
    )

}

export default ListingDisplay