<?php /* Template Name: ShapeList*/ get_header(); 

$shape_list = get_shape_list();

function compareByName($a, $b) {
	return strcmp($a["name"], $b["name"]);
}
//usort($shape_list, 'compareByName');



foreach ( $shape_list as $shape ) :

	$extra_class = "";
	
	if(count($shape['paintings']) < 2){
		$extra_class = "shape_unlinked";
	}
	
	?>
		
	<div class = "shape_row <?php echo $extra_class; ?>">
		<div class = "shape_name "><center><b><?php echo $shape['name'] ;  ?></center> </b></div>
		<div class = "shape_related_paintings">
			<ul> 
			<?php foreach ( $shape['paintings'] as $painting_id ) : ?>
				
				<li><a href="<?php echo get_permalink($painting_id );  ?>"><?php echo get_the_title($painting_id);  ?></a> <?php edit_post_link('edit', ' ( ', ' ) ', $painting_id ); ?></li>
				
			<?php endforeach;  ?>
			</ul>
		</div>
	</div>


<?php endforeach;  ?>
	
