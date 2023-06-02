var BoberMan = new HTMLGame();

BoberMan.init(document.getElementById("BoberMan"),400,600,30,
    ["res/axe.wav","res/death.wav","res/background.mp3",
    "res/trunk3.png","res/trunk_left2.png","res/trunk_right2.png","res/root2.png",
    "res/bobr_R.png","res/bobr_action_R.png","res/bobr_L.png","res/bobr_action_L.png",
    "res/background4.png","res/arrow2.png","res/arrow1.png",
    "res/rip1.png","res/rip2.png","res/rip3.png","res/rip4.png","res/rip5.png",
    "res/board2.png","res/mute.png","res/best.png","res/boberman.png","res/wynik.png","res/n_start.png","res/lose.png","res/ponownie.png","res/unmute.png"]);

BoberMan.load();

function Root(game,masterobj)
{
    childOBJ.apply(this,[game,masterobj]);
}

function Trunk(game,masterobj)
{
    childOBJ.apply(this,[game,masterobj]);
}

function ManBody(game,masterobj)
{
    childOBJ.apply(this,[game,masterobj]);
}

function BackImage(game, masterobj) {
    childOBJ.apply(this, [game, masterobj]);
    this.musicOn = true;
    this.startBackroundMusic = function() {
      if (this.musicOn == false) return;
      game.audio_res[2].play();
      setTimeout(function() {
        this.startBackroundMusic();
      }.bind(this), 1000);
    };
  
    this.stopBackroundMusic = function() {
      this.musicOn = false;
      game.audio_res[2].pause();
      game.audio_res[2].currentTime = 0;
    };
  
    this.toggleMusic = function() {
      if (this.musicOn) {
        this.musicOn = false;
        this.stopBackroundMusic();
      } else {
        this.musicOn = true;
        this.startBackroundMusic();
      }
    };
  
    var buttonMute = new Image();
    buttonMute.src = "res/mute.png";
    buttonMute.style.position = "absolute";
    buttonMute.style.left = "180px";
    buttonMute.style.top = "260px";
    buttonMute.style.width = "50px";
    buttonMute.style.height = "50px";
    buttonMute.onclick = function() {
      this.toggleMusic();
    }.bind(this);
  
    document.getElementById("BoberMan").appendChild(buttonMute);
  
    this.startBackroundMusic();
  }

function Arrow(game,masterobj)
{
    childOBJ.apply(this,[game,masterobj]);
}

function ScoreBox(game,masterobj)
{
   childOBJ.apply(this,[game,masterobj]); 
   this.render=function(){
        game.context.fillStyle="#FFFFFF";
        game.context.font="40px Georgia";
        var neg_offset=-2;
        var score=game.getProp("score");
        if(score!=0)
        {neg_offset=-Math.floor(Math.log(score)/Math.log(10))*10-2;}
        game.context.fillText(score,this.left+neg_offset,this.top);
   };
}

function TimeBox(game,masterobj)
{
    childOBJ.apply(this,[game,masterobj]);
    this.bar_width=100;
    this.render=function()
    {
        
        game.context.strokeStyle="white";
        game.context.rect(this.left,this.top,this.width,this.height);
        game.context.stroke();
        game.context.fillStyle="#FF0000";
        var width=(this.bar_width<0)?0:this.bar_width;
        game.context.fillRect(this.left,this.top,width,this.height);
    }
    
    this.decrementBar=function(){
        if(game.getProp("mode")=="dead") return;
        
        if(this.bar_width<=0) {
            var dir=(game.map.home.foreground.man.body.left<200)?"left":"right";
            game.map.home.foreground.man.setDead(dir);return;
            }
        if(game.getProp("mode")!="started")
        {
            setTimeout(function(){this.decrementBar();}.bind(this),500);
            return;
        }
        else
        {
            if(game.getProp("level")<5)  
                {
                    this.bar_width-=(game.getProp("level")+1);
                }
                else{
                    this.bar_width-=5;
                }
                setTimeout(function(){this.decrementBar();}.bind(this),500);
            return;
        }
        
    };
}

