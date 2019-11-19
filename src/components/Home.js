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

  var scale = 1
    // console.log(scale)
    // const svgCanvas = d3.select(canvas)
    //   .append('svg')
    //   .attr('width', 1200)
    //   .attr('height', 600)
    //   .style('border', '1px solid black')
    //   .style('background', 'green')
    //
    //
    //
      var margin = {top: 20, right: 20, bottom: 50, left: 70},
      width = 1200 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    //
    // svgCanvas.selectAll('rect')
    //   .data(data).enter()
    //   .append('rect')
    //   .attr('width', 40)
    //   .attr('height', (datapoint) => datapoint.RAW.USD.PRICE * scale)
    //   .attr('fill', 'blue')
    //   .attr('x', (datapoint, iteration) => iteration * 65)
    //   .attr('y', (datapoint) => height - datapoint.RAW.USD.PRICE * scale)
    //   .append("g")
    //   .attr("transform",
    //       "translate(" + margin.left + "," + margin.top + ")")
    //

    //
    //
    //     svgCanvas.append("g")
       //.call(d3.axisLeft('y'));

       var width = 1400, height = 600;

       var dataNum = data.map(x=> x= x.RAW.USD.PRICE)
       console.log(data)
       var svg = d3.select("body")
           .append("svg")
           .attr("width", width)
           .attr("height", height)
           .style('border', '3px solid black')

       var xscale = d3.scaleLinear()
           .domain([0, width])
           .range([0, width - 100]);

       var yscale = d3.scaleLinear()
               .domain([0, d3.max(dataNum)])
               .range([height/2, 0]);

       var x_axis = d3.axisBottom()
               .scale(xscale);

       var y_axis = d3.axisLeft()
               .scale(yscale);

           svg.append("g")
              .attr("transform", "translate(50, 10)")
              .call(y_axis);

       var xAxisTranslate = height/2 + 10;

    //
     // svg.append("g")
     // .attr("transform", "translate(50, " + xAxisTranslate  +")")
     //  .call(x_axis)

    console.log(yscale)

    svg.selectAll('bar')
      .data(data).enter()
      .append('rect')
      .attr('width', 20)
      .attr('height', (datapoint) => datapoint.RAW.USD.PRICE)
      .attr('fill', 'blue')
      .attr('x', (datapoint, iteration) => (iteration * 65) +60)
      .attr('y', (dataPoint, i) => height/2 + 10 - dataPoint.RAW.USD.PRICE )
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr('fill','pink')

    svg.selectAll('bar')
      .data(data).enter()
      .append('text')
      .attr('x', (datapoint, iteration) => (iteration * 65) +60)
      .attr('y', (dataPoint) => height/2 + 35 )
      .text(dataPoint => dataPoint.CoinInfo.Name)
      .attr('fill', 'red')
      .attr('font-family','Helvetica')
      .transition()
      .ease(d3.easeLinear)
      .duration(3000)
      .attr('fill','blue')
      //.attr('font-family','Courier New')

      // .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

setInterval(function () {
  svg.selectAll('rect')
  .transition()
  .ease(d3.easeLinear)
  .duration(5000)
  .style('fill','green')
  .transition()
  .ease(d3.easeBounce)
  .duration(5000)
  .style('fill','pink')

}, 12000)


  }







  componentDidUpdate() {
  // this.drawBarChart(this.state.coins.Data.map(x=> x = x.RAW.USD.PRICE))
  this.drawBarChart(this.state.coins.Data)
}

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }



    console.log(this.state.coins)

    return (
      <div className='container'>
        <div className='title'>
        COINS ETC
        </div>

        {this.state.coins && <div className="columns is-multiline">

          {this.state.coins.Data.map(coin =>
            <div key={coin.CoinInfo.Id} className='coin column is-one-quarter'>
              {coin.CoinInfo.FullName}: $ {coin.RAW.USD.PRICE}
              <div>
              24hr High: ${coin.RAW.USD.HIGH24HOUR}
              </div>
              <div>
            24hr Low: ${coin.RAW.USD.LOW24HOUR}
              </div>

            </div>)}

        </div>}

        <div className='chart'>
          <div id="canvas"></div>


        </div>

      </div>




    )
  }
}
export default Home
