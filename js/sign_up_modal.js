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