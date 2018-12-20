'use babel';

import ConsoleCommandRunnerView from './console-command-runner-view';
import { CompositeDisposable } from 'atom';
import CommandRunner from './CommandRunner';

export default {

  consoleCommandRunnerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.consoleCommandRunnerView = new ConsoleCommandRunnerView(state.consoleCommandRunnerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.consoleCommandRunnerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'console-command-runner:toggle': () => this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'console-command-runner:run': () => this.run()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.consoleCommandRunnerView.destroy();
  },

  serialize() {
    return {
      consoleCommandRunnerViewState: this.consoleCommandRunnerView.serialize()
    };
  },

  toggle() {
    console.log('ConsoleCommandRunner was toggled!');
  },

  run() {
    let runner = new CommandRunner();
    let path = atom.workspace.project.rootDirectories["0"].path
    runner.runCommand(atom.config.settings['run-python'].f5Command, path);
  },
  config: {
    f5Command: {
        title: 'F5 Command',
        type: 'string',
        default: 'python {file}'
    }
  }

};
