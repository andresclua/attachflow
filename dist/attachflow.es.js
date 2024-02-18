function f({ url: o = "", attributes: u = [], appendTo: t = "head", inlineScript: n = "" }) {
  return new Promise((c, s) => {
    if (!o && !n) {
      s(new Error('Either "url" or "inlineScript" must be provided.'));
      return;
    }
    const e = document.createElement("script");
    o && (e.src = o, u.forEach((l) => {
      const [d, i] = l.includes("=") ? l.split("=") : [l, !0];
      e.setAttribute(d, i === !0 ? "" : i.replace(/"/g, ""));
    }), e.onload = () => {
      console.log(o + " loaded"), c();
    }, e.onerror = () => {
      console.error("Error loading script: " + o), s(new Error("Script load error for " + o));
    });
    let r;
    if (t instanceof Element)
      r = t;
    else if (typeof t == "string") {
      if (r = document.querySelector(t), !r) {
        console.error("No element matches the selector: " + t), s(new Error("No element matches the selector: " + t));
        return;
      }
    } else
      r = document.head;
    r.appendChild(e), n && o ? e.onload = () => {
      const l = document.createElement("script");
      l.textContent = n, r.appendChild(l), console.log("Inline script executed successfully."), c();
    } : n && (e.textContent = n, r.appendChild(e), console.log("Inline script executed successfully."), c());
  });
}
function a({ url: o, attributes: u = [], appendTo: t = "head", inlineStyle: n = "" }) {
  return new Promise((c, s) => {
    let e;
    if (o)
      e = document.createElement("link"), e.href = o, e.rel = "stylesheet";
    else if (n)
      e = document.createElement("style"), e.textContent = n;
    else {
      s(new Error('Either "url" or "inlineStyle" must be provided.'));
      return;
    }
    u.forEach((l) => {
      const [d, i] = l.includes("=") ? l.split("=") : [l, !0];
      e.setAttribute(d, i === !0 ? "" : i.replace(/"/g, ""));
    }), e.onload = function() {
      console.log("Stylesheet loaded successfully"), c();
    }, e.onerror = function() {
      console.error("Error loading stylesheet"), s(new Error("Stylesheet load error"));
    };
    let r;
    if (t instanceof Element)
      r = t;
    else if (typeof t == "string") {
      if (r = document.querySelector(t), !r) {
        console.error("No element matches the selector: " + t), s(new Error("No element matches the selector: " + t));
        return;
      }
    } else
      r = document.head;
    r.appendChild(e), n && (console.log("Inline styles applied successfully."), c());
  });
}
export {
  f as loadScript,
  a as loadStyle
};