function LevelBox(game,masterobj)
{
    childOBJ.apply(this,[game,masterobj]);
       this.render=function()
    {
        game.context.fillStyle="#FFFFFF";
        game.context.font="20px Georgia";
        var level=game.getProp("level");
        game.context.fillText("Poziom : "+ level,this.left,this.top);
    }
}

//tablica start
function StartBoard(game,masterobj)
{
    childOBJ.apply(this,[game,masterobj]);
    this.render=function(){
        this.game.context.drawImage(this.game.image_res[16],this.left,this.top -20,this.width,this.height+20);
        this.game.context.drawImage(this.game.image_res[19],this.left +35,this.top +20,230,45);
    } 
}

//tablica koncowa
function OverBoard(game,masterobj)
{
    childOBJ.apply(this,[game,masterobj]);
    this.render=function(){
        this.game.context.drawImage(this.game.image_res[16],this.left,this.top -20,this.width,this.height+20);
        this.game.context.drawImage(this.game.image_res[22],this.left +25,this.top +15,250,50);
        //wynik
        game.context.fillText(" : "+this.game.getProp("score"),this.left+150,this.top+105);
        this.game.context.drawImage(this.game.image_res[20],this.left +85,this.top +90,60,20);
        this.game.getProp("score"),this.left+150,this.top+105;
    } 
}

function StartButton(game, masterobj) {
    childOBJ.apply(this, [game, masterobj]);

    var buttonImage = new Image();
    buttonImage.src = "res/start.png";
    var buttonMute = new Image();
    buttonMute.src = "res/mute.png";
    // var buttonUnMute = new Image();
    // buttonUnMute.src = "res/unmute.png";

    var isClicked = false;
    var offsetY = 0;

    this.onMouseDown = function(event) {
        if (event.button === 0) { 
            isClicked = true;
            offsetY = 3;
        }
    };

    this.onMouseUp = function(event) {
        if (event.button === 0 && isClicked) { 
            //game.map.home.background.backimg.stopBackroundMusic();
        }
        isClicked = false;
        offsetY = 0;
    };
    
    // this.onUnMuteClick = function(event) {
    //     if (event.button === 0) {
    //         this.backimg.startBackroundMusic();
    //     }
    // };

    this.onMuteDoubleClick = function(event) {
        game.map.home.background.backimg.stopBackroundMusic();
    };

    this.render = function() {
        game.context.drawImage(buttonImage, this.left - 15, this.top + 30 + offsetY, 110, 60);
        this.game.context.drawImage(this.game.image_res[21], this.left + 12, this.top + 50 + offsetY, 60, 20);
        game.context.drawImage(buttonMute, this.left + 180, this.top + 260, 50, 50);
        //game.context.drawImage(buttonUnMute, this.left + 80, this.top + 260, 50, 50);
    };

    game.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    game.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    //game.canvas.addEventListener("mouseup", this.onUnMuteClick.bind(this));
    game.canvas.addEventListener("dblclick", this.onMuteDoubleClick.bind(this));
}
StartButton.prototype = Object.create(childOBJ.prototype);
StartButton.prototype.constructor = StartButton;


function RetryButton(game, masterobj) {
    childOBJ.apply(this, [game, masterobj]);

    var buttonImage = new Image();
    buttonImage.src = "res/start.png";

    var isClicked = false;
    var offsetY = 0;

    this.onMouseDown = function(event) {
        if (event.button === 0) { 
            isClicked = true;
            offsetY = 3;
        }
    };

    this.onMouseUp = function(event) {
        if (event.button === 0 && isClicked) { 
        }
        isClicked = false;
        offsetY = 0;
    };
    

    this.render = function() {
        game.context.drawImage(buttonImage, this.left - 33, this.top - 10 + offsetY, 143, 65);
        this.game.context.drawImage(this.game.image_res[23],this.left -3, this.top + 11 + offsetY, 85, 20);
    }
    game.canvas.addEventListener("mousedown", this.onMouseDown);
    game.canvas.addEventListener("mouseup", this.onMouseUp);
}




