import React, { Component } from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class App extends Component {

  constructor(){
    super();
    this.updateData = this.updateData.bind(this);
    this.computeRandomData = this.computeRandomData.bind(this);
  }

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = this.computeRandomData();

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    // Uncomment the below 3 lines to show the Scrollbar(Similar to date filter in Chartio)
    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  computeRandomData(){
    let data = [];
    let visits = 10;

    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    }
    return data;
  }

  // We will have to rely on componentDidUpdate if the props are coming from api response & then update the chart.data like below.
  updateData() {
    this.chart.data = this.computeRandomData();
  }

  render() {
    return (
      <React.Fragment>
        <div id="chartdiv" style={{ width: "80%", height: "700px" }}></div>
        <button onClick={() => {
          this.updateData();
        }}>Click to update the data</button>
      </React.Fragment>
    );
  }
}

export default App;