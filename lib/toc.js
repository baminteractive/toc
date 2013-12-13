(function($) {
  $.fn.toc = function(options) {

    var self = this;
    var opts = $.extend({}, jQuery.fn.toc.defaults, options);

    var container = $(opts.container);
    var listType  = $(opts.listType);
    var headings  = $(opts.selectors, container);
    var headingOffsets = [];
    var activeClassName = opts.prefix+'-active';

    var scrollTo = function(e) {
      if (opts.smoothScrolling) {
        e.preventDefault();
        var elScrollTo = $(e.target).attr('href');

        console.log('elScrollTo', elScrollTo);

        var $el = $(elScrollTo);

        $('body,html').animate({ scrollTop: $el.offset().top }, 400, 'swing', function() {
          location.hash = elScrollTo;
        });
      }
      $('li', self).removeClass(activeClassName);
      $(e.target).parent().addClass(activeClassName);
    };

    //highlight on scroll
    var timeout;
    var highlightOnScroll = function(e) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function() {
        var top = $(window).scrollTop(),
          highlighted;
        for (var i = 0, c = headingOffsets.length; i < c; i++) {
          if (headingOffsets[i] >= top) {
            $('li', self).removeClass(activeClassName);
            highlighted = $('li:eq('+(i-1)+')', self).addClass(activeClassName);
            opts.onHighlight(highlighted);
            break;
          }
        }
      }, 50);
    };

    if (opts.highlightOnScroll) {
      $(window).bind('scroll', highlightOnScroll);
      highlightOnScroll();
    }

    return this.each(function() {

      console.log('starting this');

      //build TOC
      var el = $(this);
      var ul = $(listType);
      var anchor;

      headings.each(function(i, heading) {

        var $h = $(heading);
        headingOffsets.push($h.offset().top - opts.highlightOffset);

        if(opts.useIds){
          anchor = opts.headerId(this, i, heading, opts.prefix);
        } else {
          anchor = opts.anchorName(this, i, heading, opts.prefix);
        }

        $h.attr("id", anchor);

        //build TOC item
        var a = $('<a/>')
          .text(opts.headerText(i, heading, $h))
          .attr('href', '#' + anchor)
          .bind('click', function(e) {
            if(opts.smoothScrolling){
              scrollTo(e);
            }
            el.trigger('selected', $(this).attr('href'));
          });

        var li = $('<li/>')
          .addClass(opts.itemClass(i, heading, $h, opts.prefix))
          .append(a);

        ul.append(li);

      });

      console.log('appending to');

      el.html(ul);

    });
  };

  jQuery.fn.toc.defaults = {
    container: 'body',
    listType: '<ul/>',
    selectors: 'h1,h2,h3',
    smoothScrolling: true,
    prefix: 'toc',
    useIds: false,
    onHighlight: function() {},
    highlightOnScroll: true,
    highlightOffset: 100,
    headerId: function(el, i, heading, prefix){

      var id = $(el).attr("id");
      var $heading = $(heading);
      var sanitized;

      if(!id){
        sanitized = $heading.text().split(' ').join('_').replace(/\W/g, '');
        id = prefix + encodeURIComponent(sanitized);
      }

      return id;
    },
    anchorName: function(el, i, heading, prefix) {
      return prefix+i;
    },
    headerText: function(i, heading, $heading) {
      return $heading.text();
    },
    itemClass: function(i, heading, $heading, prefix) {
      return prefix + '-' + $heading[0].tagName.toLowerCase();
    }
  };

})(jQuery);
