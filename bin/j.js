#!/usr/bin/env node
const commander = require('commander');

commander.version(require('../package.json').version)
.usage('<command> [options]')
.command('create','generate a new project')

commander.parse()