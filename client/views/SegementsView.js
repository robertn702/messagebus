var SegmentsView = Backbone.View.extend({
  template: _.template('<h2>SegmentsView</h2><ul><li value="all" class="segment-filter">All: <%= all %></li><li value="male" class="segment-filter">Male: <%= male %></li><li value="female" class="segment-filter">Female: <%= female %></li></ul>'),
  className: 'segments-view',
  initialize: function(params) {
    // this.counts = _.countBy(params.data, )

    this.formatData(params.data);
    this.render();
  },
  formatData: function(data) {
    this.counts = _.countBy(data, 'Gender');
    this.counts.all = this.counts.male + this.counts.female;
    // console.log('this.counts ', this.counts);
  },
  updateData: function(data) {
    this.formatData(data);
    this.render();
  },
  render: function() {
    return this.$el.html(this.template(this.counts));
  }
})
