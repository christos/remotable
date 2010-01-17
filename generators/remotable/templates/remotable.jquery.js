if(typeof jQuery == 'function') {

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
      var $link = $(this);

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

    $("form[data-remote='true']").live('submit', function(e) {
      $this = $(this);
      var method = $this.find('input[name=_method]').val() || $this.attr('data-method') || $this.attr('method');
      
      var url = $this.attr('action');
      var type = (method == 'get') ? 'GET' : 'POST';
      var data = $this.serialize() + "&_method=" + method;
      
      $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'script',
        beforeSend: function() {
          $this.trigger('form:beforeSend');
        },
        success: function() {
          $this.trigger('form:success');
        }, 
        error: function(response, status, error) {
          $this.trigger('form:error', [response, status, error]);
        },
        complete: function() {
          $this.trigger('form:complete');
        }
      });

      e.preventDefault();
      
    });

}