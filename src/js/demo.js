$('.demo-simple').click(function(){
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
  Notifine.create({
    content: {
      "title" : "This is a notification",
      "body" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    type: type
  });
});

Notifine.create({
  content : {
    title : "Awesome Notification!",
    body : "This notification cannot be dismissed! It also has event listeners for, click, mouse enter and mouse leave."
  },
  type : "orange",
  time : 0,
  events : {
    onclick : function () {
      console.log('clicked');
      return false; // So it cannot be dismissed
    },
    onmouseenter : function () {
      console.log('mouse enter');
      return true;
    },
    onmouseleave : function () {
      console.log('mouse leave');
      return true;
    }
  }
});
