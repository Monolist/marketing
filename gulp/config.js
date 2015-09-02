'use strict';

module.exports = {

  'browserPort'  : 3000,
  'UIPort'       : 3001,
  'serverPort'   : 3002,

  'styles': {
    'src' : 'public/styles/**/*.scss',
    'dest': 'build/css'
  },

  'scripts': {
    'src' : 'public/js/**/*.js',
    'dest': 'build/js'
  },

  'images': {
    'src' : 'public/images/**/*',
    'dest': 'build/images'
  },

  'fonts': {
    'src' : ['public/fonts/**/*'],
    'dest': 'build/fonts'
  },

  'src': {
    'root': 'public'
  },

  'dist': {
    'root': 'build'
  },

  'browserify': {
    'entries'   : ['./public/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  }

};
