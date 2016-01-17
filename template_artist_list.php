<?php /* Template Name: ArtistList*/ get_header(); 

$artist_list = get_artist_list();


function compareByName($a, $b) {
	return strcmp($a["name"], $b["name"]);
}
usort($artist_list, 'compareByName');

foreach ( $artist_list as $artist ) :

	$extra_class = "";
	

	?>
		
	<div class = "shape_row <?php echo $extra_class; ?>">
		<div class = "artist_name "><center><b><?php echo $artist['name'] ;  ?></center> </b></div>
		<div class = "artist_related_paintings">
			<ul> 
			<?php foreach ( $artist['paintings'] as $painting_id ) : ?>
				
				<li><a href="<?php echo get_permalink($painting_id );  ?>"><?php echo get_the_title($painting_id);  ?></a> <?php edit_post_link('edit', ' ( ', ' ) ', $painting_id ); ?></li>
				
			<?php endforeach;  ?>
			</ul>
		</div>
	</div>


<?php endforeach;  ?>
	
