module.exports = {
  name: 'generate:component',
  alias: ['gc'],
  description:
    'Generates a component inside the /components folder of your app',
  run: async toolbox => {
    const { parameters, prompt, print, template } = toolbox

    let componentName
    let componentType
    let componentFolder

    // asks for a component name
    const result = await prompt.ask({
      type: 'input',
      name: 'componentName',
      message: 'Give a NAME to your component: '
    })

    // verify if anything was passed
    if (result && result.componentName) {
      // check to see if there's any space on the provided name
      if (result.componentName.split(' ').length !== 1) {
        print.error('A component name cannot contain spaces')
        return
      }

      componentName = result.componentName
    }

    if (!componentName) {
      print.error('No component name typed!')
      return
    }

    const capitalizedComponentName =
      componentName.charAt(0).toUpperCase() + componentName.slice(1)
    const lowerCaseComponentName = componentName.toLowerCase()

    await prompt.ask({
      type: 'select',
      name: 'componentType',
      message: 'Select the TYPE of your component',
      choices: ['function', 'class']
    })

    if (result && result.componentType) {
      componentType = result.componentType
    }

    await prompt.ask({
      type: 'select',
      name: 'componentFolder',
      message: 'Select the FOLDER where you want to add you component',
      choices: ['components', 'pages']
    })

    if (result && result.componentFolder) {
      componentFolder = result.componentFolder
    }

    const templatesByType = {
      class: [
        // index
        {
          template: 'classComponent/reactClassComponentIndex.ejs',
          target: `src/${componentFolder}/${capitalizedComponentName}/index.js`,
          props: { capitalizedComponentName, lowerCaseComponentName }
        },
        // view
        {
          template: 'classComponent/reactClassComponentView.ejs',
          target: `src/${componentFolder}/${capitalizedComponentName}/${lowerCaseComponentName}-view.js`,
          props: { capitalizedComponentName }
        },
        // container
        {
          template: 'classComponent/reactClassComponentContainer.ejs',
          target: `src/${componentFolder}/${capitalizedComponentName}/${lowerCaseComponentName}-container.js`,
          props: { capitalizedComponentName }
        }
      ],
      function: [
        {
          template: 'functionComponent/reactFunctionComponent.ejs',
          target: `src/${componentFolder}/${capitalizedComponentName}/index.js`,
          props: { capitalizedComponentName }
        }
      ]
    }

    templatesByType[componentType].forEach(async temp => {
      await template.generate(temp)
    })

    await template.generate({
      template: 'styles.ejs',
      target: `src/${componentFolder}/${capitalizedComponentName}/styles.js`
    })
  }
}
