import React,{useState,useEffect} from 'react';
import './Cart.css';
import CartList from './CartList';
import axios from 'axios';

function Cart() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [toUpdate, setToUpdate] = useState("");


    useEffect(() => {
        axios.get("/getcartitems")
        .then((data)=>{
            // console.log(data.data);
            setCartItems(data.data.data);
        })
        .catch((err)=>{
            // console.log(err);
            alert('Something went wrong while getting users cart items.Please try again:)');
            window.location = "/login";
        })
    }, [])

    useEffect(() => {
        if (toUpdate === "") return;        

        axios.post("/updatecartitems", {
            toUpdate:toUpdate
        })
        .then((data)=>{
            // console.log(data.data.data);
            setCartItems(data.data.data);
        })
        .catch((err)=>{
            // console.log(err);
            alert('Something went wrong. Please try again :).');
        })
        
    }, [toUpdate])

    useEffect(() => {
        if (cartItems.length === 0) return;
        
        setTotalItems(0);
        setTotalTax(0);
        setTotalPrice(0);

        cartItems.map((curr) => {
            setTotalPrice((preval) => preval + Number(curr.price)*Number(curr.quantity));
            setTotalTax((preval) => preval + Number(curr.price)*Number(curr.quantity));
            setTotalItems((preval) => preval + Number(curr.quantity));
            
        });
        setTotalTax((preval)=> parseFloat(preval*0.18).toFixed(2))
    }, [cartItems])

    return (
        <div className="cart">
            <div className="cartInnerContainer">
                <div className="cartLeftContainer">
                    <div className="cartLeftInnerContainer">
                        <div className="cartItemsHeadingContainer">
                            <p>Cart Items</p>
                        </div>
                        <div className="cartItemsContainer">
                            {
                                cartItems.map((curr) => {                                    
                                    return <CartList curr={curr} setToUpdate={ setToUpdate }/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="cartRightContainer">
                    <div className="cartRightInnerContainer">
                        <div className="yourOrder">
                            <p>Your Order</p>
                        </div>
                        <div className="infoContainer">
                            <p className="infoDetails">Total Items: {totalItems}</p>
                            <p className="infoDetails">Price: &#8377; {totalPrice}</p>
                            <p className="infoDetails">Tax: &#8377; { totalTax }</p>
                            <p className="infoDetails">Amount Payable: &#8377; { Number(totalPrice) + Number(totalTax) }</p>
                        </div>
                        <div className="checkOutBtnContainer">
                            <button className="checkOutBtn">CheckOut</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;