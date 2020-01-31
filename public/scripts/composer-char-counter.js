$(document).ready(function() {

  $(".text-box").on('input', function(e) {

    console.log(this.style.height)


    //shrink and grow the text box
    this.style.height= 5+ 'px'
    this.style.height=this.scrollHeight + 'px'
   
    let txtLength=this.value.length
    let counter=msgLength(txtLength)

   if(counter<140){
    $('.error-container').empty()
   }

    if(counter < 0){
      $(".error-container").html(noTextOrTolongError(false, true));
      $(".counter").addClass('text2Red')
    }else{
      $('.error-container').empty()
      $(".counter").removeClass('text2Red')

    }

    $(".counter").text(counter); // displays the counter in html
    
  });

});


const msgLength = function (txtLength){
  return 140-txtLength
}


    