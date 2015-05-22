function Loupe(zoom_img_selector,zoom_cont_selector,map_img_selector,map_cont_selector,frame_selector){
	
	var zoom_img =  $(zoom_img_selector);
	var zoom_cont =  $(zoom_cont_selector);
	var map_img =  $(map_img_selector);
	var map_cont =  $(map_cont_selector);
	var frame = $(frame_selector);
	var screen;

	var initialized = false , down = false;
	
	var xlast = 0,ylast = 0,parentOffset ,xrelative , yrelative ,xcoef ,ycoef , xcenter , ycenter , xpadding , ypadding , xwindow , ywindow;	


	var loupe = this;

	this.init = function(){
		
		screen = $('<div id = "loupe_nonDraggableScreen"><div>');
		screen.css('position','absolute');
		screen.insertAfter(frame);
		
		zoom_cont.css('overflow','hidden')
		frame.css('position','absolute');
		
		this.update_zoom_frame();
		
		map_cont.mousedown(function() {
		    down = true;
		})
		$(document).mouseup(function() {
		    down = false;  
		});		
		
		map_cont.mousemove(function(e){
			
				if(down){
		 
					loupe.update_position(e);
					loupe.update_zoom_frame();
	
				}
			       
		 })
		 
		map_cont.click(function(e){
			 
			
			loupe.update_position(e);
			loupe.update_zoom_frame();
			
		 })
		 
		 initialized = true;
		
	}
	

	

	this.update_position = function (e){
		
		if(initialized){
			
			parentOffset = map_cont.offset();
		
			xlast = e.pageX - parentOffset.left;
			ylast = e.pageY - parentOffset.top;
			
			xwindow = (e.pageX / map_cont.innerWidth()) - (parentOffset.left / map_cont.innerWidth());
			ywindow = (e.pageY / map_cont.innerWidth()) - (parentOffset.top  / map_cont.innerWidth());	
		
		}
		
	}
	
	this.update_scale = function(){
		
		if(initialized){
		
			xlast = xwindow * map_cont.innerWidth();
			ylast = ywindow * map_cont.innerWidth();
	
			this.update_zoom_frame();
		
		}
	}
	 
	
	this.update_zoom_frame = function(){
		
		
		if(initialized){
			
			screen.css('width',map_img.width()+'px');
			screen.css('height',map_img.height()+'px');
	        
	        xrelative = xlast; 
	        yrelative = ylast;
	        
	        xcoef = zoom_img.width() /  map_img.width();
	        ycoef = zoom_img.height() /  map_img.height();
	        
	        xpadding = (map_cont.css('padding-left').replace("px", "")) * xcoef;
	        ypadding = (map_cont.css('padding-top').replace("px", "")) * ycoef;
	        
	        xcenter = (zoom_cont.innerWidth()*0.5)+xpadding;
	        ycenter = (zoom_cont.innerHeight()*0.5)+ypadding;
	        
	        xpos = ( xrelative * - xcoef ) + xcenter;
	       	ypos = ( yrelative * - ycoef ) + ycenter;
	       	
			frame.css('width',zoom_cont.innerWidth()/xcoef+'px');
			frame.css('height',zoom_cont.innerHeight()/ycoef+'px');
	        
		   if(xlast  < map_cont.innerWidth() && xlast  > 1){
			   
			   frame.css('left',parentOffset.left + (xlast-(frame.width()/2))+'px');
			   zoom_img.css('marginLeft',xpos+'px');
			   
		   }
		   
		   if(ylast  < map_cont.innerHeight() && ylast  > 1){
			   
			  	
			   frame.css('top',parentOffset.top + (ylast-(frame.height()/2))+'px');		        
		       zoom_img.css('marginTop',ypos+'px');
		   }	
		   
		   

		}
		
	}

}
