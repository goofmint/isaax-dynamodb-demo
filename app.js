const AWS = require('aws-sdk'); 
const {exec} = require('child_process');
const {promisify} = require('util');
const deviceId = 'pi';

AWS.config.loadFromPath('./config.json');

const dynamodb = new AWS.DynamoDB();

const tableName = 'isaax';

setInterval(async () => {
  const params = {
    TableName: tableName,
    Item: {
      device : {S: deviceId},
      value: {N: "50"},
      timestamp: {N: Date.now().toString()},
      id: {S: Date.now().toString()}
    }
  };
  const {stdout, stderr} = await promisify(exec)('vcgencmd measure_temp');
  const temp = parseFloat(stdout.replace(/temp=([0-9\.]*)'C/, '$1'));
  dynamodb.putItem(params).promise()
    .then((err, data) => {
      console.log(data);
    });
}, 5000);
