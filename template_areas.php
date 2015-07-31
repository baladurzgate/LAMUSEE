<?php /* Template Name: Tableau */ get_header(); ?>

	<div id = "Areas_Editor">
		<div id = "ae_top-panel" class = "ae_panel">
		<div id = "title" class = "ae_sub_panel"><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
		</div></div>
		
		<div id = "ae_left-panel" class = "ae_panel"></div>
		<div id="ae_center-panel" class = "ae_panel">
			<div class = "imgborder">
				<img id = "ae_source_image" src="<?php echo $image['url']; ?>"/>
				<div id="areas" ae_id = "source_areas" ae_post_id = "<?php echo $post->ID;?>" ae_scale = "<?php echo $map_scale;?>" ae_offset_x = "<?php echo $map_offset_x;?>" ae_offset_y = "<?php echo $map_offset_y;?>">
						<?php echo $areas; ?>
				</div>
			</div>
		</div>
		<div id = "ae_right-panel" class = "ae_panel"></div>
	</div>

	<div class="fils-right">
		<div class="slide-right"><a href="<?php echo $text_link; ?>">â–²<br>tableaux</a></div>
	</div>


	
	
