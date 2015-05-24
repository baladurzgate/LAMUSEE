<?php /* Template Name: Tableau */ get_header(); ?>
	
	<figure id="illustration">
		<div class = "imgborder">
			<img src="<?php echo $image['url']; ?>"  border="0" usemap="#Map<?php $post->ID; ?>"/>
			<map name="Map<?php echo $linked_object->ID; ?>" id="Map<?php $post->ID; ?>">
					<?php echo $modifed_areas; ?>
			</map>
		</div>
	</figure>
	
	<div class="col-left" >
		<div class="legende">...</div>
		<div id="history">...</div>
	</div>
	
	<div class="fils-right">
		<div class="slide-right"><a href="<?php echo $text_link; ?>">â–²<br>texte</a></div>
	</div>
	
	<div class="fils-left">
		<div class="slide-left"><a href="<?php echo $details_link; ?>">â–²<br>detail</a></div>
	</div>
	
