$(function(){
  function appendProduct(user_id, user_name) {
    var html = `<div class='chat-group-user'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add add-btn" data_user_id="${user_id}" data_user_name="${user_name}">追加</a>
                </div>`
    return html;
  }
  function appendNoproduct(user_id, user_name) {
    var html = `<div class='chat-group-user'>
                  <p class='chat-group-user__name'>空欄が入力されました</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add add-btn" data_user_id="" data_user_name=""></a>
                </div>`
    return html;
  }
  function buildHTML(user_id, user_name){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove remove-btn" data_user_id="${user_id}" data_user_name="${user_name}">削除</a>
                </div>`
    return html;
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
         var user_id = user.id
         var user_name = user.name
         var html = appendProduct(user_id, user_name);
         $('#user-search-result').append(html);
        });
      }
      else {
        appendNoproduct("ユーザーネームが存在しません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on('click','.add-btn', function(e){
    e.preventDefault();
    var user_id = $(this).attr('data_user_id');
    var user_name = $(this).attr('data_user_name');
    var html = buildHTML(user_id, user_name);
    $('.add-user').append(html);
    $(this).parent().remove();
  });
  $(document).on('click','.remove-btn', function(e){
    e.preventDefault();
    var user_id = $(this).attr('data_user_id');
    var user_name = $(this).attr('data_user_name');
    var html = appendProduct(user_id, user_name);
    $('#user-search-result').append(html);
    $(this).parent().remove();
  });
});
