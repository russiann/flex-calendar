// package metadata file for Meteor.js
var packageName = 'shynah:flex-calendar';
var where = 'client'; // where to install: 'client' or 'server'. For both, pass nothing.
var version = '1.0.0';
var summary = 'An Elegant Calendar Built With Calendar';
var gitLink = 'https://github.com/Russian60/flex-calendar';
var documentationFile = 'README.md';

// Meta-data
Package.describe({
  name: packageName,
  version: version,
  summary: summary,
  git: gitLink,
  documentation: documentationFile
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']); // Meteor versions

  api.use('planettraining:angular-translate@2.9.0', where); // Dependencies

  api.addFiles('dist/flex-calendar.js', where); // Files in use
  api.addFiles('dist/flex-calendar.css', where);
});   