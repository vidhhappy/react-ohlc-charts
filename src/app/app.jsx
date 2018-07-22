import React from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/header'
import Footer from './layout/footer'
import Body from './layout/body'
class App extends React.Component {

    render() {
        return (
            <div>
                <div><Header></Header></div>
                <div><Body></Body></div>
                <div><Footer></Footer></div>
            </div>
        )
    }
}

export default App;