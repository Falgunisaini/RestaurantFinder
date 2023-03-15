import React,{Component} from 'react';

class MenuDisplay extends Component{
    orderId=[];
    
    addItem = (id) =>{
        this.orderId.push(id)
        let quantity = {}
        this.orderId.reduce((item, curr) => {
            console.log("Item>>>",item)
            console.log("Curr>>>",curr)
            if (item[curr]) {
                item[curr] = ++item[curr]
            } else {
                item[curr] = 1
            }

            return item
        }, quantity)
        this.props.finalOrder(this.orderId,quantity);
    }

    removeItem = (id) =>{
        if(this.orderId.indexOf(id) > -1){
            this.orderId.splice(this.orderId.indexOf(id),1)
        }
        this.props.finalOrder(this.orderId)
    }

    renderCart = (orders) =>{
        if(orders){
            return orders.map((item, index)=>{
                return(
                    <b key={index}>{item} &nbsp; </b>
                )            
            })
        }
    }

    renderMenu = ({menuData}) =>{
        if(menuData){
            console.log(menuData)
            return menuData.map((item)=>{
                return(
                    <div key={item.menu_id}>
                        <div className="row" style={{paddingTop:'2%', backgroundColor:'white'}}>
                            <div className="col-md-7" id="detailsComp1">
                                <b>{item.menu_id}.</b>
                                &nbsp; &nbsp;
                                <img src={item.menu_image} alt={item.menu_name} id="menuImg"/>
                                &nbsp; &nbsp;
                                <p id="itemName">{item.menu_name} - Rs.{item.menu_price}</p>
                            </div>

                            <div className="col-md-4" id="detailsComp2">
                                <button id="plusBtn" className="btn btn-success" 
                                onClick={()=> {this.addItem(item.menu_id)}}>
                                    <span className="glyphicon glyphicon-plus"></span>
                                </button>
                                &nbsp; &nbsp;
                                <button id="minusBtn" className="btn btn-danger"
                                onClick={()=> {this.removeItem(item.menu_id)}}>
                                    <span className="glyphicon glyphicon-minus"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })   
        }
    }

    render(){
        console.log(this.props)
        return(
            <>
                <div className="col-md-12 bg-success" id="itemsAdded">
                    <h1>Added Items:</h1>
                    Item Number: {this.renderCart(this.orderId)} Added.
                </div>

                <div className="col-md-12 bg-info">
                    {this.renderMenu(this.props)}
                </div>
            </>
        )
    }

}

export default MenuDisplay