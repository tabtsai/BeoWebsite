$( "#sign_up_modal" ).click(function() {
  $('.modal').show( "slow" );
});

$( ".close" ).click(function() {
  $('.modal').hide( "slow" );
});

$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
	$('.modal').hide( "slow" );

    }
});
// setInterval(function() {
// $('#bigBee').velocity("callout.bounce")}, 2000);

// $('#bigBee').velocity(
//   { top: -100 }, 
//   { loop: 5 }
// );


// /* Create an array of animations */
// var mySequence = [
//   { elements: $('#bigBee'), properties: { translateX: 50 }, options: { duration: 1000 } },
//   { elements: $('#bigBee'), properties: { translateX: -20}, options: { duration: 1000 } },
//   { elements: $('#bigBee'), properties: { translateY: 50}, options: { duration: 1000 } }

// ];

// /* Run the sequence */
// $.Velocity.RunSequence(mySequence);

$('#bigBee').velocity({ translateY: 125 }, {

  duration: 5000,
  easing: [ 700, 8 ],
  opacity
})
 // .delay(750)
 //      .velocity({ opacity: 0 }, 750);