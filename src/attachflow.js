function loadScript({ url = '', attributes = [], appendTo = 'head', inlineScript = '' }) {
    return new Promise((resolve, reject) => {
        // Ensure at least one of URL or inlineScript is provided
        if (!url && !inlineScript) {
            reject(new Error('Either "url" or "inlineScript" must be provided.'));
            return;
        }

        const script = document.createElement('script');

        // Handle URL-based script loading
        if (url) {
            script.src = url;

            // Assign attributes to the script
            attributes.forEach(attr => {
                const [key, value] = attr.includes('=') ? attr.split('=') : [attr, true];
                script.setAttribute(key, value === true ? "" : value.replace(/"/g, ''));
            });

            script.onload = () => {
                console.log(url + ' loaded');
                resolve();
            };

            script.onerror = () => {
                console.error('Error loading script: ' + url);
                reject(new Error('Script load error for ' + url));
            };
        }

        // Determine the element to append the script to
        let appendTarget;
        if (appendTo instanceof Element) {
            // Directly use the provided DOM element
            appendTarget = appendTo;
        } else if (typeof appendTo === 'string') {
            // Use the string to find the target element
            appendTarget = document.querySelector(appendTo);
            if (!appendTarget) {
                console.error('No element matches the selector: ' + appendTo);
                reject(new Error('No element matches the selector: ' + appendTo));
                return;
            }
        } else {
            // Fallback to document.head if appendTo is not a valid element or selector
            appendTarget = document.head;
        }

        appendTarget.appendChild(script);

        // If inlineScript is provided, append it after the external script is loaded
        if (inlineScript && url) {
            script.onload = () => {
                const inlineScriptTag = document.createElement('script');
                inlineScriptTag.textContent = inlineScript;
                appendTarget.appendChild(inlineScriptTag);
                console.log('Inline script executed successfully.');
                resolve();
            };
        } else if (inlineScript) {
            // Directly create and append the script tag for inlineScript if no URL is provided
            script.textContent = inlineScript;
            appendTarget.appendChild(script);
            console.log('Inline script executed successfully.');
            resolve();
        }
    });
}
function loadStyle({ url, attributes = [], appendTo = 'head', inlineStyle = '' }) {
    return new Promise((resolve, reject) => {
        let styleElement;

        if (url) {
            // Create link element for external stylesheet
            styleElement = document.createElement('link');
            styleElement.href = url;
            styleElement.rel = 'stylesheet';
        } else if (inlineStyle) {
            // Create style element for inline styles
            styleElement = document.createElement('style');
            styleElement.textContent = inlineStyle;
        } else {
            reject(new Error('Either "url" or "inlineStyle" must be provided.'));
            return;
        }

        // Assign additional attributes to the link or style element
        attributes.forEach(attr => {
            const [key, value] = attr.includes('=') ? attr.split('=') : [attr, true];
            styleElement.setAttribute(key, value === true ? "" : value.replace(/"/g, ''));
        });

        // Handle successful load of the stylesheet or inline style application
        styleElement.onload = function() {
            console.log('Stylesheet loaded successfully');
            resolve();
        };

        // Handle errors in loading the stylesheet
        styleElement.onerror = function() {
            console.error('Error loading stylesheet');
            reject(new Error('Stylesheet load error'));
        };

        // Determine the element to which the style should be appended
        let appendTarget;
        if (appendTo instanceof Element) {
            // Directly use the provided DOM element
            appendTarget = appendTo;
        } else if (typeof appendTo === 'string') {
            // Use the string to find the target element
            appendTarget = document.querySelector(appendTo);
            if (!appendTarget) {
                console.error('No element matches the selector: ' + appendTo);
                reject(new Error('No element matches the selector: ' + appendTo));
                return;
            }
        } else {
            // Fallback to document.head if appendTo is not a valid element or selector
            appendTarget = document.head;
        }

        // Append the link or style element to the specified element
        appendTarget.appendChild(styleElement);

        // Immediately resolve for inline styles as they don't have a load event
        if (inlineStyle) {
            console.log('Inline styles applied successfully.');
            resolve();
        }
    });
}

export { loadScript, loadStyle };