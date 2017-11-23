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
$('body').css('overflow', 'hidden');


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


// --------------------------------------- html events  -----------------------
	
	var btns = document.getElementsByClassName("button");
	var texts = document.getElementsByClassName("btnText");
	
	function showText(e){
		console.log(e);
		texts[e].style.visibility = "visible";
	}

	function hide(e){
		texts[e].style.visibility = "hidden";
	}


// --------- click project list button	

$(btns[0]).click(function(){
	if(homePageState){
		// move two rectangle
		$("#rectTitle").animate(
			{ left: "-240px"}, 
			500,
			function(){}	
    	);
    	$("#rectWelcome").animate(
    		{left: "32%"},
    		700,
    		function(){}
    	);

    	// move up list
    	$("#list").animate(
    		{ top: "5vh"},
    		700,
    		function(){}
    	);

    	homePageState = false;
    	projectListState = true;
    	floorPlanState = false;
    }else{
    	if (floorPlanState) {
    		//move down floor plan
    		$("#floorPlan").animate({ top: "100%"}, 700, function(){});

    		//move up project list
    		$("#list").animate(
    			{ top: "5vh"},
    			700,
    			function(){}
    	);
    		floorPlanState = false;
    		projectListState = true;
    	}
    }
  
});

// ---------- click floor plan button

$(btns[1]).click(function(){
	if (homePageState) {
		// move two rectangle
		$("#rectTitle").animate(
			{ left: "-240px"}, 
			500,
			function(){}	
    	);

    	$("#rectWelcome").animate(
    		{left: "32%"},
    		700,
    		function(){}
    	);

		// move up floor plan
		$("#floorPlan").animate(
    		{ top: "5vh"},
    		700,
    		function(){}
    	);

		homePageState = false;
    	projectListState = false;
    	floorPlanState = true;

	}else{
		if (projectListState) {
			// move down project list
			$("#list").animate({ top: "100%"}, 700, function(){});
			// move up floor plan
			$("#floorPlan").animate(
    		{ top: "5vh"},
    		700,
    		function(){}
    	);

			projectListState = false;
			floorPlanState = true;
		}
	}

});

// ---------- click IMAGE
$("#floorImg").click(function(){
	
});



// ---------- click name go back to homepage

function goToHomepage(){
	console.log("goToHomepage");
	$("#rectTitle").animate({ left: "0%" }, 500, function(){});
	$("#rectWelcome").animate({ left: "0%"}, 700, function(){});

	if (projectListState) {
		$("#list").animate({ top: "100%"}, 700, function(){});
	}
	
	if (floorPlanState) {
		$("#floorPlan").animate({ top: "100%"}, 700, function(){});
	}

	homePageState = true;
	floorPlanState = false;
	projectListState = false;
	
}

// -------  d3 load name list;

// function loadCSV(){
// 	console.log("a");
// 	d3.csv('data/userInfo_real.csv',function(d){
// 		// console.log(d);
// 		dothings(d, ['name','title', 'url']);
// 	});
// }

// function dothings(data, columns){
// 		var table = d3.select('#list').append('table');
// 		var thead = table.append('thead')
// 		var	tbody = table.append('tbody');

// 		// append the header row
// 		thead.append('tr')
// 		  .selectAll('th')
// 		  .data(columns).enter()
// 		  .append('th')
// 		  .text(function (column) {
// 		   return column; 
// 		});

// 		// create a row for each object in the data
// 		var rows = tbody.selectAll('tr')
// 		  .data(data)
// 		  .enter()
// 		  .append('tr');


// 		// create a cell in each row for each column

// 		//fetch name list show as text
// 		var cells = rows.selectAll('td')
// 		  .data(function (row) {
// 		    return columns.slice(0,1).map(function (column) {
// 					if(column == "name"){
// 						return {column: column, value: row[column]};
// 					}
// 		    });

// 		  })
// 		  .enter()
// 		  .append('td')
// 		  .text(function (d) { 
// 		  	 // console.log(d);
// 		  	return d.value; 
// 		  });


		 //fetch url list add class "url_"--------------------------------
		  // var cells_2 = rows.selectAll('.tdd')
		  // .data(function (row) {
		  // 	// console.log(columns)

		  //   return columns.slice(2,3).map(function (column) {
				// 	if(column == "url"){
				// 		return {column: column, value: row[column]};
				// 	}
		  //   });
		  // })
		  // .enter()
		  // .append('td')
		  // .attr('class','url_')


		  // d3.selectAll('.url_')
		  // .append('a')
		  // .text(function(d){
		  // 	 console.log(d)
		  // 	return d.value
		  // })
		  // .attr('href',function(d){
		  // 	 //console.log(d)
		  // 	return "http://"+d.value
		  // })


		  //fetch url list add class "url_"--------------------------------

	function loadCSV(){
		// console.log("a");
		d3.csv('data/userInfo_real.csv',function(d){
		// console.log(d);
		dothings(d, ['NAME','TITLE', 'url']);
		});
	}

	function dothings(data, columns){
		var table = d3.select('#list').append('table');
		var thead = table.append('thead')
		var	tbody = table.append('tbody');

		// append the header row
		var newCol = columns.slice(0,2);
		thead.append('tr')
		  .selectAll('th')
		  .data(newCol).enter()
		  .append('th')
		  .text(function (column) {
		   return column; 
		});

		// create a row for each object in the data
		var name = [];
		var title = [];
		var url = [];

		var rows = tbody.selectAll('tr')
		  .data(data)
		  .enter()

		// push name[]  
		rows.selectAll('td')
		  .data(function (row) {		  	
		    return columns.slice(0,1).map(function (column) {
					if(column == "NAME"){
						name.push(row[column]);
					}
		    });

		  })

		// push title[]
		rows.selectAll('td')
		  .data(function (row) {		  	
		    return columns.slice(1,2).map(function (column) {
					if(column == "TITLE"){
						title.push(row[column]);
					}
		    });

		  })

		// push url[]
		rows.selectAll('td')
		  .data(function (row) {		  	
		    return columns.slice(2,3).map(function (column) {
					if(column == "url"){
						url.push(row[column]);
					}
		    });

		  })

		// add name[] content to td
		for (var i = 0; i < data.length; i++) {
			tbody
			.append('tr')
			.attr('id', i)
			.append('td')
			.text(name[i])
			
		}

		// add title[] content to td, add url[] to each title
		for (var i = 0; i < data.length; i++) {
			var cell = tbody.select('[id="'+i+'"]')
			.append('td')
			.append('a')
			.text(title[i])
			.attr('href', url[i])
		}
	  
	}

	// ----------- hover

$("tbody ").hover(function(){
	console.log("hover");
});


