$('.trigger').click(function(){
  var colours = ["","blue","red","orange","purple","green"];
  var bodys = [
    "You have been notified",
    "You have a new follower! Feel the fame flow through your vains!",
    "Windows 10 represents the first step of a whole new generation of Windows. Windows 10 unlocks new experiences for customers to work, play and connect.",
    "Bicycle 2.4 km, 8 min. Use caution - may involve errors or sections not suited for bicyclings. ya content."
  ];

  Notifine.create({
    content: {
      "title" : "This is a notification",
      "body" : bodys[Math.floor(Math.random() * bodys.length)]
    },
    type: colours[Math.floor(Math.random() * colours.length)]
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
