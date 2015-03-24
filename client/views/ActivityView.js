var ActivityView = Backbone.View.extend({
  el: '#activity',
  className: 'activity-view',
  template: _.template(
    '<h2>Activity</h2>' +
    '<ul id="date-filters">' +
      '<li><button value="1"  class="date-filter">Today</button></li>' +
      '<li><button value="3"  class="date-filter">3 Days</button></li>' +
      '<li><button value="7"  class="date-filter">7 Days</button></li>' +
      '<li><button value="14"  class="date-filter">14 Days</button></li>' +
    '</ul>' +
    '<svg id="activity-chart"></svg>'
  ),
  initialize: function() {
    this.render();
  },
  events: {
    'click .date-filter': 'filterByDate'
  },
  filterByDate: function(clickEvent) {
    var dateRange = parseInt($(clickEvent.target).attr('value'));
    this.model.set('segmentFilter', 'all');
    this.model.set('dateFilter', dateRange);
    this.model.filterData(this.model.get('allData'));
    this.model.set('segmentData', _.countBy(this.model.get('filteredData'), 'Gender'));
  },
  render: function() {
    return this.$el.html(this.template());
  }
})
