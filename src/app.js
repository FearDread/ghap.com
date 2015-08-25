var App = require('app');
console.log('working');

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
