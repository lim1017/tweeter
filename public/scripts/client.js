/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  loadtweets();

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
  $(".submitBox").on("submit", function(e) {
    e.preventDefault();

    $(".text-box").css("height", "30px");

    if ($(".text-box").val() === "") {
      $(".error-container").html(noTextOrTolongError(true, false)); //no text error is true,  to long error is false
    } else if ($(".text-box").val().length > 140) {
      $(".error-container").html(noTextOrTolongError(false, true)); //no text error is true,  to long error is false

      $(".text2long").addClass("text2Red");
    } else {
      $.ajax({
        url: `/tweets`,
        type: "POST",
        data: $(this).serialize() //the data in the tweet fourm.
      }).then(response => {
        $(".submitBox").trigger("reset"); //clears the msg box
        loadtweets();
        $(".counter").text(140); //sets counter to 140 after submit
      });
    }
  });

  //toggle nav bar button
  $(".toggleTweet").on("click", function(e) {
    $(".new-tweet").slideToggle("slow");

    $(".text-box").focus();
  });

  //on scroll event trigger
  $(window).scroll(function() {
    $(".back2Top").addClass("showButton");
    $(".toggleTweet").addClass("removeTweetButton");

    if ($(window).scrollTop() === 0) {
      $(".back2Top").removeClass("showButton");
      $(".toggleTweet").removeClass("removeTweetButton");
      $(".new-tweet").slideDown();
    }
  });

  //button scroll to top
  $(".back2Top").on("click", function(e) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
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
        <footer class='foot'><div>${moment(tweetObj.created_at)
          .startOf("minute")
          .fromNow()}</div> <div> 👍🏽 🚓 👎🏽</div></footer>

  </article>
  `;
  return htmlTweet;
}

function renderTweets(tweetArr) {
  $(".tweet-container").empty();
  tweetArr.forEach(element => {
    $(".tweet-container").prepend(createTweetElement(element));
  });
}

function loadtweets() {
  $.ajax({
    url: `/tweets`,
    type: "GET"
  }).then(response => {
    renderTweets(response);
  });
}

const escapeTxt = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function noTextOrTolongError(noText, toLong) {
  //only one can be true, other will be false.
  let html;

  if (noText) {
    html = `<span class='notext'>Enter a Tweet!</span>`;
  } else if (toLong) {
    html = `<span class='text2long'>Tweet Too Long!</span>`;
  }

  return html;
}
