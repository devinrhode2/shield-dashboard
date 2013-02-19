window.App = Ember.Application.create();

App.Router.map(function(){
  //this.route('domain', {path: ':domain'}, function(){
    this.resource('pages', function(){
      this.resource('page', {path: ':url'});
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
    console.log(App.Page, App);
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
  {id: 'http%3A%2F%2Femberjs.com%2Fguides%2Frouting%2Fsetting-up-a-controller%2F'},
  {id: 'http%3A%2F%2Flocalhost%3A3000%2F%23%2Fpages'},
  {id: 'http%3A%2F%2Femberjs.com%2Fguides%2Frouting%2Fdefining-your-routes%2F'}
];

/*
domain.com: {
 'http:www.t.co/abc.php?a=b#c': {
   
 }
}
*/