const AWS = require('aws-sdk'); 
const {exec} = require('child_process');
const {promisify} = require('util');
const deviceId = 'pi';

AWS.config.loadFromPath('./config.json');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'isaax';

setInterval(async () => {
  try {
    const params = {
      TableName: tableName,
      Item: {
        device : deviceId,
        value: 50,
        timestamp: Date.now(),
        id: Date.now().toString()
      }
    };
    const {stdout, stderr} = await promisify(exec)('vcgencmd measure_temp');
    const temp = parseFloat(stdout.replace(/temp=([0-9\.]*)'C/, '$1'));
    const data = await promisify(dynamodb.put)(params);
    console.log(data);
  } catch (e) {
    console.log(e)
  }
}, 5000);
