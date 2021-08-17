import React,{useState} from 'react';
import './HomeLeftContainer.css';
import FilterListIcon from "@material-ui/icons/FilterList";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

function HomeLeftContainer({ brandsList, filterBrand, setFilterBrand, setIsFilter, setIsSort, setPriceSort, setMinVal, setMaxVal, setValueFilter }) {

    const [tempMin, setTempMin] = useState("");
    const [tempMax, setTempMax] = useState("");

    const updatePriceValues = () => {
        if (tempMin === "" || tempMax === "") return;

        setMinVal(tempMin);
        setMaxVal(tempMax);
        setValueFilter((preval) => preval + 1);
    }

    return (
        <div className="HomeLeftContainer">
            <div className="filterContainer">
                <div className="filterHeadingContainer">
                    <div className="filterHeadingInnerContainer">
                        <div className="filterIcon">
                            <FilterListIcon style={{color:'dodgerblue'}}/>
                        </div>
                        <div className="filterHeading">
                            <p>Filter</p>
                        </div>
                        <div className="filterIcon">
                            <PlaylistAddCheckIcon style={{color:'mediumslateblue'}}/>
                        </div>
                    </div>
                </div>
                <div className="filterPriceContainer">
                    <div className="filterPriceInnerContainer">
                        <input 
                            type="text"
                            className="priceValueInput"
                            placeholder="Min Val"
                            onChange={(event) => { setTempMin(event.target.value) }}
                        />
                        <input 
                            type="text" 
                            className="priceValueInput" 
                            placeholder="Max Val"
                            onChange={(event) => { setTempMax(event.target.value) }}
                        />
                        <div className="priceInputBtnContainer">
                            <button
                                className="priceInputBtn"
                                onClick={ updatePriceValues }
                            >
                                Go
                            </button>
                        </div>
                    </div> 
                </div>
                <div className="filterBrandContainer">
                    <div className="filterBrandInnerContainer">
                        <div className="selectedBrandsContainer">
                            {
                                filterBrand.map((curr,index) => {
                                    return (
                                        <button
                                            className="selectedBrandsBtn"
                                            onClick={() => {
                                                setFilterBrand([]);
                                                for (let i = 0; i < filterBrand.length; i++)
                                                {
                                                    if (i !== index)
                                                        setFilterBrand((preval) => [...preval, filterBrand[i]]);
                                                }
                                            } }
                                        >
                                            {curr}
                                        </button>
                                    );
                                })
                            }
                        </div>
                        <div className="allBrandsContainer">
                            {
                                brandsList.map((curr) => {                                    
                                    return (
                                        <button
                                            className="allBrandsBtn"
                                            onClick={() => {
                                                if (filterBrand.indexOf(curr) === -1)
                                                {
                                                    setFilterBrand((preval)=> [...preval,curr])
                                                }                                            
                                            }}
                                        >
                                            {curr}
                                        </button>
                                    );
                                })
                            }
                        </div>
                        <div className="brandButtonContainer">
                            <button
                                className="brandFilterBtn"
                                onClick={()=> setIsFilter((preval)=> preval+1) }
                            >
                                FIlter By Brands
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sortByContainer">
                <div className="sortByHeading">
                    <p>Sort By Price</p>            
                </div>
                <div className="sortByPriceBtnContainer">
                    <button 
                        className="sortByPriceBtn"
                        onClick={() => {
                            setIsSort((preval) => preval + 1);
                            setPriceSort("low");
                        }}
                    >
                        Low To High
                        </button>
                    <button 
                        className="sortByPriceBtn"
                        onClick={() => {
                            setIsSort((preval) => preval + 1);
                            setPriceSort("high");
                        }}
                    >
                        High To Low
                        </button>
                </div>
            </div>
        </div>
    )
}

export default HomeLeftContainer;