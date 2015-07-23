<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<!-- article -->
	<article id="post-<?php the_ID(); ?>" <?php post_class('listed_painting'); ?>>
	
	
		<div id="conteneur">
			<figure id="illustration">
			</figure>
	
	

		<!-- post thumbnail -->
		<?php if ( has_post_thumbnail()) : // Check if thumbnail exists ?>
			<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
				<?php the_post_thumbnail(array(120,120)); // Declare pixel size you need inside the array ?>
			</a>
		<?php endif; ?>
		<!-- /post thumbnail -->

		<!-- post title -->
		<h2>
			<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" class = "listed_painting_title"><?php the_title(); ?></a>
		</h2>
		<!-- /post title -->

		<!-- post details -->
		
		<spans class = "listed_painting_artist"><?php echo get_field('artiste',$post->ID);?></spans>
		

		<h4>Formes :</h4>
		<?php the_shapes();?>
		
		<!-- /post details -->

		<?php edit_post_link(); ?>
		
		</div>

	</article>
	<!-- /article -->

<?php endwhile; ?>

<?php else: ?>

	<!-- article -->
	<article>
		<h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>
	</article>
	<!-- /article -->

<?php endif; ?>
