$(document).ready(function(){

  // scroll top to ELement

    $(".nav-link").eq(0).click(function(){
    $("html,body").animate({
      scrollTop:$("#home").offset().top
    },1000)
    })
    $(".nav-link").eq(1).click(function(){
    $("html,body").animate({
    scrollTop:$("#About").offset().top
    },1000)
    })
    $(".nav-link").eq(2).click(function(){
    $("html,body").animate({
    scrollTop:$("#service").offset().top
    },1000)
    })
    $(".nav-link").eq(3).click(function(){
    $("html,body").animate({
    scrollTop:$("#skills").offset().top
    },1000)
    })
    $(".nav-link").eq(4).click(function(){
    $("html,body").animate({
    scrollTop:$("#blog").offset().top
    },1000)
    })
    $(".nav-link").eq(5).click(function(){
    $("html,body").animate({
    scrollTop:$("#contact").offset().top
    },1000)
    })

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
        strings: ["fronted Developer","Freelancer"],
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
    nav:true,
    dots:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            loop:true,
            nav:true,
        },
        600:{
            items:3,
            loop:true,
            nav:true,
        },
        1000:{
            items:3,
            loop:true,
            nav:false,
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
  $("body").css("overflow", "auto");
  $(".overlay-leading h1").fadeOut(3000, function(){
      $(this).parent().fadeOut(2000, function(){
        $(this).remove();
      });
  });
});

