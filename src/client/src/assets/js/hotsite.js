
! function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(i) {
        return t(i, e, e.document, e.Math)
    }) : "object" == typeof exports && exports ? module.exports = t(require("jquery"), e, e.document, e.Math) : t(jQuery, e, e.document, e.Math)
}("undefined" != typeof window ? window : this, function(e, t, i, n, r) {
    "use strict";
    var o = "fullpage-wrapper",
        a = "." + o,
        s = "dpat-responsive",
        l = "dpat-notransition",
        h = "dpat-destroyed",
        c = "dpat-enabled",
        u = "dpat-viewing",
        f = "active",
        d = "." + f,
        E = "dpat-completely",
        p = "." + E,
        m = "dpat-section",
        v = "." + m,
        g = v + d,
        T = v + ":first",
        y = v + ":last",
        R = "dpat-tableCell",
        x = "." + R,
        _ = "dpat-auto-height",
        b = "dpat-normal-scroll",
        H = "dpat-nav",
        w = "#" + H,
        M = "dpat-tooltip",
        S = "." + M,
        A = "dpat-show-active",
        C = "dpat-slide",
        L = "." + C,
        F = L + d,
        z = "dpat-slides",
        V = "." + z,
        U = "dpat-slidesContainer",
        B = "." + U,
        k = "dpat-table",
        D = "dpat-slidesNav",
        P = "." + D,
        N = P + " a",
        I = ".dpat-controlArrow",
        O = "dpat-prev",
        W = "dpat-controlArrow " + O,
        j = I + "." + O,
        G = "dpat-controlArrow dpat-next",
        X = I + ".dpat-next",
        Y = e(t),
        q = e(i);
    e.fn.fullpage = function(K) {
        function Q(t, i) {
            t || Vt(0), Dt("autoScrolling", t, i);
            var n = e(g);
            K.autoScrolling && !K.scrollBar ? (It.css({
                overflow: "hidden",
                height: "100%"
            }), Z(di.recordHistory, "internal"), Zt.css({
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), n.length && Vt(n.position().top)) : (It.css({
                overflow: "visible",
                height: "initial"
            }), Z(!1, "internal"), Zt.css({
                "-ms-touch-action": "",
                "touch-action": ""
            }), n.length && It.scrollTop(n.position().top))
        }

        function Z(e, t) {
            Dt("recordHistory", e, t)
        }

        function J(e, t) {
            Dt("scrollingSpeed", e, t)
        }

        function $(e, t) {
            Dt("fitToSection", e, t)
        }

        function ee(e) {
            e ? (Mt(), St()) : (wt(), At())
        }

        function te(t, i) {
            void 0 !== i ? (i = i.replace(/ /g, "").split(","), e.each(i, function(e, i) {
                Bt(t, i, "m")
            })) : (Bt(t, "all", "m"), t ? (ee(!0), Ct()) : (ee(!1), Lt()))
        }

        function ie(t, i) {
            void 0 !== i ? (i = i.replace(/ /g, "").split(","), e.each(i, function(e, i) {
                Bt(t, i, "k")
            })) : (Bt(t, "all", "k"), K.keyboardScrolling = t)
        }

        function ne() {
            var t = e(g).prev(v);
            t.length || !K.loopTop && !K.continuousVertical || (t = e(v).last()), t.length && Be(t, null, !0)
        }

        function re() {
            var t = e(g).next(v);
            t.length || !K.loopBottom && !K.continuousVertical || (t = e(v).first()), t.length && Be(t, null, !1)
        }

        function oe(e, t) {
            J(0, "internal"), ae(e, t), J(di.scrollingSpeed, "internal")
        }

        function ae(e, t) {
            var i = vt(e);
            void 0 !== t ? Tt(e, t) : i.length > 0 && Be(i)
        }

        function se(e) {
            ze("right", e)
        }

        function le(e) {
            ze("left", e)
        }

        function he(t) {
            if (!Zt.hasClass(h)) {
                $t = !0, Jt = Y.height(), e(v).each(function() {
                    var t = e(this).find(V),
                        i = e(this).find(L);
                    K.verticalCentered && e(this).find(x).css("height", pt(e(this)) + "px"), e(this).css("height", Jt + "px"), i.length > 1 && tt(t, t.find(F))
                }), K.scrollOverflow && ri.createScrollBarForAll();
                var i = e(g).index(v);
                i && oe(i + 1), $t = !1, e.isFunction(K.afterResize) && t && K.afterResize.call(Zt), e.isFunction(K.afterReBuild) && !t && K.afterReBuild.call(Zt)
            }
        }

        function ce(t) {
            var i = Ot.hasClass(s);
            t ? i || (Q(!1, "internal"), $(!1, "internal"), e(w).hide(), Ot.addClass(s), e.isFunction(K.afterResponsive) && K.afterResponsive.call(Zt, t)) : i && (Q(di.autoScrolling, "internal"), $(di.autoScrolling, "internal"), e(w).show(), Ot.removeClass(s), e.isFunction(K.afterResponsive) && K.afterResponsive.call(Zt, t))
        }

        function ue(t, i, n) {
            var r = 100 * n,
                o = 100 / n;
            i.wrapAll('<div class="' + U + '" />'), i.parent().wrap('<div class="' + z + '" />'), t.find(B).css("width", r + "%"), n > 1 && (K.controlArrows && pe(t), K.slidesNavigation && Rt(t, n)), i.each(function(t) {
                e(this).css("width", o + "%"), K.verticalCentered && Et(e(this))
            });
            var a = t.find(F);
            a.length && (0 !== e(g).index(v) || 0 === e(g).index(v) && 0 !== a.index()) ? zt(a, "internal") : i.eq(0).addClass(f)
        }

        function fe(t, i) {
            i || 0 !== e(g).length || t.addClass(f), Yt = e(g), t.css("height", Jt + "px"), K.paddingTop && t.css("padding-top", K.paddingTop), K.paddingBottom && t.css("padding-bottom", K.paddingBottom), void 0 !== K.sectionsColor[i] && t.css("background-color", K.sectionsColor[i]), void 0 !== K.anchors[i] && t.attr("data-anchor", K.anchors[i])
        }

        function de(t, i) {
            void 0 !== K.anchors[i] && t.hasClass(f) && ut(K.anchors[i], i), K.menu && K.css3 && e(K.menu).closest(a).length && e(K.menu).appendTo(Ot)
        }

        function Ee() {
            Zt.find(K.sectionSelector).addClass(m), Zt.find(K.slideSelector).addClass(C)
        }

        function pe(e) {
            e.find(V).after('<div class="' + W + '"></div><div class="' + G + '"></div>'), "#fff" != K.controlArrowColor && (e.find(X).css("border-color", "transparent transparent transparent " + K.controlArrowColor), e.find(j).css("border-color", "transparent " + K.controlArrowColor + " transparent transparent")), K.loopHorizontal || e.find(j).hide()
        }

        function me() {
            Ot.append('<div id="' + H + '"><ul></ul></div>');
            var t = e(w);
            t.addClass(function() {
                return K.showActiveTooltip ? A + " " + K.navigationPosition : K.navigationPosition
            });
            for (var i = 0; i < e(v).length; i++) {
                var n = "";
                K.anchors.length && (n = K.anchors[i]);
                var r = '<li><a href="#' + n + '"><span></span></a>',
                    o = K.navigationTooltips[i];
                void 0 !== o && "" !== o && (r += '<div class="' + M + " " + K.navigationPosition + '">' + o + "</div>"), r += "</li>", t.find("ul").append(r)
            }
            e(w).css("margin-top", "-" + e(w).height() / 2 + "px"), e(w).find("li").eq(e(g).index(v)).find("a").addClass(f)
        }

        function ve() {
            Zt.find('iframe[src*="youtube.com/embed/"]').each(function() {
                ge(e(this), "enablejsapi=1")
            })
        }

        function ge(e, t) {
            var i = e.attr("src");
            e.attr("src", i + Te(i) + t)
        }

        function Te(e) {
            return /\?/.test(e) ? "&" : "?"
        }

        function ye() {
            var t = e(g);
            t.addClass(E), We(t), je(t), K.scrollOverflow && K.scrollOverflowHandler.afterLoad(), Re() && e.isFunction(K.afterLoad) && K.afterLoad.call(t, t.data("anchor"), t.index(v) + 1), e.isFunction(K.afterRender) && K.afterRender.call(Zt)
        }

        function Re() {
            var e = vt(Qe().section);
            return !e.length || e.length && e.index() === Yt.index()
        }

        function xe() {
            var t;
            if (!K.autoScrolling || K.scrollBar) {
                var n = Y.scrollTop(),
                    r = He(n),
                    o = 0,
                    a = n + Y.height() / 2,
                    s = Ot.height() - Y.height() === n,
                    l = i.querySelectorAll(v);
                if (s) o = l.length - 1;
                else if (n)
                    for (var h = 0; h < l.length; ++h) l[h].offsetTop <= a && (o = h);
                else o = 0;
                if (be(r) && (e(g).hasClass(E) || e(g).addClass(E).siblings().removeClass(E)), !(t = e(l).eq(o)).hasClass(f)) {
                    Ei = !0;
                    var c, u, d = e(g),
                        p = d.index(v) + 1,
                        m = ft(t),
                        T = t.data("anchor"),
                        y = t.index(v) + 1,
                        R = t.find(F);
                    R.length && (u = R.data("anchor"), c = R.index()), ti && (t.addClass(f).siblings().removeClass(f), e.isFunction(K.onLeave) && K.onLeave.call(d, p, y, m), e.isFunction(K.afterLoad) && K.afterLoad.call(t, T, y), Xe(d), We(t), je(t), ut(T, y - 1), K.anchors.length && (jt = T), xt(c, u, T, y)), clearTimeout(li), li = setTimeout(function() {
                        Ei = !1
                    }, 100)
                }
                K.fitToSection && (clearTimeout(hi), hi = setTimeout(function() {
                    K.fitToSection && e(g).outerHeight() <= Jt && _e()
                }, K.fitToSectionDelay))
            }
        }

        function _e() {
            ti && ($t = !0, Be(e(g)), $t = !1)
        }

        function be(t) {
            var i = e(g).position().top,
                n = i + Y.height();
            return "up" == t ? n >= Y.scrollTop() + Y.height() : i <= Y.scrollTop()
        }

        function He(e) {
            var t = e > pi ? "down" : "up";
            return pi = e, Ri = e, t
        }

        function we(t) {
            if (ni.m[t]) {
                var i = "down" === t ? re : ne;
                if (K.scrollOverflow) {
                    var n = K.scrollOverflowHandler.scrollable(e(g)),
                        r = "down" === t ? "bottom" : "top";
                    if (n.length > 0) {
                        if (!K.scrollOverflowHandler.isScrolled(r, n)) return !0;
                        i()
                    } else i()
                } else i()
            }
        }

        function Me(e) {
            var t = e.originalEvent;
            K.autoScrolling && Ae(t) && e.preventDefault()
        }

        function Se(t) {
            var i = t.originalEvent,
                r = e(i.target).closest(v);
            if (Ae(i)) {
                K.autoScrolling && t.preventDefault();
                var o = Ft(i);
                gi = o.y, Ti = o.x, r.find(V).length && n.abs(vi - Ti) > n.abs(mi - gi) ? !qt && n.abs(vi - Ti) > Y.outerWidth() / 100 * K.touchSensitivity && (vi > Ti ? ni.m.right && se(r) : ni.m.left && le(r)) : K.autoScrolling && ti && n.abs(mi - gi) > Y.height() / 100 * K.touchSensitivity && (mi > gi ? we("down") : gi > mi && we("up"))
            }
        }

        function Ae(e) {
            return void 0 === e.pointerType || "mouse" != e.pointerType
        }

        function Ce(e) {
            var t = e.originalEvent;
            if (K.fitToSection && It.stop(), Ae(t)) {
                var i = Ft(t);
                mi = i.y, vi = i.x
            }
        }

        function Le(e, t) {
            for (var i = 0, r = e.slice(n.max(e.length - t, 1)), o = 0; o < r.length; o++) i += r[o];
            return n.ceil(i / t)
        }

        function Fe(i) {
            var r = (new Date).getTime(),
                o = e(p).hasClass(b);
            if (K.autoScrolling && !Xt && !o) {
                var a = (i = i || t.event).wheelDelta || -i.deltaY || -i.detail,
                    s = n.max(-1, n.min(1, a)),
                    l = void 0 !== i.wheelDeltaX || void 0 !== i.deltaX,
                    h = n.abs(i.wheelDeltaX) < n.abs(i.wheelDelta) || n.abs(i.deltaX) < n.abs(i.deltaY) || !l;
                ii.length > 149 && ii.shift(), ii.push(n.abs(a)), K.scrollBar && (i.preventDefault ? i.preventDefault() : i.returnValue = !1);
                var c = r - yi;
                return yi = r, c > 200 && (ii = []), ti && Le(ii, 10) >= Le(ii, 70) && h && we(s < 0 ? "down" : "up"), !1
            }
            K.fitToSection && It.stop()
        }

        function ze(t, i) {
            var n = (void 0 === i ? e(g) : i).find(V),
                r = n.find(L).length;
            if (!(!n.length || qt || r < 2)) {
                var o = n.find(F),
                    a = null;
                if (!(a = "left" === t ? o.prev(L) : o.next(L)).length) {
                    if (!K.loopHorizontal) return;
                    a = "left" === t ? o.siblings(":last") : o.siblings(":first")
                }
                qt = !0, tt(n, a, t)
            }
        }

        function Ve() {
            e(F).each(function() {
                zt(e(this), "internal")
            })
        }

        function Ue(e) {
            var t = e.position(),
                i = t.top,
                n = t.top > Ri,
                r = i - Jt + e.outerHeight(),
                o = K.bigSectionsDestination;
            return e.outerHeight() > Jt ? (n || o) && "bottom" !== o || (i = r) : (n || $t && e.is(":last-child")) && (i = r), Ri = i, i
        }

        function Be(t, i, n) {
            if (void 0 !== t) {
                var r, o, a = {
                    element: t,
                    callback: i,
                    isMovementUp: n,
                    dtop: Ue(t),
                    yMovement: ft(t),
                    anchorLink: t.data("anchor"),
                    sectionIndex: t.index(v),
                    activeSlide: t.find(F),
                    activeSection: e(g),
                    leavingSection: e(g).index(v) + 1,
                    localIsResizing: $t
                };
                a.activeSection.is(t) && !$t || K.scrollBar && Y.scrollTop() === a.dtop && !t.hasClass(_) || (a.activeSlide.length && (r = a.activeSlide.data("anchor"), o = a.activeSlide.index()), e.isFunction(K.onLeave) && !a.localIsResizing && !1 === K.onLeave.call(a.activeSection, a.leavingSection, a.sectionIndex + 1, a.yMovement) || (K.autoScrolling && K.continuousVertical && void 0 !== a.isMovementUp && (!a.isMovementUp && "up" == a.yMovement || a.isMovementUp && "down" == a.yMovement) && (a = Pe(a)), a.localIsResizing || Xe(a.activeSection), K.scrollOverflow && K.scrollOverflowHandler.beforeLeave(), t.addClass(f).siblings().removeClass(f), We(t), K.scrollOverflow && K.scrollOverflowHandler.onLeave(), ti = !1, xt(o, r, a.anchorLink, a.sectionIndex), ke(a), jt = a.anchorLink, ut(a.anchorLink, a.sectionIndex)))
            }
        }

        function ke(t) {
            if (K.css3 && K.autoScrolling && !K.scrollBar) mt("translate3d(0px, -" + n.round(t.dtop) + "px, 0px)", !0), K.scrollingSpeed ? (clearTimeout(ai), ai = setTimeout(function() {
                Ie(t)
            }, K.scrollingSpeed)) : Ie(t);
            else {
                var i = De(t);
                e(i.element).animate(i.options, K.scrollingSpeed, K.easing).promise().done(function() {
                    K.scrollBar ? setTimeout(function() {
                        Ie(t)
                    }, 30) : Ie(t)
                })
            }
        }

        function De(e) {
            var t = {};
            return K.autoScrolling && !K.scrollBar ? (t.options = {
                top: -e.dtop
            }, t.element = a) : (t.options = {
                scrollTop: e.dtop
            }, t.element = "html, body"), t
        }

        function Pe(t) {
            return t.isMovementUp ? e(g).before(t.activeSection.nextAll(v)) : e(g).after(t.activeSection.prevAll(v).get().reverse()), Vt(e(g).position().top), Ve(), t.wrapAroundElements = t.activeSection, t.dtop = t.element.position().top, t.yMovement = ft(t.element), t.leavingSection = t.activeSection.index(v) + 1, t.sectionIndex = t.element.index(v), t
        }

        function Ne(t) {
            t.wrapAroundElements && t.wrapAroundElements.length && (t.isMovementUp ? e(T).before(t.wrapAroundElements) : e(y).after(t.wrapAroundElements), Vt(e(g).position().top), Ve())
        }

        function Ie(t) {
            Ne(t), e.isFunction(K.afterLoad) && !t.localIsResizing && K.afterLoad.call(t.element, t.anchorLink, t.sectionIndex + 1), K.scrollOverflow && K.scrollOverflowHandler.afterLoad(), t.localIsResizing || je(t.element), t.element.addClass(E).siblings().removeClass(E), ti = !0, e.isFunction(t.callback) && t.callback.call(this)
        }

        function Oe(e, t) {
            e.attr(t, e.data(t)).removeAttr("data-" + t)
        }

        function We(t) {
            if (K.lazyLoading) {
                var i;
                Ye(t).find("img[data-src], img[data-srcset], source[data-src], video[data-src], audio[data-src], iframe[data-src]").each(function() {
                    if (i = e(this), e.each(["src", "srcset"], function(e, t) {
                        var n = i.attr("data-" + t);
                        void 0 !== n && n && Oe(i, t)
                    }), i.is("source")) {
                        var t = i.closest("video").length ? "video" : "audio";
                        i.closest(t).get(0).load()
                    }
                })
            }
        }

        function je(t) {
            var i = Ye(t);
            i.find("video, audio").each(function() {
                var t = e(this).get(0);
                t.hasAttribute("data-autoplay") && "function" == typeof t.play && t.play()
            }), i.find('iframe[src*="youtube.com/embed/"]').each(function() {
                var t = e(this).get(0);
                t.hasAttribute("data-autoplay") && Ge(t), t.onload = function() {
                    t.hasAttribute("data-autoplay") && Ge(t)
                }
            })
        }

        function Ge(e) {
            e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }

        function Xe(t) {
            var i = Ye(t);
            i.find("video, audio").each(function() {
                var t = e(this).get(0);
                t.hasAttribute("data-keepplaying") || "function" != typeof t.pause || t.pause()
            }), i.find('iframe[src*="youtube.com/embed/"]').each(function() {
                var t = e(this).get(0);
                /youtube\.com\/embed\//.test(e(this).attr("src")) && !t.hasAttribute("data-keepplaying") && e(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
            })
        }

        function Ye(t) {
            var i = t.find(F);
            return i.length && (t = e(i)), t
        }

        function qe() {
            var e = Qe(),
                t = e.section,
                i = e.slide;
            t && (K.animateAnchor ? Tt(t, i) : oe(t, i))
        }

        function Ke() {
            if (!Ei && !K.lockAnchors) {
                var e = Qe(),
                    t = e.section,
                    i = e.slide,
                    n = void 0 === jt,
                    r = void 0 === jt && void 0 === i && !qt;
                t.length && (t && t !== jt && !n || r || !qt && Gt != i) && Tt(t, i)
            }
        }

        function Qe() {
            var e = t.location.hash,
                i = e.replace("#", "").split("/"),
                n = e.indexOf("#/") > -1;
            return {
                section: n ? "/" + i[1] : decodeURIComponent(i[0]),
                slide: n ? decodeURIComponent(i[2]) : decodeURIComponent(i[1])
            }
        }

        function Ze(e) {
            2 == e.which && (xi = e.pageY, Zt.on("mousemove", et))
        }

        function Je(e) {
            2 == e.which && Zt.off("mousemove")
        }

        function $e(t) {
            var i = t.shiftKey;
            if (ti || !([37, 39].indexOf(t.which) < 0)) switch (t.which) {
                case 38:
                case 33:
                    ni.k.up && ne();
                    break;
                case 32:
                    if (i && ni.k.up) {
                        ne();
                        break
                    }
                case 40:
                case 34:
                    ni.k.down && re();
                    break;
                case 36:
                    ni.k.up && ae(1);
                    break;
                case 35:
                    ni.k.down && ae(e(v).length);
                    break;
                case 37:
                    ni.k.left && le();
                    break;
                case 39:
                    ni.k.right && se();
                    break;
                default:
                    return
            }
        }

        function et(e) {
            ti && (e.pageY < xi && ni.m.up ? ne() : e.pageY > xi && ni.m.down && re()), xi = e.pageY
        }

        function tt(t, i, n) {
            var r = t.closest(v),
                o = {
                    slides: t,
                    destiny: i,
                    direction: n,
                    destinyPos: i.position(),
                    slideIndex: i.index(),
                    section: r,
                    sectionIndex: r.index(v),
                    anchorLink: r.data("anchor"),
                    slidesNav: r.find(P),
                    slideAnchor: bt(i),
                    prevSlide: r.find(F),
                    prevSlideIndex: r.find(F).index(),
                    localIsResizing: $t
                };
            o.xMovement = dt(o.prevSlideIndex, o.slideIndex), o.localIsResizing || (ti = !1), K.onSlideLeave && !o.localIsResizing && "none" !== o.xMovement && e.isFunction(K.onSlideLeave) && !1 === K.onSlideLeave.call(o.prevSlide, o.anchorLink, o.sectionIndex + 1, o.prevSlideIndex, o.direction, o.slideIndex) ? qt = !1 : (i.addClass(f).siblings().removeClass(f), o.localIsResizing || (Xe(o.prevSlide), We(i)), !K.loopHorizontal && K.controlArrows && (r.find(j).toggle(0 !== o.slideIndex), r.find(X).toggle(!i.is(":last-child"))), r.hasClass(f) && !o.localIsResizing && xt(o.slideIndex, o.slideAnchor, o.anchorLink, o.sectionIndex), nt(t, o, !0))
        }

        function it(t) {
            rt(t.slidesNav, t.slideIndex), t.localIsResizing || (e.isFunction(K.afterSlideLoad) && K.afterSlideLoad.call(t.destiny, t.anchorLink, t.sectionIndex + 1, t.slideAnchor, t.slideIndex), ti = !0, je(t.destiny)), qt = !1
        }

        function nt(e, t, i) {
            var r = t.destinyPos;
            if (K.css3) {
                var o = "translate3d(-" + n.round(r.left) + "px, 0px, 0px)";
                st(e.find(B)).css(Ut(o)), si = setTimeout(function() {
                    i && it(t)
                }, K.scrollingSpeed, K.easing)
            } else e.animate({
                scrollLeft: n.round(r.left)
            }, K.scrollingSpeed, K.easing, function() {
                i && it(t)
            })
        }

        function rt(e, t) {
            e.find(d).removeClass(f), e.find("li").eq(t).find("a").addClass(f)
        }

        function ot() {
            if (at(), Kt) {
                var t = e(i.activeElement);
                if (!t.is("textarea") && !t.is("input") && !t.is("select")) {
                    var r = Y.height();
                    n.abs(r - _i) > 20 * n.max(_i, r) / 100 && (he(!0), _i = r)
                }
            } else clearTimeout(oi), oi = setTimeout(function() {
                he(!0)
            }, 350)
        }

        function at() {
            var e = K.responsive || K.responsiveWidth,
                t = K.responsiveHeight,
                i = e && Y.outerWidth() < e,
                n = t && Y.height() < t;
            e && t ? ce(i || n) : e ? ce(i) : t && ce(n)
        }

        function st(e) {
            var t = "all " + K.scrollingSpeed + "ms " + K.easingcss3;
            return e.removeClass(l), e.css({
                "-webkit-transition": t,
                transition: t
            })
        }

        function lt(e) {
            return e.addClass(l)
        }

        function ht(t, i) {
            K.navigation && (e(w).find(d).removeClass(f), t ? e(w).find('a[href="#' + t + '"]').addClass(f) : e(w).find("li").eq(i).find("a").addClass(f))
        }

        function ct(t) {
            K.menu && (e(K.menu).find(d).removeClass(f), e(K.menu).find('[data-menuanchor="' + t + '"]').addClass(f))
        }

        function ut(e, t) {
            ct(e), ht(e, t)
        }

        function ft(t) {
            var i = e(g).index(v),
                n = t.index(v);
            return i == n ? "none" : i > n ? "up" : "down"
        }

        function dt(e, t) {
            return e == t ? "none" : e > t ? "left" : "right"
        }

        function Et(e) {
            e.hasClass(k) || e.addClass(k).wrapInner('<div class="' + R + '" style="height:' + pt(e) + 'px;" />')
        }

        function pt(e) {
            var t = Jt;
            if (K.paddingTop || K.paddingBottom) {
                var i = e;
                i.hasClass(m) || (i = e.closest(v));
                var n = parseInt(i.css("padding-top")) + parseInt(i.css("padding-bottom"));
                t = Jt - n
            }
            return t
        }

        function mt(e, t) {
            t ? st(Zt) : lt(Zt), Zt.css(Ut(e)), setTimeout(function() {
                Zt.removeClass(l)
            }, 10)
        }

        function vt(t) {
            if (!t) return [];
            var i = Zt.find(v + '[data-anchor="' + t + '"]');
            return i.length || (i = e(v).eq(t - 1)), i
        }

        function gt(e, t) {
            var i = t.find(V),
                n = i.find(L + '[data-anchor="' + e + '"]');
            return n.length || (n = i.find(L).eq(e)), n
        }

        function Tt(e, t) {
            var i = vt(e);
            i.length && (void 0 === t && (t = 0), e === jt || i.hasClass(f) ? yt(i, t) : Be(i, function() {
                yt(i, t)
            }))
        }

        function yt(e, t) {
            if (void 0 !== t) {
                var i = e.find(V),
                    n = gt(t, e);
                n.length && tt(i, n)
            }
        }

        function Rt(e, t) {
            e.append('<div class="' + D + '"><ul></ul></div>');
            var i = e.find(P);
            i.addClass(K.slidesNavPosition);
            for (var n = 0; n < t; n++) i.find("ul").append('<li><a href="#"><span></span></a></li>');
            i.css("margin-left", "-" + i.width() / 2 + "px"), i.find("li").first().find("a").addClass(f)
        }

        function xt(e, t, i, n) {
            var r = "";
            K.anchors.length && !K.lockAnchors && (e ? (void 0 !== i && (r = i), void 0 === t && (t = e), Gt = t, _t(r + "/" + t)) : void 0 !== e ? (Gt = t, _t(i)) : _t(i)), Ht()
        }

        function _t(e) {
            if (K.recordHistory) location.hash = e;
            else if (Kt || Qt) t.history.replaceState(r, r, "#" + e);
            else {
                var i = t.location.href.split("#")[0];
                t.location.replace(i + "#" + e)
            }
        }

        function bt(e) {
            var t = e.data("anchor"),
                i = e.index();
            return void 0 === t && (t = i), t
        }

        function Ht() {
            var t = e(g),
                i = t.find(F),
                n = bt(t),
                r = bt(i),
                o = String(n);
            i.length && (o = o + "-" + r), o = o.replace("/", "-").replace("#", "");
            var a = new RegExp("\\b\\s?" + u + "-[^\\s]+\\b", "g");
            Ot[0].className = Ot[0].className.replace(a, ""), Ot.addClass(u + "-" + o)
        }

        function wt() {
            i.addEventListener ? (i.removeEventListener("mousewheel", Fe, !1), i.removeEventListener("wheel", Fe, !1), i.removeEventListener("MozMousePixelScroll", Fe, !1)) : i.detachEvent("onmousewheel", Fe)
        }

        function Mt() {
            var e, n = "";
            t.addEventListener ? e = "addEventListener" : (e = "attachEvent", n = "on");
            var o = "onwheel" in i.createElement("div") ? "wheel" : i.onmousewheel !== r ? "mousewheel" : "DOMMouseScroll";
            "DOMMouseScroll" == o ? i[e](n + "MozMousePixelScroll", Fe, !1) : i[e](n + o, Fe, !1)
        }

        function St() {
            Zt.on("mousedown", Ze).on("mouseup", Je)
        }

        function At() {
            Zt.off("mousedown", Ze).off("mouseup", Je)
        }

        function Ct() {
            (Kt || Qt) && (K.autoScrolling && Ot.off(fi.touchmove).on(fi.touchmove, Me), e(a).off(fi.touchstart).on(fi.touchstart, Ce).off(fi.touchmove).on(fi.touchmove, Se))
        }

        function Lt() {
            (Kt || Qt) && (K.autoScrolling && Ot.off(fi.touchmove), e(a).off(fi.touchstart).off(fi.touchmove))
        }

        function Ft(e) {
            var t = [];
            return t.y = void 0 !== e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = void 0 !== e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, Qt && Ae(e) && K.scrollBar && (t.y = e.touches[0].pageY, t.x = e.touches[0].pageX), t
        }

        function zt(e, t) {
            J(0, "internal"), void 0 !== t && ($t = !0), tt(e.closest(V), e), void 0 !== t && ($t = !1), J(di.scrollingSpeed, "internal")
        }

        function Vt(e) {
            var t = n.round(e);
            K.css3 && K.autoScrolling && !K.scrollBar ? mt("translate3d(0px, -" + t + "px, 0px)", !1) : K.autoScrolling && !K.scrollBar ? Zt.css("top", -t) : It.scrollTop(t)
        }

        function Ut(e) {
            return {
                "-webkit-transform": e,
                "-moz-transform": e,
                "-ms-transform": e,
                transform: e
            }
        }

        function Bt(t, i, n) {
            "all" !== i ? ni[n][i] = t : e.each(Object.keys(ni[n]), function(e, i) {
                ni[n][i] = t
            })
        }

        function kt() {
            Vt(0), Zt.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function() {
                Oe(e(this), "src")
            }), Zt.find("img[data-srcset]").each(function() {
                Oe(e(this), "srcset")
            }), e(w + ", " + P + ", " + I).remove(), e(v).css({
                height: "",
                "background-color": "",
                padding: ""
            }), e(L).css({
                width: ""
            }), Zt.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            }), It.css({
                overflow: "",
                height: ""
            }), e("html").removeClass(c), Ot.removeClass(s), e.each(Ot.get(0).className.split(/\s+/), function(e, t) {
                0 === t.indexOf(u) && Ot.removeClass(t)
            }), e(v + ", " + L).each(function() {
                K.scrollOverflowHandler && K.scrollOverflowHandler.remove(e(this)), e(this).removeClass(k + " " + f)
            }), lt(Zt), Zt.find(x + ", " + B + ", " + V).each(function() {
                e(this).replaceWith(this.childNodes)
            }), Zt.css({
                "-webkit-transition": "none",
                transition: "none"
            }), It.scrollTop(0);
            var t = [m, C, U];
            e.each(t, function(t, i) {
                e("." + i).removeClass(i)
            })
        }

        function Dt(e, t, i) {
            K[e] = t, "internal" !== i && (di[e] = t)
        }

        function Pt() {
            var t = ["fadingEffect", "continuousHorizontal", "scrollHorizontally", "interlockedSlides", "resetSliders", "responsiveSlides", "offsetSections", "dragAndMove", "scrollOverflowReset", "parallax"];
            e("html").hasClass(c) ? Nt("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (K.continuousVertical && (K.loopTop || K.loopBottom) && (K.continuousVertical = !1, Nt("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), K.scrollBar && K.scrollOverflow && Nt("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), !K.continuousVertical || !K.scrollBar && K.autoScrolling || (K.continuousVertical = !1, Nt("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), K.scrollOverflow && !K.scrollOverflowHandler && (K.scrollOverflow = !1, Nt("error", "The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.")), e.each(t, function(e, t) {
                K[t] && Nt("warn", "fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: " + t)
            }), e.each(K.anchors, function(t, i) {
                var n = q.find("[name]").filter(function() {
                        return e(this).attr("name") && e(this).attr("name").toLowerCase() == i.toLowerCase()
                    }),
                    r = q.find("[id]").filter(function() {
                        return e(this).attr("id") && e(this).attr("id").toLowerCase() == i.toLowerCase()
                    });
                (r.length || n.length) && (Nt("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), r.length && Nt("error", '"' + i + '" is is being used by another element `id` property'), n.length && Nt("error", '"' + i + '" is is being used by another element `name` property'))
            }))
        }

        function Nt(e, t) {
            console && console[e] && console[e]("fullPage: " + t)
        }
        if (e("html").hasClass(c)) Pt();
        else {
            var It = e("html, body"),
                Ot = e("body"),
                Wt = e.fn.fullpage;
            K = e.extend({
                menu: !1,
                anchors: [],
                lockAnchors: !1,
                navigation: !1,
                navigationPosition: "right",
                navigationTooltips: [],
                showActiveTooltip: !1,
                slidesNavigation: !1,
                slidesNavPosition: "bottom",
                scrollBar: !1,
                hybrid: !1,
                css3: !0,
                scrollingSpeed: 700,
                autoScrolling: !0,
                fitToSection: !0,
                fitToSectionDelay: 1e3,
                easing: "easeInOutCubic",
                easingcss3: "ease",
                loopBottom: !1,
                loopTop: !1,
                loopHorizontal: !0,
                continuousVertical: !1,
                continuousHorizontal: !1,
                scrollHorizontally: !1,
                interlockedSlides: !1,
                dragAndMove: !1,
                offsetSections: !1,
                resetSliders: !1,
                fadingEffect: !1,
                normalScrollElements: null,
                scrollOverflow: !1,
                scrollOverflowReset: !1,
                scrollOverflowHandler: e.fn.fp_scrolloverflow ? e.fn.fp_scrolloverflow.iscrollHandler : null,
                scrollOverflowOptions: null,
                touchSensitivity: 5,
                normalScrollElementTouchThreshold: 5,
                bigSectionsDestination: null,
                keyboardScrolling: !0,
                animateAnchor: !0,
                recordHistory: !0,
                controlArrows: !0,
                controlArrowColor: "#fff",
                verticalCentered: !0,
                sectionsColor: [],
                paddingTop: 0,
                paddingBottom: 0,
                fixedElements: null,
                responsive: 0,
                responsiveWidth: 0,
                responsiveHeight: 0,
                responsiveSlides: !1,
                parallax: !1,
                parallaxOptions: {
                    type: "reveal",
                    percentage: 62,
                    property: "translate"
                },
                sectionSelector: ".section",
                slideSelector: ".slide",
                afterLoad: null,
                onLeave: null,
                afterRender: null,
                afterResize: null,
                afterReBuild: null,
                afterSlideLoad: null,
                onSlideLeave: null,
                afterResponsive: null,
                lazyLoading: !0
            }, K);
            var jt, Gt, Xt, Yt, qt = !1,
                Kt = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
                Qt = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
                Zt = e(this),
                Jt = Y.height(),
                $t = !1,
                ei = !0,
                ti = !0,
                ii = [],
                ni = {};
            ni.m = {
                up: !0,
                down: !0,
                left: !0,
                right: !0
            }, ni.k = e.extend(!0, {}, ni.m);
            var ri, oi, ai, si, li, hi, ci, ui = t.PointerEvent ? {
                    down: "pointerdown",
                    move: "pointermove"
                } : {
                    down: "MSPointerDown",
                    move: "MSPointerMove"
                },
                fi = {
                    touchmove: "ontouchmove" in t ? "touchmove" : ui.move,
                    touchstart: "ontouchstart" in t ? "touchstart" : ui.down
                },
                di = e.extend(!0, {}, K);
            Pt(), e.extend(e.easing, {
                easeInOutCubic: function(e, t, i, n, r) {
                    return (t /= r / 2) < 1 ? n / 2 * t * t * t + i : n / 2 * ((t -= 2) * t * t + 2) + i
                }
            }), e(this).length && (Wt.version = "2.9.5", Wt.setAutoScrolling = Q, Wt.setRecordHistory = Z, Wt.setScrollingSpeed = J, Wt.setFitToSection = $, Wt.setLockAnchors = function(e) {
                K.lockAnchors = e
            }, Wt.setMouseWheelScrolling = ee, Wt.setAllowScrolling = te, Wt.setKeyboardScrolling = ie, Wt.moveSectionUp = ne, Wt.moveSectionDown = re, Wt.silentMoveTo = oe, Wt.moveTo = ae, Wt.moveSlideRight = se, Wt.moveSlideLeft = le, Wt.fitToSection = _e, Wt.reBuild = he, Wt.setResponsive = ce, Wt.destroy = function(t) {
                Q(!1, "internal"), te(!1), ie(!1), Zt.addClass(h), clearTimeout(si), clearTimeout(ai), clearTimeout(oi), clearTimeout(li), clearTimeout(hi), Y.off("scroll", xe).off("hashchange", Ke).off("resize", ot), q.off("click touchstart", w + " a").off("mouseenter", w + " li").off("mouseleave", w + " li").off("click touchstart", N).off("mouseover", K.normalScrollElements).off("mouseout", K.normalScrollElements), e(v).off("click touchstart", I), clearTimeout(si), clearTimeout(ai), t && kt()
            }, Wt.shared = {
                afterRenderActions: ye
            }, K.css3 && (K.css3 = function() {
                var e, n = i.createElement("p"),
                    o = {
                        webkitTransform: "-webkit-transform",
                        OTransform: "-o-transform",
                        msTransform: "-ms-transform",
                        MozTransform: "-moz-transform",
                        transform: "transform"
                    };
                i.body.insertBefore(n, null);
                for (var a in o) n.style[a] !== r && (n.style[a] = "translate3d(1px,1px,1px)", e = t.getComputedStyle(n).getPropertyValue(o[a]));
                return i.body.removeChild(n), e !== r && e.length > 0 && "none" !== e
            }()), K.scrollBar = K.scrollBar || K.hybrid, function() {
                var t = Zt.find(K.sectionSelector);
                K.anchors.length || (K.anchors = t.filter("[data-anchor]").map(function() {
                    return e(this).data("anchor").toString()
                }).get()), K.navigationTooltips.length || (K.navigationTooltips = t.filter("[data-tooltip]").map(function() {
                    return e(this).data("tooltip").toString()
                }).get())
            }(), Zt.css({
                height: "100%",
                position: "relative"
            }), Zt.addClass(o), e("html").addClass(c), Jt = Y.height(), Zt.removeClass(h), Ee(), e(v).each(function(t) {
                var i = e(this),
                    n = i.find(L),
                    r = n.length;
                fe(i, t), de(i, t), r > 0 ? ue(i, n, r) : K.verticalCentered && Et(i)
            }), K.fixedElements && K.css3 && e(K.fixedElements).appendTo(Ot), K.navigation && me(), ve(), K.scrollOverflow ? ri = K.scrollOverflowHandler.init(K) : ye(), te(!0), Q(K.autoScrolling, "internal"), at(), Ht(), "complete" === i.readyState && qe(), Y.on("load", qe), Y.on("scroll", xe).on("hashchange", Ke).blur(function() {
                ei = !1, Xt = !1
            }).resize(ot), q.keydown(function(t) {
                clearTimeout(ci);
                var i = e(":focus");
                if (!i.is("textarea") && !i.is("input") && !i.is("select") && "true" !== i.attr("contentEditable") && "" !== i.attr("contentEditable") && K.keyboardScrolling && K.autoScrolling) {
                    var n = t.which,
                        r = [40, 38, 32, 33, 34];
                    e.inArray(n, r) > -1 && t.preventDefault(), Xt = t.ctrlKey, ci = setTimeout(function() {
                        $e(t)
                    }, 150)
                }
            }).keyup(function(e) {
                ei && (Xt = e.ctrlKey)
            }).on("click touchstart", w + " a", function(t) {
                t.preventDefault();
                var i = e(this).parent().index();
                Be(e(v).eq(i))
            }).on("click touchstart", N, function(t) {
                t.preventDefault();
                var i = e(this).closest(v).find(V);
                tt(i, i.find(L).eq(e(this).closest("li").index()))
            }).on("click", S, function() {
                e(this).prev().trigger("click")
            }), e(v).on("click touchstart", I, function() {
                var t = e(this).closest(v);
                e(this).hasClass(O) ? ni.m.left && le(t) : ni.m.right && se(t)
            }), K.normalScrollElements && (q.on("mouseenter touchstart", K.normalScrollElements, function() {
                te(!1)
            }), q.on("mouseleave touchend", K.normalScrollElements, function() {
                te(!0)
            })));
            var Ei = !1,
                pi = 0,
                mi = 0,
                vi = 0,
                gi = 0,
                Ti = 0,
                yi = (new Date).getTime(),
                Ri = 0,
                xi = 0,
                _i = Jt
        }
    }
}),
    function(e) {
        function t(t) {
            var i;
            return t && t.constructor == Array && 3 == t.length ? t : (i = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? [parseInt(i[1]), parseInt(i[2]), parseInt(i[3])] : (i = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) ? [2.55 * parseFloat(i[1]), 2.55 * parseFloat(i[2]), 2.55 * parseFloat(i[3])] : (i = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) ? [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)] : (i = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) ? [parseInt(i[1] + i[1], 16), parseInt(i[2] + i[2], 16), parseInt(i[3] + i[3], 16)] : n[e.trim(t).toLowerCase()]
        }

        function i(i, n) {
            var r;
            do {
                if ("" != (r = e.curCSS(i, n)) && "transparent" != r || e.nodeName(i, "body")) break;
                n = "backgroundColor"
            } while (i = i.parentNode);
            return t(r)
        }
        e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(n, r) {
            e.fx.step[r] = function(e) {
                0 == e.state && (e.start = i(e.elem, r), e.end = t(e.end)), e.elem.style[r] = "rgb(" + [Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0]), 255), 0), Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1]), 255), 0), Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2]), 255), 0)].join(",") + ")"
            }
        });
        var n = {
            aqua: [0, 255, 255],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            black: [0, 0, 0],
            blue: [0, 0, 255],
            brown: [165, 42, 42],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgrey: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkviolet: [148, 0, 211],
            fuchsia: [255, 0, 255],
            gold: [255, 215, 0],
            green: [0, 128, 0],
            indigo: [75, 0, 130],
            khaki: [240, 230, 140],
            lightblue: [173, 216, 230],
            lightcyan: [224, 255, 255],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            navy: [0, 0, 128],
            olive: [128, 128, 0],
            orange: [255, 165, 0],
            pink: [255, 192, 203],
            purple: [128, 0, 128],
            violet: [128, 0, 128],
            red: [255, 0, 0],
            silver: [192, 192, 192],
            white: [255, 255, 255],
            yellow: [255, 255, 0]
        }
    }(jQuery);
