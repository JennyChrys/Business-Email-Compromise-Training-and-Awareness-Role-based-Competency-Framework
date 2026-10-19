/**
 * RBCF site behaviour (vanilla JavaScript, no build step).
 * The page to run is chosen by <body data-page="...">. All content comes from js/data.js (window.RBCF).
 * Sections: helpers, the red-flag, decision and knowledge-check engines (mountSpot, mountGame, mountKC), then one init function per page.
 */
(function () {
"use strict";
var R = window.RBCF, page = document.body.dataset.page;
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
var sentence = function (t) { t = String(t).toLowerCase(); return t.charAt(0).toUpperCase() + t.slice(1); };
var titleCase = function (t) { return String(t).toLowerCase().replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); }).replace(/\bAnd\b|\bThe\b|\bOf\b/g, function (w) { return w.toLowerCase(); }).replace(/^./, function (c) { return c.toUpperCase(); }); };
/** The link that launches a module straight in the desktop PowerPoint app (Microsoft Office URI scheme, open for view). */
function deskLink(k) { return "ms-powerpoint:ofv|u|" + new URL(R.links[k], location.href).href; }
/** Optional extra: the same module opened in the browser from OneDrive (links in data.js). */
function onlineBtn(k, cls) { return R.onedrive && R.onedrive[k] ? '<a class="btn ' + (cls || "sm") + '" href="' + esc(R.onedrive[k]) + '" target="_blank" rel="noopener">Open online (OneDrive)</a>' : ""; }
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

/** Progress store: remembers results in this browser only (localStorage), per role: 2 red-flag rounds, 2 decision games, 2 knowledge checks. */
var Store = (function () {
  var K = "rbcf-progress-v2", mem = {};
  try { mem = JSON.parse(localStorage.getItem(K)) || {}; } catch (e) { mem = {}; }
  function save() { try { localStorage.setItem(K, JSON.stringify(mem)); } catch (e) {} }
  function blank() { return { s: [null, null], g: [null, null], k: [null, null] }; }
  function rec(role) { return mem[role] || (mem[role] = blank()); }
  return {
    get: function (role) { return mem[role] || blank(); },
    spot: function (role, i, found, total) { rec(role).s[i] = { f: found, t: total }; save(); },
    game: function (role, i, kind) { rec(role).g[i] = kind; save(); },
    kc: function (role, i, ok) { rec(role).k[i] = ok ? "Y" : "N"; save(); },
    reset: function () { mem = {}; save(); },
    done: function (role) { var r = this.get(role); return r.s.filter(Boolean).length + r.g.filter(Boolean).length + r.k.filter(Boolean).length; }
  };
})();

