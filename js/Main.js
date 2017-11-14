/************************************* 
Code is based on the walkthough here: http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript 
**************************************/


var cnvs = document.getElementById('textflow');
var cntxt = cnvs.getContext('2d');

var homePageState = true;
var projectListState = false;
var floorPlanState = false;

var chars = '123456789�☐�☐�☐��☐�☐�☐��☐��☐��☐�☐�???☐�☐�☐�☐��☐�☐�☐��☐��☐��☐�☐�???☐�udj.Zf#$$#$#%^***+++==VE@@@.datatempzxyYXcache;>'; // om
chars = chars.split(''); // make array
var font_size = 14;

// see: https://blog.codepen.io/2013/07/29/full-screen-canvas/
function resizeCanvas() {
  cnvs.width = window.innerWidth;
  cnvs.height = window.innerHeight;
};

window.onresize = resizeCanvas();
resizeCanvas();


var columns = cnvs.width/font_size;
var drops = [];
for(var x=0;x<columns;x++){
  drops[x]=1;
}

function draw(){
  
  cntxt.fillStyle = 'rgba(0,0,0,0.01)';
  cntxt.fillRect(0,0,cnvs.width,cnvs.height);
  cntxt.fillStyle = '#FFF';
  cntxt.font = font_size + 'px helvetica';
  
  for(var i=0;i<drops.length;i++){
    var txt = chars[Math.floor(Math.random()*chars.length)];
    if(Math.random()>0.8){
      cntxt.fillText(txt, drops[i]*font_size, i*font_size);
    }
    
    if(drops[i]*font_size>cnvs.width&&Math.random()>0.975){
      drops[i] = 0; // back to the top!   
    }
    drops[i]++;
  }
}

setInterval(draw, 10);


// html button events
	var btns = document.getElementsByClassName("button");
	var texts = document.getElementsByClassName("btnText");
	
	function showText(e){
		console.log(e);
		texts[e].style.visibility = "visible";
	}

	function hide(e){
		texts[e].style.visibility = "hidden";
	}
	

$(btns[0]).click(function(){
	$("#rectTitle").animate(
		{ left: "-240px"}, 
		500,
		function(){}	
    );
    $("#welcomeInfo").animate(
    	{left: "300vw"},
    	700,
    	function(){}
    );
    $("#list").animate(
    { top: "5vh"},
    	700,
    	function(){}
    );

});

function goToHomepage(){
	console.log("goToHomepage");
	$("#rectTitle").animate({ left: "0 px" }, 500, function(){});
	$("#list").animate({ top: "100%"}, 700, function(){});
	$("#welcomeInfo").animate({ right: "0%"}, 700, function(){});
}

// d3 load name list;

function loadCSV(){
	console.log("a");
	d3.csv('data/userInfo_real.csv',function(d){
		console.log(d);
		dothings(d, ['name', 'url']);
	});
}



function dothings(data, columns){
		var table = d3.select('#list').append('table');
		var thead = table.append('thead')
		var	tbody = table.append('tbody');

		// append the header row
		thead.append('tr')
		  .selectAll('th')
		  .data(columns).enter()
		  .append('th')
		  .text(function (column) { return column; });

		// create a row for each object in the data
		var rows = tbody.selectAll('tr')
		  .data(data)
		  .enter()
		  .append('tr');

		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		  .data(function (row) {
		    return columns.map(function (column) {
		      return {column: column, value: row[column]};
		    });
		  })
		  .enter()
		  .append('td')
		  .text(function (d) { return d.value; });
}
