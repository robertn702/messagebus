var ActivityView = Backbone.View.extend({
  el: '#activity-chart',
  className: 'activity-view',
  initialize: function(params){
    this.formatData(params.data);
    chart = nv.models.lineChart()
      .xScale(d3.time.scale())
      .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
      .showLegend(true)
      .showYAxis(true)
      .showXAxis(true);

    chart.xAxis     //Chart x-axis settings
      .axisLabel('Date (dd/mm)')
      .tickFormat(function(d) { return d3.time.format('%m/%d')(new Date(d)) })

    chart.yAxis     //Chart y-axis settings
      .axisLabel('Activity (%)')
      .tickFormat(d3.format(".0%"));

    this.chart = chart;

    nv.utils.windowResize(function() { this.chart.update() });
    this.render();
  },
  formatData: function(data) {
    var dateGroupedData = _.groupBy(data, 'Date');
    var activityValues = [];
    var yValsAvgArray = []

    for (key in dateGroupedData) {
      activityValues.push({
        x: new Date(key),
        y: _.where(dateGroupedData[key], {Activity: 1}).length/dateGroupedData[key].length
      })
      yValsAvgArray.push({
        x: new Date(key)
      })
    }
    var sortedValues = _.sortBy(activityValues, 'x');

    var yVals = _.map(activityValues, function(item) {return item.y});
    var yValsAvg = _.reduce(yVals, function(memo, num) {return memo + num}, 0)/yVals.length;
    var yValsAvgArray = _.each(yValsAvgArray, function(item) {item.y = yValsAvg});

    this.data = [
    {key: 'Activity', values: sortedValues},
    {key: 'Average', values: yValsAvgArray}];
  },
  updateData: function(data) {
    this.formatData(data);
    this.render();
  },
  render: function(){
    d3.select(this.el)    //Select the <svg> element you want to render the chart in.
      .datum(this.data)         //Populate the <svg> element with chart data...
      .call(this.chart);          //Finally, render the chart!
  }
});
