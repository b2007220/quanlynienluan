Khởi tạo website
client:
    tạo file env.local theo mẫu
    cd client
    npm run dev
server:
    tạo file env. theo mẫu
    cd server
    npm run dev

Kích hoạt rasa chatbot
rasa train --config bert.yml

rasa run --cors "*" --enable-api

rasa run actions --action actions --debug
