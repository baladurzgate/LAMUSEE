

function Areas_Editor(){
	


	var canvas,ctx,img,left,center,right,tools,bt_add,bt_draw,bt_edit,input_name,areas_list;
	var areas = new Array() , polygon = new Array();
	var mousedown = false;
	var mx=0,my=0;
	var mode = "polygon";
	var selected_area = false;
	var count = 0;
	
	this.init = function(_img,_left,_center,_right){
	
		img = document.getElementById(_img);
		left = jQuery(_left);
		center = jQuery(_center);
		right = jQuery(_right);
		
		canvas = jQuery('<canvas />').attr({
			ae_id: 'canvas',
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
			ae_id: 'tool_panel',
			class:'ae_sub_panel'
		}).appendTo(left);
		
		bt_add = jQuery('<button/>', {
			ae_id: "bt_add",
			text:"ajouter",
			class:'ae_bt',
		}).appendTo(tools);
		
		bt_edit = jQuery('<button/>', {
			ae_id: "bt_edit",
			text:"editer",
			class:'ae_bt',
		}).appendTo(tools);
		
		bt_undo = jQuery('<button/>', {
			ae_id: "bt_undo",
			text:"undo",
			class:'ae_bt',
		}).appendTo(tools);
		
		input_name = jQuery('<input/>', {
			ae_id: 'input_name',
			type:'text',
			value:"area"+areas.length,
			class:'ae_input',
		}).appendTo(tools);
		
		areas_list = jQuery('<div/>', {
			ae_id: 'layout_panel',
			class : "ae_sub_panel",
		}).appendTo(right);
		
		
	
		jQuery(canvas).mousemove(function( event ) {
		
			mx = event.pageX - jQuery(canvas).offset().left;
			my = event.pageY- jQuery(canvas).offset().top;
			update_canvas();
						

		});

		jQuery(canvas).mousedown(function( event ) {

			mousedown = true;
			
			switch (mode){
			
				case "edit" : 
					
					
				break;
			
			
			}
			

			


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
				ae_id: 'ae_areas_list',
				class: 'ae_list',
			}).appendTo(areas_list);			
			
			for (var i = 0 ; i < areas.length ; i ++){
				
				listed_area = jQuery('<li/>', {
					ae_id: "area"+areas[i].getID(),
					text:areas[i].getName(),
					class:'ae_listed_area',
				}).appendTo(list);
				
				var bt_delete = jQuery('<button/>', {
					ae_id:'bt_delete'+areas[i].getID(),
					behavior:"delete",
					text:"delete",
					class : "ae_listed_bt",
				}).appendTo(listed_area);
				
				var bt_select = jQuery('<button/>', {
					ae_id:'bt_select'+areas[i].getID(),
					behavior:"select",
					text:"select",
					class : "ae_listed_bt",
				}).appendTo(listed_area);
				
				jQuery('[ae_id="bt_delete'+areas[i].getID()+'"]').click(function( event ) {
					
					var areas_id = jQuery(this).parent().attr("ae_id");
					remove_area(areas_id);
					
				});
				
				jQuery('[ae_id="bt_select'+areas[i].getID()+'"]').click(function( event ) {
					
					var areas_id = jQuery(this).parent().attr("ae_id");
					select_area(areas_id);
					
				});
			
			}
			
			count++;

		});
		

		jQuery(bt_undo).click(function( event ) {
			
			undo();

		});
		
	}

	
	function select_area(_ID){
		
		console.log(_ID);
		
		for (var i = 0 ; i < areas.length ; i ++){
			
			if(areas[i].getID() == _ID){
				
				selected_area = areas[i];
				
			}

		}		
		
	}
	
	function isOut(x,y){
	
		if(x > canvas.width || x < 0 || y > canvas.height || y < 0){
		
			return true;
		}
		
		return false;
	
	}
	
	function add_area(_name,_coords){
		
		
		var narea = new Area(_name,_coords,count);
		areas.push(narea);

	}
	
	
	function remove_area(_ID){
		
		for (var i = 0 ; i < areas.length ; i ++){
			
			if(areas[i].getID() == _ID){
				
				
			}
				
			
		}

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
	
	function Area (_name,_coords,_ID){

		var coords = _coords;
		var name = _name;  
		var state = 'added';
		var ID = _ID;
		
		var selectedPoint = false;
		
		var points = new Array();
		
		this.getID = function(){ return ID;}
		
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
		
		this.isTouched = function(_x,_y){
			
			var distance = Math.floor(Math.sqrt(Math.pow(_x - this.x,2) + Math.pow(_y - this.y,2)));
			
			if (distance > 3){
				
				return true;
			}
			
			return false;
		}

		
	}


}