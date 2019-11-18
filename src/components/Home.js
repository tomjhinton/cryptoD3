//pic size 687*687
import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import * as d3 from 'd3'


class Home extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }


  componentDidMount(){
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD')
      .then(res => this.setState({ coins: res.data }))




  }

  drawBarChart(data)  {
    console.log(data)
  const  canvas = document.getElementById('canvas')
const canvasHeight = 400
const canvasWidth = 1200
const scale = 1
    const svgCanvas = d3.select(canvas)
      .append('svg')
      .attr('width', 1200)
      .attr('height', 400)
      .style('border', '1px solid black')
    svgCanvas.selectAll('rect')
      .data(data.map(x=> x= x.RAW.USD.PRICE)).enter()
      .append('rect')
      .attr('width', 40)
      .attr('height', (datapoint) => datapoint * scale)
      .attr('fill', 'orange')
      .attr('x', (datapoint, iteration) => iteration * 45)
      .attr('y', (datapoint) => canvasHeight - datapoint * scale)

    svgCanvas.selectAll('text')
      .data(data.map(x=> x= x.RAW.USD.PRICE)).enter()
      .append('text')
      .attr('x', (dataPoint, i) => i * 45 + 10)
      .attr('y', (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
      .text(dataPoint => dataPoint.toFixed(3))



  }


  componentDidUpdate() {
  // this.drawBarChart(this.state.coins.Data.map(x=> x = x.RAW.USD.PRICE))
  this.drawBarChart(this.state.coins.Data)
}

  render() {

    console.log(this.state.coins)

    return (
      <div className='container'>


        {this.state.coins && <div>

          {this.state.coins.Data.map(coin =>
            <div key={coin.CoinInfo.Id}>
              {coin.CoinInfo.FullName}:$ {coin.RAW.USD.PRICE}
            </div>

          )}
        </div>}

        <div className='chart'>
          <div id="canvas"></div>


        </div>

      </div>




    )
  }
}
export default Home
