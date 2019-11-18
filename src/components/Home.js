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
    // svgCanvas.selectAll('text')
    //   .data(data).enter()
    //   .append('text')
    //
    //   .attr('x', (dataPoint, i) => i * 65 + 10)
    //   .attr('y', (dataPoint, i) => height - dataPoint.RAW.USD.PRICE  * scale - 10)
    //   .text(dataPoint => dataPoint.CoinInfo.Name + ' :$' + dataPoint.RAW.USD.PRICE)
    //   .attr('fill', 'red')
    //
    //
    //     svgCanvas.append("g")
       //.call(d3.axisLeft('y'));

       var width = 1400, height = 600;

       var dataNum = data.map(x=> x= x.RAW.USD.PRICE)
       var svg = d3.select("body")
           .append("svg")
           .attr("width", width)
           .attr("height", height);

       var xscale = d3.scaleLinear()
           .domain([0, d3.max(dataNum)])
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

    svg.append("g")
      .attr("transform", "translate(50, " + xAxisTranslate  +")")
      .call(x_axis)

      console.log(yscale)
    svg.selectAll('bar')
      .data(data).enter()
      .append('rect')
      .attr('width', 40)
      .attr('height', (datapoint) => datapoint.RAW.USD.PRICE)
      .attr('fill', 'blue')
      .attr('x', (datapoint, iteration) => (iteration * 65) +60)
      .attr('y', (dataPoint, i) => height/2 + 10 - dataPoint.RAW.USD.PRICE )

      // .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


  }


  chart2(data){
    const  canvas = document.getElementById('canvas')
    var svg = d3.select(canvas),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("XYZ Foods Stock Price")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("XYZ.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Year");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Stock Price");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.year); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.value); });
    });

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
