'use babel';

const spawn = require('child_process').spawn;

export default class CommandRunner {

  runCommand(command, filePath) {
    console.log('Running command: /K ' + command);

    let options = {
      cwd: filePath,
      detached: true,
      shell: true
    }

    console.log('Command options: ' + JSON.stringify(options));

    spawn(
      'cmd.exe',
      ['/K', command ],
      options
    )
    .on('error', (data) => {
      console.log('stdout: ' + data);
    });;
  }
}
