# Attach Flow - Dynamic Resource Loader 

![hero](https://raw.githubusercontent.com/andresclua/attachflow/37b5c456d41a996655012778f8f9d4e86b43c372/public/cover.png)

This documentation provides details on how to dynamically load JavaScript files and CSS stylesheets into a webpage using the `loadScript` and `loadStyle` utility functions. These functions support appending to the `head`, `body`, or any specified DOM element, and they allow for the addition of custom attributes to the `<script>` and `<link>` elements.



## Setup via command line
``` js
npm i attachflow
```
``` js
import  {loadScript} from 'attachflow';

loadScript({ 
  url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  appendTo: 'head'
}).then(() => console.log('Script loaded successfully.'))
.catch(error => console.error(error));
```



## Setup for via CDN
Load the file from CDN 
``` html
<script type="text/javascript" src="https://unpkg.com/attachflow/dist/attachflow.umd.js">
```
``` js
attachflow.loadScript({ 
  url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  appendTo: 'head'
}).then(() => console.log('Script loaded successfully.'))
.catch(error => console.error(error));
```
[> example with CDN ](https://codepen.io/andresclua/pen/NWJewLK)


## Functions

### `loadScript`

Dynamically loads a JavaScript file into the page.

**Parameters:**
- `url` (string): The URL of the script to load.
- `attributes` (Array): Optional. An array of strings representing additional attributes to set on the script element. Each attribute can be in the form of `"key=value"` or just `"key"` for boolean attributes.
- `appendTo` (string | Element): Optional. Specifies the element to which the script element will be appended. Can be a selector string (`'head'`, `'body'`), or a DOM element reference. Defaults to `'head'`.

**Returns:**

- A Promise that resolves when the script is successfully loaded or rejects with an error if the script fails to load.

**Example:**

```javascript
loadScript({ 
    url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.j', 
    attributes: ['async', 'data-name="exampleScript"'], 
    appendTo: document.getElementById('customDiv') 
}).then(() => console.log('Script loaded successfully.'))
  .catch(error => console.error(error));
```

### `loadStyle`

Dynamically loads a CSS stylesheet into the page.

**Parameters:**
- `url` (string): The URL of the script to load.
- `attributes` (Array): Optional. An array of strings representing additional attributes to set on the script element. Each attribute can be in the form of `"key=value"` or just `"key"` for boolean attributes.
- `appendTo` (string | Element): Optional. Specifies the element to which the script element will be appended. Can be a selector string (`'head'`, `'body'`), or a DOM element reference. Defaults to `'head'`.

**Returns:**
- A Promise that resolves when the stylesheet is successfully loaded or rejects with an error if the stylesheet fails to load.

**Example:**
``` js
loadStyle({ 
  url: 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css',
  attributes: ['integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrbQGdQYeo+IcNZDhBCZlgn/9ehbqeAyhUcBWmTx", crossorigin="anonymous"'],
  appendTo: document.querySelector('.test') // will append inside div with class test
}).then(() => console.log('Stylesheet loaded successfully.'))
.catch(error => console.error(error));
```

### `Usage Notes`

Ensure the provided url is correct and accessible to avoid loading errors. When using the attributes parameter, make sure the attribute values are properly formatted. The appendTo parameter can accept a string identifier ('head', 'body') or a direct DOM element reference, offering flexibility in where your scripts and styles are injected.
Providing an invalid appendTo value will result in an error, so ensure it correctly references an existing DOM element or uses the allowed string identifiers.

### `License`

This module is open-source and free to use. Attribution is appreciated but not required.