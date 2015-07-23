<?php /* Template Name: Liste Tableau */ get_header(); 

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
					'terms' => array('post-format-image'),
			) )
	);
	
	query_posts($args); 
	
	
	//query_posts('post_type=post&posts_per_page=5&paged='.get_query_var('paged').'&taxonomy=post_format&terms=post-format-image'); 

?>

	
	<?php ?>

<?php get_template_part('loop_paintings'); ?>

<br>

<?php get_template_part('pagination'); ?>

<?php wp_reset_query(); ?>
