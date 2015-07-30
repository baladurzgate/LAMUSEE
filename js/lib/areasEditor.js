function Area (_name,_coords){

	var coords = _coords;
	var name = _name;  
	
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



}

function Areas_Editor(){

	var canvas,ctx,img,cont,tools,bt_add,bt_draw,bt_edit,input_name,areas_list;
	var areas = new Array() , polygon = new Array();
	var mousedown = false;
	var mx=0,my=0;
	
	this.init = function(_img,_cont){
	
		img = document.getElementById(_img);
		cont = $(_cont);
		
		canvas = $('<canvas />').attr({
			id: "canvas",
			width: img.width,
			height: img.height
		}).appendTo(_cont);
		
		console.log(canvas);
		console.log(img);
		ctx = document.getElementById("canvas").getContext('2d');
		
		ctx.drawImage(img,0,0);
				
		tools = $('<div/>', {
			id: 'tools',
			class:'tools'
		}).appendTo(cont);
		
		bt_add = $('<button/>', {
			id: 'bt_add',
			class:'bt_tools',
			text:"ajouter",
		}).appendTo(tools);
		
		bt_edit = $('<button/>', {
			id: 'bt_edit',
			class:'bt_tools',
			text:"editer",
		}).appendTo(tools);
		
		bt_undo = $('<button/>', {
			id: 'bt_undo',
			class:'bt_tools',
			text:"undo",
		}).appendTo(tools);
		
		input_name = $('<input/>', {
			id: 'input_name',
			type:'text',
			value:"area"+areas.length,
			class:'bt_tools',
		}).appendTo(tools);
		
		areas_list = $('<div/>', {
			id: 'areas_list',
			class:'bt_tools',
		}).appendTo(cont);
		
		
	
		$(canvas).mousemove(function( event ) {
		
			mx = event.pageX;
			my = event.pageY;
			update_canvas();
						

		});

		$(canvas).mousedown(function( event ) {

			mousedown = true;

		});

		$(canvas).mouseup(function( event ) {

			if(!isOut(event.pageX,event.pageY)){
				polygon.push([event.pageX,event.pageY]);
			}
			mousedown = false;

		});

		$(bt_add).click(function( event ) {
			
			add_area(input_name.val(),polygon.slice());
			ctx.drawImage(img,0,0);
			draw_areas();
			input_name.val("area"+areas.length);
			polygon = new Array();
			areas_list.empty();
			
			var list = $('<ul/>', {
			id: 'list',
			}).appendTo(areas_list);			
			
			for (var i = 0 ; i < areas.length ; i ++){
				
				listed_area = $('<li/>', {
				class:'listed_area',
				text:areas[i].getName()
				}).appendTo(list);
				
				var bt_delete = $('<button/>', {
				class:'bt_list',
				text:"delete"
				}).appendTo(listed_area);
			
			}

		});
		
		$(bt_undo).click(function( event ) {
			
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
	
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(0,0,255,1)';
			ctx.fillStyle = 'rgba(0,100,255,0.5)';
			for(var j = 0 ; j < areas.length; j ++){
			
				var coords = areas[j].getCoords();
				
				ctx.moveTo(coords[0][0],coords[0][1]);
				for(var i = 0 ; i<coords.length; i++){
					ctx.lineTo(coords[i][0],coords[i][1]);
				}			
				
			}
			ctx.fill();
			ctx.stroke();
	}
	
	function draw_polygon(){
		

			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,0,0,1)';
			ctx.fillStyle = 'rgba(255,100,0,0.5)';
			if(polygon.length > 0){
				for(var i = 0 ; i<polygon.length; i++){
					ctx.lineTo(polygon[i][0],polygon[i][1]);
				}
			}
			if(mousedown){
				if(polygon.length == 0){
					polygon.push([mx,my]);
				}
				ctx.lineTo(mx,my);
			}
			if(polygon.length > 1){
				
				ctx.lineTo(polygon[0][0],polygon[0][1]);
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
			
		$.ajax({
			type: "POST",
			url: "update_post_areas.php",
			data: "post_id=" + name + "&post_areas=" + link ,
			cache: true,
			success: function(data) {
				alert("success!");
			}
		});
			
	}


}