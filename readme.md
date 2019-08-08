# react-helper

A CLI to help you create your components inside your react projects!

## Commands

To create a component, type in your terminal

```js
react-helper generate:component
```

or

```js
react-helper gc
```

You will be asked for the

- **Component Name**
- **Component Type** (functional or statefull)

With that the CLI will create a folder containing some files inside **/components**.

> If the folder **/components** it's not created, will be created alongside the component.

The following structure will be used for the **functional component**

```js
|components
--|component-name
----|index.js
----|styles.js
```

## License

MIT - see LICENSE
