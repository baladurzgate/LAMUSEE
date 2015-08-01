<?php /* Template Name: Tableau */ get_header(); ?>
	
	<figure id="illustration">
		<div class = "imgborder">
			<img id = "tableau" src="<?php echo $image['url']; ?>"  border="0" usemap="#Map<?php $post->ID; ?>"/>
			<input type="hidden" id ="map_scale" value="<?php echo $map_scale;?>">
			<input type="hidden" id ="map_offset_x" value="<?php echo $map_offset_x;?>">
			<input type="hidden" id ="map_offset_y" value="<?php echo $map_offset_y;?>">
			<map name="Map<?php echo $linked_object->ID; ?>" id="Map<?php $post->ID; ?>">
					<?php echo $modifed_areas; ?>
			</map>
			
			<?php if ( current_user_can( 'edit_posts' ) ) :?>
			
				<a href="<?php echo $areas_link; ?>">* EDIT AREAS *</a>
			
			<?php endif;?>
			
		</div>
	</figure>
	
	<div class="col-left" >
		<div class="legende">...</div>
		<div id="history">...</div>
	</div>
	
	<?php if(has_text()):?>
	
		<div class="fils-right">
			<div class="slide-right"><a href="<?php echo $text_link; ?>">▲<br>texte</a></div>
		</div>
	
	<?php endif;?>
	
	<?php if(has_details()):?>
	
		<div class="fils-left">
			<div class="slide-left"><a href="<?php echo $details_link; ?>">▲<br>detail</a></div>
		</div>
	
	<?php endif;?>
	
	
