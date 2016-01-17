<?php /* Template Name: Texte Absent */ get_header(); ?>
	
	<figure id="illustration_txt">
		<div class = "imgborder">
			<img src="<?php echo $image['url']; ?>"  border="0" usemap="#Map<?php echo $linked_object->ID; ?>" />
		</div>
		<?php the_carte($post); ?>
	</figure>
	
	<div id="txt">
		Aucun texte n'est associé à ce tableau pour l'instant. 
	</div>
	
	<div class="fils-left">
		<div class="slide-left"><a href="<?php echo $history_link; ?>">â–²<br>historique</a></div>';
	</div>