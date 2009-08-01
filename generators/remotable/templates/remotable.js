// // http://opensoul.org/2008/10/24/ajax-and-request-forgery-protection
// Ajax.Base.prototype.initialize = Ajax.Base.prototype.initialize.wrap(function() {
//   var args = $A(arguments), proceed = args.shift();
//   var options = args[0];
//   var token = encodeURIComponent(Application.authenticityToken());
//   if (Object.isString(options.parameters)) {
//     options.parameters += '&' + token;
//   } else if (Object.isHash(options.parameters)) {
//     options.parameters = this.options.parameters.toObject();
//     options.parameters.authenticity_token = token;
//   } else if (options.parameters != undefined) {
//     options.parameters.authenticity_token = token;
//   }
//   proceed.apply(null, args);
// });

if (typeof Prototype == 'object') {
  
  document.observe("dom:loaded", function () {

    $(document.body).observe("click", function(event) {
      var elem = event.findElement("a");
      if(elem && 'true' == elem.readAttribute('data-remote')) {
        var method = elem.readAttribute('data-method') || "get";
        var token = elem.readAttribute('data-authenticity_token') || null;
        var params = {authenticity_token: token};
        if (method == 'get') {
          params = null;
        }
        new Ajax.Request(elem.readAttribute('href'), {method: method, parameters: params});
        event.stop();
      }

      elem = event.findElement('input');
      var form = elem && elem.up('form[data-remote="true"]');
      if(elem && 'submit' == elem.readAttribute('type') && form) {
        form.request();
        event.stop();
      }
    });

    $(document.body).observe("keydown", function(event) {
      if(event.keyCode == Event.KEY_RETURN) {
        var elem = event.findElement('input');
        if(elem) {
          elem.up('form').request();
          event.stop();
        }
      }

    });

  });
} else if(typeof jQuery == 'function') {

  var Element = {
    replace: function(elem, data) {
      $("#" + elem).replaceWith(data);
    },
    remove: function(elem) {
      $("#" + elem).remove();
    }
  };

 $(document).ready( function() {

    jQuery.ajaxSetup({
      'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript");}
    });

    $('a[data-remote="true"]').live('click', function(e) {
      var $target = $(e.target);

      var method = $target.attr('data-method') || 'get';
      var url = $target.attr('href');
      var type = (method == 'get') ? 'GET' : 'POST';
      var token = $target.attr('data-authenticity_token');
      var data = "_method=" + method;
      data += '&authenticity_token=' + token;
      
      $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'script'
      });

      e.preventDefault();
    });

    $('form[data-remote="true"] input[type="submit"]').live('click', function(e){
      var $target = $(e.target);
      var $form = $target.parents('form');
      var method = $form.find('input[name=_method]').val() ||
      $form.attr('data-method') ||
      $form.attr('method'); 

      var url = $form.attr('action');
      var type = (method == 'get') ? 'GET' : 'POST';
      var data = $form.serialize() + "&_method=" + method;

      $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'script'
      });

      e.preventDefault();
    });

    $('form[data-remote="true"] button[type="submit"]').live('click', function(e){
      var $target = $(e.target);
      var $form = $target.parents('form');
      var method = $form.find('input[name=_method]').val() ||
      $form.attr('data-method') ||
      $form.attr('method'); 

      var url = $form.attr('action');
      var type = (method == 'get') ? 'GET' : 'POST';
      var data = $form.serialize() + "&_method=" + method;

      $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'script'
      });

      e.preventDefault();
    });

 
  });

} else {
  alert('Neither the jQuery nor the Prototype javascript libraries were found.');
}