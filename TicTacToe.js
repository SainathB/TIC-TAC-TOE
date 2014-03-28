var mark="global";
var gameover="global";
var gameover=0;
mark=[0,0,0,0,0,0,0,0,0];
var symbol="global";
symbol=[12,13,14,15,16,17,18,19,20];
function allmarked(mark)
{
	var count=0;
	var i=0;
	while(i<9)
	{
		if(mark[i]==1)
			count++;
		i++;
	}
	if(count==9)
		return 1;
	return 0;
}

function win(status)
{
	setTimeout(
	function()
  { 
  document.getElementById('game').style.display='none';
  if(status==1)
    {//alert("You win");
      document.getElementById('uwin').style.display='';
    }
  else if(status==2)
    {//alert("I win");
      document.getElementById('iwin').style.display='';
    }
  else if(status==3)
    {//alert("Draw!");
      document.getElementById('draw').style.display='';
    }
    document.getElementById('resetgame').onclick = function(){
      mark=[0,0,0,0,0,0,0,0,0];
      symbol=[12,13,14,15,16,17,18,19,20];
      gameover=0;
      for (var i = 0; i < 9; i++) {
        mark[i]=0;
        document.getElementById("block"+(i+1)).innerHTML="";
      };
      document.getElementById('uwin').style.display='none';
      document.getElementById('iwin').style.display='none';
      document.getElementById('draw').style.display='none';
      document.getElementById('game').style.display='';
    }
  },1000);
}

function winningstatus()
{
	if(symbol[0]==symbol[1] && symbol[1]==symbol[2])
	{
		return 1;
	}
	else if(symbol[3]==symbol[4] && symbol[4]==symbol[5])
	{
		return 1;
	}
	else if(symbol[6]==symbol[7] && symbol[7]==symbol[8])
	{
		return 1;
	}
	else if(symbol[0]==symbol[3] && symbol[3]==symbol[6])
	{
		return 1;
	}
	else if(symbol[1]==symbol[4] && symbol[4]==symbol[7])
	{
		return 1;
	}
	else if(symbol[2]==symbol[5] && symbol[5]==symbol[8])
	{
		return 1;
	}
	else if(symbol[0]==symbol[4] && symbol[4]==symbol[8])
	{
		return 1;
	}
	else if(symbol[2]==symbol[4] && symbol[4]==symbol[6])
	{
		return 1;
	}
	return 0;
}
function markthebox(id)
{
  
  var x=id.id;
  var p=x[x.length-1];
  //document.write(p);
  if(mark[p-1]==0)
  {
  	
  	
  	id.innerHTML="<img src='dot.png' style='height:100%;width:100%'>";
  	mark[p-1]=1;
  	symbol[p-1]=0;

  	if(winningstatus()&&gameover==0)
  	{
  		win(1);
  		gameover=1;
  	}
  	
  	if(allmarked(mark)&&gameover==0)
  	{
  		win(3);
  		gameover=1;
  	}
  	var done=0;
  	var unmarked;
  	var mm=0;
  	while(mm<9)
  	{
  		if(mark[mm]==0)
  		{
  			//document.getElementById("block"+(mm+1)).innerHTML="<img src='cross.png' style='height:100%;width:100%'>";
  			mark[mm]=1;
  			var temp=symbol[mm];
  			symbol[mm]=1;
  			unmarked=mm;
  			if(winningstatus())
  			{
  				done=1;
  				document.getElementById("block"+(mm+1)).innerHTML="<img src='cross.png' style='height:100%;width:100%'>";
  				//document.write(mm+1);
  				break;
  			}
  			
  				mark[mm]=0;
  				symbol[mm]=temp;
  		
  			
  		}
  		mm++;
  	}
  	if(done==0)
  	{
  		var mm=0;
  	while(mm<9)
  	{
  		if(mark[mm]==0)
  		{
  			//document.getElementById("block"+(mm+1)).innerHTML="<img src='cross.png' style='height:100%;width:100%'>";
  			mark[mm]=1;
  			var temp=symbol[mm];
  			symbol[mm]=0;
  			unmarked=mm;
  			if(winningstatus())
  			{
  				done=1;
  				document.getElementById("block"+(mm+1)).innerHTML="<img src='cross.png' style='height:100%;width:100%'>";
  				//document.write(mm+1);
  				symbol[mm]=1;
  				break;
  			}
  			
  				mark[mm]=0;
  				symbol[mm]=temp;
  		
  			
  		}
  		mm++;
  	}

  	}
  	if(done==0)
  	{
  		mark[unmarked]=1;
  		symbol[unmarked]=1;
  		document.getElementById("block"+(unmarked+1)).innerHTML="<img src='cross.png' style='height:100%;width:100%'>";
  	}


  	if(winningstatus()&&gameover==0)
  	{
  		win(2);
  		gameover=1;
  	}
  	if(allmarked(mark)&&gameover==0)
  	{
  		win(3);
  		gameover=1;
  	}
 
  	

  }

}

var random=Math.floor(Math.random()*9+1);

//document.write(random);
document.getElementById("block"+random).innerHTML="<img src='cross.png' style='height:100%;width:100%'>";
mark[random-1]=1;
symbol[random-1]=1;






