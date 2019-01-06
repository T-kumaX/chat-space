$(function(){
  function buildHTML(message){

    var image = message.image.url == null ? `` : `<div class="message__image-box" style="width: 150px; height: 150px; object-fit: contain;"><div class="main__contents__content--image" style="width: 150px; height: 150px; object-fit: contain;"><img src="${message.image.url}" class="main__contents__content--image"></div></div>`;
    var messages = message.content == null ? `` : `${message.content}`;

        var html = `<div class="main__contents__content" data-message-id = "${message.id}" >
                      <div class="main__contents__content--name" style="font-weight: bold; font-size: 16px; color: #434A54; float: left;">
                          ${message.user_name}
                      </div>
                      <div class="main__contents__content--date" style="font-size: 12px; line-height: 24px; color: #999999; float: left; margin-left: 10px;">
                          ${message.created_at}
                      </div>
                      <div class="main__contents__content--text" style="padding-top: 34px; font-size: 14px;">
                          ${messages}
                      </div>
                          ${image}
                    </div>`
        return html;
  }

  function animateScroll(){
    $('.main__contents').animate({scrollTop:$('.main__contents')[0].scrollHeight});
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__contents').append(html);
      $('#new_message')[0].reset();
      animateScroll();
      html.disabled = false;
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
    $(".main__bottom__form--submit").removeAttr("disabled");
    });
  });

  var interval = setInterval(function() {
      var last_id = ($('.main__contents__content')[0]) ? $('.main__contents__content:last').data('message-id') : 0;
      $.ajax({
        type: 'GET',
        url: location.href,
        data: { last_id: last_id },
        dataType: 'json'
      })
      .done(function(json) {
        var insertHTML = '';
        json.messages.forEach(function(message) {
            insertHTML += buildHTML(message);
        });
        $('.main__contents').append(insertHTML);
        insertHTML.disabled = false;
      })
      .fail(function(json) {
        insertHTML.disabled = false;
      });
  } , 5000 );
});
