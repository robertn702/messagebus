var ActivityChartView = Backbone.View.extend({
  el: '#activity-chart',
  className: 'activity-chart-view',
  initialize: function(params){
    this.formatData(params.data);

    chart = nv.models.lineChart()
      .xScale(d3.time.scale())
      .useInteractiveGuideline(true)
      .showLegend(true)
      .showYAxis(true)
      .showXAxis(true);

    chart.xAxis     //Chart x-axis settings
      .axisLabel('Date (mm/dd)')
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
    var yValsAvgArray = [];

    // sets x and y data values
    for (key in dateGroupedData) {
      activityValues.push({
        x: new Date(key),
        y: _.where(dateGroupedData[key], {Activity: 1}).length/dateGroupedData[key].length
      });
      yValsAvgArray.push({x: new Date(key)})
    }

    // sorts data values by date
    var sortedValues = _.sortBy(activityValues, 'x');

    var averageData = this.getAverage(sortedValues, yValsAvgArray);
    var trendData = this.getTrend(sortedValues);

    // sets data for line chart
    this.data = [{key: 'Activity', values: sortedValues},
                {key: 'Average', values: averageData, disabled: true},
                {key: 'Trend Line', values: trendData, disabled: true}];

  },
  getAverage: function(data, avgArr) {
    var yVals = _.map(data, function(item) {return item.y});
    var yValsAvg = _.reduce(yVals, function(memo, num) {return memo + num}, 0)/yVals.length;

    return _.each(avgArr, function(item) {item.y = yValsAvg});
  },
  getTrend: function(data) {
    // get the x and y values for least squares
    var xSeries = d3.range(1, data.length + 1);
    var ySeries = _.map(data, function(d) {return d.y});
    var xLabels = _.map(data, function(d) {return d.x});

    var leastSquaresCoeff = this.leastSquares(xSeries, ySeries);

    // apply the reults of the least squares regression
    var x1 = xLabels[0];
    var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
    var x2 = xLabels[xLabels.length - 1];
    var y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];

    return [{x: x1, y: y1}, {x: x2, y: y2}];
  },
  leastSquares: function(xSeries, ySeries) {
    var reduceSumFunc = function(prev, cur) { return prev + cur; };

    var xBar = _.reduce(xSeries, reduceSumFunc) * 1.0 / xSeries.length;
    var yBar = _.reduce(ySeries, reduceSumFunc) * 1.0 / ySeries.length;

    var ssXX = _.reduce(_.map(xSeries, function(d) { return Math.pow(d - xBar, 2); }), reduceSumFunc);
    var ssYY = _.reduce(_.map(ySeries, function(d) { return Math.pow(d - yBar, 2); }), reduceSumFunc);
    var ssXY = _.reduce(_.map(xSeries, function(d, i) { return (d - xBar) * (ySeries[i] - yBar); }), reduceSumFunc);

    var slope = ssXY / ssXX;
    var intercept = yBar - (xBar * slope);
    var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);

    return [slope, intercept, rSquare];
  },
  calcAverage: function(values, avgArray) {
    var yVals = _.map(sortedValues, function(item) {return item.y});
    var yValsAvg = _.reduce(yVals, function(memo, num) {return memo + num}, 0)/yVals.length;
    var yValsAvgArray = _.each(yValsAvgArray, function(item) {item.y = yValsAvg});
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
