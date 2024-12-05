const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
const classifyImage = async (model, image) => {
  try {
    const tensor = tf.node.decodeJpeg(image._data).resizeNearestNeighbor([224, 224]).expandDims().toFloat();
    const predictions = model.predict(tensor)
    const score = await predictions.data()
    return score[0] > 0.5 ? 'Cancer' : 'Non-cancer';
  } catch (error) {
    console.error('Error during image classification:', error);
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
};
module.exports = { classifyImage };