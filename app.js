var state = { voice: "Buddha" };
var bags = {};
var current = null;

try {
  var saved = localStorage.getItem("stillpoint-voice");
  if (saved && VOICES.some(function (v) { return v.name === saved; })) state.voice = saved;
} catch (e) {}

function voiceInfo() {
  return VOICES.filter(function (v) { return v.name === state.voice; })[0];
}

function pool() {
  if (state.voice === "Buddha") {
    return BUDDHA.map(function (q) { return { text: q[0], who: "The Buddha", src: q[1] }; });
  }
  return STOIC
    .filter(function (q) { return q[1] === state.voice; })
    .map(function (q) { return { text: q[0], who: q[1], src: q[2] }; });
}

/* Shuffle-bag draw: no repeats until every quote for this voice has been shown. */
function draw() {
  var key = state.voice;
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
  document.body.setAttribute("data-voice", state.voice);
  document.getElementById("eyebrow").textContent = voiceInfo().tag;
  var row = document.getElementById("voices");
  row.innerHTML = "";
  VOICES.forEach(function (v) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "voice";
    b.textContent = v.name;
    b.setAttribute("aria-pressed", String(state.voice === v.name));
    b.addEventListener("click", function () {
      if (state.voice === v.name) return;
      state.voice = v.name;
      try { localStorage.setItem("stillpoint-voice", state.voice); } catch (e) {}
      renderChrome();
      show(true);
    });
    row.appendChild(b);
  });
}

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
