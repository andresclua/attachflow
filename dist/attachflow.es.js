function a({ url: o, attributes: s = [], appendTo: r = "head" }) {
  return new Promise((c, l) => {
    const e = document.createElement("script");
    e.src = o, s.forEach((t) => {
      const [d, i] = t.includes("=") ? t.split("=") : [t, !0];
      e.setAttribute(d, i === !0 ? "" : i.replace(/"/g, ""));
    }), e.onload = function() {
      console.log(o + " loaded"), c();
    }, e.onerror = function() {
      console.error("Error loading script: " + o), l(new Error("Script load error for " + o));
    };
    let n;
    if (typeof r == "string")
      n = r === "body" ? document.body : document.head;
    else if (r instanceof Element)
      n = r;
    else {
      console.error("Invalid appendTo value"), l(new Error("Invalid appendTo value"));
      return;
    }
    n.appendChild(e);
  });
}
function u({ url: o, attributes: s = [], appendTo: r = "head" }) {
  return new Promise((c, l) => {
    const e = document.createElement("link");
    e.href = o, e.rel = "stylesheet", s.forEach((t) => {
      const [d, i] = t.includes("=") ? t.split("=") : [t, !0];
      e.setAttribute(d, i === !0 ? "" : i.replace(/"/g, ""));
    }), e.onload = function() {
      console.log(o + " stylesheet loaded"), c();
    }, e.onerror = function() {
      console.error("Error loading stylesheet: " + o), l(new Error("Stylesheet load error for " + o));
    };
    let n;
    if (typeof r == "string")
      n = r === "body" ? document.body : document.head;
    else if (r instanceof Element)
      n = r;
    else {
      console.error("Invalid appendTo value"), l(new Error("Invalid appendTo value"));
      return;
    }
    n.appendChild(e);
  });
}
export {
  a as loadScript,
  u as loadStyle
};
