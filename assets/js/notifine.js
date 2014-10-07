window.Notifine = (function () {
  var properties = {
    debugmode: false
  };

  var Create = function (content, type, time) {
    console.log(content);
    console.log(type);
    console.log(time);
    return true;
  }

  var Debug = function(message, type){
    if (properties.debugmode) {
      if(type=='log'){
        console.log(message);
      } else if(type=='error'){
        console.error(message);
      } else {
        console.error("Unknown debug type");
      }
    }
  }

  var notifine = {
    create: function (data) {
      if (typeof(data) === "object"){
        data.content = data.content || "";
        data.type = data.type || "";
        data.time = data.time || 3000;
        return Create(data.content, data.type, data.time);
      } else {
        Debug("Invalid input to Notifine.create(). Must pass object","error");
        return false;
      }
    },
    destroy: function () {

    },
    load: function(setproperties) {
      properties.debugmode = setproperties.debugmode || false;

      if ( !window.jQuery ) {
        Debug("notifine requires jQuery!","error");
        return false;
      }

      Debug("notifine loaded!","log");
    }
  };
   
  return notifine;
}());

Notifine.load({debugmode:true});