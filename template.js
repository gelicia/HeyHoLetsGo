// Basic template description.
exports.description = 'Kristina\'s Super Simple Site Generator';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '';

// Template-specific notes to be displayed after question prompts.
exports.after = '';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('version', '0.1.0'),
    init.prompt('username', 'gelicia'),
    init.prompt('description'),
    init.prompt('author_name', 'gelicia'),
    init.prompt('author_url', 'https://github.com/gelicia'),
    init.prompt('licenses'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('main', 'Grunt.js'),
    init.prompt('node_version', '>= 0.8.0'),
    init.prompt('npm_test', 'grunt test')
  ], function(err, props) {

    props.repository = 'https://github.com/' + props.username + '/' + props.name + '.git';
    props.homepage   = 'https://github.com/' + props.username + '/' + props.name + '/';
    props.bugs       = 'https://github.com/' + props.username + '/' + props.name + '/issues';
    props.scripts = {
      'test': 'grunt test'
    };
    props.devDependencies = {
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    var bower = {};
    bower.name = props.name;
    bower.main = 'Gruntfile.js';
    bower.dependencies = {
    };

    // Generate bower.json file.
    init.writePackageJSON('bower.json',   bower);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};