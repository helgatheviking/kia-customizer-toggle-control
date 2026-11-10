# WordPress Customizer Toggle Control

A toggle control for the WordPress Customizer

![Animation. Three toggle inputs that are switched on and off.](https://user-images.githubusercontent.com/507025/136673379-d3801861-583c-4c05-8ddc-918ef3c6f77e.gif)

## Installation

```
composer require helgatheviking/kia-customizer-toggle-control
```

The class is autoloaded through Composer's classmap, so there is nothing to `require`. If your plugin or theme doesn't load Composer's autoloader, `require` `vendor/helgatheviking/kia-customizer-toggle-control/class-kia-customizer-toggle-control.php` inside your `customize_register` callback.

## Adding the control

```php
/**
 * Add the control to the Customizer.
 *
 * @param WP_Customize_Manager $wp_customize
 */
function kia_customizer( $wp_customize ) {

    // Register the control type that we're using as a JavaScript control.
    $wp_customize->register_control_type( 'KIA_Customizer_Toggle_Control' );

    $wp_customize->add_setting(
        'my_setting',
        array(
            'default'              => false,
            'type'                 => 'option',
            'capability'           => 'edit_themes',
            'transport'            => 'postMessage',
            'sanitize_callback'    => array( 'KIA_Customizer_Toggle_Control', 'sanitize' ),
            'sanitize_js_callback' => array( 'KIA_Customizer_Toggle_Control', 'sanitize' ),
        )
    );

    $wp_customize->add_control(
        new KIA_Customizer_Toggle_Control(
            $wp_customize,
            'my_setting',
            array(
                'label'       => __( 'Turn on setting', 'your-textdomain' ),
                'description' => __( 'An example toggle', 'your-textdomain' ),
                'section'     => 'my_section',
                'settings'    => 'my_setting',
            )
        )
    );
}
add_action( 'customize_register', 'kia_customizer' );
```

## Bundling it in a plugin or theme

The control type, script and style handle, CSS scope and JS constructor all come from the PHP class name: `KIA_Customizer_Toggle_Control` uses the type `kia-customizer-toggle-control`. If you prefix the class, your copy gets its own of each, so another plugin bundling a different version can't replace yours.

With [Strauss](https://github.com/BrianHenryIE/strauss) and a `classmap_prefix` of `My_Plugin_`, the class becomes `My_Plugin_KIA_Customizer_Toggle_Control` with the type `my-plugin-kia-customizer-toggle-control`. Use the prefixed class name in `register_control_type()`, `new …()` and the sanitize callbacks.

The JS and CSS URLs are worked out from the file path, so the package has to live inside the WordPress install (under `ABSPATH`).

## Upgrading from 1.x

* The package is a Composer `library` and no longer needs `composer/installers` or `installer-paths`. Remove the `installer-paths` entry and the `require_once` for the class.
* The control type is now `kia-customizer-toggle-control` (or your prefixed equivalent) instead of `kia-toggle`. Drop any `'type' => 'kia-toggle'` argument: it's ignored. If you styled or scripted the control by its old type, ex: `.customize-control-kia-toggle`, update those selectors.
* The script and style handle is the control type, and the styles are printed inline.

## Credits

Huge props to Rich Tabor's [Login Designer](https://github.com/thatplugincompany/login-designer) and Per Soderlind's [Customizer Toggle Control](https://github.com/soderlind/class-customizer-toggle-control)
