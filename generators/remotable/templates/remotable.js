if (typeof Prototype == 'object') {
  
  document.observe("dom:loaded", function () {

    $(document.body).observe("click", function(event) {
      var $link = event.findElement("a");
      if($link && 'true' == $link.readAttribute('data-remote')) {
        var method = $link.readAttribute('data-method') || "get";
        var token = $link.readAttribute('data-authenticity_token') || null;
        var params = {authenticity_token: token};
        if (method == 'get') {
          params = null;
        }
        new Ajax.Request($link.readAttribute('href'), {
          method: method, 
          parameters: params,
          onLoaded: function() {
            $link.fire('link:beforeSend');
          },
          onSuccess: function() {
            $link.fire('link:success');
          }, 
          onFailure: function(response, status, error) {
            $link.fire('link:error', [response, status, error]);
          },
          onComplete: function() {
            $link.fire('link:complete');
          }          
        });
        event.stop();
      }

      elem = event.findElement('input');
      var form = elem && elem.up('form[data-remote="true"]');
      if(elem && 'submit' == elem.readAttribute('type') && form) {
        form.request(
          {onLoaded: function() {
            $link.fire('form:beforeSend');
          },
          onSuccess: function() {
            $link.fire('form:success');
          }, 
          onFailure: function(response, status, error) {
            $link.fire('form:error', [response, status, error]);
          },
          onComplete: function() {
            $link.fire('form:complete');
          }
        });
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
      var $link = $(e.target);

      var method = $link.attr('data-method') || 'get';
      var url = $link.attr('href');
      var type = (method == 'get') ? 'GET' : 'POST';
      var token = $link.attr('data-authenticity_token');
      var data = "_method=" + method;
      data += '&authenticity_token=' + token;
      
      $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'script',
        beforeSend: function() {
          $link.trigger('link:beforeSend');
        },
        success: function() {
          $link.trigger('link:success');
        }, 
        error: function(response, status, error) {
          $link.trigger('link:error', [response, status, error]);
        },
        complete: function() {
          $link.trigger('link:complete');
        }
      });

      e.preventDefault();
    });

    $("form[data-remote='true'] input[type='submit'], form[data-remote='true'] button[type='submit']").live('click', function(e){
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
        dataType: 'script',
        beforeSend: function() {
          $form.trigger('form:beforeSend');
        },
        success: function() {
          $form.trigger('form:success');
        }, 
        error: function(response, status, error) {
          $form.trigger('form:error', [response, status, error]);
        },
        complete: function() {
          $form.trigger('form:complete');
        }
      });

      e.preventDefault();
    });
 
  });

} else {
  alert('Neither the jQuery nor the Prototype javascript libraries were found.');
}