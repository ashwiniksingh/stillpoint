var state = { tab: "buddha", filter: "All" };
var bags = {};
var current = null;

try {
  var saved = localStorage.getItem("stillpoint-tab");
  if (saved === "buddha" || saved === "stoic") state.tab = saved;
} catch (e) {}

function pool() {
  if (state.tab === "buddha") {
    return BUDDHA.map(function (q) { return { text: q[0], who: "The Buddha", src: q[1] }; });
  }
  return STOIC
    .filter(function (q) { return state.filter === "All" || q[1] === state.filter; })
    .map(function (q) { return { text: q[0], who: q[1], src: q[2] }; });
}

/* Shuffle-bag draw: no repeats until every quote in the pool has been shown. */
function draw() {
  var key = state.tab + "|" + state.filter;
  if (!bags[key] || !bags[key].length) {
    var order = pool();
    for (var i = order.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = order[i]; order[i] = order[j]; order[j] = t;
    }
    if (current && order.length > 1 && order[order.length - 1].text === current.text) {
      order.unshift(order.pop());
    }
    bags[key] = order;
  }
  return bags[key].pop();
}

function show(animate) {
  var fig = document.getElementById("fig");
  var apply = function () {
    current = draw();
    document.getElementById("q").textContent = "“" + current.text + "”";
    document.getElementById("who").textContent = current.who;
    document.getElementById("src").textContent = current.src;
    fig.classList.remove("swap");
  };
  if (animate) { fig.classList.add("swap"); setTimeout(apply, 220); } else { apply(); }
}

function renderChrome() {
  document.body.setAttribute("data-tab", state.tab);
  document.getElementById("eyebrow").textContent =
    state.tab === "buddha" ? "Words attributed to the Buddha" : "Stoic philosophers";
  ["buddha", "stoic"].forEach(function (k) {
    document.getElementById("tab-" + k).setAttribute("aria-selected", String(state.tab === k));
  });
  var chips = document.getElementById("chips");
  chips.hidden = state.tab !== "stoic";
  chips.innerHTML = "";
  FILTERS.forEach(function (f) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = f;
    b.setAttribute("aria-pressed", String(state.filter === f));
    b.addEventListener("click", function () { state.filter = f; renderChrome(); show(true); });
    chips.appendChild(b);
  });
}

document.querySelectorAll(".tab").forEach(function (b) {
  b.addEventListener("click", function () {
    state.tab = b.getAttribute("data-tab");
    try { localStorage.setItem("stillpoint-tab", state.tab); } catch (e) {}
    renderChrome();
    show(true);
  });
});

document.getElementById("next").addEventListener("click", function () { show(true); });

document.getElementById("copy").addEventListener("click", function () {
  var btn = document.getElementById("copy");
  var text = "“" + current.text + "” — " + current.who + ", " + current.src;
  var done = function (msg) { btn.textContent = msg; setTimeout(function () { btn.textContent = "Copy"; }, 1400); };
  try {
    navigator.clipboard.writeText(text).then(
      function () { done("Copied"); },
      function () { done("Copy failed"); }
    );
  } catch (e) { done("Copy failed"); }
});

renderChrome();
show(false);

/* Offline support */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  });
}
