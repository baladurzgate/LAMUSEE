(function ($, root, undefined) {
	
	$(function () {
		
		'use strict';
		
		$(document).ready(function() {
			
			
			    $('area').each(function() {
				    	
			    	if($(this).attr("href").indexOf('#') != -1){
			    		
				    	//$(this).remove();
			    		$(this).css( 'cursor', 'initial' );
				    	console.log($(this).attr("href"));
				    	
				    	
			    	}
				   
			    });
			    
			    $('area').click(function(){
			    	
			    	
			    	if($(this).attr("href").indexOf('#') === -1){
			    		
				    	var shape = $(this).attr("title");
				    	
				    	storeShape(shape);
			    	}
			    	
			    })
			    	
			    $('area').mouseover(function(){
			    	
			    	var shape = $(this).attr("title");
			    	$(".legende").html(shape);

			    })	
			    
			    $('area').mouseout(function(){
			    	
			    	$(".legende").html('...');

			    })	
			    
			 
			    refresh_history();
			    

		});
		
		
		var loupe;
		
		var aScaler;
		

		$(window).load(function(){
			

			
			if($('.details')){
				
				loupe = new Loupe('#zoom_img','#zoom_frame','#source_img','#source_frame','#zone_selector');
				
				loupe.init();
				loupe.update_scale();
								
				
			}
			
			if($('map')){
				
				//var aScaler = new areasAutoScaler('#tableau');
				//aScaler.update();				
				
				
			}
		    
			

		});
		

		$( window ).resize(function() {
			
			if($('.details')){
			
				loupe.update_scale();
			
			}
			if($('map')){
				
				//aScaler.update();				
				
			}
			
			
		});
		  
		function storeShape($str){
			
			var storedShapes = sessionStorage.getItem("shapes") != undefined ? JSON.parse(sessionStorage.getItem("shapes")) : storedShapes = [];
			var storedUrls = sessionStorage.getItem("urls") != undefined ? JSON.parse(sessionStorage.getItem("urls")) : storedUrls = [];
			
			
			 
			var current_url = window.location.href;
			 
			storedShapes.unshift($str);
			storedUrls.unshift(current_url);
			
			console.log(current_url);
		    
			sessionStorage.setItem("shapes",JSON.stringify(storedShapes));	
			sessionStorage.setItem("urls",JSON.stringify(storedUrls));	
			
			
		}		
		
		function refresh_history(){
			
			var storedShapes = sessionStorage.getItem("shapes") != undefined ? JSON.parse(sessionStorage.getItem("shapes")) : storedShapes = [];
			var storedUrls = sessionStorage.getItem("urls") != undefined ? JSON.parse(sessionStorage.getItem("urls")) :storedUrls = [];
			
			var shapes_history = '';	
			
			for (var i = 0 ; i < storedUrls.length ; i++){
				
				var url = storedUrls[i] != undefined ? storedUrls[i] : "";
				var shape_name = storedShapes[i];
				shapes_history += '<a href="'+url+'" class = "history_item">'+shape_name+'</a><br>'+"\n";
				
			}
			
			$('#history').html(shapes_history);

		}
		
		function add_class_to_areas(){
			
			
			
			
			
		}
		  
		  
	});
	
})(jQuery, this);

function parse_shape_history(){}

function reveleLegende(){}

function cacheLegende(){}

function addCookie(name){}
