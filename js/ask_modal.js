$newQuestion = $('<li></li>');
$newTag = $('<p class="tag"></p>');

$( "#ask_modal" ).click(function() {
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


$('.buttonsubmit').click(function(){
	var value = $("textarea").val();
	$newQuestion.text(value).prependTo('.questions');
	
	var tag = $( "#tag option:selected").val();
	$newTag.text(tag).appendTo($newQuestion);

	$('.modal').hide( "slow" );

});
 