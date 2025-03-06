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

        console.log("First Name:", formData.get("FirstName"));
        console.log("Last Name:", formData.get("LastName"));
        console.log("Email:", formData.get("EmailAddress"));
        console.log("Phone Number:", formData.get("PhoneNumber"));
        console.log("Account Type:", formData.get("AccountType"));
        console.log("Company Name:", formData.get("CompanyName"));
        console.log("Job Title:", formData.get("JobTitle"));
        alert(`Thank you ${formData.get("FirstName")} ${formData.get("LastName")} for submitting the form , Our team will contact you soon!!!`)
    });

    //ROUTER FUNCTION
    $(".demo-button").on("click",()=>{
        $("#carouselExample").removeClass("active");
    })
    function loadPage() {
        let hash = window.location.hash.substring(1); 
        
        hashUrl.forEach(id => {
            $("#" + id).removeClass("active");
            
        });
    
     
        if (hash && hashUrl.includes(hash)) {
            $("#" + hash).addClass("active");
            if (hash !== "home-page") {
                $("#carouselExample").removeClass("active");
            }
        } else {
            $("#home-page").addClass("active");
            $("#carouselExample").addClass("active"); 
            $(window).on("scroll", function () {
                if(hash==="home-page"){
                    $("#carouselExample").css("display", $(this).scrollTop() > 0 ? "none" : "block");
                }
               
            });
        
        
            setInterval(() => $("#carouselExample").carousel("next"), 5000);
        
        }
    }
    
    $(window).on("hashchange", loadPage); 
    loadPage(); // Run on initial load
    
     
});

