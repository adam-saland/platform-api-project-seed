#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import * as template from './utils/template';
import * as shell from 'shelljs';
import * as yargs from 'yargs';

const argv = yargs.usage('Usage: $0 <command> [options]')
  .command('create-openfin-app', 'Generate an OpenFin example or template')
  .example('$0 create-openfin-app -e example-dir project-name(optional)', 'Generate an example')
  .example('$0 create-openfin-app -t template-dir project-name(optional)', 'Generate a template')
  .alias('e', 'example')
  .describe('e', 'Generate an example')
  .alias('t', 'template')
  .describe('t', 'Generate a template')
  .help('h')
  .alias('h', 'help')
  .argv;

const EXAMPLE_CHOICES: string[] = fs.readdirSync(path.join(__dirname, 'examples'));
const TEMPLATE_CHOICES: string[] = fs.readdirSync(path.join(__dirname, 'templates'));
const SKIP_FILES = ['node_modules', '.template.json'];
const CURR_DIR = process.cwd();
export interface CliOptions {
  projectName: string
  templateName: string
  templatePath: string
  targetPath: string
}

main(argv);

function main(argv: any) {
  if (argv.example === true || argv.template === true) {
    return argv.example === true
      ? EXAMPLE_CHOICES.forEach(example => console.log(chalk.white(example)))
      : TEMPLATE_CHOICES.forEach(template => console.log(chalk.white(template)));
  }

  if (argv.example && !EXAMPLE_CHOICES.includes(argv.example as string)) {
    return console.log(chalk.red(`Can't find the example ${argv.example} exists.\n`), chalk.white('Run the command "create-openfin-app -e" to list the available examples.'));
  }

  if (argv.template && !TEMPLATE_CHOICES.includes(argv.template as string)) {
    return console.log(chalk.red(`Can't find the template ${argv.template}.\n`), chalk.white('Run the command "create-openfin-app -e" to list the available examples.'));
  }

  const templateOrExample = argv.example ? 'example' : 'template';
  const templatePath = path.join(__dirname, `${templateOrExample}s`, argv[templateOrExample] as string);
  const projectName = argv._[1] as string || argv[templateOrExample] as string;
  const targetPath = path.join(CURR_DIR, projectName);

  const options: CliOptions = {
    projectName,
    templateName: argv[templateOrExample] as string,
    templatePath,
    targetPath
  }

  if (!createProject(targetPath)) {
    return;
  }

  createDirectoryContents(templatePath, projectName);

  // postProcess(options);
}

function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
    return false;
  }
  fs.mkdirSync(projectPath);

  return true;
}

function createDirectoryContents(templatePath: string, projectName: string) {
  // read all files/folders (1 level) from template folder
  const filesToCreate = fs.readdirSync(templatePath);
  // loop each file/folder
  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    // skip files that should not be copied
    if (SKIP_FILES.indexOf(file) > -1) return;

    if (stats.isFile()) {
      // read file content and transform it using template engine
      let contents = fs.readFileSync(origFilePath, 'utf8');
      contents = template.render(contents, { projectName });
      // write file to destination folder
      const writePath = path.join(CURR_DIR, projectName, file);
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      // create folder in destination folder
      fs.mkdirSync(path.join(CURR_DIR, projectName, file));
      // copy files/folder inside current folder recursively
      createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
    }
  });
}

function postProcess(options: CliOptions) {
  const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'));
  if (isNode) {
    shell.cd(options.targetPath);
    const result = shell.exec('npm install');
    if (result.code !== 0) {
      return false;
    }
  }

  return true;
}
