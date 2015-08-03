<?php 

	$post_id = "";
	$post_area= "";

	if(isset($_POST["post_id"]) && isset($_POST["areas"]){
		
		if($_POST["post_id".length < 8){
			$post_id = sanitize_text_field($_POST["post_id"]);
		}
		
		$post_area = sanitize_text_field($_POST["areas"]);
		
		if($post_id!="" && $post_areas != ""){
		
			update_field('field_55437acf2f99f', $post_areas, $post_id);
		
		}

	}

?>