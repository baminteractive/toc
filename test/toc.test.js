suite('toc', function() {

  setup(function() {

    $('.toc').empty();

    var id = window.setTimeout(function() {}, 0);

    while (id--) {
      window.clearTimeout(id);
    }

    $(window).unbind('scroll');

    $(window).scrollTop(0);

    $('h1,h2,h3').attr("id","");

  });

  suite('jquery', function() {
    test('should have toc method', function() {
      assert.equal(typeof $.fn.toc, 'function');
    });

    test('plugin should bind to element', function() {
      assert.equal($('.toc ul').length, 0);

      $('.toc').toc({
        container: '#fixture'
      });

      assert.equal($('.toc ul').length, 1);
    });
  });

  suite('toc navigation', function() {

    test('should create hash #toc0 on first element', function() {
      assert.equal($('.toc ul a').length, 0);

      $('.toc').toc({
        container: '#fixture'
      });

      assert.equal($('.toc ul a').attr('href'), "#toc0");

    });

    test('should create hash #toc3 on last element', function() {
      assert.equal($('.toc ul a').length, 0);

      $('.toc').toc({
        container: '#fixture'
      });

      var $els = $('.toc ul a');

      assert.equal($('.toc ul a').last().attr('href'), "#toc3");

    });

    test('should contain links', function() {
      assert.equal($('.toc ul a').length, 0);

      $('.toc').toc({
        container: '#fixture'
      });

      assert.notEqual($('.toc ul a').length, 0);
    });

    test('should scroll to element on click', function(done) {
      assert.equal($(window).scrollTop(), 0);

      $('.toc').toc({
        container: '#fixture',
        smoothScrolling: true
      });

      $('.toc a:first').click();

      setTimeout(function(){
        var elOffset = $('#toc0').offset().top;
        var windowTop = $(window).scrollTop();
        assert.ok((windowTop <= elOffset + 5 && windowTop >= elOffset - 5));
        done();
      }, 400);
    });

    test('should update on scroll', function(done) {
      assert.equal($(window).scrollTop(), 0);

      $('.toc').toc({
        container: '#fixture'
      });

      $(window).scrollTop(~~($('#toc1').offset().top));
      
      setTimeout(function(){
        assert.ok($('.toc ul li:eq(1)').hasClass('toc-active'));
        done();
      }, 110);
    });
  });

  suite('toc with useIds enabled and prefix = ""', function() {

    test('should create an id on the first heading that reads "Sub_Heading_A_test', function() {
      assert.equal($('.toc ul a').length, 0);

      $('.toc').toc({
        container: '#fixture',
        useIds: true,
        prefix: ''
      });

      assert.equal($('#fixture h2').first().attr('id'), "Sub_Heading_A_test");

    });
  });
});
