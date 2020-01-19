// three.js - http://github.com/mrdoob/three.js
'use strict';
var THREE = THREE || {
    REVISION: "56"
};
self.console = self.console || {
    info: function() {},
    log: function() {},
    debug: function() {},
    warn: function() {},
    error: function() {}
};
self.Int32Array = self.Int32Array || Array;
self.Float32Array = self.Float32Array || Array;
String.prototype.trim = String.prototype.trim ||
function() {
    return this.replace(/^\s+|\s+$/g, "")
};
THREE.extend = function(a, b) {
    if (Object.keys) for (var c = Object.keys(b), d = 0, e = c.length; d < e; d++) {
        var f = c[d];
        Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(b, f))
    } else for (f in c = {}.hasOwnProperty, b) c.call(b, f) && (a[f] = b[f]);
    return a
}; (function() {
    for (var a = 0,
    b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
    window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    void 0 === window.requestAnimationFrame && (window.requestAnimationFrame = function(b) {
        var c = Date.now(),
        f = Math.max(0, 16 - (c - a)),
        g = window.setTimeout(function() {
            b(c + f)
        },
        f);
        a = c + f;
        return g
    });
    window.cancelAnimationFrame = window.cancelAnimationFrame ||
    function(a) {
        window.clearTimeout(a)
    }
})();
THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;
THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;
THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = function() {};
THREE.CubeReflectionMapping = function() {};
THREE.CubeRefractionMapping = function() {};
THREE.SphericalReflectionMapping = function() {};
THREE.SphericalRefractionMapping = function() {};
THREE.RepeatWrapping = 1E3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.Color = function(a) {
    void 0 !== a && this.set(a);
    return this
};
THREE.extend(THREE.Color.prototype, {
    r: 1,
    g: 1,
    b: 1,
    set: function(a) {
        switch (typeof a) {
        case "number":
            this.setHex(a);
            break;
        case "string":
            this.setStyle(a)
        }
    },
    setHex: function(a) {
        a = Math.floor(a);
        this.r = (a >> 16 & 255) / 255;
        this.g = (a >> 8 & 255) / 255;
        this.b = (a & 255) / 255;
        return this
    },
    setRGB: function(a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c;
        return this
    },
    setHSV: function(a, b, c) {
        console.log("DEPRECATED: Color's .setHSV() will be removed. Use .setHSL( h, s, l ) instead.");
        return this.setHSL(a, b * c / (1 > (a = (2 - b) * c) ? a: 2 - a), a / 2)
    },
    setHSL: function(a, b, c) {
        if (0 === b) this.r = this.g = this.b = c;
        else {
            var d = function(a, b, c) {
                0 > c && (c += 1);
                1 < c && (c -= 1);
                return c < 1 / 6 ? a + 6 * (b - a) * c: 0.5 > c ? b: c < 2 / 3 ? a + 6 * (b - a) * (2 / 3 - c) : a
            },
            b = 0.5 >= c ? c * (1 + b) : c + b - c * b,
            c = 2 * c - b;
            this.r = d(c, b, a + 1 / 3);
            this.g = d(c, b, a);
            this.b = d(c, b, a - 1 / 3)
        }
        return this
    },
    setStyle: function(a) {
        if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a)) return a = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a),
        this.r = Math.min(255, parseInt(a[1], 10)) / 255,
        this.g = Math.min(255, parseInt(a[2], 10)) / 255,
        this.b = Math.min(255, parseInt(a[3], 10)) / 255,
        this;
        if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a)) return a = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a),
        this.r = Math.min(100, parseInt(a[1], 10)) / 100,
        this.g = Math.min(100, parseInt(a[2], 10)) / 100,
        this.b = Math.min(100, parseInt(a[3], 10)) / 100,
        this;
        if (/^\#([0-9a-f]{6})$/i.test(a)) return a = /^\#([0-9a-f]{6})$/i.exec(a),
        this.setHex(parseInt(a[1], 16)),
        this;
        if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a)) return a = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a),
        this.setHex(parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16)),
        this;
        if (/^(\w+)$/i.test(a)) return this.setHex(THREE.ColorKeywords[a]),
        this
    },
    copy: function(a) {
        this.r = a.r;
        this.g = a.g;
        this.b = a.b;
        return this
    },
    copyGammaToLinear: function(a) {
        this.r = a.r * a.r;
        this.g = a.g * a.g;
        this.b = a.b * a.b;
        return this
    },
    copyLinearToGamma: function(a) {
        this.r = Math.sqrt(a.r);
        this.g = Math.sqrt(a.g);
        this.b = Math.sqrt(a.b);
        return this
    },
    convertGammaToLinear: function() {
        var a = this.r,
        b = this.g,
        c = this.b;
        this.r = a * a;
        this.g = b * b;
        this.b = c * c;
        return this
    },
    convertLinearToGamma: function() {
        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);
        return this
    },
    getHex: function() {
        return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
    },
    getHexString: function() {
        return ("000000" + this.getHex().toString(16)).slice( - 6)
    },
    getHSL: function() {
        var a = {
            h: 0,
            s: 0,
            l: 0
        };
        return function() {
            var b = this.r,
            c = this.g,
            d = this.b,
            e = Math.max(b, c, d),
            f = Math.min(b, c, d),
            g,
            h = (f + e) / 2;
            if (f === e) f = g = 0;
            else {
                var i = e - f,
                f = 0.5 >= h ? i / (e + f) : i / (2 - e - f);
                switch (e) {
                case b:
                    g = (c - d) / i + (c < d ? 6 : 0);
                    break;
                case c:
                    g = (d - b) / i + 2;
                    break;
                case d:
                    g = (b - c) / i + 4
                }
                g /= 6
            }
            a.h = g;
            a.s = f;
            a.l = h;
            return a
        }
    } (),
    getStyle: function() {
        return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
    },
    offsetHSL: function(a, b, c) {
        var d = this.getHSL();
        d.h += a;
        d.s += b;
        d.l += c;
        this.setHSL(d.h, d.s, d.l);
        return this
    },
    add: function(a) {
        this.r += a.r;
        this.g += a.g;
        this.b += a.b;
        return this
    },
    addColors: function(a, b) {
        this.r = a.r + b.r;
        this.g = a.g + b.g;
        this.b = a.b + b.b;
        return this
    },
    addScalar: function(a) {
        this.r += a;
        this.g += a;
        this.b += a;
        return this
    },
    multiply: function(a) {
        this.r *= a.r;
        this.g *= a.g;
        this.b *= a.b;
        return this
    },
    multiplyScalar: function(a) {
        this.r *= a;
        this.g *= a;
        this.b *= a;
        return this
    },
    lerp: function(a, b) {
        this.r += (a.r - this.r) * b;
        this.g += (a.g - this.g) * b;
        this.b += (a.b - this.b) * b;
        return this
    },
    clone: function() {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
});
THREE.ColorKeywords = {
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
    yellowgreen: 10145074
};
THREE.Quaternion = function(a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = void 0 !== d ? d: 1
};
THREE.extend(THREE.Quaternion.prototype, {
    set: function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
        return this
    },
    setFromEuler: function(a, b) {
        var c = Math.cos(a.x / 2),
        d = Math.cos(a.y / 2),
        e = Math.cos(a.z / 2),
        f = Math.sin(a.x / 2),
        g = Math.sin(a.y / 2),
        h = Math.sin(a.z / 2);
        void 0 === b || "XYZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "YXZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "ZXY" === b ? (this.x = f * d * e - c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "ZYX" === b ? (this.x = f * d * e - c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "YZX" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e - f * g * h) : "XZY" === b && (this.x = f * d * e - c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e + f * g * h);
        return this
    },
    setFromAxisAngle: function(a, b) {
        var c = b / 2,
        d = Math.sin(c);
        this.x = a.x * d;
        this.y = a.y * d;
        this.z = a.z * d;
        this.w = Math.cos(c);
        return this
    },
    setFromRotationMatrix: function(a) {
        var b = a.elements,
        c = b[0],
        a = b[4],
        d = b[8],
        e = b[1],
        f = b[5],
        g = b[9],
        h = b[2],
        i = b[6],
        b = b[10],
        k = c + f + b;
        0 < k ? (c = 0.5 / Math.sqrt(k + 1), this.w = 0.25 / c, this.x = (i - g) * c, this.y = (d - h) * c, this.z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b), this.w = (i - g) / c, this.x = 0.25 * c, this.y = (a + e) / c, this.z = (d + h) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b), this.w = (d - h) / c, this.x = (a + e) / c, this.y = 0.25 * c, this.z = (g + i) / c) : (c = 2 * Math.sqrt(1 + b - c - f), this.w = (e - a) / c, this.x = (d + h) / c, this.y = (g + i) / c, this.z = 0.25 * c);
        return this
    },
    inverse: function() {
        this.conjugate().normalize();
        return this
    },
    conjugate: function() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function() {
        var a = this.length();
        0 === a ? (this.z = this.y = this.x = 0, this.w = 1) : (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a);
        return this
    },
    multiply: function(a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
    },
    multiplyQuaternions: function(a, b) {
        var c = a.x,
        d = a.y,
        e = a.z,
        f = a.w,
        g = b.x,
        h = b.y,
        i = b.z,
        k = b.w;
        this.x = c * k + f * g + d * i - e * h;
        this.y = d * k + f * h + e * g - c * i;
        this.z = e * k + f * i + c * h - d * g;
        this.w = f * k - c * g - d * h - e * i;
        return this
    },
    multiplyVector3: function(a) {
        console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
        return a.applyQuaternion(this)
    },
    slerp: function(a, b) {
        var c = this.x,
        d = this.y,
        e = this.z,
        f = this.w,
        g = f * a.w + c * a.x + d * a.y + e * a.z;
        0 > g ? (this.w = -a.w, this.x = -a.x, this.y = -a.y, this.z = -a.z, g = -g) : this.copy(a);
        if (1 <= g) return this.w = f,
        this.x = c,
        this.y = d,
        this.z = e,
        this;
        var h = Math.acos(g),
        i = Math.sqrt(1 - g * g);
        if (0.001 > Math.abs(i)) return this.w = 0.5 * (f + this.w),
        this.x = 0.5 * (c + this.x),
        this.y = 0.5 * (d + this.y),
        this.z = 0.5 * (e + this.z),
        this;
        g = Math.sin((1 - b) * h) / i;
        h = Math.sin(b * h) / i;
        this.w = f * g + this.w * h;
        this.x = c * g + this.x * h;
        this.y = d * g + this.y * h;
        this.z = e * g + this.z * h;
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
    },
    clone: function() {
        return new THREE.Quaternion(this.x, this.y, this.z, this.w)
    }
});
THREE.Quaternion.slerp = function(a, b, c, d) {
    return c.copy(a).slerp(b, d)
};
THREE.Vector2 = function(a, b) {
    this.x = a || 0;
    this.y = b || 0
};
THREE.extend(THREE.Vector2.prototype, {
    set: function(a, b) {
        this.x = a;
        this.y = b;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        return this
    },
    add: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
        this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        return this
    },
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
        this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        return this
    },
    divideScalar: function(a) {
        0 !== a ? (this.x /= a, this.y /= a) : this.set(0, 0);
        return this
    },
    min: function(a) {
        this.x > a.x && (this.x = a.x);
        this.y > a.y && (this.y = a.y);
        return this
    },
    max: function(a) {
        this.x < a.x && (this.x = a.x);
        this.y < a.y && (this.y = a.y);
        return this
    },
    clamp: function(a, b) {
        this.x < a.x ? this.x = a.x: this.x > b.x && (this.x = b.x);
        this.y < a.y ? this.y = a.y: this.y > b.y && (this.y = b.y);
        return this
    },
    negate: function() {
        return this.multiplyScalar( - 1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var b = this.x - a.x,
        a = this.y - a.y;
        return b * b + a * a
    },
    setLength: function(a) {
        var b = this.length();
        0 !== b && a !== b && this.multiplyScalar(a / b);
        return this
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y
    },
    toArray: function() {
        return [this.x, this.y]
    },
    clone: function() {
        return new THREE.Vector2(this.x, this.y)
    }
});
THREE.Vector3 = function(a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
THREE.extend(THREE.Vector3.prototype, {
    set: function(a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setZ: function(a) {
        this.z = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        case 2:
            this.z = b;
            break;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this
    },
    add: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
        this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        return this
    },
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
        this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this
    },
    multiply: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),
        this.multiplyVectors(a, b);
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this
    },
    multiplyVectors: function(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this
    },
    applyMatrix3: function(a) {
        var b = this.x,
        c = this.y,
        d = this.z,
        a = a.elements;
        this.x = a[0] * b + a[3] * c + a[6] * d;
        this.y = a[1] * b + a[4] * c + a[7] * d;
        this.z = a[2] * b + a[5] * c + a[8] * d;
        return this
    },
    applyMatrix4: function(a) {
        var b = this.x,
        c = this.y,
        d = this.z,
        a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d + a[12];
        this.y = a[1] * b + a[5] * c + a[9] * d + a[13];
        this.z = a[2] * b + a[6] * c + a[10] * d + a[14];
        return this
    },
    applyProjection: function(a) {
        var b = this.x,
        c = this.y,
        d = this.z,
        a = a.elements,
        e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
        this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
        this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * e;
        this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
        return this
    },
    applyQuaternion: function(a) {
        var b = this.x,
        c = this.y,
        d = this.z,
        e = a.x,
        f = a.y,
        g = a.z,
        a = a.w,
        h = a * b + f * d - g * c,
        i = a * c + g * b - e * d,
        k = a * d + e * c - f * b,
        b = -e * b - f * c - g * d;
        this.x = h * a + b * -e + i * -g - k * -f;
        this.y = i * a + b * -f + k * -e - h * -g;
        this.z = k * a + b * -g + h * -f - i * -e;
        return this
    },
    applyEuler: function() {
        var a = new THREE.Quaternion;
        return function(b, c) {
            var d = a.setFromEuler(b, c);
            this.applyQuaternion(d);
            return this
        }
    } (),
    applyAxisAngle: function() {
        var a = new THREE.Quaternion;
        return function(b, c) {
            var d = a.setFromAxisAngle(b, c);
            this.applyQuaternion(d);
            return this
        }
    } (),
    transformDirection: function(a) {
        var b = this.x,
        c = this.y,
        d = this.z,
        a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d;
        this.y = a[1] * b + a[5] * c + a[9] * d;
        this.z = a[2] * b + a[6] * c + a[10] * d;
        this.normalize();
        return this
    },
    divide: function(a) {
        this.x /= a.x;
        this.y /= a.y;
        this.z /= a.z;
        return this
    },
    divideScalar: function(a) {
        0 !== a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0;
        return this
    },
    min: function(a) {
        this.x > a.x && (this.x = a.x);
        this.y > a.y && (this.y = a.y);
        this.z > a.z && (this.z = a.z);
        return this
    },
    max: function(a) {
        this.x < a.x && (this.x = a.x);
        this.y < a.y && (this.y = a.y);
        this.z < a.z && (this.z = a.z);
        return this
    },
    clamp: function(a, b) {
        this.x < a.x ? this.x = a.x: this.x > b.x && (this.x = b.x);
        this.y < a.y ? this.y = a.y: this.y > b.y && (this.y = b.y);
        this.z < a.z ? this.z = a.z: this.z > b.z && (this.z = b.z);
        return this
    },
    negate: function() {
        return this.multiplyScalar( - 1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        var b = this.length();
        0 !== b && a !== b && this.multiplyScalar(a / b);
        return this
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        this.z += (a.z - this.z) * b;
        return this
    },
    cross: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),
        this.crossVectors(a, b);
        var c = this.x,
        d = this.y,
        e = this.z;
        this.x = d * a.z - e * a.y;
        this.y = e * a.x - c * a.z;
        this.z = c * a.y - d * a.x;
        return this
    },
    crossVectors: function(a, b) {
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        return this
    },
    projectOnVector: function() {
        var a = new THREE.Vector3;
        return function(b) {
            a.copy(b).normalize();
            b = this.dot(a);
            return this.copy(a).multiplyScalar(b)
        }
    } (),
    projectOnPlane: function() {
        var a = new THREE.Vector3;
        return function(b) {
            a.copy(this).projectOnVector(b);
            return this.sub(a)
        }
    } (),
    reflect: function() {
        var a = new THREE.Vector3;
        return function(b) {
            a.copy(this).projectOnVector(b).multiplyScalar(2);
            return this.subVectors(a, this)
        }
    } (),
    angleTo: function(a) {
        a = this.dot(a) / (this.length() * a.length());
        return Math.acos(THREE.Math.clamp(a, -1, 1))
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var b = this.x - a.x,
        c = this.y - a.y,
        a = this.z - a.z;
        return b * b + c * c + a * a
    },
    getPositionFromMatrix: function(a) {
        this.x = a.elements[12];
        this.y = a.elements[13];
        this.z = a.elements[14];
        return this
    },
    setEulerFromRotationMatrix: function(a, b) {
        function c(a) {
            return Math.min(Math.max(a, -1), 1)
        }
        var d = a.elements,
        e = d[0],
        f = d[4],
        g = d[8],
        h = d[1],
        i = d[5],
        k = d[9],
        l = d[2],
        m = d[6],
        d = d[10];
        void 0 === b || "XYZ" === b ? (this.y = Math.asin(c(g)), 0.99999 > Math.abs(g) ? (this.x = Math.atan2( - k, d), this.z = Math.atan2( - f, e)) : (this.x = Math.atan2(m, i), this.z = 0)) : "YXZ" === b ? (this.x = Math.asin( - c(k)), 0.99999 > Math.abs(k) ? (this.y = Math.atan2(g, d), this.z = Math.atan2(h, i)) : (this.y = Math.atan2( - l, e), this.z = 0)) : "ZXY" === b ? (this.x = Math.asin(c(m)), 0.99999 > Math.abs(m) ? (this.y = Math.atan2( - l, d), this.z = Math.atan2( - f, i)) : (this.y = 0, this.z = Math.atan2(h, e))) : "ZYX" === b ? (this.y = Math.asin( - c(l)), 0.99999 > Math.abs(l) ? (this.x = Math.atan2(m, d), this.z = Math.atan2(h, e)) : (this.x = 0, this.z = Math.atan2( - f, i))) : "YZX" === b ? (this.z = Math.asin(c(h)), 0.99999 > Math.abs(h) ? (this.x = Math.atan2( - k, i), this.y = Math.atan2( - l, e)) : (this.x = 0, this.y = Math.atan2(g, d))) : "XZY" === b && (this.z = Math.asin( - c(f)), 0.99999 > Math.abs(f) ? (this.x = Math.atan2(m, i), this.y = Math.atan2(g, e)) : (this.x = Math.atan2( - k, d), this.y = 0));
        return this
    },
    setEulerFromQuaternion: function(a, b) {
        function c(a) {
            return Math.min(Math.max(a, -1), 1)
        }
        var d = a.x * a.x,
        e = a.y * a.y,
        f = a.z * a.z,
        g = a.w * a.w;
        void 0 === b || "XYZ" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f), this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w))), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)) : "YXZ" === b ? (this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z))), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)) : "ZXY" === b ? (this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z))), this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)) : "ZYX" === b ? (this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f), this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z))), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)) : "YZX" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + e - f), this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f), this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))) : "XZY" === b && (this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - e - f), this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y))));
        return this
    },
    getScaleFromMatrix: function(a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
        c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
        a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        this.x = b;
        this.y = c;
        this.z = a;
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    },
    toArray: function() {
        return [this.x, this.y, this.z]
    },
    clone: function() {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
});
THREE.Vector4 = function(a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = void 0 !== d ? d: 1
};
THREE.extend(THREE.Vector4.prototype, {
    set: function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setZ: function(a) {
        this.z = a;
        return this
    },
    setW: function(a) {
        this.w = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        case 2:
            this.z = b;
            break;
        case 3:
            this.w = b;
            break;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        case 3:
            return this.w;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = void 0 !== a.w ? a.w: 1;
        return this
    },
    add: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
        this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        this.w += a.w;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        this.w += a;
        return this
    },
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
        this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        this.w -= a.w;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        this.w *= a;
        return this
    },
    applyMatrix4: function(a) {
        var b = this.x,
        c = this.y,
        d = this.z,
        e = this.w,
        a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
        this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e;
        this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * e;
        this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
        return this
    },
    divideScalar: function(a) {
        0 !== a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.z = this.y = this.x = 0, this.w = 1);
        return this
    },
    setAxisAngleFromQuaternion: function(a) {
        this.w = 2 * Math.acos(a.w);
        var b = Math.sqrt(1 - a.w * a.w);
        1E-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b, this.y = a.y / b, this.z = a.z / b);
        return this
    },
    setAxisAngleFromRotationMatrix: function(a) {
        var b, c, d, a = a.elements,
        e = a[0];
        d = a[4];
        var f = a[8],
        g = a[1],
        h = a[5],
        i = a[9];
        c = a[2];
        b = a[6];
        var k = a[10];
        if (0.01 > Math.abs(d - g) && 0.01 > Math.abs(f - c) && 0.01 > Math.abs(i - b)) {
            if (0.1 > Math.abs(d + g) && 0.1 > Math.abs(f + c) && 0.1 > Math.abs(i + b) && 0.1 > Math.abs(e + h + k - 3)) return this.set(1, 0, 0, 0),
            this;
            a = Math.PI;
            e = (e + 1) / 2;
            h = (h + 1) / 2;
            k = (k + 1) / 2;
            d = (d + g) / 4;
            f = (f + c) / 4;
            i = (i + b) / 4;
            e > h && e > k ? 0.01 > e ? (b = 0, d = c = 0.707106781) : (b = Math.sqrt(e), c = d / b, d = f / b) : h > k ? 0.01 > h ? (b = 0.707106781, c = 0, d = 0.707106781) : (c = Math.sqrt(h), b = d / c, d = i / c) : 0.01 > k ? (c = b = 0.707106781, d = 0) : (d = Math.sqrt(k), b = f / d, c = i / d);
            this.set(b, c, d, a);
            return this
        }
        a = Math.sqrt((b - i) * (b - i) + (f - c) * (f - c) + (g - d) * (g - d));
        0.001 > Math.abs(a) && (a = 1);
        this.x = (b - i) / a;
        this.y = (f - c) / a;
        this.z = (g - d) / a;
        this.w = Math.acos((e + h + k - 1) / 2);
        return this
    },
    min: function(a) {
        this.x > a.x && (this.x = a.x);
        this.y > a.y && (this.y = a.y);
        this.z > a.z && (this.z = a.z);
        this.w > a.w && (this.w = a.w);
        return this
    },
    max: function(a) {
        this.x < a.x && (this.x = a.x);
        this.y < a.y && (this.y = a.y);
        this.z < a.z && (this.z = a.z);
        this.w < a.w && (this.w = a.w);
        return this
    },
    clamp: function(a, b) {
        this.x < a.x ? this.x = a.x: this.x > b.x && (this.x = b.x);
        this.y < a.y ? this.y = a.y: this.y > b.y && (this.y = b.y);
        this.z < a.z ? this.z = a.z: this.z > b.z && (this.z = b.z);
        this.w < a.w ? this.w = a.w: this.w > b.w && (this.w = b.w);
        return this
    },
    negate: function() {
        return this.multiplyScalar( - 1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        var b = this.length();
        0 !== b && a !== b && this.multiplyScalar(a / b);
        return this
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        this.z += (a.z - this.z) * b;
        this.w += (a.w - this.w) * b;
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
    },
    toArray: function() {
        return [this.x, this.y, this.z, this.w]
    },
    clone: function() {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
});
THREE.Line3 = function(a, b) {
    this.start = void 0 !== a ? a: new THREE.Vector3;
    this.end = void 0 !== b ? b: new THREE.Vector3
};
THREE.extend(THREE.Line3.prototype, {
    set: function(a, b) {
        this.start.copy(a);
        this.end.copy(b);
        return this
    },
    copy: function(a) {
        this.start.copy(a.start);
        this.end.copy(a.end);
        return this
    },
    center: function(a) {
        return (a || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(0.5)
    },
    delta: function(a) {
        return (a || new THREE.Vector3).subVectors(this.end, this.start)
    },
    distanceSq: function() {
        return this.start.distanceToSquared(this.end)
    },
    distance: function() {
        return this.start.distanceTo(this.end)
    },
    at: function(a, b) {
        var c = b || new THREE.Vector3;
        return this.delta(c).multiplyScalar(a).add(this.start)
    },
    closestPointToPointParameter: function() {
        var a = new THREE.Vector3,
        b = new THREE.Vector3;
        return function(c, d) {
            a.subVectors(c, this.start);
            b.subVectors(this.end, this.start);
            var e = b.dot(b),
            e = b.dot(a) / e;
            d && (e = THREE.Math.clamp(e, 0, 1));
            return e
        }
    } (),
    closestPointToPoint: function(a, b, c) {
        a = this.closestPointToPointParameter(a, b);
        c = c || new THREE.Vector3;
        return this.delta(c).multiplyScalar(a).add(this.start)
    },
    applyMatrix4: function(a) {
        this.start.applyMatrix4(a);
        this.end.applyMatrix4(a);
        return this
    },
    equals: function(a) {
        return a.start.equals(this.start) && a.end.equals(this.end)
    },
    clone: function() {
        return (new THREE.Line3).copy(this)
    }
});
THREE.Box2 = function(a, b) {
    this.min = void 0 !== a ? a: new THREE.Vector2(Infinity, Infinity);
    this.max = void 0 !== b ? b: new THREE.Vector2( - Infinity, -Infinity)
};
THREE.extend(THREE.Box2.prototype, {
    set: function(a, b) {
        this.min.copy(a);
        this.max.copy(b);
        return this
    },
    setFromPoints: function(a) {
        if (0 < a.length) {
            var b = a[0];
            this.min.copy(b);
            this.max.copy(b);
            for (var c = 1,
            d = a.length; c < d; c++) b = a[c],
            b.x < this.min.x ? this.min.x = b.x: b.x > this.max.x && (this.max.x = b.x),
            b.y < this.min.y ? this.min.y = b.y: b.y > this.max.y && (this.max.y = b.y)
        } else this.makeEmpty();
        return this
    },
    setFromCenterAndSize: function() {
        var a = new THREE.Vector2;
        return function(b, c) {
            var d = a.copy(c).multiplyScalar(0.5);
            this.min.copy(b).sub(d);
            this.max.copy(b).add(d);
            return this
        }
    } (),
    copy: function(a) {
        this.min.copy(a.min);
        this.max.copy(a.max);
        return this
    },
    makeEmpty: function() {
        this.min.x = this.min.y = Infinity;
        this.max.x = this.max.y = -Infinity;
        return this
    },
    empty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y
    },
    center: function(a) {
        return (a || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(0.5)
    },
    size: function(a) {
        return (a || new THREE.Vector2).subVectors(this.max, this.min)
    },
    expandByPoint: function(a) {
        this.min.min(a);
        this.max.max(a);
        return this
    },
    expandByVector: function(a) {
        this.min.sub(a);
        this.max.add(a);
        return this
    },
    expandByScalar: function(a) {
        this.min.addScalar( - a);
        this.max.addScalar(a);
        return this
    },
    containsPoint: function(a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
    },
    containsBox: function(a) {
        return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1
    },
    getParameter: function(a) {
        return new THREE.Vector2((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y))
    },
    isIntersectionBox: function(a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
    },
    clampPoint: function(a, b) {
        return (b || new THREE.Vector2).copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var a = new THREE.Vector2;
        return function(b) {
            return a.copy(b).clamp(this.min, this.max).sub(b).length()
        }
    } (),
    intersect: function(a) {
        this.min.max(a.min);
        this.max.min(a.max);
        return this
    },
    union: function(a) {
        this.min.min(a.min);
        this.max.max(a.max);
        return this
    },
    translate: function(a) {
        this.min.add(a);
        this.max.add(a);
        return this
    },
    equals: function(a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    },
    clone: function() {
        return (new THREE.Box2).copy(this)
    }
});
THREE.Box3 = function(a, b) {
    this.min = void 0 !== a ? a: new THREE.Vector3(Infinity, Infinity, Infinity);
    this.max = void 0 !== b ? b: new THREE.Vector3( - Infinity, -Infinity, -Infinity)
};
THREE.extend(THREE.Box3.prototype, {
    set: function(a, b) {
        this.min.copy(a);
        this.max.copy(b);
        return this
    },
    setFromPoints: function(a) {
        if (0 < a.length) {
            var b = a[0];
            this.min.copy(b);
            this.max.copy(b);
            for (var c = 1,
            d = a.length; c < d; c++) b = a[c],
            b.x < this.min.x ? this.min.x = b.x: b.x > this.max.x && (this.max.x = b.x),
            b.y < this.min.y ? this.min.y = b.y: b.y > this.max.y && (this.max.y = b.y),
            b.z < this.min.z ? this.min.z = b.z: b.z > this.max.z && (this.max.z = b.z)
        } else this.makeEmpty();
        return this
    },
    setFromCenterAndSize: function() {
        var a = new THREE.Vector3;
        return function(b, c) {
            var d = a.copy(c).multiplyScalar(0.5);
            this.min.copy(b).sub(d);
            this.max.copy(b).add(d);
            return this
        }
    } (),
    copy: function(a) {
        this.min.copy(a.min);
        this.max.copy(a.max);
        return this
    },
    makeEmpty: function() {
        this.min.x = this.min.y = this.min.z = Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this
    },
    empty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    },
    center: function(a) {
        return (a || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(0.5)
    },
    size: function(a) {
        return (a || new THREE.Vector3).subVectors(this.max, this.min)
    },
    expandByPoint: function(a) {
        this.min.min(a);
        this.max.max(a);
        return this
    },
    expandByVector: function(a) {
        this.min.sub(a);
        this.max.add(a);
        return this
    },
    expandByScalar: function(a) {
        this.min.addScalar( - a);
        this.max.addScalar(a);
        return this
    },
    containsPoint: function(a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
    },
    containsBox: function(a) {
        return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1
    },
    getParameter: function(a) {
        return new THREE.Vector3((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
    },
    isIntersectionBox: function(a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0
    },
    clampPoint: function(a, b) {
        return (b || new THREE.Vector3).copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var a = new THREE.Vector3;
        return function(b) {
            return a.copy(b).clamp(this.min, this.max).sub(b).length()
        }
    } (),
    getBoundingSphere: function() {
        var a = new THREE.Vector3;
        return function(b) {
            b = b || new THREE.Sphere;
            b.center = this.center();
            b.radius = 0.5 * this.size(a).length();
            return b
        }
    } (),
    intersect: function(a) {
        this.min.max(a.min);
        this.max.min(a.max);
        return this
    },
    union: function(a) {
        this.min.min(a.min);
        this.max.max(a.max);
        return this
    },
    applyMatrix4: function() {
        var a = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
        return function(b) {
            a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b);
            a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
            a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
            a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
            a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
            a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
            a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b);
            a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
            this.makeEmpty();
            this.setFromPoints(a);
            return this
        }
    } (),
    translate: function(a) {
        this.min.add(a);
        this.max.add(a);
        return this
    },
    equals: function(a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    },
    clone: function() {
        return (new THREE.Box3).copy(this)
    }
});
THREE.Matrix3 = function(a, b, c, d, e, f, g, h, i) {
    this.elements = new Float32Array(9);
    this.set(void 0 !== a ? a: 1, b || 0, c || 0, d || 0, void 0 !== e ? e: 1, f || 0, g || 0, h || 0, void 0 !== i ? i: 1)
};
THREE.extend(THREE.Matrix3.prototype, {
    set: function(a, b, c, d, e, f, g, h, i) {
        var k = this.elements;
        k[0] = a;
        k[3] = b;
        k[6] = c;
        k[1] = d;
        k[4] = e;
        k[7] = f;
        k[2] = g;
        k[5] = h;
        k[8] = i;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this
    },
    copy: function(a) {
        a = a.elements;
        this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
        return this
    },
    multiplyVector3: function(a) {
        console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
        return a.applyMatrix3(this)
    },
    multiplyVector3Array: function() {
        var a = new THREE.Vector3;
        return function(b) {
            for (var c = 0,
            d = b.length; c < d; c += 3) a.x = b[c],
            a.y = b[c + 1],
            a.z = b[c + 2],
            a.applyMatrix3(this),
            b[c] = a.x,
            b[c + 1] = a.y,
            b[c + 2] = a.z;
            return b
        }
    } (),
    multiplyScalar: function(a) {
        var b = this.elements;
        b[0] *= a;
        b[3] *= a;
        b[6] *= a;
        b[1] *= a;
        b[4] *= a;
        b[7] *= a;
        b[2] *= a;
        b[5] *= a;
        b[8] *= a;
        return this
    },
    determinant: function() {
        var a = this.elements,
        b = a[0],
        c = a[1],
        d = a[2],
        e = a[3],
        f = a[4],
        g = a[5],
        h = a[6],
        i = a[7],
        a = a[8];
        return b * f * a - b * g * i - c * e * a + c * g * h + d * e * i - d * f * h
    },
    getInverse: function(a, b) {
        var c = a.elements,
        d = this.elements;
        d[0] = c[10] * c[5] - c[6] * c[9];
        d[1] = -c[10] * c[1] + c[2] * c[9];
        d[2] = c[6] * c[1] - c[2] * c[5];
        d[3] = -c[10] * c[4] + c[6] * c[8];
        d[4] = c[10] * c[0] - c[2] * c[8];
        d[5] = -c[6] * c[0] + c[2] * c[4];
        d[6] = c[9] * c[4] - c[5] * c[8];
        d[7] = -c[9] * c[0] + c[1] * c[8];
        d[8] = c[5] * c[0] - c[1] * c[4];
        c = c[0] * d[0] + c[1] * d[3] + c[2] * d[6];
        if (0 === c) {
            if (b) throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
            console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0");
            this.identity();
            return this
        }
        this.multiplyScalar(1 / c);
        return this
    },
    transpose: function() {
        var a, b = this.elements;
        a = b[1];
        b[1] = b[3];
        b[3] = a;
        a = b[2];
        b[2] = b[6];
        b[6] = a;
        a = b[5];
        b[5] = b[7];
        b[7] = a;
        return this
    },
    getNormalMatrix: function(a) {
        this.getInverse(a).transpose();
        return this
    },
    transposeIntoArray: function(a) {
        var b = this.elements;
        a[0] = b[0];
        a[1] = b[3];
        a[2] = b[6];
        a[3] = b[1];
        a[4] = b[4];
        a[5] = b[7];
        a[6] = b[2];
        a[7] = b[5];
        a[8] = b[8];
        return this
    },
    clone: function() {
        var a = this.elements;
        return new THREE.Matrix3(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8])
    }
});
THREE.Matrix4 = function(a, b, c, d, e, f, g, h, i, k, l, m, n, s, r, p) {
    var q = this.elements = new Float32Array(16);
    q[0] = void 0 !== a ? a: 1;
    q[4] = b || 0;
    q[8] = c || 0;
    q[12] = d || 0;
    q[1] = e || 0;
    q[5] = void 0 !== f ? f: 1;
    q[9] = g || 0;
    q[13] = h || 0;
    q[2] = i || 0;
    q[6] = k || 0;
    q[10] = void 0 !== l ? l: 1;
    q[14] = m || 0;
    q[3] = n || 0;
    q[7] = s || 0;
    q[11] = r || 0;
    q[15] = void 0 !== p ? p: 1
};
THREE.extend(THREE.Matrix4.prototype, {
    set: function(a, b, c, d, e, f, g, h, i, k, l, m, n, s, r, p) {
        var q = this.elements;
        q[0] = a;
        q[4] = b;
        q[8] = c;
        q[12] = d;
        q[1] = e;
        q[5] = f;
        q[9] = g;
        q[13] = h;
        q[2] = i;
        q[6] = k;
        q[10] = l;
        q[14] = m;
        q[3] = n;
        q[7] = s;
        q[11] = r;
        q[15] = p;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    copy: function(a) {
        a = a.elements;
        this.set(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]);
        return this
    },
    setRotationFromEuler: function(a, b) {
        var c = this.elements,
        d = a.x,
        e = a.y,
        f = a.z,
        g = Math.cos(d),
        d = Math.sin(d),
        h = Math.cos(e),
        e = Math.sin(e),
        i = Math.cos(f),
        f = Math.sin(f);
        if (void 0 === b || "XYZ" === b) {
            var k = g * i,
            l = g * f,
            m = d * i,
            n = d * f;
            c[0] = h * i;
            c[4] = -h * f;
            c[8] = e;
            c[1] = l + m * e;
            c[5] = k - n * e;
            c[9] = -d * h;
            c[2] = n - k * e;
            c[6] = m + l * e;
            c[10] = g * h
        } else "YXZ" === b ? (k = h * i, l = h * f, m = e * i, n = e * f, c[0] = k + n * d, c[4] = m * d - l, c[8] = g * e, c[1] = g * f, c[5] = g * i, c[9] = -d, c[2] = l * d - m, c[6] = n + k * d, c[10] = g * h) : "ZXY" === b ? (k = h * i, l = h * f, m = e * i, n = e * f, c[0] = k - n * d, c[4] = -g * f, c[8] = m + l * d, c[1] = l + m * d, c[5] = g * i, c[9] = n - k * d, c[2] = -g * e, c[6] = d, c[10] = g * h) : "ZYX" === b ? (k = g * i, l = g * f, m = d * i, n = d * f, c[0] = h * i, c[4] = m * e - l, c[8] = k * e + n, c[1] = h * f, c[5] = n * e + k, c[9] = l * e - m, c[2] = -e, c[6] = d * h, c[10] = g * h) : "YZX" === b ? (k = g * h, l = g * e, m = d * h, n = d * e, c[0] = h * i, c[4] = n - k * f, c[8] = m * f + l, c[1] = f, c[5] = g * i, c[9] = -d * i, c[2] = -e * i, c[6] = l * f + m, c[10] = k - n * f) : "XZY" === b && (k = g * h, l = g * e, m = d * h, n = d * e, c[0] = h * i, c[4] = -f, c[8] = e * i, c[1] = k * f + n, c[5] = g * i, c[9] = l * f - m, c[2] = m * f - l, c[6] = d * i, c[10] = n * f + k);
        return this
    },
    setRotationFromQuaternion: function(a) {
        var b = this.elements,
        c = a.x,
        d = a.y,
        e = a.z,
        f = a.w,
        g = c + c,
        h = d + d,
        i = e + e,
        a = c * g,
        k = c * h,
        c = c * i,
        l = d * h,
        d = d * i,
        e = e * i,
        g = f * g,
        h = f * h,
        f = f * i;
        b[0] = 1 - (l + e);
        b[4] = k - f;
        b[8] = c + h;
        b[1] = k + f;
        b[5] = 1 - (a + e);
        b[9] = d - g;
        b[2] = c - h;
        b[6] = d + g;
        b[10] = 1 - (a + l);
        return this
    },
    lookAt: function() {
        var a = new THREE.Vector3,
        b = new THREE.Vector3,
        c = new THREE.Vector3;
        return function(d, e, f) {
            var g = this.elements;
            c.subVectors(d, e).normalize();
            0 === c.length() && (c.z = 1);
            a.crossVectors(f, c).normalize();
            0 === a.length() && (c.x += 1E-4, a.crossVectors(f, c).normalize());
            b.crossVectors(c, a);
            g[0] = a.x;
            g[4] = b.x;
            g[8] = c.x;
            g[1] = a.y;
            g[5] = b.y;
            g[9] = c.y;
            g[2] = a.z;
            g[6] = b.z;
            g[10] = c.z;
            return this
        }
    } (),
    multiply: function(a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
    },
    multiplyMatrices: function(a, b) {
        var c = a.elements,
        d = b.elements,
        e = this.elements,
        f = c[0],
        g = c[4],
        h = c[8],
        i = c[12],
        k = c[1],
        l = c[5],
        m = c[9],
        n = c[13],
        s = c[2],
        r = c[6],
        p = c[10],
        q = c[14],
        y = c[3],
        v = c[7],
        z = c[11],
        c = c[15],
        t = d[0],
        A = d[4],
        I = d[8],
        C = d[12],
        x = d[1],
        G = d[5],
        J = d[9],
        E = d[13],
        H = d[2],
        B = d[6],
        W = d[10],
        F = d[14],
        K = d[3],
        L = d[7],
        U = d[11],
        d = d[15];
        e[0] = f * t + g * x + h * H + i * K;
        e[4] = f * A + g * G + h * B + i * L;
        e[8] = f * I + g * J + h * W + i * U;
        e[12] = f * C + g * E + h * F + i * d;
        e[1] = k * t + l * x + m * H + n * K;
        e[5] = k * A + l * G + m * B + n * L;
        e[9] = k * I + l * J + m * W + n * U;
        e[13] = k * C + l * E + m * F + n * d;
        e[2] = s * t + r * x + p * H + q * K;
        e[6] = s * A + r * G + p * B + q * L;
        e[10] = s * I + r * J + p * W + q * U;
        e[14] = s * C + r * E + p * F + q * d;
        e[3] = y * t + v * x + z * H + c * K;
        e[7] = y * A + v * G + z * B + c * L;
        e[11] = y * I + v * J + z * W + c * U;
        e[15] = y * C + v * E + z * F + c * d;
        return this
    },
    multiplyToArray: function(a, b, c) {
        var d = this.elements;
        this.multiplyMatrices(a, b);
        c[0] = d[0];
        c[1] = d[1];
        c[2] = d[2];
        c[3] = d[3];
        c[4] = d[4];
        c[5] = d[5];
        c[6] = d[6];
        c[7] = d[7];
        c[8] = d[8];
        c[9] = d[9];
        c[10] = d[10];
        c[11] = d[11];
        c[12] = d[12];
        c[13] = d[13];
        c[14] = d[14];
        c[15] = d[15];
        return this
    },
    multiplyScalar: function(a) {
        var b = this.elements;
        b[0] *= a;
        b[4] *= a;
        b[8] *= a;
        b[12] *= a;
        b[1] *= a;
        b[5] *= a;
        b[9] *= a;
        b[13] *= a;
        b[2] *= a;
        b[6] *= a;
        b[10] *= a;
        b[14] *= a;
        b[3] *= a;
        b[7] *= a;
        b[11] *= a;
        b[15] *= a;
        return this
    },
    multiplyVector3: function(a) {
        console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
        return a.applyProjection(this)
    },
    multiplyVector4: function(a) {
        console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
        return a.applyMatrix4(this)
    },
    multiplyVector3Array: function() {
        var a = new THREE.Vector3;
        return function(b) {
            for (var c = 0,
            d = b.length; c < d; c += 3) a.x = b[c],
            a.y = b[c + 1],
            a.z = b[c + 2],
            a.applyProjection(this),
            b[c] = a.x,
            b[c + 1] = a.y,
            b[c + 2] = a.z;
            return b
        }
    } (),
    rotateAxis: function(a) {
        var b = this.elements,
        c = a.x,
        d = a.y,
        e = a.z;
        a.x = c * b[0] + d * b[4] + e * b[8];
        a.y = c * b[1] + d * b[5] + e * b[9];
        a.z = c * b[2] + d * b[6] + e * b[10];
        a.normalize();
        return a
    },
    crossVector: function(a) {
        var b = this.elements,
        c = new THREE.Vector4;
        c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
        c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
        c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
        c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w: 1;
        return c
    },
    determinant: function() {
        var a = this.elements,
        b = a[0],
        c = a[4],
        d = a[8],
        e = a[12],
        f = a[1],
        g = a[5],
        h = a[9],
        i = a[13],
        k = a[2],
        l = a[6],
        m = a[10],
        n = a[14];
        return a[3] * ( + e * h * l - d * i * l - e * g * m + c * i * m + d * g * n - c * h * n) + a[7] * ( + b * h * n - b * i * m + e * f * m - d * f * n + d * i * k - e * h * k) + a[11] * ( + b * i * l - b * g * n - e * f * l + c * f * n + e * g * k - c * i * k) + a[15] * ( - d * g * k - b * h * l + b * g * m + d * f * l - c * f * m + c * h * k)
    },
    transpose: function() {
        var a = this.elements,
        b;
        b = a[1];
        a[1] = a[4];
        a[4] = b;
        b = a[2];
        a[2] = a[8];
        a[8] = b;
        b = a[6];
        a[6] = a[9];
        a[9] = b;
        b = a[3];
        a[3] = a[12];
        a[12] = b;
        b = a[7];
        a[7] = a[13];
        a[13] = b;
        b = a[11];
        a[11] = a[14];
        a[14] = b;
        return this
    },
    flattenToArray: function(a) {
        var b = this.elements;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        a[9] = b[9];
        a[10] = b[10];
        a[11] = b[11];
        a[12] = b[12];
        a[13] = b[13];
        a[14] = b[14];
        a[15] = b[15];
        return a
    },
    flattenToArrayOffset: function(a, b) {
        var c = this.elements;
        a[b] = c[0];
        a[b + 1] = c[1];
        a[b + 2] = c[2];
        a[b + 3] = c[3];
        a[b + 4] = c[4];
        a[b + 5] = c[5];
        a[b + 6] = c[6];
        a[b + 7] = c[7];
        a[b + 8] = c[8];
        a[b + 9] = c[9];
        a[b + 10] = c[10];
        a[b + 11] = c[11];
        a[b + 12] = c[12];
        a[b + 13] = c[13];
        a[b + 14] = c[14];
        a[b + 15] = c[15];
        return a
    },
    getPosition: function() {
        var a = new THREE.Vector3;
        return function() {
            console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.");
            var b = this.elements;
            return a.set(b[12], b[13], b[14])
        }
    } (),
    setPosition: function(a) {
        var b = this.elements;
        b[12] = a.x;
        b[13] = a.y;
        b[14] = a.z;
        return this
    },
    getInverse: function(a, b) {
        var c = this.elements,
        d = a.elements,
        e = d[0],
        f = d[4],
        g = d[8],
        h = d[12],
        i = d[1],
        k = d[5],
        l = d[9],
        m = d[13],
        n = d[2],
        s = d[6],
        r = d[10],
        p = d[14],
        q = d[3],
        y = d[7],
        v = d[11],
        z = d[15];
        c[0] = l * p * y - m * r * y + m * s * v - k * p * v - l * s * z + k * r * z;
        c[4] = h * r * y - g * p * y - h * s * v + f * p * v + g * s * z - f * r * z;
        c[8] = g * m * y - h * l * y + h * k * v - f * m * v - g * k * z + f * l * z;
        c[12] = h * l * s - g * m * s - h * k * r + f * m * r + g * k * p - f * l * p;
        c[1] = m * r * q - l * p * q - m * n * v + i * p * v + l * n * z - i * r * z;
        c[5] = g * p * q - h * r * q + h * n * v - e * p * v - g * n * z + e * r * z;
        c[9] = h * l * q - g * m * q - h * i * v + e * m * v + g * i * z - e * l * z;
        c[13] = g * m * n - h * l * n + h * i * r - e * m * r - g * i * p + e * l * p;
        c[2] = k * p * q - m * s * q + m * n * y - i * p * y - k * n * z + i * s * z;
        c[6] = h * s * q - f * p * q - h * n * y + e * p * y + f * n * z - e * s * z;
        c[10] = f * m * q - h * k * q + h * i * y - e * m * y - f * i * z + e * k * z;
        c[14] = h * k * n - f * m * n - h * i * s + e * m * s + f * i * p - e * k * p;
        c[3] = l * s * q - k * r * q - l * n * y + i * r * y + k * n * v - i * s * v;
        c[7] = f * r * q - g * s * q + g * n * y - e * r * y - f * n * v + e * s * v;
        c[11] = g * k * q - f * l * q - g * i * y + e * l * y + f * i * v - e * k * v;
        c[15] = f * l * n - g * k * n + g * i * s - e * l * s - f * i * r + e * k * r;
        c = d[0] * c[0] + d[1] * c[4] + d[2] * c[8] + d[3] * c[12];
        if (0 == c) {
            if (b) throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
            console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0");
            this.identity();
            return this
        }
        this.multiplyScalar(1 / c);
        return this
    },
    compose: function() {
        var a = new THREE.Matrix4,
        b = new THREE.Matrix4;
        return function(c, d, e) {
            var f = this.elements;
            a.identity();
            a.setRotationFromQuaternion(d);
            b.makeScale(e.x, e.y, e.z);
            this.multiplyMatrices(a, b);
            f[12] = c.x;
            f[13] = c.y;
            f[14] = c.z;
            return this
        }
    } (),
    decompose: function() {
        var a = new THREE.Vector3,
        b = new THREE.Vector3,
        c = new THREE.Vector3,
        d = new THREE.Matrix4;
        return function(e, f, g) {
            var h = this.elements;
            a.set(h[0], h[1], h[2]);
            b.set(h[4], h[5], h[6]);
            c.set(h[8], h[9], h[10]);
            e = e instanceof THREE.Vector3 ? e: new THREE.Vector3;
            f = f instanceof THREE.Quaternion ? f: new THREE.Quaternion;
            g = g instanceof THREE.Vector3 ? g: new THREE.Vector3;
            g.x = a.length();
            g.y = b.length();
            g.z = c.length();
            e.x = h[12];
            e.y = h[13];
            e.z = h[14];
            d.copy(this);
            d.elements[0] /= g.x;
            d.elements[1] /= g.x;
            d.elements[2] /= g.x;
            d.elements[4] /= g.y;
            d.elements[5] /= g.y;
            d.elements[6] /= g.y;
            d.elements[8] /= g.z;
            d.elements[9] /= g.z;
            d.elements[10] /= g.z;
            f.setFromRotationMatrix(d);
            return [e, f, g]
        }
    } (),
    extractPosition: function(a) {
        var b = this.elements,
        a = a.elements;
        b[12] = a[12];
        b[13] = a[13];
        b[14] = a[14];
        return this
    },
    extractRotation: function() {
        var a = new THREE.Vector3;
        return function(b) {
            var c = this.elements,
            b = b.elements,
            d = 1 / a.set(b[0], b[1], b[2]).length(),
            e = 1 / a.set(b[4], b[5], b[6]).length(),
            f = 1 / a.set(b[8], b[9], b[10]).length();
            c[0] = b[0] * d;
            c[1] = b[1] * d;
            c[2] = b[2] * d;
            c[4] = b[4] * e;
            c[5] = b[5] * e;
            c[6] = b[6] * e;
            c[8] = b[8] * f;
            c[9] = b[9] * f;
            c[10] = b[10] * f;
            return this
        }
    } (),
    translate: function(a) {
        var b = this.elements,
        c = a.x,
        d = a.y,
        a = a.z;
        b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
        b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
        b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
        b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
        return this
    },
    rotateX: function(a) {
        var b = this.elements,
        c = b[4],
        d = b[5],
        e = b[6],
        f = b[7],
        g = b[8],
        h = b[9],
        i = b[10],
        k = b[11],
        l = Math.cos(a),
        a = Math.sin(a);
        b[4] = l * c + a * g;
        b[5] = l * d + a * h;
        b[6] = l * e + a * i;
        b[7] = l * f + a * k;
        b[8] = l * g - a * c;
        b[9] = l * h - a * d;
        b[10] = l * i - a * e;
        b[11] = l * k - a * f;
        return this
    },
    rotateY: function(a) {
        var b = this.elements,
        c = b[0],
        d = b[1],
        e = b[2],
        f = b[3],
        g = b[8],
        h = b[9],
        i = b[10],
        k = b[11],
        l = Math.cos(a),
        a = Math.sin(a);
        b[0] = l * c - a * g;
        b[1] = l * d - a * h;
        b[2] = l * e - a * i;
        b[3] = l * f - a * k;
        b[8] = l * g + a * c;
        b[9] = l * h + a * d;
        b[10] = l * i + a * e;
        b[11] = l * k + a * f;
        return this
    },
    rotateZ: function(a) {
        var b = this.elements,
        c = b[0],
        d = b[1],
        e = b[2],
        f = b[3],
        g = b[4],
        h = b[5],
        i = b[6],
        k = b[7],
        l = Math.cos(a),
        a = Math.sin(a);
        b[0] = l * c + a * g;
        b[1] = l * d + a * h;
        b[2] = l * e + a * i;
        b[3] = l * f + a * k;
        b[4] = l * g - a * c;
        b[5] = l * h - a * d;
        b[6] = l * i - a * e;
        b[7] = l * k - a * f;
        return this
    },
    rotateByAxis: function(a, b) {
        var c = this.elements;
        if (1 === a.x && 0 === a.y && 0 === a.z) return this.rotateX(b);
        if (0 === a.x && 1 === a.y && 0 === a.z) return this.rotateY(b);
        if (0 === a.x && 0 === a.y && 1 === a.z) return this.rotateZ(b);
        var d = a.x,
        e = a.y,
        f = a.z,
        g = Math.sqrt(d * d + e * e + f * f),
        d = d / g,
        e = e / g,
        f = f / g,
        g = d * d,
        h = e * e,
        i = f * f,
        k = Math.cos(b),
        l = Math.sin(b),
        m = 1 - k,
        n = d * e * m,
        s = d * f * m,
        m = e * f * m,
        d = d * l,
        r = e * l,
        l = f * l,
        f = g + (1 - g) * k,
        g = n + l,
        e = s - r,
        n = n - l,
        h = h + (1 - h) * k,
        l = m + d,
        s = s + r,
        m = m - d,
        i = i + (1 - i) * k,
        k = c[0],
        d = c[1],
        r = c[2],
        p = c[3],
        q = c[4],
        y = c[5],
        v = c[6],
        z = c[7],
        t = c[8],
        A = c[9],
        I = c[10],
        C = c[11];
        c[0] = f * k + g * q + e * t;
        c[1] = f * d + g * y + e * A;
        c[2] = f * r + g * v + e * I;
        c[3] = f * p + g * z + e * C;
        c[4] = n * k + h * q + l * t;
        c[5] = n * d + h * y + l * A;
        c[6] = n * r + h * v + l * I;
        c[7] = n * p + h * z + l * C;
        c[8] = s * k + m * q + i * t;
        c[9] = s * d + m * y + i * A;
        c[10] = s * r + m * v + i * I;
        c[11] = s * p + m * z + i * C;
        return this
    },
    scale: function(a) {
        var b = this.elements,
        c = a.x,
        d = a.y,
        a = a.z;
        b[0] *= c;
        b[4] *= d;
        b[8] *= a;
        b[1] *= c;
        b[5] *= d;
        b[9] *= a;
        b[2] *= c;
        b[6] *= d;
        b[10] *= a;
        b[3] *= c;
        b[7] *= d;
        b[11] *= a;
        return this
    },
    getMaxScaleOnAxis: function() {
        var a = this.elements;
        return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10])))
    },
    makeTranslation: function(a, b, c) {
        this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
        return this
    },
    makeRotationX: function(a) {
        var b = Math.cos(a),
        a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationY: function(a) {
        var b = Math.cos(a),
        a = Math.sin(a);
        this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationZ: function(a) {
        var b = Math.cos(a),
        a = Math.sin(a);
        this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationAxis: function(a, b) {
        var c = Math.cos(b),
        d = Math.sin(b),
        e = 1 - c,
        f = a.x,
        g = a.y,
        h = a.z,
        i = e * f,
        k = e * g;
        this.set(i * f + c, i * g - d * h, i * h + d * g, 0, i * g + d * h, k * g + c, k * h - d * f, 0, i * h - d * g, k * h + d * f, e * h * h + c, 0, 0, 0, 0, 1);
        return this
    },
    makeScale: function(a, b, c) {
        this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    makeFrustum: function(a, b, c, d, e, f) {
        var g = this.elements;
        g[0] = 2 * e / (b - a);
        g[4] = 0;
        g[8] = (b + a) / (b - a);
        g[12] = 0;
        g[1] = 0;
        g[5] = 2 * e / (d - c);
        g[9] = (d + c) / (d - c);
        g[13] = 0;
        g[2] = 0;
        g[6] = 0;
        g[10] = -(f + e) / (f - e);
        g[14] = -2 * f * e / (f - e);
        g[3] = 0;
        g[7] = 0;
        g[11] = -1;
        g[15] = 0;
        return this
    },
    makePerspective: function(a, b, c, d) {
        var a = c * Math.tan(THREE.Math.degToRad(0.5 * a)),
        e = -a;
        return this.makeFrustum(e * b, a * b, e, a, c, d)
    },
    makeOrthographic: function(a, b, c, d, e, f) {
        var g = this.elements,
        h = b - a,
        i = c - d,
        k = f - e;
        g[0] = 2 / h;
        g[4] = 0;
        g[8] = 0;
        g[12] = -((b + a) / h);
        g[1] = 0;
        g[5] = 2 / i;
        g[9] = 0;
        g[13] = -((c + d) / i);
        g[2] = 0;
        g[6] = 0;
        g[10] = -2 / k;
        g[14] = -((f + e) / k);
        g[3] = 0;
        g[7] = 0;
        g[11] = 0;
        g[15] = 1;
        return this
    },
    clone: function() {
        var a = this.elements;
        return new THREE.Matrix4(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
    }
});
THREE.Ray = function(a, b) {
    this.origin = void 0 !== a ? a: new THREE.Vector3;
    this.direction = void 0 !== b ? b: new THREE.Vector3
};
THREE.extend(THREE.Ray.prototype, {
    set: function(a, b) {
        this.origin.copy(a);
        this.direction.copy(b);
        return this
    },
    copy: function(a) {
        this.origin.copy(a.origin);
        this.direction.copy(a.direction);
        return this
    },
    at: function(a, b) {
        return (b || new THREE.Vector3).copy(this.direction).multiplyScalar(a).add(this.origin)
    },
    recast: function() {
        var a = new THREE.Vector3;
        return function(b) {
            this.origin.copy(this.at(b, a));
            return this
        }
    } (),
    closestPointToPoint: function(a, b) {
        var c = b || new THREE.Vector3;
        c.subVectors(a, this.origin);
        var d = c.dot(this.direction);
        return c.copy(this.direction).multiplyScalar(d).add(this.origin)
    },
    distanceToPoint: function() {
        var a = new THREE.Vector3;
        return function(b) {
            var c = a.subVectors(b, this.origin).dot(this.direction);
            a.copy(this.direction).multiplyScalar(c).add(this.origin);
            return a.distanceTo(b)
        }
    } (),
    isIntersectionSphere: function(a) {
        return this.distanceToPoint(a.center) <= a.radius
    },
    isIntersectionPlane: function(a) {
        return 0 != a.normal.dot(this.direction) || 0 == a.distanceToPoint(this.origin) ? !0 : !1
    },
    distanceToPlane: function(a) {
        var b = a.normal.dot(this.direction);
        if (0 == b) {
            if (0 == a.distanceToPoint(this.origin)) return 0
        } else return - (this.origin.dot(a.normal) + a.constant) / b
    },
    intersectPlane: function(a, b) {
        var c = this.distanceToPlane(a);
        return void 0 === c ? void 0 : this.at(c, b)
    },
    applyMatrix4: function(a) {
        this.direction.add(this.origin).applyMatrix4(a);
        this.origin.applyMatrix4(a);
        this.direction.sub(this.origin);
        return this
    },
    equals: function(a) {
        return a.origin.equals(this.origin) && a.direction.equals(this.direction)
    },
    clone: function() {
        return (new THREE.Ray).copy(this)
    }
});
THREE.Sphere = function(a, b) {
    this.center = void 0 !== a ? a: new THREE.Vector3;
    this.radius = void 0 !== b ? b: 0
};
THREE.extend(THREE.Sphere.prototype, {
    set: function(a, b) {
        this.center.copy(a);
        this.radius = b;
        return this
    },
    setFromCenterAndPoints: function(a, b) {
        for (var c = 0,
        d = 0,
        e = b.length; d < e; d++) var f = a.distanceToSquared(b[d]),
        c = Math.max(c, f);
        this.center = a;
        this.radius = Math.sqrt(c);
        return this
    },
    copy: function(a) {
        this.center.copy(a.center);
        this.radius = a.radius;
        return this
    },
    empty: function() {
        return 0 >= this.radius
    },
    containsPoint: function(a) {
        return a.distanceToSquared(this.center) <= this.radius * this.radius
    },
    distanceToPoint: function(a) {
        return a.distanceTo(this.center) - this.radius
    },
    intersectsSphere: function(a) {
        var b = this.radius + a.radius;
        return a.center.distanceToSquared(this.center) <= b * b
    },
    clampPoint: function(a, b) {
        var c = this.center.distanceToSquared(a),
        d = b || new THREE.Vector3;
        d.copy(a);
        c > this.radius * this.radius && (d.sub(this.center).normalize(), d.multiplyScalar(this.radius).add(this.center));
        return d
    },
    getBoundingBox: function(a) {
        a = a || new THREE.Box3;
        a.set(this.center, this.center);
        a.expandByScalar(this.radius);
        return a
    },
    applyMatrix4: function(a) {
        this.center.applyMatrix4(a);
        this.radius *= a.getMaxScaleOnAxis();
        return this
    },
    translate: function(a) {
        this.center.add(a);
        return this
    },
    equals: function(a) {
        return a.center.equals(this.center) && a.radius === this.radius
    },
    clone: function() {
        return (new THREE.Sphere).copy(this)
    }
});
THREE.Frustum = function(a, b, c, d, e, f) {
    this.planes = [void 0 !== a ? a: new THREE.Plane, void 0 !== b ? b: new THREE.Plane, void 0 !== c ? c: new THREE.Plane, void 0 !== d ? d: new THREE.Plane, void 0 !== e ? e: new THREE.Plane, void 0 !== f ? f: new THREE.Plane]
};
THREE.extend(THREE.Frustum.prototype, {
    set: function(a, b, c, d, e, f) {
        var g = this.planes;
        g[0].copy(a);
        g[1].copy(b);
        g[2].copy(c);
        g[3].copy(d);
        g[4].copy(e);
        g[5].copy(f);
        return this
    },
    copy: function(a) {
        for (var b = this.planes,
        c = 0; 6 > c; c++) b[c].copy(a.planes[c]);
        return this
    },
    setFromMatrix: function(a) {
        var b = this.planes,
        c = a.elements,
        a = c[0],
        d = c[1],
        e = c[2],
        f = c[3],
        g = c[4],
        h = c[5],
        i = c[6],
        k = c[7],
        l = c[8],
        m = c[9],
        n = c[10],
        s = c[11],
        r = c[12],
        p = c[13],
        q = c[14],
        c = c[15];
        b[0].setComponents(f - a, k - g, s - l, c - r).normalize();
        b[1].setComponents(f + a, k + g, s + l, c + r).normalize();
        b[2].setComponents(f + d, k + h, s + m, c + p).normalize();
        b[3].setComponents(f - d, k - h, s - m, c - p).normalize();
        b[4].setComponents(f - e, k - i, s - n, c - q).normalize();
        b[5].setComponents(f + e, k + i, s + n, c + q).normalize();
        return this
    },
    intersectsObject: function() {
        var a = new THREE.Vector3;
        return function(b) {
            var c = b.matrixWorld,
            d = this.planes,
            b = -b.geometry.boundingSphere.radius * c.getMaxScaleOnAxis();
            a.getPositionFromMatrix(c);
            for (c = 0; 6 > c; c++) if (d[c].distanceToPoint(a) < b) return ! 1;
            return ! 0
        }
    } (),
    intersectsSphere: function(a) {
        for (var b = this.planes,
        c = a.center,
        a = -a.radius,
        d = 0; 6 > d; d++) if (b[d].distanceToPoint(c) < a) return ! 1;
        return ! 0
    },
    containsPoint: function(a) {
        for (var b = this.planes,
        c = 0; 6 > c; c++) if (0 > b[c].distanceToPoint(a)) return ! 1;
        return ! 0
    },
    clone: function() {
        return (new THREE.Frustum).copy(this)
    }
});
THREE.Plane = function(a, b) {
    this.normal = void 0 !== a ? a: new THREE.Vector3(1, 0, 0);
    this.constant = void 0 !== b ? b: 0
};
THREE.extend(THREE.Plane.prototype, {
    set: function(a, b) {
        this.normal.copy(a);
        this.constant = b;
        return this
    },
    setComponents: function(a, b, c, d) {
        this.normal.set(a, b, c);
        this.constant = d;
        return this
    },
    setFromNormalAndCoplanarPoint: function(a, b) {
        this.normal.copy(a);
        this.constant = -b.dot(this.normal);
        return this
    },
    setFromCoplanarPoints: function() {
        var a = new THREE.Vector3,
        b = new THREE.Vector3;
        return function(c, d, e) {
            d = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
            this.setFromNormalAndCoplanarPoint(d, c);
            return this
        }
    } (),
    copy: function(a) {
        this.normal.copy(a.normal);
        this.constant = a.constant;
        return this
    },
    normalize: function() {
        var a = 1 / this.normal.length();
        this.normal.multiplyScalar(a);
        this.constant *= a;
        return this
    },
    negate: function() {
        this.constant *= -1;
        this.normal.negate();
        return this
    },
    distanceToPoint: function(a) {
        return this.normal.dot(a) + this.constant
    },
    distanceToSphere: function(a) {
        return this.distanceToPoint(a.center) - a.radius
    },
    projectPoint: function(a, b) {
        return this.orthoPoint(a, b).sub(a).negate()
    },
    orthoPoint: function(a, b) {
        var c = this.distanceToPoint(a);
        return (b || new THREE.Vector3).copy(this.normal).multiplyScalar(c)
    },
    isIntersectionLine: function(a) {
        var b = this.distanceToPoint(a.start),
        a = this.distanceToPoint(a.end);
        return 0 > b && 0 < a || 0 > a && 0 < b
    },
    intersectLine: function() {
        var a = new THREE.Vector3;
        return function(b, c) {
            var d = c || new THREE.Vector3,
            e = b.delta(a),
            f = this.normal.dot(e);
            if (0 == f) {
                if (0 == this.distanceToPoint(b.start)) return d.copy(b.start)
            } else return f = -(b.start.dot(this.normal) + this.constant) / f,
            0 > f || 1 < f ? void 0 : d.copy(e).multiplyScalar(f).add(b.start)
        }
    } (),
    coplanarPoint: function(a) {
        return (a || new THREE.Vector3).copy(this.normal).multiplyScalar( - this.constant)
    },
    applyMatrix4: function() {
        var a = new THREE.Vector3,
        b = new THREE.Vector3;
        return function(c, d) {
            var d = d || (new THREE.Matrix3).getInverse(c).transpose(),
            e = a.copy(this.normal).applyMatrix3(d),
            f = this.coplanarPoint(b);
            f.applyMatrix4(c);
            this.setFromNormalAndCoplanarPoint(e, f);
            return this
        }
    } (),
    translate: function(a) {
        this.constant -= a.dot(this.normal);
        return this
    },
    equals: function(a) {
        return a.normal.equals(this.normal) && a.constant == this.constant
    },
    clone: function() {
        return (new THREE.Plane).copy(this)
    }
});
THREE.Math = {
    clamp: function(a, b, c) {
        return a < b ? b: a > c ? c: a
    },
    clampBottom: function(a, b) {
        return a < b ? b: a
    },
    mapLinear: function(a, b, c, d, e) {
        return d + (a - b) * (e - d) / (c - b)
    },
    smoothstep: function(a, b, c) {
        if (a <= b) return 0;
        if (a >= c) return 1;
        a = (a - b) / (c - b);
        return a * a * (3 - 2 * a)
    },
    smootherstep: function(a, b, c) {
        if (a <= b) return 0;
        if (a >= c) return 1;
        a = (a - b) / (c - b);
        return a * a * a * (a * (6 * a - 15) + 10)
    },
    random16: function() {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    randInt: function(a, b) {
        return a + Math.floor(Math.random() * (b - a + 1))
    },
    randFloat: function(a, b) {
        return a + Math.random() * (b - a)
    },
    randFloatSpread: function(a) {
        return a * (0.5 - Math.random())
    },
    sign: function(a) {
        return 0 > a ? -1 : 0 < a ? 1 : 0
    },
    degToRad: function() {
        var a = Math.PI / 180;
        return function(b) {
            return b * a
        }
    } (),
    radToDeg: function() {
        var a = 180 / Math.PI;
        return function(b) {
            return b * a
        }
    } ()
};
THREE.Spline = function(a) {
    function b(a, b, c, d, e, f, g) {
        a = 0.5 * (c - a);
        d = 0.5 * (d - b);
        return (2 * (b - c) + a + d) * g + ( - 3 * (b - c) - 2 * a - d) * f + a * e + b
    }
    this.points = a;
    var c = [],
    d = {
        x: 0,
        y: 0,
        z: 0
    },
    e,
    f,
    g,
    h,
    i,
    k,
    l,
    m,
    n;
    this.initFromArray = function(a) {
        this.points = [];
        for (var b = 0; b < a.length; b++) this.points[b] = {
            x: a[b][0],
            y: a[b][1],
            z: a[b][2]
        }
    };
    this.getPoint = function(a) {
        e = (this.points.length - 1) * a;
        f = Math.floor(e);
        g = e - f;
        c[0] = 0 === f ? f: f - 1;
        c[1] = f;
        c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
        c[3] = f > this.points.length - 3 ? this.points.length - 1 : f + 2;
        k = this.points[c[0]];
        l = this.points[c[1]];
        m = this.points[c[2]];
        n = this.points[c[3]];
        h = g * g;
        i = g * h;
        d.x = b(k.x, l.x, m.x, n.x, g, h, i);
        d.y = b(k.y, l.y, m.y, n.y, g, h, i);
        d.z = b(k.z, l.z, m.z, n.z, g, h, i);
        return d
    };
    this.getControlPointsArray = function() {
        var a, b, c = this.points.length,
        d = [];
        for (a = 0; a < c; a++) b = this.points[a],
        d[a] = [b.x, b.y, b.z];
        return d
    };
    this.getLength = function(a) {
        var b, c, d, e = b = b = 0,
        f = new THREE.Vector3,
        g = new THREE.Vector3,
        h = [],
        i = 0;
        h[0] = 0;
        a || (a = 100);
        c = this.points.length * a;
        f.copy(this.points[0]);
        for (a = 1; a < c; a++) b = a / c,
        d = this.getPoint(b),
        g.copy(d),
        i += g.distanceTo(f),
        f.copy(d),
        b *= this.points.length - 1,
        b = Math.floor(b),
        b != e && (h[b] = i, e = b);
        h[h.length] = i;
        return {
            chunks: h,
            total: i
        }
    };
    this.reparametrizeByArcLength = function(a) {
        var b, c, d, e, f, g, h = [],
        i = new THREE.Vector3,
        k = this.getLength();
        h.push(i.copy(this.points[0]).clone());
        for (b = 1; b < this.points.length; b++) {
            c = k.chunks[b] - k.chunks[b - 1];
            g = Math.ceil(a * c / k.total);
            e = (b - 1) / (this.points.length - 1);
            f = b / (this.points.length - 1);
            for (c = 1; c < g - 1; c++) d = e + c * (1 / g) * (f - e),
            d = this.getPoint(d),
            h.push(i.copy(d).clone());
            h.push(i.copy(this.points[b]).clone())
        }
        this.points = h
    }
};
THREE.Triangle = function(a, b, c) {
    this.a = void 0 !== a ? a: new THREE.Vector3;
    this.b = void 0 !== b ? b: new THREE.Vector3;
    this.c = void 0 !== c ? c: new THREE.Vector3
};
THREE.Triangle.normal = function() {
    var a = new THREE.Vector3;
    return function(b, c, d, e) {
        e = e || new THREE.Vector3;
        e.subVectors(d, c);
        a.subVectors(b, c);
        e.cross(a);
        b = e.lengthSq();
        return 0 < b ? e.multiplyScalar(1 / Math.sqrt(b)) : e.set(0, 0, 0)
    }
} ();
THREE.Triangle.barycoordFromPoint = function() {
    var a = new THREE.Vector3,
    b = new THREE.Vector3,
    c = new THREE.Vector3;
    return function(d, e, f, g, h) {
        a.subVectors(g, e);
        b.subVectors(f, e);
        c.subVectors(d, e);
        var d = a.dot(a),
        e = a.dot(b),
        f = a.dot(c),
        i = b.dot(b),
        g = b.dot(c),
        k = d * i - e * e,
        h = h || new THREE.Vector3;
        if (0 == k) return h.set( - 2, -1, -1);
        k = 1 / k;
        i = (i * f - e * g) * k;
        d = (d * g - e * f) * k;
        return h.set(1 - i - d, d, i)
    }
} ();
THREE.Triangle.containsPoint = function() {
    var a = new THREE.Vector3;
    return function(b, c, d, e) {
        b = THREE.Triangle.barycoordFromPoint(b, c, d, e, a);
        return 0 <= b.x && 0 <= b.y && 1 >= b.x + b.y
    }
} ();
THREE.extend(THREE.Triangle.prototype, {
    constructor: THREE.Triangle,
    set: function(a, b, c) {
        this.a.copy(a);
        this.b.copy(b);
        this.c.copy(c);
        return this
    },
    setFromPointsAndIndices: function(a, b, c, d) {
        this.a.copy(a[b]);
        this.b.copy(a[c]);
        this.c.copy(a[d]);
        return this
    },
    copy: function(a) {
        this.a.copy(a.a);
        this.b.copy(a.b);
        this.c.copy(a.c);
        return this
    },
    area: function() {
        var a = new THREE.Vector3,
        b = new THREE.Vector3;
        return function() {
            a.subVectors(this.c, this.b);
            b.subVectors(this.a, this.b);
            return 0.5 * a.cross(b).length()
        }
    } (),
    midpoint: function(a) {
        return (a || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    },
    normal: function(a) {
        return THREE.Triangle.normal(this.a, this.b, this.c, a)
    },
    plane: function(a) {
        return (a || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
    },
    barycoordFromPoint: function(a, b) {
        return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b)
    },
    containsPoint: function(a) {
        return THREE.Triangle.containsPoint(a, this.a, this.b, this.c)
    },
    equals: function(a) {
        return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
    },
    clone: function() {
        return (new THREE.Triangle).copy(this)
    }
});
THREE.Vertex = function(a) {
    console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");
    return a
};
THREE.UV = function(a, b) {
    console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead.");
    return new THREE.Vector2(a, b)
};
THREE.Clock = function(a) {
    this.autoStart = void 0 !== a ? a: !0;
    this.elapsedTime = this.oldTime = this.startTime = 0;
    this.running = !1
};
THREE.extend(THREE.Clock.prototype, {
    start: function() {
        this.oldTime = this.startTime = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
        this.running = !0
    },
    stop: function() {
        this.getElapsedTime();
        this.running = !1
    },
    getElapsedTime: function() {
        this.getDelta();
        return this.elapsedTime
    },
    getDelta: function() {
        var a = 0;
        this.autoStart && !this.running && this.start();
        if (this.running) {
            var b = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(),
            a = 0.001 * (b - this.oldTime);
            this.oldTime = b;
            this.elapsedTime += a
        }
        return a
    }
});
THREE.EventDispatcher = function() {
    var a = {};
    this.addEventListener = function(b, c) {
        void 0 === a[b] && (a[b] = []); - 1 === a[b].indexOf(c) && a[b].push(c)
    };
    this.removeEventListener = function(b, c) {
        var d = a[b].indexOf(c); - 1 !== d && a[b].splice(d, 1)
    };
    this.dispatchEvent = function(b) {
        var c = a[b.type];
        if (void 0 !== c) {
            b.target = this;
            for (var d = 0,
            e = c.length; d < e; d++) c[d].call(this, b)
        }
    }
}; (function(a) {
    a.Raycaster = function(b, c, d, e) {
        this.ray = new a.Ray(b, c);
        0 < this.ray.direction.lengthSq() && this.ray.direction.normalize();
        this.near = d || 0;
        this.far = e || Infinity
    };
    var b = new a.Sphere,
    c = new a.Ray,
    d = new a.Plane,
    e = new a.Vector3,
    f = new a.Vector3,
    g = new a.Matrix4,
    h = function(a, b) {
        return a.distance - b.distance
    },
    i = function(h, i, k) {
        if (h instanceof a.Particle) {
            f.getPositionFromMatrix(h.matrixWorld);
            i = i.ray.distanceToPoint(f);
            if (i > h.scale.x) return k;
            k.push({
                distance: i,
                point: h.position,
                face: null,
                object: h
            })
        } else if (h instanceof a.Mesh) {
            f.getPositionFromMatrix(h.matrixWorld);
            b.set(f, h.geometry.boundingSphere.radius * h.matrixWorld.getMaxScaleOnAxis());
            if (!i.ray.isIntersectionSphere(b)) return k;
            var s = h.geometry,
            r = s.vertices,
            p = h.material instanceof a.MeshFaceMaterial,
            q = !0 === p ? h.material.materials: null,
            y = h.material.side,
            v,
            z,
            t,
            A = i.precision;
            h.matrixRotationWorld.extractRotation(h.matrixWorld);
            g.getInverse(h.matrixWorld);
            c.copy(i.ray).applyMatrix4(g);
            for (var I = 0,
            C = s.faces.length; I < C; I++) {
                var x = s.faces[I],
                y = !0 === p ? q[x.materialIndex] : h.material;
                if (void 0 !== y) {
                    d.setFromNormalAndCoplanarPoint(x.normal, r[x.a]);
                    var G = c.distanceToPlane(d);
                    if (! (Math.abs(G) < A) && !(0 > G)) {
                        y = y.side;
                        if (y !== a.DoubleSide && (v = c.direction.dot(d.normal), !(y === a.FrontSide ? 0 > v: 0 < v))) continue;
                        if (! (G < i.near || G > i.far)) {
                            e = c.at(G, e);
                            if (x instanceof a.Face3) {
                                if (y = r[x.a], v = r[x.b], z = r[x.c], !a.Triangle.containsPoint(e, y, v, z)) continue
                            } else if (x instanceof a.Face4) {
                                if (y = r[x.a], v = r[x.b], z = r[x.c], t = r[x.d], !a.Triangle.containsPoint(e, y, v, t) && !a.Triangle.containsPoint(e, v, z, t)) continue
                            } else throw Error("face type not supported");
                            k.push({
                                distance: G,
                                point: i.ray.at(G),
                                face: x,
                                faceIndex: I,
                                object: h
                            })
                        }
                    }
                }
            }
        }
    },
    k = function(a, b, c) {
        for (var a = a.getDescendants(), d = 0, e = a.length; d < e; d++) i(a[d], b, c)
    };
    a.Raycaster.prototype.precision = 1E-4;
    a.Raycaster.prototype.set = function(a, b) {
        this.ray.set(a, b);
        0 < this.ray.direction.length() && this.ray.direction.normalize()
    };
    a.Raycaster.prototype.intersectObject = function(a, b) {
        var c = []; ! 0 === b && k(a, this, c);
        i(a, this, c);
        c.sort(h);
        return c
    };
    a.Raycaster.prototype.intersectObjects = function(a, b) {
        for (var c = [], d = 0, e = a.length; d < e; d++) i(a[d], this, c),
        !0 === b && k(a[d], this, c);
        c.sort(h);
        return c
    }
})(THREE);
THREE.Object3D = function() {
    this.id = THREE.Object3DIdCount++;
    this.name = "";
    this.properties = {};
    this.parent = void 0;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3;
    this.rotation = new THREE.Vector3;
    this.eulerOrder = THREE.Object3D.defaultEulerOrder;
    this.scale = new THREE.Vector3(1, 1, 1);
    this.renderDepth = null;
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixRotationWorld = new THREE.Matrix4;
    this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
    this.quaternion = new THREE.Quaternion;
    this.useQuaternion = !1;
    this.visible = !0;
    this.receiveShadow = this.castShadow = !1;
    this.frustumCulled = !0;
    this._vector = new THREE.Vector3
};
THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function(a) {
        this.matrix.multiplyMatrices(a, this.matrix);
        this.scale.getScaleFromMatrix(this.matrix);
        a = (new THREE.Matrix4).extractRotation(this.matrix);
        this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
        this.position.getPositionFromMatrix(this.matrix)
    },
    translate: function(a, b) {
        this.matrix.rotateAxis(b);
        this.position.add(b.multiplyScalar(a))
    },
    translateX: function(a) {
        this.translate(a, this._vector.set(1, 0, 0))
    },
    translateY: function(a) {
        this.translate(a, this._vector.set(0, 1, 0))
    },
    translateZ: function(a) {
        this.translate(a, this._vector.set(0, 0, 1))
    },
    localToWorld: function(a) {
        return a.applyMatrix4(this.matrixWorld)
    },
    worldToLocal: function(a) {
        return a.applyMatrix4(THREE.Object3D.__m1.getInverse(this.matrixWorld))
    },
    lookAt: function(a) {
        this.matrix.lookAt(a, this.position, this.up);
        this.rotationAutoUpdate && (!1 === this.useQuaternion ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder) : this.quaternion.copy(this.matrix.decompose()[1]))
    },
    add: function(a) {
        if (a === this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
        else if (a instanceof THREE.Object3D) {
            void 0 !== a.parent && a.parent.remove(a);
            a.parent = this;
            this.children.push(a);
            for (var b = this; void 0 !== b.parent;) b = b.parent;
            void 0 !== b && b instanceof THREE.Scene && b.__addObject(a)
        }
    },
    remove: function(a) {
        var b = this.children.indexOf(a);
        if ( - 1 !== b) {
            a.parent = void 0;
            this.children.splice(b, 1);
            for (b = this; void 0 !== b.parent;) b = b.parent;
            void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a)
        }
    },
    traverse: function(a) {
        a(this);
        for (var b = 0,
        c = this.children.length; b < c; b++) this.children[b].traverse(a)
    },
    getChildByName: function(a, b) {
        for (var c = 0,
        d = this.children.length; c < d; c++) {
            var e = this.children[c];
            if (e.name === a || !0 === b && (e = e.getChildByName(a, b), void 0 !== e)) return e
        }
    },
    getDescendants: function(a) {
        void 0 === a && (a = []);
        Array.prototype.push.apply(a, this.children);
        for (var b = 0,
        c = this.children.length; b < c; b++) this.children[b].getDescendants(a);
        return a
    },
    updateMatrix: function() {
        this.matrix.setPosition(this.position); ! 1 === this.useQuaternion ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder) : this.matrix.setRotationFromQuaternion(this.quaternion); (1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z) && this.matrix.scale(this.scale);
        this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function(a) { ! 0 === this.matrixAutoUpdate && this.updateMatrix();
        if (!0 === this.matrixWorldNeedsUpdate || !0 === a) void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        this.matrixWorldNeedsUpdate = !1,
        a = !0;
        for (var b = 0,
        c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
    },
    clone: function(a) {
        void 0 === a && (a = new THREE.Object3D);
        a.name = this.name;
        a.up.copy(this.up);
        a.position.copy(this.position);
        a.rotation instanceof THREE.Vector3 && a.rotation.copy(this.rotation);
        a.eulerOrder = this.eulerOrder;
        a.scale.copy(this.scale);
        a.renderDepth = this.renderDepth;
        a.rotationAutoUpdate = this.rotationAutoUpdate;
        a.matrix.copy(this.matrix);
        a.matrixWorld.copy(this.matrixWorld);
        a.matrixRotationWorld.copy(this.matrixRotationWorld);
        a.matrixAutoUpdate = this.matrixAutoUpdate;
        a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
        a.quaternion.copy(this.quaternion);
        a.useQuaternion = this.useQuaternion;
        a.visible = this.visible;
        a.castShadow = this.castShadow;
        a.receiveShadow = this.receiveShadow;
        a.frustumCulled = this.frustumCulled;
        for (var b = 0; b < this.children.length; b++) a.add(this.children[b].clone());
        return a
    }
};
THREE.Object3D.__m1 = new THREE.Matrix4;
THREE.Object3D.defaultEulerOrder = "XYZ";
THREE.Object3DIdCount = 0;
THREE.Projector = function() {
    function a() {
        if (f === h) {
            var a = new THREE.RenderableObject;
            g.push(a);
            h++;
            f++;
            return a
        }
        return g[f++]
    }
    function b() {
        if (k === m) {
            var a = new THREE.RenderableVertex;
            l.push(a);
            m++;
            k++;
            return a
        }
        return l[k++]
    }
    function c(a, b) {
        return b.z - a.z
    }
    function d(a, b) {
        var c = 0,
        d = 1,
        e = a.z + a.w,
        f = b.z + b.w,
        g = -a.z + a.w,
        h = -b.z + b.w;
        if (0 <= e && 0 <= f && 0 <= g && 0 <= h) return ! 0;
        if (0 > e && 0 > f || 0 > g && 0 > h) return ! 1;
        0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f)));
        0 > g ? c = Math.max(c, g / (g - h)) : 0 > h && (d = Math.min(d, g / (g - h)));
        if (d < c) return ! 1;
        a.lerp(b, c);
        b.lerp(a, 1 - d);
        return ! 0
    }
    var e, f, g = [],
    h = 0,
    i,
    k,
    l = [],
    m = 0,
    n,
    s,
    r = [],
    p = 0,
    q,
    y = [],
    v = 0,
    z,
    t,
    A = [],
    I = 0,
    C,
    x,
    G = [],
    J = 0,
    E = {
        objects: [],
        sprites: [],
        lights: [],
        elements: []
    },
    H = new THREE.Vector3,
    B = new THREE.Vector4,
    W = new THREE.Box3(new THREE.Vector3( - 1, -1, -1), new THREE.Vector3(1, 1, 1)),
    F = new THREE.Box3,
    K = Array(3),
    L = Array(4),
    U = new THREE.Matrix4,
    fa = new THREE.Matrix4,
    Ca,
    $a = new THREE.Matrix4,
    M = new THREE.Matrix3,
    ca = new THREE.Matrix3,
    qa = new THREE.Vector3,
    ha = new THREE.Frustum,
    ra = new THREE.Vector4,
    N = new THREE.Vector4;
    this.projectVector = function(a, b) {
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        fa.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
        return a.applyProjection(fa)
    };
    this.unprojectVector = function(a, b) {
        b.projectionMatrixInverse.getInverse(b.projectionMatrix);
        fa.multiplyMatrices(b.matrixWorld, b.projectionMatrixInverse);
        return a.applyProjection(fa)
    };
    this.pickingRay = function(a, b) {
        a.z = -1;
        var c = new THREE.Vector3(a.x, a.y, 1);
        this.unprojectVector(a, b);
        this.unprojectVector(c, b);
        c.sub(a).normalize();
        return new THREE.Raycaster(a, c)
    };
    this.projectScene = function(g, h, m, Pa) {
        var ta = !1,
        ka, aa, pa, Y, da, la, Z, oa, gb, nb, ia, Wa, ab;
        x = t = q = s = 0;
        E.elements.length = 0;
        g.updateMatrixWorld();
        void 0 === h.parent && h.updateMatrixWorld();
        U.copy(h.matrixWorldInverse.getInverse(h.matrixWorld));
        fa.multiplyMatrices(h.projectionMatrix, U);
        ca.getInverse(U);
        ca.transpose();
        ha.setFromMatrix(fa);
        f = 0;
        E.objects.length = 0;
        E.sprites.length = 0;
        E.lights.length = 0;
        var Fa = function(b) {
            for (var c = 0,
            d = b.children.length; c < d; c++) {
                var f = b.children[c];
                if (!1 !== f.visible) {
                    if (f instanceof THREE.Light) E.lights.push(f);
                    else if (f instanceof THREE.Mesh || f instanceof THREE.Line) {
                        if (!1 === f.frustumCulled || !0 === ha.intersectsObject(f)) e = a(),
                        e.object = f,
                        null !== f.renderDepth ? e.z = f.renderDepth: (H.getPositionFromMatrix(f.matrixWorld), H.applyProjection(fa), e.z = H.z),
                        E.objects.push(e)
                    } else f instanceof THREE.Sprite || f instanceof THREE.Particle ? (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth: (H.getPositionFromMatrix(f.matrixWorld), H.applyProjection(fa), e.z = H.z), E.sprites.push(e)) : (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth: (H.getPositionFromMatrix(f.matrixWorld), H.applyProjection(fa), e.z = H.z), E.objects.push(e));
                    Fa(f)
                }
            }
        };
        Fa(g); ! 0 === m && E.objects.sort(c);
        g = 0;
        for (m = E.objects.length; g < m; g++) if (oa = E.objects[g].object, Ca = oa.matrixWorld, k = 0, oa instanceof THREE.Mesh) {
            gb = oa.geometry;
            pa = gb.vertices;
            nb = gb.faces;
            gb = gb.faceVertexUvs;
            M.getInverse(Ca);
            M.transpose();
            Wa = oa.material instanceof THREE.MeshFaceMaterial;
            ab = !0 === Wa ? oa.material: null;
            ka = 0;
            for (aa = pa.length; ka < aa; ka++) i = b(),
            i.positionWorld.copy(pa[ka]).applyMatrix4(Ca),
            i.positionScreen.copy(i.positionWorld).applyMatrix4(fa),
            i.positionScreen.x /= i.positionScreen.w,
            i.positionScreen.y /= i.positionScreen.w,
            i.positionScreen.z /= i.positionScreen.w,
            i.visible = !( - 1 > i.positionScreen.x || 1 < i.positionScreen.x || -1 > i.positionScreen.y || 1 < i.positionScreen.y || -1 > i.positionScreen.z || 1 < i.positionScreen.z);
            pa = 0;
            for (ka = nb.length; pa < ka; pa++) {
                aa = nb[pa];
                var Xa = !0 === Wa ? ab.materials[aa.materialIndex] : oa.material;
                if (void 0 !== Xa) {
                    la = Xa.side;
                    if (aa instanceof THREE.Face3) if (Y = l[aa.a], da = l[aa.b], Z = l[aa.c], K[0] = Y.positionScreen, K[1] = da.positionScreen, K[2] = Z.positionScreen, !0 === Y.visible || !0 === da.visible || !0 === Z.visible || W.isIntersectionBox(F.setFromPoints(K))) if (ta = 0 > (Z.positionScreen.x - Y.positionScreen.x) * (da.positionScreen.y - Y.positionScreen.y) - (Z.positionScreen.y - Y.positionScreen.y) * (da.positionScreen.x - Y.positionScreen.x), la === THREE.DoubleSide || ta === (la === THREE.FrontSide)) s === p ? (ia = new THREE.RenderableFace3, r.push(ia), p++, s++, n = ia) : n = r[s++],
                    n.v1.copy(Y),
                    n.v2.copy(da),
                    n.v3.copy(Z);
                    else continue;
                    else continue;
                    else if (aa instanceof THREE.Face4) if (Y = l[aa.a], da = l[aa.b], Z = l[aa.c], ia = l[aa.d], L[0] = Y.positionScreen, L[1] = da.positionScreen, L[2] = Z.positionScreen, L[3] = ia.positionScreen, !0 === Y.visible || !0 === da.visible || !0 === Z.visible || !0 === ia.visible || W.isIntersectionBox(F.setFromPoints(L))) if (ta = 0 > (ia.positionScreen.x - Y.positionScreen.x) * (da.positionScreen.y - Y.positionScreen.y) - (ia.positionScreen.y - Y.positionScreen.y) * (da.positionScreen.x - Y.positionScreen.x) || 0 > (da.positionScreen.x - Z.positionScreen.x) * (ia.positionScreen.y - Z.positionScreen.y) - (da.positionScreen.y - Z.positionScreen.y) * (ia.positionScreen.x - Z.positionScreen.x), la === THREE.DoubleSide || ta === (la === THREE.FrontSide)) {
                        if (q === v) {
                            var ub = new THREE.RenderableFace4;
                            y.push(ub);
                            v++;
                            q++;
                            n = ub
                        } else n = y[q++];
                        n.v1.copy(Y);
                        n.v2.copy(da);
                        n.v3.copy(Z);
                        n.v4.copy(ia)
                    } else continue;
                    else continue;
                    n.normalModel.copy(aa.normal); ! 1 === ta && (la === THREE.BackSide || la === THREE.DoubleSide) && n.normalModel.negate();
                    n.normalModel.applyMatrix3(M).normalize();
                    n.normalModelView.copy(n.normalModel).applyMatrix3(ca);
                    n.centroidModel.copy(aa.centroid).applyMatrix4(Ca);
                    Z = aa.vertexNormals;
                    Y = 0;
                    for (da = Z.length; Y < da; Y++) ia = n.vertexNormalsModel[Y],
                    ia.copy(Z[Y]),
                    !1 === ta && (la === THREE.BackSide || la === THREE.DoubleSide) && ia.negate(),
                    ia.applyMatrix3(M).normalize(),
                    n.vertexNormalsModelView[Y].copy(ia).applyMatrix3(ca);
                    n.vertexNormalsLength = Z.length;
                    Y = 0;
                    for (da = gb.length; Y < da; Y++) if (ia = gb[Y][pa], void 0 !== ia) {
                        la = 0;
                        for (Z = ia.length; la < Z; la++) n.uvs[Y][la] = ia[la]
                    }
                    n.color = aa.color;
                    n.material = Xa;
                    qa.copy(n.centroidModel).applyProjection(fa);
                    n.z = qa.z;
                    E.elements.push(n)
                }
            }
        } else if (oa instanceof THREE.Line) {
            $a.multiplyMatrices(fa, Ca);
            pa = oa.geometry.vertices;
            Y = b();
            Y.positionScreen.copy(pa[0]).applyMatrix4($a);
            nb = oa.type === THREE.LinePieces ? 2 : 1;
            ka = 1;
            for (aa = pa.length; ka < aa; ka++) Y = b(),
            Y.positionScreen.copy(pa[ka]).applyMatrix4($a),
            0 < (ka + 1) % nb || (da = l[k - 2], ra.copy(Y.positionScreen), N.copy(da.positionScreen), !0 === d(ra, N) && (ra.multiplyScalar(1 / ra.w), N.multiplyScalar(1 / N.w), t === I ? (gb = new THREE.RenderableLine, A.push(gb), I++, t++, z = gb) : z = A[t++], z.v1.positionScreen.copy(ra), z.v2.positionScreen.copy(N), z.z = Math.max(ra.z, N.z), z.material = oa.material, E.elements.push(z)))
        }
        g = 0;
        for (m = E.sprites.length; g < m; g++) oa = E.sprites[g].object,
        Ca = oa.matrixWorld,
        oa instanceof THREE.Particle && (B.set(Ca.elements[12], Ca.elements[13], Ca.elements[14], 1), B.applyMatrix4(fa), B.z /= B.w, 0 < B.z && 1 > B.z && (x === J ? (ta = new THREE.RenderableParticle, G.push(ta), J++, x++, C = ta) : C = G[x++], C.object = oa, C.x = B.x / B.w, C.y = B.y / B.w, C.z = B.z, C.rotation = oa.rotation.z, C.scale.x = oa.scale.x * Math.abs(C.x - (B.x + h.projectionMatrix.elements[0]) / (B.w + h.projectionMatrix.elements[12])), C.scale.y = oa.scale.y * Math.abs(C.y - (B.y + h.projectionMatrix.elements[5]) / (B.w + h.projectionMatrix.elements[13])), C.material = oa.material, E.elements.push(C))); ! 0 === Pa && E.elements.sort(c);
        return E
    }
};
THREE.Face3 = function(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = d instanceof THREE.Vector3 ? d: new THREE.Vector3;
    this.vertexNormals = d instanceof Array ? d: [];
    this.color = e instanceof THREE.Color ? e: new THREE.Color;
    this.vertexColors = e instanceof Array ? e: [];
    this.vertexTangents = [];
    this.materialIndex = void 0 !== f ? f: 0;
    this.centroid = new THREE.Vector3
};
THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function() {
        var a = new THREE.Face3(this.a, this.b, this.c);
        a.normal.copy(this.normal);
        a.color.copy(this.color);
        a.centroid.copy(this.centroid);
        a.materialIndex = this.materialIndex;
        var b, c;
        b = 0;
        for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        b = 0;
        for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        b = 0;
        for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
};
THREE.Face4 = function(a, b, c, d, e, f, g) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.normal = e instanceof THREE.Vector3 ? e: new THREE.Vector3;
    this.vertexNormals = e instanceof Array ? e: [];
    this.color = f instanceof THREE.Color ? f: new THREE.Color;
    this.vertexColors = f instanceof Array ? f: [];
    this.vertexTangents = [];
    this.materialIndex = void 0 !== g ? g: 0;
    this.centroid = new THREE.Vector3
};
THREE.Face4.prototype = {
    constructor: THREE.Face4,
    clone: function() {
        var a = new THREE.Face4(this.a, this.b, this.c, this.d);
        a.normal.copy(this.normal);
        a.color.copy(this.color);
        a.centroid.copy(this.centroid);
        a.materialIndex = this.materialIndex;
        var b, c;
        b = 0;
        for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        b = 0;
        for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        b = 0;
        for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
};
THREE.Geometry = function() {
    THREE.EventDispatcher.call(this);
    this.id = THREE.GeometryIdCount++;
    this.name = "";
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.faces = [];
    this.faceUvs = [[]];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphColors = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.lineDistances = [];
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = !1;
    this.dynamic = !0;
    this.buffersNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
};
THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function(a) {
        for (var b = (new THREE.Matrix3).getInverse(a).transpose(), c = 0, d = this.vertices.length; c < d; c++) this.vertices[c].applyMatrix4(a);
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            var e = this.faces[c];
            e.normal.applyMatrix3(b).normalize();
            for (var f = 0,
            g = e.vertexNormals.length; f < g; f++) e.vertexNormals[f].applyMatrix3(b).normalize();
            e.centroid.applyMatrix4(a)
        }
    },
    computeCentroids: function() {
        var a, b, c;
        a = 0;
        for (b = this.faces.length; a < b; a++) c = this.faces[a],
        c.centroid.set(0, 0, 0),
        c instanceof THREE.Face3 ? (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.divideScalar(3)) : c instanceof THREE.Face4 && (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.add(this.vertices[c.d]), c.centroid.divideScalar(4))
    },
    computeFaceNormals: function() {
        for (var a = new THREE.Vector3,
        b = new THREE.Vector3,
        c = 0,
        d = this.faces.length; c < d; c++) {
            var e = this.faces[c],
            f = this.vertices[e.a],
            g = this.vertices[e.b];
            a.subVectors(this.vertices[e.c], g);
            b.subVectors(f, g);
            a.cross(b);
            a.normalize();
            e.normal.copy(a)
        }
    },
    computeVertexNormals: function(a) {
        var b, c, d, e;
        if (void 0 === this.__tmpVertices) {
            e = this.__tmpVertices = Array(this.vertices.length);
            b = 0;
            for (c = this.vertices.length; b < c; b++) e[b] = new THREE.Vector3;
            b = 0;
            for (c = this.faces.length; b < c; b++) d = this.faces[b],
            d instanceof THREE.Face3 ? d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : d instanceof THREE.Face4 && (d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
        } else {
            e = this.__tmpVertices;
            b = 0;
            for (c = this.vertices.length; b < c; b++) e[b].set(0, 0, 0)
        }
        if (a) {
            var f, g, h, i = new THREE.Vector3,
            k = new THREE.Vector3,
            l = new THREE.Vector3,
            m = new THREE.Vector3,
            n = new THREE.Vector3;
            b = 0;
            for (c = this.faces.length; b < c; b++) d = this.faces[b],
            d instanceof THREE.Face3 ? (a = this.vertices[d.a], f = this.vertices[d.b], g = this.vertices[d.c], i.subVectors(g, f), k.subVectors(a, f), i.cross(k), e[d.a].add(i), e[d.b].add(i), e[d.c].add(i)) : d instanceof THREE.Face4 && (a = this.vertices[d.a], f = this.vertices[d.b], g = this.vertices[d.c], h = this.vertices[d.d], l.subVectors(h, f), k.subVectors(a, f), l.cross(k), e[d.a].add(l), e[d.b].add(l), e[d.d].add(l), m.subVectors(h, g), n.subVectors(f, g), m.cross(n), e[d.b].add(m), e[d.c].add(m), e[d.d].add(m))
        } else {
            b = 0;
            for (c = this.faces.length; b < c; b++) d = this.faces[b],
            d instanceof THREE.Face3 ? (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal)) : d instanceof THREE.Face4 && (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal), e[d.d].add(d.normal))
        }
        b = 0;
        for (c = this.vertices.length; b < c; b++) e[b].normalize();
        b = 0;
        for (c = this.faces.length; b < c; b++) d = this.faces[b],
        d instanceof THREE.Face3 ? (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c])) : d instanceof THREE.Face4 && (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c]), d.vertexNormals[3].copy(e[d.d]))
    },
    computeMorphNormals: function() {
        var a, b, c, d, e;
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            e = this.faces[c];
            e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone();
            e.__originalVertexNormals || (e.__originalVertexNormals = []);
            a = 0;
            for (b = e.vertexNormals.length; a < b; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone()
        }
        var f = new THREE.Geometry;
        f.faces = this.faces;
        a = 0;
        for (b = this.morphTargets.length; a < b; a++) {
            if (!this.morphNormals[a]) {
                this.morphNormals[a] = {};
                this.morphNormals[a].faceNormals = [];
                this.morphNormals[a].vertexNormals = [];
                var g = this.morphNormals[a].faceNormals,
                h = this.morphNormals[a].vertexNormals,
                i,
                k;
                c = 0;
                for (d = this.faces.length; c < d; c++) e = this.faces[c],
                i = new THREE.Vector3,
                k = e instanceof THREE.Face3 ? {
                    a: new THREE.Vector3,
                    b: new THREE.Vector3,
                    c: new THREE.Vector3
                }: {
                    a: new THREE.Vector3,
                    b: new THREE.Vector3,
                    c: new THREE.Vector3,
                    d: new THREE.Vector3
                },
                g.push(i),
                h.push(k)
            }
            g = this.morphNormals[a];
            f.vertices = this.morphTargets[a].vertices;
            f.computeFaceNormals();
            f.computeVertexNormals();
            c = 0;
            for (d = this.faces.length; c < d; c++) e = this.faces[c],
            i = g.faceNormals[c],
            k = g.vertexNormals[c],
            i.copy(e.normal),
            e instanceof THREE.Face3 ? (k.a.copy(e.vertexNormals[0]), k.b.copy(e.vertexNormals[1]), k.c.copy(e.vertexNormals[2])) : (k.a.copy(e.vertexNormals[0]), k.b.copy(e.vertexNormals[1]), k.c.copy(e.vertexNormals[2]), k.d.copy(e.vertexNormals[3]))
        }
        c = 0;
        for (d = this.faces.length; c < d; c++) e = this.faces[c],
        e.normal = e.__originalFaceNormal,
        e.vertexNormals = e.__originalVertexNormals
    },
    computeTangents: function() {
        function a(a, b, c, d, e, f, x) {
            h = a.vertices[b];
            i = a.vertices[c];
            k = a.vertices[d];
            l = g[e];
            m = g[f];
            n = g[x];
            s = i.x - h.x;
            r = k.x - h.x;
            p = i.y - h.y;
            q = k.y - h.y;
            y = i.z - h.z;
            v = k.z - h.z;
            z = m.x - l.x;
            t = n.x - l.x;
            A = m.y - l.y;
            I = n.y - l.y;
            C = 1 / (z * I - t * A);
            E.set((I * s - A * r) * C, (I * p - A * q) * C, (I * y - A * v) * C);
            H.set((z * r - t * s) * C, (z * q - t * p) * C, (z * v - t * y) * C);
            G[b].add(E);
            G[c].add(E);
            G[d].add(E);
            J[b].add(H);
            J[c].add(H);
            J[d].add(H)
        }
        var b, c, d, e, f, g, h, i, k, l, m, n, s, r, p, q, y, v, z, t, A, I, C, x, G = [],
        J = [],
        E = new THREE.Vector3,
        H = new THREE.Vector3,
        B = new THREE.Vector3,
        W = new THREE.Vector3,
        F = new THREE.Vector3;
        b = 0;
        for (c = this.vertices.length; b < c; b++) G[b] = new THREE.Vector3,
        J[b] = new THREE.Vector3;
        b = 0;
        for (c = this.faces.length; b < c; b++) f = this.faces[b],
        g = this.faceVertexUvs[0][b],
        f instanceof THREE.Face3 ? a(this, f.a, f.b, f.c, 0, 1, 2) : f instanceof THREE.Face4 && (a(this, f.a, f.b, f.d, 0, 1, 3), a(this, f.b, f.c, f.d, 1, 2, 3));
        var K = ["a", "b", "c", "d"];
        b = 0;
        for (c = this.faces.length; b < c; b++) {
            f = this.faces[b];
            for (d = 0; d < f.vertexNormals.length; d++) F.copy(f.vertexNormals[d]),
            e = f[K[d]],
            x = G[e],
            B.copy(x),
            B.sub(F.multiplyScalar(F.dot(x))).normalize(),
            W.crossVectors(f.vertexNormals[d], x),
            e = W.dot(J[e]),
            e = 0 > e ? -1 : 1,
            f.vertexTangents[d] = new THREE.Vector4(B.x, B.y, B.z, e)
        }
        this.hasTangents = !0
    },
    computeLineDistances: function() {
        for (var a = 0,
        b = this.vertices,
        c = 0,
        d = b.length; c < d; c++) 0 < c && (a += b[c].distanceTo(b[c - 1])),
        this.lineDistances[c] = a
    },
    computeBoundingBox: function() {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3);
        this.boundingBox.setFromPoints(this.vertices)
    },
    computeBoundingSphere: function() {
        null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
        this.boundingSphere.setFromCenterAndPoints(this.boundingSphere.center, this.vertices)
    },
    mergeVertices: function() {
        var a = {},
        b = [],
        c = [],
        d,
        e = Math.pow(10, 4),
        f,
        g,
        h,
        i,
        k;
        this.__tmpVertices = void 0;
        f = 0;
        for (g = this.vertices.length; f < g; f++) d = this.vertices[f],
        d = [Math.round(d.x * e), Math.round(d.y * e), Math.round(d.z * e)].join("_"),
        void 0 === a[d] ? (a[d] = f, b.push(this.vertices[f]), c[f] = b.length - 1) : c[f] = c[a[d]];
        e = [];
        f = 0;
        for (g = this.faces.length; f < g; f++) if (a = this.faces[f], a instanceof THREE.Face3) {
            a.a = c[a.a];
            a.b = c[a.b];
            a.c = c[a.c];
            h = [a.a, a.b, a.c];
            d = -1;
            for (i = 0; 3 > i; i++) if (h[i] == h[(i + 1) % 3]) {
                e.push(f);
                break
            }
        } else if (a instanceof THREE.Face4) {
            a.a = c[a.a];
            a.b = c[a.b];
            a.c = c[a.c];
            a.d = c[a.d];
            h = [a.a, a.b, a.c, a.d];
            d = -1;
            for (i = 0; 4 > i; i++) h[i] == h[(i + 1) % 4] && (0 <= d && e.push(f), d = i);
            if (0 <= d) {
                h.splice(d, 1);
                var l = new THREE.Face3(h[0], h[1], h[2], a.normal, a.color, a.materialIndex);
                h = 0;
                for (i = this.faceVertexUvs.length; h < i; h++)(k = this.faceVertexUvs[h][f]) && k.splice(d, 1);
                a.vertexNormals && 0 < a.vertexNormals.length && (l.vertexNormals = a.vertexNormals, l.vertexNormals.splice(d, 1));
                a.vertexColors && 0 < a.vertexColors.length && (l.vertexColors = a.vertexColors, l.vertexColors.splice(d, 1));
                this.faces[f] = l
            }
        }
        for (f = e.length - 1; 0 <= f; f--) {
            this.faces.splice(f, 1);
            h = 0;
            for (i = this.faceVertexUvs.length; h < i; h++) this.faceVertexUvs[h].splice(f, 1)
        }
        c = this.vertices.length - b.length;
        this.vertices = b;
        return c
    },
    clone: function() {
        for (var a = new THREE.Geometry,
        b = this.vertices,
        c = 0,
        d = b.length; c < d; c++) a.vertices.push(b[c].clone());
        b = this.faces;
        c = 0;
        for (d = b.length; c < d; c++) a.faces.push(b[c].clone());
        b = this.faceVertexUvs[0];
        c = 0;
        for (d = b.length; c < d; c++) {
            for (var e = b[c], f = [], g = 0, h = e.length; g < h; g++) f.push(new THREE.Vector2(e[g].x, e[g].y));
            a.faceVertexUvs[0].push(f)
        }
        return a
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
};
THREE.GeometryIdCount = 0;
THREE.BufferGeometry = function() {
    THREE.EventDispatcher.call(this);
    this.id = THREE.GeometryIdCount++;
    this.attributes = {};
    this.dynamic = !1;
    this.offsets = [];
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = !1;
    this.morphTargets = []
};
THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    applyMatrix: function(a) {
        var b, c;
        this.attributes.position && (b = this.attributes.position.array);
        this.attributes.normal && (c = this.attributes.normal.array);
        void 0 !== b && (a.multiplyVector3Array(b), this.verticesNeedUpdate = !0);
        void 0 !== c && (b = new THREE.Matrix3, b.getInverse(a).transpose(), b.multiplyVector3Array(c), this.normalizeNormals(), this.normalsNeedUpdate = !0)
    },
    computeBoundingBox: function() {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3);
        var a = this.attributes.position.array;
        if (a) {
            var b = this.boundingBox,
            c, d, e;
            3 <= a.length && (b.min.x = b.max.x = a[0], b.min.y = b.max.y = a[1], b.min.z = b.max.z = a[2]);
            for (var f = 3,
            g = a.length; f < g; f += 3) c = a[f],
            d = a[f + 1],
            e = a[f + 2],
            c < b.min.x ? b.min.x = c: c > b.max.x && (b.max.x = c),
            d < b.min.y ? b.min.y = d: d > b.max.y && (b.max.y = d),
            e < b.min.z ? b.min.z = e: e > b.max.z && (b.max.z = e)
        }
        if (void 0 === a || 0 === a.length) this.boundingBox.min.set(0, 0, 0),
        this.boundingBox.max.set(0, 0, 0)
    },
    computeBoundingSphere: function() {
        null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
        var a = this.attributes.position.array;
        if (a) {
            for (var b, c = 0,
            d, e, f = 0,
            g = a.length; f < g; f += 3) b = a[f],
            d = a[f + 1],
            e = a[f + 2],
            b = b * b + d * d + e * e,
            b > c && (c = b);
            this.boundingSphere.radius = Math.sqrt(c)
        }
    },
    computeVertexNormals: function() {
        if (this.attributes.position) {
            var a, b, c, d;
            a = this.attributes.position.array.length;
            if (void 0 === this.attributes.normal) this.attributes.normal = {
                itemSize: 3,
                array: new Float32Array(a),
                numItems: a
            };
            else {
                a = 0;
                for (b = this.attributes.normal.array.length; a < b; a++) this.attributes.normal.array[a] = 0
            }
            var e = this.attributes.position.array,
            f = this.attributes.normal.array,
            g, h, i, k, l, m, n = new THREE.Vector3,
            s = new THREE.Vector3,
            r = new THREE.Vector3,
            p = new THREE.Vector3,
            q = new THREE.Vector3;
            if (this.attributes.index) {
                var y = this.attributes.index.array,
                v = this.offsets;
                c = 0;
                for (d = v.length; c < d; ++c) {
                    b = v[c].start;
                    g = v[c].count;
                    var z = v[c].index;
                    a = b;
                    for (b += g; a < b; a += 3) g = z + y[a],
                    h = z + y[a + 1],
                    i = z + y[a + 2],
                    k = e[3 * g],
                    l = e[3 * g + 1],
                    m = e[3 * g + 2],
                    n.set(k, l, m),
                    k = e[3 * h],
                    l = e[3 * h + 1],
                    m = e[3 * h + 2],
                    s.set(k, l, m),
                    k = e[3 * i],
                    l = e[3 * i + 1],
                    m = e[3 * i + 2],
                    r.set(k, l, m),
                    p.subVectors(r, s),
                    q.subVectors(n, s),
                    p.cross(q),
                    f[3 * g] += p.x,
                    f[3 * g + 1] += p.y,
                    f[3 * g + 2] += p.z,
                    f[3 * h] += p.x,
                    f[3 * h + 1] += p.y,
                    f[3 * h + 2] += p.z,
                    f[3 * i] += p.x,
                    f[3 * i + 1] += p.y,
                    f[3 * i + 2] += p.z
                }
            } else {
                a = 0;
                for (b = e.length; a < b; a += 9) k = e[a],
                l = e[a + 1],
                m = e[a + 2],
                n.set(k, l, m),
                k = e[a + 3],
                l = e[a + 4],
                m = e[a + 5],
                s.set(k, l, m),
                k = e[a + 6],
                l = e[a + 7],
                m = e[a + 8],
                r.set(k, l, m),
                p.subVectors(r, s),
                q.subVectors(n, s),
                p.cross(q),
                f[a] = p.x,
                f[a + 1] = p.y,
                f[a + 2] = p.z,
                f[a + 3] = p.x,
                f[a + 4] = p.y,
                f[a + 5] = p.z,
                f[a + 6] = p.x,
                f[a + 7] = p.y,
                f[a + 8] = p.z
            }
            this.normalizeNormals();
            this.normalsNeedUpdate = !0
        }
    },
    normalizeNormals: function() {
        for (var a = this.attributes.normal.array,
        b, c, d, e = 0,
        f = a.length; e < f; e += 3) b = a[e],
        c = a[e + 1],
        d = a[e + 2],
        b = 1 / Math.sqrt(b * b + c * c + d * d),
        a[e] *= b,
        a[e + 1] *= b,
        a[e + 2] *= b
    },
    computeTangents: function() {
        function a(a) {
            Ca.x = d[3 * a];
            Ca.y = d[3 * a + 1];
            Ca.z = d[3 * a + 2];
            $a.copy(Ca);
            ca = i[a];
            U.copy(ca);
            U.sub(Ca.multiplyScalar(Ca.dot(ca))).normalize();
            fa.crossVectors($a, ca);
            qa = fa.dot(k[a]);
            M = 0 > qa ? -1 : 1;
            h[4 * a] = U.x;
            h[4 * a + 1] = U.y;
            h[4 * a + 2] = U.z;
            h[4 * a + 3] = M
        }
        if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
        else {
            var b = this.attributes.index.array,
            c = this.attributes.position.array,
            d = this.attributes.normal.array,
            e = this.attributes.uv.array,
            f = c.length / 3;
            if (void 0 === this.attributes.tangent) {
                var g = 4 * f;
                this.attributes.tangent = {
                    itemSize: 4,
                    array: new Float32Array(g),
                    numItems: g
                }
            }
            for (var h = this.attributes.tangent.array,
            i = [], k = [], g = 0; g < f; g++) i[g] = new THREE.Vector3,
            k[g] = new THREE.Vector3;
            var l, m, n, s, r, p, q, y, v, z, t, A, I, C, x, f = new THREE.Vector3,
            g = new THREE.Vector3,
            G, J, E, H, B, W, F, K = this.offsets;
            E = 0;
            for (H = K.length; E < H; ++E) {
                J = K[E].start;
                B = K[E].count;
                var L = K[E].index;
                G = J;
                for (J += B; G < J; G += 3) B = L + b[G],
                W = L + b[G + 1],
                F = L + b[G + 2],
                l = c[3 * B],
                m = c[3 * B + 1],
                n = c[3 * B + 2],
                s = c[3 * W],
                r = c[3 * W + 1],
                p = c[3 * W + 2],
                q = c[3 * F],
                y = c[3 * F + 1],
                v = c[3 * F + 2],
                z = e[2 * B],
                t = e[2 * B + 1],
                A = e[2 * W],
                I = e[2 * W + 1],
                C = e[2 * F],
                x = e[2 * F + 1],
                s -= l,
                l = q - l,
                r -= m,
                m = y - m,
                p -= n,
                n = v - n,
                A -= z,
                z = C - z,
                I -= t,
                t = x - t,
                x = 1 / (A * t - z * I),
                f.set((t * s - I * l) * x, (t * r - I * m) * x, (t * p - I * n) * x),
                g.set((A * l - z * s) * x, (A * m - z * r) * x, (A * n - z * p) * x),
                i[B].add(f),
                i[W].add(f),
                i[F].add(f),
                k[B].add(g),
                k[W].add(g),
                k[F].add(g)
            }
            var U = new THREE.Vector3,
            fa = new THREE.Vector3,
            Ca = new THREE.Vector3,
            $a = new THREE.Vector3,
            M, ca, qa;
            E = 0;
            for (H = K.length; E < H; ++E) {
                J = K[E].start;
                B = K[E].count;
                L = K[E].index;
                G = J;
                for (J += B; G < J; G += 3) B = L + b[G],
                W = L + b[G + 1],
                F = L + b[G + 2],
                a(B),
                a(W),
                a(F)
            }
            this.tangentsNeedUpdate = this.hasTangents = !0
        }
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
};
THREE.Camera = function() {
    THREE.Object3D.call(this);
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = new THREE.Matrix4;
    this.projectionMatrixInverse = new THREE.Matrix4
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function(a) {
    this.matrix.lookAt(this.position, a, this.up); ! 0 === this.rotationAutoUpdate && (!1 === this.useQuaternion ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder) : this.quaternion.copy(this.matrix.decompose()[1]))
};
THREE.OrthographicCamera = function(a, b, c, d, e, f) {
    THREE.Camera.call(this);
    this.left = a;
    this.right = b;
    this.top = c;
    this.bottom = d;
    this.near = void 0 !== e ? e: 0.1;
    this.far = void 0 !== f ? f: 2E3;
    this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
    this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
};
THREE.PerspectiveCamera = function(a, b, c, d) {
    THREE.Camera.call(this);
    this.fov = void 0 !== a ? a: 50;
    this.aspect = void 0 !== b ? b: 1;
    this.near = void 0 !== c ? c: 0.1;
    this.far = void 0 !== d ? d: 2E3;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function(a, b) {
    void 0 === b && (b = 24);
    this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function(a, b, c, d, e, f) {
    this.fullWidth = a;
    this.fullHeight = b;
    this.x = c;
    this.y = d;
    this.width = e;
    this.height = f;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
    if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
        b = Math.tan(THREE.Math.degToRad(0.5 * this.fov)) * this.near,
        c = -b,
        d = a * c,
        a = Math.abs(a * b - d),
        c = Math.abs(b - c);
        this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
    } else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Light = function(a) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(a)
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.AmbientLight = function(a) {
    THREE.Light.call(this, a)
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.AreaLight = function(a, b) {
    THREE.Light.call(this, a);
    this.normal = new THREE.Vector3(0, -1, 0);
    this.right = new THREE.Vector3(1, 0, 0);
    this.intensity = void 0 !== b ? b: 1;
    this.height = this.width = 1;
    this.constantAttenuation = 1.5;
    this.linearAttenuation = 0.5;
    this.quadraticAttenuation = 0.1
};
THREE.AreaLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight = function(a, b) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = void 0 !== b ? b: 1;
    this.onlyShadow = this.castShadow = !1;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5E3;
    this.shadowCameraLeft = -500;
    this.shadowCameraTop = this.shadowCameraRight = 500;
    this.shadowCameraBottom = -500;
    this.shadowCameraVisible = !1;
    this.shadowBias = 0;
    this.shadowDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowCascade = !1;
    this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1E3);
    this.shadowCascadeCount = 2;
    this.shadowCascadeBias = [0, 0, 0];
    this.shadowCascadeWidth = [512, 512, 512];
    this.shadowCascadeHeight = [512, 512, 512];
    this.shadowCascadeNearZ = [ - 1, 0.99, 0.998];
    this.shadowCascadeFarZ = [0.99, 0.998, 1];
    this.shadowCascadeArray = [];
    this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight = function(a, b, c) {
    THREE.Light.call(this, a);
    this.groundColor = new THREE.Color(b);
    this.position = new THREE.Vector3(0, 100, 0);
    this.intensity = void 0 !== c ? c: 1
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight = function(a, b, c) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 0, 0);
    this.intensity = void 0 !== b ? b: 1;
    this.distance = void 0 !== c ? c: 0
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight = function(a, b, c, d, e) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = void 0 !== b ? b: 1;
    this.distance = void 0 !== c ? c: 0;
    this.angle = void 0 !== d ? d: Math.PI / 2;
    this.exponent = void 0 !== e ? e: 10;
    this.onlyShadow = this.castShadow = !1;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5E3;
    this.shadowCameraFov = 50;
    this.shadowCameraVisible = !1;
    this.shadowBias = 0;
    this.shadowDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.Loader = function(a) {
    this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null;
    this.onLoadStart = function() {};
    this.onLoadProgress = function() {};
    this.onLoadComplete = function() {}
};
THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: "anonymous",
    addStatusElement: function() {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.right = "0px";
        a.style.top = "0px";
        a.style.fontSize = "0.8em";
        a.style.textAlign = "left";
        a.style.background = "rgba(0,0,0,0.25)";
        a.style.color = "#fff";
        a.style.width = "120px";
        a.style.padding = "0.5em 0.5em 0.5em 0.5em";
        a.style.zIndex = 1E3;
        a.innerHTML = "Loading ...";
        return a
    },
    updateProgress: function(a) {
        var b = "Loaded ",
        b = a.total ? b + ((100 * a.loaded / a.total).toFixed(0) + "%") : b + ((a.loaded / 1E3).toFixed(2) + " KB");
        this.statusDomElement.innerHTML = b
    },
    extractUrlBase: function(a) {
        a = a.split("/");
        a.pop();
        return (1 > a.length ? ".": a.join("/")) + "/"
    },
    initMaterials: function(a, b) {
        for (var c = [], d = 0; d < a.length; ++d) c[d] = THREE.Loader.prototype.createMaterial(a[d], b);
        return c
    },
    needsTangents: function(a) {
        for (var b = 0,
        c = a.length; b < c; b++) if (a[b] instanceof THREE.ShaderMaterial) return ! 0;
        return ! 1
    },
    createMaterial: function(a, b) {
        function c(a) {
            a = Math.log(a) / Math.LN2;
            return Math.floor(a) == a
        }
        function d(a) {
            a = Math.log(a) / Math.LN2;
            return Math.pow(2, Math.round(a))
        }
        function e(a, e, f, h, i, k, q) {
            var y = /\.dds$/i.test(f),
            v = b + "/" + f;
            if (y) {
                var z = THREE.ImageUtils.loadCompressedTexture(v);
                a[e] = z
            } else z = document.createElement("canvas"),
            a[e] = new THREE.Texture(z);
            a[e].sourceFile = f;
            h && (a[e].repeat.set(h[0], h[1]), 1 !== h[0] && (a[e].wrapS = THREE.RepeatWrapping), 1 !== h[1] && (a[e].wrapT = THREE.RepeatWrapping));
            i && a[e].offset.set(i[0], i[1]);
            k && (f = {
                repeat: THREE.RepeatWrapping,
                mirror: THREE.MirroredRepeatWrapping
            },
            void 0 !== f[k[0]] && (a[e].wrapS = f[k[0]]), void 0 !== f[k[1]] && (a[e].wrapT = f[k[1]]));
            q && (a[e].anisotropy = q);
            if (!y) {
                var t = a[e],
                a = new Image;
                a.onload = function() {
                    if (!c(this.width) || !c(this.height)) {
                        var a = d(this.width),
                        b = d(this.height);
                        t.image.width = a;
                        t.image.height = b;
                        t.image.getContext("2d").drawImage(this, 0, 0, a, b)
                    } else t.image = this;
                    t.needsUpdate = !0
                };
                a.crossOrigin = g.crossOrigin;
                a.src = v
            }
        }
        function f(a) {
            return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
        }
        var g = this,
        h = "MeshLambertMaterial",
        i = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            normalMap: null,
            bumpMap: null,
            wireframe: !1
        };
        if (a.shading) {
            var k = a.shading.toLowerCase();
            "phong" === k ? h = "MeshPhongMaterial": "basic" === k && (h = "MeshBasicMaterial")
        }
        void 0 !== a.blending && void 0 !== THREE[a.blending] && (i.blending = THREE[a.blending]);
        if (void 0 !== a.transparent || 1 > a.opacity) i.transparent = a.transparent;
        void 0 !== a.depthTest && (i.depthTest = a.depthTest);
        void 0 !== a.depthWrite && (i.depthWrite = a.depthWrite);
        void 0 !== a.visible && (i.visible = a.visible);
        void 0 !== a.flipSided && (i.side = THREE.BackSide);
        void 0 !== a.doubleSided && (i.side = THREE.DoubleSide);
        void 0 !== a.wireframe && (i.wireframe = a.wireframe);
        void 0 !== a.vertexColors && ("face" === a.vertexColors ? i.vertexColors = THREE.FaceColors: a.vertexColors && (i.vertexColors = THREE.VertexColors));
        a.colorDiffuse ? i.color = f(a.colorDiffuse) : a.DbgColor && (i.color = a.DbgColor);
        a.colorSpecular && (i.specular = f(a.colorSpecular));
        a.colorAmbient && (i.ambient = f(a.colorAmbient));
        a.transparency && (i.opacity = a.transparency);
        a.specularCoef && (i.shininess = a.specularCoef);
        a.mapDiffuse && b && e(i, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap, a.mapDiffuseAnisotropy);
        a.mapLight && b && e(i, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap, a.mapLightAnisotropy);
        a.mapBump && b && e(i, "bumpMap", a.mapBump, a.mapBumpRepeat, a.mapBumpOffset, a.mapBumpWrap, a.mapBumpAnisotropy);
        a.mapNormal && b && e(i, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap, a.mapNormalAnisotropy);
        a.mapSpecular && b && e(i, "specularMap", a.mapSpecular, a.mapSpecularRepeat, a.mapSpecularOffset, a.mapSpecularWrap, a.mapSpecularAnisotropy);
        a.mapBumpScale && (i.bumpScale = a.mapBumpScale);
        a.mapNormal ? (h = THREE.ShaderLib.normalmap, k = THREE.UniformsUtils.clone(h.uniforms), k.tNormal.value = i.normalMap, a.mapNormalFactor && k.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor), i.map && (k.tDiffuse.value = i.map, k.enableDiffuse.value = !0), i.specularMap && (k.tSpecular.value = i.specularMap, k.enableSpecular.value = !0), i.lightMap && (k.tAO.value = i.lightMap, k.enableAO.value = !0), k.uDiffuseColor.value.setHex(i.color), k.uSpecularColor.value.setHex(i.specular), k.uAmbientColor.value.setHex(i.ambient), k.uShininess.value = i.shininess, void 0 !== i.opacity && (k.uOpacity.value = i.opacity), h = new THREE.ShaderMaterial({
            fragmentShader: h.fragmentShader,
            vertexShader: h.vertexShader,
            uniforms: k,
            lights: !0,
            fog: !0
        }), i.transparent && (h.transparent = !0)) : h = new THREE[h](i);
        void 0 !== a.DbgName && (h.name = a.DbgName);
        return h
    }
};
THREE.ImageLoader = function() {
    THREE.EventDispatcher.call(this);
    this.crossOrigin = null
};
THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader,
    load: function(a, b) {
        var c = this;
        void 0 === b && (b = new Image);
        b.addEventListener("load",
        function() {
            c.dispatchEvent({
                type: "load",
                content: b
            })
        },
        !1);
        b.addEventListener("error",
        function() {
            c.dispatchEvent({
                type: "error",
                message: "Couldn't load URL [" + a + "]"
            })
        },
        !1);
        c.crossOrigin && (b.crossOrigin = c.crossOrigin);
        b.src = a
    }
};
THREE.JSONLoader = function(a) {
    THREE.Loader.call(this, a);
    this.withCredentials = !1
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.load = function(a, b, c) {
    c = c && "string" === typeof c ? c: this.extractUrlBase(a);
    this.onLoadStart();
    this.loadAjaxJSON(this, a, b, c)
};
THREE.JSONLoader.prototype.loadAjaxJSON = function(a, b, c, d, e) {
    var f = new XMLHttpRequest,
    g = 0;
    f.onreadystatechange = function() {
        if (f.readyState === f.DONE) if (200 === f.status || 0 === f.status) {
            if (f.responseText) {
                var h = JSON.parse(f.responseText);
                a.createModel(h, c, d)
            } else console.warn("THREE.JSONLoader: [" + b + "] seems to be unreachable or file there is empty");
            a.onLoadComplete()
        } else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]");
        else f.readyState === f.LOADING ? e && (0 === g && (g = f.getResponseHeader("Content-Length")), e({
            total: g,
            loaded: f.responseText.length
        })) : f.readyState === f.HEADERS_RECEIVED && (g = f.getResponseHeader("Content-Length"))
    };
    f.open("GET", b, !0);
    f.withCredentials = this.withCredentials;
    f.send(null)
};
THREE.JSONLoader.prototype.createModel = function(a, b, c) {
    var d = new THREE.Geometry,
    e = void 0 !== a.scale ? 1 / a.scale: 1,
    f,
    g,
    h,
    i,
    k,
    l,
    m,
    n,
    s,
    r,
    p,
    q,
    y,
    v,
    z,
    t = a.faces;
    r = a.vertices;
    var A = a.normals,
    I = a.colors,
    C = 0;
    for (f = 0; f < a.uvs.length; f++) a.uvs[f].length && C++;
    for (f = 0; f < C; f++) d.faceUvs[f] = [],
    d.faceVertexUvs[f] = [];
    i = 0;
    for (k = r.length; i < k;) l = new THREE.Vector3,
    l.x = r[i++] * e,
    l.y = r[i++] * e,
    l.z = r[i++] * e,
    d.vertices.push(l);
    i = 0;
    for (k = t.length; i < k;) {
        r = t[i++];
        l = r & 1;
        h = r & 2;
        f = r & 4;
        g = r & 8;
        n = r & 16;
        m = r & 32;
        p = r & 64;
        r &= 128;
        l ? (q = new THREE.Face4, q.a = t[i++], q.b = t[i++], q.c = t[i++], q.d = t[i++], l = 4) : (q = new THREE.Face3, q.a = t[i++], q.b = t[i++], q.c = t[i++], l = 3);
        h && (h = t[i++], q.materialIndex = h);
        h = d.faces.length;
        if (f) for (f = 0; f < C; f++) y = a.uvs[f],
        s = t[i++],
        z = y[2 * s],
        s = y[2 * s + 1],
        d.faceUvs[f][h] = new THREE.Vector2(z, s);
        if (g) for (f = 0; f < C; f++) {
            y = a.uvs[f];
            v = [];
            for (g = 0; g < l; g++) s = t[i++],
            z = y[2 * s],
            s = y[2 * s + 1],
            v[g] = new THREE.Vector2(z, s);
            d.faceVertexUvs[f][h] = v
        }
        n && (n = 3 * t[i++], g = new THREE.Vector3, g.x = A[n++], g.y = A[n++], g.z = A[n], q.normal = g);
        if (m) for (f = 0; f < l; f++) n = 3 * t[i++],
        g = new THREE.Vector3,
        g.x = A[n++],
        g.y = A[n++],
        g.z = A[n],
        q.vertexNormals.push(g);
        p && (m = t[i++], m = new THREE.Color(I[m]), q.color = m);
        if (r) for (f = 0; f < l; f++) m = t[i++],
        m = new THREE.Color(I[m]),
        q.vertexColors.push(m);
        d.faces.push(q)
    }
    if (a.skinWeights) {
        i = 0;
        for (k = a.skinWeights.length; i < k; i += 2) t = a.skinWeights[i],
        A = a.skinWeights[i + 1],
        d.skinWeights.push(new THREE.Vector4(t, A, 0, 0))
    }
    if (a.skinIndices) {
        i = 0;
        for (k = a.skinIndices.length; i < k; i += 2) t = a.skinIndices[i],
        A = a.skinIndices[i + 1],
        d.skinIndices.push(new THREE.Vector4(t, A, 0, 0))
    }
    d.bones = a.bones;
    d.animation = a.animation;
    if (void 0 !== a.morphTargets) {
        i = 0;
        for (k = a.morphTargets.length; i < k; i++) {
            d.morphTargets[i] = {};
            d.morphTargets[i].name = a.morphTargets[i].name;
            d.morphTargets[i].vertices = [];
            I = d.morphTargets[i].vertices;
            C = a.morphTargets[i].vertices;
            t = 0;
            for (A = C.length; t < A; t += 3) r = new THREE.Vector3,
            r.x = C[t] * e,
            r.y = C[t + 1] * e,
            r.z = C[t + 2] * e,
            I.push(r)
        }
    }
    if (void 0 !== a.morphColors) {
        i = 0;
        for (k = a.morphColors.length; i < k; i++) {
            d.morphColors[i] = {};
            d.morphColors[i].name = a.morphColors[i].name;
            d.morphColors[i].colors = [];
            A = d.morphColors[i].colors;
            I = a.morphColors[i].colors;
            e = 0;
            for (t = I.length; e < t; e += 3) C = new THREE.Color(16755200),
            C.setRGB(I[e], I[e + 1], I[e + 2]),
            A.push(C)
        }
    }
    d.computeCentroids();
    d.computeFaceNormals();
    a = this.initMaterials(a.materials, c);
    this.needsTangents(a) && d.computeTangents();
    b(d, a)
};
THREE.LoadingMonitor = function() {
    THREE.EventDispatcher.call(this);
    var a = this,
    b = 0,
    c = 0,
    d = function() {
        b++;
        a.dispatchEvent({
            type: "progress",
            loaded: b,
            total: c
        });
        b === c && a.dispatchEvent({
            type: "load"
        })
    };
    this.add = function(a) {
        c++;
        a.addEventListener("load", d, !1)
    }
};
THREE.SceneLoader = function() {
    this.onLoadStart = function() {};
    this.onLoadProgress = function() {};
    this.onLoadComplete = function() {};
    this.callbackSync = function() {};
    this.callbackProgress = function() {};
    this.geometryHandlerMap = {};
    this.hierarchyHandlerMap = {};
    this.addGeometryHandler("ascii", THREE.JSONLoader)
};
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;
THREE.SceneLoader.prototype.load = function(a, b) {
    var c = this,
    d = new XMLHttpRequest;
    d.onreadystatechange = function() {
        if (4 === d.readyState) if (200 === d.status || 0 === d.status) {
            var e = JSON.parse(d.responseText);
            c.parse(e, b, a)
        } else console.error("THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]")
    };
    d.open("GET", a, !0);
    d.send(null)
};
THREE.SceneLoader.prototype.addGeometryHandler = function(a, b) {
    this.geometryHandlerMap[a] = {
        loaderClass: b
    }
};
THREE.SceneLoader.prototype.addHierarchyHandler = function(a, b) {
    this.hierarchyHandlerMap[a] = {
        loaderClass: b
    }
};
THREE.SceneLoader.prototype.parse = function(a, b, c) {
    function d(a, b) {
        return "relativeToHTML" == b ? a: m + "/" + a
    }
    function e() {
        f(x.scene, J.objects)
    }
    function f(a, b) {
        var c, e, g, i, k, m, p;
        for (p in b) if (void 0 === x.objects[p]) {
            var q = b[p],
            t = null;
            if (q.type && q.type in l.hierarchyHandlerMap) {
                if (void 0 === q.loading) {
                    e = {
                        type: 1,
                        url: 1,
                        material: 1,
                        position: 1,
                        rotation: 1,
                        scale: 1,
                        visible: 1,
                        children: 1,
                        properties: 1,
                        skin: 1,
                        morph: 1,
                        mirroredLoop: 1,
                        duration: 1
                    };
                    g = {};
                    for (var B in q) B in e || (g[B] = q[B]);
                    s = x.materials[q.material];
                    q.loading = !0;
                    e = l.hierarchyHandlerMap[q.type].loaderObject;
                    e.options ? e.load(d(q.url, J.urlBaseType), h(p, a, s, q)) : e.load(d(q.url, J.urlBaseType), h(p, a, s, q), g)
                }
            } else if (void 0 !== q.geometry) {
                if (n = x.geometries[q.geometry]) {
                    t = !1;
                    s = x.materials[q.material];
                    t = s instanceof THREE.ShaderMaterial;
                    g = q.position;
                    i = q.rotation;
                    k = q.scale;
                    c = q.matrix;
                    m = q.quaternion;
                    q.material || (s = new THREE.MeshFaceMaterial(x.face_materials[q.geometry]));
                    s instanceof THREE.MeshFaceMaterial && 0 === s.materials.length && (s = new THREE.MeshFaceMaterial(x.face_materials[q.geometry]));
                    if (s instanceof THREE.MeshFaceMaterial) for (e = 0; e < s.materials.length; e++) t = t || s.materials[e] instanceof THREE.ShaderMaterial;
                    t && n.computeTangents();
                    q.skin ? t = new THREE.SkinnedMesh(n, s) : q.morph ? (t = new THREE.MorphAnimMesh(n, s), void 0 !== q.duration && (t.duration = q.duration), void 0 !== q.time && (t.time = q.time), void 0 !== q.mirroredLoop && (t.mirroredLoop = q.mirroredLoop), s.morphNormals && n.computeMorphNormals()) : t = new THREE.Mesh(n, s);
                    t.name = p;
                    c ? (t.matrixAutoUpdate = !1, t.matrix.set(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15])) : (t.position.set(g[0], g[1], g[2]), m ? (t.quaternion.set(m[0], m[1], m[2], m[3]), t.useQuaternion = !0) : t.rotation.set(i[0], i[1], i[2]), t.scale.set(k[0], k[1], k[2]));
                    t.visible = q.visible;
                    t.castShadow = q.castShadow;
                    t.receiveShadow = q.receiveShadow;
                    a.add(t);
                    x.objects[p] = t
                }
            } else "DirectionalLight" === q.type || "PointLight" === q.type || "AmbientLight" === q.type ? (v = void 0 !== q.color ? q.color: 16777215, z = void 0 !== q.intensity ? q.intensity: 1, "DirectionalLight" === q.type ? (g = q.direction, y = new THREE.DirectionalLight(v, z), y.position.set(g[0], g[1], g[2]), q.target && (G.push({
                object: y,
                targetName: q.target
            }), y.target = null)) : "PointLight" === q.type ? (g = q.position, e = q.distance, y = new THREE.PointLight(v, z, e), y.position.set(g[0], g[1], g[2])) : "AmbientLight" === q.type && (y = new THREE.AmbientLight(v)), a.add(y), y.name = p, x.lights[p] = y, x.objects[p] = y) : "PerspectiveCamera" === q.type || "OrthographicCamera" === q.type ? ("PerspectiveCamera" === q.type ? r = new THREE.PerspectiveCamera(q.fov, q.aspect, q.near, q.far) : "OrthographicCamera" === q.type && (r = new THREE.OrthographicCamera(q.left, q.right, q.top, q.bottom, q.near, q.far)), g = q.position, r.position.set(g[0], g[1], g[2]), a.add(r), r.name = p, x.cameras[p] = r, x.objects[p] = r) : (g = q.position, i = q.rotation, k = q.scale, m = q.quaternion, t = new THREE.Object3D, t.name = p, t.position.set(g[0], g[1], g[2]), m ? (t.quaternion.set(m[0], m[1], m[2], m[3]), t.useQuaternion = !0) : t.rotation.set(i[0], i[1], i[2]), t.scale.set(k[0], k[1], k[2]), t.visible = void 0 !== q.visible ? q.visible: !1, a.add(t), x.objects[p] = t, x.empties[p] = t);
            if (t) {
                if (void 0 !== q.properties) for (var C in q.properties) t.properties[C] = q.properties[C];
                if (void 0 !== q.groups) for (e = 0; e < q.groups.length; e++) g = q.groups[e],
                void 0 === x.groups[g] && (x.groups[g] = []),
                x.groups[g].push(p);
                void 0 !== q.children && f(t, q.children)
            }
        }
    }
    function g(a) {
        return function(b, c) {
            x.geometries[a] = b;
            x.face_materials[a] = c;
            e();
            t -= 1;
            l.onLoadComplete();
            k()
        }
    }
    function h(a, b, c, d) {
        return function(f) {
            var f = f.content ? f.content: f.dae ? f.scene: f,
            g = d.position,
            h = d.rotation,
            i = d.quaternion,
            n = d.scale;
            f.position.set(g[0], g[1], g[2]);
            i ? (f.quaternion.set(i[0], i[1], i[2], i[3]), f.useQuaternion = !0) : f.rotation.set(h[0], h[1], h[2]);
            f.scale.set(n[0], n[1], n[2]);
            c && f.traverse(function(a) {
                a.material = c
            });
            var m = void 0 !== d.visible ? d.visible: !0;
            f.traverse(function(a) {
                a.visible = m
            });
            b.add(f);
            f.name = a;
            x.objects[a] = f;
            e();
            t -= 1;
            l.onLoadComplete();
            k()
        }
    }
    function i(a) {
        return function(b, c) {
            x.geometries[a] = b;
            x.face_materials[a] = c
        }
    }
    function k() {
        l.callbackProgress({
            totalModels: I,
            totalTextures: C,
            loadedModels: I - t,
            loadedTextures: C - A
        },
        x);
        l.onLoadProgress();
        if (0 === t && 0 === A) {
            for (var a = 0; a < G.length; a++) {
                var c = G[a],
                d = x.objects[c.targetName];
                d ? c.object.target = d: (c.object.target = new THREE.Object3D, x.scene.add(c.object.target));
                c.object.target.properties.targetInverse = c.object
            }
            b(x)
        }
    }
    var l = this,
    m = THREE.Loader.prototype.extractUrlBase(c),
    n,
    s,
    r,
    p,
    q,
    y,
    v,
    z,
    t,
    A,
    I,
    C,
    x,
    G = [],
    J = a,
    E;
    for (E in this.geometryHandlerMap) a = this.geometryHandlerMap[E].loaderClass,
    this.geometryHandlerMap[E].loaderObject = new a;
    for (E in this.hierarchyHandlerMap) a = this.hierarchyHandlerMap[E].loaderClass,
    this.hierarchyHandlerMap[E].loaderObject = new a;
    A = t = 0;
    x = {
        scene: new THREE.Scene,
        geometries: {},
        face_materials: {},
        materials: {},
        textures: {},
        objects: {},
        cameras: {},
        lights: {},
        fogs: {},
        empties: {},
        groups: {}
    };
    if (J.transform && (E = J.transform.position, a = J.transform.rotation, c = J.transform.scale, E && x.scene.position.set(E[0], E[1], E[2]), a && x.scene.rotation.set(a[0], a[1], a[2]), c && x.scene.scale.set(c[0], c[1], c[2]), E || a || c)) x.scene.updateMatrix(),
    x.scene.updateMatrixWorld();
    E = function(a) {
        return function() {
            A -= a;
            k();
            l.onLoadComplete()
        }
    };
    for (var H in J.fogs) a = J.fogs[H],
    "linear" === a.type ? p = new THREE.Fog(0, a.near, a.far) : "exp2" === a.type && (p = new THREE.FogExp2(0, a.density)),
    a = a.color,
    p.color.setRGB(a[0], a[1], a[2]),
    x.fogs[H] = p;
    for (var B in J.geometries) p = J.geometries[B],
    p.type in this.geometryHandlerMap && (t += 1, l.onLoadStart());
    for (var W in J.objects) p = J.objects[W],
    p.type && p.type in this.hierarchyHandlerMap && (t += 1, l.onLoadStart());
    I = t;
    for (B in J.geometries) if (p = J.geometries[B], "cube" === p.type) n = new THREE.CubeGeometry(p.width, p.height, p.depth, p.widthSegments, p.heightSegments, p.depthSegments),
    x.geometries[B] = n;
    else if ("plane" === p.type) n = new THREE.PlaneGeometry(p.width, p.height, p.widthSegments, p.heightSegments),
    x.geometries[B] = n;
    else if ("sphere" === p.type) n = new THREE.SphereGeometry(p.radius, p.widthSegments, p.heightSegments),
    x.geometries[B] = n;
    else if ("cylinder" === p.type) n = new THREE.CylinderGeometry(p.topRad, p.botRad, p.height, p.radSegs, p.heightSegs),
    x.geometries[B] = n;
    else if ("torus" === p.type) n = new THREE.TorusGeometry(p.radius, p.tube, p.segmentsR, p.segmentsT),
    x.geometries[B] = n;
    else if ("icosahedron" === p.type) n = new THREE.IcosahedronGeometry(p.radius, p.subdivisions),
    x.geometries[B] = n;
    else if (p.type in this.geometryHandlerMap) {
        W = {};
        for (q in p)"type" !== q && "url" !== q && (W[q] = p[q]);
        this.geometryHandlerMap[p.type].loaderObject.load(d(p.url, J.urlBaseType), g(B), W)
    } else "embedded" === p.type && (W = J.embeds[p.id], W.metadata = J.metadata, W && this.geometryHandlerMap.ascii.loaderObject.createModel(W, i(B), ""));
    for (var F in J.textures) if (B = J.textures[F], B.url instanceof Array) {
        A += B.url.length;
        for (q = 0; q < B.url.length; q++) l.onLoadStart()
    } else A += 1,
    l.onLoadStart();
    C = A;
    for (F in J.textures) {
        B = J.textures[F];
        void 0 !== B.mapping && void 0 !== THREE[B.mapping] && (B.mapping = new THREE[B.mapping]);
        if (B.url instanceof Array) {
            W = B.url.length;
            p = [];
            for (q = 0; q < W; q++) p[q] = d(B.url[q], J.urlBaseType);
            q = (q = /\.dds$/i.test(p[0])) ? THREE.ImageUtils.loadCompressedTextureCube(p, B.mapping, E(W)) : THREE.ImageUtils.loadTextureCube(p, B.mapping, E(W))
        } else q = /\.dds$/i.test(B.url),
        W = d(B.url, J.urlBaseType),
        p = E(1),
        q = q ? THREE.ImageUtils.loadCompressedTexture(W, B.mapping, p) : THREE.ImageUtils.loadTexture(W, B.mapping, p),
        void 0 !== THREE[B.minFilter] && (q.minFilter = THREE[B.minFilter]),
        void 0 !== THREE[B.magFilter] && (q.magFilter = THREE[B.magFilter]),
        B.anisotropy && (q.anisotropy = B.anisotropy),
        B.repeat && (q.repeat.set(B.repeat[0], B.repeat[1]), 1 !== B.repeat[0] && (q.wrapS = THREE.RepeatWrapping), 1 !== B.repeat[1] && (q.wrapT = THREE.RepeatWrapping)),
        B.offset && q.offset.set(B.offset[0], B.offset[1]),
        B.wrap && (W = {
            repeat: THREE.RepeatWrapping,
            mirror: THREE.MirroredRepeatWrapping
        },
        void 0 !== W[B.wrap[0]] && (q.wrapS = W[B.wrap[0]]), void 0 !== W[B.wrap[1]] && (q.wrapT = W[B.wrap[1]]));
        x.textures[F] = q
    }
    var K, L;
    for (K in J.materials) {
        F = J.materials[K];
        for (L in F.parameters)"envMap" === L || "map" === L || "lightMap" === L || "bumpMap" === L ? F.parameters[L] = x.textures[F.parameters[L]] : "shading" === L ? F.parameters[L] = "flat" === F.parameters[L] ? THREE.FlatShading: THREE.SmoothShading: "side" === L ? F.parameters[L] = "double" == F.parameters[L] ? THREE.DoubleSide: "back" == F.parameters[L] ? THREE.BackSide: THREE.FrontSide: "blending" === L ? F.parameters[L] = F.parameters[L] in THREE ? THREE[F.parameters[L]] : THREE.NormalBlending: "combine" === L ? F.parameters[L] = F.parameters[L] in THREE ? THREE[F.parameters[L]] : THREE.MultiplyOperation: "vertexColors" === L ? "face" == F.parameters[L] ? F.parameters[L] = THREE.FaceColors: F.parameters[L] && (F.parameters[L] = THREE.VertexColors) : "wrapRGB" === L && (E = F.parameters[L], F.parameters[L] = new THREE.Vector3(E[0], E[1], E[2]));
        void 0 !== F.parameters.opacity && 1 > F.parameters.opacity && (F.parameters.transparent = !0);
        F.parameters.normalMap ? (E = THREE.ShaderLib.normalmap, B = THREE.UniformsUtils.clone(E.uniforms), q = F.parameters.color, W = F.parameters.specular, p = F.parameters.ambient, H = F.parameters.shininess, B.tNormal.value = x.textures[F.parameters.normalMap], F.parameters.normalScale && B.uNormalScale.value.set(F.parameters.normalScale[0], F.parameters.normalScale[1]), F.parameters.map && (B.tDiffuse.value = F.parameters.map, B.enableDiffuse.value = !0), F.parameters.envMap && (B.tCube.value = F.parameters.envMap, B.enableReflection.value = !0, B.uReflectivity.value = F.parameters.reflectivity), F.parameters.lightMap && (B.tAO.value = F.parameters.lightMap, B.enableAO.value = !0), F.parameters.specularMap && (B.tSpecular.value = x.textures[F.parameters.specularMap], B.enableSpecular.value = !0), F.parameters.displacementMap && (B.tDisplacement.value = x.textures[F.parameters.displacementMap], B.enableDisplacement.value = !0, B.uDisplacementBias.value = F.parameters.displacementBias, B.uDisplacementScale.value = F.parameters.displacementScale), B.uDiffuseColor.value.setHex(q), B.uSpecularColor.value.setHex(W), B.uAmbientColor.value.setHex(p), B.uShininess.value = H, F.parameters.opacity && (B.uOpacity.value = F.parameters.opacity), s = new THREE.ShaderMaterial({
            fragmentShader: E.fragmentShader,
            vertexShader: E.vertexShader,
            uniforms: B,
            lights: !0,
            fog: !0
        })) : s = new THREE[F.type](F.parameters);
        x.materials[K] = s
    }
    for (K in J.materials) if (F = J.materials[K], F.parameters.materials) {
        L = [];
        for (q = 0; q < F.parameters.materials.length; q++) L.push(x.materials[F.parameters.materials[q]]);
        x.materials[K].materials = L
    }
    e();
    x.cameras && J.defaults.camera && (x.currentCamera = x.cameras[J.defaults.camera]);
    x.fogs && J.defaults.fog && (x.scene.fog = x.fogs[J.defaults.fog]);
    l.callbackSync(x);
    k()
};
THREE.TextureLoader = function() {
    THREE.EventDispatcher.call(this);
    this.crossOrigin = null
};
THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader,
    load: function(a) {
        var b = this,
        c = new Image;
        c.addEventListener("load",
        function() {
            var a = new THREE.Texture(c);
            a.needsUpdate = !0;
            b.dispatchEvent({
                type: "load",
                content: a
            })
        },
        !1);
        c.addEventListener("error",
        function() {
            b.dispatchEvent({
                type: "error",
                message: "Couldn't load URL [" + a + "]"
            })
        },
        !1);
        b.crossOrigin && (c.crossOrigin = b.crossOrigin);
        c.src = a
    }
};
THREE.Material = function() {
    THREE.EventDispatcher.call(this);
    this.id = THREE.MaterialIdCount++;
    this.name = "";
    this.side = THREE.FrontSide;
    this.opacity = 1;
    this.transparent = !1;
    this.blending = THREE.NormalBlending;
    this.blendSrc = THREE.SrcAlphaFactor;
    this.blendDst = THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = THREE.AddEquation;
    this.depthWrite = this.depthTest = !0;
    this.polygonOffset = !1;
    this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
    this.overdraw = !1;
    this.needsUpdate = this.visible = !0
};
THREE.Material.prototype.setValues = function(a) {
    if (void 0 !== a) for (var b in a) {
        var c = a[b];
        if (void 0 === c) console.warn("THREE.Material: '" + b + "' parameter is undefined.");
        else if (b in this) {
            var d = this[b];
            d instanceof THREE.Color && c instanceof THREE.Color ? d.copy(c) : d instanceof THREE.Color ? d.set(c) : d instanceof THREE.Vector3 && c instanceof THREE.Vector3 ? d.copy(c) : this[b] = c
        }
    }
};
THREE.Material.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Material);
    a.name = this.name;
    a.side = this.side;
    a.opacity = this.opacity;
    a.transparent = this.transparent;
    a.blending = this.blending;
    a.blendSrc = this.blendSrc;
    a.blendDst = this.blendDst;
    a.blendEquation = this.blendEquation;
    a.depthTest = this.depthTest;
    a.depthWrite = this.depthWrite;
    a.polygonOffset = this.polygonOffset;
    a.polygonOffsetFactor = this.polygonOffsetFactor;
    a.polygonOffsetUnits = this.polygonOffsetUnits;
    a.alphaTest = this.alphaTest;
    a.overdraw = this.overdraw;
    a.visible = this.visible;
    return a
};
THREE.Material.prototype.dispose = function() {
    this.dispatchEvent({
        type: "dispose"
    })
};
THREE.MaterialIdCount = 0;
THREE.LineBasicMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.linewidth = 1;
    this.linejoin = this.linecap = "round";
    this.vertexColors = !1;
    this.fog = !0;
    this.setValues(a)
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone = function() {
    var a = new THREE.LineBasicMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.linewidth = this.linewidth;
    a.linecap = this.linecap;
    a.linejoin = this.linejoin;
    a.vertexColors = this.vertexColors;
    a.fog = this.fog;
    return a
};
THREE.LineDashedMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.scale = this.linewidth = 1;
    this.dashSize = 3;
    this.gapSize = 1;
    this.vertexColors = !1;
    this.fog = !0;
    this.setValues(a)
};
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.clone = function() {
    var a = new THREE.LineDashedMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.linewidth = this.linewidth;
    a.scale = this.scale;
    a.dashSize = this.dashSize;
    a.gapSize = this.gapSize;
    a.vertexColors = this.vertexColors;
    a.fog = this.fog;
    return a
};
THREE.MeshBasicMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.envMap = this.specularMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphTargets = this.skinning = !1;
    this.setValues(a)
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone = function() {
    var a = new THREE.MeshBasicMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.map = this.map;
    a.lightMap = this.lightMap;
    a.specularMap = this.specularMap;
    a.envMap = this.envMap;
    a.combine = this.combine;
    a.reflectivity = this.reflectivity;
    a.refractionRatio = this.refractionRatio;
    a.fog = this.fog;
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    a.wireframeLinecap = this.wireframeLinecap;
    a.wireframeLinejoin = this.wireframeLinejoin;
    a.vertexColors = this.vertexColors;
    a.skinning = this.skinning;
    a.morphTargets = this.morphTargets;
    return a
};
THREE.MeshLambertMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.ambient = new THREE.Color(16777215);
    this.emissive = new THREE.Color(0);
    this.wrapAround = !1;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.envMap = this.specularMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a)
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone = function() {
    var a = new THREE.MeshLambertMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.ambient.copy(this.ambient);
    a.emissive.copy(this.emissive);
    a.wrapAround = this.wrapAround;
    a.wrapRGB.copy(this.wrapRGB);
    a.map = this.map;
    a.lightMap = this.lightMap;
    a.specularMap = this.specularMap;
    a.envMap = this.envMap;
    a.combine = this.combine;
    a.reflectivity = this.reflectivity;
    a.refractionRatio = this.refractionRatio;
    a.fog = this.fog;
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    a.wireframeLinecap = this.wireframeLinecap;
    a.wireframeLinejoin = this.wireframeLinejoin;
    a.vertexColors = this.vertexColors;
    a.skinning = this.skinning;
    a.morphTargets = this.morphTargets;
    a.morphNormals = this.morphNormals;
    return a
};
THREE.MeshPhongMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.ambient = new THREE.Color(16777215);
    this.emissive = new THREE.Color(0);
    this.specular = new THREE.Color(1118481);
    this.shininess = 30;
    this.metal = !1;
    this.perPixel = !0;
    this.wrapAround = !1;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.bumpMap = this.lightMap = this.map = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalScale = new THREE.Vector2(1, 1);
    this.envMap = this.specularMap = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a)
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone = function() {
    var a = new THREE.MeshPhongMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.ambient.copy(this.ambient);
    a.emissive.copy(this.emissive);
    a.specular.copy(this.specular);
    a.shininess = this.shininess;
    a.metal = this.metal;
    a.perPixel = this.perPixel;
    a.wrapAround = this.wrapAround;
    a.wrapRGB.copy(this.wrapRGB);
    a.map = this.map;
    a.lightMap = this.lightMap;
    a.bumpMap = this.bumpMap;
    a.bumpScale = this.bumpScale;
    a.normalMap = this.normalMap;
    a.normalScale.copy(this.normalScale);
    a.specularMap = this.specularMap;
    a.envMap = this.envMap;
    a.combine = this.combine;
    a.reflectivity = this.reflectivity;
    a.refractionRatio = this.refractionRatio;
    a.fog = this.fog;
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    a.wireframeLinecap = this.wireframeLinecap;
    a.wireframeLinejoin = this.wireframeLinejoin;
    a.vertexColors = this.vertexColors;
    a.skinning = this.skinning;
    a.morphTargets = this.morphTargets;
    a.morphNormals = this.morphNormals;
    return a
};
THREE.MeshDepthMaterial = function(a) {
    THREE.Material.call(this);
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.setValues(a)
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.clone = function() {
    var a = new THREE.LineBasicMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    return a
};
THREE.MeshNormalMaterial = function(a) {
    THREE.Material.call(this, a);
    this.shading = THREE.FlatShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.setValues(a)
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.clone = function() {
    var a = new THREE.MeshNormalMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    return a
};
THREE.MeshFaceMaterial = function(a) {
    this.materials = a instanceof Array ? a: []
};
THREE.MeshFaceMaterial.prototype.clone = function() {
    return new THREE.MeshFaceMaterial(this.materials.slice(0))
};
THREE.ParticleBasicMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.map = null;
    this.size = 1;
    this.sizeAttenuation = !0;
    this.vertexColors = !1;
    this.fog = !0;
    this.setValues(a)
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone = function() {
    var a = new THREE.ParticleBasicMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.map = this.map;
    a.size = this.size;
    a.sizeAttenuation = this.sizeAttenuation;
    a.vertexColors = this.vertexColors;
    a.fog = this.fog;
    return a
};
THREE.ParticleCanvasMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.program = function() {};
    this.setValues(a)
};
THREE.ParticleCanvasMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleCanvasMaterial.prototype.clone = function() {
    var a = new THREE.ParticleCanvasMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.program = this.program;
    return a
};
THREE.ShaderMaterial = function(a) {
    THREE.Material.call(this);
    this.vertexShader = this.fragmentShader = "void main() {}";
    this.uniforms = {};
    this.defines = {};
    this.attributes = null;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.lights = this.fog = !1;
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a)
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone = function() {
    var a = new THREE.ShaderMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.fragmentShader = this.fragmentShader;
    a.vertexShader = this.vertexShader;
    a.uniforms = THREE.UniformsUtils.clone(this.uniforms);
    a.attributes = this.attributes;
    a.defines = this.defines;
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    a.fog = this.fog;
    a.lights = this.lights;
    a.vertexColors = this.vertexColors;
    a.skinning = this.skinning;
    a.morphTargets = this.morphTargets;
    a.morphNormals = this.morphNormals;
    return a
};
THREE.SpriteMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.map = new THREE.Texture;
    this.useScreenCoordinates = !0;
    this.depthTest = !this.useScreenCoordinates;
    this.sizeAttenuation = !this.useScreenCoordinates;
    this.scaleByViewport = !this.sizeAttenuation;
    this.alignment = THREE.SpriteAlignment.center.clone();
    this.fog = !1;
    this.uvOffset = new THREE.Vector2(0, 0);
    this.uvScale = new THREE.Vector2(1, 1);
    this.setValues(a);
    a = a || {};
    void 0 === a.depthTest && (this.depthTest = !this.useScreenCoordinates);
    void 0 === a.sizeAttenuation && (this.sizeAttenuation = !this.useScreenCoordinates);
    void 0 === a.scaleByViewport && (this.scaleByViewport = !this.sizeAttenuation)
};
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.clone = function() {
    var a = new THREE.SpriteMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.map = this.map;
    a.useScreenCoordinates = this.useScreenCoordinates;
    a.sizeAttenuation = this.sizeAttenuation;
    a.scaleByViewport = this.scaleByViewport;
    a.alignment.copy(this.alignment);
    a.uvOffset.copy(this.uvOffset);
    a.uvScale.copy(this.uvScale);
    a.fog = this.fog;
    return a
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2( - 1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2( - 1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2( - 1, 1);
THREE.Texture = function(a, b, c, d, e, f, g, h, i) {
    THREE.EventDispatcher.call(this);
    this.id = THREE.TextureIdCount++;
    this.name = "";
    this.image = a;
    this.mipmaps = [];
    this.mapping = void 0 !== b ? b: new THREE.UVMapping;
    this.wrapS = void 0 !== c ? c: THREE.ClampToEdgeWrapping;
    this.wrapT = void 0 !== d ? d: THREE.ClampToEdgeWrapping;
    this.magFilter = void 0 !== e ? e: THREE.LinearFilter;
    this.minFilter = void 0 !== f ? f: THREE.LinearMipMapLinearFilter;
    this.anisotropy = void 0 !== i ? i: 1;
    this.format = void 0 !== g ? g: THREE.RGBAFormat;
    this.type = void 0 !== h ? h: THREE.UnsignedByteType;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.generateMipmaps = !0;
    this.premultiplyAlpha = !1;
    this.flipY = !0;
    this.unpackAlignment = 4;
    this.needsUpdate = !1;
    this.onUpdate = null
};
THREE.Texture.prototype = {
    constructor: THREE.Texture,
    clone: function(a) {
        void 0 === a && (a = new THREE.Texture);
        a.image = this.image;
        a.mipmaps = this.mipmaps.slice(0);
        a.mapping = this.mapping;
        a.wrapS = this.wrapS;
        a.wrapT = this.wrapT;
        a.magFilter = this.magFilter;
        a.minFilter = this.minFilter;
        a.anisotropy = this.anisotropy;
        a.format = this.format;
        a.type = this.type;
        a.offset.copy(this.offset);
        a.repeat.copy(this.repeat);
        a.generateMipmaps = this.generateMipmaps;
        a.premultiplyAlpha = this.premultiplyAlpha;
        a.flipY = this.flipY;
        a.unpackAlignment = this.unpackAlignment;
        return a
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
};
THREE.TextureIdCount = 0;
THREE.CompressedTexture = function(a, b, c, d, e, f, g, h, i, k, l) {
    THREE.Texture.call(this, null, f, g, h, i, k, d, e, l);
    this.image = {
        width: b,
        height: c
    };
    this.mipmaps = a;
    this.generateMipmaps = !1
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.clone = function() {
    var a = new THREE.CompressedTexture;
    THREE.Texture.prototype.clone.call(this, a);
    return a
};
THREE.DataTexture = function(a, b, c, d, e, f, g, h, i, k, l) {
    THREE.Texture.call(this, null, f, g, h, i, k, d, e, l);
    this.image = {
        data: a,
        width: b,
        height: c
    }
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.clone = function() {
    var a = new THREE.DataTexture;
    THREE.Texture.prototype.clone.call(this, a);
    return a
};
THREE.Particle = function(a) {
    THREE.Object3D.call(this);
    this.material = a
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.Particle.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Particle(this.material));
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};
THREE.ParticleSystem = function(a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = void 0 !== b ? b: new THREE.ParticleBasicMaterial({
        color: 16777215 * Math.random()
    });
    this.sortParticles = !1;
    this.geometry && null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere();
    this.frustumCulled = !1
};
THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.ParticleSystem(this.geometry, this.material));
    a.sortParticles = this.sortParticles;
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};
THREE.Line = function(a, b, c) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = void 0 !== b ? b: new THREE.LineBasicMaterial({
        color: 16777215 * Math.random()
    });
    this.type = void 0 !== c ? c: THREE.LineStrip;
    this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Line(this.geometry, this.material, this.type));
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};
THREE.Mesh = function(a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = void 0 !== b ? b: new THREE.MeshBasicMaterial({
        color: 16777215 * Math.random(),
        wireframe: !0
    });
    void 0 !== this.geometry && (null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere(), this.updateMorphTargets())
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.updateMorphTargets = function() {
    if (0 < this.geometry.morphTargets.length) {
        this.morphTargetBase = -1;
        this.morphTargetForcedOrder = [];
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (var a = 0,
        b = this.geometry.morphTargets.length; a < b; a++) this.morphTargetInfluences.push(0),
        this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
    }
};
THREE.Mesh.prototype.getMorphTargetIndexByName = function(a) {
    if (void 0 !== this.morphTargetDictionary[a]) return this.morphTargetDictionary[a];
    console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
    return 0
};
THREE.Mesh.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Mesh(this.geometry, this.material));
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};
THREE.Bone = function(a) {
    THREE.Object3D.call(this);
    this.skin = a;
    this.skinMatrix = new THREE.Matrix4
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update = function(a, b) {
    this.matrixAutoUpdate && (b |= this.updateMatrix());
    if (b || this.matrixWorldNeedsUpdate) a ? this.skinMatrix.multiplyMatrices(a, this.matrix) : this.skinMatrix.copy(this.matrix),
    this.matrixWorldNeedsUpdate = !1,
    b = !0;
    var c, d = this.children.length;
    for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b)
};
THREE.SkinnedMesh = function(a, b, c) {
    THREE.Mesh.call(this, a, b);
    this.useVertexTexture = void 0 !== c ? c: !0;
    this.identityMatrix = new THREE.Matrix4;
    this.bones = [];
    this.boneMatrices = [];
    var d, e, f;
    if (this.geometry && void 0 !== this.geometry.bones) {
        for (a = 0; a < this.geometry.bones.length; a++) c = this.geometry.bones[a],
        d = c.pos,
        e = c.rotq,
        f = c.scl,
        b = this.addBone(),
        b.name = c.name,
        b.position.set(d[0], d[1], d[2]),
        b.quaternion.set(e[0], e[1], e[2], e[3]),
        b.useQuaternion = !0,
        void 0 !== f ? b.scale.set(f[0], f[1], f[2]) : b.scale.set(1, 1, 1);
        for (a = 0; a < this.bones.length; a++) c = this.geometry.bones[a],
        b = this.bones[a],
        -1 === c.parent ? this.add(b) : this.bones[c.parent].add(b);
        a = this.bones.length;
        this.useVertexTexture ? (this.boneTextureHeight = this.boneTextureWidth = a = 256 < a ? 64 : 64 < a ? 32 : 16 < a ? 16 : 8, this.boneMatrices = new Float32Array(4 * this.boneTextureWidth * this.boneTextureHeight), this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType), this.boneTexture.minFilter = THREE.NearestFilter, this.boneTexture.magFilter = THREE.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * a);
        this.pose()
    }
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.addBone = function(a) {
    void 0 === a && (a = new THREE.Bone(this));
    this.bones.push(a);
    return a
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function(a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix),
    this.matrixWorldNeedsUpdate = !1;
    for (var a = 0,
    b = this.children.length; a < b; a++) {
        var c = this.children[a];
        c instanceof THREE.Bone ? c.update(this.identityMatrix, !1) : c.updateMatrixWorld(!0)
    }
    if (void 0 == this.boneInverses) {
        this.boneInverses = [];
        a = 0;
        for (b = this.bones.length; a < b; a++) c = new THREE.Matrix4,
        c.getInverse(this.bones[a].skinMatrix),
        this.boneInverses.push(c)
    }
    a = 0;
    for (b = this.bones.length; a < b; a++) THREE.SkinnedMesh.offsetMatrix.multiplyMatrices(this.bones[a].skinMatrix, this.boneInverses[a]),
    THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset(this.boneMatrices, 16 * a);
    this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
};
THREE.SkinnedMesh.prototype.pose = function() {
    this.updateMatrixWorld(!0);
    for (var a = 0; a < this.geometry.skinIndices.length; a++) {
        var b = this.geometry.skinWeights[a],
        c = 1 / b.lengthManhattan();
        Infinity !== c ? b.multiplyScalar(c) : b.set(1)
    }
};
THREE.SkinnedMesh.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture));
    THREE.Mesh.prototype.clone.call(this, a);
    return a
};
THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4;
THREE.MorphAnimMesh = function(a, b) {
    THREE.Mesh.call(this, a, b);
    this.duration = 1E3;
    this.mirroredLoop = !1;
    this.currentKeyframe = this.lastKeyframe = this.time = 0;
    this.direction = 1;
    this.directionBackwards = !1;
    this.setFrameRange(0, this.geometry.morphTargets.length - 1)
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.setFrameRange = function(a, b) {
    this.startKeyframe = a;
    this.endKeyframe = b;
    this.length = this.endKeyframe - this.startKeyframe + 1
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function() {
    this.direction = 1;
    this.directionBackwards = !1
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function() {
    this.direction = -1;
    this.directionBackwards = !0
};
THREE.MorphAnimMesh.prototype.parseAnimations = function() {
    var a = this.geometry;
    a.animations || (a.animations = {});
    for (var b, c = a.animations,
    d = /([a-z]+)(\d+)/,
    e = 0,
    f = a.morphTargets.length; e < f; e++) {
        var g = a.morphTargets[e].name.match(d);
        if (g && 1 < g.length) {
            g = g[1];
            c[g] || (c[g] = {
                start: Infinity,
                end: -Infinity
            });
            var h = c[g];
            e < h.start && (h.start = e);
            e > h.end && (h.end = e);
            b || (b = g)
        }
    }
    a.firstAnimation = b
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function(a, b, c) {
    this.geometry.animations || (this.geometry.animations = {});
    this.geometry.animations[a] = {
        start: b,
        end: c
    }
};
THREE.MorphAnimMesh.prototype.playAnimation = function(a, b) {
    var c = this.geometry.animations[a];
    c ? (this.setFrameRange(c.start, c.end), this.duration = 1E3 * ((c.end - c.start) / b), this.time = 0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphAnimMesh.prototype.updateAnimation = function(a) {
    var b = this.duration / this.length;
    this.time += this.direction * a;
    if (this.mirroredLoop) {
        if (this.time > this.duration || 0 > this.time) this.direction *= -1,
        this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0),
        0 > this.time && (this.time = 0, this.directionBackwards = !1)
    } else this.time %= this.duration,
    0 > this.time && (this.time += this.duration);
    a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
    a !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[a] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = a);
    b = this.time % b / b;
    this.directionBackwards && (b = 1 - b);
    this.morphTargetInfluences[this.currentKeyframe] = b;
    this.morphTargetInfluences[this.lastKeyframe] = 1 - b
};
THREE.MorphAnimMesh.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.MorphAnimMesh(this.geometry, this.material));
    a.duration = this.duration;
    a.mirroredLoop = this.mirroredLoop;
    a.time = this.time;
    a.lastKeyframe = this.lastKeyframe;
    a.currentKeyframe = this.currentKeyframe;
    a.direction = this.direction;
    a.directionBackwards = this.directionBackwards;
    THREE.Mesh.prototype.clone.call(this, a);
    return a
};
THREE.Ribbon = function(a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = b
};
THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype);
THREE.Ribbon.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Ribbon(this.geometry, this.material));
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};
THREE.LOD = function() {
    THREE.Object3D.call(this);
    this.LODs = []
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.addLevel = function(a, b) {
    void 0 === b && (b = 0);
    for (var b = Math.abs(b), c = 0; c < this.LODs.length && !(b < this.LODs[c].visibleAtDistance); c++);
    this.LODs.splice(c, 0, {
        visibleAtDistance: b,
        object3D: a
    });
    this.add(a)
};
THREE.LOD.prototype.update = function(a) {
    if (1 < this.LODs.length) {
        a.matrixWorldInverse.getInverse(a.matrixWorld);
        a = a.matrixWorldInverse;
        a = -(a.elements[2] * this.matrixWorld.elements[12] + a.elements[6] * this.matrixWorld.elements[13] + a.elements[10] * this.matrixWorld.elements[14] + a.elements[14]);
        this.LODs[0].object3D.visible = !0;
        for (var b = 1; b < this.LODs.length; b++) if (a >= this.LODs[b].visibleAtDistance) this.LODs[b - 1].object3D.visible = !1,
        this.LODs[b].object3D.visible = !0;
        else break;
        for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible = !1
    }
};
THREE.LOD.prototype.clone = function() {};
THREE.Sprite = function(a) {
    THREE.Object3D.call(this);
    this.material = void 0 !== a ? a: new THREE.SpriteMaterial;
    this.rotation3d = this.rotation;
    this.rotation = 0
};
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.updateMatrix = function() {
    this.matrix.setPosition(this.position);
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d); (1 !== this.scale.x || 1 !== this.scale.y) && this.matrix.scale(this.scale);
    this.matrixWorldNeedsUpdate = !0
};
THREE.Sprite.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Sprite(this.material));
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};
THREE.Scene = function() {
    THREE.Object3D.call(this);
    this.overrideMaterial = this.fog = null;
    this.matrixAutoUpdate = !1;
    this.__objects = [];
    this.__lights = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function(a) {
    if (a instanceof THREE.Light) - 1 === this.__lights.indexOf(a) && this.__lights.push(a),
    a.target && void 0 === a.target.parent && this.add(a.target);
    else if (! (a instanceof THREE.Camera || a instanceof THREE.Bone) && -1 === this.__objects.indexOf(a)) {
        this.__objects.push(a);
        this.__objectsAdded.push(a);
        var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
    }
    for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
};
THREE.Scene.prototype.__removeObject = function(a) {
    if (a instanceof THREE.Light) {
        var b = this.__lights.indexOf(a); - 1 !== b && this.__lights.splice(b, 1)
    } else a instanceof THREE.Camera || (b = this.__objects.indexOf(a), -1 !== b && (this.__objects.splice(b, 1), this.__objectsRemoved.push(a), b = this.__objectsAdded.indexOf(a), -1 !== b && this.__objectsAdded.splice(b, 1)));
    for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
};
THREE.Fog = function(a, b, c) {
    this.name = "";
    this.color = new THREE.Color(a);
    this.near = void 0 !== b ? b: 1;
    this.far = void 0 !== c ? c: 1E3
};
THREE.Fog.prototype.clone = function() {
    return new THREE.Fog(this.color.getHex(), this.near, this.far)
};
THREE.FogExp2 = function(a, b) {
    this.name = "";
    this.color = new THREE.Color(a);
    this.density = void 0 !== b ? b: 2.5E-4
};
THREE.FogExp2.prototype.clone = function() {
    return new THREE.FogExp2(this.color.getHex(), this.density)
};
THREE.CanvasRenderer = function(a) {
    function b(a) {
        C !== a && (C = t.globalAlpha = a)
    }
    function c(a) {
        x !== a && (a === THREE.NormalBlending ? t.globalCompositeOperation = "source-over": a === THREE.AdditiveBlending ? t.globalCompositeOperation = "lighter": a === THREE.SubtractiveBlending && (t.globalCompositeOperation = "darker"), x = a)
    }
    function d(a) {
        E !== a && (E = t.lineWidth = a)
    }
    function e(a) {
        H !== a && (H = t.lineCap = a)
    }
    function f(a) {
        B !== a && (B = t.lineJoin = a)
    }
    function g(a) {
        G !== a && (G = t.strokeStyle = a)
    }
    function h(a) {
        J !== a && (J = t.fillStyle = a)
    }
    function i(a, b) {
        if (W !== a || F !== b) t.setLineDash([a, b]),
        W = a,
        F = b
    }
    console.log("THREE.CanvasRenderer", THREE.REVISION);
    var k = THREE.Math.smoothstep,
    a = a || {},
    l = this,
    m, n, s, r = new THREE.Projector,
    p = void 0 !== a.canvas ? a.canvas: document.createElement("canvas"),
    q,
    y,
    v,
    z,
    t = p.getContext("2d"),
    A = new THREE.Color(0),
    I = 0,
    C = 1,
    x = 0,
    G = null,
    J = null,
    E = null,
    H = null,
    B = null,
    W = null,
    F = 0,
    K,
    L,
    U,
    fa,
    Ca = new THREE.RenderableVertex,
    $a = new THREE.RenderableVertex,
    M,
    ca,
    qa,
    ha,
    ra,
    N,
    Ma,
    Na,
    mb,
    Pa,
    ta,
    ka,
    aa = new THREE.Color,
    pa = new THREE.Color,
    Y = new THREE.Color,
    da = new THREE.Color,
    la = new THREE.Color,
    Z = new THREE.Color,
    oa = new THREE.Color,
    gb = new THREE.Color,
    nb = {},
    ia = {},
    Wa,
    ab,
    Fa,
    Xa,
    ub,
    Ib,
    Jb,
    fc,
    Ab,
    mc,
    pb = new THREE.Box2,
    Ka = new THREE.Box2,
    Va = new THREE.Box2,
    gc = !1,
    vb = new THREE.Color,
    Qa = new THREE.Color,
    La = new THREE.Color,
    bb = new THREE.Vector3,
    xb,
    j,
    yb,
    Ra,
    cb,
    Sa,
    zb = 16;
    xb = document.createElement("canvas");
    xb.width = xb.height = 2;
    j = xb.getContext("2d");
    j.fillStyle = "rgba(0,0,0,1)";
    j.fillRect(0, 0, 2, 2);
    yb = j.getImageData(0, 0, 2, 2);
    Ra = yb.data;
    cb = document.createElement("canvas");
    cb.width = cb.height = zb;
    Sa = cb.getContext("2d");
    Sa.translate( - zb / 2, -zb / 2);
    Sa.scale(zb, zb);
    zb--;
    void 0 === t.setLineDash && (t.setLineDash = void 0 !== t.mozDash ?
    function(a) {
        t.mozDash = null !== a[0] ? a: null
    }: function() {});
    this.domElement = p;
    this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio: void 0 !== window.devicePixelRatio ? window.devicePixelRatio: 1;
    this.sortElements = this.sortObjects = this.autoClear = !0;
    this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    };
    this.supportsVertexTextures = function() {};
    this.setFaceCulling = function() {};
    this.setSize = function(a, b) {
        q = a * this.devicePixelRatio;
        y = b * this.devicePixelRatio;
        v = Math.floor(q / 2);
        z = Math.floor(y / 2);
        p.width = q;
        p.height = y;
        p.style.width = a + "px";
        p.style.height = b + "px";
        pb.set(new THREE.Vector2( - v, -z), new THREE.Vector2(v, z));
        Ka.set(new THREE.Vector2( - v, -z), new THREE.Vector2(v, z));
        C = 1;
        x = 0;
        B = H = E = J = G = null
    };
    this.setClearColor = function(a, b) {
        A.copy(a);
        I = void 0 !== b ? b: 1;
        Ka.set(new THREE.Vector2( - v, -z), new THREE.Vector2(v, z))
    };
    this.setClearColorHex = function(a, b) {
        A.setHex(a);
        I = void 0 !== b ? b: 1;
        Ka.set(new THREE.Vector2( - v, -z), new THREE.Vector2(v, z))
    };
    this.getMaxAnisotropy = function() {
        return 0
    };
    this.clear = function() {
        t.setTransform(1, 0, 0, -1, v, z); ! 1 === Ka.empty() && (Ka.intersect(pb), Ka.expandByScalar(2), 1 > I && t.clearRect(Ka.min.x | 0, Ka.min.y | 0, Ka.max.x - Ka.min.x | 0, Ka.max.y - Ka.min.y | 0), 0 < I && (c(THREE.NormalBlending), b(1), h("rgba(" + Math.floor(255 * A.r) + "," + Math.floor(255 * A.g) + "," + Math.floor(255 * A.b) + "," + I + ")"), t.fillRect(Ka.min.x | 0, Ka.min.y | 0, Ka.max.x - Ka.min.x | 0, Ka.max.y - Ka.min.y | 0)), Ka.makeEmpty())
    };
    this.render = function(a, p) {
        function q(a, b, c) {
            for (var d = 0,
            e = s.length; d < e; d++) {
                var f = s[d];
                gb.copy(f.color);
                if (f instanceof THREE.DirectionalLight) {
                    var g = bb.getPositionFromMatrix(f.matrixWorld).normalize(),
                    j = b.dot(g);
                    0 >= j || (j *= f.intensity, c.add(gb.multiplyScalar(j)))
                } else f instanceof THREE.PointLight && (g = bb.getPositionFromMatrix(f.matrixWorld), j = b.dot(bb.subVectors(g, a).normalize()), 0 >= j || (j *= 0 == f.distance ? 1 : 1 - Math.min(a.distanceTo(g) / f.distance, 1), 0 != j && (j *= f.intensity, c.add(gb.multiplyScalar(j)))))
            }
        }
        function x(a, d, e, f, g, j, h, i) {
            l.info.render.vertices += 3;
            l.info.render.faces++;
            b(i.opacity);
            c(i.blending);
            M = a.positionScreen.x;
            ca = a.positionScreen.y;
            qa = d.positionScreen.x;
            ha = d.positionScreen.y;
            ra = e.positionScreen.x;
            N = e.positionScreen.y;
            y(M, ca, qa, ha, ra, N); (i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial) && null === i.map ? (Z.copy(i.color), oa.copy(i.emissive), i.vertexColors === THREE.FaceColors && Z.multiply(h.color), !0 === gc ? !1 === i.wireframe && i.shading == THREE.SmoothShading && 3 == h.vertexNormalsLength ? (pa.copy(vb), Y.copy(vb), da.copy(vb), q(h.v1.positionWorld, h.vertexNormalsModel[0], pa), q(h.v2.positionWorld, h.vertexNormalsModel[1], Y), q(h.v3.positionWorld, h.vertexNormalsModel[2], da), pa.multiply(Z).add(oa), Y.multiply(Z).add(oa), da.multiply(Z).add(oa), la.addColors(Y, da).multiplyScalar(0.5), Fa = E(pa, Y, da, la), G(M, ca, qa, ha, ra, N, 0, 0, 1, 0, 0, 1, Fa)) : (aa.copy(vb), q(h.centroidModel, h.normalModel, aa), aa.multiply(Z).add(oa), !0 === i.wireframe ? C(aa, i.wireframeLinewidth, i.wireframeLinecap, i.wireframeLinejoin) : A(aa)) : !0 === i.wireframe ? C(i.color, i.wireframeLinewidth, i.wireframeLinecap, i.wireframeLinejoin) : A(i.color)) : i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial ? null !== i.map ? i.map.mapping instanceof THREE.UVMapping && (Xa = h.uvs[0], F(M, ca, qa, ha, ra, N, Xa[f].x, Xa[f].y, Xa[g].x, Xa[g].y, Xa[j].x, Xa[j].y, i.map)) : null !== i.envMap ? i.envMap.mapping instanceof THREE.SphericalReflectionMapping && (bb.copy(h.vertexNormalsModelView[f]), ub = 0.5 * bb.x + 0.5, Ib = 0.5 * bb.y + 0.5, bb.copy(h.vertexNormalsModelView[g]), Jb = 0.5 * bb.x + 0.5, fc = 0.5 * bb.y + 0.5, bb.copy(h.vertexNormalsModelView[j]), Ab = 0.5 * bb.x + 0.5, mc = 0.5 * bb.y + 0.5, F(M, ca, qa, ha, ra, N, ub, Ib, Jb, fc, Ab, mc, i.envMap)) : (aa.copy(i.color), i.vertexColors === THREE.FaceColors && aa.multiply(h.color), !0 === i.wireframe ? C(aa, i.wireframeLinewidth, i.wireframeLinecap, i.wireframeLinejoin) : A(aa)) : i instanceof THREE.MeshDepthMaterial ? (Wa = p.near, ab = p.far, pa.r = pa.g = pa.b = 1 - k(a.positionScreen.z * a.positionScreen.w, Wa, ab), Y.r = Y.g = Y.b = 1 - k(d.positionScreen.z * d.positionScreen.w, Wa, ab), da.r = da.g = da.b = 1 - k(e.positionScreen.z * e.positionScreen.w, Wa, ab), la.addColors(Y, da).multiplyScalar(0.5), Fa = E(pa, Y, da, la), G(M, ca, qa, ha, ra, N, 0, 0, 1, 0, 0, 1, Fa)) : i instanceof THREE.MeshNormalMaterial && (i.shading == THREE.FlatShading ? (a = h.normalModelView, aa.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), !0 === i.wireframe ? C(aa, i.wireframeLinewidth, i.wireframeLinecap, i.wireframeLinejoin) : A(aa)) : i.shading == THREE.SmoothShading && (a = h.vertexNormalsModelView[f], pa.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), a = h.vertexNormalsModelView[g], Y.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), a = h.vertexNormalsModelView[j], da.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), la.addColors(Y, da).multiplyScalar(0.5), Fa = E(pa, Y, da, la), G(M, ca, qa, ha, ra, N, 0, 0, 1, 0, 0, 1, Fa)))
        }
        function y(a, b, c, d, e, f) {
            t.beginPath();
            t.moveTo(a, b);
            t.lineTo(c, d);
            t.lineTo(e, f);
            t.closePath()
        }
        function B(a, b, c, d, e, f, g, j) {
            t.beginPath();
            t.moveTo(a, b);
            t.lineTo(c, d);
            t.lineTo(e, f);
            t.lineTo(g, j);
            t.closePath()
        }
        function C(a, b, c, j) {
            d(b);
            e(c);
            f(j);
            g(a.getStyle());
            t.stroke();
            Va.expandByScalar(2 * b)
        }
        function A(a) {
            h(a.getStyle());
            t.fill()
        }
        function F(a, b, c, d, e, f, g, j, i, wa, k, l, n) {
            if (! (n instanceof THREE.DataTexture || void 0 === n.image || 0 == n.image.width)) {
                if (!0 === n.needsUpdate) {
                    var m = n.wrapS == THREE.RepeatWrapping,
                    hb = n.wrapT == THREE.RepeatWrapping;
                    nb[n.id] = t.createPattern(n.image, !0 === m && !0 === hb ? "repeat": !0 === m && !1 === hb ? "repeat-x": !1 === m && !0 === hb ? "repeat-y": "no-repeat");
                    n.needsUpdate = !1
                }
                void 0 === nb[n.id] ? h("rgba(0,0,0,1)") : h(nb[n.id]);
                var m = n.offset.x / n.repeat.x,
                hb = n.offset.y / n.repeat.y,
                p = n.image.width * n.repeat.x,
                q = n.image.height * n.repeat.y,
                g = (g + m) * p,
                j = (1 - j + hb) * q,
                c = c - a,
                d = d - b,
                e = e - a,
                f = f - b,
                i = (i + m) * p - g,
                wa = (1 - wa + hb) * q - j,
                k = (k + m) * p - g,
                l = (1 - l + hb) * q - j,
                m = i * l - k * wa;
                0 === m ? (void 0 === ia[n.id] && (b = document.createElement("canvas"), b.width = n.image.width, b.height = n.image.height, b = b.getContext("2d"), b.drawImage(n.image, 0, 0), ia[n.id] = b.getImageData(0, 0, n.image.width, n.image.height).data), b = ia[n.id], g = 4 * (Math.floor(g) + Math.floor(j) * n.image.width), aa.setRGB(b[g] / 255, b[g + 1] / 255, b[g + 2] / 255), A(aa)) : (m = 1 / m, n = (l * c - wa * e) * m, wa = (l * d - wa * f) * m, c = (i * e - k * c) * m, d = (i * f - k * d) * m, a = a - n * g - c * j, g = b - wa * g - d * j, t.save(), t.transform(n, wa, c, d, a, g), t.fill(), t.restore())
            }
        }
        function G(a, b, c, d, e, f, g, j, i, h, wa, k, n) {
            var l, m;
            l = n.width - 1;
            m = n.height - 1;
            g *= l;
            j *= m;
            c -= a;
            d -= b;
            e -= a;
            f -= b;
            i = i * l - g;
            h = h * m - j;
            wa = wa * l - g;
            k = k * m - j;
            m = 1 / (i * k - wa * h);
            l = (k * c - h * e) * m;
            h = (k * d - h * f) * m;
            c = (i * e - wa * c) * m;
            d = (i * f - wa * d) * m;
            a = a - l * g - c * j;
            b = b - h * g - d * j;
            t.save();
            t.transform(l, h, c, d, a, b);
            t.clip();
            t.drawImage(n, 0, 0);
            t.restore()
        }
        function E(a, b, c, d) {
            Ra[0] = 255 * a.r | 0;
            Ra[1] = 255 * a.g | 0;
            Ra[2] = 255 * a.b | 0;
            Ra[4] = 255 * b.r | 0;
            Ra[5] = 255 * b.g | 0;
            Ra[6] = 255 * b.b | 0;
            Ra[8] = 255 * c.r | 0;
            Ra[9] = 255 * c.g | 0;
            Ra[10] = 255 * c.b | 0;
            Ra[12] = 255 * d.r | 0;
            Ra[13] = 255 * d.g | 0;
            Ra[14] = 255 * d.b | 0;
            j.putImageData(yb, 0, 0);
            Sa.drawImage(xb, 0, 0);
            return cb
        }
        function I(a, b) {
            var c = b.x - a.x,
            d = b.y - a.y,
            e = c * c + d * d;
            0 !== e && (e = 1 / Math.sqrt(e), c *= e, d *= e, b.x += c, b.y += d, a.x -= c, a.y -= d)
        }
        if (!1 === p instanceof THREE.Camera) console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");
        else { ! 0 === this.autoClear && this.clear();
            t.setTransform(1, 0, 0, -1, v, z);
            l.info.render.vertices = 0;
            l.info.render.faces = 0;
            m = r.projectScene(a, p, this.sortObjects, this.sortElements);
            n = m.elements;
            s = m.lights;
            gc = 0 < s.length;
            if (!0 === gc) {
                vb.setRGB(0, 0, 0);
                Qa.setRGB(0, 0, 0);
                La.setRGB(0, 0, 0);
                for (var J = 0,
                W = s.length; J < W; J++) {
                    var P = s[J],
                    X = P.color;
                    P instanceof THREE.AmbientLight ? vb.add(X) : P instanceof THREE.DirectionalLight ? Qa.add(X) : P instanceof THREE.PointLight && La.add(X)
                }
            }
            J = 0;
            for (W = n.length; J < W; J++) {
                var H = n[J],
                P = H.material;
                if (! (void 0 === P || !1 === P.visible)) {
                    Va.makeEmpty();
                    if (H instanceof THREE.RenderableParticle) {
                        K = H;
                        K.x *= v;
                        K.y *= z;
                        var X = K,
                        wa = H;
                        b(P.opacity);
                        c(P.blending);
                        var Bb = void 0,
                        hb = void 0,
                        Cb = void 0,
                        Db = void 0,
                        md = H = void 0,
                        nd = void 0;
                        P instanceof THREE.ParticleBasicMaterial ? null === P.map ? (Cb = wa.object.scale.x, Db = wa.object.scale.y, Cb *= wa.scale.x * v, Db *= wa.scale.y * z, Va.min.set(X.x - Cb, X.y - Db), Va.max.set(X.x + Cb, X.y + Db), !1 !== pb.isIntersectionBox(Va) && (h(P.color.getStyle()), t.save(), t.translate(X.x, X.y), t.rotate( - wa.rotation), t.scale(Cb, Db), t.fillRect( - 1, -1, 2, 2), t.restore())) : (H = P.map.image, md = H.width >> 1, nd = H.height >> 1, Cb = wa.scale.x * v, Db = wa.scale.y * z, Bb = Cb * md, hb = Db * nd, Va.min.set(X.x - Bb, X.y - hb), Va.max.set(X.x + Bb, X.y + hb), !1 !== pb.isIntersectionBox(Va) && (t.save(), t.translate(X.x, X.y), t.rotate( - wa.rotation), t.scale(Cb, -Db), t.translate( - md, -nd), t.drawImage(H, 0, 0), t.restore())) : P instanceof THREE.ParticleCanvasMaterial && (Bb = wa.scale.x * v, hb = wa.scale.y * z, Va.min.set(X.x - Bb, X.y - hb), Va.max.set(X.x + Bb, X.y + hb), !1 !== pb.isIntersectionBox(Va) && (g(P.color.getStyle()), h(P.color.getStyle()), t.save(), t.translate(X.x, X.y), t.rotate( - wa.rotation), t.scale(Bb, hb), P.program(t), t.restore()))
                    } else if (H instanceof THREE.RenderableLine) K = H.v1,
                    L = H.v2,
                    K.positionScreen.x *= v,
                    K.positionScreen.y *= z,
                    L.positionScreen.x *= v,
                    L.positionScreen.y *= z,
                    Va.setFromPoints([K.positionScreen, L.positionScreen]),
                    !0 === pb.isIntersectionBox(Va) && (X = K, wa = L, b(P.opacity), c(P.blending), t.beginPath(), t.moveTo(X.positionScreen.x, X.positionScreen.y), t.lineTo(wa.positionScreen.x, wa.positionScreen.y), P instanceof THREE.LineBasicMaterial ? (d(P.linewidth), e(P.linecap), f(P.linejoin), g(P.color.getStyle()), i(null, null), t.stroke(), Va.expandByScalar(2 * P.linewidth)) : P instanceof THREE.LineDashedMaterial && (d(P.linewidth), e(P.linecap), f(P.linejoin), g(P.color.getStyle()), i(P.dashSize, P.gapSize), t.stroke(), Va.expandByScalar(2 * P.linewidth)));
                    else if (H instanceof THREE.RenderableFace3) {
                        K = H.v1;
                        L = H.v2;
                        U = H.v3;
                        if ( - 1 > K.positionScreen.z || 1 < K.positionScreen.z) continue;
                        if ( - 1 > L.positionScreen.z || 1 < L.positionScreen.z) continue;
                        if ( - 1 > U.positionScreen.z || 1 < U.positionScreen.z) continue;
                        K.positionScreen.x *= v;
                        K.positionScreen.y *= z;
                        L.positionScreen.x *= v;
                        L.positionScreen.y *= z;
                        U.positionScreen.x *= v;
                        U.positionScreen.y *= z; ! 0 === P.overdraw && (I(K.positionScreen, L.positionScreen), I(L.positionScreen, U.positionScreen), I(U.positionScreen, K.positionScreen));
                        Va.setFromPoints([K.positionScreen, L.positionScreen, U.positionScreen]);
                        x(K, L, U, 0, 1, 2, H, P)
                    } else if (H instanceof THREE.RenderableFace4) {
                        K = H.v1;
                        L = H.v2;
                        U = H.v3;
                        fa = H.v4;
                        if ( - 1 > K.positionScreen.z || 1 < K.positionScreen.z) continue;
                        if ( - 1 > L.positionScreen.z || 1 < L.positionScreen.z) continue;
                        if ( - 1 > U.positionScreen.z || 1 < U.positionScreen.z) continue;
                        if ( - 1 > fa.positionScreen.z || 1 < fa.positionScreen.z) continue;
                        K.positionScreen.x *= v;
                        K.positionScreen.y *= z;
                        L.positionScreen.x *= v;
                        L.positionScreen.y *= z;
                        U.positionScreen.x *= v;
                        U.positionScreen.y *= z;
                        fa.positionScreen.x *= v;
                        fa.positionScreen.y *= z;
                        Ca.positionScreen.copy(L.positionScreen);
                        $a.positionScreen.copy(fa.positionScreen); ! 0 === P.overdraw && (I(K.positionScreen, L.positionScreen), I(L.positionScreen, fa.positionScreen), I(fa.positionScreen, K.positionScreen), I(U.positionScreen, Ca.positionScreen), I(U.positionScreen, $a.positionScreen));
                        Va.setFromPoints([K.positionScreen, L.positionScreen, U.positionScreen, fa.positionScreen]);
                        X = K;
                        wa = L;
                        Bb = U;
                        hb = fa;
                        Cb = Ca;
                        Db = $a;
                        l.info.render.vertices += 4;
                        l.info.render.faces++;
                        b(P.opacity);
                        c(P.blending);
                        void 0 !== P.map && null !== P.map || void 0 !== P.envMap && null !== P.envMap ? (x(X, wa, hb, 0, 1, 3, H, P), x(Cb, Bb, Db, 1, 2, 3, H, P)) : (M = X.positionScreen.x, ca = X.positionScreen.y, qa = wa.positionScreen.x, ha = wa.positionScreen.y, ra = Bb.positionScreen.x, N = Bb.positionScreen.y, Ma = hb.positionScreen.x, Na = hb.positionScreen.y, mb = Cb.positionScreen.x, Pa = Cb.positionScreen.y, ta = Db.positionScreen.x, ka = Db.positionScreen.y, P instanceof THREE.MeshLambertMaterial || P instanceof THREE.MeshPhongMaterial ? (Z.copy(P.color), oa.copy(P.emissive), P.vertexColors === THREE.FaceColors && Z.multiply(H.color), !0 === gc ? !1 === P.wireframe && P.shading == THREE.SmoothShading && 4 == H.vertexNormalsLength ? (pa.copy(vb), Y.copy(vb), da.copy(vb), la.copy(vb), q(H.v1.positionWorld, H.vertexNormalsModel[0], pa), q(H.v2.positionWorld, H.vertexNormalsModel[1], Y), q(H.v4.positionWorld, H.vertexNormalsModel[3], da), q(H.v3.positionWorld, H.vertexNormalsModel[2], la), pa.multiply(Z).add(oa), Y.multiply(Z).add(oa), da.multiply(Z).add(oa), la.multiply(Z).add(oa), Fa = E(pa, Y, da, la), y(M, ca, qa, ha, Ma, Na), G(M, ca, qa, ha, Ma, Na, 0, 0, 1, 0, 0, 1, Fa), y(mb, Pa, ra, N, ta, ka), G(mb, Pa, ra, N, ta, ka, 1, 0, 1, 1, 0, 1, Fa)) : (aa.copy(vb), q(H.centroidModel, H.normalModel, aa), aa.multiply(Z).add(oa), B(M, ca, qa, ha, ra, N, Ma, Na), !0 === P.wireframe ? C(aa, P.wireframeLinewidth, P.wireframeLinecap, P.wireframeLinejoin) : A(aa)) : (aa.addColors(Z, oa), B(M, ca, qa, ha, ra, N, Ma, Na), !0 === P.wireframe ? C(aa, P.wireframeLinewidth, P.wireframeLinecap, P.wireframeLinejoin) : A(aa))) : P instanceof THREE.MeshBasicMaterial ? (aa.copy(P.color), P.vertexColors === THREE.FaceColors && aa.multiply(H.color), B(M, ca, qa, ha, ra, N, Ma, Na), !0 === P.wireframe ? C(aa, P.wireframeLinewidth, P.wireframeLinecap, P.wireframeLinejoin) : A(aa)) : P instanceof THREE.MeshNormalMaterial ? (X = void 0, P.shading == THREE.FlatShading ? (X = H.normalModelView, aa.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), B(M, ca, qa, ha, ra, N, Ma, Na), !0 === P.wireframe ? C(aa, P.wireframeLinewidth, P.wireframeLinecap, P.wireframeLinejoin) : A(aa)) : P.shading == THREE.SmoothShading && (X = H.vertexNormalsModelView[0], pa.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), X = H.vertexNormalsModelView[1], Y.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), X = H.vertexNormalsModelView[3], da.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), X = H.vertexNormalsModelView[2], la.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), Fa = E(pa, Y, da, la), y(M, ca, qa, ha, Ma, Na), G(M, ca, qa, ha, Ma, Na, 0, 0, 1, 0, 0, 1, Fa), y(mb, Pa, ra, N, ta, ka), G(mb, Pa, ra, N, ta, ka, 1, 0, 1, 1, 0, 1, Fa))) : P instanceof THREE.MeshDepthMaterial && (Wa = p.near, ab = p.far, pa.r = pa.g = pa.b = 1 - k(X.positionScreen.z * X.positionScreen.w, Wa, ab), Y.r = Y.g = Y.b = 1 - k(wa.positionScreen.z * wa.positionScreen.w, Wa, ab), da.r = da.g = da.b = 1 - k(hb.positionScreen.z * hb.positionScreen.w, Wa, ab), la.r = la.g = la.b = 1 - k(Bb.positionScreen.z * Bb.positionScreen.w, Wa, ab), Fa = E(pa, Y, da, la), y(M, ca, qa, ha, Ma, Na), G(M, ca, qa, ha, Ma, Na, 0, 0, 1, 0, 0, 1, Fa), y(mb, Pa, ra, N, ta, ka), G(mb, Pa, ra, N, ta, ka, 1, 0, 1, 1, 0, 1, Fa)))
                    }
                    Ka.union(Va)
                }
            }
            t.setTransform(1, 0, 0, 1, 0, 0)
        }
    }
};
THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
    envmap_pars_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
    envmap_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
    map_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment: "#ifdef USE_MAP\nvec4 texelColor = texture2D( map, vUv );\n#ifdef GAMMA_INPUT\ntexelColor.xyz *= texelColor.xyz;\n#endif\ngl_FragColor = gl_FragColor * texelColor;\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
    normalmap_pars_fragment: "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
    specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
    specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
    lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
    lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
    lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
    lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
    lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -viewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
    skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
    default_vertex: "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
    skinnormal_vertex: "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
    defaultnormal_vertex: "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#if defined( SHADOWMAP_TYPE_PCF )\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\nfloat shadow = 0.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.0 * xPixelOffset;\nfloat dy0 = -1.0 * yPixelOffset;\nfloat dx1 = 1.0 * xPixelOffset;\nfloat dy1 = 1.0 * yPixelOffset;\nmat3 shadowKernel;\nmat3 depthKernel;\ndepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( depthKernel[0][0] < shadowCoord.z ) shadowKernel[0][0] = 0.25;\nelse shadowKernel[0][0] = 0.0;\ndepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( depthKernel[0][1] < shadowCoord.z ) shadowKernel[0][1] = 0.25;\nelse shadowKernel[0][1] = 0.0;\ndepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( depthKernel[0][2] < shadowCoord.z ) shadowKernel[0][2] = 0.25;\nelse shadowKernel[0][2] = 0.0;\ndepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( depthKernel[1][0] < shadowCoord.z ) shadowKernel[1][0] = 0.25;\nelse shadowKernel[1][0] = 0.0;\ndepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( depthKernel[1][1] < shadowCoord.z ) shadowKernel[1][1] = 0.25;\nelse shadowKernel[1][1] = 0.0;\ndepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( depthKernel[1][2] < shadowCoord.z ) shadowKernel[1][2] = 0.25;\nelse shadowKernel[1][2] = 0.0;\ndepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( depthKernel[2][0] < shadowCoord.z ) shadowKernel[2][0] = 0.25;\nelse shadowKernel[2][0] = 0.0;\ndepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( depthKernel[2][1] < shadowCoord.z ) shadowKernel[2][1] = 0.25;\nelse shadowKernel[2][1] = 0.0;\ndepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( depthKernel[2][2] < shadowCoord.z ) shadowKernel[2][2] = 0.25;\nelse shadowKernel[2][2] = 0.0;\nvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\nshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\nshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\nvec4 shadowValues;\nshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\nshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\nshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\nshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\nshadow = dot( shadowValues, vec4( 1.0 ) );\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",
    alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE.UniformsUtils = {
    merge: function(a) {
        var b, c, d, e = {};
        for (b = 0; b < a.length; b++) for (c in d = this.clone(a[b]), d) e[c] = d[c];
        return e
    },
    clone: function(a) {
        var b, c, d, e = {};
        for (b in a) for (c in e[b] = {},
        a[b]) d = a[b][c],
        e[b][c] = d instanceof THREE.Color || d instanceof THREE.Vector2 || d instanceof THREE.Vector3 || d instanceof THREE.Vector4 || d instanceof THREE.Matrix4 || d instanceof THREE.Texture ? d.clone() : d instanceof Array ? d.slice() : d;
        return e
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0, 0, 1, 1)
        },
        lightMap: {
            type: "t",
            value: null
        },
        specularMap: {
            type: "t",
            value: null
        },
        envMap: {
            type: "t",
            value: null
        },
        flipEnvMap: {
            type: "f",
            value: -1
        },
        useRefract: {
            type: "i",
            value: 0
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: 0.98
        },
        combine: {
            type: "i",
            value: 0
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    bump: {
        bumpMap: {
            type: "t",
            value: null
        },
        bumpScale: {
            type: "f",
            value: 1
        }
    },
    normalmap: {
        normalMap: {
            type: "t",
            value: null
        },
        normalScale: {
            type: "v2",
            value: new THREE.Vector2(1, 1)
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        hemisphereLightDirection: {
            type: "fv",
            value: []
        },
        hemisphereLightSkyColor: {
            type: "fv",
            value: []
        },
        hemisphereLightGroundColor: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightColor: {
            type: "fv",
            value: []
        },
        spotLightPosition: {
            type: "fv",
            value: []
        },
        spotLightDirection: {
            type: "fv",
            value: []
        },
        spotLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightAngleCos: {
            type: "fv1",
            value: []
        },
        spotLightExponent: {
            type: "fv1",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: []
        },
        shadowMapSize: {
            type: "v2v",
            value: []
        },
        shadowBias: {
            type: "fv1",
            value: []
        },
        shadowDarkness: {
            type: "fv1",
            value: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        }
    }
};
THREE.ShaderLib = {
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    dashed: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
            scale: {
                type: "f",
                value: 1
            },
            dashSize: {
                type: "f",
                value: 1
            },
            totalSize: {
                type: "f",
                value: 2
            }
        }]),
        vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2E3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
    },
    normalmap: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            enableAO: {
                type: "i",
                value: 0
            },
            enableDiffuse: {
                type: "i",
                value: 0
            },
            enableSpecular: {
                type: "i",
                value: 0
            },
            enableReflection: {
                type: "i",
                value: 0
            },
            enableDisplacement: {
                type: "i",
                value: 0
            },
            tDisplacement: {
                type: "t",
                value: null
            },
            tDiffuse: {
                type: "t",
                value: null
            },
            tCube: {
                type: "t",
                value: null
            },
            tNormal: {
                type: "t",
                value: null
            },
            tSpecular: {
                type: "t",
                value: null
            },
            tAO: {
                type: "t",
                value: null
            },
            uNormalScale: {
                type: "v2",
                value: new THREE.Vector2(1, 1)
            },
            uDisplacementBias: {
                type: "f",
                value: 0
            },
            uDisplacementScale: {
                type: "f",
                value: 1
            },
            uDiffuseColor: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            uSpecularColor: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            uAmbientColor: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            uShininess: {
                type: "f",
                value: 30
            },
            uOpacity: {
                type: "f",
                value: 1
            },
            useRefract: {
                type: "i",
                value: 0
            },
            uRefractionRatio: {
                type: "f",
                value: 0.98
            },
            uReflectivity: {
                type: "f",
                value: 0.5
            },
            uOffset: {
                type: "v2",
                value: new THREE.Vector2(0, 0)
            },
            uRepeat: {
                type: "v2",
                value: new THREE.Vector2(1, 1)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;", THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, "#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}"].join("\n")
    },
    cube: {
        uniforms: {
            tCube: {
                type: "t",
                value: null
            },
            tFlip: {
                type: "f",
                value: -1
            }
        },
        vertexShader: "varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}"
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
        fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
    }
};
THREE.WebGLRenderer = function(a) {
    function b(a) {
        if (a.__webglCustomAttributesList) for (var b in a.__webglCustomAttributesList) j.deleteBuffer(a.__webglCustomAttributesList[b].buffer)
    }
    function c(a, b) {
        var c = a.vertices.length,
        d = b.material;
        if (d.attributes) {
            void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
            for (var e in d.attributes) {
                var f = d.attributes[e];
                if (!f.__webglInitialized || f.createUniqueBuffers) {
                    f.__webglInitialized = !0;
                    var g = 1;
                    "v2" === f.type ? g = 2 : "v3" === f.type ? g = 3 : "v4" === f.type ? g = 4 : "c" === f.type && (g = 3);
                    f.size = g;
                    f.array = new Float32Array(c * g);
                    f.buffer = j.createBuffer();
                    f.buffer.belongsToAttribute = e;
                    f.needsUpdate = !0
                }
                a.__webglCustomAttributesList.push(f)
            }
        }
    }
    function d(a, b) {
        var c = b.geometry,
        d = a.faces3,
        h = a.faces4,
        i = 3 * d.length + 4 * h.length,
        k = 1 * d.length + 2 * h.length,
        h = 3 * d.length + 4 * h.length,
        d = e(b, a),
        n = g(d),
        l = f(d),
        m = d.vertexColors ? d.vertexColors: !1;
        a.__vertexArray = new Float32Array(3 * i);
        l && (a.__normalArray = new Float32Array(3 * i));
        c.hasTangents && (a.__tangentArray = new Float32Array(4 * i));
        m && (a.__colorArray = new Float32Array(3 * i));
        if (n) {
            if (0 < c.faceUvs.length || 0 < c.faceVertexUvs.length) a.__uvArray = new Float32Array(2 * i);
            if (1 < c.faceUvs.length || 1 < c.faceVertexUvs.length) a.__uv2Array = new Float32Array(2 * i)
        }
        b.geometry.skinWeights.length && b.geometry.skinIndices.length && (a.__skinIndexArray = new Float32Array(4 * i), a.__skinWeightArray = new Float32Array(4 * i));
        a.__faceArray = new Uint16Array(3 * k);
        a.__lineArray = new Uint16Array(2 * h);
        if (a.numMorphTargets) {
            a.__morphTargetsArrays = [];
            c = 0;
            for (n = a.numMorphTargets; c < n; c++) a.__morphTargetsArrays.push(new Float32Array(3 * i))
        }
        if (a.numMorphNormals) {
            a.__morphNormalsArrays = [];
            c = 0;
            for (n = a.numMorphNormals; c < n; c++) a.__morphNormalsArrays.push(new Float32Array(3 * i))
        }
        a.__webglFaceCount = 3 * k;
        a.__webglLineCount = 2 * h;
        if (d.attributes) {
            void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
            for (var p in d.attributes) {
                var k = d.attributes[p],
                c = {},
                q;
                for (q in k) c[q] = k[q];
                if (!c.__webglInitialized || c.createUniqueBuffers) c.__webglInitialized = !0,
                h = 1,
                "v2" === c.type ? h = 2 : "v3" === c.type ? h = 3 : "v4" === c.type ? h = 4 : "c" === c.type && (h = 3),
                c.size = h,
                c.array = new Float32Array(i * h),
                c.buffer = j.createBuffer(),
                c.buffer.belongsToAttribute = p,
                k.needsUpdate = !0,
                c.__original = k;
                a.__webglCustomAttributesList.push(c)
            }
        }
        a.__inittedArrays = !0
    }
    function e(a, b) {
        return a.material instanceof THREE.MeshFaceMaterial ? a.material.materials[b.materialIndex] : a.material
    }
    function f(a) {
        return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE.MeshDepthMaterial ? !1 : a && void 0 !== a.shading && a.shading === THREE.SmoothShading ? THREE.SmoothShading: THREE.FlatShading
    }
    function g(a) {
        return a.map || a.lightMap || a.bumpMap || a.normalMap || a.specularMap || a instanceof THREE.ShaderMaterial ? !0 : !1
    }
    function h(a) {
        var b, c, d;
        for (b in a.attributes) d = "index" === b ? j.ELEMENT_ARRAY_BUFFER: j.ARRAY_BUFFER,
        c = a.attributes[b],
        c.buffer = j.createBuffer(),
        j.bindBuffer(d, c.buffer),
        j.bufferData(d, c.array, j.STATIC_DRAW)
    }
    function i(a, b, c) {
        var d = a.attributes,
        e = d.index,
        f = d.position,
        g = d.normal,
        h = d.uv,
        i = d.color,
        d = d.tangent;
        a.elementsNeedUpdate && void 0 !== e && (j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.buffer), j.bufferData(j.ELEMENT_ARRAY_BUFFER, e.array, b));
        a.verticesNeedUpdate && void 0 !== f && (j.bindBuffer(j.ARRAY_BUFFER, f.buffer), j.bufferData(j.ARRAY_BUFFER, f.array, b));
        a.normalsNeedUpdate && void 0 !== g && (j.bindBuffer(j.ARRAY_BUFFER, g.buffer), j.bufferData(j.ARRAY_BUFFER, g.array, b));
        a.uvsNeedUpdate && void 0 !== h && (j.bindBuffer(j.ARRAY_BUFFER, h.buffer), j.bufferData(j.ARRAY_BUFFER, h.array, b));
        a.colorsNeedUpdate && void 0 !== i && (j.bindBuffer(j.ARRAY_BUFFER, i.buffer), j.bufferData(j.ARRAY_BUFFER, i.array, b));
        a.tangentsNeedUpdate && void 0 !== d && (j.bindBuffer(j.ARRAY_BUFFER, d.buffer), j.bufferData(j.ARRAY_BUFFER, d.array, b));
        if (c) for (var k in a.attributes) delete a.attributes[k].array
    }
    function k(a) {
        Ka[a] || (j.enableVertexAttribArray(a), Ka[a] = !0)
    }
    function l() {
        for (var a in Ka) Ka[a] && (j.disableVertexAttribArray(a), Ka[a] = !1)
    }
    function m(a, b) {
        return a.z !== b.z ? b.z - a.z: b.id - a.id
    }
    function n(a, b) {
        return b[0] - a[0]
    }
    function s(a, b, c) {
        if (a.length) for (var d = 0,
        e = a.length; d < e; d++) aa = mb = null,
        ta = ka = la = da = Wa = ia = Z = -1,
        bb = !0,
        a[d].render(b, c, mc, pb),
        aa = mb = null,
        ta = ka = la = da = Wa = ia = Z = -1,
        bb = !0
    }
    function r(a, b, c, d, e, f, g, j) {
        var h, i, k, n;
        b ? (i = a.length - 1, n = b = -1) : (i = 0, b = a.length, n = 1);
        for (var l = i; l !== b; l += n) if (h = a[l], h.render) {
            i = h.object;
            k = h.buffer;
            if (j) h = j;
            else {
                h = h[c];
                if (!h) continue;
                g && N.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst);
                N.setDepthTest(h.depthTest);
                N.setDepthWrite(h.depthWrite);
                E(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits)
            }
            N.setMaterialFaces(h);
            k instanceof THREE.BufferGeometry ? N.renderBufferDirect(d, e, f, h, k, i) : N.renderBuffer(d, e, f, h, k, i)
        }
    }
    function p(a, b, c, d, e, f, g) {
        for (var h, j, i = 0,
        k = a.length; i < k; i++) if (h = a[i], j = h.object, j.visible) {
            if (g) h = g;
            else {
                h = h[b];
                if (!h) continue;
                f && N.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst);
                N.setDepthTest(h.depthTest);
                N.setDepthWrite(h.depthWrite);
                E(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits)
            }
            N.renderImmediateObject(c, d, e, h, j)
        }
    }
    function q(a, b, c) {
        a.push({
            buffer: b,
            object: c,
            opaque: null,
            transparent: null
        })
    }
    function y(a) {
        for (var b in a.attributes) if (a.attributes[b].needsUpdate) return ! 0;
        return ! 1
    }
    function v(a) {
        for (var b in a.attributes) a.attributes[b].needsUpdate = !1
    }
    function z(a, b) {
        for (var c = a.length - 1; 0 <= c; c--) a[c].object === b && a.splice(c, 1)
    }
    function t(a, b) {
        for (var c = a.length - 1; 0 <= c; c--) a[c] === b && a.splice(c, 1)
    }
    function A(a, b, c, d, e) {
        Y = 0;
        d.needsUpdate && (d.program && Pc(d), N.initMaterial(d, b, c, e), d.needsUpdate = !1);
        d.morphTargets && !e.__webglMorphTargetInfluences && (e.__webglMorphTargetInfluences = new Float32Array(N.maxMorphTargets));
        var f = !1,
        g = d.program,
        h = g.uniforms,
        i = d.uniforms;
        g !== mb && (j.useProgram(g), mb = g, f = !0);
        d.id !== ta && (ta = d.id, f = !0);
        if (f || a !== aa) j.uniformMatrix4fv(h.projectionMatrix, !1, a.projectionMatrix.elements),
        a !== aa && (aa = a);
        if (d.skinning) if (tc && e.useVertexTexture) {
            if (null !== h.boneTexture) {
                var k = I();
                j.uniform1i(h.boneTexture, k);
                N.setTexture(e.boneTexture, k)
            }
        } else null !== h.boneGlobalMatrices && j.uniformMatrix4fv(h.boneGlobalMatrices, !1, e.boneMatrices);
        if (f) {
            c && d.fog && (i.fogColor.value = c.color, c instanceof THREE.Fog ? (i.fogNear.value = c.near, i.fogFar.value = c.far) : c instanceof THREE.FogExp2 && (i.fogDensity.value = c.density));
            if (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d.lights) {
                if (bb) {
                    for (var n, l = k = 0,
                    m = 0,
                    p, q, s, r = xb,
                    t = r.directional.colors,
                    v = r.directional.positions,
                    y = r.point.colors,
                    z = r.point.positions,
                    B = r.point.distances,
                    C = r.spot.colors,
                    A = r.spot.positions,
                    F = r.spot.distances,
                    E = r.spot.directions,
                    J = r.spot.anglesCos,
                    K = r.spot.exponents,
                    H = r.hemi.skyColors,
                    M = r.hemi.groundColors,
                    P = r.hemi.positions,
                    X = 0,
                    da = 0,
                    ka = 0,
                    fa = 0,
                    ca = 0,
                    pa = 0,
                    Ma = 0,
                    ha = 0,
                    O = n = 0,
                    c = s = O = 0,
                    f = b.length; c < f; c++) n = b[c],
                    n.onlyShadow || (p = n.color, q = n.intensity, s = n.distance, n instanceof THREE.AmbientLight ? n.visible && (N.gammaInput ? (k += p.r * p.r, l += p.g * p.g, m += p.b * p.b) : (k += p.r, l += p.g, m += p.b)) : n instanceof THREE.DirectionalLight ? (ca += 1, n.visible && (La.getPositionFromMatrix(n.matrixWorld), Qa.getPositionFromMatrix(n.target.matrixWorld), La.sub(Qa), La.normalize(), 0 === La.x && 0 === La.y && 0 === La.z || (n = 3 * X, v[n] = La.x, v[n + 1] = La.y, v[n + 2] = La.z, N.gammaInput ? x(t, n, p, q * q) : G(t, n, p, q), X += 1))) : n instanceof THREE.PointLight ? (pa += 1, n.visible && (O = 3 * da, N.gammaInput ? x(y, O, p, q * q) : G(y, O, p, q), Qa.getPositionFromMatrix(n.matrixWorld), z[O] = Qa.x, z[O + 1] = Qa.y, z[O + 2] = Qa.z, B[da] = s, da += 1)) : n instanceof THREE.SpotLight ? (Ma += 1, n.visible && (O = 3 * ka, N.gammaInput ? x(C, O, p, q * q) : G(C, O, p, q), Qa.getPositionFromMatrix(n.matrixWorld), A[O] = Qa.x, A[O + 1] = Qa.y, A[O + 2] = Qa.z, F[ka] = s, La.copy(Qa), Qa.getPositionFromMatrix(n.target.matrixWorld), La.sub(Qa), La.normalize(), E[O] = La.x, E[O + 1] = La.y, E[O + 2] = La.z, J[ka] = Math.cos(n.angle), K[ka] = n.exponent, ka += 1)) : n instanceof THREE.HemisphereLight && (ha += 1, n.visible && (La.getPositionFromMatrix(n.matrixWorld), La.normalize(), 0 === La.x && 0 === La.y && 0 === La.z || (s = 3 * fa, P[s] = La.x, P[s + 1] = La.y, P[s + 2] = La.z, p = n.color, n = n.groundColor, N.gammaInput ? (q *= q, x(H, s, p, q), x(M, s, n, q)) : (G(H, s, p, q), G(M, s, n, q)), fa += 1))));
                    c = 3 * X;
                    for (f = Math.max(t.length, 3 * ca); c < f; c++) t[c] = 0;
                    c = 3 * da;
                    for (f = Math.max(y.length, 3 * pa); c < f; c++) y[c] = 0;
                    c = 3 * ka;
                    for (f = Math.max(C.length, 3 * Ma); c < f; c++) C[c] = 0;
                    c = 3 * fa;
                    for (f = Math.max(H.length, 3 * ha); c < f; c++) H[c] = 0;
                    c = 3 * fa;
                    for (f = Math.max(M.length, 3 * ha); c < f; c++) M[c] = 0;
                    r.directional.length = X;
                    r.point.length = da;
                    r.spot.length = ka;
                    r.hemi.length = fa;
                    r.ambient[0] = k;
                    r.ambient[1] = l;
                    r.ambient[2] = m;
                    bb = !1
                }
                c = xb;
                i.ambientLightColor.value = c.ambient;
                i.directionalLightColor.value = c.directional.colors;
                i.directionalLightDirection.value = c.directional.positions;
                i.pointLightColor.value = c.point.colors;
                i.pointLightPosition.value = c.point.positions;
                i.pointLightDistance.value = c.point.distances;
                i.spotLightColor.value = c.spot.colors;
                i.spotLightPosition.value = c.spot.positions;
                i.spotLightDistance.value = c.spot.distances;
                i.spotLightDirection.value = c.spot.directions;
                i.spotLightAngleCos.value = c.spot.anglesCos;
                i.spotLightExponent.value = c.spot.exponents;
                i.hemisphereLightSkyColor.value = c.hemi.skyColors;
                i.hemisphereLightGroundColor.value = c.hemi.groundColors;
                i.hemisphereLightDirection.value = c.hemi.positions
            }
            if (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.MeshPhongMaterial) {
                i.opacity.value = d.opacity;
                N.gammaInput ? i.diffuse.value.copyGammaToLinear(d.color) : i.diffuse.value = d.color;
                i.map.value = d.map;
                i.lightMap.value = d.lightMap;
                i.specularMap.value = d.specularMap;
                d.bumpMap && (i.bumpMap.value = d.bumpMap, i.bumpScale.value = d.bumpScale);
                d.normalMap && (i.normalMap.value = d.normalMap, i.normalScale.value.copy(d.normalScale));
                var Z;
                d.map ? Z = d.map: d.specularMap ? Z = d.specularMap: d.normalMap ? Z = d.normalMap: d.bumpMap && (Z = d.bumpMap);
                void 0 !== Z && (c = Z.offset, Z = Z.repeat, i.offsetRepeat.value.set(c.x, c.y, Z.x, Z.y));
                i.envMap.value = d.envMap;
                i.flipEnvMap.value = d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1;
                i.reflectivity.value = d.reflectivity;
                i.refractionRatio.value = d.refractionRatio;
                i.combine.value = d.combine;
                i.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping
            }
            d instanceof THREE.LineBasicMaterial ? (i.diffuse.value = d.color, i.opacity.value = d.opacity) : d instanceof THREE.LineDashedMaterial ? (i.diffuse.value = d.color, i.opacity.value = d.opacity, i.dashSize.value = d.dashSize, i.totalSize.value = d.dashSize + d.gapSize, i.scale.value = d.scale) : d instanceof THREE.ParticleBasicMaterial ? (i.psColor.value = d.color, i.opacity.value = d.opacity, i.size.value = d.size, i.scale.value = U.height / 2, i.map.value = d.map) : d instanceof THREE.MeshPhongMaterial ? (i.shininess.value = d.shininess, N.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.emissive.value.copyGammaToLinear(d.emissive), i.specular.value.copyGammaToLinear(d.specular)) : (i.ambient.value = d.ambient, i.emissive.value = d.emissive, i.specular.value = d.specular), d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshLambertMaterial ? (N.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.emissive.value.copyGammaToLinear(d.emissive)) : (i.ambient.value = d.ambient, i.emissive.value = d.emissive), d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshDepthMaterial ? (i.mNear.value = a.near, i.mFar.value = a.far, i.opacity.value = d.opacity) : d instanceof THREE.MeshNormalMaterial && (i.opacity.value = d.opacity);
            if (e.receiveShadow && !d._shadowPass && i.shadowMatrix) {
                c = Z = 0;
                for (f = b.length; c < f; c++) if (k = b[c], k.castShadow && (k instanceof THREE.SpotLight || k instanceof THREE.DirectionalLight && !k.shadowCascade)) i.shadowMap.value[Z] = k.shadowMap,
                i.shadowMapSize.value[Z] = k.shadowMapSize,
                i.shadowMatrix.value[Z] = k.shadowMatrix,
                i.shadowDarkness.value[Z] = k.shadowDarkness,
                i.shadowBias.value[Z] = k.shadowBias,
                Z++
            }
            b = d.uniformsList;
            i = 0;
            for (Z = b.length; i < Z; i++) if (f = g.uniforms[b[i][1]]) if (c = b[i][0], l = c.type, k = c.value, "i" === l) j.uniform1i(f, k);
            else if ("f" === l) j.uniform1f(f, k);
            else if ("v2" === l) j.uniform2f(f, k.x, k.y);
            else if ("v3" === l) j.uniform3f(f, k.x, k.y, k.z);
            else if ("v4" === l) j.uniform4f(f, k.x, k.y, k.z, k.w);
            else if ("c" === l) j.uniform3f(f, k.r, k.g, k.b);
            else if ("iv1" === l) j.uniform1iv(f, k);
            else if ("iv" === l) j.uniform3iv(f, k);
            else if ("fv1" === l) j.uniform1fv(f, k);
            else if ("fv" === l) j.uniform3fv(f, k);
            else if ("v2v" === l) {
                void 0 === c._array && (c._array = new Float32Array(2 * k.length));
                l = 0;
                for (m = k.length; l < m; l++) r = 2 * l,
                c._array[r] = k[l].x,
                c._array[r + 1] = k[l].y;
                j.uniform2fv(f, c._array)
            } else if ("v3v" === l) {
                void 0 === c._array && (c._array = new Float32Array(3 * k.length));
                l = 0;
                for (m = k.length; l < m; l++) r = 3 * l,
                c._array[r] = k[l].x,
                c._array[r + 1] = k[l].y,
                c._array[r + 2] = k[l].z;
                j.uniform3fv(f, c._array)
            } else if ("v4v" === l) {
                void 0 === c._array && (c._array = new Float32Array(4 * k.length));
                l = 0;
                for (m = k.length; l < m; l++) r = 4 * l,
                c._array[r] = k[l].x,
                c._array[r + 1] = k[l].y,
                c._array[r + 2] = k[l].z,
                c._array[r + 3] = k[l].w;
                j.uniform4fv(f, c._array)
            } else if ("m4" === l) void 0 === c._array && (c._array = new Float32Array(16)),
            k.flattenToArray(c._array),
            j.uniformMatrix4fv(f, !1, c._array);
            else if ("m4v" === l) {
                void 0 === c._array && (c._array = new Float32Array(16 * k.length));
                l = 0;
                for (m = k.length; l < m; l++) k[l].flattenToArrayOffset(c._array, 16 * l);
                j.uniformMatrix4fv(f, !1, c._array)
            } else if ("t" === l) {
                if (r = k, k = I(), j.uniform1i(f, k), r) if (r.image instanceof Array && 6 === r.image.length) {
                    if (c = r, f = k, 6 === c.image.length) if (c.needsUpdate) {
                        c.image.__webglTextureCube || (c.image.__webglTextureCube = j.createTexture(), N.info.memory.textures++);
                        j.activeTexture(j.TEXTURE0 + f);
                        j.bindTexture(j.TEXTURE_CUBE_MAP, c.image.__webglTextureCube);
                        j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, c.flipY);
                        f = c instanceof THREE.CompressedTexture;
                        k = [];
                        for (l = 0; 6 > l; l++) N.autoScaleCubemaps && !f ? (m = k, r = l, t = c.image[l], y = gd, t.width <= y && t.height <= y || (z = Math.max(t.width, t.height), v = Math.floor(t.width * y / z), y = Math.floor(t.height * y / z), z = document.createElement("canvas"), z.width = v, z.height = y, z.getContext("2d").drawImage(t, 0, 0, t.width, t.height, 0, 0, v, y), t = z), m[r] = t) : k[l] = c.image[l];
                        l = k[0];
                        m = 0 === (l.width & l.width - 1) && 0 === (l.height & l.height - 1);
                        r = L(c.format);
                        t = L(c.type);
                        W(j.TEXTURE_CUBE_MAP, c, m);
                        for (l = 0; 6 > l; l++) if (f) {
                            y = k[l].mipmaps;
                            z = 0;
                            for (B = y.length; z < B; z++) v = y[z],
                            j.compressedTexImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + l, z, r, v.width, v.height, 0, v.data)
                        } else j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + l, 0, r, r, t, k[l]);
                        c.generateMipmaps && m && j.generateMipmap(j.TEXTURE_CUBE_MAP);
                        c.needsUpdate = !1;
                        if (c.onUpdate) c.onUpdate()
                    } else j.activeTexture(j.TEXTURE0 + f),
                    j.bindTexture(j.TEXTURE_CUBE_MAP, c.image.__webglTextureCube)
                } else r instanceof THREE.WebGLRenderTargetCube ? (c = r, j.activeTexture(j.TEXTURE0 + k), j.bindTexture(j.TEXTURE_CUBE_MAP, c.__webglTexture)) : N.setTexture(r, k)
            } else if ("tv" === l) {
                void 0 === c._array && (c._array = []);
                l = 0;
                for (m = c.value.length; l < m; l++) c._array[l] = I();
                j.uniform1iv(f, c._array);
                l = 0;
                for (m = c.value.length; l < m; l++) r = c.value[l],
                k = c._array[l],
                r && N.setTexture(r, k)
            }
            if ((d instanceof THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial || d.envMap) && null !== h.cameraPosition) Qa.getPositionFromMatrix(a.matrixWorld),
            j.uniform3f(h.cameraPosition, Qa.x, Qa.y, Qa.z); (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.ShaderMaterial || d.skinning) && null !== h.viewMatrix && j.uniformMatrix4fv(h.viewMatrix, !1, a.matrixWorldInverse.elements)
        }
        j.uniformMatrix4fv(h.modelViewMatrix, !1, e._modelViewMatrix.elements);
        h.normalMatrix && j.uniformMatrix3fv(h.normalMatrix, !1, e._normalMatrix.elements);
        null !== h.modelMatrix && j.uniformMatrix4fv(h.modelMatrix, !1, e.matrixWorld.elements);
        return g
    }
    function I() {
        var a = Y;
        a >= Mc && console.warn("WebGLRenderer: trying to use " + a + " texture units while this GPU supports only " + Mc);
        Y += 1;
        return a
    }
    function C(a, b) {
        a._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, a.matrixWorld);
        a._normalMatrix.getInverse(a._modelViewMatrix);
        a._normalMatrix.transpose()
    }
    function x(a, b, c, d) {
        a[b] = c.r * c.r * d;
        a[b + 1] = c.g * c.g * d;
        a[b + 2] = c.b * c.b * d
    }
    function G(a, b, c, d) {
        a[b] = c.r * d;
        a[b + 1] = c.g * d;
        a[b + 2] = c.b * d
    }
    function J(a) {
        a !== ub && (j.lineWidth(a), ub = a)
    }
    function E(a, b, c) {
        ab !== a && (a ? j.enable(j.POLYGON_OFFSET_FILL) : j.disable(j.POLYGON_OFFSET_FILL), ab = a);
        if (a && (Fa !== b || Xa !== c)) j.polygonOffset(b, c),
        Fa = b,
        Xa = c
    }
    function H(a) {
        for (var a = a.split("\n"), b = 0, c = a.length; b < c; b++) a[b] = b + 1 + ": " + a[b];
        return a.join("\n")
    }
    function B(a, b) {
        var c;
        "fragment" === a ? c = j.createShader(j.FRAGMENT_SHADER) : "vertex" === a && (c = j.createShader(j.VERTEX_SHADER));
        j.shaderSource(c, b);
        j.compileShader(c);
        return ! j.getShaderParameter(c, j.COMPILE_STATUS) ? (console.error(j.getShaderInfoLog(c)), console.error(H(b)), null) : c
    }
    function W(a, b, c) {
        c ? (j.texParameteri(a, j.TEXTURE_WRAP_S, L(b.wrapS)), j.texParameteri(a, j.TEXTURE_WRAP_T, L(b.wrapT)), j.texParameteri(a, j.TEXTURE_MAG_FILTER, L(b.magFilter)), j.texParameteri(a, j.TEXTURE_MIN_FILTER, L(b.minFilter))) : (j.texParameteri(a, j.TEXTURE_WRAP_S, j.CLAMP_TO_EDGE), j.texParameteri(a, j.TEXTURE_WRAP_T, j.CLAMP_TO_EDGE), j.texParameteri(a, j.TEXTURE_MAG_FILTER, K(b.magFilter)), j.texParameteri(a, j.TEXTURE_MIN_FILTER, K(b.minFilter)));
        if (cb && b.type !== THREE.FloatType && (1 < b.anisotropy || b.__oldAnisotropy)) j.texParameterf(a, cb.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, Cc)),
        b.__oldAnisotropy = b.anisotropy
    }
    function F(a, b) {
        j.bindRenderbuffer(j.RENDERBUFFER, a);
        b.depthBuffer && !b.stencilBuffer ? (j.renderbufferStorage(j.RENDERBUFFER, j.DEPTH_COMPONENT16, b.width, b.height), j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_ATTACHMENT, j.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (j.renderbufferStorage(j.RENDERBUFFER, j.DEPTH_STENCIL, b.width, b.height), j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_STENCIL_ATTACHMENT, j.RENDERBUFFER, a)) : j.renderbufferStorage(j.RENDERBUFFER, j.RGBA4, b.width, b.height)
    }
    function K(a) {
        return a === THREE.NearestFilter || a === THREE.NearestMipMapNearestFilter || a === THREE.NearestMipMapLinearFilter ? j.NEAREST: j.LINEAR
    }
    function L(a) {
        if (a === THREE.RepeatWrapping) return j.REPEAT;
        if (a === THREE.ClampToEdgeWrapping) return j.CLAMP_TO_EDGE;
        if (a === THREE.MirroredRepeatWrapping) return j.MIRRORED_REPEAT;
        if (a === THREE.NearestFilter) return j.NEAREST;
        if (a === THREE.NearestMipMapNearestFilter) return j.NEAREST_MIPMAP_NEAREST;
        if (a === THREE.NearestMipMapLinearFilter) return j.NEAREST_MIPMAP_LINEAR;
        if (a === THREE.LinearFilter) return j.LINEAR;
        if (a === THREE.LinearMipMapNearestFilter) return j.LINEAR_MIPMAP_NEAREST;
        if (a === THREE.LinearMipMapLinearFilter) return j.LINEAR_MIPMAP_LINEAR;
        if (a === THREE.UnsignedByteType) return j.UNSIGNED_BYTE;
        if (a === THREE.UnsignedShort4444Type) return j.UNSIGNED_SHORT_4_4_4_4;
        if (a === THREE.UnsignedShort5551Type) return j.UNSIGNED_SHORT_5_5_5_1;
        if (a === THREE.UnsignedShort565Type) return j.UNSIGNED_SHORT_5_6_5;
        if (a === THREE.ByteType) return j.BYTE;
        if (a === THREE.ShortType) return j.SHORT;
        if (a === THREE.UnsignedShortType) return j.UNSIGNED_SHORT;
        if (a === THREE.IntType) return j.INT;
        if (a === THREE.UnsignedIntType) return j.UNSIGNED_INT;
        if (a === THREE.FloatType) return j.FLOAT;
        if (a === THREE.AlphaFormat) return j.ALPHA;
        if (a === THREE.RGBFormat) return j.RGB;
        if (a === THREE.RGBAFormat) return j.RGBA;
        if (a === THREE.LuminanceFormat) return j.LUMINANCE;
        if (a === THREE.LuminanceAlphaFormat) return j.LUMINANCE_ALPHA;
        if (a === THREE.AddEquation) return j.FUNC_ADD;
        if (a === THREE.SubtractEquation) return j.FUNC_SUBTRACT;
        if (a === THREE.ReverseSubtractEquation) return j.FUNC_REVERSE_SUBTRACT;
        if (a === THREE.ZeroFactor) return j.ZERO;
        if (a === THREE.OneFactor) return j.ONE;
        if (a === THREE.SrcColorFactor) return j.SRC_COLOR;
        if (a === THREE.OneMinusSrcColorFactor) return j.ONE_MINUS_SRC_COLOR;
        if (a === THREE.SrcAlphaFactor) return j.SRC_ALPHA;
        if (a === THREE.OneMinusSrcAlphaFactor) return j.ONE_MINUS_SRC_ALPHA;
        if (a === THREE.DstAlphaFactor) return j.DST_ALPHA;
        if (a === THREE.OneMinusDstAlphaFactor) return j.ONE_MINUS_DST_ALPHA;
        if (a === THREE.DstColorFactor) return j.DST_COLOR;
        if (a === THREE.OneMinusDstColorFactor) return j.ONE_MINUS_DST_COLOR;
        if (a === THREE.SrcAlphaSaturateFactor) return j.SRC_ALPHA_SATURATE;
        if (void 0 !== Sa) {
            if (a === THREE.RGB_S3TC_DXT1_Format) return Sa.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (a === THREE.RGBA_S3TC_DXT1_Format) return Sa.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (a === THREE.RGBA_S3TC_DXT3_Format) return Sa.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (a === THREE.RGBA_S3TC_DXT5_Format) return Sa.COMPRESSED_RGBA_S3TC_DXT5_EXT
        }
        return 0
    }
    console.log("THREE.WebGLRenderer", THREE.REVISION);
    var a = a || {},
    U = void 0 !== a.canvas ? a.canvas: document.createElement("canvas"),
    fa = void 0 !== a.precision ? a.precision: "highp",
    Ca = void 0 !== a.alpha ? a.alpha: !0,
    $a = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha: !0,
    M = void 0 !== a.antialias ? a.antialias: !1,
    ca = void 0 !== a.stencil ? a.stencil: !0,
    qa = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer: !1,
    ha = void 0 !== a.clearColor ? new THREE.Color(a.clearColor) : new THREE.Color(0),
    ra = void 0 !== a.clearAlpha ? a.clearAlpha: 0;
    this.domElement = U;
    this.context = null;
    this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio: void 0 !== window.devicePixelRatio ? window.devicePixelRatio: 1;
    this.autoUpdateScene = this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
    this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput = this.gammaInput = !1;
    this.shadowMapAutoUpdate = !0;
    this.shadowMapType = THREE.PCFShadowMap;
    this.shadowMapCullFace = THREE.CullFaceFront;
    this.shadowMapCascade = this.shadowMapDebug = !1;
    this.maxMorphTargets = 8;
    this.maxMorphNormals = 4;
    this.autoScaleCubemaps = !0;
    this.renderPluginsPre = [];
    this.renderPluginsPost = [];
    this.info = {
        memory: {
            programs: 0,
            geometries: 0,
            textures: 0
        },
        render: {
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0
        }
    };
    var N = this,
    Ma = [],
    Na = 0,
    mb = null,
    Pa = null,
    ta = -1,
    ka = null,
    aa = null,
    pa = 0,
    Y = 0,
    da = -1,
    la = -1,
    Z = -1,
    oa = -1,
    gb = -1,
    nb = -1,
    ia = -1,
    Wa = -1,
    ab = null,
    Fa = null,
    Xa = null,
    ub = null,
    Ib = 0,
    Jb = 0,
    fc = 0,
    Ab = 0,
    mc = 0,
    pb = 0,
    Ka = {},
    Va = new THREE.Frustum,
    gc = new THREE.Matrix4,
    vb = new THREE.Matrix4,
    Qa = new THREE.Vector3,
    La = new THREE.Vector3,
    bb = !0,
    xb = {
        ambient: [0, 0, 0],
        directional: {
            length: 0,
            colors: [],
            positions: []
        },
        point: {
            length: 0,
            colors: [],
            positions: [],
            distances: []
        },
        spot: {
            length: 0,
            colors: [],
            positions: [],
            distances: [],
            directions: [],
            anglesCos: [],
            exponents: []
        },
        hemi: {
            length: 0,
            skyColors: [],
            groundColors: [],
            positions: []
        }
    },
    j,
    yb,
    Ra,
    cb,
    Sa;
    try {
        if (! (j = U.getContext("experimental-webgl", {
            alpha: Ca,
            premultipliedAlpha: $a,
            antialias: M,
            stencil: ca,
            preserveDrawingBuffer: qa
        }))) throw "Error creating WebGL context.";
    } catch(zb) {
        console.error(zb)
    }
    yb = j.getExtension("OES_texture_float");
    Ra = j.getExtension("OES_standard_derivatives");
    cb = j.getExtension("EXT_texture_filter_anisotropic") || j.getExtension("MOZ_EXT_texture_filter_anisotropic") || j.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
    Sa = j.getExtension("WEBGL_compressed_texture_s3tc") || j.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || j.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
    yb || console.log("THREE.WebGLRenderer: Float textures not supported.");
    Ra || console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
    cb || console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported.");
    Sa || console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");
    void 0 === j.getShaderPrecisionFormat && (j.getShaderPrecisionFormat = function() {
        return {
            rangeMin: 1,
            rangeMax: 1,
            precision: 1
        }
    });
    j.clearColor(0, 0, 0, 1);
    j.clearDepth(1);
    j.clearStencil(0);
    j.enable(j.DEPTH_TEST);
    j.depthFunc(j.LEQUAL);
    j.frontFace(j.CCW);
    j.cullFace(j.BACK);
    j.enable(j.CULL_FACE);
    j.enable(j.BLEND);
    j.blendEquation(j.FUNC_ADD);
    j.blendFunc(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA);
    j.clearColor(ha.r, ha.g, ha.b, ra);
    this.context = j;
    var Mc = j.getParameter(j.MAX_TEXTURE_IMAGE_UNITS),
    fd = j.getParameter(j.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    j.getParameter(j.MAX_TEXTURE_SIZE);
    var gd = j.getParameter(j.MAX_CUBE_MAP_TEXTURE_SIZE),
    Cc = cb ? j.getParameter(cb.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
    sc = 0 < fd,
    tc = sc && yb;
    Sa && j.getParameter(j.COMPRESSED_TEXTURE_FORMATS);
    var jd = j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.HIGH_FLOAT),
    kd = j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.MEDIUM_FLOAT);
    j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.LOW_FLOAT);
    var ld = j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.HIGH_FLOAT),
    id = j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.MEDIUM_FLOAT);
    j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.LOW_FLOAT);
    j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.HIGH_INT);
    j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.MEDIUM_INT);
    j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.LOW_INT);
    j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.HIGH_INT);
    j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.MEDIUM_INT);
    j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.LOW_INT);
    var hd = 0 < jd.precision && 0 < ld.precision,
    Nc = 0 < kd.precision && 0 < id.precision;
    "highp" === fa && !hd && (Nc ? (fa = "mediump", console.warn("WebGLRenderer: highp not supported, using mediump")) : (fa = "lowp", console.warn("WebGLRenderer: highp and mediump not supported, using lowp")));
    "mediump" === fa && !Nc && (fa = "lowp", console.warn("WebGLRenderer: mediump not supported, using lowp"));
    this.getContext = function() {
        return j
    };
    this.supportsVertexTextures = function() {
        return sc
    };
    this.supportsFloatTextures = function() {
        return yb
    };
    this.supportsStandardDerivatives = function() {
        return Ra
    };
    this.supportsCompressedTextureS3TC = function() {
        return Sa
    };
    this.getMaxAnisotropy = function() {
        return Cc
    };
    this.getPrecision = function() {
        return fa
    };
    this.setSize = function(a, b) {
        U.width = a * this.devicePixelRatio;
        U.height = b * this.devicePixelRatio;
        U.style.width = a + "px";
        U.style.height = b + "px";
        this.setViewport(0, 0, U.width, U.height)
    };
    this.setViewport = function(a, b, c, d) {
        Ib = void 0 !== a ? a: 0;
        Jb = void 0 !== b ? b: 0;
        fc = void 0 !== c ? c: U.width;
        Ab = void 0 !== d ? d: U.height;
        j.viewport(Ib, Jb, fc, Ab)
    };
    this.setScissor = function(a, b, c, d) {
        j.scissor(a, b, c, d)
    };
    this.enableScissorTest = function(a) {
        a ? j.enable(j.SCISSOR_TEST) : j.disable(j.SCISSOR_TEST)
    };
    this.setClearColorHex = function(a, b) {
        ha.setHex(a);
        ra = b;
        j.clearColor(ha.r, ha.g, ha.b, ra)
    };
    this.setClearColor = function(a, b) {
        ha.copy(a);
        ra = b;
        j.clearColor(ha.r, ha.g, ha.b, ra)
    };
    this.getClearColor = function() {
        return ha
    };
    this.getClearAlpha = function() {
        return ra
    };
    this.clear = function(a, b, c) {
        var d = 0;
        if (void 0 === a || a) d |= j.COLOR_BUFFER_BIT;
        if (void 0 === b || b) d |= j.DEPTH_BUFFER_BIT;
        if (void 0 === c || c) d |= j.STENCIL_BUFFER_BIT;
        j.clear(d)
    };
    this.clearTarget = function(a, b, c, d) {
        this.setRenderTarget(a);
        this.clear(b, c, d)
    };
    this.addPostPlugin = function(a) {
        a.init(this);
        this.renderPluginsPost.push(a)
    };
    this.addPrePlugin = function(a) {
        a.init(this);
        this.renderPluginsPre.push(a)
    };
    this.updateShadowMap = function(a, b) {
        mb = null;
        ta = ka = Wa = ia = Z = -1;
        bb = !0;
        la = da = -1;
        this.shadowMapPlugin.update(a, b)
    };
    var wd = function(a) {
        a = a.target;
        a.removeEventListener("dispose", wd);
        a.__webglInit = void 0;
        void 0 !== a.__webglVertexBuffer && j.deleteBuffer(a.__webglVertexBuffer);
        void 0 !== a.__webglNormalBuffer && j.deleteBuffer(a.__webglNormalBuffer);
        void 0 !== a.__webglTangentBuffer && j.deleteBuffer(a.__webglTangentBuffer);
        void 0 !== a.__webglColorBuffer && j.deleteBuffer(a.__webglColorBuffer);
        void 0 !== a.__webglUVBuffer && j.deleteBuffer(a.__webglUVBuffer);
        void 0 !== a.__webglUV2Buffer && j.deleteBuffer(a.__webglUV2Buffer);
        void 0 !== a.__webglSkinIndicesBuffer && j.deleteBuffer(a.__webglSkinIndicesBuffer);
        void 0 !== a.__webglSkinWeightsBuffer && j.deleteBuffer(a.__webglSkinWeightsBuffer);
        void 0 !== a.__webglFaceBuffer && j.deleteBuffer(a.__webglFaceBuffer);
        void 0 !== a.__webglLineBuffer && j.deleteBuffer(a.__webglLineBuffer);
        void 0 !== a.__webglLineDistanceBuffer && j.deleteBuffer(a.__webglLineDistanceBuffer);
        if (void 0 !== a.geometryGroups) for (var c in a.geometryGroups) {
            var d = a.geometryGroups[c];
            if (void 0 !== d.numMorphTargets) for (var e = 0,
            f = d.numMorphTargets; e < f; e++) j.deleteBuffer(d.__webglMorphTargetsBuffers[e]);
            if (void 0 !== d.numMorphNormals) {
                e = 0;
                for (f = d.numMorphNormals; e < f; e++) j.deleteBuffer(d.__webglMorphNormalsBuffers[e])
            }
            b(d)
        }
        b(a);
        N.info.memory.geometries--
    },
    Oc = function(a) {
        a = a.target;
        a.removeEventListener("dispose", Oc);
        a.image && a.image.__webglTextureCube ? j.deleteTexture(a.image.__webglTextureCube) : a.__webglInit && (a.__webglInit = !1, j.deleteTexture(a.__webglTexture));
        N.info.memory.textures--
    },
    P = function(a) {
        a = a.target;
        a.removeEventListener("dispose", P);
        if (a && a.__webglTexture) if (j.deleteTexture(a.__webglTexture), a instanceof THREE.WebGLRenderTargetCube) for (var b = 0; 6 > b; b++) j.deleteFramebuffer(a.__webglFramebuffer[b]),
        j.deleteRenderbuffer(a.__webglRenderbuffer[b]);
        else j.deleteFramebuffer(a.__webglFramebuffer),
        j.deleteRenderbuffer(a.__webglRenderbuffer);
        N.info.memory.textures--
    },
    X = function(a) {
        a = a.target;
        a.removeEventListener("dispose", X);
        Pc(a)
    },
    Pc = function(a) {
        var b = a.program;
        if (void 0 !== b) {
            a.program = void 0;
            var c, d, e = !1,
            a = 0;
            for (c = Ma.length; a < c; a++) if (d = Ma[a], d.program === b) {
                d.usedTimes--;
                0 === d.usedTimes && (e = !0);
                break
            }
            if (!0 === e) {
                e = [];
                a = 0;
                for (c = Ma.length; a < c; a++) d = Ma[a],
                d.program !== b && e.push(d);
                Ma = e;
                j.deleteProgram(b);
                N.info.memory.programs--
            }
        }
    };
    this.renderBufferImmediate = function(a, b, c) {
        a.hasPositions && !a.__webglVertexBuffer && (a.__webglVertexBuffer = j.createBuffer());
        a.hasNormals && !a.__webglNormalBuffer && (a.__webglNormalBuffer = j.createBuffer());
        a.hasUvs && !a.__webglUvBuffer && (a.__webglUvBuffer = j.createBuffer());
        a.hasColors && !a.__webglColorBuffer && (a.__webglColorBuffer = j.createBuffer());
        a.hasPositions && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglVertexBuffer), j.bufferData(j.ARRAY_BUFFER, a.positionArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.position), j.vertexAttribPointer(b.attributes.position, 3, j.FLOAT, !1, 0, 0));
        if (a.hasNormals) {
            j.bindBuffer(j.ARRAY_BUFFER, a.__webglNormalBuffer);
            if (c.shading === THREE.FlatShading) {
                var d, e, f, g, i, h, k, l, n, m, p, q = 3 * a.count;
                for (p = 0; p < q; p += 9) m = a.normalArray,
                d = m[p],
                e = m[p + 1],
                f = m[p + 2],
                g = m[p + 3],
                h = m[p + 4],
                l = m[p + 5],
                i = m[p + 6],
                k = m[p + 7],
                n = m[p + 8],
                d = (d + g + i) / 3,
                e = (e + h + k) / 3,
                f = (f + l + n) / 3,
                m[p] = d,
                m[p + 1] = e,
                m[p + 2] = f,
                m[p + 3] = d,
                m[p + 4] = e,
                m[p + 5] = f,
                m[p + 6] = d,
                m[p + 7] = e,
                m[p + 8] = f
            }
            j.bufferData(j.ARRAY_BUFFER, a.normalArray, j.DYNAMIC_DRAW);
            j.enableVertexAttribArray(b.attributes.normal);
            j.vertexAttribPointer(b.attributes.normal, 3, j.FLOAT, !1, 0, 0)
        }
        a.hasUvs && c.map && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglUvBuffer), j.bufferData(j.ARRAY_BUFFER, a.uvArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.uv), j.vertexAttribPointer(b.attributes.uv, 2, j.FLOAT, !1, 0, 0));
        a.hasColors && c.vertexColors !== THREE.NoColors && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, a.colorArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.color), j.vertexAttribPointer(b.attributes.color, 3, j.FLOAT, !1, 0, 0));
        j.drawArrays(j.TRIANGLES, 0, a.count);
        a.count = 0
    };
    this.renderBufferDirect = function(a, b, c, d, e, f) {
        if (!1 !== d.visible) if (c = A(a, b, c, d, f), a = c.attributes, b = !1, c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0), c !== ka && (ka = c, b = !0), b && l(), f instanceof THREE.Mesh) if (d = e.attributes.index) {
            f = e.offsets;
            1 < f.length && (b = !0);
            for (var c = 0,
            g = f.length; c < g; c++) {
                var i = f[c].index;
                if (b) {
                    var h = e.attributes.position,
                    n = h.itemSize;
                    j.bindBuffer(j.ARRAY_BUFFER, h.buffer);
                    k(a.position);
                    j.vertexAttribPointer(a.position, n, j.FLOAT, !1, 0, 4 * i * n);
                    n = e.attributes.normal;
                    if (0 <= a.normal && n) {
                        var m = n.itemSize;
                        j.bindBuffer(j.ARRAY_BUFFER, n.buffer);
                        k(a.normal);
                        j.vertexAttribPointer(a.normal, m, j.FLOAT, !1, 0, 4 * i * m)
                    }
                    n = e.attributes.uv;
                    0 <= a.uv && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.uv), j.vertexAttribPointer(a.uv, m, j.FLOAT, !1, 0, 4 * i * m));
                    n = e.attributes.color;
                    0 <= a.color && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.color), j.vertexAttribPointer(a.color, m, j.FLOAT, !1, 0, 4 * i * m));
                    n = e.attributes.tangent;
                    0 <= a.tangent && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.tangent), j.vertexAttribPointer(a.tangent, m, j.FLOAT, !1, 0, 4 * i * m));
                    j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, d.buffer)
                }
                j.drawElements(j.TRIANGLES, f[c].count, j.UNSIGNED_SHORT, 2 * f[c].start);
                N.info.render.calls++;
                N.info.render.vertices += f[c].count;
                N.info.render.faces += f[c].count / 3
            }
        } else b && (h = e.attributes.position, n = h.itemSize, j.bindBuffer(j.ARRAY_BUFFER, h.buffer), k(a.position), j.vertexAttribPointer(a.position, n, j.FLOAT, !1, 0, 0), n = e.attributes.normal, 0 <= a.normal && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.normal), j.vertexAttribPointer(a.normal, m, j.FLOAT, !1, 0, 0)), n = e.attributes.uv, 0 <= a.uv && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.uv), j.vertexAttribPointer(a.uv, m, j.FLOAT, !1, 0, 0)), n = e.attributes.color, 0 <= a.color && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.color), j.vertexAttribPointer(a.color, m, j.FLOAT, !1, 0, 0)), n = e.attributes.tangent, 0 <= a.tangent && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.tangent), j.vertexAttribPointer(a.tangent, m, j.FLOAT, !1, 0, 0))),
        j.drawArrays(j.TRIANGLES, 0, h.numItems / 3),
        N.info.render.calls++,
        N.info.render.vertices += h.numItems / 3,
        N.info.render.faces += h.numItems / 3 / 3;
        else f instanceof THREE.ParticleSystem ? b && (h = e.attributes.position, n = h.itemSize, j.bindBuffer(j.ARRAY_BUFFER, h.buffer), k(a.position), j.vertexAttribPointer(a.position, n, j.FLOAT, !1, 0, 0), n = e.attributes.color, 0 <= a.color && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.color), j.vertexAttribPointer(a.color, m, j.FLOAT, !1, 0, 0)), j.drawArrays(j.POINTS, 0, h.numItems / 3), N.info.render.calls++, N.info.render.points += h.numItems / 3) : f instanceof THREE.Line && b && (h = e.attributes.position, n = h.itemSize, j.bindBuffer(j.ARRAY_BUFFER, h.buffer), k(a.position), j.vertexAttribPointer(a.position, n, j.FLOAT, !1, 0, 0), n = e.attributes.color, 0 <= a.color && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.color), j.vertexAttribPointer(a.color, m, j.FLOAT, !1, 0, 0)), J(d.linewidth), j.drawArrays(j.LINE_STRIP, 0, h.numItems / 3), N.info.render.calls++, N.info.render.points += h.numItems)
    };
    this.renderBuffer = function(a, b, c, d, e, f) {
        if (!1 !== d.visible) {
            var g, i, c = A(a, b, c, d, f),
            a = c.attributes,
            b = !1,
            c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0);
            c !== ka && (ka = c, b = !0);
            b && l();
            if (!d.morphTargets && 0 <= a.position) b && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglVertexBuffer), k(a.position), j.vertexAttribPointer(a.position, 3, j.FLOAT, !1, 0, 0));
            else if (f.morphTargetBase) {
                c = d.program.attributes; - 1 !== f.morphTargetBase && 0 <= c.position ? (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[f.morphTargetBase]), k(c.position), j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0)) : 0 <= c.position && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglVertexBuffer), k(c.position), j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0));
                if (f.morphTargetForcedOrder.length) {
                    var h = 0;
                    i = f.morphTargetForcedOrder;
                    for (g = f.morphTargetInfluences; h < d.numSupportedMorphTargets && h < i.length;) 0 <= c["morphTarget" + h] && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[i[h]]), k(c["morphTarget" + h]), j.vertexAttribPointer(c["morphTarget" + h], 3, j.FLOAT, !1, 0, 0)),
                    0 <= c["morphNormal" + h] && d.morphNormals && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[i[h]]), k(c["morphNormal" + h]), j.vertexAttribPointer(c["morphNormal" + h], 3, j.FLOAT, !1, 0, 0)),
                    f.__webglMorphTargetInfluences[h] = g[i[h]],
                    h++
                } else {
                    i = [];
                    g = f.morphTargetInfluences;
                    var m, p = g.length;
                    for (m = 0; m < p; m++) h = g[m],
                    0 < h && i.push([h, m]);
                    i.length > d.numSupportedMorphTargets ? (i.sort(n), i.length = d.numSupportedMorphTargets) : i.length > d.numSupportedMorphNormals ? i.sort(n) : 0 === i.length && i.push([0, 0]);
                    for (h = 0; h < d.numSupportedMorphTargets;) i[h] ? (m = i[h][1], 0 <= c["morphTarget" + h] && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[m]), k(c["morphTarget" + h]), j.vertexAttribPointer(c["morphTarget" + h], 3, j.FLOAT, !1, 0, 0)), 0 <= c["morphNormal" + h] && d.morphNormals && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[m]), k(c["morphNormal" + h]), j.vertexAttribPointer(c["morphNormal" + h], 3, j.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[h] = g[m]) : f.__webglMorphTargetInfluences[h] = 0,
                    h++
                }
                null !== d.program.uniforms.morphTargetInfluences && j.uniform1fv(d.program.uniforms.morphTargetInfluences, f.__webglMorphTargetInfluences)
            }
            if (b) {
                if (e.__webglCustomAttributesList) {
                    g = 0;
                    for (i = e.__webglCustomAttributesList.length; g < i; g++) c = e.__webglCustomAttributesList[g],
                    0 <= a[c.buffer.belongsToAttribute] && (j.bindBuffer(j.ARRAY_BUFFER, c.buffer), k(a[c.buffer.belongsToAttribute]), j.vertexAttribPointer(a[c.buffer.belongsToAttribute], c.size, j.FLOAT, !1, 0, 0))
                }
                0 <= a.color && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglColorBuffer), k(a.color), j.vertexAttribPointer(a.color, 3, j.FLOAT, !1, 0, 0));
                0 <= a.normal && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglNormalBuffer), k(a.normal), j.vertexAttribPointer(a.normal, 3, j.FLOAT, !1, 0, 0));
                0 <= a.tangent && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglTangentBuffer), k(a.tangent), j.vertexAttribPointer(a.tangent, 4, j.FLOAT, !1, 0, 0));
                0 <= a.uv && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglUVBuffer), k(a.uv), j.vertexAttribPointer(a.uv, 2, j.FLOAT, !1, 0, 0));
                0 <= a.uv2 && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglUV2Buffer), k(a.uv2), j.vertexAttribPointer(a.uv2, 2, j.FLOAT, !1, 0, 0));
                d.skinning && (0 <= a.skinIndex && 0 <= a.skinWeight) && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), k(a.skinIndex), j.vertexAttribPointer(a.skinIndex, 4, j.FLOAT, !1, 0, 0), j.bindBuffer(j.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), k(a.skinWeight), j.vertexAttribPointer(a.skinWeight, 4, j.FLOAT, !1, 0, 0));
                0 <= a.lineDistance && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglLineDistanceBuffer), k(a.lineDistance), j.vertexAttribPointer(a.lineDistance, 1, j.FLOAT, !1, 0, 0))
            }
            f instanceof THREE.Mesh ? (d.wireframe ? (J(d.wireframeLinewidth), b && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), j.drawElements(j.LINES, e.__webglLineCount, j.UNSIGNED_SHORT, 0)) : (b && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), j.drawElements(j.TRIANGLES, e.__webglFaceCount, j.UNSIGNED_SHORT, 0)), N.info.render.calls++, N.info.render.vertices += e.__webglFaceCount, N.info.render.faces += e.__webglFaceCount / 3) : f instanceof THREE.Line ? (f = f.type === THREE.LineStrip ? j.LINE_STRIP: j.LINES, J(d.linewidth), j.drawArrays(f, 0, e.__webglLineCount), N.info.render.calls++) : f instanceof THREE.ParticleSystem ? (j.drawArrays(j.POINTS, 0, e.__webglParticleCount), N.info.render.calls++, N.info.render.points += e.__webglParticleCount) : f instanceof THREE.Ribbon && (j.drawArrays(j.TRIANGLE_STRIP, 0, e.__webglVertexCount), N.info.render.calls++)
        }
    };
    this.render = function(a, b, c, d) {
        if (!1 === b instanceof THREE.Camera) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        else {
            var e, f, g, i, h = a.__lights,
            k = a.fog;
            ta = -1;
            bb = !0;
            this.autoUpdateScene && a.updateMatrixWorld();
            void 0 === b.parent && b.updateMatrixWorld();
            b.matrixWorldInverse.getInverse(b.matrixWorld);
            gc.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
            Va.setFromMatrix(gc);
            this.autoUpdateObjects && this.initWebGLObjects(a);
            s(this.renderPluginsPre, a, b);
            N.info.render.calls = 0;
            N.info.render.vertices = 0;
            N.info.render.faces = 0;
            N.info.render.points = 0;
            this.setRenderTarget(c); (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
            i = a.__webglObjects;
            d = 0;
            for (e = i.length; d < e; d++) if (f = i[d], g = f.object, f.render = !1, g.visible && (!(g instanceof THREE.Mesh || g instanceof THREE.ParticleSystem) || !g.frustumCulled || Va.intersectsObject(g))) {
                C(g, b);
                var n = f,
                l = n.buffer,
                q = void 0,
                t = q = void 0,
                t = n.object.material;
                if (t instanceof THREE.MeshFaceMaterial) q = l.materialIndex,
                q = t.materials[q],
                q.transparent ? (n.transparent = q, n.opaque = null) : (n.opaque = q, n.transparent = null);
                else if (q = t) q.transparent ? (n.transparent = q, n.opaque = null) : (n.opaque = q, n.transparent = null);
                f.render = !0; ! 0 === this.sortObjects && (null !== g.renderDepth ? f.z = g.renderDepth: (Qa.getPositionFromMatrix(g.matrixWorld), Qa.applyProjection(gc), f.z = Qa.z), f.id = g.id)
            }
            this.sortObjects && i.sort(m);
            i = a.__webglObjectsImmediate;
            d = 0;
            for (e = i.length; d < e; d++) f = i[d],
            g = f.object,
            g.visible && (C(g, b), g = f.object.material, g.transparent ? (f.transparent = g, f.opaque = null) : (f.opaque = g, f.transparent = null));
            a.overrideMaterial ? (d = a.overrideMaterial, this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst), this.setDepthTest(d.depthTest), this.setDepthWrite(d.depthWrite), E(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits), r(a.__webglObjects, !1, "", b, h, k, !0, d), p(a.__webglObjectsImmediate, "", b, h, k, !1, d)) : (d = null, this.setBlending(THREE.NoBlending), r(a.__webglObjects, !0, "opaque", b, h, k, !1, d), p(a.__webglObjectsImmediate, "opaque", b, h, k, !1, d), r(a.__webglObjects, !1, "transparent", b, h, k, !0, d), p(a.__webglObjectsImmediate, "transparent", b, h, k, !0, d));
            s(this.renderPluginsPost, a, b);
            c && (c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !== THREE.LinearFilter) && (c instanceof THREE.WebGLRenderTargetCube ? (j.bindTexture(j.TEXTURE_CUBE_MAP, c.__webglTexture), j.generateMipmap(j.TEXTURE_CUBE_MAP), j.bindTexture(j.TEXTURE_CUBE_MAP, null)) : (j.bindTexture(j.TEXTURE_2D, c.__webglTexture), j.generateMipmap(j.TEXTURE_2D), j.bindTexture(j.TEXTURE_2D, null)));
            this.setDepthTest(!0);
            this.setDepthWrite(!0)
        }
    };
    this.renderImmediateObject = function(a, b, c, d, e) {
        var f = A(a, b, c, d, e);
        ka = -1;
        N.setMaterialFaces(d);
        e.immediateRenderCallback ? e.immediateRenderCallback(f, j, Va) : e.render(function(a) {
            N.renderBufferImmediate(a, f, d)
        })
    };
    this.initWebGLObjects = function(a) {
        a.__webglObjects || (a.__webglObjects = [], a.__webglObjectsImmediate = [], a.__webglSprites = [], a.__webglFlares = []);
        for (; a.__objectsAdded.length;) {
            var b = a.__objectsAdded[0],
            k = a,
            l = void 0,
            m = void 0,
            p = void 0,
            r = void 0;
            if (!b.__webglInit) if (b.__webglInit = !0, b._modelViewMatrix = new THREE.Matrix4, b._normalMatrix = new THREE.Matrix3, void 0 !== b.geometry && void 0 === b.geometry.__webglInit && (b.geometry.__webglInit = !0, b.geometry.addEventListener("dispose", wd)), b instanceof THREE.Mesh) if (m = b.geometry, p = b.material, m instanceof THREE.Geometry) {
                if (void 0 === m.geometryGroups) {
                    var s = m,
                    x = void 0,
                    C = void 0,
                    B = void 0,
                    A = void 0,
                    F = void 0,
                    E = void 0,
                    G = {},
                    I = s.morphTargets.length,
                    J = s.morphNormals.length,
                    K = p instanceof THREE.MeshFaceMaterial;
                    s.geometryGroups = {};
                    x = 0;
                    for (C = s.faces.length; x < C; x++) B = s.faces[x],
                    A = K ? B.materialIndex: 0,
                    void 0 === G[A] && (G[A] = {
                        hash: A,
                        counter: 0
                    }),
                    E = G[A].hash + "_" + G[A].counter,
                    void 0 === s.geometryGroups[E] && (s.geometryGroups[E] = {
                        faces3: [],
                        faces4: [],
                        materialIndex: A,
                        vertices: 0,
                        numMorphTargets: I,
                        numMorphNormals: J
                    }),
                    F = B instanceof THREE.Face3 ? 3 : 4,
                    65535 < s.geometryGroups[E].vertices + F && (G[A].counter += 1, E = G[A].hash + "_" + G[A].counter, void 0 === s.geometryGroups[E] && (s.geometryGroups[E] = {
                        faces3: [],
                        faces4: [],
                        materialIndex: A,
                        vertices: 0,
                        numMorphTargets: I,
                        numMorphNormals: J
                    })),
                    B instanceof THREE.Face3 ? s.geometryGroups[E].faces3.push(x) : s.geometryGroups[E].faces4.push(x),
                    s.geometryGroups[E].vertices += F;
                    s.geometryGroupsList = [];
                    var L = void 0;
                    for (L in s.geometryGroups) s.geometryGroups[L].id = pa++,
                    s.geometryGroupsList.push(s.geometryGroups[L])
                }
                for (l in m.geometryGroups) if (r = m.geometryGroups[l], !r.__webglVertexBuffer) {
                    var H = r;
                    H.__webglVertexBuffer = j.createBuffer();
                    H.__webglNormalBuffer = j.createBuffer();
                    H.__webglTangentBuffer = j.createBuffer();
                    H.__webglColorBuffer = j.createBuffer();
                    H.__webglUVBuffer = j.createBuffer();
                    H.__webglUV2Buffer = j.createBuffer();
                    H.__webglSkinIndicesBuffer = j.createBuffer();
                    H.__webglSkinWeightsBuffer = j.createBuffer();
                    H.__webglFaceBuffer = j.createBuffer();
                    H.__webglLineBuffer = j.createBuffer();
                    var M = void 0,
                    P = void 0;
                    if (H.numMorphTargets) {
                        H.__webglMorphTargetsBuffers = [];
                        M = 0;
                        for (P = H.numMorphTargets; M < P; M++) H.__webglMorphTargetsBuffers.push(j.createBuffer())
                    }
                    if (H.numMorphNormals) {
                        H.__webglMorphNormalsBuffers = [];
                        M = 0;
                        for (P = H.numMorphNormals; M < P; M++) H.__webglMorphNormalsBuffers.push(j.createBuffer())
                    }
                    N.info.memory.geometries++;
                    d(r, b);
                    m.verticesNeedUpdate = !0;
                    m.morphTargetsNeedUpdate = !0;
                    m.elementsNeedUpdate = !0;
                    m.uvsNeedUpdate = !0;
                    m.normalsNeedUpdate = !0;
                    m.tangentsNeedUpdate = !0;
                    m.colorsNeedUpdate = !0
                }
            } else m instanceof THREE.BufferGeometry && h(m);
            else if (b instanceof THREE.Ribbon) {
                if (m = b.geometry, !m.__webglVertexBuffer) {
                    var U = m;
                    U.__webglVertexBuffer = j.createBuffer();
                    U.__webglColorBuffer = j.createBuffer();
                    U.__webglNormalBuffer = j.createBuffer();
                    N.info.memory.geometries++;
                    var aa = m,
                    W = b,
                    Y = aa.vertices.length;
                    aa.__vertexArray = new Float32Array(3 * Y);
                    aa.__colorArray = new Float32Array(3 * Y);
                    aa.__normalArray = new Float32Array(3 * Y);
                    aa.__webglVertexCount = Y;
                    c(aa, W);
                    m.verticesNeedUpdate = !0;
                    m.colorsNeedUpdate = !0;
                    m.normalsNeedUpdate = !0
                }
            } else if (b instanceof THREE.Line) {
                if (m = b.geometry, !m.__webglVertexBuffer) if (m instanceof THREE.Geometry) {
                    var Z = m;
                    Z.__webglVertexBuffer = j.createBuffer();
                    Z.__webglColorBuffer = j.createBuffer();
                    Z.__webglLineDistanceBuffer = j.createBuffer();
                    N.info.memory.geometries++;
                    var X = m,
                    da = b,
                    ka = X.vertices.length;
                    X.__vertexArray = new Float32Array(3 * ka);
                    X.__colorArray = new Float32Array(3 * ka);
                    X.__lineDistanceArray = new Float32Array(1 * ka);
                    X.__webglLineCount = ka;
                    c(X, da);
                    m.verticesNeedUpdate = !0;
                    m.colorsNeedUpdate = !0;
                    m.lineDistancesNeedUpdate = !0
                } else m instanceof THREE.BufferGeometry && h(m)
            } else if (b instanceof THREE.ParticleSystem && (m = b.geometry, !m.__webglVertexBuffer)) if (m instanceof THREE.Geometry) {
                var fa = m;
                fa.__webglVertexBuffer = j.createBuffer();
                fa.__webglColorBuffer = j.createBuffer();
                N.info.memory.geometries++;
                var ca = m,
                Ma = b,
                ha = ca.vertices.length;
                ca.__vertexArray = new Float32Array(3 * ha);
                ca.__colorArray = new Float32Array(3 * ha);
                ca.__sortArray = [];
                ca.__webglParticleCount = ha;
                c(ca, Ma);
                m.verticesNeedUpdate = !0;
                m.colorsNeedUpdate = !0
            } else m instanceof THREE.BufferGeometry && h(m);
            if (!b.__webglActive) {
                if (b instanceof THREE.Mesh) if (m = b.geometry, m instanceof THREE.BufferGeometry) q(k.__webglObjects, m, b);
                else {
                    if (m instanceof THREE.Geometry) for (l in m.geometryGroups) r = m.geometryGroups[l],
                    q(k.__webglObjects, r, b)
                } else b instanceof THREE.Ribbon || b instanceof THREE.Line || b instanceof THREE.ParticleSystem ? (m = b.geometry, q(k.__webglObjects, m, b)) : b instanceof THREE.ImmediateRenderObject || b.immediateRenderCallback ? k.__webglObjectsImmediate.push({
                    object: b,
                    opaque: null,
                    transparent: null
                }) : b instanceof THREE.Sprite ? k.__webglSprites.push(b) : b instanceof THREE.LensFlare && k.__webglFlares.push(b);
                b.__webglActive = !0
            }
            a.__objectsAdded.splice(0, 1)
        }
        for (; a.__objectsRemoved.length;) {
            var Na = a.__objectsRemoved[0],
            la = a;
            Na instanceof THREE.Mesh || Na instanceof THREE.ParticleSystem || Na instanceof THREE.Ribbon || Na instanceof THREE.Line ? z(la.__webglObjects, Na) : Na instanceof THREE.Sprite ? t(la.__webglSprites, Na) : Na instanceof THREE.LensFlare ? t(la.__webglFlares, Na) : (Na instanceof THREE.ImmediateRenderObject || Na.immediateRenderCallback) && z(la.__webglObjectsImmediate, Na);
            Na.__webglActive = !1;
            a.__objectsRemoved.splice(0, 1)
        }
        for (var oa = 0,
        ra = a.__webglObjects.length; oa < ra; oa++) {
            var ta = a.__webglObjects[oa].object,
            O = ta.geometry,
            mb = void 0,
            qa = void 0,
            ia = void 0;
            if (ta instanceof THREE.Mesh) if (O instanceof THREE.BufferGeometry)(O.verticesNeedUpdate || O.elementsNeedUpdate || O.uvsNeedUpdate || O.normalsNeedUpdate || O.colorsNeedUpdate || O.tangentsNeedUpdate) && i(O, j.DYNAMIC_DRAW, !O.dynamic),
            O.verticesNeedUpdate = !1,
            O.elementsNeedUpdate = !1,
            O.uvsNeedUpdate = !1,
            O.normalsNeedUpdate = !1,
            O.colorsNeedUpdate = !1,
            O.tangentsNeedUpdate = !1;
            else {
                for (var Ca = 0,
                Ka = O.geometryGroupsList.length; Ca < Ka; Ca++) if (mb = O.geometryGroupsList[Ca], ia = e(ta, mb), O.buffersNeedUpdate && d(mb, ta), qa = ia.attributes && y(ia), O.verticesNeedUpdate || O.morphTargetsNeedUpdate || O.elementsNeedUpdate || O.uvsNeedUpdate || O.normalsNeedUpdate || O.colorsNeedUpdate || O.tangentsNeedUpdate || qa) {
                    var sa = mb,
                    La = ta,
                    Pa = j.DYNAMIC_DRAW,
                    Va = !O.dynamic,
                    Fa = ia;
                    if (sa.__inittedArrays) {
                        var gb = f(Fa),
                        Wa = Fa.vertexColors ? Fa.vertexColors: !1,
                        bb = g(Fa),
                        $a = gb === THREE.SmoothShading,
                        D = void 0,
                        V = void 0,
                        Ra = void 0,
                        Q = void 0,
                        ab = void 0,
                        Xa = void 0,
                        Sa = void 0,
                        nb = void 0,
                        cb = void 0,
                        pb = void 0,
                        ub = void 0,
                        R = void 0,
                        S = void 0,
                        T = void 0,
                        na = void 0,
                        Mb = void 0,
                        Nb = void 0,
                        Ob = void 0,
                        xb = void 0,
                        Pb = void 0,
                        Qb = void 0,
                        Rb = void 0,
                        yb = void 0,
                        Sb = void 0,
                        Tb = void 0,
                        Ub = void 0,
                        zb = void 0,
                        Vb = void 0,
                        Wb = void 0,
                        Xb = void 0,
                        Ib = void 0,
                        Yb = void 0,
                        Zb = void 0,
                        $b = void 0,
                        Jb = void 0,
                        xa = void 0,
                        fc = void 0,
                        nc = void 0,
                        Ab = void 0,
                        yc = void 0,
                        db = void 0,
                        mc = void 0,
                        Ya = void 0,
                        Za = void 0,
                        oc = void 0,
                        hc = void 0,
                        Oa = 0,
                        Ua = 0,
                        ic = 0,
                        jc = 0,
                        Eb = 0,
                        kb = 0,
                        Aa = 0,
                        ob = 0,
                        Ta = 0,
                        ba = 0,
                        ja = 0,
                        w = 0,
                        ya = void 0,
                        eb = sa.__vertexArray,
                        Dc = sa.__uvArray,
                        Ec = sa.__uv2Array,
                        Fb = sa.__normalArray,
                        Ga = sa.__tangentArray,
                        fb = sa.__colorArray,
                        Ha = sa.__skinIndexArray,
                        Ia = sa.__skinWeightArray,
                        sc = sa.__morphTargetsArrays,
                        tc = sa.__morphNormalsArrays,
                        od = sa.__webglCustomAttributesList,
                        u = void 0,
                        ac = sa.__faceArray,
                        wb = sa.__lineArray,
                        qb = La.geometry,
                        Mc = qb.elementsNeedUpdate,
                        Cc = qb.uvsNeedUpdate,
                        Nc = qb.normalsNeedUpdate,
                        Oc = qb.tangentsNeedUpdate,
                        Pc = qb.colorsNeedUpdate,
                        fd = qb.morphTargetsNeedUpdate,
                        uc = qb.vertices,
                        ua = sa.faces3,
                        va = sa.faces4,
                        lb = qb.faces,
                        pd = qb.faceVertexUvs[0],
                        qd = qb.faceVertexUvs[1],
                        vc = qb.skinIndices,
                        pc = qb.skinWeights,
                        qc = qb.morphTargets,
                        Qc = qb.morphNormals;
                        if (qb.verticesNeedUpdate) {
                            D = 0;
                            for (V = ua.length; D < V; D++) Q = lb[ua[D]],
                            R = uc[Q.a],
                            S = uc[Q.b],
                            T = uc[Q.c],
                            eb[Ua] = R.x,
                            eb[Ua + 1] = R.y,
                            eb[Ua + 2] = R.z,
                            eb[Ua + 3] = S.x,
                            eb[Ua + 4] = S.y,
                            eb[Ua + 5] = S.z,
                            eb[Ua + 6] = T.x,
                            eb[Ua + 7] = T.y,
                            eb[Ua + 8] = T.z,
                            Ua += 9;
                            D = 0;
                            for (V = va.length; D < V; D++) Q = lb[va[D]],
                            R = uc[Q.a],
                            S = uc[Q.b],
                            T = uc[Q.c],
                            na = uc[Q.d],
                            eb[Ua] = R.x,
                            eb[Ua + 1] = R.y,
                            eb[Ua + 2] = R.z,
                            eb[Ua + 3] = S.x,
                            eb[Ua + 4] = S.y,
                            eb[Ua + 5] = S.z,
                            eb[Ua + 6] = T.x,
                            eb[Ua + 7] = T.y,
                            eb[Ua + 8] = T.z,
                            eb[Ua + 9] = na.x,
                            eb[Ua + 10] = na.y,
                            eb[Ua + 11] = na.z,
                            Ua += 12;
                            j.bindBuffer(j.ARRAY_BUFFER, sa.__webglVertexBuffer);
                            j.bufferData(j.ARRAY_BUFFER, eb, Pa)
                        }
                        if (fd) {
                            db = 0;
                            for (mc = qc.length; db < mc; db++) {
                                D = ja = 0;
                                for (V = ua.length; D < V; D++) oc = ua[D],
                                Q = lb[oc],
                                R = qc[db].vertices[Q.a],
                                S = qc[db].vertices[Q.b],
                                T = qc[db].vertices[Q.c],
                                Ya = sc[db],
                                Ya[ja] = R.x,
                                Ya[ja + 1] = R.y,
                                Ya[ja + 2] = R.z,
                                Ya[ja + 3] = S.x,
                                Ya[ja + 4] = S.y,
                                Ya[ja + 5] = S.z,
                                Ya[ja + 6] = T.x,
                                Ya[ja + 7] = T.y,
                                Ya[ja + 8] = T.z,
                                Fa.morphNormals && ($a ? (hc = Qc[db].vertexNormals[oc], Pb = hc.a, Qb = hc.b, Rb = hc.c) : Rb = Qb = Pb = Qc[db].faceNormals[oc], Za = tc[db], Za[ja] = Pb.x, Za[ja + 1] = Pb.y, Za[ja + 2] = Pb.z, Za[ja + 3] = Qb.x, Za[ja + 4] = Qb.y, Za[ja + 5] = Qb.z, Za[ja + 6] = Rb.x, Za[ja + 7] = Rb.y, Za[ja + 8] = Rb.z),
                                ja += 9;
                                D = 0;
                                for (V = va.length; D < V; D++) oc = va[D],
                                Q = lb[oc],
                                R = qc[db].vertices[Q.a],
                                S = qc[db].vertices[Q.b],
                                T = qc[db].vertices[Q.c],
                                na = qc[db].vertices[Q.d],
                                Ya = sc[db],
                                Ya[ja] = R.x,
                                Ya[ja + 1] = R.y,
                                Ya[ja + 2] = R.z,
                                Ya[ja + 3] = S.x,
                                Ya[ja + 4] = S.y,
                                Ya[ja + 5] = S.z,
                                Ya[ja + 6] = T.x,
                                Ya[ja + 7] = T.y,
                                Ya[ja + 8] = T.z,
                                Ya[ja + 9] = na.x,
                                Ya[ja + 10] = na.y,
                                Ya[ja + 11] = na.z,
                                Fa.morphNormals && ($a ? (hc = Qc[db].vertexNormals[oc], Pb = hc.a, Qb = hc.b, Rb = hc.c, yb = hc.d) : yb = Rb = Qb = Pb = Qc[db].faceNormals[oc], Za = tc[db], Za[ja] = Pb.x, Za[ja + 1] = Pb.y, Za[ja + 2] = Pb.z, Za[ja + 3] = Qb.x, Za[ja + 4] = Qb.y, Za[ja + 5] = Qb.z, Za[ja + 6] = Rb.x, Za[ja + 7] = Rb.y, Za[ja + 8] = Rb.z, Za[ja + 9] = yb.x, Za[ja + 10] = yb.y, Za[ja + 11] = yb.z),
                                ja += 12;
                                j.bindBuffer(j.ARRAY_BUFFER, sa.__webglMorphTargetsBuffers[db]);
                                j.bufferData(j.ARRAY_BUFFER, sc[db], Pa);
                                Fa.morphNormals && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglMorphNormalsBuffers[db]), j.bufferData(j.ARRAY_BUFFER, tc[db], Pa))
                            }
                        }
                        if (pc.length) {
                            D = 0;
                            for (V = ua.length; D < V; D++) Q = lb[ua[D]],
                            Vb = pc[Q.a],
                            Wb = pc[Q.b],
                            Xb = pc[Q.c],
                            Ia[ba] = Vb.x,
                            Ia[ba + 1] = Vb.y,
                            Ia[ba + 2] = Vb.z,
                            Ia[ba + 3] = Vb.w,
                            Ia[ba + 4] = Wb.x,
                            Ia[ba + 5] = Wb.y,
                            Ia[ba + 6] = Wb.z,
                            Ia[ba + 7] = Wb.w,
                            Ia[ba + 8] = Xb.x,
                            Ia[ba + 9] = Xb.y,
                            Ia[ba + 10] = Xb.z,
                            Ia[ba + 11] = Xb.w,
                            Yb = vc[Q.a],
                            Zb = vc[Q.b],
                            $b = vc[Q.c],
                            Ha[ba] = Yb.x,
                            Ha[ba + 1] = Yb.y,
                            Ha[ba + 2] = Yb.z,
                            Ha[ba + 3] = Yb.w,
                            Ha[ba + 4] = Zb.x,
                            Ha[ba + 5] = Zb.y,
                            Ha[ba + 6] = Zb.z,
                            Ha[ba + 7] = Zb.w,
                            Ha[ba + 8] = $b.x,
                            Ha[ba + 9] = $b.y,
                            Ha[ba + 10] = $b.z,
                            Ha[ba + 11] = $b.w,
                            ba += 12;
                            D = 0;
                            for (V = va.length; D < V; D++) Q = lb[va[D]],
                            Vb = pc[Q.a],
                            Wb = pc[Q.b],
                            Xb = pc[Q.c],
                            Ib = pc[Q.d],
                            Ia[ba] = Vb.x,
                            Ia[ba + 1] = Vb.y,
                            Ia[ba + 2] = Vb.z,
                            Ia[ba + 3] = Vb.w,
                            Ia[ba + 4] = Wb.x,
                            Ia[ba + 5] = Wb.y,
                            Ia[ba + 6] = Wb.z,
                            Ia[ba + 7] = Wb.w,
                            Ia[ba + 8] = Xb.x,
                            Ia[ba + 9] = Xb.y,
                            Ia[ba + 10] = Xb.z,
                            Ia[ba + 11] = Xb.w,
                            Ia[ba + 12] = Ib.x,
                            Ia[ba + 13] = Ib.y,
                            Ia[ba + 14] = Ib.z,
                            Ia[ba + 15] = Ib.w,
                            Yb = vc[Q.a],
                            Zb = vc[Q.b],
                            $b = vc[Q.c],
                            Jb = vc[Q.d],
                            Ha[ba] = Yb.x,
                            Ha[ba + 1] = Yb.y,
                            Ha[ba + 2] = Yb.z,
                            Ha[ba + 3] = Yb.w,
                            Ha[ba + 4] = Zb.x,
                            Ha[ba + 5] = Zb.y,
                            Ha[ba + 6] = Zb.z,
                            Ha[ba + 7] = Zb.w,
                            Ha[ba + 8] = $b.x,
                            Ha[ba + 9] = $b.y,
                            Ha[ba + 10] = $b.z,
                            Ha[ba + 11] = $b.w,
                            Ha[ba + 12] = Jb.x,
                            Ha[ba + 13] = Jb.y,
                            Ha[ba + 14] = Jb.z,
                            Ha[ba + 15] = Jb.w,
                            ba += 16;
                            0 < ba && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglSkinIndicesBuffer), j.bufferData(j.ARRAY_BUFFER, Ha, Pa), j.bindBuffer(j.ARRAY_BUFFER, sa.__webglSkinWeightsBuffer), j.bufferData(j.ARRAY_BUFFER, Ia, Pa))
                        }
                        if (Pc && Wa) {
                            D = 0;
                            for (V = ua.length; D < V; D++) Q = lb[ua[D]],
                            Sa = Q.vertexColors,
                            nb = Q.color,
                            3 === Sa.length && Wa === THREE.VertexColors ? (Sb = Sa[0], Tb = Sa[1], Ub = Sa[2]) : Ub = Tb = Sb = nb,
                            fb[Ta] = Sb.r,
                            fb[Ta + 1] = Sb.g,
                            fb[Ta + 2] = Sb.b,
                            fb[Ta + 3] = Tb.r,
                            fb[Ta + 4] = Tb.g,
                            fb[Ta + 5] = Tb.b,
                            fb[Ta + 6] = Ub.r,
                            fb[Ta + 7] = Ub.g,
                            fb[Ta + 8] = Ub.b,
                            Ta += 9;
                            D = 0;
                            for (V = va.length; D < V; D++) Q = lb[va[D]],
                            Sa = Q.vertexColors,
                            nb = Q.color,
                            4 === Sa.length && Wa === THREE.VertexColors ? (Sb = Sa[0], Tb = Sa[1], Ub = Sa[2], zb = Sa[3]) : zb = Ub = Tb = Sb = nb,
                            fb[Ta] = Sb.r,
                            fb[Ta + 1] = Sb.g,
                            fb[Ta + 2] = Sb.b,
                            fb[Ta + 3] = Tb.r,
                            fb[Ta + 4] = Tb.g,
                            fb[Ta + 5] = Tb.b,
                            fb[Ta + 6] = Ub.r,
                            fb[Ta + 7] = Ub.g,
                            fb[Ta + 8] = Ub.b,
                            fb[Ta + 9] = zb.r,
                            fb[Ta + 10] = zb.g,
                            fb[Ta + 11] = zb.b,
                            Ta += 12;
                            0 < Ta && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, fb, Pa))
                        }
                        if (Oc && qb.hasTangents) {
                            D = 0;
                            for (V = ua.length; D < V; D++) Q = lb[ua[D]],
                            cb = Q.vertexTangents,
                            Mb = cb[0],
                            Nb = cb[1],
                            Ob = cb[2],
                            Ga[Aa] = Mb.x,
                            Ga[Aa + 1] = Mb.y,
                            Ga[Aa + 2] = Mb.z,
                            Ga[Aa + 3] = Mb.w,
                            Ga[Aa + 4] = Nb.x,
                            Ga[Aa + 5] = Nb.y,
                            Ga[Aa + 6] = Nb.z,
                            Ga[Aa + 7] = Nb.w,
                            Ga[Aa + 8] = Ob.x,
                            Ga[Aa + 9] = Ob.y,
                            Ga[Aa + 10] = Ob.z,
                            Ga[Aa + 11] = Ob.w,
                            Aa += 12;
                            D = 0;
                            for (V = va.length; D < V; D++) Q = lb[va[D]],
                            cb = Q.vertexTangents,
                            Mb = cb[0],
                            Nb = cb[1],
                            Ob = cb[2],
                            xb = cb[3],
                            Ga[Aa] = Mb.x,
                            Ga[Aa + 1] = Mb.y,
                            Ga[Aa + 2] = Mb.z,
                            Ga[Aa + 3] = Mb.w,
                            Ga[Aa + 4] = Nb.x,
                            Ga[Aa + 5] = Nb.y,
                            Ga[Aa + 6] = Nb.z,
                            Ga[Aa + 7] = Nb.w,
                            Ga[Aa + 8] = Ob.x,
                            Ga[Aa + 9] = Ob.y,
                            Ga[Aa + 10] = Ob.z,
                            Ga[Aa + 11] = Ob.w,
                            Ga[Aa + 12] = xb.x,
                            Ga[Aa + 13] = xb.y,
                            Ga[Aa + 14] = xb.z,
                            Ga[Aa + 15] = xb.w,
                            Aa += 16;
                            j.bindBuffer(j.ARRAY_BUFFER, sa.__webglTangentBuffer);
                            j.bufferData(j.ARRAY_BUFFER, Ga, Pa)
                        }
                        if (Nc && gb) {
                            D = 0;
                            for (V = ua.length; D < V; D++) if (Q = lb[ua[D]], ab = Q.vertexNormals, Xa = Q.normal, 3 === ab.length && $a) for (xa = 0; 3 > xa; xa++) nc = ab[xa],
                            Fb[kb] = nc.x,
                            Fb[kb + 1] = nc.y,
                            Fb[kb + 2] = nc.z,
                            kb += 3;
                            else for (xa = 0; 3 > xa; xa++) Fb[kb] = Xa.x,
                            Fb[kb + 1] = Xa.y,
                            Fb[kb + 2] = Xa.z,
                            kb += 3;
                            D = 0;
                            for (V = va.length; D < V; D++) if (Q = lb[va[D]], ab = Q.vertexNormals, Xa = Q.normal, 4 === ab.length && $a) for (xa = 0; 4 > xa; xa++) nc = ab[xa],
                            Fb[kb] = nc.x,
                            Fb[kb + 1] = nc.y,
                            Fb[kb + 2] = nc.z,
                            kb += 3;
                            else for (xa = 0; 4 > xa; xa++) Fb[kb] = Xa.x,
                            Fb[kb + 1] = Xa.y,
                            Fb[kb + 2] = Xa.z,
                            kb += 3;
                            j.bindBuffer(j.ARRAY_BUFFER, sa.__webglNormalBuffer);
                            j.bufferData(j.ARRAY_BUFFER, Fb, Pa)
                        }
                        if (Cc && pd && bb) {
                            D = 0;
                            for (V = ua.length; D < V; D++) if (Ra = ua[D], pb = pd[Ra], void 0 !== pb) for (xa = 0; 3 > xa; xa++) Ab = pb[xa],
                            Dc[ic] = Ab.x,
                            Dc[ic + 1] = Ab.y,
                            ic += 2;
                            D = 0;
                            for (V = va.length; D < V; D++) if (Ra = va[D], pb = pd[Ra], void 0 !== pb) for (xa = 0; 4 > xa; xa++) Ab = pb[xa],
                            Dc[ic] = Ab.x,
                            Dc[ic + 1] = Ab.y,
                            ic += 2;
                            0 < ic && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglUVBuffer), j.bufferData(j.ARRAY_BUFFER, Dc, Pa))
                        }
                        if (Cc && qd && bb) {
                            D = 0;
                            for (V = ua.length; D < V; D++) if (Ra = ua[D], ub = qd[Ra], void 0 !== ub) for (xa = 0; 3 > xa; xa++) yc = ub[xa],
                            Ec[jc] = yc.x,
                            Ec[jc + 1] = yc.y,
                            jc += 2;
                            D = 0;
                            for (V = va.length; D < V; D++) if (Ra = va[D], ub = qd[Ra], void 0 !== ub) for (xa = 0; 4 > xa; xa++) yc = ub[xa],
                            Ec[jc] = yc.x,
                            Ec[jc + 1] = yc.y,
                            jc += 2;
                            0 < jc && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglUV2Buffer), j.bufferData(j.ARRAY_BUFFER, Ec, Pa))
                        }
                        if (Mc) {
                            D = 0;
                            for (V = ua.length; D < V; D++) ac[Eb] = Oa,
                            ac[Eb + 1] = Oa + 1,
                            ac[Eb + 2] = Oa + 2,
                            Eb += 3,
                            wb[ob] = Oa,
                            wb[ob + 1] = Oa + 1,
                            wb[ob + 2] = Oa,
                            wb[ob + 3] = Oa + 2,
                            wb[ob + 4] = Oa + 1,
                            wb[ob + 5] = Oa + 2,
                            ob += 6,
                            Oa += 3;
                            D = 0;
                            for (V = va.length; D < V; D++) ac[Eb] = Oa,
                            ac[Eb + 1] = Oa + 1,
                            ac[Eb + 2] = Oa + 3,
                            ac[Eb + 3] = Oa + 1,
                            ac[Eb + 4] = Oa + 2,
                            ac[Eb + 5] = Oa + 3,
                            Eb += 6,
                            wb[ob] = Oa,
                            wb[ob + 1] = Oa + 1,
                            wb[ob + 2] = Oa,
                            wb[ob + 3] = Oa + 3,
                            wb[ob + 4] = Oa + 1,
                            wb[ob + 5] = Oa + 2,
                            wb[ob + 6] = Oa + 2,
                            wb[ob + 7] = Oa + 3,
                            ob += 8,
                            Oa += 4;
                            j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, sa.__webglFaceBuffer);
                            j.bufferData(j.ELEMENT_ARRAY_BUFFER, ac, Pa);
                            j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, sa.__webglLineBuffer);
                            j.bufferData(j.ELEMENT_ARRAY_BUFFER, wb, Pa)
                        }
                        if (od) {
                            xa = 0;
                            for (fc = od.length; xa < fc; xa++) if (u = od[xa], u.__original.needsUpdate) {
                                w = 0;
                                if (1 === u.size) if (void 0 === u.boundTo || "vertices" === u.boundTo) {
                                    D = 0;
                                    for (V = ua.length; D < V; D++) Q = lb[ua[D]],
                                    u.array[w] = u.value[Q.a],
                                    u.array[w + 1] = u.value[Q.b],
                                    u.array[w + 2] = u.value[Q.c],
                                    w += 3;
                                    D = 0;
                                    for (V = va.length; D < V; D++) Q = lb[va[D]],
                                    u.array[w] = u.value[Q.a],
                                    u.array[w + 1] = u.value[Q.b],
                                    u.array[w + 2] = u.value[Q.c],
                                    u.array[w + 3] = u.value[Q.d],
                                    w += 4
                                } else {
                                    if ("faces" === u.boundTo) {
                                        D = 0;
                                        for (V = ua.length; D < V; D++) ya = u.value[ua[D]],
                                        u.array[w] = ya,
                                        u.array[w + 1] = ya,
                                        u.array[w + 2] = ya,
                                        w += 3;
                                        D = 0;
                                        for (V = va.length; D < V; D++) ya = u.value[va[D]],
                                        u.array[w] = ya,
                                        u.array[w + 1] = ya,
                                        u.array[w + 2] = ya,
                                        u.array[w + 3] = ya,
                                        w += 4
                                    }
                                } else if (2 === u.size) if (void 0 === u.boundTo || "vertices" === u.boundTo) {
                                    D = 0;
                                    for (V = ua.length; D < V; D++) Q = lb[ua[D]],
                                    R = u.value[Q.a],
                                    S = u.value[Q.b],
                                    T = u.value[Q.c],
                                    u.array[w] = R.x,
                                    u.array[w + 1] = R.y,
                                    u.array[w + 2] = S.x,
                                    u.array[w + 3] = S.y,
                                    u.array[w + 4] = T.x,
                                    u.array[w + 5] = T.y,
                                    w += 6;
                                    D = 0;
                                    for (V = va.length; D < V; D++) Q = lb[va[D]],
                                    R = u.value[Q.a],
                                    S = u.value[Q.b],
                                    T = u.value[Q.c],
                                    na = u.value[Q.d],
                                    u.array[w] = R.x,
                                    u.array[w + 1] = R.y,
                                    u.array[w + 2] = S.x,
                                    u.array[w + 3] = S.y,
                                    u.array[w + 4] = T.x,
                                    u.array[w + 5] = T.y,
                                    u.array[w + 6] = na.x,
                                    u.array[w + 7] = na.y,
                                    w += 8
                                } else {
                                    if ("faces" === u.boundTo) {
                                        D = 0;
                                        for (V = ua.length; D < V; D++) T = S = R = ya = u.value[ua[D]],
                                        u.array[w] = R.x,
                                        u.array[w + 1] = R.y,
                                        u.array[w + 2] = S.x,
                                        u.array[w + 3] = S.y,
                                        u.array[w + 4] = T.x,
                                        u.array[w + 5] = T.y,
                                        w += 6;
                                        D = 0;
                                        for (V = va.length; D < V; D++) na = T = S = R = ya = u.value[va[D]],
                                        u.array[w] = R.x,
                                        u.array[w + 1] = R.y,
                                        u.array[w + 2] = S.x,
                                        u.array[w + 3] = S.y,
                                        u.array[w + 4] = T.x,
                                        u.array[w + 5] = T.y,
                                        u.array[w + 6] = na.x,
                                        u.array[w + 7] = na.y,
                                        w += 8
                                    }
                                } else if (3 === u.size) {
                                    var $;
                                    $ = "c" === u.type ? ["r", "g", "b"] : ["x", "y", "z"];
                                    if (void 0 === u.boundTo || "vertices" === u.boundTo) {
                                        D = 0;
                                        for (V = ua.length; D < V; D++) Q = lb[ua[D]],
                                        R = u.value[Q.a],
                                        S = u.value[Q.b],
                                        T = u.value[Q.c],
                                        u.array[w] = R[$[0]],
                                        u.array[w + 1] = R[$[1]],
                                        u.array[w + 2] = R[$[2]],
                                        u.array[w + 3] = S[$[0]],
                                        u.array[w + 4] = S[$[1]],
                                        u.array[w + 5] = S[$[2]],
                                        u.array[w + 6] = T[$[0]],
                                        u.array[w + 7] = T[$[1]],
                                        u.array[w + 8] = T[$[2]],
                                        w += 9;
                                        D = 0;
                                        for (V = va.length; D < V; D++) Q = lb[va[D]],
                                        R = u.value[Q.a],
                                        S = u.value[Q.b],
                                        T = u.value[Q.c],
                                        na = u.value[Q.d],
                                        u.array[w] = R[$[0]],
                                        u.array[w + 1] = R[$[1]],
                                        u.array[w + 2] = R[$[2]],
                                        u.array[w + 3] = S[$[0]],
                                        u.array[w + 4] = S[$[1]],
                                        u.array[w + 5] = S[$[2]],
                                        u.array[w + 6] = T[$[0]],
                                        u.array[w + 7] = T[$[1]],
                                        u.array[w + 8] = T[$[2]],
                                        u.array[w + 9] = na[$[0]],
                                        u.array[w + 10] = na[$[1]],
                                        u.array[w + 11] = na[$[2]],
                                        w += 12
                                    } else if ("faces" === u.boundTo) {
                                        D = 0;
                                        for (V = ua.length; D < V; D++) T = S = R = ya = u.value[ua[D]],
                                        u.array[w] = R[$[0]],
                                        u.array[w + 1] = R[$[1]],
                                        u.array[w + 2] = R[$[2]],
                                        u.array[w + 3] = S[$[0]],
                                        u.array[w + 4] = S[$[1]],
                                        u.array[w + 5] = S[$[2]],
                                        u.array[w + 6] = T[$[0]],
                                        u.array[w + 7] = T[$[1]],
                                        u.array[w + 8] = T[$[2]],
                                        w += 9;
                                        D = 0;
                                        for (V = va.length; D < V; D++) na = T = S = R = ya = u.value[va[D]],
                                        u.array[w] = R[$[0]],
                                        u.array[w + 1] = R[$[1]],
                                        u.array[w + 2] = R[$[2]],
                                        u.array[w + 3] = S[$[0]],
                                        u.array[w + 4] = S[$[1]],
                                        u.array[w + 5] = S[$[2]],
                                        u.array[w + 6] = T[$[0]],
                                        u.array[w + 7] = T[$[1]],
                                        u.array[w + 8] = T[$[2]],
                                        u.array[w + 9] = na[$[0]],
                                        u.array[w + 10] = na[$[1]],
                                        u.array[w + 11] = na[$[2]],
                                        w += 12
                                    } else if ("faceVertices" === u.boundTo) {
                                        D = 0;
                                        for (V = ua.length; D < V; D++) ya = u.value[ua[D]],
                                        R = ya[0],
                                        S = ya[1],
                                        T = ya[2],
                                        u.array[w] = R[$[0]],
                                        u.array[w + 1] = R[$[1]],
                                        u.array[w + 2] = R[$[2]],
                                        u.array[w + 3] = S[$[0]],
                                        u.array[w + 4] = S[$[1]],
                                        u.array[w + 5] = S[$[2]],
                                        u.array[w + 6] = T[$[0]],
                                        u.array[w + 7] = T[$[1]],
                                        u.array[w + 8] = T[$[2]],
                                        w += 9;
                                        D = 0;
                                        for (V = va.length; D < V; D++) ya = u.value[va[D]],
                                        R = ya[0],
                                        S = ya[1],
                                        T = ya[2],
                                        na = ya[3],
                                        u.array[w] = R[$[0]],
                                        u.array[w + 1] = R[$[1]],
                                        u.array[w + 2] = R[$[2]],
                                        u.array[w + 3] = S[$[0]],
                                        u.array[w + 4] = S[$[1]],
                                        u.array[w + 5] = S[$[2]],
                                        u.array[w + 6] = T[$[0]],
                                        u.array[w + 7] = T[$[1]],
                                        u.array[w + 8] = T[$[2]],
                                        u.array[w + 9] = na[$[0]],
                                        u.array[w + 10] = na[$[1]],
                                        u.array[w + 11] = na[$[2]],
                                        w += 12
                                    }
                                } else if (4 === u.size) if (void 0 === u.boundTo || "vertices" === u.boundTo) {
                                    D = 0;
                                    for (V = ua.length; D < V; D++) Q = lb[ua[D]],
                                    R = u.value[Q.a],
                                    S = u.value[Q.b],
                                    T = u.value[Q.c],
                                    u.array[w] = R.x,
                                    u.array[w + 1] = R.y,
                                    u.array[w + 2] = R.z,
                                    u.array[w + 3] = R.w,
                                    u.array[w + 4] = S.x,
                                    u.array[w + 5] = S.y,
                                    u.array[w + 6] = S.z,
                                    u.array[w + 7] = S.w,
                                    u.array[w + 8] = T.x,
                                    u.array[w + 9] = T.y,
                                    u.array[w + 10] = T.z,
                                    u.array[w + 11] = T.w,
                                    w += 12;
                                    D = 0;
                                    for (V = va.length; D < V; D++) Q = lb[va[D]],
                                    R = u.value[Q.a],
                                    S = u.value[Q.b],
                                    T = u.value[Q.c],
                                    na = u.value[Q.d],
                                    u.array[w] = R.x,
                                    u.array[w + 1] = R.y,
                                    u.array[w + 2] = R.z,
                                    u.array[w + 3] = R.w,
                                    u.array[w + 4] = S.x,
                                    u.array[w + 5] = S.y,
                                    u.array[w + 6] = S.z,
                                    u.array[w + 7] = S.w,
                                    u.array[w + 8] = T.x,
                                    u.array[w + 9] = T.y,
                                    u.array[w + 10] = T.z,
                                    u.array[w + 11] = T.w,
                                    u.array[w + 12] = na.x,
                                    u.array[w + 13] = na.y,
                                    u.array[w + 14] = na.z,
                                    u.array[w + 15] = na.w,
                                    w += 16
                                } else if ("faces" === u.boundTo) {
                                    D = 0;
                                    for (V = ua.length; D < V; D++) T = S = R = ya = u.value[ua[D]],
                                    u.array[w] = R.x,
                                    u.array[w + 1] = R.y,
                                    u.array[w + 2] = R.z,
                                    u.array[w + 3] = R.w,
                                    u.array[w + 4] = S.x,
                                    u.array[w + 5] = S.y,
                                    u.array[w + 6] = S.z,
                                    u.array[w + 7] = S.w,
                                    u.array[w + 8] = T.x,
                                    u.array[w + 9] = T.y,
                                    u.array[w + 10] = T.z,
                                    u.array[w + 11] = T.w,
                                    w += 12;
                                    D = 0;
                                    for (V = va.length; D < V; D++) na = T = S = R = ya = u.value[va[D]],
                                    u.array[w] = R.x,
                                    u.array[w + 1] = R.y,
                                    u.array[w + 2] = R.z,
                                    u.array[w + 3] = R.w,
                                    u.array[w + 4] = S.x,
                                    u.array[w + 5] = S.y,
                                    u.array[w + 6] = S.z,
                                    u.array[w + 7] = S.w,
                                    u.array[w + 8] = T.x,
                                    u.array[w + 9] = T.y,
                                    u.array[w + 10] = T.z,
                                    u.array[w + 11] = T.w,
                                    u.array[w + 12] = na.x,
                                    u.array[w + 13] = na.y,
                                    u.array[w + 14] = na.z,
                                    u.array[w + 15] = na.w,
                                    w += 16
                                } else if ("faceVertices" === u.boundTo) {
                                    D = 0;
                                    for (V = ua.length; D < V; D++) ya = u.value[ua[D]],
                                    R = ya[0],
                                    S = ya[1],
                                    T = ya[2],
                                    u.array[w] = R.x,
                                    u.array[w + 1] = R.y,
                                    u.array[w + 2] = R.z,
                                    u.array[w + 3] = R.w,
                                    u.array[w + 4] = S.x,
                                    u.array[w + 5] = S.y,
                                    u.array[w + 6] = S.z,
                                    u.array[w + 7] = S.w,
                                    u.array[w + 8] = T.x,
                                    u.array[w + 9] = T.y,
                                    u.array[w + 10] = T.z,
                                    u.array[w + 11] = T.w,
                                    w += 12;
                                    D = 0;
                                    for (V = va.length; D < V; D++) ya = u.value[va[D]],
                                    R = ya[0],
                                    S = ya[1],
                                    T = ya[2],
                                    na = ya[3],
                                    u.array[w] = R.x,
                                    u.array[w + 1] = R.y,
                                    u.array[w + 2] = R.z,
                                    u.array[w + 3] = R.w,
                                    u.array[w + 4] = S.x,
                                    u.array[w + 5] = S.y,
                                    u.array[w + 6] = S.z,
                                    u.array[w + 7] = S.w,
                                    u.array[w + 8] = T.x,
                                    u.array[w + 9] = T.y,
                                    u.array[w + 10] = T.z,
                                    u.array[w + 11] = T.w,
                                    u.array[w + 12] = na.x,
                                    u.array[w + 13] = na.y,
                                    u.array[w + 14] = na.z,
                                    u.array[w + 15] = na.w,
                                    w += 16
                                }
                                j.bindBuffer(j.ARRAY_BUFFER, u.buffer);
                                j.bufferData(j.ARRAY_BUFFER, u.array, Pa)
                            }
                        }
                        Va && (delete sa.__inittedArrays, delete sa.__colorArray, delete sa.__normalArray, delete sa.__tangentArray, delete sa.__uvArray, delete sa.__uv2Array, delete sa.__faceArray, delete sa.__vertexArray, delete sa.__lineArray, delete sa.__skinIndexArray, delete sa.__skinWeightArray)
                    }
                }
                O.verticesNeedUpdate = !1;
                O.morphTargetsNeedUpdate = !1;
                O.elementsNeedUpdate = !1;
                O.uvsNeedUpdate = !1;
                O.normalsNeedUpdate = !1;
                O.colorsNeedUpdate = !1;
                O.tangentsNeedUpdate = !1;
                O.buffersNeedUpdate = !1;
                ia.attributes && v(ia)
            } else if (ta instanceof THREE.Ribbon) {
                ia = e(ta, O);
                qa = ia.attributes && y(ia);
                if (O.verticesNeedUpdate || O.colorsNeedUpdate || O.normalsNeedUpdate || qa) {
                    var Gb = O,
                    Rc = j.DYNAMIC_DRAW,
                    Fc = void 0,
                    Gc = void 0,
                    Hc = void 0,
                    Sc = void 0,
                    za = void 0,
                    Tc = void 0,
                    Uc = void 0,
                    Vc = void 0,
                    xd = void 0,
                    ib = void 0,
                    zc = void 0,
                    Da = void 0,
                    rb = void 0,
                    yd = Gb.vertices,
                    zd = Gb.colors,
                    Ad = Gb.normals,
                    gd = yd.length,
                    hd = zd.length,
                    id = Ad.length,
                    Wc = Gb.__vertexArray,
                    Xc = Gb.__colorArray,
                    Yc = Gb.__normalArray,
                    jd = Gb.colorsNeedUpdate,
                    kd = Gb.normalsNeedUpdate,
                    rd = Gb.__webglCustomAttributesList;
                    if (Gb.verticesNeedUpdate) {
                        for (Fc = 0; Fc < gd; Fc++) Sc = yd[Fc],
                        za = 3 * Fc,
                        Wc[za] = Sc.x,
                        Wc[za + 1] = Sc.y,
                        Wc[za + 2] = Sc.z;
                        j.bindBuffer(j.ARRAY_BUFFER, Gb.__webglVertexBuffer);
                        j.bufferData(j.ARRAY_BUFFER, Wc, Rc)
                    }
                    if (jd) {
                        for (Gc = 0; Gc < hd; Gc++) Tc = zd[Gc],
                        za = 3 * Gc,
                        Xc[za] = Tc.r,
                        Xc[za + 1] = Tc.g,
                        Xc[za + 2] = Tc.b;
                        j.bindBuffer(j.ARRAY_BUFFER, Gb.__webglColorBuffer);
                        j.bufferData(j.ARRAY_BUFFER, Xc, Rc)
                    }
                    if (kd) {
                        for (Hc = 0; Hc < id; Hc++) Uc = Ad[Hc],
                        za = 3 * Hc,
                        Yc[za] = Uc.x,
                        Yc[za + 1] = Uc.y,
                        Yc[za + 2] = Uc.z;
                        j.bindBuffer(j.ARRAY_BUFFER, Gb.__webglNormalBuffer);
                        j.bufferData(j.ARRAY_BUFFER, Yc, Rc)
                    }
                    if (rd) {
                        Vc = 0;
                        for (xd = rd.length; Vc < xd; Vc++) if (Da = rd[Vc], Da.needsUpdate && (void 0 === Da.boundTo || "vertices" === Da.boundTo)) {
                            za = 0;
                            zc = Da.value.length;
                            if (1 === Da.size) for (ib = 0; ib < zc; ib++) Da.array[ib] = Da.value[ib];
                            else if (2 === Da.size) for (ib = 0; ib < zc; ib++) rb = Da.value[ib],
                            Da.array[za] = rb.x,
                            Da.array[za + 1] = rb.y,
                            za += 2;
                            else if (3 === Da.size) if ("c" === Da.type) for (ib = 0; ib < zc; ib++) rb = Da.value[ib],
                            Da.array[za] = rb.r,
                            Da.array[za + 1] = rb.g,
                            Da.array[za + 2] = rb.b,
                            za += 3;
                            else for (ib = 0; ib < zc; ib++) rb = Da.value[ib],
                            Da.array[za] = rb.x,
                            Da.array[za + 1] = rb.y,
                            Da.array[za + 2] = rb.z,
                            za += 3;
                            else if (4 === Da.size) for (ib = 0; ib < zc; ib++) rb = Da.value[ib],
                            Da.array[za] = rb.x,
                            Da.array[za + 1] = rb.y,
                            Da.array[za + 2] = rb.z,
                            Da.array[za + 3] = rb.w,
                            za += 4;
                            j.bindBuffer(j.ARRAY_BUFFER, Da.buffer);
                            j.bufferData(j.ARRAY_BUFFER, Da.array, Rc)
                        }
                    }
                }
                O.verticesNeedUpdate = !1;
                O.colorsNeedUpdate = !1;
                O.normalsNeedUpdate = !1;
                ia.attributes && v(ia)
            } else if (ta instanceof THREE.Line) if (O instanceof THREE.BufferGeometry)(O.verticesNeedUpdate || O.colorsNeedUpdate) && i(O, j.DYNAMIC_DRAW, !O.dynamic),
            O.verticesNeedUpdate = !1,
            O.colorsNeedUpdate = !1;
            else {
                ia = e(ta, O);
                qa = ia.attributes && y(ia);
                if (O.verticesNeedUpdate || O.colorsNeedUpdate || O.lineDistancesNeedUpdate || qa) {
                    var Hb = O,
                    Zc = j.DYNAMIC_DRAW,
                    Ic = void 0,
                    Jc = void 0,
                    Kc = void 0,
                    $c = void 0,
                    Ja = void 0,
                    ad = void 0,
                    Bd = Hb.vertices,
                    Cd = Hb.colors,
                    Dd = Hb.lineDistances,
                    ld = Bd.length,
                    Jd = Cd.length,
                    Kd = Dd.length,
                    bd = Hb.__vertexArray,
                    cd = Hb.__colorArray,
                    Ed = Hb.__lineDistanceArray,
                    Ld = Hb.colorsNeedUpdate,
                    Md = Hb.lineDistancesNeedUpdate,
                    sd = Hb.__webglCustomAttributesList,
                    dd = void 0,
                    Fd = void 0,
                    jb = void 0,
                    Ac = void 0,
                    sb = void 0,
                    Ea = void 0;
                    if (Hb.verticesNeedUpdate) {
                        for (Ic = 0; Ic < ld; Ic++) $c = Bd[Ic],
                        Ja = 3 * Ic,
                        bd[Ja] = $c.x,
                        bd[Ja + 1] = $c.y,
                        bd[Ja + 2] = $c.z;
                        j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglVertexBuffer);
                        j.bufferData(j.ARRAY_BUFFER, bd, Zc)
                    }
                    if (Ld) {
                        for (Jc = 0; Jc < Jd; Jc++) ad = Cd[Jc],
                        Ja = 3 * Jc,
                        cd[Ja] = ad.r,
                        cd[Ja + 1] = ad.g,
                        cd[Ja + 2] = ad.b;
                        j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglColorBuffer);
                        j.bufferData(j.ARRAY_BUFFER, cd, Zc)
                    }
                    if (Md) {
                        for (Kc = 0; Kc < Kd; Kc++) Ed[Kc] = Dd[Kc];
                        j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglLineDistanceBuffer);
                        j.bufferData(j.ARRAY_BUFFER, Ed, Zc)
                    }
                    if (sd) {
                        dd = 0;
                        for (Fd = sd.length; dd < Fd; dd++) if (Ea = sd[dd], Ea.needsUpdate && (void 0 === Ea.boundTo || "vertices" === Ea.boundTo)) {
                            Ja = 0;
                            Ac = Ea.value.length;
                            if (1 === Ea.size) for (jb = 0; jb < Ac; jb++) Ea.array[jb] = Ea.value[jb];
                            else if (2 === Ea.size) for (jb = 0; jb < Ac; jb++) sb = Ea.value[jb],
                            Ea.array[Ja] = sb.x,
                            Ea.array[Ja + 1] = sb.y,
                            Ja += 2;
                            else if (3 === Ea.size) if ("c" === Ea.type) for (jb = 0; jb < Ac; jb++) sb = Ea.value[jb],
                            Ea.array[Ja] = sb.r,
                            Ea.array[Ja + 1] = sb.g,
                            Ea.array[Ja + 2] = sb.b,
                            Ja += 3;
                            else for (jb = 0; jb < Ac; jb++) sb = Ea.value[jb],
                            Ea.array[Ja] = sb.x,
                            Ea.array[Ja + 1] = sb.y,
                            Ea.array[Ja + 2] = sb.z,
                            Ja += 3;
                            else if (4 === Ea.size) for (jb = 0; jb < Ac; jb++) sb = Ea.value[jb],
                            Ea.array[Ja] = sb.x,
                            Ea.array[Ja + 1] = sb.y,
                            Ea.array[Ja + 2] = sb.z,
                            Ea.array[Ja + 3] = sb.w,
                            Ja += 4;
                            j.bindBuffer(j.ARRAY_BUFFER, Ea.buffer);
                            j.bufferData(j.ARRAY_BUFFER, Ea.array, Zc)
                        }
                    }
                }
                O.verticesNeedUpdate = !1;
                O.colorsNeedUpdate = !1;
                O.lineDistancesNeedUpdate = !1;
                ia.attributes && v(ia)
            } else if (ta instanceof THREE.ParticleSystem) if (O instanceof THREE.BufferGeometry)(O.verticesNeedUpdate || O.colorsNeedUpdate) && i(O, j.DYNAMIC_DRAW, !O.dynamic),
            O.verticesNeedUpdate = !1,
            O.colorsNeedUpdate = !1;
            else {
                ia = e(ta, O);
                qa = ia.attributes && y(ia);
                if (O.verticesNeedUpdate || O.colorsNeedUpdate || ta.sortParticles || qa) {
                    var bc = O,
                    td = j.DYNAMIC_DRAW,
                    Lc = ta,
                    tb = void 0,
                    cc = void 0,
                    dc = void 0,
                    ga = void 0,
                    ec = void 0,
                    rc = void 0,
                    ed = bc.vertices,
                    ud = ed.length,
                    vd = bc.colors,
                    Gd = vd.length,
                    wc = bc.__vertexArray,
                    xc = bc.__colorArray,
                    kc = bc.__sortArray,
                    Hd = bc.verticesNeedUpdate,
                    Id = bc.colorsNeedUpdate,
                    lc = bc.__webglCustomAttributesList,
                    Kb = void 0,
                    Bc = void 0,
                    ma = void 0,
                    Lb = void 0,
                    Ba = void 0,
                    ea = void 0;
                    if (Lc.sortParticles) {
                        vb.copy(gc);
                        vb.multiply(Lc.matrixWorld);
                        for (tb = 0; tb < ud; tb++) dc = ed[tb],
                        Qa.copy(dc),
                        Qa.applyProjection(vb),
                        kc[tb] = [Qa.z, tb];
                        kc.sort(n);
                        for (tb = 0; tb < ud; tb++) dc = ed[kc[tb][1]],
                        ga = 3 * tb,
                        wc[ga] = dc.x,
                        wc[ga + 1] = dc.y,
                        wc[ga + 2] = dc.z;
                        for (cc = 0; cc < Gd; cc++) ga = 3 * cc,
                        rc = vd[kc[cc][1]],
                        xc[ga] = rc.r,
                        xc[ga + 1] = rc.g,
                        xc[ga + 2] = rc.b;
                        if (lc) {
                            Kb = 0;
                            for (Bc = lc.length; Kb < Bc; Kb++) if (ea = lc[Kb], void 0 === ea.boundTo || "vertices" === ea.boundTo) if (ga = 0, Lb = ea.value.length, 1 === ea.size) for (ma = 0; ma < Lb; ma++) ec = kc[ma][1],
                            ea.array[ma] = ea.value[ec];
                            else if (2 === ea.size) for (ma = 0; ma < Lb; ma++) ec = kc[ma][1],
                            Ba = ea.value[ec],
                            ea.array[ga] = Ba.x,
                            ea.array[ga + 1] = Ba.y,
                            ga += 2;
                            else if (3 === ea.size) if ("c" === ea.type) for (ma = 0; ma < Lb; ma++) ec = kc[ma][1],
                            Ba = ea.value[ec],
                            ea.array[ga] = Ba.r,
                            ea.array[ga + 1] = Ba.g,
                            ea.array[ga + 2] = Ba.b,
                            ga += 3;
                            else for (ma = 0; ma < Lb; ma++) ec = kc[ma][1],
                            Ba = ea.value[ec],
                            ea.array[ga] = Ba.x,
                            ea.array[ga + 1] = Ba.y,
                            ea.array[ga + 2] = Ba.z,
                            ga += 3;
                            else if (4 === ea.size) for (ma = 0; ma < Lb; ma++) ec = kc[ma][1],
                            Ba = ea.value[ec],
                            ea.array[ga] = Ba.x,
                            ea.array[ga + 1] = Ba.y,
                            ea.array[ga + 2] = Ba.z,
                            ea.array[ga + 3] = Ba.w,
                            ga += 4
                        }
                    } else {
                        if (Hd) for (tb = 0; tb < ud; tb++) dc = ed[tb],
                        ga = 3 * tb,
                        wc[ga] = dc.x,
                        wc[ga + 1] = dc.y,
                        wc[ga + 2] = dc.z;
                        if (Id) for (cc = 0; cc < Gd; cc++) rc = vd[cc],
                        ga = 3 * cc,
                        xc[ga] = rc.r,
                        xc[ga + 1] = rc.g,
                        xc[ga + 2] = rc.b;
                        if (lc) {
                            Kb = 0;
                            for (Bc = lc.length; Kb < Bc; Kb++) if (ea = lc[Kb], ea.needsUpdate && (void 0 === ea.boundTo || "vertices" === ea.boundTo)) if (Lb = ea.value.length, ga = 0, 1 === ea.size) for (ma = 0; ma < Lb; ma++) ea.array[ma] = ea.value[ma];
                            else if (2 === ea.size) for (ma = 0; ma < Lb; ma++) Ba = ea.value[ma],
                            ea.array[ga] = Ba.x,
                            ea.array[ga + 1] = Ba.y,
                            ga += 2;
                            else if (3 === ea.size) if ("c" === ea.type) for (ma = 0; ma < Lb; ma++) Ba = ea.value[ma],
                            ea.array[ga] = Ba.r,
                            ea.array[ga + 1] = Ba.g,
                            ea.array[ga + 2] = Ba.b,
                            ga += 3;
                            else for (ma = 0; ma < Lb; ma++) Ba = ea.value[ma],
                            ea.array[ga] = Ba.x,
                            ea.array[ga + 1] = Ba.y,
                            ea.array[ga + 2] = Ba.z,
                            ga += 3;
                            else if (4 === ea.size) for (ma = 0; ma < Lb; ma++) Ba = ea.value[ma],
                            ea.array[ga] = Ba.x,
                            ea.array[ga + 1] = Ba.y,
                            ea.array[ga + 2] = Ba.z,
                            ea.array[ga + 3] = Ba.w,
                            ga += 4
                        }
                    }
                    if (Hd || Lc.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, bc.__webglVertexBuffer),
                    j.bufferData(j.ARRAY_BUFFER, wc, td);
                    if (Id || Lc.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, bc.__webglColorBuffer),
                    j.bufferData(j.ARRAY_BUFFER, xc, td);
                    if (lc) {
                        Kb = 0;
                        for (Bc = lc.length; Kb < Bc; Kb++) if (ea = lc[Kb], ea.needsUpdate || Lc.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, ea.buffer),
                        j.bufferData(j.ARRAY_BUFFER, ea.array, td)
                    }
                }
                O.verticesNeedUpdate = !1;
                O.colorsNeedUpdate = !1;
                ia.attributes && v(ia)
            }
        }
    };
    this.initMaterial = function(a, b, c, d) {
        var e, f, g, i;
        a.addEventListener("dispose", X);
        var h, k, m, n, l;
        a instanceof THREE.MeshDepthMaterial ? l = "depth": a instanceof THREE.MeshNormalMaterial ? l = "normal": a instanceof THREE.MeshBasicMaterial ? l = "basic": a instanceof THREE.MeshLambertMaterial ? l = "lambert": a instanceof THREE.MeshPhongMaterial ? l = "phong": a instanceof THREE.LineBasicMaterial ? l = "basic": a instanceof THREE.LineDashedMaterial ? l = "dashed": a instanceof THREE.ParticleBasicMaterial && (l = "particle_basic");
        if (l) {
            var p = THREE.ShaderLib[l];
            a.uniforms = THREE.UniformsUtils.clone(p.uniforms);
            a.vertexShader = p.vertexShader;
            a.fragmentShader = p.fragmentShader
        }
        var q, s, r;
        e = g = s = r = p = 0;
        for (f = b.length; e < f; e++) q = b[e],
        q.onlyShadow || (q instanceof THREE.DirectionalLight && g++, q instanceof THREE.PointLight && s++, q instanceof THREE.SpotLight && r++, q instanceof THREE.HemisphereLight && p++);
        e = g;
        f = s;
        g = r;
        i = p;
        p = q = 0;
        for (r = b.length; p < r; p++) s = b[p],
        s.castShadow && (s instanceof THREE.SpotLight && q++, s instanceof THREE.DirectionalLight && !s.shadowCascade && q++);
        n = q;
        tc && d && d.useVertexTexture ? m = 1024 : (b = j.getParameter(j.MAX_VERTEX_UNIFORM_VECTORS), b = Math.floor((b - 20) / 4), void 0 !== d && d instanceof THREE.SkinnedMesh && (b = Math.min(d.bones.length, b), b < d.bones.length && console.warn("WebGLRenderer: too many bones - " + d.bones.length + ", this GPU supports just " + b + " (try OpenGL instead of ANGLE)")), m = b);
        a: {
            s = a.fragmentShader;
            r = a.vertexShader;
            p = a.uniforms;
            b = a.attributes;
            q = a.defines;
            var c = {
                map: !!a.map,
                envMap: !!a.envMap,
                lightMap: !!a.lightMap,
                bumpMap: !!a.bumpMap,
                normalMap: !!a.normalMap,
                specularMap: !!a.specularMap,
                vertexColors: a.vertexColors,
                fog: c,
                useFog: a.fog,
                fogExp: c instanceof THREE.FogExp2,
                sizeAttenuation: a.sizeAttenuation,
                skinning: a.skinning,
                maxBones: m,
                useVertexTexture: tc && d && d.useVertexTexture,
                boneTextureWidth: d && d.boneTextureWidth,
                boneTextureHeight: d && d.boneTextureHeight,
                morphTargets: a.morphTargets,
                morphNormals: a.morphNormals,
                maxMorphTargets: this.maxMorphTargets,
                maxMorphNormals: this.maxMorphNormals,
                maxDirLights: e,
                maxPointLights: f,
                maxSpotLights: g,
                maxHemiLights: i,
                maxShadows: n,
                shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
                shadowMapType: this.shadowMapType,
                shadowMapDebug: this.shadowMapDebug,
                shadowMapCascade: this.shadowMapCascade,
                alphaTest: a.alphaTest,
                metal: a.metal,
                perPixel: a.perPixel,
                wrapAround: a.wrapAround,
                doubleSided: a.side === THREE.DoubleSide,
                flipSided: a.side === THREE.BackSide
            },
            t,
            v,
            y,
            d = [];
            l ? d.push(l) : (d.push(s), d.push(r));
            for (v in q) d.push(v),
            d.push(q[v]);
            for (t in c) d.push(t),
            d.push(c[t]);
            l = d.join();
            t = 0;
            for (v = Ma.length; t < v; t++) if (d = Ma[t], d.code === l) {
                d.usedTimes++;
                k = d.program;
                break a
            }
            t = "SHADOWMAP_TYPE_BASIC";
            c.shadowMapType === THREE.PCFShadowMap ? t = "SHADOWMAP_TYPE_PCF": c.shadowMapType === THREE.PCFSoftShadowMap && (t = "SHADOWMAP_TYPE_PCF_SOFT");
            v = [];
            for (y in q) d = q[y],
            !1 !== d && (d = "#define " + y + " " + d, v.push(d));
            d = v.join("\n");
            y = j.createProgram();
            v = ["precision " + fa + " float;", d, sc ? "#define VERTEX_TEXTURES": "", N.gammaInput ? "#define GAMMA_INPUT": "", N.gammaOutput ? "#define GAMMA_OUTPUT": "", N.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING": "", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, "#define MAX_BONES " + c.maxBones, c.map ? "#define USE_MAP": "", c.envMap ? "#define USE_ENVMAP": "", c.lightMap ? "#define USE_LIGHTMAP": "", c.bumpMap ? "#define USE_BUMPMAP": "", c.normalMap ? "#define USE_NORMALMAP": "", c.specularMap ? "#define USE_SPECULARMAP": "", c.vertexColors ? "#define USE_COLOR": "", c.skinning ? "#define USE_SKINNING": "", c.useVertexTexture ? "#define BONE_TEXTURE": "", c.boneTextureWidth ? "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1) : "", c.boneTextureHeight ? "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1) : "", c.morphTargets ? "#define USE_MORPHTARGETS": "", c.morphNormals ? "#define USE_MORPHNORMALS": "", c.perPixel ? "#define PHONG_PER_PIXEL": "", c.wrapAround ? "#define WRAP_AROUND": "", c.doubleSided ? "#define DOUBLE_SIDED": "", c.flipSided ? "#define FLIP_SIDED": "", c.shadowMapEnabled ? "#define USE_SHADOWMAP": "", c.shadowMapEnabled ? "#define " + t: "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG": "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE": "", c.sizeAttenuation ? "#define USE_SIZEATTENUATION": "", "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
            t = ["precision " + fa + " float;", c.bumpMap || c.normalMap ? "#extension GL_OES_standard_derivatives : enable": "", d, "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ? "#define ALPHATEST " + c.alphaTest: "", N.gammaInput ? "#define GAMMA_INPUT": "", N.gammaOutput ? "#define GAMMA_OUTPUT": "", N.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING": "", c.useFog && c.fog ? "#define USE_FOG": "", c.useFog && c.fogExp ? "#define FOG_EXP2": "", c.map ? "#define USE_MAP": "", c.envMap ? "#define USE_ENVMAP": "", c.lightMap ? "#define USE_LIGHTMAP": "", c.bumpMap ? "#define USE_BUMPMAP": "", c.normalMap ? "#define USE_NORMALMAP": "", c.specularMap ? "#define USE_SPECULARMAP": "", c.vertexColors ? "#define USE_COLOR": "", c.metal ? "#define METAL": "", c.perPixel ? "#define PHONG_PER_PIXEL": "", c.wrapAround ? "#define WRAP_AROUND": "", c.doubleSided ? "#define DOUBLE_SIDED": "", c.flipSided ? "#define FLIP_SIDED": "", c.shadowMapEnabled ? "#define USE_SHADOWMAP": "", c.shadowMapEnabled ? "#define " + t: "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG": "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE": "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");
            t = B("fragment", t + s);
            v = B("vertex", v + r);
            j.attachShader(y, v);
            j.attachShader(y, t);
            j.linkProgram(y);
            j.getProgramParameter(y, j.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + j.getProgramParameter(y, j.VALIDATE_STATUS) + ", gl error [" + j.getError() + "]");
            j.deleteShader(t);
            j.deleteShader(v);
            y.uniforms = {};
            y.attributes = {};
            var x;
            t = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(" ");
            c.useVertexTexture ? t.push("boneTexture") : t.push("boneGlobalMatrices");
            for (x in p) t.push(x);
            x = t;
            t = 0;
            for (v = x.length; t < v; t++) p = x[t],
            y.uniforms[p] = j.getUniformLocation(y, p);
            t = "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" ");
            for (x = 0; x < c.maxMorphTargets; x++) t.push("morphTarget" + x);
            for (x = 0; x < c.maxMorphNormals; x++) t.push("morphNormal" + x);
            for (k in b) t.push(k);
            k = t;
            x = 0;
            for (b = k.length; x < b; x++) t = k[x],
            y.attributes[t] = j.getAttribLocation(y, t);
            y.id = Na++;
            Ma.push({
                program: y,
                code: l,
                usedTimes: 1
            });
            N.info.memory.programs = Ma.length;
            k = y
        }
        a.program = k;
        x = a.program.attributes;
        if (a.morphTargets) {
            a.numSupportedMorphTargets = 0;
            b = "morphTarget";
            for (k = 0; k < this.maxMorphTargets; k++) y = b + k,
            0 <= x[y] && a.numSupportedMorphTargets++
        }
        if (a.morphNormals) {
            a.numSupportedMorphNormals = 0;
            b = "morphNormal";
            for (k = 0; k < this.maxMorphNormals; k++) y = b + k,
            0 <= x[y] && a.numSupportedMorphNormals++
        }
        a.uniformsList = [];
        for (h in a.uniforms) a.uniformsList.push([a.uniforms[h], h])
    };
    this.setFaceCulling = function(a, b) {
        a === THREE.CullFaceNone ? j.disable(j.CULL_FACE) : (b === THREE.FrontFaceDirectionCW ? j.frontFace(j.CW) : j.frontFace(j.CCW), a === THREE.CullFaceBack ? j.cullFace(j.BACK) : a === THREE.CullFaceFront ? j.cullFace(j.FRONT) : j.cullFace(j.FRONT_AND_BACK), j.enable(j.CULL_FACE))
    };
    this.setMaterialFaces = function(a) {
        var b = a.side === THREE.DoubleSide,
        a = a.side === THREE.BackSide;
        da !== b && (b ? j.disable(j.CULL_FACE) : j.enable(j.CULL_FACE), da = b);
        la !== a && (a ? j.frontFace(j.CW) : j.frontFace(j.CCW), la = a)
    };
    this.setDepthTest = function(a) {
        ia !== a && (a ? j.enable(j.DEPTH_TEST) : j.disable(j.DEPTH_TEST), ia = a)
    };
    this.setDepthWrite = function(a) {
        Wa !== a && (j.depthMask(a), Wa = a)
    };
    this.setBlending = function(a, b, c, d) {
        a !== Z && (a === THREE.NoBlending ? j.disable(j.BLEND) : a === THREE.AdditiveBlending ? (j.enable(j.BLEND), j.blendEquation(j.FUNC_ADD), j.blendFunc(j.SRC_ALPHA, j.ONE)) : a === THREE.SubtractiveBlending ? (j.enable(j.BLEND), j.blendEquation(j.FUNC_ADD), j.blendFunc(j.ZERO, j.ONE_MINUS_SRC_COLOR)) : a === THREE.MultiplyBlending ? (j.enable(j.BLEND), j.blendEquation(j.FUNC_ADD), j.blendFunc(j.ZERO, j.SRC_COLOR)) : a === THREE.CustomBlending ? j.enable(j.BLEND) : (j.enable(j.BLEND), j.blendEquationSeparate(j.FUNC_ADD, j.FUNC_ADD), j.blendFuncSeparate(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA, j.ONE, j.ONE_MINUS_SRC_ALPHA)), Z = a);
        if (a === THREE.CustomBlending) {
            if (b !== oa && (j.blendEquation(L(b)), oa = b), c !== gb || d !== nb) j.blendFunc(L(c), L(d)),
            gb = c,
            nb = d
        } else nb = gb = oa = null
    };
    this.setTexture = function(a, b) {
        if (a.needsUpdate) {
            a.__webglInit || (a.__webglInit = !0, a.addEventListener("dispose", Oc), a.__webglTexture = j.createTexture(), N.info.memory.textures++);
            j.activeTexture(j.TEXTURE0 + b);
            j.bindTexture(j.TEXTURE_2D, a.__webglTexture);
            j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, a.flipY);
            j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
            j.pixelStorei(j.UNPACK_ALIGNMENT, a.unpackAlignment);
            var c = a.image,
            d = 0 === (c.width & c.width - 1) && 0 === (c.height & c.height - 1),
            e = L(a.format),
            f = L(a.type);
            W(j.TEXTURE_2D, a, d);
            var g = a.mipmaps;
            if (a instanceof THREE.DataTexture) if (0 < g.length && d) {
                for (var i = 0,
                h = g.length; i < h; i++) c = g[i],
                j.texImage2D(j.TEXTURE_2D, i, e, c.width, c.height, 0, e, f, c.data);
                a.generateMipmaps = !1
            } else j.texImage2D(j.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data);
            else if (a instanceof THREE.CompressedTexture) {
                i = 0;
                for (h = g.length; i < h; i++) c = g[i],
                j.compressedTexImage2D(j.TEXTURE_2D, i, e, c.width, c.height, 0, c.data)
            } else if (0 < g.length && d) {
                i = 0;
                for (h = g.length; i < h; i++) c = g[i],
                j.texImage2D(j.TEXTURE_2D, i, e, e, f, c);
                a.generateMipmaps = !1
            } else j.texImage2D(j.TEXTURE_2D, 0, e, e, f, a.image);
            a.generateMipmaps && d && j.generateMipmap(j.TEXTURE_2D);
            a.needsUpdate = !1;
            if (a.onUpdate) a.onUpdate()
        } else j.activeTexture(j.TEXTURE0 + b),
        j.bindTexture(j.TEXTURE_2D, a.__webglTexture)
    };
    this.setRenderTarget = function(a) {
        var b = a instanceof THREE.WebGLRenderTargetCube;
        if (a && !a.__webglFramebuffer) {
            void 0 === a.depthBuffer && (a.depthBuffer = !0);
            void 0 === a.stencilBuffer && (a.stencilBuffer = !0);
            a.addEventListener("dispose", P);
            a.__webglTexture = j.createTexture();
            N.info.memory.textures++;
            var c = 0 === (a.width & a.width - 1) && 0 === (a.height & a.height - 1),
            d = L(a.format),
            e = L(a.type);
            if (b) {
                a.__webglFramebuffer = [];
                a.__webglRenderbuffer = [];
                j.bindTexture(j.TEXTURE_CUBE_MAP, a.__webglTexture);
                W(j.TEXTURE_CUBE_MAP, a, c);
                for (var f = 0; 6 > f; f++) {
                    a.__webglFramebuffer[f] = j.createFramebuffer();
                    a.__webglRenderbuffer[f] = j.createRenderbuffer();
                    j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null);
                    var g = a,
                    i = j.TEXTURE_CUBE_MAP_POSITIVE_X + f;
                    j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer[f]);
                    j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, i, g.__webglTexture, 0);
                    F(a.__webglRenderbuffer[f], a)
                }
                c && j.generateMipmap(j.TEXTURE_CUBE_MAP)
            } else a.__webglFramebuffer = j.createFramebuffer(),
            a.__webglRenderbuffer = a.shareDepthFrom ? a.shareDepthFrom.__webglRenderbuffer: j.createRenderbuffer(),
            j.bindTexture(j.TEXTURE_2D, a.__webglTexture),
            W(j.TEXTURE_2D, a, c),
            j.texImage2D(j.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null),
            d = j.TEXTURE_2D,
            j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer),
            j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, d, a.__webglTexture, 0),
            a.shareDepthFrom ? a.depthBuffer && !a.stencilBuffer ? j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_ATTACHMENT, j.RENDERBUFFER, a.__webglRenderbuffer) : a.depthBuffer && a.stencilBuffer && j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_STENCIL_ATTACHMENT, j.RENDERBUFFER, a.__webglRenderbuffer) : F(a.__webglRenderbuffer, a),
            c && j.generateMipmap(j.TEXTURE_2D);
            b ? j.bindTexture(j.TEXTURE_CUBE_MAP, null) : j.bindTexture(j.TEXTURE_2D, null);
            j.bindRenderbuffer(j.RENDERBUFFER, null);
            j.bindFramebuffer(j.FRAMEBUFFER, null)
        }
        a ? (b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer, c = a.width, a = a.height, e = d = 0) : (b = null, c = fc, a = Ab, d = Ib, e = Jb);
        b !== Pa && (j.bindFramebuffer(j.FRAMEBUFFER, b), j.viewport(d, e, c, a), Pa = b);
        mc = c;
        pb = a
    };
    this.shadowMapPlugin = new THREE.ShadowMapPlugin;
    this.addPrePlugin(this.shadowMapPlugin);
    this.addPostPlugin(new THREE.SpritePlugin);
    this.addPostPlugin(new THREE.LensFlarePlugin)
};
THREE.WebGLRenderTarget = function(a, b, c) {
    THREE.EventDispatcher.call(this);
    this.width = a;
    this.height = b;
    c = c || {};
    this.wrapS = void 0 !== c.wrapS ? c.wrapS: THREE.ClampToEdgeWrapping;
    this.wrapT = void 0 !== c.wrapT ? c.wrapT: THREE.ClampToEdgeWrapping;
    this.magFilter = void 0 !== c.magFilter ? c.magFilter: THREE.LinearFilter;
    this.minFilter = void 0 !== c.minFilter ? c.minFilter: THREE.LinearMipMapLinearFilter;
    this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy: 1;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.format = void 0 !== c.format ? c.format: THREE.RGBAFormat;
    this.type = void 0 !== c.type ? c.type: THREE.UnsignedByteType;
    this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer: !0;
    this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer: !0;
    this.generateMipmaps = !0;
    this.shareDepthFrom = null
};
THREE.WebGLRenderTarget.prototype.clone = function() {
    var a = new THREE.WebGLRenderTarget(this.width, this.height);
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.anisotropy = this.anisotropy;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.format = this.format;
    a.type = this.type;
    a.depthBuffer = this.depthBuffer;
    a.stencilBuffer = this.stencilBuffer;
    a.generateMipmaps = this.generateMipmaps;
    a.shareDepthFrom = this.shareDepthFrom;
    return a
};
THREE.WebGLRenderTarget.prototype.dispose = function() {
    this.dispatchEvent({
        type: "dispose"
    })
};
THREE.WebGLRenderTargetCube = function(a, b, c) {
    THREE.WebGLRenderTarget.call(this, a, b, c);
    this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);
THREE.RenderableVertex = function() {
    this.positionWorld = new THREE.Vector3;
    this.positionScreen = new THREE.Vector4;
    this.visible = !0
};
THREE.RenderableVertex.prototype.copy = function(a) {
    this.positionWorld.copy(a.positionWorld);
    this.positionScreen.copy(a.positionScreen)
};
THREE.RenderableFace3 = function() {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.centroidModel = new THREE.Vector3;
    this.normalModel = new THREE.Vector3;
    this.normalModelView = new THREE.Vector3;
    this.vertexNormalsLength = 0;
    this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.material = this.color = null;
    this.uvs = [[]];
    this.z = null
};
THREE.RenderableFace4 = function() {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.v4 = new THREE.RenderableVertex;
    this.centroidModel = new THREE.Vector3;
    this.normalModel = new THREE.Vector3;
    this.normalModelView = new THREE.Vector3;
    this.vertexNormalsLength = 0;
    this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.material = this.color = null;
    this.uvs = [[]];
    this.z = null
};
THREE.RenderableObject = function() {
    this.z = this.object = null
};
THREE.RenderableParticle = function() {
    this.rotation = this.z = this.y = this.x = this.object = null;
    this.scale = new THREE.Vector2;
    this.material = null
};
THREE.RenderableLine = function() {
    this.z = null;
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.material = null
};
THREE.GeometryUtils = {
    merge: function(a, b) {
        var c, d, e = a.vertices.length,
        f = b instanceof THREE.Mesh ? b.geometry: b,
        g = a.vertices,
        h = f.vertices,
        i = a.faces,
        k = f.faces,
        l = a.faceVertexUvs[0],
        f = f.faceVertexUvs[0];
        b instanceof THREE.Mesh && (b.matrixAutoUpdate && b.updateMatrix(), c = b.matrix, d = new THREE.Matrix3, d.getInverse(c), d.transpose());
        for (var m = 0,
        n = h.length; m < n; m++) {
            var s = h[m].clone();
            c && s.applyMatrix4(c);
            g.push(s)
        }
        m = 0;
        for (n = k.length; m < n; m++) {
            var s = k[m],
            r,
            p,
            q = s.vertexNormals,
            y = s.vertexColors;
            s instanceof THREE.Face3 ? r = new THREE.Face3(s.a + e, s.b + e, s.c + e) : s instanceof THREE.Face4 && (r = new THREE.Face4(s.a + e, s.b + e, s.c + e, s.d + e));
            r.normal.copy(s.normal);
            d && r.normal.applyMatrix3(d).normalize();
            g = 0;
            for (h = q.length; g < h; g++) p = q[g].clone(),
            d && p.applyMatrix3(d).normalize(),
            r.vertexNormals.push(p);
            r.color.copy(s.color);
            g = 0;
            for (h = y.length; g < h; g++) p = y[g],
            r.vertexColors.push(p.clone());
            r.materialIndex = s.materialIndex;
            r.centroid.copy(s.centroid);
            c && r.centroid.applyMatrix4(c);
            i.push(r)
        }
        m = 0;
        for (n = f.length; m < n; m++) {
            c = f[m];
            d = [];
            g = 0;
            for (h = c.length; g < h; g++) d.push(new THREE.Vector2(c[g].x, c[g].y));
            l.push(d)
        }
    },
    removeMaterials: function(a, b) {
        for (var c = {},
        d = 0,
        e = b.length; d < e; d++) c[b[d]] = !0;
        for (var f, g = [], d = 0, e = a.faces.length; d < e; d++) f = a.faces[d],
        f.materialIndex in c || g.push(f);
        a.faces = g
    },
    randomPointInTriangle: function(a, b, c) {
        var d, e, f, g = new THREE.Vector3,
        h = THREE.GeometryUtils.__v1;
        d = THREE.GeometryUtils.random();
        e = THREE.GeometryUtils.random();
        1 < d + e && (d = 1 - d, e = 1 - e);
        f = 1 - d - e;
        g.copy(a);
        g.multiplyScalar(d);
        h.copy(b);
        h.multiplyScalar(e);
        g.add(h);
        h.copy(c);
        h.multiplyScalar(f);
        g.add(h);
        return g
    },
    randomPointInFace: function(a, b, c) {
        var d, e, f;
        if (a instanceof THREE.Face3) return d = b.vertices[a.a],
        e = b.vertices[a.b],
        f = b.vertices[a.c],
        THREE.GeometryUtils.randomPointInTriangle(d, e, f);
        if (a instanceof THREE.Face4) {
            d = b.vertices[a.a];
            e = b.vertices[a.b];
            f = b.vertices[a.c];
            var b = b.vertices[a.d],
            g;
            c ? a._area1 && a._area2 ? (c = a._area1, g = a._area2) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b), a._area1 = c, a._area2 = g) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b));
            return THREE.GeometryUtils.random() * (c + g) < c ? THREE.GeometryUtils.randomPointInTriangle(d, e, b) : THREE.GeometryUtils.randomPointInTriangle(e, f, b)
        }
    },
    randomPointsInGeometry: function(a, b) {
        function c(a) {
            function b(c, d) {
                if (d < c) return c;
                var e = c + Math.floor((d - c) / 2);
                return k[e] > a ? b(c, e - 1) : k[e] < a ? b(e + 1, d) : e
            }
            return b(0, k.length - 1)
        }
        var d, e, f = a.faces,
        g = a.vertices,
        h = f.length,
        i = 0,
        k = [],
        l,
        m,
        n,
        s;
        for (e = 0; e < h; e++) d = f[e],
        d instanceof THREE.Face3 ? (l = g[d.a], m = g[d.b], n = g[d.c], d._area = THREE.GeometryUtils.triangleArea(l, m, n)) : d instanceof THREE.Face4 && (l = g[d.a], m = g[d.b], n = g[d.c], s = g[d.d], d._area1 = THREE.GeometryUtils.triangleArea(l, m, s), d._area2 = THREE.GeometryUtils.triangleArea(m, n, s), d._area = d._area1 + d._area2),
        i += d._area,
        k[e] = i;
        d = [];
        for (e = 0; e < b; e++) g = THREE.GeometryUtils.random() * i,
        g = c(g),
        d[e] = THREE.GeometryUtils.randomPointInFace(f[g], a, !0);
        return d
    },
    triangleArea: function(a, b, c) {
        var d = THREE.GeometryUtils.__v1,
        e = THREE.GeometryUtils.__v2;
        d.subVectors(b, a);
        e.subVectors(c, a);
        d.cross(e);
        return 0.5 * d.length()
    },
    center: function(a) {
        a.computeBoundingBox();
        var b = a.boundingBox,
        c = new THREE.Vector3;
        c.addVectors(b.min, b.max);
        c.multiplyScalar( - 0.5);
        a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x, c.y, c.z));
        a.computeBoundingBox();
        return c
    },
    normalizeUVs: function(a) {
        for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++) for (var d = a[b], e = 0, f = d.length; e < f; e++) 1 !== d[e].x && (d[e].x -= Math.floor(d[e].x)),
        1 !== d[e].y && (d[e].y -= Math.floor(d[e].y))
    },
    triangulateQuads: function(a) {
        var b, c, d, e, f = [],
        g = [],
        h = [];
        b = 0;
        for (c = a.faceUvs.length; b < c; b++) g[b] = [];
        b = 0;
        for (c = a.faceVertexUvs.length; b < c; b++) h[b] = [];
        b = 0;
        for (c = a.faces.length; b < c; b++) if (d = a.faces[b], d instanceof THREE.Face4) {
            e = d.a;
            var i = d.b,
            k = d.c,
            l = d.d,
            m = new THREE.Face3,
            n = new THREE.Face3;
            m.color.copy(d.color);
            n.color.copy(d.color);
            m.materialIndex = d.materialIndex;
            n.materialIndex = d.materialIndex;
            m.a = e;
            m.b = i;
            m.c = l;
            n.a = i;
            n.b = k;
            n.c = l;
            4 === d.vertexColors.length && (m.vertexColors[0] = d.vertexColors[0].clone(), m.vertexColors[1] = d.vertexColors[1].clone(), m.vertexColors[2] = d.vertexColors[3].clone(), n.vertexColors[0] = d.vertexColors[1].clone(), n.vertexColors[1] = d.vertexColors[2].clone(), n.vertexColors[2] = d.vertexColors[3].clone());
            f.push(m, n);
            d = 0;
            for (e = a.faceVertexUvs.length; d < e; d++) a.faceVertexUvs[d].length && (m = a.faceVertexUvs[d][b], i = m[1], k = m[2], l = m[3], m = [m[0].clone(), i.clone(), l.clone()], i = [i.clone(), k.clone(), l.clone()], h[d].push(m, i));
            d = 0;
            for (e = a.faceUvs.length; d < e; d++) a.faceUvs[d].length && (i = a.faceUvs[d][b], g[d].push(i, i))
        } else {
            f.push(d);
            d = 0;
            for (e = a.faceUvs.length; d < e; d++) g[d].push(a.faceUvs[d][b]);
            d = 0;
            for (e = a.faceVertexUvs.length; d < e; d++) h[d].push(a.faceVertexUvs[d][b])
        }
        a.faces = f;
        a.faceUvs = g;
        a.faceVertexUvs = h;
        a.computeCentroids();
        a.computeFaceNormals();
        a.computeVertexNormals();
        a.hasTangents && a.computeTangents()
    },
    setMaterialIndex: function(a, b, c, d) {
        a = a.faces;
        d = d || a.length - 1;
        for (c = c || 0; c <= d; c++) a[c].materialIndex = b
    }
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3;
THREE.GeometryUtils.__v2 = new THREE.Vector3;
THREE.ImageUtils = {
    crossOrigin: "anonymous",
    loadTexture: function(a, b, c, d) {
        var e = new Image,
        f = new THREE.Texture(e, b),
        b = new THREE.ImageLoader;
        b.addEventListener("load",
        function(a) {
            f.image = a.content;
            f.needsUpdate = !0;
            c && c(f)
        });
        b.addEventListener("error",
        function(a) {
            d && d(a.message)
        });
        b.crossOrigin = this.crossOrigin;
        b.load(a, e);
        f.sourceFile = a;
        return f
    },
    loadCompressedTexture: function(a, b, c, d) {
        var e = new THREE.CompressedTexture;
        e.mapping = b;
        var f = new XMLHttpRequest;
        f.onload = function() {
            var a = THREE.ImageUtils.parseDDS(f.response, !0);
            e.format = a.format;
            e.mipmaps = a.mipmaps;
            e.image.width = a.width;
            e.image.height = a.height;
            e.generateMipmaps = !1;
            e.needsUpdate = !0;
            c && c(e)
        };
        f.onerror = d;
        f.open("GET", a, !0);
        f.responseType = "arraybuffer";
        f.send(null);
        return e
    },
    loadTextureCube: function(a, b, c, d) {
        var e = [];
        e.loadCount = 0;
        var f = new THREE.Texture;
        f.image = e;
        void 0 !== b && (f.mapping = b);
        f.flipY = !1;
        for (var b = 0,
        g = a.length; b < g; ++b) {
            var h = new Image;
            e[b] = h;
            h.onload = function() {
                e.loadCount += 1;
                6 === e.loadCount && (f.needsUpdate = !0, c && c(f))
            };
            h.onerror = d;
            h.crossOrigin = this.crossOrigin;
            h.src = a[b]
        }
        return f
    },
    loadCompressedTextureCube: function(a, b, c, d) {
        var e = [];
        e.loadCount = 0;
        var f = new THREE.CompressedTexture;
        f.image = e;
        void 0 !== b && (f.mapping = b);
        f.flipY = !1;
        f.generateMipmaps = !1;
        b = function(a, b) {
            return function() {
                var d = THREE.ImageUtils.parseDDS(a.response, !0);
                b.format = d.format;
                b.mipmaps = d.mipmaps;
                b.width = d.width;
                b.height = d.height;
                e.loadCount += 1;
                6 === e.loadCount && (f.format = d.format, f.needsUpdate = !0, c && c(f))
            }
        };
        if (a instanceof Array) for (var g = 0,
        h = a.length; g < h; ++g) {
            var i = {};
            e[g] = i;
            var k = new XMLHttpRequest;
            k.onload = b(k, i);
            k.onerror = d;
            i = a[g];
            k.open("GET", i, !0);
            k.responseType = "arraybuffer";
            k.send(null)
        } else k = new XMLHttpRequest,
        k.onload = function() {
            var a = THREE.ImageUtils.parseDDS(k.response, !0);
            if (a.isCubemap) {
                for (var b = a.mipmaps.length / a.mipmapCount,
                d = 0; d < b; d++) {
                    e[d] = {
                        mipmaps: []
                    };
                    for (var g = 0; g < a.mipmapCount; g++) e[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + g]),
                    e[d].format = a.format,
                    e[d].width = a.width,
                    e[d].height = a.height
                }
                f.format = a.format;
                f.needsUpdate = !0;
                c && c(f)
            }
        },
        k.onerror = d,
        k.open("GET", a, !0),
        k.responseType = "arraybuffer",
        k.send(null);
        return f
    },
    parseDDS: function(a, b) {
        function c(a) {
            return a.charCodeAt(0) + (a.charCodeAt(1) << 8) + (a.charCodeAt(2) << 16) + (a.charCodeAt(3) << 24)
        }
        var d = {
            mipmaps: [],
            width: 0,
            height: 0,
            format: null,
            mipmapCount: 1
        },
        e = c("DXT1"),
        f = c("DXT3"),
        g = c("DXT5"),
        h = new Int32Array(a, 0, 31);
        if (542327876 !== h[0]) return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"),
        d;
        if (!h[20] & 4) return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"),
        d;
        var i = h[21];
        switch (i) {
        case e:
            e = 8;
            d.format = THREE.RGB_S3TC_DXT1_Format;
            break;
        case f:
            e = 16;
            d.format = THREE.RGBA_S3TC_DXT3_Format;
            break;
        case g:
            e = 16;
            d.format = THREE.RGBA_S3TC_DXT5_Format;
            break;
        default:
            return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ", String.fromCharCode(i & 255, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255)),
            d
        }
        d.mipmapCount = 1;
        h[2] & 131072 && !1 !== b && (d.mipmapCount = Math.max(1, h[7]));
        d.isCubemap = h[28] & 512 ? !0 : !1;
        d.width = h[4];
        d.height = h[3];
        for (var h = h[1] + 4, f = d.width, g = d.height, i = d.isCubemap ? 6 : 1, k = 0; k < i; k++) {
            for (var l = 0; l < d.mipmapCount; l++) {
                var m = Math.max(4, f) / 4 * Math.max(4, g) / 4 * e,
                n = {
                    data: new Uint8Array(a, h, m),
                    width: f,
                    height: g
                };
                d.mipmaps.push(n);
                h += m;
                f = Math.max(0.5 * f, 1);
                g = Math.max(0.5 * g, 1)
            }
            f = d.width;
            g = d.height
        }
        return d
    },
    getNormalMap: function(a, b) {
        var c = function(a) {
            var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
            return [a[0] / b, a[1] / b, a[2] / b]
        },
        b = b | 1,
        d = a.width,
        e = a.height,
        f = document.createElement("canvas");
        f.width = d;
        f.height = e;
        var g = f.getContext("2d");
        g.drawImage(a, 0, 0);
        for (var h = g.getImageData(0, 0, d, e).data, i = g.createImageData(d, e), k = i.data, l = 0; l < d; l++) for (var m = 0; m < e; m++) {
            var n = 0 > m - 1 ? 0 : m - 1,
            s = m + 1 > e - 1 ? e - 1 : m + 1,
            r = 0 > l - 1 ? 0 : l - 1,
            p = l + 1 > d - 1 ? d - 1 : l + 1,
            q = [],
            y = [0, 0, h[4 * (m * d + l)] / 255 * b];
            q.push([ - 1, 0, h[4 * (m * d + r)] / 255 * b]);
            q.push([ - 1, -1, h[4 * (n * d + r)] / 255 * b]);
            q.push([0, -1, h[4 * (n * d + l)] / 255 * b]);
            q.push([1, -1, h[4 * (n * d + p)] / 255 * b]);
            q.push([1, 0, h[4 * (m * d + p)] / 255 * b]);
            q.push([1, 1, h[4 * (s * d + p)] / 255 * b]);
            q.push([0, 1, h[4 * (s * d + l)] / 255 * b]);
            q.push([ - 1, 1, h[4 * (s * d + r)] / 255 * b]);
            n = [];
            r = q.length;
            for (s = 0; s < r; s++) {
                var p = q[s],
                v = q[(s + 1) % r],
                p = [p[0] - y[0], p[1] - y[1], p[2] - y[2]],
                v = [v[0] - y[0], v[1] - y[1], v[2] - y[2]];
                n.push(c([p[1] * v[2] - p[2] * v[1], p[2] * v[0] - p[0] * v[2], p[0] * v[1] - p[1] * v[0]]))
            }
            q = [0, 0, 0];
            for (s = 0; s < n.length; s++) q[0] += n[s][0],
            q[1] += n[s][1],
            q[2] += n[s][2];
            q[0] /= n.length;
            q[1] /= n.length;
            q[2] /= n.length;
            y = 4 * (m * d + l);
            k[y] = 255 * ((q[0] + 1) / 2) | 0;
            k[y + 1] = 255 * ((q[1] + 1) / 2) | 0;
            k[y + 2] = 255 * q[2] | 0;
            k[y + 3] = 255
        }
        g.putImageData(i, 0, 0);
        return f
    },
    generateDataTexture: function(a, b, c) {
        for (var d = a * b,
        e = new Uint8Array(3 * d), f = Math.floor(255 * c.r), g = Math.floor(255 * c.g), c = Math.floor(255 * c.b), h = 0; h < d; h++) e[3 * h] = f,
        e[3 * h + 1] = g,
        e[3 * h + 2] = c;
        a = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
        a.needsUpdate = !0;
        return a
    }
};
THREE.SceneUtils = {
    createMultiMaterialObject: function(a, b) {
        for (var c = new THREE.Object3D,
        d = 0,
        e = b.length; d < e; d++) c.add(new THREE.Mesh(a, b[d]));
        return c
    },
    detach: function(a, b, c) {
        a.applyMatrix(b.matrixWorld);
        b.remove(a);
        c.add(a)
    },
    attach: function(a, b, c) {
        var d = new THREE.Matrix4;
        d.getInverse(c.matrixWorld);
        a.applyMatrix(d);
        b.remove(a);
        c.add(a)
    }
};
THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function() {
        return this.faces[this.face][this.weight][this.style]
    },
    loadFace: function(a) {
        var b = a.familyName.toLowerCase();
        this.faces[b] = this.faces[b] || {};
        this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {};
        this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
        return this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
    },
    drawText: function(a) {
        for (var b = this.getFace(), c = this.size / b.resolution, d = 0, e = String(a).split(""), f = e.length, g = [], a = 0; a < f; a++) {
            var h = new THREE.Path,
            h = this.extractGlyphPoints(e[a], b, c, d, h),
            d = d + h.offset;
            g.push(h.path)
        }
        return {
            paths: g,
            offset: d / 2
        }
    },
    extractGlyphPoints: function(a, b, c, d, e) {
        var f = [],
        g,
        h,
        i,
        k,
        l,
        m,
        n,
        s,
        r,
        p,
        q,
        y = b.glyphs[a] || b.glyphs["?"];
        if (y) {
            if (y.o) {
                b = y._cachedOutline || (y._cachedOutline = y.o.split(" "));
                k = b.length;
                for (a = 0; a < k;) switch (i = b[a++], i) {
                case "m":
                    i = b[a++] * c + d;
                    l = b[a++] * c;
                    e.moveTo(i, l);
                    break;
                case "l":
                    i = b[a++] * c + d;
                    l = b[a++] * c;
                    e.lineTo(i, l);
                    break;
                case "q":
                    i = b[a++] * c + d;
                    l = b[a++] * c;
                    s = b[a++] * c + d;
                    r = b[a++] * c;
                    e.quadraticCurveTo(s, r, i, l);
                    if (g = f[f.length - 1]) {
                        m = g.x;
                        n = g.y;
                        g = 1;
                        for (h = this.divisions; g <= h; g++) {
                            var v = g / h;
                            THREE.Shape.Utils.b2(v, m, s, i);
                            THREE.Shape.Utils.b2(v, n, r, l)
                        }
                    }
                    break;
                case "b":
                    if (i = b[a++] * c + d, l = b[a++] * c, s = b[a++] * c + d, r = b[a++] * -c, p = b[a++] * c + d, q = b[a++] * -c, e.bezierCurveTo(i, l, s, r, p, q), g = f[f.length - 1]) {
                        m = g.x;
                        n = g.y;
                        g = 1;
                        for (h = this.divisions; g <= h; g++) v = g / h,
                        THREE.Shape.Utils.b3(v, m, s, p, i),
                        THREE.Shape.Utils.b3(v, n, r, q, l)
                    }
                }
            }
            return {
                offset: y.ha * c,
                path: e
            }
        }
    }
};
THREE.FontUtils.generateShapes = function(a, b) {
    var b = b || {},
    c = void 0 !== b.curveSegments ? b.curveSegments: 4,
    d = void 0 !== b.font ? b.font: "helvetiker",
    e = void 0 !== b.weight ? b.weight: "normal",
    f = void 0 !== b.style ? b.style: "normal";
    THREE.FontUtils.size = void 0 !== b.size ? b.size: 100;
    THREE.FontUtils.divisions = c;
    THREE.FontUtils.face = d;
    THREE.FontUtils.weight = e;
    THREE.FontUtils.style = f;
    c = THREE.FontUtils.drawText(a).paths;
    d = [];
    e = 0;
    for (f = c.length; e < f; e++) Array.prototype.push.apply(d, c[e].toShapes());
    return d
}; (function(a) {
    var b = function(a) {
        for (var b = a.length,
        e = 0,
        f = b - 1,
        g = 0; g < b; f = g++) e += a[f].x * a[g].y - a[g].x * a[f].y;
        return 0.5 * e
    };
    a.Triangulate = function(a, d) {
        var e = a.length;
        if (3 > e) return null;
        var f = [],
        g = [],
        h = [],
        i,
        k,
        l;
        if (0 < b(a)) for (k = 0; k < e; k++) g[k] = k;
        else for (k = 0; k < e; k++) g[k] = e - 1 - k;
        var m = 2 * e;
        for (k = e - 1; 2 < e;) {
            if (0 >= m--) {
                console.log("Warning, unable to triangulate polygon!");
                break
            }
            i = k;
            e <= i && (i = 0);
            k = i + 1;
            e <= k && (k = 0);
            l = k + 1;
            e <= l && (l = 0);
            var n;
            a: {
                var s = n = void 0,
                r = void 0,
                p = void 0,
                q = void 0,
                y = void 0,
                v = void 0,
                z = void 0,
                t = void 0,
                s = a[g[i]].x,
                r = a[g[i]].y,
                p = a[g[k]].x,
                q = a[g[k]].y,
                y = a[g[l]].x,
                v = a[g[l]].y;
                if (1E-10 > (p - s) * (v - r) - (q - r) * (y - s)) n = !1;
                else {
                    var A = void 0,
                    I = void 0,
                    C = void 0,
                    x = void 0,
                    G = void 0,
                    J = void 0,
                    E = void 0,
                    H = void 0,
                    B = void 0,
                    W = void 0,
                    B = H = E = t = z = void 0,
                    A = y - p,
                    I = v - q,
                    C = s - y,
                    x = r - v,
                    G = p - s,
                    J = q - r;
                    for (n = 0; n < e; n++) if (! (n === i || n === k || n === l)) if (z = a[g[n]].x, t = a[g[n]].y, E = z - s, H = t - r, B = z - p, W = t - q, z -= y, t -= v, B = A * W - I * B, E = G * H - J * E, H = C * t - x * z, 0 <= B && 0 <= H && 0 <= E) {
                        n = !1;
                        break a
                    }
                    n = !0
                }
            }
            if (n) {
                f.push([a[g[i]], a[g[k]], a[g[l]]]);
                h.push([g[i], g[k], g[l]]);
                i = k;
                for (l = k + 1; l < e; i++, l++) g[i] = g[l];
                e--;
                m = 2 * e
            }
        }
        return d ? h: f
    };
    a.Triangulate.area = b;
    return a
})(THREE.FontUtils);
self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace
};
THREE.Curve = function() {};
THREE.Curve.prototype.getPoint = function() {
    console.log("Warning, getPoint() not implemented!");
    return null
};
THREE.Curve.prototype.getPointAt = function(a) {
    a = this.getUtoTmapping(a);
    return this.getPoint(a)
};
THREE.Curve.prototype.getPoints = function(a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
    return c
};
THREE.Curve.prototype.getSpacedPoints = function(a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
    return c
};
THREE.Curve.prototype.getLength = function() {
    var a = this.getLengths();
    return a[a.length - 1]
};
THREE.Curve.prototype.getLengths = function(a) {
    a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions: 200);
    if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    var b = [],
    c,
    d = this.getPoint(0),
    e,
    f = 0;
    b.push(0);
    for (e = 1; e <= a; e++) c = this.getPoint(e / a),
    f += c.distanceTo(d),
    b.push(f),
    d = c;
    return this.cacheArcLengths = b
};
THREE.Curve.prototype.updateArcLengths = function() {
    this.needsUpdate = !0;
    this.getLengths()
};
THREE.Curve.prototype.getUtoTmapping = function(a, b) {
    var c = this.getLengths(),
    d = 0,
    e = c.length,
    f;
    f = b ? b: a * c[e - 1];
    for (var g = 0,
    h = e - 1,
    i; g <= h;) if (d = Math.floor(g + (h - g) / 2), i = c[d] - f, 0 > i) g = d + 1;
    else if (0 < i) h = d - 1;
    else {
        h = d;
        break
    }
    d = h;
    if (c[d] == f) return d / (e - 1);
    g = c[d];
    return c = (d + (f - g) / (c[d + 1] - g)) / (e - 1)
};
THREE.Curve.prototype.getTangent = function(a) {
    var b = a - 1E-4,
    a = a + 1E-4;
    0 > b && (b = 0);
    1 < a && (a = 1);
    b = this.getPoint(b);
    return this.getPoint(a).clone().sub(b).normalize()
};
THREE.Curve.prototype.getTangentAt = function(a) {
    a = this.getUtoTmapping(a);
    return this.getTangent(a)
};
THREE.LineCurve = function(a, b) {
    this.v1 = a;
    this.v2 = b
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.getPoint = function(a) {
    var b = this.v2.clone().sub(this.v1);
    b.multiplyScalar(a).add(this.v1);
    return b
};
THREE.LineCurve.prototype.getPointAt = function(a) {
    return this.getPoint(a)
};
THREE.LineCurve.prototype.getTangent = function() {
    return this.v2.clone().sub(this.v1).normalize()
};
THREE.QuadraticBezierCurve = function(a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.getPoint = function(a) {
    var b;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    return new THREE.Vector2(b, a)
};
THREE.QuadraticBezierCurve.prototype.getTangent = function(a) {
    var b;
    b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
    b = new THREE.Vector2(b, a);
    b.normalize();
    return b
};
THREE.CubicBezierCurve = function(a, b, c, d) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.getPoint = function(a) {
    var b;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    return new THREE.Vector2(b, a)
};
THREE.CubicBezierCurve.prototype.getTangent = function(a) {
    var b;
    b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    b = new THREE.Vector2(b, a);
    b.normalize();
    return b
};
THREE.SplineCurve = function(a) {
    this.points = void 0 == a ? [] : a
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.getPoint = function(a) {
    var b = new THREE.Vector2,
    c = [],
    d = this.points,
    e;
    e = (d.length - 1) * a;
    a = Math.floor(e);
    e -= a;
    c[0] = 0 == a ? a: a - 1;
    c[1] = a;
    c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
    c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
    b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
    b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
    return b
};
THREE.EllipseCurve = function(a, b, c, d, e, f, g) {
    this.aX = a;
    this.aY = b;
    this.xRadius = c;
    this.yRadius = d;
    this.aStartAngle = e;
    this.aEndAngle = f;
    this.aClockwise = g
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint = function(a) {
    var b = this.aEndAngle - this.aStartAngle;
    this.aClockwise || (a = 1 - a);
    b = this.aStartAngle + a * b;
    a = this.aX + this.xRadius * Math.cos(b);
    b = this.aY + this.yRadius * Math.sin(b);
    return new THREE.Vector2(a, b)
};
THREE.ArcCurve = function(a, b, c, d, e, f) {
    THREE.EllipseCurve.call(this, a, b, c, c, d, e, f)
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.Curve.Utils = {
    tangentQuadraticBezier: function(a, b, c, d) {
        return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
    },
    tangentCubicBezier: function(a, b, c, d, e) {
        return - 3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
    },
    tangentSpline: function(a) {
        return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + ( - 6 * a * a + 6 * a) + (3 * a * a - 2 * a)
    },
    interpolate: function(a, b, c, d, e) {
        var a = 0.5 * (c - a),
        d = 0.5 * (d - b),
        f = e * e;
        return (2 * b - 2 * c + a + d) * e * f + ( - 3 * b + 3 * c - 2 * a - d) * f + a * e + b
    }
};
THREE.Curve.create = function(a, b) {
    a.prototype = Object.create(THREE.Curve.prototype);
    a.prototype.getPoint = b;
    return a
};
THREE.LineCurve3 = THREE.Curve.create(function(a, b) {
    this.v1 = a;
    this.v2 = b
},
function(a) {
    var b = new THREE.Vector3;
    b.subVectors(this.v2, this.v1);
    b.multiplyScalar(a);
    b.add(this.v1);
    return b
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c
},
function(a) {
    var b, c;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
    return new THREE.Vector3(b, c, a)
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function(a, b, c, d) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d
},
function(a) {
    var b, c;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
    return new THREE.Vector3(b, c, a)
});
THREE.SplineCurve3 = THREE.Curve.create(function(a) {
    this.points = void 0 == a ? [] : a
},
function(a) {
    var b = new THREE.Vector3,
    c = [],
    d = this.points,
    e,
    a = (d.length - 1) * a;
    e = Math.floor(a);
    a -= e;
    c[0] = 0 == e ? e: e - 1;
    c[1] = e;
    c[2] = e > d.length - 2 ? d.length - 1 : e + 1;
    c[3] = e > d.length - 3 ? d.length - 1 : e + 2;
    e = d[c[0]];
    var f = d[c[1]],
    g = d[c[2]],
    c = d[c[3]];
    b.x = THREE.Curve.Utils.interpolate(e.x, f.x, g.x, c.x, a);
    b.y = THREE.Curve.Utils.interpolate(e.y, f.y, g.y, c.y, a);
    b.z = THREE.Curve.Utils.interpolate(e.z, f.z, g.z, c.z, a);
    return b
});
THREE.ClosedSplineCurve3 = THREE.Curve.create(function(a) {
    this.points = void 0 == a ? [] : a
},
function(a) {
    var b = new THREE.Vector3,
    c = [],
    d = this.points,
    e;
    e = (d.length - 0) * a;
    a = Math.floor(e);
    e -= a;
    a += 0 < a ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length;
    c[0] = (a - 1) % d.length;
    c[1] = a % d.length;
    c[2] = (a + 1) % d.length;
    c[3] = (a + 2) % d.length;
    b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
    b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
    b.z = THREE.Curve.Utils.interpolate(d[c[0]].z, d[c[1]].z, d[c[2]].z, d[c[3]].z, e);
    return b
});
THREE.CurvePath = function() {
    this.curves = [];
    this.bends = [];
    this.autoClose = !1
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.add = function(a) {
    this.curves.push(a)
};
THREE.CurvePath.prototype.checkConnection = function() {};
THREE.CurvePath.prototype.closePath = function() {
    var a = this.curves[0].getPoint(0),
    b = this.curves[this.curves.length - 1].getPoint(1);
    a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
};
THREE.CurvePath.prototype.getPoint = function(a) {
    for (var b = a * this.getLength(), c = this.getCurveLengths(), a = 0; a < c.length;) {
        if (c[a] >= b) return b = c[a] - b,
        a = this.curves[a],
        b = 1 - b / a.getLength(),
        a.getPointAt(b);
        a++
    }
    return null
};
THREE.CurvePath.prototype.getLength = function() {
    var a = this.getCurveLengths();
    return a[a.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function() {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
    var a = [],
    b = 0,
    c,
    d = this.curves.length;
    for (c = 0; c < d; c++) b += this.curves[c].getLength(),
    a.push(b);
    return this.cacheLengths = a
};
THREE.CurvePath.prototype.getBoundingBox = function() {
    var a = this.getPoints(),
    b,
    c,
    d,
    e,
    f,
    g;
    b = c = Number.NEGATIVE_INFINITY;
    e = f = Number.POSITIVE_INFINITY;
    var h, i, k, l, m = a[0] instanceof THREE.Vector3;
    l = m ? new THREE.Vector3: new THREE.Vector2;
    i = 0;
    for (k = a.length; i < k; i++) h = a[i],
    h.x > b ? b = h.x: h.x < e && (e = h.x),
    h.y > c ? c = h.y: h.y < f && (f = h.y),
    m && (h.z > d ? d = h.z: h.z < g && (g = h.z)),
    l.add(h);
    a = {
        minX: e,
        minY: f,
        maxX: b,
        maxY: c,
        centroid: l.divideScalar(k)
    };
    m && (a.maxZ = d, a.minZ = g);
    return a
};
THREE.CurvePath.prototype.createPointsGeometry = function(a) {
    a = this.getPoints(a, !0);
    return this.createGeometry(a)
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function(a) {
    a = this.getSpacedPoints(a, !0);
    return this.createGeometry(a)
};
THREE.CurvePath.prototype.createGeometry = function(a) {
    for (var b = new THREE.Geometry,
    c = 0; c < a.length; c++) b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
    return b
};
THREE.CurvePath.prototype.addWrapPath = function(a) {
    this.bends.push(a)
};
THREE.CurvePath.prototype.getTransformedPoints = function(a, b) {
    var c = this.getPoints(a),
    d,
    e;
    b || (b = this.bends);
    d = 0;
    for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
    return c
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function(a, b) {
    var c = this.getSpacedPoints(a),
    d,
    e;
    b || (b = this.bends);
    d = 0;
    for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
    return c
};
THREE.CurvePath.prototype.getWrapPoints = function(a, b) {
    var c = this.getBoundingBox(),
    d,
    e,
    f,
    g,
    h,
    i;
    d = 0;
    for (e = a.length; d < e; d++) f = a[d],
    g = f.x,
    h = f.y,
    i = g / c.maxX,
    i = b.getUtoTmapping(i, g),
    g = b.getPoint(i),
    h = b.getNormalVector(i).multiplyScalar(h),
    f.x = g.x + h.x,
    f.y = g.y + h.y;
    return a
};
THREE.Gyroscope = function() {
    THREE.Object3D.call(this)
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld = function(a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.rotationWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.rotationObject, this.scaleObject), this.matrixWorld.compose(this.translationWorld, this.rotationObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix),
    this.matrixWorldNeedsUpdate = !1,
    a = !0;
    for (var b = 0,
    c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3;
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion;
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion;
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3;
THREE.Path = function(a) {
    THREE.CurvePath.call(this);
    this.actions = [];
    a && this.fromPoints(a)
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc",
    ELLIPSE: "ellipse"
};
THREE.Path.prototype.fromPoints = function(a) {
    this.moveTo(a[0].x, a[0].y);
    for (var b = 1,
    c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
};
THREE.Path.prototype.moveTo = function(a, b) {
    var c = Array.prototype.slice.call(arguments);
    this.actions.push({
        action: THREE.PathActions.MOVE_TO,
        args: c
    })
};
THREE.Path.prototype.lineTo = function(a, b) {
    var c = Array.prototype.slice.call(arguments),
    d = this.actions[this.actions.length - 1].args,
    d = new THREE.LineCurve(new THREE.Vector2(d[d.length - 2], d[d.length - 1]), new THREE.Vector2(a, b));
    this.curves.push(d);
    this.actions.push({
        action: THREE.PathActions.LINE_TO,
        args: c
    })
};
THREE.Path.prototype.quadraticCurveTo = function(a, b, c, d) {
    var e = Array.prototype.slice.call(arguments),
    f = this.actions[this.actions.length - 1].args,
    f = new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length - 2], f[f.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d));
    this.curves.push(f);
    this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: e
    })
};
THREE.Path.prototype.bezierCurveTo = function(a, b, c, d, e, f) {
    var g = Array.prototype.slice.call(arguments),
    h = this.actions[this.actions.length - 1].args,
    h = new THREE.CubicBezierCurve(new THREE.Vector2(h[h.length - 2], h[h.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d), new THREE.Vector2(e, f));
    this.curves.push(h);
    this.actions.push({
        action: THREE.PathActions.BEZIER_CURVE_TO,
        args: g
    })
};
THREE.Path.prototype.splineThru = function(a) {
    var b = Array.prototype.slice.call(arguments),
    c = this.actions[this.actions.length - 1].args,
    c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
    Array.prototype.push.apply(c, a);
    c = new THREE.SplineCurve(c);
    this.curves.push(c);
    this.actions.push({
        action: THREE.PathActions.CSPLINE_THRU,
        args: b
    })
};
THREE.Path.prototype.arc = function(a, b, c, d, e, f) {
    var g = this.actions[this.actions.length - 1].args;
    this.absarc(a + g[g.length - 2], b + g[g.length - 1], c, d, e, f)
};
THREE.Path.prototype.absarc = function(a, b, c, d, e, f) {
    this.absellipse(a, b, c, c, d, e, f)
};
THREE.Path.prototype.ellipse = function(a, b, c, d, e, f, g) {
    var h = this.actions[this.actions.length - 1].args;
    this.absellipse(a + h[h.length - 2], b + h[h.length - 1], c, d, e, f, g)
};
THREE.Path.prototype.absellipse = function(a, b, c, d, e, f, g) {
    var h = Array.prototype.slice.call(arguments),
    i = new THREE.EllipseCurve(a, b, c, d, e, f, g);
    this.curves.push(i);
    i = i.getPoint(g ? 1 : 0);
    h.push(i.x);
    h.push(i.y);
    this.actions.push({
        action: THREE.PathActions.ELLIPSE,
        args: h
    })
};
THREE.Path.prototype.getSpacedPoints = function(a) {
    a || (a = 40);
    for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
    return b
};
THREE.Path.prototype.getPoints = function(a, b) {
    if (this.useSpacedPoints) return console.log("tata"),
    this.getSpacedPoints(a, b);
    var a = a || 12,
    c = [],
    d,
    e,
    f,
    g,
    h,
    i,
    k,
    l,
    m,
    n,
    s,
    r,
    p;
    d = 0;
    for (e = this.actions.length; d < e; d++) switch (f = this.actions[d], g = f.action, f = f.args, g) {
    case THREE.PathActions.MOVE_TO:
        c.push(new THREE.Vector2(f[0], f[1]));
        break;
    case THREE.PathActions.LINE_TO:
        c.push(new THREE.Vector2(f[0], f[1]));
        break;
    case THREE.PathActions.QUADRATIC_CURVE_TO:
        h = f[2];
        i = f[3];
        m = f[0];
        n = f[1];
        0 < c.length ? (g = c[c.length - 1], s = g.x, r = g.y) : (g = this.actions[d - 1].args, s = g[g.length - 2], r = g[g.length - 1]);
        for (f = 1; f <= a; f++) p = f / a,
        g = THREE.Shape.Utils.b2(p, s, m, h),
        p = THREE.Shape.Utils.b2(p, r, n, i),
        c.push(new THREE.Vector2(g, p));
        break;
    case THREE.PathActions.BEZIER_CURVE_TO:
        h = f[4];
        i = f[5];
        m = f[0];
        n = f[1];
        k = f[2];
        l = f[3];
        0 < c.length ? (g = c[c.length - 1], s = g.x, r = g.y) : (g = this.actions[d - 1].args, s = g[g.length - 2], r = g[g.length - 1]);
        for (f = 1; f <= a; f++) p = f / a,
        g = THREE.Shape.Utils.b3(p, s, m, k, h),
        p = THREE.Shape.Utils.b3(p, r, n, l, i),
        c.push(new THREE.Vector2(g, p));
        break;
    case THREE.PathActions.CSPLINE_THRU:
        g = this.actions[d - 1].args;
        p = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])];
        g = a * f[0].length;
        p = p.concat(f[0]);
        p = new THREE.SplineCurve(p);
        for (f = 1; f <= g; f++) c.push(p.getPointAt(f / g));
        break;
    case THREE.PathActions.ARC:
        h = f[0];
        i = f[1];
        n = f[2];
        k = f[3];
        g = f[4];
        m = !!f[5];
        s = g - k;
        r = 2 * a;
        for (f = 1; f <= r; f++) p = f / r,
        m || (p = 1 - p),
        p = k + p * s,
        g = h + n * Math.cos(p),
        p = i + n * Math.sin(p),
        c.push(new THREE.Vector2(g, p));
        break;
    case THREE.PathActions.ELLIPSE:
        h = f[0];
        i = f[1];
        n = f[2];
        l = f[3];
        k = f[4];
        g = f[5];
        m = !!f[6];
        s = g - k;
        r = 2 * a;
        for (f = 1; f <= r; f++) p = f / r,
        m || (p = 1 - p),
        p = k + p * s,
        g = h + n * Math.cos(p),
        p = i + l * Math.sin(p),
        c.push(new THREE.Vector2(g, p))
    }
    d = c[c.length - 1];
    1E-10 > Math.abs(d.x - c[0].x) && 1E-10 > Math.abs(d.y - c[0].y) && c.splice(c.length - 1, 1);
    b && c.push(c[0]);
    return c
};
THREE.Path.prototype.toShapes = function() {
    var a, b, c, d, e = [],
    f = new THREE.Path;
    a = 0;
    for (b = this.actions.length; a < b; a++) c = this.actions[a],
    d = c.args,
    c = c.action,
    c == THREE.PathActions.MOVE_TO && 0 != f.actions.length && (e.push(f), f = new THREE.Path),
    f[c].apply(f, d);
    0 != f.actions.length && e.push(f);
    if (0 == e.length) return [];
    var g;
    d = [];
    a = !THREE.Shape.Utils.isClockWise(e[0].getPoints());
    if (1 == e.length) return f = e[0],
    g = new THREE.Shape,
    g.actions = f.actions,
    g.curves = f.curves,
    d.push(g),
    d;
    if (a) {
        g = new THREE.Shape;
        a = 0;
        for (b = e.length; a < b; a++) f = e[a],
        THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g.actions = f.actions, g.curves = f.curves, d.push(g), g = new THREE.Shape) : g.holes.push(f)
    } else {
        a = 0;
        for (b = e.length; a < b; a++) f = e[a],
        THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g && d.push(g), g = new THREE.Shape, g.actions = f.actions, g.curves = f.curves) : g.holes.push(f);
        d.push(g)
    }
    return d
};
THREE.Shape = function() {
    THREE.Path.apply(this, arguments);
    this.holes = []
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.extrude = function(a) {
    return new THREE.ExtrudeGeometry(this, a)
};
THREE.Shape.prototype.makeGeometry = function(a) {
    return new THREE.ShapeGeometry(this, a)
};
THREE.Shape.prototype.getPointsHoles = function(a) {
    var b, c = this.holes.length,
    d = [];
    for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
    return d
};
THREE.Shape.prototype.getSpacedPointsHoles = function(a) {
    var b, c = this.holes.length,
    d = [];
    for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
    return d
};
THREE.Shape.prototype.extractAllPoints = function(a) {
    return {
        shape: this.getTransformedPoints(a),
        holes: this.getPointsHoles(a)
    }
};
THREE.Shape.prototype.extractPoints = function(a) {
    return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a)
};
THREE.Shape.prototype.extractAllSpacedPoints = function(a) {
    return {
        shape: this.getTransformedSpacedPoints(a),
        holes: this.getSpacedPointsHoles(a)
    }
};
THREE.Shape.Utils = {
    removeHoles: function(a, b) {
        var c = a.concat(),
        d = c.concat(),
        e,
        f,
        g,
        h,
        i,
        k,
        l,
        m,
        n,
        s,
        r = [];
        for (i = 0; i < b.length; i++) {
            k = b[i];
            Array.prototype.push.apply(d, k);
            f = Number.POSITIVE_INFINITY;
            for (e = 0; e < k.length; e++) {
                n = k[e];
                s = [];
                for (m = 0; m < c.length; m++) l = c[m],
                l = n.distanceToSquared(l),
                s.push(l),
                l < f && (f = l, g = e, h = m)
            }
            e = 0 <= h - 1 ? h - 1 : c.length - 1;
            f = 0 <= g - 1 ? g - 1 : k.length - 1;
            var p = [k[g], c[h], c[e]];
            m = THREE.FontUtils.Triangulate.area(p);
            var q = [k[g], k[f], c[h]];
            n = THREE.FontUtils.Triangulate.area(q);
            s = h;
            l = g;
            h += 1;
            g += -1;
            0 > h && (h += c.length);
            h %= c.length;
            0 > g && (g += k.length);
            g %= k.length;
            e = 0 <= h - 1 ? h - 1 : c.length - 1;
            f = 0 <= g - 1 ? g - 1 : k.length - 1;
            p = [k[g], c[h], c[e]];
            p = THREE.FontUtils.Triangulate.area(p);
            q = [k[g], k[f], c[h]];
            q = THREE.FontUtils.Triangulate.area(q);
            m + n > p + q && (h = s, g = l, 0 > h && (h += c.length), h %= c.length, 0 > g && (g += k.length), g %= k.length, e = 0 <= h - 1 ? h - 1 : c.length - 1, f = 0 <= g - 1 ? g - 1 : k.length - 1);
            m = c.slice(0, h);
            n = c.slice(h);
            s = k.slice(g);
            l = k.slice(0, g);
            f = [k[g], k[f], c[h]];
            r.push([k[g], c[h], c[e]]);
            r.push(f);
            c = m.concat(s).concat(l).concat(n)
        }
        return {
            shape: c,
            isolatedPts: r,
            allpoints: d
        }
    },
    triangulateShape: function(a, b) {
        var c = THREE.Shape.Utils.removeHoles(a, b),
        d = c.allpoints,
        e = c.isolatedPts,
        c = THREE.FontUtils.Triangulate(c.shape, !1),
        f,
        g,
        h,
        i,
        k = {};
        f = 0;
        for (g = d.length; f < g; f++) i = d[f].x + ":" + d[f].y,
        void 0 !== k[i] && console.log("Duplicate point", i),
        k[i] = f;
        f = 0;
        for (g = c.length; f < g; f++) {
            h = c[f];
            for (d = 0; 3 > d; d++) i = h[d].x + ":" + h[d].y,
            i = k[i],
            void 0 !== i && (h[d] = i)
        }
        f = 0;
        for (g = e.length; f < g; f++) {
            h = e[f];
            for (d = 0; 3 > d; d++) i = h[d].x + ":" + h[d].y,
            i = k[i],
            void 0 !== i && (h[d] = i)
        }
        return c.concat(e)
    },
    isClockWise: function(a) {
        return 0 > THREE.FontUtils.Triangulate.area(a)
    },
    b2p0: function(a, b) {
        var c = 1 - a;
        return c * c * b
    },
    b2p1: function(a, b) {
        return 2 * (1 - a) * a * b
    },
    b2p2: function(a, b) {
        return a * a * b
    },
    b2: function(a, b, c, d) {
        return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d)
    },
    b3p0: function(a, b) {
        var c = 1 - a;
        return c * c * c * b
    },
    b3p1: function(a, b) {
        var c = 1 - a;
        return 3 * c * c * a * b
    },
    b3p2: function(a, b) {
        return 3 * (1 - a) * a * a * b
    },
    b3p3: function(a, b) {
        return a * a * a * b
    },
    b3: function(a, b, c, d, e) {
        return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e)
    }
};
THREE.AnimationHandler = function() {
    var a = [],
    b = {},
    c = {
        update: function(b) {
            for (var c = 0; c < a.length; c++) a[c].update(b)
        },
        addToUpdate: function(b) { - 1 === a.indexOf(b) && a.push(b)
        },
        removeFromUpdate: function(b) {
            b = a.indexOf(b); - 1 !== b && a.splice(b, 1)
        },
        add: function(a) {
            void 0 !== b[a.name] && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting.");
            b[a.name] = a;
            if (!0 !== a.initialized) {
                for (var c = 0; c < a.hierarchy.length; c++) {
                    for (var d = 0; d < a.hierarchy[c].keys.length; d++) if (0 > a.hierarchy[c].keys[d].time && (a.hierarchy[c].keys[d].time = 0), void 0 !== a.hierarchy[c].keys[d].rot && !(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion)) {
                        var h = a.hierarchy[c].keys[d].rot;
                        a.hierarchy[c].keys[d].rot = new THREE.Quaternion(h[0], h[1], h[2], h[3])
                    }
                    if (a.hierarchy[c].keys.length && void 0 !== a.hierarchy[c].keys[0].morphTargets) {
                        h = {};
                        for (d = 0; d < a.hierarchy[c].keys.length; d++) for (var i = 0; i < a.hierarchy[c].keys[d].morphTargets.length; i++) {
                            var k = a.hierarchy[c].keys[d].morphTargets[i];
                            h[k] = -1
                        }
                        a.hierarchy[c].usedMorphTargets = h;
                        for (d = 0; d < a.hierarchy[c].keys.length; d++) {
                            var l = {};
                            for (k in h) {
                                for (i = 0; i < a.hierarchy[c].keys[d].morphTargets.length; i++) if (a.hierarchy[c].keys[d].morphTargets[i] === k) {
                                    l[k] = a.hierarchy[c].keys[d].morphTargetsInfluences[i];
                                    break
                                }
                                i === a.hierarchy[c].keys[d].morphTargets.length && (l[k] = 0)
                            }
                            a.hierarchy[c].keys[d].morphTargetsInfluences = l
                        }
                    }
                    for (d = 1; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d - 1].time && (a.hierarchy[c].keys.splice(d, 1), d--);
                    for (d = 0; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].index = d
                }
                d = parseInt(a.length * a.fps, 10);
                a.JIT = {};
                a.JIT.hierarchy = [];
                for (c = 0; c < a.hierarchy.length; c++) a.JIT.hierarchy.push(Array(d));
                a.initialized = !0
            }
        },
        get: function(a) {
            if ("string" === typeof a) {
                if (b[a]) return b[a];
                console.log("THREE.AnimationHandler.get: Couldn't find animation " + a);
                return null
            }
        },
        parse: function(a) {
            var b = [];
            if (a instanceof THREE.SkinnedMesh) for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
            else d(a, b);
            return b
        }
    },
    d = function(a, b) {
        b.push(a);
        for (var c = 0; c < a.children.length; c++) d(a.children[c], b)
    };
    c.LINEAR = 0;
    c.CATMULLROM = 1;
    c.CATMULLROM_FORWARD = 2;
    return c
} ();
THREE.Animation = function(a, b, c) {
    this.root = a;
    this.data = THREE.AnimationHandler.get(b);
    this.hierarchy = THREE.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 1;
    this.isPlaying = !1;
    this.loop = this.isPaused = !0;
    this.interpolationType = void 0 !== c ? c: THREE.AnimationHandler.LINEAR;
    this.points = [];
    this.target = new THREE.Vector3
};
THREE.Animation.prototype.play = function(a, b) {
    if (!1 === this.isPlaying) {
        this.isPlaying = !0;
        this.loop = void 0 !== a ? a: !0;
        this.currentTime = void 0 !== b ? b: 0;
        var c, d = this.hierarchy.length,
        e;
        for (c = 0; c < d; c++) {
            e = this.hierarchy[c];
            this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD && (e.useQuaternion = !0);
            e.matrixAutoUpdate = !0;
            void 0 === e.animationCache && (e.animationCache = {},
            e.animationCache.prevKey = {
                pos: 0,
                rot: 0,
                scl: 0
            },
            e.animationCache.nextKey = {
                pos: 0,
                rot: 0,
                scl: 0
            },
            e.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix: e.matrix);
            var f = e.animationCache.prevKey;
            e = e.animationCache.nextKey;
            f.pos = this.data.hierarchy[c].keys[0];
            f.rot = this.data.hierarchy[c].keys[0];
            f.scl = this.data.hierarchy[c].keys[0];
            e.pos = this.getNextKeyWith("pos", c, 1);
            e.rot = this.getNextKeyWith("rot", c, 1);
            e.scl = this.getNextKeyWith("scl", c, 1)
        }
        this.update(0)
    }
    this.isPaused = !1;
    THREE.AnimationHandler.addToUpdate(this)
};
THREE.Animation.prototype.pause = function() { ! 0 === this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused
};
THREE.Animation.prototype.stop = function() {
    this.isPaused = this.isPlaying = !1;
    THREE.AnimationHandler.removeFromUpdate(this)
};
THREE.Animation.prototype.update = function(a) {
    if (!1 !== this.isPlaying) {
        var b = ["pos", "rot", "scl"],
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        k,
        l;
        l = this.currentTime += a * this.timeScale;
        k = this.currentTime %= this.data.length;
        parseInt(Math.min(k * this.data.fps, this.data.length * this.data.fps), 10);
        for (var m = 0,
        n = this.hierarchy.length; m < n; m++) {
            a = this.hierarchy[m];
            i = a.animationCache;
            for (var s = 0; 3 > s; s++) {
                c = b[s];
                g = i.prevKey[c];
                h = i.nextKey[c];
                if (h.time <= l) {
                    if (k < l) if (this.loop) {
                        g = this.data.hierarchy[m].keys[0];
                        for (h = this.getNextKeyWith(c, m, 1); h.time < k;) g = h,
                        h = this.getNextKeyWith(c, m, h.index + 1)
                    } else {
                        this.stop();
                        return
                    } else {
                        do g = h,
                        h = this.getNextKeyWith(c, m, h.index + 1);
                        while (h.time < k)
                    }
                    i.prevKey[c] = g;
                    i.nextKey[c] = h
                }
                a.matrixAutoUpdate = !0;
                a.matrixWorldNeedsUpdate = !0;
                d = (k - g.time) / (h.time - g.time);
                e = g[c];
                f = h[c];
                if (0 > d || 1 < d) console.log("THREE.Animation.update: Warning! Scale out of bounds:" + d + " on bone " + m),
                d = 0 > d ? 0 : 1;
                if ("pos" === c) if (c = a.position, this.interpolationType === THREE.AnimationHandler.LINEAR) c.x = e[0] + (f[0] - e[0]) * d,
                c.y = e[1] + (f[1] - e[1]) * d,
                c.z = e[2] + (f[2] - e[2]) * d;
                else {
                    if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) this.points[0] = this.getPrevKeyWith("pos", m, g.index - 1).pos,
                    this.points[1] = e,
                    this.points[2] = f,
                    this.points[3] = this.getNextKeyWith("pos", m, h.index + 1).pos,
                    d = 0.33 * d + 0.33,
                    e = this.interpolateCatmullRom(this.points, d),
                    c.x = e[0],
                    c.y = e[1],
                    c.z = e[2],
                    this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (d = this.interpolateCatmullRom(this.points, 1.01 * d), this.target.set(d[0], d[1], d[2]), this.target.sub(c), this.target.y = 0, this.target.normalize(), d = Math.atan2(this.target.x, this.target.z), a.rotation.set(0, d, 0))
                } else "rot" === c ? THREE.Quaternion.slerp(e, f, a.quaternion, d) : "scl" === c && (c = a.scale, c.x = e[0] + (f[0] - e[0]) * d, c.y = e[1] + (f[1] - e[1]) * d, c.z = e[2] + (f[2] - e[2]) * d)
            }
        }
    }
};
THREE.Animation.prototype.interpolateCatmullRom = function(a, b) {
    var c = [],
    d = [],
    e,
    f,
    g,
    h,
    i,
    k;
    e = (a.length - 1) * b;
    f = Math.floor(e);
    e -= f;
    c[0] = 0 === f ? f: f - 1;
    c[1] = f;
    c[2] = f > a.length - 2 ? f: f + 1;
    c[3] = f > a.length - 3 ? f: f + 2;
    f = a[c[0]];
    h = a[c[1]];
    i = a[c[2]];
    k = a[c[3]];
    c = e * e;
    g = e * c;
    d[0] = this.interpolate(f[0], h[0], i[0], k[0], e, c, g);
    d[1] = this.interpolate(f[1], h[1], i[1], k[1], e, c, g);
    d[2] = this.interpolate(f[2], h[2], i[2], k[2], e, c, g);
    return d
};
THREE.Animation.prototype.interpolate = function(a, b, c, d, e, f, g) {
    a = 0.5 * (c - a);
    d = 0.5 * (d - b);
    return (2 * (b - c) + a + d) * g + ( - 3 * (b - c) - 2 * a - d) * f + a * e + b
};
THREE.Animation.prototype.getNextKeyWith = function(a, b, c) {
    for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c < d.length - 1 ? c: d.length - 1 : c % d.length; c < d.length; c++) if (void 0 !== d[c][a]) return d[c];
    return this.data.hierarchy[b].keys[0]
};
THREE.Animation.prototype.getPrevKeyWith = function(a, b, c) {
    for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? 0 < c ? c: 0 : 0 <= c ? c: c + d.length; 0 <= c; c--) if (void 0 !== d[c][a]) return d[c];
    return this.data.hierarchy[b].keys[d.length - 1]
};
THREE.KeyFrameAnimation = function(a, b, c) {
    this.root = a;
    this.data = THREE.AnimationHandler.get(b);
    this.hierarchy = THREE.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 0.001;
    this.isPlaying = !1;
    this.loop = this.isPaused = !0;
    this.JITCompile = void 0 !== c ? c: !0;
    a = 0;
    for (b = this.hierarchy.length; a < b; a++) {
        var c = this.data.hierarchy[a].sids,
        d = this.hierarchy[a];
        if (this.data.hierarchy[a].keys.length && c) {
            for (var e = 0; e < c.length; e++) {
                var f = c[e],
                g = this.getNextKeyWith(f, a, 0);
                g && g.apply(f)
            }
            d.matrixAutoUpdate = !1;
            this.data.hierarchy[a].node.updateMatrix();
            d.matrixWorldNeedsUpdate = !0
        }
    }
};
THREE.KeyFrameAnimation.prototype.play = function(a, b) {
    if (!this.isPlaying) {
        this.isPlaying = !0;
        this.loop = void 0 !== a ? a: !0;
        this.currentTime = void 0 !== b ? b: 0;
        this.startTimeMs = b;
        this.startTime = 1E7;
        this.endTime = -this.startTime;
        var c, d = this.hierarchy.length,
        e, f;
        for (c = 0; c < d; c++) e = this.hierarchy[c],
        f = this.data.hierarchy[c],
        e.useQuaternion = !0,
        void 0 === f.animationCache && (f.animationCache = {},
        f.animationCache.prevKey = null, f.animationCache.nextKey = null, f.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix: e.matrix),
        e = this.data.hierarchy[c].keys,
        e.length && (f.animationCache.prevKey = e[0], f.animationCache.nextKey = e[1], this.startTime = Math.min(e[0].time, this.startTime), this.endTime = Math.max(e[e.length - 1].time, this.endTime));
        this.update(0)
    }
    this.isPaused = !1;
    THREE.AnimationHandler.addToUpdate(this)
};
THREE.KeyFrameAnimation.prototype.pause = function() {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused
};
THREE.KeyFrameAnimation.prototype.stop = function() {
    this.isPaused = this.isPlaying = !1;
    THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.data.hierarchy.length; a++) {
        var b = this.hierarchy[a],
        c = this.data.hierarchy[a];
        if (void 0 !== c.animationCache) {
            var d = c.animationCache.originalMatrix;
            b instanceof THREE.Bone ? (d.copy(b.skinMatrix), b.skinMatrix = d) : (d.copy(b.matrix), b.matrix = d);
            delete c.animationCache
        }
    }
};
THREE.KeyFrameAnimation.prototype.update = function(a) {
    if (this.isPlaying) {
        var b, c, d, e, f = this.data.JIT.hierarchy,
        g, h, i;
        h = this.currentTime += a * this.timeScale;
        g = this.currentTime %= this.data.length;
        g < this.startTimeMs && (g = this.currentTime = this.startTimeMs + g);
        e = parseInt(Math.min(g * this.data.fps, this.data.length * this.data.fps), 10);
        if ((i = g < h) && !this.loop) {
            for (var a = 0,
            k = this.hierarchy.length; a < k; a++) {
                var l = this.data.hierarchy[a].keys,
                f = this.data.hierarchy[a].sids;
                d = l.length - 1;
                e = this.hierarchy[a];
                if (l.length) {
                    for (l = 0; l < f.length; l++) g = f[l],
                    (h = this.getPrevKeyWith(g, a, d)) && h.apply(g);
                    this.data.hierarchy[a].node.updateMatrix();
                    e.matrixWorldNeedsUpdate = !0
                }
            }
            this.stop()
        } else if (! (g < this.startTime)) {
            a = 0;
            for (k = this.hierarchy.length; a < k; a++) {
                d = this.hierarchy[a];
                b = this.data.hierarchy[a];
                var l = b.keys,
                m = b.animationCache;
                if (this.JITCompile && void 0 !== f[a][e]) d instanceof THREE.Bone ? (d.skinMatrix = f[a][e], d.matrixWorldNeedsUpdate = !1) : (d.matrix = f[a][e], d.matrixWorldNeedsUpdate = !0);
                else if (l.length) {
                    this.JITCompile && m && (d instanceof THREE.Bone ? d.skinMatrix = m.originalMatrix: d.matrix = m.originalMatrix);
                    b = m.prevKey;
                    c = m.nextKey;
                    if (b && c) {
                        if (c.time <= h) {
                            if (i && this.loop) {
                                b = l[0];
                                for (c = l[1]; c.time < g;) b = c,
                                c = l[b.index + 1]
                            } else if (!i) for (var n = l.length - 1; c.time < g && c.index !== n;) b = c,
                            c = l[b.index + 1];
                            m.prevKey = b;
                            m.nextKey = c
                        }
                        c.time >= g ? b.interpolate(c, g) : b.interpolate(c, c.time)
                    }
                    this.data.hierarchy[a].node.updateMatrix();
                    d.matrixWorldNeedsUpdate = !0
                }
            }
            if (this.JITCompile && void 0 === f[0][e]) {
                this.hierarchy[0].updateMatrixWorld(!0);
                for (a = 0; a < this.hierarchy.length; a++) f[a][e] = this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix.clone() : this.hierarchy[a].matrix.clone()
            }
        }
    }
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function(a, b, c) {
    b = this.data.hierarchy[b].keys;
    for (c %= b.length; c < b.length; c++) if (b[c].hasTarget(a)) return b[c];
    return b[0]
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function(a, b, c) {
    b = this.data.hierarchy[b].keys;
    for (c = 0 <= c ? c: c + b.length; 0 <= c; c--) if (b[c].hasTarget(a)) return b[c];
    return b[b.length - 1]
};
THREE.CubeCamera = function(a, b, c) {
    THREE.Object3D.call(this);
    var d = new THREE.PerspectiveCamera(90, 1, a, b);
    d.up.set(0, -1, 0);
    d.lookAt(new THREE.Vector3(1, 0, 0));
    this.add(d);
    var e = new THREE.PerspectiveCamera(90, 1, a, b);
    e.up.set(0, -1, 0);
    e.lookAt(new THREE.Vector3( - 1, 0, 0));
    this.add(e);
    var f = new THREE.PerspectiveCamera(90, 1, a, b);
    f.up.set(0, 0, 1);
    f.lookAt(new THREE.Vector3(0, 1, 0));
    this.add(f);
    var g = new THREE.PerspectiveCamera(90, 1, a, b);
    g.up.set(0, 0, -1);
    g.lookAt(new THREE.Vector3(0, -1, 0));
    this.add(g);
    var h = new THREE.PerspectiveCamera(90, 1, a, b);
    h.up.set(0, -1, 0);
    h.lookAt(new THREE.Vector3(0, 0, 1));
    this.add(h);
    var i = new THREE.PerspectiveCamera(90, 1, a, b);
    i.up.set(0, -1, 0);
    i.lookAt(new THREE.Vector3(0, 0, -1));
    this.add(i);
    this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    });
    this.updateCubeMap = function(a, b) {
        var c = this.renderTarget,
        n = c.generateMipmaps;
        c.generateMipmaps = !1;
        c.activeCubeFace = 0;
        a.render(b, d, c);
        c.activeCubeFace = 1;
        a.render(b, e, c);
        c.activeCubeFace = 2;
        a.render(b, f, c);
        c.activeCubeFace = 3;
        a.render(b, g, c);
        c.activeCubeFace = 4;
        a.render(b, h, c);
        c.generateMipmaps = n;
        c.activeCubeFace = 5;
        a.render(b, i, c)
    }
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CombinedCamera = function(a, b, c, d, e, f, g) {
    THREE.Camera.call(this);
    this.fov = c;
    this.left = -a / 2;
    this.right = a / 2;
    this.top = b / 2;
    this.bottom = -b / 2;
    this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f, g);
    this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e);
    this.zoom = 1;
    this.toPerspective()
};
THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective = function() {
    this.near = this.cameraP.near;
    this.far = this.cameraP.far;
    this.cameraP.fov = this.fov / this.zoom;
    this.cameraP.updateProjectionMatrix();
    this.projectionMatrix = this.cameraP.projectionMatrix;
    this.inPerspectiveMode = !0;
    this.inOrthographicMode = !1
};
THREE.CombinedCamera.prototype.toOrthographic = function() {
    var a = this.cameraP.aspect,
    b = (this.cameraP.near + this.cameraP.far) / 2,
    b = Math.tan(this.fov / 2) * b,
    a = 2 * b * a / 2,
    b = b / this.zoom,
    a = a / this.zoom;
    this.cameraO.left = -a;
    this.cameraO.right = a;
    this.cameraO.top = b;
    this.cameraO.bottom = -b;
    this.cameraO.updateProjectionMatrix();
    this.near = this.cameraO.near;
    this.far = this.cameraO.far;
    this.projectionMatrix = this.cameraO.projectionMatrix;
    this.inPerspectiveMode = !1;
    this.inOrthographicMode = !0
};
THREE.CombinedCamera.prototype.setSize = function(a, b) {
    this.cameraP.aspect = a / b;
    this.left = -a / 2;
    this.right = a / 2;
    this.top = b / 2;
    this.bottom = -b / 2
};
THREE.CombinedCamera.prototype.setFov = function(a) {
    this.fov = a;
    this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.updateProjectionMatrix = function() {
    this.inPerspectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic())
};
THREE.CombinedCamera.prototype.setLens = function(a, b) {
    void 0 === b && (b = 24);
    var c = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
    this.setFov(c);
    return c
};
THREE.CombinedCamera.prototype.setZoom = function(a) {
    this.zoom = a;
    this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.toFrontView = function() {
    this.rotation.x = 0;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBackView = function() {
    this.rotation.x = 0;
    this.rotation.y = Math.PI;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toLeftView = function() {
    this.rotation.x = 0;
    this.rotation.y = -Math.PI / 2;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toRightView = function() {
    this.rotation.x = 0;
    this.rotation.y = Math.PI / 2;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toTopView = function() {
    this.rotation.x = -Math.PI / 2;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBottomView = function() {
    this.rotation.x = Math.PI / 2;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE.AsteriskGeometry = function(a, b) {
    THREE.Geometry.call(this);
    for (var c = 0.707 * a,
    d = 0.707 * b,
    c = [[a, 0, 0], [b, 0, 0], [ - a, 0, 0], [ - b, 0, 0], [0, a, 0], [0, b, 0], [0, -a, 0], [0, -b, 0], [0, 0, a], [0, 0, b], [0, 0, -a], [0, 0, -b], [c, c, 0], [d, d, 0], [ - c, -c, 0], [ - d, -d, 0], [c, -c, 0], [d, -d, 0], [ - c, c, 0], [ - d, d, 0], [c, 0, c], [d, 0, d], [ - c, 0, -c], [ - d, 0, -d], [c, 0, -c], [d, 0, -d], [ - c, 0, c], [ - d, 0, d], [0, c, c], [0, d, d], [0, -c, -c], [0, -d, -d], [0, c, -c], [0, d, -d], [0, -c, c], [0, -d, d]], d = 0, e = c.length; d < e; d++) this.vertices.push(new THREE.Vector3(c[d][0], c[d][1], c[d][2]))
};
THREE.AsteriskGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CircleGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    var a = a || 50,
    c = void 0 !== c ? c: 0,
    d = void 0 !== d ? d: 2 * Math.PI,
    b = void 0 !== b ? Math.max(3, b) : 8,
    e,
    f = [];
    e = new THREE.Vector3;
    var g = new THREE.Vector2(0.5, 0.5);
    this.vertices.push(e);
    f.push(g);
    for (e = 0; e <= b; e++) {
        var h = new THREE.Vector3;
        h.x = a * Math.cos(c + e / b * d);
        h.y = a * Math.sin(c + e / b * d);
        this.vertices.push(h);
        f.push(new THREE.Vector2((h.x / a + 1) / 2, -(h.y / a + 1) / 2 + 1))
    }
    c = new THREE.Vector3(0, 0, -1);
    for (e = 1; e <= b; e++) this.faces.push(new THREE.Face3(e, e + 1, 0, [c, c, c])),
    this.faceVertexUvs[0].push([f[e], f[e + 1], g]);
    this.computeCentroids();
    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CubeGeometry = function(a, b, c, d, e, f) {
    function g(a, b, c, d, e, f, g, p) {
        var q, y = h.widthSegments,
        v = h.heightSegments,
        z = e / 2,
        t = f / 2,
        A = h.vertices.length;
        if ("x" === a && "y" === b || "y" === a && "x" === b) q = "z";
        else if ("x" === a && "z" === b || "z" === a && "x" === b) q = "y",
        v = h.depthSegments;
        else if ("z" === a && "y" === b || "y" === a && "z" === b) q = "x",
        y = h.depthSegments;
        var I = y + 1,
        C = v + 1,
        x = e / y,
        G = f / v,
        J = new THREE.Vector3;
        J[q] = 0 < g ? 1 : -1;
        for (e = 0; e < C; e++) for (f = 0; f < I; f++) {
            var E = new THREE.Vector3;
            E[a] = (f * x - z) * c;
            E[b] = (e * G - t) * d;
            E[q] = g;
            h.vertices.push(E)
        }
        for (e = 0; e < v; e++) for (f = 0; f < y; f++) a = new THREE.Face4(f + I * e + A, f + I * (e + 1) + A, f + 1 + I * (e + 1) + A, f + 1 + I * e + A),
        a.normal.copy(J),
        a.vertexNormals.push(J.clone(), J.clone(), J.clone(), J.clone()),
        a.materialIndex = p,
        h.faces.push(a),
        h.faceVertexUvs[0].push([new THREE.Vector2(f / y, 1 - e / v), new THREE.Vector2(f / y, 1 - (e + 1) / v), new THREE.Vector2((f + 1) / y, 1 - (e + 1) / v), new THREE.Vector2((f + 1) / y, 1 - e / v)])
    }
    THREE.Geometry.call(this);
    var h = this;
    this.width = a;
    this.height = b;
    this.depth = c;
    this.widthSegments = d || 1;
    this.heightSegments = e || 1;
    this.depthSegments = f || 1;
    a = this.width / 2;
    b = this.height / 2;
    c = this.depth / 2;
    g("z", "y", -1, -1, this.depth, this.height, a, 0);
    g("z", "y", 1, -1, this.depth, this.height, -a, 1);
    g("x", "z", 1, 1, this.width, this.depth, b, 2);
    g("x", "z", 1, -1, this.width, this.depth, -b, 3);
    g("x", "y", 1, -1, this.width, this.height, c, 4);
    g("x", "y", -1, -1, this.width, this.height, -c, 5);
    this.computeCentroids();
    this.mergeVertices()
};
THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry = function(a, b, c, d, e, f) {
    THREE.Geometry.call(this);
    var a = void 0 !== a ? a: 20,
    b = void 0 !== b ? b: 20,
    c = void 0 !== c ? c: 100,
    g = c / 2,
    d = d || 8,
    e = e || 1,
    h,
    i,
    k = [],
    l = [];
    for (i = 0; i <= e; i++) {
        var m = [],
        n = [],
        s = i / e,
        r = s * (b - a) + a;
        for (h = 0; h <= d; h++) {
            var p = h / d,
            q = new THREE.Vector3;
            q.x = r * Math.sin(2 * p * Math.PI);
            q.y = -s * c + g;
            q.z = r * Math.cos(2 * p * Math.PI);
            this.vertices.push(q);
            m.push(this.vertices.length - 1);
            n.push(new THREE.Vector2(p, 1 - s))
        }
        k.push(m);
        l.push(n)
    }
    c = (b - a) / c;
    for (h = 0; h < d; h++) {
        0 !== a ? (m = this.vertices[k[0][h]].clone(), n = this.vertices[k[0][h + 1]].clone()) : (m = this.vertices[k[1][h]].clone(), n = this.vertices[k[1][h + 1]].clone());
        m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize();
        n.setY(Math.sqrt(n.x * n.x + n.z * n.z) * c).normalize();
        for (i = 0; i < e; i++) {
            var s = k[i][h],
            r = k[i + 1][h],
            p = k[i + 1][h + 1],
            q = k[i][h + 1],
            y = m.clone(),
            v = m.clone(),
            z = n.clone(),
            t = n.clone(),
            A = l[i][h].clone(),
            I = l[i + 1][h].clone(),
            C = l[i + 1][h + 1].clone(),
            x = l[i][h + 1].clone();
            this.faces.push(new THREE.Face4(s, r, p, q, [y, v, z, t]));
            this.faceVertexUvs[0].push([A, I, C, x])
        }
    }
    if (!f && 0 < a) {
        this.vertices.push(new THREE.Vector3(0, g, 0));
        for (h = 0; h < d; h++) s = k[0][h],
        r = k[0][h + 1],
        p = this.vertices.length - 1,
        y = new THREE.Vector3(0, 1, 0),
        v = new THREE.Vector3(0, 1, 0),
        z = new THREE.Vector3(0, 1, 0),
        A = l[0][h].clone(),
        I = l[0][h + 1].clone(),
        C = new THREE.Vector2(I.u, 0),
        this.faces.push(new THREE.Face3(s, r, p, [y, v, z])),
        this.faceVertexUvs[0].push([A, I, C])
    }
    if (!f && 0 < b) {
        this.vertices.push(new THREE.Vector3(0, -g, 0));
        for (h = 0; h < d; h++) s = k[i][h + 1],
        r = k[i][h],
        p = this.vertices.length - 1,
        y = new THREE.Vector3(0, -1, 0),
        v = new THREE.Vector3(0, -1, 0),
        z = new THREE.Vector3(0, -1, 0),
        A = l[i][h + 1].clone(),
        I = l[i][h].clone(),
        C = new THREE.Vector2(I.u, 1),
        this.faces.push(new THREE.Face3(s, r, p, [y, v, z])),
        this.faceVertexUvs[0].push([A, I, C])
    }
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry = function(a, b) {
    "undefined" !== typeof a && (THREE.Geometry.call(this), a = a instanceof Array ? a: [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals())
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.addShapeList = function(a, b) {
    for (var c = a.length,
    d = 0; d < c; d++) this.addShape(a[d], b)
};
THREE.ExtrudeGeometry.prototype.addShape = function(a, b) {
    function c(a, b, c) {
        b || console.log("die");
        return b.clone().multiplyScalar(c).add(a)
    }
    function d(a, b, c) {
        var d = THREE.ExtrudeGeometry.__v1,
        e = THREE.ExtrudeGeometry.__v2,
        f = THREE.ExtrudeGeometry.__v3,
        g = THREE.ExtrudeGeometry.__v4,
        i = THREE.ExtrudeGeometry.__v5,
        h = THREE.ExtrudeGeometry.__v6;
        d.set(a.x - b.x, a.y - b.y);
        e.set(a.x - c.x, a.y - c.y);
        d = d.normalize();
        e = e.normalize();
        f.set( - d.y, d.x);
        g.set(e.y, -e.x);
        i.copy(a).add(f);
        h.copy(a).add(g);
        if (i.equals(h)) return g.clone();
        i.copy(b).add(f);
        h.copy(c).add(g);
        f = d.dot(g);
        g = h.sub(i).dot(g);
        0 === f && (console.log("Either infinite or no solutions!"), 0 === g ? console.log("Its finite solutions.") : console.log("Too bad, no solutions."));
        g /= f;
        return 0 > g ? (b = Math.atan2(b.y - a.y, b.x - a.x), a = Math.atan2(c.y - a.y, c.x - a.x), b > a && (a += 2 * Math.PI), c = (b + a) / 2, a = -Math.cos(c), c = -Math.sin(c), new THREE.Vector2(a, c)) : d.multiplyScalar(g).add(i).sub(a).clone()
    }
    function e(c, d) {
        var e, f;
        for (M = c.length; 0 <= --M;) {
            e = M;
            f = M - 1;
            0 > f && (f = c.length - 1);
            for (var g = 0,
            i = s + 2 * l,
            g = 0; g < i; g++) {
                var h = fa * g,
                k = fa * (g + 1),
                m = d + e + h,
                h = d + f + h,
                n = d + f + k,
                k = d + e + k,
                p = c,
                q = g,
                r = i,
                t = e,
                y = f,
                m = m + H,
                h = h + H,
                n = n + H,
                k = k + H;
                E.faces.push(new THREE.Face4(m, h, n, k, null, null, v));
                m = z.generateSideWallUV(E, a, p, b, m, h, n, k, q, r, t, y);
                E.faceVertexUvs[0].push(m)
            }
        }
    }
    function f(a, b, c) {
        E.vertices.push(new THREE.Vector3(a, b, c))
    }
    function g(c, d, e, f) {
        c += H;
        d += H;
        e += H;
        E.faces.push(new THREE.Face3(c, d, e, null, null, y));
        c = f ? z.generateBottomUV(E, a, b, c, d, e) : z.generateTopUV(E, a, b, c, d, e);
        E.faceVertexUvs[0].push(c)
    }
    var h = void 0 !== b.amount ? b.amount: 100,
    i = void 0 !== b.bevelThickness ? b.bevelThickness: 6,
    k = void 0 !== b.bevelSize ? b.bevelSize: i - 2,
    l = void 0 !== b.bevelSegments ? b.bevelSegments: 3,
    m = void 0 !== b.bevelEnabled ? b.bevelEnabled: !0,
    n = void 0 !== b.curveSegments ? b.curveSegments: 12,
    s = void 0 !== b.steps ? b.steps: 1,
    r = b.extrudePath,
    p,
    q = !1,
    y = b.material,
    v = b.extrudeMaterial,
    z = void 0 !== b.UVGenerator ? b.UVGenerator: THREE.ExtrudeGeometry.WorldUVGenerator,
    t,
    A,
    I,
    C;
    r && (p = r.getSpacedPoints(s), q = !0, m = !1, t = void 0 !== b.frames ? b.frames: new THREE.TubeGeometry.FrenetFrames(r, s, !1), A = new THREE.Vector3, I = new THREE.Vector3, C = new THREE.Vector3);
    m || (k = i = l = 0);
    var x, G, J, E = this,
    H = this.vertices.length,
    n = a.extractPoints(n),
    B = n.shape,
    n = n.holes;
    if (r = !THREE.Shape.Utils.isClockWise(B)) {
        B = B.reverse();
        G = 0;
        for (J = n.length; G < J; G++) x = n[G],
        THREE.Shape.Utils.isClockWise(x) && (n[G] = x.reverse());
        r = !1
    }
    var W = THREE.Shape.Utils.triangulateShape(B, n),
    r = B;
    G = 0;
    for (J = n.length; G < J; G++) x = n[G],
    B = B.concat(x);
    var F, K, L, U, fa = B.length,
    Ca = W.length,
    $a = [],
    M = 0,
    ca = r.length;
    F = ca - 1;
    for (K = M + 1; M < ca; M++, F++, K++) F === ca && (F = 0),
    K === ca && (K = 0),
    $a[M] = d(r[M], r[F], r[K]);
    var qa = [],
    ha,
    ra = $a.concat();
    G = 0;
    for (J = n.length; G < J; G++) {
        x = n[G];
        ha = [];
        M = 0;
        ca = x.length;
        F = ca - 1;
        for (K = M + 1; M < ca; M++, F++, K++) F === ca && (F = 0),
        K === ca && (K = 0),
        ha[M] = d(x[M], x[F], x[K]);
        qa.push(ha);
        ra = ra.concat(ha)
    }
    for (F = 0; F < l; F++) {
        x = F / l;
        L = i * (1 - x);
        K = k * Math.sin(x * Math.PI / 2);
        M = 0;
        for (ca = r.length; M < ca; M++) U = c(r[M], $a[M], K),
        f(U.x, U.y, -L);
        G = 0;
        for (J = n.length; G < J; G++) {
            x = n[G];
            ha = qa[G];
            M = 0;
            for (ca = x.length; M < ca; M++) U = c(x[M], ha[M], K),
            f(U.x, U.y, -L)
        }
    }
    K = k;
    for (M = 0; M < fa; M++) U = m ? c(B[M], ra[M], K) : B[M],
    q ? (I.copy(t.normals[0]).multiplyScalar(U.x), A.copy(t.binormals[0]).multiplyScalar(U.y), C.copy(p[0]).add(I).add(A), f(C.x, C.y, C.z)) : f(U.x, U.y, 0);
    for (x = 1; x <= s; x++) for (M = 0; M < fa; M++) U = m ? c(B[M], ra[M], K) : B[M],
    q ? (I.copy(t.normals[x]).multiplyScalar(U.x), A.copy(t.binormals[x]).multiplyScalar(U.y), C.copy(p[x]).add(I).add(A), f(C.x, C.y, C.z)) : f(U.x, U.y, h / s * x);
    for (F = l - 1; 0 <= F; F--) {
        x = F / l;
        L = i * (1 - x);
        K = k * Math.sin(x * Math.PI / 2);
        M = 0;
        for (ca = r.length; M < ca; M++) U = c(r[M], $a[M], K),
        f(U.x, U.y, h + L);
        G = 0;
        for (J = n.length; G < J; G++) {
            x = n[G];
            ha = qa[G];
            M = 0;
            for (ca = x.length; M < ca; M++) U = c(x[M], ha[M], K),
            q ? f(U.x, U.y + p[s - 1].y, p[s - 1].x + L) : f(U.x, U.y, h + L)
        }
    }
    if (m) {
        i = 0 * fa;
        for (M = 0; M < Ca; M++) h = W[M],
        g(h[2] + i, h[1] + i, h[0] + i, !0);
        i = fa * (s + 2 * l);
        for (M = 0; M < Ca; M++) h = W[M],
        g(h[0] + i, h[1] + i, h[2] + i, !1)
    } else {
        for (M = 0; M < Ca; M++) h = W[M],
        g(h[2], h[1], h[0], !0);
        for (M = 0; M < Ca; M++) h = W[M],
        g(h[0] + fa * s, h[1] + fa * s, h[2] + fa * s, !1)
    }
    h = 0;
    e(r, h);
    h += r.length;
    G = 0;
    for (J = n.length; G < J; G++) x = n[G],
    e(x, h),
    h += x.length
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function(a, b, c, d, e, f) {
        b = a.vertices[e].x;
        e = a.vertices[e].y;
        c = a.vertices[f].x;
        f = a.vertices[f].y;
        return [new THREE.Vector2(a.vertices[d].x, a.vertices[d].y), new THREE.Vector2(b, e), new THREE.Vector2(c, f)]
    },
    generateBottomUV: function(a, b, c, d, e, f) {
        return this.generateTopUV(a, b, c, d, e, f)
    },
    generateSideWallUV: function(a, b, c, d, e, f, g, h) {
        var b = a.vertices[e].x,
        c = a.vertices[e].y,
        e = a.vertices[e].z,
        d = a.vertices[f].x,
        i = a.vertices[f].y,
        f = a.vertices[f].z,
        k = a.vertices[g].x,
        l = a.vertices[g].y,
        g = a.vertices[g].z,
        m = a.vertices[h].x,
        n = a.vertices[h].y,
        a = a.vertices[h].z;
        return 0.01 > Math.abs(c - i) ? [new THREE.Vector2(b, 1 - e), new THREE.Vector2(d, 1 - f), new THREE.Vector2(k, 1 - g), new THREE.Vector2(m, 1 - a)] : [new THREE.Vector2(c, 1 - e), new THREE.Vector2(i, 1 - f), new THREE.Vector2(l, 1 - g), new THREE.Vector2(n, 1 - a)]
    }
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2;
THREE.ShapeGeometry = function(a, b) {
    THREE.Geometry.call(this); ! 1 === a instanceof Array && (a = [a]);
    this.shapebb = a[a.length - 1].getBoundingBox();
    this.addShapeList(a, b);
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.addShapeList = function(a, b) {
    for (var c = 0,
    d = a.length; c < d; c++) this.addShape(a[c], b);
    return this
};
THREE.ShapeGeometry.prototype.addShape = function(a, b) {
    void 0 === b && (b = {});
    var c = b.material,
    d = void 0 === b.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator: b.UVGenerator,
    e,
    f,
    g,
    h = this.vertices.length;
    e = a.extractPoints(void 0 !== b.curveSegments ? b.curveSegments: 12);
    var i = e.shape,
    k = e.holes;
    if (!THREE.Shape.Utils.isClockWise(i)) {
        i = i.reverse();
        e = 0;
        for (f = k.length; e < f; e++) g = k[e],
        THREE.Shape.Utils.isClockWise(g) && (k[e] = g.reverse())
    }
    var l = THREE.Shape.Utils.triangulateShape(i, k);
    e = 0;
    for (f = k.length; e < f; e++) g = k[e],
    i = i.concat(g);
    k = i.length;
    f = l.length;
    for (e = 0; e < k; e++) g = i[e],
    this.vertices.push(new THREE.Vector3(g.x, g.y, 0));
    for (e = 0; e < f; e++) k = l[e],
    i = k[0] + h,
    g = k[1] + h,
    k = k[2] + h,
    this.faces.push(new THREE.Face3(i, g, k, null, null, c)),
    this.faceVertexUvs[0].push(d.generateBottomUV(this, a, b, i, g, k))
};
THREE.LatheGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    for (var b = b || 12,
    c = c || 0,
    d = d || 2 * Math.PI,
    e = 1 / (a.length - 1), f = 1 / b, g = 0, h = b; g <= h; g++) for (var i = c + g * f * d,
    k = Math.cos(i), l = Math.sin(i), i = 0, m = a.length; i < m; i++) {
        var n = a[i],
        s = new THREE.Vector3;
        s.x = k * n.x - l * n.y;
        s.y = l * n.x + k * n.y;
        s.z = n.z;
        this.vertices.push(s)
    }
    c = a.length;
    g = 0;
    for (h = b; g < h; g++) {
        i = 0;
        for (m = a.length - 1; i < m; i++) d = b = i + c * g,
        l = b + c,
        k = b + 1 + c,
        this.faces.push(new THREE.Face4(d, l, k, b + 1)),
        k = g * f,
        b = i * e,
        d = k + f,
        l = b + e,
        this.faceVertexUvs[0].push([new THREE.Vector2(k, b), new THREE.Vector2(d, b), new THREE.Vector2(d, l), new THREE.Vector2(k, l)])
    }
    this.mergeVertices();
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    this.width = a;
    this.height = b;
    this.widthSegments = c || 1;
    this.heightSegments = d || 1;
    for (var c = a / 2,
    e = b / 2,
    d = this.widthSegments,
    f = this.heightSegments,
    g = d + 1,
    h = f + 1,
    i = this.width / d,
    k = this.height / f,
    l = new THREE.Vector3(0, 0, 1), a = 0; a < h; a++) for (b = 0; b < g; b++) this.vertices.push(new THREE.Vector3(b * i - c, -(a * k - e), 0));
    for (a = 0; a < f; a++) for (b = 0; b < d; b++) c = new THREE.Face4(b + g * a, b + g * (a + 1), b + 1 + g * (a + 1), b + 1 + g * a),
    c.normal.copy(l),
    c.vertexNormals.push(l.clone(), l.clone(), l.clone(), l.clone()),
    this.faces.push(c),
    this.faceVertexUvs[0].push([new THREE.Vector2(b / d, 1 - a / f), new THREE.Vector2(b / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - a / f)]);
    this.computeCentroids()
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry = function(a, b, c, d, e, f, g) {
    THREE.Geometry.call(this);
    this.radius = a || 50;
    this.widthSegments = Math.max(3, Math.floor(b) || 8);
    this.heightSegments = Math.max(2, Math.floor(c) || 6);
    for (var d = void 0 !== d ? d: 0, e = void 0 !== e ? e: 2 * Math.PI, f = void 0 !== f ? f: 0, g = void 0 !== g ? g: Math.PI, h = [], i = [], c = 0; c <= this.heightSegments; c++) {
        for (var k = [], l = [], b = 0; b <= this.widthSegments; b++) {
            var m = b / this.widthSegments,
            n = c / this.heightSegments,
            s = new THREE.Vector3;
            s.x = -this.radius * Math.cos(d + m * e) * Math.sin(f + n * g);
            s.y = this.radius * Math.cos(f + n * g);
            s.z = this.radius * Math.sin(d + m * e) * Math.sin(f + n * g);
            this.vertices.push(s);
            k.push(this.vertices.length - 1);
            l.push(new THREE.Vector2(m, 1 - n))
        }
        h.push(k);
        i.push(l)
    }
    for (c = 0; c < this.heightSegments; c++) for (b = 0; b < this.widthSegments; b++) {
        var d = h[c][b + 1],
        e = h[c][b],
        f = h[c + 1][b],
        g = h[c + 1][b + 1],
        k = this.vertices[d].clone().normalize(),
        l = this.vertices[e].clone().normalize(),
        m = this.vertices[f].clone().normalize(),
        n = this.vertices[g].clone().normalize(),
        s = i[c][b + 1].clone(),
        r = i[c][b].clone(),
        p = i[c + 1][b].clone(),
        q = i[c + 1][b + 1].clone();
        Math.abs(this.vertices[d].y) === this.radius ? (this.faces.push(new THREE.Face3(d, f, g, [k, m, n])), this.faceVertexUvs[0].push([s, p, q])) : Math.abs(this.vertices[f].y) === this.radius ? (this.faces.push(new THREE.Face3(d, e, f, [k, l, m])), this.faceVertexUvs[0].push([s, r, p])) : (this.faces.push(new THREE.Face4(d, e, f, g, [k, l, m, n])), this.faceVertexUvs[0].push([s, r, p, q]))
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TextGeometry = function(a, b) {
    var c = THREE.FontUtils.generateShapes(a, b);
    b.amount = void 0 !== b.height ? b.height: 50;
    void 0 === b.bevelThickness && (b.bevelThickness = 10);
    void 0 === b.bevelSize && (b.bevelSize = 8);
    void 0 === b.bevelEnabled && (b.bevelEnabled = !1);
    THREE.ExtrudeGeometry.call(this, c, b)
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TorusGeometry = function(a, b, c, d, e) {
    THREE.Geometry.call(this);
    this.radius = a || 100;
    this.tube = b || 40;
    this.radialSegments = c || 8;
    this.tubularSegments = d || 6;
    this.arc = e || 2 * Math.PI;
    e = new THREE.Vector3;
    a = [];
    b = [];
    for (c = 0; c <= this.radialSegments; c++) for (d = 0; d <= this.tubularSegments; d++) {
        var f = d / this.tubularSegments * this.arc,
        g = 2 * c / this.radialSegments * Math.PI;
        e.x = this.radius * Math.cos(f);
        e.y = this.radius * Math.sin(f);
        var h = new THREE.Vector3;
        h.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f);
        h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(f);
        h.z = this.tube * Math.sin(g);
        this.vertices.push(h);
        a.push(new THREE.Vector2(d / this.tubularSegments, c / this.radialSegments));
        b.push(h.clone().sub(e).normalize())
    }
    for (c = 1; c <= this.radialSegments; c++) for (d = 1; d <= this.tubularSegments; d++) {
        var e = (this.tubularSegments + 1) * c + d - 1,
        f = (this.tubularSegments + 1) * (c - 1) + d - 1,
        g = (this.tubularSegments + 1) * (c - 1) + d,
        h = (this.tubularSegments + 1) * c + d,
        i = new THREE.Face4(e, f, g, h, [b[e], b[f], b[g], b[h]]);
        i.normal.add(b[e]);
        i.normal.add(b[f]);
        i.normal.add(b[g]);
        i.normal.add(b[h]);
        i.normal.normalize();
        this.faces.push(i);
        this.faceVertexUvs[0].push([a[e].clone(), a[f].clone(), a[g].clone(), a[h].clone()])
    }
    this.computeCentroids()
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry = function(a, b, c, d, e, f, g) {
    function h(a, b, c, d, e, f) {
        var g = Math.cos(a);
        Math.cos(b);
        b = Math.sin(a);
        a *= c / d;
        c = Math.cos(a);
        g *= 0.5 * e * (2 + c);
        b = 0.5 * e * (2 + c) * b;
        e = 0.5 * f * e * Math.sin(a);
        return new THREE.Vector3(g, b, e)
    }
    THREE.Geometry.call(this);
    this.radius = a || 100;
    this.tube = b || 40;
    this.radialSegments = c || 64;
    this.tubularSegments = d || 8;
    this.p = e || 2;
    this.q = f || 3;
    this.heightScale = g || 1;
    this.grid = Array(this.radialSegments);
    c = new THREE.Vector3;
    d = new THREE.Vector3;
    e = new THREE.Vector3;
    for (a = 0; a < this.radialSegments; ++a) {
        this.grid[a] = Array(this.tubularSegments);
        for (b = 0; b < this.tubularSegments; ++b) {
            var i = 2 * (a / this.radialSegments) * this.p * Math.PI,
            g = 2 * (b / this.tubularSegments) * Math.PI,
            f = h(i, g, this.q, this.p, this.radius, this.heightScale),
            i = h(i + 0.01, g, this.q, this.p, this.radius, this.heightScale);
            c.subVectors(i, f);
            d.addVectors(i, f);
            e.crossVectors(c, d);
            d.crossVectors(e, c);
            e.normalize();
            d.normalize();
            i = -this.tube * Math.cos(g);
            g = this.tube * Math.sin(g);
            f.x += i * d.x + g * e.x;
            f.y += i * d.y + g * e.y;
            f.z += i * d.z + g * e.z;
            this.grid[a][b] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1
        }
    }
    for (a = 0; a < this.radialSegments; ++a) for (b = 0; b < this.tubularSegments; ++b) {
        var e = (a + 1) % this.radialSegments,
        f = (b + 1) % this.tubularSegments,
        c = this.grid[a][b],
        d = this.grid[e][b],
        e = this.grid[e][f],
        f = this.grid[a][f],
        g = new THREE.Vector2(a / this.radialSegments, b / this.tubularSegments),
        i = new THREE.Vector2((a + 1) / this.radialSegments, b / this.tubularSegments),
        k = new THREE.Vector2((a + 1) / this.radialSegments, (b + 1) / this.tubularSegments),
        l = new THREE.Vector2(a / this.radialSegments, (b + 1) / this.tubularSegments);
        this.faces.push(new THREE.Face4(c, d, e, f));
        this.faceVertexUvs[0].push([g, i, k, l])
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry = function(a, b, c, d, e, f) {
    THREE.Geometry.call(this);
    this.path = a;
    this.segments = b || 64;
    this.radius = c || 1;
    this.radiusSegments = d || 8;
    this.closed = e || !1;
    f && (this.debug = new THREE.Object3D);
    this.grid = [];
    var g, h, e = this.segments + 1,
    i, k, l, f = new THREE.Vector3,
    m, n, s, b = new THREE.TubeGeometry.FrenetFrames(this.path, this.segments, this.closed);
    m = b.tangents;
    n = b.normals;
    s = b.binormals;
    this.tangents = m;
    this.normals = n;
    this.binormals = s;
    for (b = 0; b < e; b++) {
        this.grid[b] = [];
        d = b / (e - 1);
        l = a.getPointAt(d);
        d = m[b];
        g = n[b];
        h = s[b];
        this.debug && (this.debug.add(new THREE.ArrowHelper(d, l, c, 255)), this.debug.add(new THREE.ArrowHelper(g, l, c, 16711680)), this.debug.add(new THREE.ArrowHelper(h, l, c, 65280)));
        for (d = 0; d < this.radiusSegments; d++) i = 2 * (d / this.radiusSegments) * Math.PI,
        k = -this.radius * Math.cos(i),
        i = this.radius * Math.sin(i),
        f.copy(l),
        f.x += k * g.x + i * h.x,
        f.y += k * g.y + i * h.y,
        f.z += k * g.z + i * h.z,
        this.grid[b][d] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1
    }
    for (b = 0; b < this.segments; b++) for (d = 0; d < this.radiusSegments; d++) e = this.closed ? (b + 1) % this.segments: b + 1,
    f = (d + 1) % this.radiusSegments,
    a = this.grid[b][d],
    c = this.grid[e][d],
    e = this.grid[e][f],
    f = this.grid[b][f],
    m = new THREE.Vector2(b / this.segments, d / this.radiusSegments),
    n = new THREE.Vector2((b + 1) / this.segments, d / this.radiusSegments),
    s = new THREE.Vector2((b + 1) / this.segments, (d + 1) / this.radiusSegments),
    g = new THREE.Vector2(b / this.segments, (d + 1) / this.radiusSegments),
    this.faces.push(new THREE.Face4(a, c, e, f)),
    this.faceVertexUvs[0].push([m, n, s, g]);
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames = function(a, b, c) {
    new THREE.Vector3;
    var d = new THREE.Vector3;
    new THREE.Vector3;
    var e = [],
    f = [],
    g = [],
    h = new THREE.Vector3,
    i = new THREE.Matrix4,
    b = b + 1,
    k,
    l,
    m;
    this.tangents = e;
    this.normals = f;
    this.binormals = g;
    for (k = 0; k < b; k++) l = k / (b - 1),
    e[k] = a.getTangentAt(l),
    e[k].normalize();
    f[0] = new THREE.Vector3;
    g[0] = new THREE.Vector3;
    a = Number.MAX_VALUE;
    k = Math.abs(e[0].x);
    l = Math.abs(e[0].y);
    m = Math.abs(e[0].z);
    k <= a && (a = k, d.set(1, 0, 0));
    l <= a && (a = l, d.set(0, 1, 0));
    m <= a && d.set(0, 0, 1);
    h.crossVectors(e[0], d).normalize();
    f[0].crossVectors(e[0], h);
    g[0].crossVectors(e[0], f[0]);
    for (k = 1; k < b; k++) f[k] = f[k - 1].clone(),
    g[k] = g[k - 1].clone(),
    h.crossVectors(e[k - 1], e[k]),
    1E-4 < h.length() && (h.normalize(), d = Math.acos(e[k - 1].dot(e[k])), f[k].applyMatrix4(i.makeRotationAxis(h, d))),
    g[k].crossVectors(e[k], f[k]);
    if (c) {
        d = Math.acos(f[0].dot(f[b - 1]));
        d /= b - 1;
        0 < e[0].dot(h.crossVectors(f[0], f[b - 1])) && (d = -d);
        for (k = 1; k < b; k++) f[k].applyMatrix4(i.makeRotationAxis(e[k], d * k)),
        g[k].crossVectors(e[k], f[k])
    }
};
THREE.PolyhedronGeometry = function(a, b, c, d) {
    function e(a) {
        var b = a.normalize().clone();
        b.index = i.vertices.push(b) - 1;
        var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
        a = Math.atan2( - a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
        b.uv = new THREE.Vector2(c, 1 - a);
        return b
    }
    function f(a, b, c, d) {
        1 > d ? (d = new THREE.Face3(a.index, b.index, c.index, [a.clone(), b.clone(), c.clone()]), d.centroid.add(a).add(b).add(c).divideScalar(3), d.normal = d.centroid.clone().normalize(), i.faces.push(d), d = Math.atan2(d.centroid.z, -d.centroid.x), i.faceVertexUvs[0].push([h(a.uv, a, d), h(b.uv, b, d), h(c.uv, c, d)])) : (d -= 1, f(a, g(a, b), g(a, c), d), f(g(a, b), b, g(b, c), d), f(g(a, c), g(b, c), c, d), f(g(a, b), g(b, c), g(a, c), d))
    }
    function g(a, b) {
        m[a.index] || (m[a.index] = []);
        m[b.index] || (m[b.index] = []);
        var c = m[a.index][b.index];
        void 0 === c && (m[a.index][b.index] = m[b.index][a.index] = c = e((new THREE.Vector3).addVectors(a, b).divideScalar(2)));
        return c
    }
    function h(a, b, c) {
        0 > c && 1 === a.x && (a = new THREE.Vector2(a.x - 1, a.y));
        0 === b.x && 0 === b.z && (a = new THREE.Vector2(c / 2 / Math.PI + 0.5, a.y));
        return a
    }
    THREE.Geometry.call(this);
    for (var c = c || 1,
    d = d || 0,
    i = this,
    k = 0,
    l = a.length; k < l; k++) e(new THREE.Vector3(a[k][0], a[k][1], a[k][2]));
    for (var m = [], a = this.vertices, k = 0, l = b.length; k < l; k++) f(a[b[k][0]], a[b[k][1]], a[b[k][2]], d);
    this.mergeVertices();
    k = 0;
    for (l = this.vertices.length; k < l; k++) this.vertices[k].multiplyScalar(c);
    this.computeCentroids();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3, c)
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry = function(a, b) {
    var c = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(this, [[ - 1, c, 0], [1, c, 0], [ - 1, -c, 0], [1, -c, 0], [0, -1, c], [0, 1, c], [0, -1, -c], [0, 1, -c], [c, 0, -1], [c, 0, 1], [ - c, 0, -1], [ - c, 0, 1]], [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]], a, b)
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry = function(a, b) {
    THREE.PolyhedronGeometry.call(this, [[1, 0, 0], [ - 1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], [[0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], [1, 2, 5], [1, 5, 3], [1, 3, 4], [1, 4, 2]], a, b)
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry = function(a, b) {
    THREE.PolyhedronGeometry.call(this, [[1, 1, 1], [ - 1, -1, 1], [ - 1, 1, -1], [1, -1, -1]], [[2, 1, 0], [0, 3, 2], [1, 3, 0], [2, 3, 1]], a, b)
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    var e = this.vertices,
    f = this.faces,
    g = this.faceVertexUvs[0],
    d = void 0 === d ? !1 : d,
    h,
    i,
    k,
    l,
    m = b + 1;
    for (h = 0; h <= c; h++) {
        l = h / c;
        for (i = 0; i <= b; i++) k = i / b,
        k = a(k, l),
        e.push(k)
    }
    var n, s, r, p;
    for (h = 0; h < c; h++) for (i = 0; i < b; i++) a = h * m + i,
    e = h * m + i + 1,
    l = (h + 1) * m + i,
    k = (h + 1) * m + i + 1,
    n = new THREE.Vector2(i / b, h / c),
    s = new THREE.Vector2((i + 1) / b, h / c),
    r = new THREE.Vector2(i / b, (h + 1) / c),
    p = new THREE.Vector2((i + 1) / b, (h + 1) / c),
    d ? (f.push(new THREE.Face3(a, e, l)), f.push(new THREE.Face3(e, k, l)), g.push([n, s, r]), g.push([s, p, r])) : (f.push(new THREE.Face4(a, e, k, l)), g.push([n, s, p, r]));
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ConvexGeometry = function(a) {
    function b(a) {
        var b = a.length();
        return new THREE.Vector2(a.x / b, a.y / b)
    }
    THREE.Geometry.call(this);
    for (var c = [[0, 1, 2], [0, 2, 1]], d = 3; d < a.length; d++) {
        var e = d,
        f = a[e].clone(),
        g = f.length();
        f.x += g * 2E-6 * (Math.random() - 0.5);
        f.y += g * 2E-6 * (Math.random() - 0.5);
        f.z += g * 2E-6 * (Math.random() - 0.5);
        for (var g = [], h = 0; h < c.length;) {
            var i = c[h],
            k = f,
            l = a[i[0]],
            m;
            m = l;
            var n = a[i[1]],
            s = a[i[2]],
            r = new THREE.Vector3,
            p = new THREE.Vector3;
            r.subVectors(s, n);
            p.subVectors(m, n);
            r.cross(p);
            r.normalize();
            m = r;
            l = m.dot(l);
            if (m.dot(k) >= l) {
                for (k = 0; 3 > k; k++) {
                    l = [i[k], i[(k + 1) % 3]];
                    m = !0;
                    for (n = 0; n < g.length; n++) if (g[n][0] === l[1] && g[n][1] === l[0]) {
                        g[n] = g[g.length - 1];
                        g.pop();
                        m = !1;
                        break
                    }
                    m && g.push(l)
                }
                c[h] = c[c.length - 1];
                c.pop()
            } else h++
        }
        for (n = 0; n < g.length; n++) c.push([g[n][0], g[n][1], e])
    }
    e = 0;
    f = Array(a.length);
    for (d = 0; d < c.length; d++) {
        g = c[d];
        for (h = 0; 3 > h; h++) void 0 === f[g[h]] && (f[g[h]] = e++, this.vertices.push(a[g[h]])),
        g[h] = f[g[h]]
    }
    for (d = 0; d < c.length; d++) this.faces.push(new THREE.Face3(c[d][0], c[d][1], c[d][2]));
    for (d = 0; d < this.faces.length; d++) g = this.faces[d],
    this.faceVertexUvs[0].push([b(this.vertices[g.a]), b(this.vertices[g.b]), b(this.vertices[g.c])]);
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.AxisHelper = function(a) {
    var b = new THREE.Geometry;
    b.vertices.push(new THREE.Vector3, new THREE.Vector3(a || 1, 0, 0), new THREE.Vector3, new THREE.Vector3(0, a || 1, 0), new THREE.Vector3, new THREE.Vector3(0, 0, a || 1));
    b.colors.push(new THREE.Color(16711680), new THREE.Color(16755200), new THREE.Color(65280), new THREE.Color(11206400), new THREE.Color(255), new THREE.Color(43775));
    a = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    THREE.Line.call(this, b, a, THREE.LinePieces)
};
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype);
THREE.ArrowHelper = function(a, b, c, d) {
    THREE.Object3D.call(this);
    void 0 === c && (c = 20);
    void 0 === d && (d = 16776960);
    var e = new THREE.Geometry;
    e.vertices.push(new THREE.Vector3(0, 0, 0));
    e.vertices.push(new THREE.Vector3(0, 1, 0));
    this.line = new THREE.Line(e, new THREE.LineBasicMaterial({
        color: d
    }));
    this.add(this.line);
    e = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
    this.cone = new THREE.Mesh(e, new THREE.MeshBasicMaterial({
        color: d
    }));
    this.cone.position.set(0, 1, 0);
    this.add(this.cone);
    b instanceof THREE.Vector3 && (this.position = b);
    this.setDirection(a);
    this.setLength(c)
};
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.setDirection = function(a) {
    var b = THREE.ArrowHelper.__v1.copy(a).normalize();
    0.999 < b.y ? this.rotation.set(0, 0, 0) : -0.999 > b.y ? this.rotation.set(Math.PI, 0, 0) : (a = THREE.ArrowHelper.__v2.set(b.z, 0, -b.x).normalize(), b = Math.acos(b.y), a = THREE.ArrowHelper.__q1.setFromAxisAngle(a, b), this.rotation.setEulerFromQuaternion(a, this.eulerOrder))
};
THREE.ArrowHelper.prototype.setLength = function(a) {
    this.scale.set(a, a, a)
};
THREE.ArrowHelper.prototype.setColor = function(a) {
    this.line.material.color.setHex(a);
    this.cone.material.color.setHex(a)
};
THREE.ArrowHelper.__v1 = new THREE.Vector3;
THREE.ArrowHelper.__v2 = new THREE.Vector3;
THREE.ArrowHelper.__q1 = new THREE.Quaternion;
THREE.CameraHelper = function(a) {
    function b(a, b, d) {
        c(a, d);
        c(b, d)
    }
    function c(a, b) {
        d.geometry.vertices.push(new THREE.Vector3);
        d.geometry.colors.push(new THREE.Color(b));
        void 0 === d.pointMap[a] && (d.pointMap[a] = []);
        d.pointMap[a].push(d.geometry.vertices.length - 1)
    }
    THREE.Line.call(this);
    var d = this;
    this.geometry = new THREE.Geometry;
    this.material = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors
    });
    this.type = THREE.LinePieces;
    this.matrixWorld = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.pointMap = {};
    b("n1", "n2", 16755200);
    b("n2", "n4", 16755200);
    b("n4", "n3", 16755200);
    b("n3", "n1", 16755200);
    b("f1", "f2", 16755200);
    b("f2", "f4", 16755200);
    b("f4", "f3", 16755200);
    b("f3", "f1", 16755200);
    b("n1", "f1", 16755200);
    b("n2", "f2", 16755200);
    b("n3", "f3", 16755200);
    b("n4", "f4", 16755200);
    b("p", "n1", 16711680);
    b("p", "n2", 16711680);
    b("p", "n3", 16711680);
    b("p", "n4", 16711680);
    b("u1", "u2", 43775);
    b("u2", "u3", 43775);
    b("u3", "u1", 43775);
    b("c", "t", 16777215);
    b("p", "c", 3355443);
    b("cn1", "cn2", 3355443);
    b("cn3", "cn4", 3355443);
    b("cf1", "cf2", 3355443);
    b("cf3", "cf4", 3355443);
    this.camera = a;
    this.update(a)
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update = function() {
    function a(a, d, e, f) {
        THREE.CameraHelper.__v.set(d, e, f);
        THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v, THREE.CameraHelper.__c);
        a = b.pointMap[a];
        if (void 0 !== a) {
            d = 0;
            for (e = a.length; d < e; d++) b.geometry.vertices[a[d]].copy(THREE.CameraHelper.__v)
        }
    }
    var b = this;
    THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);
    a("c", 0, 0, -1);
    a("t", 0, 0, 1);
    a("n1", -1, -1, -1);
    a("n2", 1, -1, -1);
    a("n3", -1, 1, -1);
    a("n4", 1, 1, -1);
    a("f1", -1, -1, 1);
    a("f2", 1, -1, 1);
    a("f3", -1, 1, 1);
    a("f4", 1, 1, 1);
    a("u1", 0.7, 1.1, -1);
    a("u2", -0.7, 1.1, -1);
    a("u3", 0, 2, -1);
    a("cf1", -1, 0, 1);
    a("cf2", 1, 0, 1);
    a("cf3", 0, -1, 1);
    a("cf4", 0, 1, 1);
    a("cn1", -1, 0, -1);
    a("cn2", 1, 0, -1);
    a("cn3", 0, -1, -1);
    a("cn4", 0, 1, -1);
    this.geometry.verticesNeedUpdate = !0
};
THREE.CameraHelper.__projector = new THREE.Projector;
THREE.CameraHelper.__v = new THREE.Vector3;
THREE.CameraHelper.__c = new THREE.Camera;
THREE.DirectionalLightHelper = function(a, b) {
    THREE.Object3D.call(this);
    this.light = a;
    this.position = a.position;
    this.direction = new THREE.Vector3;
    this.direction.subVectors(a.target.position, a.position);
    var c = THREE.Math.clamp(a.intensity, 0, 1);
    this.color = a.color.clone();
    this.color.multiplyScalar(c);
    var c = this.color.getHex(),
    d = new THREE.SphereGeometry(b, 16, 8),
    e = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    f = new THREE.MeshBasicMaterial({
        color: c,
        fog: !1
    }),
    g = new THREE.LineBasicMaterial({
        color: c,
        fog: !1
    });
    this.lightSphere = new THREE.Mesh(d, f);
    this.lightRays = new THREE.Line(e, g, THREE.LinePieces);
    this.add(this.lightSphere);
    this.add(this.lightRays);
    this.lightSphere.properties.isGizmo = !0;
    this.lightSphere.properties.gizmoSubject = a;
    this.lightSphere.properties.gizmoRoot = this;
    this.targetSphere = null;
    void 0 !== a.target.properties.targetInverse && (d = new THREE.SphereGeometry(b, 8, 4), e = new THREE.MeshBasicMaterial({
        color: c,
        wireframe: !0,
        fog: !1
    }), this.targetSphere = new THREE.Mesh(d, e), this.targetSphere.position = a.target.position, this.targetSphere.properties.isGizmo = !0, this.targetSphere.properties.gizmoSubject = a.target, this.targetSphere.properties.gizmoRoot = this.targetSphere, c = new THREE.LineDashedMaterial({
        color: c,
        dashSize: 4,
        gapSize: 4,
        opacity: 0.75,
        transparent: !0,
        fog: !1
    }), d = new THREE.Geometry, d.vertices.push(this.position.clone()), d.vertices.push(this.targetSphere.position.clone()), d.computeLineDistances(), this.targetLine = new THREE.Line(d, c), this.targetLine.properties.isGizmo = !0);
    this.properties.isGizmo = !0
};
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.update = function() {
    this.direction.subVectors(this.light.target.position, this.light.position);
    var a = THREE.Math.clamp(this.light.intensity, 0, 1);
    this.color.copy(this.light.color);
    this.color.multiplyScalar(a);
    this.lightSphere.material.color.copy(this.color);
    this.lightRays.material.color.copy(this.color);
    null !== this.targetSphere && (this.targetSphere.material.color.copy(this.color), this.targetLine.material.color.copy(this.color), this.targetLine.geometry.vertices[0].copy(this.light.position), this.targetLine.geometry.vertices[1].copy(this.light.target.position), this.targetLine.geometry.computeLineDistances(), this.targetLine.geometry.verticesNeedUpdate = !0)
};
THREE.HemisphereLightHelper = function(a, b, c) {
    THREE.Object3D.call(this);
    this.light = a;
    this.position = a.position;
    var d = THREE.Math.clamp(a.intensity, 0, 1);
    this.color = a.color.clone();
    this.color.multiplyScalar(d);
    var e = this.color.getHex();
    this.groundColor = a.groundColor.clone();
    this.groundColor.multiplyScalar(d);
    for (var d = this.groundColor.getHex(), f = new THREE.SphereGeometry(b, 16, 8, 0, 2 * Math.PI, 0, 0.5 * Math.PI), g = new THREE.SphereGeometry(b, 16, 8, 0, 2 * Math.PI, 0.5 * Math.PI, Math.PI), h = new THREE.MeshBasicMaterial({
        color: e,
        fog: !1
    }), i = new THREE.MeshBasicMaterial({
        color: d,
        fog: !1
    }), k = 0, l = f.faces.length; k < l; k++) f.faces[k].materialIndex = 0;
    k = 0;
    for (l = g.faces.length; k < l; k++) g.faces[k].materialIndex = 1;
    THREE.GeometryUtils.merge(f, g);
    this.lightSphere = new THREE.Mesh(f, new THREE.MeshFaceMaterial([h, i]));
    this.lightArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1.1 * (b + c), 0), c, e);
    this.lightArrow.rotation.x = Math.PI;
    this.lightArrowGround = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1.1 * (b + c), 0), c, d);
    b = new THREE.Object3D;
    b.rotation.x = 0.5 * -Math.PI;
    b.add(this.lightSphere);
    b.add(this.lightArrow);
    b.add(this.lightArrowGround);
    this.add(b);
    this.lightSphere.properties.isGizmo = !0;
    this.lightSphere.properties.gizmoSubject = a;
    this.lightSphere.properties.gizmoRoot = this;
    this.properties.isGizmo = !0;
    this.target = new THREE.Vector3;
    this.lookAt(this.target)
};
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.update = function() {
    var a = THREE.Math.clamp(this.light.intensity, 0, 1);
    this.color.copy(this.light.color);
    this.color.multiplyScalar(a);
    this.groundColor.copy(this.light.groundColor);
    this.groundColor.multiplyScalar(a);
    this.lightSphere.material.materials[0].color.copy(this.color);
    this.lightSphere.material.materials[1].color.copy(this.groundColor);
    this.lightArrow.setColor(this.color.getHex());
    this.lightArrowGround.setColor(this.groundColor.getHex());
    this.lookAt(this.target)
};
THREE.PointLightHelper = function(a, b) {
    THREE.Object3D.call(this);
    this.light = a;
    this.position = a.position;
    var c = THREE.Math.clamp(a.intensity, 0, 1);
    this.color = a.color.clone();
    this.color.multiplyScalar(c);
    var d = this.color.getHex(),
    c = new THREE.SphereGeometry(b, 16, 8),
    e = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    f = new THREE.IcosahedronGeometry(1, 2),
    g = new THREE.MeshBasicMaterial({
        color: d,
        fog: !1
    }),
    h = new THREE.LineBasicMaterial({
        color: d,
        fog: !1
    }),
    d = new THREE.MeshBasicMaterial({
        color: d,
        fog: !1,
        wireframe: !0,
        opacity: 0.1,
        transparent: !0
    });
    this.lightSphere = new THREE.Mesh(c, g);
    this.lightRays = new THREE.Line(e, h, THREE.LinePieces);
    this.lightDistance = new THREE.Mesh(f, d);
    c = a.distance;
    0 === c ? this.lightDistance.visible = !1 : this.lightDistance.scale.set(c, c, c);
    this.add(this.lightSphere);
    this.add(this.lightRays);
    this.add(this.lightDistance);
    this.lightSphere.properties.isGizmo = !0;
    this.lightSphere.properties.gizmoSubject = a;
    this.lightSphere.properties.gizmoRoot = this;
    this.properties.isGizmo = !0
};
THREE.PointLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.PointLightHelper.prototype.update = function() {
    var a = THREE.Math.clamp(this.light.intensity, 0, 1);
    this.color.copy(this.light.color);
    this.color.multiplyScalar(a);
    this.lightSphere.material.color.copy(this.color);
    this.lightRays.material.color.copy(this.color);
    this.lightDistance.material.color.copy(this.color);
    a = this.light.distance;
    0 === a ? this.lightDistance.visible = !1 : (this.lightDistance.visible = !0, this.lightDistance.scale.set(a, a, a))
};
THREE.SpotLightHelper = function(a, b) {
    THREE.Object3D.call(this);
    this.light = a;
    this.position = a.position;
    this.direction = new THREE.Vector3;
    this.direction.subVectors(a.target.position, a.position);
    var c = THREE.Math.clamp(a.intensity, 0, 1);
    this.color = a.color.clone();
    this.color.multiplyScalar(c);
    var c = this.color.getHex(),
    d = new THREE.SphereGeometry(b, 16, 8),
    e = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    f = new THREE.CylinderGeometry(1E-4, 1, 1, 8, 1, !0),
    g = new THREE.Matrix4;
    g.rotateX( - Math.PI / 2);
    g.translate(new THREE.Vector3(0, -0.5, 0));
    f.applyMatrix(g);
    var h = new THREE.MeshBasicMaterial({
        color: c,
        fog: !1
    }),
    g = new THREE.LineBasicMaterial({
        color: c,
        fog: !1
    }),
    i = new THREE.MeshBasicMaterial({
        color: c,
        fog: !1,
        wireframe: !0,
        opacity: 0.3,
        transparent: !0
    });
    this.lightSphere = new THREE.Mesh(d, h);
    this.lightCone = new THREE.Mesh(f, i);
    d = a.distance ? a.distance: 1E4;
    f = 2 * d * Math.tan(0.5 * a.angle);
    this.lightCone.scale.set(f, f, d);
    this.lightRays = new THREE.Line(e, g, THREE.LinePieces);
    this.gyroscope = new THREE.Gyroscope;
    this.gyroscope.add(this.lightSphere);
    this.gyroscope.add(this.lightRays);
    this.add(this.gyroscope);
    this.add(this.lightCone);
    this.lookAt(a.target.position);
    this.lightSphere.properties.isGizmo = !0;
    this.lightSphere.properties.gizmoSubject = a;
    this.lightSphere.properties.gizmoRoot = this;
    this.targetSphere = null;
    void 0 !== a.target.properties.targetInverse && (e = new THREE.SphereGeometry(b, 8, 4), g = new THREE.MeshBasicMaterial({
        color: c,
        wireframe: !0,
        fog: !1
    }), this.targetSphere = new THREE.Mesh(e, g), this.targetSphere.position = a.target.position, this.targetSphere.properties.isGizmo = !0, this.targetSphere.properties.gizmoSubject = a.target, this.targetSphere.properties.gizmoRoot = this.targetSphere, c = new THREE.LineDashedMaterial({
        color: c,
        dashSize: 4,
        gapSize: 4,
        opacity: 0.75,
        transparent: !0,
        fog: !1
    }), e = new THREE.Geometry, e.vertices.push(this.position.clone()), e.vertices.push(this.targetSphere.position.clone()), e.computeLineDistances(), this.targetLine = new THREE.Line(e, c), this.targetLine.properties.isGizmo = !0);
    this.properties.isGizmo = !0
};
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.update = function() {
    this.direction.subVectors(this.light.target.position, this.light.position);
    this.lookAt(this.light.target.position);
    var a = this.light.distance ? this.light.distance: 1E4,
    b = 2 * a * Math.tan(0.5 * this.light.angle);
    this.lightCone.scale.set(b, b, a);
    a = THREE.Math.clamp(this.light.intensity, 0, 1);
    this.color.copy(this.light.color);
    this.color.multiplyScalar(a);
    this.lightSphere.material.color.copy(this.color);
    this.lightRays.material.color.copy(this.color);
    this.lightCone.material.color.copy(this.color);
    null !== this.targetSphere && (this.targetSphere.material.color.copy(this.color), this.targetLine.material.color.copy(this.color), this.targetLine.geometry.vertices[0].copy(this.light.position), this.targetLine.geometry.vertices[1].copy(this.light.target.position), this.targetLine.geometry.computeLineDistances(), this.targetLine.geometry.verticesNeedUpdate = !0)
};
THREE.ImmediateRenderObject = function() {
    THREE.Object3D.call(this);
    this.render = function() {}
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare = function(a, b, c, d, e) {
    THREE.Object3D.call(this);
    this.lensFlares = [];
    this.positionScreen = new THREE.Vector3;
    this.customUpdateCallback = void 0;
    void 0 !== a && this.add(a, b, c, d, e)
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add = function(a, b, c, d, e, f) {
    void 0 === b && (b = -1);
    void 0 === c && (c = 0);
    void 0 === f && (f = 1);
    void 0 === e && (e = new THREE.Color(16777215));
    void 0 === d && (d = THREE.NormalBlending);
    c = Math.min(c, Math.max(0, c));
    this.lensFlares.push({
        texture: a,
        size: b,
        distance: c,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: f,
        color: e,
        blending: d
    })
};
THREE.LensFlare.prototype.updateLensFlares = function() {
    var a, b = this.lensFlares.length,
    c, d = 2 * -this.positionScreen.x,
    e = 2 * -this.positionScreen.y;
    for (a = 0; a < b; a++) c = this.lensFlares[a],
    c.x = this.positionScreen.x + d * c.distance,
    c.y = this.positionScreen.y + e * c.distance,
    c.wantedRotation = 0.25 * c.x * Math.PI,
    c.rotation += 0.25 * (c.wantedRotation - c.rotation)
};
THREE.MorphBlendMesh = function(a, b) {
    THREE.Mesh.call(this, a, b);
    this.animationsMap = {};
    this.animationsList = [];
    var c = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, c - 1, c / 1);
    this.setAnimationWeight("__default", 1)
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation = function(a, b, c, d) {
    b = {
        startFrame: b,
        endFrame: c,
        length: c - b + 1,
        fps: d,
        duration: (c - b) / d,
        lastFrame: 0,
        currentFrame: 0,
        active: !1,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: !1,
        mirroredLoop: !1
    };
    this.animationsMap[a] = b;
    this.animationsList.push(b)
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(a) {
    for (var b = /([a-z]+)(\d+)/,
    c, d = {},
    e = this.geometry,
    f = 0,
    g = e.morphTargets.length; f < g; f++) {
        var h = e.morphTargets[f].name.match(b);
        if (h && 1 < h.length) {
            var i = h[1];
            d[i] || (d[i] = {
                start: Infinity,
                end: -Infinity
            });
            h = d[i];
            f < h.start && (h.start = f);
            f > h.end && (h.end = f);
            c || (c = i)
        }
    }
    for (i in d) h = d[i],
    this.createAnimation(i, h.start, h.end, a);
    this.firstAnimation = c
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(a) {
    if (a = this.animationsMap[a]) a.direction = 1,
    a.directionBackwards = !1
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(a) {
    if (a = this.animationsMap[a]) a.direction = -1,
    a.directionBackwards = !0
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.fps = b, c.duration = (c.end - c.start) / c.fps)
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.duration = b, c.fps = (c.end - c.start) / c.duration)
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.weight = b)
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.time = b)
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function(a) {
    var b = 0;
    if (a = this.animationsMap[a]) b = a.time;
    return b
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function(a) {
    var b = -1;
    if (a = this.animationsMap[a]) b = a.duration;
    return b
};
THREE.MorphBlendMesh.prototype.playAnimation = function(a) {
    var b = this.animationsMap[a];
    b ? (b.time = 0, b.active = !0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphBlendMesh.prototype.stopAnimation = function(a) {
    if (a = this.animationsMap[a]) a.active = !1
};
THREE.MorphBlendMesh.prototype.update = function(a) {
    for (var b = 0,
    c = this.animationsList.length; b < c; b++) {
        var d = this.animationsList[b];
        if (d.active) {
            var e = d.duration / d.length;
            d.time += d.direction * a;
            if (d.mirroredLoop) {
                if (d.time > d.duration || 0 > d.time) d.direction *= -1,
                d.time > d.duration && (d.time = d.duration, d.directionBackwards = !0),
                0 > d.time && (d.time = 0, d.directionBackwards = !1)
            } else d.time %= d.duration,
            0 > d.time && (d.time += d.duration);
            var f = d.startFrame + THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
            g = d.weight;
            f !== d.currentFrame && (this.morphTargetInfluences[d.lastFrame] = 0, this.morphTargetInfluences[d.currentFrame] = 1 * g, this.morphTargetInfluences[f] = 0, d.lastFrame = d.currentFrame, d.currentFrame = f);
            e = d.time % e / e;
            d.directionBackwards && (e = 1 - e);
            this.morphTargetInfluences[d.currentFrame] = e * g;
            this.morphTargetInfluences[d.lastFrame] = (1 - e) * g
        }
    }
};
THREE.LensFlarePlugin = function() {
    function a(a, c) {
        var d = b.createProgram(),
        e = b.createShader(b.FRAGMENT_SHADER),
        f = b.createShader(b.VERTEX_SHADER),
        g = "precision " + c + " float;\n";
        b.shaderSource(e, g + a.fragmentShader);
        b.shaderSource(f, g + a.vertexShader);
        b.compileShader(e);
        b.compileShader(f);
        b.attachShader(d, e);
        b.attachShader(d, f);
        b.linkProgram(d);
        return d
    }
    var b, c, d, e, f, g, h, i, k, l, m, n, s;
    this.init = function(r) {
        b = r.context;
        c = r;
        d = r.getPrecision();
        e = new Float32Array(16);
        f = new Uint16Array(6);
        r = 0;
        e[r++] = -1;
        e[r++] = -1;
        e[r++] = 0;
        e[r++] = 0;
        e[r++] = 1;
        e[r++] = -1;
        e[r++] = 1;
        e[r++] = 0;
        e[r++] = 1;
        e[r++] = 1;
        e[r++] = 1;
        e[r++] = 1;
        e[r++] = -1;
        e[r++] = 1;
        e[r++] = 0;
        e[r++] = 1;
        r = 0;
        f[r++] = 0;
        f[r++] = 1;
        f[r++] = 2;
        f[r++] = 0;
        f[r++] = 2;
        f[r++] = 3;
        g = b.createBuffer();
        h = b.createBuffer();
        b.bindBuffer(b.ARRAY_BUFFER, g);
        b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
        b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
        i = b.createTexture();
        k = b.createTexture();
        b.bindTexture(b.TEXTURE_2D, i);
        b.texImage2D(b.TEXTURE_2D, 0, b.RGB, 16, 16, 0, b.RGB, b.UNSIGNED_BYTE, null);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
        b.bindTexture(b.TEXTURE_2D, k);
        b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 16, 16, 0, b.RGBA, b.UNSIGNED_BYTE, null);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
        0 >= b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? (l = !1, m = a(THREE.ShaderFlares.lensFlare, d)) : (l = !0, m = a(THREE.ShaderFlares.lensFlareVertexTexture, d));
        n = {};
        s = {};
        n.vertex = b.getAttribLocation(m, "position");
        n.uv = b.getAttribLocation(m, "uv");
        s.renderType = b.getUniformLocation(m, "renderType");
        s.map = b.getUniformLocation(m, "map");
        s.occlusionMap = b.getUniformLocation(m, "occlusionMap");
        s.opacity = b.getUniformLocation(m, "opacity");
        s.color = b.getUniformLocation(m, "color");
        s.scale = b.getUniformLocation(m, "scale");
        s.rotation = b.getUniformLocation(m, "rotation");
        s.screenPosition = b.getUniformLocation(m, "screenPosition")
    };
    this.render = function(a, d, e, f) {
        var a = a.__webglFlares,
        v = a.length;
        if (v) {
            var z = new THREE.Vector3,
            t = f / e,
            A = 0.5 * e,
            I = 0.5 * f,
            C = 16 / f,
            x = new THREE.Vector2(C * t, C),
            G = new THREE.Vector3(1, 1, 0),
            J = new THREE.Vector2(1, 1),
            E = s,
            C = n;
            b.useProgram(m);
            b.enableVertexAttribArray(n.vertex);
            b.enableVertexAttribArray(n.uv);
            b.uniform1i(E.occlusionMap, 0);
            b.uniform1i(E.map, 1);
            b.bindBuffer(b.ARRAY_BUFFER, g);
            b.vertexAttribPointer(C.vertex, 2, b.FLOAT, !1, 16, 0);
            b.vertexAttribPointer(C.uv, 2, b.FLOAT, !1, 16, 8);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
            b.disable(b.CULL_FACE);
            b.depthMask(!1);
            var H, B, W, F, K;
            for (H = 0; H < v; H++) if (C = 16 / f, x.set(C * t, C), F = a[H], z.set(F.matrixWorld.elements[12], F.matrixWorld.elements[13], F.matrixWorld.elements[14]), z.applyMatrix4(d.matrixWorldInverse), z.applyProjection(d.projectionMatrix), G.copy(z), J.x = G.x * A + A, J.y = G.y * I + I, l || 0 < J.x && J.x < e && 0 < J.y && J.y < f) {
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, i);
                b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, J.x - 8, J.y - 8, 16, 16, 0);
                b.uniform1i(E.renderType, 0);
                b.uniform2f(E.scale, x.x, x.y);
                b.uniform3f(E.screenPosition, G.x, G.y, G.z);
                b.disable(b.BLEND);
                b.enable(b.DEPTH_TEST);
                b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                b.activeTexture(b.TEXTURE0);
                b.bindTexture(b.TEXTURE_2D, k);
                b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGBA, J.x - 8, J.y - 8, 16, 16, 0);
                b.uniform1i(E.renderType, 1);
                b.disable(b.DEPTH_TEST);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, i);
                b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                F.positionScreen.copy(G);
                F.customUpdateCallback ? F.customUpdateCallback(F) : F.updateLensFlares();
                b.uniform1i(E.renderType, 2);
                b.enable(b.BLEND);
                B = 0;
                for (W = F.lensFlares.length; B < W; B++) K = F.lensFlares[B],
                0.001 < K.opacity && 0.001 < K.scale && (G.x = K.x, G.y = K.y, G.z = K.z, C = K.size * K.scale / f, x.x = C * t, x.y = C, b.uniform3f(E.screenPosition, G.x, G.y, G.z), b.uniform2f(E.scale, x.x, x.y), b.uniform1f(E.rotation, K.rotation), b.uniform1f(E.opacity, K.opacity), b.uniform3f(E.color, K.color.r, K.color.g, K.color.b), c.setBlending(K.blending, K.blendEquation, K.blendSrc, K.blendDst), c.setTexture(K.texture, 1), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0))
            }
            b.enable(b.CULL_FACE);
            b.enable(b.DEPTH_TEST);
            b.depthMask(!0)
        }
    }
};
THREE.ShadowMapPlugin = function() {
    var a, b, c, d, e, f, g = new THREE.Frustum,
    h = new THREE.Matrix4,
    i = new THREE.Vector3,
    k = new THREE.Vector3,
    l = new THREE.Vector3;
    this.init = function(g) {
        a = g.context;
        b = g;
        var g = THREE.ShaderLib.depthRGBA,
        i = THREE.UniformsUtils.clone(g.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: i
        });
        d = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: i,
            morphTargets: !0
        });
        e = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: i,
            skinning: !0
        });
        f = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: i,
            morphTargets: !0,
            skinning: !0
        });
        c._shadowPass = !0;
        d._shadowPass = !0;
        e._shadowPass = !0;
        f._shadowPass = !0
    };
    this.render = function(a, c) {
        b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c)
    };
    this.update = function(m, n) {
        var s, r, p, q, y, v, z, t, A, I = [];
        q = 0;
        a.clearColor(1, 1, 1, 1);
        a.disable(a.BLEND);
        a.enable(a.CULL_FACE);
        a.frontFace(a.CCW);
        b.shadowMapCullFace === THREE.CullFaceFront ? a.cullFace(a.FRONT) : a.cullFace(a.BACK);
        b.setDepthTest(!0);
        s = 0;
        for (r = m.__lights.length; s < r; s++) if (p = m.__lights[s], p.castShadow) if (p instanceof THREE.DirectionalLight && p.shadowCascade) for (y = 0; y < p.shadowCascadeCount; y++) {
            var C;
            if (p.shadowCascadeArray[y]) C = p.shadowCascadeArray[y];
            else {
                A = p;
                z = y;
                C = new THREE.DirectionalLight;
                C.isVirtual = !0;
                C.onlyShadow = !0;
                C.castShadow = !0;
                C.shadowCameraNear = A.shadowCameraNear;
                C.shadowCameraFar = A.shadowCameraFar;
                C.shadowCameraLeft = A.shadowCameraLeft;
                C.shadowCameraRight = A.shadowCameraRight;
                C.shadowCameraBottom = A.shadowCameraBottom;
                C.shadowCameraTop = A.shadowCameraTop;
                C.shadowCameraVisible = A.shadowCameraVisible;
                C.shadowDarkness = A.shadowDarkness;
                C.shadowBias = A.shadowCascadeBias[z];
                C.shadowMapWidth = A.shadowCascadeWidth[z];
                C.shadowMapHeight = A.shadowCascadeHeight[z];
                C.pointsWorld = [];
                C.pointsFrustum = [];
                t = C.pointsWorld;
                v = C.pointsFrustum;
                for (var x = 0; 8 > x; x++) t[x] = new THREE.Vector3,
                v[x] = new THREE.Vector3;
                t = A.shadowCascadeNearZ[z];
                A = A.shadowCascadeFarZ[z];
                v[0].set( - 1, -1, t);
                v[1].set(1, -1, t);
                v[2].set( - 1, 1, t);
                v[3].set(1, 1, t);
                v[4].set( - 1, -1, A);
                v[5].set(1, -1, A);
                v[6].set( - 1, 1, A);
                v[7].set(1, 1, A);
                C.originalCamera = n;
                v = new THREE.Gyroscope;
                v.position = p.shadowCascadeOffset;
                v.add(C);
                v.add(C.target);
                n.add(v);
                p.shadowCascadeArray[y] = C;
                console.log("Created virtualLight", C)
            }
            z = p;
            t = y;
            A = z.shadowCascadeArray[t];
            A.position.copy(z.position);
            A.target.position.copy(z.target.position);
            A.lookAt(A.target);
            A.shadowCameraVisible = z.shadowCameraVisible;
            A.shadowDarkness = z.shadowDarkness;
            A.shadowBias = z.shadowCascadeBias[t];
            v = z.shadowCascadeNearZ[t];
            z = z.shadowCascadeFarZ[t];
            A = A.pointsFrustum;
            A[0].z = v;
            A[1].z = v;
            A[2].z = v;
            A[3].z = v;
            A[4].z = z;
            A[5].z = z;
            A[6].z = z;
            A[7].z = z;
            I[q] = C;
            q++
        } else I[q] = p,
        q++;
        s = 0;
        for (r = I.length; s < r; s++) {
            p = I[s];
            p.shadowMap || (y = THREE.LinearFilter, b.shadowMapType === THREE.PCFSoftShadowMap && (y = THREE.NearestFilter), p.shadowMap = new THREE.WebGLRenderTarget(p.shadowMapWidth, p.shadowMapHeight, {
                minFilter: y,
                magFilter: y,
                format: THREE.RGBAFormat
            }), p.shadowMapSize = new THREE.Vector2(p.shadowMapWidth, p.shadowMapHeight), p.shadowMatrix = new THREE.Matrix4);
            if (!p.shadowCamera) {
                if (p instanceof THREE.SpotLight) p.shadowCamera = new THREE.PerspectiveCamera(p.shadowCameraFov, p.shadowMapWidth / p.shadowMapHeight, p.shadowCameraNear, p.shadowCameraFar);
                else if (p instanceof THREE.DirectionalLight) p.shadowCamera = new THREE.OrthographicCamera(p.shadowCameraLeft, p.shadowCameraRight, p.shadowCameraTop, p.shadowCameraBottom, p.shadowCameraNear, p.shadowCameraFar);
                else {
                    console.error("Unsupported light type for shadow");
                    continue
                }
                m.add(p.shadowCamera);
                b.autoUpdateScene && m.updateMatrixWorld()
            }
            p.shadowCameraVisible && !p.cameraHelper && (p.cameraHelper = new THREE.CameraHelper(p.shadowCamera), p.shadowCamera.add(p.cameraHelper));
            if (p.isVirtual && C.originalCamera == n) {
                y = n;
                q = p.shadowCamera;
                v = p.pointsFrustum;
                A = p.pointsWorld;
                i.set(Infinity, Infinity, Infinity);
                k.set( - Infinity, -Infinity, -Infinity);
                for (z = 0; 8 > z; z++) t = A[z],
                t.copy(v[z]),
                THREE.ShadowMapPlugin.__projector.unprojectVector(t, y),
                t.applyMatrix4(q.matrixWorldInverse),
                t.x < i.x && (i.x = t.x),
                t.x > k.x && (k.x = t.x),
                t.y < i.y && (i.y = t.y),
                t.y > k.y && (k.y = t.y),
                t.z < i.z && (i.z = t.z),
                t.z > k.z && (k.z = t.z);
                q.left = i.x;
                q.right = k.x;
                q.top = k.y;
                q.bottom = i.y;
                q.updateProjectionMatrix()
            }
            q = p.shadowMap;
            v = p.shadowMatrix;
            y = p.shadowCamera;
            y.position.getPositionFromMatrix(p.matrixWorld);
            l.getPositionFromMatrix(p.target.matrixWorld);
            y.lookAt(l);
            y.updateMatrixWorld();
            y.matrixWorldInverse.getInverse(y.matrixWorld);
            p.cameraHelper && (p.cameraHelper.visible = p.shadowCameraVisible);
            p.shadowCameraVisible && p.cameraHelper.update();
            v.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
            v.multiply(y.projectionMatrix);
            v.multiply(y.matrixWorldInverse);
            h.multiplyMatrices(y.projectionMatrix, y.matrixWorldInverse);
            g.setFromMatrix(h);
            b.setRenderTarget(q);
            b.clear();
            A = m.__webglObjects;
            p = 0;
            for (q = A.length; p < q; p++) if (z = A[p], v = z.object, z.render = !1, v.visible && v.castShadow && (!(v instanceof THREE.Mesh || v instanceof THREE.ParticleSystem) || !v.frustumCulled || g.intersectsObject(v))) v._modelViewMatrix.multiplyMatrices(y.matrixWorldInverse, v.matrixWorld),
            z.render = !0;
            p = 0;
            for (q = A.length; p < q; p++) z = A[p],
            z.render && (v = z.object, z = z.buffer, x = v.material instanceof THREE.MeshFaceMaterial ? v.material.materials[0] : v.material, t = 0 < v.geometry.morphTargets.length && x.morphTargets, x = v instanceof THREE.SkinnedMesh && x.skinning, t = v.customDepthMaterial ? v.customDepthMaterial: x ? t ? f: e: t ? d: c, z instanceof THREE.BufferGeometry ? b.renderBufferDirect(y, m.__lights, null, t, z, v) : b.renderBuffer(y, m.__lights, null, t, z, v));
            A = m.__webglObjectsImmediate;
            p = 0;
            for (q = A.length; p < q; p++) z = A[p],
            v = z.object,
            v.visible && v.castShadow && (v._modelViewMatrix.multiplyMatrices(y.matrixWorldInverse, v.matrixWorld), b.renderImmediateObject(y, m.__lights, null, c, v))
        }
        s = b.getClearColor();
        r = b.getClearAlpha();
        a.clearColor(s.r, s.g, s.b, r);
        a.enable(a.BLEND);
        b.shadowMapCullFace === THREE.CullFaceFront && a.cullFace(a.BACK)
    }
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector;
THREE.SpritePlugin = function() {
    function a(a, b) {
        return a.z !== b.z ? b.z - a.z: b.id - a.id
    }
    var b, c, d, e, f, g, h, i, k, l;
    this.init = function(a) {
        b = a.context;
        c = a;
        d = a.getPrecision();
        e = new Float32Array(16);
        f = new Uint16Array(6);
        a = 0;
        e[a++] = -1;
        e[a++] = -1;
        e[a++] = 0;
        e[a++] = 0;
        e[a++] = 1;
        e[a++] = -1;
        e[a++] = 1;
        e[a++] = 0;
        e[a++] = 1;
        e[a++] = 1;
        e[a++] = 1;
        e[a++] = 1;
        e[a++] = -1;
        e[a++] = 1;
        e[a++] = 0;
        e[a++] = 1;
        a = 0;
        f[a++] = 0;
        f[a++] = 1;
        f[a++] = 2;
        f[a++] = 0;
        f[a++] = 2;
        f[a++] = 3;
        g = b.createBuffer();
        h = b.createBuffer();
        b.bindBuffer(b.ARRAY_BUFFER, g);
        b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
        b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
        var a = THREE.ShaderSprite.sprite,
        n = b.createProgram(),
        s = b.createShader(b.FRAGMENT_SHADER),
        r = b.createShader(b.VERTEX_SHADER),
        p = "precision " + d + " float;\n";
        b.shaderSource(s, p + a.fragmentShader);
        b.shaderSource(r, p + a.vertexShader);
        b.compileShader(s);
        b.compileShader(r);
        b.attachShader(n, s);
        b.attachShader(n, r);
        b.linkProgram(n);
        i = n;
        k = {};
        l = {};
        k.position = b.getAttribLocation(i, "position");
        k.uv = b.getAttribLocation(i, "uv");
        l.uvOffset = b.getUniformLocation(i, "uvOffset");
        l.uvScale = b.getUniformLocation(i, "uvScale");
        l.rotation = b.getUniformLocation(i, "rotation");
        l.scale = b.getUniformLocation(i, "scale");
        l.alignment = b.getUniformLocation(i, "alignment");
        l.color = b.getUniformLocation(i, "color");
        l.map = b.getUniformLocation(i, "map");
        l.opacity = b.getUniformLocation(i, "opacity");
        l.useScreenCoordinates = b.getUniformLocation(i, "useScreenCoordinates");
        l.sizeAttenuation = b.getUniformLocation(i, "sizeAttenuation");
        l.screenPosition = b.getUniformLocation(i, "screenPosition");
        l.modelViewMatrix = b.getUniformLocation(i, "modelViewMatrix");
        l.projectionMatrix = b.getUniformLocation(i, "projectionMatrix");
        l.fogType = b.getUniformLocation(i, "fogType");
        l.fogDensity = b.getUniformLocation(i, "fogDensity");
        l.fogNear = b.getUniformLocation(i, "fogNear");
        l.fogFar = b.getUniformLocation(i, "fogFar");
        l.fogColor = b.getUniformLocation(i, "fogColor");
        l.alphaTest = b.getUniformLocation(i, "alphaTest")
    };
    this.render = function(d, e, f, r) {
        var p = d.__webglSprites,
        q = p.length;
        if (q) {
            var y = k,
            v = l,
            z = r / f,
            f = 0.5 * f,
            t = 0.5 * r;
            b.useProgram(i);
            b.enableVertexAttribArray(y.position);
            b.enableVertexAttribArray(y.uv);
            b.disable(b.CULL_FACE);
            b.enable(b.BLEND);
            b.bindBuffer(b.ARRAY_BUFFER, g);
            b.vertexAttribPointer(y.position, 2, b.FLOAT, !1, 16, 0);
            b.vertexAttribPointer(y.uv, 2, b.FLOAT, !1, 16, 8);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
            b.uniformMatrix4fv(v.projectionMatrix, !1, e.projectionMatrix.elements);
            b.activeTexture(b.TEXTURE0);
            b.uniform1i(v.map, 0);
            var A = y = 0,
            I = d.fog;
            I ? (b.uniform3f(v.fogColor, I.color.r, I.color.g, I.color.b), I instanceof THREE.Fog ? (b.uniform1f(v.fogNear, I.near), b.uniform1f(v.fogFar, I.far), b.uniform1i(v.fogType, 1), A = y = 1) : I instanceof THREE.FogExp2 && (b.uniform1f(v.fogDensity, I.density), b.uniform1i(v.fogType, 2), A = y = 2)) : (b.uniform1i(v.fogType, 0), A = y = 0);
            for (var C, x, G = [], I = 0; I < q; I++) C = p[I],
            x = C.material,
            C.visible && 0 !== x.opacity && (x.useScreenCoordinates ? C.z = -C.position.z: (C._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse, C.matrixWorld), C.z = -C._modelViewMatrix.elements[14]));
            p.sort(a);
            for (I = 0; I < q; I++) C = p[I],
            x = C.material,
            C.visible && 0 !== x.opacity && (x.map && x.map.image && x.map.image.width) && (b.uniform1f(v.alphaTest, x.alphaTest), !0 === x.useScreenCoordinates ? (b.uniform1i(v.useScreenCoordinates, 1), b.uniform3f(v.screenPosition, (C.position.x * c.devicePixelRatio - f) / f, (t - C.position.y * c.devicePixelRatio) / t, Math.max(0, Math.min(1, C.position.z))), G[0] = c.devicePixelRatio, G[1] = c.devicePixelRatio) : (b.uniform1i(v.useScreenCoordinates, 0), b.uniform1i(v.sizeAttenuation, x.sizeAttenuation ? 1 : 0), b.uniformMatrix4fv(v.modelViewMatrix, !1, C._modelViewMatrix.elements), G[0] = 1, G[1] = 1), e = d.fog && x.fog ? A: 0, y !== e && (b.uniform1i(v.fogType, e), y = e), e = 1 / (x.scaleByViewport ? r: 1), G[0] *= e * z * C.scale.x, G[1] *= e * C.scale.y, b.uniform2f(v.uvScale, x.uvScale.x, x.uvScale.y), b.uniform2f(v.uvOffset, x.uvOffset.x, x.uvOffset.y), b.uniform2f(v.alignment, x.alignment.x, x.alignment.y), b.uniform1f(v.opacity, x.opacity), b.uniform3f(v.color, x.color.r, x.color.g, x.color.b), b.uniform1f(v.rotation, C.rotation), b.uniform2fv(v.scale, G), c.setBlending(x.blending, x.blendEquation, x.blendSrc, x.blendDst), c.setDepthTest(x.depthTest), c.setDepthWrite(x.depthWrite), c.setTexture(x.map, 0), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
            b.enable(b.CULL_FACE)
        }
    }
};
THREE.DepthPassPlugin = function() {
    this.enabled = !1;
    this.renderTarget = null;
    var a, b, c, d, e, f, g = new THREE.Frustum,
    h = new THREE.Matrix4;
    this.init = function(g) {
        a = g.context;
        b = g;
        var g = THREE.ShaderLib.depthRGBA,
        h = THREE.UniformsUtils.clone(g.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h
        });
        d = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            morphTargets: !0
        });
        e = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            skinning: !0
        });
        f = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            morphTargets: !0,
            skinning: !0
        });
        c._shadowPass = !0;
        d._shadowPass = !0;
        e._shadowPass = !0;
        f._shadowPass = !0
    };
    this.render = function(a, b) {
        this.enabled && this.update(a, b)
    };
    this.update = function(i, k) {
        var l, m, n, s, r, p;
        a.clearColor(1, 1, 1, 1);
        a.disable(a.BLEND);
        b.setDepthTest(!0);
        b.autoUpdateScene && i.updateMatrixWorld();
        k.matrixWorldInverse.getInverse(k.matrixWorld);
        h.multiplyMatrices(k.projectionMatrix, k.matrixWorldInverse);
        g.setFromMatrix(h);
        b.setRenderTarget(this.renderTarget);
        b.clear();
        p = i.__webglObjects;
        l = 0;
        for (m = p.length; l < m; l++) if (n = p[l], r = n.object, n.render = !1, r.visible && (!(r instanceof THREE.Mesh || r instanceof THREE.ParticleSystem) || !r.frustumCulled || g.intersectsObject(r))) r._modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, r.matrixWorld),
        n.render = !0;
        var q;
        l = 0;
        for (m = p.length; l < m; l++) if (n = p[l], n.render && (r = n.object, n = n.buffer, !(r instanceof THREE.ParticleSystem) || r.customDepthMaterial))(q = r.material instanceof THREE.MeshFaceMaterial ? r.material.materials[0] : r.material) && b.setMaterialFaces(r.material),
        s = 0 < r.geometry.morphTargets.length && q.morphTargets,
        q = r instanceof THREE.SkinnedMesh && q.skinning,
        s = r.customDepthMaterial ? r.customDepthMaterial: q ? s ? f: e: s ? d: c,
        n instanceof THREE.BufferGeometry ? b.renderBufferDirect(k, i.__lights, null, s, n, r) : b.renderBuffer(k, i.__lights, null, s, n, r);
        p = i.__webglObjectsImmediate;
        l = 0;
        for (m = p.length; l < m; l++) n = p[l],
        r = n.object,
        r.visible && (r._modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, r.matrixWorld), b.renderImmediateObject(k, i.__lights, null, c, r));
        l = b.getClearColor();
        m = b.getClearAlpha();
        a.clearColor(l.r, l.g, l.b, m);
        a.enable(a.BLEND)
    }
};
THREE.ShaderFlares = {
    lensFlareVertexTexture: {
        vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    },
    lensFlare: {
        vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    }
};
THREE.ShaderSprite = {
    sprite: {
        vertexShader: "uniform int useScreenCoordinates;\nuniform int sizeAttenuation;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader: "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"
    }
};