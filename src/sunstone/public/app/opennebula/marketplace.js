define(function(require) {
  var OpenNebulaAction = require('./action');
  var OpenNebulaError = require('./error');

  var RESOURCE = "MARKETPLACE";

  var Marketplace = {
    "show" : function(params) {
      params.error = function() {
        return notifyError("Cannot connect to OpenNebula Marketplace")
      };
      OpenNebulaAction.show(params, RESOURCE);
    },
    "list" : function(params) {
      //Custom list request function, since the contents do not come
      //in the same format as the rest of opennebula resources.
      var callback = params.success;
      var callback_error = params.error;
      var timeout = params.timeout || false;
      var request = OpenNebula.Helper.request('MARKETPLACE', 'list');

      $.ajax({
        url: 'marketplace',
        type: 'GET',
        data: {timeout: timeout},
        dataType: "json",
        success: function(response) {
          $(".marketplace_error_message").hide();
          return callback ? callback(request, response) : null;
        },
        error: function(res) {
          $(".marketplace_error_message").show();
          return callback_error ? callback_error(request, OpenNebulaError(res)) : null;
        }
      });
    }
  }

  return Marketplace;
})