//GameOver Menu
function GameoverMenu(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    this.pushChild(new OverBoard(game,this));
    this.pushChild(new RetryButton(game,this));
    this.board=this.child_list[0];
    this.button=this.child_list[1];
    this.visible=false;
    this.init=function(){
        this.board.init(50,-200,200,300,true);
        this.button.init(160,-70,44,84,true);
    }
    
    this.show=function()
    {
        this.visible=true;
        this.board.top=-200;
        this.board.move(0,500,200,0);
        this.board.move(0,-100,100,200);
        this.button.top=-70;
        this.button.move(0,500,200,0);
        this.button.move(0,-100,100,200);
    }
    
    this.hide=function()
    {
        this.board.top=200;
        this.board.move(0,100,100,0);
        this.board.move(0,-500,200,100);
        this.button.top=330;
        this.button.move(0,100,100,0);
        this.button.move(0,-500,200,100);
        setTimeout(function(){this.visible=false;}.bind(this),400);
    }
}

//Start Menu
function StartMenu(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    
    this.pushChild(new StartBoard(game,this));
    this.pushChild(new StartButton(game,this));
    
    this.board=this.child_list[0];
    this.button=this.child_list[1];
    
    this.init=function(){
        this.board.init(50,200,200,300,true);
        this.button.init(160,280,44,84,true);
        this.visible=true;
    }
    
    this.show=function()
    {
        this.visible=true;
        this.board.top=-200;
        this.board.move(0,500,200,0);
        this.board.move(0,-100,100,200);
        this.button.top=-120;
        this.button.move(0,500,200,0);
        this.button.move(0,-100,100,200);
    }
    
    this.hide=function()
    {
        this.board.top=200;
        this.board.move(0,100,100,0);
        this.board.move(0,-500,200,100);
        
        this.button.top=280;
        this.button.move(0,100,100,0);
        this.button.move(0,-500,200,100);
        setTimeout(function(){this.visible=false;}.bind(this),400);
    }
}

//ScoreTime------------------------------------------------------------------------------------------

function ScoreTime(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    
    this.pushChild(new ScoreBox(game,this));
    this.pushChild(new TimeBox(game,this));
    this.pushChild(new LevelBox(game,this));
    
    this.score=this.child_list[0];
    this.time=this.child_list[1];
    this.level=this.child_list[2];
    
    this.init=function(){
      this.score.init(190,75,30,50,true);
      this.time.init(100,10,30,200,true);
      this.time.bar_width=100;
      //this.time.decrementBar();
      this.level.init(165,110,20,30,true);
    };
}

//ScoreTime END------------------------------------------------------------------------------------

