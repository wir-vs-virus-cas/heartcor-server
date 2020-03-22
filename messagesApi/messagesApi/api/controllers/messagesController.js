'use strict';


var mongoose = require('mongoose'),
AudioFile = mongoose.model('AudioFiles');

 var amqp = require('amqplib/callback_api');
  const CONN_URL = 'amqp://node:node@localhost:5672//';

  let ch = null;
  amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
  });
});

exports.welcome = function(req, res) {
    res.status(200).send('Welcome to the <3Cor Server');
}

exports.list_all_audio = function(req, res) {
  AudioFile.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_audio = function(req, res) {
  var new_audio = new AudioFile(req.body);
  new_audio.save(function(err, audio) {
    if (err)
      res.send(err);
    res.json(audio);
  });
};

exports.get_audio = function(req, res) {
  AudioFile.findById(req.params.audioId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_audio = function(req, res) {
  AudioFile.findOneAndUpdate({_id: req.params.audioId}, req.body, {new: true}, function(err, audio) {
    if (err)
      res.send(err);
    res.json(audio);
  });
};

exports.delete_audio = function(req, res) {
  AudioFile.remove({
    _id: req.params.audioId
  }, function(err, audio) {
    if (err)
      res.send(err);
    res.json({ message: 'Audio successfully deleted' });
  });
};

exports.getMessage = function(req, res) {
  let {queueName} = req.body;
  res.status(200).json({ message:  consumeMessages(queueName) });
}

exports.postMessage = function(req, res) {
  let { queueName, payload } = req.body;
  publishToQueue(queueName, payload);
  res.status(200).json({ message: 'Message successfully sent' });
}

const consumeMessages = async (queueName) => {
  ch.consume(queueName, function (msg) {
    console.log('.........');
    console.log("Message:", msg.content.toString());
  }, {noAck: true});
}

const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, new Buffer(data));
 }