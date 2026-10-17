/**
 * RBCF site behaviour (vanilla JavaScript, no build step).
 * The page to run is chosen by <body data-page="...">. All content comes from js/data.js (window.RBCF).
 * Sections: helpers, the spot-the-red-flag and decision engines (mountSpot, mountGame), then one init function per page.
 */
(function () {
"use strict";
var R = window.RBCF, page = document.body.dataset.page;
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
var sentence = function (t) { t = String(t).toLowerCase(); return t.charAt(0).toUpperCase() + t.slice(1); };
var titleCase = function (t) { return String(t).toLowerCase().replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); }).replace(/\bAnd\b|\bThe\b|\bOf\b/g, function (w) { return w.toLowerCase(); }).replace(/^./, function (c) { return c.toUpperCase(); }); };
var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
$$(".nav a").forEach(function (a) { if (a.dataset.page === page) a.classList.add("on"); });
/* header-hide: hide the top bar when scrolling down, show it again when scrolling up or at the top */
(function () {
  var top = $(".top"), last = window.pageYOffset || 0;
  if (!top) return;
  window.addEventListener("scroll", function () {
    var y = window.pageYOffset || 0;
    if (y > last + 8 && y > 120) top.classList.add("away"); else if (y < last - 8 || y <= 120) top.classList.remove("away");
    last = y;
  }, { passive: true });
  top.addEventListener("focusin", function () { top.classList.remove("away"); });
})();



/** Spot the Red Flag. sp = one email from data.js; onCheck(found, total) fires when the learner checks answers. */
function mountSpot(el, sp, onCheck) {
  var marked = {}, revealed = false;
  function seg(s) {
    if (!s[1]) return '<span class="plain">' + esc(s[0]) + "</span>";
    var k = s[1], isFlag = k.charAt(0) === "f", on = !!marked[k], c = "seg";
    if (!revealed && on) c += " on";
    if (revealed && isFlag && on) c += " ok";
    if (revealed && isFlag && !on) c += " miss";
    if (revealed && !isFlag && on) c += " bad";
    return '<button type="button" class="' + c + '" data-k="' + k + '"' + (revealed ? " disabled" : "") + ' aria-pressed="' + on + '">' + esc(s[0]) + "</button>";
  }
  function counts() { var ids = Object.keys(sp.flags); return { ids: ids, found: ids.filter(function (k) { return marked[k]; }).length, wrong: Object.keys(marked).filter(function (k) { return marked[k] && k.charAt(0) === "d"; }).length }; }
  function render() {
    var c = counts(), h = '<p class="hint">Click each phrase you think is a red flag, then check your answers. Some phrases are ordinary on their own.</p><div class="email">';
    h += sp.lines.map(function (l) { return '<div class="eline">' + (l.label ? "<b>" + esc(l.label) + "</b> " : "") + l.segs.map(seg).join("") + "</div>"; }).join("") + "</div>";
    h += '<div class="row">' + (revealed ? "" : '<button type="button" class="btn light" data-a="check">Check my answers</button>') + '<button type="button" class="btn outline" data-a="reset">Start again</button></div>';
    if (revealed) {
      h += '<div class="result"><h4>You found ' + c.found + " of " + c.ids.length + " red flags.</h4><p style=\"margin:0;color:#CFC6EA\">" + (c.wrong ? "You also marked " + c.wrong + " ordinary phrase" + (c.wrong > 1 ? "s" : "") + ". A greeting, a subject line and the request itself are normal; what matters is how the request is made." : "You marked no ordinary phrases by mistake.") + "</p><ul>";
      c.ids.forEach(function (k) { h += "<li><b>" + (marked[k] ? "Found" : "Missed") + ": " + esc(sp.flags[k][0]) + "</b><span>" + esc(sp.flags[k][1]) + "</span></li>"; });
      h += '</ul><div class="lv"><b>Levers pulled</b><br>' + sp.levers.map(function (l) { return "<b>" + esc(l[0]) + ".</b> " + esc(l[1]); }).join("<br>") + (sp.note ? "<br>" + esc(sp.note) : "") + "</div>";
      if (sp.takeaway) h += '<div class="lv">' + esc(sp.takeaway) + "</div>";
      h += '<div class="src">Sources: ' + esc(sp.sources) + "</div></div>";
    }
    el.innerHTML = h;
  }
  el.onclick = function (e) {
    var t = e.target.closest("[data-k],[data-a]"); if (!t) return;
    if (t.dataset.k) { if (revealed) return; marked[t.dataset.k] = !marked[t.dataset.k]; }
    else if (t.dataset.a === "check") { revealed = true; var c = counts(); if (onCheck) onCheck(c.found, c.ids.length); }
    else if (t.dataset.a === "reset") { marked = {}; revealed = false; }
    render();
  };
  render();
}

