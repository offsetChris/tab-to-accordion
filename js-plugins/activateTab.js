

function activateTab(button){

	event.preventDefault();
	var parent = button.parents('.tabs');
	var content= button.attr('href');
	var row= parent.find('.tab-row');
	var contentbox = row.next('.tab-content');

	row.find('.is-active').removeClass('is-active');
	button.addClass('is-active');

	if(contentbox.is(':hidden')){
		contentbox.fadeIn('fast');
	}
	contentbox.find('.tab-content_text').hide();
	contentbox.find(content).fadeIn('fast');
}

function closeContent(){
	var parent = $(this).parents('.tabs');
	var contentbox = parent.find('.tab-content');
	contentbox.hide();
	contentbox.prev('.tab-row').find('.is-active').removeClass('is-active');
}

function moveTabContent(){
	$('.tabs').each(function(){
		var active = $(this).find('.is-active');
		var content = $(this).find('.tab-content');
		
		if($(window).width() < 750){
			content.insertAfter(active);
		} else {
			content.insertAfter($(this).find('.tab-row'));
		}
	});
}

$('body')
	.on('click', '.js_tab', function(){
		activateTab($(this));
		moveTabContent();
	})
	.on('click', '.js_tab-close', closeContent);



