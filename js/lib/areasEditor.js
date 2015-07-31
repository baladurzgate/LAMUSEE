

//---------------------------------------------------------------------------------------------------
//------------------------------------------CLASS AREA_EDITOR-------------------------------------------
//---------------------------------------------------------------------------------------------------


function Areas_Editor(){
	
	//PRIVATE VARS
	
	var canvas,ctx,img,left,center,right;
	var tools,areas_list;
	var bt_add,bt_update,bt_polygon,bt_edit,bt_polygon;
	var input_name;
	var areas = new Array();
	var mousedown = false;
	var mx=0,my=0;
	var mode;
	var selected_area;
	var acount = 0;
	var pcount = 0;
	var polygon = new Area('unborn',new Array(),00);
	
	// INIT 
	
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
		
		input_name = jQuery('<input/>', {
			ae_id: 'input_name',
			type:'text',
			value:"area"+areas.length,
			class:'ae_input',
		}).appendTo(tools);
		
		bt_add = jQuery('<button/>', {
			ae_id: "bt_add",
			text:"ajouter",
			class:'ae_bt',
		}).appendTo(tools);
		
		bt_update = jQuery('<button/>', {
			ae_id: "bt_update",
			text:"update",
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
		
		bt_polygon = jQuery('<button/>', {
			ae_id: "bt_polygon",
			text:"polygon",
			class:'ae_bt',
		}).appendTo(tools);
		

		
		areas_list = jQuery('<div/>', {
			ae_id: 'layout_panel',
			class : "ae_sub_panel",
		}).appendTo(right);
		
		
	
		jQuery(canvas).mousemove(function( event ) {
		
			mx = event.pageX - jQuery(canvas).offset().left;
			my = event.pageY- jQuery(canvas).offset().top;
			update_canvas();
			

			
			switch (mode){
			
				case 'polygon' : 
				
				break;
			
				case "edit" : 
					
					if(mousedown){
					
						var spoint = selected_area.selected_point;
						
						if(spoint){
							
							spoint.x = mx;
							spoint.y = my;
							
						}
					
					}

				break;
			}
			
		
		
						

		});

		jQuery(canvas).mousedown(function( event ) {

			mousedown = true;
			
			switch (mode){
			
				case 'polygon' : 
				
				break;
			
				case "edit" : 
					
					if(selected_area != undefined && selected_area != null){
						
						var scoords = selected_area.getCoords();
						
						for (var i = 0 ; i < scoords.length ; i ++){
							
							if(scoords[i].isTouchedBy(mx,my)){
								
								selected_area.select_point(scoords[i].getID());
								
							}
						}
						


					}

				break;
			
			}

		});

		jQuery(canvas).mouseup(function( event ) {
			
			mousedown = false;
			
			switch (mode){
			
				case 'polygon' : 
					
					if(!isOut(mx,my)){
						
						polygon.addPoint(mx,my);
					}
										
				break;
				
				case 'edit' : 
					
					selected_area.selected_point = undefined;
					
				break;			
			
			}
			
		});

		jQuery(bt_add).click(function( event ) {
			
			add_area(input_name.val(),polygon.getCoords().slice());
			ctx.drawImage(img,0,0);
			draw_areas();
			input_name.val("area"+acount);
			polygon = new Area('unborn',new Array(),00);
			areas_list.empty();
			
			var list = jQuery('<ul/>', {
				ae_id: 'ae_areas_list',
				class: 'ae_list',
			}).appendTo(areas_list);			
			
			for (var i = 0 ; i < areas.length ; i ++){
				
				listed_area = jQuery('<li/>', {
					ae_id: areas[i].getID(),
					ae_name: areas[i].getName(),
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
					
					var listed_area = jQuery(this).parent();
					var areas_id = jQuery(listed_area).attr("ae_id");
					remove_area(areas_id);
					update_canvas();
					
				});
				
				jQuery('[ae_id="bt_select'+areas[i].getID()+'"]').click(function( event ) {
					
					var listed_area = jQuery(this).parent();

					
					if(selected_area != null){
						
						var last_selected_listed_area = jQuery('[ae_id = "listed-area'+selected_area.getID()+'"]')
						jQuery(last_selected_listed_area).attr('class', 'ae_listed_area');
					}
					
					var areas_id = jQuery(listed_area).attr("ae_id");
					jQuery(listed_area).attr('class', 'ae_listed_area-selected');
					select_area(areas_id);
					update_canvas();
					
				});
			
			}

		});
		
		jQuery(bt_polygon).click(function(event){
			
			setMode("polygon");
			
		})
		
		jQuery(bt_edit).click(function(event){
			
			setMode("edit");
			
		})
		

		jQuery(bt_undo).click(function( event ) {
			
			undo();

		});
		
		setMode("polygon");
		
	}
	
	function setMode(_mode){
		
		mode = _mode
		
		switch (mode){
		
			case 'edit': 
				
				bt_update.show();
				bt_polygon.show();
				bt_add.hide();
				bt_edit.hide();
				
			break;
			
			case 'polygon' : 
				
				bt_update.hide();
				bt_polygon.hide();
				bt_edit.show();
				bt_add.show();
				
			break;
		
		
		}
		
	}

	
	function select_area(_ID){
		
		console.log(_ID);
		
		for (var i = 0 ; i < areas.length ; i ++){
			
			if(areas[i].getID() == _ID){
				
				selected_area = areas[i];
				
				input_name.val(areas[i].getName());
				
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
		
		var narea = new Area(_name,_coords,acount);
		areas.push(narea);
		acount++;

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
			
			if(selected_area == areas[j]){
				
				areas[j].enable_edit_mode();
			}
		}
	}
	
	function draw_polygon(){
		
		var pcoords = polygon.getCoords();
		
		ctx.beginPath();
		
		ctx.strokeStyle = 'rgba(255,0,0,1)';
		ctx.fillStyle = 'rgba(255,100,0,0.5)';
		
		if(pcoords.length > 0){
			for(var i = 0 ; i<pcoords.length; i++){
				ctx.lineTo(pcoords[i].x,pcoords[i].y);
			}
		}
		
		if(mousedown){
			if(pcoords.length == 0){
				polygon.addPoint(mx,my)
			}
			ctx.lineTo(mx,my);
		}
		
		if(pcoords.length > 1){
			
			ctx.lineTo(pcoords[0].x,pcoords[0].y);
			ctx.fill();
		}
		ctx.stroke();
	
	}
	
	function update_canvas(){
	
		ctx.drawImage(img,0,0);
		
		draw_areas();	
		
		switch (mode){
		
			case "polygon" : 
				
				draw_polygon();
				
			break;
			
			case "edit" : 
				

				
			break;
		
		}
	
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
	
	//---------------------------------------------------------------------------------------------------
	//------------------------------------------SUB CLASS AREA-------------------------------------------
	//---------------------------------------------------------------------------------------------------
	
	function Area (_name,_coords,_ID){

		
		//PRIVATE VARS
		
		var coords = _coords;
		var name = _name;  
		var state = 'added';
		var ID = "area"+_ID;
		var selectedPoin;
		var points = new Array();
		
		//PUBLIC VARS
		
		this.selected_point;
		
		//GETTERS 
		
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
		
		this.getID = function(){ return ID;}
		
		this.getName = function(){ return name;}
		
		// SETTERS 
		
		this.setState = function(_state){state = _state;}
		
		this.select_point = function(_ID){ 
			
			for (var i = 0 ; i<coords.length ; i++){
				
				if(coords[i].getID() == _ID){
					
					this.selected_point = coords[i];
	
				}
				
			}
			
		}		
		
		//ADDERS
		
		this.addPoint = function(_x,_y){
			
			var new_point = new aPoint(_x,_y,pcount);
			coords.push(new_point);
			pcount++;
			
		}
		
		//DISPLAYERS
		
		this.enable_edit_mode = function(){
			
			state = 'edit';
			
			for(var i = 0 ; i<coords.length; i++){
				coords[i].display_handle();
			}
		}
		
		this.display = function(){
			
			ctx.beginPath();
			
			switch (state){
			
				case  "added" :
				
					ctx.strokeStyle = 'rgba(0,0,255,1)';
					ctx.fillStyle = 'rgba(0,100,255,0.5)';			
				
				
				case "imported" :
				
				
				break;
				
				case "selected" :
					
					ctx.strokeStyle = 'rgba(255,0,0,1)';
					ctx.fillStyle = 'rgba(100,255,0,0.5)';					
					
					
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
	
	//---------------------------------------------------------------------------------------------------
	//------------------------------------------SUB CLASS APOINT-----------------------------------------
	//---------------------------------------------------------------------------------------------------

	function aPoint (_x,_y,_ID){
		
		
		//PUBLIC VARS
		
		this.x = _x;
		this.y = _y;
		
		//PRIVATE VARS 
		
		var ID = _ID;
		
		//GETTERS

		this.getID = function(){ return ID;}
		
		//SETTERS
		
		//DISPLAYERS
		
		
		this.display_handle = function(){
			
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,0,0,1)';
			ctx.fillStyle = 'rgba(255,255,0,1)';
			ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.stroke();		

		}
		
		
		//VERIFIERS

		this.isTouchedBy = function(_x,_y){
			
			var distance = Math.floor(Math.sqrt(Math.pow(_x - this.x,2) + Math.pow(_y - this.y,2)));
			
			if (distance < 5){
				
				return true;
			}
			
			return false;
		}		

		


		
	}


}