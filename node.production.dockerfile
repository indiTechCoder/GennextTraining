FROM node:4-onbuild
# replace this with your application's default port
EXPOSE 8888
CMD [ "npm", "start" ]

