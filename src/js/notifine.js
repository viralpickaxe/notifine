window.Notifine = (function () {
  var props = {
    debugmode: false,
    container: '.notifine-notifications'
  };

  var GenerateID = function () {
    var generated = "";
    var possible = "bdfhjlnprtvxz0123456789";

    for (var i=0; i < 5; i++) {
      generated += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    if (typeof(Notifine.notifications[generated])==='undefined') {
      return generated;
    } else {
      return GenerateID();
    }
  }

  var Debug = function(message, type){
    if (props.debugmode) {
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
    notifications: {},
    create: function (data) {
      if (typeof(data) === "object"){
        data.content = data.content || {};
        data.content.title = data.content.title || "";
        data.content.body = data.content.body || "";
        data.type = data.type || "";
        data.events = data.events || {};
        data.events.onclick = data.events.onclick || function(){return true;};
        data.events.onmouseenter = data.events.onmouseenter || function(){return true;};
        data.events.onmouseleave = data.events.onmouseleave || function(){return true;};
        data.events.ondismiss = data.events.ondismiss || function(){return true;};
        if (typeof(data.time)==='undefined') { data.time = 5000; }

        var $notification = $('<div class="notifine-notification ' + data.type + '" style="display: none;"></div>');
        var $notification_content = $('<div class="info"><h1>' + data.content.title + '</h1><p>' + data.content.body + '</p></div><div class="side"><br></div>');

        var newnotif = data;
        newnotif.id = GenerateID();

        Notifine.notifications[newnotif.id] = newnotif;

        $notification.attr('data-id',newnotif.id).html($notification_content);

        $(props.container).append($notification).children().last().fadeIn(300);
        $(props.container).scrollTop($(props.container)[0].scrollHeight);

        if(data.time>0){
          newnotif.timer = setTimeout("Notifine.destroy('" + newnotif.id + "')",data.time);
        }

        Debug(newnotif,"log");
        return newnotif;
      } else {
        Debug("Invalid input to Notifine.create(). Must pass object","error");
        return false;
      }
    },
    destroy: function (id) {
      if (typeof(Notifine.notifications[id]) === 'object'){
        if (typeof(Notifine.notifications[id].timer) !== 'undefined') {
          clearTimeout(Notifine.notifications[id].timer);
        }
        Notifine.notifications[id].events.ondismiss();
        delete Notifine.notifications[id];
        $(props.container).find('[data-id="' + id + '"]').fadeOut(200,function(){$(this).remove();})
        return true;
      } else {
        Debug("Invalid notification id","error");
        return false;
      }
    },
    dismiss: function (id) {
      Notifine.destroy(id);
    },
    load: function(setprops) {
      props.debugmode = setprops.debugmode || false;

      if ( !window.jQuery ) {
        Debug("notifine requires jQuery!","error");
        return false;
      }

      $(document.body).prepend($('<div class="notifine-notifications"></div>'));

      Debug("notifine loaded!","log");
    }
  };
   
  return notifine;
}());

$(document).ready(function(){
  $('.notifine-notifications').on('click','.notifine-notification',function(){
    var id = $(this).attr('data-id');
    if (typeof(Notifine.notifications[id]) !== 'undefined') {
      var evt = Notifine.notifications[id].events.onclick();
      if (evt) { Notifine.destroy(id); }
      return evt;
    } else {
      return false;
    }
  });
  $('.notifine-notifications').on('mouseenter','.notifine-notification',function(){
    var id = $(this).attr('data-id');
    if (typeof(Notifine.notifications[id]) !== 'undefined') {
      var evt = Notifine.notifications[id].events.onmouseenter();
      return evt;
    } else {
      return false;
    }
  });
  $('.notifine-notifications').on('mouseleave','.notifine-notification',function(){
    var id = $(this).attr('data-id');
    if (typeof(Notifine.notifications[id]) !== 'undefined') {
      var evt = Notifine.notifications[id].events.onmouseleave();
      return evt;
    } else {
      return false;
    }
  });
});

Notifine.load({debugmode:true});