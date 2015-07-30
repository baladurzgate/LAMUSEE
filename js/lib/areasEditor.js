

function Areas_Editor(){
	


	var canvas,ctx,img,left,center,right,tools,bt_add,bt_draw,bt_edit,input_name,areas_list;
	var areas = new Array() , polygon = new Array();
	var mousedown = false;
	var mx=0,my=0;
	var mode = "polygon"
	
	this.init = function(_img,_left,_center,_right){
	
		img = document.getElementById(_img);
		left = jQuery(_left);
		center = jQuery(_center);
		right = jQuery(_right);
		
		canvas = jQuery('<canvas />').attr({
			id: "ae_canvas",
			width: img.width,
			height: img.height
		}).appendTo(center);
		
		
		console.log(left);
		console.log(center);
		console.log(right);
		console.log(img);
		
		ctx = document.getElementById("ae_canvas").getContext('2d');
		
		ctx.drawImage(img,0,0);
				
		tools = jQuery('<div/>', {
			id: 'ae_tools_panel',
			class:'ae_tools'
		}).appendTo(left);
		
		bt_add = jQuery('<button/>', {
			id: 'ae_bt_add',
			class:'ae_bt_tools',
			text:"ajouter",
		}).appendTo(tools);
		
		bt_edit = jQuery('<button/>', {
			id: 'ae_bt_edit',
			class:'ae_bt_tools',
			text:"editer",
		}).appendTo(tools);
		
		bt_undo = jQuery('<button/>', {
			id: 'ae_bt_undo',
			class:'ae_bt_tools',
			text:"undo",
		}).appendTo(tools);
		
		input_name = jQuery('<input/>', {
			id: 'ae_input_name',
			type:'text',
			value:"area"+areas.length,
			class:'bt_tools',
		}).appendTo(tools);
		
		areas_list = jQuery('<div/>', {
			id: 'areas_list',
			class:'bt_tools',
		}).appendTo(right);
		
		
	
		jQuery(canvas).mousemove(function( event ) {
		
			mx = event.pageX - jQuery(canvas).offset().left;
			my = event.pageY- jQuery(canvas).offset().top;
			update_canvas();
						

		});

		jQuery(canvas).mousedown(function( event ) {

			mousedown = true;

		});

		jQuery(canvas).mouseup(function( event ) {

			if(!isOut(mx,my)){
				var new_point = new ae_Point(mx,my)
				polygon.push(new_point);
			}
			mousedown = false;

		});

		jQuery(bt_add).click(function( event ) {
			
			add_area(input_name.val(),polygon.slice());
			ctx.drawImage(img,0,0);
			draw_areas();
			input_name.val("area"+areas.length);
			polygon = new Array();
			areas_list.empty();
			
			var list = jQuery('<ul/>', {
			id: 'ae_list',
			}).appendTo(areas_list);			
			
			for (var i = 0 ; i < areas.length ; i ++){
				
				listed_area = jQuery('<li/>', {
				class:'ae_listed_area',
				text:areas[i].getName()
				}).appendTo(list);
				
				var bt_delete = jQuery('<button/>', {
				class:'ae_bt_list',
				text:"delete"
				}).appendTo(listed_area);
			
			}

		});
		
		jQuery(bt_undo).click(function( event ) {
			
			undo();

		});
		
	}
	
	function isOut(x,y){
	
		if(x > canvas.width || x < 0 || y > canvas.height || y < 0){
		
			return true;
		}
		
		return false;
	
	}
	
	function add_area(_name,_coords){
	
		var narea = new Area(_name,_coords);
		areas.push(narea);

	}
	
	
	function remove_area(_area){
	
		var narea = new Area(_name,_coords);
		areas.push(narea);

	}
	
	function undo(){
	
		polygon.pop();
		ctx.drawImage(img,0,0);
		update_canvas();

	}
	
	function draw_areas(){
	
			for(var j = 0 ; j < areas.length; j ++){

				areas[j].display();
				areas[j].display_edit_mode();
		
			}
	}
	
	function draw_polygon(){
		

			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,0,0,1)';
			ctx.fillStyle = 'rgba(255,100,0,0.5)';
			if(polygon.length > 0){
				for(var i = 0 ; i<polygon.length; i++){
					ctx.lineTo(polygon[i].x,polygon[i].y);
				}
			}
			if(mousedown){
				if(polygon.length == 0){
					var new_point = new ae_Point(mx,my)
					polygon.push(new_point);
				}
				ctx.lineTo(mx,my);
			}
			if(polygon.length > 1){
				
				ctx.lineTo(polygon[0].x,polygon[0].y);
				ctx.fill();
			}
			ctx.stroke();
	
	
	
	}
	
	function update_canvas(){
	
		ctx.drawImage(img,0,0);
		draw_areas();
		draw_polygon();
	
	}
	
	function update_post(){
			
		jQuery.ajax({
			type: "POST",
			url: "update_post_areas.php",
			data: "post_id=" + name + "&post_areas=" + link ,
			cache: true,
			success: function(data) {
				alert("success!");
			}
		});
			
	}
	
	function Area (_name,_coords){

		var coords = _coords;
		var name = _name;  
		var state = 'added';
		
		var selectedPoint = false;
		
		var points = new Array();
		
		this.getCoords = function(_type){
		
			var type = _type != undefined ? _type : "array";
		
			switch (type){
			
				case 'string':
				
					
				
				break;
				
				case 'array' : 
				
					return coords;
				
				
				break;
			
			
			}
			
		
		}
		
		this.getName = function(){ return name;}
		
		this.display_edit_mode = function(){
			
			for(var i = 0 ; i<coords.length; i++){
				coords[i].display_handle();
			}
			
			
		}
		
		this.setState = function(_state){
			
			state = _state;
			
		}
		
		this.display = function(){
			
			ctx.beginPath();
			
			switch (state){
			
				case  "added" :
				
					ctx.strokeStyle = 'rgba(0,0,255,1)';
					ctx.fillStyle = 'rgba(0,100,255,0.5)';			
				
				
				case "imported" :
				
				
				break;
				
				case "edited" :
					
					ctx.strokeStyle = 'rgba(255,0,0,1)';
					ctx.fillStyle = 'rgba(100,255,0,0.5)';
					
					
				break;
			}
		

			ctx.moveTo(coords[0].x,coords[0].y);
			for(var i = 0 ; i<coords.length; i++){
					ctx.lineTo(coords[i].x,coords[i].y);
					
			}			
			ctx.fill();
			ctx.stroke();
			
		}



	}

	function ae_Point (_x,_y){
		
		
		this.x = _x;
		this.y = _y;
		
		this.display_handle = function(){
			
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,0,0,1)';
			ctx.fillStyle = 'rgba(255,255,0,1)';
			ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.stroke();		

		}
		
		this.isTouched(_x,_y){
			
			var distance = Math.floor(Math.sqrt(Math.pow(_x - this.x,2) + Math.pow(_y - this.y,2)));
			
			if (distance > 3){
				
				return true;
			}
			
			return false;
		}

		
	}


}