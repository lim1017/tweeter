$(document).ready(function() {

  $(".text-box").on('keydown', function(e) {
    // console.log(e.key); 
    // console.log(this.value.length)

    let txtLength=this.value.length
    let counter=msgLength(txtLength)

    if(counter < 0){
      $('.counter').addClass('text2Long')
    }else{
      $('.counter').removeClass('text2Long')
    }


    // document.getElementById('counter').innerHTML = counter;
    $(".counter").text(counter);



  });

  

});


const msgLength = function (txtLength){
  return 140-txtLength
}


// document.addEventListener("keypress", (event) => {
//   console.log(event);
// });

    