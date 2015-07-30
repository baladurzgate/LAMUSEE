<?php /* Template Name: Carte Info */ get_header(); ?>
<div id="carte">
		<?php if($artiste) echo $artiste; ?>
		<i> <?php if($titre_du_tableau) echo $titre_du_tableau; ?></i>
		<?php if($date) echo ', '.$date; ?>
		<br>
		<?php if($dimensions) echo $dimensions; ?><?php if($technique) echo ', '.$technique; ?><?php if($lieu_de_conservation) echo ', '.$lieu_de_conservation; ?>
	</div>
