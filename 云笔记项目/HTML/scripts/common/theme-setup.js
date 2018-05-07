$(function(){
	'use strict';


    // SEPARATE NAV TO EASY DEVELOMPENT (JUST FOR BENT)
    // $('.side-left').load('sidebar.html');
    // $(document).on('click', '.side-left a', function(e) {
    //     e.preventDefault();

    //     var container = $('.content-body');

    //     container.load($(this).attr('href'));
    // });
    


    // NORMALIZE HASH FROM URL
    // HASH IS OUTOMATICALLY ADDING ON URL IF .data-ajax IS CALLED
    // SO WE NEED TO REMOVE/RESET IT ON PAGE LOAD
    if (window.location.hash.indexOf('!/') == 1) { // not 0 because # is first character of window.location.hash
        location.hash = '';
    }
    
    

    // SIDEBAR STATE ACTIVE
    // Just demo on demo (static) page (remove it if you want and use your self rule)
    // set default menu active state
    var setActiveMenu = function(){
        var lastIndexUrl = window.location.href.substr(window.location.href.lastIndexOf("/")+1),
            urlFilename = (lastIndexUrl == '') ? 'index.php' : lastIndexUrl,
            activeMenu = $('.sidebar').find('[href="' + urlFilename + '"]'),
            activeMenuLi = $('.sidebar').find('[href="' + urlFilename + '"]').parent(),
            activeMenuUl = $('.sidebar').find('[href="' + urlFilename + '"]').parent().parent(),
            hasActiveMenuChild = activeMenuUl.hasClass('sidebar-child'),
            hasActiveMenuChildInline = activeMenuUl.hasClass('sidebar-child-inline'),
            label = activeMenu.children('.sidebar-text').text(),
            icon = activeMenu.children('.sidebar-icon');

        $('.sidebar').find('li').removeClass('active');

        // if icon not found inside this menu
        if (icon.length == 0) {
            // then maping parent icon and get it
            icon = activeMenuUl.parent().children('a').first().children('.sidebar-icon');
        }

        if (hasActiveMenuChild || hasActiveMenuChildInline) {
            // add active state to this menu
            activeMenuLi.addClass('active');
            // add active state to this menu parent
            activeMenuUl.parent().addClass('active');
        }
        else{
            // add active state to this menu
            activeMenuLi.addClass('active');
        }

        // change .content-title
        if (label == 'Dashboard') {
            // if dashboard set to default
            $('.content-title').html('<i class="' + icon.attr('class') + '"></i> Welcome to Stilearn 2.0');
        }
        else{
            // Use label for content title
            $('.content-title').html('<i class="' + icon.attr('class') + '"></i> ' + label);
        }
    }
    // initialize defaultActiveMenu
    setActiveMenu();
    // END SIDEBAR STATE ACTIVE
    



    
    // PJAX SETUP
    var host = window.location.protocol + '//' + window.location.host + '/',
        filePath = '',
        urlToScripts = host + filePath,
        reExecuteScripts = [
            'scripts/google-code-prettify/run_prettify.js', 
            'scripts/bootstrap-setup.js', 
            'scripts/jqueryui-setup.js', 
            'scripts/dependencies-setup.js', 
            'scripts/demo-setup.js'
            // 'scripts/initializer.js'
        ],
        createScript = function(src){

            var script = document.createElement( 'script' ),
                url = urlToScripts;

            script.className = 're-execute';
            script.type = 'text/javascript';
            script.src = url + src;

            return script;
        };

    // PJAX Initialize
    if ($.support.pjax) {
        $(document).pjax('a[data-pjax]', {timeout: 3500 })    // set timeout to solve issue on hosting server
        .on('pjax:start', function(e) {
            var relateTarget = e.relatedTarget,
                data = '',
                pjax = '',
                oldClass = '';

            if(relateTarget){
                data = $(relateTarget).data();
                pjax = data.pjax;
                oldClass = pjax.split('.').join("");
            }
            else{
                pjax = e.target;
                oldClass = $(pjax).attr('class').split(' ')[0];
            }

            // normalize pjax target Class
            $(pjax).attr('class', oldClass);
            // remove re-execute scripts
            $('script.re-execute').remove();

            // set active sidebar menu
            setActiveMenu();

            // remove posible bugs
            $(document).find('.flot-tooltip').remove();
            $(document).find('.modal').modal('hide');
            $(document).find('.modal-backdrop').remove();
            $(document).find('body').removeClass('modal-open');
            $(document).find('[data-toggle="popover"], [rel*="popover"]').popover('hide');
            $('body').removeClass('gallery-expand');
        })
        .on('pjax:complete', function(e) {
            
            var relateTarget = e.relatedTarget,
                data = '',
                pjax = '',
                animated = '';

            // reload re-execute scripts after pjax
            $.each(reExecuteScripts, function(i, val){
                var script = createScript(val);

                // reload re-execute scripts
                $('body').append(script);
                // clean console
                console.clear();
            });

            // prepare var
            if(relateTarget === undefined){
                pjax = '.content-body';
                animated = 'fadeInDown';
            }
            else{
                data = $(relateTarget).data();
                pjax = data.pjax;
                animated = (data.animatedpjax === undefined) ? 'fadeInDown' : data.animatedpjax;
            }
            
            // add animated to pjax target
            $(pjax).addClass('animated ' + animated);
            $(pjax).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
                // clean animated classes from content body (to fixed some bug with any elements like modal)
                $(pjax).removeClass('animated ' + animated);
            });
        });

        // on popstate if user click history event
        window.onpopstate = function (e) {
            // history changed because of pushState/replaceState (not page load)
            if (e.state) {
                var state = e.state,
                    container = state.container,
                    url = state.url;

                $.pjax({url: url, container: container, timeout: 3500});
            }
        }
    };
    // END PJAX SETUP




    // AJAX SETUP
    var fakePaginate = 1;
    $(document).on('click', 'a[data-ajax]', function(e){
        e.preventDefault();

        var $this = $(this),
            url = $this.attr('href'),
            placement = $this.data('ajax'),
            maxPage = $this.data('maxPage'),
            fakeHash = placement.replace('#', '');
        
        fakeHash = fakeHash.replace('.', '');

        // toggle loading state (the selector)
        $this.button('loading');

        $.ajax(url, {
            dataType: 'html',
            complete: function(data){
                $(placement).append(data.responseText);

                var data_scripts = $this.data('scripts'),
                    scripts = data_scripts.replace(/\s+/g, '');

                scripts = scripts.split(",");

                $.each(scripts, function(i, val){
                    var script = createScript(val);

                    // remove the same existing script
                    $('script[src="' + val + '"]').remove();
                    // reload re-execute scripts (this may register script to re-axecute scripts)
                    $('body').append(script);
                    // clean console
                    console.clear();
                });

                // adding a hash to url (Remove it if you want)
                if (fakePaginate > 0) {
                    fakeHash +=  '/' + fakePaginate;
                }

                location.hash = '!/load/' + fakeHash;

                fakePaginate++;
                
                if (maxPage) {
                    if (fakePaginate > parseInt(maxPage)) {
                        $this.remove(); // remove button selector
                        fakePaginate = 1; // reset fakePaginate
                    };
                }

                $this.button('reset'); // reset loading state (the selector)
            }
        });
    });
    // END AJAX SETUP
    



    
    // SCROLL TO TOP
    $(document).on('click', 'a[rel=to-top]',function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
    });
    // END SCROLL TO TOP




    // ANIMATE SCROLL, define class .scroll to tag <a> will be activate this
    $(document).on('click', 'a.scroll',function(e){
        e.preventDefault();
        $("html,body").animate({scrollTop: $(this.hash).offset().top+5}, 600);
    });
    // END ANIMATE SCROLL
    
    

    
    // TOGGLE ACTIONS
    // TOGGLE SEARCH
    $(document).on('click', '.btn-expand-search, .btn-collapse-search', function(e){
        e.preventDefault();
        $('.toggle-search').toggleClass('intype')
            .find('.form-control').focus();
    });
    $(document).on('blur', '.toggle-search .form-control', function(){
        $('.toggle-search').toggleClass('intype');
    });




    // TOGGLE SIDE RIGHT
    $(document).on('click', '[data-toggle="side-right"]', function(e){
        e.preventDefault();
            
        $('.section, .header').toggleClass('translate-left');
        $('.side-right').toggleClass('toggle');

        // side-right module chat
        // show scroll on module
        $('.module[data-toggle="niceScroll"]').getNiceScroll().show();
        // hide chatbox
        $('.chatbox').removeClass('show');
    });
    // END TOGGLE ACTIONS
    




    // BOOTSTRAP MODAL
    $(document).on('shown.bs.modal', '.modal', function (e) {
        var $this = $(this),
            data_sound = ($this.attr('data-sound') === undefined) ? 'hello' : $this.attr('data-sound') ;

        if (data_sound != 'off') {

            if (data_sound == 'hello') {
                $.playSound('sounds/' + data_sound);
            }
            else if(data_sound == 'complete'){
                $.playSound('sounds/' + data_sound);
            }
            else if(data_sound == 'note'){
                $.playSound('sounds/' + data_sound);
            }
            else if(data_sound == 'bamboo'){
                $.playSound('sounds/' + data_sound);
            }
            else if(data_sound == 'pulse'){
                $.playSound('sounds/' + data_sound);
            }
            else{
                $.playSound(data_sound);
            }
        };
    })
    .on('hidden.bs.modal', '.modal', function (e) {
        $('.playSound').each(function(){
            var $this = $(this),
                audio = $this.next();

            $this.remove();
            audio.remove();
        });

        // remove posible bugs
        $(document).find('[data-toggle="popover"], [rel*="popover"]').popover('hide');
    })
    .on('loaded.bs.modal', '.modal', function(e){
        var target_id = e.target.id,
            handler = $('[data-target="#' + target_id + '"]'),
            data_scripts = handler.data('scripts'),
            scripts = data_scripts.replace(/\s+/g, '');

        scripts = scripts.split(",");

        $.each(scripts, function(i, val){
            var script = createScript(val);

            // remove the same existing script
            $('script[src="' + val + '"]').remove();
            // reload re-execute scripts (this may register script to re-axecute scripts)
            $('body').append(script);
            // clean console
            console.clear();
        });
    });
    // END BOOTSTRAP MODAL
    




    // BOOTSTRAP INPUT GROUP HACK
    $(document).on('focus', '.input-group-in .form-control', function(){
        var group = $(this).parent();

        if (group.hasClass('twitter-typeahead') || group.hasClass('minicolors')) {
            group.parent().addClass('focus');
        }
        else if(group.hasClass('input-group-in')){
            group.addClass('focus');
        }
    })
    .on('blur', '.input-group-in .form-control', function(){
        var group = $(this).parent();
        
        if (group.hasClass('twitter-typeahead') || group.hasClass('minicolors')) {
            group.parent().removeClass('focus');
        }
        else if(group.hasClass('input-group-in')){
            group.removeClass('focus');
        }
    });
    // END BOOTSTRAP INPUT GROUP HACK
    
    



    // COLLAPSE
    $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function(e) {
        var $this = $(this),
            panel_heading = ($this.parent().hasClass('panel-heading')) ? $this.parent() : $this.parent().parent(),
            group = $($this.data('parent'));

        // add all btn-collapsed
        group.find('[data-toggle="collapse"]').addClass('btn-collapsed');

        // remove .btn-collapsed if not .collapsed
        if (!$this.hasClass('collapsed')) {
            panel_heading.find('[data-toggle="collapse"]').removeClass('btn-collapsed');
        };
    });
    // END COLLAPSE
});