//TREE------------------------------------------------------------------------------------------
function Tree(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    //Push Childs in order (first will be rendered first)
    this.pushChild(new Root(game,this));
    this.pushChild(new Trunk(game,this));
    this.pushChild(new Trunk(game,this));
    this.pushChild(new Trunk(game,this));
    this.pushChild(new Trunk(game,this));
    this.pushChild(new Trunk(game,this));
    
    this.root=this.child_list[0];
    
    this.init=function(){
        this.root.init(131,500,100,140,true);
        this.root.imgsrc=game.image_res[3];
        for(var i=1;i<this.child_list.length;i++)
        {
            var type=(i<=2)?"O":this.getNextType();
            if(type=="O") 
            {
             this.child_list[i].init(136,100*(this.child_list.length-1-i),101,128,true);
             this.child_list[i].imgsrc=game.image_res[0];   
            }
            else if(type=="L")
            {
             this.child_list[i].init(50,100*(this.child_list.length-1-i),101,205,true);
             this.child_list[i].imgsrc=game.image_res[1];   
            }
            else if(type=="R")
            {
             this.child_list[i].init(150,100*(this.child_list.length-1-i),101,205,true);
             this.child_list[i].imgsrc=game.image_res[2];   
            }
        }
    };
    this.priorityDraw=function()
    {
        this.child_list[4].draw();
        this.child_list[3].draw();
        this.child_list[2].draw();
        this.child_list[1].draw();
    }
    
    //nowe drzewa
    this.next_trunk=1;
    this.top_trunk_type="O";
    this.S0="O";
    this.S1="O";
    
    //Extra Functions
    this.cut=function(direction)
    {
        this.addNewTrunk();
        this.shift();
        this.throw_trunk(direction);
      
    };
    this.addNewTrunk=function()
    {
        var new_trunk=new Trunk(game,this);
        this.pushChild(new_trunk);
        var type=this.getNextType();
        
        if(type=="O") 
            {
             new_trunk.init(134,-100,101,130,true); 
             new_trunk.imgsrc=game.image_res[0];  
            }
            else if(type=="L")
            {
             new_trunk.init(50,-100,101,205,true);
             new_trunk.imgsrc=game.image_res[1];   
            }
            else if(type=="R")
            {
             new_trunk.init(149,-100,101,205,true);
             new_trunk.imgsrc=game.image_res[2];   
            }
        
    };

    this.getNextType = function() {
        if (this.top_trunk_type == "O") {
          var val = Math.floor((Math.random() * 5) + 1);
          if (val == 1) {
            this.top_trunk_type = "O";
            return "O";
          } else if (val == 2 || val == 3) {
            this.top_trunk_type = "L";
            return "L";
          } else {
            this.top_trunk_type = "R";
            return "R";
          }
        } else if (this.top_trunk_type == "L") {
          var val = Math.floor((Math.random() * 3) + 1);
          if (val == 1 || val == 2) {
            this.top_trunk_type = "O";
            return "O";
          } else {
            this.top_trunk_type = "L";
            return "L";
          }
        } else if (this.top_trunk_type == "R") {
          var val = Math.floor((Math.random() * 3) + 1);
          if (val == 1 || val == 2) {
            this.top_trunk_type = "O";
            return "O";
          } else {
            this.top_trunk_type = "R";
            return "R";
          }
        }
      }
    
    
    this.shift=function(){
      for(var i=this.next_trunk+1;i<this.child_list.length;i++)
      {
        this.child_list[i].move(0,100,150,0);
      }  
    };
    
    this.throw_trunk=function(direction){
        if(this.child_list.length==0) return;
      if(direction=="right")
      {
        this.child_list[this.next_trunk].rotate(90,400,0);
        this.child_list[this.next_trunk].move(250,-50,400,0);
      }
      else if(direction=="left")
      {
        this.child_list[this.next_trunk].rotate(-90,400,0);
        this.child_list[this.next_trunk].move(-250,-50,400,0);
      }
      this.removeChild_AA(this.child_list[this.next_trunk],function(){this.next_trunk--;}.bind(this));
      this.next_trunk++;  
    };
    
    this.setStates=function(){
      this.S0=this.fetchState(this.child_list[this.next_trunk]);
      this.S1=this.fetchState(this.child_list[this.next_trunk+1]);  
    };
    
    this.fetchState=function(trunk)
    {
        if(trunk.imgsrc==game.image_res[0]) return "O";
        else if(trunk.imgsrc==game.image_res[1]) return "L";
        else if(trunk.imgsrc==game.image_res[2]) return "R";
    }
    
    this.isDead=function(direction)
    {
        if(direction=="right" && this.S0=="L") return 0;
        else if(direction=="right" && this.S1=="L") return 1;
        else if(direction=="left" && this.S0=="R") return 0;
        else if(direction=="left" && this.S1=="R") return 1;
        else return 2;
    }
}
//TREE END-----------------------------------------------------------------------------------------------------

