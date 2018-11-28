$(() => {
  let t = 0;
  const chart = $('#area').epoch({
    type: 'time.line',
    data: [{
      label: 'pi',
      values: []
    }],
    axes: 'right'
  });
  setInterval(async () => {
    const data = await $.ajax({
      url: `/data.json?t=${t}`
    })
    for (const item of data.Items) {
      if (t < item.timestamp) {
        t = item.timestamp;
        chart.push([{
          time: parseInt(item.timestamp / 1000),
          y: item.value
        }]);
      }
    }
  }, 5000);
});
