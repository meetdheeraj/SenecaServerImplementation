'use strict'

 var Seneca = require('seneca')
 var Express = require('express')
 var Web = require('seneca-web')

 var Routes = [{
     prefix: '/writeAnything',
     pin: 'role:someRole,cmd:*',
     map: {
          home: {GET: true}
          }
     }]
 var seneca = Seneca()

 var config = {
     routes: Routes,
     adapter: require('seneca-web-adapter-express'),
     context: Express()
 }

 seneca.client()
.use(Web, config)
.ready(() => {
    var server = seneca.export('web/context')()
    server.listen('4000', () => {
        console.log('access on: 4000')
    })
})

 seneca.add({role: 'someRole',cmd:'home'}, function(args, done) {
     done(null, {response:"Hello Friend!"});
     });