json.id @message.id
json.content @message.content
json.created_at @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
json.image @message.image
json.user_name @message.user.name
