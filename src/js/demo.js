$('.demo-basic').click(function(){
  if($(this).is('.blue')){
    var type = 'blue';
  } else if($(this).is('.red')){
    var type = 'red';
  } else if($(this).is('.orange')){
    var type = 'orange';
  } else if($(this).is('.purple')){
    var type = 'purple';
  } else if($(this).is('.green')){
    var type = 'green';
  } else if($(this).is('.grey')){
    var type = 'grey';
  } else {
    var type = '';
  }
  var notification = Notifine.create(
    {
      content: {
        "title" : "This is a notification",
        "body" : "This is the body content of a notification. I'm pretty good looking aren't I?"
      },
      type: type
    }
  );
});

$('.demo-timing').click(function(){
  var notification = Notifine.create(
    {
      content: {
        "title" : "This is a notification",
        "body" : "This is the body content of a notification. I'm pretty good looking aren't I?"
      },
      type: "blue",
      time: parseInt($(this).attr('data-time'))
    }
  );
});

window.Dismiss_Demos = [];
$('.demo-dismiss').click(function(){
  if($(this).attr('data-action')=='create'){
    var notification = Notifine.create({
      content: {
        "title" : "This is a notification",
        "body" : "This is the body content of a notification. Click me to dismiss, or press the dismiss notification button"
      },
      type: "blue",
      time: 0
    });
    Dismiss_Demos.push(notification.id);
  } else {
    for (var i = 0; i < Dismiss_Demos.length; i++) {
      Notifine.dismiss(Dismiss_Demos[i]);
    };
    Dismiss_Demos = [];
  }
});

$('.demo-event').click(function(){
  var notification = Notifine.create(
    {
      content : {
        title : "Awesome Notification!",
        body : "This notification has event listeners for, click, mouse enter, mouse leave and dismiss. Try interact with it."
      },
      type : "orange",
      events : {
        onclick : function (notification) {
          demo_event_log('clicked',notification);
          return true;
        },
        onmouseenter : function (notification) {
          demo_event_log('mouse enter',notification);
          return true;
        },
        onmouseleave : function (notification) {
          demo_event_log('mouse leave',notification);
          return true;
        },
        onready : function (notification) {
          demo_event_log('ready',notification);
          return true;
        },
        ondismiss : function (notification) {
          demo_event_log('dismissed',notification);
          return true;
        }
      }
    }
  );
});

function demo_event_log(eventText,notification){
  $('.demo-event-log').append('<li>' + eventText + ' <i>(ID: ' + notification.id + ')</i></li>');
  $('.demo-event-log').scrollTop($('.demo-event-log')[0].scrollHeight);
}