jQuery(document).ready(function($){
 

  var $sortSelect = $('#SortSelect')
   $sortSelect.on('change', function(){
    $('.gallery').mixItUp('sort', this.value);
  });

	/************************************
		
		CodyHouse filter code
		
	*************************************/

	/************************************
		MitItUp filter settings
		More details: 
		https://mixitup.kunkalabs.com/
		or:
		http://codepen.io/patrickkunka/
	*************************************/

	buttonFilter.init();
	$('.gallery').mixItUp({
	    controls: {
	    	enable: false
	    },
	    layout: {
		display: 'block'
		},
		animation: {
		enable: false		
		},
	    callbacks: {

	    	onMixEnd: function(){
			$(this).mixItUp('setOptions', {
				animation: {
				enable: false,
				duration: 500,
				effects: 'fade'	
				},
			});	

			$('ul li.mix').removeClass('top-position1 top-position2 position3 position4');
			
			var $filteredItems = $('li.mix').filter(function() {
    		return $(this).css("display") === 'block'});

    		$filteredItems.eq(0).addClass('top-position1');
			$filteredItems.eq(1).addClass('top-position2');

			for (i=2; i<$filteredItems.length; i+=4){
				$filteredItems.eq(i).addClass('position3');
			}
			for (i=3; i<$filteredItems.length; i+=4){
				$filteredItems.eq(i).addClass('position4');
			}

			// $filteredItems.eq(2).addClass('position3');
			// $filteredItems.eq(3).addClass('position4');
			// $filteredItems.eq(6).addClass('position3');
			// $filteredItems.eq(7).addClass('position4');
			// $filteredItems.eq(10).addClass('position3');
			// $filteredItems.eq(11).addClass('position4');





			// $filteredItems.(li:nth(4n+3)).addClass('position3');
		
		


			console.log($filteredItems);

		    },
	    	onMixStart: function(){
	    		$('.cd-fail-message').fadeOut(200);

	    	},
	      	onMixFail: function(){
	      		$('.cd-fail-message').fadeIn(200);
	    	}

	   
	    }
	});

	//search filtering
	//credits http://codepen.io/edprats/pen/pzAdg
	var inputText;
	var $matching = $();

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		};
	})();

	$(".cd-filter-content input[type='search']").keyup(function(){
	  	// Delay function invoked to make sure user stopped typing
	  	delay(function(){
	    	inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
	   		// Check to see if input field is empty
	    	if ((inputText.length) > 0) {            
	      		$('.mix').each(function() {
		        	var $this = $(this);
		        
		        	// add item to be filtered out if input text matches items inside the title   
		        	if($this.attr('class').toLowerCase().match(inputText)) {
		          		$matching = $matching.add(this);
		        	} else {
		          		// removes any previously matched item
		          		$matching = $matching.not(this);
		        	}
	      		});
	      		$('.gallery').mixItUp('filter', $matching);
	    	} else {
	      		// resets the filter to show all item if input is empty
	      		$('.gallery').mixItUp('filter', 'all');
	    	}
	  	}, 200 );
	});
});

/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
  	// Declare any variables we will need as properties of the object
  	$filters: null,
  	groups: [],
  	outputArray: [],
  	outputString: '',
  
  	// The "init" method will run on document ready and cache any jQuery objects we will need.
  	init: function(){
    	var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
    
    	self.$filters = $('.main-content');
    	self.$container = $('.gallery');
    
	    self.$filters.find('.cd-filters').each(function(){
	      	var $this = $(this);
	      
		    self.groups.push({
		        $inputs: $this.find('.filter'),
		        active: '',
		        tracker: false
		    });
	    });
	    
	    self.bindHandlers();
  	},
  
  	// The "bindHandlers" method will listen for whenever a button is clicked. 
  	bindHandlers: function(){
    	var self = this;

    	self.$filters.on('click', 'a', function(e){
	      	self.parseFilters();
    	});
	    self.$filters.on('change', function(){
	      self.parseFilters();           
	    });
  	},
  
  	parseFilters: function(){
	    var self = this;
	 
	    // loop through each filter group and grap the active filter from each one.
	    for(var i = 0, group; group = self.groups[i]; i++){
	    	group.active = [];
	    	group.$inputs.each(function(){
	    		var $this = $(this);
	    		if($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
	    			if($this.is(':checked') ) {
	    				group.active.push($this.attr('data-filter'));
	    			}
	    		} else if($this.is('select')){
	    			group.active.push($this.val());
	    		} else if( $this.find('.selected').length > 0 ) {
	    			group.active.push($this.attr('data-filter'));
	    		}
	    	});
	    }
	    self.concatenate();
  	},
  
  	concatenate: function(){
    	var self = this;
    
    	self.outputString = ''; // Reset output string
    
	    for(var i = 0, group; group = self.groups[i]; i++){
	      	self.outputString += group.active;
	    }
    
	    // If the output string is empty, show all rather than none:    
	    !self.outputString.length && (self.outputString = 'all'); 
	
    	// Send the output string to MixItUp via the 'filter' method:    
		if(self.$container.mixItUp('isLoaded')){
	    	self.$container.mixItUp('filter', self.outputString);
		}
  	}






};

