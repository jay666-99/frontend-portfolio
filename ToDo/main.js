//..load from local storage
$(window).on("unload", function(e) {
  localStorage.setItem("list", $("ul").html());
});

let d=new Date();
let x=document.getElementById('day');
let y=d.getDay();
switch(y){
  case 1:x.innerHTML="Monday";break;
  case 2:x.innerHTML="Teusday";break;
  case 3:x.innerHTML="Wednesday";break;
  case 4:x.innerHTML="Thursday";break;
  case 5:x.innerHTML="Friday";break;
  case 6:x.innerHTML="Saturday";break;
  case 7:x.innerHTML="Sunday";break;
}

  $(document).ready(function(){
	$('#add').click(function(){
	var text=$('#text').val();
    if(text!=''){
      $('#text').val("");
      $('.list').append('<li><span>'+text+'</span><i class="fa fa-trash">X</i></li>');
       $('#list').trigger(e);   }
	});


//.. setting up localStorage
$(document).ready(function(){
  if ($("ul").text() == ""){
    $(this).html("<li></li>");
  }
  $("ul").focus();
  if (localStorage.getItem("list") != ""){
    $("ul").html(localStorage.getItem("list"));
}});

	$('.list').on('click','i',function(){
		$(this).parent().fadeOut(400,function(){
			$(this).remove();
		});
	});


  $('ul').on('click','span',function(){
    $(this).toggleClass('complete');
  });
});

    $(document).bind('keypress', function(e){
  if(e.which === 13) { // return
     $('#add').trigger('click');
  }
});



