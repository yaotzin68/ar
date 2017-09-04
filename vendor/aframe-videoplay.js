/* globals AFRAME */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME' +
        ' was available.');
}

/**
 * Hyper Link component for A-Frame.
 */
AFRAME.registerComponent('video-play', {
    schema: {
        default: ''
    },

    boundClickHandler: undefined,

    clickHandler: function hrefClickHandler() {
        console.log('play');
        var video = document.getElementById('video');
        video.play();
    },

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function() {
        this.boundClickHandler = this.clickHandler.bind(this);
        this.el.addEventListener('click', this.boundClickHandler);
    },

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function() {
        this.el.removeEventListener('click', this.boundClickHandler);
    }
});