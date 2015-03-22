// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({
  initialize: function(params){
    // console.log('params.data: ', params.data);
    this.set('allData', params.data);
    this.set('filteredData', params.data);
    this.set('dateFilter', 14);
    this.set('segmentFilter', 'all');
    this.set('today', new Date('07/31/14').valueOf());

    $('.date-filter').click(_.bind(function(button) {
      var dateRange = parseInt($(button.target).attr('value'));
      this.set('dateFilter', dateRange);
      this.filterData(this.get('allData'));
    }, this));
  },
  filterData: function(data) {
    var cutoffDate = this.get('today') - this.get('dateFilter') * 86400000;

    // filters all data within specified range
    var filterDate = function(data) {
      return new Date(data.Date).valueOf() >= cutoffDate;
    };

    // filter data by date
    data = _.filter(data, _.bind(filterDate, this));

    // if segment filter is specified, it is updated
    if (this.get('segmentFilter') !== 'all') {
      data = _.where(data, {Gender: this.get('segmentFilter')});
    }

    // update filtered data
    this.set('filteredData', data);
  }
});
