window.App = Ember.Application.create();

App.Router.map(function(){
  //this.route('domain', {path: ':domain'}, function(){
    this.resource('pages', function(){
      this.resource('page', {path: ':page_id'});
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

// Handlebars Helpers
Ember.Handlebars.registerBoundHelper('logStatement', function(log) {
  console.log(arguments);
  return log.join(' ');
});

Ember.Handlebars.registerBoundHelper('urlAsId', function(url) {
  return decodeURIComponent(url);
});

Ember.Handlebars.registerBoundHelper('reportsHelper', function() {
  console.log(arguments);
  return 'flat';
});

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

// Models
App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Page = DS.Model.extend({
  reports: DS.hasMany('App.Report')
});

App.Report = DS.Model.extend({
  page: DS.belongsTo('App.Page'),
  error: DS.attr('string'),
  logs: DS.attr('string')
});



App.Page.FIXTURES = [{
  id: 'http%3A%2F%2Femberjs.com%2Fguides%2Frouting%2Fsetting-up-a-controller%2F'
, reports: [200]
}, {
  id: 'http%3A%2F%2Femberjs.com%2Fguides%2Fgetting-started%2Fcore-concepts%2F'
, reports: [200, 300]
}, {
  id: 'http%3A%2F%2Femberjs.com%2F'
, reports: [200, 300, 400]
}];

App.Report.FIXTURES = [{
  id: 200,
  error: 'boom',
  logs: [
    ['log', 'log'],
    ['debug', 'debug']
  ]
}, {
  id: 300,
  error: 'bam',
  logs: [
    ['error', 'error'],
    ['warn', 'warning']
  ]
}, {
  id: 400,
  error: 'bam',
  logs: [
    ['error', 'error'],
    ['warn', 'warning']
  ]
}];

/*
domain.com: {
 'http:www.t.co/abc.php?a=b#c': {
   
 }
}
*/