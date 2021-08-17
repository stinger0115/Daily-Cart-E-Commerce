import React from 'react';
import './CartList.css';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";

function CartList({ curr, setToUpdate }) {
    
    const increment_quantity = () => {
        setToUpdate({
            "brandName":curr.brandName,
            "productName":curr.productName,
            "quantity": curr.quantity + 1,
            "remove":0
        })
    }

    const decrement_quantity = () => {
        setToUpdate({
          "brandName": curr.brandName,
          "productName": curr.productName,
          "quantity": curr.quantity - 1,
          "remove": 0,
        });
    }

    const remove_item = () => {
        setToUpdate({
          "brandName": curr.brandName,
          "productName": curr.productName,
          "quantity": curr.quantity,
          "remove": 1,
        });
    }

    return (
        <div className="CartList">
            <div className="cartProductImgContainer">
                <img src={curr.imgsrc} alt="Product_img"></img>
            </div>
            <div className="cartProductInfoContainer">
                <div className="productDetailsCartContainer">
                    <p className="productNameCart">{curr.productName}</p>
                    <p className="brandNameCart">- {curr.brandName}</p>
                </div>
                <div className="productQuantityPricingContainer">
                    <p className="productCartPrice">Price: &#8377; {curr.price}</p>
                    <p className="productCartQuantity">Quantity: {curr.quantity}</p>
                </div>
                <div className="productCartButtons">
                    <button 
                        type="button" 
                        className="cartListBtn" 
                        style={{'color':'rgb(68, 67, 67)'}}
                        onClick={increment_quantity}
                    >
                        <AddIcon/>
                    </button>
                    <button 
                        type="button" 
                        className="cartListBtn" 
                        style={{'color':'coral'}}
                        onClick={decrement_quantity}
                    >
                        <RemoveIcon/>
                    </button>
                    <button 
                        type="button" 
                        className="cartListBtn" 
                        style={{'color':'rgb(68, 67, 67)'}}
                        onClick={remove_item}
                    >
                        <DeleteIcon/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartList;