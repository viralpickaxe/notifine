window.Notifine = (function () {
  var props = {
    debugmode: false,
    container: $('.notifine-notifications')
  };

  window.notifications = {};

  var GenerateID = function () {
    var generated = "";
    var possible = "bdfhjlnprtvxz0123456789";

    for (var i=0; i < 5; i++) {
      generated += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    if (typeof(notifications[generated])==='undefined') {
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
    create: function (data) {
      if (typeof(data) === "object"){
        data.content = data.content || {};
        data.content.title = data.content.title || "";
        data.content.body = data.content.body || "";
        data.type = data.type || "";
        data.time = data.time || 3000;

        var $notification = $('<div class="notifine-notification ' + data.type + '" style="display: none;"></div>');
        var $notification_content = $('<div class="info"><h1>' + data.content.title + '</h1><p>' + data.content.body + '</p></div><div class="side"></div>');

        var newnotif = data;
        newnotif.id = GenerateID();

        notifications[newnotif.id] = newnotif;

        $notification.attr('data-id',newnotif.id).html($notification_content);
        props.container.append($notification).children().last().fadeIn(400);
        return newnotif;
      } else {
        Debug("Invalid input to Notifine.create(). Must pass object","error");
        return false;
      }
    },
    destroy: function (id) {
      if (typeof(notifications[id])==='object'){
        delete notifications[id];
        props.container.find('[data-id="' + id + '"]').fadeOut(400,function(){$(this).remove();})
        return true;
      } else {
        Debug("Invalid notification id","error");
        return false;
      }
    },
    load: function(setprops) {
      props.debugmode = setprops.debugmode || false;

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


// Demo notifications

setTimeout(function(){
  console.log(Notifine.create({content:{title:"This is a notification",body:"You have been notified"},type:"green"}));
},500);
setTimeout(function(){
  Notifine.create({content:{title:"This is a notification",body:"You have been notified"},type:"grey"});
},1500);
setTimeout(function(){
  Notifine.create({content:{title:"@somebody followed you",body:"You have a new follower! Feel the fame flow through your vains!"},type:"red"});
},3000);
setTimeout(function(){
  console.log(Notifine.create({content:{title:"Windows 10 preview is here",body:"Windows 10 represents the first step of a whole new generation of Windows. Windows 10 unlocks new experiences for customers to work, play and connect."},type:"orange"}));
},3200);
setTimeout(function(){
  Notifine.create({content:{title:"8 min to home with a bicycle",body:"Bicycle 2.4 km, 8 min. Use caution - may involve errors or sections not suited for bicyclingsa"},type:"purple"});
},4000);