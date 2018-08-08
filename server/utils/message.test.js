const expect = require('expect');

const {generateMessage} = require('./message');

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