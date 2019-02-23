'use strict';

const AWS = require('aws-sdk');

module.exports.postToConnection = async (endpoint, connectionId, data) => {
  const client = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: endpoint
  });

  await client
    .postToConnection({
      ConnectionId: connectionId,
      Data: data
    })
    .promise();
}
