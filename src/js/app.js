(function ($, window) {

	'use strict';

	var app = {

		/**
		 * Debug mode
		 * @type {Boolean}
		 */
		DEBUG: true,

		debug: function () {
			if (app.DEBUG) {
				return console.log(arguments);
			}
			return;
		},

		/**
		 * Boîte à outils
		 * regoupant des fonctions utiles
		 * @type {Object}
		 */
		utils: {

			/**
			 * Liste des breakpoints
			 * @type {Object}
			 */
			breakpoints: {
				mobile: 480,
				tabletSmall: 768,
				tabletLarge: 1024
			},

			/**
			 * Detecte si on est en mobile
			 * @return true : si c'est le cas
			 * @return false : si ce n'est pas le cas
			 */
			isMobile: function () {
				if ($(window).width() <= this.breakpoints.mobile) {
					return true;
				} else {
					return false;
				}
			},

			/**
			 * Detecte si on est en mobile large
			 * @return true : si c'est le cas
			 * @return false : si ce n'est pas le cas
			 */
			isMobileLarge: function () {
				if ($(window).width() <= this.breakpoints.tabletSmall) {
					return true;
				} else {
					return false;
				}
			},

			/**
			 * Detecte si on est en tablet
			 * @return true : si c'est le cas
			 * @return false : si ce n'est pas le cas
			 */
			isTablet: function () {
				if ($(window).width() < this.breakpoints.tabletLarge) {
					return true;
				} else {
					return false;
				}
			}

		},

		/**
		 * Initialisation des tous les objets
		 * une fois que le DOM est chargé
		 */
		init: function () {
			app.debug('DOM Ready');
		}
		
	}

	$(document).ready(function () {
		app.init();
	});

})(jQuery, window);

