import React from 'react';

const OrderDisplay = (props) => {

    const renderTable = ({ orderData }) => {
        if (orderData) {
            return orderData.map((item) => {
                return (

                    <tr key={item._id}>
                        <tr>
                            <th>Order Id: </th>
                            <td> {item.id}</td>
                        </tr>
                        <tr>
                            <th>Restaurant: </th>
                            <td> {item.Rest_name}</td>
                        </tr>
                        <tr>
                            <th>Name: </th>
                            <td> {item.name}</td>
                        </tr>
                        <tr>
                            <th>Phone: </th>
                            <td> {item.phone}</td>
                        </tr>
                        <tr>
                            <th>Email: </th>
                            <td> {item.email}</td>
                        </tr>
                        <tr>
                            <th>Cost: </th>
                            <td> Rs. {item.cost}</td>
                        </tr>
                        <tr>
                            <th>Date: </th>
                            <td> {item.date}</td>
                        </tr>
                        <tr>
                            <th>Status: </th>
                            <td> {item.status}</td>
                        </tr>
                        <tr>
                            <th>Bank: </th>
                            <td> {item.bank_name} Bank</td>
                        </tr>
                        <hr style={{color:'black'}}/>
                    </tr>

                )
            })
        }
    }

    return (
        <div className="container">
            <center><h3>Order History:</h3></center>
            <table className="table" id="DisplayTable">
                <tbody>
                    {renderTable(props)}
                </tbody>
            </table>
        </div>
    )
}

export default OrderDisplay