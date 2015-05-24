/*! Loupe v1.0.0 | (c) 2015 alexandecormier, | GNU GPL license */
function Loupe(zoom_img_selector,zoom_frame_selector,source_img_selector,source_frame_selector,zone_selector){
	
	var zoom_img =  jQuery(zoom_img_selector);
	var zoom_frame =  jQuery(zoom_frame_selector);
	var source_img =  jQuery(source_img_selector);
	var source_frame =  jQuery(source_frame_selector);
	var zone = jQuery(zone_selector);
	var screen;

	var initialized = false , down = false;
	
	var xlast = 0,
	ylast = 0,
	parentOffset,
	xrelative, 
	yrelative,
	xcoef,
	ycoef,
	xcenter,
	ycenter,
	xpadding,
	ypadding,
	xwindow,
	ywindow,
	zoom_scale;	


	var loupe = this;

	this.init = function(){

		if(zoom_img != false && zoom_frame != false && source_img != false && source_frame != false && zone != false){
			
			if(zoom_img.attr('src')!= "" && source_img.attr('src')!= ""){
		
				screen = jQuery('<div id = "loupe_nonDraggableScreen"><div>');
				screen.css('position','absolute');
				screen.insertAfter(zone);
				
				zoom_frame.css('overflow','hidden')
				zone.css('position','absolute');
				
				this.update_zoom_frame();
				
				source_frame.mousedown(function() {
				    down = true;
				})
				jQuery(document).mouseup(function() {
				    down = false;  
				});		
				
				source_frame.mousemove(function(e){
					
						if(down){
				 
							loupe.update_position(e);
							loupe.update_zoom_frame();
			
						}
					       
				 })
				 
				source_frame.click(function(e){
					 
					
					loupe.update_position(e);
					loupe.update_zoom_frame();
					
				 })
				 
				 initialized = true;
			
			}else{
				
				zoom_img.hide();
				zoom_frame.hide();
				source_img.hide();
				source_frame.hide();
				zone.hide();
				screen.hide();	
				
				console.log('loupe :  ! no src in images ! ')
				
			}

		}else{
	
			console.log('loupe :  ! wrong arguments or empty selectors ! ')

		}
		
		console.log('Loupe init');
		
	}
	

	

	this.update_position = function (e){
		
		if(initialized){
			
			parentOffset = source_frame.offset();
		
			xlast = e.pageX - parentOffset.left;
			ylast = e.pageY - parentOffset.top;
			
			xwindow = (e.pageX / source_frame.innerWidth()) - (parentOffset.left / source_frame.innerWidth());
			ywindow = (e.pageY / source_frame.innerWidth()) - (parentOffset.top  / source_frame.innerWidth());	
		
		}
		
	}
	
	this.update_scale = function(){
		
		if(initialized){
		
			xlast = xwindow * source_frame.innerWidth();
			ylast = ywindow * source_frame.innerWidth();
	
			this.update_zoom_frame();
		
		}
	}
	 
	
	this.update_zoom_frame = function(){
		
		
		if(initialized){
			
			screen.css('width',source_img.width()+'px');
			screen.css('height',source_img.height()+'px');
	        
	        xrelative = xlast; 
	        yrelative = ylast;
	        
	        xcoef = zoom_img.width() /  source_img.width();
	        ycoef = zoom_img.height() /  source_img.height();
	        
	        xpadding = (source_frame.css('padding-left').replace("px", "")) * xcoef;
	        ypadding = (source_frame.css('padding-top').replace("px", "")) * ycoef;
	        
	        xcenter = (zoom_frame.innerWidth()*0.5)+xpadding;
	        ycenter = (zoom_frame.innerHeight()*0.5)+ypadding;
	        
	        xpos = ( xrelative * - xcoef ) + xcenter;
	       	ypos = ( yrelative * - ycoef ) + ycenter;
	       	
	       	zone.css('width',zoom_frame.innerWidth()/xcoef+'px');
	       	zone.css('height',zoom_frame.innerHeight()/ycoef+'px');
	        
		   if(xlast  < source_frame.innerWidth() && xlast  > 1){
			   
			   zone.css('left',parentOffset.left + (xlast-(zone.width()/2))+'px');
			   zoom_img.css('marginLeft',xpos+'px');
			   
		   }
		   
		   if(ylast  < source_frame.innerHeight() && ylast  > 1){
			   
			  	
			   zone.css('top',parentOffset.top + (ylast-(zone.height()/2))+'px');		        
		       zoom_img.css('marginTop',ypos+'px');
		   }	
		   
		}
		
	}

}
