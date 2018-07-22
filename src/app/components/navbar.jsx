import React from 'react';
import ReactDOM from 'react-dom';


function StockList(props) {
  const { symbols } = props;
  const activeItem = props.selStockName;

  return (
    <div>

      <ul>

        {
          symbols.length && symbols.map(stock => {
            return (
              <li className={stock == props.activeItem ? 'active' : ''} key={stock} onClick={(e) => props.selectedStock(stock)}>
                {stock}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const symbols = ['MSFT', 'AAPL', 'INTC', 'NFLX', 'ORCL', 'CMCSA', 'GOOG', 'LUV', 'HOG', 'GOOGL', 'AMZN'];
    return (
      <nav>
        <StockList symbols={symbols} selectedStock={this.props.selectedStock} activeItem={this.props.stockName} ></StockList>
      </nav>
    )
  }
}

export default Navbar;