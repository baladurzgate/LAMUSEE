<?php /* Template Name: Texte */ get_header(); ?>
	
	<figure id="illustration">
		<div class = "imgborder">
			<img id = "tableau" src="<?php echo $image['url']; ?>"  border="0" usemap="#Map<?php echo $linked_object->ID; ?>" />
			<?php the_carte($post); ?>
		</div>
	</figure>
	
	
	
	
	<?php if(has_text()): ?>
	
	<div id="txt">
		<div id="txt-content">
			<?php echo $text; ?>
		</div>
	</div>
	
	<?php else: ?>
	
	<div id="missing-txt" class = "missing_text">
		<div class = "missing_txt_gif"></div>
	</div>
	

	<?php endif; ?>
	
	<div class="fils-left">
		<div class="slide-left"><a href="<?php echo $history_link; ?>">▲<br>historique</a></div>';
	</div>