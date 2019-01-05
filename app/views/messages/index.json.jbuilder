json.messages @new_messages.each do |message|
json.user_name     message.user.name
json.created_at     format_posted_time(message.created_at)
json.id       message.id
json.content  message.content
json.image    message.image
end
