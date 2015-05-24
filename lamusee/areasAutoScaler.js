
		var resp_areas = new areasScaler('#resp_img');
		resp_areas.update();
		

		function areasAutoScaler (img_selector){
			
			var image = jQuery(img_selector);
			
			var map_attr = image.attr('usemap');
			
			if(map_attr!=""){
				
				map_name = map_attr.replace("#", ""); 
				
				map_selector = "map[name='"+map_name+"']";
					
				var map = jQuery(map_selector);
			
				var original_width = document.querySelector(img_selector).naturalHeight;
				
				var current_width = image.width();
				
				var ratio = current_width / original_width;
				
				console.log(ratio);
					
				var areas = jQuery(map_selector+' area');
				

			
			
			}
			
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