/** Decision game. g = one scenario from data.js; onPick(kind) fires with S (stopped), P (partly right) or F (fraud succeeded). */
function mountGame(el, g, onPick) {
  var pick = -1, deb = false;
  function render() {
    var h = '<div class="gsetup"><span class="chip">' + esc(g.type) + "</span><h4>" + esc(titleCase(g.title)) + "</h4><p style=\"margin:0\">" + esc(g.setup) + "</p></div>";
    h += '<p class="hint">' + (pick < 0 ? "What do you do? Choose one option." : "Your choice:") + '</p><div class="opts">';
    g.options.forEach(function (o, i) { h += '<button type="button" class="opt' + (i === pick ? " chosen" : "") + '" data-i="' + i + '"' + (pick >= 0 ? " disabled" : "") + "><b>" + esc(o.title) + "</b>" + esc(o.body || "") + "</button>"; });
    h += "</div>";
    if (pick >= 0) {
      var o = g.options[pick], out = g.outcomes[o.kind];
      h += '<div class="out ' + o.kind + '"><h4>' + esc(sentence(out.title)) + "</h4><p style=\"margin:0\">" + esc(out.text) + "</p></div>";
      h += '<div class="row"><button type="button" class="btn light" data-a="deb">' + (deb ? "Hide the debrief" : "Read the debrief") + '</button><button type="button" class="btn outline" data-a="again">Try another option</button></div>';
      if (deb) h += '<div class="deb"><h4 style="margin-bottom:8px">Debrief</h4>' + g.debrief.map(function (p) { return /^Sources?:/.test(p) ? '<div class="src">' + esc(p) + "</div>" : "<p>" + esc(p) + "</p>"; }).join("") + "</div>";
    }
    el.innerHTML = h;
  }
  el.onclick = function (e) {
    var t = e.target.closest("[data-i],[data-a]"); if (!t) return;
    if (t.dataset.i) { pick = +t.dataset.i; if (onPick) onPick(g.options[pick].kind); }
    else if (t.dataset.a === "deb") deb = !deb; else if (t.dataset.a === "again") { pick = -1; deb = false; }
    render();
  };
  render();
}

