
		
			
		function areasAutoScaler (img_selector,ratio){
			
			var ratio = ratio || 1;
			
			if(document.getElementById('ratio')!== null){
				
				ratio = jQuery('#ratio').val();
				
				console.log('map scale = '+ratio);
				
			}
			
			var image = jQuery(img_selector);
			
			var map_attr = image.attr('usemap');
			
			
			if(map_attr!=""){
				
				map_name = map_attr.replace("#", ""); 
				
				map_selector = "map[name='"+map_name+"']";
					
				var map = jQuery(map_selector);
			
				var original_width = document.querySelector(img_selector).naturalHeight;
				
				var current_width = image.width();
				
				if(ratio == 0){
					
					ratio = current_width / original_width;
					
				}
				
				
				console.log(ratio);
					
				var areas = jQuery(map_selector+' area');
					
			}
			
			console.log('areasAutoScaler init');
			
			this.update = function(){
				
				areas.each(function(a){
					
					var coords_str =jQuery(this).attr('coords');
					
					coords_arr = coords_str.split(","); 
			
					//coords_tab = new array();
					
					var relative_coords = coords_arr.map(function (x) { 
						
						var coord = parseInt(x,10);
						var relative_coord =  Math.round(coord * ratio);
						return relative_coord.toString();
					})
					
					jQuery(this).attr('coords',relative_coords);
					console.log(relative_coords)
				})			
			
			}
			
		
		
		}
