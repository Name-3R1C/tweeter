/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
        <div class="date"> ${tweet.created_at}</div>
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
  
  renderTweets(data);
  $("form").on("submit", function(event) {
    event.preventDefault();
    const tweetContent = $(this).serialize();
    console.log(tweetContent);
    $.post("/tweets", tweetContent);
  });
});