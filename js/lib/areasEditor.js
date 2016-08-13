

//---------------------------------------------------------------------------------------------------
//------------------------------------------CLASS AREA_EDITOR----------------------------------------
//---------------------------------------------------------------------------------------------------


function Areas_Editor(){
	
	//PRIVATE VARS__________________________________________________________
	
	var areas_editor;
	var canvas,ctx,img,top,left,center,right;
	var tools,areas_list,modes,property,global_transform,file;
	var bt_add,bt_update,bt_polygon,bt_polygon;
	var label_name,label_title;
	var input_name,input_title,input_scale,input_offset_x,input_offset_y;
	var areas = new Array();
	var mousedown = false;
	var mx=0,my=0;
	var mode;
	var selected_area;
	var acount = 0;
	var pcount = 0;
	var polygon = new Area('unborn',00,'poly',new Array());
	var source_areas , post_title ,  post_id , scale , offset_x , offset_y ;
	var output_info;
	var saved_changes = true;
	
	scale = 1;
	offset_x = 0;
	offset_y = 0;	
	
	// INIT__________________________________________________________ 
	
	this.init = function(_img,_top,_left,_center,_right){
		

		source_areas = jQuery('[ae_id="source_areas"]');
		post_title = source_areas.attr("ae_post_title");
		post_id = source_areas.attr("ae_post_id");
		
		// FILL UP "STORED_SHAPE_NAMES"
		
		stored_shape_names = jQuery('#AllShapeNames').val().split(',')

		
		//INIT_VARS
	
		img = document.getElementById(_img);
		top = jQuery(_top);
		left = jQuery(_left);
		center = jQuery(_center);
		right = jQuery(_right);
		
		
		
		canvas = jQuery('<canvas />').attr({
			ae_id: 'canvas',
			id: "ae_canvas",
			width: img.width,
			height: img.height
		}).appendTo(center);
		
		console.log(post_id);
		
		console.log(top);
		console.log(left);
		console.log(center);
		console.log(right);
		console.log(img);
		
		ctx = document.getElementById("ae_canvas").getContext('2d');
		
		ctx.drawImage(img,0,0);
		
		//EVENTS__________________________________________________________
		
		// file_panel 
		
		file = jQuery('<span/>', {
			id:'ae_file_panel',
			ae_id: 'file_panel',
			class:'ae_sub_panel'
		}).appendTo(top);

		bt_save = jQuery('<span/>', {
			ae_id: "title",
			text:post_title,
			class:'ae_title',
		}).appendTo(file);		
		
		output_info = jQuery('<i/>', {
			ae_id: "output_info",
			text:"...",
			class:'ae_info',
		}).appendTo(file);

		
		bt_save = jQuery('<button/>', {
			ae_id: "bt_save",
			text:" SAVE --->",
			class:'ae_bt_save ae_bt',
		}).appendTo(file);
		
		jQuery(bt_save).click(function(event){
			
			console.log(convert_to_html());
			update_post();
			
		})
		
		/*
		
		bt_reload = jQuery('<button/>', {
			ae_id: "bt_reload",
			text:"  ---> RELOAD  ",
			class:'ae_bt_save ae_bt',
		}).appendTo(file);
		
		jQuery(bt_reload).click(function(event){
			
			import_areas();
			update_canvas();
			
		})*/
		
		// global_transform_panel__________________
		
		global_transform = jQuery('<div/>', {
			id:'ae_global_transform_panel',
			ae_id: 'global_transform_panel',
			class:'ae_sub_panel'
		}).appendTo(center);
		
		input_scale = jQuery('<input/>', {
			ae_id: 'input_scale',
			type:'text',
			value:scale,
			class:'ae_input',
		}).appendTo(global_transform);	
		
		 jQuery(input_scale).on('input',function(event){
		     scale = parseFloat(input_scale.val());
		  });
		
		input_offset_x = jQuery('<input/>', {
			ae_id: 'input_offset_x',
			type:'text',
			value:offset_x,
			class:'ae_input',
		}).appendTo(global_transform);	
		
		 jQuery(input_offset_x).on('input',function(event){
			 offset_x = parseInt(input_offset_x.val());
		  });
		
		input_offset_y = jQuery('<input/>', {
			ae_id: 'input_offset_y',
			type:'text',
			value:offset_y,
			class:'ae_input',
		}).appendTo(global_transform);	
		
		 jQuery(input_offset_y).on('input',function(event){
			 offset_y = parseInt(input_offset_y.val());
		  });
		
		
		// mode panel_______________________
				
		modes = jQuery('<div/>', {
			ae_id: 'modes_panel',
			class:'ae_sub_panel'
		}).appendTo(left);
		
		bt_polygon = jQuery('<button/>', {
			ae_id: "bt_polygon",
			text:"polygon",
			class:'ae_bt mode',
		}).appendTo(modes);
		
		jQuery(bt_polygon).click(function(event){
			
			setMode("polygon");
			
		})
		
		// WIP : 
		
		/*bt_rect = jQuery('<button/>', {
			ae_id: "bt_rect",
			text:"rectangle",
			class:'ae_bt mode',
		}).appendTo(modes);
		
		jQuery(bt_rect).click(function(event){
			
			//setMode("rectangle");
			
		})
		
		bt_circle = jQuery('<button/>', {
			ae_id: "bt_circle",
			text:"circle",
			class:'ae_bt mode',
		}).appendTo(modes);
		
		jQuery(bt_circle).click(function(event){
			
			//setMode("circle");
			
		})*/

		// property panel_______________________
		
		property = jQuery('<div/>', {
			id:'ae_property',
			ae_id: 'property_panel',
			class:'ae_sub_panel'
		}).appendTo(right);
		
		var autocomplete_wrapper = jQuery('<div/>', {
			class:'ui-widget',
		}).appendTo(property);
		
		var label_name = jQuery('<label/>', {
			ae_id: 'label_name',
			text:"Area Name : ",
			class:'ae_label',
			for:'#input_name',
		}).appendTo(autocomplete_wrapper);
		
		input_name = jQuery('<input/>', {
			ae_id: 'input_name',
			id: 'input_name',
			value:"new_area"+acount,
			class:'ae_input',
		}).appendTo(autocomplete_wrapper);
		

	    jQuery('#input_name').autocomplete({
	      source: stored_shape_names
	    });		
		
		
		label_title = jQuery('<span/>', {
			ae_id: 'label_title',
			text:"Area Title : ",
			class:'ae_label',
		}).appendTo(property);
		
		input_title = jQuery('<input/>', {
			ae_id: 'input_title',
			type:'text',
			value:"new_area"+acount,
			class:'ae_input',
		}).appendTo(property);
		
		//ADD_______________________
		
		bt_add = jQuery('<button/>', {
			ae_id: "bt_add",
			text:"ajouter",
			class:'ae_bt',
		}).appendTo(property);
		
		jQuery(bt_add).click(function( event ) {
			
			add_area(input_name.val(),input_title.val(),'poly',polygon.getCoords().slice());
			update_listed_areas();
			init_property();

		});
		
		//UPDATE_______________________
		
		bt_update = jQuery('<button/>', {
			ae_id: "bt_update",
			text:"update",
			class:'ae_bt',
		}).appendTo(property);

		jQuery(bt_update).click(function( event ) {
			
			if(selected_area != undefined){
				update_area(selected_area.getID(),input_name.val(),input_title.val());
				//setMode('polygon');
				//init_property();
			}

		});
		
		//UNDO_______________________
		
		bt_undo = jQuery('<button/>', {
			ae_id: "bt_undo",
			text:"undo",
			class:'ae_bt',
		}).appendTo(property);
		

		jQuery(bt_undo).click(function( event ) {
			
			undo();

		});
		
		// layout panel_______________________
		
		areas_list = jQuery('<div/>', {
			id:'ae_layout_panel',
			ae_id: 'layout_panel',
			class : "ae_sub_panel",
		}).appendTo(right);
		

		
		
		// canvas_______________________
	
		jQuery('body').mousemove(function( event ) {
		
			mx = event.pageX - jQuery(canvas).offset().left;
			my = event.pageY- jQuery(canvas).offset().top;
			
			update_canvas();

		});

		jQuery(canvas).mousedown(function( event ) {

			mousedown = true;
			
			switch (mode){
			
				case 'polygon' : 
					
					property.show();
				
				break;
				
				case 'move' : 
					
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
				
				case 'polygon' : 
					
					if(!isOut(mx,my)){
						
						polygon.addPoint(mx,my);
						
						update_output_info("unsaved changes");
					}
										
				break;
				
				case 'edit' : 
					
					selected_area.selected_point = undefined;
					
					update_output_info("unsaved changes");
					
				break;			
			
			}
			

			
		});
		
		import_areas();
		
		setMode("polygon");
		
		// CSS
		
		areas_editor = jQuery('#Areas_Editor');
		
		var optimal_width = left.width()+img.width+right.width();
		
		console.log(optimal_width);
		
		areas_editor.css('max-width',optimal_width+60);
		
		areas_list.css('height',(img.height - property.height()) -45);
		
		
		update_canvas();
		
	}
	
	//LAYOUT_______________________
	
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
			
			//SELECT_______________________
			
			var bt_select = jQuery('<button/>', {
				ae_id:'bt_select'+areas[i].getID(),
				behavior:"select",
				text:areas[i].getName(),
				class : "ae_bt list select",
			}).appendTo(listed_area);
			
			jQuery('[ae_id="bt_select'+areas[i].getID()+'"]').click(function( event ) {
				
				
				
				var listed_area = jQuery(this).parent();
				var area_id = jQuery(listed_area).attr("ae_id");
				
				if(selected_area != undefined){
				
					if(selected_area.getID()!=area_id){
						select_area(area_id);
					}else{
						setMode('polygon');
					}
				
				}else{
					
					select_area(area_id);
				}
				
				update_listed_areas();
			});
			
			//DELETE_______________________
			
			var bt_delete = jQuery('<button/>', {
				ae_id:'bt_delete'+areas[i].getID(),
				behavior:"delete",
				text:"X",
				class : "ae_bt list delete",
			}).appendTo(listed_area);
			

			
			jQuery('[ae_id="bt_delete'+areas[i].getID()+'"]').click(function( event ) {
				
				var listed_area = jQuery(this).parent();
				var areas_id = jQuery(listed_area).attr("ae_id");
				remove_area(areas_id);
				update_listed_areas();
				
			});
		
		}
		
	}
	
	//FACTORY__________________________________________________________
	
	function add_area(_name,_title,_shape,_coords){
		
		if(_coords.length >= 2){
		
		var narea = new Area(_name,_title,_shape,_coords,acount);
		
			areas.unshift(narea);
			deselect_all();
			acount++;
		
			update_canvas();
		
		
		}
		
		update_output_info("unsaved changes");
		
	}
	
	
	function remove_area(_ID){
		
		for (var i = 0 ; i < areas.length ; i ++){
			
			if(areas[i].getID() == _ID){
				
				if(selected_area != undefined && selected_area.getID() == areas[i].getID()){
					
					selected_area = undefined;
					property.hide();
				}
				
				areas.splice(i,1)
				
				break;
					
			}
		}
		
		update_canvas();
		
		update_output_info("unsaved changes");
	}
	
	
	function update_area(_ID,_name,_title){
		
		var uarea = getArea(_ID);
		
		if(uarea != undefined){
			
			uarea.setName(_name);
			
			uarea.setTitle(_title)
			
			//uarea.setState('added');
			
			//deselect_all();
			
			update_canvas();
			
		}
		
		update_output_info("unsaved changes");
		
	}
	
	//SELECT__________________________________________________________
	
	function select_area(_ID){

		setMode('edit');
		
		for (var i = 0 ; i < areas.length ; i ++){
			
			if(areas[i].getID() == _ID){
				
				selected_area = areas[i];
				
				input_name.val(areas[i].getName());
				
				input_title.val(areas[i].getTitle());
				
				areas[i].setState('edited');
				
				property.show();
				

				
			}else{
				
				areas[i].setState('added');
				
			}

		}
		
		update_canvas();

		
	}
	
	function deselect_all(){
		
		selected_area = undefined;
		update_listed_areas();
		update_canvas();
		
	}
	
	function undo(){
		
		
		polygon.removePoint(polygon.getLastPoint());
		ctx.drawImage(img,0,0);
		update_canvas();

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
	
	// DISPLAY__________________________________________________________
	
	function draw_polygon(){
		
		var pcoords = polygon.getCoords();
		
		ctx.beginPath();
		
		ctx.strokeStyle = 'rgba(255,0,0,1)';
		ctx.fillStyle = 'rgba(255,100,0,0.3)';
		
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
	
	function draw_areas(){
		
		for(var j = 0 ; j < areas.length; j ++){
			
			areas[j].display();
			
			if(selected_area != undefined){
				
				if(selected_area.getID() == areas[j].getID()){
					
					if(mode == 'edit'){
						
						areas[j].enable_edit_mode();
						
					}
					
				}else{
					
					areas[j].setState('added')
					
				}	
			}else{
				
				areas[j].setState('added')
				
			}	
		}
	}
	
	function update_canvas(){
	
		ctx.drawImage(img,0,0);
		
		draw_areas();	
		
		switch (mode){
		
			case "polygon" : 
				
				draw_polygon();
				
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
		
		
	
	}
	
	function update_output_info(_msg){
		
		output_info.text(_msg);
		
	}
	
	function init_property(){
		
		input_name.val("new_area"+acount);
		input_title.val("new_area"+acount);
		polygon = new Area('unborn','no_title','poly',new Array());
		
	}
	
	function edit_area_name(){
		
		//label_name.hide();
		input_name.show();
		
	}
	

	


	//TEST__________________________________________________________

	
	function isOut(x,y){
	
		if(x > canvas.width || x < 0 || y > canvas.height || y < 0){
		
			return true;
		}
		
		return false;
	
	}
	
	// OPTIONS__________________________________________________________
	
	function setMode(_mode){
		
		mode = _mode
		
		switch (mode){		
		
			case 'edit': 
				
				edit_area_name();
				
				if(selected_area==undefined){property.hide()};
				bt_update.show();$
				bt_undo.hide();
				bt_add.hide();
				
				bt_polygon.attr('class','ae_bt mode');
				
			break;
			
			case 'polygon' : 
				
				edit_area_name();
				deselect_all();
				bt_update.hide();
				bt_add.show();
				bt_undo.show();
				init_property();
				bt_polygon.attr('class','ae_bt mode-selected');

				
			break;
		
		
		}
		
	}
	
	// DATA__________________________________________________________
	
	function update_post(){
	
		data = convert_to_html();
		
		var data = {
			'action': 'update_areas',
			'post_id':post_id,
			'post_areas': sanitize_areas(convert_to_html()),
			'post_scale':scale,
			'post_offset_x':offset_x,
			'post_offset_y':offset_y
			
		};
		
		jQuery.post(ajaxurl, data, function(response) {
			//alert('Got this from the server: ' + response);
			update_output_info("areas up to date");
		});
			
	}
	
	function convert_to_html(){
		
		var html = "";
	
		for (var i = 0 ; i < areas.length ; i ++){
		
			var coords = areas[i].getCoords('string');
			var name = areas[i].getName();
			var title = areas[i].getTitle();
			var shape = areas[i].getShape();
		
			var line =  '<area shape="'+shape+'" coords="'+coords+'" href="#'+name+'" alt="'+name+'" title = "'+title+'">'+"\n";
			html+=line;
		
		}
	
		return html;
	
	}
	
	function import_areas(){
	
		areas = new Array();
		
		post_id = parseInt(source_areas.attr("ae_post_id"));
		scale = parseFloat(source_areas.attr("ae_scale"));
		offset_x = parseInt(source_areas.attr("ae_offset_x"));
		offset_y = parseInt(source_areas.attr("ae_offset_y"));
		
		console.log(post_id)
		console.log(scale)
		console.log(offset_x)
		console.log(offset_y)
		
		update_scale_offset();
	
		jQuery('[ae_id="source_areas"] > area').each(function(i,j){
			var name = jQuery(this).attr( "href" );
			var title = jQuery(this).attr( "title" );
			var shape = jQuery(this).attr( "shape" );
			var coords = jQuery(this).attr( "coords" ).split(',');
			var clean_coords = [];
			var iarea = new Area('imported_area'+i,title,shape,new Array());
			
			switch (shape){
			
			case 'poly' : 
				
				for (var c = 0 ; c < coords.length ; c++) {
					
					if(c == 1){
						
						iarea.addPoint(parseInt(coords[0]),parseInt(coords[1]))
					
					}else if(c > 1 && c < coords.length-1 && c % 2 == 0){
					
						iarea.addPoint(parseInt(coords[c]) ,parseInt(coords[c+1]));			
					
					}else if(c == coords.length-1){
					
						iarea.addPoint(parseInt(coords[coords.length-2]) ,parseInt(coords[coords.length-1]));			
						
					}
				
				}
				
				break; 
				
			case 'rect' :
						
				iarea.addPoint(parseInt(coords[0]),parseInt(coords[1]));
				iarea.addPoint(parseInt(coords[2]),parseInt(coords[3]));
					
								
				break;
				
				
			case 'circle':
				
				iarea.addPoint(parseInt(coords[0]),parseInt(coords[1]));
				
				var center = {x:parseInt(coords[0]),y:parseInt(coords[1])}
				var rayon = parseInt(coords[2]);
				
				iarea.addPoint(center.x,center.y+rayon);
				
				break;
			
			
			
			}
			
			
			console.log(title);
			
			name = name.slice(1) != "" ? name.slice( 1 ) : '.';

			add_area(name,title,shape,iarea.getCoords());
			
					
			update_output_info("areas up to date");
			
		});		
	
		
	
	}
	
	//TREAT
	
	function scale_offset_x(_val){
		
		return (_val*scale)+offset_x;
		
	}
	
	function scale_offset_y(_val){
		
		return (_val*scale)+offset_y;
		
	}
	
	function update_scale_offset(){
		
		input_scale.val(scale);
		input_offset_x.val(offset_x);
		input_offset_y.val(offset_y);
	}
	
	//SANITIZER
	
	function sanitize_areas(_str){
	 
		var str = _str.replace("<?php", '_').replace("?>", '_');
		return str
	}

	
	
	//---------------------------------------------------------------------------------------------------
	//------------------------------------------SUB CLASS AREA-------------------------------------------
	//---------------------------------------------------------------------------------------------------
	
	function Area (_name,_title,_shape,_coords,_ID){

		
		//PRIVATE VARS__________________________________________________________

		var name = _name;  
		var shape = _shape;
		var coords = _coords;
		var title = _title != undefined ? _title : _name;
		var ID = "area"+_ID;
		
		var state = 'added';
		
		
		
		//PUBLIC VARS__________________________________________________________
		
		this.selected_point;
		
		//GETTERS__________________________________________________________
		
		this.getCoords = function(_type){
		
			var type = _type != undefined ? _type : "array";
		
			switch (type){
			
				case 'string':
					
					var str = "";
					
					for(var i = 0 ; i < coords.length ; i ++){
					
						if(i<coords.length-1){
						
							str+=Math.floor(coords[i].x)+','+Math.floor(coords[i].y)+','
						
						}else if(i == coords.length-1){
						
							str+=Math.floor(coords[i].x)+','+Math.floor(coords[i].y);
						}
					
					}
					
					return str;
				
				break;
				
				case 'array' : 
				
					return coords;
				
				break;
			}
		}
		
		this.getID = function(){ return ID;}
		
		this.getName = function(){ return name;}
		
		this.getTitle = function(){ return title;}
		
		this.getShape = function(){ return shape;}
		
		this.getPoint = function(_ID){
			
			var p = null;
			
			for(var i = 0 ; i < coords.length ; i++){
				
				if(coords[i].getID() == _ID){
					
					p = coords[i];
					
				}
				
			}
			
			return p;
			
		}
		
		this.getLastPoint = function (){
			
			if(coords.length > 1){
				
				return coords[coords.length-1].getID();
				
			}else{
				
				return coords[0].getID();
				
			}
			
			
			
		}
		
		// SETTERS__________________________________________________________ 
		
		this.setName = function(_name){ name = _name}
		
		this.setTitle = function(_title){ title = _title}
		
		this.setState = function(_state){state = _state;}
		
		this.select_point = function(_ID){ 
			
			for (var i = 0 ; i<coords.length ; i++){
				
				if(coords[i].getID() == _ID){
					
					this.selected_point = coords[i];
	
				}
				
			}
			
		}		
		
		//ADDERS__________________________________________________________
		
		this.addPoint = function(_x,_y){
			
			var new_point = new aPoint(_x,_y,pcount);
			coords.push(new_point);
			pcount++;
			
		}
		
		this.removePoint = function(_ID){
			
			for (var i = 0 ; i<coords.length ; i++){
				
				if(coords[i].getID() == _ID){
					
					coords.splice(1,i);
	
				}
				
			}
			
		}
		
		//DISPLAY__________________________________________________________
		
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
					ctx.fillStyle = 'rgba(0,100,255,0.3)';			
					
				break;
				
				case "edited" :
					
					ctx.strokeStyle = 'rgba(255,0,0,1)';
					ctx.fillStyle = 'rgba(255,100,0,0.3)';
					
					
				break;
			}
			
			switch (shape){
			
				case 'poly':
					
					ctx.moveTo(scale_offset_x(coords[0].x),scale_offset_y(coords[0].y));
					
					for(var i = 0 ; i<coords.length; i++){
						
						ctx.lineTo(scale_offset_x(coords[i].x),scale_offset_y(coords[i].y));
							
					}		
					
					ctx.lineTo(scale_offset_x(coords[0].x),scale_offset_y(coords[0].y));
					
					
					ctx.fill();
					ctx.stroke();				
					
				break;
				
				case 'rect':
					
					var x1 = scale_offset_x(coords[0].x);
						
					var y1 = scale_offset_y(coords[0].y);
						
					var x2 = scale_offset_x(coords[1].x);
						
					var y2 = scale_offset_y(coords[1].y);
		
					ctx.rect(x1,y1,x2-x1,y2-y1);
					ctx.fill();
					ctx.stroke();				
					
				break;
				
				case 'circle':
					
					var cx =scale_offset_x(coords[0].x);
					var cy = scale_offset_y(coords[0].y);
					var rx = scale_offset_x(coords[1].x);
					var ry = scale_offset_y(coords[1].y);

					var rayon = Math.floor(Math.sqrt(Math.pow(rx - cx,2) + Math.pow(ry - cy,2)));
					ctx.arc(cx, cy, rayon, 2 * Math.PI, false);
					ctx.fill();
					ctx.stroke();				
					
				break;
			
			}
			
		}



	}
	
	//---------------------------------------------------------------------------------------------------
	//------------------------------------------SUB CLASS APOINT-----------------------------------------
	//---------------------------------------------------------------------------------------------------

	function aPoint (_x,_y,_ID){
		
		
		//PUBLIC VARS__________________________________________________________
		
		this.x = _x;
		this.y = _y;
		
		//PRIVATE VARS__________________________________________________________ 
		
		var ID = _ID;
		
		//GETTERS__________________________________________________________

		this.getID = function(){ return ID;}
		
		//SETTERS__________________________________________________________
		
		//DISPLAY__________________________________________________________
		
		this.display_handle = function(){
			
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,0,0,1)';
			ctx.fillStyle = 'rgba(255,255,0,1)';
			ctx.arc(scale_offset_x(this.x), scale_offset_y(this.y), 4, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.stroke();		

		}
		
		
		//TEST__________________________________________________________

		this.isTouchedBy = function(_x,_y){
			
			var distance = Math.floor(Math.sqrt(Math.pow(_x - scale_offset_x(this.x),2) + Math.pow(_y - scale_offset_y(this.y),2)));
			
			if (distance < 10){
				
				return true;
			}
			
			return false;
		}		

		


		
	}


}