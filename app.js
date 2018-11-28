const AWS = require('aws-sdk'); 
const {exec} = require('child_process');
const {promisify} = require('util');
const deviceId = 'pi';

AWS.config.loadFromPath('./config.json');

const dynamodb = new AWS.DynamoDB();

const tableName = 'isaax';

setInterval(async () => {
  const {stdout, stderr} = await promisify(exec)('vcgencmd measure_temp');
  const temp = parseFloat(stdout.replace(/temp=([0-9\.]*)'C/, '$1'));
  const params = {
    TableName: tableName,
    Item: {
      device : {S: deviceId},
      value: {N: temp.toString()},
      timestamp: {N: Date.now().toString()},
      id: {S: Date.now().toString()}
    }
  };
  /*
  dynamodb.putItem(params).promise()
    .then((err, data) => {
      if (err) {
        console.error(err);
      }
    });
  */
}, 5000);