/** Knowledge check. k = one question from data.js; onAnswer(correct) fires when an option is chosen. */
function mountKC(el, k, onAnswer) {
  var pick = -1;
  function render() {
    var h = '<div class="gsetup"><span class="chip">' + esc(k.phase) + "</span><h4>" + esc(k.q) + "</h4></div>";
    h += '<p class="hint">' + (pick < 0 ? "Choose one answer." : "Your answer:") + '</p><div class="opts">';
    k.opts.forEach(function (t, i) {
      var c = "opt"; if (pick >= 0) { if (i === k.ans) c += " right"; else if (i === pick) c += " wrong"; }
      h += '<button type="button" class="' + c + '" data-i="' + i + '"' + (pick >= 0 ? " disabled" : "") + "><b>" + "ABC".charAt(i) + "</b>" + esc(t) + "</button>";
    });
    h += "</div>";
    if (pick >= 0) {
      var ok = pick === k.ans;
      h += '<div class="out ' + (ok ? "S" : "F") + '"><h4>' + (ok ? "Correct" : "Not quite") + '</h4><p style="margin:0">' + (ok ? "" : "The answer is " + "ABC".charAt(k.ans) + ") " + esc(k.opts[k.ans]) + ". ") + esc(k.why) + "</p></div>";
      h += '<div class="row"><button type="button" class="btn outline" data-a="again">Try again</button></div>';
    }
    el.innerHTML = h;
  }
  el.onclick = function (e) {
    var t = e.target.closest("[data-i],[data-a]"); if (!t) return;
    if (t.dataset.i) { pick = +t.dataset.i; if (onAnswer) onAnswer(pick === k.ans); } else if (t.dataset.a === "again") pick = -1;
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
    out.hidden = false; out.innerHTML = "<h3>" + esc(r.name) + "</h3><p><b>What the attacker wants.</b> " + esc(r.goal) + "</p><p><b>The check that works.</b> " + esc(r.control) + '</p><div class="btnrow"><a class="btn primary sm" href="exercises.html?role=' + k + '">Try this role\'s exercises</a><a class="btn sm" href="' + esc(deskLink(k)) + '">Open in PowerPoint</a><a class="btn sm" href="' + esc(R.links[k]) + '" download>Download the module</a>' + onlineBtn(k) + '</div>';
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
function initTry() {
  var dl = $("a[download]"); if (dl) { dl.insertAdjacentHTML("beforebegin", '<a class="btn light" href="' + esc(deskLink("pay")) + '">Open in PowerPoint</a>'); dl.insertAdjacentHTML("afterend", onlineBtn("pay", "outline")); } mountSpot($("#try-spot"), R.spots.pay[0]); mountGame($("#try-game"), R.games.pay[0]); }

/* ================= ROLES ================= */
function initRoles() {
  var cur = "ap";
  function detail() {
    var r = R.roles[cur];
    $$(".node").forEach(function (n) { var on = n.dataset.role === cur; n.classList.toggle("on", on); n.setAttribute("aria-pressed", on); });
    $("#detail").innerHTML = '<div class="eyebrow">Role module</div><h3>' + esc(r.name) + "</h3><h5>What the attacker wants</h5><p>" + esc(r.goal) + "</p><h5>How they ask</h5><p>" + esc(r.lure) + "</p><h5>The check that works</h5><p>" + esc(r.control) + '</p><div class="btnrow"><a class="btn primary sm" href="exercises.html?role=' + cur + '">Try this role\'s exercises</a><a class="btn sm" href="' + esc(deskLink(cur)) + '">Open in PowerPoint</a><a class="btn sm" href="' + esc(R.links[cur]) + '" download>Download the module</a>' + onlineBtn(cur) + '</div>';
  }
  $("#orbit").onclick = function (e) { var n = e.target.closest(".node"); if (n) { cur = n.dataset.role; detail(); } };
  $("#cmp").innerHTML = "<thead><tr><th>Role</th><th>What the attacker wants</th><th>How they ask</th><th>The check that works</th></tr></thead><tbody>" + R.order.map(function (k) { var r = R.roles[k]; return "<tr><td>" + esc(r.name) + "</td><td>" + esc(r.goal) + "</td><td>" + esc(r.lure) + "</td><td>" + esc(r.control) + "</td></tr>"; }).join("") + "</tbody>";
  $("#vtabs").onclick = function (e) { var b = e.target.closest("[data-v]"); if (!b) return; $$("#vtabs button").forEach(function (x) { x.classList.toggle("on", x === b); }); $("#view-diagram").hidden = b.dataset.v !== "diagram"; $("#view-compare").hidden = b.dataset.v !== "compare"; };
  $("#access").innerHTML = R.order.map(function (k) { var r = R.roles[k]; return '<div class="acard lift"><h4>' + esc(r.name) + "</h4><p>" + esc(r.focus) + "</p><small>Detect, Verify, Contain.</small>" + '<a class="btn primary sm" href="' + esc(R.links[k]) + '" download>Download the module</a></div>'; }).join("");
  detail();
}

/* ================= EXERCISES ================= */
function initExercises() {
  var role = null, spotIx = 0, gameIx = 0, kcIx = 0;
  var KL = { S: "stopped", P: "partly", F: "fooled" }, KT = { S: "attempt stopped", P: "partly right", F: "fraud succeeded" };
  var TIP = { Detect: "Replay the red-flag rounds and read which lever each warning sign pulls.", Verify: "Replay the decision games. The check that works is one the attacker cannot reach.", Contain: "Revisit the Contain steps in your module: has money or data already moved, and who do you call first?" };
  function pts(kind, v) { if (kind === "s") return v.t ? v.f / v.t : 0; if (kind === "g") return { S: 1, P: 0.5, F: 0 }[v]; return v === "Y" ? 1 : 0; }
  function pct(s, n) { return n ? Math.round(s / n * 100) : null; }
  function level(p, n) { if (n < 6) return "Just getting started"; return p >= 85 ? "Strong" : p >= 65 ? "Solid" : "Building"; }
  var total = R.order.length * 6, TOT = { Detect: 0, Verify: 0, Contain: 0 };
  R.order.forEach(function (k) { TOT.Detect += 2; TOT.Verify += 2; R.kcs[k].forEach(function (q) { TOT[q.phase]++; }); });
  function dash() {
    var ph = { Detect: { n: 0, s: 0 }, Verify: { n: 0, s: 0 }, Contain: { n: 0, s: 0 } }, all = { n: 0, s: 0 }, rows = "", firstOpen = null;
    function add(p, v) { ph[p].n++; ph[p].s += v; all.n++; all.s += v; }
    R.order.forEach(function (k) {
      var r = Store.get(k), n = 0, sc = 0, pips = "";
      r.s.forEach(function (s, i) { if (s) { n++; var v = pts("s", s); sc += v; add("Detect", v); } pips += '<span class="pip' + (s ? (s.f === s.t ? " ok" : " part") : "") + '" title="Spot the Red Flag, email ' + (i + 1) + (s ? ": " + s.f + " of " + s.t : ": not played") + '">' + (s ? s.f + "/" + s.t + " flags" : "email " + (i + 1)) + "</span>"; });
      r.g.forEach(function (g, i) { if (g) { n++; var v = pts("g", g); sc += v; add("Verify", v); } pips += '<span class="pip ' + (g || "") + '" title="Decision game ' + (i + 1) + (g ? ": " + KT[g] : ": not played") + '">' + (g ? KL[g] : R.games[k][i].type.replace("AI ", "")) + "</span>"; });
      r.k.forEach(function (q, i) { if (q) { n++; var v = pts("k", q); sc += v; add(R.kcs[k][i].phase, v); } pips += '<span class="pip ' + (q === "Y" ? "ok" : q === "N" ? "F" : "") + '" title="Knowledge check ' + (i + 1) + (q ? (q === "Y" ? ": correct" : ": not quite") : ": not answered") + '">' + (q ? (q === "Y" ? "correct" : "missed") : "quiz " + (i + 1)) + "</span>"; });
      if (!firstOpen && n < 6) firstOpen = k;
      var p = pct(sc, n); rows += '<div class="drow"><b>' + esc(R.roles[k].name) + '</b><div class="pips">' + pips + '</div><span class="dn">' + n + "/6" + (p === null ? "" : " &middot; " + p + "%") + "</span></div>";
    });
    var op = pct(all.s, all.n);
    $("#dash-top").innerHTML = '<div class="st-big"><b>' + (op === null ? "&ndash;" : op + "%") + "</b><span>practice score so far</span></div><div><b>" + all.n + " of " + total + "</b><br><span class=\"muted\">activities complete</span></div><span class=\"st-lvl\">" + (all.n ? level(op, all.n) : "Not started") + "</span>";
    $("#dash-phases").innerHTML = ["Detect", "Verify", "Contain"].map(function (k) {
      var p = pct(ph[k].s, ph[k].n), what = { Detect: "red-flag rounds", Verify: "decisions and checks", Contain: "knowledge checks" }[k];
      return '<div class="st-ph"><div class="st-phn">' + k + " <small>" + what + '</small></div><div class="dbar"><i style="width:' + (p || 0) + '%"></i></div><div class="st-phv">' + (p === null ? "Not started" : p + "% &middot; " + ph[k].n + " of " + TOT[k] + " done") + "</div></div>";
    }).join("");
    var weak = null; ["Detect", "Verify", "Contain"].forEach(function (k) { if (ph[k].n) { var p = ph[k].s / ph[k].n; if (p < 0.85 && (weak === null || p < weak.p)) weak = { k: k, p: p }; } });
    var nx;
    if (!all.n) nx = "Choose a role below and start with a red-flag round.";
    else if (all.n === total) nx = "All " + total + " activities are complete. Download a module for the full training.";
    else if (weak) nx = "Weakest so far: <b>" + weak.k + "</b> (" + Math.round(weak.p * 100) + "%). " + TIP[weak.k];
    else nx = "Nice work so far. Next: <b>" + esc(R.roles[firstOpen].name) + "</b>.";
    $("#dash-next").innerHTML = "<b>Your next step.</b> " + nx; $("#dash-rows").innerHTML = rows;
    $$(".rp").forEach(function (b) { var n = Store.done(b.dataset.r); b.querySelector("small").textContent = n ? n + " of 6 done" + (n === 6 ? " \u2713" : "") : "Not started"; });
  }
  $("#rolepick").innerHTML = R.order.map(function (k) { return '<button type="button" class="rp" data-r="' + k + '"><b>' + esc(R.roles[k].name) + "</b><span>2 emails, 2 decisions, 2 quiz questions</span><small></small></button>"; }).join("");
  function roleScore(k) { var r = Store.get(k), n = 0, s = 0; r.s.forEach(function (v) { if (v) { n++; s += pts("s", v); } }); r.g.forEach(function (v) { if (v) { n++; s += pts("g", v); } }); r.k.forEach(function (v) { if (v) { n++; s += pts("k", v); } }); return pct(s, n); }
  function doneBox() {
    var full = Store.done(role) === 6, i = R.order.indexOf(role), next = R.order[(i + 1) % R.order.length]; $("#ex-done").hidden = !full; if (!full) return;
    $("#ex-done").innerHTML = "<span><b>All six activities are complete for " + esc(R.roles[role].name) + ": practice score " + roleScore(role) + "%.</b> Download the module for the full Detect, Verify and Contain training.</span><span class=\"btnrow\"><a class=\"btn light sm\" href=\"" + esc(deskLink(role)) + "\">Open in PowerPoint</a><a class=\"btn outline sm\" href=\"" + esc(R.links[role]) + "\" download>Download the module</a>" + onlineBtn(role, "outline sm") + "<button type=\"button\" class=\"btn outline sm\" data-next=\"" + next + "\">Next role: " + esc(R.roles[next].name) + "</button></span>";
  }
  function show() {
    $$(".rp").forEach(function (b) { b.classList.toggle("on", b.dataset.r === role); });
    if (!role) { $("#ex-body").hidden = true; $("#ex-hint").hidden = false; dash(); return; }
    $("#ex-body").hidden = false; $("#ex-hint").hidden = true; $("#ex-role").textContent = R.roles[role].name;
    var sp = R.spots[role], gm = R.games[role], kq = R.kcs[role]; doneBox();
    $("#spot-tabs").innerHTML = sp.map(function (s, j) { return '<button type="button" data-s="' + j + '" class="' + (j === spotIx ? "on" : "") + '">' + esc(s.title.split(":")[0]) + "</button>"; }).join("");
    $("#spot-name").textContent = sp[spotIx].title.replace(/^Round \d+: /, "");
    mountSpot($("#spot-mount"), sp[spotIx], function (f, t) { Store.spot(role, spotIx, f, t); dash(); doneBox(); });
    $("#game-tabs").innerHTML = gm.map(function (g, j) { return '<button type="button" data-g="' + j + '" class="' + (j === gameIx ? "on" : "") + '">' + esc(g.type) + "</button>"; }).join("");
    mountGame($("#game-mount"), gm[gameIx], function (kind) { Store.game(role, gameIx, kind); dash(); doneBox(); });
    $("#kc-tabs").innerHTML = kq.map(function (q, j) { return '<button type="button" data-q="' + j + '" class="' + (j === kcIx ? "on" : "") + '">Question ' + (j + 1) + "</button>"; }).join("");
    mountKC($("#kc-mount"), kq[kcIx], function (ok) { Store.kc(role, kcIx, ok); dash(); doneBox(); });
    dash();
  }
  function go(k) { role = k; spotIx = 0; gameIx = 0; kcIx = 0; show(); $("#ex-body").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }
  $("#rolepick").onclick = function (e) { var b = e.target.closest("[data-r]"); if (b) go(b.dataset.r); };
  $("#ex-done").onclick = function (e) { var b = e.target.closest("[data-next]"); if (b) go(b.dataset.next); };
  $("#spot-tabs").onclick = function (e) { var b = e.target.closest("[data-s]"); if (b) { spotIx = +b.dataset.s; show(); } };
  $("#game-tabs").onclick = function (e) { var b = e.target.closest("[data-g]"); if (b) { gameIx = +b.dataset.g; show(); } };
  $("#kc-tabs").onclick = function (e) { var b = e.target.closest("[data-q]"); if (b) { kcIx = +b.dataset.q; show(); } };
  $("#dash-reset").onclick = function () { Store.reset(); show(); };
  var q = new URLSearchParams(location.search).get("role"); if (q && R.roles[q]) role = q;
  show();
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
if (page === "exercises") initExercises();
})();

/** Header: slides away when you scroll down and comes back when you scroll up (more room for a screen recording). */
(function () {
  var top = document.querySelector(".top"); if (!top) return; var last = window.pageYOffset;
  window.addEventListener("scroll", function () { var y = window.pageYOffset; if (y > last + 4 && y > 120) top.classList.add("hide"); else if (y < last - 4 || y <= 120) top.classList.remove("hide"); last = y; }, { passive: true });
})();
