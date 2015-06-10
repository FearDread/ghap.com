var App = require('app');

$(function(){

  $.GUI().create('myApp', function(GUI){

      return {
          load:function(){
              GUI.log('hello world :: ', GUI);
          },
          unload:function(){
          
          }
      }
  
  });

  $.GUI().run();

  App.load();

});
