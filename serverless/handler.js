'use strict';

const AWS = require('aws-sdk');

module.exports.connect = (event, context, cb) => {
  cb(null, {
    statusCode: 200,
    body: 'Connected.'
  });
};

module.exports.disconnect = (event, context, cb) => {
  cb(null, {
    statusCode: 200,
    body: 'Disconnected.'
  });
};

module.exports.default = async (event, context, cb) => {
  cb(null, {
    statusCode: 200,
    body: 'Sent.'
  });
};

module.exports.order = async (event, context, cb) => {
  const sfn = new AWS.StepFunctions({apiVersion: '2016-11-23'});
  await sfn
  .startExecution({
    stateMachineArn: `arn:aws:states:us-west-2:${context.invokedFunctionArn.split(':')[4]}:stateMachine:orderStateMachine-${process.env.SLS_SERVICE}-${process.env.SLS_STAGE}`,
    input: JSON.stringify({
      connectionId: event.requestContext.connectionId,
      endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`})
  })
  .promise();

  cb(null, {
    statusCode: 200,
    body: 'Sent.'
  });
};
