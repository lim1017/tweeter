/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(".tweet-container").hover(
    function() {
      $(this).addClass("tweet-shadow");
    },
    function() {
      $(this).removeClass("tweet-shadow");
    }
  );


  $(".submitBox").on('submit', function(e){
    
    e.preventDefault()
    console.log($(this).serialize())
    
    /////
      $.ajax({
        url:`/tweets`,
        type: 'POST',
        data: $(this).serialize()  //the data in the tweet fourm.
      })
      .then(response => {
        loadtweets()
      })
    ////
      

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
    <p>${tweetObj.content.text}</p>
    <footer>${new Date(tweetObj.created_at)}</footer>
  </article>
  `;
  return htmlTweet;
}

function renderTweets(tweetArr) {
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
