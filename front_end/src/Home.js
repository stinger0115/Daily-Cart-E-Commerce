import React,{useState,useEffect} from 'react';
import './Home.css';
import ProductTile from './ProductTile';
import axios from 'axios';
import HomeLeftContainer from './HomeLeftContainer';
import Categories from './Categories';

function Home() {
    const [activeProduct, setActiveProduct] = useState("");
    const [allProducts, setAllProducts] = useState([]);  
    const [filterBrand,setFilterBrand]  = useState([]);
    const [brandsList,setBrandsList] = useState([]);
    const [isFilter, setIsFilter] = useState(0);
    const [categoryFilter,setCategoryFilter] = useState(0);
    const [categoryType,setCategoryType] = useState("");
    const [isSort,setIsSort] = useState(0);
    const [priceSort,setPriceSort] = useState("");
    const [minVal,setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const [valueFilter, setValueFilter] = useState(0);

  
    useEffect(() => {
      if (activeProduct === "") return;
        axios.patch("/tocart", {
            productDetails:activeProduct
          }, {
            withCredentials:true
        })
        .then((data) => {
          // console.log(data.data);
          setActiveProduct("");
        })
        .catch((err)=>{
          alert(`Error while adding to cart.Please Login To Continue`);
          window.location="/login"
          // console.log(err.response);
        })
    }, [activeProduct])

    useEffect(() => {
      //getting all the products from the database
      axios.get("/cartitems")
      .then((data) => {
        // console.log(data.data.data);
        setAllProducts(data.data.data);
      })
      .catch((err)=>{
        alert(`Error While Fetching Product Details.`);
        console.log(err);
      });

      //getting only the name of the brands list
      axios.get("/brandslist")
      .then((data)=>{
        // console.log(data.data.data);
        setBrandsList(data.data.data);
      })
      .catch((err)=>{
        console.log(err);
        alert('Something went wrong while fetching the brands list');
      })
    }, []);    
    
    useEffect(() => {
      if (filterBrand.length === 0) {
        return;
      }      
      // console.log('clicked');
      // console.log(filterBrand);

      axios.post("/filterbrands", {
        filterBrand: filterBrand
      })
      .then((data) => {
        console.log(data.data.elements);
        setAllProducts(data.data.elements);
      })
      .catch((err) => {
        // console.log("Something Went Wrong While Filtering brandsName",err);
        alert(`Something Went Wrong While Filtering Brands Name. Please Try Again :)`);
      })      
    }, [isFilter])
  
    useEffect(() => {
      if(categoryFilter === 0) return;
      
      axios.post("/categoryfilter", {
        categoryType:categoryType
      })
      .then((data)=>{
        setAllProducts(data.data.data);
      })
      .catch((err)=>{
        // console.log(err);
        alert(`Something Went Wrong Please Try Again`);
      })
    }, [categoryFilter])
    
    useEffect(() => {
      if (isSort === 0) return;      

      axios.post("/sortitems", {
        priceSort: priceSort,    
      })
      .then((data)=>{
        setAllProducts(data.data.data);
      })
      .catch((err)=>{
        // console.log("Error while getting the sorted data");
        alert("Error while sorting the products. Please try again :)");
      })
    }, [isSort])
  
    useEffect(() => {
      if (valueFilter === 0) return;
      
      axios.post("/priceFilter", {
        maxVal: maxVal
        , minVal:minVal
      })
      .then((data)=>{
        setAllProducts(data.data.data);
      })
      .catch((err)=>{
        // console.log("Error while filtering based on price ", err);
        alert("Error while Filtering based on price. Please try again :)");
      })
      
    }, [valueFilter])
  
  
    return (
      <div className="Home">
        {/* left container */}
        <div className="homeLeftContainer">
          <div className="homeLeftInnerContainer">
            <HomeLeftContainer brandsList={brandsList} filterBrand={filterBrand} setFilterBrand={setFilterBrand} setIsFilter={setIsFilter} setIsSort={setIsSort} setPriceSort={setPriceSort} setMinVal={setMinVal} setMaxVal={setMaxVal} setValueFilter={setValueFilter}/>
          </div>
        </div>
        {/* right container */}
        <div className="homeRightContainer">
          <div className="categorySelector">
            <Categories setCategoryFilter={setCategoryFilter} setCategoryType={ setCategoryType }/>
          </div>
          <div className="homeTilesContainer">
            {
              allProducts.map((temp) => <ProductTile id={temp._id } productName={temp.productName } brandName={ temp.brandName} price={temp.price } imgsrc={ temp.imgsrc} setActiveProduct={ setActiveProduct } />)
            }            
          </div>
        </div>
      </div>
    );
}

export default Home;