//MAN----------------------------------------------------------------------------------------------------------
function Man(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    
    this.pushChild(new ManBody(game,this));
    
    this.body=this.child_list[0];
    
    this.init=function(){
        this.body.init(30,400,150,160,true); 
        this.body.imgsrc=game.image_res[6];   
        this.isdead=false;
    };
    
    
    //Extra function
    this.move_man=function(direction)
    {
        if(direction=="right")
        {
            this.body.left=230;
            this.body.imgsrc=game.image_res[4];
            this.swap_img();
            
        }
        else
        {
            this.body.left=30;
            this.body.imgsrc=game.image_res[6];
            this.swap_img();
        }
    }
    
    this.swap_img=function()
    {
        if(this.body.imgsrc==game.image_res[4])
        {
            this.body.imgsrc=game.image_res[5];
            setTimeout(function(){if(!this.isdead)this.body.imgsrc=game.image_res[4];}.bind(this),50);
        }
        else
        {
            this.body.imgsrc=game.image_res[7];
            setTimeout(function(){if(!this.isdead)this.body.imgsrc=game.image_res[6];}.bind(this),50);
        }
    }
    
    //dead
    this.setDead = function(direction) {
        game.audio_res[1].play();
        this.isdead = true;
        this.body.top = 470;
        this.body.height = 60;
        this.body.width = 50;
    
        // losowy nagrobek
        var randomNumber = Math.floor(Math.random() * 5) + 11;
        this.body.imgsrc = game.image_res[randomNumber];
    
        if (direction == "left") {
            this.body.left = 60;
        } else {
            this.body.left = 280;
        }
    
        game.setProp("mode", "dead");
        game.map.home.background.backimg.stopBackroundMusic();
        game.map.home.foreground.overmenu.show();
        game.removeClickArea(2);
        game.removeClickArea(2);
        var highscore = game.getData("hs");
        if (highscore < game.getProp("score")) {
            game.setData("hs", game.getProp("score"));
        }
    }
    
    
}
//MAN END----------------------------------------------------------------------------------------------------------


//ARROWS----------------------------------------------------------------\
function Arrows(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    //Push Childs in order (first will be rendered first)
    this.pushChild(new Arrow(game,this));
    this.pushChild(new Arrow(game,this));
    
    //child Alising
    this.leftarrow=this.child_list[0];
    this.rightarrow=this.child_list[1];
    
    this.init=function(){
        this.leftarrow.init(30,350,36,104,true);
        this.rightarrow.init(270,350,36,104,true);
        this.leftarrow.imgsrc=game.image_res[9];
        this.rightarrow.imgsrc=game.image_res[10];
        this.visible=false;
    };
    
    this.move_arrow=function(){
        if(this.visible==false) return;
        this.leftarrow.move(-10,0,500,0);
        this.rightarrow.move(10,0,500,0);
        this.leftarrow.move(10,0,10,500);
        this.rightarrow.move(-10,0,10,500);
        setTimeout(function(){this.move_arrow();}.bind(this),600);
    };
}

