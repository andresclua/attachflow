import {loadScript} from './attachflow.js';



loadScript({ 
  url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  appendTo: 'head'
}).then(() => console.log('Script loaded successfully.'))
.catch(error => console.error(error));



