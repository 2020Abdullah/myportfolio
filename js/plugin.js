$(document).ready(function(){

  // scroll top to ELement

  $('.navbar').find('a').on('click',function(e){
    if(this.hash !== ''){
         e.preventDefault();
        
         var hash = this.hash;

         $('html, body').animate({
             scrollTop: $(this.hash).offset().top

         },1000,function(){
           
             window.Location.hash = hash;

         });
    };
});

  // navbar fixed
  
    $(window).scroll(function(){
    if($(this).scrollTop() >= 500){
    $(".navbar").addClass("active");
    } else{
    $(".navbar").removeClass("active");
    }
    })

  // typewriter
  
    new TypeIt(".typed", {
        strings: ["web developer front End" , "Wordpress Developer" , "Freelancer"],
        speed: 250,
        waitUntilVisible: false,
        breakLines: false,
        startDelay: 1000,	
        nextStringDelay: 5000,	
        loop:true,
      }).go();

  // slider skills

  $('.owl-carousel').owlCarousel({
    loop:true,
    nav:false,
    dots:true,
    margin:10,
    autoplay: true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            loop:true,
        },
        600:{
            items:3,
            loop:true,
        },
        1000:{
            items:3,
            loop:true,
        }
    }
})

// jquary valdiation

$("form").validate({
  errorClass: "error fail-alert",
  validClass: "valid success-alert",
  rules: {
    name : {
    required: true,
    minlength: 3
    },
    email: {
    required: true,
    },
    phone: {
    number:true,
    minlength:11
    }
  }
});

})

$(window).on('load', function () {
  $(".overlay-leading").fadeOut(3000);
});

