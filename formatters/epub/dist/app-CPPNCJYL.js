(() => {
  // js/helpers.js
  var qs = document.querySelector.bind(document);
  var qsAll = document.querySelectorAll.bind(document);

  // js/makeup.js
  var HIGHLIGHT_CLASS = "hll";
  function initialize() {
    initializeDelimitersHighlighting();
  }
  function initializeDelimitersHighlighting() {
    const delimiters = qsAll("[data-group-id]");
    delimiters.forEach((delimiter) => {
      const groupId = delimiter.getAttribute("data-group-id");
      delimiter.addEventListener("mouseenter", (event) => {
        toggleDelimitersHighlight(groupId, true);
      });
      delimiter.addEventListener("mouseleave", (event) => {
        toggleDelimitersHighlight(groupId, false);
      });
    });
  }
  function toggleDelimitersHighlight(groupId, force) {
    const delimiters = qsAll(`[data-group-id="${groupId}"]`);
    delimiters.forEach((delimiter) => {
      delimiter.classList.toggle(HIGHLIGHT_CLASS, force);
    });
  }

  // entrypoints/epub/dist/app.js
  initialize();
})();
