$(document).ready(function() {
   $('#pet-listings-carousel').carousel({
       interval: 10000
   })

   $('#myCarousel').on('slid.bs.carousel', function() {
       //alert("slid");
   });
   defaultContent = ""
   
   $(window).resize(function() {
       if(defaultContent == "")
       {
          defaultContent =  $('.carousel-inner').html()
       }
       if (window.innerWidth < 800 && $('.col-sm-3').length) {

           $('.col-sm-3').addClass('item')

           tmphtml = ""
           $('.col-sm-3').each(function(index) {
               $(this).html($(this).find('a').html() + '<div class="carousel-caption"></div>')
               $(this).removeClass('col-sm-3')
           })

           $('.row').each(function(index) {
               tmphtml += $(this).html()
           })


           $('.carousel-inner').html(tmphtml)
           $($('.item').first()).addClass('active')

       } else if (window.innerWidth > 800){
           
           $('.carousel-inner').html(defaultContent)

       }

       $('#myCarousel').carousel({
           interval: 10000
       })

   });
});