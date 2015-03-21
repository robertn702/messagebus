var ActivityView = Backbone.View.extend({
  el: '#chart',
  className: 'activity-view',

  initialize: function(params){
    // nv.addGraph(_.bind(function() {

    //   //Update the chart when window resizes.
    //   // nv.utils.windowResize(function() { this.chart.update() });
    // }, this));
    // // this.render();

    chart = nv.models.lineChart()
      .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
      .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
      .showLegend(true)
      .showYAxis(true)
      .showXAxis(true);

    chart.xAxis     //Chart x-axis settings
      .axisLabel('Date')
      .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });

    chart.yAxis     //Chart y-axis settings
      .axisLabel('Activity (%)')
      .tickFormat(d3.format(".0%"));

    this.chart = chart;
    this.myData = params.data;
    // this.myData = sinAndCos();

    nv.utils.windowResize(function() { this.chart.update() });

    this.render();
  },
  render: function(){
    console.log('rendering ActivityView');
    d3.select(this.el)    //Select the <svg> element you want to render the chart in.
      .datum(this.myData)         //Populate the <svg> element with chart data...
      .call(this.chart);          //Finally, render the chart!
  }
});
