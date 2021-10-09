# WordPress Customizer Toggle Control

A toggle control for the WordPress Customizer

![Animation. There is a numerical input next to a slider range. As the slider is moved the input number value changes to match.](https://user-images.githubusercontent.com/507025/136671232-6c925852-0fc0-4a71-bfe8-0b41d968cf60.gif)

## Installation

Add the following to your `composer.json` file and run `composer update`

```
"repositories": [
{
    "type": "git",
    "url": "https://github.com/helgatheviking/kia-customizer-toggle-control.git"
}
],
"require": {
"helgatheviking/kia-customizer-toggle-control": "dev-main"
},
"extra": {
"installer-paths": {
    "includes/{$name}": [
        "helgatheviking/kia-customizer-toggle-control"
    ]
}
```

## Adding the control

```php

/**
 * Add range slider to Customizer.
 *
 * @param  obj     $wp_customize
 */
function kia_customizer( $wp_customize ) {
    // Include the class
    require_once dirname( __FILE__ ) . '/includes/kia-customizer-toggle-control/class-kia-customizer-toggle-control.php';

    // Register the control types that we're using as JavaScript controls.
	$wp_customize->register_control_type( 'KIA_Customizer_Toggle_Control' );

    $wp_customize->add_setting(
        'my_setting',
        array(
            'default'              => false,
            'type'                 => 'option',
            'capability'           => 'edit_themes',
            'transport'            => 'postMessage',	
        )
    );

    $wp_customize->add_control(
        new KIA_Customizer_Range_Control(
            $wp_customize,
            'my_control',
            array(
                'type'        => 'kia-range',
                'label'       => __( 'Turn on setting', 'your-textomain' ),
                'description' => __( 'An example toggle', 'your-textdomain' ),
                'section'  => 'my_section',
	            'settings' => 'my_setting',
            )
        )
    );

}
add_action( 'customize_register', 'kia_customizer' );
```

## Credits

Huge props to Rich Tabor's [Login Designer](https://github.com/thatplugincompany/login-designer) and Per Soderlind's [Customizer Toggle Control](https://github.com/soderlind/class-customizer-toggle-control)