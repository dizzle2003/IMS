FROM node:current-stretch

WORKDIR /usr/src/ims

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]