// @apple/hierarchical-confusion-matrix v0.1.1 Copyright 2021 Jochen Görtler
!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], n)
    : n(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).confMat =
          {})
      );
})(this, function (t) {
  "use strict";
  const n = {
    normalization: "total",
    encoding: "color",
    collapsed: [],
    measures: ["precision", "recall", "accuracy"],
  };
  function e() {}
  function r(t) {
    return t();
  }
  function i() {
    return Object.create(null);
  }
  function o(t) {
    t.forEach(r);
  }
  function a(t) {
    return "function" == typeof t;
  }
  function u(t, n) {
    return t != t
      ? n == n
      : t !== n || (t && "object" == typeof t) || "function" == typeof t;
  }
  function c(t, n, r) {
    t.$$.on_destroy.push(
      (function (t, ...n) {
        if (null == t) return e;
        const r = t.subscribe(...n);
        return r.unsubscribe ? () => r.unsubscribe() : r;
      })(n, r)
    );
  }
  function s(t) {
    return null == t ? "" : t;
  }
  function l(t, n, e = n) {
    return t.set(e), n;
  }
  let f,
    h = !1;
  function d(t, n, e, r) {
    for (; t < n; ) {
      const i = t + ((n - t) >> 1);
      e(i) <= r ? (t = i + 1) : (n = i);
    }
    return t;
  }
  function p(t, n) {
    h
      ? (!(function (t) {
          if (t.hydrate_init) return;
          t.hydrate_init = !0;
          const n = t.childNodes,
            e = new Int32Array(n.length + 1),
            r = new Int32Array(n.length);
          e[0] = -1;
          let i = 0;
          for (let t = 0; t < n.length; t++) {
            const o =
              d(1, i + 1, (t) => n[e[t]].claim_order, n[t].claim_order) - 1;
            r[t] = e[o] + 1;
            const a = o + 1;
            (e[a] = t), (i = Math.max(a, i));
          }
          const o = [],
            a = [];
          let u = n.length - 1;
          for (let t = e[i] + 1; 0 != t; t = r[t - 1]) {
            for (o.push(n[t - 1]); u >= t; u--) a.push(n[u]);
            u--;
          }
          for (; u >= 0; u--) a.push(n[u]);
          o.reverse(), a.sort((t, n) => t.claim_order - n.claim_order);
          for (let n = 0, e = 0; n < a.length; n++) {
            for (; e < o.length && a[n].claim_order >= o[e].claim_order; ) e++;
            const r = e < o.length ? o[e] : null;
            t.insertBefore(a[n], r);
          }
        })(t),
        (void 0 === t.actual_end_child ||
          (null !== t.actual_end_child &&
            t.actual_end_child.parentElement !== t)) &&
          (t.actual_end_child = t.firstChild),
        n !== t.actual_end_child
          ? t.insertBefore(n, t.actual_end_child)
          : (t.actual_end_child = n.nextSibling))
      : n.parentNode !== t && t.appendChild(n);
  }
  function g(t, n, e) {
    h && !e
      ? p(t, n)
      : (n.parentNode !== t || (e && n.nextSibling !== e)) &&
        t.insertBefore(n, e || null);
  }
  function v(t) {
    t.parentNode.removeChild(t);
  }
  function y(t, n) {
    for (let e = 0; e < t.length; e += 1) t[e] && t[e].d(n);
  }
  function m(t) {
    return document.createElement(t);
  }
  function b(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t);
  }
  function _(t) {
    return document.createTextNode(t);
  }
  function w() {
    return _(" ");
  }
  function x() {
    return _("");
  }
  function M(t, n, e, r) {
    return t.addEventListener(n, e, r), () => t.removeEventListener(n, e, r);
  }
  function j(t, n, e) {
    null == e
      ? t.removeAttribute(n)
      : t.getAttribute(n) !== e && t.setAttribute(n, e);
  }
  function k(t, n) {
    (n = "" + n), t.wholeText !== n && (t.data = n);
  }
  function A(t, n, e, r) {
    t.style.setProperty(n, e, r ? "important" : "");
  }
  function $(t, n) {
    for (let e = 0; e < t.options.length; e += 1) {
      const r = t.options[e];
      if (r.__value === n) return void (r.selected = !0);
    }
  }
  function S(t) {
    f = t;
  }
  const T = [],
    N = [],
    C = [],
    E = [],
    I = Promise.resolve();
  let z = !1;
  function D(t) {
    C.push(t);
  }
  let O = !1;
  const U = new Set();
  function q() {
    if (!O) {
      O = !0;
      do {
        for (let t = 0; t < T.length; t += 1) {
          const n = T[t];
          S(n), V(n.$$);
        }
        for (S(null), T.length = 0; N.length; ) N.pop()();
        for (let t = 0; t < C.length; t += 1) {
          const n = C[t];
          U.has(n) || (U.add(n), n());
        }
        C.length = 0;
      } while (T.length);
      for (; E.length; ) E.pop()();
      (z = !1), (O = !1), U.clear();
    }
  }
  function V(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update);
      const n = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, n),
        t.after_update.forEach(D);
    }
  }
  const F = new Set();
  let R;
  function L() {
    R = { r: 0, c: [], p: R };
  }
  function B() {
    R.r || o(R.c), (R = R.p);
  }
  function Y(t, n) {
    t && t.i && (F.delete(t), t.i(n));
  }
  function P(t, n, e, r) {
    if (t && t.o) {
      if (F.has(t)) return;
      F.add(t),
        R.c.push(() => {
          F.delete(t), r && (e && t.d(1), r());
        }),
        t.o(n);
    }
  }
  function W(t) {
    t && t.c();
  }
  function H(t, n, e, i) {
    const { fragment: u, on_mount: c, on_destroy: s, after_update: l } = t.$$;
    u && u.m(n, e),
      i ||
        D(() => {
          const n = c.map(r).filter(a);
          s ? s.push(...n) : o(n), (t.$$.on_mount = []);
        }),
      l.forEach(D);
  }
  function G(t, n) {
    const e = t.$$;
    null !== e.fragment &&
      (o(e.on_destroy),
      e.fragment && e.fragment.d(n),
      (e.on_destroy = e.fragment = null),
      (e.ctx = []));
  }
  function Z(t, n) {
    -1 === t.$$.dirty[0] &&
      (T.push(t), z || ((z = !0), I.then(q)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
  }
  function X(t, n, r, a, u, c, s = [-1]) {
    const l = f;
    S(t);
    const d = (t.$$ = {
      fragment: null,
      ctx: null,
      props: c,
      update: e,
      not_equal: u,
      bound: i(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(l ? l.$$.context : n.context || []),
      callbacks: i(),
      dirty: s,
      skip_bound: !1,
    });
    let p = !1;
    if (
      ((d.ctx = r
        ? r(t, n.props || {}, (n, e, ...r) => {
            const i = r.length ? r[0] : e;
            return (
              d.ctx &&
                u(d.ctx[n], (d.ctx[n] = i)) &&
                (!d.skip_bound && d.bound[n] && d.bound[n](i), p && Z(t, n)),
              e
            );
          })
        : []),
      d.update(),
      (p = !0),
      o(d.before_update),
      (d.fragment = !!a && a(d.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        h = !0;
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(n.target);
        d.fragment && d.fragment.l(t), t.forEach(v);
      } else d.fragment && d.fragment.c();
      n.intro && Y(t.$$.fragment),
        H(t, n.target, n.anchor, n.customElement),
        (h = !1),
        q();
    }
    S(l);
  }
  class J {
    $destroy() {
      G(this, 1), (this.$destroy = e);
    }
    $on(t, n) {
      const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        e.push(n),
        () => {
          const t = e.indexOf(n);
          -1 !== t && e.splice(t, 1);
        }
      );
    }
    $set(t) {
      var n;
      this.$$set &&
        ((n = t), 0 !== Object.keys(n).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  }
  var Q =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  function K(t) {
    return t &&
      t.__esModule &&
      Object.prototype.hasOwnProperty.call(t, "default")
      ? t.default
      : t;
  }
  function tt(t) {
    if (t.__esModule) return t;
    var n = Object.defineProperty({}, "__esModule", { value: !0 });
    return (
      Object.keys(t).forEach(function (e) {
        var r = Object.getOwnPropertyDescriptor(t, e);
        Object.defineProperty(
          n,
          e,
          r.get
            ? r
            : {
                enumerable: !0,
                get: function () {
                  return t[e];
                },
              }
        );
      }),
      n
    );
  }
  var nt = {};
  var et = function (t, n, e) {
    return 0 === t.length
      ? t
      : n
      ? (e || t.sort(n),
        (function (t, n) {
          for (var e = 1, r = t.length, i = t[0], o = t[0], a = 1; a < r; ++a)
            if (((o = i), n((i = t[a]), o))) {
              if (a === e) {
                e++;
                continue;
              }
              t[e++] = i;
            }
          return (t.length = e), t;
        })(t, n))
      : (e || t.sort(),
        (function (t) {
          for (
            var n = 1, e = t.length, r = t[0], i = t[0], o = 1;
            o < e;
            ++o, i = r
          )
            if (((i = r), (r = t[o]) !== i)) {
              if (o === n) {
                n++;
                continue;
              }
              t[n++] = r;
            }
          return (t.length = n), t;
        })(t));
  };
  function rt(t, n, e) {
    var r,
      i,
      o = t.length,
      a = n.arrayArgs.length,
      u = n.indexArgs.length > 0,
      c = [],
      s = [],
      l = 0,
      f = 0;
    for (r = 0; r < o; ++r) s.push(["i", r, "=0"].join(""));
    for (i = 0; i < a; ++i)
      for (r = 0; r < o; ++r)
        (f = l),
          (l = t[r]),
          0 === r
            ? s.push(["d", i, "s", r, "=t", i, "p", l].join(""))
            : s.push(
                [
                  "d",
                  i,
                  "s",
                  r,
                  "=(t",
                  i,
                  "p",
                  l,
                  "-s",
                  f,
                  "*t",
                  i,
                  "p",
                  f,
                  ")",
                ].join("")
              );
    for (s.length > 0 && c.push("var " + s.join(",")), r = o - 1; r >= 0; --r)
      (l = t[r]),
        c.push(["for(i", r, "=0;i", r, "<s", l, ";++i", r, "){"].join(""));
    for (c.push(e), r = 0; r < o; ++r) {
      for (f = l, l = t[r], i = 0; i < a; ++i)
        c.push(["p", i, "+=d", i, "s", r].join(""));
      u &&
        (r > 0 && c.push(["index[", f, "]-=s", f].join("")),
        c.push(["++index[", l, "]"].join(""))),
        c.push("}");
    }
    return c.join("\n");
  }
  function it(t, n, e) {
    for (var r = t.body, i = [], o = [], a = 0; a < t.args.length; ++a) {
      var u = t.args[a];
      if (!(u.count <= 0)) {
        var c = new RegExp(u.name, "g"),
          s = "",
          l = n.arrayArgs.indexOf(a);
        switch (n.argTypes[a]) {
          case "offset":
            var f = n.offsetArgIndex.indexOf(a);
            (l = n.offsetArgs[f].array), (s = "+q" + f);
          case "array":
            s = "p" + l + s;
            var h = "l" + a,
              d = "a" + l;
            if (0 === n.arrayBlockIndices[l])
              1 === u.count
                ? "generic" === e[l]
                  ? u.lvalue
                    ? (i.push(["var ", h, "=", d, ".get(", s, ")"].join("")),
                      (r = r.replace(c, h)),
                      o.push([d, ".set(", s, ",", h, ")"].join("")))
                    : (r = r.replace(c, [d, ".get(", s, ")"].join("")))
                  : (r = r.replace(c, [d, "[", s, "]"].join("")))
                : "generic" === e[l]
                ? (i.push(["var ", h, "=", d, ".get(", s, ")"].join("")),
                  (r = r.replace(c, h)),
                  u.lvalue && o.push([d, ".set(", s, ",", h, ")"].join("")))
                : (i.push(["var ", h, "=", d, "[", s, "]"].join("")),
                  (r = r.replace(c, h)),
                  u.lvalue && o.push([d, "[", s, "]=", h].join("")));
            else {
              for (
                var p = [u.name], g = [s], v = 0;
                v < Math.abs(n.arrayBlockIndices[l]);
                v++
              )
                p.push("\\s*\\[([^\\]]+)\\]"),
                  g.push("$" + (v + 1) + "*t" + l + "b" + v);
              if (
                ((c = new RegExp(p.join(""), "g")),
                (s = g.join("+")),
                "generic" === e[l])
              )
                throw new Error(
                  "cwise: Generic arrays not supported in combination with blocks!"
                );
              r = r.replace(c, [d, "[", s, "]"].join(""));
            }
            break;
          case "scalar":
            r = r.replace(c, "Y" + n.scalarArgs.indexOf(a));
            break;
          case "index":
            r = r.replace(c, "index");
            break;
          case "shape":
            r = r.replace(c, "shape");
        }
      }
    }
    return [i.join("\n"), r, o.join("\n")].join("\n").trim();
  }
  function ot(t) {
    for (var n = new Array(t.length), e = !0, r = 0; r < t.length; ++r) {
      var i = t[r],
        o = i.match(/\d+/);
      (o = o ? o[0] : ""),
        0 === i.charAt(0)
          ? (n[r] = "u" + i.charAt(1) + o)
          : (n[r] = i.charAt(0) + o),
        r > 0 && (e = e && n[r] === n[r - 1]);
    }
    return e ? n[0] : n.join("");
  }
  var at = function (t, n) {
    for (
      var e = (n[1].length - Math.abs(t.arrayBlockIndices[0])) | 0,
        r = new Array(t.arrayArgs.length),
        i = new Array(t.arrayArgs.length),
        o = 0;
      o < t.arrayArgs.length;
      ++o
    )
      (i[o] = n[2 * o]), (r[o] = n[2 * o + 1]);
    var a = [],
      u = [],
      c = [],
      s = [],
      l = [];
    for (o = 0; o < t.arrayArgs.length; ++o) {
      t.arrayBlockIndices[o] < 0
        ? (c.push(0), s.push(e), a.push(e), u.push(e + t.arrayBlockIndices[o]))
        : (c.push(t.arrayBlockIndices[o]),
          s.push(t.arrayBlockIndices[o] + e),
          a.push(0),
          u.push(t.arrayBlockIndices[o]));
      for (var f = [], h = 0; h < r[o].length; h++)
        c[o] <= r[o][h] && r[o][h] < s[o] && f.push(r[o][h] - c[o]);
      l.push(f);
    }
    var d = ["SS"],
      p = ["'use strict'"],
      g = [];
    for (h = 0; h < e; ++h) g.push(["s", h, "=SS[", h, "]"].join(""));
    for (o = 0; o < t.arrayArgs.length; ++o) {
      d.push("a" + o), d.push("t" + o), d.push("p" + o);
      for (h = 0; h < e; ++h)
        g.push(["t", o, "p", h, "=t", o, "[", c[o] + h, "]"].join(""));
      for (h = 0; h < Math.abs(t.arrayBlockIndices[o]); ++h)
        g.push(["t", o, "b", h, "=t", o, "[", a[o] + h, "]"].join(""));
    }
    for (o = 0; o < t.scalarArgs.length; ++o) d.push("Y" + o);
    if (
      (t.shapeArgs.length > 0 && g.push("shape=SS.slice(0)"),
      t.indexArgs.length > 0)
    ) {
      var v = new Array(e);
      for (o = 0; o < e; ++o) v[o] = "0";
      g.push(["index=[", v.join(","), "]"].join(""));
    }
    for (o = 0; o < t.offsetArgs.length; ++o) {
      var y = t.offsetArgs[o],
        m = [];
      for (h = 0; h < y.offset.length; ++h)
        0 !== y.offset[h] &&
          (1 === y.offset[h]
            ? m.push(["t", y.array, "p", h].join(""))
            : m.push([y.offset[h], "*t", y.array, "p", h].join("")));
      0 === m.length
        ? g.push("q" + o + "=0")
        : g.push(["q", o, "=", m.join("+")].join(""));
    }
    var b = et(
      [].concat(t.pre.thisVars).concat(t.body.thisVars).concat(t.post.thisVars)
    );
    for (
      (g = g.concat(b)).length > 0 && p.push("var " + g.join(",")), o = 0;
      o < t.arrayArgs.length;
      ++o
    )
      p.push("p" + o + "|=0");
    t.pre.body.length > 3 && p.push(it(t.pre, t, i));
    var _ = it(t.body, t, i),
      w = (function (t) {
        for (var n = 0, e = t[0].length; n < e; ) {
          for (var r = 1; r < t.length; ++r) if (t[r][n] !== t[0][n]) return n;
          ++n;
        }
        return n;
      })(l);
    w < e
      ? p.push(
          (function (t, n, e, r) {
            for (
              var i = n.length,
                o = e.arrayArgs.length,
                a = e.blockSize,
                u = e.indexArgs.length > 0,
                c = [],
                s = 0;
              s < o;
              ++s
            )
              c.push(["var offset", s, "=p", s].join(""));
            for (s = t; s < i; ++s)
              c.push(
                ["for(var j" + s + "=SS[", n[s], "]|0;j", s, ">0;){"].join("")
              ),
                c.push(["if(j", s, "<", a, "){"].join("")),
                c.push(["s", n[s], "=j", s].join("")),
                c.push(["j", s, "=0"].join("")),
                c.push(["}else{s", n[s], "=", a].join("")),
                c.push(["j", s, "-=", a, "}"].join("")),
                u && c.push(["index[", n[s], "]=j", s].join(""));
            for (s = 0; s < o; ++s) {
              for (var l = ["offset" + s], f = t; f < i; ++f)
                l.push(["j", f, "*t", s, "p", n[f]].join(""));
              c.push(["p", s, "=(", l.join("+"), ")"].join(""));
            }
            for (c.push(rt(n, e, r)), s = t; s < i; ++s) c.push("}");
            return c.join("\n");
          })(w, l[0], t, _)
        )
      : p.push(rt(l[0], t, _)),
      t.post.body.length > 3 && p.push(it(t.post, t, i)),
      t.debug &&
        console.log(
          "-----Generated cwise routine for ",
          n,
          ":\n" + p.join("\n") + "\n----------"
        );
    var x = [
      t.funcName || "unnamed",
      "_cwise_loop_",
      r[0].join("s"),
      "m",
      w,
      ot(i),
    ].join("");
    return new Function(
      [
        "function ",
        x,
        "(",
        d.join(","),
        "){",
        p.join("\n"),
        "} return ",
        x,
      ].join("")
    )();
  };
  var ut = function (t) {
    var n = ["'use strict'", "var CACHED={}"],
      e = [],
      r = t.funcName + "_cwise_thunk";
    n.push(["return function ", r, "(", t.shimArgs.join(","), "){"].join(""));
    for (
      var i = [],
        o = [],
        a = [
          [
            "array",
            t.arrayArgs[0],
            ".shape.slice(",
            Math.max(0, t.arrayBlockIndices[0]),
            t.arrayBlockIndices[0] < 0
              ? "," + t.arrayBlockIndices[0] + ")"
              : ")",
          ].join(""),
        ],
        u = [],
        c = [],
        s = 0;
      s < t.arrayArgs.length;
      ++s
    ) {
      var l = t.arrayArgs[s];
      e.push(
        ["t", l, "=array", l, ".dtype,", "r", l, "=array", l, ".order"].join("")
      ),
        i.push("t" + l),
        i.push("r" + l),
        o.push("t" + l),
        o.push("r" + l + ".join()"),
        a.push("array" + l + ".data"),
        a.push("array" + l + ".stride"),
        a.push("array" + l + ".offset|0"),
        s > 0 &&
          (u.push(
            "array" +
              t.arrayArgs[0] +
              ".shape.length===array" +
              l +
              ".shape.length+" +
              (Math.abs(t.arrayBlockIndices[0]) -
                Math.abs(t.arrayBlockIndices[s]))
          ),
          c.push(
            "array" +
              t.arrayArgs[0] +
              ".shape[shapeIndex+" +
              Math.max(0, t.arrayBlockIndices[0]) +
              "]===array" +
              l +
              ".shape[shapeIndex+" +
              Math.max(0, t.arrayBlockIndices[s]) +
              "]"
          ));
    }
    for (
      t.arrayArgs.length > 1 &&
        (n.push(
          "if (!(" +
            u.join(" && ") +
            ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"
        ),
        n.push(
          "for(var shapeIndex=array" +
            t.arrayArgs[0] +
            ".shape.length-" +
            Math.abs(t.arrayBlockIndices[0]) +
            "; shapeIndex--\x3e0;) {"
        ),
        n.push(
          "if (!(" +
            c.join(" && ") +
            ")) throw new Error('cwise: Arrays do not all have the same shape!')"
        ),
        n.push("}")),
        s = 0;
      s < t.scalarArgs.length;
      ++s
    )
      a.push("scalar" + t.scalarArgs[s]);
    return (
      e.push(["type=[", o.join(","), "].join()"].join("")),
      e.push("proc=CACHED[type]"),
      n.push("var " + e.join(",")),
      n.push(
        [
          "if(!proc){",
          "CACHED[type]=proc=compile([",
          i.join(","),
          "])}",
          "return proc(",
          a.join(","),
          ")}",
        ].join("")
      ),
      t.debug &&
        console.log("-----Generated thunk:\n" + n.join("\n") + "\n----------"),
      new Function("compile", n.join("\n"))(at.bind(void 0, t))
    );
  };
  function ct() {
    (this.argTypes = []),
      (this.shimArgs = []),
      (this.arrayArgs = []),
      (this.arrayBlockIndices = []),
      (this.scalarArgs = []),
      (this.offsetArgs = []),
      (this.offsetArgIndex = []),
      (this.indexArgs = []),
      (this.shapeArgs = []),
      (this.funcName = ""),
      (this.pre = null),
      (this.body = null),
      (this.post = null),
      (this.debug = !1);
  }
  var st = function (t) {
    var n = new ct();
    (n.pre = t.pre), (n.body = t.body), (n.post = t.post);
    var e = t.args.slice(0);
    n.argTypes = e;
    for (var r = 0; r < e.length; ++r) {
      var i = e[r];
      if ("array" === i || ("object" == typeof i && i.blockIndices)) {
        if (
          ((n.argTypes[r] = "array"),
          n.arrayArgs.push(r),
          n.arrayBlockIndices.push(i.blockIndices ? i.blockIndices : 0),
          n.shimArgs.push("array" + r),
          r < n.pre.args.length && n.pre.args[r].count > 0)
        )
          throw new Error("cwise: pre() block may not reference array args");
        if (r < n.post.args.length && n.post.args[r].count > 0)
          throw new Error("cwise: post() block may not reference array args");
      } else if ("scalar" === i)
        n.scalarArgs.push(r), n.shimArgs.push("scalar" + r);
      else if ("index" === i) {
        if (
          (n.indexArgs.push(r),
          r < n.pre.args.length && n.pre.args[r].count > 0)
        )
          throw new Error("cwise: pre() block may not reference array index");
        if (r < n.body.args.length && n.body.args[r].lvalue)
          throw new Error("cwise: body() block may not write to array index");
        if (r < n.post.args.length && n.post.args[r].count > 0)
          throw new Error("cwise: post() block may not reference array index");
      } else if ("shape" === i) {
        if (
          (n.shapeArgs.push(r), r < n.pre.args.length && n.pre.args[r].lvalue)
        )
          throw new Error("cwise: pre() block may not write to array shape");
        if (r < n.body.args.length && n.body.args[r].lvalue)
          throw new Error("cwise: body() block may not write to array shape");
        if (r < n.post.args.length && n.post.args[r].lvalue)
          throw new Error("cwise: post() block may not write to array shape");
      } else {
        if ("object" != typeof i || !i.offset)
          throw new Error("cwise: Unknown argument type " + e[r]);
        (n.argTypes[r] = "offset"),
          n.offsetArgs.push({ array: i.array, offset: i.offset }),
          n.offsetArgIndex.push(r);
      }
    }
    if (n.arrayArgs.length <= 0)
      throw new Error("cwise: No array arguments specified");
    if (n.pre.args.length > e.length)
      throw new Error("cwise: Too many arguments in pre() block");
    if (n.body.args.length > e.length)
      throw new Error("cwise: Too many arguments in body() block");
    if (n.post.args.length > e.length)
      throw new Error("cwise: Too many arguments in post() block");
    return (
      (n.debug = !!t.printCode || !!t.debug),
      (n.funcName = t.funcName || "cwise"),
      (n.blockSize = t.blockSize || 64),
      ut(n)
    );
  };
  !(function (t) {
    var n = st,
      e = { body: "", args: [], thisVars: [], localVars: [] };
    function r(t) {
      if (!t) return e;
      for (var n = 0; n < t.args.length; ++n) {
        var r = t.args[n];
        t.args[n] =
          0 === n
            ? { name: r, lvalue: !0, rvalue: !!t.rvalue, count: t.count || 1 }
            : { name: r, lvalue: !1, rvalue: !0, count: 1 };
      }
      return (
        t.thisVars || (t.thisVars = []), t.localVars || (t.localVars = []), t
      );
    }
    function i(t) {
      for (var e = [], i = 0; i < t.args.length; ++i) e.push("a" + i);
      return new Function(
        "P",
        [
          "return function ",
          t.funcName,
          "_ndarrayops(",
          e.join(","),
          ") {P(",
          e.join(","),
          ");return a0}",
        ].join("")
      )(
        (function (t) {
          return n({
            args: t.args,
            pre: r(t.pre),
            body: r(t.body),
            post: r(t.proc),
            funcName: t.funcName,
          });
        })(t)
      );
    }
    var o = {
      add: "+",
      sub: "-",
      mul: "*",
      div: "/",
      mod: "%",
      band: "&",
      bor: "|",
      bxor: "^",
      lshift: "<<",
      rshift: ">>",
      rrshift: ">>>",
    };
    !(function () {
      for (var n in o) {
        var e = o[n];
        (t[n] = i({
          args: ["array", "array", "array"],
          body: { args: ["a", "b", "c"], body: "a=b" + e + "c" },
          funcName: n,
        })),
          (t[n + "eq"] = i({
            args: ["array", "array"],
            body: { args: ["a", "b"], body: "a" + e + "=b" },
            rvalue: !0,
            funcName: n + "eq",
          })),
          (t[n + "s"] = i({
            args: ["array", "array", "scalar"],
            body: { args: ["a", "b", "s"], body: "a=b" + e + "s" },
            funcName: n + "s",
          })),
          (t[n + "seq"] = i({
            args: ["array", "scalar"],
            body: { args: ["a", "s"], body: "a" + e + "=s" },
            rvalue: !0,
            funcName: n + "seq",
          }));
      }
    })();
    var a = { not: "!", bnot: "~", neg: "-", recip: "1.0/" };
    !(function () {
      for (var n in a) {
        var e = a[n];
        (t[n] = i({
          args: ["array", "array"],
          body: { args: ["a", "b"], body: "a=" + e + "b" },
          funcName: n,
        })),
          (t[n + "eq"] = i({
            args: ["array"],
            body: { args: ["a"], body: "a=" + e + "a" },
            rvalue: !0,
            count: 2,
            funcName: n + "eq",
          }));
      }
    })();
    var u = {
      and: "&&",
      or: "||",
      eq: "===",
      neq: "!==",
      lt: "<",
      gt: ">",
      leq: "<=",
      geq: ">=",
    };
    !(function () {
      for (var n in u) {
        var e = u[n];
        (t[n] = i({
          args: ["array", "array", "array"],
          body: { args: ["a", "b", "c"], body: "a=b" + e + "c" },
          funcName: n,
        })),
          (t[n + "s"] = i({
            args: ["array", "array", "scalar"],
            body: { args: ["a", "b", "s"], body: "a=b" + e + "s" },
            funcName: n + "s",
          })),
          (t[n + "eq"] = i({
            args: ["array", "array"],
            body: { args: ["a", "b"], body: "a=a" + e + "b" },
            rvalue: !0,
            count: 2,
            funcName: n + "eq",
          })),
          (t[n + "seq"] = i({
            args: ["array", "scalar"],
            body: { args: ["a", "s"], body: "a=a" + e + "s" },
            rvalue: !0,
            count: 2,
            funcName: n + "seq",
          }));
      }
    })();
    var c = [
      "abs",
      "acos",
      "asin",
      "atan",
      "ceil",
      "cos",
      "exp",
      "floor",
      "log",
      "round",
      "sin",
      "sqrt",
      "tan",
    ];
    !(function () {
      for (var n = 0; n < c.length; ++n) {
        var e = c[n];
        (t[e] = i({
          args: ["array", "array"],
          pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
          body: { args: ["a", "b"], body: "a=this_f(b)", thisVars: ["this_f"] },
          funcName: e,
        })),
          (t[e + "eq"] = i({
            args: ["array"],
            pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
            body: { args: ["a"], body: "a=this_f(a)", thisVars: ["this_f"] },
            rvalue: !0,
            count: 2,
            funcName: e + "eq",
          }));
      }
    })();
    var s = ["max", "min", "atan2", "pow"];
    !(function () {
      for (var n = 0; n < s.length; ++n) {
        var e = s[n];
        (t[e] = i({
          args: ["array", "array", "array"],
          pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
          body: {
            args: ["a", "b", "c"],
            body: "a=this_f(b,c)",
            thisVars: ["this_f"],
          },
          funcName: e,
        })),
          (t[e + "s"] = i({
            args: ["array", "array", "scalar"],
            pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
            body: {
              args: ["a", "b", "c"],
              body: "a=this_f(b,c)",
              thisVars: ["this_f"],
            },
            funcName: e + "s",
          })),
          (t[e + "eq"] = i({
            args: ["array", "array"],
            pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
            body: {
              args: ["a", "b"],
              body: "a=this_f(a,b)",
              thisVars: ["this_f"],
            },
            rvalue: !0,
            count: 2,
            funcName: e + "eq",
          })),
          (t[e + "seq"] = i({
            args: ["array", "scalar"],
            pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
            body: {
              args: ["a", "b"],
              body: "a=this_f(a,b)",
              thisVars: ["this_f"],
            },
            rvalue: !0,
            count: 2,
            funcName: e + "seq",
          }));
      }
    })();
    var l = ["atan2", "pow"];
    !(function () {
      for (var n = 0; n < l.length; ++n) {
        var e = l[n];
        (t[e + "op"] = i({
          args: ["array", "array", "array"],
          pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
          body: {
            args: ["a", "b", "c"],
            body: "a=this_f(c,b)",
            thisVars: ["this_f"],
          },
          funcName: e + "op",
        })),
          (t[e + "ops"] = i({
            args: ["array", "array", "scalar"],
            pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
            body: {
              args: ["a", "b", "c"],
              body: "a=this_f(c,b)",
              thisVars: ["this_f"],
            },
            funcName: e + "ops",
          })),
          (t[e + "opeq"] = i({
            args: ["array", "array"],
            pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
            body: {
              args: ["a", "b"],
              body: "a=this_f(b,a)",
              thisVars: ["this_f"],
            },
            rvalue: !0,
            count: 2,
            funcName: e + "opeq",
          })),
          (t[e + "opseq"] = i({
            args: ["array", "scalar"],
            pre: { args: [], body: "this_f=Math." + e, thisVars: ["this_f"] },
            body: {
              args: ["a", "b"],
              body: "a=this_f(b,a)",
              thisVars: ["this_f"],
            },
            rvalue: !0,
            count: 2,
            funcName: e + "opseq",
          }));
      }
    })(),
      (t.any = n({
        args: ["array"],
        pre: e,
        body: {
          args: [{ name: "a", lvalue: !1, rvalue: !0, count: 1 }],
          body: "if(a){return true}",
          localVars: [],
          thisVars: [],
        },
        post: { args: [], localVars: [], thisVars: [], body: "return false" },
        funcName: "any",
      })),
      (t.all = n({
        args: ["array"],
        pre: e,
        body: {
          args: [{ name: "x", lvalue: !1, rvalue: !0, count: 1 }],
          body: "if(!x){return false}",
          localVars: [],
          thisVars: [],
        },
        post: { args: [], localVars: [], thisVars: [], body: "return true" },
        funcName: "all",
      })),
      (t.sum = n({
        args: ["array"],
        pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0",
        },
        body: {
          args: [{ name: "a", lvalue: !1, rvalue: !0, count: 1 }],
          body: "this_s+=a",
          localVars: [],
          thisVars: ["this_s"],
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s",
        },
        funcName: "sum",
      })),
      (t.prod = n({
        args: ["array"],
        pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=1",
        },
        body: {
          args: [{ name: "a", lvalue: !1, rvalue: !0, count: 1 }],
          body: "this_s*=a",
          localVars: [],
          thisVars: ["this_s"],
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s",
        },
        funcName: "prod",
      })),
      (t.norm2squared = n({
        args: ["array"],
        pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0",
        },
        body: {
          args: [{ name: "a", lvalue: !1, rvalue: !0, count: 2 }],
          body: "this_s+=a*a",
          localVars: [],
          thisVars: ["this_s"],
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s",
        },
        funcName: "norm2squared",
      })),
      (t.norm2 = n({
        args: ["array"],
        pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0",
        },
        body: {
          args: [{ name: "a", lvalue: !1, rvalue: !0, count: 2 }],
          body: "this_s+=a*a",
          localVars: [],
          thisVars: ["this_s"],
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return Math.sqrt(this_s)",
        },
        funcName: "norm2",
      })),
      (t.norminf = n({
        args: ["array"],
        pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0",
        },
        body: {
          args: [{ name: "a", lvalue: !1, rvalue: !0, count: 4 }],
          body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
          localVars: [],
          thisVars: ["this_s"],
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s",
        },
        funcName: "norminf",
      })),
      (t.norm1 = n({
        args: ["array"],
        pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0",
        },
        body: {
          args: [{ name: "a", lvalue: !1, rvalue: !0, count: 3 }],
          body: "this_s+=a<0?-a:a",
          localVars: [],
          thisVars: ["this_s"],
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s",
        },
        funcName: "norm1",
      })),
      (t.sup = n({
        args: ["array"],
        pre: {
          body: "this_h=-Infinity",
          args: [],
          thisVars: ["this_h"],
          localVars: [],
        },
        body: {
          body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
          args: [{ name: "_inline_1_arg0_", lvalue: !1, rvalue: !0, count: 2 }],
          thisVars: ["this_h"],
          localVars: [],
        },
        post: {
          body: "return this_h",
          args: [],
          thisVars: ["this_h"],
          localVars: [],
        },
      })),
      (t.inf = n({
        args: ["array"],
        pre: {
          body: "this_h=Infinity",
          args: [],
          thisVars: ["this_h"],
          localVars: [],
        },
        body: {
          body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
          args: [{ name: "_inline_1_arg0_", lvalue: !1, rvalue: !0, count: 2 }],
          thisVars: ["this_h"],
          localVars: [],
        },
        post: {
          body: "return this_h",
          args: [],
          thisVars: ["this_h"],
          localVars: [],
        },
      })),
      (t.argmin = n({
        args: ["index", "array", "shape"],
        pre: {
          body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
          args: [
            { name: "_inline_0_arg0_", lvalue: !1, rvalue: !1, count: 0 },
            { name: "_inline_0_arg1_", lvalue: !1, rvalue: !1, count: 0 },
            { name: "_inline_0_arg2_", lvalue: !1, rvalue: !0, count: 1 },
          ],
          thisVars: ["this_i", "this_v"],
          localVars: [],
        },
        body: {
          body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
          args: [
            { name: "_inline_1_arg0_", lvalue: !1, rvalue: !0, count: 2 },
            { name: "_inline_1_arg1_", lvalue: !1, rvalue: !0, count: 2 },
          ],
          thisVars: ["this_i", "this_v"],
          localVars: ["_inline_1_k"],
        },
        post: {
          body: "{return this_i}",
          args: [],
          thisVars: ["this_i"],
          localVars: [],
        },
      })),
      (t.argmax = n({
        args: ["index", "array", "shape"],
        pre: {
          body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
          args: [
            { name: "_inline_0_arg0_", lvalue: !1, rvalue: !1, count: 0 },
            { name: "_inline_0_arg1_", lvalue: !1, rvalue: !1, count: 0 },
            { name: "_inline_0_arg2_", lvalue: !1, rvalue: !0, count: 1 },
          ],
          thisVars: ["this_i", "this_v"],
          localVars: [],
        },
        body: {
          body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
          args: [
            { name: "_inline_1_arg0_", lvalue: !1, rvalue: !0, count: 2 },
            { name: "_inline_1_arg1_", lvalue: !1, rvalue: !0, count: 2 },
          ],
          thisVars: ["this_i", "this_v"],
          localVars: ["_inline_1_k"],
        },
        post: {
          body: "{return this_i}",
          args: [],
          thisVars: ["this_i"],
          localVars: [],
        },
      })),
      (t.random = i({
        args: ["array"],
        pre: { args: [], body: "this_f=Math.random", thisVars: ["this_f"] },
        body: { args: ["a"], body: "a=this_f()", thisVars: ["this_f"] },
        funcName: "random",
      })),
      (t.assign = i({
        args: ["array", "array"],
        body: { args: ["a", "b"], body: "a=b" },
        funcName: "assign",
      })),
      (t.assigns = i({
        args: ["array", "scalar"],
        body: { args: ["a", "b"], body: "a=b" },
        funcName: "assigns",
      })),
      (t.equals = n({
        args: ["array", "array"],
        pre: e,
        body: {
          args: [
            { name: "x", lvalue: !1, rvalue: !0, count: 1 },
            { name: "y", lvalue: !1, rvalue: !0, count: 1 },
          ],
          body: "if(x!==y){return false}",
          localVars: [],
          thisVars: [],
        },
        post: { args: [], localVars: [], thisVars: [], body: "return true" },
        funcName: "equals",
      }));
  })(nt);
  class lt {
    constructor(t, n) {
      (this.freqs = t), (this.axis = n);
    }
    slice(t, n) {
      return this.freqs
        .lo(t.start, n.start)
        .hi(t.end - t.start, n.end - n.start);
    }
    classes() {
      const t = [];
      return this.axis.preorder((n) => t.push(n)), t;
    }
    frequency(t, n) {
      const e = this.slice(t.data, n.data);
      return nt.sum(e);
    }
    total() {
      return nt.sum(this.freqs);
    }
    totalRow(t) {
      const n = this.slice(t.data, { start: 0, end: this.freqs.shape[1] });
      return nt.sum(n);
    }
    totalColumn(t) {
      const n = this.slice({ start: 0, end: this.freqs.shape[0] }, t.data);
      return nt.sum(n);
    }
    truePositives(t) {
      return t.leaves().reduce((t, n) => t + this.frequency(n, n), 0);
    }
    falsePositives(t) {
      return this.totalColumn(t) - this.truePositives(t);
    }
    trueNegatives(t) {
      return (
        this.axis.leaves().reduce((t, n) => t + this.frequency(n, n), 0) -
        this.truePositives(t)
      );
    }
    falseNegatives(t) {
      return this.totalRow(t) - this.truePositives(t);
    }
  }
  function ft(t, n) {
    return t.truePositives(n) / t.totalColumn(n);
  }
  function ht(t, n) {
    return t.truePositives(n) / t.totalRow(n);
  }
  function dt(t, n) {
    const e = t.truePositives(n),
      r = t.trueNegatives(n);
    return (e + r) / (e + r + t.falsePositives(n) + t.falseNegatives(n));
  }
  function pt(t, n) {
    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
  }
  function gt(t) {
    let n = t,
      e = t;
    function r(t, n, r, i) {
      for (null == r && (r = 0), null == i && (i = t.length); r < i; ) {
        const o = (r + i) >>> 1;
        e(t[o], n) < 0 ? (r = o + 1) : (i = o);
      }
      return r;
    }
    return (
      1 === t.length &&
        ((n = (n, e) => t(n) - e),
        (e = (function (t) {
          return (n, e) => pt(t(n), e);
        })(t))),
      {
        left: r,
        center: function (t, e, i, o) {
          null == i && (i = 0), null == o && (o = t.length);
          const a = r(t, e, i, o - 1);
          return a > i && n(t[a - 1], e) > -n(t[a], e) ? a - 1 : a;
        },
        right: function (t, n, r, i) {
          for (null == r && (r = 0), null == i && (i = t.length); r < i; ) {
            const o = (r + i) >>> 1;
            e(t[o], n) > 0 ? (i = o) : (r = o + 1);
          }
          return r;
        },
      }
    );
  }
  function vt(t) {
    return null === t ? NaN : +t;
  }
  const yt = gt(pt),
    mt = yt.right,
    bt = yt.left,
    _t = gt(vt).center;
  function wt(t, n) {
    let e = 0;
    if (void 0 === n) for (let n of t) null != n && (n = +n) >= n && ++e;
    else {
      let r = -1;
      for (let i of t) null != (i = n(i, ++r, t)) && (i = +i) >= i && ++e;
    }
    return e;
  }
  function xt(t) {
    return 0 | t.length;
  }
  function Mt(t) {
    return !(t > 0);
  }
  function jt(t) {
    return "object" != typeof t || "length" in t ? t : Array.from(t);
  }
  function kt(t, n) {
    let e,
      r = 0,
      i = 0,
      o = 0;
    if (void 0 === n)
      for (let n of t)
        null != n &&
          (n = +n) >= n &&
          ((e = n - i), (i += e / ++r), (o += e * (n - i)));
    else {
      let a = -1;
      for (let u of t)
        null != (u = n(u, ++a, t)) &&
          (u = +u) >= u &&
          ((e = u - i), (i += e / ++r), (o += e * (u - i)));
    }
    if (r > 1) return o / (r - 1);
  }
  function At(t, n) {
    const e = kt(t, n);
    return e ? Math.sqrt(e) : e;
  }
  function $t(t, n) {
    let e, r;
    if (void 0 === n)
      for (const n of t)
        null != n &&
          (void 0 === e
            ? n >= n && (e = r = n)
            : (e > n && (e = n), r < n && (r = n)));
    else {
      let i = -1;
      for (let o of t)
        null != (o = n(o, ++i, t)) &&
          (void 0 === e
            ? o >= o && (e = r = o)
            : (e > o && (e = o), r < o && (r = o)));
    }
    return [e, r];
  }
  class St {
    constructor() {
      (this._partials = new Float64Array(32)), (this._n = 0);
    }
    add(t) {
      const n = this._partials;
      let e = 0;
      for (let r = 0; r < this._n && r < 32; r++) {
        const i = n[r],
          o = t + i,
          a = Math.abs(t) < Math.abs(i) ? t - (o - i) : i - (o - t);
        a && (n[e++] = a), (t = o);
      }
      return (n[e] = t), (this._n = e + 1), this;
    }
    valueOf() {
      const t = this._partials;
      let n,
        e,
        r,
        i = this._n,
        o = 0;
      if (i > 0) {
        for (
          o = t[--i];
          i > 0 && ((n = o), (e = t[--i]), (o = n + e), (r = e - (o - n)), !r);

        );
        i > 0 &&
          ((r < 0 && t[i - 1] < 0) || (r > 0 && t[i - 1] > 0)) &&
          ((e = 2 * r), (n = o + e), e == n - o && (o = n));
      }
      return o;
    }
  }
  var Tt = { exports: {} };
  function Nt(t) {
    return t;
  }
  function Ct(t, ...n) {
    return zt(t, Nt, Nt, n);
  }
  function Et(t, n, ...e) {
    return zt(t, Nt, n, e);
  }
  function It(t) {
    if (1 !== t.length) throw new Error("duplicate key");
    return t[0];
  }
  function zt(t, n, e, r) {
    return (function t(i, o) {
      if (o >= r.length) return e(i);
      const a = new Tt.exports.InternMap(),
        u = r[o++];
      let c = -1;
      for (const t of i) {
        const n = u(t, ++c, i),
          e = a.get(n);
        e ? e.push(t) : a.set(n, [t]);
      }
      for (const [n, e] of a) a.set(n, t(e, o));
      return n(a);
    })(t, 0);
  }
  function Dt(t, n) {
    return Array.from(n, (n) => t[n]);
  }
  function Ot(t, ...n) {
    if ("function" != typeof t[Symbol.iterator])
      throw new TypeError("values is not iterable");
    t = Array.from(t);
    let [e = pt] = n;
    if (1 === e.length || n.length > 1) {
      const r = Uint32Array.from(t, (t, n) => n);
      return (
        n.length > 1
          ? ((n = n.map((n) => t.map(n))),
            r.sort((t, e) => {
              for (const r of n) {
                const n = pt(r[t], r[e]);
                if (n) return n;
              }
            }))
          : ((e = t.map(e)), r.sort((t, n) => pt(e[t], e[n]))),
        Dt(t, r)
      );
    }
    return t.sort(e);
  }
  !(function (t, n) {
    !(function (t) {
      class n extends Map {
        constructor(t, n = a) {
          if (
            (super(),
            Object.defineProperties(this, {
              _intern: { value: new Map() },
              _key: { value: n },
            }),
            null != t)
          )
            for (const [n, e] of t) this.set(n, e);
        }
        get(t) {
          return super.get(r(this, t));
        }
        has(t) {
          return super.has(r(this, t));
        }
        set(t, n) {
          return super.set(i(this, t), n);
        }
        delete(t) {
          return super.delete(o(this, t));
        }
      }
      class e extends Set {
        constructor(t, n = a) {
          if (
            (super(),
            Object.defineProperties(this, {
              _intern: { value: new Map() },
              _key: { value: n },
            }),
            null != t)
          )
            for (const n of t) this.add(n);
        }
        has(t) {
          return super.has(r(this, t));
        }
        add(t) {
          return super.add(i(this, t));
        }
        delete(t) {
          return super.delete(o(this, t));
        }
      }
      function r({ _intern: t, _key: n }, e) {
        const r = n(e);
        return t.has(r) ? t.get(r) : e;
      }
      function i({ _intern: t, _key: n }, e) {
        const r = n(e);
        return t.has(r) ? t.get(r) : (t.set(r, e), e);
      }
      function o({ _intern: t, _key: n }, e) {
        const r = n(e);
        return t.has(r) && ((e = t.get(e)), t.delete(r)), e;
      }
      function a(t) {
        return null !== t && "object" == typeof t ? t.valueOf() : t;
      }
      (t.InternMap = n),
        (t.InternSet = e),
        Object.defineProperty(t, "__esModule", { value: !0 });
    })(n);
  })(0, Tt.exports);
  var Ut = Array.prototype.slice;
  function qt(t) {
    return function () {
      return t;
    };
  }
  var Vt = Math.sqrt(50),
    Ft = Math.sqrt(10),
    Rt = Math.sqrt(2);
  function Lt(t, n, e) {
    var r,
      i,
      o,
      a,
      u = -1;
    if (((e = +e), (t = +t) === (n = +n) && e > 0)) return [t];
    if (
      ((r = n < t) && ((i = t), (t = n), (n = i)),
      0 === (a = Bt(t, n, e)) || !isFinite(a))
    )
      return [];
    if (a > 0) {
      let e = Math.round(t / a),
        r = Math.round(n / a);
      for (
        e * a < t && ++e, r * a > n && --r, o = new Array((i = r - e + 1));
        ++u < i;

      )
        o[u] = (e + u) * a;
    } else {
      a = -a;
      let e = Math.round(t * a),
        r = Math.round(n * a);
      for (
        e / a < t && ++e, r / a > n && --r, o = new Array((i = r - e + 1));
        ++u < i;

      )
        o[u] = (e + u) / a;
    }
    return r && o.reverse(), o;
  }
  function Bt(t, n, e) {
    var r = (n - t) / Math.max(0, e),
      i = Math.floor(Math.log(r) / Math.LN10),
      o = r / Math.pow(10, i);
    return i >= 0
      ? (o >= Vt ? 10 : o >= Ft ? 5 : o >= Rt ? 2 : 1) * Math.pow(10, i)
      : -Math.pow(10, -i) / (o >= Vt ? 10 : o >= Ft ? 5 : o >= Rt ? 2 : 1);
  }
  function Yt(t, n, e) {
    var r = Math.abs(n - t) / Math.max(0, e),
      i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
      o = r / i;
    return (
      o >= Vt ? (i *= 10) : o >= Ft ? (i *= 5) : o >= Rt && (i *= 2),
      n < t ? -i : i
    );
  }
  function Pt(t, n, e) {
    let r;
    for (;;) {
      const i = Bt(t, n, e);
      if (i === r || 0 === i || !isFinite(i)) return [t, n];
      i > 0
        ? ((t = Math.floor(t / i) * i), (n = Math.ceil(n / i) * i))
        : i < 0 && ((t = Math.ceil(t * i) / i), (n = Math.floor(n * i) / i)),
        (r = i);
    }
  }
  function Wt(t) {
    return Math.ceil(Math.log(wt(t)) / Math.LN2) + 1;
  }
  function Ht() {
    var t = Nt,
      n = $t,
      e = Wt;
    function r(r) {
      Array.isArray(r) || (r = Array.from(r));
      var i,
        o,
        a = r.length,
        u = new Array(a);
      for (i = 0; i < a; ++i) u[i] = t(r[i], i, r);
      var c = n(u),
        s = c[0],
        l = c[1],
        f = e(u, s, l);
      if (!Array.isArray(f)) {
        const t = l,
          e = +f;
        if (
          (n === $t && ([s, l] = Pt(s, l, e)),
          (f = Lt(s, l, e))[f.length - 1] >= l)
        )
          if (t >= l && n === $t) {
            const t = Bt(s, l, e);
            isFinite(t) &&
              (t > 0
                ? (l = (Math.floor(l / t) + 1) * t)
                : t < 0 && (l = (Math.ceil(l * -t) + 1) / -t));
          } else f.pop();
      }
      for (var h = f.length; f[0] <= s; ) f.shift(), --h;
      for (; f[h - 1] > l; ) f.pop(), --h;
      var d,
        p = new Array(h + 1);
      for (i = 0; i <= h; ++i)
        ((d = p[i] = []).x0 = i > 0 ? f[i - 1] : s), (d.x1 = i < h ? f[i] : l);
      for (i = 0; i < a; ++i)
        s <= (o = u[i]) && o <= l && p[mt(f, o, 0, h)].push(r[i]);
      return p;
    }
    return (
      (r.value = function (n) {
        return arguments.length
          ? ((t = "function" == typeof n ? n : qt(n)), r)
          : t;
      }),
      (r.domain = function (t) {
        return arguments.length
          ? ((n = "function" == typeof t ? t : qt([t[0], t[1]])), r)
          : n;
      }),
      (r.thresholds = function (t) {
        return arguments.length
          ? ((e =
              "function" == typeof t
                ? t
                : Array.isArray(t)
                ? qt(Ut.call(t))
                : qt(t)),
            r)
          : e;
      }),
      r
    );
  }
  function Gt(t, n) {
    let e;
    if (void 0 === n)
      for (const n of t)
        null != n && (e < n || (void 0 === e && n >= n)) && (e = n);
    else {
      let r = -1;
      for (let i of t)
        null != (i = n(i, ++r, t)) &&
          (e < i || (void 0 === e && i >= i)) &&
          (e = i);
    }
    return e;
  }
  function Zt(t, n) {
    let e;
    if (void 0 === n)
      for (const n of t)
        null != n && (e > n || (void 0 === e && n >= n)) && (e = n);
    else {
      let r = -1;
      for (let i of t)
        null != (i = n(i, ++r, t)) &&
          (e > i || (void 0 === e && i >= i)) &&
          (e = i);
    }
    return e;
  }
  function Xt(t, n, e = 0, r = t.length - 1, i = pt) {
    for (; r > e; ) {
      if (r - e > 600) {
        const o = r - e + 1,
          a = n - e + 1,
          u = Math.log(o),
          c = 0.5 * Math.exp((2 * u) / 3),
          s = 0.5 * Math.sqrt((u * c * (o - c)) / o) * (a - o / 2 < 0 ? -1 : 1);
        Xt(
          t,
          n,
          Math.max(e, Math.floor(n - (a * c) / o + s)),
          Math.min(r, Math.floor(n + ((o - a) * c) / o + s)),
          i
        );
      }
      const o = t[n];
      let a = e,
        u = r;
      for (Jt(t, e, n), i(t[r], o) > 0 && Jt(t, e, r); a < u; ) {
        for (Jt(t, a, u), ++a, --u; i(t[a], o) < 0; ) ++a;
        for (; i(t[u], o) > 0; ) --u;
      }
      0 === i(t[e], o) ? Jt(t, e, u) : (++u, Jt(t, u, r)),
        u <= n && (e = u + 1),
        n <= u && (r = u - 1);
    }
    return t;
  }
  function Jt(t, n, e) {
    const r = t[n];
    (t[n] = t[e]), (t[e] = r);
  }
  function Qt(t, n, e) {
    if (
      (r = (t = Float64Array.from(
        (function* (t, n) {
          if (void 0 === n)
            for (let n of t) null != n && (n = +n) >= n && (yield n);
          else {
            let e = -1;
            for (let r of t)
              null != (r = n(r, ++e, t)) && (r = +r) >= r && (yield r);
          }
        })(t, e)
      )).length)
    ) {
      if ((n = +n) <= 0 || r < 2) return Zt(t);
      if (n >= 1) return Gt(t);
      var r,
        i = (r - 1) * n,
        o = Math.floor(i),
        a = Gt(Xt(t, o).subarray(0, o + 1));
      return a + (Zt(t.subarray(o + 1)) - a) * (i - o);
    }
  }
  function Kt(t, n, e = vt) {
    if ((r = t.length)) {
      if ((n = +n) <= 0 || r < 2) return +e(t[0], 0, t);
      if (n >= 1) return +e(t[r - 1], r - 1, t);
      var r,
        i = (r - 1) * n,
        o = Math.floor(i),
        a = +e(t[o], o, t);
      return a + (+e(t[o + 1], o + 1, t) - a) * (i - o);
    }
  }
  function tn(t, n) {
    let e,
      r = -1,
      i = -1;
    if (void 0 === n)
      for (const n of t)
        ++i,
          null != n &&
            (e < n || (void 0 === e && n >= n)) &&
            ((e = n), (r = i));
    else
      for (let o of t)
        null != (o = n(o, ++i, t)) &&
          (e < o || (void 0 === e && o >= o)) &&
          ((e = o), (r = i));
    return r;
  }
  function nn(t, n) {
    let e,
      r = -1,
      i = -1;
    if (void 0 === n)
      for (const n of t)
        ++i,
          null != n &&
            (e > n || (void 0 === e && n >= n)) &&
            ((e = n), (r = i));
    else
      for (let o of t)
        null != (o = n(o, ++i, t)) &&
          (e > o || (void 0 === e && o >= o)) &&
          ((e = o), (r = i));
    return r;
  }
  function en(t, n) {
    return [t, n];
  }
  function rn(t, n, e) {
    (t = +t),
      (n = +n),
      (e = (i = arguments.length) < 2 ? ((n = t), (t = 0), 1) : i < 3 ? 1 : +e);
    for (
      var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i);
      ++r < i;

    )
      o[r] = t + r * e;
    return o;
  }
  function on(t, n = pt) {
    if (1 === n.length) return nn(t, n);
    let e,
      r = -1,
      i = -1;
    for (const o of t)
      ++i, (r < 0 ? 0 === n(o, o) : n(o, e) < 0) && ((e = o), (r = i));
    return r;
  }
  var an = un(Math.random);
  function un(t) {
    return function (n, e = 0, r = n.length) {
      let i = r - (e = +e);
      for (; i; ) {
        const r = (t() * i--) | 0,
          o = n[i + e];
        (n[i + e] = n[r + e]), (n[r + e] = o);
      }
      return n;
    };
  }
  function cn(t, n) {
    let e = 0;
    if (void 0 === n) for (let n of t) (n = +n) && (e += n);
    else {
      let r = -1;
      for (let i of t) (i = +n(i, ++r, t)) && (e += i);
    }
    return e;
  }
  function sn(t) {
    if (!(i = t.length)) return [];
    for (var n = -1, e = Zt(t, ln), r = new Array(e); ++n < e; )
      for (var i, o = -1, a = (r[n] = new Array(i)); ++o < i; ) a[o] = t[o][n];
    return r;
  }
  function ln(t) {
    return t.length;
  }
  function fn(t) {
    return t instanceof Set ? t : new Set(t);
  }
  function hn(t, n) {
    const e = t[Symbol.iterator](),
      r = new Set();
    for (const t of n) {
      if (r.has(t)) continue;
      let n, i;
      for (; ({ value: n, done: i } = e.next()); ) {
        if (i) return !1;
        if ((r.add(n), Object.is(t, n))) break;
      }
    }
    return !0;
  }
  var dn = Object.freeze({
    __proto__: null,
    bisect: mt,
    bisectRight: mt,
    bisectLeft: bt,
    bisectCenter: _t,
    ascending: pt,
    bisector: gt,
    count: wt,
    cross: function (...t) {
      const n =
          "function" == typeof t[t.length - 1] &&
          (function (t) {
            return (n) => t(...n);
          })(t.pop()),
        e = (t = t.map(jt)).map(xt),
        r = t.length - 1,
        i = new Array(r + 1).fill(0),
        o = [];
      if (r < 0 || e.some(Mt)) return o;
      for (;;) {
        o.push(i.map((n, e) => t[e][n]));
        let a = r;
        for (; ++i[a] === e[a]; ) {
          if (0 === a) return n ? o.map(n) : o;
          i[a--] = 0;
        }
      }
    },
    cumsum: function (t, n) {
      var e = 0,
        r = 0;
      return Float64Array.from(
        t,
        void 0 === n ? (t) => (e += +t || 0) : (i) => (e += +n(i, r++, t) || 0)
      );
    },
    descending: function (t, n) {
      return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
    },
    deviation: At,
    extent: $t,
    Adder: St,
    fsum: function (t, n) {
      const e = new St();
      if (void 0 === n) for (let n of t) (n = +n) && e.add(n);
      else {
        let r = -1;
        for (let i of t) (i = +n(i, ++r, t)) && e.add(i);
      }
      return +e;
    },
    fcumsum: function (t, n) {
      const e = new St();
      let r = -1;
      return Float64Array.from(
        t,
        void 0 === n ? (t) => e.add(+t || 0) : (i) => e.add(+n(i, ++r, t) || 0)
      );
    },
    group: Ct,
    groups: function (t, ...n) {
      return zt(t, Array.from, Nt, n);
    },
    index: function (t, ...n) {
      return zt(t, Nt, It, n);
    },
    indexes: function (t, ...n) {
      return zt(t, Array.from, It, n);
    },
    rollup: Et,
    rollups: function (t, n, ...e) {
      return zt(t, Array.from, n, e);
    },
    groupSort: function (t, n, e) {
      return (
        1 === n.length
          ? Ot(Et(t, n, e), ([t, n], [e, r]) => pt(n, r) || pt(t, e))
          : Ot(Ct(t, e), ([t, e], [r, i]) => n(e, i) || pt(t, r))
      ).map(([t]) => t);
    },
    bin: Ht,
    histogram: Ht,
    thresholdFreedmanDiaconis: function (t, n, e) {
      return Math.ceil(
        (e - n) / (2 * (Qt(t, 0.75) - Qt(t, 0.25)) * Math.pow(wt(t), -1 / 3))
      );
    },
    thresholdScott: function (t, n, e) {
      return Math.ceil((e - n) / (3.5 * At(t) * Math.pow(wt(t), -1 / 3)));
    },
    thresholdSturges: Wt,
    max: Gt,
    maxIndex: tn,
    mean: function (t, n) {
      let e = 0,
        r = 0;
      if (void 0 === n)
        for (let n of t) null != n && (n = +n) >= n && (++e, (r += n));
      else {
        let i = -1;
        for (let o of t)
          null != (o = n(o, ++i, t)) && (o = +o) >= o && (++e, (r += o));
      }
      if (e) return r / e;
    },
    median: function (t, n) {
      return Qt(t, 0.5, n);
    },
    merge: function (t) {
      return Array.from(
        (function* (t) {
          for (const n of t) yield* n;
        })(t)
      );
    },
    min: Zt,
    minIndex: nn,
    nice: Pt,
    pairs: function (t, n = en) {
      const e = [];
      let r,
        i = !1;
      for (const o of t) i && e.push(n(r, o)), (r = o), (i = !0);
      return e;
    },
    permute: Dt,
    quantile: Qt,
    quantileSorted: Kt,
    quickselect: Xt,
    range: rn,
    least: function (t, n = pt) {
      let e,
        r = !1;
      if (1 === n.length) {
        let i;
        for (const o of t) {
          const t = n(o);
          (r ? pt(t, i) < 0 : 0 === pt(t, t)) && ((e = o), (i = t), (r = !0));
        }
      } else
        for (const i of t)
          (r ? n(i, e) < 0 : 0 === n(i, i)) && ((e = i), (r = !0));
      return e;
    },
    leastIndex: on,
    greatest: function (t, n = pt) {
      let e,
        r = !1;
      if (1 === n.length) {
        let i;
        for (const o of t) {
          const t = n(o);
          (r ? pt(t, i) > 0 : 0 === pt(t, t)) && ((e = o), (i = t), (r = !0));
        }
      } else
        for (const i of t)
          (r ? n(i, e) > 0 : 0 === n(i, i)) && ((e = i), (r = !0));
      return e;
    },
    greatestIndex: function (t, n = pt) {
      if (1 === n.length) return tn(t, n);
      let e,
        r = -1,
        i = -1;
      for (const o of t)
        ++i, (r < 0 ? 0 === n(o, o) : n(o, e) > 0) && ((e = o), (r = i));
      return r;
    },
    scan: function (t, n) {
      const e = on(t, n);
      return e < 0 ? void 0 : e;
    },
    shuffle: an,
    shuffler: un,
    sum: cn,
    ticks: Lt,
    tickIncrement: Bt,
    tickStep: Yt,
    transpose: sn,
    variance: kt,
    zip: function () {
      return sn(arguments);
    },
    every: function (t, n) {
      if ("function" != typeof n) throw new TypeError("test is not a function");
      let e = -1;
      for (const r of t) if (!n(r, ++e, t)) return !1;
      return !0;
    },
    some: function (t, n) {
      if ("function" != typeof n) throw new TypeError("test is not a function");
      let e = -1;
      for (const r of t) if (n(r, ++e, t)) return !0;
      return !1;
    },
    filter: function (t, n) {
      if ("function" != typeof n) throw new TypeError("test is not a function");
      const e = [];
      let r = -1;
      for (const i of t) n(i, ++r, t) && e.push(i);
      return e;
    },
    map: function (t, n) {
      if ("function" != typeof t[Symbol.iterator])
        throw new TypeError("values is not iterable");
      if ("function" != typeof n)
        throw new TypeError("mapper is not a function");
      return Array.from(t, (e, r) => n(e, r, t));
    },
    reduce: function (t, n, e) {
      if ("function" != typeof n)
        throw new TypeError("reducer is not a function");
      const r = t[Symbol.iterator]();
      let i,
        o,
        a = -1;
      if (arguments.length < 3) {
        if ((({ done: i, value: e } = r.next()), i)) return;
        ++a;
      }
      for (; ({ done: i, value: o } = r.next()), !i; ) e = n(e, o, ++a, t);
      return e;
    },
    reverse: function (t) {
      if ("function" != typeof t[Symbol.iterator])
        throw new TypeError("values is not iterable");
      return Array.from(t).reverse();
    },
    sort: Ot,
    difference: function (t, ...n) {
      t = new Set(t);
      for (const e of n) for (const n of e) t.delete(n);
      return t;
    },
    disjoint: function (t, n) {
      const e = n[Symbol.iterator](),
        r = new Set();
      for (const n of t) {
        if (r.has(n)) return !1;
        let t, i;
        for (; ({ value: t, done: i } = e.next()) && !i; ) {
          if (Object.is(n, t)) return !1;
          r.add(t);
        }
      }
      return !0;
    },
    intersection: function (t, ...n) {
      (t = new Set(t)), (n = n.map(fn));
      t: for (const e of t)
        for (const r of n)
          if (!r.has(e)) {
            t.delete(e);
            continue t;
          }
      return t;
    },
    subset: function (t, n) {
      return hn(n, t);
    },
    superset: hn,
    union: function (...t) {
      const n = new Set();
      for (const e of t) for (const t of e) n.add(t);
      return n;
    },
    InternMap: Tt.exports.InternMap,
    InternSet: Tt.exports.InternSet,
  });
  function pn(t, n) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(t);
        break;
      default:
        this.range(n).domain(t);
    }
    return this;
  }
  function gn(t, n) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        "function" == typeof t ? this.interpolator(t) : this.range(t);
        break;
      default:
        this.domain(t),
          "function" == typeof n ? this.interpolator(n) : this.range(n);
    }
    return this;
  }
  const vn = Symbol("implicit");
  function yn() {
    var t = new Map(),
      n = [],
      e = [],
      r = vn;
    function i(i) {
      var o = i + "",
        a = t.get(o);
      if (!a) {
        if (r !== vn) return r;
        t.set(o, (a = n.push(i)));
      }
      return e[(a - 1) % e.length];
    }
    return (
      (i.domain = function (e) {
        if (!arguments.length) return n.slice();
        (n = []), (t = new Map());
        for (const r of e) {
          const e = r + "";
          t.has(e) || t.set(e, n.push(r));
        }
        return i;
      }),
      (i.range = function (t) {
        return arguments.length ? ((e = Array.from(t)), i) : e.slice();
      }),
      (i.unknown = function (t) {
        return arguments.length ? ((r = t), i) : r;
      }),
      (i.copy = function () {
        return yn(n, e).unknown(r);
      }),
      pn.apply(i, arguments),
      i
    );
  }
  var mn = { exports: {} },
    bn = { exports: {} };
  !(function (t, n) {
    !(function (t) {
      function n(t, n, e) {
        (t.prototype = n.prototype = e), (e.constructor = t);
      }
      function e(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e;
      }
      function r() {}
      var i = 0.7,
        o = 1 / i,
        a = "\\s*([+-]?\\d+)\\s*",
        u = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        c = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        s = /^#([0-9a-f]{3,8})$/,
        l = new RegExp("^rgb\\(" + [a, a, a] + "\\)$"),
        f = new RegExp("^rgb\\(" + [c, c, c] + "\\)$"),
        h = new RegExp("^rgba\\(" + [a, a, a, u] + "\\)$"),
        d = new RegExp("^rgba\\(" + [c, c, c, u] + "\\)$"),
        p = new RegExp("^hsl\\(" + [u, c, c] + "\\)$"),
        g = new RegExp("^hsla\\(" + [u, c, c, u] + "\\)$"),
        v = {
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074,
        };
      function y() {
        return this.rgb().formatHex();
      }
      function m() {
        return N(this).formatHsl();
      }
      function b() {
        return this.rgb().formatRgb();
      }
      function _(t) {
        var n, e;
        return (
          (t = (t + "").trim().toLowerCase()),
          (n = s.exec(t))
            ? ((e = n[1].length),
              (n = parseInt(n[1], 16)),
              6 === e
                ? w(n)
                : 3 === e
                ? new k(
                    ((n >> 8) & 15) | ((n >> 4) & 240),
                    ((n >> 4) & 15) | (240 & n),
                    ((15 & n) << 4) | (15 & n),
                    1
                  )
                : 8 === e
                ? x(
                    (n >> 24) & 255,
                    (n >> 16) & 255,
                    (n >> 8) & 255,
                    (255 & n) / 255
                  )
                : 4 === e
                ? x(
                    ((n >> 12) & 15) | ((n >> 8) & 240),
                    ((n >> 8) & 15) | ((n >> 4) & 240),
                    ((n >> 4) & 15) | (240 & n),
                    (((15 & n) << 4) | (15 & n)) / 255
                  )
                : null)
            : (n = l.exec(t))
            ? new k(n[1], n[2], n[3], 1)
            : (n = f.exec(t))
            ? new k(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                1
              )
            : (n = h.exec(t))
            ? x(n[1], n[2], n[3], n[4])
            : (n = d.exec(t))
            ? x(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                n[4]
              )
            : (n = p.exec(t))
            ? T(n[1], n[2] / 100, n[3] / 100, 1)
            : (n = g.exec(t))
            ? T(n[1], n[2] / 100, n[3] / 100, n[4])
            : v.hasOwnProperty(t)
            ? w(v[t])
            : "transparent" === t
            ? new k(NaN, NaN, NaN, 0)
            : null
        );
      }
      function w(t) {
        return new k((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
      }
      function x(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new k(t, n, e, r);
      }
      function M(t) {
        return (
          t instanceof r || (t = _(t)),
          t ? new k((t = t.rgb()).r, t.g, t.b, t.opacity) : new k()
        );
      }
      function j(t, n, e, r) {
        return 1 === arguments.length
          ? M(t)
          : new k(t, n, e, null == r ? 1 : r);
      }
      function k(t, n, e, r) {
        (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
      }
      function A() {
        return "#" + S(this.r) + S(this.g) + S(this.b);
      }
      function $() {
        var t = this.opacity;
        return (
          (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
            ? "rgb("
            : "rgba(") +
          Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
          ", " +
          Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
          ", " +
          Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
          (1 === t ? ")" : ", " + t + ")")
        );
      }
      function S(t) {
        return (
          ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16
            ? "0"
            : "") + t.toString(16)
        );
      }
      function T(t, n, e, r) {
        return (
          r <= 0
            ? (t = n = e = NaN)
            : e <= 0 || e >= 1
            ? (t = n = NaN)
            : n <= 0 && (t = NaN),
          new E(t, n, e, r)
        );
      }
      function N(t) {
        if (t instanceof E) return new E(t.h, t.s, t.l, t.opacity);
        if ((t instanceof r || (t = _(t)), !t)) return new E();
        if (t instanceof E) return t;
        var n = (t = t.rgb()).r / 255,
          e = t.g / 255,
          i = t.b / 255,
          o = Math.min(n, e, i),
          a = Math.max(n, e, i),
          u = NaN,
          c = a - o,
          s = (a + o) / 2;
        return (
          c
            ? ((u =
                n === a
                  ? (e - i) / c + 6 * (e < i)
                  : e === a
                  ? (i - n) / c + 2
                  : (n - e) / c + 4),
              (c /= s < 0.5 ? a + o : 2 - a - o),
              (u *= 60))
            : (c = s > 0 && s < 1 ? 0 : u),
          new E(u, c, s, t.opacity)
        );
      }
      function C(t, n, e, r) {
        return 1 === arguments.length
          ? N(t)
          : new E(t, n, e, null == r ? 1 : r);
      }
      function E(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function I(t, n, e) {
        return (
          255 *
          (t < 60
            ? n + ((e - n) * t) / 60
            : t < 180
            ? e
            : t < 240
            ? n + ((e - n) * (240 - t)) / 60
            : n)
        );
      }
      n(r, _, {
        copy: function (t) {
          return Object.assign(new this.constructor(), this, t);
        },
        displayable: function () {
          return this.rgb().displayable();
        },
        hex: y,
        formatHex: y,
        formatHsl: m,
        formatRgb: b,
        toString: b,
      }),
        n(
          k,
          j,
          e(r, {
            brighter: function (t) {
              return (
                (t = null == t ? o : Math.pow(o, t)),
                new k(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? i : Math.pow(i, t)),
                new k(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            rgb: function () {
              return this;
            },
            displayable: function () {
              return (
                -0.5 <= this.r &&
                this.r < 255.5 &&
                -0.5 <= this.g &&
                this.g < 255.5 &&
                -0.5 <= this.b &&
                this.b < 255.5 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            hex: A,
            formatHex: A,
            formatRgb: $,
            toString: $,
          })
        ),
        n(
          E,
          C,
          e(r, {
            brighter: function (t) {
              return (
                (t = null == t ? o : Math.pow(o, t)),
                new E(this.h, this.s, this.l * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? i : Math.pow(i, t)),
                new E(this.h, this.s, this.l * t, this.opacity)
              );
            },
            rgb: function () {
              var t = (this.h % 360) + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
              return new k(
                I(t >= 240 ? t - 240 : t + 120, i, r),
                I(t, i, r),
                I(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity
              );
            },
            displayable: function () {
              return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            formatHsl: function () {
              var t = this.opacity;
              return (
                (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
                  ? "hsl("
                  : "hsla(") +
                (this.h || 0) +
                ", " +
                100 * (this.s || 0) +
                "%, " +
                100 * (this.l || 0) +
                "%" +
                (1 === t ? ")" : ", " + t + ")")
              );
            },
          })
        );
      const z = Math.PI / 180,
        D = 180 / Math.PI,
        O = 18,
        U = 0.96422,
        q = 1,
        V = 0.82521,
        F = 4 / 29,
        R = 6 / 29,
        L = 3 * R * R,
        B = R * R * R;
      function Y(t) {
        if (t instanceof H) return new H(t.l, t.a, t.b, t.opacity);
        if (t instanceof nt) return et(t);
        t instanceof k || (t = M(t));
        var n,
          e,
          r = J(t.r),
          i = J(t.g),
          o = J(t.b),
          a = G((0.2225045 * r + 0.7168786 * i + 0.0606169 * o) / q);
        return (
          r === i && i === o
            ? (n = e = a)
            : ((n = G((0.4360747 * r + 0.3850649 * i + 0.1430804 * o) / U)),
              (e = G((0.0139322 * r + 0.0971045 * i + 0.7141733 * o) / V))),
          new H(116 * a - 16, 500 * (n - a), 200 * (a - e), t.opacity)
        );
      }
      function P(t, n) {
        return new H(t, 0, 0, null == n ? 1 : n);
      }
      function W(t, n, e, r) {
        return 1 === arguments.length
          ? Y(t)
          : new H(t, n, e, null == r ? 1 : r);
      }
      function H(t, n, e, r) {
        (this.l = +t), (this.a = +n), (this.b = +e), (this.opacity = +r);
      }
      function G(t) {
        return t > B ? Math.pow(t, 1 / 3) : t / L + F;
      }
      function Z(t) {
        return t > R ? t * t * t : L * (t - F);
      }
      function X(t) {
        return (
          255 *
          (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
        );
      }
      function J(t) {
        return (t /= 255) <= 0.04045
          ? t / 12.92
          : Math.pow((t + 0.055) / 1.055, 2.4);
      }
      function Q(t) {
        if (t instanceof nt) return new nt(t.h, t.c, t.l, t.opacity);
        if ((t instanceof H || (t = Y(t)), 0 === t.a && 0 === t.b))
          return new nt(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
        var n = Math.atan2(t.b, t.a) * D;
        return new nt(
          n < 0 ? n + 360 : n,
          Math.sqrt(t.a * t.a + t.b * t.b),
          t.l,
          t.opacity
        );
      }
      function K(t, n, e, r) {
        return 1 === arguments.length
          ? Q(t)
          : new nt(e, n, t, null == r ? 1 : r);
      }
      function tt(t, n, e, r) {
        return 1 === arguments.length
          ? Q(t)
          : new nt(t, n, e, null == r ? 1 : r);
      }
      function nt(t, n, e, r) {
        (this.h = +t), (this.c = +n), (this.l = +e), (this.opacity = +r);
      }
      function et(t) {
        if (isNaN(t.h)) return new H(t.l, 0, 0, t.opacity);
        var n = t.h * z;
        return new H(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity);
      }
      n(
        H,
        W,
        e(r, {
          brighter: function (t) {
            return new H(
              this.l + O * (null == t ? 1 : t),
              this.a,
              this.b,
              this.opacity
            );
          },
          darker: function (t) {
            return new H(
              this.l - O * (null == t ? 1 : t),
              this.a,
              this.b,
              this.opacity
            );
          },
          rgb: function () {
            var t = (this.l + 16) / 116,
              n = isNaN(this.a) ? t : t + this.a / 500,
              e = isNaN(this.b) ? t : t - this.b / 200;
            return new k(
              X(
                3.1338561 * (n = U * Z(n)) -
                  1.6168667 * (t = q * Z(t)) -
                  0.4906146 * (e = V * Z(e))
              ),
              X(-0.9787684 * n + 1.9161415 * t + 0.033454 * e),
              X(0.0719453 * n - 0.2289914 * t + 1.4052427 * e),
              this.opacity
            );
          },
        })
      ),
        n(
          nt,
          tt,
          e(r, {
            brighter: function (t) {
              return new nt(
                this.h,
                this.c,
                this.l + O * (null == t ? 1 : t),
                this.opacity
              );
            },
            darker: function (t) {
              return new nt(
                this.h,
                this.c,
                this.l - O * (null == t ? 1 : t),
                this.opacity
              );
            },
            rgb: function () {
              return et(this).rgb();
            },
          })
        );
      var rt = -0.14861,
        it = 1.78277,
        ot = -0.29227,
        at = -0.90649,
        ut = 1.97294,
        ct = ut * at,
        st = ut * it,
        lt = it * ot - at * rt;
      function ft(t) {
        if (t instanceof dt) return new dt(t.h, t.s, t.l, t.opacity);
        t instanceof k || (t = M(t));
        var n = t.r / 255,
          e = t.g / 255,
          r = t.b / 255,
          i = (lt * r + ct * n - st * e) / (lt + ct - st),
          o = r - i,
          a = (ut * (e - i) - ot * o) / at,
          u = Math.sqrt(a * a + o * o) / (ut * i * (1 - i)),
          c = u ? Math.atan2(a, o) * D - 120 : NaN;
        return new dt(c < 0 ? c + 360 : c, u, i, t.opacity);
      }
      function ht(t, n, e, r) {
        return 1 === arguments.length
          ? ft(t)
          : new dt(t, n, e, null == r ? 1 : r);
      }
      function dt(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      n(
        dt,
        ht,
        e(r, {
          brighter: function (t) {
            return (
              (t = null == t ? o : Math.pow(o, t)),
              new dt(this.h, this.s, this.l * t, this.opacity)
            );
          },
          darker: function (t) {
            return (
              (t = null == t ? i : Math.pow(i, t)),
              new dt(this.h, this.s, this.l * t, this.opacity)
            );
          },
          rgb: function () {
            var t = isNaN(this.h) ? 0 : (this.h + 120) * z,
              n = +this.l,
              e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
              r = Math.cos(t),
              i = Math.sin(t);
            return new k(
              255 * (n + e * (rt * r + it * i)),
              255 * (n + e * (ot * r + at * i)),
              255 * (n + e * (ut * r)),
              this.opacity
            );
          },
        })
      ),
        (t.color = _),
        (t.cubehelix = ht),
        (t.gray = P),
        (t.hcl = tt),
        (t.hsl = C),
        (t.lab = W),
        (t.lch = K),
        (t.rgb = j),
        Object.defineProperty(t, "__esModule", { value: !0 });
    })(n);
  })(0, bn.exports),
    (function (t, n) {
      !(function (t, n) {
        function e(t, n, e, r, i) {
          var o = t * t,
            a = o * t;
          return (
            ((1 - 3 * t + 3 * o - a) * n +
              (4 - 6 * o + 3 * a) * e +
              (1 + 3 * t + 3 * o - 3 * a) * r +
              a * i) /
            6
          );
        }
        function r(t) {
          var n = t.length - 1;
          return function (r) {
            var i =
                r <= 0
                  ? (r = 0)
                  : r >= 1
                  ? ((r = 1), n - 1)
                  : Math.floor(r * n),
              o = t[i],
              a = t[i + 1],
              u = i > 0 ? t[i - 1] : 2 * o - a,
              c = i < n - 1 ? t[i + 2] : 2 * a - o;
            return e((r - i / n) * n, u, o, a, c);
          };
        }
        function i(t) {
          var n = t.length;
          return function (r) {
            var i = Math.floor(((r %= 1) < 0 ? ++r : r) * n),
              o = t[(i + n - 1) % n],
              a = t[i % n],
              u = t[(i + 1) % n],
              c = t[(i + 2) % n];
            return e((r - i / n) * n, o, a, u, c);
          };
        }
        var o = (t) => () => t;
        function a(t, n) {
          return function (e) {
            return t + e * n;
          };
        }
        function u(t, n, e) {
          return (
            (t = Math.pow(t, e)),
            (n = Math.pow(n, e) - t),
            (e = 1 / e),
            function (r) {
              return Math.pow(t + r * n, e);
            }
          );
        }
        function c(t, n) {
          var e = n - t;
          return e
            ? a(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e)
            : o(isNaN(t) ? n : t);
        }
        function s(t) {
          return 1 == (t = +t)
            ? l
            : function (n, e) {
                return e - n ? u(n, e, t) : o(isNaN(n) ? e : n);
              };
        }
        function l(t, n) {
          var e = n - t;
          return e ? a(t, e) : o(isNaN(t) ? n : t);
        }
        var f = (function t(e) {
          var r = s(e);
          function i(t, e) {
            var i = r((t = n.rgb(t)).r, (e = n.rgb(e)).r),
              o = r(t.g, e.g),
              a = r(t.b, e.b),
              u = l(t.opacity, e.opacity);
            return function (n) {
              return (
                (t.r = i(n)),
                (t.g = o(n)),
                (t.b = a(n)),
                (t.opacity = u(n)),
                t + ""
              );
            };
          }
          return (i.gamma = t), i;
        })(1);
        function h(t) {
          return function (e) {
            var r,
              i,
              o = e.length,
              a = new Array(o),
              u = new Array(o),
              c = new Array(o);
            for (r = 0; r < o; ++r)
              (i = n.rgb(e[r])),
                (a[r] = i.r || 0),
                (u[r] = i.g || 0),
                (c[r] = i.b || 0);
            return (
              (a = t(a)),
              (u = t(u)),
              (c = t(c)),
              (i.opacity = 1),
              function (t) {
                return (i.r = a(t)), (i.g = u(t)), (i.b = c(t)), i + "";
              }
            );
          };
        }
        var d = h(r),
          p = h(i);
        function g(t, n) {
          n || (n = []);
          var e,
            r = t ? Math.min(n.length, t.length) : 0,
            i = n.slice();
          return function (o) {
            for (e = 0; e < r; ++e) i[e] = t[e] * (1 - o) + n[e] * o;
            return i;
          };
        }
        function v(t) {
          return ArrayBuffer.isView(t) && !(t instanceof DataView);
        }
        function y(t, n) {
          return (v(n) ? g : m)(t, n);
        }
        function m(t, n) {
          var e,
            r = n ? n.length : 0,
            i = t ? Math.min(r, t.length) : 0,
            o = new Array(i),
            a = new Array(r);
          for (e = 0; e < i; ++e) o[e] = $(t[e], n[e]);
          for (; e < r; ++e) a[e] = n[e];
          return function (t) {
            for (e = 0; e < i; ++e) a[e] = o[e](t);
            return a;
          };
        }
        function b(t, n) {
          var e = new Date();
          return (
            (t = +t),
            (n = +n),
            function (r) {
              return e.setTime(t * (1 - r) + n * r), e;
            }
          );
        }
        function _(t, n) {
          return (
            (t = +t),
            (n = +n),
            function (e) {
              return t * (1 - e) + n * e;
            }
          );
        }
        function w(t, n) {
          var e,
            r = {},
            i = {};
          for (e in ((null !== t && "object" == typeof t) || (t = {}),
          (null !== n && "object" == typeof n) || (n = {}),
          n))
            e in t ? (r[e] = $(t[e], n[e])) : (i[e] = n[e]);
          return function (t) {
            for (e in r) i[e] = r[e](t);
            return i;
          };
        }
        var x = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
          M = new RegExp(x.source, "g");
        function j(t) {
          return function () {
            return t;
          };
        }
        function k(t) {
          return function (n) {
            return t(n) + "";
          };
        }
        function A(t, n) {
          var e,
            r,
            i,
            o = (x.lastIndex = M.lastIndex = 0),
            a = -1,
            u = [],
            c = [];
          for (t += "", n += ""; (e = x.exec(t)) && (r = M.exec(n)); )
            (i = r.index) > o &&
              ((i = n.slice(o, i)), u[a] ? (u[a] += i) : (u[++a] = i)),
              (e = e[0]) === (r = r[0])
                ? u[a]
                  ? (u[a] += r)
                  : (u[++a] = r)
                : ((u[++a] = null), c.push({ i: a, x: _(e, r) })),
              (o = M.lastIndex);
          return (
            o < n.length &&
              ((i = n.slice(o)), u[a] ? (u[a] += i) : (u[++a] = i)),
            u.length < 2
              ? c[0]
                ? k(c[0].x)
                : j(n)
              : ((n = c.length),
                function (t) {
                  for (var e, r = 0; r < n; ++r) u[(e = c[r]).i] = e.x(t);
                  return u.join("");
                })
          );
        }
        function $(t, e) {
          var r,
            i = typeof e;
          return null == e || "boolean" === i
            ? o(e)
            : ("number" === i
                ? _
                : "string" === i
                ? (r = n.color(e))
                  ? ((e = r), f)
                  : A
                : e instanceof n.color
                ? f
                : e instanceof Date
                ? b
                : v(e)
                ? g
                : Array.isArray(e)
                ? m
                : ("function" != typeof e.valueOf &&
                    "function" != typeof e.toString) ||
                  isNaN(e)
                ? w
                : _)(t, e);
        }
        function S(t) {
          var n = t.length;
          return function (e) {
            return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))];
          };
        }
        function T(t, n) {
          var e = c(+t, +n);
          return function (t) {
            var n = e(t);
            return n - 360 * Math.floor(n / 360);
          };
        }
        function N(t, n) {
          return (
            (t = +t),
            (n = +n),
            function (e) {
              return Math.round(t * (1 - e) + n * e);
            }
          );
        }
        var C,
          E = 180 / Math.PI,
          I = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1,
          };
        function z(t, n, e, r, i, o) {
          var a, u, c;
          return (
            (a = Math.sqrt(t * t + n * n)) && ((t /= a), (n /= a)),
            (c = t * e + n * r) && ((e -= t * c), (r -= n * c)),
            (u = Math.sqrt(e * e + r * r)) && ((e /= u), (r /= u), (c /= u)),
            t * r < n * e && ((t = -t), (n = -n), (c = -c), (a = -a)),
            {
              translateX: i,
              translateY: o,
              rotate: Math.atan2(n, t) * E,
              skewX: Math.atan(c) * E,
              scaleX: a,
              scaleY: u,
            }
          );
        }
        function D(t) {
          const n = new (
            "function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix
          )(t + "");
          return n.isIdentity ? I : z(n.a, n.b, n.c, n.d, n.e, n.f);
        }
        function O(t) {
          return null == t
            ? I
            : (C ||
                (C = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "g"
                )),
              C.setAttribute("transform", t),
              (t = C.transform.baseVal.consolidate())
                ? z((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f)
                : I);
        }
        function U(t, n, e, r) {
          function i(t) {
            return t.length ? t.pop() + " " : "";
          }
          function o(t, r, i, o, a, u) {
            if (t !== i || r !== o) {
              var c = a.push("translate(", null, n, null, e);
              u.push({ i: c - 4, x: _(t, i) }, { i: c - 2, x: _(r, o) });
            } else (i || o) && a.push("translate(" + i + n + o + e);
          }
          function a(t, n, e, o) {
            t !== n
              ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
                o.push({
                  i: e.push(i(e) + "rotate(", null, r) - 2,
                  x: _(t, n),
                }))
              : n && e.push(i(e) + "rotate(" + n + r);
          }
          function u(t, n, e, o) {
            t !== n
              ? o.push({ i: e.push(i(e) + "skewX(", null, r) - 2, x: _(t, n) })
              : n && e.push(i(e) + "skewX(" + n + r);
          }
          function c(t, n, e, r, o, a) {
            if (t !== e || n !== r) {
              var u = o.push(i(o) + "scale(", null, ",", null, ")");
              a.push({ i: u - 4, x: _(t, e) }, { i: u - 2, x: _(n, r) });
            } else
              (1 === e && 1 === r) ||
                o.push(i(o) + "scale(" + e + "," + r + ")");
          }
          return function (n, e) {
            var r = [],
              i = [];
            return (
              (n = t(n)),
              (e = t(e)),
              o(n.translateX, n.translateY, e.translateX, e.translateY, r, i),
              a(n.rotate, e.rotate, r, i),
              u(n.skewX, e.skewX, r, i),
              c(n.scaleX, n.scaleY, e.scaleX, e.scaleY, r, i),
              (n = e = null),
              function (t) {
                for (var n, e = -1, o = i.length; ++e < o; )
                  r[(n = i[e]).i] = n.x(t);
                return r.join("");
              }
            );
          };
        }
        var q = U(D, "px, ", "px)", "deg)"),
          V = U(O, ", ", ")", ")"),
          F = 1e-12;
        function R(t) {
          return ((t = Math.exp(t)) + 1 / t) / 2;
        }
        function L(t) {
          return ((t = Math.exp(t)) - 1 / t) / 2;
        }
        function B(t) {
          return ((t = Math.exp(2 * t)) - 1) / (t + 1);
        }
        var Y = (function t(n, e, r) {
          function i(t, i) {
            var o,
              a,
              u = t[0],
              c = t[1],
              s = t[2],
              l = i[0],
              f = i[1],
              h = i[2],
              d = l - u,
              p = f - c,
              g = d * d + p * p;
            if (g < F)
              (a = Math.log(h / s) / n),
                (o = function (t) {
                  return [u + t * d, c + t * p, s * Math.exp(n * t * a)];
                });
            else {
              var v = Math.sqrt(g),
                y = (h * h - s * s + r * g) / (2 * s * e * v),
                m = (h * h - s * s - r * g) / (2 * h * e * v),
                b = Math.log(Math.sqrt(y * y + 1) - y),
                _ = Math.log(Math.sqrt(m * m + 1) - m);
              (a = (_ - b) / n),
                (o = function (t) {
                  var r = t * a,
                    i = R(b),
                    o = (s / (e * v)) * (i * B(n * r + b) - L(b));
                  return [u + o * d, c + o * p, (s * i) / R(n * r + b)];
                });
            }
            return (o.duration = (1e3 * a * n) / Math.SQRT2), o;
          }
          return (
            (i.rho = function (n) {
              var e = Math.max(0.001, +n),
                r = e * e;
              return t(e, r, r * r);
            }),
            i
          );
        })(Math.SQRT2, 2, 4);
        function P(t) {
          return function (e, r) {
            var i = t((e = n.hsl(e)).h, (r = n.hsl(r)).h),
              o = l(e.s, r.s),
              a = l(e.l, r.l),
              u = l(e.opacity, r.opacity);
            return function (t) {
              return (
                (e.h = i(t)),
                (e.s = o(t)),
                (e.l = a(t)),
                (e.opacity = u(t)),
                e + ""
              );
            };
          };
        }
        var W = P(c),
          H = P(l);
        function G(t, e) {
          var r = l((t = n.lab(t)).l, (e = n.lab(e)).l),
            i = l(t.a, e.a),
            o = l(t.b, e.b),
            a = l(t.opacity, e.opacity);
          return function (n) {
            return (
              (t.l = r(n)),
              (t.a = i(n)),
              (t.b = o(n)),
              (t.opacity = a(n)),
              t + ""
            );
          };
        }
        function Z(t) {
          return function (e, r) {
            var i = t((e = n.hcl(e)).h, (r = n.hcl(r)).h),
              o = l(e.c, r.c),
              a = l(e.l, r.l),
              u = l(e.opacity, r.opacity);
            return function (t) {
              return (
                (e.h = i(t)),
                (e.c = o(t)),
                (e.l = a(t)),
                (e.opacity = u(t)),
                e + ""
              );
            };
          };
        }
        var X = Z(c),
          J = Z(l);
        function Q(t) {
          return (function e(r) {
            function i(e, i) {
              var o = t((e = n.cubehelix(e)).h, (i = n.cubehelix(i)).h),
                a = l(e.s, i.s),
                u = l(e.l, i.l),
                c = l(e.opacity, i.opacity);
              return function (t) {
                return (
                  (e.h = o(t)),
                  (e.s = a(t)),
                  (e.l = u(Math.pow(t, r))),
                  (e.opacity = c(t)),
                  e + ""
                );
              };
            }
            return (r = +r), (i.gamma = e), i;
          })(1);
        }
        var K = Q(c),
          tt = Q(l);
        function nt(t, n) {
          void 0 === n && ((n = t), (t = $));
          for (
            var e = 0, r = n.length - 1, i = n[0], o = new Array(r < 0 ? 0 : r);
            e < r;

          )
            o[e] = t(i, (i = n[++e]));
          return function (t) {
            var n = Math.max(0, Math.min(r - 1, Math.floor((t *= r))));
            return o[n](t - n);
          };
        }
        function et(t, n) {
          for (var e = new Array(n), r = 0; r < n; ++r) e[r] = t(r / (n - 1));
          return e;
        }
        (t.interpolate = $),
          (t.interpolateArray = y),
          (t.interpolateBasis = r),
          (t.interpolateBasisClosed = i),
          (t.interpolateCubehelix = K),
          (t.interpolateCubehelixLong = tt),
          (t.interpolateDate = b),
          (t.interpolateDiscrete = S),
          (t.interpolateHcl = X),
          (t.interpolateHclLong = J),
          (t.interpolateHsl = W),
          (t.interpolateHslLong = H),
          (t.interpolateHue = T),
          (t.interpolateLab = G),
          (t.interpolateNumber = _),
          (t.interpolateNumberArray = g),
          (t.interpolateObject = w),
          (t.interpolateRgb = f),
          (t.interpolateRgbBasis = d),
          (t.interpolateRgbBasisClosed = p),
          (t.interpolateRound = N),
          (t.interpolateString = A),
          (t.interpolateTransformCss = q),
          (t.interpolateTransformSvg = V),
          (t.interpolateZoom = Y),
          (t.piecewise = nt),
          (t.quantize = et),
          Object.defineProperty(t, "__esModule", { value: !0 });
      })(n, bn.exports);
    })(0, mn.exports);
  var _n = K(mn.exports),
    wn = Object.freeze(
      Object.assign(Object.create(null), mn.exports, { default: _n })
    );
  function xn(t) {
    return +t;
  }
  var Mn = [0, 1];
  function jn(t) {
    return t;
  }
  function kn(t, n) {
    return (n -= t = +t)
      ? function (e) {
          return (e - t) / n;
        }
      : ((e = isNaN(n) ? NaN : 0.5),
        function () {
          return e;
        });
    var e;
  }
  function An(t, n, e) {
    var r = t[0],
      i = t[1],
      o = n[0],
      a = n[1];
    return (
      i < r ? ((r = kn(i, r)), (o = e(a, o))) : ((r = kn(r, i)), (o = e(o, a))),
      function (t) {
        return o(r(t));
      }
    );
  }
  function $n(t, n, e) {
    var r = Math.min(t.length, n.length) - 1,
      i = new Array(r),
      o = new Array(r),
      a = -1;
    for (
      t[r] < t[0] && ((t = t.slice().reverse()), (n = n.slice().reverse()));
      ++a < r;

    )
      (i[a] = kn(t[a], t[a + 1])), (o[a] = e(n[a], n[a + 1]));
    return function (n) {
      var e = mt(t, n, 1, r) - 1;
      return o[e](i[e](n));
    };
  }
  function Sn(t, n) {
    return n
      .domain(t.domain())
      .range(t.range())
      .interpolate(t.interpolate())
      .clamp(t.clamp())
      .unknown(t.unknown());
  }
  function Tn() {
    var t,
      n,
      e,
      r,
      i,
      o,
      a = Mn,
      u = Mn,
      c = mn.exports.interpolate,
      s = jn;
    function l() {
      var t,
        n,
        e,
        c = Math.min(a.length, u.length);
      return (
        s !== jn &&
          ((t = a[0]),
          (n = a[c - 1]),
          t > n && ((e = t), (t = n), (n = e)),
          (s = function (e) {
            return Math.max(t, Math.min(n, e));
          })),
        (r = c > 2 ? $n : An),
        (i = o = null),
        f
      );
    }
    function f(n) {
      return null == n || isNaN((n = +n))
        ? e
        : (i || (i = r(a.map(t), u, c)))(t(s(n)));
    }
    return (
      (f.invert = function (e) {
        return s(
          n((o || (o = r(u, a.map(t), mn.exports.interpolateNumber)))(e))
        );
      }),
      (f.domain = function (t) {
        return arguments.length ? ((a = Array.from(t, xn)), l()) : a.slice();
      }),
      (f.range = function (t) {
        return arguments.length ? ((u = Array.from(t)), l()) : u.slice();
      }),
      (f.rangeRound = function (t) {
        return (u = Array.from(t)), (c = mn.exports.interpolateRound), l();
      }),
      (f.clamp = function (t) {
        return arguments.length ? ((s = !!t || jn), l()) : s !== jn;
      }),
      (f.interpolate = function (t) {
        return arguments.length ? ((c = t), l()) : c;
      }),
      (f.unknown = function (t) {
        return arguments.length ? ((e = t), f) : e;
      }),
      function (e, r) {
        return (t = e), (n = r), l();
      }
    );
  }
  function Nn() {
    return Tn()(jn, jn);
  }
  var Cn = { exports: {} };
  function En(t, n, e, r) {
    var i,
      o = Yt(t, n, e);
    switch ((r = Cn.exports.formatSpecifier(null == r ? ",f" : r)).type) {
      case "s":
        var a = Math.max(Math.abs(t), Math.abs(n));
        return (
          null != r.precision ||
            isNaN((i = Cn.exports.precisionPrefix(o, a))) ||
            (r.precision = i),
          Cn.exports.formatPrefix(r, a)
        );
      case "":
      case "e":
      case "g":
      case "p":
      case "r":
        null != r.precision ||
          isNaN(
            (i = Cn.exports.precisionRound(
              o,
              Math.max(Math.abs(t), Math.abs(n))
            ))
          ) ||
          (r.precision = i - ("e" === r.type));
        break;
      case "f":
      case "%":
        null != r.precision ||
          isNaN((i = Cn.exports.precisionFixed(o))) ||
          (r.precision = i - 2 * ("%" === r.type));
    }
    return Cn.exports.format(r);
  }
  function In(t) {
    var n = t.domain;
    return (
      (t.ticks = function (t) {
        var e = n();
        return Lt(e[0], e[e.length - 1], null == t ? 10 : t);
      }),
      (t.tickFormat = function (t, e) {
        var r = n();
        return En(r[0], r[r.length - 1], null == t ? 10 : t, e);
      }),
      (t.nice = function (e) {
        null == e && (e = 10);
        var r,
          i,
          o = n(),
          a = 0,
          u = o.length - 1,
          c = o[a],
          s = o[u],
          l = 10;
        for (
          s < c && ((i = c), (c = s), (s = i), (i = a), (a = u), (u = i));
          l-- > 0;

        ) {
          if ((i = Bt(c, s, e)) === r) return (o[a] = c), (o[u] = s), n(o);
          if (i > 0) (c = Math.floor(c / i) * i), (s = Math.ceil(s / i) * i);
          else {
            if (!(i < 0)) break;
            (c = Math.ceil(c * i) / i), (s = Math.floor(s * i) / i);
          }
          r = i;
        }
        return t;
      }),
      t
    );
  }
  function zn() {
    var t = Nn();
    return (
      (t.copy = function () {
        return Sn(t, zn());
      }),
      pn.apply(t, arguments),
      In(t)
    );
  }
  function Dn(t, n) {
    var e,
      r = 0,
      i = (t = t.slice()).length - 1,
      o = t[r],
      a = t[i];
    return (
      a < o && ((e = r), (r = i), (i = e), (e = o), (o = a), (a = e)),
      (t[r] = n.floor(o)),
      (t[i] = n.ceil(a)),
      t
    );
  }
  function On(t) {
    return Math.log(t);
  }
  function Un(t) {
    return Math.exp(t);
  }
  function qn(t) {
    return -Math.log(-t);
  }
  function Vn(t) {
    return -Math.exp(-t);
  }
  function Fn(t) {
    return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t;
  }
  function Rn(t) {
    return function (n) {
      return -t(-n);
    };
  }
  function Ln(t) {
    var n,
      e,
      r = t(On, Un),
      i = r.domain,
      o = 10;
    function a() {
      return (
        (n = (function (t) {
          return t === Math.E
            ? Math.log
            : (10 === t && Math.log10) ||
                (2 === t && Math.log2) ||
                ((t = Math.log(t)),
                function (n) {
                  return Math.log(n) / t;
                });
        })(o)),
        (e = (function (t) {
          return 10 === t
            ? Fn
            : t === Math.E
            ? Math.exp
            : function (n) {
                return Math.pow(t, n);
              };
        })(o)),
        i()[0] < 0 ? ((n = Rn(n)), (e = Rn(e)), t(qn, Vn)) : t(On, Un),
        r
      );
    }
    return (
      (r.base = function (t) {
        return arguments.length ? ((o = +t), a()) : o;
      }),
      (r.domain = function (t) {
        return arguments.length ? (i(t), a()) : i();
      }),
      (r.ticks = function (t) {
        var r,
          a = i(),
          u = a[0],
          c = a[a.length - 1];
        (r = c < u) && ((h = u), (u = c), (c = h));
        var s,
          l,
          f,
          h = n(u),
          d = n(c),
          p = null == t ? 10 : +t,
          g = [];
        if (!(o % 1) && d - h < p) {
          if (((h = Math.floor(h)), (d = Math.ceil(d)), u > 0)) {
            for (; h <= d; ++h)
              for (l = 1, s = e(h); l < o; ++l)
                if (!((f = s * l) < u)) {
                  if (f > c) break;
                  g.push(f);
                }
          } else
            for (; h <= d; ++h)
              for (l = o - 1, s = e(h); l >= 1; --l)
                if (!((f = s * l) < u)) {
                  if (f > c) break;
                  g.push(f);
                }
          2 * g.length < p && (g = Lt(u, c, p));
        } else g = Lt(h, d, Math.min(d - h, p)).map(e);
        return r ? g.reverse() : g;
      }),
      (r.tickFormat = function (t, i) {
        if (
          (null == i && (i = 10 === o ? ".0e" : ","),
          "function" != typeof i && (i = Cn.exports.format(i)),
          t === 1 / 0)
        )
          return i;
        null == t && (t = 10);
        var a = Math.max(1, (o * t) / r.ticks().length);
        return function (t) {
          var r = t / e(Math.round(n(t)));
          return r * o < o - 0.5 && (r *= o), r <= a ? i(t) : "";
        };
      }),
      (r.nice = function () {
        return i(
          Dn(i(), {
            floor: function (t) {
              return e(Math.floor(n(t)));
            },
            ceil: function (t) {
              return e(Math.ceil(n(t)));
            },
          })
        );
      }),
      r
    );
  }
  function Bn(t) {
    return function (n) {
      return Math.sign(n) * Math.log1p(Math.abs(n / t));
    };
  }
  function Yn(t) {
    return function (n) {
      return Math.sign(n) * Math.expm1(Math.abs(n)) * t;
    };
  }
  function Pn(t) {
    var n = 1,
      e = t(Bn(n), Yn(n));
    return (
      (e.constant = function (e) {
        return arguments.length ? t(Bn((n = +e)), Yn(n)) : n;
      }),
      In(e)
    );
  }
  function Wn(t) {
    return function (n) {
      return n < 0 ? -Math.pow(-n, t) : Math.pow(n, t);
    };
  }
  function Hn(t) {
    return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t);
  }
  function Gn(t) {
    return t < 0 ? -t * t : t * t;
  }
  function Zn(t) {
    var n = t(jn, jn),
      e = 1;
    function r() {
      return 1 === e ? t(jn, jn) : 0.5 === e ? t(Hn, Gn) : t(Wn(e), Wn(1 / e));
    }
    return (
      (n.exponent = function (t) {
        return arguments.length ? ((e = +t), r()) : e;
      }),
      In(n)
    );
  }
  function Xn() {
    var t = Zn(Tn());
    return (
      (t.copy = function () {
        return Sn(t, Xn()).exponent(t.exponent());
      }),
      pn.apply(t, arguments),
      t
    );
  }
  !(function (t, n) {
    !(function (t) {
      function n(t) {
        return Math.abs((t = Math.round(t))) >= 1e21
          ? t.toLocaleString("en").replace(/,/g, "")
          : t.toString(10);
      }
      function e(t, n) {
        if (
          (e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf(
            "e"
          )) < 0
        )
          return null;
        var e,
          r = t.slice(0, e);
        return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)];
      }
      function r(t) {
        return (t = e(Math.abs(t))) ? t[1] : NaN;
      }
      function i(t, n) {
        return function (e, r) {
          for (
            var i = e.length, o = [], a = 0, u = t[0], c = 0;
            i > 0 &&
            u > 0 &&
            (c + u + 1 > r && (u = Math.max(1, r - c)),
            o.push(e.substring((i -= u), i + u)),
            !((c += u + 1) > r));

          )
            u = t[(a = (a + 1) % t.length)];
          return o.reverse().join(n);
        };
      }
      function o(t) {
        return function (n) {
          return n.replace(/[0-9]/g, function (n) {
            return t[+n];
          });
        };
      }
      var a,
        u =
          /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
      function c(t) {
        if (!(n = u.exec(t))) throw new Error("invalid format: " + t);
        var n;
        return new s({
          fill: n[1],
          align: n[2],
          sign: n[3],
          symbol: n[4],
          zero: n[5],
          width: n[6],
          comma: n[7],
          precision: n[8] && n[8].slice(1),
          trim: n[9],
          type: n[10],
        });
      }
      function s(t) {
        (this.fill = void 0 === t.fill ? " " : t.fill + ""),
          (this.align = void 0 === t.align ? ">" : t.align + ""),
          (this.sign = void 0 === t.sign ? "-" : t.sign + ""),
          (this.symbol = void 0 === t.symbol ? "" : t.symbol + ""),
          (this.zero = !!t.zero),
          (this.width = void 0 === t.width ? void 0 : +t.width),
          (this.comma = !!t.comma),
          (this.precision = void 0 === t.precision ? void 0 : +t.precision),
          (this.trim = !!t.trim),
          (this.type = void 0 === t.type ? "" : t.type + "");
      }
      function l(t) {
        t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r)
          switch (t[r]) {
            case ".":
              i = n = r;
              break;
            case "0":
              0 === i && (i = r), (n = r);
              break;
            default:
              if (!+t[r]) break t;
              i > 0 && (i = 0);
          }
        return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t;
      }
      function f(t, n) {
        var r = e(t, n);
        if (!r) return t + "";
        var i = r[0],
          o = r[1],
          u = o - (a = 3 * Math.max(-8, Math.min(8, Math.floor(o / 3)))) + 1,
          c = i.length;
        return u === c
          ? i
          : u > c
          ? i + new Array(u - c + 1).join("0")
          : u > 0
          ? i.slice(0, u) + "." + i.slice(u)
          : "0." + new Array(1 - u).join("0") + e(t, Math.max(0, n + u - 1))[0];
      }
      function h(t, n) {
        var r = e(t, n);
        if (!r) return t + "";
        var i = r[0],
          o = r[1];
        return o < 0
          ? "0." + new Array(-o).join("0") + i
          : i.length > o + 1
          ? i.slice(0, o + 1) + "." + i.slice(o + 1)
          : i + new Array(o - i.length + 2).join("0");
      }
      (c.prototype = s.prototype),
        (s.prototype.toString = function () {
          return (
            this.fill +
            this.align +
            this.sign +
            this.symbol +
            (this.zero ? "0" : "") +
            (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) +
            (this.comma ? "," : "") +
            (void 0 === this.precision
              ? ""
              : "." + Math.max(0, 0 | this.precision)) +
            (this.trim ? "~" : "") +
            this.type
          );
        });
      var d = {
        "%": (t, n) => (100 * t).toFixed(n),
        b: (t) => Math.round(t).toString(2),
        c: (t) => t + "",
        d: n,
        e: (t, n) => t.toExponential(n),
        f: (t, n) => t.toFixed(n),
        g: (t, n) => t.toPrecision(n),
        o: (t) => Math.round(t).toString(8),
        p: (t, n) => h(100 * t, n),
        r: h,
        s: f,
        X: (t) => Math.round(t).toString(16).toUpperCase(),
        x: (t) => Math.round(t).toString(16),
      };
      function p(t) {
        return t;
      }
      var g,
        v = Array.prototype.map,
        y = [
          "y",
          "z",
          "a",
          "f",
          "p",
          "n",
          "µ",
          "m",
          "",
          "k",
          "M",
          "G",
          "T",
          "P",
          "E",
          "Z",
          "Y",
        ];
      function m(t) {
        var n =
            void 0 === t.grouping || void 0 === t.thousands
              ? p
              : i(v.call(t.grouping, Number), t.thousands + ""),
          e = void 0 === t.currency ? "" : t.currency[0] + "",
          u = void 0 === t.currency ? "" : t.currency[1] + "",
          s = void 0 === t.decimal ? "." : t.decimal + "",
          f = void 0 === t.numerals ? p : o(v.call(t.numerals, String)),
          h = void 0 === t.percent ? "%" : t.percent + "",
          g = void 0 === t.minus ? "−" : t.minus + "",
          m = void 0 === t.nan ? "NaN" : t.nan + "";
        function b(t) {
          var r = (t = c(t)).fill,
            i = t.align,
            o = t.sign,
            p = t.symbol,
            v = t.zero,
            b = t.width,
            _ = t.comma,
            w = t.precision,
            x = t.trim,
            M = t.type;
          "n" === M
            ? ((_ = !0), (M = "g"))
            : d[M] || (void 0 === w && (w = 12), (x = !0), (M = "g")),
            (v || ("0" === r && "=" === i)) && ((v = !0), (r = "0"), (i = "="));
          var j =
              "$" === p
                ? e
                : "#" === p && /[boxX]/.test(M)
                ? "0" + M.toLowerCase()
                : "",
            k = "$" === p ? u : /[%p]/.test(M) ? h : "",
            A = d[M],
            $ = /[defgprs%]/.test(M);
          function S(t) {
            var e,
              u,
              c,
              h = j,
              d = k;
            if ("c" === M) (d = A(t) + d), (t = "");
            else {
              var p = (t = +t) < 0 || 1 / t < 0;
              if (
                ((t = isNaN(t) ? m : A(Math.abs(t), w)),
                x && (t = l(t)),
                p && 0 == +t && "+" !== o && (p = !1),
                (h =
                  (p ? ("(" === o ? o : g) : "-" === o || "(" === o ? "" : o) +
                  h),
                (d =
                  ("s" === M ? y[8 + a / 3] : "") +
                  d +
                  (p && "(" === o ? ")" : "")),
                $)
              )
                for (e = -1, u = t.length; ++e < u; )
                  if (48 > (c = t.charCodeAt(e)) || c > 57) {
                    (d = (46 === c ? s + t.slice(e + 1) : t.slice(e)) + d),
                      (t = t.slice(0, e));
                    break;
                  }
            }
            _ && !v && (t = n(t, 1 / 0));
            var S = h.length + t.length + d.length,
              T = S < b ? new Array(b - S + 1).join(r) : "";
            switch (
              (_ &&
                v &&
                ((t = n(T + t, T.length ? b - d.length : 1 / 0)), (T = "")),
              i)
            ) {
              case "<":
                t = h + t + d + T;
                break;
              case "=":
                t = h + T + t + d;
                break;
              case "^":
                t = T.slice(0, (S = T.length >> 1)) + h + t + d + T.slice(S);
                break;
              default:
                t = T + h + t + d;
            }
            return f(t);
          }
          return (
            (w =
              void 0 === w
                ? 6
                : /[gprs]/.test(M)
                ? Math.max(1, Math.min(21, w))
                : Math.max(0, Math.min(20, w))),
            (S.toString = function () {
              return t + "";
            }),
            S
          );
        }
        function _(t, n) {
          var e = b((((t = c(t)).type = "f"), t)),
            i = 3 * Math.max(-8, Math.min(8, Math.floor(r(n) / 3))),
            o = Math.pow(10, -i),
            a = y[8 + i / 3];
          return function (t) {
            return e(o * t) + a;
          };
        }
        return { format: b, formatPrefix: _ };
      }
      function b(n) {
        return (
          (g = m(n)),
          (t.format = g.format),
          (t.formatPrefix = g.formatPrefix),
          g
        );
      }
      function _(t) {
        return Math.max(0, -r(Math.abs(t)));
      }
      function w(t, n) {
        return Math.max(
          0,
          3 * Math.max(-8, Math.min(8, Math.floor(r(n) / 3))) - r(Math.abs(t))
        );
      }
      function x(t, n) {
        return (
          (t = Math.abs(t)), (n = Math.abs(n) - t), Math.max(0, r(n) - r(t)) + 1
        );
      }
      b({ thousands: ",", grouping: [3], currency: ["$", ""] }),
        (t.FormatSpecifier = s),
        (t.formatDefaultLocale = b),
        (t.formatLocale = m),
        (t.formatSpecifier = c),
        (t.precisionFixed = _),
        (t.precisionPrefix = w),
        (t.precisionRound = x),
        Object.defineProperty(t, "__esModule", { value: !0 });
    })(n);
  })(0, Cn.exports);
  var Jn = new Date(),
    Qn = new Date();
  function Kn(t, n, e, r) {
    function i(n) {
      return t((n = 0 === arguments.length ? new Date() : new Date(+n))), n;
    }
    return (
      (i.floor = function (n) {
        return t((n = new Date(+n))), n;
      }),
      (i.ceil = function (e) {
        return t((e = new Date(e - 1))), n(e, 1), t(e), e;
      }),
      (i.round = function (t) {
        var n = i(t),
          e = i.ceil(t);
        return t - n < e - t ? n : e;
      }),
      (i.offset = function (t, e) {
        return n((t = new Date(+t)), null == e ? 1 : Math.floor(e)), t;
      }),
      (i.range = function (e, r, o) {
        var a,
          u = [];
        if (
          ((e = i.ceil(e)),
          (o = null == o ? 1 : Math.floor(o)),
          !(e < r && o > 0))
        )
          return u;
        do {
          u.push((a = new Date(+e))), n(e, o), t(e);
        } while (a < e && e < r);
        return u;
      }),
      (i.filter = function (e) {
        return Kn(
          function (n) {
            if (n >= n) for (; t(n), !e(n); ) n.setTime(n - 1);
          },
          function (t, r) {
            if (t >= t)
              if (r < 0) for (; ++r <= 0; ) for (; n(t, -1), !e(t); );
              else for (; --r >= 0; ) for (; n(t, 1), !e(t); );
          }
        );
      }),
      e &&
        ((i.count = function (n, r) {
          return (
            Jn.setTime(+n), Qn.setTime(+r), t(Jn), t(Qn), Math.floor(e(Jn, Qn))
          );
        }),
        (i.every = function (t) {
          return (
            (t = Math.floor(t)),
            isFinite(t) && t > 0
              ? t > 1
                ? i.filter(
                    r
                      ? function (n) {
                          return r(n) % t == 0;
                        }
                      : function (n) {
                          return i.count(0, n) % t == 0;
                        }
                  )
                : i
              : null
          );
        })),
      i
    );
  }
  var te = Kn(
    function () {},
    function (t, n) {
      t.setTime(+t + n);
    },
    function (t, n) {
      return n - t;
    }
  );
  te.every = function (t) {
    return (
      (t = Math.floor(t)),
      isFinite(t) && t > 0
        ? t > 1
          ? Kn(
              function (n) {
                n.setTime(Math.floor(n / t) * t);
              },
              function (n, e) {
                n.setTime(+n + e * t);
              },
              function (n, e) {
                return (e - n) / t;
              }
            )
          : te
        : null
    );
  };
  var ne = te.range;
  const ee = 1e3,
    re = 6e4,
    ie = 36e5,
    oe = 864e5,
    ae = 6048e5,
    ue = 2592e6,
    ce = 31536e6;
  var se = Kn(
      function (t) {
        t.setTime(t - t.getMilliseconds());
      },
      function (t, n) {
        t.setTime(+t + n * ee);
      },
      function (t, n) {
        return (n - t) / ee;
      },
      function (t) {
        return t.getUTCSeconds();
      }
    ),
    le = se.range,
    fe = Kn(
      function (t) {
        t.setTime(t - t.getMilliseconds() - t.getSeconds() * ee);
      },
      function (t, n) {
        t.setTime(+t + n * re);
      },
      function (t, n) {
        return (n - t) / re;
      },
      function (t) {
        return t.getMinutes();
      }
    ),
    he = fe.range,
    de = Kn(
      function (t) {
        t.setTime(
          t - t.getMilliseconds() - t.getSeconds() * ee - t.getMinutes() * re
        );
      },
      function (t, n) {
        t.setTime(+t + n * ie);
      },
      function (t, n) {
        return (n - t) / ie;
      },
      function (t) {
        return t.getHours();
      }
    ),
    pe = de.range,
    ge = Kn(
      (t) => t.setHours(0, 0, 0, 0),
      (t, n) => t.setDate(t.getDate() + n),
      (t, n) =>
        (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * re) / oe,
      (t) => t.getDate() - 1
    ),
    ve = ge.range;
  function ye(t) {
    return Kn(
      function (n) {
        n.setDate(n.getDate() - ((n.getDay() + 7 - t) % 7)),
          n.setHours(0, 0, 0, 0);
      },
      function (t, n) {
        t.setDate(t.getDate() + 7 * n);
      },
      function (t, n) {
        return (
          (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * re) / ae
        );
      }
    );
  }
  var me = ye(0),
    be = ye(1),
    _e = ye(2),
    we = ye(3),
    xe = ye(4),
    Me = ye(5),
    je = ye(6),
    ke = me.range,
    Ae = be.range,
    $e = _e.range,
    Se = we.range,
    Te = xe.range,
    Ne = Me.range,
    Ce = je.range,
    Ee = Kn(
      function (t) {
        t.setDate(1), t.setHours(0, 0, 0, 0);
      },
      function (t, n) {
        t.setMonth(t.getMonth() + n);
      },
      function (t, n) {
        return (
          n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
        );
      },
      function (t) {
        return t.getMonth();
      }
    ),
    Ie = Ee.range,
    ze = Kn(
      function (t) {
        t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
      },
      function (t, n) {
        t.setFullYear(t.getFullYear() + n);
      },
      function (t, n) {
        return n.getFullYear() - t.getFullYear();
      },
      function (t) {
        return t.getFullYear();
      }
    );
  ze.every = function (t) {
    return isFinite((t = Math.floor(t))) && t > 0
      ? Kn(
          function (n) {
            n.setFullYear(Math.floor(n.getFullYear() / t) * t),
              n.setMonth(0, 1),
              n.setHours(0, 0, 0, 0);
          },
          function (n, e) {
            n.setFullYear(n.getFullYear() + e * t);
          }
        )
      : null;
  };
  var De = ze.range,
    Oe = Kn(
      function (t) {
        t.setUTCSeconds(0, 0);
      },
      function (t, n) {
        t.setTime(+t + n * re);
      },
      function (t, n) {
        return (n - t) / re;
      },
      function (t) {
        return t.getUTCMinutes();
      }
    ),
    Ue = Oe.range,
    qe = Kn(
      function (t) {
        t.setUTCMinutes(0, 0, 0);
      },
      function (t, n) {
        t.setTime(+t + n * ie);
      },
      function (t, n) {
        return (n - t) / ie;
      },
      function (t) {
        return t.getUTCHours();
      }
    ),
    Ve = qe.range,
    Fe = Kn(
      function (t) {
        t.setUTCHours(0, 0, 0, 0);
      },
      function (t, n) {
        t.setUTCDate(t.getUTCDate() + n);
      },
      function (t, n) {
        return (n - t) / oe;
      },
      function (t) {
        return t.getUTCDate() - 1;
      }
    ),
    Re = Fe.range;
  function Le(t) {
    return Kn(
      function (n) {
        n.setUTCDate(n.getUTCDate() - ((n.getUTCDay() + 7 - t) % 7)),
          n.setUTCHours(0, 0, 0, 0);
      },
      function (t, n) {
        t.setUTCDate(t.getUTCDate() + 7 * n);
      },
      function (t, n) {
        return (n - t) / ae;
      }
    );
  }
  var Be = Le(0),
    Ye = Le(1),
    Pe = Le(2),
    We = Le(3),
    He = Le(4),
    Ge = Le(5),
    Ze = Le(6),
    Xe = Be.range,
    Je = Ye.range,
    Qe = Pe.range,
    Ke = We.range,
    tr = He.range,
    nr = Ge.range,
    er = Ze.range,
    rr = Kn(
      function (t) {
        t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
      },
      function (t, n) {
        t.setUTCMonth(t.getUTCMonth() + n);
      },
      function (t, n) {
        return (
          n.getUTCMonth() -
          t.getUTCMonth() +
          12 * (n.getUTCFullYear() - t.getUTCFullYear())
        );
      },
      function (t) {
        return t.getUTCMonth();
      }
    ),
    ir = rr.range,
    or = Kn(
      function (t) {
        t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
      },
      function (t, n) {
        t.setUTCFullYear(t.getUTCFullYear() + n);
      },
      function (t, n) {
        return n.getUTCFullYear() - t.getUTCFullYear();
      },
      function (t) {
        return t.getUTCFullYear();
      }
    );
  or.every = function (t) {
    return isFinite((t = Math.floor(t))) && t > 0
      ? Kn(
          function (n) {
            n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t),
              n.setUTCMonth(0, 1),
              n.setUTCHours(0, 0, 0, 0);
          },
          function (n, e) {
            n.setUTCFullYear(n.getUTCFullYear() + e * t);
          }
        )
      : null;
  };
  var ar = or.range;
  function ur(t, n, e, r, i, o) {
    const a = [
      [se, 1, ee],
      [se, 5, 5e3],
      [se, 15, 15e3],
      [se, 30, 3e4],
      [o, 1, re],
      [o, 5, 3e5],
      [o, 15, 9e5],
      [o, 30, 18e5],
      [i, 1, ie],
      [i, 3, 108e5],
      [i, 6, 216e5],
      [i, 12, 432e5],
      [r, 1, oe],
      [r, 2, 1728e5],
      [e, 1, ae],
      [n, 1, ue],
      [n, 3, 7776e6],
      [t, 1, ce],
    ];
    function u(n, e, r) {
      const i = Math.abs(e - n) / r,
        o = gt(([, , t]) => t).right(a, i);
      if (o === a.length) return t.every(Yt(n / ce, e / ce, r));
      if (0 === o) return te.every(Math.max(Yt(n, e, r), 1));
      const [u, c] = a[i / a[o - 1][2] < a[o][2] / i ? o - 1 : o];
      return u.every(c);
    }
    return [
      function (t, n, e) {
        const r = n < t;
        r && ([t, n] = [n, t]);
        const i = e && "function" == typeof e.range ? e : u(t, n, e),
          o = i ? i.range(t, +n + 1) : [];
        return r ? o.reverse() : o;
      },
      u,
    ];
  }
  const [cr, sr] = ur(or, rr, Be, Fe, qe, Oe),
    [lr, fr] = ur(ze, Ee, me, ge, de, fe);
  var hr = { exports: {} },
    dr = tt(
      Object.freeze({
        __proto__: null,
        timeInterval: Kn,
        timeMillisecond: te,
        timeMilliseconds: ne,
        utcMillisecond: te,
        utcMilliseconds: ne,
        timeSecond: se,
        timeSeconds: le,
        utcSecond: se,
        utcSeconds: le,
        timeMinute: fe,
        timeMinutes: he,
        timeHour: de,
        timeHours: pe,
        timeDay: ge,
        timeDays: ve,
        timeWeek: me,
        timeWeeks: ke,
        timeSunday: me,
        timeSundays: ke,
        timeMonday: be,
        timeMondays: Ae,
        timeTuesday: _e,
        timeTuesdays: $e,
        timeWednesday: we,
        timeWednesdays: Se,
        timeThursday: xe,
        timeThursdays: Te,
        timeFriday: Me,
        timeFridays: Ne,
        timeSaturday: je,
        timeSaturdays: Ce,
        timeMonth: Ee,
        timeMonths: Ie,
        timeYear: ze,
        timeYears: De,
        utcMinute: Oe,
        utcMinutes: Ue,
        utcHour: qe,
        utcHours: Ve,
        utcDay: Fe,
        utcDays: Re,
        utcWeek: Be,
        utcWeeks: Xe,
        utcSunday: Be,
        utcSundays: Xe,
        utcMonday: Ye,
        utcMondays: Je,
        utcTuesday: Pe,
        utcTuesdays: Qe,
        utcWednesday: We,
        utcWednesdays: Ke,
        utcThursday: He,
        utcThursdays: tr,
        utcFriday: Ge,
        utcFridays: nr,
        utcSaturday: Ze,
        utcSaturdays: er,
        utcMonth: rr,
        utcMonths: ir,
        utcYear: or,
        utcYears: ar,
        utcTicks: cr,
        utcTickInterval: sr,
        timeTicks: lr,
        timeTickInterval: fr,
      })
    );
  function pr(t) {
    return new Date(t);
  }
  function gr(t) {
    return t instanceof Date ? +t : +new Date(+t);
  }
  function vr(t, n, e, r, i, o, a, u, c, s) {
    var l = Nn(),
      f = l.invert,
      h = l.domain,
      d = s(".%L"),
      p = s(":%S"),
      g = s("%I:%M"),
      v = s("%I %p"),
      y = s("%a %d"),
      m = s("%b %d"),
      b = s("%B"),
      _ = s("%Y");
    function w(t) {
      return (
        c(t) < t
          ? d
          : u(t) < t
          ? p
          : a(t) < t
          ? g
          : o(t) < t
          ? v
          : r(t) < t
          ? i(t) < t
            ? y
            : m
          : e(t) < t
          ? b
          : _
      )(t);
    }
    return (
      (l.invert = function (t) {
        return new Date(f(t));
      }),
      (l.domain = function (t) {
        return arguments.length ? h(Array.from(t, gr)) : h().map(pr);
      }),
      (l.ticks = function (n) {
        var e = h();
        return t(e[0], e[e.length - 1], null == n ? 10 : n);
      }),
      (l.tickFormat = function (t, n) {
        return null == n ? w : s(n);
      }),
      (l.nice = function (t) {
        var e = h();
        return (
          (t && "function" == typeof t.range) ||
            (t = n(e[0], e[e.length - 1], null == t ? 10 : t)),
          t ? h(Dn(e, t)) : l
        );
      }),
      (l.copy = function () {
        return Sn(l, vr(t, n, e, r, i, o, a, u, c, s));
      }),
      l
    );
  }
  function yr() {
    var t,
      n,
      e,
      r,
      i,
      o = 0,
      a = 1,
      u = jn,
      c = !1;
    function s(n) {
      return null == n || isNaN((n = +n))
        ? i
        : u(
            0 === e
              ? 0.5
              : ((n = (r(n) - t) * e), c ? Math.max(0, Math.min(1, n)) : n)
          );
    }
    function l(t) {
      return function (n) {
        var e, r;
        return arguments.length
          ? (([e, r] = n), (u = t(e, r)), s)
          : [u(0), u(1)];
      };
    }
    return (
      (s.domain = function (i) {
        return arguments.length
          ? (([o, a] = i),
            (t = r((o = +o))),
            (n = r((a = +a))),
            (e = t === n ? 0 : 1 / (n - t)),
            s)
          : [o, a];
      }),
      (s.clamp = function (t) {
        return arguments.length ? ((c = !!t), s) : c;
      }),
      (s.interpolator = function (t) {
        return arguments.length ? ((u = t), s) : u;
      }),
      (s.range = l(mn.exports.interpolate)),
      (s.rangeRound = l(mn.exports.interpolateRound)),
      (s.unknown = function (t) {
        return arguments.length ? ((i = t), s) : i;
      }),
      function (i) {
        return (
          (r = i), (t = i(o)), (n = i(a)), (e = t === n ? 0 : 1 / (n - t)), s
        );
      }
    );
  }
  function mr(t, n) {
    return n
      .domain(t.domain())
      .interpolator(t.interpolator())
      .clamp(t.clamp())
      .unknown(t.unknown());
  }
  function br() {
    var t = In(yr()(jn));
    return (
      (t.copy = function () {
        return mr(t, br());
      }),
      gn.apply(t, arguments)
    );
  }
  function _r() {
    var t = Zn(yr());
    return (
      (t.copy = function () {
        return mr(t, _r()).exponent(t.exponent());
      }),
      gn.apply(t, arguments)
    );
  }
  function wr() {
    var t,
      n,
      e,
      r,
      i,
      o,
      a,
      u = 0,
      c = 0.5,
      s = 1,
      l = 1,
      f = jn,
      h = !1;
    function d(t) {
      return isNaN((t = +t))
        ? a
        : ((t = 0.5 + ((t = +o(t)) - n) * (l * t < l * n ? r : i)),
          f(h ? Math.max(0, Math.min(1, t)) : t));
    }
    function p(t) {
      return function (n) {
        var e, r, i;
        return arguments.length
          ? (([e, r, i] = n), (f = mn.exports.piecewise(t, [e, r, i])), d)
          : [f(0), f(0.5), f(1)];
      };
    }
    return (
      (d.domain = function (a) {
        return arguments.length
          ? (([u, c, s] = a),
            (t = o((u = +u))),
            (n = o((c = +c))),
            (e = o((s = +s))),
            (r = t === n ? 0 : 0.5 / (n - t)),
            (i = n === e ? 0 : 0.5 / (e - n)),
            (l = n < t ? -1 : 1),
            d)
          : [u, c, s];
      }),
      (d.clamp = function (t) {
        return arguments.length ? ((h = !!t), d) : h;
      }),
      (d.interpolator = function (t) {
        return arguments.length ? ((f = t), d) : f;
      }),
      (d.range = p(mn.exports.interpolate)),
      (d.rangeRound = p(mn.exports.interpolateRound)),
      (d.unknown = function (t) {
        return arguments.length ? ((a = t), d) : a;
      }),
      function (a) {
        return (
          (o = a),
          (t = a(u)),
          (n = a(c)),
          (e = a(s)),
          (r = t === n ? 0 : 0.5 / (n - t)),
          (i = n === e ? 0 : 0.5 / (e - n)),
          (l = n < t ? -1 : 1),
          d
        );
      }
    );
  }
  function xr() {
    var t = Zn(wr());
    return (
      (t.copy = function () {
        return mr(t, xr()).exponent(t.exponent());
      }),
      gn.apply(t, arguments)
    );
  }
  !(function (t, n) {
    !(function (t, n) {
      function e(t) {
        if (0 <= t.y && t.y < 100) {
          var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
          return n.setFullYear(t.y), n;
        }
        return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
      }
      function r(t) {
        if (0 <= t.y && t.y < 100) {
          var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
          return n.setUTCFullYear(t.y), n;
        }
        return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
      }
      function i(t, n, e) {
        return { y: t, m: n, d: e, H: 0, M: 0, S: 0, L: 0 };
      }
      function o(t) {
        var o = t.dateTime,
          a = t.date,
          c = t.time,
          s = t.periods,
          l = t.days,
          f = t.shortDays,
          h = t.months,
          W = t.shortMonths,
          ht = d(s),
          jt = p(s),
          kt = d(l),
          At = p(l),
          $t = d(f),
          St = p(f),
          Tt = d(h),
          Nt = p(h),
          Ct = d(W),
          Et = p(W),
          It = {
            a: Ht,
            A: Gt,
            b: Zt,
            B: Xt,
            c: null,
            d: D,
            e: D,
            f: F,
            g: J,
            G: K,
            H: O,
            I: U,
            j: q,
            L: V,
            m: R,
            M: L,
            p: Jt,
            q: Qt,
            Q: xt,
            s: Mt,
            S: B,
            u: Y,
            U: P,
            V: H,
            w: G,
            W: Z,
            x: null,
            X: null,
            y: X,
            Y: Q,
            Z: tt,
            "%": wt,
          },
          zt = {
            a: Kt,
            A: tn,
            b: nn,
            B: en,
            c: null,
            d: nt,
            e: nt,
            f: at,
            g: yt,
            G: bt,
            H: et,
            I: rt,
            j: it,
            L: ot,
            m: ut,
            M: ct,
            p: rn,
            q: on,
            Q: xt,
            s: Mt,
            S: st,
            u: lt,
            U: ft,
            V: dt,
            w: pt,
            W: gt,
            x: null,
            X: null,
            y: vt,
            Y: mt,
            Z: _t,
            "%": wt,
          },
          Dt = {
            a: Ft,
            A: Rt,
            b: Lt,
            B: Bt,
            c: Yt,
            d: k,
            e: k,
            f: C,
            g: w,
            G: _,
            H: $,
            I: $,
            j: A,
            L: N,
            m: j,
            M: S,
            p: Vt,
            q: M,
            Q: I,
            s: z,
            S: T,
            u: v,
            U: y,
            V: m,
            w: g,
            W: b,
            x: Pt,
            X: Wt,
            y: w,
            Y: _,
            Z: x,
            "%": E,
          };
        function Ot(t, n) {
          return function (e) {
            var r,
              i,
              o,
              a = [],
              c = -1,
              s = 0,
              l = t.length;
            for (e instanceof Date || (e = new Date(+e)); ++c < l; )
              37 === t.charCodeAt(c) &&
                (a.push(t.slice(s, c)),
                null != (i = u[(r = t.charAt(++c))])
                  ? (r = t.charAt(++c))
                  : (i = "e" === r ? " " : "0"),
                (o = n[r]) && (r = o(e, i)),
                a.push(r),
                (s = c + 1));
            return a.push(t.slice(s, c)), a.join("");
          };
        }
        function Ut(t, o) {
          return function (a) {
            var u,
              c,
              s = i(1900, void 0, 1);
            if (qt(s, t, (a += ""), 0) != a.length) return null;
            if ("Q" in s) return new Date(s.Q);
            if ("s" in s) return new Date(1e3 * s.s + ("L" in s ? s.L : 0));
            if (
              (o && !("Z" in s) && (s.Z = 0),
              "p" in s && (s.H = (s.H % 12) + 12 * s.p),
              void 0 === s.m && (s.m = "q" in s ? s.q : 0),
              "V" in s)
            ) {
              if (s.V < 1 || s.V > 53) return null;
              "w" in s || (s.w = 1),
                "Z" in s
                  ? ((c = (u = r(i(s.y, 0, 1))).getUTCDay()),
                    (u =
                      c > 4 || 0 === c ? n.utcMonday.ceil(u) : n.utcMonday(u)),
                    (u = n.utcDay.offset(u, 7 * (s.V - 1))),
                    (s.y = u.getUTCFullYear()),
                    (s.m = u.getUTCMonth()),
                    (s.d = u.getUTCDate() + ((s.w + 6) % 7)))
                  : ((c = (u = e(i(s.y, 0, 1))).getDay()),
                    (u =
                      c > 4 || 0 === c
                        ? n.timeMonday.ceil(u)
                        : n.timeMonday(u)),
                    (u = n.timeDay.offset(u, 7 * (s.V - 1))),
                    (s.y = u.getFullYear()),
                    (s.m = u.getMonth()),
                    (s.d = u.getDate() + ((s.w + 6) % 7)));
            } else ("W" in s || "U" in s) && ("w" in s || (s.w = "u" in s ? s.u % 7 : "W" in s ? 1 : 0), (c = "Z" in s ? r(i(s.y, 0, 1)).getUTCDay() : e(i(s.y, 0, 1)).getDay()), (s.m = 0), (s.d = "W" in s ? ((s.w + 6) % 7) + 7 * s.W - ((c + 5) % 7) : s.w + 7 * s.U - ((c + 6) % 7)));
            return "Z" in s
              ? ((s.H += (s.Z / 100) | 0), (s.M += s.Z % 100), r(s))
              : e(s);
          };
        }
        function qt(t, n, e, r) {
          for (var i, o, a = 0, c = n.length, s = e.length; a < c; ) {
            if (r >= s) return -1;
            if (37 === (i = n.charCodeAt(a++))) {
              if (
                ((i = n.charAt(a++)),
                !(o = Dt[i in u ? n.charAt(a++) : i]) || (r = o(t, e, r)) < 0)
              )
                return -1;
            } else if (i != e.charCodeAt(r++)) return -1;
          }
          return r;
        }
        function Vt(t, n, e) {
          var r = ht.exec(n.slice(e));
          return r ? ((t.p = jt.get(r[0].toLowerCase())), e + r[0].length) : -1;
        }
        function Ft(t, n, e) {
          var r = $t.exec(n.slice(e));
          return r ? ((t.w = St.get(r[0].toLowerCase())), e + r[0].length) : -1;
        }
        function Rt(t, n, e) {
          var r = kt.exec(n.slice(e));
          return r ? ((t.w = At.get(r[0].toLowerCase())), e + r[0].length) : -1;
        }
        function Lt(t, n, e) {
          var r = Ct.exec(n.slice(e));
          return r ? ((t.m = Et.get(r[0].toLowerCase())), e + r[0].length) : -1;
        }
        function Bt(t, n, e) {
          var r = Tt.exec(n.slice(e));
          return r ? ((t.m = Nt.get(r[0].toLowerCase())), e + r[0].length) : -1;
        }
        function Yt(t, n, e) {
          return qt(t, o, n, e);
        }
        function Pt(t, n, e) {
          return qt(t, a, n, e);
        }
        function Wt(t, n, e) {
          return qt(t, c, n, e);
        }
        function Ht(t) {
          return f[t.getDay()];
        }
        function Gt(t) {
          return l[t.getDay()];
        }
        function Zt(t) {
          return W[t.getMonth()];
        }
        function Xt(t) {
          return h[t.getMonth()];
        }
        function Jt(t) {
          return s[+(t.getHours() >= 12)];
        }
        function Qt(t) {
          return 1 + ~~(t.getMonth() / 3);
        }
        function Kt(t) {
          return f[t.getUTCDay()];
        }
        function tn(t) {
          return l[t.getUTCDay()];
        }
        function nn(t) {
          return W[t.getUTCMonth()];
        }
        function en(t) {
          return h[t.getUTCMonth()];
        }
        function rn(t) {
          return s[+(t.getUTCHours() >= 12)];
        }
        function on(t) {
          return 1 + ~~(t.getUTCMonth() / 3);
        }
        return (
          (It.x = Ot(a, It)),
          (It.X = Ot(c, It)),
          (It.c = Ot(o, It)),
          (zt.x = Ot(a, zt)),
          (zt.X = Ot(c, zt)),
          (zt.c = Ot(o, zt)),
          {
            format: function (t) {
              var n = Ot((t += ""), It);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
            parse: function (t) {
              var n = Ut((t += ""), !1);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
            utcFormat: function (t) {
              var n = Ot((t += ""), zt);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
            utcParse: function (t) {
              var n = Ut((t += ""), !0);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
          }
        );
      }
      var a,
        u = { "-": "", _: " ", 0: "0" },
        c = /^\s*\d+/,
        s = /^%/,
        l = /[\\^$*+?|[\]().{}]/g;
      function f(t, n, e) {
        var r = t < 0 ? "-" : "",
          i = (r ? -t : t) + "",
          o = i.length;
        return r + (o < e ? new Array(e - o + 1).join(n) + i : i);
      }
      function h(t) {
        return t.replace(l, "\\$&");
      }
      function d(t) {
        return new RegExp("^(?:" + t.map(h).join("|") + ")", "i");
      }
      function p(t) {
        return new Map(t.map((t, n) => [t.toLowerCase(), n]));
      }
      function g(t, n, e) {
        var r = c.exec(n.slice(e, e + 1));
        return r ? ((t.w = +r[0]), e + r[0].length) : -1;
      }
      function v(t, n, e) {
        var r = c.exec(n.slice(e, e + 1));
        return r ? ((t.u = +r[0]), e + r[0].length) : -1;
      }
      function y(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r ? ((t.U = +r[0]), e + r[0].length) : -1;
      }
      function m(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r ? ((t.V = +r[0]), e + r[0].length) : -1;
      }
      function b(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r ? ((t.W = +r[0]), e + r[0].length) : -1;
      }
      function _(t, n, e) {
        var r = c.exec(n.slice(e, e + 4));
        return r ? ((t.y = +r[0]), e + r[0].length) : -1;
      }
      function w(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r
          ? ((t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), e + r[0].length)
          : -1;
      }
      function x(t, n, e) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
        return r
          ? ((t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00"))), e + r[0].length)
          : -1;
      }
      function M(t, n, e) {
        var r = c.exec(n.slice(e, e + 1));
        return r ? ((t.q = 3 * r[0] - 3), e + r[0].length) : -1;
      }
      function j(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r ? ((t.m = r[0] - 1), e + r[0].length) : -1;
      }
      function k(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r ? ((t.d = +r[0]), e + r[0].length) : -1;
      }
      function A(t, n, e) {
        var r = c.exec(n.slice(e, e + 3));
        return r ? ((t.m = 0), (t.d = +r[0]), e + r[0].length) : -1;
      }
      function $(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r ? ((t.H = +r[0]), e + r[0].length) : -1;
      }
      function S(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r ? ((t.M = +r[0]), e + r[0].length) : -1;
      }
      function T(t, n, e) {
        var r = c.exec(n.slice(e, e + 2));
        return r ? ((t.S = +r[0]), e + r[0].length) : -1;
      }
      function N(t, n, e) {
        var r = c.exec(n.slice(e, e + 3));
        return r ? ((t.L = +r[0]), e + r[0].length) : -1;
      }
      function C(t, n, e) {
        var r = c.exec(n.slice(e, e + 6));
        return r ? ((t.L = Math.floor(r[0] / 1e3)), e + r[0].length) : -1;
      }
      function E(t, n, e) {
        var r = s.exec(n.slice(e, e + 1));
        return r ? e + r[0].length : -1;
      }
      function I(t, n, e) {
        var r = c.exec(n.slice(e));
        return r ? ((t.Q = +r[0]), e + r[0].length) : -1;
      }
      function z(t, n, e) {
        var r = c.exec(n.slice(e));
        return r ? ((t.s = +r[0]), e + r[0].length) : -1;
      }
      function D(t, n) {
        return f(t.getDate(), n, 2);
      }
      function O(t, n) {
        return f(t.getHours(), n, 2);
      }
      function U(t, n) {
        return f(t.getHours() % 12 || 12, n, 2);
      }
      function q(t, e) {
        return f(1 + n.timeDay.count(n.timeYear(t), t), e, 3);
      }
      function V(t, n) {
        return f(t.getMilliseconds(), n, 3);
      }
      function F(t, n) {
        return V(t, n) + "000";
      }
      function R(t, n) {
        return f(t.getMonth() + 1, n, 2);
      }
      function L(t, n) {
        return f(t.getMinutes(), n, 2);
      }
      function B(t, n) {
        return f(t.getSeconds(), n, 2);
      }
      function Y(t) {
        var n = t.getDay();
        return 0 === n ? 7 : n;
      }
      function P(t, e) {
        return f(n.timeSunday.count(n.timeYear(t) - 1, t), e, 2);
      }
      function W(t) {
        var e = t.getDay();
        return e >= 4 || 0 === e ? n.timeThursday(t) : n.timeThursday.ceil(t);
      }
      function H(t, e) {
        return (
          (t = W(t)),
          f(
            n.timeThursday.count(n.timeYear(t), t) +
              (4 === n.timeYear(t).getDay()),
            e,
            2
          )
        );
      }
      function G(t) {
        return t.getDay();
      }
      function Z(t, e) {
        return f(n.timeMonday.count(n.timeYear(t) - 1, t), e, 2);
      }
      function X(t, n) {
        return f(t.getFullYear() % 100, n, 2);
      }
      function J(t, n) {
        return f((t = W(t)).getFullYear() % 100, n, 2);
      }
      function Q(t, n) {
        return f(t.getFullYear() % 1e4, n, 4);
      }
      function K(t, e) {
        var r = t.getDay();
        return f(
          (t =
            r >= 4 || 0 === r
              ? n.timeThursday(t)
              : n.timeThursday.ceil(t)).getFullYear() % 1e4,
          e,
          4
        );
      }
      function tt(t) {
        var n = t.getTimezoneOffset();
        return (
          (n > 0 ? "-" : ((n *= -1), "+")) +
          f((n / 60) | 0, "0", 2) +
          f(n % 60, "0", 2)
        );
      }
      function nt(t, n) {
        return f(t.getUTCDate(), n, 2);
      }
      function et(t, n) {
        return f(t.getUTCHours(), n, 2);
      }
      function rt(t, n) {
        return f(t.getUTCHours() % 12 || 12, n, 2);
      }
      function it(t, e) {
        return f(1 + n.utcDay.count(n.utcYear(t), t), e, 3);
      }
      function ot(t, n) {
        return f(t.getUTCMilliseconds(), n, 3);
      }
      function at(t, n) {
        return ot(t, n) + "000";
      }
      function ut(t, n) {
        return f(t.getUTCMonth() + 1, n, 2);
      }
      function ct(t, n) {
        return f(t.getUTCMinutes(), n, 2);
      }
      function st(t, n) {
        return f(t.getUTCSeconds(), n, 2);
      }
      function lt(t) {
        var n = t.getUTCDay();
        return 0 === n ? 7 : n;
      }
      function ft(t, e) {
        return f(n.utcSunday.count(n.utcYear(t) - 1, t), e, 2);
      }
      function ht(t) {
        var e = t.getUTCDay();
        return e >= 4 || 0 === e ? n.utcThursday(t) : n.utcThursday.ceil(t);
      }
      function dt(t, e) {
        return (
          (t = ht(t)),
          f(
            n.utcThursday.count(n.utcYear(t), t) +
              (4 === n.utcYear(t).getUTCDay()),
            e,
            2
          )
        );
      }
      function pt(t) {
        return t.getUTCDay();
      }
      function gt(t, e) {
        return f(n.utcMonday.count(n.utcYear(t) - 1, t), e, 2);
      }
      function vt(t, n) {
        return f(t.getUTCFullYear() % 100, n, 2);
      }
      function yt(t, n) {
        return f((t = ht(t)).getUTCFullYear() % 100, n, 2);
      }
      function mt(t, n) {
        return f(t.getUTCFullYear() % 1e4, n, 4);
      }
      function bt(t, e) {
        var r = t.getUTCDay();
        return f(
          (t =
            r >= 4 || 0 === r
              ? n.utcThursday(t)
              : n.utcThursday.ceil(t)).getUTCFullYear() % 1e4,
          e,
          4
        );
      }
      function _t() {
        return "+0000";
      }
      function wt() {
        return "%";
      }
      function xt(t) {
        return +t;
      }
      function Mt(t) {
        return Math.floor(+t / 1e3);
      }
      function jt(n) {
        return (
          (a = o(n)),
          (t.timeFormat = a.format),
          (t.timeParse = a.parse),
          (t.utcFormat = a.utcFormat),
          (t.utcParse = a.utcParse),
          a
        );
      }
      jt({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        shortMonths: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      });
      var kt = "%Y-%m-%dT%H:%M:%S.%LZ";
      function At(t) {
        return t.toISOString();
      }
      var $t = Date.prototype.toISOString ? At : t.utcFormat(kt);
      function St(t) {
        var n = new Date(t);
        return isNaN(n) ? null : n;
      }
      var Tt = +new Date("2000-01-01T00:00:00.000Z") ? St : t.utcParse(kt);
      (t.isoFormat = $t),
        (t.isoParse = Tt),
        (t.timeFormatDefaultLocale = jt),
        (t.timeFormatLocale = o),
        Object.defineProperty(t, "__esModule", { value: !0 });
    })(n, dr);
  })(0, hr.exports);
  class Mr {
    constructor(t, n) {
      this.matrix = t;
      const e = (t) => t.isLeaf() || n.has(t.data.id),
        r = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
      for (const n of t.classes())
        for (const i of t.classes())
          if (e(n) && e(i)) {
            const e = t.frequency(n, i);
            (r[1] = Math.max(r[1], e)), e > 0 && (r[0] = Math.min(r[0], e));
          }
      this.scaleLin = zn().domain(r);
    }
    scale() {
      return this.scaleLin;
    }
    value(t, n) {
      return this.scaleLin(this.matrix.frequency(t, n));
    }
  }
  class jr {
    constructor(t) {
      this.matrix = t;
      const n = new Map();
      for (const e of t.classes()) n.set(e, zn().domain([0, t.totalRow(e)]));
      this.scaleMap = n;
    }
    scale() {
      return zn();
    }
    value(t, n) {
      return this.scaleMap.get(t)(this.matrix.frequency(t, n));
    }
  }
  class kr {
    constructor(t) {
      this.matrix = t;
      const n = new Map();
      for (const e of t.classes()) n.set(e, zn().domain([0, t.totalColumn(e)]));
      this.scaleMap = n;
    }
    scale() {
      return zn();
    }
    value(t, n) {
      return this.scaleMap.get(n)(this.matrix.frequency(t, n));
    }
  }
  function Ar(t, n) {
    const e = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    let r;
    for (r = e.length - 1; r > 0 && !(t >= e[r].value); r--);
    return (
      (t / e[r].value).toFixed(n).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      e[r].symbol
    );
  }
  class $r {
    constructor(t, n, e, r = 2) {
      (this.matrix = t), (this.desc = n), (this.fn = e), (this.digits = r);
    }
    name() {
      return this.desc;
    }
    value(t) {
      const n = this.fn(this.matrix, t),
        e = n.toFixed(this.digits);
      return [n, e];
    }
  }
  class Sr {
    constructor(t, n, e) {
      (this.matrix = t), (this.desc = n), (this.fn = e);
      const r = [1 / 0, -1 / 0];
      this.matrix.axis.preorder((n) => {
        const i = e(t, n);
        (r[0] = Math.min(r[0], i)), (r[1] = Math.max(r[1], i));
      }),
        (this.scale = zn().domain(r));
    }
    name() {
      return this.desc;
    }
    value(t) {
      const n = this.fn(this.matrix, t);
      return [this.scale(n), Ar(n, 0)];
    }
  }
  const Tr = [];
  function Nr(t, n = e) {
    let r;
    const i = [];
    function o(n) {
      if (u(t, n) && ((t = n), r)) {
        const n = !Tr.length;
        for (let n = 0; n < i.length; n += 1) {
          const e = i[n];
          e[1](), Tr.push(e, t);
        }
        if (n) {
          for (let t = 0; t < Tr.length; t += 2) Tr[t][0](Tr[t + 1]);
          Tr.length = 0;
        }
      }
    }
    return {
      set: o,
      update: function (n) {
        o(n(t));
      },
      subscribe: function (a, u = e) {
        const c = [a, u];
        return (
          i.push(c),
          1 === i.length && (r = n(o) || e),
          a(t),
          () => {
            const t = i.indexOf(c);
            -1 !== t && i.splice(t, 1), 0 === i.length && (r(), (r = null));
          }
        );
      },
    };
  }
  const Cr = Nr(null),
    Er = Nr(null);
  function Ir(t) {
    let n, r, i;
    return {
      c() {
        (n = b("rect")),
          j(n, "x", t[0]),
          j(n, "y", t[1]),
          j(n, "width", t[2]),
          j(n, "height", t[2]),
          j(n, "fill", "white"),
          j(n, "stroke", "none"),
          j(n, "opacity", "0.0");
      },
      m(e, o) {
        g(e, n, o),
          r ||
            ((i = [M(n, "mouseout", t[4]), M(n, "mouseover", t[3])]), (r = !0));
      },
      p(t, [e]) {
        1 & e && j(n, "x", t[0]),
          2 & e && j(n, "y", t[1]),
          4 & e && j(n, "width", t[2]),
          4 & e && j(n, "height", t[2]);
      },
      i: e,
      o: e,
      d(t) {
        t && v(n), (r = !1), o(i);
      },
    };
  }
  function zr(t, n, e) {
    let r;
    c(t, Cr, (t) => e(7, (r = t)));
    let { x: i = 0 } = n,
      { y: o = 0 } = n,
      { actual: a = null } = n,
      { predict: u = null } = n,
      { cellSize: s = 10 } = n;
    return (
      (t.$$set = (t) => {
        "x" in t && e(0, (i = t.x)),
          "y" in t && e(1, (o = t.y)),
          "actual" in t && e(5, (a = t.actual)),
          "predict" in t && e(6, (u = t.predict)),
          "cellSize" in t && e(2, (s = t.cellSize));
      }),
      [
        i,
        o,
        s,
        function () {
          l(Cr, (r = [a, u]), r);
        },
        function () {
          l(Cr, (r = null), r);
        },
        a,
        u,
      ]
    );
  }
  class Dr extends J {
    constructor(t) {
      super(),
        X(this, t, zr, Ir, u, {
          x: 0,
          y: 1,
          actual: 5,
          predict: 6,
          cellSize: 2,
        });
    }
  }
  function Or(t, n, e) {
    return (t.fields = n || []), (t.fname = e), t;
  }
  function Ur(t) {
    return null == t ? null : t.fields;
  }
  function qr(t) {
    return 1 === t.length ? Vr(t[0]) : Fr(t);
  }
  const Vr = (t) =>
      function (n) {
        return n[t];
      },
    Fr = (t) => {
      const n = t.length;
      return function (e) {
        for (let r = 0; r < n; ++r) e = e[t[r]];
        return e;
      };
    };
  function Rr(t) {
    throw Error(t);
  }
  function Lr(t) {
    const n = [],
      e = t.length;
    let r,
      i,
      o,
      a = null,
      u = 0,
      c = "";
    function s() {
      n.push(c + t.substring(r, i)), (c = ""), (r = i + 1);
    }
    for (t += "", r = i = 0; i < e; ++i)
      if (((o = t[i]), "\\" === o))
        (c += t.substring(r, i)), (c += t.substring(++i, ++i)), (r = i);
      else if (o === a) s(), (a = null), (u = -1);
      else {
        if (a) continue;
        (r === u && '"' === o) || (r === u && "'" === o)
          ? ((r = i + 1), (a = o))
          : "." !== o || u
          ? "[" === o
            ? (i > r && s(), (u = r = i + 1))
            : "]" === o &&
              (u || Rr("Access path missing open bracket: " + t),
              u > 0 && s(),
              (u = 0),
              (r = i + 1))
          : i > r
          ? s()
          : (r = i + 1);
      }
    return (
      u && Rr("Access path missing closing bracket: " + t),
      a && Rr("Access path missing closing quote: " + t),
      i > r && (i++, s()),
      n
    );
  }
  function Br(t, n, e) {
    const r = Lr(t);
    return (
      (t = 1 === r.length ? r[0] : t), Or(((e && e.get) || qr)(r), [t], n || t)
    );
  }
  const Yr = Br("id"),
    Pr = Or((t) => t, [], "identity"),
    Wr = Or(() => 0, [], "zero"),
    Hr = Or(() => 1, [], "one"),
    Gr = Or(() => !0, [], "true"),
    Zr = Or(() => !1, [], "false");
  function Xr(t, n, e) {
    const r = [n].concat([].slice.call(e));
    console[t].apply(console, r);
  }
  var Jr = Array.isArray;
  function Qr(t) {
    return t === Object(t);
  }
  const Kr = (t) => "__proto__" !== t;
  function ti(t, n, e, r) {
    if (!Kr(n)) return;
    let i, o;
    if (Qr(e) && !Jr(e))
      for (i in ((o = Qr(t[n]) ? t[n] : (t[n] = {})), e))
        r && (!0 === r || r[i]) ? ti(o, i, e[i]) : Kr(i) && (o[i] = e[i]);
    else t[n] = e;
  }
  function ni(t, n) {
    if (null == t) return n;
    const e = {},
      r = [];
    function i(t) {
      e[t.name] || ((e[t.name] = 1), r.push(t));
    }
    return n.forEach(i), t.forEach(i), r;
  }
  function ei(t) {
    return t[t.length - 1];
  }
  function ri(t) {
    return null == t || "" === t ? null : +t;
  }
  const ii = (t) => (n) => t * Math.exp(n),
    oi = (t) => (n) => Math.log(t * n),
    ai = (t) => (n) => Math.sign(n) * Math.log1p(Math.abs(n / t)),
    ui = (t) => (n) => Math.sign(n) * Math.expm1(Math.abs(n)) * t,
    ci = (t) => (n) => n < 0 ? -Math.pow(-n, t) : Math.pow(n, t);
  function si(t, n, e, r) {
    const i = e(t[0]),
      o = e(ei(t)),
      a = (o - i) * n;
    return [r(i - a), r(o - a)];
  }
  function li(t, n, e, r, i) {
    const o = r(t[0]),
      a = r(ei(t)),
      u = null != n ? r(n) : (o + a) / 2;
    return [i(u + (o - u) * e), i(u + (a - u) * e)];
  }
  function fi(t) {
    return null != t ? (Jr(t) ? t : [t]) : [];
  }
  function hi(t) {
    return "function" == typeof t;
  }
  const di = (t, n) =>
      (t < n || null == t) && null != n
        ? -1
        : (t > n || null == n) && null != t
        ? 1
        : ((n = n instanceof Date ? +n : n),
          (t = t instanceof Date ? +t : t) !== t && n == n
            ? -1
            : n != n && t == t
            ? 1
            : 0),
    pi = (t, n) => (1 === t.length ? gi(t[0], n[0]) : vi(t, n, t.length)),
    gi = (t, n) =>
      function (e, r) {
        return di(t(e), t(r)) * n;
      },
    vi = (t, n, e) => (
      n.push(0),
      function (r, i) {
        let o,
          a = 0,
          u = -1;
        for (; 0 === a && ++u < e; ) (o = t[u]), (a = di(o(r), o(i)));
        return a * n[u];
      }
    );
  function yi(t) {
    for (let n, e, r = 1, i = arguments.length; r < i; ++r)
      for (e in ((n = arguments[r]), n)) t[e] = n[e];
    return t;
  }
  const mi = Object.prototype.hasOwnProperty;
  function bi(t, n) {
    return mi.call(t, n);
  }
  const _i = {};
  function wi(t) {
    return "[object Date]" === Object.prototype.toString.call(t);
  }
  function xi(t) {
    return "number" == typeof t;
  }
  function Mi(t) {
    return "string" == typeof t;
  }
  function ji(t, n) {
    let e = "";
    for (; --n >= 0; ) e += t;
    return e;
  }
  const ki = (t) => (xi(t) || wi(t) ? t : Date.parse(t));
  function Ai(t) {
    const n = {},
      e = t.length;
    for (let r = 0; r < e; ++r) n[t[r]] = !0;
    return n;
  }
  var $i = { exports: {} },
    Si = tt(
      Object.freeze({
        __proto__: null,
        Debug: 4,
        Error: 1,
        Info: 3,
        None: 0,
        Warn: 2,
        accessor: Or,
        accessorFields: Ur,
        accessorName: function (t) {
          return null == t ? null : t.fname;
        },
        array: fi,
        ascending: di,
        clampRange: function (t, n, e) {
          let r,
            i = t[0],
            o = t[1];
          return (
            o < i && ((r = o), (o = i), (i = r)),
            (r = o - i),
            r >= e - n ? [n, e] : [(i = Math.min(Math.max(i, n), e - r)), i + r]
          );
        },
        compare: function (t, n, e) {
          (e = e || {}), (n = fi(n) || []);
          const r = [],
            i = [],
            o = {},
            a = e.comparator || pi;
          return (
            fi(t).forEach((t, a) => {
              null != t &&
                (r.push("descending" === n[a] ? -1 : 1),
                i.push((t = hi(t) ? t : Br(t, null, e))),
                (Ur(t) || []).forEach((t) => (o[t] = 1)));
            }),
            0 === i.length ? null : Or(a(i, r), Object.keys(o))
          );
        },
        constant: function (t) {
          return hi(t) ? t : () => t;
        },
        debounce: function (t, n) {
          let e;
          return (r) => {
            e && clearTimeout(e), (e = setTimeout(() => (n(r), (e = null)), t));
          };
        },
        error: Rr,
        extend: yi,
        extent: function (t, n) {
          let e,
            r,
            i,
            o,
            a = 0;
          if (t && (e = t.length))
            if (null == n) {
              for (r = t[a]; a < e && (null == r || r != r); r = t[++a]);
              for (i = o = r; a < e; ++a)
                (r = t[a]), null != r && (r < i && (i = r), r > o && (o = r));
            } else {
              for (r = n(t[a]); a < e && (null == r || r != r); r = n(t[++a]));
              for (i = o = r; a < e; ++a)
                (r = n(t[a])),
                  null != r && (r < i && (i = r), r > o && (o = r));
            }
          return [i, o];
        },
        extentIndex: function (t, n) {
          const e = t.length;
          let r,
            i,
            o,
            a,
            u,
            c = -1;
          if (null == n) {
            for (; ++c < e; )
              if (((i = t[c]), null != i && i >= i)) {
                r = o = i;
                break;
              }
            if (c === e) return [-1, -1];
            for (a = u = c; ++c < e; )
              (i = t[c]),
                null != i &&
                  (r > i && ((r = i), (a = c)), o < i && ((o = i), (u = c)));
          } else {
            for (; ++c < e; )
              if (((i = n(t[c], c, t)), null != i && i >= i)) {
                r = o = i;
                break;
              }
            if (c === e) return [-1, -1];
            for (a = u = c; ++c < e; )
              (i = n(t[c], c, t)),
                null != i &&
                  (r > i && ((r = i), (a = c)), o < i && ((o = i), (u = c)));
          }
          return [a, u];
        },
        falsy: Zr,
        fastmap: function (t) {
          let n,
            e = {};
          function r(t) {
            return bi(e, t) && e[t] !== _i;
          }
          const i = {
            size: 0,
            empty: 0,
            object: e,
            has: r,
            get: (t) => (r(t) ? e[t] : void 0),
            set(t, n) {
              return (
                r(t) || (++i.size, e[t] === _i && --i.empty), (e[t] = n), this
              );
            },
            delete(t) {
              return r(t) && (--i.size, ++i.empty, (e[t] = _i)), this;
            },
            clear() {
              (i.size = i.empty = 0), (i.object = e = {});
            },
            test(t) {
              return arguments.length ? ((n = t), i) : n;
            },
            clean() {
              const t = {};
              let r = 0;
              for (const i in e) {
                const o = e[i];
                o === _i || (n && n(o)) || ((t[i] = o), ++r);
              }
              (i.size = r), (i.empty = 0), (i.object = e = t);
            },
          };
          return (
            t &&
              Object.keys(t).forEach((n) => {
                i.set(n, t[n]);
              }),
            i
          );
        },
        field: Br,
        flush: function (t, n, e, r, i, o) {
          if (!e && 0 !== e) return o;
          const a = +e;
          let u,
            c = t[0],
            s = ei(t);
          s < c && ((u = c), (c = s), (s = u)), (u = Math.abs(n - c));
          const l = Math.abs(s - n);
          return u < l && u <= a ? r : l <= a ? i : o;
        },
        hasOwnProperty: bi,
        id: Yr,
        identity: Pr,
        inherits: function (t, n, e) {
          const r = (t.prototype = Object.create(n.prototype));
          return (
            Object.defineProperty(r, "constructor", {
              value: t,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            }),
            yi(r, e)
          );
        },
        inrange: function (t, n, e, r) {
          let i,
            o = n[0],
            a = n[n.length - 1];
          return (
            o > a && ((i = o), (o = a), (a = i)),
            (r = void 0 === r || r),
            ((e = void 0 === e || e) ? o <= t : o < t) && (r ? t <= a : t < a)
          );
        },
        isArray: Jr,
        isBoolean: function (t) {
          return "boolean" == typeof t;
        },
        isDate: wi,
        isFunction: hi,
        isIterable: function (t) {
          return t && hi(t[Symbol.iterator]);
        },
        isNumber: xi,
        isObject: Qr,
        isRegExp: function (t) {
          return "[object RegExp]" === Object.prototype.toString.call(t);
        },
        isString: Mi,
        key: function (t, n, e) {
          t && (t = n ? fi(t).map((t) => t.replace(/\\(.)/g, "$1")) : fi(t));
          const r = t && t.length,
            i = (e && e.get) || qr,
            o = (t) => i(n ? [t] : Lr(t));
          let a;
          if (r)
            if (1 === r) {
              const n = o(t[0]);
              a = function (t) {
                return "" + n(t);
              };
            } else {
              const n = t.map(o);
              a = function (t) {
                let e = "" + n[0](t),
                  i = 0;
                for (; ++i < r; ) e += "|" + n[i](t);
                return e;
              };
            }
          else
            a = function () {
              return "";
            };
          return Or(a, t, "key");
        },
        lerp: function (t, n) {
          const e = t[0],
            r = ei(t),
            i = +n;
          return i ? (1 === i ? r : e + i * (r - e)) : e;
        },
        logger: function (t, n) {
          let e = t || 0;
          return {
            level(t) {
              return arguments.length ? ((e = +t), this) : e;
            },
            error() {
              return e >= 1 && Xr(n || "error", "ERROR", arguments), this;
            },
            warn() {
              return e >= 2 && Xr(n || "warn", "WARN", arguments), this;
            },
            info() {
              return e >= 3 && Xr(n || "log", "INFO", arguments), this;
            },
            debug() {
              return e >= 4 && Xr(n || "log", "DEBUG", arguments), this;
            },
          };
        },
        lruCache: function (t) {
          let n, e, r;
          t = +t || 1e4;
          const i = () => {
              (n = {}), (e = {}), (r = 0);
            },
            o = (i, o) => (++r > t && ((e = n), (n = {}), (r = 1)), (n[i] = o));
          return (
            i(),
            {
              clear: i,
              has: (t) => bi(n, t) || bi(e, t),
              get: (t) => (bi(n, t) ? n[t] : bi(e, t) ? o(t, e[t]) : void 0),
              set: (t, e) => (bi(n, t) ? (n[t] = e) : o(t, e)),
            }
          );
        },
        merge: function (t, n, e, r) {
          const i = n.length,
            o = e.length;
          if (!o) return n;
          if (!i) return e;
          const a = r || new n.constructor(i + o);
          let u = 0,
            c = 0,
            s = 0;
          for (; u < i && c < o; ++s)
            a[s] = t(n[u], e[c]) > 0 ? e[c++] : n[u++];
          for (; u < i; ++u, ++s) a[s] = n[u];
          for (; c < o; ++c, ++s) a[s] = e[c];
          return a;
        },
        mergeConfig: function (...t) {
          return t.reduce((t, n) => {
            for (const e in n)
              if ("signals" === e) t.signals = ni(t.signals, n.signals);
              else {
                const r =
                  "legend" === e ? { layout: 1 } : "style" === e || null;
                ti(t, e, n[e], r);
              }
            return t;
          }, {});
        },
        one: Hr,
        pad: function (t, n, e, r) {
          const i = e || " ",
            o = t + "",
            a = n - o.length;
          return a <= 0
            ? o
            : "left" === r
            ? ji(i, a) + o
            : "center" === r
            ? ji(i, ~~(a / 2)) + o + ji(i, Math.ceil(a / 2))
            : o + ji(i, a);
        },
        panLinear: function (t, n) {
          return si(t, n, ri, Pr);
        },
        panLog: function (t, n) {
          var e = Math.sign(t[0]);
          return si(t, n, oi(e), ii(e));
        },
        panPow: function (t, n, e) {
          return si(t, n, ci(e), ci(1 / e));
        },
        panSymlog: function (t, n, e) {
          return si(t, n, ai(e), ui(e));
        },
        peek: ei,
        quarter: function (t) {
          return 1 + ~~(new Date(t).getMonth() / 3);
        },
        repeat: ji,
        span: function (t) {
          return (t && ei(t) - t[0]) || 0;
        },
        splitAccessPath: Lr,
        stringValue: function t(n) {
          return Jr(n)
            ? "[" + n.map(t) + "]"
            : Qr(n) || Mi(n)
            ? JSON.stringify(n)
                .replace("\u2028", "\\u2028")
                .replace("\u2029", "\\u2029")
            : n;
        },
        toBoolean: function (t) {
          return null == t || "" === t
            ? null
            : !(!t || "false" === t || "0" === t) && !!t;
        },
        toDate: function (t, n) {
          return (n = n || ki), null == t || "" === t ? null : n(t);
        },
        toNumber: ri,
        toSet: Ai,
        toString: function (t) {
          return null == t || "" === t ? null : t + "";
        },
        truncate: function (t, n, e, r) {
          const i = null != r ? r : "…",
            o = t + "",
            a = o.length,
            u = Math.max(0, n - i.length);
          return a <= n
            ? o
            : "left" === e
            ? i + o.slice(a - u)
            : "center" === e
            ? o.slice(0, Math.ceil(u / 2)) + i + o.slice(a - ~~(u / 2))
            : o.slice(0, u) + i;
        },
        truthy: Gr,
        utcquarter: function (t) {
          return 1 + ~~(new Date(t).getUTCMonth() / 3);
        },
        visitArray: function (t, n, e) {
          if (t)
            if (n) {
              const r = t.length;
              for (let i = 0; i < r; ++i) {
                const r = n(t[i]);
                r && e(r, i, t);
              }
            } else t.forEach(e);
        },
        writeConfig: ti,
        zero: Wr,
        zoomLinear: function (t, n, e) {
          return li(t, n, e, ri, Pr);
        },
        zoomLog: function (t, n, e) {
          const r = Math.sign(t[0]);
          return li(t, n, e, oi(r), ii(r));
        },
        zoomPow: function (t, n, e, r) {
          return li(t, n, e, ci(r), ci(1 / r));
        },
        zoomSymlog: function (t, n, e, r) {
          return li(t, n, e, ai(r), ui(r));
        },
      })
    ),
    Ti = tt(dn);
  !(function (t, n) {
    !(function (t, n, e, r) {
      const i = "year",
        o = "quarter",
        a = "month",
        u = "week",
        c = "date",
        s = "day",
        l = "dayofyear",
        f = "hours",
        h = "minutes",
        d = "seconds",
        p = "milliseconds",
        g = [i, o, a, u, c, s, l, f, h, d, p],
        v = g.reduce((t, n, e) => ((t[n] = 1 + e), t), {});
      function y(t) {
        const e = n.array(t).slice(),
          r = {};
        return (
          e.length || n.error("Missing time unit."),
          e.forEach((t) => {
            n.hasOwnProperty(v, t)
              ? (r[t] = 1)
              : n.error(`Invalid time unit: ${t}.`);
          }),
          (r[u] || r[s] ? 1 : 0) +
            (r[o] || r[a] || r[c] ? 1 : 0) +
            (r[l] ? 1 : 0) >
            1 && n.error(`Incompatible time units: ${t}`),
          e.sort((t, n) => v[t] - v[n]),
          e
        );
      }
      const m = {
        [i]: "%Y ",
        [o]: "Q%q ",
        [a]: "%b ",
        [c]: "%d ",
        [u]: "W%U ",
        [s]: "%a ",
        [l]: "%j ",
        [f]: "%H:00",
        [h]: "00:%M",
        [d]: ":%S",
        [p]: ".%L",
        [`${i}-${a}`]: "%Y-%m ",
        [`${i}-${a}-${c}`]: "%Y-%m-%d ",
        [`${f}-${h}`]: "%H:%M",
      };
      function b(t, e) {
        const r = n.extend({}, m, e),
          i = y(t),
          o = i.length;
        let a,
          u,
          c = "",
          s = 0;
        for (s = 0; s < o; )
          for (a = i.length; a > s; --a)
            if (((u = i.slice(s, a).join("-")), null != r[u])) {
              (c += r[u]), (s = a);
              break;
            }
        return c.trim();
      }
      const _ = new Date();
      function w(t) {
        return (
          _.setFullYear(t),
          _.setMonth(0),
          _.setDate(1),
          _.setHours(0, 0, 0, 0),
          _
        );
      }
      function x(t) {
        return j(new Date(t));
      }
      function M(t) {
        return k(new Date(t));
      }
      function j(t) {
        return e.timeDay.count(w(t.getFullYear()) - 1, t);
      }
      function k(t) {
        return e.timeWeek.count(w(t.getFullYear()) - 1, t);
      }
      function A(t) {
        return w(t).getDay();
      }
      function $(t, n, e, r, i, o, a) {
        if (0 <= t && t < 100) {
          const u = new Date(-1, n, e, r, i, o, a);
          return u.setFullYear(t), u;
        }
        return new Date(t, n, e, r, i, o, a);
      }
      function S(t) {
        return N(new Date(t));
      }
      function T(t) {
        return C(new Date(t));
      }
      function N(t) {
        const n = Date.UTC(t.getUTCFullYear(), 0, 1);
        return e.utcDay.count(n - 1, t);
      }
      function C(t) {
        const n = Date.UTC(t.getUTCFullYear(), 0, 1);
        return e.utcWeek.count(n - 1, t);
      }
      function E(t) {
        return _.setTime(Date.UTC(t, 0, 1)), _.getUTCDay();
      }
      function I(t, n, e, r, i, o, a) {
        if (0 <= t && t < 100) {
          const t = new Date(Date.UTC(-1, n, e, r, i, o, a));
          return t.setUTCFullYear(e.y), t;
        }
        return new Date(Date.UTC(t, n, e, r, i, o, a));
      }
      function z(t, e, r, g, v) {
        const y = e || 1,
          m = n.peek(t),
          b = (t, n, e) => D(r[(e = e || t)], g[e], t === m && y, n),
          _ = new Date(),
          w = n.toSet(t),
          x = w[i] ? b(i) : n.constant(2012),
          M = w[a] ? b(a) : w[o] ? b(o) : n.zero,
          j =
            w[u] && w[s]
              ? b(s, 1, u + s)
              : w[u]
              ? b(u, 1)
              : w[s]
              ? b(s, 1)
              : w[c]
              ? b(c, 1)
              : w[l]
              ? b(l, 1)
              : n.one,
          k = w[f] ? b(f) : n.zero,
          A = w[h] ? b(h) : n.zero,
          $ = w[d] ? b(d) : n.zero,
          S = w[p] ? b(p) : n.zero;
        return function (t) {
          _.setTime(+t);
          const n = x(_);
          return v(n, M(_), j(_, n), k(_), A(_), $(_), S(_));
        };
      }
      function D(t, n, e, r) {
        const i =
          e <= 1
            ? t
            : r
            ? (n, i) => r + e * Math.floor((t(n, i) - r) / e)
            : (n, r) => e * Math.floor(t(n, r) / e);
        return n ? (t, e) => n(i(t, e), e) : i;
      }
      function O(t, n, e) {
        return n + 7 * t - ((e + 6) % 7);
      }
      const U = {
          [i]: (t) => t.getFullYear(),
          [o]: (t) => Math.floor(t.getMonth() / 3),
          [a]: (t) => t.getMonth(),
          [c]: (t) => t.getDate(),
          [f]: (t) => t.getHours(),
          [h]: (t) => t.getMinutes(),
          [d]: (t) => t.getSeconds(),
          [p]: (t) => t.getMilliseconds(),
          [l]: (t) => j(t),
          [u]: (t) => k(t),
          [u + s]: (t, n) => O(k(t), t.getDay(), A(n)),
          [s]: (t, n) => O(1, t.getDay(), A(n)),
        },
        q = { [o]: (t) => 3 * t, [u]: (t, n) => O(t, 0, A(n)) };
      function V(t, n) {
        return z(t, n || 1, U, q, $);
      }
      const F = {
          [i]: (t) => t.getUTCFullYear(),
          [o]: (t) => Math.floor(t.getUTCMonth() / 3),
          [a]: (t) => t.getUTCMonth(),
          [c]: (t) => t.getUTCDate(),
          [f]: (t) => t.getUTCHours(),
          [h]: (t) => t.getUTCMinutes(),
          [d]: (t) => t.getUTCSeconds(),
          [p]: (t) => t.getUTCMilliseconds(),
          [l]: (t) => N(t),
          [u]: (t) => C(t),
          [s]: (t, n) => O(1, t.getUTCDay(), E(n)),
          [u + s]: (t, n) => O(C(t), t.getUTCDay(), E(n)),
        },
        R = { [o]: (t) => 3 * t, [u]: (t, n) => O(t, 0, E(n)) };
      function L(t, n) {
        return z(t, n || 1, F, R, I);
      }
      const B = {
          [i]: e.timeYear,
          [o]: e.timeMonth.every(3),
          [a]: e.timeMonth,
          [u]: e.timeWeek,
          [c]: e.timeDay,
          [s]: e.timeDay,
          [l]: e.timeDay,
          [f]: e.timeHour,
          [h]: e.timeMinute,
          [d]: e.timeSecond,
          [p]: e.timeMillisecond,
        },
        Y = {
          [i]: e.utcYear,
          [o]: e.utcMonth.every(3),
          [a]: e.utcMonth,
          [u]: e.utcWeek,
          [c]: e.utcDay,
          [s]: e.utcDay,
          [l]: e.utcDay,
          [f]: e.utcHour,
          [h]: e.utcMinute,
          [d]: e.utcSecond,
          [p]: e.utcMillisecond,
        };
      function P(t) {
        return B[t];
      }
      function W(t) {
        return Y[t];
      }
      function H(t, n, e) {
        return t ? t.offset(n, e) : void 0;
      }
      function G(t, n, e) {
        return H(P(t), n, e);
      }
      function Z(t, n, e) {
        return H(W(t), n, e);
      }
      function X(t, n, e, r) {
        return t ? t.range(n, e, r) : void 0;
      }
      function J(t, n, e, r) {
        return X(P(t), n, e, r);
      }
      function Q(t, n, e, r) {
        return X(W(t), n, e, r);
      }
      const K = 1e3,
        tt = 60 * K,
        nt = 60 * tt,
        et = 24 * nt,
        rt = 7 * et,
        it = 30 * et,
        ot = 365 * et,
        at = [i, a, c, f, h, d, p],
        ut = at.slice(0, -1),
        ct = ut.slice(0, -1),
        st = ct.slice(0, -1),
        lt = st.slice(0, -1),
        ft = [i, a],
        ht = [i],
        dt = [
          [ut, 1, K],
          [ut, 5, 5 * K],
          [ut, 15, 15 * K],
          [ut, 30, 30 * K],
          [ct, 1, tt],
          [ct, 5, 5 * tt],
          [ct, 15, 15 * tt],
          [ct, 30, 30 * tt],
          [st, 1, nt],
          [st, 3, 3 * nt],
          [st, 6, 6 * nt],
          [st, 12, 12 * nt],
          [lt, 1, et],
          [[i, u], 1, rt],
          [ft, 1, it],
          [ft, 3, 3 * it],
          [ht, 1, ot],
        ];
      function pt(t) {
        const e = t.extent,
          i = t.maxbins || 40,
          o = Math.abs(n.span(e)) / i;
        let a,
          u,
          c = r.bisector((t) => t[2]).right(dt, o);
        return (
          c === dt.length
            ? ((a = ht), (u = r.tickStep(e[0] / ot, e[1] / ot, i)))
            : c
            ? ((c = dt[o / dt[c - 1][2] < dt[c][2] / o ? c - 1 : c]),
              (a = c[0]),
              (u = c[1]))
            : ((a = at), (u = Math.max(r.tickStep(e[0], e[1], i), 1))),
          { units: a, step: u }
        );
      }
      (t.DATE = c),
        (t.DAY = s),
        (t.DAYOFYEAR = l),
        (t.HOURS = f),
        (t.MILLISECONDS = p),
        (t.MINUTES = h),
        (t.MONTH = a),
        (t.QUARTER = o),
        (t.SECONDS = d),
        (t.TIME_UNITS = g),
        (t.WEEK = u),
        (t.YEAR = i),
        (t.dayofyear = x),
        (t.timeBin = pt),
        (t.timeFloor = V),
        (t.timeInterval = P),
        (t.timeOffset = G),
        (t.timeSequence = J),
        (t.timeUnitSpecifier = b),
        (t.timeUnits = y),
        (t.utcFloor = L),
        (t.utcInterval = W),
        (t.utcOffset = Z),
        (t.utcSequence = Q),
        (t.utcdayofyear = S),
        (t.utcweek = T),
        (t.week = M),
        Object.defineProperty(t, "__esModule", { value: !0 });
    })(n, Si, dr, Ti);
  })(0, $i.exports);
  const Ni = "linear",
    Ci = "log",
    Ei = "pow",
    Ii = "sqrt",
    zi = "symlog",
    Di = "sequential",
    Oi = "diverging",
    Ui = "quantile",
    qi = "continuous",
    Vi = "discrete",
    Fi = "discretizing",
    Ri = "interpolating",
    Li = "temporal";
  function Bi() {
    const t = yn().unknown(void 0),
      n = t.domain,
      e = t.range;
    let r,
      i,
      o = [0, 1],
      a = !1,
      u = 0,
      c = 0,
      s = 0.5;
    function l() {
      const t = n().length,
        l = o[1] < o[0],
        f = o[1 - l],
        h = (function (t, n, e) {
          const r = t - n + 2 * e;
          return t ? (r > 0 ? r : 1) : 0;
        })(t, u, c);
      let d = o[l - 0];
      (r = (f - d) / (h || 1)),
        a && (r = Math.floor(r)),
        (d += (f - d - r * (t - u)) * s),
        (i = r * (1 - u)),
        a && ((d = Math.round(d)), (i = Math.round(i)));
      const p = rn(t).map((t) => d + r * t);
      return e(l ? p.reverse() : p);
    }
    return (
      delete t.unknown,
      (t.domain = function (t) {
        return arguments.length ? (n(t), l()) : n();
      }),
      (t.range = function (t) {
        return arguments.length ? ((o = [+t[0], +t[1]]), l()) : o.slice();
      }),
      (t.rangeRound = function (t) {
        return (o = [+t[0], +t[1]]), (a = !0), l();
      }),
      (t.bandwidth = function () {
        return i;
      }),
      (t.step = function () {
        return r;
      }),
      (t.round = function (t) {
        return arguments.length ? ((a = !!t), l()) : a;
      }),
      (t.padding = function (t) {
        return arguments.length
          ? ((c = Math.max(0, Math.min(1, t))), (u = c), l())
          : u;
      }),
      (t.paddingInner = function (t) {
        return arguments.length ? ((u = Math.max(0, Math.min(1, t))), l()) : u;
      }),
      (t.paddingOuter = function (t) {
        return arguments.length ? ((c = Math.max(0, Math.min(1, t))), l()) : c;
      }),
      (t.align = function (t) {
        return arguments.length ? ((s = Math.max(0, Math.min(1, t))), l()) : s;
      }),
      (t.invertRange = function (t) {
        if (null == t[0] || null == t[1]) return;
        const r = o[1] < o[0],
          a = r ? e().reverse() : e(),
          u = a.length - 1;
        let c,
          s,
          l,
          f = +t[0],
          h = +t[1];
        return f != f ||
          h != h ||
          (h < f && ((l = f), (f = h), (h = l)), h < a[0] || f > o[1 - r])
          ? void 0
          : ((c = Math.max(0, mt(a, f) - 1)),
            (s = f === h ? c : mt(a, h) - 1),
            f - a[c] > i + 1e-10 && ++c,
            r && ((l = c), (c = u - s), (s = u - l)),
            c > s ? void 0 : n().slice(c, s + 1));
      }),
      (t.invert = function (n) {
        const e = t.invertRange([n, n]);
        return e ? e[0] : e;
      }),
      (t.copy = function () {
        return Bi()
          .domain(n())
          .range(o)
          .round(a)
          .paddingInner(u)
          .paddingOuter(c)
          .align(s);
      }),
      l()
    );
  }
  function Yi(t) {
    const n = t.copy;
    return (
      (t.padding = t.paddingOuter),
      delete t.paddingInner,
      (t.copy = function () {
        return Yi(n());
      }),
      t
    );
  }
  var Pi = Array.prototype.map;
  function Wi(t) {
    return Pi.call(t, ri);
  }
  const Hi = Array.prototype.slice;
  const Gi = {};
  function Zi(t, n, e) {
    const r = function () {
      const e = n();
      return (
        e.invertRange ||
          (e.invertRange = e.invert
            ? (function (t) {
                return function (n) {
                  let e,
                    r = n[0],
                    i = n[1];
                  return (
                    i < r && ((e = r), (r = i), (i = e)),
                    [t.invert(r), t.invert(i)]
                  );
                };
              })(e)
            : e.invertExtent
            ? (function (t) {
                return function (n) {
                  const e = t.range();
                  let r,
                    i,
                    o,
                    a,
                    u = n[0],
                    c = n[1],
                    s = -1;
                  for (
                    c < u && ((i = u), (u = c), (c = i)), o = 0, a = e.length;
                    o < a;
                    ++o
                  )
                    e[o] >= u && e[o] <= c && (s < 0 && (s = o), (r = o));
                  if (!(s < 0))
                    return (
                      (u = t.invertExtent(e[s])),
                      (c = t.invertExtent(e[r])),
                      [
                        void 0 === u[0] ? u[1] : u[0],
                        void 0 === c[1] ? c[0] : c[1],
                      ]
                    );
                };
              })(e)
            : void 0),
        (e.type = t),
        e
      );
    };
    return (r.metadata = Ai(fi(e))), r;
  }
  function Xi(t, n, e) {
    return arguments.length > 1
      ? ((Gi[t] = Zi(t, n, e)), this)
      : Ji(t)
      ? Gi[t]
      : void 0;
  }
  function Ji(t) {
    return bi(Gi, t);
  }
  function Qi(t, n, e) {
    return mn.exports.piecewise(
      (function (t, n) {
        const e =
          wn[
            (function (t) {
              return (
                "interpolate" +
                t
                  .toLowerCase()
                  .split("-")
                  .map((t) => t[0].toUpperCase() + t.slice(1))
                  .join("")
              );
            })(t)
          ];
        return null != n && e && e.gamma ? e.gamma(n) : e;
      })(n || "rgb", e),
      t
    );
  }
  Xi("identity", function t(n) {
    var e;
    function r(t) {
      return null == t || isNaN((t = +t)) ? e : t;
    }
    return (
      (r.invert = r),
      (r.domain = r.range =
        function (t) {
          return arguments.length ? ((n = Array.from(t, xn)), r) : n.slice();
        }),
      (r.unknown = function (t) {
        return arguments.length ? ((e = t), r) : e;
      }),
      (r.copy = function () {
        return t(n).unknown(e);
      }),
      (n = arguments.length ? Array.from(n, xn) : [0, 1]),
      In(r)
    );
  }),
    Xi(Ni, zn, qi),
    Xi(
      Ci,
      function t() {
        var n = Ln(Tn()).domain([1, 10]);
        return (
          (n.copy = function () {
            return Sn(n, t()).base(n.base());
          }),
          pn.apply(n, arguments),
          n
        );
      },
      [qi, Ci]
    ),
    Xi(Ei, Xn, qi),
    Xi(
      Ii,
      function () {
        return Xn.apply(null, arguments).exponent(0.5);
      },
      qi
    ),
    Xi(
      zi,
      function t() {
        var n = Pn(Tn());
        return (
          (n.copy = function () {
            return Sn(n, t()).constant(n.constant());
          }),
          pn.apply(n, arguments)
        );
      },
      qi
    ),
    Xi(
      "time",
      function () {
        return pn.apply(
          vr(lr, fr, ze, Ee, me, ge, de, fe, se, hr.exports.timeFormat).domain([
            new Date(2e3, 0, 1),
            new Date(2e3, 0, 2),
          ]),
          arguments
        );
      },
      [qi, Li]
    ),
    Xi(
      "utc",
      function () {
        return pn.apply(
          vr(cr, sr, or, rr, Be, Fe, qe, Oe, se, hr.exports.utcFormat).domain([
            Date.UTC(2e3, 0, 1),
            Date.UTC(2e3, 0, 2),
          ]),
          arguments
        );
      },
      [qi, Li]
    ),
    Xi(Di, br, [qi, Ri]),
    Xi("".concat(Di, "-").concat(Ni), br, [qi, Ri]),
    Xi(
      "".concat(Di, "-").concat(Ci),
      function t() {
        var n = Ln(yr()).domain([1, 10]);
        return (
          (n.copy = function () {
            return mr(n, t()).base(n.base());
          }),
          gn.apply(n, arguments)
        );
      },
      [qi, Ri, Ci]
    ),
    Xi("".concat(Di, "-").concat(Ei), _r, [qi, Ri]),
    Xi(
      "".concat(Di, "-").concat(Ii),
      function () {
        return _r.apply(null, arguments).exponent(0.5);
      },
      [qi, Ri]
    ),
    Xi(
      "".concat(Di, "-").concat(zi),
      function t() {
        var n = Pn(yr());
        return (
          (n.copy = function () {
            return mr(n, t()).constant(n.constant());
          }),
          gn.apply(n, arguments)
        );
      },
      [qi, Ri]
    ),
    Xi(
      "".concat(Oi, "-").concat(Ni),
      function t() {
        var n = In(wr()(jn));
        return (
          (n.copy = function () {
            return mr(n, t());
          }),
          gn.apply(n, arguments)
        );
      },
      [qi, Ri]
    ),
    Xi(
      "".concat(Oi, "-").concat(Ci),
      function t() {
        var n = Ln(wr()).domain([0.1, 1, 10]);
        return (
          (n.copy = function () {
            return mr(n, t()).base(n.base());
          }),
          gn.apply(n, arguments)
        );
      },
      [qi, Ri, Ci]
    ),
    Xi("".concat(Oi, "-").concat(Ei), xr, [qi, Ri]),
    Xi(
      "".concat(Oi, "-").concat(Ii),
      function () {
        return xr.apply(null, arguments).exponent(0.5);
      },
      [qi, Ri]
    ),
    Xi(
      "".concat(Oi, "-").concat(zi),
      function t() {
        var n = Pn(wr());
        return (
          (n.copy = function () {
            return mr(n, t()).constant(n.constant());
          }),
          gn.apply(n, arguments)
        );
      },
      [qi, Ri]
    ),
    Xi(
      Ui,
      function t() {
        var n,
          e = [],
          r = [],
          i = [];
        function o() {
          var t = 0,
            n = Math.max(1, r.length);
          for (i = new Array(n - 1); ++t < n; ) i[t - 1] = Kt(e, t / n);
          return a;
        }
        function a(t) {
          return null == t || isNaN((t = +t)) ? n : r[mt(i, t)];
        }
        return (
          (a.invertExtent = function (t) {
            var n = r.indexOf(t);
            return n < 0
              ? [NaN, NaN]
              : [
                  n > 0 ? i[n - 1] : e[0],
                  n < i.length ? i[n] : e[e.length - 1],
                ];
          }),
          (a.domain = function (t) {
            if (!arguments.length) return e.slice();
            e = [];
            for (let n of t) null == n || isNaN((n = +n)) || e.push(n);
            return e.sort(pt), o();
          }),
          (a.range = function (t) {
            return arguments.length ? ((r = Array.from(t)), o()) : r.slice();
          }),
          (a.unknown = function (t) {
            return arguments.length ? ((n = t), a) : n;
          }),
          (a.quantiles = function () {
            return i.slice();
          }),
          (a.copy = function () {
            return t().domain(e).range(r).unknown(n);
          }),
          pn.apply(a, arguments)
        );
      },
      [Fi, Ui]
    ),
    Xi(
      "quantize",
      function t() {
        var n,
          e = 0,
          r = 1,
          i = 1,
          o = [0.5],
          a = [0, 1];
        function u(t) {
          return null != t && t <= t ? a[mt(o, t, 0, i)] : n;
        }
        function c() {
          var t = -1;
          for (o = new Array(i); ++t < i; )
            o[t] = ((t + 1) * r - (t - i) * e) / (i + 1);
          return u;
        }
        return (
          (u.domain = function (t) {
            return arguments.length
              ? (([e, r] = t), (e = +e), (r = +r), c())
              : [e, r];
          }),
          (u.range = function (t) {
            return arguments.length
              ? ((i = (a = Array.from(t)).length - 1), c())
              : a.slice();
          }),
          (u.invertExtent = function (t) {
            var n = a.indexOf(t);
            return n < 0
              ? [NaN, NaN]
              : n < 1
              ? [e, o[0]]
              : n >= i
              ? [o[i - 1], r]
              : [o[n - 1], o[n]];
          }),
          (u.unknown = function (t) {
            return arguments.length ? ((n = t), u) : u;
          }),
          (u.thresholds = function () {
            return o.slice();
          }),
          (u.copy = function () {
            return t().domain([e, r]).range(a).unknown(n);
          }),
          pn.apply(In(u), arguments)
        );
      },
      Fi
    ),
    Xi(
      "threshold",
      function t() {
        var n,
          e = [0.5],
          r = [0, 1],
          i = 1;
        function o(t) {
          return null != t && t <= t ? r[mt(e, t, 0, i)] : n;
        }
        return (
          (o.domain = function (t) {
            return arguments.length
              ? ((e = Array.from(t)), (i = Math.min(e.length, r.length - 1)), o)
              : e.slice();
          }),
          (o.range = function (t) {
            return arguments.length
              ? ((r = Array.from(t)), (i = Math.min(e.length, r.length - 1)), o)
              : r.slice();
          }),
          (o.invertExtent = function (t) {
            var n = r.indexOf(t);
            return [e[n - 1], e[n]];
          }),
          (o.unknown = function (t) {
            return arguments.length ? ((n = t), o) : n;
          }),
          (o.copy = function () {
            return t().domain(e).range(r).unknown(n);
          }),
          pn.apply(o, arguments)
        );
      },
      Fi
    ),
    Xi(
      "bin-ordinal",
      function t() {
        let n = [],
          e = [];
        function r(t) {
          return null == t || t != t ? void 0 : e[(mt(n, t) - 1) % e.length];
        }
        return (
          (r.domain = function (t) {
            return arguments.length ? ((n = Wi(t)), r) : n.slice();
          }),
          (r.range = function (t) {
            return arguments.length ? ((e = Hi.call(t)), r) : e.slice();
          }),
          (r.tickFormat = function (t, e) {
            return En(n[0], ei(n), null == t ? 10 : t, e);
          }),
          (r.copy = function () {
            return t().domain(r.domain()).range(r.range());
          }),
          r
        );
      },
      [Vi, Fi]
    ),
    Xi("ordinal", yn, Vi),
    Xi("band", Bi, Vi),
    Xi(
      "point",
      function () {
        return Yi(Bi().paddingInner(1));
      },
      Vi
    );
  function Ki(t) {
    const n = (t.length / 6) | 0,
      e = new Array(n);
    for (let r = 0; r < n; ) e[r] = "#" + t.slice(6 * r, 6 * ++r);
    return e;
  }
  function to(t, n) {
    for (const e in t) eo(e, n(t[e]));
  }
  const no = {};
  function eo(t, n) {
    return (
      (t = t && t.toLowerCase()),
      arguments.length > 1 ? ((no[t] = n), this) : no[t]
    );
  }
  function ro(t) {
    let n, r, i, a;
    return {
      c() {
        (n = b("rect")),
          j(n, "class", "outline svelte-1l9n80m"),
          j(n, "x", t[0]),
          j(n, "y", t[1]),
          j(n, "width", t[3]),
          j(n, "height", t[3]),
          j(n, "fill", (r = t[4](t[2])));
      },
      m(e, r) {
        g(e, n, r),
          i ||
            ((a = [M(n, "mouseout", t[6]), M(n, "mouseover", t[5])]), (i = !0));
      },
      p(t, [e]) {
        1 & e && j(n, "x", t[0]),
          2 & e && j(n, "y", t[1]),
          8 & e && j(n, "width", t[3]),
          8 & e && j(n, "height", t[3]),
          4 & e && r !== (r = t[4](t[2])) && j(n, "fill", r);
      },
      i: e,
      o: e,
      d(t) {
        t && v(n), (i = !1), o(a);
      },
    };
  }
  function io(t, n, e) {
    let r;
    c(t, Cr, (t) => e(9, (r = t)));
    const i = eo("lighttealblue");
    let { x: o = 0 } = n,
      { y: a = 0 } = n,
      { actual: u = null } = n,
      { predict: s = null } = n,
      { value: f = null } = n,
      { cellSize: h = 10 } = n;
    return (
      (t.$$set = (t) => {
        "x" in t && e(0, (o = t.x)),
          "y" in t && e(1, (a = t.y)),
          "actual" in t && e(7, (u = t.actual)),
          "predict" in t && e(8, (s = t.predict)),
          "value" in t && e(2, (f = t.value)),
          "cellSize" in t && e(3, (h = t.cellSize));
      }),
      [
        o,
        a,
        f,
        h,
        i,
        function () {
          l(Cr, (r = [u, s]), r);
        },
        function () {
          l(Cr, (r = null), r);
        },
        u,
        s,
      ]
    );
  }
  to(
    {
      category10:
        "1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf",
      category20:
        "1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5",
      category20b:
        "393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6",
      category20c:
        "3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9",
      tableau10: "4c78a8f58518e4575672b7b254a24beeca3bb279a2ff9da69d755dbab0ac",
      tableau20:
        "4c78a89ecae9f58518ffbf7954a24b88d27ab79a20f2cf5b43989483bcb6e45756ff9d9879706ebab0acd67195fcbfd2b279a2d6a5c99e765fd8b5a5",
      accent: "7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666",
      dark2: "1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666",
      paired:
        "a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928",
      pastel1: "fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2",
      pastel2: "b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc",
      set1: "e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999",
      set2: "66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3",
      set3: "8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f",
    },
    Ki
  ),
    to(
      {
        blues:
          "cfe1f2bed8eca8cee58fc1de74b2d75ba3cf4592c63181bd206fb2125ca40a4a90",
        greens:
          "d3eecdc0e6baabdda594d3917bc77d60ba6c46ab5e329a512089430e7735036429",
        greys:
          "e2e2e2d4d4d4c4c4c4b1b1b19d9d9d8888887575756262624d4d4d3535351e1e1e",
        oranges:
          "fdd8b3fdc998fdb87bfda55efc9244f87f2cf06b18e4580bd14904b93d029f3303",
        purples:
          "e2e1efd4d4e8c4c5e0b4b3d6a3a0cc928ec3827cb97566ae684ea25c3696501f8c",
        reds: "fdc9b4fcb49afc9e80fc8767fa7051f6573fec3f2fdc2a25c81b1db21218970b13",
        blueGreen:
          "d5efedc1e8e0a7ddd18bd2be70c6a958ba9144ad77319c5d2089460e7736036429",
        bluePurple:
          "ccddecbad0e4a8c2dd9ab0d4919cc98d85be8b6db28a55a6873c99822287730f71",
        greenBlue:
          "d3eecec5e8c3b1e1bb9bd8bb82cec269c2ca51b2cd3c9fc7288abd1675b10b60a1",
        orangeRed:
          "fddcaffdcf9bfdc18afdad77fb9562f67d53ee6545e24932d32d1ebf130da70403",
        purpleBlue:
          "dbdaebc8cee4b1c3de97b7d87bacd15b9fc93a90c01e7fb70b70ab056199045281",
        purpleBlueGreen:
          "dbd8eac8cee4b0c3de93b7d872acd1549fc83892bb1c88a3097f8702736b016353",
        purpleRed:
          "dcc9e2d3b3d7ce9eccd186c0da6bb2e14da0e23189d91e6fc61159ab07498f023a",
        redPurple:
          "fccfccfcbec0faa9b8f98faff571a5ec539ddb3695c41b8aa908808d0179700174",
        yellowGreen:
          "e4f4acd1eca0b9e2949ed68880c97c62bb6e47aa5e3297502083440e723b036034",
        yellowOrangeBrown:
          "feeaa1fedd84fecc63feb746fca031f68921eb7215db5e0bc54c05ab3d038f3204",
        yellowOrangeRed:
          "fee087fed16ffebd59fea849fd903efc7335f9522bee3423de1b20ca0b22af0225",
        blueOrange:
          "134b852f78b35da2cb9dcae1d2e5eff2f0ebfce0bafbbf74e8932fc5690d994a07",
        brownBlueGreen:
          "704108a0651ac79548e3c78af3e6c6eef1eac9e9e48ed1c74da79e187a72025147",
        purpleGreen:
          "5b1667834792a67fb6c9aed3e6d6e8eff0efd9efd5aedda971bb75368e490e5e29",
        purpleOrange:
          "4114696647968f83b7b9b4d6dadbebf3eeeafce0bafbbf74e8932fc5690d994a07",
        redBlue:
          "8c0d25bf363adf745ef4ae91fbdbc9f2efeed2e5ef9dcae15da2cb2f78b3134b85",
        redGrey:
          "8c0d25bf363adf745ef4ae91fcdccbfaf4f1e2e2e2c0c0c0969696646464343434",
        yellowGreenBlue:
          "eff9bddbf1b4bde5b594d5b969c5be45b4c22c9ec02182b82163aa23479c1c3185",
        redYellowBlue:
          "a50026d4322cf16e43fcac64fedd90faf8c1dcf1ecabd6e875abd04a74b4313695",
        redYellowGreen:
          "a50026d4322cf16e43fcac63fedd8df9f7aed7ee8ea4d86e64bc6122964f006837",
        pinkYellowGreen:
          "8e0152c0267edd72adf0b3d6faddedf5f3efe1f2cab6de8780bb474f9125276419",
        spectral:
          "9e0142d13c4bf0704afcac63fedd8dfbf8b0e0f3a1a9dda269bda94288b55e4fa2",
        viridis:
          "440154470e61481a6c482575472f7d443a834144873d4e8a39568c35608d31688e2d708e2a788e27818e23888e21918d1f988b1fa08822a8842ab07f35b77943bf7154c56866cc5d7ad1518fd744a5db36bcdf27d2e21be9e51afde725",
        magma:
          "0000040404130b0924150e3720114b2c11603b0f704a107957157e651a80721f817f24828c29819a2e80a8327db6377ac43c75d1426fde4968e95462f1605df76f5cfa7f5efc8f65fe9f6dfeaf78febf84fece91fddea0fcedaffcfdbf",
        inferno:
          "0000040403130c0826170c3b240c4f330a5f420a68500d6c5d126e6b176e781c6d86216b932667a12b62ae305cbb3755c73e4cd24644dd513ae65c30ed6925f3771af8850ffb9506fca50afcb519fac62df6d645f2e661f3f484fcffa4",
        plasma:
          "0d088723069033059742039d5002a25d01a66a00a87801a88405a7900da49c179ea72198b12a90ba3488c33d80cb4779d35171da5a69e16462e76e5bed7953f2834cf68f44fa9a3dfca636fdb32ffec029fcce25f9dc24f5ea27f0f921",
        cividis:
          "00205100235800265d002961012b65042e670831690d346b11366c16396d1c3c6e213f6e26426e2c456e31476e374a6e3c4d6e42506e47536d4c566d51586e555b6e5a5e6e5e616e62646f66676f6a6a706e6d717270717573727976737c79747f7c75827f758682768985778c8877908b78938e789691789a94789e9778a19b78a59e77a9a177aea575b2a874b6ab73bbaf71c0b26fc5b66dc9b96acebd68d3c065d8c462ddc85fe2cb5ce7cf58ebd355f0d652f3da4ff7de4cfae249fce647",
        rainbow:
          "6e40aa883eb1a43db3bf3cafd83fa4ee4395fe4b83ff576eff6659ff7847ff8c38f3a130e2b72fcfcc36bee044aff05b8ff4576ff65b52f6673af27828ea8d1ddfa319d0b81cbecb23abd82f96e03d82e14c6edb5a5dd0664dbf6e40aa",
        sinebow:
          "ff4040fc582af47218e78d0bd5a703bfbf00a7d5038de70b72f41858fc2a40ff402afc5818f4720be78d03d5a700bfbf03a7d50b8de71872f42a58fc4040ff582afc7218f48d0be7a703d5bf00bfd503a7e70b8df41872fc2a58ff4040",
        turbo:
          "23171b32204a3e2a71453493493eae4b49c54a53d7485ee44569ee4074f53c7ff8378af93295f72e9ff42ba9ef28b3e926bce125c5d925cdcf27d5c629dcbc2de3b232e9a738ee9d3ff39347f68950f9805afc7765fd6e70fe667cfd5e88fc5795fb51a1f84badf545b9f140c5ec3cd0e637dae034e4d931ecd12ef4c92bfac029ffb626ffad24ffa223ff9821ff8d1fff821dff771cfd6c1af76118f05616e84b14df4111d5380fcb2f0dc0260ab61f07ac1805a313029b0f00950c00910b00",
        browns:
          "eedbbdecca96e9b97ae4a865dc9856d18954c7784cc0673fb85536ad44339f3632",
        tealBlues: "bce4d89dd3d181c3cb65b3c245a2b9368fae347da0306a932c5985",
        teals:
          "bbdfdfa2d4d58ac9c975bcbb61b0af4da5a43799982b8b8c1e7f7f127273006667",
        warmGreys:
          "dcd4d0cec5c1c0b8b4b3aaa7a59c9998908c8b827f7e7673726866665c5a59504e",
        goldGreen:
          "f4d166d5ca60b6c35c98bb597cb25760a6564b9c533f8f4f33834a257740146c36",
        goldOrange:
          "f4d166f8be5cf8aa4cf5983bf3852aef701be2621fd65322c54923b142239e3a26",
        goldRed:
          "f4d166f6be59f9aa51fc964ef6834bee734ae56249db5247cf4244c43141b71d3e",
        lightGreyRed:
          "efe9e6e1dad7d5cbc8c8bdb9bbaea9cd967ddc7b43e15f19df4011dc000b",
        lightGreyTeal:
          "e4eaead6dcddc8ced2b7c2c7a6b4bc64b0bf22a6c32295c11f85be1876bc",
        lightMulti: "e0f1f2c4e9d0b0de9fd0e181f6e072f6c053f3993ef77440ef4a3c",
        lightOrange:
          "f2e7daf7d5baf9c499fab184fa9c73f68967ef7860e8645bde515bd43d5b",
        lightTealBlue:
          "e3e9e0c0dccf9aceca7abfc859afc0389fb9328dad2f7ca0276b95255988",
        darkBlue:
          "3232322d46681a5c930074af008cbf05a7ce25c0dd38daed50f3faffffff",
        darkGold:
          "3c3c3c584b37725e348c7631ae8b2bcfa424ecc31ef9de30fff184ffffff",
        darkGreen:
          "3a3a3a215748006f4d048942489e4276b340a6c63dd2d836ffeb2cffffaa",
        darkMulti: "3737371f5287197d8c29a86995ce3fffe800ffffff",
        darkRed: "3434347036339e3c38cc4037e75d1eec8620eeab29f0ce32ffeb2c",
      },
      (t) => Qi(Ki(t))
    );
  class oo extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-1l9n80m-style") ||
          (((n = m("style")).id = "svelte-1l9n80m-style"),
          (n.textContent =
            ".outline.svelte-1l9n80m{stroke:#eeeeee;pointer-events:all}"),
          p(document.head, n)),
        X(this, t, io, ro, u, {
          x: 0,
          y: 1,
          actual: 7,
          predict: 8,
          value: 2,
          cellSize: 3,
        });
    }
  }
  function ao(t) {
    let n, r, i, a, u;
    return {
      c() {
        (n = b("rect")),
          (r = w()),
          (i = b("rect")),
          j(n, "x", t[5]),
          j(n, "y", t[6]),
          j(n, "width", t[4]),
          j(n, "height", t[4]),
          j(n, "fill", t[2]),
          j(i, "class", "outline svelte-qmk1cu"),
          j(i, "x", t[0]),
          j(i, "y", t[1]),
          j(i, "width", t[3]),
          j(i, "height", t[3]);
      },
      m(e, o) {
        g(e, n, o),
          g(e, r, o),
          g(e, i, o),
          a ||
            ((u = [M(i, "mouseout", t[8]), M(i, "mouseover", t[7])]), (a = !0));
      },
      p(t, [e]) {
        32 & e && j(n, "x", t[5]),
          64 & e && j(n, "y", t[6]),
          16 & e && j(n, "width", t[4]),
          16 & e && j(n, "height", t[4]),
          4 & e && j(n, "fill", t[2]),
          1 & e && j(i, "x", t[0]),
          2 & e && j(i, "y", t[1]),
          8 & e && j(i, "width", t[3]),
          8 & e && j(i, "height", t[3]);
      },
      i: e,
      o: e,
      d(t) {
        t && v(n), t && v(r), t && v(i), (a = !1), o(u);
      },
    };
  }
  function uo(t, n, e) {
    let r, i, o, a;
    c(t, Cr, (t) => e(12, (a = t)));
    let { x: u = 0 } = n,
      { y: s = 0 } = n,
      { actual: f = null } = n,
      { predict: h = null } = n,
      { value: d = null } = n,
      { color: p = "rgb(0,0,0)" } = n,
      { cellSize: g = 10 } = n;
    const v = zn().range([4, g ** 2]);
    return (
      (t.$$set = (t) => {
        "x" in t && e(0, (u = t.x)),
          "y" in t && e(1, (s = t.y)),
          "actual" in t && e(9, (f = t.actual)),
          "predict" in t && e(10, (h = t.predict)),
          "value" in t && e(11, (d = t.value)),
          "color" in t && e(2, (p = t.color)),
          "cellSize" in t && e(3, (g = t.cellSize));
      }),
      (t.$$.update = () => {
        2048 & t.$$.dirty && e(4, (r = Math.sqrt(v(d)))),
          25 & t.$$.dirty && e(5, (i = u + (g - r) / 2)),
          26 & t.$$.dirty && e(6, (o = s + (g - r) / 2));
      }),
      [
        u,
        s,
        p,
        g,
        r,
        i,
        o,
        function () {
          l(Cr, (a = [f, h]), a);
        },
        function () {
          l(Cr, (a = null), a);
        },
        f,
        h,
        d,
      ]
    );
  }
  class co extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-qmk1cu-style") ||
          (((n = m("style")).id = "svelte-qmk1cu-style"),
          (n.textContent =
            ".outline.svelte-qmk1cu{fill:none;stroke:#eeeeee;pointer-events:all}"),
          p(document.head, n)),
        X(this, t, uo, ao, u, {
          x: 0,
          y: 1,
          actual: 9,
          predict: 10,
          value: 11,
          color: 2,
          cellSize: 3,
        });
    }
  }
  function so(t) {
    let n,
      r,
      i,
      o,
      a,
      u,
      c,
      s,
      l,
      f = t[0][1] + "";
    return {
      c() {
        (n = b("text")),
          (r = _(f)),
          (o = w()),
          (a = b("g")),
          (u = b("rect")),
          (c = b("rect")),
          j(n, "y", (i = t[1] / 2)),
          j(n, "dominant-baseline", "middle"),
          j(n, "class", "label svelte-1fj6eqt"),
          j(u, "width", t[2]),
          j(u, "height", t[3]),
          j(u, "fill", "#eeeeee"),
          j(c, "width", (s = t[4] * t[2])),
          j(c, "height", 3),
          j(c, "fill", "#0066cc"),
          j(a, "transform", (l = "translate(0," + (t[1] - t[3]) + ")"));
      },
      m(t, e) {
        g(t, n, e), p(n, r), g(t, o, e), g(t, a, e), p(a, u), p(a, c);
      },
      p(t, [e]) {
        1 & e && f !== (f = t[0][1] + "") && k(r, f),
          2 & e && i !== (i = t[1] / 2) && j(n, "y", i),
          4 & e && j(u, "width", t[2]),
          8 & e && j(u, "height", t[3]),
          20 & e && s !== (s = t[4] * t[2]) && j(c, "width", s),
          10 & e &&
            l !== (l = "translate(0," + (t[1] - t[3]) + ")") &&
            j(a, "transform", l);
      },
      i: e,
      o: e,
      d(t) {
        t && v(n), t && v(o), t && v(a);
      },
    };
  }
  function lo(t, n, e) {
    let r,
      { statistic: i } = n,
      { cellSize: o = 15 } = n,
      { columnWidth: a = 30 } = n,
      { height: u = 3 } = n;
    return (
      (t.$$set = (t) => {
        "statistic" in t && e(0, (i = t.statistic)),
          "cellSize" in t && e(1, (o = t.cellSize)),
          "columnWidth" in t && e(2, (a = t.columnWidth)),
          "height" in t && e(3, (u = t.height));
      }),
      (t.$$.update = () => {
        1 & t.$$.dirty && e(4, (r = Number.isNaN(i[0]) ? 0 : i[0]));
      }),
      [i, o, a, u, r]
    );
  }
  class fo extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-1fj6eqt-style") ||
          (((n = m("style")).id = "svelte-1fj6eqt-style"),
          (n.textContent =
            ".label.svelte-1fj6eqt{font-size:10px;fill:#888888}"),
          p(document.head, n)),
        X(this, t, lo, so, u, {
          statistic: 0,
          cellSize: 1,
          columnWidth: 2,
          height: 3,
        });
    }
  }
  function ho(t) {
    let n, r, i, a, u, c, s, l, f;
    return {
      c() {
        (n = b("line")),
          (c = w()),
          (s = b("rect")),
          j(n, "x1", (r = t[0] + (t[2] / 8) * 3)),
          j(n, "y1", (i = t[1] + (t[2] / 8) * 3)),
          j(n, "x2", (a = t[0] + (t[2] / 8) * 5)),
          j(n, "y2", (u = t[1] + (t[2] / 8) * 5)),
          j(n, "stroke", "#eeeeee"),
          j(s, "class", "outline svelte-qmk1cu"),
          j(s, "x", t[0]),
          j(s, "y", t[1]),
          j(s, "width", t[2]),
          j(s, "height", t[2]);
      },
      m(e, r) {
        g(e, n, r),
          g(e, c, r),
          g(e, s, r),
          l ||
            ((f = [M(s, "mouseout", t[4]), M(s, "mouseover", t[3])]), (l = !0));
      },
      p(t, [e]) {
        5 & e && r !== (r = t[0] + (t[2] / 8) * 3) && j(n, "x1", r),
          6 & e && i !== (i = t[1] + (t[2] / 8) * 3) && j(n, "y1", i),
          5 & e && a !== (a = t[0] + (t[2] / 8) * 5) && j(n, "x2", a),
          6 & e && u !== (u = t[1] + (t[2] / 8) * 5) && j(n, "y2", u),
          1 & e && j(s, "x", t[0]),
          2 & e && j(s, "y", t[1]),
          4 & e && j(s, "width", t[2]),
          4 & e && j(s, "height", t[2]);
      },
      i: e,
      o: e,
      d(t) {
        t && v(n), t && v(c), t && v(s), (l = !1), o(f);
      },
    };
  }
  function po(t, n, e) {
    let r;
    c(t, Cr, (t) => e(7, (r = t)));
    let { x: i = 0 } = n,
      { y: o = 0 } = n,
      { actual: a = null } = n,
      { predict: u = null } = n,
      { cellSize: s = 10 } = n;
    return (
      (t.$$set = (t) => {
        "x" in t && e(0, (i = t.x)),
          "y" in t && e(1, (o = t.y)),
          "actual" in t && e(5, (a = t.actual)),
          "predict" in t && e(6, (u = t.predict)),
          "cellSize" in t && e(2, (s = t.cellSize));
      }),
      [
        i,
        o,
        s,
        function () {
          l(Cr, (r = [a, u]), r);
        },
        function () {
          l(Cr, (r = null), r);
        },
        a,
        u,
      ]
    );
  }
  class go extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-qmk1cu-style") ||
          (((n = m("style")).id = "svelte-qmk1cu-style"),
          (n.textContent =
            ".outline.svelte-qmk1cu{fill:none;stroke:#eeeeee;pointer-events:all}"),
          p(document.head, n)),
        X(this, t, po, ho, u, {
          x: 0,
          y: 1,
          actual: 5,
          predict: 6,
          cellSize: 2,
        });
    }
  }
  function vo(t) {
    let n,
      e,
      r,
      i,
      o,
      a,
      u,
      c,
      l,
      f,
      h,
      d,
      y = t[4](t[0].data.name) + "";
    function m(t, n) {
      return (
        (null == l || 9 & n) && (l = !!t[3].filter?.includes(t[0].data.id)),
        l ? _o : bo
      );
    }
    let x = m(t, -1),
      $ = x(t);
    return {
      c() {
        (n = b("text")),
          (e = b("tspan")),
          (r = b("tspan")),
          (i = _("⋁")),
          (o = w()),
          (a = b("tspan")),
          (u = _(y)),
          (c = w()),
          $.c(),
          j(r, "dominant-baseline", "middle"),
          j(r, "class", "collapseIcon svelte-l11i24"),
          j(a, "dominant-baseline", "middle"),
          j(a, "x", "10"),
          j(n, "dominant-baseline", "middle"),
          A(n, "cursor", "pointer"),
          j(
            n,
            "class",
            (f =
              s(t[2] && t[2][t[1]] === t[0] ? "label active" : "label") +
              " svelte-l11i24")
          );
      },
      m(s, l) {
        g(s, n, l),
          p(n, e),
          p(e, r),
          p(r, i),
          p(e, o),
          p(e, a),
          p(a, u),
          p(n, c),
          $.m(n, null),
          h || ((d = M(e, "click", t[7])), (h = !0));
      },
      p(t, e) {
        1 & e && y !== (y = t[4](t[0].data.name) + "") && k(u, y),
          x === (x = m(t, e)) && $
            ? $.p(t, e)
            : ($.d(1), ($ = x(t)), $ && ($.c(), $.m(n, null))),
          7 & e &&
            f !==
              (f =
                s(t[2] && t[2][t[1]] === t[0] ? "label active" : "label") +
                " svelte-l11i24") &&
            j(n, "class", f);
      },
      d(t) {
        t && v(n), $.d(), (h = !1), d();
      },
    };
  }
  function yo(t) {
    let n,
      e,
      r,
      i,
      o,
      a,
      u,
      c,
      l = t[4](t[0].data.name) + "";
    return {
      c() {
        (n = b("text")),
          (e = b("tspan")),
          (r = _(">")),
          (i = w()),
          (o = _(l)),
          j(e, "dominant-baseline", "middle"),
          j(e, "class", "collapseIcon svelte-l11i24"),
          j(n, "dominant-baseline", "middle"),
          A(n, "cursor", "pointer"),
          j(
            n,
            "class",
            (a =
              s(t[2] && t[2][t[1]] === t[0] ? "label active" : "label") +
              " svelte-l11i24")
          );
      },
      m(a, s) {
        g(a, n, s),
          p(n, e),
          p(e, r),
          p(n, i),
          p(n, o),
          u || ((c = M(n, "click", t[6])), (u = !0));
      },
      p(t, e) {
        1 & e && l !== (l = t[4](t[0].data.name) + "") && k(o, l),
          7 & e &&
            a !==
              (a =
                s(t[2] && t[2][t[1]] === t[0] ? "label active" : "label") +
                " svelte-l11i24") &&
            j(n, "class", a);
      },
      d(t) {
        t && v(n), (u = !1), c();
      },
    };
  }
  function mo(t) {
    let n,
      e,
      r,
      i = t[4](t[0].data.name) + "";
    return {
      c() {
        (n = b("text")),
          (e = _(i)),
          j(n, "dominant-baseline", "middle"),
          A(n, "cursor", "default"),
          j(
            n,
            "class",
            (r =
              s(t[2] && t[2][t[1]] === t[0] ? "label active" : "label") +
              " svelte-l11i24")
          );
      },
      m(t, r) {
        g(t, n, r), p(n, e);
      },
      p(t, o) {
        1 & o && i !== (i = t[4](t[0].data.name) + "") && k(e, i),
          7 & o &&
            r !==
              (r =
                s(t[2] && t[2][t[1]] === t[0] ? "label active" : "label") +
                " svelte-l11i24") &&
            j(n, "class", r);
      },
      d(t) {
        t && v(n);
      },
    };
  }
  function bo(t) {
    let n, r, i, o;
    return {
      c() {
        (n = b("tspan")), (r = _("🔎")), j(n, "y", "2");
      },
      m(e, a) {
        g(e, n, a), p(n, r), i || ((o = M(n, "click", t[9])), (i = !0));
      },
      p: e,
      d(t) {
        t && v(n), (i = !1), o();
      },
    };
  }
  function _o(t) {
    let n, r, i, o;
    return {
      c() {
        (n = b("tspan")), (r = _("❌")), j(n, "dominant-baseline", "middle");
      },
      m(e, a) {
        g(e, n, a), p(n, r), i || ((o = M(n, "click", t[8])), (i = !0));
      },
      p: e,
      d(t) {
        t && v(n), (i = !1), o();
      },
    };
  }
  function wo(t) {
    let n, r, i;
    function o(t, e) {
      return (
        (null == n || 1 & e) && (n = !!t[0].isLeaf()),
        n
          ? mo
          : ((null == r || 9 & e) &&
              (r = !!t[3].collapsed.includes(t[0].data.id)),
            r ? yo : vo)
      );
    }
    let a = o(t, -1),
      u = a(t);
    return {
      c() {
        u.c(), (i = x());
      },
      m(t, n) {
        u.m(t, n), g(t, i, n);
      },
      p(t, [n]) {
        a === (a = o(t, n)) && u
          ? u.p(t, n)
          : (u.d(1), (u = a(t)), u && (u.c(), u.m(i.parentNode, i)));
      },
      i: e,
      o: e,
      d(t) {
        u.d(t), t && v(i);
      },
    };
  }
  function xo(t, n, e) {
    let r, i;
    c(t, Cr, (t) => e(2, (r = t))), c(t, Er, (t) => e(3, (i = t)));
    let { node: o = null } = n,
      { truncateText: a = 25 } = n,
      { direction: u = null } = n;
    return (
      (t.$$set = (t) => {
        "node" in t && e(0, (o = t.node)),
          "truncateText" in t && e(5, (a = t.truncateText)),
          "direction" in t && e(1, (u = t.direction));
      }),
      [
        o,
        u,
        r,
        i,
        function (t) {
          return t.length > a ? t.substring(0, a) : t;
        },
        a,
        () => {
          const t = i.collapsed.indexOf(o.data.id);
          t > -1 && (i.collapsed.splice(t, 1), Er.set(i));
        },
        () => {
          i.collapsed.push(o.data.id), Er.set(i);
        },
        () => {
          const t = new Set(i.filter);
          t.delete(o.data.id), l(Er, (i.filter = [...t]), i), Er.set(i);
        },
        () => {
          if (i.filter && 0 !== i.filter.length) {
            const t = new Set(i.filter);
            t.add(o.data.id), l(Er, (i.filter = [...t]), i);
          } else l(Er, (i.filter = [o.data.id]), i);
          Er.set(i);
        },
      ]
    );
  }
  class Mo extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-l11i24-style") ||
          (((n = m("style")).id = "svelte-l11i24-style"),
          (n.textContent =
            '.label.svelte-l11i24{font-size:12px;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";text-rendering:optimizeLegibility}.active.svelte-l11i24{font-weight:bold}.collapseIcon.svelte-l11i24{fill:#dddddd;stroke:#dddddd}'),
          p(document.head, n)),
        X(this, t, xo, wo, u, { node: 0, truncateText: 5, direction: 1 });
    }
  }
  function jo(t, n, e) {
    const r = t.slice();
    return (r[4] = n[e]), (r[6] = e), r;
  }
  function ko(t) {
    let n,
      e,
      r,
      i,
      o,
      a,
      u,
      c,
      s,
      l,
      f,
      h,
      d,
      y = Ar(t[4], 1) + "";
    return {
      c() {
        (n = b("rect")),
          (a = w()),
          (u = b("rect")),
          (s = w()),
          (l = b("text")),
          (f = _(y)),
          j(n, "y", (e = (t[1] - Math.sqrt(t[3](t[0](t[4])))) / 2)),
          j(
            n,
            "x",
            (r = t[6] * (t[1] + $o) + (t[1] - Math.sqrt(t[3](t[0](t[4])))) / 2)
          ),
          j(n, "height", (i = Math.sqrt(t[3](t[0](t[4]))))),
          j(n, "width", (o = Math.sqrt(t[3](t[0](t[4]))))),
          j(n, "fill", "rgb(26,133,255)"),
          j(u, "class", "outline svelte-if23ge"),
          j(u, "x", (c = t[6] * (t[1] + $o))),
          j(u, "width", t[1]),
          j(u, "height", t[1]),
          j(l, "dominant-baseline", "middle"),
          j(l, "class", "label svelte-if23ge"),
          j(l, "y", (h = t[1] + t[1] / 2)),
          j(l, "x", (d = t[6] * (t[1] + $o) + t[1] / 2));
      },
      m(t, e) {
        g(t, n, e), g(t, a, e), g(t, u, e), g(t, s, e), g(t, l, e), p(l, f);
      },
      p(t, a) {
        15 & a &&
          e !== (e = (t[1] - Math.sqrt(t[3](t[0](t[4])))) / 2) &&
          j(n, "y", e),
          15 & a &&
            r !==
              (r =
                t[6] * (t[1] + $o) +
                (t[1] - Math.sqrt(t[3](t[0](t[4])))) / 2) &&
            j(n, "x", r),
          13 & a &&
            i !== (i = Math.sqrt(t[3](t[0](t[4])))) &&
            j(n, "height", i),
          13 & a && o !== (o = Math.sqrt(t[3](t[0](t[4])))) && j(n, "width", o),
          2 & a && c !== (c = t[6] * (t[1] + $o)) && j(u, "x", c),
          2 & a && j(u, "width", t[1]),
          2 & a && j(u, "height", t[1]),
          4 & a && y !== (y = Ar(t[4], 1) + "") && k(f, y),
          2 & a && h !== (h = t[1] + t[1] / 2) && j(l, "y", h),
          2 & a && d !== (d = t[6] * (t[1] + $o) + t[1] / 2) && j(l, "x", d);
      },
      d(t) {
        t && v(n), t && v(a), t && v(u), t && v(s), t && v(l);
      },
    };
  }
  function Ao(t) {
    let n,
      r = t[2],
      i = [];
    for (let n = 0; n < r.length; n += 1) i[n] = ko(jo(t, r, n));
    return {
      c() {
        for (let t = 0; t < i.length; t += 1) i[t].c();
        n = x();
      },
      m(t, e) {
        for (let n = 0; n < i.length; n += 1) i[n].m(t, e);
        g(t, n, e);
      },
      p(t, [e]) {
        if (15 & e) {
          let o;
          for (r = t[2], o = 0; o < r.length; o += 1) {
            const a = jo(t, r, o);
            i[o]
              ? i[o].p(a, e)
              : ((i[o] = ko(a)), i[o].c(), i[o].m(n.parentNode, n));
          }
          for (; o < i.length; o += 1) i[o].d(1);
          i.length = r.length;
        }
      },
      i: e,
      o: e,
      d(t) {
        y(i, t), t && v(n);
      },
    };
  }
  const $o = 3;
  function So(t, n, e) {
    let r,
      i,
      { scale: o = d3.scaleLinear() } = n,
      { cellSize: a = 10 } = n;
    return (
      (t.$$set = (t) => {
        "scale" in t && e(0, (o = t.scale)),
          "cellSize" in t && e(1, (a = t.cellSize));
      }),
      (t.$$.update = () => {
        1 & t.$$.dirty && e(2, (r = o.ticks(5))),
          2 & t.$$.dirty && e(3, (i = zn().range([4, a ** 2])));
      }),
      [o, a, r, i]
    );
  }
  class To extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-if23ge-style") ||
          (((n = m("style")).id = "svelte-if23ge-style"),
          (n.textContent =
            ".outline.svelte-if23ge{fill:none;stroke:#eeeeee}.label.svelte-if23ge{font-size:10px}"),
          p(document.head, n)),
        X(this, t, So, Ao, u, { scale: 0, cellSize: 1 });
    }
  }
  function No(t, n, e) {
    const r = t.slice();
    return (r[4] = n[e]), (r[6] = e), r;
  }
  function Co(t, n, e) {
    const r = t.slice();
    return (r[7] = n[e]), r;
  }
  function Eo(t) {
    let n;
    return {
      c() {
        (n = b("stop")),
          j(n, "offset", t[7] / Oo),
          j(n, "stop-color", t[2](t[7] / Oo));
      },
      m(t, e) {
        g(t, n, e);
      },
      p: e,
      d(t) {
        t && v(n);
      },
    };
  }
  function Io(t) {
    let n,
      e,
      r,
      i,
      o = Ar(t[4], 1) + "";
    return {
      c() {
        (n = b("text")),
          (e = _(o)),
          j(n, "dominant-baseline", "middle"),
          j(n, "class", "label svelte-1xk6k75"),
          j(n, "y", (r = t[0] + t[0] / 2)),
          j(n, "x", (i = t[6] * (t[0] + Do) + t[0] / 2));
      },
      m(t, r) {
        g(t, n, r), p(n, e);
      },
      p(t, a) {
        2 & a && o !== (o = Ar(t[4], 1) + "") && k(e, o),
          1 & a && r !== (r = t[0] + t[0] / 2) && j(n, "y", r),
          1 & a && i !== (i = t[6] * (t[0] + Do) + t[0] / 2) && j(n, "x", i);
      },
      d(t) {
        t && v(n);
      },
    };
  }
  function zo(t) {
    let n,
      r,
      i,
      o,
      a,
      u,
      c,
      s = [...Array(Oo).keys()],
      l = [];
    for (let n = 0; n < s.length; n += 1) l[n] = Eo(Co(t, s, n));
    let f = t[1],
      h = [];
    for (let n = 0; n < f.length; n += 1) h[n] = Io(No(t, f, n));
    return {
      c() {
        (n = b("defs")), (r = b("linearGradient"));
        for (let t = 0; t < l.length; t += 1) l[t].c();
        (i = w()), (o = b("rect")), (u = w());
        for (let t = 0; t < h.length; t += 1) h[t].c();
        (c = x()),
          j(r, "id", "legendRampGradient"),
          j(r, "x1", "0"),
          j(r, "y1", "0"),
          j(r, "x2", "1"),
          j(r, "y2", "0"),
          j(o, "class", "outline svelte-1xk6k75"),
          j(o, "height", t[0]),
          j(o, "width", (a = t[1].length * (t[0] + Do))),
          j(o, "fill", "url(#legendRampGradient)");
      },
      m(t, e) {
        g(t, n, e), p(n, r);
        for (let t = 0; t < l.length; t += 1) l[t].m(r, null);
        g(t, i, e), g(t, o, e), g(t, u, e);
        for (let n = 0; n < h.length; n += 1) h[n].m(t, e);
        g(t, c, e);
      },
      p(t, [n]) {
        if (4 & n) {
          let e;
          for (s = [...Array(Oo).keys()], e = 0; e < s.length; e += 1) {
            const i = Co(t, s, e);
            l[e] ? l[e].p(i, n) : ((l[e] = Eo(i)), l[e].c(), l[e].m(r, null));
          }
          for (; e < l.length; e += 1) l[e].d(1);
          l.length = s.length;
        }
        if (
          (1 & n && j(o, "height", t[0]),
          3 & n && a !== (a = t[1].length * (t[0] + Do)) && j(o, "width", a),
          3 & n)
        ) {
          let e;
          for (f = t[1], e = 0; e < f.length; e += 1) {
            const r = No(t, f, e);
            h[e]
              ? h[e].p(r, n)
              : ((h[e] = Io(r)), h[e].c(), h[e].m(c.parentNode, c));
          }
          for (; e < h.length; e += 1) h[e].d(1);
          h.length = f.length;
        }
      },
      i: e,
      o: e,
      d(t) {
        t && v(n), y(l, t), t && v(i), t && v(o), t && v(u), y(h, t), t && v(c);
      },
    };
  }
  const Do = 3,
    Oo = 16;
  function Uo(t, n, e) {
    let r;
    const i = eo("lighttealblue");
    let { scale: o = zn() } = n,
      { cellSize: a = 10 } = n;
    return (
      (t.$$set = (t) => {
        "scale" in t && e(3, (o = t.scale)),
          "cellSize" in t && e(0, (a = t.cellSize));
      }),
      (t.$$.update = () => {
        8 & t.$$.dirty && e(1, (r = o.ticks(4)));
      }),
      [a, r, i, o]
    );
  }
  class qo extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-1xk6k75-style") ||
          (((n = m("style")).id = "svelte-1xk6k75-style"),
          (n.textContent =
            ".label.svelte-1xk6k75{font-size:10px}.outline.svelte-1xk6k75{stroke:#eeeeee;pointer-events:all}"),
          p(document.head, n)),
        X(this, t, Uo, zo, u, { scale: 3, cellSize: 0 });
    }
  }
  var Vo = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */ !(function (t, n) {
    (function () {
      var e,
        r = "Expected a function",
        i = "__lodash_hash_undefined__",
        o = "__lodash_placeholder__",
        a = 16,
        u = 32,
        c = 64,
        s = 128,
        l = 256,
        f = 1 / 0,
        h = 9007199254740991,
        d = NaN,
        p = 4294967295,
        g = [
          ["ary", s],
          ["bind", 1],
          ["bindKey", 2],
          ["curry", 8],
          ["curryRight", a],
          ["flip", 512],
          ["partial", u],
          ["partialRight", c],
          ["rearg", l],
        ],
        v = "[object Arguments]",
        y = "[object Array]",
        m = "[object Boolean]",
        b = "[object Date]",
        _ = "[object Error]",
        w = "[object Function]",
        x = "[object GeneratorFunction]",
        M = "[object Map]",
        j = "[object Number]",
        k = "[object Object]",
        A = "[object Promise]",
        $ = "[object RegExp]",
        S = "[object Set]",
        T = "[object String]",
        N = "[object Symbol]",
        C = "[object WeakMap]",
        E = "[object ArrayBuffer]",
        I = "[object DataView]",
        z = "[object Float32Array]",
        D = "[object Float64Array]",
        O = "[object Int8Array]",
        U = "[object Int16Array]",
        q = "[object Int32Array]",
        V = "[object Uint8Array]",
        F = "[object Uint8ClampedArray]",
        R = "[object Uint16Array]",
        L = "[object Uint32Array]",
        B = /\b__p \+= '';/g,
        Y = /\b(__p \+=) '' \+/g,
        P = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
        W = /&(?:amp|lt|gt|quot|#39);/g,
        H = /[&<>"']/g,
        G = RegExp(W.source),
        Z = RegExp(H.source),
        X = /<%-([\s\S]+?)%>/g,
        J = /<%([\s\S]+?)%>/g,
        K = /<%=([\s\S]+?)%>/g,
        tt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        nt = /^\w*$/,
        et =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        rt = /[\\^$.*+?()[\]{}|]/g,
        it = RegExp(rt.source),
        ot = /^\s+/,
        at = /\s/,
        ut = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
        ct = /\{\n\/\* \[wrapped with (.+)\] \*/,
        st = /,? & /,
        lt = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
        ft = /[()=,{}\[\]\/\s]/,
        ht = /\\(\\)?/g,
        dt = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
        pt = /\w*$/,
        gt = /^[-+]0x[0-9a-f]+$/i,
        vt = /^0b[01]+$/i,
        yt = /^\[object .+?Constructor\]$/,
        mt = /^0o[0-7]+$/i,
        bt = /^(?:0|[1-9]\d*)$/,
        _t = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
        wt = /($^)/,
        xt = /['\n\r\u2028\u2029\\]/g,
        Mt = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",
        jt = "\\u2700-\\u27bf",
        kt = "a-z\\xdf-\\xf6\\xf8-\\xff",
        At = "A-Z\\xc0-\\xd6\\xd8-\\xde",
        $t = "\\ufe0e\\ufe0f",
        St =
          "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
        Tt = "['’]",
        Nt = "[\\ud800-\\udfff]",
        Ct = "[" + St + "]",
        Et = "[" + Mt + "]",
        It = "\\d+",
        zt = "[\\u2700-\\u27bf]",
        Dt = "[" + kt + "]",
        Ot = "[^\\ud800-\\udfff" + St + It + jt + kt + At + "]",
        Ut = "\\ud83c[\\udffb-\\udfff]",
        qt = "[^\\ud800-\\udfff]",
        Vt = "(?:\\ud83c[\\udde6-\\uddff]){2}",
        Ft = "[\\ud800-\\udbff][\\udc00-\\udfff]",
        Rt = "[" + At + "]",
        Lt = "(?:" + Dt + "|" + Ot + ")",
        Bt = "(?:" + Rt + "|" + Ot + ")",
        Yt = "(?:['’](?:d|ll|m|re|s|t|ve))?",
        Pt = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
        Wt = "(?:" + Et + "|" + Ut + ")" + "?",
        Ht = "[\\ufe0e\\ufe0f]?",
        Gt =
          Ht +
          Wt +
          ("(?:\\u200d(?:" + [qt, Vt, Ft].join("|") + ")" + Ht + Wt + ")*"),
        Zt = "(?:" + [zt, Vt, Ft].join("|") + ")" + Gt,
        Xt = "(?:" + [qt + Et + "?", Et, Vt, Ft, Nt].join("|") + ")",
        Jt = RegExp(Tt, "g"),
        Qt = RegExp(Et, "g"),
        Kt = RegExp(Ut + "(?=" + Ut + ")|" + Xt + Gt, "g"),
        tn = RegExp(
          [
            Rt + "?" + Dt + "+" + Yt + "(?=" + [Ct, Rt, "$"].join("|") + ")",
            Bt + "+" + Pt + "(?=" + [Ct, Rt + Lt, "$"].join("|") + ")",
            Rt + "?" + Lt + "+" + Yt,
            Rt + "+" + Pt,
            "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
            "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
            It,
            Zt,
          ].join("|"),
          "g"
        ),
        nn = RegExp("[\\u200d\\ud800-\\udfff" + Mt + $t + "]"),
        en =
          /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
        rn = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout",
        ],
        on = -1,
        an = {};
      (an[z] =
        an[D] =
        an[O] =
        an[U] =
        an[q] =
        an[V] =
        an[F] =
        an[R] =
        an[L] =
          !0),
        (an[v] =
          an[y] =
          an[E] =
          an[m] =
          an[I] =
          an[b] =
          an[_] =
          an[w] =
          an[M] =
          an[j] =
          an[k] =
          an[$] =
          an[S] =
          an[T] =
          an[C] =
            !1);
      var un = {};
      (un[v] =
        un[y] =
        un[E] =
        un[I] =
        un[m] =
        un[b] =
        un[z] =
        un[D] =
        un[O] =
        un[U] =
        un[q] =
        un[M] =
        un[j] =
        un[k] =
        un[$] =
        un[S] =
        un[T] =
        un[N] =
        un[V] =
        un[F] =
        un[R] =
        un[L] =
          !0),
        (un[_] = un[w] = un[C] = !1);
      var cn = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        sn = parseFloat,
        ln = parseInt,
        fn = "object" == typeof Q && Q && Q.Object === Object && Q,
        hn = "object" == typeof self && self && self.Object === Object && self,
        dn = fn || hn || Function("return this")(),
        pn = n && !n.nodeType && n,
        gn = pn && t && !t.nodeType && t,
        vn = gn && gn.exports === pn,
        yn = vn && fn.process,
        mn = (function () {
          try {
            var t = gn && gn.require && gn.require("util").types;
            return t || (yn && yn.binding && yn.binding("util"));
          } catch (t) {}
        })(),
        bn = mn && mn.isArrayBuffer,
        _n = mn && mn.isDate,
        wn = mn && mn.isMap,
        xn = mn && mn.isRegExp,
        Mn = mn && mn.isSet,
        jn = mn && mn.isTypedArray;
      function kn(t, n, e) {
        switch (e.length) {
          case 0:
            return t.call(n);
          case 1:
            return t.call(n, e[0]);
          case 2:
            return t.call(n, e[0], e[1]);
          case 3:
            return t.call(n, e[0], e[1], e[2]);
        }
        return t.apply(n, e);
      }
      function An(t, n, e, r) {
        for (var i = -1, o = null == t ? 0 : t.length; ++i < o; ) {
          var a = t[i];
          n(r, a, e(a), t);
        }
        return r;
      }
      function $n(t, n) {
        for (
          var e = -1, r = null == t ? 0 : t.length;
          ++e < r && !1 !== n(t[e], e, t);

        );
        return t;
      }
      function Sn(t, n) {
        for (var e = null == t ? 0 : t.length; e-- && !1 !== n(t[e], e, t); );
        return t;
      }
      function Tn(t, n) {
        for (var e = -1, r = null == t ? 0 : t.length; ++e < r; )
          if (!n(t[e], e, t)) return !1;
        return !0;
      }
      function Nn(t, n) {
        for (
          var e = -1, r = null == t ? 0 : t.length, i = 0, o = [];
          ++e < r;

        ) {
          var a = t[e];
          n(a, e, t) && (o[i++] = a);
        }
        return o;
      }
      function Cn(t, n) {
        return !!(null == t ? 0 : t.length) && Rn(t, n, 0) > -1;
      }
      function En(t, n, e) {
        for (var r = -1, i = null == t ? 0 : t.length; ++r < i; )
          if (e(n, t[r])) return !0;
        return !1;
      }
      function In(t, n) {
        for (var e = -1, r = null == t ? 0 : t.length, i = Array(r); ++e < r; )
          i[e] = n(t[e], e, t);
        return i;
      }
      function zn(t, n) {
        for (var e = -1, r = n.length, i = t.length; ++e < r; ) t[i + e] = n[e];
        return t;
      }
      function Dn(t, n, e, r) {
        var i = -1,
          o = null == t ? 0 : t.length;
        for (r && o && (e = t[++i]); ++i < o; ) e = n(e, t[i], i, t);
        return e;
      }
      function On(t, n, e, r) {
        var i = null == t ? 0 : t.length;
        for (r && i && (e = t[--i]); i--; ) e = n(e, t[i], i, t);
        return e;
      }
      function Un(t, n) {
        for (var e = -1, r = null == t ? 0 : t.length; ++e < r; )
          if (n(t[e], e, t)) return !0;
        return !1;
      }
      var qn = Pn("length");
      function Vn(t, n, e) {
        var r;
        return (
          e(t, function (t, e, i) {
            if (n(t, e, i)) return (r = e), !1;
          }),
          r
        );
      }
      function Fn(t, n, e, r) {
        for (var i = t.length, o = e + (r ? 1 : -1); r ? o-- : ++o < i; )
          if (n(t[o], o, t)) return o;
        return -1;
      }
      function Rn(t, n, e) {
        return n == n
          ? (function (t, n, e) {
              var r = e - 1,
                i = t.length;
              for (; ++r < i; ) if (t[r] === n) return r;
              return -1;
            })(t, n, e)
          : Fn(t, Bn, e);
      }
      function Ln(t, n, e, r) {
        for (var i = e - 1, o = t.length; ++i < o; ) if (r(t[i], n)) return i;
        return -1;
      }
      function Bn(t) {
        return t != t;
      }
      function Yn(t, n) {
        var e = null == t ? 0 : t.length;
        return e ? Gn(t, n) / e : d;
      }
      function Pn(t) {
        return function (n) {
          return null == n ? e : n[t];
        };
      }
      function Wn(t) {
        return function (n) {
          return null == t ? e : t[n];
        };
      }
      function Hn(t, n, e, r, i) {
        return (
          i(t, function (t, i, o) {
            e = r ? ((r = !1), t) : n(e, t, i, o);
          }),
          e
        );
      }
      function Gn(t, n) {
        for (var r, i = -1, o = t.length; ++i < o; ) {
          var a = n(t[i]);
          a !== e && (r = r === e ? a : r + a);
        }
        return r;
      }
      function Zn(t, n) {
        for (var e = -1, r = Array(t); ++e < t; ) r[e] = n(e);
        return r;
      }
      function Xn(t) {
        return t ? t.slice(0, pe(t) + 1).replace(ot, "") : t;
      }
      function Jn(t) {
        return function (n) {
          return t(n);
        };
      }
      function Qn(t, n) {
        return In(n, function (n) {
          return t[n];
        });
      }
      function Kn(t, n) {
        return t.has(n);
      }
      function te(t, n) {
        for (var e = -1, r = t.length; ++e < r && Rn(n, t[e], 0) > -1; );
        return e;
      }
      function ne(t, n) {
        for (var e = t.length; e-- && Rn(n, t[e], 0) > -1; );
        return e;
      }
      function ee(t, n) {
        for (var e = t.length, r = 0; e--; ) t[e] === n && ++r;
        return r;
      }
      var re = Wn({
          À: "A",
          Á: "A",
          Â: "A",
          Ã: "A",
          Ä: "A",
          Å: "A",
          à: "a",
          á: "a",
          â: "a",
          ã: "a",
          ä: "a",
          å: "a",
          Ç: "C",
          ç: "c",
          Ð: "D",
          ð: "d",
          È: "E",
          É: "E",
          Ê: "E",
          Ë: "E",
          è: "e",
          é: "e",
          ê: "e",
          ë: "e",
          Ì: "I",
          Í: "I",
          Î: "I",
          Ï: "I",
          ì: "i",
          í: "i",
          î: "i",
          ï: "i",
          Ñ: "N",
          ñ: "n",
          Ò: "O",
          Ó: "O",
          Ô: "O",
          Õ: "O",
          Ö: "O",
          Ø: "O",
          ò: "o",
          ó: "o",
          ô: "o",
          õ: "o",
          ö: "o",
          ø: "o",
          Ù: "U",
          Ú: "U",
          Û: "U",
          Ü: "U",
          ù: "u",
          ú: "u",
          û: "u",
          ü: "u",
          Ý: "Y",
          ý: "y",
          ÿ: "y",
          Æ: "Ae",
          æ: "ae",
          Þ: "Th",
          þ: "th",
          ß: "ss",
          Ā: "A",
          Ă: "A",
          Ą: "A",
          ā: "a",
          ă: "a",
          ą: "a",
          Ć: "C",
          Ĉ: "C",
          Ċ: "C",
          Č: "C",
          ć: "c",
          ĉ: "c",
          ċ: "c",
          č: "c",
          Ď: "D",
          Đ: "D",
          ď: "d",
          đ: "d",
          Ē: "E",
          Ĕ: "E",
          Ė: "E",
          Ę: "E",
          Ě: "E",
          ē: "e",
          ĕ: "e",
          ė: "e",
          ę: "e",
          ě: "e",
          Ĝ: "G",
          Ğ: "G",
          Ġ: "G",
          Ģ: "G",
          ĝ: "g",
          ğ: "g",
          ġ: "g",
          ģ: "g",
          Ĥ: "H",
          Ħ: "H",
          ĥ: "h",
          ħ: "h",
          Ĩ: "I",
          Ī: "I",
          Ĭ: "I",
          Į: "I",
          İ: "I",
          ĩ: "i",
          ī: "i",
          ĭ: "i",
          į: "i",
          ı: "i",
          Ĵ: "J",
          ĵ: "j",
          Ķ: "K",
          ķ: "k",
          ĸ: "k",
          Ĺ: "L",
          Ļ: "L",
          Ľ: "L",
          Ŀ: "L",
          Ł: "L",
          ĺ: "l",
          ļ: "l",
          ľ: "l",
          ŀ: "l",
          ł: "l",
          Ń: "N",
          Ņ: "N",
          Ň: "N",
          Ŋ: "N",
          ń: "n",
          ņ: "n",
          ň: "n",
          ŋ: "n",
          Ō: "O",
          Ŏ: "O",
          Ő: "O",
          ō: "o",
          ŏ: "o",
          ő: "o",
          Ŕ: "R",
          Ŗ: "R",
          Ř: "R",
          ŕ: "r",
          ŗ: "r",
          ř: "r",
          Ś: "S",
          Ŝ: "S",
          Ş: "S",
          Š: "S",
          ś: "s",
          ŝ: "s",
          ş: "s",
          š: "s",
          Ţ: "T",
          Ť: "T",
          Ŧ: "T",
          ţ: "t",
          ť: "t",
          ŧ: "t",
          Ũ: "U",
          Ū: "U",
          Ŭ: "U",
          Ů: "U",
          Ű: "U",
          Ų: "U",
          ũ: "u",
          ū: "u",
          ŭ: "u",
          ů: "u",
          ű: "u",
          ų: "u",
          Ŵ: "W",
          ŵ: "w",
          Ŷ: "Y",
          ŷ: "y",
          Ÿ: "Y",
          Ź: "Z",
          Ż: "Z",
          Ž: "Z",
          ź: "z",
          ż: "z",
          ž: "z",
          Ĳ: "IJ",
          ĳ: "ij",
          Œ: "Oe",
          œ: "oe",
          ŉ: "'n",
          ſ: "s",
        }),
        ie = Wn({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        });
      function oe(t) {
        return "\\" + cn[t];
      }
      function ae(t) {
        return nn.test(t);
      }
      function ue(t) {
        var n = -1,
          e = Array(t.size);
        return (
          t.forEach(function (t, r) {
            e[++n] = [r, t];
          }),
          e
        );
      }
      function ce(t, n) {
        return function (e) {
          return t(n(e));
        };
      }
      function se(t, n) {
        for (var e = -1, r = t.length, i = 0, a = []; ++e < r; ) {
          var u = t[e];
          (u !== n && u !== o) || ((t[e] = o), (a[i++] = e));
        }
        return a;
      }
      function le(t) {
        var n = -1,
          e = Array(t.size);
        return (
          t.forEach(function (t) {
            e[++n] = t;
          }),
          e
        );
      }
      function fe(t) {
        var n = -1,
          e = Array(t.size);
        return (
          t.forEach(function (t) {
            e[++n] = [t, t];
          }),
          e
        );
      }
      function he(t) {
        return ae(t)
          ? (function (t) {
              var n = (Kt.lastIndex = 0);
              for (; Kt.test(t); ) ++n;
              return n;
            })(t)
          : qn(t);
      }
      function de(t) {
        return ae(t)
          ? (function (t) {
              return t.match(Kt) || [];
            })(t)
          : (function (t) {
              return t.split("");
            })(t);
      }
      function pe(t) {
        for (var n = t.length; n-- && at.test(t.charAt(n)); );
        return n;
      }
      var ge = Wn({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
      });
      var ve = (function t(n) {
        var Q,
          at = (n =
            null == n ? dn : ve.defaults(dn.Object(), n, ve.pick(dn, rn)))
            .Array,
          Mt = n.Date,
          jt = n.Error,
          kt = n.Function,
          At = n.Math,
          $t = n.Object,
          St = n.RegExp,
          Tt = n.String,
          Nt = n.TypeError,
          Ct = at.prototype,
          Et = kt.prototype,
          It = $t.prototype,
          zt = n["__core-js_shared__"],
          Dt = Et.toString,
          Ot = It.hasOwnProperty,
          Ut = 0,
          qt = (Q = /[^.]+$/.exec((zt && zt.keys && zt.keys.IE_PROTO) || ""))
            ? "Symbol(src)_1." + Q
            : "",
          Vt = It.toString,
          Ft = Dt.call($t),
          Rt = dn._,
          Lt = St(
            "^" +
              Dt.call(Ot)
                .replace(rt, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          Bt = vn ? n.Buffer : e,
          Yt = n.Symbol,
          Pt = n.Uint8Array,
          Wt = Bt ? Bt.allocUnsafe : e,
          Ht = ce($t.getPrototypeOf, $t),
          Gt = $t.create,
          Zt = It.propertyIsEnumerable,
          Xt = Ct.splice,
          Kt = Yt ? Yt.isConcatSpreadable : e,
          nn = Yt ? Yt.iterator : e,
          cn = Yt ? Yt.toStringTag : e,
          fn = (function () {
            try {
              var t = po($t, "defineProperty");
              return t({}, "", {}), t;
            } catch (t) {}
          })(),
          hn = n.clearTimeout !== dn.clearTimeout && n.clearTimeout,
          pn = Mt && Mt.now !== dn.Date.now && Mt.now,
          gn = n.setTimeout !== dn.setTimeout && n.setTimeout,
          yn = At.ceil,
          mn = At.floor,
          qn = $t.getOwnPropertySymbols,
          Wn = Bt ? Bt.isBuffer : e,
          ye = n.isFinite,
          me = Ct.join,
          be = ce($t.keys, $t),
          _e = At.max,
          we = At.min,
          xe = Mt.now,
          Me = n.parseInt,
          je = At.random,
          ke = Ct.reverse,
          Ae = po(n, "DataView"),
          $e = po(n, "Map"),
          Se = po(n, "Promise"),
          Te = po(n, "Set"),
          Ne = po(n, "WeakMap"),
          Ce = po($t, "create"),
          Ee = Ne && new Ne(),
          Ie = {},
          ze = Ro(Ae),
          De = Ro($e),
          Oe = Ro(Se),
          Ue = Ro(Te),
          qe = Ro(Ne),
          Ve = Yt ? Yt.prototype : e,
          Fe = Ve ? Ve.valueOf : e,
          Re = Ve ? Ve.toString : e;
        function Le(t) {
          if (iu(t) && !Ha(t) && !(t instanceof We)) {
            if (t instanceof Pe) return t;
            if (Ot.call(t, "__wrapped__")) return Lo(t);
          }
          return new Pe(t);
        }
        var Be = (function () {
          function t() {}
          return function (n) {
            if (!ru(n)) return {};
            if (Gt) return Gt(n);
            t.prototype = n;
            var r = new t();
            return (t.prototype = e), r;
          };
        })();
        function Ye() {}
        function Pe(t, n) {
          (this.__wrapped__ = t),
            (this.__actions__ = []),
            (this.__chain__ = !!n),
            (this.__index__ = 0),
            (this.__values__ = e);
        }
        function We(t) {
          (this.__wrapped__ = t),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = p),
            (this.__views__ = []);
        }
        function He(t) {
          var n = -1,
            e = null == t ? 0 : t.length;
          for (this.clear(); ++n < e; ) {
            var r = t[n];
            this.set(r[0], r[1]);
          }
        }
        function Ge(t) {
          var n = -1,
            e = null == t ? 0 : t.length;
          for (this.clear(); ++n < e; ) {
            var r = t[n];
            this.set(r[0], r[1]);
          }
        }
        function Ze(t) {
          var n = -1,
            e = null == t ? 0 : t.length;
          for (this.clear(); ++n < e; ) {
            var r = t[n];
            this.set(r[0], r[1]);
          }
        }
        function Xe(t) {
          var n = -1,
            e = null == t ? 0 : t.length;
          for (this.__data__ = new Ze(); ++n < e; ) this.add(t[n]);
        }
        function Je(t) {
          var n = (this.__data__ = new Ge(t));
          this.size = n.size;
        }
        function Qe(t, n) {
          var e = Ha(t),
            r = !e && Wa(t),
            i = !e && !r && Ja(t),
            o = !e && !r && !i && hu(t),
            a = e || r || i || o,
            u = a ? Zn(t.length, Tt) : [],
            c = u.length;
          for (var s in t)
            (!n && !Ot.call(t, s)) ||
              (a &&
                ("length" == s ||
                  (i && ("offset" == s || "parent" == s)) ||
                  (o &&
                    ("buffer" == s ||
                      "byteLength" == s ||
                      "byteOffset" == s)) ||
                  wo(s, c))) ||
              u.push(s);
          return u;
        }
        function Ke(t) {
          var n = t.length;
          return n ? t[Xr(0, n - 1)] : e;
        }
        function tr(t, n) {
          return qo(Ci(t), sr(n, 0, t.length));
        }
        function nr(t) {
          return qo(Ci(t));
        }
        function er(t, n, r) {
          ((r !== e && !Ba(t[n], r)) || (r === e && !(n in t))) && ur(t, n, r);
        }
        function rr(t, n, r) {
          var i = t[n];
          (Ot.call(t, n) && Ba(i, r) && (r !== e || n in t)) || ur(t, n, r);
        }
        function ir(t, n) {
          for (var e = t.length; e--; ) if (Ba(t[e][0], n)) return e;
          return -1;
        }
        function or(t, n, e, r) {
          return (
            pr(t, function (t, i, o) {
              n(r, t, e(t), o);
            }),
            r
          );
        }
        function ar(t, n) {
          return t && Ei(n, zu(n), t);
        }
        function ur(t, n, e) {
          "__proto__" == n && fn
            ? fn(t, n, {
                configurable: !0,
                enumerable: !0,
                value: e,
                writable: !0,
              })
            : (t[n] = e);
        }
        function cr(t, n) {
          for (var r = -1, i = n.length, o = at(i), a = null == t; ++r < i; )
            o[r] = a ? e : Tu(t, n[r]);
          return o;
        }
        function sr(t, n, r) {
          return (
            t == t &&
              (r !== e && (t = t <= r ? t : r),
              n !== e && (t = t >= n ? t : n)),
            t
          );
        }
        function lr(t, n, r, i, o, a) {
          var u,
            c = 1 & n,
            s = 2 & n,
            l = 4 & n;
          if ((r && (u = o ? r(t, i, o, a) : r(t)), u !== e)) return u;
          if (!ru(t)) return t;
          var f = Ha(t);
          if (f) {
            if (
              ((u = (function (t) {
                var n = t.length,
                  e = new t.constructor(n);
                n &&
                  "string" == typeof t[0] &&
                  Ot.call(t, "index") &&
                  ((e.index = t.index), (e.input = t.input));
                return e;
              })(t)),
              !c)
            )
              return Ci(t, u);
          } else {
            var h = yo(t),
              d = h == w || h == x;
            if (Ja(t)) return ki(t, c);
            if (h == k || h == v || (d && !o)) {
              if (((u = s || d ? {} : bo(t)), !c))
                return s
                  ? (function (t, n) {
                      return Ei(t, vo(t), n);
                    })(
                      t,
                      (function (t, n) {
                        return t && Ei(n, Du(n), t);
                      })(u, t)
                    )
                  : (function (t, n) {
                      return Ei(t, go(t), n);
                    })(t, ar(u, t));
            } else {
              if (!un[h]) return o ? t : {};
              u = (function (t, n, e) {
                var r = t.constructor;
                switch (n) {
                  case E:
                    return Ai(t);
                  case m:
                  case b:
                    return new r(+t);
                  case I:
                    return (function (t, n) {
                      var e = n ? Ai(t.buffer) : t.buffer;
                      return new t.constructor(e, t.byteOffset, t.byteLength);
                    })(t, e);
                  case z:
                  case D:
                  case O:
                  case U:
                  case q:
                  case V:
                  case F:
                  case R:
                  case L:
                    return $i(t, e);
                  case M:
                    return new r();
                  case j:
                  case T:
                    return new r(t);
                  case $:
                    return (function (t) {
                      var n = new t.constructor(t.source, pt.exec(t));
                      return (n.lastIndex = t.lastIndex), n;
                    })(t);
                  case S:
                    return new r();
                  case N:
                    return (i = t), Fe ? $t(Fe.call(i)) : {};
                }
                var i;
              })(t, h, c);
            }
          }
          a || (a = new Je());
          var p = a.get(t);
          if (p) return p;
          a.set(t, u),
            su(t)
              ? t.forEach(function (e) {
                  u.add(lr(e, n, r, e, t, a));
                })
              : ou(t) &&
                t.forEach(function (e, i) {
                  u.set(i, lr(e, n, r, i, t, a));
                });
          var g = f ? e : (l ? (s ? ao : oo) : s ? Du : zu)(t);
          return (
            $n(g || t, function (e, i) {
              g && (e = t[(i = e)]), rr(u, i, lr(e, n, r, i, t, a));
            }),
            u
          );
        }
        function fr(t, n, r) {
          var i = r.length;
          if (null == t) return !i;
          for (t = $t(t); i--; ) {
            var o = r[i],
              a = n[o],
              u = t[o];
            if ((u === e && !(o in t)) || !a(u)) return !1;
          }
          return !0;
        }
        function hr(t, n, i) {
          if ("function" != typeof t) throw new Nt(r);
          return zo(function () {
            t.apply(e, i);
          }, n);
        }
        function dr(t, n, e, r) {
          var i = -1,
            o = Cn,
            a = !0,
            u = t.length,
            c = [],
            s = n.length;
          if (!u) return c;
          e && (n = In(n, Jn(e))),
            r
              ? ((o = En), (a = !1))
              : n.length >= 200 && ((o = Kn), (a = !1), (n = new Xe(n)));
          t: for (; ++i < u; ) {
            var l = t[i],
              f = null == e ? l : e(l);
            if (((l = r || 0 !== l ? l : 0), a && f == f)) {
              for (var h = s; h--; ) if (n[h] === f) continue t;
              c.push(l);
            } else o(n, f, r) || c.push(l);
          }
          return c;
        }
        (Le.templateSettings = {
          escape: X,
          evaluate: J,
          interpolate: K,
          variable: "",
          imports: { _: Le },
        }),
          (Le.prototype = Ye.prototype),
          (Le.prototype.constructor = Le),
          (Pe.prototype = Be(Ye.prototype)),
          (Pe.prototype.constructor = Pe),
          (We.prototype = Be(Ye.prototype)),
          (We.prototype.constructor = We),
          (He.prototype.clear = function () {
            (this.__data__ = Ce ? Ce(null) : {}), (this.size = 0);
          }),
          (He.prototype.delete = function (t) {
            var n = this.has(t) && delete this.__data__[t];
            return (this.size -= n ? 1 : 0), n;
          }),
          (He.prototype.get = function (t) {
            var n = this.__data__;
            if (Ce) {
              var r = n[t];
              return r === i ? e : r;
            }
            return Ot.call(n, t) ? n[t] : e;
          }),
          (He.prototype.has = function (t) {
            var n = this.__data__;
            return Ce ? n[t] !== e : Ot.call(n, t);
          }),
          (He.prototype.set = function (t, n) {
            var r = this.__data__;
            return (
              (this.size += this.has(t) ? 0 : 1),
              (r[t] = Ce && n === e ? i : n),
              this
            );
          }),
          (Ge.prototype.clear = function () {
            (this.__data__ = []), (this.size = 0);
          }),
          (Ge.prototype.delete = function (t) {
            var n = this.__data__,
              e = ir(n, t);
            return (
              !(e < 0) &&
              (e == n.length - 1 ? n.pop() : Xt.call(n, e, 1), --this.size, !0)
            );
          }),
          (Ge.prototype.get = function (t) {
            var n = this.__data__,
              r = ir(n, t);
            return r < 0 ? e : n[r][1];
          }),
          (Ge.prototype.has = function (t) {
            return ir(this.__data__, t) > -1;
          }),
          (Ge.prototype.set = function (t, n) {
            var e = this.__data__,
              r = ir(e, t);
            return r < 0 ? (++this.size, e.push([t, n])) : (e[r][1] = n), this;
          }),
          (Ze.prototype.clear = function () {
            (this.size = 0),
              (this.__data__ = {
                hash: new He(),
                map: new ($e || Ge)(),
                string: new He(),
              });
          }),
          (Ze.prototype.delete = function (t) {
            var n = fo(this, t).delete(t);
            return (this.size -= n ? 1 : 0), n;
          }),
          (Ze.prototype.get = function (t) {
            return fo(this, t).get(t);
          }),
          (Ze.prototype.has = function (t) {
            return fo(this, t).has(t);
          }),
          (Ze.prototype.set = function (t, n) {
            var e = fo(this, t),
              r = e.size;
            return e.set(t, n), (this.size += e.size == r ? 0 : 1), this;
          }),
          (Xe.prototype.add = Xe.prototype.push =
            function (t) {
              return this.__data__.set(t, i), this;
            }),
          (Xe.prototype.has = function (t) {
            return this.__data__.has(t);
          }),
          (Je.prototype.clear = function () {
            (this.__data__ = new Ge()), (this.size = 0);
          }),
          (Je.prototype.delete = function (t) {
            var n = this.__data__,
              e = n.delete(t);
            return (this.size = n.size), e;
          }),
          (Je.prototype.get = function (t) {
            return this.__data__.get(t);
          }),
          (Je.prototype.has = function (t) {
            return this.__data__.has(t);
          }),
          (Je.prototype.set = function (t, n) {
            var e = this.__data__;
            if (e instanceof Ge) {
              var r = e.__data__;
              if (!$e || r.length < 199)
                return r.push([t, n]), (this.size = ++e.size), this;
              e = this.__data__ = new Ze(r);
            }
            return e.set(t, n), (this.size = e.size), this;
          });
        var pr = Di(xr),
          gr = Di(Mr, !0);
        function vr(t, n) {
          var e = !0;
          return (
            pr(t, function (t, r, i) {
              return (e = !!n(t, r, i));
            }),
            e
          );
        }
        function yr(t, n, r) {
          for (var i = -1, o = t.length; ++i < o; ) {
            var a = t[i],
              u = n(a);
            if (null != u && (c === e ? u == u && !fu(u) : r(u, c)))
              var c = u,
                s = a;
          }
          return s;
        }
        function mr(t, n) {
          var e = [];
          return (
            pr(t, function (t, r, i) {
              n(t, r, i) && e.push(t);
            }),
            e
          );
        }
        function br(t, n, e, r, i) {
          var o = -1,
            a = t.length;
          for (e || (e = _o), i || (i = []); ++o < a; ) {
            var u = t[o];
            n > 0 && e(u)
              ? n > 1
                ? br(u, n - 1, e, r, i)
                : zn(i, u)
              : r || (i[i.length] = u);
          }
          return i;
        }
        var _r = Oi(),
          wr = Oi(!0);
        function xr(t, n) {
          return t && _r(t, n, zu);
        }
        function Mr(t, n) {
          return t && wr(t, n, zu);
        }
        function jr(t, n) {
          return Nn(n, function (n) {
            return tu(t[n]);
          });
        }
        function kr(t, n) {
          for (var r = 0, i = (n = wi(n, t)).length; null != t && r < i; )
            t = t[Fo(n[r++])];
          return r && r == i ? t : e;
        }
        function Ar(t, n, e) {
          var r = n(t);
          return Ha(t) ? r : zn(r, e(t));
        }
        function $r(t) {
          return null == t
            ? t === e
              ? "[object Undefined]"
              : "[object Null]"
            : cn && cn in $t(t)
            ? (function (t) {
                var n = Ot.call(t, cn),
                  r = t[cn];
                try {
                  t[cn] = e;
                  var i = !0;
                } catch (t) {}
                var o = Vt.call(t);
                i && (n ? (t[cn] = r) : delete t[cn]);
                return o;
              })(t)
            : (function (t) {
                return Vt.call(t);
              })(t);
        }
        function Sr(t, n) {
          return t > n;
        }
        function Tr(t, n) {
          return null != t && Ot.call(t, n);
        }
        function Nr(t, n) {
          return null != t && n in $t(t);
        }
        function Cr(t, n, r) {
          for (
            var i = r ? En : Cn,
              o = t[0].length,
              a = t.length,
              u = a,
              c = at(a),
              s = 1 / 0,
              l = [];
            u--;

          ) {
            var f = t[u];
            u && n && (f = In(f, Jn(n))),
              (s = we(f.length, s)),
              (c[u] =
                !r && (n || (o >= 120 && f.length >= 120))
                  ? new Xe(u && f)
                  : e);
          }
          f = t[0];
          var h = -1,
            d = c[0];
          t: for (; ++h < o && l.length < s; ) {
            var p = f[h],
              g = n ? n(p) : p;
            if (((p = r || 0 !== p ? p : 0), !(d ? Kn(d, g) : i(l, g, r)))) {
              for (u = a; --u; ) {
                var v = c[u];
                if (!(v ? Kn(v, g) : i(t[u], g, r))) continue t;
              }
              d && d.push(g), l.push(p);
            }
          }
          return l;
        }
        function Er(t, n, r) {
          var i = null == (t = No(t, (n = wi(n, t)))) ? t : t[Fo(Ko(n))];
          return null == i ? e : kn(i, t, r);
        }
        function Ir(t) {
          return iu(t) && $r(t) == v;
        }
        function zr(t, n, r, i, o) {
          return (
            t === n ||
            (null == t || null == n || (!iu(t) && !iu(n))
              ? t != t && n != n
              : (function (t, n, r, i, o, a) {
                  var u = Ha(t),
                    c = Ha(n),
                    s = u ? y : yo(t),
                    l = c ? y : yo(n),
                    f = (s = s == v ? k : s) == k,
                    h = (l = l == v ? k : l) == k,
                    d = s == l;
                  if (d && Ja(t)) {
                    if (!Ja(n)) return !1;
                    (u = !0), (f = !1);
                  }
                  if (d && !f)
                    return (
                      a || (a = new Je()),
                      u || hu(t)
                        ? ro(t, n, r, i, o, a)
                        : (function (t, n, e, r, i, o, a) {
                            switch (e) {
                              case I:
                                if (
                                  t.byteLength != n.byteLength ||
                                  t.byteOffset != n.byteOffset
                                )
                                  return !1;
                                (t = t.buffer), (n = n.buffer);
                              case E:
                                return !(
                                  t.byteLength != n.byteLength ||
                                  !o(new Pt(t), new Pt(n))
                                );
                              case m:
                              case b:
                              case j:
                                return Ba(+t, +n);
                              case _:
                                return (
                                  t.name == n.name && t.message == n.message
                                );
                              case $:
                              case T:
                                return t == n + "";
                              case M:
                                var u = ue;
                              case S:
                                var c = 1 & r;
                                if ((u || (u = le), t.size != n.size && !c))
                                  return !1;
                                var s = a.get(t);
                                if (s) return s == n;
                                (r |= 2), a.set(t, n);
                                var l = ro(u(t), u(n), r, i, o, a);
                                return a.delete(t), l;
                              case N:
                                if (Fe) return Fe.call(t) == Fe.call(n);
                            }
                            return !1;
                          })(t, n, s, r, i, o, a)
                    );
                  if (!(1 & r)) {
                    var p = f && Ot.call(t, "__wrapped__"),
                      g = h && Ot.call(n, "__wrapped__");
                    if (p || g) {
                      var w = p ? t.value() : t,
                        x = g ? n.value() : n;
                      return a || (a = new Je()), o(w, x, r, i, a);
                    }
                  }
                  if (!d) return !1;
                  return (
                    a || (a = new Je()),
                    (function (t, n, r, i, o, a) {
                      var u = 1 & r,
                        c = oo(t),
                        s = c.length,
                        l = oo(n).length;
                      if (s != l && !u) return !1;
                      var f = s;
                      for (; f--; ) {
                        var h = c[f];
                        if (!(u ? h in n : Ot.call(n, h))) return !1;
                      }
                      var d = a.get(t),
                        p = a.get(n);
                      if (d && p) return d == n && p == t;
                      var g = !0;
                      a.set(t, n), a.set(n, t);
                      var v = u;
                      for (; ++f < s; ) {
                        var y = t[(h = c[f])],
                          m = n[h];
                        if (i)
                          var b = u ? i(m, y, h, n, t, a) : i(y, m, h, t, n, a);
                        if (!(b === e ? y === m || o(y, m, r, i, a) : b)) {
                          g = !1;
                          break;
                        }
                        v || (v = "constructor" == h);
                      }
                      if (g && !v) {
                        var _ = t.constructor,
                          w = n.constructor;
                        _ == w ||
                          !("constructor" in t) ||
                          !("constructor" in n) ||
                          ("function" == typeof _ &&
                            _ instanceof _ &&
                            "function" == typeof w &&
                            w instanceof w) ||
                          (g = !1);
                      }
                      return a.delete(t), a.delete(n), g;
                    })(t, n, r, i, o, a)
                  );
                })(t, n, r, i, zr, o))
          );
        }
        function Dr(t, n, r, i) {
          var o = r.length,
            a = o,
            u = !i;
          if (null == t) return !a;
          for (t = $t(t); o--; ) {
            var c = r[o];
            if (u && c[2] ? c[1] !== t[c[0]] : !(c[0] in t)) return !1;
          }
          for (; ++o < a; ) {
            var s = (c = r[o])[0],
              l = t[s],
              f = c[1];
            if (u && c[2]) {
              if (l === e && !(s in t)) return !1;
            } else {
              var h = new Je();
              if (i) var d = i(l, f, s, t, n, h);
              if (!(d === e ? zr(f, l, 3, i, h) : d)) return !1;
            }
          }
          return !0;
        }
        function Or(t) {
          return (
            !(!ru(t) || ((n = t), qt && qt in n)) &&
            (tu(t) ? Lt : yt).test(Ro(t))
          );
          var n;
        }
        function Ur(t) {
          return "function" == typeof t
            ? t
            : null == t
            ? ac
            : "object" == typeof t
            ? Ha(t)
              ? Br(t[0], t[1])
              : Lr(t)
            : gc(t);
        }
        function qr(t) {
          if (!Ao(t)) return be(t);
          var n = [];
          for (var e in $t(t)) Ot.call(t, e) && "constructor" != e && n.push(e);
          return n;
        }
        function Vr(t) {
          if (!ru(t))
            return (function (t) {
              var n = [];
              if (null != t) for (var e in $t(t)) n.push(e);
              return n;
            })(t);
          var n = Ao(t),
            e = [];
          for (var r in t)
            ("constructor" != r || (!n && Ot.call(t, r))) && e.push(r);
          return e;
        }
        function Fr(t, n) {
          return t < n;
        }
        function Rr(t, n) {
          var e = -1,
            r = Za(t) ? at(t.length) : [];
          return (
            pr(t, function (t, i, o) {
              r[++e] = n(t, i, o);
            }),
            r
          );
        }
        function Lr(t) {
          var n = ho(t);
          return 1 == n.length && n[0][2]
            ? So(n[0][0], n[0][1])
            : function (e) {
                return e === t || Dr(e, t, n);
              };
        }
        function Br(t, n) {
          return Mo(t) && $o(n)
            ? So(Fo(t), n)
            : function (r) {
                var i = Tu(r, t);
                return i === e && i === n ? Nu(r, t) : zr(n, i, 3);
              };
        }
        function Yr(t, n, r, i, o) {
          t !== n &&
            _r(
              n,
              function (a, u) {
                if ((o || (o = new Je()), ru(a)))
                  !(function (t, n, r, i, o, a, u) {
                    var c = Eo(t, r),
                      s = Eo(n, r),
                      l = u.get(s);
                    if (l) return void er(t, r, l);
                    var f = a ? a(c, s, r + "", t, n, u) : e,
                      h = f === e;
                    if (h) {
                      var d = Ha(s),
                        p = !d && Ja(s),
                        g = !d && !p && hu(s);
                      (f = s),
                        d || p || g
                          ? Ha(c)
                            ? (f = c)
                            : Xa(c)
                            ? (f = Ci(c))
                            : p
                            ? ((h = !1), (f = ki(s, !0)))
                            : g
                            ? ((h = !1), (f = $i(s, !0)))
                            : (f = [])
                          : uu(s) || Wa(s)
                          ? ((f = c),
                            Wa(c)
                              ? (f = _u(c))
                              : (ru(c) && !tu(c)) || (f = bo(s)))
                          : (h = !1);
                    }
                    h && (u.set(s, f), o(f, s, i, a, u), u.delete(s));
                    er(t, r, f);
                  })(t, n, u, r, Yr, i, o);
                else {
                  var c = i ? i(Eo(t, u), a, u + "", t, n, o) : e;
                  c === e && (c = a), er(t, u, c);
                }
              },
              Du
            );
        }
        function Pr(t, n) {
          var r = t.length;
          if (r) return wo((n += n < 0 ? r : 0), r) ? t[n] : e;
        }
        function Wr(t, n, e) {
          n = n.length
            ? In(n, function (t) {
                return Ha(t)
                  ? function (n) {
                      return kr(n, 1 === t.length ? t[0] : t);
                    }
                  : t;
              })
            : [ac];
          var r = -1;
          return (
            (n = In(n, Jn(lo()))),
            (function (t, n) {
              var e = t.length;
              for (t.sort(n); e--; ) t[e] = t[e].value;
              return t;
            })(
              Rr(t, function (t, e, i) {
                return {
                  criteria: In(n, function (n) {
                    return n(t);
                  }),
                  index: ++r,
                  value: t,
                };
              }),
              function (t, n) {
                return (function (t, n, e) {
                  var r = -1,
                    i = t.criteria,
                    o = n.criteria,
                    a = i.length,
                    u = e.length;
                  for (; ++r < a; ) {
                    var c = Si(i[r], o[r]);
                    if (c) return r >= u ? c : c * ("desc" == e[r] ? -1 : 1);
                  }
                  return t.index - n.index;
                })(t, n, e);
              }
            )
          );
        }
        function Hr(t, n, e) {
          for (var r = -1, i = n.length, o = {}; ++r < i; ) {
            var a = n[r],
              u = kr(t, a);
            e(u, a) && ni(o, wi(a, t), u);
          }
          return o;
        }
        function Gr(t, n, e, r) {
          var i = r ? Ln : Rn,
            o = -1,
            a = n.length,
            u = t;
          for (t === n && (n = Ci(n)), e && (u = In(t, Jn(e))); ++o < a; )
            for (
              var c = 0, s = n[o], l = e ? e(s) : s;
              (c = i(u, l, c, r)) > -1;

            )
              u !== t && Xt.call(u, c, 1), Xt.call(t, c, 1);
          return t;
        }
        function Zr(t, n) {
          for (var e = t ? n.length : 0, r = e - 1; e--; ) {
            var i = n[e];
            if (e == r || i !== o) {
              var o = i;
              wo(i) ? Xt.call(t, i, 1) : di(t, i);
            }
          }
          return t;
        }
        function Xr(t, n) {
          return t + mn(je() * (n - t + 1));
        }
        function Jr(t, n) {
          var e = "";
          if (!t || n < 1 || n > h) return e;
          do {
            n % 2 && (e += t), (n = mn(n / 2)) && (t += t);
          } while (n);
          return e;
        }
        function Qr(t, n) {
          return Do(To(t, n, ac), t + "");
        }
        function Kr(t) {
          return Ke(Bu(t));
        }
        function ti(t, n) {
          var e = Bu(t);
          return qo(e, sr(n, 0, e.length));
        }
        function ni(t, n, r, i) {
          if (!ru(t)) return t;
          for (
            var o = -1, a = (n = wi(n, t)).length, u = a - 1, c = t;
            null != c && ++o < a;

          ) {
            var s = Fo(n[o]),
              l = r;
            if ("__proto__" === s || "constructor" === s || "prototype" === s)
              return t;
            if (o != u) {
              var f = c[s];
              (l = i ? i(f, s, c) : e) === e &&
                (l = ru(f) ? f : wo(n[o + 1]) ? [] : {});
            }
            rr(c, s, l), (c = c[s]);
          }
          return t;
        }
        var ei = Ee
            ? function (t, n) {
                return Ee.set(t, n), t;
              }
            : ac,
          ri = fn
            ? function (t, n) {
                return fn(t, "toString", {
                  configurable: !0,
                  enumerable: !1,
                  value: rc(n),
                  writable: !0,
                });
              }
            : ac;
        function ii(t) {
          return qo(Bu(t));
        }
        function oi(t, n, e) {
          var r = -1,
            i = t.length;
          n < 0 && (n = -n > i ? 0 : i + n),
            (e = e > i ? i : e) < 0 && (e += i),
            (i = n > e ? 0 : (e - n) >>> 0),
            (n >>>= 0);
          for (var o = at(i); ++r < i; ) o[r] = t[r + n];
          return o;
        }
        function ai(t, n) {
          var e;
          return (
            pr(t, function (t, r, i) {
              return !(e = n(t, r, i));
            }),
            !!e
          );
        }
        function ui(t, n, e) {
          var r = 0,
            i = null == t ? r : t.length;
          if ("number" == typeof n && n == n && i <= 2147483647) {
            for (; r < i; ) {
              var o = (r + i) >>> 1,
                a = t[o];
              null !== a && !fu(a) && (e ? a <= n : a < n)
                ? (r = o + 1)
                : (i = o);
            }
            return i;
          }
          return ci(t, n, ac, e);
        }
        function ci(t, n, r, i) {
          var o = 0,
            a = null == t ? 0 : t.length;
          if (0 === a) return 0;
          for (
            var u = (n = r(n)) != n, c = null === n, s = fu(n), l = n === e;
            o < a;

          ) {
            var f = mn((o + a) / 2),
              h = r(t[f]),
              d = h !== e,
              p = null === h,
              g = h == h,
              v = fu(h);
            if (u) var y = i || g;
            else
              y = l
                ? g && (i || d)
                : c
                ? g && d && (i || !p)
                : s
                ? g && d && !p && (i || !v)
                : !p && !v && (i ? h <= n : h < n);
            y ? (o = f + 1) : (a = f);
          }
          return we(a, 4294967294);
        }
        function si(t, n) {
          for (var e = -1, r = t.length, i = 0, o = []; ++e < r; ) {
            var a = t[e],
              u = n ? n(a) : a;
            if (!e || !Ba(u, c)) {
              var c = u;
              o[i++] = 0 === a ? 0 : a;
            }
          }
          return o;
        }
        function li(t) {
          return "number" == typeof t ? t : fu(t) ? d : +t;
        }
        function fi(t) {
          if ("string" == typeof t) return t;
          if (Ha(t)) return In(t, fi) + "";
          if (fu(t)) return Re ? Re.call(t) : "";
          var n = t + "";
          return "0" == n && 1 / t == -1 / 0 ? "-0" : n;
        }
        function hi(t, n, e) {
          var r = -1,
            i = Cn,
            o = t.length,
            a = !0,
            u = [],
            c = u;
          if (e) (a = !1), (i = En);
          else if (o >= 200) {
            var s = n ? null : Ji(t);
            if (s) return le(s);
            (a = !1), (i = Kn), (c = new Xe());
          } else c = n ? [] : u;
          t: for (; ++r < o; ) {
            var l = t[r],
              f = n ? n(l) : l;
            if (((l = e || 0 !== l ? l : 0), a && f == f)) {
              for (var h = c.length; h--; ) if (c[h] === f) continue t;
              n && c.push(f), u.push(l);
            } else i(c, f, e) || (c !== u && c.push(f), u.push(l));
          }
          return u;
        }
        function di(t, n) {
          return null == (t = No(t, (n = wi(n, t)))) || delete t[Fo(Ko(n))];
        }
        function pi(t, n, e, r) {
          return ni(t, n, e(kr(t, n)), r);
        }
        function gi(t, n, e, r) {
          for (
            var i = t.length, o = r ? i : -1;
            (r ? o-- : ++o < i) && n(t[o], o, t);

          );
          return e
            ? oi(t, r ? 0 : o, r ? o + 1 : i)
            : oi(t, r ? o + 1 : 0, r ? i : o);
        }
        function vi(t, n) {
          var e = t;
          return (
            e instanceof We && (e = e.value()),
            Dn(
              n,
              function (t, n) {
                return n.func.apply(n.thisArg, zn([t], n.args));
              },
              e
            )
          );
        }
        function yi(t, n, e) {
          var r = t.length;
          if (r < 2) return r ? hi(t[0]) : [];
          for (var i = -1, o = at(r); ++i < r; )
            for (var a = t[i], u = -1; ++u < r; )
              u != i && (o[i] = dr(o[i] || a, t[u], n, e));
          return hi(br(o, 1), n, e);
        }
        function mi(t, n, r) {
          for (var i = -1, o = t.length, a = n.length, u = {}; ++i < o; ) {
            var c = i < a ? n[i] : e;
            r(u, t[i], c);
          }
          return u;
        }
        function bi(t) {
          return Xa(t) ? t : [];
        }
        function _i(t) {
          return "function" == typeof t ? t : ac;
        }
        function wi(t, n) {
          return Ha(t) ? t : Mo(t, n) ? [t] : Vo(wu(t));
        }
        var xi = Qr;
        function Mi(t, n, r) {
          var i = t.length;
          return (r = r === e ? i : r), !n && r >= i ? t : oi(t, n, r);
        }
        var ji =
          hn ||
          function (t) {
            return dn.clearTimeout(t);
          };
        function ki(t, n) {
          if (n) return t.slice();
          var e = t.length,
            r = Wt ? Wt(e) : new t.constructor(e);
          return t.copy(r), r;
        }
        function Ai(t) {
          var n = new t.constructor(t.byteLength);
          return new Pt(n).set(new Pt(t)), n;
        }
        function $i(t, n) {
          var e = n ? Ai(t.buffer) : t.buffer;
          return new t.constructor(e, t.byteOffset, t.length);
        }
        function Si(t, n) {
          if (t !== n) {
            var r = t !== e,
              i = null === t,
              o = t == t,
              a = fu(t),
              u = n !== e,
              c = null === n,
              s = n == n,
              l = fu(n);
            if (
              (!c && !l && !a && t > n) ||
              (a && u && s && !c && !l) ||
              (i && u && s) ||
              (!r && s) ||
              !o
            )
              return 1;
            if (
              (!i && !a && !l && t < n) ||
              (l && r && o && !i && !a) ||
              (c && r && o) ||
              (!u && o) ||
              !s
            )
              return -1;
          }
          return 0;
        }
        function Ti(t, n, e, r) {
          for (
            var i = -1,
              o = t.length,
              a = e.length,
              u = -1,
              c = n.length,
              s = _e(o - a, 0),
              l = at(c + s),
              f = !r;
            ++u < c;

          )
            l[u] = n[u];
          for (; ++i < a; ) (f || i < o) && (l[e[i]] = t[i]);
          for (; s--; ) l[u++] = t[i++];
          return l;
        }
        function Ni(t, n, e, r) {
          for (
            var i = -1,
              o = t.length,
              a = -1,
              u = e.length,
              c = -1,
              s = n.length,
              l = _e(o - u, 0),
              f = at(l + s),
              h = !r;
            ++i < l;

          )
            f[i] = t[i];
          for (var d = i; ++c < s; ) f[d + c] = n[c];
          for (; ++a < u; ) (h || i < o) && (f[d + e[a]] = t[i++]);
          return f;
        }
        function Ci(t, n) {
          var e = -1,
            r = t.length;
          for (n || (n = at(r)); ++e < r; ) n[e] = t[e];
          return n;
        }
        function Ei(t, n, r, i) {
          var o = !r;
          r || (r = {});
          for (var a = -1, u = n.length; ++a < u; ) {
            var c = n[a],
              s = i ? i(r[c], t[c], c, r, t) : e;
            s === e && (s = t[c]), o ? ur(r, c, s) : rr(r, c, s);
          }
          return r;
        }
        function Ii(t, n) {
          return function (e, r) {
            var i = Ha(e) ? An : or,
              o = n ? n() : {};
            return i(e, t, lo(r, 2), o);
          };
        }
        function zi(t) {
          return Qr(function (n, r) {
            var i = -1,
              o = r.length,
              a = o > 1 ? r[o - 1] : e,
              u = o > 2 ? r[2] : e;
            for (
              a = t.length > 3 && "function" == typeof a ? (o--, a) : e,
                u && xo(r[0], r[1], u) && ((a = o < 3 ? e : a), (o = 1)),
                n = $t(n);
              ++i < o;

            ) {
              var c = r[i];
              c && t(n, c, i, a);
            }
            return n;
          });
        }
        function Di(t, n) {
          return function (e, r) {
            if (null == e) return e;
            if (!Za(e)) return t(e, r);
            for (
              var i = e.length, o = n ? i : -1, a = $t(e);
              (n ? o-- : ++o < i) && !1 !== r(a[o], o, a);

            );
            return e;
          };
        }
        function Oi(t) {
          return function (n, e, r) {
            for (var i = -1, o = $t(n), a = r(n), u = a.length; u--; ) {
              var c = a[t ? u : ++i];
              if (!1 === e(o[c], c, o)) break;
            }
            return n;
          };
        }
        function Ui(t) {
          return function (n) {
            var r = ae((n = wu(n))) ? de(n) : e,
              i = r ? r[0] : n.charAt(0),
              o = r ? Mi(r, 1).join("") : n.slice(1);
            return i[t]() + o;
          };
        }
        function qi(t) {
          return function (n) {
            return Dn(tc(Wu(n).replace(Jt, "")), t, "");
          };
        }
        function Vi(t) {
          return function () {
            var n = arguments;
            switch (n.length) {
              case 0:
                return new t();
              case 1:
                return new t(n[0]);
              case 2:
                return new t(n[0], n[1]);
              case 3:
                return new t(n[0], n[1], n[2]);
              case 4:
                return new t(n[0], n[1], n[2], n[3]);
              case 5:
                return new t(n[0], n[1], n[2], n[3], n[4]);
              case 6:
                return new t(n[0], n[1], n[2], n[3], n[4], n[5]);
              case 7:
                return new t(n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
            }
            var e = Be(t.prototype),
              r = t.apply(e, n);
            return ru(r) ? r : e;
          };
        }
        function Fi(t) {
          return function (n, r, i) {
            var o = $t(n);
            if (!Za(n)) {
              var a = lo(r, 3);
              (n = zu(n)),
                (r = function (t) {
                  return a(o[t], t, o);
                });
            }
            var u = t(n, r, i);
            return u > -1 ? o[a ? n[u] : u] : e;
          };
        }
        function Ri(t) {
          return io(function (n) {
            var i = n.length,
              o = i,
              a = Pe.prototype.thru;
            for (t && n.reverse(); o--; ) {
              var u = n[o];
              if ("function" != typeof u) throw new Nt(r);
              if (a && !c && "wrapper" == co(u)) var c = new Pe([], !0);
            }
            for (o = c ? o : i; ++o < i; ) {
              var s = co((u = n[o])),
                l = "wrapper" == s ? uo(u) : e;
              c =
                l && jo(l[0]) && 424 == l[1] && !l[4].length && 1 == l[9]
                  ? c[co(l[0])].apply(c, l[3])
                  : 1 == u.length && jo(u)
                  ? c[s]()
                  : c.thru(u);
            }
            return function () {
              var t = arguments,
                e = t[0];
              if (c && 1 == t.length && Ha(e)) return c.plant(e).value();
              for (var r = 0, o = i ? n[r].apply(this, t) : e; ++r < i; )
                o = n[r].call(this, o);
              return o;
            };
          });
        }
        function Li(t, n, r, i, o, a, u, c, l, f) {
          var h = n & s,
            d = 1 & n,
            p = 2 & n,
            g = 24 & n,
            v = 512 & n,
            y = p ? e : Vi(t);
          return function e() {
            for (var s = arguments.length, m = at(s), b = s; b--; )
              m[b] = arguments[b];
            if (g)
              var _ = so(e),
                w = ee(m, _);
            if (
              (i && (m = Ti(m, i, o, g)),
              a && (m = Ni(m, a, u, g)),
              (s -= w),
              g && s < f)
            ) {
              var x = se(m, _);
              return Zi(t, n, Li, e.placeholder, r, m, x, c, l, f - s);
            }
            var M = d ? r : this,
              j = p ? M[t] : t;
            return (
              (s = m.length),
              c ? (m = Co(m, c)) : v && s > 1 && m.reverse(),
              h && l < s && (m.length = l),
              this && this !== dn && this instanceof e && (j = y || Vi(j)),
              j.apply(M, m)
            );
          };
        }
        function Bi(t, n) {
          return function (e, r) {
            return (function (t, n, e, r) {
              return (
                xr(t, function (t, i, o) {
                  n(r, e(t), i, o);
                }),
                r
              );
            })(e, t, n(r), {});
          };
        }
        function Yi(t, n) {
          return function (r, i) {
            var o;
            if (r === e && i === e) return n;
            if ((r !== e && (o = r), i !== e)) {
              if (o === e) return i;
              "string" == typeof r || "string" == typeof i
                ? ((r = fi(r)), (i = fi(i)))
                : ((r = li(r)), (i = li(i))),
                (o = t(r, i));
            }
            return o;
          };
        }
        function Pi(t) {
          return io(function (n) {
            return (
              (n = In(n, Jn(lo()))),
              Qr(function (e) {
                var r = this;
                return t(n, function (t) {
                  return kn(t, r, e);
                });
              })
            );
          });
        }
        function Wi(t, n) {
          var r = (n = n === e ? " " : fi(n)).length;
          if (r < 2) return r ? Jr(n, t) : n;
          var i = Jr(n, yn(t / he(n)));
          return ae(n) ? Mi(de(i), 0, t).join("") : i.slice(0, t);
        }
        function Hi(t) {
          return function (n, r, i) {
            return (
              i && "number" != typeof i && xo(n, r, i) && (r = i = e),
              (n = vu(n)),
              r === e ? ((r = n), (n = 0)) : (r = vu(r)),
              (function (t, n, e, r) {
                for (
                  var i = -1, o = _e(yn((n - t) / (e || 1)), 0), a = at(o);
                  o--;

                )
                  (a[r ? o : ++i] = t), (t += e);
                return a;
              })(n, r, (i = i === e ? (n < r ? 1 : -1) : vu(i)), t)
            );
          };
        }
        function Gi(t) {
          return function (n, e) {
            return (
              ("string" == typeof n && "string" == typeof e) ||
                ((n = bu(n)), (e = bu(e))),
              t(n, e)
            );
          };
        }
        function Zi(t, n, r, i, o, a, s, l, f, h) {
          var d = 8 & n;
          (n |= d ? u : c), 4 & (n &= ~(d ? c : u)) || (n &= -4);
          var p = [
              t,
              n,
              o,
              d ? a : e,
              d ? s : e,
              d ? e : a,
              d ? e : s,
              l,
              f,
              h,
            ],
            g = r.apply(e, p);
          return jo(t) && Io(g, p), (g.placeholder = i), Oo(g, t, n);
        }
        function Xi(t) {
          var n = At[t];
          return function (t, e) {
            if (((t = bu(t)), (e = null == e ? 0 : we(yu(e), 292)) && ye(t))) {
              var r = (wu(t) + "e").split("e");
              return +(
                (r = (wu(n(r[0] + "e" + (+r[1] + e))) + "e").split("e"))[0] +
                "e" +
                (+r[1] - e)
              );
            }
            return n(t);
          };
        }
        var Ji =
          Te && 1 / le(new Te([, -0]))[1] == f
            ? function (t) {
                return new Te(t);
              }
            : fc;
        function Qi(t) {
          return function (n) {
            var e = yo(n);
            return e == M
              ? ue(n)
              : e == S
              ? fe(n)
              : (function (t, n) {
                  return In(n, function (n) {
                    return [n, t[n]];
                  });
                })(n, t(n));
          };
        }
        function Ki(t, n, i, f, h, d, p, g) {
          var v = 2 & n;
          if (!v && "function" != typeof t) throw new Nt(r);
          var y = f ? f.length : 0;
          if (
            (y || ((n &= -97), (f = h = e)),
            (p = p === e ? p : _e(yu(p), 0)),
            (g = g === e ? g : yu(g)),
            (y -= h ? h.length : 0),
            n & c)
          ) {
            var m = f,
              b = h;
            f = h = e;
          }
          var _ = v ? e : uo(t),
            w = [t, n, i, f, h, m, b, d, p, g];
          if (
            (_ &&
              (function (t, n) {
                var e = t[1],
                  r = n[1],
                  i = e | r,
                  a = i < 131,
                  u =
                    (r == s && 8 == e) ||
                    (r == s && e == l && t[7].length <= n[8]) ||
                    (384 == r && n[7].length <= n[8] && 8 == e);
                if (!a && !u) return t;
                1 & r && ((t[2] = n[2]), (i |= 1 & e ? 0 : 4));
                var c = n[3];
                if (c) {
                  var f = t[3];
                  (t[3] = f ? Ti(f, c, n[4]) : c),
                    (t[4] = f ? se(t[3], o) : n[4]);
                }
                (c = n[5]) &&
                  ((f = t[5]),
                  (t[5] = f ? Ni(f, c, n[6]) : c),
                  (t[6] = f ? se(t[5], o) : n[6]));
                (c = n[7]) && (t[7] = c);
                r & s && (t[8] = null == t[8] ? n[8] : we(t[8], n[8]));
                null == t[9] && (t[9] = n[9]);
                (t[0] = n[0]), (t[1] = i);
              })(w, _),
            (t = w[0]),
            (n = w[1]),
            (i = w[2]),
            (f = w[3]),
            (h = w[4]),
            !(g = w[9] = w[9] === e ? (v ? 0 : t.length) : _e(w[9] - y, 0)) &&
              24 & n &&
              (n &= -25),
            n && 1 != n)
          )
            x =
              8 == n || n == a
                ? (function (t, n, r) {
                    var i = Vi(t);
                    return function o() {
                      for (
                        var a = arguments.length, u = at(a), c = a, s = so(o);
                        c--;

                      )
                        u[c] = arguments[c];
                      var l =
                        a < 3 && u[0] !== s && u[a - 1] !== s ? [] : se(u, s);
                      return (a -= l.length) < r
                        ? Zi(t, n, Li, o.placeholder, e, u, l, e, e, r - a)
                        : kn(
                            this && this !== dn && this instanceof o ? i : t,
                            this,
                            u
                          );
                    };
                  })(t, n, g)
                : (n != u && 33 != n) || h.length
                ? Li.apply(e, w)
                : (function (t, n, e, r) {
                    var i = 1 & n,
                      o = Vi(t);
                    return function n() {
                      for (
                        var a = -1,
                          u = arguments.length,
                          c = -1,
                          s = r.length,
                          l = at(s + u),
                          f = this && this !== dn && this instanceof n ? o : t;
                        ++c < s;

                      )
                        l[c] = r[c];
                      for (; u--; ) l[c++] = arguments[++a];
                      return kn(f, i ? e : this, l);
                    };
                  })(t, n, i, f);
          else
            var x = (function (t, n, e) {
              var r = 1 & n,
                i = Vi(t);
              return function n() {
                return (this && this !== dn && this instanceof n ? i : t).apply(
                  r ? e : this,
                  arguments
                );
              };
            })(t, n, i);
          return Oo((_ ? ei : Io)(x, w), t, n);
        }
        function to(t, n, r, i) {
          return t === e || (Ba(t, It[r]) && !Ot.call(i, r)) ? n : t;
        }
        function no(t, n, r, i, o, a) {
          return (
            ru(t) && ru(n) && (a.set(n, t), Yr(t, n, e, no, a), a.delete(n)), t
          );
        }
        function eo(t) {
          return uu(t) ? e : t;
        }
        function ro(t, n, r, i, o, a) {
          var u = 1 & r,
            c = t.length,
            s = n.length;
          if (c != s && !(u && s > c)) return !1;
          var l = a.get(t),
            f = a.get(n);
          if (l && f) return l == n && f == t;
          var h = -1,
            d = !0,
            p = 2 & r ? new Xe() : e;
          for (a.set(t, n), a.set(n, t); ++h < c; ) {
            var g = t[h],
              v = n[h];
            if (i) var y = u ? i(v, g, h, n, t, a) : i(g, v, h, t, n, a);
            if (y !== e) {
              if (y) continue;
              d = !1;
              break;
            }
            if (p) {
              if (
                !Un(n, function (t, n) {
                  if (!Kn(p, n) && (g === t || o(g, t, r, i, a)))
                    return p.push(n);
                })
              ) {
                d = !1;
                break;
              }
            } else if (g !== v && !o(g, v, r, i, a)) {
              d = !1;
              break;
            }
          }
          return a.delete(t), a.delete(n), d;
        }
        function io(t) {
          return Do(To(t, e, Go), t + "");
        }
        function oo(t) {
          return Ar(t, zu, go);
        }
        function ao(t) {
          return Ar(t, Du, vo);
        }
        var uo = Ee
          ? function (t) {
              return Ee.get(t);
            }
          : fc;
        function co(t) {
          for (
            var n = t.name + "", e = Ie[n], r = Ot.call(Ie, n) ? e.length : 0;
            r--;

          ) {
            var i = e[r],
              o = i.func;
            if (null == o || o == t) return i.name;
          }
          return n;
        }
        function so(t) {
          return (Ot.call(Le, "placeholder") ? Le : t).placeholder;
        }
        function lo() {
          var t = Le.iteratee || uc;
          return (
            (t = t === uc ? Ur : t),
            arguments.length ? t(arguments[0], arguments[1]) : t
          );
        }
        function fo(t, n) {
          var e,
            r,
            i = t.__data__;
          return (
            "string" == (r = typeof (e = n)) ||
            "number" == r ||
            "symbol" == r ||
            "boolean" == r
              ? "__proto__" !== e
              : null === e
          )
            ? i["string" == typeof n ? "string" : "hash"]
            : i.map;
        }
        function ho(t) {
          for (var n = zu(t), e = n.length; e--; ) {
            var r = n[e],
              i = t[r];
            n[e] = [r, i, $o(i)];
          }
          return n;
        }
        function po(t, n) {
          var r = (function (t, n) {
            return null == t ? e : t[n];
          })(t, n);
          return Or(r) ? r : e;
        }
        var go = qn
            ? function (t) {
                return null == t
                  ? []
                  : ((t = $t(t)),
                    Nn(qn(t), function (n) {
                      return Zt.call(t, n);
                    }));
              }
            : mc,
          vo = qn
            ? function (t) {
                for (var n = []; t; ) zn(n, go(t)), (t = Ht(t));
                return n;
              }
            : mc,
          yo = $r;
        function mo(t, n, e) {
          for (var r = -1, i = (n = wi(n, t)).length, o = !1; ++r < i; ) {
            var a = Fo(n[r]);
            if (!(o = null != t && e(t, a))) break;
            t = t[a];
          }
          return o || ++r != i
            ? o
            : !!(i = null == t ? 0 : t.length) &&
                eu(i) &&
                wo(a, i) &&
                (Ha(t) || Wa(t));
        }
        function bo(t) {
          return "function" != typeof t.constructor || Ao(t) ? {} : Be(Ht(t));
        }
        function _o(t) {
          return Ha(t) || Wa(t) || !!(Kt && t && t[Kt]);
        }
        function wo(t, n) {
          var e = typeof t;
          return (
            !!(n = null == n ? h : n) &&
            ("number" == e || ("symbol" != e && bt.test(t))) &&
            t > -1 &&
            t % 1 == 0 &&
            t < n
          );
        }
        function xo(t, n, e) {
          if (!ru(e)) return !1;
          var r = typeof n;
          return (
            !!("number" == r
              ? Za(e) && wo(n, e.length)
              : "string" == r && n in e) && Ba(e[n], t)
          );
        }
        function Mo(t, n) {
          if (Ha(t)) return !1;
          var e = typeof t;
          return (
            !(
              "number" != e &&
              "symbol" != e &&
              "boolean" != e &&
              null != t &&
              !fu(t)
            ) ||
            nt.test(t) ||
            !tt.test(t) ||
            (null != n && t in $t(n))
          );
        }
        function jo(t) {
          var n = co(t),
            e = Le[n];
          if ("function" != typeof e || !(n in We.prototype)) return !1;
          if (t === e) return !0;
          var r = uo(e);
          return !!r && t === r[0];
        }
        ((Ae && yo(new Ae(new ArrayBuffer(1))) != I) ||
          ($e && yo(new $e()) != M) ||
          (Se && yo(Se.resolve()) != A) ||
          (Te && yo(new Te()) != S) ||
          (Ne && yo(new Ne()) != C)) &&
          (yo = function (t) {
            var n = $r(t),
              r = n == k ? t.constructor : e,
              i = r ? Ro(r) : "";
            if (i)
              switch (i) {
                case ze:
                  return I;
                case De:
                  return M;
                case Oe:
                  return A;
                case Ue:
                  return S;
                case qe:
                  return C;
              }
            return n;
          });
        var ko = zt ? tu : bc;
        function Ao(t) {
          var n = t && t.constructor;
          return t === (("function" == typeof n && n.prototype) || It);
        }
        function $o(t) {
          return t == t && !ru(t);
        }
        function So(t, n) {
          return function (r) {
            return null != r && r[t] === n && (n !== e || t in $t(r));
          };
        }
        function To(t, n, r) {
          return (
            (n = _e(n === e ? t.length - 1 : n, 0)),
            function () {
              for (
                var e = arguments, i = -1, o = _e(e.length - n, 0), a = at(o);
                ++i < o;

              )
                a[i] = e[n + i];
              i = -1;
              for (var u = at(n + 1); ++i < n; ) u[i] = e[i];
              return (u[n] = r(a)), kn(t, this, u);
            }
          );
        }
        function No(t, n) {
          return n.length < 2 ? t : kr(t, oi(n, 0, -1));
        }
        function Co(t, n) {
          for (var r = t.length, i = we(n.length, r), o = Ci(t); i--; ) {
            var a = n[i];
            t[i] = wo(a, r) ? o[a] : e;
          }
          return t;
        }
        function Eo(t, n) {
          if (
            ("constructor" !== n || "function" != typeof t[n]) &&
            "__proto__" != n
          )
            return t[n];
        }
        var Io = Uo(ei),
          zo =
            gn ||
            function (t, n) {
              return dn.setTimeout(t, n);
            },
          Do = Uo(ri);
        function Oo(t, n, e) {
          var r = n + "";
          return Do(
            t,
            (function (t, n) {
              var e = n.length;
              if (!e) return t;
              var r = e - 1;
              return (
                (n[r] = (e > 1 ? "& " : "") + n[r]),
                (n = n.join(e > 2 ? ", " : " ")),
                t.replace(ut, "{\n/* [wrapped with " + n + "] */\n")
              );
            })(
              r,
              (function (t, n) {
                return (
                  $n(g, function (e) {
                    var r = "_." + e[0];
                    n & e[1] && !Cn(t, r) && t.push(r);
                  }),
                  t.sort()
                );
              })(
                (function (t) {
                  var n = t.match(ct);
                  return n ? n[1].split(st) : [];
                })(r),
                e
              )
            )
          );
        }
        function Uo(t) {
          var n = 0,
            r = 0;
          return function () {
            var i = xe(),
              o = 16 - (i - r);
            if (((r = i), o > 0)) {
              if (++n >= 800) return arguments[0];
            } else n = 0;
            return t.apply(e, arguments);
          };
        }
        function qo(t, n) {
          var r = -1,
            i = t.length,
            o = i - 1;
          for (n = n === e ? i : n; ++r < n; ) {
            var a = Xr(r, o),
              u = t[a];
            (t[a] = t[r]), (t[r] = u);
          }
          return (t.length = n), t;
        }
        var Vo = (function (t) {
          var n = Ua(t, function (t) {
              return 500 === e.size && e.clear(), t;
            }),
            e = n.cache;
          return n;
        })(function (t) {
          var n = [];
          return (
            46 === t.charCodeAt(0) && n.push(""),
            t.replace(et, function (t, e, r, i) {
              n.push(r ? i.replace(ht, "$1") : e || t);
            }),
            n
          );
        });
        function Fo(t) {
          if ("string" == typeof t || fu(t)) return t;
          var n = t + "";
          return "0" == n && 1 / t == -1 / 0 ? "-0" : n;
        }
        function Ro(t) {
          if (null != t) {
            try {
              return Dt.call(t);
            } catch (t) {}
            try {
              return t + "";
            } catch (t) {}
          }
          return "";
        }
        function Lo(t) {
          if (t instanceof We) return t.clone();
          var n = new Pe(t.__wrapped__, t.__chain__);
          return (
            (n.__actions__ = Ci(t.__actions__)),
            (n.__index__ = t.__index__),
            (n.__values__ = t.__values__),
            n
          );
        }
        var Bo = Qr(function (t, n) {
            return Xa(t) ? dr(t, br(n, 1, Xa, !0)) : [];
          }),
          Yo = Qr(function (t, n) {
            var r = Ko(n);
            return (
              Xa(r) && (r = e), Xa(t) ? dr(t, br(n, 1, Xa, !0), lo(r, 2)) : []
            );
          }),
          Po = Qr(function (t, n) {
            var r = Ko(n);
            return Xa(r) && (r = e), Xa(t) ? dr(t, br(n, 1, Xa, !0), e, r) : [];
          });
        function Wo(t, n, e) {
          var r = null == t ? 0 : t.length;
          if (!r) return -1;
          var i = null == e ? 0 : yu(e);
          return i < 0 && (i = _e(r + i, 0)), Fn(t, lo(n, 3), i);
        }
        function Ho(t, n, r) {
          var i = null == t ? 0 : t.length;
          if (!i) return -1;
          var o = i - 1;
          return (
            r !== e && ((o = yu(r)), (o = r < 0 ? _e(i + o, 0) : we(o, i - 1))),
            Fn(t, lo(n, 3), o, !0)
          );
        }
        function Go(t) {
          return (null == t ? 0 : t.length) ? br(t, 1) : [];
        }
        function Zo(t) {
          return t && t.length ? t[0] : e;
        }
        var Xo = Qr(function (t) {
            var n = In(t, bi);
            return n.length && n[0] === t[0] ? Cr(n) : [];
          }),
          Jo = Qr(function (t) {
            var n = Ko(t),
              r = In(t, bi);
            return (
              n === Ko(r) ? (n = e) : r.pop(),
              r.length && r[0] === t[0] ? Cr(r, lo(n, 2)) : []
            );
          }),
          Qo = Qr(function (t) {
            var n = Ko(t),
              r = In(t, bi);
            return (
              (n = "function" == typeof n ? n : e) && r.pop(),
              r.length && r[0] === t[0] ? Cr(r, e, n) : []
            );
          });
        function Ko(t) {
          var n = null == t ? 0 : t.length;
          return n ? t[n - 1] : e;
        }
        var ta = Qr(na);
        function na(t, n) {
          return t && t.length && n && n.length ? Gr(t, n) : t;
        }
        var ea = io(function (t, n) {
          var e = null == t ? 0 : t.length,
            r = cr(t, n);
          return (
            Zr(
              t,
              In(n, function (t) {
                return wo(t, e) ? +t : t;
              }).sort(Si)
            ),
            r
          );
        });
        function ra(t) {
          return null == t ? t : ke.call(t);
        }
        var ia = Qr(function (t) {
            return hi(br(t, 1, Xa, !0));
          }),
          oa = Qr(function (t) {
            var n = Ko(t);
            return Xa(n) && (n = e), hi(br(t, 1, Xa, !0), lo(n, 2));
          }),
          aa = Qr(function (t) {
            var n = Ko(t);
            return (
              (n = "function" == typeof n ? n : e), hi(br(t, 1, Xa, !0), e, n)
            );
          });
        function ua(t) {
          if (!t || !t.length) return [];
          var n = 0;
          return (
            (t = Nn(t, function (t) {
              if (Xa(t)) return (n = _e(t.length, n)), !0;
            })),
            Zn(n, function (n) {
              return In(t, Pn(n));
            })
          );
        }
        function ca(t, n) {
          if (!t || !t.length) return [];
          var r = ua(t);
          return null == n
            ? r
            : In(r, function (t) {
                return kn(n, e, t);
              });
        }
        var sa = Qr(function (t, n) {
            return Xa(t) ? dr(t, n) : [];
          }),
          la = Qr(function (t) {
            return yi(Nn(t, Xa));
          }),
          fa = Qr(function (t) {
            var n = Ko(t);
            return Xa(n) && (n = e), yi(Nn(t, Xa), lo(n, 2));
          }),
          ha = Qr(function (t) {
            var n = Ko(t);
            return (n = "function" == typeof n ? n : e), yi(Nn(t, Xa), e, n);
          }),
          da = Qr(ua);
        var pa = Qr(function (t) {
          var n = t.length,
            r = n > 1 ? t[n - 1] : e;
          return (r = "function" == typeof r ? (t.pop(), r) : e), ca(t, r);
        });
        function ga(t) {
          var n = Le(t);
          return (n.__chain__ = !0), n;
        }
        function va(t, n) {
          return n(t);
        }
        var ya = io(function (t) {
          var n = t.length,
            r = n ? t[0] : 0,
            i = this.__wrapped__,
            o = function (n) {
              return cr(n, t);
            };
          return !(n > 1 || this.__actions__.length) && i instanceof We && wo(r)
            ? ((i = i.slice(r, +r + (n ? 1 : 0))).__actions__.push({
                func: va,
                args: [o],
                thisArg: e,
              }),
              new Pe(i, this.__chain__).thru(function (t) {
                return n && !t.length && t.push(e), t;
              }))
            : this.thru(o);
        });
        var ma = Ii(function (t, n, e) {
          Ot.call(t, e) ? ++t[e] : ur(t, e, 1);
        });
        var ba = Fi(Wo),
          _a = Fi(Ho);
        function wa(t, n) {
          return (Ha(t) ? $n : pr)(t, lo(n, 3));
        }
        function xa(t, n) {
          return (Ha(t) ? Sn : gr)(t, lo(n, 3));
        }
        var Ma = Ii(function (t, n, e) {
          Ot.call(t, e) ? t[e].push(n) : ur(t, e, [n]);
        });
        var ja = Qr(function (t, n, e) {
            var r = -1,
              i = "function" == typeof n,
              o = Za(t) ? at(t.length) : [];
            return (
              pr(t, function (t) {
                o[++r] = i ? kn(n, t, e) : Er(t, n, e);
              }),
              o
            );
          }),
          ka = Ii(function (t, n, e) {
            ur(t, e, n);
          });
        function Aa(t, n) {
          return (Ha(t) ? In : Rr)(t, lo(n, 3));
        }
        var $a = Ii(
          function (t, n, e) {
            t[e ? 0 : 1].push(n);
          },
          function () {
            return [[], []];
          }
        );
        var Sa = Qr(function (t, n) {
            if (null == t) return [];
            var e = n.length;
            return (
              e > 1 && xo(t, n[0], n[1])
                ? (n = [])
                : e > 2 && xo(n[0], n[1], n[2]) && (n = [n[0]]),
              Wr(t, br(n, 1), [])
            );
          }),
          Ta =
            pn ||
            function () {
              return dn.Date.now();
            };
        function Na(t, n, r) {
          return (
            (n = r ? e : n),
            (n = t && null == n ? t.length : n),
            Ki(t, s, e, e, e, e, n)
          );
        }
        function Ca(t, n) {
          var i;
          if ("function" != typeof n) throw new Nt(r);
          return (
            (t = yu(t)),
            function () {
              return (
                --t > 0 && (i = n.apply(this, arguments)), t <= 1 && (n = e), i
              );
            }
          );
        }
        var Ea = Qr(function (t, n, e) {
            var r = 1;
            if (e.length) {
              var i = se(e, so(Ea));
              r |= u;
            }
            return Ki(t, r, n, e, i);
          }),
          Ia = Qr(function (t, n, e) {
            var r = 3;
            if (e.length) {
              var i = se(e, so(Ia));
              r |= u;
            }
            return Ki(n, r, t, e, i);
          });
        function za(t, n, i) {
          var o,
            a,
            u,
            c,
            s,
            l,
            f = 0,
            h = !1,
            d = !1,
            p = !0;
          if ("function" != typeof t) throw new Nt(r);
          function g(n) {
            var r = o,
              i = a;
            return (o = a = e), (f = n), (c = t.apply(i, r));
          }
          function v(t) {
            return (f = t), (s = zo(m, n)), h ? g(t) : c;
          }
          function y(t) {
            var r = t - l;
            return l === e || r >= n || r < 0 || (d && t - f >= u);
          }
          function m() {
            var t = Ta();
            if (y(t)) return b(t);
            s = zo(
              m,
              (function (t) {
                var e = n - (t - l);
                return d ? we(e, u - (t - f)) : e;
              })(t)
            );
          }
          function b(t) {
            return (s = e), p && o ? g(t) : ((o = a = e), c);
          }
          function _() {
            var t = Ta(),
              r = y(t);
            if (((o = arguments), (a = this), (l = t), r)) {
              if (s === e) return v(l);
              if (d) return ji(s), (s = zo(m, n)), g(l);
            }
            return s === e && (s = zo(m, n)), c;
          }
          return (
            (n = bu(n) || 0),
            ru(i) &&
              ((h = !!i.leading),
              (u = (d = "maxWait" in i) ? _e(bu(i.maxWait) || 0, n) : u),
              (p = "trailing" in i ? !!i.trailing : p)),
            (_.cancel = function () {
              s !== e && ji(s), (f = 0), (o = l = a = s = e);
            }),
            (_.flush = function () {
              return s === e ? c : b(Ta());
            }),
            _
          );
        }
        var Da = Qr(function (t, n) {
            return hr(t, 1, n);
          }),
          Oa = Qr(function (t, n, e) {
            return hr(t, bu(n) || 0, e);
          });
        function Ua(t, n) {
          if ("function" != typeof t || (null != n && "function" != typeof n))
            throw new Nt(r);
          var e = function () {
            var r = arguments,
              i = n ? n.apply(this, r) : r[0],
              o = e.cache;
            if (o.has(i)) return o.get(i);
            var a = t.apply(this, r);
            return (e.cache = o.set(i, a) || o), a;
          };
          return (e.cache = new (Ua.Cache || Ze)()), e;
        }
        function qa(t) {
          if ("function" != typeof t) throw new Nt(r);
          return function () {
            var n = arguments;
            switch (n.length) {
              case 0:
                return !t.call(this);
              case 1:
                return !t.call(this, n[0]);
              case 2:
                return !t.call(this, n[0], n[1]);
              case 3:
                return !t.call(this, n[0], n[1], n[2]);
            }
            return !t.apply(this, n);
          };
        }
        Ua.Cache = Ze;
        var Va = xi(function (t, n) {
            var e = (n =
              1 == n.length && Ha(n[0])
                ? In(n[0], Jn(lo()))
                : In(br(n, 1), Jn(lo()))).length;
            return Qr(function (r) {
              for (var i = -1, o = we(r.length, e); ++i < o; )
                r[i] = n[i].call(this, r[i]);
              return kn(t, this, r);
            });
          }),
          Fa = Qr(function (t, n) {
            var r = se(n, so(Fa));
            return Ki(t, u, e, n, r);
          }),
          Ra = Qr(function (t, n) {
            var r = se(n, so(Ra));
            return Ki(t, c, e, n, r);
          }),
          La = io(function (t, n) {
            return Ki(t, l, e, e, e, n);
          });
        function Ba(t, n) {
          return t === n || (t != t && n != n);
        }
        var Ya = Gi(Sr),
          Pa = Gi(function (t, n) {
            return t >= n;
          }),
          Wa = Ir(
            (function () {
              return arguments;
            })()
          )
            ? Ir
            : function (t) {
                return iu(t) && Ot.call(t, "callee") && !Zt.call(t, "callee");
              },
          Ha = at.isArray,
          Ga = bn
            ? Jn(bn)
            : function (t) {
                return iu(t) && $r(t) == E;
              };
        function Za(t) {
          return null != t && eu(t.length) && !tu(t);
        }
        function Xa(t) {
          return iu(t) && Za(t);
        }
        var Ja = Wn || bc,
          Qa = _n
            ? Jn(_n)
            : function (t) {
                return iu(t) && $r(t) == b;
              };
        function Ka(t) {
          if (!iu(t)) return !1;
          var n = $r(t);
          return (
            n == _ ||
            "[object DOMException]" == n ||
            ("string" == typeof t.message &&
              "string" == typeof t.name &&
              !uu(t))
          );
        }
        function tu(t) {
          if (!ru(t)) return !1;
          var n = $r(t);
          return (
            n == w ||
            n == x ||
            "[object AsyncFunction]" == n ||
            "[object Proxy]" == n
          );
        }
        function nu(t) {
          return "number" == typeof t && t == yu(t);
        }
        function eu(t) {
          return "number" == typeof t && t > -1 && t % 1 == 0 && t <= h;
        }
        function ru(t) {
          var n = typeof t;
          return null != t && ("object" == n || "function" == n);
        }
        function iu(t) {
          return null != t && "object" == typeof t;
        }
        var ou = wn
          ? Jn(wn)
          : function (t) {
              return iu(t) && yo(t) == M;
            };
        function au(t) {
          return "number" == typeof t || (iu(t) && $r(t) == j);
        }
        function uu(t) {
          if (!iu(t) || $r(t) != k) return !1;
          var n = Ht(t);
          if (null === n) return !0;
          var e = Ot.call(n, "constructor") && n.constructor;
          return "function" == typeof e && e instanceof e && Dt.call(e) == Ft;
        }
        var cu = xn
          ? Jn(xn)
          : function (t) {
              return iu(t) && $r(t) == $;
            };
        var su = Mn
          ? Jn(Mn)
          : function (t) {
              return iu(t) && yo(t) == S;
            };
        function lu(t) {
          return "string" == typeof t || (!Ha(t) && iu(t) && $r(t) == T);
        }
        function fu(t) {
          return "symbol" == typeof t || (iu(t) && $r(t) == N);
        }
        var hu = jn
          ? Jn(jn)
          : function (t) {
              return iu(t) && eu(t.length) && !!an[$r(t)];
            };
        var du = Gi(Fr),
          pu = Gi(function (t, n) {
            return t <= n;
          });
        function gu(t) {
          if (!t) return [];
          if (Za(t)) return lu(t) ? de(t) : Ci(t);
          if (nn && t[nn])
            return (function (t) {
              for (var n, e = []; !(n = t.next()).done; ) e.push(n.value);
              return e;
            })(t[nn]());
          var n = yo(t);
          return (n == M ? ue : n == S ? le : Bu)(t);
        }
        function vu(t) {
          return t
            ? (t = bu(t)) === f || t === -1 / 0
              ? 17976931348623157e292 * (t < 0 ? -1 : 1)
              : t == t
              ? t
              : 0
            : 0 === t
            ? t
            : 0;
        }
        function yu(t) {
          var n = vu(t),
            e = n % 1;
          return n == n ? (e ? n - e : n) : 0;
        }
        function mu(t) {
          return t ? sr(yu(t), 0, p) : 0;
        }
        function bu(t) {
          if ("number" == typeof t) return t;
          if (fu(t)) return d;
          if (ru(t)) {
            var n = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = ru(n) ? n + "" : n;
          }
          if ("string" != typeof t) return 0 === t ? t : +t;
          t = Xn(t);
          var e = vt.test(t);
          return e || mt.test(t)
            ? ln(t.slice(2), e ? 2 : 8)
            : gt.test(t)
            ? d
            : +t;
        }
        function _u(t) {
          return Ei(t, Du(t));
        }
        function wu(t) {
          return null == t ? "" : fi(t);
        }
        var xu = zi(function (t, n) {
            if (Ao(n) || Za(n)) Ei(n, zu(n), t);
            else for (var e in n) Ot.call(n, e) && rr(t, e, n[e]);
          }),
          Mu = zi(function (t, n) {
            Ei(n, Du(n), t);
          }),
          ju = zi(function (t, n, e, r) {
            Ei(n, Du(n), t, r);
          }),
          ku = zi(function (t, n, e, r) {
            Ei(n, zu(n), t, r);
          }),
          Au = io(cr);
        var $u = Qr(function (t, n) {
            t = $t(t);
            var r = -1,
              i = n.length,
              o = i > 2 ? n[2] : e;
            for (o && xo(n[0], n[1], o) && (i = 1); ++r < i; )
              for (var a = n[r], u = Du(a), c = -1, s = u.length; ++c < s; ) {
                var l = u[c],
                  f = t[l];
                (f === e || (Ba(f, It[l]) && !Ot.call(t, l))) && (t[l] = a[l]);
              }
            return t;
          }),
          Su = Qr(function (t) {
            return t.push(e, no), kn(Uu, e, t);
          });
        function Tu(t, n, r) {
          var i = null == t ? e : kr(t, n);
          return i === e ? r : i;
        }
        function Nu(t, n) {
          return null != t && mo(t, n, Nr);
        }
        var Cu = Bi(function (t, n, e) {
            null != n && "function" != typeof n.toString && (n = Vt.call(n)),
              (t[n] = e);
          }, rc(ac)),
          Eu = Bi(function (t, n, e) {
            null != n && "function" != typeof n.toString && (n = Vt.call(n)),
              Ot.call(t, n) ? t[n].push(e) : (t[n] = [e]);
          }, lo),
          Iu = Qr(Er);
        function zu(t) {
          return Za(t) ? Qe(t) : qr(t);
        }
        function Du(t) {
          return Za(t) ? Qe(t, !0) : Vr(t);
        }
        var Ou = zi(function (t, n, e) {
            Yr(t, n, e);
          }),
          Uu = zi(function (t, n, e, r) {
            Yr(t, n, e, r);
          }),
          qu = io(function (t, n) {
            var e = {};
            if (null == t) return e;
            var r = !1;
            (n = In(n, function (n) {
              return (n = wi(n, t)), r || (r = n.length > 1), n;
            })),
              Ei(t, ao(t), e),
              r && (e = lr(e, 7, eo));
            for (var i = n.length; i--; ) di(e, n[i]);
            return e;
          });
        var Vu = io(function (t, n) {
          return null == t
            ? {}
            : (function (t, n) {
                return Hr(t, n, function (n, e) {
                  return Nu(t, e);
                });
              })(t, n);
        });
        function Fu(t, n) {
          if (null == t) return {};
          var e = In(ao(t), function (t) {
            return [t];
          });
          return (
            (n = lo(n)),
            Hr(t, e, function (t, e) {
              return n(t, e[0]);
            })
          );
        }
        var Ru = Qi(zu),
          Lu = Qi(Du);
        function Bu(t) {
          return null == t ? [] : Qn(t, zu(t));
        }
        var Yu = qi(function (t, n, e) {
          return (n = n.toLowerCase()), t + (e ? Pu(n) : n);
        });
        function Pu(t) {
          return Ku(wu(t).toLowerCase());
        }
        function Wu(t) {
          return (t = wu(t)) && t.replace(_t, re).replace(Qt, "");
        }
        var Hu = qi(function (t, n, e) {
            return t + (e ? "-" : "") + n.toLowerCase();
          }),
          Gu = qi(function (t, n, e) {
            return t + (e ? " " : "") + n.toLowerCase();
          }),
          Zu = Ui("toLowerCase");
        var Xu = qi(function (t, n, e) {
          return t + (e ? "_" : "") + n.toLowerCase();
        });
        var Ju = qi(function (t, n, e) {
          return t + (e ? " " : "") + Ku(n);
        });
        var Qu = qi(function (t, n, e) {
            return t + (e ? " " : "") + n.toUpperCase();
          }),
          Ku = Ui("toUpperCase");
        function tc(t, n, r) {
          return (
            (t = wu(t)),
            (n = r ? e : n) === e
              ? (function (t) {
                  return en.test(t);
                })(t)
                ? (function (t) {
                    return t.match(tn) || [];
                  })(t)
                : (function (t) {
                    return t.match(lt) || [];
                  })(t)
              : t.match(n) || []
          );
        }
        var nc = Qr(function (t, n) {
            try {
              return kn(t, e, n);
            } catch (t) {
              return Ka(t) ? t : new jt(t);
            }
          }),
          ec = io(function (t, n) {
            return (
              $n(n, function (n) {
                (n = Fo(n)), ur(t, n, Ea(t[n], t));
              }),
              t
            );
          });
        function rc(t) {
          return function () {
            return t;
          };
        }
        var ic = Ri(),
          oc = Ri(!0);
        function ac(t) {
          return t;
        }
        function uc(t) {
          return Ur("function" == typeof t ? t : lr(t, 1));
        }
        var cc = Qr(function (t, n) {
            return function (e) {
              return Er(e, t, n);
            };
          }),
          sc = Qr(function (t, n) {
            return function (e) {
              return Er(t, e, n);
            };
          });
        function lc(t, n, e) {
          var r = zu(n),
            i = jr(n, r);
          null != e ||
            (ru(n) && (i.length || !r.length)) ||
            ((e = n), (n = t), (t = this), (i = jr(n, zu(n))));
          var o = !(ru(e) && "chain" in e && !e.chain),
            a = tu(t);
          return (
            $n(i, function (e) {
              var r = n[e];
              (t[e] = r),
                a &&
                  (t.prototype[e] = function () {
                    var n = this.__chain__;
                    if (o || n) {
                      var e = t(this.__wrapped__),
                        i = (e.__actions__ = Ci(this.__actions__));
                      return (
                        i.push({ func: r, args: arguments, thisArg: t }),
                        (e.__chain__ = n),
                        e
                      );
                    }
                    return r.apply(t, zn([this.value()], arguments));
                  });
            }),
            t
          );
        }
        function fc() {}
        var hc = Pi(In),
          dc = Pi(Tn),
          pc = Pi(Un);
        function gc(t) {
          return Mo(t)
            ? Pn(Fo(t))
            : (function (t) {
                return function (n) {
                  return kr(n, t);
                };
              })(t);
        }
        var vc = Hi(),
          yc = Hi(!0);
        function mc() {
          return [];
        }
        function bc() {
          return !1;
        }
        var _c = Yi(function (t, n) {
            return t + n;
          }, 0),
          wc = Xi("ceil"),
          xc = Yi(function (t, n) {
            return t / n;
          }, 1),
          Mc = Xi("floor");
        var jc,
          kc = Yi(function (t, n) {
            return t * n;
          }, 1),
          Ac = Xi("round"),
          $c = Yi(function (t, n) {
            return t - n;
          }, 0);
        return (
          (Le.after = function (t, n) {
            if ("function" != typeof n) throw new Nt(r);
            return (
              (t = yu(t)),
              function () {
                if (--t < 1) return n.apply(this, arguments);
              }
            );
          }),
          (Le.ary = Na),
          (Le.assign = xu),
          (Le.assignIn = Mu),
          (Le.assignInWith = ju),
          (Le.assignWith = ku),
          (Le.at = Au),
          (Le.before = Ca),
          (Le.bind = Ea),
          (Le.bindAll = ec),
          (Le.bindKey = Ia),
          (Le.castArray = function () {
            if (!arguments.length) return [];
            var t = arguments[0];
            return Ha(t) ? t : [t];
          }),
          (Le.chain = ga),
          (Le.chunk = function (t, n, r) {
            n = (r ? xo(t, n, r) : n === e) ? 1 : _e(yu(n), 0);
            var i = null == t ? 0 : t.length;
            if (!i || n < 1) return [];
            for (var o = 0, a = 0, u = at(yn(i / n)); o < i; )
              u[a++] = oi(t, o, (o += n));
            return u;
          }),
          (Le.compact = function (t) {
            for (
              var n = -1, e = null == t ? 0 : t.length, r = 0, i = [];
              ++n < e;

            ) {
              var o = t[n];
              o && (i[r++] = o);
            }
            return i;
          }),
          (Le.concat = function () {
            var t = arguments.length;
            if (!t) return [];
            for (var n = at(t - 1), e = arguments[0], r = t; r--; )
              n[r - 1] = arguments[r];
            return zn(Ha(e) ? Ci(e) : [e], br(n, 1));
          }),
          (Le.cond = function (t) {
            var n = null == t ? 0 : t.length,
              e = lo();
            return (
              (t = n
                ? In(t, function (t) {
                    if ("function" != typeof t[1]) throw new Nt(r);
                    return [e(t[0]), t[1]];
                  })
                : []),
              Qr(function (e) {
                for (var r = -1; ++r < n; ) {
                  var i = t[r];
                  if (kn(i[0], this, e)) return kn(i[1], this, e);
                }
              })
            );
          }),
          (Le.conforms = function (t) {
            return (function (t) {
              var n = zu(t);
              return function (e) {
                return fr(e, t, n);
              };
            })(lr(t, 1));
          }),
          (Le.constant = rc),
          (Le.countBy = ma),
          (Le.create = function (t, n) {
            var e = Be(t);
            return null == n ? e : ar(e, n);
          }),
          (Le.curry = function t(n, r, i) {
            var o = Ki(n, 8, e, e, e, e, e, (r = i ? e : r));
            return (o.placeholder = t.placeholder), o;
          }),
          (Le.curryRight = function t(n, r, i) {
            var o = Ki(n, a, e, e, e, e, e, (r = i ? e : r));
            return (o.placeholder = t.placeholder), o;
          }),
          (Le.debounce = za),
          (Le.defaults = $u),
          (Le.defaultsDeep = Su),
          (Le.defer = Da),
          (Le.delay = Oa),
          (Le.difference = Bo),
          (Le.differenceBy = Yo),
          (Le.differenceWith = Po),
          (Le.drop = function (t, n, r) {
            var i = null == t ? 0 : t.length;
            return i
              ? oi(t, (n = r || n === e ? 1 : yu(n)) < 0 ? 0 : n, i)
              : [];
          }),
          (Le.dropRight = function (t, n, r) {
            var i = null == t ? 0 : t.length;
            return i
              ? oi(t, 0, (n = i - (n = r || n === e ? 1 : yu(n))) < 0 ? 0 : n)
              : [];
          }),
          (Le.dropRightWhile = function (t, n) {
            return t && t.length ? gi(t, lo(n, 3), !0, !0) : [];
          }),
          (Le.dropWhile = function (t, n) {
            return t && t.length ? gi(t, lo(n, 3), !0) : [];
          }),
          (Le.fill = function (t, n, r, i) {
            var o = null == t ? 0 : t.length;
            return o
              ? (r && "number" != typeof r && xo(t, n, r) && ((r = 0), (i = o)),
                (function (t, n, r, i) {
                  var o = t.length;
                  for (
                    (r = yu(r)) < 0 && (r = -r > o ? 0 : o + r),
                      (i = i === e || i > o ? o : yu(i)) < 0 && (i += o),
                      i = r > i ? 0 : mu(i);
                    r < i;

                  )
                    t[r++] = n;
                  return t;
                })(t, n, r, i))
              : [];
          }),
          (Le.filter = function (t, n) {
            return (Ha(t) ? Nn : mr)(t, lo(n, 3));
          }),
          (Le.flatMap = function (t, n) {
            return br(Aa(t, n), 1);
          }),
          (Le.flatMapDeep = function (t, n) {
            return br(Aa(t, n), f);
          }),
          (Le.flatMapDepth = function (t, n, r) {
            return (r = r === e ? 1 : yu(r)), br(Aa(t, n), r);
          }),
          (Le.flatten = Go),
          (Le.flattenDeep = function (t) {
            return (null == t ? 0 : t.length) ? br(t, f) : [];
          }),
          (Le.flattenDepth = function (t, n) {
            return (null == t ? 0 : t.length)
              ? br(t, (n = n === e ? 1 : yu(n)))
              : [];
          }),
          (Le.flip = function (t) {
            return Ki(t, 512);
          }),
          (Le.flow = ic),
          (Le.flowRight = oc),
          (Le.fromPairs = function (t) {
            for (var n = -1, e = null == t ? 0 : t.length, r = {}; ++n < e; ) {
              var i = t[n];
              r[i[0]] = i[1];
            }
            return r;
          }),
          (Le.functions = function (t) {
            return null == t ? [] : jr(t, zu(t));
          }),
          (Le.functionsIn = function (t) {
            return null == t ? [] : jr(t, Du(t));
          }),
          (Le.groupBy = Ma),
          (Le.initial = function (t) {
            return (null == t ? 0 : t.length) ? oi(t, 0, -1) : [];
          }),
          (Le.intersection = Xo),
          (Le.intersectionBy = Jo),
          (Le.intersectionWith = Qo),
          (Le.invert = Cu),
          (Le.invertBy = Eu),
          (Le.invokeMap = ja),
          (Le.iteratee = uc),
          (Le.keyBy = ka),
          (Le.keys = zu),
          (Le.keysIn = Du),
          (Le.map = Aa),
          (Le.mapKeys = function (t, n) {
            var e = {};
            return (
              (n = lo(n, 3)),
              xr(t, function (t, r, i) {
                ur(e, n(t, r, i), t);
              }),
              e
            );
          }),
          (Le.mapValues = function (t, n) {
            var e = {};
            return (
              (n = lo(n, 3)),
              xr(t, function (t, r, i) {
                ur(e, r, n(t, r, i));
              }),
              e
            );
          }),
          (Le.matches = function (t) {
            return Lr(lr(t, 1));
          }),
          (Le.matchesProperty = function (t, n) {
            return Br(t, lr(n, 1));
          }),
          (Le.memoize = Ua),
          (Le.merge = Ou),
          (Le.mergeWith = Uu),
          (Le.method = cc),
          (Le.methodOf = sc),
          (Le.mixin = lc),
          (Le.negate = qa),
          (Le.nthArg = function (t) {
            return (
              (t = yu(t)),
              Qr(function (n) {
                return Pr(n, t);
              })
            );
          }),
          (Le.omit = qu),
          (Le.omitBy = function (t, n) {
            return Fu(t, qa(lo(n)));
          }),
          (Le.once = function (t) {
            return Ca(2, t);
          }),
          (Le.orderBy = function (t, n, r, i) {
            return null == t
              ? []
              : (Ha(n) || (n = null == n ? [] : [n]),
                Ha((r = i ? e : r)) || (r = null == r ? [] : [r]),
                Wr(t, n, r));
          }),
          (Le.over = hc),
          (Le.overArgs = Va),
          (Le.overEvery = dc),
          (Le.overSome = pc),
          (Le.partial = Fa),
          (Le.partialRight = Ra),
          (Le.partition = $a),
          (Le.pick = Vu),
          (Le.pickBy = Fu),
          (Le.property = gc),
          (Le.propertyOf = function (t) {
            return function (n) {
              return null == t ? e : kr(t, n);
            };
          }),
          (Le.pull = ta),
          (Le.pullAll = na),
          (Le.pullAllBy = function (t, n, e) {
            return t && t.length && n && n.length ? Gr(t, n, lo(e, 2)) : t;
          }),
          (Le.pullAllWith = function (t, n, r) {
            return t && t.length && n && n.length ? Gr(t, n, e, r) : t;
          }),
          (Le.pullAt = ea),
          (Le.range = vc),
          (Le.rangeRight = yc),
          (Le.rearg = La),
          (Le.reject = function (t, n) {
            return (Ha(t) ? Nn : mr)(t, qa(lo(n, 3)));
          }),
          (Le.remove = function (t, n) {
            var e = [];
            if (!t || !t.length) return e;
            var r = -1,
              i = [],
              o = t.length;
            for (n = lo(n, 3); ++r < o; ) {
              var a = t[r];
              n(a, r, t) && (e.push(a), i.push(r));
            }
            return Zr(t, i), e;
          }),
          (Le.rest = function (t, n) {
            if ("function" != typeof t) throw new Nt(r);
            return Qr(t, (n = n === e ? n : yu(n)));
          }),
          (Le.reverse = ra),
          (Le.sampleSize = function (t, n, r) {
            return (
              (n = (r ? xo(t, n, r) : n === e) ? 1 : yu(n)),
              (Ha(t) ? tr : ti)(t, n)
            );
          }),
          (Le.set = function (t, n, e) {
            return null == t ? t : ni(t, n, e);
          }),
          (Le.setWith = function (t, n, r, i) {
            return (
              (i = "function" == typeof i ? i : e),
              null == t ? t : ni(t, n, r, i)
            );
          }),
          (Le.shuffle = function (t) {
            return (Ha(t) ? nr : ii)(t);
          }),
          (Le.slice = function (t, n, r) {
            var i = null == t ? 0 : t.length;
            return i
              ? (r && "number" != typeof r && xo(t, n, r)
                  ? ((n = 0), (r = i))
                  : ((n = null == n ? 0 : yu(n)), (r = r === e ? i : yu(r))),
                oi(t, n, r))
              : [];
          }),
          (Le.sortBy = Sa),
          (Le.sortedUniq = function (t) {
            return t && t.length ? si(t) : [];
          }),
          (Le.sortedUniqBy = function (t, n) {
            return t && t.length ? si(t, lo(n, 2)) : [];
          }),
          (Le.split = function (t, n, r) {
            return (
              r && "number" != typeof r && xo(t, n, r) && (n = r = e),
              (r = r === e ? p : r >>> 0)
                ? (t = wu(t)) &&
                  ("string" == typeof n || (null != n && !cu(n))) &&
                  !(n = fi(n)) &&
                  ae(t)
                  ? Mi(de(t), 0, r)
                  : t.split(n, r)
                : []
            );
          }),
          (Le.spread = function (t, n) {
            if ("function" != typeof t) throw new Nt(r);
            return (
              (n = null == n ? 0 : _e(yu(n), 0)),
              Qr(function (e) {
                var r = e[n],
                  i = Mi(e, 0, n);
                return r && zn(i, r), kn(t, this, i);
              })
            );
          }),
          (Le.tail = function (t) {
            var n = null == t ? 0 : t.length;
            return n ? oi(t, 1, n) : [];
          }),
          (Le.take = function (t, n, r) {
            return t && t.length
              ? oi(t, 0, (n = r || n === e ? 1 : yu(n)) < 0 ? 0 : n)
              : [];
          }),
          (Le.takeRight = function (t, n, r) {
            var i = null == t ? 0 : t.length;
            return i
              ? oi(t, (n = i - (n = r || n === e ? 1 : yu(n))) < 0 ? 0 : n, i)
              : [];
          }),
          (Le.takeRightWhile = function (t, n) {
            return t && t.length ? gi(t, lo(n, 3), !1, !0) : [];
          }),
          (Le.takeWhile = function (t, n) {
            return t && t.length ? gi(t, lo(n, 3)) : [];
          }),
          (Le.tap = function (t, n) {
            return n(t), t;
          }),
          (Le.throttle = function (t, n, e) {
            var i = !0,
              o = !0;
            if ("function" != typeof t) throw new Nt(r);
            return (
              ru(e) &&
                ((i = "leading" in e ? !!e.leading : i),
                (o = "trailing" in e ? !!e.trailing : o)),
              za(t, n, { leading: i, maxWait: n, trailing: o })
            );
          }),
          (Le.thru = va),
          (Le.toArray = gu),
          (Le.toPairs = Ru),
          (Le.toPairsIn = Lu),
          (Le.toPath = function (t) {
            return Ha(t) ? In(t, Fo) : fu(t) ? [t] : Ci(Vo(wu(t)));
          }),
          (Le.toPlainObject = _u),
          (Le.transform = function (t, n, e) {
            var r = Ha(t),
              i = r || Ja(t) || hu(t);
            if (((n = lo(n, 4)), null == e)) {
              var o = t && t.constructor;
              e = i ? (r ? new o() : []) : ru(t) && tu(o) ? Be(Ht(t)) : {};
            }
            return (
              (i ? $n : xr)(t, function (t, r, i) {
                return n(e, t, r, i);
              }),
              e
            );
          }),
          (Le.unary = function (t) {
            return Na(t, 1);
          }),
          (Le.union = ia),
          (Le.unionBy = oa),
          (Le.unionWith = aa),
          (Le.uniq = function (t) {
            return t && t.length ? hi(t) : [];
          }),
          (Le.uniqBy = function (t, n) {
            return t && t.length ? hi(t, lo(n, 2)) : [];
          }),
          (Le.uniqWith = function (t, n) {
            return (
              (n = "function" == typeof n ? n : e),
              t && t.length ? hi(t, e, n) : []
            );
          }),
          (Le.unset = function (t, n) {
            return null == t || di(t, n);
          }),
          (Le.unzip = ua),
          (Le.unzipWith = ca),
          (Le.update = function (t, n, e) {
            return null == t ? t : pi(t, n, _i(e));
          }),
          (Le.updateWith = function (t, n, r, i) {
            return (
              (i = "function" == typeof i ? i : e),
              null == t ? t : pi(t, n, _i(r), i)
            );
          }),
          (Le.values = Bu),
          (Le.valuesIn = function (t) {
            return null == t ? [] : Qn(t, Du(t));
          }),
          (Le.without = sa),
          (Le.words = tc),
          (Le.wrap = function (t, n) {
            return Fa(_i(n), t);
          }),
          (Le.xor = la),
          (Le.xorBy = fa),
          (Le.xorWith = ha),
          (Le.zip = da),
          (Le.zipObject = function (t, n) {
            return mi(t || [], n || [], rr);
          }),
          (Le.zipObjectDeep = function (t, n) {
            return mi(t || [], n || [], ni);
          }),
          (Le.zipWith = pa),
          (Le.entries = Ru),
          (Le.entriesIn = Lu),
          (Le.extend = Mu),
          (Le.extendWith = ju),
          lc(Le, Le),
          (Le.add = _c),
          (Le.attempt = nc),
          (Le.camelCase = Yu),
          (Le.capitalize = Pu),
          (Le.ceil = wc),
          (Le.clamp = function (t, n, r) {
            return (
              r === e && ((r = n), (n = e)),
              r !== e && (r = (r = bu(r)) == r ? r : 0),
              n !== e && (n = (n = bu(n)) == n ? n : 0),
              sr(bu(t), n, r)
            );
          }),
          (Le.clone = function (t) {
            return lr(t, 4);
          }),
          (Le.cloneDeep = function (t) {
            return lr(t, 5);
          }),
          (Le.cloneDeepWith = function (t, n) {
            return lr(t, 5, (n = "function" == typeof n ? n : e));
          }),
          (Le.cloneWith = function (t, n) {
            return lr(t, 4, (n = "function" == typeof n ? n : e));
          }),
          (Le.conformsTo = function (t, n) {
            return null == n || fr(t, n, zu(n));
          }),
          (Le.deburr = Wu),
          (Le.defaultTo = function (t, n) {
            return null == t || t != t ? n : t;
          }),
          (Le.divide = xc),
          (Le.endsWith = function (t, n, r) {
            (t = wu(t)), (n = fi(n));
            var i = t.length,
              o = (r = r === e ? i : sr(yu(r), 0, i));
            return (r -= n.length) >= 0 && t.slice(r, o) == n;
          }),
          (Le.eq = Ba),
          (Le.escape = function (t) {
            return (t = wu(t)) && Z.test(t) ? t.replace(H, ie) : t;
          }),
          (Le.escapeRegExp = function (t) {
            return (t = wu(t)) && it.test(t) ? t.replace(rt, "\\$&") : t;
          }),
          (Le.every = function (t, n, r) {
            var i = Ha(t) ? Tn : vr;
            return r && xo(t, n, r) && (n = e), i(t, lo(n, 3));
          }),
          (Le.find = ba),
          (Le.findIndex = Wo),
          (Le.findKey = function (t, n) {
            return Vn(t, lo(n, 3), xr);
          }),
          (Le.findLast = _a),
          (Le.findLastIndex = Ho),
          (Le.findLastKey = function (t, n) {
            return Vn(t, lo(n, 3), Mr);
          }),
          (Le.floor = Mc),
          (Le.forEach = wa),
          (Le.forEachRight = xa),
          (Le.forIn = function (t, n) {
            return null == t ? t : _r(t, lo(n, 3), Du);
          }),
          (Le.forInRight = function (t, n) {
            return null == t ? t : wr(t, lo(n, 3), Du);
          }),
          (Le.forOwn = function (t, n) {
            return t && xr(t, lo(n, 3));
          }),
          (Le.forOwnRight = function (t, n) {
            return t && Mr(t, lo(n, 3));
          }),
          (Le.get = Tu),
          (Le.gt = Ya),
          (Le.gte = Pa),
          (Le.has = function (t, n) {
            return null != t && mo(t, n, Tr);
          }),
          (Le.hasIn = Nu),
          (Le.head = Zo),
          (Le.identity = ac),
          (Le.includes = function (t, n, e, r) {
            (t = Za(t) ? t : Bu(t)), (e = e && !r ? yu(e) : 0);
            var i = t.length;
            return (
              e < 0 && (e = _e(i + e, 0)),
              lu(t) ? e <= i && t.indexOf(n, e) > -1 : !!i && Rn(t, n, e) > -1
            );
          }),
          (Le.indexOf = function (t, n, e) {
            var r = null == t ? 0 : t.length;
            if (!r) return -1;
            var i = null == e ? 0 : yu(e);
            return i < 0 && (i = _e(r + i, 0)), Rn(t, n, i);
          }),
          (Le.inRange = function (t, n, r) {
            return (
              (n = vu(n)),
              r === e ? ((r = n), (n = 0)) : (r = vu(r)),
              (function (t, n, e) {
                return t >= we(n, e) && t < _e(n, e);
              })((t = bu(t)), n, r)
            );
          }),
          (Le.invoke = Iu),
          (Le.isArguments = Wa),
          (Le.isArray = Ha),
          (Le.isArrayBuffer = Ga),
          (Le.isArrayLike = Za),
          (Le.isArrayLikeObject = Xa),
          (Le.isBoolean = function (t) {
            return !0 === t || !1 === t || (iu(t) && $r(t) == m);
          }),
          (Le.isBuffer = Ja),
          (Le.isDate = Qa),
          (Le.isElement = function (t) {
            return iu(t) && 1 === t.nodeType && !uu(t);
          }),
          (Le.isEmpty = function (t) {
            if (null == t) return !0;
            if (
              Za(t) &&
              (Ha(t) ||
                "string" == typeof t ||
                "function" == typeof t.splice ||
                Ja(t) ||
                hu(t) ||
                Wa(t))
            )
              return !t.length;
            var n = yo(t);
            if (n == M || n == S) return !t.size;
            if (Ao(t)) return !qr(t).length;
            for (var e in t) if (Ot.call(t, e)) return !1;
            return !0;
          }),
          (Le.isEqual = function (t, n) {
            return zr(t, n);
          }),
          (Le.isEqualWith = function (t, n, r) {
            var i = (r = "function" == typeof r ? r : e) ? r(t, n) : e;
            return i === e ? zr(t, n, e, r) : !!i;
          }),
          (Le.isError = Ka),
          (Le.isFinite = function (t) {
            return "number" == typeof t && ye(t);
          }),
          (Le.isFunction = tu),
          (Le.isInteger = nu),
          (Le.isLength = eu),
          (Le.isMap = ou),
          (Le.isMatch = function (t, n) {
            return t === n || Dr(t, n, ho(n));
          }),
          (Le.isMatchWith = function (t, n, r) {
            return (r = "function" == typeof r ? r : e), Dr(t, n, ho(n), r);
          }),
          (Le.isNaN = function (t) {
            return au(t) && t != +t;
          }),
          (Le.isNative = function (t) {
            if (ko(t))
              throw new jt(
                "Unsupported core-js use. Try https://npms.io/search?q=ponyfill."
              );
            return Or(t);
          }),
          (Le.isNil = function (t) {
            return null == t;
          }),
          (Le.isNull = function (t) {
            return null === t;
          }),
          (Le.isNumber = au),
          (Le.isObject = ru),
          (Le.isObjectLike = iu),
          (Le.isPlainObject = uu),
          (Le.isRegExp = cu),
          (Le.isSafeInteger = function (t) {
            return nu(t) && t >= -9007199254740991 && t <= h;
          }),
          (Le.isSet = su),
          (Le.isString = lu),
          (Le.isSymbol = fu),
          (Le.isTypedArray = hu),
          (Le.isUndefined = function (t) {
            return t === e;
          }),
          (Le.isWeakMap = function (t) {
            return iu(t) && yo(t) == C;
          }),
          (Le.isWeakSet = function (t) {
            return iu(t) && "[object WeakSet]" == $r(t);
          }),
          (Le.join = function (t, n) {
            return null == t ? "" : me.call(t, n);
          }),
          (Le.kebabCase = Hu),
          (Le.last = Ko),
          (Le.lastIndexOf = function (t, n, r) {
            var i = null == t ? 0 : t.length;
            if (!i) return -1;
            var o = i;
            return (
              r !== e && (o = (o = yu(r)) < 0 ? _e(i + o, 0) : we(o, i - 1)),
              n == n
                ? (function (t, n, e) {
                    for (var r = e + 1; r--; ) if (t[r] === n) return r;
                    return r;
                  })(t, n, o)
                : Fn(t, Bn, o, !0)
            );
          }),
          (Le.lowerCase = Gu),
          (Le.lowerFirst = Zu),
          (Le.lt = du),
          (Le.lte = pu),
          (Le.max = function (t) {
            return t && t.length ? yr(t, ac, Sr) : e;
          }),
          (Le.maxBy = function (t, n) {
            return t && t.length ? yr(t, lo(n, 2), Sr) : e;
          }),
          (Le.mean = function (t) {
            return Yn(t, ac);
          }),
          (Le.meanBy = function (t, n) {
            return Yn(t, lo(n, 2));
          }),
          (Le.min = function (t) {
            return t && t.length ? yr(t, ac, Fr) : e;
          }),
          (Le.minBy = function (t, n) {
            return t && t.length ? yr(t, lo(n, 2), Fr) : e;
          }),
          (Le.stubArray = mc),
          (Le.stubFalse = bc),
          (Le.stubObject = function () {
            return {};
          }),
          (Le.stubString = function () {
            return "";
          }),
          (Le.stubTrue = function () {
            return !0;
          }),
          (Le.multiply = kc),
          (Le.nth = function (t, n) {
            return t && t.length ? Pr(t, yu(n)) : e;
          }),
          (Le.noConflict = function () {
            return dn._ === this && (dn._ = Rt), this;
          }),
          (Le.noop = fc),
          (Le.now = Ta),
          (Le.pad = function (t, n, e) {
            t = wu(t);
            var r = (n = yu(n)) ? he(t) : 0;
            if (!n || r >= n) return t;
            var i = (n - r) / 2;
            return Wi(mn(i), e) + t + Wi(yn(i), e);
          }),
          (Le.padEnd = function (t, n, e) {
            t = wu(t);
            var r = (n = yu(n)) ? he(t) : 0;
            return n && r < n ? t + Wi(n - r, e) : t;
          }),
          (Le.padStart = function (t, n, e) {
            t = wu(t);
            var r = (n = yu(n)) ? he(t) : 0;
            return n && r < n ? Wi(n - r, e) + t : t;
          }),
          (Le.parseInt = function (t, n, e) {
            return (
              e || null == n ? (n = 0) : n && (n = +n),
              Me(wu(t).replace(ot, ""), n || 0)
            );
          }),
          (Le.random = function (t, n, r) {
            if (
              (r && "boolean" != typeof r && xo(t, n, r) && (n = r = e),
              r === e &&
                ("boolean" == typeof n
                  ? ((r = n), (n = e))
                  : "boolean" == typeof t && ((r = t), (t = e))),
              t === e && n === e
                ? ((t = 0), (n = 1))
                : ((t = vu(t)), n === e ? ((n = t), (t = 0)) : (n = vu(n))),
              t > n)
            ) {
              var i = t;
              (t = n), (n = i);
            }
            if (r || t % 1 || n % 1) {
              var o = je();
              return we(t + o * (n - t + sn("1e-" + ((o + "").length - 1))), n);
            }
            return Xr(t, n);
          }),
          (Le.reduce = function (t, n, e) {
            var r = Ha(t) ? Dn : Hn,
              i = arguments.length < 3;
            return r(t, lo(n, 4), e, i, pr);
          }),
          (Le.reduceRight = function (t, n, e) {
            var r = Ha(t) ? On : Hn,
              i = arguments.length < 3;
            return r(t, lo(n, 4), e, i, gr);
          }),
          (Le.repeat = function (t, n, r) {
            return (n = (r ? xo(t, n, r) : n === e) ? 1 : yu(n)), Jr(wu(t), n);
          }),
          (Le.replace = function () {
            var t = arguments,
              n = wu(t[0]);
            return t.length < 3 ? n : n.replace(t[1], t[2]);
          }),
          (Le.result = function (t, n, r) {
            var i = -1,
              o = (n = wi(n, t)).length;
            for (o || ((o = 1), (t = e)); ++i < o; ) {
              var a = null == t ? e : t[Fo(n[i])];
              a === e && ((i = o), (a = r)), (t = tu(a) ? a.call(t) : a);
            }
            return t;
          }),
          (Le.round = Ac),
          (Le.runInContext = t),
          (Le.sample = function (t) {
            return (Ha(t) ? Ke : Kr)(t);
          }),
          (Le.size = function (t) {
            if (null == t) return 0;
            if (Za(t)) return lu(t) ? he(t) : t.length;
            var n = yo(t);
            return n == M || n == S ? t.size : qr(t).length;
          }),
          (Le.snakeCase = Xu),
          (Le.some = function (t, n, r) {
            var i = Ha(t) ? Un : ai;
            return r && xo(t, n, r) && (n = e), i(t, lo(n, 3));
          }),
          (Le.sortedIndex = function (t, n) {
            return ui(t, n);
          }),
          (Le.sortedIndexBy = function (t, n, e) {
            return ci(t, n, lo(e, 2));
          }),
          (Le.sortedIndexOf = function (t, n) {
            var e = null == t ? 0 : t.length;
            if (e) {
              var r = ui(t, n);
              if (r < e && Ba(t[r], n)) return r;
            }
            return -1;
          }),
          (Le.sortedLastIndex = function (t, n) {
            return ui(t, n, !0);
          }),
          (Le.sortedLastIndexBy = function (t, n, e) {
            return ci(t, n, lo(e, 2), !0);
          }),
          (Le.sortedLastIndexOf = function (t, n) {
            if (null == t ? 0 : t.length) {
              var e = ui(t, n, !0) - 1;
              if (Ba(t[e], n)) return e;
            }
            return -1;
          }),
          (Le.startCase = Ju),
          (Le.startsWith = function (t, n, e) {
            return (
              (t = wu(t)),
              (e = null == e ? 0 : sr(yu(e), 0, t.length)),
              (n = fi(n)),
              t.slice(e, e + n.length) == n
            );
          }),
          (Le.subtract = $c),
          (Le.sum = function (t) {
            return t && t.length ? Gn(t, ac) : 0;
          }),
          (Le.sumBy = function (t, n) {
            return t && t.length ? Gn(t, lo(n, 2)) : 0;
          }),
          (Le.template = function (t, n, r) {
            var i = Le.templateSettings;
            r && xo(t, n, r) && (n = e), (t = wu(t)), (n = ju({}, n, i, to));
            var o,
              a,
              u = ju({}, n.imports, i.imports, to),
              c = zu(u),
              s = Qn(u, c),
              l = 0,
              f = n.interpolate || wt,
              h = "__p += '",
              d = St(
                (n.escape || wt).source +
                  "|" +
                  f.source +
                  "|" +
                  (f === K ? dt : wt).source +
                  "|" +
                  (n.evaluate || wt).source +
                  "|$",
                "g"
              ),
              p =
                "//# sourceURL=" +
                (Ot.call(n, "sourceURL")
                  ? (n.sourceURL + "").replace(/\s/g, " ")
                  : "lodash.templateSources[" + ++on + "]") +
                "\n";
            t.replace(d, function (n, e, r, i, u, c) {
              return (
                r || (r = i),
                (h += t.slice(l, c).replace(xt, oe)),
                e && ((o = !0), (h += "' +\n__e(" + e + ") +\n'")),
                u && ((a = !0), (h += "';\n" + u + ";\n__p += '")),
                r &&
                  (h += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
                (l = c + n.length),
                n
              );
            }),
              (h += "';\n");
            var g = Ot.call(n, "variable") && n.variable;
            if (g) {
              if (ft.test(g))
                throw new jt(
                  "Invalid `variable` option passed into `_.template`"
                );
            } else h = "with (obj) {\n" + h + "\n}\n";
            (h = (a ? h.replace(B, "") : h).replace(Y, "$1").replace(P, "$1;")),
              (h =
                "function(" +
                (g || "obj") +
                ") {\n" +
                (g ? "" : "obj || (obj = {});\n") +
                "var __t, __p = ''" +
                (o ? ", __e = _.escape" : "") +
                (a
                  ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                  : ";\n") +
                h +
                "return __p\n}");
            var v = nc(function () {
              return kt(c, p + "return " + h).apply(e, s);
            });
            if (((v.source = h), Ka(v))) throw v;
            return v;
          }),
          (Le.times = function (t, n) {
            if ((t = yu(t)) < 1 || t > h) return [];
            var e = p,
              r = we(t, p);
            (n = lo(n)), (t -= p);
            for (var i = Zn(r, n); ++e < t; ) n(e);
            return i;
          }),
          (Le.toFinite = vu),
          (Le.toInteger = yu),
          (Le.toLength = mu),
          (Le.toLower = function (t) {
            return wu(t).toLowerCase();
          }),
          (Le.toNumber = bu),
          (Le.toSafeInteger = function (t) {
            return t ? sr(yu(t), -9007199254740991, h) : 0 === t ? t : 0;
          }),
          (Le.toString = wu),
          (Le.toUpper = function (t) {
            return wu(t).toUpperCase();
          }),
          (Le.trim = function (t, n, r) {
            if ((t = wu(t)) && (r || n === e)) return Xn(t);
            if (!t || !(n = fi(n))) return t;
            var i = de(t),
              o = de(n);
            return Mi(i, te(i, o), ne(i, o) + 1).join("");
          }),
          (Le.trimEnd = function (t, n, r) {
            if ((t = wu(t)) && (r || n === e)) return t.slice(0, pe(t) + 1);
            if (!t || !(n = fi(n))) return t;
            var i = de(t);
            return Mi(i, 0, ne(i, de(n)) + 1).join("");
          }),
          (Le.trimStart = function (t, n, r) {
            if ((t = wu(t)) && (r || n === e)) return t.replace(ot, "");
            if (!t || !(n = fi(n))) return t;
            var i = de(t);
            return Mi(i, te(i, de(n))).join("");
          }),
          (Le.truncate = function (t, n) {
            var r = 30,
              i = "...";
            if (ru(n)) {
              var o = "separator" in n ? n.separator : o;
              (r = "length" in n ? yu(n.length) : r),
                (i = "omission" in n ? fi(n.omission) : i);
            }
            var a = (t = wu(t)).length;
            if (ae(t)) {
              var u = de(t);
              a = u.length;
            }
            if (r >= a) return t;
            var c = r - he(i);
            if (c < 1) return i;
            var s = u ? Mi(u, 0, c).join("") : t.slice(0, c);
            if (o === e) return s + i;
            if ((u && (c += s.length - c), cu(o))) {
              if (t.slice(c).search(o)) {
                var l,
                  f = s;
                for (
                  o.global || (o = St(o.source, wu(pt.exec(o)) + "g")),
                    o.lastIndex = 0;
                  (l = o.exec(f));

                )
                  var h = l.index;
                s = s.slice(0, h === e ? c : h);
              }
            } else if (t.indexOf(fi(o), c) != c) {
              var d = s.lastIndexOf(o);
              d > -1 && (s = s.slice(0, d));
            }
            return s + i;
          }),
          (Le.unescape = function (t) {
            return (t = wu(t)) && G.test(t) ? t.replace(W, ge) : t;
          }),
          (Le.uniqueId = function (t) {
            var n = ++Ut;
            return wu(t) + n;
          }),
          (Le.upperCase = Qu),
          (Le.upperFirst = Ku),
          (Le.each = wa),
          (Le.eachRight = xa),
          (Le.first = Zo),
          lc(
            Le,
            ((jc = {}),
            xr(Le, function (t, n) {
              Ot.call(Le.prototype, n) || (jc[n] = t);
            }),
            jc),
            { chain: !1 }
          ),
          (Le.VERSION = "4.17.21"),
          $n(
            [
              "bind",
              "bindKey",
              "curry",
              "curryRight",
              "partial",
              "partialRight",
            ],
            function (t) {
              Le[t].placeholder = Le;
            }
          ),
          $n(["drop", "take"], function (t, n) {
            (We.prototype[t] = function (r) {
              r = r === e ? 1 : _e(yu(r), 0);
              var i = this.__filtered__ && !n ? new We(this) : this.clone();
              return (
                i.__filtered__
                  ? (i.__takeCount__ = we(r, i.__takeCount__))
                  : i.__views__.push({
                      size: we(r, p),
                      type: t + (i.__dir__ < 0 ? "Right" : ""),
                    }),
                i
              );
            }),
              (We.prototype[t + "Right"] = function (n) {
                return this.reverse()[t](n).reverse();
              });
          }),
          $n(["filter", "map", "takeWhile"], function (t, n) {
            var e = n + 1,
              r = 1 == e || 3 == e;
            We.prototype[t] = function (t) {
              var n = this.clone();
              return (
                n.__iteratees__.push({ iteratee: lo(t, 3), type: e }),
                (n.__filtered__ = n.__filtered__ || r),
                n
              );
            };
          }),
          $n(["head", "last"], function (t, n) {
            var e = "take" + (n ? "Right" : "");
            We.prototype[t] = function () {
              return this[e](1).value()[0];
            };
          }),
          $n(["initial", "tail"], function (t, n) {
            var e = "drop" + (n ? "" : "Right");
            We.prototype[t] = function () {
              return this.__filtered__ ? new We(this) : this[e](1);
            };
          }),
          (We.prototype.compact = function () {
            return this.filter(ac);
          }),
          (We.prototype.find = function (t) {
            return this.filter(t).head();
          }),
          (We.prototype.findLast = function (t) {
            return this.reverse().find(t);
          }),
          (We.prototype.invokeMap = Qr(function (t, n) {
            return "function" == typeof t
              ? new We(this)
              : this.map(function (e) {
                  return Er(e, t, n);
                });
          })),
          (We.prototype.reject = function (t) {
            return this.filter(qa(lo(t)));
          }),
          (We.prototype.slice = function (t, n) {
            t = yu(t);
            var r = this;
            return r.__filtered__ && (t > 0 || n < 0)
              ? new We(r)
              : (t < 0 ? (r = r.takeRight(-t)) : t && (r = r.drop(t)),
                n !== e &&
                  (r = (n = yu(n)) < 0 ? r.dropRight(-n) : r.take(n - t)),
                r);
          }),
          (We.prototype.takeRightWhile = function (t) {
            return this.reverse().takeWhile(t).reverse();
          }),
          (We.prototype.toArray = function () {
            return this.take(p);
          }),
          xr(We.prototype, function (t, n) {
            var r = /^(?:filter|find|map|reject)|While$/.test(n),
              i = /^(?:head|last)$/.test(n),
              o = Le[i ? "take" + ("last" == n ? "Right" : "") : n],
              a = i || /^find/.test(n);
            o &&
              (Le.prototype[n] = function () {
                var n = this.__wrapped__,
                  u = i ? [1] : arguments,
                  c = n instanceof We,
                  s = u[0],
                  l = c || Ha(n),
                  f = function (t) {
                    var n = o.apply(Le, zn([t], u));
                    return i && h ? n[0] : n;
                  };
                l &&
                  r &&
                  "function" == typeof s &&
                  1 != s.length &&
                  (c = l = !1);
                var h = this.__chain__,
                  d = !!this.__actions__.length,
                  p = a && !h,
                  g = c && !d;
                if (!a && l) {
                  n = g ? n : new We(this);
                  var v = t.apply(n, u);
                  return (
                    v.__actions__.push({ func: va, args: [f], thisArg: e }),
                    new Pe(v, h)
                  );
                }
                return p && g
                  ? t.apply(this, u)
                  : ((v = this.thru(f)),
                    p ? (i ? v.value()[0] : v.value()) : v);
              });
          }),
          $n(
            ["pop", "push", "shift", "sort", "splice", "unshift"],
            function (t) {
              var n = Ct[t],
                e = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                r = /^(?:pop|shift)$/.test(t);
              Le.prototype[t] = function () {
                var t = arguments;
                if (r && !this.__chain__) {
                  var i = this.value();
                  return n.apply(Ha(i) ? i : [], t);
                }
                return this[e](function (e) {
                  return n.apply(Ha(e) ? e : [], t);
                });
              };
            }
          ),
          xr(We.prototype, function (t, n) {
            var e = Le[n];
            if (e) {
              var r = e.name + "";
              Ot.call(Ie, r) || (Ie[r] = []), Ie[r].push({ name: n, func: e });
            }
          }),
          (Ie[Li(e, 2).name] = [{ name: "wrapper", func: e }]),
          (We.prototype.clone = function () {
            var t = new We(this.__wrapped__);
            return (
              (t.__actions__ = Ci(this.__actions__)),
              (t.__dir__ = this.__dir__),
              (t.__filtered__ = this.__filtered__),
              (t.__iteratees__ = Ci(this.__iteratees__)),
              (t.__takeCount__ = this.__takeCount__),
              (t.__views__ = Ci(this.__views__)),
              t
            );
          }),
          (We.prototype.reverse = function () {
            if (this.__filtered__) {
              var t = new We(this);
              (t.__dir__ = -1), (t.__filtered__ = !0);
            } else (t = this.clone()).__dir__ *= -1;
            return t;
          }),
          (We.prototype.value = function () {
            var t = this.__wrapped__.value(),
              n = this.__dir__,
              e = Ha(t),
              r = n < 0,
              i = e ? t.length : 0,
              o = (function (t, n, e) {
                var r = -1,
                  i = e.length;
                for (; ++r < i; ) {
                  var o = e[r],
                    a = o.size;
                  switch (o.type) {
                    case "drop":
                      t += a;
                      break;
                    case "dropRight":
                      n -= a;
                      break;
                    case "take":
                      n = we(n, t + a);
                      break;
                    case "takeRight":
                      t = _e(t, n - a);
                  }
                }
                return { start: t, end: n };
              })(0, i, this.__views__),
              a = o.start,
              u = o.end,
              c = u - a,
              s = r ? u : a - 1,
              l = this.__iteratees__,
              f = l.length,
              h = 0,
              d = we(c, this.__takeCount__);
            if (!e || (!r && i == c && d == c)) return vi(t, this.__actions__);
            var p = [];
            t: for (; c-- && h < d; ) {
              for (var g = -1, v = t[(s += n)]; ++g < f; ) {
                var y = l[g],
                  m = y.iteratee,
                  b = y.type,
                  _ = m(v);
                if (2 == b) v = _;
                else if (!_) {
                  if (1 == b) continue t;
                  break t;
                }
              }
              p[h++] = v;
            }
            return p;
          }),
          (Le.prototype.at = ya),
          (Le.prototype.chain = function () {
            return ga(this);
          }),
          (Le.prototype.commit = function () {
            return new Pe(this.value(), this.__chain__);
          }),
          (Le.prototype.next = function () {
            this.__values__ === e && (this.__values__ = gu(this.value()));
            var t = this.__index__ >= this.__values__.length;
            return {
              done: t,
              value: t ? e : this.__values__[this.__index__++],
            };
          }),
          (Le.prototype.plant = function (t) {
            for (var n, r = this; r instanceof Ye; ) {
              var i = Lo(r);
              (i.__index__ = 0),
                (i.__values__ = e),
                n ? (o.__wrapped__ = i) : (n = i);
              var o = i;
              r = r.__wrapped__;
            }
            return (o.__wrapped__ = t), n;
          }),
          (Le.prototype.reverse = function () {
            var t = this.__wrapped__;
            if (t instanceof We) {
              var n = t;
              return (
                this.__actions__.length && (n = new We(this)),
                (n = n.reverse()).__actions__.push({
                  func: va,
                  args: [ra],
                  thisArg: e,
                }),
                new Pe(n, this.__chain__)
              );
            }
            return this.thru(ra);
          }),
          (Le.prototype.toJSON =
            Le.prototype.valueOf =
            Le.prototype.value =
              function () {
                return vi(this.__wrapped__, this.__actions__);
              }),
          (Le.prototype.first = Le.prototype.head),
          nn &&
            (Le.prototype[nn] = function () {
              return this;
            }),
          Le
        );
      })();
      gn ? (((gn.exports = ve)._ = ve), (pn._ = ve)) : (dn._ = ve);
    }.call(Q));
  })(Vo, Vo.exports);
  function Fo(t) {
    return (
      !!t.constructor &&
      "function" == typeof t.constructor.isBuffer &&
      t.constructor.isBuffer(t)
    );
  }
  var Ro = function (t) {
      for (var n = new Array(t), e = 0; e < t; ++e) n[e] = e;
      return n;
    },
    Lo = function (t) {
      return (
        null != t &&
        (Fo(t) ||
          (function (t) {
            return (
              "function" == typeof t.readFloatLE &&
              "function" == typeof t.slice &&
              Fo(t.slice(0, 0))
            );
          })(t) ||
          !!t._isBuffer)
      );
    },
    Bo = "undefined" != typeof Float64Array;
  function Yo(t, n) {
    return t[0] - n[0];
  }
  function Po() {
    var t,
      n = this.stride,
      e = new Array(n.length);
    for (t = 0; t < e.length; ++t) e[t] = [Math.abs(n[t]), t];
    e.sort(Yo);
    var r = new Array(e.length);
    for (t = 0; t < r.length; ++t) r[t] = e[t][1];
    return r;
  }
  function Wo(t, n) {
    var e = ["View", n, "d", t].join("");
    n < 0 && (e = "View_Nil" + t);
    var r = "generic" === t;
    if (-1 === n) {
      var i =
        "function " +
        e +
        "(a){this.data=a;};var proto=" +
        e +
        ".prototype;proto.dtype='" +
        t +
        "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " +
        e +
        "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" +
        e +
        "(a){return new " +
        e +
        "(a);}";
      return new Function(i)();
    }
    if (0 === n) {
      i =
        "function " +
        e +
        "(a,d) {this.data = a;this.offset = d};var proto=" +
        e +
        ".prototype;proto.dtype='" +
        t +
        "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " +
        e +
        "_copy() {return new " +
        e +
        "(this.data,this.offset)};proto.pick=function " +
        e +
        "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " +
        e +
        "_get(){return " +
        (r ? "this.data.get(this.offset)" : "this.data[this.offset]") +
        "};proto.set=function " +
        e +
        "_set(v){return " +
        (r ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") +
        "};return function construct_" +
        e +
        "(a,b,c,d){return new " +
        e +
        "(a,d)}";
      return new Function("TrivialArray", i)(Ho[t][0]);
    }
    i = ["'use strict'"];
    var o = Ro(n),
      a = o.map(function (t) {
        return "i" + t;
      }),
      u =
        "this.offset+" +
        o
          .map(function (t) {
            return "this.stride[" + t + "]*i" + t;
          })
          .join("+"),
      c = o
        .map(function (t) {
          return "b" + t;
        })
        .join(","),
      s = o
        .map(function (t) {
          return "c" + t;
        })
        .join(",");
    i.push(
      "function " + e + "(a," + c + "," + s + ",d){this.data=a",
      "this.shape=[" + c + "]",
      "this.stride=[" + s + "]",
      "this.offset=d|0}",
      "var proto=" + e + ".prototype",
      "proto.dtype='" + t + "'",
      "proto.dimension=" + n
    ),
      i.push(
        "Object.defineProperty(proto,'size',{get:function " +
          e +
          "_size(){return " +
          o
            .map(function (t) {
              return "this.shape[" + t + "]";
            })
            .join("*"),
        "}})"
      ),
      1 === n
        ? i.push("proto.order=[0]")
        : (i.push("Object.defineProperty(proto,'order',{get:"),
          n < 4
            ? (i.push("function " + e + "_order(){"),
              2 === n
                ? i.push(
                    "return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})"
                  )
                : 3 === n &&
                  i.push(
                    "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})"
                  ))
            : i.push("ORDER})")),
      i.push("proto.set=function " + e + "_set(" + a.join(",") + ",v){"),
      r
        ? i.push("return this.data.set(" + u + ",v)}")
        : i.push("return this.data[" + u + "]=v}"),
      i.push("proto.get=function " + e + "_get(" + a.join(",") + "){"),
      r
        ? i.push("return this.data.get(" + u + ")}")
        : i.push("return this.data[" + u + "]}"),
      i.push(
        "proto.index=function " + e + "_index(",
        a.join(),
        "){return " + u + "}"
      ),
      i.push(
        "proto.hi=function " +
          e +
          "_hi(" +
          a.join(",") +
          "){return new " +
          e +
          "(this.data," +
          o
            .map(function (t) {
              return [
                "(typeof i",
                t,
                "!=='number'||i",
                t,
                "<0)?this.shape[",
                t,
                "]:i",
                t,
                "|0",
              ].join("");
            })
            .join(",") +
          "," +
          o
            .map(function (t) {
              return "this.stride[" + t + "]";
            })
            .join(",") +
          ",this.offset)}"
      );
    var l = o.map(function (t) {
        return "a" + t + "=this.shape[" + t + "]";
      }),
      f = o.map(function (t) {
        return "c" + t + "=this.stride[" + t + "]";
      });
    i.push(
      "proto.lo=function " +
        e +
        "_lo(" +
        a.join(",") +
        "){var b=this.offset,d=0," +
        l.join(",") +
        "," +
        f.join(",")
    );
    for (var h = 0; h < n; ++h)
      i.push(
        "if(typeof i" +
          h +
          "==='number'&&i" +
          h +
          ">=0){d=i" +
          h +
          "|0;b+=c" +
          h +
          "*d;a" +
          h +
          "-=d}"
      );
    i.push(
      "return new " +
        e +
        "(this.data," +
        o
          .map(function (t) {
            return "a" + t;
          })
          .join(",") +
        "," +
        o
          .map(function (t) {
            return "c" + t;
          })
          .join(",") +
        ",b)}"
    ),
      i.push(
        "proto.step=function " +
          e +
          "_step(" +
          a.join(",") +
          "){var " +
          o
            .map(function (t) {
              return "a" + t + "=this.shape[" + t + "]";
            })
            .join(",") +
          "," +
          o
            .map(function (t) {
              return "b" + t + "=this.stride[" + t + "]";
            })
            .join(",") +
          ",c=this.offset,d=0,ceil=Math.ceil"
      );
    for (h = 0; h < n; ++h)
      i.push(
        "if(typeof i" +
          h +
          "==='number'){d=i" +
          h +
          "|0;if(d<0){c+=b" +
          h +
          "*(a" +
          h +
          "-1);a" +
          h +
          "=ceil(-a" +
          h +
          "/d)}else{a" +
          h +
          "=ceil(a" +
          h +
          "/d)}b" +
          h +
          "*=d}"
      );
    i.push(
      "return new " +
        e +
        "(this.data," +
        o
          .map(function (t) {
            return "a" + t;
          })
          .join(",") +
        "," +
        o
          .map(function (t) {
            return "b" + t;
          })
          .join(",") +
        ",c)}"
    );
    var d = new Array(n),
      p = new Array(n);
    for (h = 0; h < n; ++h) (d[h] = "a[i" + h + "]"), (p[h] = "b[i" + h + "]");
    i.push(
      "proto.transpose=function " +
        e +
        "_transpose(" +
        a +
        "){" +
        a
          .map(function (t, n) {
            return t + "=(" + t + "===undefined?" + n + ":" + t + "|0)";
          })
          .join(";"),
      "var a=this.shape,b=this.stride;return new " +
        e +
        "(this.data," +
        d.join(",") +
        "," +
        p.join(",") +
        ",this.offset)}"
    ),
      i.push(
        "proto.pick=function " +
          e +
          "_pick(" +
          a +
          "){var a=[],b=[],c=this.offset"
      );
    for (h = 0; h < n; ++h)
      i.push(
        "if(typeof i" +
          h +
          "==='number'&&i" +
          h +
          ">=0){c=(c+this.stride[" +
          h +
          "]*i" +
          h +
          ")|0}else{a.push(this.shape[" +
          h +
          "]);b.push(this.stride[" +
          h +
          "])}"
      );
    return (
      i.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),
      i.push(
        "return function construct_" +
          e +
          "(data,shape,stride,offset){return new " +
          e +
          "(data," +
          o
            .map(function (t) {
              return "shape[" + t + "]";
            })
            .join(",") +
          "," +
          o
            .map(function (t) {
              return "stride[" + t + "]";
            })
            .join(",") +
          ",offset)}"
      ),
      new Function("CTOR_LIST", "ORDER", i.join("\n"))(Ho[t], Po)
    );
  }
  var Ho = {
    float32: [],
    float64: [],
    int8: [],
    int16: [],
    int32: [],
    uint8: [],
    uint16: [],
    uint32: [],
    array: [],
    uint8_clamped: [],
    bigint64: [],
    biguint64: [],
    buffer: [],
    generic: [],
  };
  var Go = function (t, n, e, r) {
    if (void 0 === t) return (0, Ho.array[0])([]);
    "number" == typeof t && (t = [t]), void 0 === n && (n = [t.length]);
    var i = n.length;
    if (void 0 === e) {
      e = new Array(i);
      for (var o = i - 1, a = 1; o >= 0; --o) (e[o] = a), (a *= n[o]);
    }
    if (void 0 === r) {
      r = 0;
      for (o = 0; o < i; ++o) e[o] < 0 && (r -= (n[o] - 1) * e[o]);
    }
    for (
      var u = (function (t) {
          if (Lo(t)) return "buffer";
          if (Bo)
            switch (Object.prototype.toString.call(t)) {
              case "[object Float64Array]":
                return "float64";
              case "[object Float32Array]":
                return "float32";
              case "[object Int8Array]":
                return "int8";
              case "[object Int16Array]":
                return "int16";
              case "[object Int32Array]":
                return "int32";
              case "[object Uint8Array]":
                return "uint8";
              case "[object Uint16Array]":
                return "uint16";
              case "[object Uint32Array]":
                return "uint32";
              case "[object Uint8ClampedArray]":
                return "uint8_clamped";
              case "[object BigInt64Array]":
                return "bigint64";
              case "[object BigUint64Array]":
                return "biguint64";
            }
          return Array.isArray(t) ? "array" : "generic";
        })(t),
        c = Ho[u];
      c.length <= i + 1;

    )
      c.push(Wo(u, c.length - 1));
    return (0, c[i + 1])(t, n, e, r);
  };
  function Zo(...t) {}
  function Xo(t, n) {
    return t.data === n.data;
  }
  class Jo {
    constructor(t, ...n) {
      (this.data = t), (this.data = t), (this.children = n || []);
    }
    isLeaf() {
      return 0 === this.children.length;
    }
    fullorder(t, n, e) {
      if ((t(this), !e || e(this)))
        for (const r of this.children) r.fullorder(t, n, e);
      n(this);
    }
    preorder(t, n) {
      this.fullorder(t, Zo, n);
    }
    postorder(t, n) {
      this.fullorder(Zo, t, n);
    }
    leaves(t) {
      const n = [];
      return (
        this.preorder((e) => {
          (e.isLeaf() || (t && !t(e))) && n.push(e);
        }, t),
        n
      );
    }
    merge(t, n = Xo) {
      const e = this.children.find((e) => n(e, t));
      return (
        e ? t.children.forEach((t) => e.merge(t, n)) : this.children.push(t),
        this
      );
    }
    has(t, n = Xo) {
      const e = this.children.find((e) => n(e, t));
      return !!e && t.children.every((t) => e.has(t, n));
    }
    find(t, n = Xo) {
      if (t.isLeaf()) return this.children.find((e) => n(e, t));
      {
        const e = this.children.find((e) => n(e, t));
        if (e) return e.find(t.children[0], n);
      }
    }
    remove(t, n = Xo) {
      if (t.isLeaf()) {
        const e = this.children.findIndex((e) => n(e, t));
        if (e > -1) return this.children.splice(e, 1)[0];
      } else {
        const e = this.children.find((e) => n(e, t));
        if (e) return e.remove(t, n);
      }
    }
  }
  function Qo(t) {
    const n = (function (t) {
        let n = 0;
        const e = [];
        let r = "";
        for (; n < t.length; ) {
          switch (t.charAt(n)) {
            case ":":
            case ",":
            case "[":
            case "]":
              "" !== r && (e.push(r), (r = "")), e.push(t.charAt(n));
              break;
            default:
              r += t.charAt(n);
          }
          n++;
        }
        "" !== r && e.push(r);
        return e;
      })(t),
      e = new Set([",", ":", "[", "]"]);
    let r = 0;
    function i(t) {
      if (n[r] !== t) throw new Error(`Expected "${t}, got ${n[r]}".`);
      r++;
    }
    function o() {
      return (
        (function () {
          if (":" === n[r + 1]) {
            const n = new Jo(a());
            return i(":"), (t = n), o().reduce((t, n) => t.merge(n), t), [n];
          }
          var t;
        })() ??
        (function () {
          if ("[" === n[r]) {
            i("[");
            const t = o();
            return i(","), t.push(...u()), i("]"), t;
          }
        })() ??
        (function () {
          const t = a();
          if (t) return [new Jo(t)];
        })()
      );
    }
    function a() {
      if (n[r] && !e.has(n[r])) {
        const t = n[r];
        return r++, t;
      }
    }
    function u() {
      return (
        (function () {
          if ("," === n[r + 1]) {
            const t = o();
            return i(","), t.push(...u()), t;
          }
        })() ?? o()
      );
    }
    return o();
  }
  function Ko(t) {
    return t.split(":")[0];
  }
  function ta(t) {
    const n = new Set();
    for (const { actual: e, observed: r } of t) {
      for (const t of e) n.add(Ko(t));
      for (const t of r) n.add(Ko(t));
    }
    return n;
  }
  function na(t, n) {
    const e = new Set();
    for (const { actual: r, observed: i } of t) {
      const t = r.find((t) => Ko(t) === n);
      t && e.add(t);
      const o = i.find((t) => Ko(t) === n);
      o && e.add(o);
    }
    return [...e];
  }
  function ea(t, n) {
    return t.includes(`${n}:`) || t === n;
  }
  function ra(t, n, e) {
    const r = t.findIndex((t) => Ko(t) === n),
      i = t.findIndex((t) => Ko(t) === e);
    i > -1 && ((t[r] = t[r].concat(`:${t[i]}`)), t.splice(i, 1));
  }
  function ia(t) {
    const n = new Jo("root");
    t.forEach((t) => Qo(t).forEach((t) => n.merge(t)));
    for (const t of n.children)
      t.preorder((t) => {
        t.children.length > 1 &&
          (t.children = [
            new Jo(
              `{${t
                .leaves()
                .map((t) => t.data)
                .join(",")}}`
            ),
          ]);
      });
    return n.children.map((t) =>
      (function (t) {
        const n = [];
        return t.preorder((t) => n.push(t.data)), n.join(":");
      })(t)
    );
  }
  function oa(t, n) {
    let e = Vo.exports.cloneDeep(n);
    if (
      ((function (t) {
        const n = new Set();
        for (const { actual: e, observed: r } of t)
          e.forEach((t) => n.add(Ko(t))), r.forEach((t) => n.add(Ko(t)));
        for (const { actual: e, observed: r } of t)
          for (const t of n)
            e.find((n) => Ko(n) === t) || e.push(`${t}:none`),
              r.find((n) => Ko(n) === t) || r.push(`${t}:none`);
      })(e),
      t.where && t.where instanceof Array)
    )
      throw new Error("Multiple conditions are currently not supported.");
    !t.where ||
      t.where instanceof Array ||
      (e = (function (t, n) {
        const e = t.filter((t) => t[n.qualifier].some((t) => t.includes(n.is)));
        for (const t of e)
          t[n.qualifier] = t[n.qualifier].filter((t) => !t.includes(n.label));
        return e.filter(
          (t) => 0 !== t.actual.length && 0 !== t.observed.length
        );
      })(e, t.where)),
      t.filter &&
        t.filter.length > 0 &&
        (e = (function (t, n) {
          return t.filter(
            (t) =>
              n.some((n) => t.actual.some((t) => ea(t, n))) &&
              n.some((n) => t.actual.some((t) => ea(t, n)))
          );
        })(e, t.filter));
    for (const { actual: t, observed: n } of e) ia(t), ia(n);
    for (let n = 1; n < t.classes.length; ++n)
      for (const r of e)
        ra(r.actual, t.classes[0], t.classes[n]),
          ra(r.observed, t.classes[0], t.classes[n]);
    const r = (function (t, n) {
        return Et(
          t,
          (t) => cn(t, (t) => t.count),
          (t) => t.actual.find((t) => Ko(t) === n) ?? "none",
          (t) => t.observed.find((t) => Ko(t) === n) ?? "none"
        );
      })(e, t.classes[0]),
      i = (function (t) {
        let n = 0;
        return (
          t.postorder((t) => {
            if (t.isLeaf()) {
              const e = { start: n, end: n + 1 };
              (t.data = { ...t.data, ...e }), n++;
            } else {
              const n = {
                start: t.children[0].data.start,
                end: t.children[t.children.length - 1].data.end,
              };
              t.data = { ...t.data, ...n };
            }
          }),
          t
        );
      })(
        [...r.keys()]
          .map((t) => {
            const n = t.split(":"),
              e = new Jo({ name: n[0], id: n[0], start: 0, end: 0 });
            let r = e;
            for (let t = 1; t < n.length; ++t) {
              const e = new Jo({
                name: n[t],
                id: r.data.id.concat(`:${n[t]}`),
                start: 0,
                end: 0,
              });
              r.children.push(e), (r = e);
            }
            return e;
          })
          .reduce(
            (t, n) => t.merge(n, (t, n) => t.data.id === n.data.id),
            new Jo({ name: "root", id: "root", start: 0, end: 0 })
          )
      );
    const o = i.leaves(),
      a = [o.length, o.length],
      u = Go(new Int32Array(a.reduce((t, n) => t * n, 1)), a);
    return (
      o.forEach((t, n) => {
        o.forEach((e, i) => {
          u.set(n, i, r.get(t.data.id).get(e.data.id));
        });
      }),
      i.children[0].postorder((t) => {
        1 === t.children.length &&
          t.children[0].isLeaf() &&
          ((t.data.name = `${t.data.name}:${t.children[0].data.name}`),
          (t.children = []));
      }),
      new lt(u, i.children[0])
    );
  }
  function aa(t, n, e) {
    const r = t.slice();
    return (r[22] = n[e]), (r[24] = e), r;
  }
  function ua(t, n, e) {
    const r = t.slice();
    return (r[25] = n[e].node), (r[26] = n[e].pos), r;
  }
  function ca(t, n, e) {
    const r = t.slice();
    return (r[29] = n[e].node), (r[30] = n[e].pos), r;
  }
  function sa(t, n, e) {
    const r = t.slice();
    return (r[33] = n[e].node), (r[34] = n[e].pos), r;
  }
  function la(t, n, e) {
    const r = t.slice();
    return (r[29] = n[e].node), (r[30] = n[e].pos), (r[37] = n[e].span), r;
  }
  function fa(t, n, e) {
    const r = t.slice();
    return (r[33] = n[e].node), (r[34] = n[e].pos), r;
  }
  function ha(t) {
    let n;
    return {
      c() {
        n = _("Hover over cells to show more information.");
      },
      m(t, e) {
        g(t, n, e);
      },
      p: e,
      d(t) {
        t && v(n);
      },
    };
  }
  function da(t) {
    let n,
      e,
      r,
      i,
      o,
      a,
      u,
      c,
      s,
      l = t[11][0].data.name.substring(0, 21) + "",
      f = t[11][1].data.name.substring(0, 21) + "",
      h = t[5].frequency(t[11][0], t[11][1]) + "";
    return {
      c() {
        (n = m("span")),
          (e = _(l)),
          (r = _(" was labeled as ")),
          (i = m("span")),
          (o = _(f)),
          (a = _("\n    in ")),
          (u = m("span")),
          (c = _(h)),
          (s = _(" instances.")),
          j(n, "class", "highlight svelte-1llbj64"),
          j(i, "class", "highlight svelte-1llbj64"),
          j(u, "class", "highlight svelte-1llbj64");
      },
      m(t, l) {
        g(t, n, l),
          p(n, e),
          g(t, r, l),
          g(t, i, l),
          p(i, o),
          g(t, a, l),
          g(t, u, l),
          p(u, c),
          g(t, s, l);
      },
      p(t, n) {
        2048 & n[0] &&
          l !== (l = t[11][0].data.name.substring(0, 21) + "") &&
          k(e, l),
          2048 & n[0] &&
            f !== (f = t[11][1].data.name.substring(0, 21) + "") &&
            k(o, f),
          2080 & n[0] &&
            h !== (h = t[5].frequency(t[11][0], t[11][1]) + "") &&
            k(c, h);
      },
      d(t) {
        t && v(n), t && v(r), t && v(i), t && v(a), t && v(u), t && v(s);
      },
    };
  }
  function pa(t) {
    let n, r, i, o;
    return {
      c() {
        (n = b("text")),
          (r = _("< go back")),
          j(n, "class", "breadcrumb svelte-1llbj64"),
          j(n, "y", "120");
      },
      m(e, a) {
        g(e, n, a), p(n, r), i || ((o = M(n, "click", t[17])), (i = !0));
      },
      p: e,
      d(t) {
        t && v(n), (i = !1), o();
      },
    };
  }
  function ga(t) {
    let n, e;
    return (
      (n = new To({ props: { scale: t[15].scale(), cellSize: t[0] } })),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, r) {
          H(n, t, r), (e = !0);
        },
        p(t, e) {
          const r = {};
          32768 & e[0] && (r.scale = t[15].scale()),
            1 & e[0] && (r.cellSize = t[0]),
            n.$set(r);
        },
        i(t) {
          e || (Y(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          P(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          G(n, t);
        },
      }
    );
  }
  function va(t) {
    let n, e;
    return (
      (n = new qo({ props: { scale: t[15].scale(), cellSize: t[0] } })),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, r) {
          H(n, t, r), (e = !0);
        },
        p(t, e) {
          const r = {};
          32768 & e[0] && (r.scale = t[15].scale()),
            1 & e[0] && (r.cellSize = t[0]),
            n.$set(r);
        },
        i(t) {
          e || (Y(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          P(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          G(n, t);
        },
      }
    );
  }
  function ya(t) {
    let n, e, r;
    return {
      c() {
        (n = b("rect")),
          j(n, "class", "hover svelte-1llbj64"),
          j(n, "x", 0),
          j(n, "y", (e = t[13].pos[1] * t[0] + t[1])),
          j(n, "width", (r = t[10] - 2 * Ca)),
          j(n, "height", t[0]);
      },
      m(t, e) {
        g(t, n, e);
      },
      p(t, i) {
        8195 & i[0] && e !== (e = t[13].pos[1] * t[0] + t[1]) && j(n, "y", e),
          1024 & i[0] && r !== (r = t[10] - 2 * Ca) && j(n, "width", r),
          1 & i[0] && j(n, "height", t[0]);
      },
      d(t) {
        t && v(n);
      },
    };
  }
  function ma(t) {
    let n, e, r;
    return {
      c() {
        (n = b("rect")),
          j(n, "class", "hover svelte-1llbj64"),
          j(n, "x", (e = t[14].pos[1] * t[0] + t[1])),
          j(n, "y", 0),
          j(n, "width", t[0]),
          j(n, "height", (r = t[10] - 2 * Ca));
      },
      m(t, e) {
        g(t, n, e);
      },
      p(t, i) {
        16387 & i[0] && e !== (e = t[14].pos[1] * t[0] + t[1]) && j(n, "x", e),
          1 & i[0] && j(n, "width", t[0]),
          1024 & i[0] && r !== (r = t[10] - 2 * Ca) && j(n, "height", r);
      },
      d(t) {
        t && v(n);
      },
    };
  }
  function ba(t) {
    let n, e, r, i, o;
    return (
      (r = new Mo({ props: { node: t[33], direction: 1 } })),
      {
        c() {
          (n = b("g")),
            (e = b("g")),
            W(r.$$.fragment),
            j(e, "transform", "rotate(-90)"),
            j(
              n,
              "transform",
              (i =
                "translate(" +
                (t[34][1] * t[0] + t[0] / 2 + t[1]) +
                "," +
                (t[1] - t[34][0] * t[2]) +
                ")")
            );
        },
        m(t, i) {
          g(t, n, i), p(n, e), H(r, e, null), (o = !0);
        },
        p(t, e) {
          const a = {};
          256 & e[0] && (a.node = t[33]),
            r.$set(a),
            (!o ||
              (263 & e[0] &&
                i !==
                  (i =
                    "translate(" +
                    (t[34][1] * t[0] + t[0] / 2 + t[1]) +
                    "," +
                    (t[1] - t[34][0] * t[2]) +
                    ")"))) &&
              j(n, "transform", i);
        },
        i(t) {
          o || (Y(r.$$.fragment, t), (o = !0));
        },
        o(t) {
          P(r.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && v(n), G(r);
        },
      }
    );
  }
  function _a(t) {
    let n, e, r, i;
    return {
      c() {
        (n = b("line")),
          j(n, "x1", "0.3em"),
          j(n, "x2", "0.3em"),
          j(n, "y1", (e = t[0] / 2)),
          j(n, "y2", (r = t[37] * t[0] + t[0] / 2)),
          j(
            n,
            "stroke",
            (i = t[29].children.find(t[21]) ? "black" : "#cccccc")
          );
      },
      m(t, e) {
        g(t, n, e);
      },
      p(t, o) {
        1 & o[0] && e !== (e = t[0] / 2) && j(n, "y1", e),
          257 & o[0] && r !== (r = t[37] * t[0] + t[0] / 2) && j(n, "y2", r),
          2304 & o[0] &&
            i !== (i = t[29].children.find(t[21]) ? "black" : "#cccccc") &&
            j(n, "stroke", i);
      },
      d(t) {
        t && v(n);
      },
    };
  }
  function wa(t) {
    let n,
      e,
      r,
      i,
      o,
      a = t[37] > 0 && _a(t);
    return (
      (r = new Mo({ props: { node: t[29], direction: 0 } })),
      {
        c() {
          (n = b("g")),
            a && a.c(),
            (e = x()),
            W(r.$$.fragment),
            j(
              n,
              "transform",
              (i =
                "translate(" +
                t[30][0] * t[2] +
                "," +
                (t[30][1] * t[0] + t[0] / 2) +
                ")")
            );
        },
        m(t, i) {
          g(t, n, i), a && a.m(n, null), p(n, e), H(r, n, null), (o = !0);
        },
        p(t, u) {
          t[37] > 0
            ? a
              ? a.p(t, u)
              : ((a = _a(t)), a.c(), a.m(n, e))
            : a && (a.d(1), (a = null));
          const c = {};
          256 & u[0] && (c.node = t[29]),
            r.$set(c),
            (!o ||
              (261 & u[0] &&
                i !==
                  (i =
                    "translate(" +
                    t[30][0] * t[2] +
                    "," +
                    (t[30][1] * t[0] + t[0] / 2) +
                    ")"))) &&
              j(n, "transform", i);
        },
        i(t) {
          o || (Y(r.$$.fragment, t), (o = !0));
        },
        o(t) {
          P(r.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && v(n), a && a.d(), G(r);
        },
      }
    );
  }
  function xa(t) {
    let n, e;
    return (
      (n = new co({
        props: {
          x: t[34][1] * t[0],
          actual: t[29],
          predict: t[33],
          cellSize: t[0],
          value: t[15].value(t[29], t[33]),
          color: "rgb(26,133,255)",
        },
      })),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, r) {
          H(n, t, r), (e = !0);
        },
        p(t, e) {
          const r = {};
          257 & e[0] && (r.x = t[34][1] * t[0]),
            256 & e[0] && (r.actual = t[29]),
            256 & e[0] && (r.predict = t[33]),
            1 & e[0] && (r.cellSize = t[0]),
            33024 & e[0] && (r.value = t[15].value(t[29], t[33])),
            n.$set(r);
        },
        i(t) {
          e || (Y(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          P(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          G(n, t);
        },
      }
    );
  }
  function Ma(t) {
    let n, e;
    return (
      (n = new oo({
        props: {
          x: t[34][1] * t[0],
          actual: t[29],
          predict: t[33],
          cellSize: t[0],
          value: t[15].value(t[29], t[33]),
        },
      })),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, r) {
          H(n, t, r), (e = !0);
        },
        p(t, e) {
          const r = {};
          257 & e[0] && (r.x = t[34][1] * t[0]),
            256 & e[0] && (r.actual = t[29]),
            256 & e[0] && (r.predict = t[33]),
            1 & e[0] && (r.cellSize = t[0]),
            33024 & e[0] && (r.value = t[15].value(t[29], t[33])),
            n.$set(r);
        },
        i(t) {
          e || (Y(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          P(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          G(n, t);
        },
      }
    );
  }
  function ja(t) {
    let n, e;
    return (
      (n = new go({
        props: {
          x: t[34][1] * t[0],
          actual: t[29],
          predict: t[33],
          cellSize: t[0],
        },
      })),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, r) {
          H(n, t, r), (e = !0);
        },
        p(t, e) {
          const r = {};
          257 & e[0] && (r.x = t[34][1] * t[0]),
            256 & e[0] && (r.actual = t[29]),
            256 & e[0] && (r.predict = t[33]),
            1 & e[0] && (r.cellSize = t[0]),
            n.$set(r);
        },
        i(t) {
          e || (Y(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          P(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          G(n, t);
        },
      }
    );
  }
  function ka(t) {
    let n, e;
    return (
      (n = new Dr({
        props: {
          x: t[34][1] * t[0],
          actual: t[29],
          predict: t[33],
          cellSize: t[0],
        },
      })),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, r) {
          H(n, t, r), (e = !0);
        },
        p(t, e) {
          const r = {};
          257 & e[0] && (r.x = t[34][1] * t[0]),
            256 & e[0] && (r.actual = t[29]),
            256 & e[0] && (r.predict = t[33]),
            1 & e[0] && (r.cellSize = t[0]),
            n.$set(r);
        },
        i(t) {
          e || (Y(n.$$.fragment, t), (e = !0));
        },
        o(t) {
          P(n.$$.fragment, t), (e = !1);
        },
        d(t) {
          G(n, t);
        },
      }
    );
  }
  function Aa(t) {
    let n, e, r, i, o, a;
    const u = [ka, ja, Ma, xa],
      c = [];
    function s(t, r) {
      return (
        4352 & r[0] && (n = !(t[12](t[33]) && t[12](t[29]))),
        n
          ? 0
          : (288 & r[0] && (e = !(0 !== t[5].frequency(t[29], t[33]))),
            e
              ? 1
              : "color" === t[6].encoding
              ? 2
              : "size" === t[6].encoding
              ? 3
              : -1)
      );
    }
    return (
      ~(r = s(t, [-1, -1])) && (i = c[r] = u[r](t)),
      {
        c() {
          i && i.c(), (o = x());
        },
        m(t, n) {
          ~r && c[r].m(t, n), g(t, o, n), (a = !0);
        },
        p(t, n) {
          let e = r;
          (r = s(t, n)),
            r === e
              ? ~r && c[r].p(t, n)
              : (i &&
                  (L(),
                  P(c[e], 1, 1, () => {
                    c[e] = null;
                  }),
                  B()),
                ~r
                  ? ((i = c[r]),
                    i ? i.p(t, n) : ((i = c[r] = u[r](t)), i.c()),
                    Y(i, 1),
                    i.m(o.parentNode, o))
                  : (i = null));
        },
        i(t) {
          a || (Y(i), (a = !0));
        },
        o(t) {
          P(i), (a = !1);
        },
        d(t) {
          ~r && c[r].d(t), t && v(o);
        },
      }
    );
  }
  function $a(t) {
    let n,
      e,
      r,
      i = t[8],
      o = [];
    for (let n = 0; n < i.length; n += 1) o[n] = Aa(sa(t, i, n));
    const a = (t) =>
      P(o[t], 1, 1, () => {
        o[t] = null;
      });
    return {
      c() {
        n = b("g");
        for (let t = 0; t < o.length; t += 1) o[t].c();
        j(n, "transform", (e = "translate(0," + t[30][1] * t[0] + ")"));
      },
      m(t, e) {
        g(t, n, e);
        for (let t = 0; t < o.length; t += 1) o[t].m(n, null);
        r = !0;
      },
      p(t, u) {
        if (37217 & u[0]) {
          let e;
          for (i = t[8], e = 0; e < i.length; e += 1) {
            const r = sa(t, i, e);
            o[e]
              ? (o[e].p(r, u), Y(o[e], 1))
              : ((o[e] = Aa(r)), o[e].c(), Y(o[e], 1), o[e].m(n, null));
          }
          for (L(), e = i.length; e < o.length; e += 1) a(e);
          B();
        }
        (!r ||
          (257 & u[0] && e !== (e = "translate(0," + t[30][1] * t[0] + ")"))) &&
          j(n, "transform", e);
      },
      i(t) {
        if (!r) {
          for (let t = 0; t < i.length; t += 1) Y(o[t]);
          r = !0;
        }
      },
      o(t) {
        o = o.filter(Boolean);
        for (let t = 0; t < o.length; t += 1) P(o[t]);
        r = !1;
      },
      d(t) {
        t && v(n), y(o, t);
      },
    };
  }
  function Sa(t) {
    let n, e, r, i;
    return (
      (e = new fo({
        props: {
          columnWidth: t[3],
          cellSize: t[0],
          statistic: t[22].value(t[25]),
        },
      })),
      {
        c() {
          (n = b("g")),
            W(e.$$.fragment),
            j(n, "transform", (r = "translate(0," + t[26][1] * t[0] + ")"));
        },
        m(t, r) {
          g(t, n, r), H(e, n, null), (i = !0);
        },
        p(t, o) {
          const a = {};
          8 & o[0] && (a.columnWidth = t[3]),
            1 & o[0] && (a.cellSize = t[0]),
            384 & o[0] && (a.statistic = t[22].value(t[25])),
            e.$set(a),
            (!i ||
              (257 & o[0] &&
                r !== (r = "translate(0," + t[26][1] * t[0] + ")"))) &&
              j(n, "transform", r);
        },
        i(t) {
          i || (Y(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          P(e.$$.fragment, t), (i = !1);
        },
        d(t) {
          t && v(n), G(e);
        },
      }
    );
  }
  function Ta(t) {
    let n,
      e,
      r,
      i,
      o,
      a,
      u = t[22].name() + "",
      c = t[8],
      s = [];
    for (let n = 0; n < c.length; n += 1) s[n] = Sa(ua(t, c, n));
    const l = (t) =>
      P(s[t], 1, 1, () => {
        s[t] = null;
      });
    return {
      c() {
        (n = b("g")), (e = b("text")), (r = _(u));
        for (let t = 0; t < s.length; t += 1) s[t].c();
        j(e, "y", (i = -t[0] / 2)),
          j(n, "transform", (o = "translate(" + t[24] * (t[3] + Ca) + ")"));
      },
      m(t, i) {
        g(t, n, i), p(n, e), p(e, r);
        for (let t = 0; t < s.length; t += 1) s[t].m(n, null);
        a = !0;
      },
      p(t, f) {
        if (
          ((!a || 128 & f[0]) && u !== (u = t[22].name() + "") && k(r, u),
          (!a || (1 & f[0] && i !== (i = -t[0] / 2))) && j(e, "y", i),
          393 & f[0])
        ) {
          let e;
          for (c = t[8], e = 0; e < c.length; e += 1) {
            const r = ua(t, c, e);
            s[e]
              ? (s[e].p(r, f), Y(s[e], 1))
              : ((s[e] = Sa(r)), s[e].c(), Y(s[e], 1), s[e].m(n, null));
          }
          for (L(), e = c.length; e < s.length; e += 1) l(e);
          B();
        }
        (!a ||
          (8 & f[0] && o !== (o = "translate(" + t[24] * (t[3] + Ca) + ")"))) &&
          j(n, "transform", o);
      },
      i(t) {
        if (!a) {
          for (let t = 0; t < c.length; t += 1) Y(s[t]);
          a = !0;
        }
      },
      o(t) {
        s = s.filter(Boolean);
        for (let t = 0; t < s.length; t += 1) P(s[t]);
        a = !1;
      },
      d(t) {
        t && v(n), y(s, t);
      },
    };
  }
  function Na(t) {
    let n,
      e,
      r,
      i,
      o,
      a,
      u,
      c,
      s,
      l,
      f,
      h,
      d,
      M,
      A,
      $,
      S,
      T,
      N,
      C,
      E,
      I,
      z,
      D,
      O,
      U =
        "total" === t[6].normalization
          ? "Counts"
          : `${t[6].normalization} Probabilities`;
    function q(t, n) {
      return t[11] ? da : ha;
    }
    let V = q(t),
      F = V(t),
      R = t[6].filter?.length > 0 && pa(t);
    const W = [va, ga],
      H = [];
    function G(t, n) {
      return "color" === t[6].encoding ? 0 : "size" === t[6].encoding ? 1 : -1;
    }
    ~(s = G(t)) && (l = H[s] = W[s](t));
    let Z = t[13] && ya(t),
      X = t[14] && ma(t),
      J = t[8],
      Q = [];
    for (let n = 0; n < J.length; n += 1) Q[n] = ba(fa(t, J, n));
    const K = (t) =>
      P(Q[t], 1, 1, () => {
        Q[t] = null;
      });
    let tt = t[8],
      nt = [];
    for (let n = 0; n < tt.length; n += 1) nt[n] = wa(la(t, tt, n));
    const et = (t) =>
      P(nt[t], 1, 1, () => {
        nt[t] = null;
      });
    let rt = t[8],
      it = [];
    for (let n = 0; n < rt.length; n += 1) it[n] = $a(ca(t, rt, n));
    const ot = (t) =>
      P(it[t], 1, 1, () => {
        it[t] = null;
      });
    let at = t[7],
      ut = [];
    for (let n = 0; n < at.length; n += 1) ut[n] = Ta(aa(t, at, n));
    const ct = (t) =>
      P(ut[t], 1, 1, () => {
        ut[t] = null;
      });
    return {
      c() {
        (n = m("div")),
          F.c(),
          (e = w()),
          (r = b("svg")),
          (i = b("g")),
          R && R.c(),
          (o = b("g")),
          (a = b("text")),
          (u = _(U)),
          (c = b("g")),
          l && l.c(),
          Z && Z.c(),
          (h = x()),
          X && X.c(),
          (d = b("text")),
          (M = _("Observed"));
        for (let t = 0; t < Q.length; t += 1) Q[t].c();
        ($ = b("text")), (S = _("Actual")), (N = b("g"));
        for (let t = 0; t < nt.length; t += 1) nt[t].c();
        E = b("g");
        for (let t = 0; t < it.length; t += 1) it[t].c();
        z = b("g");
        for (let t = 0; t < ut.length; t += 1) ut[t].c();
        j(n, "class", "box hover svelte-1llbj64"),
          j(a, "class", "axisTitle svelte-1llbj64"),
          j(c, "transform", (f = "translate(0," + t[0] + ")")),
          j(o, "transform", "translate(0,0)"),
          j(d, "text-anchor", "middle"),
          j(d, "class", "axisTitle svelte-1llbj64"),
          j(d, "transform", (A = "translate(" + (t[1] + t[9] / 2) + ",0)")),
          j($, "text-anchor", "middle"),
          j($, "class", "axisTitle svelte-1llbj64"),
          j(
            $,
            "transform",
            (T =
              "translate(" +
              -Ea / 2 +
              "," +
              (t[1] + t[9] / 2) +
              ") rotate(-90)")
          ),
          j(N, "transform", (C = "translate(0," + t[1] + ")")),
          j(E, "transform", (I = "translate(" + t[1] + "," + t[1] + ")")),
          j(
            z,
            "transform",
            (D = "translate(" + (t[1] + t[9] + t[4]) + "," + t[1] + ")")
          ),
          j(i, "transform", "translate(" + (Ca + Ea) + "," + (Ca + Ea) + ")"),
          j(r, "width", t[10]),
          j(r, "height", t[16]);
      },
      m(t, l) {
        g(t, n, l),
          F.m(n, null),
          g(t, e, l),
          g(t, r, l),
          p(r, i),
          R && R.m(i, null),
          p(i, o),
          p(o, a),
          p(a, u),
          p(o, c),
          ~s && H[s].m(c, null),
          Z && Z.m(i, null),
          p(i, h),
          X && X.m(i, null),
          p(i, d),
          p(d, M);
        for (let t = 0; t < Q.length; t += 1) Q[t].m(i, null);
        p(i, $), p($, S), p(i, N);
        for (let t = 0; t < nt.length; t += 1) nt[t].m(N, null);
        p(i, E);
        for (let t = 0; t < it.length; t += 1) it[t].m(E, null);
        p(i, z);
        for (let t = 0; t < ut.length; t += 1) ut[t].m(z, null);
        O = !0;
      },
      p(t, e) {
        V === (V = q(t)) && F
          ? F.p(t, e)
          : (F.d(1), (F = V(t)), F && (F.c(), F.m(n, null))),
          t[6].filter?.length > 0
            ? R
              ? R.p(t, e)
              : ((R = pa(t)), R.c(), R.m(i, o))
            : R && (R.d(1), (R = null)),
          (!O || 64 & e[0]) &&
            U !==
              (U =
                "total" === t[6].normalization
                  ? "Counts"
                  : `${t[6].normalization} Probabilities`) &&
            k(u, U);
        let a = s;
        if (
          ((s = G(t)),
          s === a
            ? ~s && H[s].p(t, e)
            : (l &&
                (L(),
                P(H[a], 1, 1, () => {
                  H[a] = null;
                }),
                B()),
              ~s
                ? ((l = H[s]),
                  l ? l.p(t, e) : ((l = H[s] = W[s](t)), l.c()),
                  Y(l, 1),
                  l.m(c, null))
                : (l = null)),
          (!O || (1 & e[0] && f !== (f = "translate(0," + t[0] + ")"))) &&
            j(c, "transform", f),
          t[13]
            ? Z
              ? Z.p(t, e)
              : ((Z = ya(t)), Z.c(), Z.m(i, h))
            : Z && (Z.d(1), (Z = null)),
          t[14]
            ? X
              ? X.p(t, e)
              : ((X = ma(t)), X.c(), X.m(i, d))
            : X && (X.d(1), (X = null)),
          (!O ||
            (514 & e[0] &&
              A !== (A = "translate(" + (t[1] + t[9] / 2) + ",0)"))) &&
            j(d, "transform", A),
          263 & e[0])
        ) {
          let n;
          for (J = t[8], n = 0; n < J.length; n += 1) {
            const r = fa(t, J, n);
            Q[n]
              ? (Q[n].p(r, e), Y(Q[n], 1))
              : ((Q[n] = ba(r)), Q[n].c(), Y(Q[n], 1), Q[n].m(i, $));
          }
          for (L(), n = J.length; n < Q.length; n += 1) K(n);
          B();
        }
        if (
          ((!O ||
            (514 & e[0] &&
              T !==
                (T =
                  "translate(" +
                  -Ea / 2 +
                  "," +
                  (t[1] + t[9] / 2) +
                  ") rotate(-90)"))) &&
            j($, "transform", T),
          2309 & e[0])
        ) {
          let n;
          for (tt = t[8], n = 0; n < tt.length; n += 1) {
            const r = la(t, tt, n);
            nt[n]
              ? (nt[n].p(r, e), Y(nt[n], 1))
              : ((nt[n] = wa(r)), nt[n].c(), Y(nt[n], 1), nt[n].m(N, null));
          }
          for (L(), n = tt.length; n < nt.length; n += 1) et(n);
          B();
        }
        if (
          ((!O || (2 & e[0] && C !== (C = "translate(0," + t[1] + ")"))) &&
            j(N, "transform", C),
          37217 & e[0])
        ) {
          let n;
          for (rt = t[8], n = 0; n < rt.length; n += 1) {
            const r = ca(t, rt, n);
            it[n]
              ? (it[n].p(r, e), Y(it[n], 1))
              : ((it[n] = $a(r)), it[n].c(), Y(it[n], 1), it[n].m(E, null));
          }
          for (L(), n = rt.length; n < it.length; n += 1) ot(n);
          B();
        }
        if (
          ((!O ||
            (2 & e[0] && I !== (I = "translate(" + t[1] + "," + t[1] + ")"))) &&
            j(E, "transform", I),
          393 & e[0])
        ) {
          let n;
          for (at = t[7], n = 0; n < at.length; n += 1) {
            const r = aa(t, at, n);
            ut[n]
              ? (ut[n].p(r, e), Y(ut[n], 1))
              : ((ut[n] = Ta(r)), ut[n].c(), Y(ut[n], 1), ut[n].m(z, null));
          }
          for (L(), n = at.length; n < ut.length; n += 1) ct(n);
          B();
        }
        (!O ||
          (530 & e[0] &&
            D !==
              (D = "translate(" + (t[1] + t[9] + t[4]) + "," + t[1] + ")"))) &&
          j(z, "transform", D),
          (!O || 1024 & e[0]) && j(r, "width", t[10]),
          (!O || 65536 & e[0]) && j(r, "height", t[16]);
      },
      i(t) {
        if (!O) {
          Y(l);
          for (let t = 0; t < J.length; t += 1) Y(Q[t]);
          for (let t = 0; t < tt.length; t += 1) Y(nt[t]);
          for (let t = 0; t < rt.length; t += 1) Y(it[t]);
          for (let t = 0; t < at.length; t += 1) Y(ut[t]);
          O = !0;
        }
      },
      o(t) {
        P(l), (Q = Q.filter(Boolean));
        for (let t = 0; t < Q.length; t += 1) P(Q[t]);
        nt = nt.filter(Boolean);
        for (let t = 0; t < nt.length; t += 1) P(nt[t]);
        it = it.filter(Boolean);
        for (let t = 0; t < it.length; t += 1) P(it[t]);
        ut = ut.filter(Boolean);
        for (let t = 0; t < ut.length; t += 1) P(ut[t]);
        O = !1;
      },
      d(t) {
        t && v(n),
          F.d(),
          t && v(e),
          t && v(r),
          R && R.d(),
          ~s && H[s].d(),
          Z && Z.d(),
          X && X.d(),
          y(Q, t),
          y(nt, t),
          y(it, t),
          y(ut, t);
      },
    };
  }
  const Ca = 4,
    Ea = 30;
  function Ia(t, n, e) {
    let r, i, o, a, u, s, f, h, d, p, g, v, y, m;
    c(t, Er, (t) => e(6, (y = t))), c(t, Cr, (t) => e(11, (m = t)));
    let { cellSize: b = 18 } = n,
      { hierarchyExtent: _ = 150 } = n,
      { hierarchyIndent: w = 14 } = n,
      { statisticsWidth: x = 60 } = n,
      { statisticsPadding: M = 10 } = n,
      { confusions: j = null } = n;
    return (
      (t.$$set = (t) => {
        "cellSize" in t && e(0, (b = t.cellSize)),
          "hierarchyExtent" in t && e(1, (_ = t.hierarchyExtent)),
          "hierarchyIndent" in t && e(2, (w = t.hierarchyIndent)),
          "statisticsWidth" in t && e(3, (x = t.statisticsWidth)),
          "statisticsPadding" in t && e(4, (M = t.statisticsPadding)),
          "confusions" in t && e(18, (j = t.confusions));
      }),
      (t.$$.update = () => {
        262208 & t.$$.dirty[0] && e(5, (r = oa(y, j))),
          32 & t.$$.dirty[0] && e(19, (i = r.axis)),
          96 & t.$$.dirty[0] &&
            e(
              7,
              (o = y.measures
                ? y.measures.map((t) =>
                    (function (t, n) {
                      switch (n) {
                        case "precision":
                          return new $r(t, "Precision", ft);
                        case "recall":
                          return new $r(t, "Recall", ht);
                        case "accuracy":
                          return new $r(t, "Accuracy", dt);
                        case "countActual":
                          return new Sr(t, "Count Actual", (t, n) =>
                            t.totalRow(n)
                          );
                        case "countObserved":
                          return new Sr(t, "Count Observed", (t, n) =>
                            t.totalColumn(n)
                          );
                        case "truePositives":
                          return new Sr(t, "True Positives", (t, n) =>
                            t.truePositives(n)
                          );
                        case "trueNegatives":
                          return new Sr(t, "True Negatives", (t, n) =>
                            t.trueNegatives(n)
                          );
                        case "falsePositives":
                          return new Sr(t, "False Positives", (t, n) =>
                            t.falsePositives(n)
                          );
                        case "falseNegatives":
                          return new Sr(t, "False Negatives", (t, n) =>
                            t.falseNegatives(n)
                          );
                        default:
                          throw new Error(`No such measure: ${n}.`);
                      }
                    })(r, t)
                  )
                : [])
            ),
          524352 & t.$$.dirty[0] &&
            e(
              8,
              (a = (function (t, n) {
                const e = [0, 0],
                  r = new Map(),
                  i = [],
                  o = (n) => n.isLeaf() || !t(n);
                return (
                  n.fullorder(
                    (t) => {
                      i.push({ node: t, pos: [e[0], e[1]] }),
                        (e[0] += 1),
                        (e[1] += 1),
                        o(t) && r.set(t, 0);
                    },
                    (t) => {
                      if (!o(t)) {
                        const n =
                          t.children.length +
                          t.children.reduce((t, n) => t + r.get(n), 0);
                        r.set(t, n);
                      }
                      e[0] -= 1;
                    },
                    t
                  ),
                  i.forEach((t) => ((t.span = r.get(t.node)), t)),
                  i
                );
              })((t) => !y.collapsed.includes(t.data.id), i))
            ),
          64 & t.$$.dirty[0] &&
            e(12, (u = (t) => t.isLeaf() || y.collapsed.includes(t.data.id))),
          136 & t.$$.dirty[0] && e(20, (s = o.length * x)),
          257 & t.$$.dirty[0] && e(9, (f = a.length * b)),
          1049234 & t.$$.dirty[0] &&
            e(10, (h = Ca + Ea + _ + f + M + s + o.length * Ca + Ca)),
          2304 & t.$$.dirty[0] &&
            e(13, (d = a.find((t) => !!m && t.node === m[0]))),
          2304 & t.$$.dirty[0] &&
            e(14, (p = a.find((t) => !!m && t.node === m[1]))),
          96 & t.$$.dirty[0] &&
            e(
              15,
              (g = (function (t, n, e) {
                switch (e) {
                  case "total":
                    return new Mr(t, n);
                  case "row":
                    return new jr(t);
                  case "column":
                    return new kr(t);
                  default:
                    throw new Error(`No such normalization: ${e}.`);
                }
              })(r, new Set(y.collapsed), y.normalization))
            ),
          1049616 & t.$$.dirty[0] && e(16, (v = h - s - M));
      }),
      [
        b,
        _,
        w,
        x,
        M,
        r,
        y,
        o,
        a,
        f,
        h,
        m,
        u,
        d,
        p,
        g,
        v,
        function () {
          l(Er, (y.filter = []), y), Er.set(y);
        },
        j,
        i,
        s,
        (t) => m && t.data.id === m[0].data.id,
      ]
    );
  }
  class za extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-1llbj64-style") ||
          (((n = m("style")).id = "svelte-1llbj64-style"),
          (n.textContent =
            ".hover.svelte-1llbj64{fill:#fef0d6}.axisTitle.svelte-1llbj64{font-weight:bold}.highlight.svelte-1llbj64{font-weight:600;font-size:1.1em}.hover.svelte-1llbj64{margin-top:20px;background-color:#f5f5f5}.breadcrumb.svelte-1llbj64{cursor:pointer;font-weight:bold}.breadcrumb.svelte-1llbj64:hover{text-decoration:underline}"),
          p(document.head, n)),
        X(
          this,
          t,
          Ia,
          Na,
          u,
          {
            cellSize: 0,
            hierarchyExtent: 1,
            hierarchyIndent: 2,
            statisticsWidth: 3,
            statisticsPadding: 4,
            confusions: 18,
          },
          [-1, -1]
        );
    }
  }
  function Da(t, n, e) {
    const r = t.slice();
    return (r[12] = n[e][0]), (r[13] = n[e][1]), r;
  }
  function Oa(t, n, e) {
    const r = t.slice();
    return (r[12] = n[e][0]), (r[16] = n[e][1]), r;
  }
  function Ua(t) {
    let n,
      e,
      r,
      i,
      a,
      u,
      c,
      s = t[12] + "";
    return {
      c() {
        (n = m("label")),
          (e = m("input")),
          (r = w()),
          (i = _(s)),
          (a = w()),
          j(e, "type", "radio"),
          (e.__value = t[16]),
          (e.value = e.__value),
          t[9][0].push(e),
          j(n, "class", "opt svelte-en7t5s");
      },
      m(o, s) {
        g(o, n, s),
          p(n, e),
          (e.checked = e.__value === t[0]),
          p(n, r),
          p(n, i),
          p(n, a),
          u || ((c = [M(e, "change", t[7]), M(e, "change", t[8])]), (u = !0));
      },
      p(t, n) {
        1 & n && (e.checked = e.__value === t[0]);
      },
      d(r) {
        r && v(n), t[9][0].splice(t[9][0].indexOf(e), 1), (u = !1), o(c);
      },
    };
  }
  function qa(t) {
    let n,
      e,
      r,
      i,
      a,
      u,
      c,
      s = t[12] + "";
    return {
      c() {
        (n = m("label")),
          (e = m("input")),
          (r = w()),
          (i = _(s)),
          (a = w()),
          j(e, "type", "radio"),
          (e.__value = t[13]),
          (e.value = e.__value),
          t[9][1].push(e),
          j(n, "class", "opt svelte-en7t5s");
      },
      m(o, s) {
        g(o, n, s),
          p(n, e),
          (e.checked = e.__value === t[1]),
          p(n, r),
          p(n, i),
          p(n, a),
          u || ((c = [M(e, "change", t[10]), M(e, "change", t[11])]), (u = !0));
      },
      p(t, n) {
        2 & n && (e.checked = e.__value === t[1]);
      },
      d(r) {
        r && v(n), t[9][1].splice(t[9][1].indexOf(e), 1), (u = !1), o(c);
      },
    };
  }
  function Va(t) {
    let n,
      r,
      i,
      o,
      a,
      u,
      c,
      s,
      l = [...t[3].entries()],
      f = [];
    for (let n = 0; n < l.length; n += 1) f[n] = Ua(Oa(t, l, n));
    let h = [...t[4].entries()],
      d = [];
    for (let n = 0; n < h.length; n += 1) d[n] = qa(Da(t, h, n));
    return {
      c() {
        (n = m("div")),
          (r = m("div")),
          (i = m("span")),
          (i.textContent = "Encoding"),
          (o = w());
        for (let t = 0; t < f.length; t += 1) f[t].c();
        (a = w()),
          (u = m("div")),
          (c = m("span")),
          (c.textContent = "Normalization"),
          (s = w());
        for (let t = 0; t < d.length; t += 1) d[t].c();
        j(i, "class", "name svelte-en7t5s"),
          j(r, "class", "options svelte-en7t5s"),
          j(c, "class", "name svelte-en7t5s"),
          j(u, "class", "options svelte-en7t5s"),
          j(n, "class", "wrapper svelte-en7t5s");
      },
      m(t, e) {
        g(t, n, e), p(n, r), p(r, i), p(r, o);
        for (let t = 0; t < f.length; t += 1) f[t].m(r, null);
        p(n, a), p(n, u), p(u, c), p(u, s);
        for (let t = 0; t < d.length; t += 1) d[t].m(u, null);
      },
      p(t, [n]) {
        if (13 & n) {
          let e;
          for (l = [...t[3].entries()], e = 0; e < l.length; e += 1) {
            const i = Oa(t, l, e);
            f[e] ? f[e].p(i, n) : ((f[e] = Ua(i)), f[e].c(), f[e].m(r, null));
          }
          for (; e < f.length; e += 1) f[e].d(1);
          f.length = l.length;
        }
        if (22 & n) {
          let e;
          for (h = [...t[4].entries()], e = 0; e < h.length; e += 1) {
            const r = Da(t, h, e);
            d[e] ? d[e].p(r, n) : ((d[e] = qa(r)), d[e].c(), d[e].m(u, null));
          }
          for (; e < d.length; e += 1) d[e].d(1);
          d.length = h.length;
        }
      },
      i: e,
      o: e,
      d(t) {
        t && v(n), y(f, t), y(d, t);
      },
    };
  }
  function Fa(t, n, e) {
    let r, i, o;
    c(t, Er, (t) => e(2, (o = t)));
    let { encoding: a } = n,
      { normalization: u } = n;
    const s = new Map([
        ["Size", "size"],
        ["Color", "color"],
      ]),
      f = new Map([
        ["Counts", "total"],
        ["Row probabilities", "row"],
        ["Column probabilities", "column"],
      ]);
    return (
      (t.$$set = (t) => {
        "encoding" in t && e(5, (a = t.encoding)),
          "normalization" in t && e(6, (u = t.normalization));
      }),
      (t.$$.update = () => {
        32 & t.$$.dirty && e(0, (r = a)), 64 & t.$$.dirty && e(1, (i = u));
      }),
      [
        r,
        i,
        o,
        s,
        f,
        a,
        u,
        (t) => {
          l(Er, (o.encoding = t.currentTarget.value), o), Er.set(o);
        },
        function () {
          (r = this.__value), e(0, r), e(5, a);
        },
        [[], []],
        (t) => {
          l(Er, (o.normalization = t.currentTarget.value), o), Er.set(o);
        },
        function () {
          (i = this.__value), e(1, i), e(6, u);
        },
      ]
    );
  }
  class Ra extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-en7t5s-style") ||
          (((n = m("style")).id = "svelte-en7t5s-style"),
          (n.textContent =
            ".wrapper.svelte-en7t5s{display:flex}.options.svelte-en7t5s{border:1px solid #cccccc;padding:7px;margin-right:7px;border-radius:5px}.name.svelte-en7t5s{font-weight:600;font-size:1.1em;margin-right:5px}.opt.svelte-en7t5s{margin-right:7px}"),
          p(document.head, n)),
        X(this, t, Fa, Va, u, { encoding: 5, normalization: 6 });
    }
  }
  function La(t, n, e) {
    const r = t.slice();
    return (r[26] = n[e]), (r[28] = e), r;
  }
  function Ba(t, n, e) {
    const r = t.slice();
    return (r[23] = n[e]), r;
  }
  function Ya(t, n, e) {
    const r = t.slice();
    return (r[29] = n[e]), r;
  }
  function Pa(t, n, e) {
    const r = t.slice();
    return (r[29] = n[e]), (r[28] = e), r;
  }
  function Wa(t) {
    let n,
      e,
      r,
      i,
      a,
      u,
      c,
      s,
      l,
      f,
      h,
      d = t[29] + "";
    function y() {
      return t[12](t[29]);
    }
    function b() {
      return t[13](t[28]);
    }
    function x() {
      return t[14](t[28]);
    }
    return {
      c() {
        (n = m("div")),
          (e = m("span")),
          (r = _(d)),
          (i = w()),
          (a = m("span")),
          (a.textContent = "◁"),
          (u = w()),
          (c = m("span")),
          (s = _("▷")),
          j(e, "class", "name svelte-imljc5"),
          j(a, "class", t[28] > 0 ? "activeArrow" : "inactiveArrow"),
          j(
            c,
            "class",
            (l = t[28] < t[2].length - 1 ? "activeArrow" : "inactiveArrow")
          ),
          j(n, "class", "dimension active svelte-imljc5");
      },
      m(t, o) {
        g(t, n, o),
          p(n, e),
          p(e, r),
          p(n, i),
          p(n, a),
          p(n, u),
          p(n, c),
          p(c, s),
          f ||
            ((h = [M(e, "click", y), M(a, "click", b), M(c, "click", x)]),
            (f = !0));
      },
      p(n, e) {
        (t = n),
          4 & e[0] && d !== (d = t[29] + "") && k(r, d),
          4 & e[0] &&
            l !==
              (l = t[28] < t[2].length - 1 ? "activeArrow" : "inactiveArrow") &&
            j(c, "class", l);
      },
      d(t) {
        t && v(n), (f = !1), o(h);
      },
    };
  }
  function Ha(t) {
    let n,
      e,
      r,
      i,
      o,
      a,
      u,
      c,
      s = t[29] + "";
    function l() {
      return t[15](t[29]);
    }
    return {
      c() {
        (n = m("div")),
          (e = m("span")),
          (r = _(s)),
          (i = w()),
          (o = m("span")),
          (o.textContent = "activate"),
          (a = w()),
          j(o, "class", "activate svelte-imljc5"),
          j(n, "class", "dimension inactive svelte-imljc5");
      },
      m(t, s) {
        g(t, n, s),
          p(n, e),
          p(e, r),
          p(e, i),
          p(e, o),
          p(n, a),
          u || ((c = M(e, "click", l)), (u = !0));
      },
      p(n, e) {
        (t = n), 32 & e[0] && s !== (s = t[29] + "") && k(r, s);
      },
      d(t) {
        t && v(n), (u = !1), c();
      },
    };
  }
  function Ga(t) {
    let n,
      e = t[6]?.label !== t[29] && Ha(t);
    return {
      c() {
        e && e.c(), (n = x());
      },
      m(t, r) {
        e && e.m(t, r), g(t, n, r);
      },
      p(t, r) {
        t[6]?.label !== t[29]
          ? e
            ? e.p(t, r)
            : ((e = Ha(t)), e.c(), e.m(n.parentNode, n))
          : e && (e.d(1), (e = null));
      },
      d(t) {
        e && e.d(t), t && v(n);
      },
    };
  }
  function Za(t) {
    let n;
    return {
      c() {
        (n = m("span")),
          (n.textContent = "All dimensions are already in use."),
          j(n, "class", "warning svelte-imljc5");
      },
      m(t, e) {
        g(t, n, e);
      },
      p: e,
      d(t) {
        t && v(n);
      },
    };
  }
  function Xa(t) {
    let n,
      e = t[5],
      r = [];
    for (let n = 0; n < e.length; n += 1) r[n] = Qa(La(t, e, n));
    return {
      c() {
        for (let t = 0; t < r.length; t += 1) r[t].c();
        n = x();
      },
      m(t, e) {
        for (let n = 0; n < r.length; n += 1) r[n].m(t, e);
        g(t, n, e);
      },
      p(t, i) {
        if (35 & i[0]) {
          let o;
          for (e = t[5], o = 0; o < e.length; o += 1) {
            const a = La(t, e, o);
            r[o]
              ? r[o].p(a, i)
              : ((r[o] = Qa(a)), r[o].c(), r[o].m(n.parentNode, n));
          }
          for (; o < r.length; o += 1) r[o].d(1);
          r.length = e.length;
        }
      },
      d(t) {
        y(r, t), t && v(n);
      },
    };
  }
  function Ja(t) {
    let n,
      e,
      r,
      i,
      a,
      u,
      c,
      s,
      l,
      f,
      h,
      d,
      b,
      x,
      A,
      S,
      T,
      N = t[6].label + "",
      C = na(t[0], t[6].label),
      E = [];
    for (let n = 0; n < C.length; n += 1) E[n] = Ka(Ba(t, C, n));
    return {
      c() {
        (n = m("div")),
          (e = m("select")),
          (r = m("option")),
          (r.textContent = "actual"),
          (i = m("option")),
          (i.textContent = "observed"),
          (u = w()),
          (c = m("div")),
          (s = m("span")),
          (l = _(N)),
          (f = w()),
          (h = m("span")),
          (h.textContent = "×"),
          (d = w()),
          (b = m("div")),
          (x = m("select"));
        for (let t = 0; t < E.length; t += 1) E[t].c();
        (r.__value = "actual"),
          (r.value = r.__value),
          (i.__value = "observed"),
          (i.value = i.__value),
          j(n, "class", "chooser svelte-imljc5"),
          j(s, "class", "name svelte-imljc5"),
          j(c, "class", "dimension active svelte-imljc5"),
          j(b, "class", "chooser svelte-imljc5");
      },
      m(o, a) {
        g(o, n, a),
          p(n, e),
          p(e, r),
          p(e, i),
          $(e, t[6].qualifier),
          t[16](e),
          g(o, u, a),
          g(o, c, a),
          p(c, s),
          p(s, l),
          p(c, f),
          p(c, h),
          g(o, d, a),
          g(o, b, a),
          p(b, x);
        for (let t = 0; t < E.length; t += 1) E[t].m(x, null);
        $(x, t[6].is),
          t[19](x),
          S ||
            ((T = [
              M(e, "blur", t[17]),
              M(h, "click", t[18]),
              M(x, "blur", t[20]),
            ]),
            (S = !0));
      },
      p(t, n) {
        if (
          (64 & n[0] && a !== (a = t[6].qualifier) && $(e, t[6].qualifier),
          64 & n[0] && N !== (N = t[6].label + "") && k(l, N),
          65 & n[0])
        ) {
          let e;
          for (C = na(t[0], t[6].label), e = 0; e < C.length; e += 1) {
            const r = Ba(t, C, e);
            E[e] ? E[e].p(r, n) : ((E[e] = Ka(r)), E[e].c(), E[e].m(x, null));
          }
          for (; e < E.length; e += 1) E[e].d(1);
          E.length = C.length;
        }
        64 & n[0] && A !== (A = t[6].is) && $(x, t[6].is);
      },
      d(e) {
        e && v(n),
          t[16](null),
          e && v(u),
          e && v(c),
          e && v(d),
          e && v(b),
          y(E, e),
          t[19](null),
          (S = !1),
          o(T);
      },
    };
  }
  function Qa(t) {
    let n,
      e,
      r,
      i,
      o,
      a,
      u = t[26] + "";
    function c() {
      return t[21](t[26]);
    }
    return {
      c() {
        (n = m("div")),
          (e = m("span")),
          (r = _(u)),
          (i = w()),
          j(n, "class", "dimension inactive svelte-imljc5");
      },
      m(t, u) {
        g(t, n, u),
          p(n, e),
          p(e, r),
          p(n, i),
          o || ((a = M(e, "click", c)), (o = !0));
      },
      p(n, e) {
        (t = n), 32 & e[0] && u !== (u = t[26] + "") && k(r, u);
      },
      d(t) {
        t && v(n), (o = !1), a();
      },
    };
  }
  function Ka(t) {
    let n,
      e,
      r,
      i = t[23] + "";
    return {
      c() {
        (n = m("option")),
          (e = _(i)),
          (n.__value = r = t[23]),
          (n.value = n.__value);
      },
      m(t, r) {
        g(t, n, r), p(n, e);
      },
      p(t, o) {
        65 & o[0] && i !== (i = t[23] + "") && k(e, i),
          65 & o[0] &&
            r !== (r = t[23]) &&
            ((n.__value = r), (n.value = n.__value));
      },
      d(t) {
        t && v(n);
      },
    };
  }
  function tu(t) {
    let n,
      r,
      i,
      o,
      a,
      u,
      c,
      s,
      l,
      f,
      h,
      d,
      b = t[2],
      _ = [];
    for (let n = 0; n < b.length; n += 1) _[n] = Wa(Pa(t, b, n));
    let x = t[5],
      M = [];
    for (let n = 0; n < x.length; n += 1) M[n] = Ga(Ya(t, x, n));
    function k(t, n) {
      return t[6] ? Ja : t[5].length > 0 ? Xa : Za;
    }
    let A = k(t),
      $ = A(t);
    return {
      c() {
        (n = m("h3")),
          (n.textContent = "Dimensions"),
          (r = w()),
          (i = m("div")),
          (o = m("div"));
        for (let t = 0; t < _.length; t += 1) _[t].c();
        a = w();
        for (let t = 0; t < M.length; t += 1) M[t].c();
        (u = w()),
          (c = m("div")),
          (c.innerHTML =
            '<span class="title svelte-imljc5">Shelf</span> \n        <span class="desc svelte-imljc5">Enable and disable different dimensions of the data. The order of dimension defines the nesting level.</span>'),
          (s = w()),
          (l = m("div")),
          (f = m("div")),
          $.c(),
          (h = w()),
          (d = m("div")),
          (d.innerHTML =
            '<span class="title svelte-imljc5">Where</span> \n        <span class="desc svelte-imljc5">Condition the confusion matrix on the value of a given label.</span>'),
          j(c, "class", "explanation svelte-imljc5"),
          j(i, "class", "wrapper svelte-imljc5"),
          j(d, "class", "explanation svelte-imljc5"),
          j(l, "class", "wrapper svelte-imljc5");
      },
      m(t, e) {
        g(t, n, e), g(t, r, e), g(t, i, e), p(i, o);
        for (let t = 0; t < _.length; t += 1) _[t].m(o, null);
        p(o, a);
        for (let t = 0; t < M.length; t += 1) M[t].m(o, null);
        p(i, u),
          p(i, c),
          g(t, s, e),
          g(t, l, e),
          p(l, f),
          $.m(f, null),
          p(l, h),
          p(l, d);
      },
      p(t, n) {
        if (1796 & n[0]) {
          let e;
          for (b = t[2], e = 0; e < b.length; e += 1) {
            const r = Pa(t, b, e);
            _[e] ? _[e].p(r, n) : ((_[e] = Wa(r)), _[e].c(), _[e].m(o, a));
          }
          for (; e < _.length; e += 1) _[e].d(1);
          _.length = b.length;
        }
        if (224 & n[0]) {
          let e;
          for (x = t[5], e = 0; e < x.length; e += 1) {
            const r = Ya(t, x, e);
            M[e] ? M[e].p(r, n) : ((M[e] = Ga(r)), M[e].c(), M[e].m(o, null));
          }
          for (; e < M.length; e += 1) M[e].d(1);
          M.length = x.length;
        }
        A === (A = k(t)) && $
          ? $.p(t, n)
          : ($.d(1), ($ = A(t)), $ && ($.c(), $.m(f, null)));
      },
      i: e,
      o: e,
      d(t) {
        t && v(n),
          t && v(r),
          t && v(i),
          y(_, t),
          y(M, t),
          t && v(s),
          t && v(l),
          $.d();
      },
    };
  }
  function nu(t, n, e) {
    let r, i, o, a;
    c(t, Er, (t) => e(1, (a = t)));
    let { confusions: u = null } = n;
    function s(t) {
      a.classes.push(t), Er.set(a);
    }
    function f(t) {
      a.classes.length > 1 &&
        (a.classes.splice(a.classes.indexOf(t), 1), Er.set(a));
    }
    function h(t) {
      const [n] = a.classes.splice(t, 1);
      a.classes.splice(t - 1, 0, n), Er.set(a);
    }
    function d(t) {
      const [n] = a.classes.splice(t, 1);
      a.classes.splice(t + 1, 0, n), Er.set(a);
    }
    function p(t) {
      l(Er, (a.where = void 0), a), Er.set(a);
    }
    const g = [...ta(u)];
    let v, y;
    return (
      (t.$$set = (t) => {
        "confusions" in t && e(0, (u = t.confusions));
      }),
      (t.$$.update = () => {
        2 & t.$$.dirty[0] && e(2, (r = a.classes)),
          4 & t.$$.dirty[0] && e(5, (i = g.filter((t) => !r.includes(t)))),
          2 & t.$$.dirty[0] && e(6, (o = a.where));
      }),
      [
        u,
        a,
        r,
        v,
        y,
        i,
        o,
        s,
        f,
        h,
        d,
        p,
        (t) => f(t),
        (t) => h(t),
        (t) => d(t),
        (t) => s(t),
        function (t) {
          N[t ? "unshift" : "push"](() => {
            (v = t), e(3, v);
          });
        },
        (t) => {
          l(Er, (a.where.qualifier = v.value), a), Er.set(a);
        },
        () => p(),
        function (t) {
          N[t ? "unshift" : "push"](() => {
            (y = t), e(4, y), e(0, u), e(6, o), e(1, a);
          });
        },
        (t) => {
          l(Er, (a.where.is = y.value), a), Er.set(a);
        },
        (t) => {
          l(
            Er,
            (a.where = { qualifier: "actual", label: t, is: na(u, t)[0] }),
            a
          ),
            Er.set(a);
        },
      ]
    );
  }
  class eu extends J {
    constructor(t) {
      var n;
      super(),
        document.getElementById("svelte-imljc5-style") ||
          (((n = m("style")).id = "svelte-imljc5-style"),
          (n.textContent =
            ".wrapper.svelte-imljc5.svelte-imljc5{border:1px solid #cccccc;border-radius:7px;display:flex;justify-content:space-between;margin-top:3px}.chooser.svelte-imljc5.svelte-imljc5{float:left;border-radius:7px;padding:10px;margin:5px}.dimension.svelte-imljc5.svelte-imljc5{float:left;border-radius:7px;padding:10px;margin:5px;border:2px solid;cursor:pointer}.activate.svelte-imljc5.svelte-imljc5{color:#0066cc}.activate.svelte-imljc5.svelte-imljc5:hover{text-decoration:underline}.active.svelte-imljc5.svelte-imljc5{color:white;background-color:#0066cc;border-color:#0066cc;font-size:1.1em}.inactive.svelte-imljc5.svelte-imljc5{color:#cccccc;font-size:1.1em}.explanation.svelte-imljc5.svelte-imljc5{float:right;margin:5px;width:33%}.title.svelte-imljc5.svelte-imljc5{font-weight:600;margin-right:5px;font-size:1.1em}.desc.svelte-imljc5.svelte-imljc5{color:#888888}.dimension.svelte-imljc5 .name.svelte-imljc5{margin-right:5px}.warning.svelte-imljc5.svelte-imljc5{float:left;padding:10px;margin:5px;color:#888888}"),
          p(document.head, n)),
        X(this, t, nu, tu, u, { confusions: 0 }, [-1, -1]);
    }
  }
  function ru(t) {
    let n, e, r, i, o, a;
    return (
      (n = new Ra({
        props: { encoding: t[1].encoding, normalization: t[1].normalization },
      })),
      (r = new eu({ props: { confusions: t[0] } })),
      (o = new za({ props: { confusions: t[0] } })),
      {
        c() {
          W(n.$$.fragment),
            (e = w()),
            W(r.$$.fragment),
            (i = w()),
            W(o.$$.fragment);
        },
        m(t, u) {
          H(n, t, u), g(t, e, u), H(r, t, u), g(t, i, u), H(o, t, u), (a = !0);
        },
        p(t, [e]) {
          const i = {};
          2 & e && (i.encoding = t[1].encoding),
            2 & e && (i.normalization = t[1].normalization),
            n.$set(i);
          const a = {};
          1 & e && (a.confusions = t[0]), r.$set(a);
          const u = {};
          1 & e && (u.confusions = t[0]), o.$set(u);
        },
        i(t) {
          a ||
            (Y(n.$$.fragment, t),
            Y(r.$$.fragment, t),
            Y(o.$$.fragment, t),
            (a = !0));
        },
        o(t) {
          P(n.$$.fragment, t),
            P(r.$$.fragment, t),
            P(o.$$.fragment, t),
            (a = !1);
        },
        d(t) {
          G(n, t), t && v(e), G(r, t), t && v(i), G(o, t);
        },
      }
    );
  }
  function iu(t, n, e) {
    let r;
    c(t, Er, (t) => e(1, (r = t)));
    let { confusions: i = null } = n;
    return (
      (t.$$set = (t) => {
        "confusions" in t && e(0, (i = t.confusions));
      }),
      [i, r]
    );
  }
  class ou extends J {
    constructor(t) {
      super(), X(this, t, iu, ru, u, { confusions: 0 });
    }
  }
  (t.embed = function (t, e, r) {
    const i = document.getElementById(t);
    i || console.warn(`Could not find container "${t}"`),
      Er.set({ ...n, ...e }),
      new ou({ target: i, props: { confusions: r } });
  }),
    (t.embedElement = function (t, e, r) {
      Er.set({ ...n, ...e }), new ou({ target: t, props: { confusions: r } });
    }),
    (t.embedElementWithoutUI = function (t, e, r) {
      Er.set({ ...n, ...e }), new za({ target: t, props: { confusions: r } });
    }),
    (t.embedWithoutUI = function (t, e, r) {
      const i = document.getElementById(t);
      i || console.warn(`Could not find container "${t}"`),
        Er.set({ ...n, ...e }),
        new za({ target: i, props: { confusions: r } });
    }),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
