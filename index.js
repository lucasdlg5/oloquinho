#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execPromise = promisify(exec);

const mainPath = path.dirname(fs.realpathSync(__filename));
const soundPath = path.join(mainPath, './oloquinho');

const oloquinho = () => {
    const commandsForEachPlatform = {
      linux: `paplay ${soundPath}.ogg`,
      windows: path.join(mainPath, './forWindows.vbs')+' '+soundPath+'.mp3',
      mac: `afplay ${soundPath}.mp3`,
    }

    const platform = process.platform;
    const codeToExecute = commandsForEachPlatform[platform];

    return execPromise(codeToExecute)
}

module.exports = oloquinho;

if(!module.parent)
    oloquinho();
