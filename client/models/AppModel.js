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
      console.log('click');
      var dateRange = parseInt($(button.target).attr('value'));
      this.set('dateFilter', dateRange);
      console.log('dateFilter', this.get('dateFilter'));
      this.filterData(this.get('allData'));
    }, this));

    // this.filterData();
  },
  filterData: function(data) {

    var cutoffDate = this.get('today') - this.get('dateFilter') * 86400000;

    // filters all data within specified range
    var filterDate = function(data) {
      return new Date(data.Date).valueOf() > cutoffDate;
    };

    data = _.filter(data, _.bind(filterDate, this));
    console.log('date filtered data length: ', data.length);

    // if segment filter is specified, it is updated
    if (this.get('segmentFilter') !== 'all') {
      data = _.where(data, {Gender: this.get('segmentFilter')});
    }
    // console.log('segment filtered data length: ', data.length);

    // update filtered data
    this.set('filteredData', data);
  }

});
