<?php get_header(); ?>

	<main role="main">
	<!-- section -->
	<section>

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

		<!-- article -->
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		
		
			<div id="conteneur">


			<!-- post title -->
			<h1>
				<a class = "displaynone" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
			</h1>
			<!-- /post title -->

			<!-- post details -->
			<span class="date displaynone"><?php the_time('F j, Y'); ?> <?php the_time('g:i a'); ?></span>
			<span class="author displaynone"><?php _e( 'Published by', 'html5blank' ); ?> <?php the_author_posts_link(); ?></span>
			<span class="comments displaynone"><?php if (comments_open( get_the_ID() ) ) comments_popup_link( __( 'Leave your thoughts', 'html5blank' ), __( '1 Comment', 'html5blank' ), __( '% Comments', 'html5blank' )); ?></span>
			<!-- /post details -->
			
				<?php 
				
					$format = get_post_format( $post_id );
				
					switch ($format){
						
						case 'image':
								
							the_illustration();
								
						break;
						
						case 'quote':
							
							the_text();
								
						break;
						
						
					}

				?>
				
				<!--  <div class="col-left" >
					<div class="legende">...</div>
				</div>
				
				<div class="fils-left">
					<div class="slide-left"><a href="<?php echo $zoom; ?>">▲<br>détail</a></div>
				</div>
				
				<div class="fils-right">
					<div class="slide-right"><a href="<?php echo get_field('linked_text') ?>" >▲<br>texte</div>
				</div>-->
				
		
		
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
