const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const text = 'test';
    const from = 'test';
    const result = generateMessage(from, text);

    expect(result.text).toBe(text);
    expect(result.from).toBe(from);
    expect(result.createAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    const latitude = 1;
    const longitude = 1;
    const from = 'test';
    const result = generateLocationMessage(from, latitude, longitude);

    expect(result.from).toBe(from);
    expect(result.url).toBe('https://www.google.com/maps?q=1,1')
    expect(result.createAt).toBeA('number');
  });
});