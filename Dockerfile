FROM node:latest

# Attempt 1
# RUN addgroup --system app && adduser --system app && adduser app app
# USER app

# Attempt 2
# RUN useradd -rm -d /home/uweb -s /bin/bash -g root -G sudo -u 1001 uweb
# RUN chown -R uweb:root /home/uweb
# USER uweb

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]