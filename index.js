$(document).ready(function () {
    const dropdownConfigs = [
        { trigger: $("#Flix-Services"), dropdown: $(".drop-down-text-container").eq(0) },
        { trigger: $("#about-us"), dropdown: $(".drop-down-text-container").eq(1) }
    ];
    const hashUrl=["home-page","schedule-demo-page"]
    const introVideoImg = $("#img-video");
    const closeIntroVideo = $("#cross-intro-video");
    const videoContent = $("#video-content");
    const whatWeknowtoggleBar = $("#what-we-know-toggle-bar");
    const toggleOptions = whatWeknowtoggleBar.find("span");
    const whatWeknowDataContainer = $(".data-container > div");
    const menuBtn = $(".navbar-toggler ")

    //MENU BUTTON CHANGE 
    menuBtn.on("click", () => {
        menuBtn.toggleClass("menu-active");
    });
    // ANIMATION-ON-FIRST-RENDER
    $(document).ready(function () {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass("stats-animation");
            } 
          });
        });
      
        $(".stats-container").each(function () {
          observer.observe(this); 
        });
        $(".cards-container").each(function () {
            observer.observe(this); 
          });
      });
      


    toggleOptions.eq(0).addClass("toggle-bar-active");
    toggleOptions.slice(1).addClass("toggle-bar-disable");
    whatWeknowDataContainer.first().addClass("active");

    dropdownConfigs.forEach(({ trigger, dropdown }) => {
        let hideTimeout;

        trigger.on("mouseenter", function () {
            clearTimeout(hideTimeout);
            dropdown.addClass("display-dropdown opacity-dropdown");
        });

        trigger.on("mouseleave", function () {
            hideTimeout = setTimeout(() => {
                if (!dropdown.is(":hover")) {
                    dropdown.removeClass("opacity-dropdown display-dropdown");
                }
            }, 50);
        });

        dropdown.on("mouseenter", function () {
            clearTimeout(hideTimeout); 
        });

        dropdown.on("mouseleave", function () {
            hideTimeout = setTimeout(() => {
                dropdown.removeClass("opacity-dropdown display-dropdown");
            }, 50);
        });
    });

    // $(window).on("scroll", function () {
    //     let url = window.location.hash.substring(1); 

    //         $(window).scroll(function () {
    //             if ($(this).scrollTop() > 0) {
    //                 console.log("yo")
    //                 if (!(url === "schedule-demo-page")){
    //                     console.log("yo")
    //                     $("#carouselExample").removeClass("active"); // Keep "display" if needed
    //                 }
                   
    //             } else {
    //                 if (!(url === "schedule-demo-page")){
    //                     $("#carouselExample").addClass("active");
    //                 }
                   
    //             }
    //         });
        
    // });

    // setInterval(() => $("#carouselExample").carousel("next"), 5000);


    toggleOptions.click(function () {
        if (!$(this).hasClass("toggle-bar-active")) {
            toggleOptions.removeClass("toggle-bar-active").addClass("toggle-bar-disable");
            whatWeknowDataContainer.removeClass("active");

            $(this).addClass("toggle-bar-active").removeClass("toggle-bar-disable");
            whatWeknowDataContainer.eq($(this).index()).addClass("active");
        }
    });


    introVideoImg.click(() => videoContent.addClass("show-video"));
    closeIntroVideo.click(() => videoContent.removeClass("show-video"));

    //FORM-UPLOAD-FUNTION
    $("#demoUploadForm").on("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const formData = new FormData(this);
        if (
            formData.get("FirstName") === "" || 
            formData.get("LastName") === "" || 
            formData.get("EmailAddress") === "" || 
            formData.get("PhoneNumber") === "" || 
            formData.get("CompanyName") === "" || 
            formData.get("JobTitle") === ""
        ) {
            alert("Please fill all data")
        }else{
            console.log("First Name:", formData.get("FirstName"));
            console.log("Last Name:", formData.get("LastName"));
            console.log("Email:", formData.get("EmailAddress"));
            console.log("Phone Number:", formData.get("PhoneNumber"));
            console.log("Account Type:", formData.get("AccountType"));
            console.log("Company Name:", formData.get("CompanyName"));
            console.log("Job Title:", formData.get("JobTitle"));
            alert(`Thank you ${formData.get("FirstName")} ${formData.get("LastName")} for submitting the form , Our team will contact you soon!!!`)
        }
    });

    //ROUTER FUNCTION
    $(".demo-button").on("click",function(){
        $("#carouselExample").removeClass("active");
    })
    function loadPage() {
        let hash = window.location.hash.substring(1);

        // Remove "active" class from all hash-based pages
        hashUrl.forEach(id => $("#" + id).removeClass("active"));

        if (hash && hashUrl.includes(hash)) {
            $("#" + hash).addClass("active");

            if (hash === "schedule-demo-page") {
                console.log("Hiding carousel on schedule-demo-page");
                $("#carouselExample").removeClass("active");
            } else if (hash === "") {
                console.log("Showing carousel on home-page");
                $("#carouselExample").addClass("active");
            }
        } else {
            console.log("Defaulting to home-page");
            $("#home-page").addClass("active");
            $("#carouselExample").addClass("active");
        }
    }

    // Scroll event only on home-page
    $(window).on("scroll", function () {
        let hash = window.location.hash.substring(1); // Get updated hash value

        if ( hash === "") { 
            if ($(window).scrollTop() > 0) {
                console.log("Hiding carousel on scroll down");
                $("#carouselExample").removeClass("active");
            } else {
                console.log("Showing carousel on scroll up");
                $("#carouselExample").addClass("active");
            }
           
        }
       
    });
    setInterval(() => $("#carouselExample").carousel("next"), 5000);
    $(window).on("hashchange", loadPage);
    loadPage(); // Run on initial load
    
    
     
});

