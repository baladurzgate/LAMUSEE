<?php /* Template Name: Liste de Textes */ get_header(); 

	//add_filter('posts_where', 'filter_only_paintings');
	

	 //wp_reset_query(); 
	 
	$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
	
	$args = array(
			'post_type' => 'post',
			'posts_per_page' => 20,
			'paged'=>$paged,
			'tax_query' => array( array(
					'taxonomy' => 'post_format',
					'field' => 'slug',
					'terms' => array('post-format-quote'),
			) )
	);
	
	query_posts($args); 
	

?>

	
	<?php ?>

<?php get_template_part('loop_texts'); ?>

<br>

<?php get_template_part('pagination'); ?>

<?php wp_reset_query(); ?>