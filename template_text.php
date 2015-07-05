<?php /* Template Name: Texte */ get_header(); ?>
	
	<figure id="illustration_txt">
		<div class = "imgborder">
			<img src="<?php echo $image['url']; ?>"  border="0" usemap="#Map<?php echo $linked_object->ID; ?>" />
			<?php the_carte($post); ?>
		</div>
	</figure>
	
	<div id="txt">
		<div id="txt-content">
			<?php echo $text; ?>
		</div>
	</div>
	
	<div class="fils-left">
		<div class="slide-left"><a href="<?php echo $history_link; ?>">▲<br>historique</a></div>';
	</div>
