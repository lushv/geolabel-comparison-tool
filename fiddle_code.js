$('document').ready(function() {
    
    var $masonry = $('#masonry');
    
    // create 20 geolabels
    for (i = 0; i < 20; i++) {
        $masonry.append($('<div class="item"></div>').append($('#geolabel').html()));
    }
    
    // init masonry
    $masonry.masonry({
        columnWidth: 10,
        itemSelector: '.item'
    });
    
    /*
    * Resizes a random GEO label
    */
    $('#resize').on('click', function() {

        // select a random GEO label        
        randomize($('.item').eq(Math.floor(Math.random() * $('.item').length)));
        
        // readjust layout
        $masonry.masonry();
    });

    /*
    * Resizes all GEO labels
    */    
    $('#resize-all').on('click', function() {

        $('.item').each(function() {
            randomize($(this));
        });
        
        // readjust layout
        $masonry.masonry();
    });
    
    /*
    * Resizes all GEO labels & reorders them
    */    
    $('#resize-reorder').on('click', function() {

        $('.item').each(function() {
            randomize($(this));
        });
        
        // reorder
        reorder();
    });
    
    /*
    * reorder Masonry items largest to smallest
    */
    var reorder = function() {
        var elements = $masonry.masonry('getItemElements'),
            sorted = elements.sort(function (a, b) {
                return $(a).height() < $(b).height() ? 1 : -1;
            });
        
        // append our sorted colletion of item divs to the Masonry container
        $(sorted).appendTo($masonry);
        
        // need to reload to make Masonry aware of the DOM change
        $masonry.masonry('reloadItems');
        
        // readjust layout
        $masonry.masonry();
    }
    $('#reorder').on('click', reorder);
    
    /*
    * helper function to randomly scale a GEO label contained in
    * a Masonry item div
    */
    function randomize($item) {
    
        // generate a random number between 0.2 and 1
        var scale = Math.round((Math.random() * (1 - 0.2) + 0.2) * Math.pow(10,1)) / Math.pow(10,1);
        
        // re-scale
        $item.find('.size_group').attr('transform', 'scale(' + scale + ')');
        
        // get the new bounding box width & height
        var svg = $item.find('svg')[0],
            width = svg.getBBox().width,
            height = svg.getBBox().height,
            size = { width: Math.round(width), height: Math.round(height) };
        
        // adjust the div's width & height accordingly
        $item.css(size);
    }    

});