import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Footer from './footer';
import Home from './component/Home/Home';
import Listing from './component/Listing/Listing';
import Details from './component/Details/restaurantDetails';
import ViewOrder from './component/bookings/viewOrder';
import placeOrder from './component/bookings/placeOrder';
import Login from './component/login/login';
import Register from './component/login/register'

const Router = () =>{
    return(
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/Listing/:mealId" component={Listing}/>
                <Route path="/details" component={Details}/>
                <Route path="/viewOrder" component={ViewOrder}/>
                <Route path="/placeOrder/:restName" component={placeOrder}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default Router