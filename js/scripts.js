(function ($, root, undefined) {
	
	$(function () {
		
		'use strict';
		
		jQuery(document).ready(function() {
			
			
				jQuery('#conteneur').imagesLoaded( function() {
					
				  console.log('image loaded');
				  jQuery('#load_gif').hide();
				  jQuery('#conteneur').show();
				  	center_illustration();
				  
					if(document.getElementById("ae_center-panel")!== null){
						
						console.log("areas editor");
						
						var AE = new Areas_Editor();
						
						AE.init("ae_source_image","#ae_top-panel","#ae_left-panel","#ae_center-panel","#ae_right-panel");
						
					};
				  
				});
			
			
			    jQuery('area').each(function() {
				    	
			    	if(jQuery(this).attr("href").indexOf('#') != -1){
			    		
				    	//$(this).remove();
			    		jQuery(this).css( 'cursor', 'initial' );
				    	console.log($(this).attr("href"));
				    	
				    	
			    	}
				   
			    });
			    
			    jQuery('area').click(function(){
			    	
			    	
			    	if($(this).attr("href").indexOf('#') === -1){
			    		
				    	var shape = $(this).attr("title");
				    	
				    	storeShape(shape);
			    	}
			    	
			    })
			    	
			    jQuery('area').mouseover(function(){
			    	
			    	var shape = $(this).attr("title");
			    	$(".legende").html(shape);

			    })	
			    
			    jQuery('area').mouseout(function(){
			    	
			    	$(".legende").html('...');

			    })	
			    
			 
			    refresh_history();
				
				
				jQuery("#txt").mCustomScrollbar({
					
					axis:"y",
					theme:"dark",
					scrollInertia:1,
					autoHideScrollbar: true,
					alwaysShowScrollbar: 0,
					scrollbarPosition: "inside"
					
					
					
				});
				
				jQuery('#ae_layout_panel').mCustomScrollbar({
					
					axis:"y",
					theme:"dark",
					scrollInertia:1,
					autoHideScrollbar: true,
					alwaysShowScrollbar: 0,
					scrollbarPosition: "inside"
					
				});
				
				/* Deplie la liste en dessous */
				
			    jQuery(".display_bellow_button").click(function() {
            jQuery(this).closest(".content-holder").find(".toggle_below", this).toggle();
            jQuery(this).closest(".content-holder").find(".hide_bellow_button", this).show();
            jQuery(this).hide();
            return false;  
            	
            
             })
			    
			    jQuery(".hide_bellow_button").click(function() {
            jQuery(this).closest(".content-holder").find(".toggle_below", this).toggle();
            jQuery(this).closest(".content-holder").find(".display_bellow_button", this).show();
             jQuery(this).hide();
            return false;  
            	
            
             })
             
             center_illustration();
			    
		});
		
		
		var loupe;
		
		var aScaler;
		

		jQuery(window).load(function(){
			

			
			if(document.getElementById('zoom_frame')!== null){
				
				
				
				loupe = new Loupe('#zoom_img','#zoom_frame','#source_img','#source_frame','#zone_selector');
				loupe.init();
				loupe.update_scale();
								
				
			}
			
			if(document.getElementById('Map')!== null){
				
				var aScaler = new areasAutoScaler('#tableau');
				aScaler.update();				
				
				
			}
			

		    
			

		});
		

		jQuery( window ).resize(function() {
			
			
					
			center_illustration();
			
			
			if(document.getElementById('zoom_frame')!== null){
			
				loupe.update_scale();
				
			
			}
			
			if(document.getElementById('Map')!== null){
				
				aScaler.update();				
				
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
		
		
		
		function center_illustration(){
			
			console.log("center_illustration")
			
			var window_width = jQuery( window ).width();
			
			
			if(document.getElementById('illustration')!== null){
			
				var illustration = document.getElementById('tableau');
				var illustration_total_width = illustration.width;
				var center_left_value = (window_width/2)-(illustration_total_width/2);
			
				if(center_left_value < 0){
			
					center_left_value = 0;			
				}
			
				console.log(window_width);
				console.log(illustration_total_width);
			
			}
			
			jQuery("#illustration" ).css("left", center_left_value+"px" );
			
				if(document.getElementById('carte')!== null){
			
				jQuery("#carte" ).css("width", illustration_total_width+"px" );
			
			
			}		
			
			if(document.getElementById('zoom_frame')!== null){
				
				
				var zoom_marginleft = (window_width/2)-250;
			
				jQuery("#details").css("margin-left", zoom_marginleft+"px" );
			
			
			}	
				
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
