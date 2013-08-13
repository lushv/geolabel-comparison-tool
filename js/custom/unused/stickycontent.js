/*
* Sticky Content script
* Created: Sept 14th, 2011 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

(function ($){

	$.fn.stickyit=function(options){
		
		var o=$.extend({}, {throttle:30, gap:0, stopstickyafter:0}, options)

		return this.each(function(){
			var $el=$(this)
 			// clone element to be sticky and make "fix" its position on the page 
			var $elclone=$el.clone(true).css({
				position:'fixed', left:$el.offset().left,visibility:'hidden', top:o.gap, width:$el.width(), height:$el.height(), margin:0
			}).appendTo(document.body)

			// function to throttle the sticking of an element for performance reasons
			function throttlesticky(){
				clearTimeout(o.throttletimer)
				o.throttletimer=setTimeout(function(){stickit(o, $el, $elclone)}, o.throttle)
			}

			$(window).bind('scroll resize', throttlesticky)

			// Disable sticky after x milliseconds?
			if (o.stopstickyafter > 0)
				setTimeout(function(){$(window).unbind('scroll resize', throttlesticky); stickit(o, $el, $elclone, true)}, o.stopstickyafter)
		})

		function stickit(o, $el, $elclone, unstick){
			var docscrolltop=$(document).scrollTop()
			if (!unstick && $el.data('state')!='hidden' && docscrolltop > $el.offset().top){ // stick content if document is scrolled past top of sticky element
				$el.css({visibility:'hidden'}).data('state', 'hidden')
				$elclone.css({visibility:'visible'})
				if (typeof o.stickyclass != "undefined")
					$elclone.addClass(o.stickyclass)
			}
			else if (unstick || ($el.data('state')!='visible' && docscrolltop < $el.offset().top)){ // unstick content if not
				$el.css({visibility:'visible'}).data('state', 'visible')
				$elclone.css({visibility:'hidden'})
				if (typeof o.stickyclass != "undefined")
					$elclone.removeClass(o.stickyclass)			
			}
		}

	}

})(jQuery);