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

// Return a string with escaped unsafe characters
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Generate individual tweet
const createTweetElement = function(tweet) {
  let $tweet = $(`
    <article>
      <div class="header">
        <div class="avatarsName">
          <img src=${tweet.user.avatars}>
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
  console.log("document ready");
  
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

  $("form").on("submit", function(event) {
    event.preventDefault();
    const msg = $(this).serialize();
    const content = msg.substring(5);
    if (content.length === 0) {
      $("#error").show();
      $("#error").html('<i class="fa-solid fa-triangle-exclamation"></i> Tweet must have content');
    } else if (content.length > 140) {
      $("#error").show();
      $("#error").html('<i class="fa-solid fa-triangle-exclamation"></i> Too long, maximum 140 characters');
    } else {
      $.post("/tweets", msg)
        .done(function(response) {
          loadTweets();
          $("#tweet-text").val("");
          $(".counter").text("140");
          $("#error").hide();
        });
    }
  });
});