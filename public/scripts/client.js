/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

// return a string with escaped unsafe characters
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// generate individual tweet
const createTweetElement = function(tweet) {
  let $tweet = $(`
    <article>
      <div class="header">
        <div class="avatarsName">
          <img src=${tweet.user.avatars}>
          <span></span>
          <div> ${tweet.user.name} </div>
        </div>
        <div class="accountName"> ${tweet.user.handle} </div>
      </div>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <div class="date"> ${timeago.format(tweet.created_at)}</div>
        <div class="socialIcon">
          <i class="fa-regular fa-star icon"></i>
          <i class="fa-regular fa-share-from-square icon"></i>
          <i class="fa-regular fa-thumbs-up icon"></i>
        </div>
      </footer>
    </article>
  `);
  
  return $tweet;
};

$(document).ready(function() {
  const loadTweets = function() {
    $.get("/tweets")
      .done(function(data) {
        renderTweets(data);
      })
      .fail(function(xhr, status, error) {
        console.log("Error getting tweets: " + error);
      });
  };

  loadTweets();

  $("form").on("submit", function(event) {
    event.preventDefault();
    const tweetText = $("#tweet-text").val();
    // form validation
    if (!tweetText) {
      $("#error").slideDown();
      $("#error").html('<i class="fa-solid fa-triangle-exclamation"></i> Mindreader function under construction (No content present) ');
      return;
    }
    
    if ((tweetText.length) > 140) {
      $("#error").slideDown();
      $("#error").html('<i class="fa-solid fa-triangle-exclamation"></i> So much to say not much space (max 140 characters)');
      return;
    }
    // send POST request to server
    const msg = $(this).serialize();
    $.post("/tweets", msg)
      .done(function(response) {
        loadTweets();
        $("#tweet-text").val("");
        $(".counter").text("140");
        $("#error").hide();
      })
      .fail(function(xhr, status, error) {
        console.log("Error sending tweet: " + error);
      });
  });
});