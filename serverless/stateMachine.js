'use strict';

const apiws = require('apiws');

module.exports.start = async (event, context, cb) => {

  await apiws.postToConnection(
    event.endpoint,
    event.connectionId,
    JSON.stringify({state: 'started'})
  );

  cb(null, true);
};

module.exports.credit = async (event, context, cb) => {
  const number =  Math.floor(Math.random() * 10)
  await new Promise(resolve => setTimeout(resolve, number * 500));
  if (number > 1) {
    await apiws.postToConnection(
      event.endpoint,
      event.connectionId,
      JSON.stringify({state: 'success', msg: 'Payment succeeded.'})
    );
    cb(null, true);
  } else {
    cb(new Error('Payment not allowed.'));
  }
};

module.exports.stock = async (event, context, cb) => {
  const number =  Math.floor(Math.random() * 10)
  await new Promise(resolve => setTimeout(resolve, number * 500));
  if (number > 1) {
    await apiws.postToConnection(
      event.endpoint,
      event.connectionId,
      JSON.stringify({state: 'success', msg: 'Reserved.'})
    );
    cb(null, true);
  } else {
    cb(new Error('The product is not in stock.'));
  }
};

module.exports.email = async (event, context, cb) => {
  const number =  Math.floor(Math.random() * 10)
  await new Promise(resolve => setTimeout(resolve, number * 500));
  if (number > 1) {
    await apiws.postToConnection(
      event.endpoint,
      event.connectionId,
      JSON.stringify({state: 'success', msg: 'Sent.'})
    );
    cb(null, true);
  } else {
    cb(new Error('The e-mail could not be sent because there are no recipients.'));
  }
};

module.exports.error = async (event, context, cb) => {
  const err = JSON.parse(event.errorMsg.Cause);
  await apiws.postToConnection(
    event.endpoint,
    event.connectionId,
    JSON.stringify({state: 'error', msg: err.errorMessage})
  );

  cb(null, true);
};

module.exports.finish = async (event, context, cb) => {

  await apiws.postToConnection(
    event.endpoint,
    event.connectionId,
    JSON.stringify({state: 'finished'})
  );

  cb(null, true);
};