//Arrows END--------------------------------------------------------------
function Foreground(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    //Push Childs in order (first will be rendered first)
    this.pushChild(new Tree(game,this));
    this.pushChild(new Man(game,this));
    this.pushChild(new Arrows(game,this));
    this.pushChild(new ScoreTime(game,this));
    this.pushChild(new StartMenu(game,this));   
    this.pushChild(new GameoverMenu(game,this));    
    
    //Child Alising
    this.tree=this.child_list[0];
    this.man=this.child_list[1];
    this.arrows=this.child_list[2];
    this.scoretime=this.child_list[3];
    this.startmenu=this.child_list[4];
    this.overmenu=this.child_list[5];
    
    this.init=function(){
      for(var i=0;i<this.child_list.length;i++)
      {
        this.child_list[i].init();
      }
    };
    
    //extra function
    this.cut=function(direction){
        this.tree.setStates();
        var opp_dir=((direction=="left")?"right":"left");
        var dead=this.tree.isDead(opp_dir);
        if(dead==0){
            this.man.setDead(direction);     
        }
        else if(dead==1)
        {

            this.tree.cut(opp_dir);
            this.man.setDead(direction); 
        }
        else
        {
            this.tree.cut(opp_dir);
            this.man.move_man(direction);
            game.setProp("score",game.getProp("score")+1);
            if(game.getProp("score")%50==0) game.setProp("level",game.getProp("level")+1);
            this.scoretime.time.bar_width+=1;
        }
    };
}

function Background(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    this.pushChild(new BackImage(game,this));
    this.backimg=this.child_list[0];
    this.init=function(){
      
        this.backimg.init(0,0,600,400,true);
        this.backimg.imgsrc=game.image_res[8];
        this.backimg.musicOn=true;
        this.backimg.startBackroundMusic();
    };
}

function Home(game,masterobj)
{
    MasterOBJ.apply(this,[game,masterobj]);
    this.pushChild(new Background(game,this));
    this.pushChild(new Foreground(game,this));
    
    this.background=this.child_list[0];
    this.foreground=this.child_list[1];
    
    this.init=function(){
        game.setProp("mode","startmenu"); 
      for(var i=0;i<this.child_list.length;i++)
      {
        this.child_list[i].init();
      }
      
      //initial config
      game.setProp("score",0);
      game.setProp("level",1);   
      var hs=game.getData("hs");
      if(hs=="") game.setData("hs","0"); 
      game.setProp("hs",game.getData("hs"));  
    };
    
    this.init();
}

var left_key=function(){
    if(BoberMan.getProp("mode")=="start") {
        BoberMan.map["home"].foreground.arrows.visible=false;
        BoberMan.setProp("mode","started");
        }
    if(BoberMan.getProp("mode")=="started") BoberMan.map["home"].foreground.cut("left");
    };
var right_key=function(){
    if(BoberMan.getProp("mode")=="start") {
        BoberMan.map["home"].foreground.arrows.visible=false;
        BoberMan.setProp("mode","started");
        }
    if(BoberMan.getProp("mode")=="started") BoberMan.map["home"].foreground.cut("right");
    };

BoberMan.addState("home",new Home(BoberMan,null));
BoberMan.addKeyDown(37,left_key);
BoberMan.addKeyDown(39,right_key);

//Click Event

var leftarea = {
    left:0,
    top:0,
    height:600,
    width:200,
    visible:true,
    container:null
}

var rightarea = {
    left:200,
    top:0,
    height:600,
    width:200,
    visible:true,
    container:null
}

BoberMan.addClickEvent(BoberMan.map.home.foreground.startmenu.button,function(){
    if(BoberMan.getProp("mode")=="startmenu")
    {
    BoberMan.setProp("mode","start"); 
    BoberMan.map.home.foreground.startmenu.hide();
    BoberMan.map.home.foreground.arrows.visible=true;
    BoberMan.map.home.foreground.arrows.move_arrow();
    BoberMan.map.home.foreground.scoretime.time.decrementBar();
    setTimeout(function(){
    BoberMan.addClickEvent(leftarea,left_key);
    BoberMan.addClickEvent(rightarea,right_key);},1);
    }
});

BoberMan.addClickEvent(BoberMan.map.home.foreground.overmenu.button,function(){
    if(BoberMan.getProp("mode")=="dead"){
        BoberMan.map["home"].foreground.overmenu.hide();
        setTimeout(function(){BoberMan.map["home"].foreground.startmenu.show();},400)
        setTimeout(function(){BoberMan.map["home"].init();},800);
    }
});



BoberMan.start("home");
