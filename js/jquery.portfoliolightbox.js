/*
 *	Portfolio Lightbox plugin - by Paul Wells pwellsau(at)gmail.com
 *	Displays your images in a lightbox with a title, description, and links.
 * 	Version 0.1.0
 *	See https://github.com/pwellsau/jQuery.PortfolioLightbox for README and instructions.
 */


// Creating an Immediately invoked function expression.
// Passing in 'jQuery' as param '$', to protect '$' in other libraries.
// Also helps to keep our variables private.
(function($) {

	// Add our function to $.fn.
    $.fn.lightBox = function(options) {

    	// Set default options.
    	// This merges with the options specified by the user when setting up the plugin.
    	// Merges into the jQuery object as target argument (first argument) is omitted.
    	var settings = $.extend({
    		imgpath		:null,
			title		:'My Picture',
			//text		:'Description goes here! See the readme for how to change this text.',
			link 		:null,
			linkText	:null,
			addLinks	:function () {
				// Function to gather URLs and their text, and format them.
				completeLinks = ""
				if (this.link == null) { 
					// No links specified in options. Exit this function.
					return completeLinks;
				} else {
					$.each(this.link, function(index, value) {
						// If a link is specified but no accompanying text, use the URL as the text.
						if (typeof settings.linkText[index] === 'undefined') {
							var completeLinkText = value;
						} else {
							var completeLinkText = settings.linkText[index];
						}
						completeLinks = completeLinks + "<a href='" + value + "'>" + completeLinkText + "</a><br />";
					});
				}
				return completeLinks;
			}
		}, options);

        // I have used '.on' here, and not the shortcut '.click', incase someone creates images dynamically
        this.on("click", function () {
        	
        	// Validation
        	if (settings.imgpath == null) {
        		console.log("You need to specify the 'imgpath' option, and add a path to your image for lightBox to work. Please see the readme file.");
        		return this;
        	};

        	// Create html for the image, text and links
        	$("body").append("<div id='lightboxBackground'></div>" +
        						"<div id='displayContainer'><div id='imgContainer'><img src='" + settings.imgpath + "'></div>" +
        						"<div id='textContainer'><h2>" + settings.title + "</h2><p>" + settings.text + "</p>" + settings.addLinks() + "</div><div class='break'></div></div>");
        	
        	// Display lightbox
        	$("#lightboxBackground").fadeIn();
        	$("#displayContainer").fadeIn();
        });

        // Click anywhere on the background to remove lightbox.
        $('body').on("click", '#lightboxBackground', function () {
			$("#lightboxBackground").remove();
			$("#displayContainer").remove();
		});

		return this; // Make sure other methods can be chained

    };

// Passing the function 'jQuery' as '$' parameter.
}(jQuery));