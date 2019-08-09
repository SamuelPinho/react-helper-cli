module.exports = {
  name: 'generate:component',
  alias: ['gc'],
  description:
    'Generates a component inside the /components folder of your app',
  run: async toolbox => {
    const { parameters, prompt, print, template } = toolbox

    let componentName
    let componentType

    // asks for a component name
    const result = await prompt.ask({
      type: 'input',
      name: 'componentName',
      message: 'Give a name to your component: '
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
      message: 'Select the type of your component',
      choices: ['function', 'class']
    })

    if (result && result.componentType) {
      componentType = result.componentType
    }

    const templatesByType = {
      class: [
        // index
        {
          template: 'reactClassComponentIndex.ejs',
          target: `components/${capitalizedComponentName}/index.js`,
          props: { capitalizedComponentName, lowerCaseComponentName }
        },
        // view
        {
          template: 'reactClassComponentView.ejs',
          target: `components/${capitalizedComponentName}/${lowerCaseComponentName}-view.js`,
          props: { capitalizedComponentName }
        },
        // container
        {
          template: 'reactClassComponentContainer.ejs',
          target: `components/${capitalizedComponentName}/${lowerCaseComponentName}-container.js`,
          props: { capitalizedComponentName }
        }
      ],
      function: [
        {
          template: 'reactFunctionComponent.ejs',
          target: `components/${capitalizedComponentName}/index.js`,
          props: { capitalizedComponentName }
        }
      ]
    }

    templatesByType[componentType].forEach(async temp => {
      await template.generate(temp)
    })

    await template.generate({
      template: 'styles.ejs',
      target: `components/${capitalizedComponentName}/styles.js`
    })
  }
}
