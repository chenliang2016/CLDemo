# FROM node:alpine

# ADD . /payconfig/
# #进入到app目录下面，类似cd
# WORKDIR /payconfig

# RUN npm install

# RUN npm run build

# RUN ls /payconfig/build

FROM nginx
WORKDIR /build
EXPOSE 80
COPY  /build /usr/share/nginx/html
COPY /nginx/default.conf /etc/nginx/conf.d