$(function(){
  function buildHTML(message){
    if (message.image){
      var html = 
      `<div class="messages" data-message-id=${message.id}>
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
     `<div class="messages" data-message-id=${message.id}>
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.messages:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});