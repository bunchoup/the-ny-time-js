var mw = mw || {};

mw.Nytime-js = {};

var iterator = mw.Nytime-js;

jQuery(document).ready(function moovwebmoduleLoad() {
  for(var moduleKey in iterator) {
    var module = iterator[moduleKey];
    if(module.name && (jQuery("body").hasClass(module.name) || module.name === "mw-global") && typeof module.init !== 'undefined') {
      console.log(module.name);
      module.init();
    }
  }
});


