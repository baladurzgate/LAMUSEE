<?php /* Template Name: Tableau */ get_header(); ?>
	
	<figure id="illustration">
		<div class = "imgborder">
			<img id = "edited-tableau" src="<?php echo $image['url']; ?>"  border="0" usemap="#Map<?php $post->ID; ?>"/>
			<input type="hidden" id ="map_scale" value="<?php echo $map_scale;?>">
			<input type="hidden" id ="map_offset_x" value="<?php echo $map_offset_x;?>">
			<input type="hidden" id ="map_offset_y" value="<?php echo $map_offset_y;?>">
			<input type="hidden" id ="post_id" value="<?php echo $post->ID;?>">
			<div id="areas">
					<?php echo $modifed_areas; ?>
			</div>
		</div>
		<div id = "tools" class = "panel">
		</div>
		<div id = "layout" class = "panel">
		</div>
	</figure>
	
	<div class="col-left" >
		<div class="legende">...</div>
		<div id="history">...</div>
	</div>
	
	<?php if(has_text()):?>
	
		<div class="fils-right">
			<div class="slide-right"><a href="<?php echo $text_link; ?>">â–²<br>texte</a></div>
		</div>
	
	<?php endif;?>
	
	<?php if(has_details()):?>
	
		<div class="fils-left">
			<div class="slide-left"><a href="<?php echo $details_link; ?>">â–²<br>detail</a></div>
		</div>
	
	<?php endif;?>
	
	
