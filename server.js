const AWS = require('aws-sdk'); 
const {promisify} = require('util');
const deviceId = 'pi';
const config = require('./config');
const dynamo = new AWS.DynamoDB.DocumentClient(config);
const tableName = 'isaax';

const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'));

app.get('/data.json', async (req, res) => {
  console.log(req.query);
  try {
    const items = await getItem(req.query.t);
    console.log(items);
    res.send(items)
  } catch (e) {
    console.log(e);
  }
});

const getItem = (t) => {
    return new Promise((res, rej) => {
      const params = {
        TableName : tableName,
        FilterExpression : "#ts > :val",
        ExpressionAttributeValues : {":val" : parseInt(t)},
        ExpressionAttributeNames: {
          '#ts' : 'timestamp'
        }
      };
      console.log(params)
      dynamo.scan(params, (err, data) => {
        if (err) {
          console.log(err);
          return rej(err);
        }
        res(data);
      });
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
