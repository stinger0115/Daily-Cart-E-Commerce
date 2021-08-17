import React from 'react';
import './ProductTile.css';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";



function ProductTile({id,setActiveProduct,productName,brandName,price,imgsrc}) {

    const handleIncrement = () => {
        setActiveProduct({
            productName: productName,
            brandName: brandName,
            price: price,
            imgsrc: imgsrc,
            quantity:1,
        })
    }
    const handleDecrement = () => {
        setActiveProduct({
            productName: productName,
            brandName: brandName,
            price: price,
            imgsrc: imgsrc,
            quantity:-1,
        })
    }

    return (
        <div className="ProductTile">
            <div className="productTileImgContainer">
                <img
                    src={imgsrc}
                />
                <div className="overlayContainer">
                    <p>{ productName }</p>
                </div>
            </div> 
            <div className="ProductTileContentContainer">
                <div className="priceContainer">
                    <div className="priceInnerContainer">
                        <p>{brandName}</p>
                    </div>
                    <div  className="priceInnerContainer">
                        <p>Price: &#8377; {price}</p>
                    </div>
                </div>
                <div className="quantityButtonsContainer">
                    <button
                        className="quantityButton"
                        onClick={handleIncrement}>
                        <AddIcon style={{ color: '#E47158' }} />
                    </button>
                    <button
                        className="quantityButton"
                        onClick={handleDecrement}>
                        <RemoveIcon style={{ color: '#E47158' }} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductTile;