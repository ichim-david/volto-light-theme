function e() {
  return (
    (e = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    e.apply(this, arguments)
  );
}
function t(e, t) {
  const n = t.width,
    r = t.height,
    u = t.inlineSize,
    o = t.blockSize;
  switch (e) {
    case 1:
      return null != n ? { type: 3, value: n, unit: 'px' } : { type: 1 };
    case 3:
      return null != u ? { type: 3, value: u, unit: 'px' } : { type: 1 };
    case 2:
      return null != r ? { type: 3, value: r, unit: 'px' } : { type: 1 };
    case 4:
      return null != o ? { type: 3, value: o, unit: 'px' } : { type: 1 };
    case 5:
      return null != n && null != r && r > 0
        ? { type: 2, value: n / r }
        : { type: 1 };
    case 6:
      return null != n && null != r
        ? { type: 4, value: r >= n ? 'portrait' : 'landscape' }
        : { type: 1 };
  }
}
function n(e, t) {
  switch (e.type) {
    case 1:
    case 2:
    case 3:
    case 4:
      return i(e, t);
    case 5: {
      const n = t.sizeFeatures.get(e.feature);
      return null == n ? { type: 1 } : n;
    }
    case 6:
      return e.value;
  }
}
function r(e) {
  return { type: 5, value: e };
}
function u(e, t, n) {
  return r(
    (function (e, t, n) {
      switch (n) {
        case 1:
          return e === t;
        case 2:
          return e > t;
        case 3:
          return e >= t;
        case 4:
          return e < t;
        case 5:
          return e <= t;
      }
    })(e, t, n),
  );
}
function o(e, t, n) {
  return null == e ? t : null == t ? e : n(e, t);
}
function s(e, t) {
  switch (e) {
    case 'cqw':
      return t.cqw;
    case 'cqh':
      return t.cqh;
    case 'cqi':
      return 0 === t.writingAxis ? t.cqw : t.cqh;
    case 'cqb':
      return 1 === t.writingAxis ? t.cqw : t.cqh;
    case 'cqmin':
      return o(s('cqi', t), s('cqb', t), Math.min);
    case 'cqmax':
      return o(s('cqi', t), s('cqb', t), Math.max);
  }
}
function l(e, { treeContext: t }) {
  switch (e.unit) {
    case 'px':
      return e.value;
    case 'rem':
      return e.value * t.rootFontSize;
    case 'em':
      return e.value * t.fontSize;
    case 'cqw':
    case 'cqh':
    case 'cqi':
    case 'cqb':
    case 'cqmin':
    case 'cqmax':
      return o(e.value, s(e.unit, t), (e, t) => e * t);
  }
  return null;
}
function c(e, t) {
  switch (e.type) {
    case 2:
      return 0 === e.value ? 0 : null;
    case 3:
      return l(e, t);
  }
  return null;
}
function i(e, t) {
  switch (e.type) {
    case 4:
      return (function (e, t) {
        const o = n(e.left, t),
          s = n(e.right, t),
          l = e.operator;
        if ((4 === o.type && 4 === s.type) || (5 === o.type && 5 === s.type))
          return (function (e, t, n) {
            return 1 === n ? r(e.value === t.value) : { type: 1 };
          })(o, s, l);
        if (3 === o.type || 3 === s.type) {
          const e = c(o, t),
            n = c(s, t);
          if (null != e && null != n) return u(e, n, l);
        } else if (2 === o.type && 2 === s.type) return u(o.value, s.value, l);
        return { type: 1 };
      })(e, t);
    case 2:
      return (function (e, t) {
        const n = i(e.left, t);
        return 5 !== n.type || !0 !== n.value ? n : i(e.right, t);
      })(e, t);
    case 3:
      return (function (e, t) {
        const n = i(e.left, t);
        return 5 === n.type && !0 === n.value ? n : i(e.right, t);
      })(e, t);
    case 1: {
      const n = i(e.value, t);
      return 5 === n.type ? { type: 5, value: !n.value } : { type: 1 };
    }
    case 5:
      return a(n(e, t));
    case 6:
      return a(e.value);
  }
}
function a(e) {
  switch (e.type) {
    case 5:
      return e;
    case 2:
    case 3:
      return { type: 5, value: e.value > 0 };
  }
  return { type: 1 };
}
const f = Array.from({ length: 4 }, () =>
    Math.floor(256 * Math.random()).toString(16),
  ).join(''),
  p = S('container'),
  y = S('container-type'),
  h = S('container-name'),
  v = `data-cqs-${f}`,
  d = `data-cqc-${f}`,
  m = S('cqw'),
  w = S('cqh'),
  g = S('cqi'),
  b = S('cqb');
function S(e) {
  return `--cq-${e}-${f}`;
}
const x = Symbol();
function q(e, t) {
  const n = {
    value: t,
    errorIndices: [],
    index: -1,
    at(r) {
      const u = n.index + r;
      return u >= e.length ? t : e[u];
    },
    consume: (e) => ((n.index += e), (n.value = n.at(0)), n.value),
    reconsume() {
      n.index -= 1;
    },
    error() {
      n.errorIndices.push(n.index);
    },
  };
  return n;
}
function C(e) {
  return q(e, { type: 0 });
}
function* $(e) {
  const t = [];
  let n = !1;
  for (const r of e) {
    const e = r.codePointAt(0);
    n && 10 !== e && ((n = !1), t.push(10)),
      0 === e || (e >= 55296 && e <= 57343)
        ? t.push(65533)
        : 13 === e
        ? (n = !0)
        : t.push(e);
  }
  const r = q(t, -1),
    { at: u, consume: o, error: s, reconsume: l } = r;
  function c() {
    return String.fromCodePoint(r.value);
  }
  function i() {
    return { type: 13, value: c() };
  }
  function a() {
    for (; z(u(1)); ) o(1);
  }
  function f() {
    for (; -1 !== r.value; )
      if ((o(1), 42 === u(0) && 47 === u(1))) return void o(1);
    s();
  }
  function p() {
    const [e, t] = (function () {
        let e = 0,
          t = '',
          n = u(1);
        for ((43 !== n && 45 !== n) || (o(1), (t += c())); k(u(1)); )
          o(1), (t += c());
        if (46 === u(1) && k(u(2)))
          for (e = 1, o(1), t += c(); k(u(1)); ) o(1), (t += c());
        if (((n = u(1)), 69 === n || 101 === n)) {
          const n = u(2);
          if (k(n)) for (e = 1, o(1), t += c(); k(u(1)); ) o(1), (t += c());
          else if ((45 === n || 43 === n) && k(u(3)))
            for (e = 1, o(1), t += c(), o(1), t += c(); k(u(1)); )
              o(1), (t += c());
        }
        return [t, e];
      })(),
      n = u(1);
    return d(n, u(1), u(2))
      ? { type: 15, value: e, flag: t, unit: w() }
      : 37 === n
      ? (o(1), { type: 16, value: e })
      : { type: 17, value: e, flag: t };
  }
  function y() {
    const e = w();
    let t = u(1);
    if ('url' === e.toLowerCase() && 40 === t) {
      for (o(1); z(u(1)) && z(u(2)); ) o(1);
      t = u(1);
      const n = u(2);
      return 34 === t || 39 === t
        ? { type: 23, value: e }
        : !z(t) || (34 !== n && 39 !== n)
        ? (function () {
            let e = '';
            for (a(); ; ) {
              const n = o(1);
              if (41 === n) return { type: 20, value: e };
              if (-1 === n) return s(), { type: 20, value: e };
              if (z(n)) {
                a();
                const t = u(1);
                return 41 === t || -1 === t
                  ? (o(1), -1 === n && s(), { type: 20, value: e })
                  : (g(), { type: 21 });
              }
              if (
                34 === n ||
                39 === n ||
                40 === n ||
                ((t = n) >= 0 && t <= 8) ||
                11 === t ||
                (t >= 14 && t <= 31) ||
                127 === t
              )
                return s(), g(), { type: 21 };
              if (92 === n) {
                if (!j(n, u(1))) return s(), { type: 21 };
                e += v();
              } else e += c();
            }
            var t;
          })()
        : { type: 23, value: e };
    }
    return 40 === t ? (o(1), { type: 23, value: e }) : { type: 24, value: e };
  }
  function h(e) {
    let t = '';
    for (;;) {
      const n = o(1);
      if (-1 === n || n === e) return -1 === n && s(), { type: 2, value: t };
      if (E(n)) return s(), l(), { type: 3 };
      if (92 === n) {
        const e = u(1);
        if (-1 === e) continue;
        E(e) ? o(1) : (t += v());
      } else t += c();
    }
  }
  function v() {
    const e = o(1);
    if (A(e)) {
      const t = [e];
      for (let e = 0; e < 5; e++) {
        const e = u(1);
        if (!A(e)) break;
        t.push(e), o(1);
      }
      z(u(1)) && o(1);
      let n = parseInt(String.fromCodePoint(...t), 16);
      return (
        (0 === n || (n >= 55296 && n <= 57343) || n > 1114111) && (n = 65533),
        String.fromCodePoint(n)
      );
    }
    return -1 === e ? (s(), String.fromCodePoint(65533)) : c();
  }
  function d(e, t, n) {
    return 45 === e ? L(t) || 45 === t || j(t, n) : !!L(e);
  }
  function m(e, t, n) {
    return 43 === e || 45 === e
      ? k(t) || (46 === t && k(n))
      : !(46 !== e || !k(t)) || !!k(e);
  }
  function w() {
    let e = '';
    for (;;) {
      const t = o(1);
      if (M(t)) e += c();
      else {
        if (!j(t, u(1))) return l(), e;
        e += v();
      }
    }
  }
  function g() {
    for (;;) {
      const e = o(1);
      if (-1 === e) return;
      j(e, u(1)) && v();
    }
  }
  for (;;) {
    const e = o(1);
    if (47 === e && 42 === u(1)) o(2), f();
    else if (z(e)) a(), yield { type: 1 };
    else if (34 === e) yield h(e);
    else if (35 === e) {
      const e = u(1);
      M(e) || j(e, u(2))
        ? yield { type: 14, flag: d(u(1), u(2), u(3)) ? 1 : 0, value: w() }
        : yield i();
    } else if (39 === e) yield h(e);
    else if (40 === e) yield { type: 4 };
    else if (41 === e) yield { type: 5 };
    else if (43 === e) m(e, u(1), u(2)) ? (l(), yield p()) : yield i();
    else if (44 === e) yield { type: 6 };
    else if (45 === e) {
      const t = u(1),
        n = u(2);
      m(e, t, n)
        ? (l(), yield p())
        : 45 === t && 62 === n
        ? (o(2), yield { type: 19 })
        : d(e, t, n)
        ? (l(), yield y())
        : yield i();
    } else if (46 === e) m(e, u(1), u(2)) ? (l(), yield p()) : yield i();
    else if (58 === e) yield { type: 7 };
    else if (59 === e) yield { type: 8 };
    else if (60 === e)
      33 === u(1) && 45 === u(2) && 45 === u(3)
        ? yield { type: 18 }
        : yield i();
    else if (64 === e)
      if (d(u(1), u(2), u(3))) {
        const e = w();
        yield { type: 22, value: e };
      } else yield i();
    else if (91 === e) yield { type: 9 };
    else if (92 === e) j(e, u(1)) ? (l(), yield y()) : (s(), yield i());
    else if (93 === e) yield { type: 10 };
    else if (123 === e) yield { type: 11 };
    else if (125 === e) yield { type: 12 };
    else if (k(e)) l(), yield p();
    else if (L(e)) l(), yield y();
    else {
      if (-1 === e) return yield { type: 0 }, r.errorIndices;
      yield { type: 13, value: c() };
    }
  }
}
function k(e) {
  return e >= 48 && e <= 57;
}
function A(e) {
  return k(e) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102);
}
function E(e) {
  return 10 === e || 13 === e || 12 === e;
}
function z(e) {
  return E(e) || 9 === e || 32 === e;
}
function L(e) {
  return (e >= 65 && e <= 90) || (e >= 97 && e <= 122) || e >= 128 || 95 === e;
}
function j(e, t) {
  return 92 === e && !E(t);
}
function M(e) {
  return L(e) || k(e) || 45 === e;
}
const T = { 11: 12, 9: 10, 4: 5 };
function P(t, n) {
  const r = (function (e, t) {
    const n = [];
    for (;;)
      switch (e.consume(1).type) {
        case 1:
          break;
        case 0:
          return { type: 3, value: n };
        case 18:
        case 19:
          if (!1 !== t) {
            e.reconsume();
            const t = R(e);
            t !== x && n.push(t);
          }
          break;
        case 22:
          e.reconsume(), n.push(U(e));
          break;
        default: {
          e.reconsume();
          const t = R(e);
          t !== x && n.push(t);
          break;
        }
      }
  })(C(t), !0 === n);
  return e({}, r, {
    value: r.value.map((t) =>
      26 === t.type
        ? (function (t, n) {
            return 0 === t.value.value.type
              ? e({}, t, {
                  value: e({}, t.value, { value: O(t.value.value.value) }),
                })
              : t;
          })(t)
        : t,
    ),
  });
}
function N(e) {
  const t = C(e),
    n = [];
  for (;;) {
    if (0 === t.consume(1).type) return n;
    t.reconsume(), n.push(Q(t));
  }
}
function O(e) {
  return (function (e) {
    const t = [],
      n = [];
    for (;;) {
      const r = e.consume(1);
      switch (r.type) {
        case 1:
        case 8:
          break;
        case 0:
          return { type: 1, value: [...n, ...t] };
        case 22:
          e.reconsume(), t.push(U(e));
          break;
        case 24: {
          const t = [r];
          let u = e.at(1);
          for (; 8 !== u.type && 0 !== u.type; ) t.push(Q(e)), (u = e.at(1));
          const o = I(C(t));
          o !== x && n.push(o);
          break;
        }
        case 13:
          if ('&' === r.value) {
            e.reconsume();
            const n = R(e);
            n !== x && t.push(n);
            break;
          }
        default: {
          e.error(), e.reconsume();
          let t = e.at(1);
          for (; 8 !== t.type && 0 !== t.type; ) Q(e), (t = e.at(1));
          break;
        }
      }
    }
  })(C(e));
}
function F(e) {
  for (; 1 === e.at(1).type; ) e.consume(1);
}
function U(e) {
  let t = e.consume(1);
  if (22 !== t.type) throw new Error(`Unexpected type ${t.type}`);
  const n = t.value,
    r = [];
  for (;;)
    switch (((t = e.consume(1)), t.type)) {
      case 8:
        return { type: 25, name: n, prelude: r, value: null };
      case 0:
        return e.error(), { type: 25, name: n, prelude: r, value: null };
      case 11:
        return { type: 25, name: n, prelude: r, value: H(e) };
      case 28:
        if (11 === t.source.type)
          return { type: 25, name: n, prelude: r, value: t };
      default:
        e.reconsume(), r.push(Q(e));
    }
}
function R(e) {
  let t = e.value;
  const n = [];
  for (;;)
    switch (((t = e.consume(1)), t.type)) {
      case 0:
        return e.error(), x;
      case 11:
        return { type: 26, prelude: n, value: H(e) };
      case 28:
        if (11 === t.source.type) return { type: 26, prelude: n, value: t };
      default:
        e.reconsume(), n.push(Q(e));
    }
}
function I(e) {
  const t = e.consume(1);
  if (24 !== t.type) throw new Error(`Unexpected type ${t.type}`);
  const n = t.value,
    r = [];
  let u = !1;
  if ((F(e), 7 !== e.at(1).type)) return e.error(), x;
  for (e.consume(1), F(e); 0 !== e.at(1).type; ) r.push(Q(e));
  const o = r[r.length - 2],
    s = r[r.length - 1];
  return (
    o &&
      13 === o.type &&
      '!' === o.value &&
      24 === s.type &&
      'important' === s.value.toLowerCase() &&
      ((u = !0), r.splice(r.length - 2)),
    { type: 29, name: n, value: r, important: u }
  );
}
function Q(e) {
  const t = e.consume(1);
  switch (t.type) {
    case 11:
    case 9:
    case 4:
      return H(e);
    case 23:
      return (function (e) {
        let t = e.value;
        if (23 !== t.type) throw new Error(`Unexpected type ${t.type}`);
        const n = t.value,
          r = [];
        for (;;)
          switch (((t = e.consume(1)), t.type)) {
            case 5:
              return { type: 27, name: n, value: r };
            case 0:
              return e.error(), { type: 27, name: n, value: r };
            default:
              e.reconsume(), r.push(Q(e));
          }
      })(e);
    default:
      return t;
  }
}
function H(e) {
  let t = e.value;
  const n = t,
    r = T[n.type];
  if (!r) throw new Error(`Unexpected type ${t.type}`);
  const u = [];
  for (;;)
    switch (((t = e.consume(1)), t.type)) {
      case r:
        return { type: 28, source: n, value: { type: 0, value: u } };
      case 0:
        return e.error(), { type: 28, source: n, value: { type: 0, value: u } };
      default:
        e.reconsume(), u.push(Q(e));
    }
}
function V(e) {
  return F(e), 0 === e.at(1).type;
}
const D = { 11: ['{', '}'], 9: ['[', ']'], 4: ['(', ')'] };
function W(e, t) {
  switch (e.type) {
    case 25:
      return `@${CSS.escape(e.name)} ${e.prelude.map((e) => W(e)).join('')}${
        e.value ? W(e.value) : ';'
      }`;
    case 26:
      return `${e.prelude.map((e) => W(e)).join('')}${W(e.value)}`;
    case 28: {
      const [t, n] = D[e.source.type];
      return `${t}${_(e.value)}${n}`;
    }
    case 27:
      return `${CSS.escape(e.name)}(${e.value.map((e) => W(e)).join('')})`;
    case 29:
      return `${CSS.escape(e.name)}:${e.value.map((e) => W(e)).join('')}${
        e.important ? ' !important' : ''
      }`;
    case 1:
      return ' ';
    case 8:
      return ';';
    case 7:
      return ':';
    case 14:
      return '#' + CSS.escape(e.value);
    case 24:
      return CSS.escape(e.value);
    case 15:
      return e.value + CSS.escape(e.unit);
    case 13:
    case 17:
      return e.value;
    case 2:
      return `"${CSS.escape(e.value)}"`;
    case 6:
      return ',';
    case 20:
      return 'url(' + CSS.escape(e.value) + ')';
    case 22:
      return '@' + CSS.escape(e.value);
    case 16:
      return e.value + '%';
    default:
      throw new Error(`Unsupported token ${e.type}`);
  }
}
function _(e, t) {
  return e.value
    .map((t) => {
      let n = W(t);
      return 29 === t.type && 0 !== e.type && (n += ';'), n;
    })
    .join('');
}
function B(e) {
  return W(e);
}
function G(e) {
  const t = e.at(1);
  return 13 === t.type && '=' === t.value && (e.consume(1), !0);
}
function Y(e, t) {
  const n = [];
  for (;;) {
    const r = e.at(1);
    if (
      0 === r.type ||
      (t && 7 === r.type) ||
      (13 === r.type && ('>' === r.value || '<' === r.value || '=' === r.value))
    )
      break;
    n.push(e.consume(1));
  }
  return n;
}
function J(e) {
  F(e);
  const t = e.consume(1);
  return 13 !== t.type
    ? x
    : '>' === t.value
    ? G(e)
      ? 3
      : 2
    : '<' === t.value
    ? G(e)
      ? 5
      : 4
    : '=' === t.value
    ? 1
    : x;
}
function K(e) {
  return 4 === e || 5 === e;
}
function X(e) {
  return 2 === e || 3 === e;
}
function Z(e, t, n) {
  const r = (function (e) {
    F(e);
    const t = e.consume(1);
    return F(e), 24 !== t.type || 0 !== e.at(1).type ? x : t.value;
  })(C(e));
  if (r === x) return x;
  let u = r.toLowerCase();
  return (u = n ? n(u) : u), t.has(u) ? u : x;
}
function ee(e) {
  return { type: 13, value: e };
}
function te(e, t) {
  return { type: 29, name: e, value: t, important: !1 };
}
function ne(e) {
  return { type: 24, value: e };
}
function re(e, t) {
  return { type: 27, name: e, value: t };
}
function ue(e) {
  return re('var', [ne(e)]);
}
function oe(e, t) {
  F(e);
  let n = !1,
    r = e.at(1);
  if (24 === r.type) {
    if ('not' !== r.value.toLowerCase()) return x;
    e.consume(1), F(e), (n = !0);
  }
  let u = (function (e) {
    const t = e.consume(1);
    switch (t.type) {
      case 28: {
        if (4 !== t.source.type) return x;
        const e = oe(C(t.value.value), null);
        return e !== x ? e : { type: 4, value: t };
      }
      case 27:
        return { type: 4, value: t };
      default:
        return x;
    }
  })(e);
  if (u === x) return x;
  (u = n ? { type: 1, value: u } : u), F(e), (r = e.at(1));
  const o = 24 === r.type ? r.value.toLowerCase() : null;
  if (null !== o) {
    if (
      (e.consume(1),
      F(e),
      ('and' !== o && 'or' !== o) || (null !== t && o !== t))
    )
      return x;
    const n = oe(e, o);
    return n === x ? x : { type: 'and' === o ? 2 : 3, left: u, right: n };
  }
  return V(e) ? u : x;
}
function se(e) {
  return oe(e, null);
}
function le(e) {
  switch (e.type) {
    case 1:
      return [ne('not'), { type: 1 }, ...le(e.value)];
    case 2:
    case 3:
      return [
        ...le(e.left),
        { type: 1 },
        ne(2 === e.type ? 'and' : 'or'),
        { type: 1 },
        ...le(e.right),
      ];
    case 4:
      return [e.value];
  }
}
const ce = {
    width: 1,
    height: 2,
    'inline-size': 3,
    'block-size': 4,
    'aspect-ratio': 5,
    orientation: 6,
  },
  ie = new Set(Object.keys(ce)),
  ae = new Set(['none', 'and', 'not', 'or', 'normal', 'auto']),
  fe = new Set(['initial', 'inherit', 'revert', 'revert-layer', 'unset']),
  pe = new Set(['size', 'inline-size']);
function ye(e, t, n, r) {
  const u = n();
  if (u === x) return x;
  let o = [u, null];
  F(e);
  const s = e.at(1);
  if (13 === s.type) {
    if (s.value !== t) return x;
    e.consume(1), F(e);
    const n = r();
    F(e), n !== x && (o = [u, n]);
  }
  return V(e) ? o : x;
}
function he(e) {
  const t = e.consume(1);
  return 17 === t.type ? parseInt(t.value) : x;
}
function ve(e) {
  const t = C(e);
  F(t);
  const n = t.consume(1);
  let r = x;
  switch (n.type) {
    case 17:
      t.reconsume(),
        (r = (function (e) {
          const t = ye(
            e,
            '/',
            () => he(e),
            () => he(e),
          );
          return t === x
            ? x
            : { type: 2, value: t[0] / (null !== t[1] ? t[1] : 1) };
        })(t));
      break;
    case 15:
      r = { type: 3, value: parseInt(n.value), unit: n.unit.toLowerCase() };
      break;
    case 24: {
      const e = n.value.toLowerCase();
      switch (e) {
        case 'landscape':
        case 'portrait':
          r = { type: 4, value: e };
      }
    }
  }
  return r === x ? x : V(t) ? { type: 6, value: r } : x;
}
function de(e) {
  return !ge((e = e.toLowerCase())) && !ae.has(e);
}
function me(e, t) {
  const n = [];
  for (;;) {
    F(e);
    const r = e.at(1);
    if (24 !== r.type || !t(r.value)) return n;
    e.consume(1), n.push(r.value);
  }
}
function we(e) {
  const t = [];
  for (;;) {
    F(e);
    const n = e.at(1);
    if (24 !== n.type) break;
    const r = n.value;
    if (!de(r)) break;
    e.consume(1), t.push(r);
  }
  return t;
}
function ge(e) {
  return fe.has(e);
}
function be(e) {
  return e.map((e) => 'cq-' + e);
}
function Se(e) {
  const t = me(e, (e) => ge(e));
  return 1 === t.length ? be(t) : x;
}
function xe(e, t) {
  const n = me(e, (e) => 'none' === e);
  if (1 === n.length) return be(n);
  if (0 !== n.length) return x;
  if (t) {
    const t = Se(e);
    if (t !== x) return t;
  }
  const r = we(e);
  return r.length > 0 && (!t || V(e)) ? r : x;
}
function qe(e, t) {
  if (t) {
    const t = Se(e);
    if (t !== x) return t;
  }
  return (function (e) {
    const t = me(e, (e) => 'normal' === e);
    if (1 === t.length) return be(t);
    if (0 !== t.length) return x;
    const n = me(e, (e) => pe.has(e));
    return n.length > 0 && V(e) ? n : x;
  })(e);
}
function Ce(e) {
  const t = C(e),
    n = Se(t);
  if (n !== x) return [n, n];
  const r = ye(
    t,
    '/',
    () => xe(t, !1),
    () => qe(t, !1),
  );
  return r !== x && V(t) ? [r[0], r[1] || []] : x;
}
function $e(e) {
  const t = C(e),
    n = we(t);
  if (!n || n.length > 1) return x;
  const r = se(t);
  if (r === x) return x;
  const u = { features: new Set() },
    o = ke(r, u);
  return V(t)
    ? { name: n.length > 0 ? n[0] : null, condition: o, features: u.features }
    : x;
}
function ke(e, t) {
  switch (e.type) {
    case 1:
      return { type: 1, value: ke(e.value, t) };
    case 2:
    case 3:
      return {
        type: 2 === e.type ? 2 : 3,
        left: ke(e.left, t),
        right: ke(e.right, t),
      };
    case 4:
      if (28 === e.value.type) {
        const n = (function (e, t) {
          const n = (function (e, t) {
            const n = Y(e, !0),
              r = e.at(1);
            if (0 === r.type) {
              const e = Z(n, t);
              return e !== x && t.has(e) ? { type: 1, feature: e } : x;
            }
            if (7 === r.type) {
              e.consume(1);
              const r = Y(e, !1);
              let u = 1;
              const o = Z(n, t, (e) =>
                e.startsWith('min-')
                  ? ((u = 3), e.substring(4))
                  : e.startsWith('max-')
                  ? ((u = 5), e.substring(4))
                  : e,
              );
              return o !== x
                ? { type: 2, feature: o, bounds: [null, [u, r]] }
                : x;
            }
            const u = J(e);
            if (u === x) return x;
            const o = Y(e, !1);
            if (0 === e.at(1).type) {
              const e = Z(n, t);
              if (e !== x)
                return { type: 2, feature: e, bounds: [null, [u, o]] };
              const r = Z(o, t);
              return r !== x
                ? { type: 2, feature: r, bounds: [[u, n], null] }
                : x;
            }
            const s = J(e);
            if (s === x || !((X(u) && X(s)) || (K(u) && K(s)))) return x;
            const l = Y(e, !1),
              c = Z(o, t);
            return c !== x
              ? {
                  type: 2,
                  feature: c,
                  bounds: [
                    [u, n],
                    [s, l],
                  ],
                }
              : x;
          })(e, ie);
          if (n === x) return x;
          const r = ce[n.feature];
          if (null == r) return x;
          if ((t.features.add(r), 1 === n.type)) return { type: 5, feature: r };
          {
            const e = { type: 5, feature: r };
            let t = x;
            if (null !== n.bounds[0]) {
              const r = ve(n.bounds[0][1]);
              if (r === x) return x;
              t = { type: 4, operator: n.bounds[0][0], left: r, right: e };
            }
            if (null !== n.bounds[1]) {
              const r = ve(n.bounds[1][1]);
              if (r === x) return x;
              const u = {
                type: 4,
                operator: n.bounds[1][0],
                left: e,
                right: r,
              };
              t = t !== x ? { type: 2, left: t, right: u } : u;
            }
            return t;
          }
        })(C(e.value.value.value), t);
        if (n !== x) return n;
      }
      return { type: 6, value: { type: 1 } };
  }
}
let Ae = 0;
const Ee = { cqw: m, cqh: w, cqi: g, cqb: b },
  ze = CSS.supports('selector(:where(div))'),
  Le = ':not(.container-query-polyfill)';
N(Array.from($(Le)));
const je = document.createElement('div'),
  Me = new Set(['before', 'after', 'first-line', 'first-letter']);
function Te(e, t) {
  return re('calc', [{ type: 17, flag: e.flag, value: e.value }, ee('*'), t]);
}
function Pe(t) {
  return t.map((t) => {
    switch (t.type) {
      case 15:
        return (function (e) {
          const t = e.unit,
            n = Ee[t];
          return null != n
            ? Te(e, ue(n))
            : 'cqmin' === t || 'cqmax' === t
            ? Te(e, re(e.unit.slice(2), [ue(g), { type: 6 }, ue(b)]))
            : e;
        })(t);
      case 27:
        return e({}, t, { value: Pe(t.value) });
    }
    return t;
  });
}
function Ne(t) {
  switch (t.name) {
    case 'container':
      return Ce(t.value) ? e({}, t, { name: p }) : t;
    case 'container-name':
      return xe(C(t.value), !0) ? e({}, t, { name: h }) : t;
    case 'container-type':
      return null != qe(C(t.value), !0) ? e({}, t, { name: y }) : t;
  }
  return e({}, t, { value: Pe(t.value) });
}
function Oe(t, n) {
  return e({}, t, {
    value: t.value.map((t) => {
      switch (t.type) {
        case 25:
          return He(t, n);
        case 26:
          return (function (t, n) {
            return n.transformStyleRule(e({}, t, { value: Re(t.value, n) }));
          })(t, n);
        default:
          return t;
      }
    }),
  });
}
function Fe(e) {
  return 0 === e.type || 6 === e.type;
}
function Ue(e) {
  for (let t = e.length - 1; t >= 0; t--)
    if (1 !== e[t].type) return e.slice(0, t + 1);
  return e;
}
function Re(t, n) {
  return (function (t, n) {
    const r = [];
    let u = null,
      o = null;
    for (const e of t.value.value)
      switch (e.type) {
        case 25:
          {
            const t = n ? n(e) : e;
            t && r.push(t);
          }
          break;
        case 29: {
          const t = Ne(e);
          switch (t.name) {
            case p: {
              const t = Ce(e.value);
              t !== x && ((u = t[0]), (o = t[1]));
              break;
            }
            case h: {
              const t = xe(C(e.value), !0);
              t !== x && (u = t);
              break;
            }
            case y: {
              const t = qe(C(e.value), !0);
              t !== x && (o = t);
              break;
            }
            default:
              r.push(t);
          }
        }
      }
    return (
      u && u.length > 0 && r.push(te(h, [ne(u.join(' '))])),
      o && o.length > 0 && r.push(te(y, [ne(o.join(' '))])),
      e({}, t, { value: { type: 2, value: r } })
    );
  })(t, (e) => He(e, n));
}
function Ie(t) {
  if (1 === t.type) return e({}, t, { value: Ie(t.value) });
  if (2 === t.type || 3 === t.type)
    return e({}, t, { left: Ie(t.left), right: Ie(t.right) });
  if (4 === t.type && 28 === t.value.type) {
    const n = (function (e) {
      const t = C(e);
      return F(t), 24 !== t.at(1).type ? x : I(t) || x;
    })(t.value.value.value);
    if (n !== x)
      return e({}, t, {
        value: e({}, t.value, { value: { type: 0, value: [Ne(n)] } }),
      });
  }
  return t;
}
function Qe(t, n) {
  let r = se(C(t.prelude));
  return (
    (r = r !== x ? Ie(r) : x),
    e({}, t, {
      prelude: r !== x ? le(r) : t.prelude,
      value: t.value
        ? e({}, t.value, { value: Oe(P(t.value.value.value), n) })
        : null,
    })
  );
}
function He(t, n) {
  switch (t.name.toLocaleLowerCase()) {
    case 'media':
    case 'layer':
      return (function (t, n) {
        return e({}, t, {
          value: t.value
            ? e({}, t.value, { value: Oe(P(t.value.value.value), n) })
            : null,
        });
      })(t, n);
    case 'keyframes':
      return (function (t, n) {
        let r = null;
        return (
          t.value &&
            (r = e({}, t.value, {
              value: {
                type: 3,
                value: P(t.value.value.value).value.map((t) => {
                  switch (t.type) {
                    case 26:
                      return (function (t, n) {
                        return e({}, t, { value: Re(t.value, n) });
                      })(t, n);
                    case 25:
                      return He(t, n);
                  }
                }),
              },
            })),
          e({}, t, { value: r })
        );
      })(t, n);
    case 'supports':
      return Qe(t, n);
    case 'container':
      return (function (t, n) {
        if (t.value) {
          const r = $e(t.prelude);
          if (r !== x) {
            const u = {
                rule: r,
                selector: null,
                parent: n.parent,
                uid: 'c' + Ae++,
              },
              o = new Set(),
              s = [],
              l = Oe(P(t.value.value.value), {
                descriptors: n.descriptors,
                parent: u,
                transformStyleRule: (t) => {
                  const [n, r] = (function (e, t, n) {
                    const r = C(e),
                      u = [],
                      o = [];
                    for (;;) {
                      if (0 === r.at(1).type) return [u, o];
                      const n = Math.max(0, r.index);
                      for (
                        ;
                        (l = r.at(1)),
                          (c = r.at(2)),
                          !(
                            Fe(l) ||
                            (7 === l.type &&
                              (7 === c.type ||
                                (24 === c.type &&
                                  Me.has(c.value.toLowerCase()))))
                          );

                      )
                        r.consume(1);
                      const i = r.index + 1,
                        a = e.slice(n, i),
                        f = a.length > 0 ? Ue(a) : [ee('*')];
                      for (; !Fe(r.at(1)); ) r.consume(1);
                      const p = e.slice(i, Math.max(0, r.index + 1));
                      let y = f,
                        h = [
                          {
                            type: 28,
                            source: { type: 9 },
                            value: {
                              type: 0,
                              value: [
                                ne(p.length > 0 ? v : d),
                                ee('~'),
                                ee('='),
                                { type: 2, value: t },
                              ],
                            },
                          },
                        ];
                      if (ze) h = [ee(':'), re('where', h)];
                      else {
                        const e = f.map(B).join('');
                        e.endsWith(Le)
                          ? (y = N(
                              Array.from(
                                $(e.substring(0, e.length - Le.length)),
                              ),
                            ))
                          : s.push({ actual: e, expected: e + Le });
                      }
                      u.push(...f),
                        o.push(...y),
                        o.push(...h),
                        o.push(...p),
                        r.consume(1);
                    }
                    var l, c;
                  })(t.prelude, u.uid);
                  if (s.length > 0) return t;
                  const l = n.map(B).join('');
                  try {
                    je.matches(l), o.add(l);
                  } catch (e) {}
                  return e({}, t, { prelude: r });
                },
              }).value;
            if (s.length > 0) {
              const e = new Set(),
                t = [];
              let n = 0;
              for (const { actual: e } of s) n = Math.max(n, e.length);
              const r = Array.from({ length: n }, () => ' ').join('');
              for (const { actual: u, expected: o } of s)
                e.has(u) ||
                  (t.push(`${u}${r.substring(0, n - u.length)} => ${o}`),
                  e.add(u));
              console.warn(
                `The :where() pseudo-class is not supported by this browser. To use the Container Query Polyfill, you must modify the selectors under your @container rules:\n\n${t.join(
                  '\n',
                )}`,
              );
            }
            return (
              o.size > 0 && (u.selector = Array.from(o).join(', ')),
              n.descriptors.push(u),
              {
                type: 25,
                name: 'media',
                prelude: [ne('all')],
                value: e({}, t.value, { value: { type: 3, value: l } }),
              }
            );
          }
        }
        return t;
      })(t, n);
  }
  return t;
}
class Ve {
  constructor(e) {
    (this.value = void 0), (this.value = e);
  }
}
function De(e, t) {
  if (e === t) return !0;
  if (
    typeof e == typeof t &&
    null !== e &&
    null !== t &&
    'object' == typeof e
  ) {
    if (Array.isArray(e)) {
      if (!Array.isArray(t) || t.length !== e.length) return !1;
      for (let n = 0, r = e.length; n < r; n++) if (!De(e[n], t[n])) return !1;
      return !0;
    }
    if (e instanceof Ve) return t instanceof Ve && e.value === t.value;
    {
      const n = Object.keys(e);
      if (n.length !== Object.keys(t).length) return !1;
      for (let r = 0, u = n.length; r < u; r++) {
        const u = n[r];
        if (!De(e[u], t[u])) return !1;
      }
      return !0;
    }
  }
  return !1;
}
const We = Symbol('CQ_INSTANCE'),
  _e = Symbol('CQ_STYLESHEET'),
  Be = CSS.supports('width: 1svh'),
  Ge = new Set([
    'vertical-lr',
    'vertical-rl',
    'sideways-rl',
    'sideways-lr',
    'tb',
    'tb-lr',
    'tb-rl',
  ]),
  Ye = [
    'padding-left',
    'padding-right',
    'border-left-width',
    'border-right-width',
  ],
  Je = [
    'padding-top',
    'padding-bottom',
    'border-top-width',
    'border-bottom-width',
  ],
  Ke = /(\w*(\s|-))?(table|ruby)(-\w*)?/;
class Xe {
  constructor(e) {
    (this.node = void 0), (this.node = e);
  }
  connected() {}
  disconnected() {}
  updated() {}
}
class Ze extends Xe {
  constructor(e, t) {
    super(e),
      (this.context = void 0),
      (this.controller = null),
      (this.styleSheet = null),
      (this.context = t);
  }
  connected() {
    var e = this;
    const t = this.node;
    if ('stylesheet' === t.rel) {
      const n = new URL(t.href, document.baseURI);
      n.origin === location.origin &&
        (this.controller = rt(async function (r) {
          const u = await fetch(n.toString(), { signal: r }),
            o = await u.text(),
            s = (e.styleSheet = await e.context.registerStyleSheet({
              source: o,
              url: n,
              signal: r,
            })),
            l = new Blob([s.source], { type: 'text/css' }),
            c = new Image();
          (c.onload = c.onerror = s.refresh),
            (c.src = t.href = URL.createObjectURL(l));
        }));
    }
  }
  disconnected() {
    var e, t;
    null == (e = this.controller) || e.abort(),
      (this.controller = null),
      null == (t = this.styleSheet) || t.dispose(),
      (this.styleSheet = null);
  }
}
class et extends Xe {
  constructor(e, t) {
    super(e),
      (this.context = void 0),
      (this.controller = null),
      (this.styleSheet = null),
      (this.context = t);
  }
  connected() {
    var e = this;
    this.controller = rt(async function (t) {
      const n = e.node,
        r = (e.styleSheet = await e.context.registerStyleSheet({
          source: n.innerHTML,
          signal: t,
        }));
      (n.innerHTML = r.source), r.refresh();
    });
  }
  disconnected() {
    var e, t;
    null == (e = this.controller) || e.abort(),
      (this.controller = null),
      null == (t = this.styleSheet) || t.dispose(),
      (this.styleSheet = null);
  }
}
class tt extends Xe {
  connected() {
    const e = `* { ${y}: cq-normal; ${h}: cq-none; }`;
    this.node.innerHTML =
      void 0 === window.CSSLayerBlockRule
        ? e
        : `@layer cq-polyfill-${f} { ${e} }`;
  }
}
class nt extends Xe {
  constructor(e, t) {
    super(e),
      (this.context = void 0),
      (this.styles = void 0),
      (this.context = t),
      (this.styles = window.getComputedStyle(e));
  }
  connected() {
    this.node.style.cssText =
      'position: fixed; top: 0; left: 0; visibility: hidden; ' +
      (Be ? 'width: 1svw; height: 1svh;' : 'width: 1%; height: 1%;');
  }
  updated() {
    const e = ct((e) => this.styles.getPropertyValue(e));
    this.context.viewportChanged({ width: e.width, height: e.height });
  }
}
function rt(e) {
  const t = new AbortController();
  return (
    e(t.signal).catch((e) => {
      if (!(e instanceof DOMException && 'AbortError' === e.message)) throw e;
    }),
    t
  );
}
function ut(e) {
  let t = 0;
  if (0 === e.length) return t;
  if (
    e.startsWith('cq-') &&
    ('normal' === (e = e.substring('cq-'.length)) || ge(e))
  )
    return t;
  const n = e.split(' ');
  for (const e of n)
    switch (e) {
      case 'size':
        t |= 3;
        break;
      case 'inline-size':
        t |= 1;
        break;
      default:
        return 0;
    }
  return t;
}
function ot(e) {
  let t = 0;
  return (
    'none' !== e &&
      ((t |= 1), 'contents' === e || 'inline' === e || Ke.test(e) || (t |= 2)),
    t
  );
}
function st(e, t) {
  return parseFloat(e(t));
}
function lt(e, t) {
  return t.reduce((t, n) => t + st(e, n), 0);
}
function ct(e) {
  let t = 0,
    n = 0;
  return (
    'border-box' === e('box-sizing') && ((t = lt(e, Ye)), (n = lt(e, Je))),
    {
      fontSize: st(e, 'font-size'),
      width: st(e, 'width') - t,
      height: st(e, 'height') - n,
    }
  );
}
function it(e) {
  return {
    containerType: ut(e(y).trim()),
    containerNames:
      ((n = e(h).trim()),
      n.startsWith('cq-') &&
      ('none' === (n = n.substring('cq-'.length)) || ge(n))
        ? new Set([])
        : new Set(0 === n.length ? [] : n.split(' '))),
    writingAxis: ((t = e('writing-mode').trim()), Ge.has(t) ? 1 : 0),
    displayFlags: ot(e('display').trim()),
  };
  var t, n;
}
function at(e, t, n) {
  null != n
    ? n != e.getPropertyValue(t) && e.setProperty(t, n)
    : e.removeProperty(t);
}
function ft(e) {
  const t = e[_e];
  return null != t ? t : [];
}
function pt(e, t) {
  e[_e] = t;
}
new Promise((e) => {}),
  (window.CQPolyfill = { version: '1.0.2' }),
  'container' in document.documentElement.style ||
    (function (n) {
      function r(e) {
        return e[We] || null;
      }
      const u = document.documentElement;
      if (r(u)) return;
      const o = document.createElement(`cq-polyfill-${f}`),
        s = document.createElement('style');
      new MutationObserver((e) => {
        for (const t of e) {
          for (const e of t.removedNodes) {
            const t = r(e);
            null == t || t.disconnect();
          }
          (t.target.nodeType !== Node.DOCUMENT_NODE &&
            t.target.nodeType !== Node.DOCUMENT_FRAGMENT_NODE &&
            null === t.target.parentNode) ||
            ('attributes' === t.type &&
              t.attributeName &&
              (t.attributeName === v ||
                t.attributeName === d ||
                (t.target instanceof Element &&
                  t.target.getAttribute(t.attributeName) === t.oldValue))) ||
            (A(t.target).mutate(), S());
        }
      }).observe(u, {
        childList: !0,
        subtree: !0,
        attributes: !0,
        attributeOldValue: !0,
      });
      const l = new ResizeObserver((e) => {
          for (const t of e) A(t.target).resize();
          A(u).update(C());
        }),
        c = new Xe(u);
      async function a(e, { source: t, url: n, signal: r }) {
        const o = (function (e, t) {
          try {
            const n = Array.from($(e));
            if (t)
              for (let e = 0; e < n.length; e++) {
                const r = n[e];
                if (20 === r.type) r.value = new URL(r.value, t).toString();
                else if (23 === r.type && 'url' === r.value.toLowerCase()) {
                  const r = e + 1 < n.length ? n[e + 1] : null;
                  r &&
                    2 === r.type &&
                    (r.value = new URL(r.value, t).toString());
                }
              }
            const r = {
              descriptors: [],
              parent: null,
              transformStyleRule: (e) => e,
            };
            return { source: _(Oe(P(n, !0), r)), descriptors: r.descriptors };
          } catch (t) {
            return (
              console.warn(
                'An error occurred while transpiling stylesheet: ' + t,
              ),
              { source: e, descriptors: [] }
            );
          }
        })(t, n ? n.toString() : void 0);
        let s = () => {},
          l = () => {};
        const c = A(u);
        let i = !1;
        return (
          (null != r && r.aborted) ||
            (l = () => {
              if (!i) {
                const { sheet: t } = e;
                null != t &&
                  (pt(t, o.descriptors),
                  (i = !0),
                  (s = () => {
                    pt(t), c.mutate(), S();
                  }),
                  c.mutate(),
                  S());
              }
            }),
          { source: o.source, dispose: s, refresh: l }
        );
      }
      const p = { cqw: null, cqh: null };
      function y({ width: e, height: t }) {
        (p.cqw = e), (p.cqh = t);
      }
      function h(e, t, n) {
        if (e instanceof Element && t) {
          let r = '';
          for (const [n, u] of t.conditions) {
            const t = n.value;
            null != t.selector &&
              null != u &&
              2 == (2 & u) &&
              e.matches(t.selector) &&
              (r.length > 0 && (r += ' '), (r += t.uid));
          }
          r.length > 0 ? e.setAttribute(n, r) : e.removeAttribute(n);
        }
      }
      function S() {
        l.unobserve(u), l.observe(u);
      }
      const x = () => {
          const e = [];
          for (const t of document.styleSheets)
            for (const n of ft(t)) e.push([new Ve(n), 0]);
          return e;
        },
        q = window.getComputedStyle(u),
        C = () => {
          const t = (e) => q.getPropertyValue(e),
            n = it(t),
            r = ct(t);
          return {
            parentState: null,
            conditions: x(),
            context: e({}, p, {
              fontSize: r.fontSize,
              rootFontSize: r.fontSize,
              writingAxis: n.writingAxis,
            }),
            displayFlags: n.displayFlags,
            isQueryContainer: !1,
          };
        },
        k = (e) => e;
      function A(n) {
        let f = r(n);
        if (!f) {
          let p,
            S = null,
            x = !1;
          n === u
            ? ((p = c), (S = k))
            : n === o
            ? ((x = !0), (p = new nt(o, { viewportChanged: y })))
            : (p =
                n === s
                  ? new tt(s)
                  : n instanceof HTMLLinkElement
                  ? new Ze(n, { registerStyleSheet: (t) => a(n, e({}, t)) })
                  : n instanceof HTMLStyleElement
                  ? new et(n, { registerStyleSheet: (t) => a(n, e({}, t)) })
                  : new Xe(n));
          let q = Symbol();
          if (null == S && n instanceof Element) {
            const r = (function (n) {
              const r = window.getComputedStyle(n);
              return (function (n) {
                let u = null;
                return (...n) => {
                  if (null == u || !De(u[0], n)) {
                    const o = ((n, u) => {
                      const { context: o, conditions: s } = n,
                        l = (e) => r.getPropertyValue(e),
                        c = it(l),
                        a = e({}, o, { writingAxis: c.writingAxis });
                      let f = s,
                        p = !1,
                        y = c.displayFlags;
                      0 == (1 & n.displayFlags) && (y = 0);
                      const { containerType: h, containerNames: v } = c;
                      if (h > 0) {
                        const e = h > 0 && 2 == (2 & y),
                          n = new Map(s.map((e) => [e[0].value, e[1]]));
                        if (((f = []), (p = !0), e)) {
                          const e = ct(l);
                          a.fontSize = e.fontSize;
                          const r = (function (e, t) {
                              const n = { value: t.width },
                                r = { value: t.height };
                              let u = n,
                                o = r;
                              if (1 === e.writingAxis) {
                                const e = u;
                                (u = o), (o = e);
                              }
                              return (
                                2 != (2 & e.containerType) &&
                                  (o.value = void 0),
                                {
                                  width: n.value,
                                  height: r.value,
                                  inlineSize: u.value,
                                  blockSize: o.value,
                                }
                              );
                            })(c, e),
                            u = { sizeFeatures: r, treeContext: a },
                            p = (e) => {
                              const { rule: r } = e,
                                o = r.name,
                                s =
                                  null == o || v.has(o)
                                    ? (function (e, n) {
                                        const r = new Map(),
                                          u = n.sizeFeatures;
                                        for (const n of e.features) {
                                          const e = t(n, u);
                                          if (1 === e.type) return null;
                                          r.set(n, e);
                                        }
                                        const o = i(e.condition, {
                                          sizeFeatures: r,
                                          treeContext: n.treeContext,
                                        });
                                        return 5 === o.type ? o.value : null;
                                      })(r, u)
                                    : null;
                              var l;
                              return null == s
                                ? 1 === ((null != (l = n.get(e)) ? l : 0) && 1)
                                : !0 === s;
                            },
                            y = (e, t) => {
                              let n = e.get(t);
                              if (null == n) {
                                const r = p(t);
                                (n =
                                  (r ? 1 : 0) |
                                  (!0 !== r ||
                                  (null != t.parent &&
                                    1 != (1 & y(e, t.parent)))
                                    ? 0
                                    : 2)),
                                  e.set(t, n);
                              }
                              return n;
                            },
                            h = new Map();
                          for (const e of s) f.push([e[0], y(h, e[0].value)]);
                          (a.cqw = null != r.width ? r.width / 100 : o.cqw),
                            (a.cqh = null != r.height ? r.height / 100 : o.cqh);
                        }
                      }
                      return {
                        parentState: new Ve(n),
                        conditions: f,
                        context: a,
                        displayFlags: y,
                        isQueryContainer: p,
                      };
                    })(...n);
                    (null != u && De(u[1], o)) || (u = [n, o]);
                  }
                  return u[1];
                };
              })();
            })(n);
            S = (e) => r(e, q);
          }
          const C = S || k;
          let $ = null;
          const E = (e) => {
              const t = $,
                n = C(e);
              return ($ = n), [$, $ !== t];
            },
            z =
              n instanceof HTMLElement || n instanceof SVGElement
                ? n.style
                : null;
          let L = !1;
          (f = {
            connect() {
              for (let e = n.firstChild; null != e; e = e.nextSibling) A(e);
              p.connected();
            },
            disconnect() {
              n instanceof Element &&
                (l.unobserve(n), n.removeAttribute(v), n.removeAttribute(d)),
                z &&
                  (z.removeProperty(g),
                  z.removeProperty(b),
                  z.removeProperty(m),
                  z.removeProperty(w));
              for (let e = n.firstChild; null != e; e = e.nextSibling) {
                const t = r(e);
                null == t || t.disconnect();
              }
              p.disconnected(), delete n[We];
            },
            update(e) {
              const [t, r] = E(e);
              if (r) {
                if ((h(n, e, d), h(n, t, v), n instanceof Element)) {
                  const e = x || t.isQueryContainer;
                  e && !L
                    ? (l.observe(n), (L = !0))
                    : !e && L && (l.unobserve(n), (L = !1));
                }
                if (z) {
                  const n = t.context,
                    r = n.writingAxis;
                  let u = null,
                    o = null,
                    s = null,
                    l = null;
                  (r !== e.context.writingAxis || t.isQueryContainer) &&
                    ((u = `var(${0 === r ? m : w})`),
                    (o = `var(${1 === r ? m : w})`)),
                    (e && !t.isQueryContainer) ||
                      (n.cqw && (s = n.cqw + 'px'),
                      n.cqh && (l = n.cqh + 'px')),
                    at(z, g, u),
                    at(z, b, o),
                    at(z, m, s),
                    at(z, w, l);
                }
                p.updated();
              }
              for (let e = n.firstChild; null != e; e = e.nextSibling)
                A(e).update(t);
            },
            resize() {
              q = Symbol();
            },
            mutate() {
              q = Symbol();
              for (let e = n.firstChild; null != e; e = e.nextSibling)
                A(e).mutate();
            },
          }),
            (n[We] = f),
            f.connect();
        }
        return f;
      }
      u.prepend(s, o), A(u), S();
    })();
