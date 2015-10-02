
/************
Modal Show/Hide
*************/

$( "#project_modal" ).click(function() {
  $('.overlay').show( "slow" );
});

$( ".close" ).click(function() {
  $('.overlay').hide( "slow" );
});

/************
Slideshow
*************/
	
	var currIndex = 0;
	var totalSlides = $(".slideshow > li").length;

	
  function next(){
		var nextIndex = currIndex + 1;
		if (nextIndex >= totalSlides){
			nextIndex = 0;
		}
    gotoSlide(nextIndex);

  }

  function prev(){
	  
		var prevIndex = currIndex - 1;
		
		if (prevIndex < 0){
			prevIndex = totalSlides - 1;
		}
    gotoSlide(prevIndex);
  }

	function gotoSlide( $index ){
		currIndex = $index;
		var target = "#slide"+currIndex;
		$(".slideshow>li, nav ul li").removeClass("activeslide");		
		
		$(target).addClass("activeslide");
		$("nav ul li").eq(currIndex).addClass("activeslide");

	}
	
	$("#next").on("click", function(){
		next();
	});

	$("#prev").on("click", function(){
		next();
	});
	