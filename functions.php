<?php
/*
 *  Author: Todd Motto | @toddmotto
 *  URL: html5blank.com | @html5blank
 *  Custom functions, support, custom post types and more.
 */

/*------------------------------------*\
	External Modules/Files
\*------------------------------------*/

// Load any external files you have here

/*------------------------------------*\
	Theme Support
\*------------------------------------*/


@ini_set( 'upload_max_size' , '10M' );
@ini_set( 'post_max_size', '10M');
@ini_set( 'max_execution_time', '300' );


if (!isset($content_width))
{
    $content_width = 900;
}

if (function_exists('add_theme_support'))
{
    // Add Menu Support
    add_theme_support('menus');

    // Add Thumbnail Theme Support
    add_theme_support('post-thumbnails');
    add_image_size('large', 700, '', true); // Large Thumbnail
    add_image_size('medium', 250, '', true); // Medium Thumbnail
    add_image_size('small', 120, '', true); // Small Thumbnail
    add_image_size('custom-size', 700, 200, true); // Custom Thumbnail Size call using the_post_thumbnail('custom-size');

    // Add Support for Custom Backgrounds - Uncomment below if you're going to use
    /*add_theme_support('custom-background', array(
	'default-color' => 'FFF',
	'default-image' => get_template_directory_uri() . '/img/bg.jpg'
    ));*/

    // Add Support for Custom Header - Uncomment below if you're going to use
    /*add_theme_support('custom-header', array(
	'default-image'			=> get_template_directory_uri() . '/img/headers/default.jpg',
	'header-text'			=> false,
	'default-text-color'		=> '000',
	'width'				=> 1000,
	'height'			=> 198,
	'random-default'		=> false,
	'wp-head-callback'		=> $wphead_cb,
	'admin-head-callback'		=> $adminhead_cb,
	'admin-preview-callback'	=> $adminpreview_cb
    ));*/

    // Enables post and comment RSS feed links to head
    add_theme_support('automatic-feed-links');
    add_theme_support('post-formats', array('image','quote'));

    // Localisation Support
    load_theme_textdomain('html5blank', get_template_directory() . '/languages');
}

/*------------------------------------*\
	Functions
\*------------------------------------*/

// HTML5 Blank navigation
function html5blank_nav()
{
	wp_nav_menu(
	array(
		'theme_location'  => 'header-menu',
		'menu'            => '',
		'container'       => 'div',
		'container_class' => 'menu-{menu slug}-container',
		'container_id'    => '',
		'menu_class'      => 'menu',
		'menu_id'         => '',
		'echo'            => true,
		'fallback_cb'     => 'wp_page_menu',
		'before'          => '',
		'after'           => '',
		'link_before'     => '',
		'link_after'      => '',
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 0,
		'walker'          => ''
		)
	);
}

