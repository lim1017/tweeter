/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //hover effect on tweet container
  $(".tweet-container").hover(
    function() {
      $(this).addClass("tweet-shadow");
    },
    function() {
      $(this).removeClass("tweet-shadow");
    }
  );


  //when click on submit box
  $(".submitBox").on('submit', function(e){
    
    e.preventDefault()

    if($(this).serialize()==='text='){
      $('.notext').addClass('notextShow')
    } else if($(this).serialize().length>145){
      $('.text2long').addClass('text2longShow')
    }
    else{
      $('.notext').removeClass('notextShow')
      $.ajax({
        url:`/tweets`,
        type: 'POST',
        data: $(this).serialize()  //the data in the tweet fourm.
      })
      .then(response => {
        $(".submitBox").trigger('reset');  //clears the msg box 
        loadtweets()
      })
    }
  
  })

  //toggle nav bar button
  $(".toggleTweet").on('click', function(e){

    $( ".new-tweet" ).slideToggle('slow');
        
  })


});



function createTweetElement(tweetObj) {
  const htmlTweet = `

  <article class="postedTweet">
    <div class="postedTweetHeader">
      <img src=${tweetObj.user.avatars}>
      <span class="username"><strong>${tweetObj.user.name}</strong></span>   
      <span class="handle"><strong>${tweetObj.user.handle}</strong></span>
    </div>
    <p>${escapeTxt(tweetObj.content.text)}</p>
    <footer>${new Date(tweetObj.created_at)}</footer>
  </article>
  `;
  return htmlTweet;
}

function renderTweets(tweetArr) {
  $('.tweet-container').empty()
  tweetArr.forEach(element => {
    $(".tweet-container").prepend(createTweetElement(element));
  });
}


function loadtweets(){
  $.ajax({
    url:`/tweets`,
    type: "GET",
    
  }).then(response => {
    renderTweets(response)
  })
    
}

function convertDate(longDate) {
  // new Date(longDate.getTime())
  const datetime = new Date(0);
  datetime.setUTCSeconds(longDate.risetime);

  console.log(datetime);

  return datetime;
}

const escapeTxt =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
