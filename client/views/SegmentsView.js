var SegmentsView = Backbone.View.extend({
  el: '#segments',
  className: 'segments-view',
  template: _.template(
    '<h2>SegmentsView</h2>' +
    '<ul>' +
      '<li value="all" class="segment-filter active">All: <%= all %></li>' +
      '<li value="male" class="segment-filter">Male: <%= male %></li>' +
      '<li value="female" class="segment-filter">Female: <%= female %></li>' +
    '</ul>'
    ),
  initialize: function(params) {
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
  },
  updateData: function(data) {
    this.formatData(data);
    this.render();
  },
  render: function() {
    return this.$el.html(this.template(this.segments));
  }
})
