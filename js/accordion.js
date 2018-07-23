/*
 * jQuery Accordion v1.1
 * https://github.com/vlada-j/Accordion
 *
 * Copyright 2014, Vlada Janosevic
 * http://www.vladajanosevic.info/
 * Free to use and change
 *
 * Required: jQuery 1.11.1
 */
+function ($) {
	"use strict";

	function Accordion(ele, options){
		var cont = $(ele),
			panels = cont.children(),
			headers = panels.children('.ac-header'),
			contents = panels.children('.ac-content');

		cont.addClass('accordion');
		panels.addClass('ac-panel');
		headers.click(function() {
			var _he=$(this),
				_pa=_he.parent(),
				_co=_pa.children('.ac-content'),
				isOpen=_pa.hasClass('open');

			hAll();
			if(options.selfClose && isOpen) {
			} else {
				_pa.addClass('open');
				_co.css('height', _co[0].scrollHeight+'px');
			}
		});

		function hAll(){
			panels.removeClass('open');
			contents.css('height','');
		}

		if(options.outsideClose) {
			$(document).click(function(e){cont[0].contains(e.target)?0:hAll();});
		}
	}

	Accordion.DEFAULTS = {
		outsideClose:true,
		selfClose:true
	};

	$.fn.Accordion = function (option) {
		return this.each(function () {
			var $this	= $(this),
				data	= $this.data('Accordion'),
				options	= $.extend({}, Accordion.DEFAULTS, $this.data(), typeof option == 'object' && option)

			if (!data) {
				$this.data('Accordion', (data = new Accordion(this, options)));
			}
		});
	};

	$.fn.Accordion.Constructor = Accordion;

}(window.jQuery);