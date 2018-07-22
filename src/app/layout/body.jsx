import React from 'react';
import ReactDOM from 'react-dom';

import Chart from '../components/chart'
import Navbar from '../components/navbar'
class Body extends React.Component {

    constructor(props) {
        super(props);
        
        this.state={selStockName:''};
        this.selectedStock=this.selectedStock.bind(this);
       console.log(this.state.selStockName," Data in Storage");
    }

    componentDidMount() {
     this.selectedStock(sessionStorage.getItem('stock') );
    }

    selectedStock(stock){
     
        this.setState(
            {
                selStockName:stock
            }
        );
        console.log(stock," selected stock");
        // //   localStorage.getItem('stock') 
       
       this.forceUpdate();
       sessionStorage.setItem('stock',stock);
    }
    render() {
        return (
            <div>                
                    <section className="container">
                        <Navbar selectedStock={this.selectedStock} stockName={this.state.selStockName}/>
                        <article>
                            <Chart stock={this.state.selStockName}></Chart>
                        </article>
                    </section>
               
            </div>
        )
    }
}

export default Body;