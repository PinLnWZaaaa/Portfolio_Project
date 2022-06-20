FROM node:16-alpine

# create workspace
WORKDIR /usr/src/app

# app dependencies
COPY package*.json ./
RUN npm install 

# copy source code and env
COPY . ./

# npm build
RUN npm run build

# EXPOSE 80

# start app
CMD ["npm", "run", "start:prod"]


# to run this dockerfile #
  # cd backend
  # docker build -t backend .
  # docker run -it -p 80:80 backend
