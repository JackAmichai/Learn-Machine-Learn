const tf = require('@tensorflow/tfjs');

const model = tf.sequential();
model.add(tf.layers.dense({units: 10, inputShape: [5]}));

const input = tf.randomNormal([100, 5]);

console.time('dataSync');
model.predict(input).dataSync();
console.timeEnd('dataSync');

console.time('data');
model.predict(input).data().then(() => {
  console.timeEnd('data');
});
