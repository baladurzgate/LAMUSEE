<?php get_header(); ?>

	<main role="main">
	<!-- section -->
	<section>

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

		<!-- article -->
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		
			<div id = "load_gif"> chargement... </div>
		
		
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
									
									case 'areas':
											
										the_areas();
											
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
		

		
		<?php //edit_post_link(); // Always handy to have Edit Post Links available ?>			




	<?php endwhile; ?>

	<?php else: ?>

		<!-- article -->
		<article>

			<h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

		</article>
		<!-- /article -->

	<?php endif; ?>

	</section>
	<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
