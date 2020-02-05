# Egitim

> This app created by Nuxt.js. 

That project like little bit a quiz, or election or poll. Lets suppose that you join a summit. There are about 100 people at summit. Moderator or speaker can want to ask any question to them and he wants to look at avarage of sum. How does he doing that? How can they answer questions what moderator asked?

Participants join a website by write some own information (name, surname). Moderators can send any questions to all participants's phone at what ever want. Participants can answer it what moderator asked. And than, moderator can see result of question. This system can use at council, parliament and any summit. 

I used:

websocket
mongodb - mongoose
element-ui
cookie-universal-nuxt

You can create quiz of event, question, user. If you started any event, it will have created auto sub url.

> For example: www.domain.com/254fe

![login screen](https://i.hizliresim.com/odD6Do.png)

Question screen: Client give answer to question.
![question screen](https://i.hizliresim.com/7B0ylv.png)

Answer screen: System give answer of all clients or event clients
![answer screen](https://i.hizliresim.com/YdXOYz.png)

Clients enter to that url, system want to some information then client waits any question. All client took same question, client can answer the question.


## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
