<?php /* Template Name: Tableau */ get_header(); ?>
	<div id = "Areas_Editor">
		<div id = "ae_left-panel" class = "ae_panel">
		
		</div>
		
		<div id="ae_center-panel" class = "ae_panel">
			<div class = "imgborder">
				<img id = "ae_source_image" src="<?php echo $image['url']; ?>"/>
				<input type="hidden" id ="map_scale" value="<?php echo $map_scale;?>">
				<input type="hidden" id ="map_offset_x" value="<?php echo $map_offset_x;?>">
				<input type="hidden" id ="map_offset_y" value="<?php echo $map_offset_y;?>">
				<input type="hidden" id ="post_id" value="<?php echo $post->ID;?>">
				<div id="areas">
						<?php echo $modifed_areas; ?>
				</div>
			</div>
		</div>
		
	
		
		<div id = "ae_right-panel" class = "ae_panel">
	
		</div>
	</div>

	<div class="fils-right">
		<div class="slide-right"><a href="<?php echo $text_link; ?>">â–²<br>tableaux</a></div>
	</div>


	
	