/* ================= HOME ================= */
function initHome() {
  var host = $("#hrole"), out = $("#hrole-out");
  host.innerHTML = R.order.map(function (k) { return '<button type="button" class="chip2" data-r="' + k + '" aria-pressed="false">' + esc(R.roles[k].name) + "</button>"; }).join("");
  host.onclick = function (e) {
    var b = e.target.closest("[data-r]"); if (!b) return; var k = b.dataset.r, r = R.roles[k];
    $$(".chip2", host).forEach(function (c) { var on = c === b; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
    out.hidden = false; out.innerHTML = "<h3>" + esc(r.name) + "</h3><p><b>What the attacker wants.</b> " + esc(r.goal) + "</p><p><b>The check that works.</b> " + esc(r.control) + '</p><div class="btnrow"><a class="btn sm" href="' + esc(R.links[k]) + '" download>Download the module</a></div>';
  };
}

/* ================= SHARED: FLIP CARDS ================= */
/** A card that turns over when selected: front shows a title, back explains. */
function flipCard(front, back, cls) { return '<button type="button" class="fc ' + (cls || "") + '" aria-pressed="false"><span class="fc-in"><span class="fc-f">' + front + '</span><span class="fc-b">' + back + "</span></span></button>"; }
function bindFlips(root) { root.addEventListener("click", function (e) { var c = e.target.closest(".fc"); if (!c || !root.contains(c)) return; var on = c.classList.toggle("on"); c.setAttribute("aria-pressed", on); }); }
var ICON = {
  email: '<svg viewBox="0 0 48 48"><rect x="6" y="11" width="36" height="26" rx="3"/><path d="M7 14l17 13L41 14"/></svg>',
  voice: '<svg viewBox="0 0 48 48"><path d="M8 24v1M14 18v13M20 11v26M26 16v16M32 9v30M38 19v10"/></svg>',
  video: '<svg viewBox="0 0 48 48"><rect x="5" y="12" width="26" height="24" rx="3"/><path d="M31 21l12-6v18l-12-6z"/></svg>',
  detect: '<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="12"/><path d="M30 30l12 12"/></svg>',
  verify: '<svg viewBox="0 0 48 48"><path d="M24 5l16 6v12c0 10-7 17-16 20C15 40 8 33 8 23V11z"/><path d="M17 24l5 5 10-11"/></svg>',
  contain: '<svg viewBox="0 0 48 48"><rect x="10" y="21" width="28" height="21" rx="3"/><path d="M16 21v-6a8 8 0 0116 0v6"/></svg>'
};

/* ================= OVERVIEW ================= */
function initOverview() {
  /* Detect, Verify, Contain: a request travels along the pipeline */
  var pi = 0, pauto = !reduce, ST = ["detect", "verify", "contain"], POS = [16.66, 50, 83.33], TOK = ["!", "\u2713", "\u25A0"], pT = 0;
  $("#pnodes").innerHTML = ST.map(function (k, i) { return '<button type="button" class="pn" data-p="' + i + '" aria-pressed="false"><span class="pic">' + ICON[k] + "</span><b>" + esc(R.phases[k].title) + "</b><small>" + esc(R.phases[k].blurb) + "</small></button>"; }).join("");
  function pipe() {
    var p = R.phases[ST[pi]];
    $$("#pnodes .pn").forEach(function (b, i) { b.classList.toggle("on", i === pi); b.classList.toggle("done", i < pi); b.setAttribute("aria-pressed", i === pi); });
    $("#pfill").style.width = pi * 50 + "%"; var t = $("#ptoken"); t.style.left = POS[pi] + "%"; t.textContent = TOK[pi]; t.className = "ptoken s" + pi;
    $("#ptitle").textContent = p.title; $("#pblurb").textContent = p.blurb; $("#pdetail").innerHTML = p.items.map(function (x) { return '<div class="item"><i></i><div>' + esc(x) + "</div></div>"; }).join("");
    $("#pauto").textContent = pauto ? "Pause" : "Play"; clearTimeout(pT); if (pauto) pT = setTimeout(function () { pi = (pi + 1) % 3; pipe(); }, 5200);
  }
  $("#pnodes").onclick = function (e) { var b = e.target.closest("[data-p]"); if (b) { pi = +b.dataset.p; pauto = false; pipe(); } };
  $("#pauto").onclick = function () { pauto = !pauto; pipe(); };
  pipe();
}

/* ================= TRY IT ================= */
function initTry() { mountSpot($("#try-spot"), R.spots.pay[0]); mountGame($("#try-game"), R.games.pay[0]); }

/* ================= ROLES ================= */
function initRoles() {
  var cur = "ap";
  function detail() {
    var r = R.roles[cur];
    $$(".node").forEach(function (n) { var on = n.dataset.role === cur; n.classList.toggle("on", on); n.setAttribute("aria-pressed", on); });
    $("#detail").innerHTML = '<div class="eyebrow">Role module</div><h3>' + esc(r.name) + "</h3><h5>What the attacker wants</h5><p>" + esc(r.goal) + "</p><h5>How they ask</h5><p>" + esc(r.lure) + "</p><h5>The check that works</h5><p>" + esc(r.control) + '</p><div class="btnrow"><a class="btn sm" href="' + esc(R.links[cur]) + '" download>Download the module</a></div>';
  }
  $("#orbit").onclick = function (e) { var n = e.target.closest(".node"); if (n) { cur = n.dataset.role; detail(); } };
  $("#cmp").innerHTML = "<thead><tr><th>Role</th><th>What the attacker wants</th><th>How they ask</th><th>The check that works</th></tr></thead><tbody>" + R.order.map(function (k) { var r = R.roles[k]; return "<tr><td>" + esc(r.name) + "</td><td>" + esc(r.goal) + "</td><td>" + esc(r.lure) + "</td><td>" + esc(r.control) + "</td></tr>"; }).join("") + "</tbody>";
  $("#vtabs").onclick = function (e) { var b = e.target.closest("[data-v]"); if (!b) return; $$("#vtabs button").forEach(function (x) { x.classList.toggle("on", x === b); }); $("#view-diagram").hidden = b.dataset.v !== "diagram"; $("#view-compare").hidden = b.dataset.v !== "compare"; };
  $("#access").innerHTML = R.order.map(function (k) { var r = R.roles[k]; return '<div class="acard lift"><h4>' + esc(r.name) + "</h4><p>" + esc(r.focus) + "</p><small>Detect, Verify, Contain.</small>" + '<a class="btn primary sm" href="' + esc(R.links[k]) + '" download>Download the module</a></div>'; }).join("");
  detail();
}

/* ================= IMPACT ================= */
function initImpact() {
  $("#inrole").innerHTML = R.order.map(function (k) { var r = R.roles[k]; return flipCard('<span class="fc-t">' + esc(r.name) + "</span><small>Select to see what you will do differently</small>", '<span class="fc-k">What you will do differently</span><b>' + esc(r.name) + '</b><span class="fc-p">' + esc(r.control) + "</span>", "tall"); }).join("");
  bindFlips($("#inrole"));
}

/* ================= CONTACTS (home footer) ================= */
function initContacts() {
  var el = $("#contacts"); if (!el) return;
  el.innerHTML = R.contacts.map(function (c) {
    return '<p class="person"><b>' + esc(c.name || c.role) + "</b>" + (c.name ? " (" + esc(c.role) + ")" : "") + "<br>" + esc(c.org) + (c.email ? '<br>Email: <a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>" : "") + "</p>";
  }).join("");
}

initContacts();
if (page === "home") initHome();
if (page === "overview") initOverview();
if (page === "try") initTry();
if (page === "roles") initRoles();
if (page === "impact") initImpact();
})();

/** Header: slides away when you scroll down and comes back when you scroll up (more room for a screen recording). */
(function () {
  var top = document.querySelector(".top"); if (!top) return; var last = window.pageYOffset;
  window.addEventListener("scroll", function () { var y = window.pageYOffset; if (y > last + 4 && y > 120) top.classList.add("hide"); else if (y < last - 4 || y <= 120) top.classList.remove("hide"); last = y; }, { passive: true });
})();
