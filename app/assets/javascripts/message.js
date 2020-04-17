$(function(){
  function buildHTML(message){
    if (message.image){
      var html = 
      `<div class="messages">
      <div class="message-items">
        <div class="message-items__contents">
          <div class="message-items__contents--name">
            ${message.user_name}
          </div>
          <div class="message-items__contents--date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-items__text">
          ${message.content}
        </div>
        <img class="message-items__image" src="${message.image}" alt="P sin">
      </div>
      </div>`
    } else {
      var html = 
     `<div class="messages">
      <div class="message-items">
        <div class="message-items__contents">
          <div class="message-items__contents--name">
            ${message.user_name}
          </div>
          <div class="message-items__contents--date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-items__text">
          ${message.content}
        </div>
      </div>
      </div>`
    }
    return html;
  }
    
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
});