window.App = Ember.Application.create();

App.Router.map(function(){
  //this.route('domain', {path: ':domain'}, function(){
    this.resource('pages', function(){
      this.resource('page', {path: ':id'});
    })
  //});
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('pages');
  }
});

/*
App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('food').set('model', App.Food.find());
  }
});
*/

App.PagesRoute = Ember.Route.extend({
  model: function() {
    return App.Page.find();
  }
});

App.PagesController = Ember.ArrayController.extend();

App.PageController  = Ember.ObjectController.extend();

/*
//Default:
App.PageRoute = Ember.Route.extend({
  setupController: function(controller, page) {
    controller.set('content', page);
  }
});
*/

// Models
App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Page = DS.Model.extend({
  url: DS.attr('string')
/* , reports: DS.hasMany('App.Report') */
});

App.Report = DS.Model.extend({
  page: DS.belongsTo('App.Page'),
  error: DS.attr('string'),
  logs: DS.attr('string')
});

App.Page.FIXTURES = [
  {id: 'http://emberjs.com/guides/routing/defining-your-routes/'},
  {id: 'http://emberjs.com/guides/getting-started/core-concepts/'},
  {id: 'http://emberjs.com/'}
];

/*
domain.com: {
 'http:www.t.co/abc.php?a=b#c': {
   
 }
}
*/