const { build } = require('gluegun')

async function run(argv) {
  // create a CLI runtime
  const cli = build('react-helper')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'react-helper-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { run }
