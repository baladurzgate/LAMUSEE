<?php /* Template Name: Abecedaire*/ get_header(); 

$shape_list = get_shape_list();

function compareByName($a, $b) {
	return strcmp($a["name"], $b["name"]);
}
usort($shape_list, 'compareByName');

	$breaker = "m";
	$alphabetic_shape_list = alphabetic_shape_list();
?>

	<div class = "shape_row alphabet">
	<center>
<?php foreach ( $alphabetic_shape_list as $letter => $shapes) :?> 	

<a class = "alaphabet" href="#<?php echo strtoupper($letter); ?>"><?php echo strtoupper($letter); ?></a>
<?php if($letter == $breaker) :?> 
<br>
<?php endif;?> 
<?php endforeach; ?> 
</center>
	</div>

<?php
foreach ( $alphabetic_shape_list as $letter => $shapes) :

	/*$extra_class = "";
	
	if(count($shape['paintings']) < 2){
		$extra_class = "shape_unlinked";
	}*/

	?>
	
	
	
		
	<div class = "shape_row <?php echo $extra_class; ?>">
	<div class = "alphabet" id ="<?php echo strtoupper($letter); ?>"><center><?php echo strtoupper($letter); ?></center></div>
			<ul> 
	<?php foreach ( $shapes as $shape ) :?>

				
				<li><?php echo $shape;  ?></li>
				
			<?php endforeach;  ?>
			</ul>
	</div>


<?php endforeach;  ?>
	
