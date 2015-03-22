var SegmentsView = Backbone.View.extend({
  template: _.template('<h2>SegmentsView</h2><ul><li value="all" class="segment-filter">All: <%= all %></li><li value="male" class="segment-filter">Male: <%= male %></li><li value="female" class="segment-filter">Female: <%= female %></li></ul>'),
  className: 'segments-view',
  initialize: function(params) {

    console.log('segmentView params: ', params);
    this.formatData(params.data);
    this.render();
  },
  events: {
    'click .segment-filter': 'filterBySegment'
  },
  filterBySegment: function(clickEvent) {
    var segVal = $(clickEvent.target).attr('value');
    $('.segment-filter').removeClass('active');
    $(clickEvent.target).addClass('active');
    this.model.set('segmentFilter', segVal);
    this.model.filterData(this.model.get('allData'));
  },
  formatData: function(data) {
    this.segments = data;
    if (!data.male) { this.segments.male = 0 };
    if (!data.female) { this.segments.female = 0 };
    this.segments.all = this.segments.male + this.segments.female;
    // console.log('this.counts ', this.counts);
  },
  updateData: function(data) {
    this.formatData(data);
    this.render();
  },
  render: function() {
    return this.$el.html(this.template(this.segments));
  }
})
