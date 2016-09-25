<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<!-- article -->
	<article id="post-<?php the_ID(); ?>" <?php post_class('listed_text'); ?>>
	
		<?php 
		
			global $post;
			
			$titre_ouvrage = get_field('book_title',$post->ID);
			$auteur = get_field("author",$post->ID);
			$date = get_field("publishing_date",$post->ID);
			$traducteur = get_field("traductor",$post->ID);
			
			$text = $post->post_content;
			
			$first_line = strtok($text, "\n");
			
			$permalink = "coucou";
			
			$query = array( 'post_status' => 'publish','numberposts' => -1 );

			$all_published_posts = get_posts($query);
		
			foreach ( $all_published_posts as $other_post ) {
			
			
				if(get_post_format( $other_post->ID )== 'image'){
			
			
					$relation =  get_field('linked_text', $other_post->ID );
				
					if( is_array($relation) && count($relation )>0){
			
						$lt= $relation [0];
			
						if($lt->ID == $post->ID){

							$permalink = get_post_permalink( $other_post->ID)."&part=text";	
							
							break;	

						}		
			
			
					}
			
				}
			

			
			}
		
		
		?>	
	
	
		<div id="conteneur">
			<figure id="illustration">
			</figure>
			

		<!-- post title -->
		<a href="<?php echo $permalink; ?>" title="<?php echo $first_line; ?>" class = "listed_painting_title"><?php echo $first_line; ?></a>
		<!-- /post title -->
		

		<!-- post details -->
		
		<?php if($titre_ouvrage != ""):?>
				<b>Titre de l'ouvrage :</b> <span><?php echo $titre_ouvrage;?></span>		<br>				
		<?php endif;?>
		
		<?php if($auteur != ""):?>
				<b>Auteur :</b> <span><?php echo $auteur;?></span>	<br>						
		<?php endif;?>
		
		<?php if($date  != ""):?>
				<b>Date :</b> <span><?php echo $date ;?></span>		<br>					
		<?php endif;?>

		<?php if($traducteur  != ""):?>
				<b>Traducteur :</b> <span><?php echo $traducteur ;?></span>		<br>					
		<?php endif;?>		


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
