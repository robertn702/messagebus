// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    // this.playerView = new PlayerView({model: this.model.get('currentSong')});
    // this.libraryView = new LibraryView({collection: this.model.get('library')});
    // this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});
    // console.log('params: ', params);
    // console.log('params.ActivityData: ', params.ActivityData);
    this.activityView = new ActivityView({data: params.data});
    this.segmentsView = new SegmentsView({data: params.data});
    this.devicesView = new DevicesView({data: params.data});

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    // this.model.on('change:currentSong', function(model){
    //   this.playerView.setSong(model.get('currentSong'));
    // }, this);
  },

  render: function(){
    return this.$el.html([
      // this.activityView.render(),
      // this.activityView.$el.html(),
      this.segmentsView.render(),
      this.devicesView.render(),
    ]);
  }

});
