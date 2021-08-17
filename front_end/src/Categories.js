import React from 'react';
import './Categories.css';

function Categories({setCategoryFilter,setCategoryType}) {
    return (
        <div className="Categories">
            <div className="categoriesInnerContainer">
                <button 
                    className="shortcutBtn"
                    onClick={()=>{
                        setCategoryFilter((preval)=>preval+1);
                        setCategoryType("Electronics");
                    }}                    
                >
                Electronics
                </button>

                <button 
                    className="shortcutBtn"
                    onClick={()=>{
                        setCategoryFilter((preval)=>preval+1);
                        setCategoryType("Bags");
                    }}
                >
                Bags
                </button>

                <button 
                    className="shortcutBtn"
                    onClick={()=>{
                        setCategoryFilter((preval)=>preval+1);
                        setCategoryType("Fashion & Beauty");
                    }}
                >
                Fashion & Beauty
                </button>

                <button 
                    className="shortcutBtn"
                    onClick={()=>{
                        setCategoryFilter((preval)=>preval+1);
                        setCategoryType("Grocery");
                    }}
                >
                Grocery
                </button>
            </div>
        </div>
    )
}

export default Categories
