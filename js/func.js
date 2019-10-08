$(document).ready(function(){


    // var aboutEl = $('.appear');
    // var aboutElOffset = aboutEl.offset().top/4;
    // // console.log(aboutElOffset)
    // var documentEl = $(document);
    
    // documentEl.on('scroll', function() {
    //     if ( documentEl.scrollTop() > aboutElOffset && aboutEl.hasClass('hidden') ) aboutEl.removeClass('hidden'); 
    // });

    // $('.drag').click(function(e){                           
    //     e.preventDefault(); //evitar el eventos del enlace normal
    //     var strAncla=$(this).attr('href'); //id del ancla
    //     console.log(strAncla)
    //         $('body,html').stop(true,true).animate({                                
    //                  scrollTop: $(strAncla).offset().top
    //          },1000);
    // });

    AOS.init({
        duration: 1200,
    })

    $(window).scroll(function(){
        $('nav').toggleClass('scrolled', $(this).scrollTop() > 730);
    });
    
});