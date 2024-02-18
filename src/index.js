import {loadScript,loadStyle} from './attachflow.js';

(async () => {
  try {
    await loadScript({ 
      url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
      appendTo: 'head'
    });
    await loadScript({ 
      url: '//js.hsforms.net/forms/embed/v2.js',
      appendTo: 'head'
    });
    await loadScript({ 
      inlineScript: `hbspt.forms.create({
          region: "na1",
          portalId: "3120747",
          formId: "317721d8-a7f2-4381-90cf-a04b7459e3c9"
      });`,
      appendTo: document.getElementById('test')
    });
    loadStyle({ 
            inlineStyle: `
              body { background: red; }
            `,
            appendTo: document.getElementById('test')
        })
  } catch (error) {
    console.error(error);
  }
})();






