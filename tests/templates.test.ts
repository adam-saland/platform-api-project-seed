import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Bootstrap templates', () => {
  const TEMPLATES: string[] = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'dist', 'TEMPLATES'));

  it('should be able to create an templates', (done) => {

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
      const templateDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'dist', 'templates', TEMPLATES[0]));
      const createdTemplateDirPath = path.join(path.normalize(__dirname + '/..'), TEMPLATES[0])
      const createdTemplateDir = fs.readdirSync(createdTemplateDirPath);

      expect(createdTemplateDir).toEqual(templateDir);

      await new Promise(resolve => rimraf(createdTemplateDirPath, resolve));

      done();
    });
  })

  it('should be able to create an template with a custom project name', (done) => {

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
      const templateDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'dist', 'templates', TEMPLATES[0]));
      const createdTemplateDirPath = path.join(path.normalize(__dirname + '/..'), projectName)
      const createdTemplateDir = fs.readdirSync(createdTemplateDirPath);

      expect(createdTemplateDir).toEqual(templateDir);

      await new Promise(resolve => rimraf(createdTemplateDirPath, resolve));

      done();
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
        const templateDir = fs.readdirSync(path.join(path.normalize(__dirname + '/..'), 'dist', 'templates', t));
        const createdTemplateDirPath = path.join(path.normalize(__dirname + '/..'), t)
        const createdTemplateDir = fs.readdirSync(createdTemplateDirPath);

        expect(createdTemplateDir).toEqual(templateDir);
        await new Promise(resolve => rimraf(createdTemplateDirPath, resolve));
      });

    })

    done();
  })

})