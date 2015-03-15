var DevicesView = Backbone.View.extend({
  template: _.template('<h2>DevicesView</h2>'),
  className: 'devices-view',

  render: function(){
    return this.$el.html(this.template({}));
  }

})