// Load HTML5 Blank scripts (header.php)
function html5blank_header_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {

    	wp_register_script('conditionizr', get_template_directory_uri() . '/js/lib/conditionizr-4.3.0.min.js', array(), '4.3.0'); // Conditionizr
        wp_enqueue_script('conditionizr'); 

        wp_register_script('modernizr', get_template_directory_uri() . '/js/lib/modernizr-2.7.1.min.js', array(), '2.7.1'); // Modernizr
        wp_enqueue_script('modernizr'); 
        
        wp_register_script('jquery', get_template_directory_uri() . '/js/lib/jquery.js', array()); // jquery
        wp_enqueue_script('jquery'); 
        
        wp_register_script('jquery-ui', get_template_directory_uri() . '/js/lib/jquery-ui.min.js', array()); // jquery
        wp_enqueue_script('jquery-ui'); 
		
        wp_register_script('mcustomscrollbar', get_template_directory_uri() . '/js/lib/jquery.mCustomScrollbar.concat.min.js', array('jquery')); // Custom scripts
        wp_enqueue_script('mcustomscrollbar');

        wp_register_script('loupe', get_template_directory_uri() . '/js/lib/Loupe.js', array('jquery')); // jquery
        wp_enqueue_script('loupe');
        
        wp_register_script('AAS', get_template_directory_uri() . '/js/lib/areasAutoScaler.js', array('jquery')); // jquery
        wp_enqueue_script('AAS');
        
        wp_register_script('imagesloaded.min', get_template_directory_uri() . '/js/lib/imagesloaded.min.js', array('jquery')); // jquery
        wp_enqueue_script('imagesloaded.min');
        
        wp_register_script('lamusee', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0.0'); // Custom scripts
        wp_enqueue_script('lamusee');
		
        
        wp_register_script('areasEditor', get_template_directory_uri() . '/js/lib/areasEditor.js', array('jquery'), '1.0.0'); // Conditional script(s)
        wp_enqueue_script('areasEditor'); // Enqueue it!
		
		wp_localize_script('areasEditor', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
                
    }
}

// Load HTML5 Blank conditional scripts
function html5blank_conditional_scripts()
{
    if (is_page('pagenamehere')) {
        wp_register_script('scriptname', get_template_directory_uri() . '/js/scriptname.js', array('jquery'), '1.0.0'); // Conditional script(s)
        wp_enqueue_script('scriptname'); // Enqueue it!
    }

}

// Load HTML5 Blank styles
function html5blank_styles()
{
    wp_register_style('normalize', get_template_directory_uri() . '/normalize.css', array(), '1.0', 'all');
    wp_enqueue_style('normalize'); // Enqueue it!
	
    wp_register_style('scrollbar', get_template_directory_uri() . '/jquery.mCustomScrollbar.css', array(), '1.0', 'all');
    wp_enqueue_style('scrollbar'); // Enqueue it!

    wp_register_style('lamusee', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');
    wp_enqueue_style('lamusee'); // Enqueue it!
    
    wp_register_style('areasEditor', get_template_directory_uri() . '/areasEditor_style.css', array(), '1.0', 'all');
    wp_enqueue_style('areasEditor'); // Enqueue it!
    
    wp_register_style('jquery-ui', get_template_directory_uri() . '/jquery-ui.css', array(), '1.0', 'all');
    wp_enqueue_style('jquery-ui'); // Enqueue it!
    
    
    
}

// Register HTML5 Blank Navigation
function register_html5_menu()
{
    register_nav_menus(array( // Using array to specify more menus if needed
        'header-menu' => __('Header Menu', 'html5blank'), // Main Navigation
        'sidebar-menu' => __('Sidebar Menu', 'html5blank'), // Sidebar Navigation
        'extra-menu' => __('Extra Menu', 'html5blank') // Extra Navigation if needed (duplicate as many as you need!)
    ));
}

// Remove the <div> surrounding the dynamic navigation to cleanup markup
function my_wp_nav_menu_args($args = '')
{
    $args['container'] = false;
    return $args;
}

// Remove Injected classes, ID's and Page ID's from Navigation <li> items
function my_css_attributes_filter($var)
{
    return is_array($var) ? array() : '';
}

// Remove invalid rel attribute values in the categorylist
function remove_category_rel_from_category_list($thelist)
{
    return str_replace('rel="category tag"', 'rel="tag"', $thelist);
}

// Add page slug to body class, love this - Credit: Starkers Wordpress Theme
function add_slug_to_body_class($classes)
{
    global $post;
    
    if (is_home()) {
        $key = array_search('blog', $classes);
        if ($key > -1) {
            unset($classes[$key]);
        }
    } elseif (is_page()) {
        $classes[] = sanitize_html_class($post->post_name);
    } elseif (is_singular()) {
        $classes[] = sanitize_html_class($post->post_name);
    }

    return $classes;
}

// If Dynamic Sidebar Exists
if (function_exists('register_sidebar'))
{
    // Define Sidebar Widget Area 1
    register_sidebar(array(
        'name' => __('Widget Area 1', 'html5blank'),
        'description' => __('Description for this widget-area...', 'html5blank'),
        'id' => 'widget-area-1',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));

    // Define Sidebar Widget Area 2
    register_sidebar(array(
        'name' => __('Widget Area 2', 'html5blank'),
        'description' => __('Description for this widget-area...', 'html5blank'),
        'id' => 'widget-area-2',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));
}

// Remove wp_head() injected Recent Comment styles
function my_remove_recent_comments_style()
{
    global $wp_widget_factory;
    remove_action('wp_head', array(
        $wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
        'recent_comments_style'
    ));
}

// Pagination for paged posts, Page 1, Page 2, Page 3, with Next and Previous Links, No plugin
function html5wp_pagination()
{
    global $wp_query;
    $big = 999999999;
    echo paginate_links(array(
        'base' => str_replace($big, '%#%', get_pagenum_link($big)),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $wp_query->max_num_pages
    ));
}

// Custom Excerpts
function html5wp_index($length) // Create 20 Word Callback for Index page Excerpts, call using html5wp_excerpt('html5wp_index');
{
    return 20;
}

// Create 40 Word Callback for Custom Post Excerpts, call using html5wp_excerpt('html5wp_custom_post');
function html5wp_custom_post($length)
{
    return 40;
}

// Create the Custom Excerpts callback
function html5wp_excerpt($length_callback = '', $more_callback = '')
{
    global $post;
    if (function_exists($length_callback)) {
        add_filter('excerpt_length', $length_callback);
    }
    if (function_exists($more_callback)) {
        add_filter('excerpt_more', $more_callback);
    }
    $output = get_the_excerpt();
    $output = apply_filters('wptexturize', $output);
    $output = apply_filters('convert_chars', $output);
    $output = '<p>' . $output . '</p>';
    echo $output;
}

// Custom View Article link to Post
function html5_blank_view_article($more)
{
    global $post;
    return '... <a class="view-article" href="' . get_permalink($post->ID) . '">' . __('View Article', 'html5blank') . '</a>';
}

// Remove Admin bar
function remove_admin_bar()
{
    return false;
}

// Remove 'text/css' from our enqueued stylesheet
function html5_style_remove($tag)
{
    return preg_replace('~\s+type=["\'][^"\']++["\']~', '', $tag);
}

// Remove thumbnail width and height dimensions that prevent fluid images in the_thumbnail
function remove_thumbnail_dimensions( $html )
{
    $html = preg_replace('/(width|height)=\"\d*\"\s/', "", $html);
    return $html;
}

// Custom Gravatar in Settings > Discussion
function html5blankgravatar ($avatar_defaults)
{
    $myavatar = get_template_directory_uri() . '/img/gravatar.jpg';
    $avatar_defaults[$myavatar] = "Custom Gravatar";
    return $avatar_defaults;
}

// Threaded Comments
function enable_threaded_comments()
{
    if (!is_admin()) {
        if (is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
            wp_enqueue_script('comment-reply');
        }
    }
}

// Custom Comments Callback
function html5blankcomments($comment, $args, $depth)
{
	$GLOBALS['comment'] = $comment;
	extract($args, EXTR_SKIP);

	if ( 'div' == $args['style'] ) {
		$tag = 'div';
		$add_below = 'comment';
	} else {
		$tag = 'li';
		$add_below = 'div-comment';
	}
?>
    <!-- heads up: starting < for the html tag (li or div) in the next line: -->
    <<?php echo $tag ?> <?php comment_class(empty( $args['has_children'] ) ? '' : 'parent') ?> id="comment-<?php comment_ID() ?>">
	<?php if ( 'div' != $args['style'] ) : ?>
	<div id="div-comment-<?php comment_ID() ?>" class="comment-body">
	<?php endif; ?>
	<div class="comment-author vcard">
	<?php if ($args['avatar_size'] != 0) echo get_avatar( $comment, $args['180'] ); ?>
	<?php printf(__('<cite class="fn">%s</cite> <span class="says">says:</span>'), get_comment_author_link()) ?>
	</div>
<?php if ($comment->comment_approved == '0') : ?>
	<em class="comment-awaiting-moderation"><?php _e('Your comment is awaiting moderation.') ?></em>
	<br />
<?php endif; ?>

	<div class="comment-meta commentmetadata"><a href="<?php echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ) ?>">
		<?php
			printf( __('%1$s at %2$s'), get_comment_date(),  get_comment_time()) ?></a><?php edit_comment_link(__('(Edit)'),'  ','' );
		?>
	</div>

	<?php comment_text() ?>

	<div class="reply">
	<?php comment_reply_link(array_merge( $args, array('add_below' => $add_below, 'depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
	</div>
	<?php if ( 'div' != $args['style'] ) : ?>
	</div>
	<?php endif; ?>
<?php }

/*------------------------------------*\
	Actions + Filters + ShortCodes
\*------------------------------------*/

// Add Actions
add_action('init', 'html5blank_header_scripts'); // Add Custom Scripts to wp_head
add_action('wp_print_scripts', 'html5blank_conditional_scripts'); // Add Conditional Page Scripts
add_action('get_header', 'enable_threaded_comments'); // Enable Threaded Comments
add_action('wp_enqueue_scripts', 'html5blank_styles'); // Add Theme Stylesheet
add_action('init', 'register_html5_menu'); // Add HTML5 Blank Menu
add_action('widgets_init', 'my_remove_recent_comments_style'); // Remove inline Recent Comment Styles from wp_head()
add_action('init', 'html5wp_pagination'); // Add our HTML5 Pagination

// Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'index_rel_link'); // Index link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current post.
remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

// Add Filters
add_filter('avatar_defaults', 'html5blankgravatar'); // Custom Gravatar in Settings > Discussion
add_filter('body_class', 'add_slug_to_body_class'); // Add slug to body class (Starkers build)
add_filter('widget_text', 'do_shortcode'); // Allow shortcodes in Dynamic Sidebar
add_filter('widget_text', 'shortcode_unautop'); // Remove <p> tags in Dynamic Sidebars (better!)
add_filter('wp_nav_menu_args', 'my_wp_nav_menu_args'); // Remove surrounding <div> from WP Navigation
// add_filter('nav_menu_css_class', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> injected classes (Commented out by default)
// add_filter('nav_menu_item_id', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> injected ID (Commented out by default)
// add_filter('page_css_class', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> Page ID's (Commented out by default)
add_filter('the_category', 'remove_category_rel_from_category_list'); // Remove invalid rel attribute
add_filter('the_excerpt', 'shortcode_unautop'); // Remove auto <p> tags in Excerpt (Manual Excerpts only)
add_filter('the_excerpt', 'do_shortcode'); // Allows Shortcodes to be executed in Excerpt (Manual Excerpts only)
add_filter('excerpt_more', 'html5_blank_view_article'); // Add 'View Article' button instead of [...] for Excerpts
add_filter('show_admin_bar', 'remove_admin_bar'); // Remove Admin bar
add_filter('style_loader_tag', 'html5_style_remove'); // Remove 'text/css' from enqueued stylesheet
add_filter('post_thumbnail_html', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to thumbnails
add_filter('image_send_to_editor', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to post images

// Remove Filters
remove_filter('the_excerpt', 'wpautop'); // Remove <p> tags from Excerpt altogether

// Shortcodes
add_shortcode('html5_shortcode_demo', 'html5_shortcode_demo'); // You can place [html5_shortcode_demo] in Pages, Posts now.
add_shortcode('html5_shortcode_demo_2', 'html5_shortcode_demo_2'); // Place [html5_shortcode_demo_2] in Pages, Posts now.

// Shortcodes above would be nested like this -
// [html5_shortcode_demo] [html5_shortcode_demo_2] Here's the page title! [/html5_shortcode_demo_2] [/html5_shortcode_demo]

/*------------------------------------*\
	Custom Post Types
\*------------------------------------*/

// Create 1 Custom Post type for a Demo, called HTML5-Blank


/*------------------------------------*\
	ShortCode Functions
\*------------------------------------*/

// Shortcode Demo with Nested Capability
function html5_shortcode_demo($atts, $content = null)
{
    return '<div class="shortcode-demo">' . do_shortcode($content) . '</div>'; // do_shortcode allows for nested Shortcodes
}

// Shortcode Demo with simple <h2> tag
function html5_shortcode_demo_2($atts, $content = null) // Demo Heading H2 shortcode, allows for nesting within above element. Fully expandable.
{
    return '<h2>' . $content . '</h2>';
}




/******************************************LAMUSEE*****************************************/


add_query_arg( 'part');



if(!function_exists('clean_area_field')){
	
	function clean_area_field($bad_html){

		$js_removed= preg_replace('#<script(.*?)>(.*?)</script>#is', '', $bad_html);	
		
		return $js_removed;
		
	
	}
	
	
}

if(!function_exists('remember_painting')){
	
	function remember_painting(){
		
		if (is_single()){
			
			global $post;
			
			if (session_status() == PHP_SESSION_NONE) {
				

				
			}		
			
			if(!isset($_SESSION['last_paintings'])){
				
				$last_paintings = array();
				
				array_unshift($last_paintings,$post->ID);
				
				$_SESSION['last_paintings'] = $last_paintings;
				
				
				
			}else{
				
				$last_paintings = $_SESSION['last_paintings'];
				
				if(count($last_paintings)>8){
					
					array_pop($last_paintings);
					
				}
				
				array_unshift($last_paintings,$post->ID);
				
				$_SESSION['last_paintings'] = $last_paintings;
				
				
			}
			
			
		}
		
	}
	
	
}

if(!function_exists('remember_shape')){

	function remember_shape(){

		history_list();

	}


}

if(!function_exists('zoom_link')){

	function zoom_link($text){

		if(isset($text)){

			echo '<div id="txt">'."\n";
			echo $text."\n";
			echo '</div>';

		}

	}

}

if(!function_exists('has_text')){

	function has_text(){
		
		global $post ;
			
			$texts =  get_field('linked_text', $post->ID );
			
			$text = $texts[0];
				
			if ($text && $text != "" && $text != null ){
				
				
				if(get_post_format( $text->ID ) == 'quote' ){
				
					return true;
				
				}
				
			}
		
		return false;
		
	}

}

if(!function_exists('has_details')){

	function has_details(){
		
		global $post ;
				
			$details =  get_field('image_highdef', $post->ID );
				
			if ($details  && $details  != "" && $details  != null ){
				
				return true;
				
			}

		return false;
		
	}

}

if(!function_exists('fill_areas_href')){

	function fill_areas_href($str,$shape,$url){

		if(isset($str) && isset ($shape)&& isset($url)){
			
			if($shape != null){
	
				$pattern = '/href="#'.$shape.'"|href="<\?php echo generate_random_painting_url\(\''.$shape.'\'\);\?>"/';
	
				$replace = 'href="'.$url.'"';
					
				$areas = preg_replace($pattern,$replace,$str);
				
				return $areas;
			
			}

		}

		return false;

	}

}


if(!function_exists('remove_visited')){

	function remove_visited($arr){
		
		$visited_paintings = get_visited_paintings();
		
		if($visited_paintings ){
			
			if(count($arr)>1){
				
				for ($j = 0 ; $j < count($arr); $j++){
					
					foreach ($arr as $key => $p){
						
						if(array_key_exists ($j,$visited_paintings)){
							
							if($p == $visited_paintings[$j]){
									
									unset($arr[$key]);
									array_values($arr);
								
							}	
						
						}
					}
				}
			}		
		}
		return $arr;
	}
}

if(!function_exists('choose_painting_in')){

	function choose_painting_in($strclass){
		
		if(isset($strclass)){
			
			global $post;

			foreach ($strclass as $key => $list){

			
			if(count($list)>1){
				
			$current_painting_index = array_search ($post->ID,$list);
					
				//	$list = remove_visited($list);

					//$random_index = array_rand( $list);

					//$random_elem =  $list[$random_index];
					
					$next_index = $current_painting_index+1;

					if($next_index > count($list)-1){
					
						$next_index = 0;						
											
					}
					
					if(array_key_exists ($next_index,$list)){
						
						$strclass->$key = $list[$next_index];
						
					}

				}else if(count($list)==1){
						
					$strclass->$key  = $list[0];
						
				}else{
						
					unset($strclass->$key);
						
				}

			}

		}

		return false;

	}

}

if(!function_exists('choose_random_elem_in')){

	function choose_random_elem_in($strclass){
		
		if(isset($strclass)){
				
			foreach ($strclass as $key => $list){
				
				if(count($list)>1){
				
					$random_index = array_rand( $list);
				
					$random_elem =  $list[$random_index];
				
					$strclass->$key  = $random_elem;
				
				}else if(count($list)==1){
					
					$strclass->$key  = $list[0];
					
				}else{
					
					unset($strclass->$key);
					
				}
				
			}

		}
		return false;

	}

}

if(!function_exists('collect_matching_paintings')){
	
	function collect_matching_paintings(){
		
		global $post;
		
		$post_areas_str = get_field('areas',$post->ID);
		
		$post_shapes = collect_shapes($post_areas_str);
		
		$painting_url = false;

		$id_grid = prepare_shape_grid($post_shapes);
		
		$matching_posts_ids = array();
		
		$query = array( 'post_status' => 'publish','numberposts' => -1 );
		
		$all_published_posts = get_posts($query);
		
		foreach ( $all_published_posts as $other_post ) {
			
			//if($other_post->ID != $post->ID){
				
				$recently_visited = false;
				
				$other_post_areas_str = get_post_meta($other_post->ID, 'areas', true);
				
				$other_post_shapes = collect_shapes($other_post_areas_str);
				
				$other_post_grid = prepare_shape_grid($other_post_shapes);
				
				foreach ( $id_grid as $shape_name => $ids){

					if(isset($other_post_grid->$shape_name)){

						array_push($id_grid->$shape_name,$other_post->ID);
						
					}
	
				}
			
			//}
			
		}
		
		return $id_grid;
		
	}
	
}


if(!function_exists('get_visited_paintings')){
	
	function get_visited_paintings(){
		
		
				echo ("__:");

		if (session_status() == PHP_SESSION_NONE) {
		
			/*session_start();
			
			$_SESSION['last_paintings'] = array();*/
		
		}
			
		if(isset($_SESSION['last_paintings'])){
			
			$LVP = $_SESSION['last_paintings'];
			
			return $LVP;
			
		}else{
			
			return false;
		}
		
	}
	
}

if(!function_exists('history_list')){
	
	function history_list(){
		
		if(isset($_SESSION['couleur'])){
			
		echo $_SESSION['couleur'];
			
		}
		 
		
	}
	
}
	
if(!function_exists('the_carte')){

	function the_carte($post){
		
		if(get_post_format( $post->ID )== 'image'){
			
			$artiste = get_field('artiste',$post->ID);
			$titre_du_tableau = get_field('titre_du_tableau',$post->ID);
			$technique = get_field('technique',$post->ID);
			$date = get_field('date',$post->ID);
			$dimensions = get_field('dimensions',$post->ID);
			$lieu_de_conservation = get_field('lieu_de_conservation',$post->ID);
	
			include(locate_template('template_carte.php'));
		
		}

	}

}

if(!function_exists('get_shapes')){

	function get_shapes($post){
		
		$post_areas_str = get_field('areas',$post->ID);
		$post_shapes = collect_shapes($post_areas_str);
		
		return $post_shapes;
		
	}
	
}

if(!function_exists('the_shapes')){

	function the_shapes(){

		global $post;
		
		$shapes = get_shapes($post);
		
		echo '<ul class = "painting_shape_list">'."\n";
		
		foreach ($shapes as $shape){
			
			echo "<li class = 'listed_shape'>".$shape.'</li>'."\n";
			
		}
		
		echo'</ul>'."\n";

	}

}

if(!function_exists('collect_shapes')){
	
	function collect_shapes($str){
		
		if(isset($str)){
			
			$shapes = array();

			$pattern = '/href="#(.*?)"/';
			
			preg_match_all($pattern,$str,$shapes, PREG_PATTERN_ORDER);
						
			return $shapes[1];
				
		}
		
		return false;

	}
	
}

if(!function_exists('prepare_shape_grid')){

	function prepare_shape_grid($shapes){

		if(isset($shapes)){
				
			$grid = new stdClass();
					
			foreach($shapes as $shape){
				
				if($shape != null && $shape != ""){
				
					$key = str_replace(' ', '_',$shape );
				
					$grid->$key  = array();
				
				}
				
			}
			
			return $grid;

		}

		return false;

	}

}

if(!function_exists('get_shape_list')){
	
/* Parcours tout les tableaux du site et inspecte leur shapes pour ensuite ajouter l'index du tableau(post_ID) dans les différentes lignes de l'array shape_list.
voir rajouter une nouvelle ligne si le tableau contient une shape inexistante dans le tableau. 

 return array([name(string)][paintings(array)])
 
 Exemple : [0]["ange"][8,20,11]
 			  [1]["casque"][12,154,20,9]*/	

	function get_shape_list(){
		
		$shape_list = array();

		$query = array( 'post_status' => 'publish','numberposts' => -1 );

		$all_published_posts = get_posts($query);
		
		foreach ( $all_published_posts as $post ) {
			
			$post_areas_str = get_field('areas',$post->ID);
			
			$post_shapes = collect_shapes($post_areas_str);
			
			$added_shapes = array();
			
			$treated_shapes = array();
			
			foreach ( $post_shapes as  $shape ) {
				
				$match1 = 0;
				
				if(count($shape_list)>0){
					
					foreach ( $shape_list as $key => $from_list ) {
						
						if($shape == $from_list['name'] && $shape != "" && !isset($treated_shapes[$shape]) ){
							
							array_push($shape_list[$key]['paintings'],$post->ID);
							
							$match1++;
							
							$treated_shapes[$shape] = true;

						}
				
					}
				
				}
				
				if($match1 == 0 && $shape != "" && !isset($treated_shapes[$shape])){
					
					$row = array();
					
					$row['name']= $shape;
					
					$row['paintings'] = array();
						
					array_push($row['paintings'],$post->ID);
						
					array_push($added_shapes,$row);
					
					$treated_shapes[$shape] = true;
					
				}
				
			}
				
			$merged_shape_list = array_merge($shape_list,$added_shapes);
			
			$shape_list = $merged_shape_list ;
				
		}
		
		return $shape_list;

	}

}


class Shape{


	private $shape_ID;
	private $shape_name;
	private $shape_nice_name;
	private $shape_paintings_list;


	public function __construct($name,$nice_name,$paintings_list) { 
	
		$this->shape_name = $name;
		$this->shape_nice_name = $nice_name;
		$this->shape_paintings_list = $paintings_list;
	
	}
	
	public function add_painting($p){
	
			
		
	}
	
	public function getName (){
	
		return $this->shape_name;
	
	}	
	
	public function setName ($n){
	
		$this->shape_name = $n;	
	
	}

	public function getNiceName (){
	
		return $this->shape_nice_name;
	
	}
	
	public function setNiceName ($nn){
	
		$this->shape_nice_name = $nn;	
	
	}

}


class Area{
	
	private $area_shape_name;
	private $area_shape_type;
	private $area_nice_name;
	private $area_coords;
	private $area_painting;
	private $area_id;

	public function __construct($sn,$st,$nn,$c,$p,$i) { 
	
			$this->area_shape_name = $sn;
			$this->area_shape_type = $st;
			$this->area_nice_name = $nn;
			$this->area_coords = $c;
			$this->area_painting = $p;	
			$this->area_id = $i;
	
	}
	
	
	public function getShapeName(){ return $this->area_shape_name;}
	public function setShapeName($sn){ $this->area_shape_name = $sn;}
		
	public function getShapeType(){ return $this->area_shape_type;}
	public function setShapeType($st){ $this->area_shape_type = $st;}
	
	public function getCoords(){ return $this->area_coords;}
	public function setCoords($c){ $this->area_coords = $c;}
	
	public function getNiceName(){ return $this->area_nice_name;}
	public function setNiceName($nn){ $this->area_nice_name = $nn;}
	
	
	public function getPainting(){ return $this->area_painting;}
	public function setPainting($p){ $this->area_painting = $p;}
	
	
	public function getID(){ return $this->area_id;}
	public function setID($i){ $this->area_id = $i;}
	
	public function areaToHTML($_link){
		
		$link = $_link != undefined && $_link != null ? $_link : '#'.$this->area_shape_name;
	
		$HTML	=  '<area shape="'.$this->area_shape_type.'" coords="'.$this->area_coords.'" href="'.$link.'" alt="'.$this->area_shape_name.'" title = "'.$this->area_nice_name.'"  areaID ="'.$this->area_id.'">'."\n";
		return $HTML;
		
	}

}


class Lamusee{

	public $shapes;
	public $areas;
	public $paintings;
	public $texts;
	public $artists;
	
	public function __construct() { 
	
		$this->shapes = array();
		$this->areas = array();
		$this->paintings = array();
		$this->texts = array();
		$this->artists = array();	

	
	}
	
	
	public function init(){
		
			
		$this->parse_database();
		
		
	}
	
	private function parse_database(){
		
		$this->shapes = array();
		$this->areas = array();
		
		global $wpdb;
		
		foreach( $wpdb->get_results("SELECT * FROM wp_lamusee_shapes") as $key => $row) {

			$nshape = new Shape($row->shape_name,$row->shape_nice_name,$row->shape_paintings_list);
			
			array_push($this->shapes,$nshape);			

		}
		
		foreach( $wpdb->get_results("SELECT * FROM wp_lamusee_areas") as $key => $row) {
			
							
			$narea = new Area($row->area_shape_name,$row->area_shape_type,$row->area_nice_name,$row->area_coords,$row->area_painting,$row->area_id);
			
			array_push($this->areas,$narea);
			
		}
		
		
	}
	
	public function parse_painting_areas_with_random_links($post_id){
		
		$html = "";
	
		foreach ($this->areas as $area){
			
			if($area->getPainting() == $post_id){
				
				$shape = $this->getShapeByName($area->getShapeName());

				$area_tag = $area->areaToHTML("blabla");
				
				$html = $html.$area_tag;
			
			}
				
		
		}	
		
		echo $html;
		
		return $html;
	
	
	}

	public function getShapeByName($n){
		
		foreach ($this->shapes as $shape){
		
			if($shape->getName() == $n){

				return $shape;			
			
			}	
			
		}
		
		return false;
			
	
	}
	
	public function getShapeByID($id){
	
		foreach ($this->shapes as $shape){
		
			if($shape->getID() == $id){

				return $shape;			
			
			}	
			
		}
		
		return false;	
	}

}

if(!function_exists('the_illustration')){
	
	function the_illustration($otherpost=null){
		
		global $LAMUSEE;

		$LAMUSEE = new Lamusee();

		$LAMUSEE->init();


		
		
		remember_painting();
		
		remember_shape();
		
		if($otherpost!=null){
				
			$post = $otherpost;
				
		}else{
				
			global $post;
				
		}

		$post_url = get_permalink( $post->ID);
		
		$image = get_field('lowres_image',$post->ID);
				
		$area_field = get_field('areas',$post->ID);
			
		$areas = clean_area_field($area_field);
			
		$image_highres = get_field('image_highres',$post->ID);
		
		$modifed_areas = $areas;
		
		$map_scale = get_field('map_scale',$post->ID);
		
		$map_offset_x = get_field('map_offset_x',$post->ID);
		
		$map_offset_y = get_field('map_offset_y',$post->ID);
		
		if($map_scale != ""){
			
			$map_scale = floatval($map_scale);
			
			if($map_scale == 0)$map_scale = 1;
			
		}else{
			
			$map_scale = 1;
			
			
		}	

		if($map_offset_x != ""){
				
			$map_offset_x  = floatval($map_offset_x);
				
		}else{
				
			$map_offset_x = 0;
				
				
		}
		
		if($map_offset_y != ""){
				
			$map_offset_y  = floatval($map_offset_y);
				
		}else{
				
			$map_offset_y = 0;
				
				
		}

		$text_link = add_query_arg( array( 'part' => "text" ));		
		
		$details_link = add_query_arg( array( 'part' => "details" ));
		
		$areas_link = add_query_arg( array( 'part' => "areas" ));
		
		
		$paintings_list = collect_matching_paintings();
		
		choose_painting_in($paintings_list);

		foreach ($paintings_list as $shape_name => $painting_id){
			
			$url = get_permalink($painting_id);
				
			$modifed_areas = fill_areas_href($modifed_areas,$shape_name,$url);

		}
		
		//$modifed_areas = $LAMUSEE->parse_painting_areas_with_random_links($post->ID);
		
		include(locate_template('template_illustration.php'));
		
		
	}
	
}



if(!function_exists('the_text')){
	
	function the_text($otherpost=null){
		
		if($otherpost!=null){
			
			$post = $otherpost;
			
		}else{
			
			global $post;
			
		}
		
		$image = get_field('lowres_image',$post->ID);
		
		$relation = get_field('linked_text',$post->ID);
		
		$linked_text  = $relation[0];
		
		if(get_post_format( $linked_text->ID )){
			
			$text = $linked_text->post_content;
			
			$history_link = get_permalink( $post->ID);
				
			include(locate_template('template_text.php'));	
				
		}else{
			
			include(locate_template('missing_text.php'));
			
		}

		


	}
	
}

if(!function_exists('the_details')){

	function the_details(){

		global $post;

		if(get_post_format( $post->ID )== 'image'){
				
			$image = get_field('lowres_image',$post->ID);

			$image_highdef = get_field('image_highdef',$post->ID);
				
			$history_link = get_permalink( $post->ID);

			include(locate_template('template_details.php'));

		}

	}

}

if(!function_exists('the_areas')){

	function the_areas($otherpost=null){

		if($otherpost!=null){

			$post = $otherpost;

		}else{

			global $post;

		}

		$post_url = get_permalink( $post->ID);

		$image = get_field('lowres_image',$post->ID);
			
		$area_field = get_field('areas',$post->ID);
			
		$areas = clean_area_field($area_field);

		$image_highres = get_field('image_highres',$post->ID);

		$map_scale = get_field('map_scale',$post->ID);

		$map_offset_x = get_field('map_offset_x',$post->ID);

		$map_offset_y = get_field('map_offset_y',$post->ID);

		if($map_scale != ""){
				
			$map_scale = floatval($map_scale);
				
			if($map_scale == 0)$map_scale = 1;
				
		}else{
				
			$map_scale = 1;
				
		}

		if($map_offset_x != ""){

			$map_offset_x  = floatval($map_offset_x);

		}else{

			$map_offset_x = 0;

		}

		if($map_offset_y != ""){

			$map_offset_y  = floatval($map_offset_y);

		}else{

			$map_offset_y = 0;


		}

		$text_link = add_query_arg( array( 'part' => "text" ));

		$details_link = add_query_arg( array( 'part' => "details" ));

		//remember_painting();

		remember_shape();

		include(locate_template('template_areas.php'));


	}

}


if(!function_exists('build_shapes_table')){
	
	
	function build_shapes_table(){

		global $wpdb;
  		global $table_name ;
  		
  		$table_name = $wpdb->prefix."lamusee_shapes";
 
		// on creer la table "wp_lamusee_shapes" qui renseigne sur le nom des shapes , l'index des tableaux(post_ID) où elles apparaissent et 
		/*
			shape_name                :nom de la shape 
			shape_nice-name           :nom affiché
			shape_creation_date       :date de creation de la shape
			shape_last_modification   :date de la dernière modification de la shape (ajout de tableau)
			shape_paintings_list      :liste des indexes des tableaux(post_ID) où la shape est présente
			shape_clicks				  :total des clicks sur la shape. 

			
		
		
		
		*/
		
		
		if($wpdb->get_var("show tables like '$table_name'") != $table_name) 
		{
			$sql = "CREATE TABLE " . $table_name . " (
			`id` mediumint(9) NOT NULL AUTO_INCREMENT,
			`shape_name` mediumtext NOT NULL,
			`shape_nice_name` mediumtext NOT NULL,
			`shape_creation_date` int NOT NULL,
			`shape_last_modification` int NOT NULL,
			`shape_paintings_list` mediumtext NOT NULL,
			`shape_clicks` mediumint(9) NOT NULL,
			UNIQUE KEY id (id)
			);";
 
			require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
			dbDelta($sql);	
			
			
			$shape_list = get_shape_list();
		
				if(count($shape_list)>0){
					
					foreach ( $shape_list as $key => $from_list ) {
						
						// on convertis la listes des tableaux associés à la shape en string de forme a,b,c,d
						
						$serialized_paintings_list = substr(implode(", ", $from_list['paintings']), 0);
						
						// on rempli la table wp_lamusee_shapes dans la base de donnée

						$wpdb->insert($table_name,
    	 						array(
          						'shape_name'=>$from_list['name'],
          						'shape_nice_name'=>$from_list['name'],
          						'shape_creation_date'=>time(),
          						'shape_last_modification'=>time(),
          						'shape_paintings_list'=> $serialized_paintings_list,
          						'shape_clicks'=>0
     							),
    	 						array( 
          						'%s',
          						'%s',
          						'%d',
          						'%d',
          						'%s',
          						'%d'
     							)
						);

					}
				
				}
				
			
		
		}
		

		
		
		
		
	}
	
	build_shapes_table();
		$results = $wpdb->get_results("SELECT * FROM wp_lamusee_shapes");
		print_r($results);
		

}

if(!function_exists('collect_areas')){
	
	function collect_areas($str){
		
		if(isset($str) && $str != ""){
			
			$areas = array();
			
			$dom= new DOMDocument();
			$dom->loadHTML($str);
			
	   	foreach($dom->getElementsByTagName('area') as $area_tag) {

       		 $areas[] = array(
       		 'shape_name' => substr($area_tag->getAttribute('href'), 1),
       		 'nice_name' => $area_tag->getAttribute('title'), 
       		 'shape_type' => $area_tag->getAttribute('shape'), 
       		 'coords' => $area_tag->getAttribute('coords')
       		 );
       		 
  		   } 
						
			return $areas;
				
		}
		
		return false;

	}
	
}

if(!function_exists('get_areas_list()')){
	
	function get_areas_list(){

		$areas_list = array();

		$query = array( 'post_status' => 'publish','numberposts' => -1 );

		$all_published_posts = get_posts($query);
		
		$global_count = 0;
		
		foreach ( $all_published_posts as $post ) {
			
			$post_areas_str = get_field('areas',$post->ID);
			
			$post_areas_list = collect_areas($post_areas_str);
			
			$local_count = 0;
			
			
			foreach ($post_areas_list as $area){
				
				$area_id = $area['shape_type'].$post->ID.'-'.$global_count.'-'.$local_count;				
								
				$narea = new Area($area['shape_name'],$area['shape_type'],$area['nice_name'],$area['coords'],$post->ID,$area_id);
				
				array_push($areas_list,$narea);
				
				$global_count++;
				$local_count++;
			
			}
		}
		
		return $areas_list;

	}	

	
}

if(!function_exists('build_areas_table')){
	
	
	function build_areas_table(){

		global $wpdb;
  		global $table_name ;
  		
  		$table_name = $wpdb->prefix."lamusee_areas";
 
		// on creer la table "wp_lamusee_areas" 
		/*
			area_shape                :shape associée
			area_points               :points
	
		
		
		*/
		
		
		if($wpdb->get_var("show tables like '$table_name'") != $table_name) 
		{
			$sql = "CREATE TABLE " . $table_name . " (
			`id` mediumint(9) NOT NULL AUTO_INCREMENT,
			`area_shape_name` mediumtext NOT NULL,
			`area_shape_type` mediumtext NOT NULL,
			`area_nice_name` mediumtext NOT NULL,
			`area_coords` mediumtext NOT NULL,
			`area_painting` int NOT NULL,
			`area_id` mediumtext NOT NULL,
			UNIQUE KEY id (id)
			);";
 
			require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
			dbDelta($sql);	
			
			$areas_list = get_areas_list();
			
			if(count($areas_list)>0){
				
				foreach ( $areas_list as $key => $area ) {	
			
						$wpdb->insert($table_name,
    	 						array(
          						'area_shape_name'=>$area->getShapeName(),
          						'area_shape_type'=>$area->getShapeType(),
          						'area_nice_name'=>$area->getNiceName(),
          						'area_coords'=>$area->getCoords(),
          						'area_painting'=>$area->getPainting(),
          						'area_id'=>$area->getID(),
     							),
    	 						array( 
          						'%s',
          						'%s',
          						'%s',
          						'%s',
          						'%s',
          						'%s'
     							)
						);					
			
				}
				
			}
		
		}
		

		
		
		
		$results = $wpdb->get_results("SELECT * FROM wp_lamusee_areas");
		print_r($results);
		
		
	}
	
	
	build_areas_table();
	


}

if(!function_exists('alphabetic_shape_list')){
	
	function alphabetic_shape_list(){
		
		$shape_list = get_shape_list();
		
		$alphabetic_list = array();
		
		$alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z","?"];
		
		foreach ( $alphabet as $letter ){
			
			$alphabetic_list[strtolower($letter)] = array();

			
		}
		
		
		usort($shape_list, 'compareByName');
		
		foreach ( $shape_list as $shape ){
		
			$shape_name = $shape['name'] ;
			

			$first_letter = mb_substr($shape_name, 0, 1, 'utf-8');
			

			if(array_key_exists ($first_letter,$alphabetic_list)){
				
				array_push($alphabetic_list[$first_letter],$shape_name);		
					
			}	
			
		}
		
		return $alphabetic_list;
	
		
	}
	
	
}


if(!function_exists('get_artist_list')){

	function get_artist_list(){
		
		$artist_list = array();

		$query = array( 'post_status' => 'publish','numberposts' => -1 );

		$all_published_posts = get_posts($query);
		
		
		
		
		foreach ( $all_published_posts as $post ) {
		
			if(get_post_format( $post->ID )== 'image'  && get_field('artiste',$post->ID) != '' && get_field('artiste',$post->ID) != undefined){
			
				$match = 0;
				
				$artist_field_value = get_field('artiste',$post->ID);
				
				if(count($artist_list)>0){
			
					foreach ($artist_list as $key => $listed_artist){
					
						if($artist_field_value == $artist_list[$key]['name']){
						
							if(in_array($post->ID,$artist_list[$key]['paintings'])==false){
							
								array_push($artist_list[$key]['paintings'],$post->ID);
							
							}
							
							
							$match++;
						
						}

					}
				
				}
				
				if($match == 0){
				
					$post_artist = array();
					$post_artist['name'] = $artist_field_value;
					$post_artist['paintings'] = array();
					array_push($post_artist['paintings'],$post->ID);
					array_push($artist_list,$post_artist);

				
				}
				
			}

				
		}
		

		
		return $artist_list;

	}

}

if(!function_exists('get_random_painting')){
	
	function get_random_painting(){
		
		$args = array(
				'post_type' => 'post',
				'post_status' => 'publish',
				'tax_query' => array( array(
						'taxonomy' => 'post_format',
						'field' => 'slug',
						'terms' => array('post-format-image'),
				) )
		);
		
		$all_published_paintings = get_posts($args);
		
		return $all_published_paintings[array_rand($all_published_paintings)];
		
	}

}

if(!function_exists('include_template')){
	
	function include_template($template_name){
		
		include_once('template_'.$template_name);
		
	}

}



function random_painting_link( $atts, $content = null ) {
	
	$rdp = get_random_painting();
	
	return '<a href = "'.get_permalink( $rdp->ID).'">' . $content . '</a>';
	
}


function filter_only_paintings($where = '') {
	
	$where .= " format >= 'image'";
	
	return $where;
	
	
}


add_shortcode( 'random_painting_link', 'random_painting_link' );



if(!function_exists('update_areas')){

add_action( 'wp_ajax_update_areas', 'update_areas' );
add_action( 'wp_ajax_nopriv_update_areas', 'update_areas' );

	function update_areas(){

		
		
		$post_id = "";
		$post_area= "";

		if(isset($_POST["post_id"]) && isset($_POST["post_areas"]) && isset($_POST["post_scale"]) && isset($_POST["post_offset_x"]) && isset($_POST["post_offset_y"])){
		
			$post_id = sanitize_text_field($_POST["post_id"]);
			$post_area = $_POST["post_areas"];
			$post_scale = $_POST["post_scale"];
			$post_offset_x = $_POST["post_offset_x"];
			$post_offset_y = $_POST["post_offset_y"];
		
			echo $post_area;
			
			echo $post_id;
			
			update_field('areas', $post_area, $post_id);
			update_field('map_scale', $post_scale, $post_id);
			update_field('map_offset_x', $post_offset_x, $post_id);
			update_field('map_offset_y', $post_offset_y, $post_id);
			//update_field('areas', $post_areas, $post_id);
			//update_field('field_55437acf2f99f', $post_areas, $post_id);
			
			echo '* AREAS UPDATED *';

		}else{
			
			echo '* UPDATING AREAS FAILED *';
		
		
		}

		
			
		die();
		
	}

}





?>
