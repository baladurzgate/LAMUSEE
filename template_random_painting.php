<?php /* Template Name: Tableau Aleatoire */ get_header(); 

global $post ;

$post = get_random_painting();



?>

	<main role="main">
	<!-- section -->
	<section>
		
		<!-- article -->
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		
			<div id = "load_gif">...</div>
		
		
			<div id="conteneur" style = "display:none;">


			<!-- post title -->
			<h1>
				<a class = "displaynone" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
			</h1>
			<!-- /post title -->
			
				<?php 
				
					$format = get_post_format( $post_id );
				
					switch ($format){
						
						case 'image':
							
							if (isset($_GET['part']))
							{
								$part = sanitize_text_field($_GET['part']);
								
								switch ($part){
									
									
									case 'text':
											
										the_text();
									
									break;
									
									case 'details':
											
										the_details();
											
									break;
									
								}
								
							}else{
								
								the_illustration();
								
							}

								
						break;
						
						case 'quote':
							
							the_text();
								
						break;
						
						
					}

				?>
				
		</article>
		<!-- /article -->

	</section>
	<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); 

wp_reset_query();

?>
