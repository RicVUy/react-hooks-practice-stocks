import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setstocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState("All")
  const [inventory, setInventory] = useState(0)
  useEffect(() => {
fetch("http://localhost:3001/stocks")
.then(r=>r.json())
.then(setstocks)
  }, [])

  console.log(stocks)

  function handleAddStockPortfolio (addedStock) {
    const foundStock = portfolio.find(stock => stock.id === addedStock.id)
    
    if (!foundStock) {
    setPortfolio([...portfolio, addedStock])
    //setInventory((parseFloat(inventory)-1))
    }
  }
  console.log(portfolio)
function handleRemoveStockFromPortfolio(removedStock) {
const filteredPortfolio = portfolio.filter(
  stock => stock.id !== removedStock.id
)
setPortfolio(filteredPortfolio)
}
const sortedStocks = [...stocks].sort((stockA, stockB) => {
  if (sortBy === "Alphabetically") {
    return stockA.name.localeCompare(stockB.name)
  } else {
    return stockA.price - stockB.price
  }
})
const filteredStocks = sortedStocks.filter(stock => {
  if (filterBy === "All") {
    return true
  } else {
    return stock.type.toLowerCase() === filterBy.toLowerCase()
  }
})

  return (
    <div>
      <SearchBar 
      sortBy={sortBy} 
      setSortBy={setSortBy} 
      filterBy={filterBy} 
      setFilterBy={setFilterBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} 
          onStockClick={handleAddStockPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} 
          onStockClick={handleRemoveStockFromPortfolio}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
