$(document).ready(function() {

  $(".text-box").on('input', function(e) {
   
    let txtLength=this.value.length
    let counter=msgLength(txtLength)

   if(counter<140){
    $('.error-container').empty()
   }


    if(counter < 0){
      $(".error-container").html(noTextOrTolongError(false, true));
      $(".counter").addClass('text2long')
    }else{
      $('.error-container').empty()
    }

    $(".counter").text(counter); // displays the counter in html
    
  });

  

});


const msgLength = function (txtLength){
  return 140-txtLength
}


    