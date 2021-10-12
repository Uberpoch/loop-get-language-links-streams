const commandLineArgs = require('command-line-args');
const auth = require('./utils/auth');
const { generateFile } = require('./utils/file');
const { getStreamLoop, langLoop } = require('./utils/loop');
const { sortStreams } = require('./utils/data');


const run = async(argv) => {
    const optionDefinitions = [
      { name: 'nocommit', type: Boolean },
      {
        name: 'key',
        type: String,
      },
      {
        name: 'sec',
        type: String,
      },
      {
        name: 'hub',
        type: Number,
      },
      {
        name: 'file',
        type: String,
      },
    ];
  
    // defining commandline variables
    const options = commandLineArgs(optionDefinitions, { argv });
    let apiKey = options.key; //--key
    let apiSecret = options.sec; //--sec
    const hub_id = options.hub; //--hub
    const file = options.file; //--hub

    console.log(options);
    // warning for missing commandline arguments
    if (options.nocommit) {
      console.warn('--nocommit was supplied.');
    }
  
    if (apiKey === undefined ) {
      console.error('no apikey was supplied please follow this format $node index.js run --key ENTERAPIKEY --sec ENTERFEEDURL. --hub ENTERHUBID');
      return;
    }
    if (apiSecret === undefined ) {
        console.error('no apikey was supplied please follow this format $node index.js run --key ENTERAPIKEY --sec ENTERFEEDURL. --hub ENTERHUBID');
        return;
    }
    if (hub_id === undefined ) {
        console.error('no apikey was supplied please follow this format $node index.js run --key ENTERAPIKEY --sec ENTERFEEDURL. --hub ENTERHUBID');
    return;
    }
    if (file === undefined ) {
        console.error('no apikey was supplied please follow this format $node index.js run --key ENTERAPIKEY --sec ENTERFEEDURL. --hub ENTERHUBID');
    return;
    }
  
    // get all tags
    const token = await auth(apiKey, apiSecret);
    const loopResult = await getStreamLoop(token, hub_id);
    const dataResult = await sortStreams(loopResult);
    const langLoopResult = await langLoop(token, dataResult);
    await generateFile(langLoopResult, file);
  };

const main = () => {
    // These first few lines are just configuration
    const mainOptionDefinitions = [{ name: 'command', defaultOption: true }];
    const mainOptions = commandLineArgs(mainOptionDefinitions, {
      stopAtFirstUnknown: true,
    });
    const commandOptions = mainOptions._unknown || [];
    // Creates cases for the different commands you might pass
    switch (mainOptions.command) {
      // The case here refers to the COMMAND you pass after the file name
      case 'run':
        return run(commandOptions);
      default:
        // Will notify that no command was provided
        console.error(`Unknown command '${mainOptions.command}'.`);
        return null;
    }
  };
  
  main();


