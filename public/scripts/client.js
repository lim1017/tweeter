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
    // console.log(this.val())
    // console.log( $(this).serialize() );

    /////
      $.ajax({
        url:`/tweets`,
        type: 'POST',
        data: $(this).serialize()
      })
      .then(response => {

        console.log('then after request')

      })
    ////
      

  })


  renderTweets(defaultTweets);
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
    $(".tweet-container").append(createTweetElement(element));
  });
}

function convertDate(longDate) {
  // new Date(longDate.getTime())
  const datetime = new Date(0);
  datetime.setUTCSeconds(longDate.risetime);

  console.log(datetime);

  return datetime;
}

let defaultTweets = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: "SuperBob",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@Bob"
    },
    content: {
      text: "I am Bob"
    },
    created_at: 1461113959088
  }
];
