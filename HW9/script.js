$(document).ready(function(){

  let seasons = [
    {name:"summer", items:["images/cloud1.png","images/cloud2.png","images/cloud3.png"]},
    {name:"fall", items:["images/leaf1.png","images/leaf2.png","images/leaf3.png"]},
    {name:"winter", items:["images/snow1.png","images/snow2.png","images/snow3.png"]},
    {name:"spring", items:["images/rain1.png","images/rain2.png","images/rain3.png"]}
  ];

  let seasonIndex = 0;
  let itemIndex = 0;

  let texts = [
    "Summer...",
    "Fall...",
    "Winter...",
    "Spring...",
    "A new year begins..."
  ];
  let textIndex = 0;

  function changeText(){
    $("#text").fadeOut(500,function(){
      $(this).text(texts[textIndex]);
      let x = Math.random() * (window.innerWidth - 200);
      let y = Math.random() * (window.innerHeight - 100);
      $(this).css({left:x, top:y}).fadeIn(500).animate({left:x+200},3000);
      textIndex = (textIndex+1)%texts.length;
    });
  }
  setInterval(changeText,4000);
  changeText();

  function createItem(){
    let current = seasons[seasonIndex];
    let imgSrc = current.items[itemIndex];
    let item = $("<img class='outside-item'>").attr("src",imgSrc);

    if(current.name=="summer"){
      let size = 150 + Math.random()*100;
      item.css("width",size+"px");
    }

    $("#scene").append(item);

    let startY = Math.random()*(window.innerHeight-100);
    item.css({left:-100, top:startY});

    if(current.name=="winter"||current.name=="spring"){
      item.css({top:-100, left:Math.random()*window.innerWidth});
      item.animate({top:window.innerHeight+100},4000,"linear",function(){ $(this).remove(); });
    }
    else if(current.name=="fall"){
      item.animate({left:window.innerWidth+100, top:startY+200},6000,"linear",function(){ $(this).remove(); });
    }
    else{
      let duration = 6000 + Math.random()*4000;
      item.animate({left:window.innerWidth+100},duration,"linear",function(){ $(this).remove(); });
    }

    itemIndex = (itemIndex+1)%current.items.length;
  }

  setInterval(createItem,1000);

  function switchSeason(){
    seasonIndex = (seasonIndex+1)%seasons.length;
    itemIndex = 0;

    let current = seasons[seasonIndex].name;
    if(current=="summer") $("body").css("background","#88ddff");
    if(current=="fall") $("body").css("background","#d58b4f");
    if(current=="winter") $("body").css("background","#daedff");
    if(current=="spring") $("body").css("background","#7fee90");
  }
  setInterval(switchSeason,10000);

});