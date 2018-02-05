$(document).ready(function() {
	$(window).load(function() {
        //$("#header-frame").load("common_module/header.html");
        //$("#footer-frame").load("common_module/footer.html");
		
		//$("#account-page-header").load("common_module/account_page_header.html");
       // $("#account-page-footer").load("common_module/account_page_footer.html");
		
		//$("#counselor-header-frame").load("common_module/counselor_page_header.html");
		
		//Left Blue Menu File Load
		//$(".profile-listing-col #counselor-left-menu").load("common_module/counselor_left_menu.html");
		//$(".profile-listing-col #patient-blue-col").load("common_module/patient_left_menu.html");
		
		var screenHeight = window.innerHeight;
		var headerHeight = $('#header-frame').innerHeight();
		var footerHeight = $('#header-frame').innerHeight();
		var middleFrameHeight = $('.middle-frame').css('minHeight',screenHeight - 278);
				
//		//Account setting Top Menu subListing Functionality
//		$('.right-profile-option li .link').click(function(){			
//			$('.right-profile-option li .link').removeClass('active');
//			$('.sub-listing').hide(500);
//			$(this).siblings('.sub-listing').toggle(500);
//			$(this).addClass('active');
//			$('.sub-listing').focusout(function(){
//    			$(this).siblings('.sub-listing').hide(500);
//			});
//		});//Account setting Top Menu subListing Functionality End//		
    });
	
	 
	
	//FAQ Sliding Functionality start
	$(".faq-listing dt.term").each(function(){
		var childElem = $(this).children();
		//alert('Child Element uis ==>' + childElem);
		$(childElem).click(function(){
			var test = $(this).text();
			//alert(test);
			$('dt.term').removeClass('active');
			//$('dd.description').hide(500);
			$(this).parent('dt').siblings('dt').next('dd').hide(500);
			$(this).parent('dt').addClass('active');
			$('dt.active').next('dd').show(500);
		});	
	})//FAQ Sliding Functionality End//
	
	//Get Started Review Carousel
	$('.review-carousel').carousel({
		interval: 2500 //changes the speed
	})//Get Started Review Carousel End//
	
	//Jobs Apply Open-Hide Functionaolity
	$('.desc-top-frame .icon-showHide').click(function() {
		if ($('.content-section').is(':visible')) {
			$('.desc-top-frame .icon-showHide').removeClass('active');
			$('.content-section').hide(500);
		}
		else {
			$('.desc-top-frame .icon-showHide').addClass('active');
			$('.content-section').show(500);
		}		
	})//Jobs Apply Open-Hide Functionaolity End//
	
	$('.more-icon-row .icon').click(function(){
		if($(this).parents('.abt-member-section').hasClass('active')){
			//do nothing
		} else {
			$('.more-icon-row .icon').each(function(){
				$(this).parents('.abt-landing-row .abt-member-section').animate({height: '500px'});
				$(this).parents('.advisory-board-frame .abt-member-section').animate({height: '400px'});
				$(this).parents('.abt-member-section').removeClass('active');
				$(this).removeClass('icon-close');
				$(this).addClass('icon-open');
			});
		}

		if($(this).hasClass('icon-close')){
			$(this).parents('.abt-landing-row .abt-member-section').animate({height: '500px'});
			$(this).parents('.advisory-board-frame .abt-member-section').animate({height: '400px'});
			$(this).parents('.abt-member-section').removeClass('active');
			$(this).removeClass('icon-close');
			$(this).addClass('icon-open');
		} else {
			$(this).parents('.abt-member-section').animate({height: 'auto'});
			$(this).parents('.abt-member-section').addClass('active');
			$(this).removeClass('icon-open');
			$(this).addClass('icon-close');
		}

	})//About Member Detail View Functionality End//

	
	
	//Counselor Left Listing Click Functionality
	// $('.profile-listing-col .list li').each(function(){
	// 	alert("testing 01");
	// 	$(this).children('.list-title').click(function(){
	// 		$('.profile-listing-col .list li').removeClass('active');
	// 		$(this).parent().addClass('active');
	// 		$(this).parent().siblings().children('.sub-listing').hide(500);
	// 		$(this).siblings('.sub-listing').show(500);
	// 	});
	// });//Counselor Left Listing Click Functionality End//
	
	//Bank Radio Option Functionlity
	$('.bank-option-radio .radio-field .radio-btn').attr('checked',false);
	$('.bank-option-radio .radio-field .radio-btn').click(function(){
		if($(this).is(':checked')) {
			//alert("Testing");
			var radioFieldDataId = $(this).attr('data-id');
			//alert(radioFieldDataId);
			$('.radio-textbox').hide();
			$('.radio-textbox.' + radioFieldDataId ).show();		   
		 }
		else {
			$('.radio-textbox').hide();
		}
		
	})//Bank Radio Option Functionlity//
	
	//Counselor Message Tabs Functionality
	$('.tab-content').hide();
	$('.chat-content-area.tab-content').show();
	$('.chatting-tabs-frame .tabs-frame li').each(function(){
		$(this).children().click(function(){			
			$('.tabs-frame li').removeClass('active');
			$(this).parent().addClass('active');
			$('.tab-content').hide();
			var tabListId = $(this).attr('data-id')
			$('.tab-content-frame #'+ tabListId).show();
		})
	});//Counselor Message Tabs Functionality End//
	
	//Update Session Functionality
	$('.session-dtl-listing li .update-session-form').hide(500);
	$('.session-text .update-session').click(function(){
		//$('.session-dtl-listing li .update-session-form').hide();
		$(this).parents('li').siblings().children('.update-session-form').hide(500);
		$(this).parents().siblings('.update-session-form').show(500);
	})//Update Session Functionality End//
	
	//BankId Login Functionality
	$('.option-row .radio-field .radio-btn').click(function(){
		var parentClassName = $(this).parent().parent();
		if ($(parentClassName).hasClass('bankId-option2')){
			$('.bankId-option2 .option-text .mobilit-bankId').show(500);
		}else {
			$('.bankId-option2 .option-text .mobilit-bankId').hide(500);
		}
	})//BankId Login Functionality End//
    
    
    //Patient Message Left Box
    $('.patient-message-content .dotted-line').click(function(){
        //alert("testing");
        if($('.message-content-frame .left-menu-frame').is(':visible')){
            //alert("testing 01");
            $('.message-content-frame').removeClass('left-menu-active');
        }else {
            //alert("testing 02");
            $('.message-content-frame').addClass('left-menu-active');
        }
        event.preventDefault();
    });//Patient Message Left Box End//
    
});//document Ready End//

$(window).resize(function(){
	var screenHeight = window.innerHeight;
	var headerHeight = $('#header-frame').innerHeight();
	var footerHeight = $('#header-frame').innerHeight();
	var middleFrameHeight = $('.middle-frame').css('minHeight',screenHeight - 278);	
});//Window Resize End//

$(document).on("click", function(event){
	var $trigger = $('.right-profile-option .link');
	if($trigger !== event.target && !$trigger.has(event.target).length){
		$(".right-profile-option .sub-listing").hide(500);
		$('.right-profile-option .link').removeClass('active');
	}            
});//Document On click Functionality//

