import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Bootstrap examples', () => {
  const EXAMPLES: string[] = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'dist', 'examples'));

  it('should be able to create an example', (done) => {

    const example = spawn('node', [
      'dist/index.js',
      'create-openfin-app',
      '-e',
      EXAMPLES[0]
    ]);

    const chunks: Buffer[] = [];

    example.stdout.on('data', (chunk) => {
      chunks.push(chunk);
    });

    example.stdout.on('end', async () => {
      const output = Buffer.concat(chunks).toString();
      const exampleDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'dist', 'examples', EXAMPLES[0]));
      const createdExampleDirPath = path.join(path.normalize(__dirname + '/..'), EXAMPLES[0])
      const createdExampleDir = fs.readdirSync(createdExampleDirPath);

      expect(createdExampleDir).toEqual(exampleDir);

      await new Promise(resolve => rimraf(createdExampleDirPath, resolve));

      done();
    });
  })

  it('should be able to create an example with a custom project name', (done) => {

    const projectName = 'my-project';

    const example = spawn('node', [
      'dist/index.js',
      'create-openfin-app',
      '-e',
      EXAMPLES[0],
      projectName
    ]);

    const chunks: Buffer[] = [];

    example.stdout.on('data', (chunk) => {
      chunks.push(chunk);
    });

    example.stdout.on('end', async () => {
      const output = Buffer.concat(chunks).toString();
      const exampleDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'dist', 'examples', EXAMPLES[0]));
      const createdExampleDirPath = path.join(path.normalize(__dirname + '/..'), projectName)
      const createdExampleDir = fs.readdirSync(createdExampleDirPath);

      expect(createdExampleDir).toEqual(exampleDir);

      await new Promise(resolve => rimraf(createdExampleDirPath, resolve));

      done();
    });
  })

  it('should be able to create all of the examples', (done) => {
    EXAMPLES.forEach(e => {
      const example = spawn('node', [
        'dist/index.js',
        'create-openfin-app',
        '-e',
        e
      ]);

      const chunks: Buffer[] = [];

      example.stdout.on('data', (chunk) => {
        chunks.push(chunk);
      });

      example.stdout.on('end', async () => {
        const output = Buffer.concat(chunks).toString();
        const exampleDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'dist', 'examples', e));
        const createdExampleDirPath = path.join(path.normalize(__dirname + '/..'), e)
        const createdExampleDir = fs.readdirSync(createdExampleDirPath);

        expect(createdExampleDir).toEqual(exampleDir);
        await new Promise(resolve => rimraf(createdExampleDirPath, resolve));
      });

    })

    done();
  })

})