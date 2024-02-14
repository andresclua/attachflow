function loadScript({ url, attributes = [], appendTo = 'head' }) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;

        // Asignar atributos al script
        attributes.forEach(attr => {
            const [key, value] = attr.includes('=') ? attr.split('=') : [attr, true];
            script.setAttribute(key, value === true ? "" : value.replace(/"/g, ''));
        });

        // Manejar la carga exitosa del script
        script.onload = function() {
            console.log(url + ' loaded');
            resolve();
        };

        // Manejar errores en la carga del script
        script.onerror = function() {
            console.error('Error loading script: ' + url);
            reject(new Error('Script load error for ' + url));
        };

        // Determinar el elemento al que se debe adjuntar el script
        let appendTarget;
        if (typeof appendTo === 'string') {
            appendTarget = (appendTo === 'body') ? document.body : document.head;
        } else if (appendTo instanceof Element) {
            appendTarget = appendTo;
        } else {
            console.error('Invalid appendTo value');
            reject(new Error('Invalid appendTo value'));
            return;
        }

        // Adjuntar el script al elemento especificado
        appendTarget.appendChild(script);
    });
}

function loadStyle({ url, attributes = [], appendTo = 'head' }) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';

        // Asignar atributos adicionales al link de la hoja de estilo
        attributes.forEach(attr => {
            const [key, value] = attr.includes('=') ? attr.split('=') : [attr, true];
            link.setAttribute(key, value === true ? "" : value.replace(/"/g, ''));
        });

        // Manejar la carga exitosa de la hoja de estilo
        link.onload = function() {
            console.log(url + ' stylesheet loaded');
            resolve();
        };

        // Manejar errores en la carga de la hoja de estilo
        link.onerror = function() {
            console.error('Error loading stylesheet: ' + url);
            reject(new Error('Stylesheet load error for ' + url));
        };

        // Determinar el elemento al que se debe adjuntar la hoja de estilo
        let appendTarget;
        if (typeof appendTo === 'string') {
            appendTarget = (appendTo === 'body') ? document.body : document.head;
        } else if (appendTo instanceof Element) {
            appendTarget = appendTo;
        } else {
            console.error('Invalid appendTo value');
            reject(new Error('Invalid appendTo value'));
            return;
        }

        // Adjuntar la hoja de estilo al elemento especificado
        appendTarget.appendChild(link);
    });
}

export { loadScript, loadStyle };