var EF = (function () {
  'use strict';
  function n(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r);
    }
  }
  function i(e, t, n) {
    return t && r(e.prototype, t), n && r(e, n), e;
  }
  function t(e) {
    return (t = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function o(e, t) {
    return (o =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  function a(e, t) {
    return !t || ('object' != typeof t && 'function' != typeof t)
      ? (function (e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        })(e)
      : t;
  }
  var s =
      ('undefined' != typeof globalThis && globalThis) || ('undefined' != typeof self && self) || (void 0 !== s && s),
    c = 'URLSearchParams' in s,
    f = 'Symbol' in s && 'iterator' in Symbol,
    u =
      'FileReader' in s &&
      'Blob' in s &&
      (function () {
        try {
          return new Blob(), !0;
        } catch (e) {
          return !1;
        }
      })(),
    d = 'FormData' in s,
    h = 'ArrayBuffer' in s;
  if (h)
    var l = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]',
      ],
      _ =
        ArrayBuffer.isView ||
        function (e) {
          return e && -1 < l.indexOf(Object.prototype.toString.call(e));
        };
  function p(e) {
    if (('string' != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || '' === e))
      throw new TypeError('Invalid character in header field name: "' + e + '"');
    return e.toLowerCase();
  }
  function y(e) {
    return 'string' != typeof e && (e = String(e)), e;
  }
  function e(t) {
    var e = {
      next: function () {
        var e = t.shift();
        return { done: void 0 === e, value: e };
      },
    };
    return (
      f &&
        (e[Symbol.iterator] = function () {
          return e;
        }),
      e
    );
  }
  function m(t) {
    (this.map = {}),
      t instanceof m
        ? t.forEach(function (e, t) {
            this.append(t, e);
          }, this)
        : Array.isArray(t)
          ? t.forEach(function (e) {
              this.append(e[0], e[1]);
            }, this)
          : t &&
            Object.getOwnPropertyNames(t).forEach(function (e) {
              this.append(e, t[e]);
            }, this);
  }
  function b(e) {
    if (e.bodyUsed) return Promise.reject(new TypeError('Already read'));
    e.bodyUsed = !0;
  }
  function v(n) {
    return new Promise(function (e, t) {
      (n.onload = function () {
        e(n.result);
      }),
        (n.onerror = function () {
          t(n.error);
        });
    });
  }
  function g(e) {
    var t = new FileReader(),
      n = v(t);
    return t.readAsArrayBuffer(e), n;
  }
  function w(e) {
    if (e.slice) return e.slice(0);
    var t = new Uint8Array(e.byteLength);
    return t.set(new Uint8Array(e)), t.buffer;
  }
  function D() {
    return (
      (this.bodyUsed = !1),
      (this._initBody = function (e) {
        var t;
        (this.bodyUsed = this.bodyUsed),
          (this._bodyInit = e)
            ? 'string' == typeof e
              ? (this._bodyText = e)
              : u && Blob.prototype.isPrototypeOf(e)
                ? (this._bodyBlob = e)
                : d && FormData.prototype.isPrototypeOf(e)
                  ? (this._bodyFormData = e)
                  : c && URLSearchParams.prototype.isPrototypeOf(e)
                    ? (this._bodyText = e.toString())
                    : h && u && (t = e) && DataView.prototype.isPrototypeOf(t)
                      ? ((this._bodyArrayBuffer = w(e.buffer)), (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                      : h && (ArrayBuffer.prototype.isPrototypeOf(e) || _(e))
                        ? (this._bodyArrayBuffer = w(e))
                        : (this._bodyText = e = Object.prototype.toString.call(e))
            : (this._bodyText = ''),
          this.headers.get('content-type') ||
            ('string' == typeof e
              ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
              : this._bodyBlob && this._bodyBlob.type
                ? this.headers.set('content-type', this._bodyBlob.type)
                : c &&
                  URLSearchParams.prototype.isPrototypeOf(e) &&
                  this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8'));
      }),
      u &&
        ((this.blob = function () {
          var e = b(this);
          if (e) return e;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData) throw new Error('could not read FormData body as blob');
          return Promise.resolve(new Blob([this._bodyText]));
        }),
        (this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            var e = b(this);
            return e
              ? e
              : ArrayBuffer.isView(this._bodyArrayBuffer)
                ? Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                    )
                  )
                : Promise.resolve(this._bodyArrayBuffer);
          }
          return this.blob().then(g);
        })),
      (this.text = function () {
        var e,
          t,
          n,
          r = b(this);
        if (r) return r;
        if (this._bodyBlob) return (e = this._bodyBlob), (t = new FileReader()), (n = v(t)), t.readAsText(e), n;
        if (this._bodyArrayBuffer)
          return Promise.resolve(
            (function (e) {
              for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++)
                n[r] = String.fromCharCode(t[r]);
              return n.join('');
            })(this._bodyArrayBuffer)
          );
        if (this._bodyFormData) throw new Error('could not read FormData body as text');
        return Promise.resolve(this._bodyText);
      }),
      d &&
        (this.formData = function () {
          return this.text().then(T);
        }),
      (this.json = function () {
        return this.text().then(JSON.parse);
      }),
      this
    );
  }
  (m.prototype.append = function (e, t) {
    (e = p(e)), (t = y(t));
    var n = this.map[e];
    this.map[e] = n ? n + ', ' + t : t;
  }),
    (m.prototype.delete = function (e) {
      delete this.map[p(e)];
    }),
    (m.prototype.get = function (e) {
      return (e = p(e)), this.has(e) ? this.map[e] : null;
    }),
    (m.prototype.has = function (e) {
      return this.map.hasOwnProperty(p(e));
    }),
    (m.prototype.set = function (e, t) {
      this.map[p(e)] = y(t);
    }),
    (m.prototype.forEach = function (e, t) {
      for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
    }),
    (m.prototype.keys = function () {
      var n = [];
      return (
        this.forEach(function (e, t) {
          n.push(t);
        }),
        e(n)
      );
    }),
    (m.prototype.values = function () {
      var t = [];
      return (
        this.forEach(function (e) {
          t.push(e);
        }),
        e(t)
      );
    }),
    (m.prototype.entries = function () {
      var n = [];
      return (
        this.forEach(function (e, t) {
          n.push([t, e]);
        }),
        e(n)
      );
    }),
    f && (m.prototype[Symbol.iterator] = m.prototype.entries);
  var P = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
  function E(e, t) {
    if (!(this instanceof E))
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    var n,
      r,
      i = (t = t || {}).body;
    if (e instanceof E) {
      if (e.bodyUsed) throw new TypeError('Already read');
      (this.url = e.url),
        (this.credentials = e.credentials),
        t.headers || (this.headers = new m(e.headers)),
        (this.method = e.method),
        (this.mode = e.mode),
        (this.signal = e.signal),
        i || null == e._bodyInit || ((i = e._bodyInit), (e.bodyUsed = !0));
    } else this.url = String(e);
    if (
      ((this.credentials = t.credentials || this.credentials || 'same-origin'),
      (!t.headers && this.headers) || (this.headers = new m(t.headers)),
      (this.method = ((n = t.method || this.method || 'GET'), (r = n.toUpperCase()), -1 < P.indexOf(r) ? r : n)),
      (this.mode = t.mode || this.mode || null),
      (this.signal = t.signal || this.signal),
      (this.referrer = null),
      ('GET' === this.method || 'HEAD' === this.method) && i)
    )
      throw new TypeError('Body not allowed for GET or HEAD requests');
    if (
      (this._initBody(i),
      !(('GET' !== this.method && 'HEAD' !== this.method) || ('no-store' !== t.cache && 'no-cache' !== t.cache)))
    ) {
      var o = /([?&])_=[^&]*/;
      if (o.test(this.url)) this.url = this.url.replace(o, '$1_=' + new Date().getTime());
      else {
        this.url += (/\?/.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
      }
    }
  }
  function T(e) {
    var i = new FormData();
    return (
      e
        .trim()
        .split('&')
        .forEach(function (e) {
          if (e) {
            var t = e.split('='),
              n = t.shift().replace(/\+/g, ' '),
              r = t.join('=').replace(/\+/g, ' ');
            i.append(decodeURIComponent(n), decodeURIComponent(r));
          }
        }),
      i
    );
  }
  function O(e, t) {
    if (!(this instanceof O))
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    (t = t || {}),
      (this.type = 'default'),
      (this.status = void 0 === t.status ? 200 : t.status),
      (this.ok = 200 <= this.status && this.status < 300),
      (this.statusText = void 0 === t.statusText ? '' : '' + t.statusText),
      (this.headers = new m(t.headers)),
      (this.url = t.url || ''),
      this._initBody(e);
  }
  (E.prototype.clone = function () {
    return new E(this, { body: this._bodyInit });
  }),
    D.call(E.prototype),
    D.call(O.prototype),
    (O.prototype.clone = function () {
      return new O(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new m(this.headers),
        url: this.url,
      });
    }),
    (O.error = function () {
      var e = new O(null, { status: 0, statusText: '' });
      return (e.type = 'error'), e;
    });
  var j = [301, 302, 303, 307, 308];
  O.redirect = function (e, t) {
    if (-1 === j.indexOf(t)) throw new RangeError('Invalid status code');
    return new O(null, { status: t, headers: { location: e } });
  };
  var k = s.DOMException;
  try {
    new k();
  } catch (e) {
    ((k = function (e, t) {
      (this.message = e), (this.name = t);
      var n = Error(e);
      this.stack = n.stack;
    }).prototype = Object.create(Error.prototype)),
      (k.prototype.constructor = k);
  }
  function U(i, a) {
    return new Promise(function (r, e) {
      var t = new E(i, a);
      if (t.signal && t.signal.aborted) return e(new k('Aborted', 'AbortError'));
      var o = new XMLHttpRequest();
      function n() {
        o.abort();
      }
      (o.onload = function () {
        var e,
          i,
          t = {
            status: o.status,
            statusText: o.statusText,
            headers:
              ((e = o.getAllResponseHeaders() || ''),
              (i = new m()),
              e
                .replace(/\r?\n[\t ]+/g, ' ')
                .split('\r')
                .map(function (e) {
                  return 0 === e.indexOf('\n') ? e.substr(1, e.length) : e;
                })
                .forEach(function (e) {
                  var t = e.split(':'),
                    n = t.shift().trim();
                  if (n) {
                    var r = t.join(':').trim();
                    i.append(n, r);
                  }
                }),
              i),
          };
        t.url = 'responseURL' in o ? o.responseURL : t.headers.get('X-Request-URL');
        var n = 'response' in o ? o.response : o.responseText;
        setTimeout(function () {
          r(new O(n, t));
        }, 0);
      }),
        (o.onerror = function () {
          setTimeout(function () {
            e(new TypeError('Network request failed'));
          }, 0);
        }),
        (o.ontimeout = function () {
          setTimeout(function () {
            e(new TypeError('Network request failed'));
          }, 0);
        }),
        (o.onabort = function () {
          setTimeout(function () {
            e(new k('Aborted', 'AbortError'));
          }, 0);
        }),
        o.open(
          t.method,
          (function (t) {
            try {
              return '' === t && s.location.href ? s.location.href : t;
            } catch (e) {
              return t;
            }
          })(t.url),
          !0
        ),
        'include' === t.credentials ? (o.withCredentials = !0) : 'omit' === t.credentials && (o.withCredentials = !1),
        'responseType' in o &&
          (u
            ? (o.responseType = 'blob')
            : h &&
              t.headers.get('Content-Type') &&
              -1 !== t.headers.get('Content-Type').indexOf('application/octet-stream') &&
              (o.responseType = 'arraybuffer')),
        !a || 'object' != typeof a.headers || a.headers instanceof m
          ? t.headers.forEach(function (e, t) {
              o.setRequestHeader(t, e);
            })
          : Object.getOwnPropertyNames(a.headers).forEach(function (e) {
              o.setRequestHeader(e, y(a.headers[e]));
            }),
        t.signal &&
          (t.signal.addEventListener('abort', n),
          (o.onreadystatechange = function () {
            4 === o.readyState && t.signal.removeEventListener('abort', n);
          })),
        o.send(void 0 === t._bodyInit ? null : t._bodyInit);
    });
  }
  (U.polyfill = !0), s.fetch || ((s.fetch = U), (s.Headers = m), (s.Request = E), (s.Response = O));
  var S =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof self
            ? self
            : {};
  function A(t) {
    var n = this.constructor;
    return this.then(
      function (e) {
        return n.resolve(t()).then(function () {
          return e;
        });
      },
      function (e) {
        return n.resolve(t()).then(function () {
          return n.reject(e);
        });
      }
    );
  }
  function R(n) {
    return new this(function (r, e) {
      if (!n || void 0 === n.length)
        return e(new TypeError(typeof n + ' ' + n + ' is not iterable(cannot read property Symbol(Symbol.iterator))'));
      var i = Array.prototype.slice.call(n);
      if (0 === i.length) return r([]);
      var o = i.length;
      function a(t, e) {
        if (e && ('object' == typeof e || 'function' == typeof e)) {
          var n = e.then;
          if ('function' == typeof n)
            return void n.call(
              e,
              function (e) {
                a(t, e);
              },
              function (e) {
                (i[t] = { status: 'rejected', reason: e }), 0 == --o && r(i);
              }
            );
        }
        (i[t] = { status: 'fulfilled', value: e }), 0 == --o && r(i);
      }
      for (var t = 0; t < i.length; t++) a(t, i[t]);
    });
  }
  !(function (t) {
    function e(t) {
      var e = {
        next: function () {
          var e = t.shift();
          return { done: void 0 === e, value: e };
        },
      };
      return (
        i &&
          (e[Symbol.iterator] = function () {
            return e;
          }),
        e
      );
    }
    function r(e) {
      return encodeURIComponent(e).replace(/%20/g, '+');
    }
    function o(e) {
      return decodeURIComponent(String(e).replace(/\+/g, ' '));
    }
    var a,
      n,
      i = (function () {
        try {
          return !!Symbol.iterator;
        } catch (e) {
          return !1;
        }
      })();
    !(function () {
      try {
        var e = t.URLSearchParams;
        return (
          'a=1' === new e('?a=1').toString() &&
          'function' == typeof e.prototype.set &&
          'function' == typeof e.prototype.entries
        );
      } catch (e) {
        return !1;
      }
    })() &&
      (((n = (a = function (e) {
        Object.defineProperty(this, '_entries', { writable: !0, value: {} });
        var t = typeof e;
        if ('undefined' != t)
          if ('string' == t) '' !== e && this._fromString(e);
          else if (e instanceof a) {
            var n = this;
            e.forEach(function (e, t) {
              n.append(t, e);
            });
          } else {
            if (null === e || 'object' != t) throw new TypeError("Unsupported input's type for URLSearchParams");
            if ('[object Array]' === Object.prototype.toString.call(e))
              for (var r = 0; r < e.length; r++) {
                var i = e[r];
                if ('[object Array]' !== Object.prototype.toString.call(i) && 2 === i.length)
                  throw new TypeError('Expected [string, any] as entry at index ' + r + " of URLSearchParams's input");
                this.append(i[0], i[1]);
              }
            else for (var o in e) e.hasOwnProperty(o) && this.append(o, e[o]);
          }
      }).prototype).append = function (e, t) {
        e in this._entries ? this._entries[e].push(String(t)) : (this._entries[e] = [String(t)]);
      }),
      (n.delete = function (e) {
        delete this._entries[e];
      }),
      (n.get = function (e) {
        return e in this._entries ? this._entries[e][0] : null;
      }),
      (n.getAll = function (e) {
        return e in this._entries ? this._entries[e].slice(0) : [];
      }),
      (n.has = function (e) {
        return e in this._entries;
      }),
      (n.set = function (e, t) {
        this._entries[e] = [String(t)];
      }),
      (n.forEach = function (e, t) {
        var n;
        for (var r in this._entries)
          if (this._entries.hasOwnProperty(r)) {
            n = this._entries[r];
            for (var i = 0; i < n.length; i++) e.call(t, n[i], r, this);
          }
      }),
      (n.keys = function () {
        var n = [];
        return (
          this.forEach(function (e, t) {
            n.push(t);
          }),
          e(n)
        );
      }),
      (n.values = function () {
        var t = [];
        return (
          this.forEach(function (e) {
            t.push(e);
          }),
          e(t)
        );
      }),
      (n.entries = function () {
        var n = [];
        return (
          this.forEach(function (e, t) {
            n.push([t, e]);
          }),
          e(n)
        );
      }),
      i && (n[Symbol.iterator] = n.entries),
      (n.toString = function () {
        var n = [];
        return (
          this.forEach(function (e, t) {
            n.push(r(t) + '=' + r(e));
          }),
          n.join('&')
        );
      }),
      (t.URLSearchParams = a));
    var s = t.URLSearchParams.prototype;
    'function' != typeof s.sort &&
      (s.sort = function () {
        var n = this,
          r = [];
        this.forEach(function (e, t) {
          r.push([t, e]), n._entries || n.delete(t);
        }),
          r.sort(function (e, t) {
            return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0;
          }),
          n._entries && (n._entries = {});
        for (var e = 0; e < r.length; e++) this.append(r[e][0], r[e][1]);
      }),
      'function' != typeof s._fromString &&
        Object.defineProperty(s, '_fromString', {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: function (e) {
            if (this._entries) this._entries = {};
            else {
              var n = [];
              this.forEach(function (e, t) {
                n.push(t);
              });
              for (var t = 0; t < n.length; t++) this.delete(n[t]);
            }
            var r,
              i = (e = e.replace(/^\?/, '')).split('&');
            for (t = 0; t < i.length; t++) (r = i[t].split('=')), this.append(o(r[0]), 1 < r.length ? o(r[1]) : '');
          },
        });
  })(void 0 !== S ? S : 'undefined' != typeof window ? window : 'undefined' != typeof self ? self : S),
    (function (d) {
      var t, n;
      function e(e, t) {
        'string' != typeof e && (e = String(e)), t && 'string' != typeof t && (t = String(t));
        var n,
          r = document;
        if (t && (void 0 === d.location || t !== d.location.href)) {
          (t = t.toLowerCase()),
            ((n = (r = document.implementation.createHTMLDocument('')).createElement('base')).href = t),
            r.head.appendChild(n);
          try {
            if (0 !== n.href.indexOf(t)) throw new Error(n.href);
          } catch (e) {
            throw new Error('URL unable to set base ' + t + ' due to ' + e);
          }
        }
        var i = r.createElement('a');
        (i.href = e), n && (r.body.appendChild(i), (i.href = i.href));
        var o = r.createElement('input');
        if (((o.type = 'url'), (o.value = e), ':' === i.protocol || !/:/.test(i.href) || (!o.checkValidity() && !t)))
          throw new TypeError('Invalid URL');
        Object.defineProperty(this, '_anchorElement', { value: i });
        var a = new d.URLSearchParams(this.search),
          s = !0,
          c = !0,
          f = this;
        ['append', 'delete', 'set'].forEach(function (e) {
          var t = a[e];
          a[e] = function () {
            t.apply(a, arguments), s && ((c = !1), (f.search = a.toString()), (c = !0));
          };
        }),
          Object.defineProperty(this, 'searchParams', { value: a, enumerable: !0 });
        var u = void 0;
        Object.defineProperty(this, '_updateSearchParams', {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: function () {
            this.search !== u &&
              ((u = this.search), c && ((s = !1), this.searchParams._fromString(this.search), (s = !0)));
          },
        });
      }
      if (
        (!(function () {
          try {
            var e = new d.URL('b', 'http://a');
            return (e.pathname = 'c d'), 'http://a/c%20d' === e.href && e.searchParams;
          } catch (e) {
            return !1;
          }
        })() &&
          ((t = d.URL),
          (n = e.prototype),
          ['hash', 'host', 'hostname', 'port', 'protocol'].forEach(function (e) {
            var t;
            (t = e),
              Object.defineProperty(n, t, {
                get: function () {
                  return this._anchorElement[t];
                },
                set: function (e) {
                  this._anchorElement[t] = e;
                },
                enumerable: !0,
              });
          }),
          Object.defineProperty(n, 'search', {
            get: function () {
              return this._anchorElement.search;
            },
            set: function (e) {
              (this._anchorElement.search = e), this._updateSearchParams();
            },
            enumerable: !0,
          }),
          Object.defineProperties(n, {
            toString: {
              get: function () {
                var e = this;
                return function () {
                  return e.href;
                };
              },
            },
            href: {
              get: function () {
                return this._anchorElement.href.replace(/\?$/, '');
              },
              set: function (e) {
                (this._anchorElement.href = e), this._updateSearchParams();
              },
              enumerable: !0,
            },
            pathname: {
              get: function () {
                return this._anchorElement.pathname.replace(/(^\/?)/, '/');
              },
              set: function (e) {
                this._anchorElement.pathname = e;
              },
              enumerable: !0,
            },
            origin: {
              get: function () {
                var e = { 'http:': 80, 'https:': 443, 'ftp:': 21 }[this._anchorElement.protocol],
                  t = this._anchorElement.port != e && '' !== this._anchorElement.port;
                return (
                  this._anchorElement.protocol +
                  '//' +
                  this._anchorElement.hostname +
                  (t ? ':' + this._anchorElement.port : '')
                );
              },
              enumerable: !0,
            },
            password: {
              get: function () {
                return '';
              },
              set: function (e) {},
              enumerable: !0,
            },
            username: {
              get: function () {
                return '';
              },
              set: function (e) {},
              enumerable: !0,
            },
          }),
          (e.createObjectURL = function (e) {
            return t.createObjectURL.apply(t, arguments);
          }),
          (e.revokeObjectURL = function (e) {
            return t.revokeObjectURL.apply(t, arguments);
          }),
          (d.URL = e)),
        void 0 !== d.location && !('origin' in d.location))
      ) {
        var r = function () {
          return d.location.protocol + '//' + d.location.hostname + (d.location.port ? ':' + d.location.port : '');
        };
        try {
          Object.defineProperty(d.location, 'origin', { get: r, enumerable: !0 });
        } catch (e) {
          setInterval(function () {
            d.location.origin = r();
          }, 100);
        }
      }
    })(void 0 !== S ? S : 'undefined' != typeof window ? window : 'undefined' != typeof self ? self : S);
  var L = setTimeout;
  function B(e) {
    return Boolean(e && void 0 !== e.length);
  }
  function x() {}
  function C(e) {
    if (!(this instanceof C)) throw new TypeError('Promises must be constructed via new');
    if ('function' != typeof e) throw new TypeError('not a function');
    (this._state = 0), (this._handled = !1), (this._value = void 0), (this._deferreds = []), G(e, this);
  }
  function F(n, r) {
    for (; 3 === n._state; ) n = n._value;
    0 !== n._state
      ? ((n._handled = !0),
        C._immediateFn(function () {
          var e = 1 === n._state ? r.onFulfilled : r.onRejected;
          if (null !== e) {
            var t;
            try {
              t = e(n._value);
            } catch (e) {
              return void H(r.promise, e);
            }
            I(r.promise, t);
          } else (1 === n._state ? I : H)(r.promise, n._value);
        }))
      : n._deferreds.push(r);
  }
  function I(t, e) {
    try {
      if (e === t) throw new TypeError('A promise cannot be resolved with itself.');
      if (e && ('object' == typeof e || 'function' == typeof e)) {
        var n = e.then;
        if (e instanceof C) return (t._state = 3), (t._value = e), void M(t);
        if ('function' == typeof n)
          return void G(
            ((r = n),
            (i = e),
            function () {
              r.apply(i, arguments);
            }),
            t
          );
      }
      (t._state = 1), (t._value = e), M(t);
    } catch (e) {
      H(t, e);
    }
    var r, i;
  }
  function H(e, t) {
    (e._state = 2), (e._value = t), M(e);
  }
  function M(e) {
    2 === e._state &&
      0 === e._deferreds.length &&
      C._immediateFn(function () {
        e._handled || C._unhandledRejectionFn(e._value);
      });
    for (var t = 0, n = e._deferreds.length; t < n; t++) F(e, e._deferreds[t]);
    e._deferreds = null;
  }
  function q(e, t, n) {
    (this.onFulfilled = 'function' == typeof e ? e : null),
      (this.onRejected = 'function' == typeof t ? t : null),
      (this.promise = n);
  }
  function G(e, t) {
    var n = !1;
    try {
      e(
        function (e) {
          n || ((n = !0), I(t, e));
        },
        function (e) {
          n || ((n = !0), H(t, e));
        }
      );
    } catch (e) {
      if (n) return;
      (n = !0), H(t, e);
    }
  }
  (C.prototype.catch = function (e) {
    return this.then(null, e);
  }),
    (C.prototype.then = function (e, t) {
      var n = new this.constructor(x);
      return F(this, new q(e, t, n)), n;
    }),
    (C.prototype.finally = A),
    (C.all = function (t) {
      return new C(function (r, i) {
        if (!B(t)) return i(new TypeError('Promise.all accepts an array'));
        var o = Array.prototype.slice.call(t);
        if (0 === o.length) return r([]);
        var a = o.length;
        function s(t, e) {
          try {
            if (e && ('object' == typeof e || 'function' == typeof e)) {
              var n = e.then;
              if ('function' == typeof n)
                return void n.call(
                  e,
                  function (e) {
                    s(t, e);
                  },
                  i
                );
            }
            (o[t] = e), 0 == --a && r(o);
          } catch (e) {
            i(e);
          }
        }
        for (var e = 0; e < o.length; e++) s(e, o[e]);
      });
    }),
    (C.allSettled = R),
    (C.resolve = function (t) {
      return t && 'object' == typeof t && t.constructor === C
        ? t
        : new C(function (e) {
            e(t);
          });
    }),
    (C.reject = function (n) {
      return new C(function (e, t) {
        t(n);
      });
    }),
    (C.race = function (i) {
      return new C(function (e, t) {
        if (!B(i)) return t(new TypeError('Promise.race accepts an array'));
        for (var n = 0, r = i.length; n < r; n++) C.resolve(i[n]).then(e, t);
      });
    }),
    (C._immediateFn =
      'function' == typeof setImmediate
        ? function (e) {
            setImmediate(e);
          }
        : function (e) {
            L(e, 0);
          }),
    (C._unhandledRejectionFn = function (e) {
      'undefined' != typeof console && console && console.warn('Possible Unhandled Promise Rejection:', e);
    });
  var N = (function () {
    if ('undefined' != typeof self) return self;
    if ('undefined' != typeof window) return window;
    if ('undefined' != typeof global) return global;
    throw new Error('unable to locate global object');
  })();
  'function' != typeof N.Promise
    ? (N.Promise = C)
    : N.Promise.prototype.finally
      ? N.Promise.allSettled || (N.Promise.allSettled = R)
      : (N.Promise.prototype.finally = A);
  var V = (function () {
    function t(e) {
      if ((n(this, t), this.constructor === t)) throw new TypeError('Can not construct abstract class.');
      if (this._persist === t.prototype._persist) throw new TypeError('Please implement abstract method _persist.');
      if (this._fetch === t.prototype._fetch) throw new TypeError('Please implement abstract method _fetch.');
      (this.customParamProvider = e), (this._trackingDomain = 'https://www.fsh9wdj.com'), (this._organicEnabled = !1);
    }
    return (
      i(t, [
        {
          key: 'configure',
          value: function (e) {
            this._isDefined(e.tracking_domain) && (this._trackingDomain = e.tracking_domain),
              this._isDefined(e.tld) && (this._tld = e.tld),
              this._isDefined(e.organic) &&
                (this._isDefined(e.organic.offer_id) && this._isDefined(e.organic.affiliate_id)
                  ? ((this._organicEnabled = !0),
                    (this._organicOptions = Object.assign(
                      this._getDefaultOrganicClickOptions(),
                      e.organic.options || {},
                      { affiliate_id: e.organic.affiliate_id, offer_id: e.organic.offer_id }
                    )))
                  : console.warn(
                      'Unable to setup organic tracking. Missing "organic.offer_id" or "organic.affiliate_id" parameter.'
                    ));
          },
        },
        {
          key: 'getAdvertiserTransactionId',
          value: function (e) {
            var t = this._fetch('ef_tid_c_a_'.concat(e)).split('|');
            return (t = t ? t[t.length - 1] : this._fetch('ef_tid_i_a_'.concat(e)));
          },
        },
        {
          key: 'getTransactionId',
          value: function (e) {
            var t = this._fetch('ef_tid_c_o_'.concat(e)).split('|');
            return (t =
              (t = t ? t[t.length - 1] : this._fetch('ef_tid_i_o_'.concat(e))) || this._fetch('ef_tid_'.concat(e)));
          },
        },
        {
          key: 'impression',
          value: function (a) {
            var s = this;
            return a.offer_id || a.coupon_code
              ? !0 === a.do_not_track
                ? Promise.resolve('')
                : new Promise(function (o, e) {
                    s._getCustomParams().then(function (e) {
                      var t = s._isDefined(a.tracking_domain) ? a.tracking_domain : s._trackingDomain,
                        n = new URL(''.concat(t, '/sdk/impression')),
                        r = new URLSearchParams(n.search);
                      for (var i in e) e.hasOwnProperty(i) && r.set(i, e[i]);
                      r.set('oid', a.offer_id),
                        r.set('affid', a.affiliate_id || ''),
                        r.set('async', 'json'),
                        s._isDefined(a.sub1) && r.set('sub1', a.sub1),
                        s._isDefined(a.sub2) && r.set('sub2', a.sub2),
                        s._isDefined(a.sub3) && r.set('sub3', a.sub3),
                        s._isDefined(a.sub4) && r.set('sub4', a.sub4),
                        s._isDefined(a.sub5) && r.set('sub5', a.sub5),
                        s._isDefined(a.adv1) && r.set('adv1', a.adv1),
                        s._isDefined(a.adv2) && r.set('adv2', a.adv2),
                        s._isDefined(a.adv3) && r.set('adv3', a.adv3),
                        s._isDefined(a.adv4) && r.set('adv4', a.adv4),
                        s._isDefined(a.adv5) && r.set('adv5', a.adv5),
                        s._isDefined(a.source_id) && r.set('source_id', a.source_id),
                        s._isDefined(a.creative_id) && r.set('creative_id', a.creative_id),
                        s._isDefined(a.fbclid) ? r.set('fbclid', a.fbclid) : s._setDefaultFromURL(r, 'fbclid'),
                        s._isDefined(a.gclid) ? r.set('gclid', a.gclid) : s._setDefaultFromURL(r, 'gclid'),
                        s._isDefined(a.ttclid) ? r.set('ttclid', a.ttclid) : s._setDefaultFromURL(r, 'ttclid'),
                        s._isDefined(a.coupon_code) && r.set('__cc', a.coupon_code || ''),
                        s._isDefined(a.parameters) &&
                          Object.keys(a.parameters).forEach(function (e) {
                            return r.set(e, a.parameters[e]);
                          }),
                        !0 === a.disable_fingerprinting && r.delete('effp'),
                        (n.search = r.toString()),
                        fetch(n.toString(), { method: 'GET', credentials: 'include' })
                          .then(
                            function (e) {
                              return e.json();
                            },
                            function (e) {
                              console.error(e), o('');
                            }
                          )
                          .then(function (e) {
                            if (e.transaction_id && 0 < e.transaction_id.length) {
                              var t = s._fetch('ef_tid_i_o_'.concat(e.oid || a.offer_id));
                              s._persist(
                                'ef_tid_i_o_'.concat(e.oid || a.offer_id),
                                t && 0 < t.length ? ''.concat(t, '|').concat(e.transaction_id) : e.transaction_id
                              );
                              var n = s._fetch('ef_tid_i_a_'.concat(e.aid));
                              s._persist(
                                'ef_tid_i_a_'.concat(e.aid),
                                n && 0 < n.length ? ''.concat(n, '|').concat(e.transaction_id) : e.transaction_id
                              ),
                                o(e.transaction_id);
                            }
                          });
                    });
                  })
              : (console.warn('Unable to track. Missing "offer_id" parameter.'), Promise.resolve(''));
          },
        },
        {
          key: '_getDefaultOrganicClickOptions',
          value: function () {
            var e = '';
            return (
              this.urlParameter('fbclid') &&
                ((e = 'Facebook'), 'PAA' === this.urlParameter('fbclid').slice(0, 3) && (e = 'Instagram')),
              this.urlParameter('gclid') && (e = 'Google'),
              this.urlParameter('ttclid') && (e = 'Tiktok'),
              (this.urlParameter('MSCLKID') || this.urlParameter('msclkid')) && (e = 'Microsoft'),
              this.urlParameter('OutbrainClickId') && (e = 'Outbrain'),
              this.urlParameter('TCLID') && (e = 'Taboola'),
              {
                sub1: this.urlParameter('sub1') || e,
                sub2: this.urlParameter('sub2') || document.referrer,
                sub3: this.urlParameter('sub3') || '/' + window.location.pathname.split('/')[1],
                sub4: this.urlParameter('sub4') || window.location.pathname,
                sub5: this.urlParameter('sub5') || window.location.search,
                source_id: this.urlParameter('source_id') || 'organic',
                transaction_id: this.urlParameter('_ef_transaction_id'),
                organic: 1,
              }
            );
          },
        },
        {
          key: 'click',
          value: function (f) {
            var u = this;
            if (!0 === f.do_not_track) return Promise.resolve('');
            if (!f.offer_id && !f.transaction_id && !f.coupon_code) {
              if (!this._organicEnabled || this._fetch('ef_witness'))
                return (
                  console.warn('Unable to track. Missing "offer_id" or "transaction_id" parameter.'),
                  Promise.resolve('')
                );
              f = this._organicOptions;
            }
            return new Promise(function (c, e) {
              u._getCustomParams().then(function (e) {
                var t = u._isDefined(f.tracking_domain) ? f.tracking_domain : u._trackingDomain,
                  n = new URL(''.concat(t, '/sdk/click')),
                  r = new URLSearchParams(n.search);
                for (var i in e) e.hasOwnProperty(i) && r.set(i, e[i]);
                r.set('_ef_transaction_id', f.transaction_id || ''),
                  r.set('oid', f.offer_id || ''),
                  r.set('affid', f.affiliate_id || ''),
                  r.set('__cc', f.coupon_code || ''),
                  r.set('async', 'json'),
                  u._isDefined(f.uid) && r.set('uid', f.uid),
                  u._isDefined(f.sub1) && r.set('sub1', f.sub1),
                  u._isDefined(f.sub2) && r.set('sub2', f.sub2),
                  u._isDefined(f.sub3) && r.set('sub3', f.sub3),
                  u._isDefined(f.sub4) && r.set('sub4', f.sub4),
                  u._isDefined(f.sub5) && r.set('sub5', f.sub5),
                  u._isDefined(f.adv1) && r.set('adv1', f.adv1),
                  u._isDefined(f.adv2) && r.set('adv2', f.adv2),
                  u._isDefined(f.adv3) && r.set('adv3', f.adv3),
                  u._isDefined(f.adv4) && r.set('adv4', f.adv4),
                  u._isDefined(f.adv5) && r.set('adv5', f.adv5),
                  u._isDefined(f.source_id) && r.set('source_id', f.source_id),
                  u._isDefined(f.creative_id) && r.set('creative_id', f.creative_id),
                  u._isDefined(f.organic) && r.set('__organic_click', f.organic || ''),
                  u._isDefined(f.cost) && r.set('cost', f.cost),
                  u._isDefined(f.fbclid) ? r.set('fbclid', f.fbclid) : u._setDefaultFromURL(r, 'fbclid'),
                  u._isDefined(f.gclid) ? r.set('gclid', f.gclid) : u._setDefaultFromURL(r, 'gclid'),
                  u._isDefined(f.ttclid) ? r.set('ttclid', f.ttclid) : u._setDefaultFromURL(r, 'ttclid'),
                  !0 === f.disable_fingerprinting && r.delete('effp');
                var o = new URLSearchParams(window.location.search);
                if (
                  (o && r.set('__qp', Array.from(o.keys()).join('|')),
                  r.set('__rf', document.referrer),
                  u._isDefined(f.offer_id))
                ) {
                  var a = u.getTransactionId(f.offer_id),
                    s = Math.floor(100 * Math.random());
                  r.set('__efckuq', '' !== a ? 2 * s + 1 : s % 2 == 0 ? s : s + 1);
                }
                u._isDefined(f.parameters) &&
                  Object.keys(f.parameters).forEach(function (e) {
                    return r.set(e, f.parameters[e]);
                  }),
                  (n.search = r.toString()),
                  fetch(n.toString(), { method: 'GET', credentials: 'include' })
                    .then(
                      function (e) {
                        return e.json();
                      },
                      function (e) {
                        console.error(e), c('');
                      }
                    )
                    .then(function (e) {
                      if (e.transaction_id && 0 < e.transaction_id.length) {
                        u._persist('ef_witness', '1'), u._persist('ef_affid', f.affiliate_id || '');
                        var t = u._fetch('ef_tid_c_o_'.concat(e.oid || f.offer_id));
                        u._persist(
                          'ef_tid_c_o_'.concat(e.oid || f.offer_id),
                          t && 0 < t.length ? ''.concat(t, '|').concat(e.transaction_id) : e.transaction_id
                        );
                        var n = u._fetch('ef_tid_c_a_'.concat(e.aid));
                        u._persist(
                          'ef_tid_c_a_'.concat(e.aid),
                          n && 0 < n.length ? ''.concat(n, '|').concat(e.transaction_id) : e.transaction_id
                        ),
                          c(e.transaction_id);
                      }
                    });
              });
            });
          },
        },
        {
          key: 'conversion',
          value: function (a) {
            var s = this;
            if (!a.transaction_id)
              if (this._isDefined(a.offer_id))
                (a.transaction_id = this._fetch('ef_tid_c_o_'.concat(a.offer_id))),
                  a.transaction_id || (a.transaction_id = this._fetch('ef_tid_i_o_'.concat(a.offer_id))),
                  a.transaction_id || (a.transaction_id = this._fetch('ef_tid_'.concat(a.offer_id)));
              else if (this._isDefined(a.advertiser_id) || this._isDefined(a.aid)) {
                var e = a.advertiser_id || a.aid;
                (a.transaction_id = this._fetch('ef_tid_c_a_'.concat(e))),
                  a.transaction_id || (a.transaction_id = this._fetch('ef_tid_i_a_'.concat(e))),
                  a.transaction_id || (a.transaction_id = this._fetch('ef_tid_'.concat(a.offer_id)));
              }
            return (
              a.transaction_id &&
                332 < a.transaction_id.length &&
                (a.transaction_id =
                  a.transaction_id.substring(0, 33) +
                  a.transaction_id.substring(a.transaction_id.length - 297, a.transaction_id.length)),
              new Promise(function (o, e) {
                s._getCustomParams().then(function (e) {
                  var t = s._isDefined(a.tracking_domain) ? a.tracking_domain : s._trackingDomain,
                    n = new URL(''.concat(t, '/sdk/conversion')),
                    r = new URLSearchParams(n.search);
                  for (var i in e) e.hasOwnProperty(i) && r.set(i, e[i]);
                  r.set('transaction_id', a.transaction_id || ''),
                    r.set('event_id', a.event_id || 0),
                    s._isDefined(a.offer_id) && r.set('oid', a.offer_id),
                    s._isDefined(a.affiliate_id) && r.set('affid', a.affiliate_id),
                    s._isDefined(a.advertiser_id) && r.set('advid', a.advertiser_id),
                    s._isDefined(a.aid) && r.set('aid', a.aid),
                    s._isDefined(a.adv_event_id) && (r.set('adv_event_id', a.adv_event_id), r.delete('event_id')),
                    s._isDefined(a.coupon_code) && r.set('coupon_code', a.coupon_code),
                    s._isDefined(a.amount) && r.set('amount', a.amount),
                    s._isDefined(a.adv1) && r.set('adv1', a.adv1),
                    s._isDefined(a.adv2) && r.set('adv2', a.adv2),
                    s._isDefined(a.adv3) && r.set('adv3', a.adv3),
                    s._isDefined(a.adv4) && r.set('adv4', a.adv4),
                    s._isDefined(a.adv5) && r.set('adv5', a.adv5),
                    s._isDefined(a.sub1) && r.set('sub1', a.sub1),
                    s._isDefined(a.sub2) && r.set('sub2', a.sub2),
                    s._isDefined(a.sub3) && r.set('sub3', a.sub3),
                    s._isDefined(a.sub4) && r.set('sub4', a.sub4),
                    s._isDefined(a.sub5) && r.set('sub5', a.sub5),
                    s._isDefined(a.order_id) && r.set('order_id', a.order_id),
                    s._isDefined(a.verification_token) && r.set('verification_token', a.verification_token),
                    s._isDefined(a.email) && r.set('email', a.email),
                    s._isDefined(a.order) && r.set('order', JSON.stringify(a.order)),
                    s._isDefined(a.user_id) && r.set('user_id', a.user_id),
                    !0 === a.disable_fingerprinting && r.delete('effp'),
                    s._isDefined(a.parameters) &&
                      Object.keys(a.parameters).forEach(function (e) {
                        return r.set(e, a.parameters[e]);
                      }),
                    r.set('event_source_url', window.location.hostname),
                    (n.search = r.toString()),
                    fetch(n.toString(), {
                      method: 'GET',
                      headers: { Accept: 'application/json' },
                      credentials: 'include',
                    })
                      .then(function (e) {
                        return 200 === e.status ? e.json() : { conversion_id: '', transaction_id: '', html_pixel: '' };
                      })
                      .then(function (e) {
                        if ('' != e.html_pixel) {
                          var t = document.createElement('iframe');
                          (t.width = 1),
                            (t.height = 1),
                            (t.frameBorder = 0),
                            document.getElementsByTagName('body')[0].appendChild(t),
                            t.contentWindow.document.open(),
                            t.contentWindow.document.write(e.html_pixel),
                            t.contentWindow.document.close();
                        }
                        o({ transaction_id: e.transaction_id, conversion_id: e.conversion_id });
                      })
                      .catch(function (e) {
                        console.log(e), o({ conversion_id: '', transaction_id: '', html_pixel: '' });
                      });
                });
              })
            );
          },
        },
        {
          key: '_getCustomParams',
          value: function () {
            return Promise.all([this.customParamProvider, this._getClientHints()]).then(function (e) {
              return e.reduce(function (e, t) {
                return Object.assign(e, t);
              }, {});
            });
          },
        },
        {
          key: '_getClientHints',
          value: function () {
            return window.navigator.userAgentData
              ? navigator.userAgentData
                  .getHighEntropyValues(['platform', 'platformVersion', 'model'])
                  .then(function (e) {
                    return {
                      sec_ch_ua_platform: e.platform,
                      sec_ch_ua_platform_version: e.platformVersion,
                      sec_ch_ua_model: e.model,
                    };
                  })
              : Promise.resolve({});
          },
        },
        {
          key: '_fetch',
          value: function () {
            throw new TypeError('Do not call abstract method _fetch');
          },
        },
        {
          key: '_persist',
          value: function () {
            throw new TypeError('Do not call abstract method _persist');
          },
        },
        {
          key: '_isDefined',
          value: function (e) {
            return void 0 !== e && null != e;
          },
        },
        {
          key: '_setDefaultFromURL',
          value: function (e, t) {
            var n = this.urlParameter(t);
            this._isDefined(n) && e.set(t, n);
          },
        },
        {
          key: 'urlParameter',
          value: function (e) {
            return new URL(window.location.href).searchParams.get(e);
          },
        },
      ]),
      t
    );
  })();
  return new ((function () {
    function e() {
      return n(this, e), a(this, t(e).call(this, Promise.resolve({})));
    }
    return (
      (function (e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
          t && o(e, t);
      })(e, V),
      i(e, [
        {
          key: '_fetch',
          value: function (e) {
            var t = document.cookie
              .split(';')
              .map(function (e) {
                return e.split('=');
              })
              .reduce(function (e, t) {
                try {
                  e[decodeURIComponent(t[0].trim())] = decodeURIComponent(t[1].trim());
                } catch (e) {}
                return e;
              }, {});
            return t[e] ? t[e].trim() : '';
          },
        },
        {
          key: '_persist',
          value: function (e, t, n) {
            var r = 2 < arguments.length && void 0 !== n ? n : 30,
              i = new Date();
            i.setTime(i.getTime() + 24 * r * 60 * 60 * 1e3),
              1650 < t.length && (t = t.substring(0, 33) + t.substring(t.length - 1616, t.length)),
              this._tld
                ? (document.cookie = ''
                    .concat(e, '=')
                    .concat(t, ';expires=')
                    .concat(i.toUTCString(), ';path=/;domain=')
                    .concat(this._tld))
                : (document.cookie = ''.concat(e, '=').concat(t, ';expires=').concat(i.toUTCString(), ';path=/'));
          },
        },
      ]),
      e
    );
  })())();
})();
