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

      <p>${tweet.content.text}</p>

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
    if(content.length === 0 ) {
      alert("No tweet content present!");
    } else if(content.length > 140) {
      alert("Tweet content too long!");
    } else {
      $.post("/tweets", msg);
    }
  });
});