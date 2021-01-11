import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Bootstrap templates', () => {
  const TEMPLATES: string[] = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'templates'));

  it('should be able to create templates', (done) => {

    const template = spawn('node', [
      'dist/index.js',
      '-t',
      TEMPLATES[0]
    ]);

    const chunks: Buffer[] = [];

    template.stdout.on('data', (chunk) => {
      chunks.push(chunk);
    });

    template.stdout.on('end', async () => {
      const output = Buffer.concat(chunks).toString();
      const templateDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'templates', TEMPLATES[0]));
      const createdTemplateDirPath = path.join(path.normalize(__dirname + '/..'), TEMPLATES[0])
      const createdTemplateDir = fs.readdirSync(createdTemplateDirPath);

      expect(createdTemplateDir).toEqual(templateDir);

      new Promise(resolve => rimraf(createdTemplateDirPath, resolve)).then(done);
    });
  })

  it('should be able to create a template with a custom project name', (done) => {
    const projectName = 'my-project';

    const template = spawn('node', [
      'dist/index.js',
      '-t',
      TEMPLATES[0],
      projectName
    ]);

    const chunks: Buffer[] = [];

    template.stdout.on('data', (chunk) => {
      chunks.push(chunk);
    });

    template.stdout.on('end', async () => {
      const output = Buffer.concat(chunks).toString();
      const templateDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'templates', TEMPLATES[0]));
      const createdTemplateDirPath = path.join(path.normalize(__dirname + '/..'), projectName)
      const createdTemplateDir = fs.readdirSync(createdTemplateDirPath);

      expect(createdTemplateDir).toEqual(templateDir);

      new Promise(resolve => rimraf(createdTemplateDirPath, resolve)).then(done)
    });
  })

  it('should be able to create all of the templates', (done) => {
    TEMPLATES.forEach(t => {
      const template = spawn('node', [
        'dist/index.js',
        '-t',
        t
      ]);

      const chunks: Buffer[] = [];

      template.stdout.on('data', (chunk) => {
        chunks.push(chunk);
      });

      template.stdout.on('end', async () => {
        const output = Buffer.concat(chunks).toString();
        const templateDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'templates', t));
        const createdTemplateDirPath = path.join(path.normalize(__dirname + '/..'), t)
        const createdTemplateDir = fs.readdirSync(createdTemplateDirPath);

        expect(createdTemplateDir).toEqual(templateDir);
        new Promise(resolve => rimraf(createdTemplateDirPath, resolve)).then(done);
      });

    })

    done();
  })

  it('should error if the template dir already exists', (done) => {
    const template = spawn('node', [
      'dist/index.js',
      '-t',
      TEMPLATES[0]
    ]);

    const chunks: Buffer[] = [];

    template.stdout.on('data', (chunk) => {
      chunks.push(chunk);
    });

    template.stdout.on('end', async () => {
      const output = Buffer.concat(chunks).toString();
      const templateDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'templates', TEMPLATES[0]));
      const createdTemplateDirPath = path.join(path.normalize(__dirname + '/..'), TEMPLATES[0]);
      const createdTemplateDir = fs.readdirSync(createdTemplateDirPath);

      // expect(createdTemplateDir).toEqual(templateDir);
      const retryTemplate = spawn('node', [
        'dist/index.js',
        '-t',
        TEMPLATES[0]
      ]);

      const retryChunks: Buffer[] = [];

      retryTemplate.stdout.on('data', (chunk) => {
        retryChunks.push(chunk);
      });

      retryTemplate.stdout.on('end', async () => {
        const output = Buffer.concat(chunks).toString();
        console.log(output);
        const templateDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'templates', TEMPLATES[0]));
        const createdTemplateDirPath = path.join(path.normalize(__dirname + '/..'), TEMPLATES[0])
        const createdTemplateDir = fs.readdirSync(createdTemplateDirPath);

        let pass = output.includes('exists');

        expect(pass).toEqual(true);

        new Promise(resolve => rimraf(createdTemplateDirPath, resolve)).then(done);
        done();
      });

    });
  })

})