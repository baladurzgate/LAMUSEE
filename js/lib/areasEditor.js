

//---------------------------------------------------------------------------------------------------
//------------------------------------------CLASS AREA_EDITOR-------------------------------------------
//---------------------------------------------------------------------------------------------------


function Areas_Editor(){
	
	//PRIVATE VARS
	
	var canvas,ctx,img,left,center,right;
	var tools,areas_list,modes,property;
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
		
		// mode panel
				
		modes = jQuery('<div/>', {
			ae_id: 'modes_panel',
			class:'ae_sub_panel'
		}).appendTo(left);
		
		bt_edit = jQuery('<button/>', {
			ae_id: "bt_edit",
			text:"editer",
			class:'ae_bt mode',
		}).appendTo(modes);
		
		jQuery(bt_edit).click(function(event){
			
			setMode("edit");
			
		})
		
		bt_polygon = jQuery('<button/>', {
			ae_id: "bt_polygon",
			text:"polygon",
			class:'ae_bt mode',
		}).appendTo(modes);
		
		jQuery(bt_polygon).click(function(event){
			
			setMode("polygon");
			
		})

		// property panel
		
		property = jQuery('<div/>', {
			ae_id: 'property_panel',
			class:'ae_sub_panel'
		}).appendTo(right);
		
		label_name = jQuery('<span/>', {
			ae_id: 'label_name',
			text:"area"+areas.length,
			class:'ae_label',
		}).appendTo(property);
		
		input_name = jQuery('<input/>', {
			ae_id: 'input_name',
			type:'text',
			value:"area"+areas.length,
			class:'ae_input',
		}).appendTo(property);
		
		bt_add = jQuery('<button/>', {
			ae_id: "bt_add",
			text:"ajouter",
			class:'ae_bt',
		}).appendTo(property);
		
		jQuery(bt_add).click(function( event ) {
			
			add_area(input_name.val(),polygon.getCoords().slice());
			ctx.drawImage(img,0,0);
			draw_areas();
			input_name.val("area"+acount);
			polygon = new Area('unborn',new Array(),00);
			property.hide();
			update_listed_areas();

		});
		
		bt_update = jQuery('<button/>', {
			ae_id: "bt_update",
			text:"update",
			class:'ae_bt',
		}).appendTo(property);

		jQuery(bt_update).click(function( event ) {
			
			if(selected_area != undefined){
				update_area(selected_area.getID(),input_name.val());
			}

		});
		
		bt_undo = jQuery('<button/>', {
			ae_id: "bt_undo",
			text:"undo",
			class:'ae_bt',
		}).appendTo(property);
		

		jQuery(bt_undo).click(function( event ) {
			
			undo();

		});
		
		// layout panel
		
		areas_list = jQuery('<div/>', {
			ae_id: 'layout_panel',
			class : "ae_sub_panel",
		}).appendTo(right);
		
		
		// canvas
	
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
					
					property.show();
				
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
			
				case 'tranform' : 
					
					selected_area.selected_point = undefined;
					
				break;	
				
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
		
		setMode("polygon");
		
	}
	
	function edit_area_name(){
		
		label_name.hide();
		input_name.show();
		
	}
	
	function setMode(_mode){
		
		mode = _mode
		
		switch (mode){		
		
			case 'edit': 
				
				input_name.hide();
				label_name.show();
				
				if(selected_area==undefined){property.hide()};
				bt_update.show();
				bt_add.hide();
				
				bt_polygon.attr('class','ae_bt mode');
				bt_edit.attr('class','ae_bt mode-selected');
				
			break;
			
			case 'polygon' : 
				
				edit_area_name();
				
				property.hide()
				deselect_all();
				
				bt_update.hide();
				bt_add.show();
				
				bt_polygon.attr('class','ae_bt mode-selected');
				bt_edit.attr('class','ae_bt mode');

				
			break;
		
		
		}
		
	}

	
	function select_area(_ID){
		
		console.log(_ID);
		
		for (var i = 0 ; i < areas.length ; i ++){
			
			if(areas[i].getID() == _ID){
				
				selected_area = areas[i];
				
				input_name.val(areas[i].getName());
				
				areas[i].setState('edited');
				
				property.show();
				
			}else{
				
				areas[i].setState('added');
				
			}

		}
		
		update_canvas();
		
	}
	
	function update_area(_ID,_name){
		
		var uarea = getArea(_ID);
		
		if(uarea != undefined){
			
			uarea.setName(_name);
			
			uarea.setState('added');
			
			deselect_all();
			
			update_canvas();
			
		}
		
	}
	
	function update_listed_areas(){
		
		areas_list.empty();
		
		var list = jQuery('<ul/>', {
			ae_id: 'ae_areas_list',
			class: 'ae_layout_list',
		}).appendTo(areas_list);			
		
		for (var i = 0 ; i < areas.length ; i ++){
			

			
			listed_area = jQuery('<li/>', {
				ae_id: areas[i].getID(),
				ae_class:"listed_area",
				class:'ae_listed_area',
			}).appendTo(list);
			
			if(selected_area!=undefined && areas[i].getID()==selected_area.getID()){
				
				jQuery(listed_area).attr('class', 'ae_listed_area-selected');
				
			}
			
			var bt_select = jQuery('<button/>', {
				ae_id:'bt_select'+areas[i].getID(),
				behavior:"select",
				text:areas[i].getName(),
				class : "ae_bt list select",
			}).appendTo(listed_area);
			
			var bt_delete = jQuery('<button/>', {
				ae_id:'bt_delete'+areas[i].getID(),
				behavior:"delete",
				text:"delete",
				class : "ae_bt list delete",
			}).appendTo(listed_area);
			

			
			jQuery('[ae_id="bt_delete'+areas[i].getID()+'"]').click(function( event ) {
				
				var listed_area = jQuery(this).parent();
				var areas_id = jQuery(listed_area).attr("ae_id");
				remove_area(areas_id);
				update_canvas();
				update_listed_areas();
				
			});
			
			jQuery('[ae_id="bt_select'+areas[i].getID()+'"]').click(function( event ) {
				
				var listed_area = jQuery(this).parent();
				var areas_id = jQuery(listed_area).attr("ae_id");
				select_area(areas_id);
				update_canvas();
				update_listed_areas();
				setMode('edit');
			});
		
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
				
				if(selected_area != undefined && selected_area.getID() == areas[i].getID()){
					
					selected_area = undefined;
					property.hide();
				}
				
				areas.splice(_ID,1)
				
				break;
					
			}
		}
	}
	
	function deselect_all(){
		
		selected_area = undefined;
		update_listed_areas();
		
		
	}
	
	function undo(){
	
		polygon.pop();
		ctx.drawImage(img,0,0);
		update_canvas();

	}
	
	function draw_areas(){
	
		for(var j = 0 ; j < areas.length; j ++){
			
			areas[j].display();
			
			if(selected_area != undefined){
				
				if(selected_area.getID() == areas[j].getID()){
					
					if(mode == 'edit'){
						
						areas[j].enable_edit_mode();
						
					}
				}	
			}
		}
	}
	
	function getArea(_ID){
		
		for(var j = 0 ; j < areas.length; j ++){

			areas[j].display();
			
			if(areas[j].getID() == _ID){
				
				return areas[j];
				
				break;
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
		
		this.setName = function(_name){ name = _name}
		
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
			
			state = 'edited';
			
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
					
				break;
				
				case "selected" :
					
					ctx.strokeStyle = 'rgba(255,0,0,1)';
					ctx.fillStyle = 'rgba(100,255,0,0.5)';					
					
					
				break;
				
				case "edited" :
					
					ctx.strokeStyle = 'rgba(255,0,0,1)';
					ctx.fillStyle = 'rgba(255,100,0,0.5)';
					
					
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
			ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.stroke();		

		}
		
		
		//VERIFIERS

		this.isTouchedBy = function(_x,_y){
			
			var distance = Math.floor(Math.sqrt(Math.pow(_x - this.x,2) + Math.pow(_y - this.y,2)));
			
			if (distance < 10){
				
				return true;
			}
			
			return false;
		}		

		


		
	}


}