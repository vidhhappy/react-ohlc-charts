import React from 'react';
import ReactDOM from 'react-dom';


const canvas_height = 500;
// amount to increase max ,just for alignment
const markerWidth = 5;

function caluclateBoundary(records) {
    let highs = []
    let lows = []
    let keys = Object.keys(records)
    keys = keys.splice(0, 30)
    keys.map((key) => {
        const val = records[key];
        var high = parseFloat(val['2. high']);
        var low = parseFloat(val['3. low']);
        highs.push(high)
        lows.push(low)
    })
    const max = Math.max(...highs)
    const min = Math.min(...lows)
    return { max: Math.ceil(max), min: Math.floor(min) };
}


function manuplate(a, b, c) {
    return (a - b) * c + 'px';
}

function createItem(open, high, low, close, index, max, min) {

    //console.log(open," ",high," ",low, " ",close, " ",max, " ",min)
    //per unit value  ie 500px is divided into units of max-min
    const eachUnit = Math.floor(canvas_height / (max - min))  //Number of px per unit
    //top of each ochl unit
    const top = Math.floor((max - high) * eachUnit) + 'px';
    //cal height of ohcl unit
    const height = Math.floor((high - low) * eachUnit) + markerWidth + 'px';
    // caluclate open's top relative to marker div,  high-opn* eachUnit
    const openTop = Math.floor((high - open) * eachUnit) + 'px';
    // caluclate open's top  relative to marker div,  high-opn* eachUnit
    const closeTop = Math.floor((high - close) * eachUnit) + 'px';
    // console.log(eachUnit," ",top," ",height, " ",openTop, " ",closeTop)
    let bbname;
    if(closeTop>openTop){
       bbname= "red";
    }
    else{
       bbname= "green";
    }
    return (
        <div className="ohlc" key={index} >
            <div className="line">
            </div>
            <div className="marker"  style={{ height: height, top: top}}>
                <div className="marker-open" style={{ top: openTop, backgroundColor: bbname  }}>
                </div>
                <div className="marker-line" style={{ height: '100%', backgroundColor: bbname  }}>
                </div>
                <div className="marker-close" style={{ top: closeTop, backgroundColor: bbname  }}>
                </div>
            </div>
        </div>
    );
}


function generateIndex(max, min) {
    let ticks = []
    let commonDiff = Math.ceil((max - min) / 10);
    for (let i = 0; i < 10; i++) {
        let k = (max - (commonDiff * i))
        ticks.push(<div className="tick" key={i}><p>{k}</p></div>);
    }
    return ticks;
}

function Simulate(props) {
    const { records } = props;

    if (!records) {
        return (<div></div>)
    }

    let keys = Object.keys(records);

    if (keys.length === 0) {
        return (<div></div>)
    }
    keys = keys.splice(0, 30)
    const dimens = caluclateBoundary(records);
    console.log('dimens ', dimens)
    let max = dimens.max;
    let min = dimens.min;

    let canvas_heightPx = canvas_height + 'px';
    return (
        <div className="canvas-layout" style={{ height: canvas_heightPx }}>
            <div id="price-range">
                {generateIndex(max, min)}
            </div>
            <div id="ohlc-chart">
                {
                    keys.length > 0 && keys.map((key, index) => {
                        const val = records[key];
                        const open = val['1. open'];
                        const high = val['2. high'];
                        const low = val['3. low'];
                        const close = val['4. close'];
                        return (createItem(open, high, low, close, index, max, min))
                    })
                }
            </div>

        </div>
    )
}

class Chart extends React.Component {

    constructor(props) {
        super(props)
        this.state = { records: [], info: null, loading: false }
    }

    componentWillReceiveProps(props) {
        const stockId = props.stock;
        this.setState(
            {
                records: [],
                info: null,
                loading: true
            }, function () {
                fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockId}&apikey=EOW0JXR3JTGBSU1Q`)
                    .then(res => res.json())
                    .then(res => {
                        const info = res['Information']
                        if (info != null) {
                            this.setState(info)
                            return;
                        }
                        const records = res['Weekly Adjusted Time Series']
                        if (!records) {
                            return;
                        }
                        this.setRecords(records)
                    })
            }
        )
    }

    setRecords(records) {
        this.setState(
            {
                records: records
            }
        )
    }

    render() {
        const { records, info } = this.state;
        return (
            <div className="chart" id="chartId">
                {
                    records != null && (
                        <Simulate records={records}></Simulate>
                    )
                }
                {
                    records == null && (
                        <div> {info} </div>
                    )
                }

            </div>
        )
    }
}

export default Chart;