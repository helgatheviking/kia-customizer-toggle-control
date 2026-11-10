/**
 * Toggle control.
 *
 * Stores the control's constructor on wp.customize.kiaToggleControl. The PHP class registers it
 * for its own control type straight after this file loads.
 *
 * @version 2.0.0
 */
( function( $, api ) {

	api.kiaToggleControl = api.Control.extend( {

		ready: function() {
			var control = this;

			this.container.on( 'change', 'input:checkbox', function() {
				control.setting.set( this.checked );
			} );
		}
	} );

} )( jQuery, wp.customize );
