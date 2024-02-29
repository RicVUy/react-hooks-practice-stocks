import React from "react";

function Stock({stock, onStockClick}) {

  const {name, price,ticker,inventory} = stock
  return (
    <div>
      <div className="card" onClick={ () => onStockClick(stock)}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}:{price}</p>
          <p className="card-text">stock left : {inventory}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
