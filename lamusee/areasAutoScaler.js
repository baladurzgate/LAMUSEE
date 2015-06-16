
		
			
		function areasAutoScaler (img_selector,scale,offsetx,offsety){
			
			var offsetx = offsetx || 0;
			
			var offsety = offsety || 0;
			
			var scale = scale || 1;
			
			if(document.getElementById('map_scale')!== null){
				
				scale = jQuery('#map_scale').val();
				
				scale = parseFloat(scale,10);
				
				console.log('map scale = '+scale);
				
			}
			
			if(document.getElementById('map_offset_x')!== null){
				
				offsetx = jQuery('#map_offset_x').val();
				
				offsetx = parseFloat(offsetx,10);
				
				console.log('map_offset_x = '+offsetx);
				
				
				
			}
			
			if(document.getElementById('map_offset_y')!== null){
				
				offsety = jQuery('#map_offset_y').val();
				
				offsety = parseFloat(offsety,10);
				
				console.log('map_offset_y = '+offsety);
				
				
				
			}
			
			
	
			
			var image = jQuery(img_selector);
			
			var map_attr = image.attr('usemap');
			
			
			if(map_attr!=""){
				
				map_name = map_attr.replace("#", ""); 
				
				map_selector = "map[name='"+map_name+"']";
					
				var map = jQuery(map_selector);
			
				var original_width = document.querySelector(img_selector).naturalHeight;
				
				var current_width = image.width();
				
				if(scale == 0){
					
					scale = current_width / original_width;
					
				}
				
				
				console.log(scale);
					
				var areas = jQuery(map_selector+' area');
					
			}
			
			console.log('areasAutoScaler init');
			
			this.update = function(){
				
				areas.each(function(a){
					
					var coords_str =jQuery(this).attr('coords');
					
					coords_arr = coords_str.split(","); 
					
					var relative_coords = coords_arr.map(function (c,i) { 
						
						var coord = parseInt(c,10);
						var relative_coord =  Math.round(coord * scale);
						
						
						if(i==0){
							
							relative_coord += offsetx;

							
						}else if(i%2!=0){
							
							relative_coord += offsety;
							
						}else{
							
							relative_coord += offsetx;

						}
						return relative_coord.toString();
					})
					
					jQuery(this).attr('coords',relative_coords);
					console.log(relative_coords)
				})			
			
			}
			
		
		
		}
