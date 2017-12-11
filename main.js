var toggled = false;
var all_the_nouns = [];
/* colors */
var toStart = 0;

function invert(start, end, steps, count) {

    var s = end,
        e = start,
        final = s + (((e - s) / (steps / 2)) * (count * 2));
    return Math.floor(final);

}

function Interpolate(start, end, steps, count) {
    var s = start,
        e = end,
        final = s + (((e - s) / steps) * count);
    return Math.floor(final);
}

function Color(_r, _g, _b) {
    var r, g, b;
    var setColors = function(_r, _g, _b) {
        r = _r;
        g = _g;
        b = _b;
    };

    setColors(_r, _g, _b);
    this.getColors = function() {
        var colors = {
            r: r,
            g: g,
            b: b
        };
        return colors;
    };
}

function classToAdd(d){
	var hour = d.getHours();
  val = hour
  val = (hour/24) * 100;


	 		red = new Color(0,0,255),
      white = new Color(255,182,193),
      green = new Color(255,255,255),


      red2 = new Color(255,255,255),
      white2 = new Color(0,0,255),
      green2 = new Color(0,0,255),


      start = green,
      end = white;

      start2 = green2,
      end2 = white2;

      console.log(hour)
      console.log(val)
  

  if (val > 50) {
      start = white,
      end = red;
      start2 = white2,
      end2 = red2;
      val = val % 50;
  }
  var startColors = start.getColors(),
      endColors = end.getColors();
  var startColors2 = start2.getColors(),
      endColors2 = end2.getColors();
  var r = Interpolate(startColors.r, endColors.r, 24, val);
  var g = Interpolate(startColors.g, endColors.g, 24, val);
  var b = Interpolate(startColors.b, endColors.b, 24, val);

  var r2 = Interpolate(startColors2.r, endColors2.r, 24, val);
  var g2 = Interpolate(startColors2.g, endColors2.g, 24, val);
  var b2 = Interpolate(startColors2.b, endColors2.b, 24, val);
  if (hour == 14) {
    return ["rgb(" + r + "," + g + "," + b + ")","rgb(" + 33 + "," + 33 + "," + 255 + ")"]
  } else if (hour == 15){
    return ["rgb(" + r + "," + g + "," + b + ")","rgb(" + 210 + "," + 210 + "," + 255 + ")"]
  } else{
    return ["rgb(" + r + "," + g + "," + b + ")","rgb(" + r2 + "," + g2 + "," + b2 + ")"]

  }
	
}

/* END COLORS */


function randomFromArray(myArray){

	var rand = myArray[Math.floor(Math.random() * myArray.length)];
  return rand;
}



var control = document.getElementById("source-file"); /* BROWSE BUTTON */
control.addEventListener("change", function(event) {
    var files = control.files;
    readFile(files[0]);
}, false);


/* READ JSON FILE */
function readFile(source) { 
    document.getElementById("searches").innerHTML = "<span class='loading'>Loading...</span>"; 
    var reader = new FileReader();
    reader.onload = function(e) {
        parse(reader.result); 
    }
    reader.readAsText(source);
}
var queries = [];

function parse(input) { 
    searches = JSON.parse(input);
    events = searches.event.reverse();
    length = events.length;
    document.getElementById("searches").innerHTML = ""; 
    for(i = 0; i < length; i++) { 
        queries.push([events[i]["query"]["query_text"], new Date(parseInt(events[i]["query"]["id"][0]["timestamp_usec"])/1000)]);
    }
    readIt();
    $('.overlay').css('display', 'none');
    $( "#slider" ).css('opacity',1)
    
    	$('#options').addClass('on');
    	$('#start').text((queries[0][1].getMonth() + 1) + '/' + queries[0][1].getDate() + '/' +  queries[0][1].getFullYear())
    	$('#finish').text((queries[queries.length - 1][1].getMonth() + 1) + '/' + queries[queries.length - 1][1].getDate() + '/' +  queries[queries.length - 1][1].getFullYear())

}


function prettyDate(date){
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
}

function displayQuery(queryNum){
  toStart = queryNum;
	$('.date').text(prettyDate(queries[queryNum][1]) + " "+ (queries[queryNum][1].getMonth() + 1) + '/' + queries[queryNum][1].getDate() + '/' +  queries[queryNum][1].getFullYear())
	$('.search').text(queries[queryNum][0])
	$('body').css('background', classToAdd(queries[queryNum][1])[0]).css('color', classToAdd(queries[queryNum][1])[1])
  $('.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover,.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, .ui-button, html .ui-button.ui-state-disabled:hover, html .ui-button.ui-state-disabled:active').css('border', '2px solid '+ classToAdd(queries[queryNum][1])[1])
  $('#slider').css('background', classToAdd(queries[queryNum][1])[1])
  $('.policy a').css('color', classToAdd(queries[queryNum][1])[1])
}



$(window).keypress(function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault()
    if (toggled == false) {
      toggled = !toggled; 

    }else{
      toggled = !toggled; 
      readIt()
    }
    
  }
})


function readIt(){


  var random = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
	var i = toStart, l = queries.length;

   $( "#slider" ).slider({
    	value:0,
      min: 0,
      max: queries.length - 1,
      step: 1,
      slide: function( event, ui ) {
        displayQuery(ui.value)
        toggled = true;
      },
      change: function(event, ui) { 
        toStart = ui.value; 
      } 

    });
	(function iterator() {
     

      $('.date').text(prettyDate(queries[i][1]) + " "+ (queries[i][1].getMonth() + 1) + '/' + queries[i][1].getDate() + '/' +  queries[i][1].getFullYear())
	    if(++i<l ) {
	    	if(toggled == false){
	    		$('.search').text(queries[i][0])
	    		$('body').removeClass("morning");
	    		$('body').removeClass("evening");
	    		$('body').removeClass("dawn");
	    		$('body').removeClass("night");
	    		$('body').css('background', classToAdd(queries[i][1])[0]).css('color', classToAdd(queries[i][1])[1])
          $('.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover,.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, .ui-button, html .ui-button.ui-state-disabled:hover, html .ui-button.ui-state-disabled:active').css('border', '2px solid '+ classToAdd(queries[i][1])[1])
          $('#slider').css('background', classToAdd(queries[i][1])[1])
          $('.policy a').css('color', classToAdd(queries[i][1])[1])
	    		$("#slider").slider('value',i);
	    		setTimeout(iterator, 500);
	    	}
					
	    } else {
	   	 }

	})();

}






