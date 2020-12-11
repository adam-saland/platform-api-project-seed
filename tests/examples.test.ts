const { spawn } = require('child_process');
const fs = require('fs');

describe('bootstrap examples', () => {
  it('should be able to create all of the examples', (done) => {

    const example = spawn('node', [
      'dist/index.js',
      'create-openfin-app',
    ]);

    const chunks = [];

    example.stdout.on('data', (chunk) => {

      chunks.push(chunk);

    });

    example.stdout.on('end', () => {
      const output = Buffer.concat(chunks).toString();
      expect(output).toBe('tupni-tset\n');
      done();

    });
  })


})