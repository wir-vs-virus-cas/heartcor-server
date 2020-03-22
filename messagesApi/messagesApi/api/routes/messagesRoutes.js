'use strict';

module.exports = function(app) {
  var audio = require('../controllers/messagesController');

  app.route('/')
    .get(audio.welcome);

  app.route('/audio')
    .get(audio.list_all_audio)
    .post(audio.create_audio);


  app.route('/audio/:audioId')
    .get(audio.get_audio)
    .put(audio.update_audio)
    .delete(audio.delete_audio);

    app.route('/msg')
       .get(audio.getMessage)
       .post(audio.postMessage);

};
