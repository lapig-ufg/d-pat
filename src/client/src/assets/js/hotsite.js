var interValMasks;

function openMenu() {

    let firstMask = true;

    interValMasks = setInterval(function(){

        if(firstMask){
            jQuery('#container').YTPPause();
            jQuery('#container').YTPAddMask('../assets/img/background_overlay_1.svg');
        }else{
            jQuery('#container').YTPPause();
            jQuery('#container').YTPAddMask('../assets/img/background_overlay_2.svg');
        }
        firstMask = !firstMask;

    }, 8000);

    jQuery('#container').YTPAddMask('../assets/img/background_overlay_2.svg');
    jQuery('#container').YTPMute();
    jQuery('#container').YTPPause();

    $(".content-overlay, .bg-overlay").addClass("opened"),
        $("#logo").addClass("pushed"),
        $(".c-hamburger").addClass("is-active"),
        $(".info").addClass("is-active"),
        $(".menu").css('display', 'none'),
        $(".info-2").css('display', 'block'),
        $("#dpat-nav").addClass("active"),
        $.fn.fullpage.moveTo(1)
}

function closeMenu() {
    clearInterval(interValMasks);

    jQuery('#container').YTPRemoveMask()
    jQuery('#container').YTPPlay();
    $(".content-overlay, .bg-overlay").removeClass("opened"),
        $("#logo").removeClass("pushed"),
        $(".menu").css('display', 'block'),
        $(".c-hamburger").removeClass("is-active"),
        $(".info-2").css('display', 'none'),
        $(".info").removeClass("is-active"),
        $(".section, #dpat-nav").removeClass("active")
}! function(e, t) {
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
var THREE = THREE || {};
window.Int32Array || (window.Int32Array = Array, window.Float32Array = Array), THREE.Color = function(e) {
    this.setHex(e)
}, THREE.Color.prototype = {
    autoUpdate: !0,
    copy: function(e) {
        this.r = e.r, this.g = e.g, this.b = e.b, this.hex = e.hex, this.__styleString = e.__styleString
    },
    setRGB: function(e, t, i) {
        this.r = e, this.g = t, this.b = i, this.autoUpdate && (this.updateHex(), this.updateStyleString())
    },
    setHSV: function(e, t, i) {
        var n, r, o, a, s, l;
        if (0 == i) n = r = o = 0;
        else switch (a = Math.floor(6 * e), s = 6 * e - a, e = i * (1 - t), l = i * (1 - t * s), t = i * (1 - t * (1 - s)), a) {
            case 1:
                n = l, r = i, o = e;
                break;
            case 2:
                n = e, r = i, o = t;
                break;
            case 3:
                n = e, r = l, o = i;
                break;
            case 4:
                n = t, r = e, o = i;
                break;
            case 5:
                n = i, r = e, o = l;
                break;
            case 6:
            case 0:
                n = i, r = t, o = e
        }
        this.r = n, this.g = r, this.b = o, this.autoUpdate && (this.updateHex(), this.updateStyleString())
    },
    setHex: function(e) {
        this.hex = 16777215 & ~~e, this.autoUpdate && (this.updateRGB(), this.updateStyleString())
    },
    updateHex: function() {
        this.hex = ~~(255 * this.r) << 16 ^ ~~(255 * this.g) << 8 ^ ~~(255 * this.b)
    },
    updateRGB: function() {
        this.r = (this.hex >> 16 & 255) / 255, this.g = (this.hex >> 8 & 255) / 255, this.b = (255 & this.hex) / 255
    },
    updateStyleString: function() {
        this.__styleString = "rgb(" + ~~(255 * this.r) + "," + ~~(255 * this.g) + "," + ~~(255 * this.b) + ")"
    },
    clone: function() {
        return new THREE.Color(this.hex)
    }
}, THREE.Vector2 = function(e, t) {
    this.set(e || 0, t || 0)
}, THREE.Vector2.prototype = {
    set: function(e, t) {
        return this.x = e, this.y = t, this
    },
    copy: function(e) {
        return this.set(e.x, e.y), this
    },
    addSelf: function(e) {
        return this.set(this.x + e.x, this.y + e.y), this
    },
    add: function(e, t) {
        return this.set(e.x + t.x, e.y + t.y), this
    },
    subSelf: function(e) {
        return this.set(this.x - e.x, this.y - e.y), this
    },
    sub: function(e, t) {
        return this.set(e.x - t.x, e.y - t.y), this
    },
    multiplyScalar: function(e) {
        return this.set(this.x * e, this.y * e), this
    },
    negate: function() {
        return this.set(-this.x, -this.y), this
    },
    unit: function() {
        return this.multiplyScalar(1 / this.length()), this
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    clone: function() {
        return new THREE.Vector2(this.x, this.y)
    }
}, THREE.Vector3 = function(e, t, i) {
    this.set(e || 0, t || 0, i || 0)
}, THREE.Vector3.prototype = {
    set: function(e, t, i) {
        return this.x = e, this.y = t, this.z = i, this
    },
    copy: function(e) {
        return this.set(e.x, e.y, e.z), this
    },
    add: function(e, t) {
        return this.set(e.x + t.x, e.y + t.y, e.z + t.z), this
    },
    addSelf: function(e) {
        return this.set(this.x + e.x, this.y + e.y, this.z + e.z), this
    },
    addScalar: function(e) {
        return this.set(this.x + e, this.y + e, this.z + e), this
    },
    sub: function(e, t) {
        return this.set(e.x - t.x, e.y - t.y, e.z - t.z), this
    },
    subSelf: function(e) {
        return this.set(this.x - e.x, this.y - e.y, this.z - e.z), this
    },
    cross: function(e, t) {
        return this.set(e.y * t.z - e.z * t.y, e.z * t.x - e.x * t.z, e.x * t.y - e.y * t.x), this
    },
    crossSelf: function(e) {
        var t = this.x,
            i = this.y,
            n = this.z;
        return this.set(i * e.z - n * e.y, n * e.x - t * e.z, t * e.y - i * e.x), this
    },
    multiply: function(e, t) {
        return this.set(e.x * t.x, e.y * t.y, e.z * t.z), this
    },
    multiplySelf: function(e) {
        return this.set(this.x * e.x, this.y * e.y, this.z * e.z), this
    },
    multiplyScalar: function(e) {
        return this.set(this.x * e, this.y * e, this.z * e), this
    },
    divideSelf: function(e) {
        return this.set(this.x / e.x, this.y / e.y, this.z / e.z), this
    },
    divideScalar: function(e) {
        return this.set(this.x / e, this.y / e, this.z / e), this
    },
    negate: function() {
        return this.set(-this.x, -this.y, -this.z), this
    },
    dot: function(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z
    },
    distanceTo: function(e) {
        return Math.sqrt(this.distanceToSquared(e))
    },
    distanceToSquared: function(e) {
        var t = this.x - e.x,
            i = this.y - e.y;
        return e = this.z - e.z, t * t + i * i + e * e
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    lengthManhattan: function() {
        return this.x + this.y + this.z
    },
    normalize: function() {
        var e = this.length();
        return e > 0 ? this.multiplyScalar(1 / e) : this.set(0, 0, 0), this
    },
    setPositionFromMatrix: function(e) {
        this.x = e.n14, this.y = e.n24, this.z = e.n34
    },
    setRotationFromMatrix: function(e) {
        var t = Math.cos(this.y);
        this.y = Math.asin(e.n13), Math.abs(t) > 1e-5 ? (this.x = Math.atan2(-e.n23 / t, e.n33 / t), this.z = Math.atan2(-e.n12 / t, e.n11 / t)) : (this.x = 0, this.z = Math.atan2(e.n21, e.n22))
    },
    setLength: function(e) {
        return this.normalize().multiplyScalar(e)
    },
    isZero: function() {
        return Math.abs(this.x) < 1e-4 && Math.abs(this.y) < 1e-4 && Math.abs(this.z) < 1e-4
    },
    clone: function() {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
}, THREE.Vector4 = function(e, t, i, n) {
    this.set(e || 0, t || 0, i || 0, n || 1)
}, THREE.Vector4.prototype = {
    set: function(e, t, i, n) {
        return this.x = e, this.y = t, this.z = i, this.w = n, this
    },
    copy: function(e) {
        return this.set(e.x, e.y, e.z, e.w || 1), this
    },
    add: function(e, t) {
        return this.set(e.x + t.x, e.y + t.y, e.z + t.z, e.w + t.w), this
    },
    addSelf: function(e) {
        return this.set(this.x + e.x, this.y + e.y, this.z + e.z, this.w + e.w), this
    },
    sub: function(e, t) {
        return this.set(e.x - t.x, e.y - t.y, e.z - t.z, e.w - t.w), this
    },
    subSelf: function(e) {
        return this.set(this.x - e.x, this.y - e.y, this.z - e.z, this.w - e.w), this
    },
    multiplyScalar: function(e) {
        return this.set(this.x * e, this.y * e, this.z * e, this.w * e), this
    },
    divideScalar: function(e) {
        return this.set(this.x / e, this.y / e, this.z / e, this.w / e), this
    },
    lerpSelf: function(e, t) {
        this.set(this.x + (e.x - this.x) * t, this.y + (e.y - this.y) * t, this.z + (e.z - this.z) * t, this.w + (e.w - this.w) * t)
    },
    clone: function() {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
}, THREE.Ray = function(e, t) {
    this.origin = e || new THREE.Vector3, this.direction = t || new THREE.Vector3
}, THREE.Ray.prototype = {
    intersectScene: function(e) {
        var t, i, n = e.objects,
            r = [];
        for (e = 0, t = n.length; e < t; e++)(i = n[e]) instanceof THREE.Mesh && (r = r.concat(this.intersectObject(i)));
        return r.sort(function(e, t) {
            return e.distance - t.distance
        }), r
    },
    intersectObject: function(e) {
        function t(e, t, i, n) {
            n = n.clone().subSelf(t), i = i.clone().subSelf(t);
            var r = e.clone().subSelf(t);
            e = n.dot(n), t = n.dot(i), n = n.dot(r);
            var o = i.dot(i);
            return i = i.dot(r), r = 1 / (e * o - t * t), o = (o * n - t * i) * r, e = (e * i - t * n) * r, o > 0 && e > 0 && o + e < 1
        }
        var i, n, r, o, a, s, l, h, c, u, f, d = e.geometry,
            E = d.vertices,
            p = [];
        for (i = 0, n = d.faces.length; i < n; i++) r = d.faces[i], u = this.origin.clone(), f = this.direction.clone(), o = (l = e.matrixWorld).multiplyVector3(E[r.a].position.clone()), a = l.multiplyVector3(E[r.b].position.clone()), s = l.multiplyVector3(E[r.c].position.clone()), l = r instanceof THREE.Face4 ? l.multiplyVector3(E[r.d].position.clone()) : null, h = e.matrixRotationWorld.multiplyVector3(r.normal.clone()), c = f.dot(h), (e.doubleSided || (e.flipSided ? c > 0 : c < 0)) && (h = h.dot((new THREE.Vector3).sub(o, u)) / c, u = u.addSelf(f.multiplyScalar(h)), r instanceof THREE.Face3 ? t(u, o, a, s) && (r = {
            distance: this.origin.distanceTo(u),
            point: u,
            face: r,
            object: e
        }, p.push(r)) : r instanceof THREE.Face4 && (t(u, o, a, l) || t(u, a, s, l)) && (r = {
            distance: this.origin.distanceTo(u),
            point: u,
            face: r,
            object: e
        }, p.push(r)));
        return p
    }
}, THREE.Rectangle = function() {
    function e() {
        o = n - t, a = r - i
    }
    var t, i, n, r, o, a, s = !0;
    this.getX = function() {
        return t
    }, this.getY = function() {
        return i
    }, this.getWidth = function() {
        return o
    }, this.getHeight = function() {
        return a
    }, this.getLeft = function() {
        return t
    }, this.getTop = function() {
        return i
    }, this.getRight = function() {
        return n
    }, this.getBottom = function() {
        return r
    }, this.set = function(o, a, l, h) {
        s = !1, t = o, i = a, n = l, r = h, e()
    }, this.addPoint = function(o, a) {
        s ? (s = !1, t = o, i = a, n = o, r = a) : (t = t < o ? t : o, i = i < a ? i : a, n = n > o ? n : o, r = r > a ? r : a), e()
    }, this.add3Points = function(o, a, l, h, c, u) {
        s ? (s = !1, t = o < l ? o < c ? o : c : l < c ? l : c, i = a < h ? a < u ? a : u : h < u ? h : u, n = o > l ? o > c ? o : c : l > c ? l : c, r = a > h ? a > u ? a : u : h > u ? h : u) : (t = o < l ? o < c ? o < t ? o : t : c < t ? c : t : l < c ? l < t ? l : t : c < t ? c : t, i = a < h ? a < u ? a < i ? a : i : u < i ? u : i : h < u ? h < i ? h : i : u < i ? u : i, n = o > l ? o > c ? o > n ? o : n : c > n ? c : n : l > c ? l > n ? l : n : c > n ? c : n, r = a > h ? a > u ? a > r ? a : r : u > r ? u : r : h > u ? h > r ? h : r : u > r ? u : r), e()
    }, this.addRectangle = function(o) {
        s ? (s = !1, t = o.getLeft(), i = o.getTop(), n = o.getRight(), r = o.getBottom()) : (t = t < o.getLeft() ? t : o.getLeft(), i = i < o.getTop() ? i : o.getTop(), n = n > o.getRight() ? n : o.getRight(), r = r > o.getBottom() ? r : o.getBottom()), e()
    }, this.inflate = function(o) {
        t -= o, i -= o, n += o, r += o, e()
    }, this.minSelf = function(o) {
        t = t > o.getLeft() ? t : o.getLeft(), i = i > o.getTop() ? i : o.getTop(), n = n < o.getRight() ? n : o.getRight(), r = r < o.getBottom() ? r : o.getBottom(), e()
    }, this.instersects = function(e) {
        return Math.min(n, e.getRight()) - Math.max(t, e.getLeft()) >= 0 && Math.min(r, e.getBottom()) - Math.max(i, e.getTop()) >= 0
    }, this.empty = function() {
        s = !0, r = n = i = t = 0, e()
    }, this.isEmpty = function() {
        return s
    }
}, THREE.Matrix3 = function() {
    this.m = []
}, THREE.Matrix3.prototype = {
    transpose: function() {
        var e, t = this.m;
        return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
    },
    transposeIntoArray: function(e) {
        var t = this.m;
        return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
    }
}, THREE.Matrix4 = function(e, t, i, n, r, o, a, s, l, h, c, u, f, d, E, p) {
    this.set(e || 1, t || 0, i || 0, n || 0, r || 0, o || 1, a || 0, s || 0, l || 0, h || 0, c || 1, u || 0, f || 0, d || 0, E || 0, p || 1), this.flat = Array(16), this.m33 = new THREE.Matrix3
}, THREE.Matrix4.prototype = {
    set: function(e, t, i, n, r, o, a, s, l, h, c, u, f, d, E, p) {
        return this.n11 = e, this.n12 = t, this.n13 = i, this.n14 = n, this.n21 = r, this.n22 = o, this.n23 = a, this.n24 = s, this.n31 = l, this.n32 = h, this.n33 = c, this.n34 = u, this.n41 = f, this.n42 = d, this.n43 = E, this.n44 = p, this
    },
    identity: function() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    },
    copy: function(e) {
        return this.set(e.n11, e.n12, e.n13, e.n14, e.n21, e.n22, e.n23, e.n24, e.n31, e.n32, e.n33, e.n34, e.n41, e.n42, e.n43, e.n44), this
    },
    lookAt: function(e, t, i) {
        var n = THREE.Matrix4.__v1,
            r = THREE.Matrix4.__v2,
            o = THREE.Matrix4.__v3;
        return o.sub(e, t).normalize(), 0 === o.length() && (o.z = 1), n.cross(i, o).normalize(), 0 === n.length() && (o.x += 1e-4, n.cross(i, o).normalize()), r.cross(o, n).normalize(), this.n11 = n.x, this.n12 = r.x, this.n13 = o.x, this.n21 = n.y, this.n22 = r.y, this.n23 = o.y, this.n31 = n.z, this.n32 = r.z, this.n33 = o.z, this
    },
    multiplyVector3: function(e) {
        var t = e.x,
            i = e.y,
            n = e.z,
            r = 1 / (this.n41 * t + this.n42 * i + this.n43 * n + this.n44);
        return e.x = (this.n11 * t + this.n12 * i + this.n13 * n + this.n14) * r, e.y = (this.n21 * t + this.n22 * i + this.n23 * n + this.n24) * r, e.z = (this.n31 * t + this.n32 * i + this.n33 * n + this.n34) * r, e
    },
    multiplyVector4: function(e) {
        var t = e.x,
            i = e.y,
            n = e.z,
            r = e.w;
        return e.x = this.n11 * t + this.n12 * i + this.n13 * n + this.n14 * r, e.y = this.n21 * t + this.n22 * i + this.n23 * n + this.n24 * r, e.z = this.n31 * t + this.n32 * i + this.n33 * n + this.n34 * r, e.w = this.n41 * t + this.n42 * i + this.n43 * n + this.n44 * r, e
    },
    rotateAxis: function(e) {
        var t = e.x,
            i = e.y,
            n = e.z;
        return e.x = t * this.n11 + i * this.n12 + n * this.n13, e.y = t * this.n21 + i * this.n22 + n * this.n23, e.z = t * this.n31 + i * this.n32 + n * this.n33, e.normalize(), e
    },
    crossVector: function(e) {
        var t = new THREE.Vector4;
        return t.x = this.n11 * e.x + this.n12 * e.y + this.n13 * e.z + this.n14 * e.w, t.y = this.n21 * e.x + this.n22 * e.y + this.n23 * e.z + this.n24 * e.w, t.z = this.n31 * e.x + this.n32 * e.y + this.n33 * e.z + this.n34 * e.w, t.w = e.w ? this.n41 * e.x + this.n42 * e.y + this.n43 * e.z + this.n44 * e.w : 1, t
    },
    multiply: function(e, t) {
        var i = e.n11,
            n = e.n12,
            r = e.n13,
            o = e.n14,
            a = e.n21,
            s = e.n22,
            l = e.n23,
            h = e.n24,
            c = e.n31,
            u = e.n32,
            f = e.n33,
            d = e.n34,
            E = e.n41,
            p = e.n42,
            m = e.n43,
            v = e.n44,
            g = t.n11,
            T = t.n12,
            y = t.n13,
            R = t.n14,
            x = t.n21,
            _ = t.n22,
            b = t.n23,
            H = t.n24,
            w = t.n31,
            M = t.n32,
            S = t.n33,
            A = t.n34;
        return this.n11 = i * g + n * x + r * w, this.n12 = i * T + n * _ + r * M, this.n13 = i * y + n * b + r * S, this.n14 = i * R + n * H + r * A + o, this.n21 = a * g + s * x + l * w, this.n22 = a * T + s * _ + l * M, this.n23 = a * y + s * b + l * S, this.n24 = a * R + s * H + l * A + h, this.n31 = c * g + u * x + f * w, this.n32 = c * T + u * _ + f * M, this.n33 = c * y + u * b + f * S, this.n34 = c * R + u * H + f * A + d, this.n41 = E * g + p * x + m * w, this.n42 = E * T + p * _ + m * M, this.n43 = E * y + p * b + m * S, this.n44 = E * R + p * H + m * A + v, this
    },
    multiplyToArray: function(e, t, i) {
        return this.multiply(e, t), i[0] = this.n11, i[1] = this.n21, i[2] = this.n31, i[3] = this.n41, i[4] = this.n12, i[5] = this.n22, i[6] = this.n32, i[7] = this.n42, i[8] = this.n13, i[9] = this.n23, i[10] = this.n33, i[11] = this.n43, i[12] = this.n14, i[13] = this.n24, i[14] = this.n34, i[15] = this.n44, this
    },
    multiplySelf: function(e) {
        return this.multiply(this, e), this
    },
    multiplyScalar: function(e) {
        return this.n11 *= e, this.n12 *= e, this.n13 *= e, this.n14 *= e, this.n21 *= e, this.n22 *= e, this.n23 *= e, this.n24 *= e, this.n31 *= e, this.n32 *= e, this.n33 *= e, this.n34 *= e, this.n41 *= e, this.n42 *= e, this.n43 *= e, this.n44 *= e, this
    },
    determinant: function() {
        var e = this.n11,
            t = this.n12,
            i = this.n13,
            n = this.n14,
            r = this.n21,
            o = this.n22,
            a = this.n23,
            s = this.n24,
            l = this.n31,
            h = this.n32,
            c = this.n33,
            u = this.n34,
            f = this.n41,
            d = this.n42,
            E = this.n43,
            p = this.n44;
        return n * a * h * f - i * s * h * f - n * o * c * f + t * s * c * f + i * o * u * f - t * a * u * f - n * a * l * d + i * s * l * d + n * r * c * d - e * s * c * d - i * r * u * d + e * a * u * d + n * o * l * E - t * s * l * E - n * r * h * E + e * s * h * E + t * r * u * E - e * o * u * E - i * o * l * p + t * a * l * p + i * r * h * p - e * a * h * p - t * r * c * p + e * o * c * p
    },
    transpose: function() {
        var e;
        return e = this.n21, this.n21 = this.n12, this.n12 = e, e = this.n31, this.n31 = this.n13, this.n13 = e, e = this.n32, this.n32 = this.n23, this.n23 = e, e = this.n41, this.n41 = this.n14, this.n14 = e, e = this.n42, this.n42 = this.n24, this.n24 = e, e = this.n43, this.n43 = this.n34, this.n43 = e, this
    },
    clone: function() {
        var e = new THREE.Matrix4;
        return e.n11 = this.n11, e.n12 = this.n12, e.n13 = this.n13, e.n14 = this.n14, e.n21 = this.n21, e.n22 = this.n22, e.n23 = this.n23, e.n24 = this.n24, e.n31 = this.n31, e.n32 = this.n32, e.n33 = this.n33, e.n34 = this.n34, e.n41 = this.n41, e.n42 = this.n42, e.n43 = this.n43, e.n44 = this.n44, e
    },
    flatten: function() {
        return this.flat[0] = this.n11, this.flat[1] = this.n21, this.flat[2] = this.n31, this.flat[3] = this.n41, this.flat[4] = this.n12, this.flat[5] = this.n22, this.flat[6] = this.n32, this.flat[7] = this.n42, this.flat[8] = this.n13, this.flat[9] = this.n23, this.flat[10] = this.n33, this.flat[11] = this.n43, this.flat[12] = this.n14, this.flat[13] = this.n24, this.flat[14] = this.n34, this.flat[15] = this.n44, this.flat
    },
    flattenToArray: function(e) {
        return e[0] = this.n11, e[1] = this.n21, e[2] = this.n31, e[3] = this.n41, e[4] = this.n12, e[5] = this.n22, e[6] = this.n32, e[7] = this.n42, e[8] = this.n13, e[9] = this.n23, e[10] = this.n33, e[11] = this.n43, e[12] = this.n14, e[13] = this.n24, e[14] = this.n34, e[15] = this.n44, e
    },
    flattenToArrayOffset: function(e, t) {
        return e[t] = this.n11, e[t + 1] = this.n21, e[t + 2] = this.n31, e[t + 3] = this.n41, e[t + 4] = this.n12, e[t + 5] = this.n22, e[t + 6] = this.n32, e[t + 7] = this.n42, e[t + 8] = this.n13, e[t + 9] = this.n23, e[t + 10] = this.n33, e[t + 11] = this.n43, e[t + 12] = this.n14, e[t + 13] = this.n24, e[t + 14] = this.n34, e[t + 15] = this.n44, e
    },
    setTranslation: function(e, t, i) {
        return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this
    },
    setScale: function(e, t, i) {
        return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this
    },
    setRotationX: function(e) {
        var t = Math.cos(e);
        return e = Math.sin(e), this.set(1, 0, 0, 0, 0, t, -e, 0, 0, e, t, 0, 0, 0, 0, 1), this
    },
    setRotationY: function(e) {
        var t = Math.cos(e);
        return e = Math.sin(e), this.set(t, 0, e, 0, 0, 1, 0, 0, -e, 0, t, 0, 0, 0, 0, 1), this
    },
    setRotationZ: function(e) {
        var t = Math.cos(e);
        return e = Math.sin(e), this.set(t, -e, 0, 0, e, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    },
    setRotationAxis: function(e, t) {
        var i = Math.cos(t),
            n = Math.sin(t),
            r = 1 - i,
            o = e.x,
            a = e.y,
            s = e.z,
            l = r * o,
            h = r * a;
        return this.set(l * o + i, l * a - n * s, l * s + n * a, 0, l * a + n * s, h * a + i, h * s - n * o, 0, l * s - n * a, h * s + n * o, r * s * s + i, 0, 0, 0, 0, 1), this
    },
    setPosition: function(e) {
        return this.n14 = e.x, this.n24 = e.y, this.n34 = e.z, this
    },
    getPosition: function() {
        return this.position || (this.position = new THREE.Vector3), this.position.set(this.n14, this.n24, this.n34), this.position
    },
    getColumnX: function() {
        return this.columnX || (this.columnX = new THREE.Vector3), this.columnX.set(this.n11, this.n21, this.n31), this.columnX
    },
    getColumnY: function() {
        return this.columnY || (this.columnY = new THREE.Vector3), this.columnY.set(this.n12, this.n22, this.n32), this.columnY
    },
    getColumnZ: function() {
        return this.columnZ || (this.columnZ = new THREE.Vector3), this.columnZ.set(this.n13, this.n23, this.n33), this.columnZ
    },
    setRotationFromEuler: function(e) {
        var t = e.x,
            i = e.y,
            n = e.z;
        e = Math.cos(t), t = Math.sin(t);
        var r = Math.cos(i);
        i = Math.sin(i);
        var o = Math.cos(n);
        n = Math.sin(n);
        var a = e * i,
            s = t * i;
        return this.n11 = r * o, this.n12 = -r * n, this.n13 = i, this.n21 = s * o + e * n, this.n22 = -s * n + e * o, this.n23 = -t * r, this.n31 = -a * o + t * n, this.n32 = a * n + t * o, this.n33 = e * r, this
    },
    setRotationFromQuaternion: function(e) {
        var t = e.x,
            i = e.y,
            n = e.z,
            r = e.w,
            o = t + t,
            a = i + i,
            s = n + n;
        e = t * o;
        var l = t * a;
        t *= s;
        var h = i * a;
        return i *= s, n *= s, o *= r, a *= r, r *= s, this.n11 = 1 - (h + n), this.n12 = l - r, this.n13 = t + a, this.n21 = l + r, this.n22 = 1 - (e + n), this.n23 = i - o, this.n31 = t - a, this.n32 = i + o, this.n33 = 1 - (e + h), this
    },
    scale: function(e) {
        var t = e.x,
            i = e.y;
        return e = e.z, this.n11 *= t, this.n12 *= i, this.n13 *= e, this.n21 *= t, this.n22 *= i, this.n23 *= e, this.n31 *= t, this.n32 *= i, this.n33 *= e, this.n41 *= t, this.n42 *= i, this.n43 *= e, this
    },
    extractPosition: function(e) {
        this.n14 = e.n14, this.n24 = e.n24, this.n34 = e.n34
    },
    extractRotation: function(e, t) {
        var i = 1 / t.x,
            n = 1 / t.y,
            r = 1 / t.z;
        this.n11 = e.n11 * i, this.n21 = e.n21 * i, this.n31 = e.n31 * i, this.n12 = e.n12 * n, this.n22 = e.n22 * n, this.n32 = e.n32 * n, this.n13 = e.n13 * r, this.n23 = e.n23 * r, this.n33 = e.n33 * r
    }
}, THREE.Matrix4.makeInvert = function(e, t) {
    var i = e.n11,
        n = e.n12,
        r = e.n13,
        o = e.n14,
        a = e.n21,
        s = e.n22,
        l = e.n23,
        h = e.n24,
        c = e.n31,
        u = e.n32,
        f = e.n33,
        d = e.n34,
        E = e.n41,
        p = e.n42,
        m = e.n43,
        v = e.n44;
    return void 0 === t && (t = new THREE.Matrix4), t.n11 = l * d * p - h * f * p + h * u * m - s * d * m - l * u * v + s * f * v, t.n12 = o * f * p - r * d * p - o * u * m + n * d * m + r * u * v - n * f * v, t.n13 = r * h * p - o * l * p + o * s * m - n * h * m - r * s * v + n * l * v, t.n14 = o * l * u - r * h * u - o * s * f + n * h * f + r * s * d - n * l * d, t.n21 = h * f * E - l * d * E - h * c * m + a * d * m + l * c * v - a * f * v, t.n22 = r * d * E - o * f * E + o * c * m - i * d * m - r * c * v + i * f * v, t.n23 = o * l * E - r * h * E - o * a * m + i * h * m + r * a * v - i * l * v, t.n24 = r * h * c - o * l * c + o * a * f - i * h * f - r * a * d + i * l * d, t.n31 = s * d * E - h * u * E + h * c * p - a * d * p - s * c * v + a * u * v, t.n32 = o * u * E - n * d * E - o * c * p + i * d * p + n * c * v - i * u * v, t.n33 = r * h * E - o * s * E + o * a * p - i * h * p - n * a * v + i * s * v, t.n34 = o * s * c - n * h * c - o * a * u + i * h * u + n * a * d - i * s * d, t.n41 = l * u * E - s * f * E - l * c * p + a * f * p + s * c * m - a * u * m, t.n42 = n * f * E - r * u * E + r * c * p - i * f * p - n * c * m + i * u * m, t.n43 = r * s * E - n * l * E - r * a * p + i * l * p + n * a * m - i * s * m, t.n44 = n * l * c - r * s * c + r * a * u - i * l * u - n * a * f + i * s * f, t.multiplyScalar(1 / e.determinant()), t
}, THREE.Matrix4.makeInvert3x3 = function(e) {
    var t = e.m33,
        i = t.m,
        n = e.n33 * e.n22 - e.n32 * e.n23,
        r = -e.n33 * e.n21 + e.n31 * e.n23,
        o = e.n32 * e.n21 - e.n31 * e.n22,
        a = -e.n33 * e.n12 + e.n32 * e.n13,
        s = e.n33 * e.n11 - e.n31 * e.n13,
        l = -e.n32 * e.n11 + e.n31 * e.n12,
        h = e.n23 * e.n12 - e.n22 * e.n13,
        c = -e.n23 * e.n11 + e.n21 * e.n13,
        u = e.n22 * e.n11 - e.n21 * e.n12;
    if (0 == (e = e.n11 * n + e.n21 * a + e.n31 * h)) throw "matrix not invertible";
    return e = 1 / e, i[0] = e * n, i[1] = e * r, i[2] = e * o, i[3] = e * a, i[4] = e * s, i[5] = e * l, i[6] = e * h, i[7] = e * c, i[8] = e * u, t
}, THREE.Matrix4.makeFrustum = function(e, t, i, n, r, o) {
    var a;
    return a = new THREE.Matrix4, a.n11 = 2 * r / (t - e), a.n12 = 0, a.n13 = (t + e) / (t - e), a.n14 = 0, a.n21 = 0, a.n22 = 2 * r / (n - i), a.n23 = (n + i) / (n - i), a.n24 = 0, a.n31 = 0, a.n32 = 0, a.n33 = -(o + r) / (o - r), a.n34 = -2 * o * r / (o - r), a.n41 = 0, a.n42 = 0, a.n43 = -1, a.n44 = 0, a
}, THREE.Matrix4.makePerspective = function(e, t, i, n) {
    var r;
    return e = i * Math.tan(e * Math.PI / 360), r = -e, THREE.Matrix4.makeFrustum(r * t, e * t, r, e, i, n)
}, THREE.Matrix4.makeOrtho = function(e, t, i, n, r, o) {
    var a, s, l, h;
    return a = new THREE.Matrix4, s = t - e, l = i - n, h = o - r, a.n11 = 2 / s, a.n12 = 0, a.n13 = 0, a.n14 = -(t + e) / s, a.n21 = 0, a.n22 = 2 / l, a.n23 = 0, a.n24 = -(i + n) / l, a.n31 = 0, a.n32 = 0, a.n33 = -2 / h, a.n34 = -(o + r) / h, a.n41 = 0, a.n42 = 0, a.n43 = 0, a.n44 = 1, a
}, THREE.Matrix4.__v1 = new THREE.Vector3, THREE.Matrix4.__v2 = new THREE.Vector3, THREE.Matrix4.__v3 = new THREE.Vector3, THREE.Object3D = function() {
    this.parent = void 0, this.children = [], this.up = new THREE.Vector3(0, 1, 0), this.position = new THREE.Vector3, this.rotation = new THREE.Vector3, this.scale = new THREE.Vector3(1, 1, 1), this.rotationAutoUpdate = !0, this.matrix = new THREE.Matrix4, this.matrixWorld = new THREE.Matrix4, this.matrixRotationWorld = new THREE.Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !0, this.quaternion = new THREE.Quaternion, this.useQuaternion = !1, this.boundRadius = 0, this.boundRadiusScale = 1, this.visible = !0, this._vector = new THREE.Vector3, this.name = ""
}, THREE.Object3D.prototype = {
    translate: function(e, t) {
        this.matrix.rotateAxis(t), this.position.addSelf(t.multiplyScalar(e))
    },
    translateX: function(e) {
        this.translate(e, this._vector.set(1, 0, 0))
    },
    translateY: function(e) {
        this.translate(e, this._vector.set(0, 1, 0))
    },
    translateZ: function(e) {
        this.translate(e, this._vector.set(0, 0, 1))
    },
    lookAt: function(e) {
        this.matrix.lookAt(e, this.position, this.up), this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
    },
    addChild: function(e) {
        if (-1 === this.children.indexOf(e)) {
            void 0 !== e.parent && e.parent.removeChild(e), e.parent = this, this.children.push(e);
            for (var t = this; void 0 !== t.parent;) t = t.parent;
            void 0 !== t && t instanceof THREE.Scene && t.addChildRecurse(e)
        }
    },
    removeChild: function(e) {
        var t = this.children.indexOf(e); - 1 !== t && (e.parent = void 0, this.children.splice(t, 1))
    },
    getChildByName: function(e, t) {
        var i, n, r;
        for (i = 0, n = this.children.length; i < n; i++) {
            if ((r = this.children[i]).name === e) return r;
            if (t && void 0 !== (r = r.getChildByName(e, t))) return r
        }
    },
    updateMatrix: function() {
        this.matrix.setPosition(this.position), this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation), 1 === this.scale.x && 1 === this.scale.y && 1 === this.scale.z || (this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z))), this.matrixWorldNeedsUpdate = !0
    },
    update: function(e, t, i) {
        this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (e ? this.matrixWorld.multiply(e, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale), this.matrixWorldNeedsUpdate = !1, t = !0), e = 0;
        for (var n = this.children.length; e < n; e++) this.children[e].update(this.matrixWorld, t, i)
    }
}, THREE.Quaternion = function(e, t, i, n) {
    this.set(e || 0, t || 0, i || 0, void 0 !== n ? n : 1)
}, THREE.Quaternion.prototype = {
    set: function(e, t, i, n) {
        return this.x = e, this.y = t, this.z = i, this.w = n, this
    },
    copy: function(e) {
        return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w, this
    },
    setFromEuler: function(e) {
        var t = .5 * Math.PI / 360,
            i = e.x * t,
            n = e.y * t,
            r = e.z * t;
        e = Math.cos(n), n = Math.sin(n), t = Math.cos(-r), r = Math.sin(-r);
        var o = Math.cos(i);
        i = Math.sin(i);
        var a = e * t,
            s = n * r;
        return this.w = a * o - s * i, this.x = a * i + s * o, this.y = n * t * o + e * r * i, this.z = e * r * o - n * t * i, this
    },
    setFromAxisAngle: function(e, t) {
        var i = t / 2,
            n = Math.sin(i);
        return this.x = e.x * n, this.y = e.y * n, this.z = e.z * n, this.w = Math.cos(i), this
    },
    calculateW: function() {
        return this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)), this
    },
    inverse: function() {
        return this.x *= -1, this.y *= -1, this.z *= -1, this
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function() {
        var e = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        return 0 == e ? this.w = this.z = this.y = this.x = 0 : (e = 1 / e, this.x *= e, this.y *= e, this.z *= e, this.w *= e), this
    },
    multiplySelf: function(e) {
        var t = this.x,
            i = this.y,
            n = this.z,
            r = this.w,
            o = e.x,
            a = e.y,
            s = e.z;
        return e = e.w, this.x = t * e + r * o + i * s - n * a, this.y = i * e + r * a + n * o - t * s, this.z = n * e + r * s + t * a - i * o, this.w = r * e - t * o - i * a - n * s, this
    },
    multiply: function(e, t) {
        return this.x = e.x * t.w + e.y * t.z - e.z * t.y + e.w * t.x, this.y = -e.x * t.z + e.y * t.w + e.z * t.x + e.w * t.y, this.z = e.x * t.y - e.y * t.x + e.z * t.w + e.w * t.z, this.w = -e.x * t.x - e.y * t.y - e.z * t.z + e.w * t.w, this
    },
    multiplyVector3: function(e, t) {
        t || (t = e);
        var i = e.x,
            n = e.y,
            r = e.z,
            o = this.x,
            a = this.y,
            s = this.z,
            l = this.w,
            h = l * i + a * r - s * n,
            c = l * n + s * i - o * r,
            u = l * r + o * n - a * i;
        return i = -o * i - a * n - s * r, t.x = h * l + i * -o + c * -s - u * -a, t.y = c * l + i * -a + u * -o - h * -s, t.z = u * l + i * -s + h * -a - c * -o, t
    }
}, THREE.Quaternion.slerp = function(e, t, i, n) {
    var r = e.w * t.w + e.x * t.x + e.y * t.y + e.z * t.z;
    if (Math.abs(r) >= 1) return i.w = e.w, i.x = e.x, i.y = e.y, i.z = e.z, i;
    var o = Math.acos(r),
        a = Math.sqrt(1 - r * r);
    return Math.abs(a) < .001 ? (i.w = .5 * (e.w + t.w), i.x = .5 * (e.x + t.x), i.y = .5 * (e.y + t.y), i.z = .5 * (e.z + t.z), i) : (r = Math.sin((1 - n) * o) / a, n = Math.sin(n * o) / a, i.w = e.w * r + t.w * n, i.x = e.x * r + t.x * n, i.y = e.y * r + t.y * n, i.z = e.z * r + t.z * n, i)
}, THREE.Vertex = function(e) {
    this.position = e || new THREE.Vector3
}, THREE.Face3 = function(e, t, i, n, r, o) {
    this.a = e, this.b = t, this.c = i, this.normal = n instanceof THREE.Vector3 ? n : new THREE.Vector3, this.vertexNormals = n instanceof Array ? n : [], this.color = r instanceof THREE.Color ? r : new THREE.Color, this.vertexColors = r instanceof Array ? r : [], this.vertexTangents = [], this.materials = o instanceof Array ? o : [o], this.centroid = new THREE.Vector3
}, THREE.Face4 = function(e, t, i, n, r, o, a) {
    this.a = e, this.b = t, this.c = i, this.d = n, this.normal = r instanceof THREE.Vector3 ? r : new THREE.Vector3, this.vertexNormals = r instanceof Array ? r : [], this.color = o instanceof THREE.Color ? o : new THREE.Color, this.vertexColors = o instanceof Array ? o : [], this.vertexTangents = [], this.materials = a instanceof Array ? a : [a], this.centroid = new THREE.Vector3
}, THREE.UV = function(e, t) {
    this.set(e || 0, t || 0)
}, THREE.UV.prototype = {
    set: function(e, t) {
        return this.u = e, this.v = t, this
    },
    copy: function(e) {
        return this.set(e.u, e.v), this
    }
}, THREE.Geometry = function() {
    this.id = "Geometry" + THREE.GeometryIdCounter++, this.vertices = [], this.colors = [], this.faces = [], this.edges = [], this.faceUvs = [
        []
    ], this.faceVertexUvs = [
        []
    ], this.morphTargets = [], this.morphColors = [], this.skinWeights = [], this.skinIndices = [], this.boundingSphere = this.boundingBox = null, this.hasTangents = !1
}, THREE.Geometry.prototype = {
    computeCentroids: function() {
        var e, t, i;
        for (e = 0, t = this.faces.length; e < t; e++)(i = this.faces[e]).centroid.set(0, 0, 0), i instanceof THREE.Face3 ? (i.centroid.addSelf(this.vertices[i.a].position), i.centroid.addSelf(this.vertices[i.b].position), i.centroid.addSelf(this.vertices[i.c].position), i.centroid.divideScalar(3)) : i instanceof THREE.Face4 && (i.centroid.addSelf(this.vertices[i.a].position), i.centroid.addSelf(this.vertices[i.b].position), i.centroid.addSelf(this.vertices[i.c].position), i.centroid.addSelf(this.vertices[i.d].position), i.centroid.divideScalar(4))
    },
    computeFaceNormals: function(e) {
        var t, i, n, r, o, a, s = new THREE.Vector3,
            l = new THREE.Vector3;
        for (n = 0, r = this.faces.length; n < r; n++) {
            if (o = this.faces[n], e && o.vertexNormals.length) {
                for (s.set(0, 0, 0), t = 0, i = o.vertexNormals.length; t < i; t++) s.addSelf(o.vertexNormals[t]);
                s.divideScalar(3)
            } else t = this.vertices[o.a], i = this.vertices[o.b], a = this.vertices[o.c], s.sub(a.position, i.position), l.sub(t.position, i.position), s.crossSelf(l);
            s.isZero() || s.normalize(), o.normal.copy(s)
        }
    },
    computeVertexNormals: function() {
        var e, t, i, n;
        if (void 0 == this.__tmpVertices) {
            for (n = this.__tmpVertices = Array(this.vertices.length), e = 0, t = this.vertices.length; e < t; e++) n[e] = new THREE.Vector3;
            for (e = 0, t = this.faces.length; e < t; e++)(i = this.faces[e]) instanceof THREE.Face3 ? i.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : i instanceof THREE.Face4 && (i.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
        } else
            for (n = this.__tmpVertices, e = 0, t = this.vertices.length; e < t; e++) n[e].set(0, 0, 0);
        for (e = 0, t = this.faces.length; e < t; e++)(i = this.faces[e]) instanceof THREE.Face3 ? (n[i.a].addSelf(i.normal), n[i.b].addSelf(i.normal), n[i.c].addSelf(i.normal)) : i instanceof THREE.Face4 && (n[i.a].addSelf(i.normal), n[i.b].addSelf(i.normal), n[i.c].addSelf(i.normal), n[i.d].addSelf(i.normal));
        for (e = 0, t = this.vertices.length; e < t; e++) n[e].normalize();
        for (e = 0, t = this.faces.length; e < t; e++)(i = this.faces[e]) instanceof THREE.Face3 ? (i.vertexNormals[0].copy(n[i.a]), i.vertexNormals[1].copy(n[i.b]), i.vertexNormals[2].copy(n[i.c])) : i instanceof THREE.Face4 && (i.vertexNormals[0].copy(n[i.a]), i.vertexNormals[1].copy(n[i.b]), i.vertexNormals[2].copy(n[i.c]), i.vertexNormals[3].copy(n[i.d]))
    },
    computeTangents: function() {
        function e(e, t, i, n, r, o, b) {
            s = e.vertices[t].position, l = e.vertices[i].position, h = e.vertices[n].position, c = a[r], u = a[o], f = a[b], d = l.x - s.x, E = h.x - s.x, p = l.y - s.y, m = h.y - s.y, v = l.z - s.z, g = h.z - s.z, T = u.u - c.u, y = f.u - c.u, R = u.v - c.v, x = f.v - c.v, _ = 1 / (T * x - y * R), M.set((x * d - R * E) * _, (x * p - R * m) * _, (x * v - R * g) * _), S.set((T * E - y * d) * _, (T * m - y * p) * _, (T * g - y * v) * _), H[t].addSelf(M), H[i].addSelf(M), H[n].addSelf(M), w[t].addSelf(S), w[i].addSelf(S), w[n].addSelf(S)
        }
        var t, i, n, r, o, a, s, l, h, c, u, f, d, E, p, m, v, g, T, y, R, x, _, b, H = [],
            w = [],
            M = new THREE.Vector3,
            S = new THREE.Vector3,
            A = new THREE.Vector3,
            C = new THREE.Vector3,
            L = new THREE.Vector3;
        for (t = 0, i = this.vertices.length; t < i; t++) H[t] = new THREE.Vector3, w[t] = new THREE.Vector3;
        for (t = 0, i = this.faces.length; t < i; t++) o = this.faces[t], a = this.faceVertexUvs[0][t], o instanceof THREE.Face3 ? e(this, o.a, o.b, o.c, 0, 1, 2) : o instanceof THREE.Face4 && (e(this, o.a, o.b, o.c, 0, 1, 2), e(this, o.a, o.b, o.d, 0, 1, 3));
        var F = ["a", "b", "c", "d"];
        for (t = 0, i = this.faces.length; t < i; t++)
            for (o = this.faces[t], n = 0; n < o.vertexNormals.length; n++) L.copy(o.vertexNormals[n]), r = o[F[n]], b = H[r], A.copy(b), A.subSelf(L.multiplyScalar(L.dot(b))).normalize(), C.cross(o.vertexNormals[n], b), r = (r = C.dot(w[r])) < 0 ? -1 : 1, o.vertexTangents[n] = new THREE.Vector4(A.x, A.y, A.z, r);
        this.hasTangents = !0
    },
    computeBoundingBox: function() {
        var e;
        if (this.vertices.length > 0) {
            this.boundingBox = {
                x: [this.vertices[0].position.x, this.vertices[0].position.x],
                y: [this.vertices[0].position.y, this.vertices[0].position.y],
                z: [this.vertices[0].position.z, this.vertices[0].position.z]
            };
            for (var t = 1, i = this.vertices.length; t < i; t++)(e = this.vertices[t]).position.x < this.boundingBox.x[0] ? this.boundingBox.x[0] = e.position.x : e.position.x > this.boundingBox.x[1] && (this.boundingBox.x[1] = e.position.x), e.position.y < this.boundingBox.y[0] ? this.boundingBox.y[0] = e.position.y : e.position.y > this.boundingBox.y[1] && (this.boundingBox.y[1] = e.position.y), e.position.z < this.boundingBox.z[0] ? this.boundingBox.z[0] = e.position.z : e.position.z > this.boundingBox.z[1] && (this.boundingBox.z[1] = e.position.z)
        }
    },
    computeBoundingSphere: function() {
        for (var e = null === this.boundingSphere ? 0 : this.boundingSphere.radius, t = 0, i = this.vertices.length; t < i; t++) e = Math.max(e, this.vertices[t].position.length());
        this.boundingSphere = {
            radius: e
        }
    },
    computeEdgeFaces: function() {
        function e(e, t) {
            return Math.min(e, t) + "_" + Math.max(e, t)
        }

        function t(e, t, i) {
            void 0 === e[t] ? (e[t] = {
                set: {},
                array: []
            }, e[t].set[i] = 1, e[t].array.push(i)) : void 0 === e[t].set[i] && (e[t].set[i] = 1, e[t].array.push(i))
        }
        var i, n, r, o, a, s = {};
        for (i = 0, n = this.faces.length; i < n; i++)(a = this.faces[i]) instanceof THREE.Face3 ? (t(s, r = e(a.a, a.b), i), t(s, r = e(a.b, a.c), i), t(s, r = e(a.a, a.c), i)) : a instanceof THREE.Face4 && (t(s, r = e(a.b, a.d), i), t(s, r = e(a.a, a.b), i), t(s, r = e(a.a, a.d), i), t(s, r = e(a.b, a.c), i), t(s, r = e(a.c, a.d), i));
        for (i = 0, n = this.edges.length; i < n; i++)
            for (r = (a = this.edges[i]).vertexIndices[0], o = a.vertexIndices[1], a.faceIndices = s[e(r, o)].array, r = 0; r < a.faceIndices.length; r++) o = a.faceIndices[r], a.faces.push(this.faces[o])
    }
}, THREE.GeometryIdCounter = 0, THREE.Camera = function(e, t, i, n, r) {
    THREE.Object3D.call(this), this.fov = e || 50, this.aspect = t || 1, this.near = i || .1, this.far = n || 2e3, this.target = r || new THREE.Object3D, this.useTarget = !0, this.matrixWorldInverse = new THREE.Matrix4, this.projectionMatrix = null, this.updateProjectionMatrix()
}, THREE.Camera.prototype = new THREE.Object3D, THREE.Camera.prototype.constructor = THREE.Camera, THREE.Camera.prototype.supr = THREE.Object3D.prototype, THREE.Camera.prototype.translate = function(e, t) {
    this.matrix.rotateAxis(t), this.position.addSelf(t.multiplyScalar(e)), this.target.position.addSelf(t.multiplyScalar(e))
}, THREE.Camera.prototype.updateProjectionMatrix = function() {
    this.projectionMatrix = THREE.Matrix4.makePerspective(this.fov, this.aspect, this.near, this.far)
}, THREE.Camera.prototype.update = function(e, t, i) {
    for (this.useTarget ? (this.matrix.lookAt(this.position, this.target.position, this.up), this.matrix.setPosition(this.position), e ? this.matrixWorld.multiply(e, this.matrix) : this.matrixWorld.copy(this.matrix), THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse), t = !0) : (this.matrixAutoUpdate && this.updateMatrix(), (t || this.matrixWorldNeedsUpdate) && (e ? this.matrixWorld.multiply(e, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0, THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse))), e = 0; e < this.children.length; e++) this.children[e].update(this.matrixWorld, t, i)
}, THREE.Light = function(e) {
    THREE.Object3D.call(this), this.color = new THREE.Color(e)
}, THREE.Light.prototype = new THREE.Object3D, THREE.Light.prototype.constructor = THREE.Light, THREE.Light.prototype.supr = THREE.Object3D.prototype, THREE.AmbientLight = function(e) {
    THREE.Light.call(this, e)
}, THREE.AmbientLight.prototype = new THREE.Light, THREE.AmbientLight.prototype.constructor = THREE.AmbientLight, THREE.DirectionalLight = function(e, t, i, n) {
    THREE.Light.call(this, e), this.position = new THREE.Vector3(0, 1, 0), this.intensity = t || 1, this.distance = i || 0, this.castShadow = void 0 !== n && n
}, THREE.DirectionalLight.prototype = new THREE.Light, THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight, THREE.PointLight = function(e, t, i) {
    THREE.Light.call(this, e), this.position = new THREE.Vector3, this.intensity = t || 1, this.distance = i || 0
}, THREE.PointLight.prototype = new THREE.Light, THREE.PointLight.prototype.constructor = THREE.PointLight, THREE.LensFlare = function(e, t, i, n) {
    THREE.Object3D.call(this), this.positionScreen = new THREE.Vector3, this.lensFlares = [], this.customUpdateCallback = void 0, void 0 !== e && this.add(e, t, i, n)
}, THREE.LensFlare.prototype = new THREE.Object3D, THREE.LensFlare.prototype.constructor = THREE.LensFlare, THREE.LensFlare.prototype.supr = THREE.Object3D.prototype, THREE.LensFlare.prototype.add = function(e, t, i, n) {
    void 0 === t && (t = -1), void 0 === i && (i = 0), void 0 === n && (n = THREE.BillboardBlending), i = Math.min(i, Math.max(0, i)), this.lensFlares.push({
        texture: e,
        size: t,
        distance: i,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: 1,
        blending: n
    })
}, THREE.LensFlare.prototype.updateLensFlares = function() {
    var e, t, i = this.lensFlares.length,
        n = 2 * -this.positionScreen.x,
        r = 2 * -this.positionScreen.y;
    for (e = 0; e < i; e++)(t = this.lensFlares[e]).x = this.positionScreen.x + n * t.distance, t.y = this.positionScreen.y + r * t.distance, t.wantedRotation = t.x * Math.PI * .25, t.rotation += .25 * (t.wantedRotation - t.rotation)
}, THREE.Material = function(e) {
    this.id = THREE.MaterialCounter.value++, e = e || {}, this.opacity = void 0 !== e.opacity ? e.opacity : 1, this.transparent = void 0 !== e.transparent && e.transparent, this.blending = void 0 !== e.blending ? e.blending : THREE.NormalBlending, this.depthTest = void 0 === e.depthTest || e.depthTest
}, THREE.NoShading = 0, THREE.FlatShading = 1, THREE.SmoothShading = 2, THREE.NoColors = 0, THREE.FaceColors = 1, THREE.VertexColors = 2, THREE.NormalBlending = 0, THREE.AdditiveBlending = 1, THREE.SubtractiveBlending = 2, THREE.MultiplyBlending = 3, THREE.AdditiveAlphaBlending = 4, THREE.MaterialCounter = {
    value: 0
}, THREE.CubeReflectionMapping = function() {}, THREE.CubeRefractionMapping = function() {}, THREE.LatitudeReflectionMapping = function() {}, THREE.LatitudeRefractionMapping = function() {}, THREE.SphericalReflectionMapping = function() {}, THREE.SphericalRefractionMapping = function() {}, THREE.UVMapping = function() {}, THREE.LineBasicMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.color = void 0 !== e.color ? new THREE.Color(e.color) : new THREE.Color(16777215), this.linewidth = void 0 !== e.linewidth ? e.linewidth : 1, this.linecap = void 0 !== e.linecap ? e.linecap : "round", this.linejoin = void 0 !== e.linejoin ? e.linejoin : "round", this.vertexColors = !!e.vertexColors && e.vertexColors
}, THREE.LineBasicMaterial.prototype = new THREE.Material, THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial, THREE.MeshBasicMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.color = void 0 !== e.color ? new THREE.Color(e.color) : new THREE.Color(16777215), this.map = void 0 !== e.map ? e.map : null, this.lightMap = void 0 !== e.lightMap ? e.lightMap : null, this.envMap = void 0 !== e.envMap ? e.envMap : null, this.combine = void 0 !== e.combine ? e.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== e.reflectivity ? e.reflectivity : 1, this.refractionRatio = void 0 !== e.refractionRatio ? e.refractionRatio : .98, this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading, this.wireframe = void 0 !== e.wireframe && e.wireframe, this.wireframeLinewidth = void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== e.wireframeLinecap ? e.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== e.wireframeLinejoin ? e.wireframeLinejoin : "round", this.vertexColors = void 0 !== e.vertexColors && e.vertexColors, this.skinning = void 0 !== e.skinning && e.skinning, this.morphTargets = void 0 !== e.morphTargets && e.morphTargets
}, THREE.MeshBasicMaterial.prototype = new THREE.Material, THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial, THREE.MeshLambertMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.color = void 0 !== e.color ? new THREE.Color(e.color) : new THREE.Color(16777215), this.map = void 0 !== e.map ? e.map : null, this.lightMap = void 0 !== e.lightMap ? e.lightMap : null, this.envMap = void 0 !== e.envMap ? e.envMap : null, this.combine = void 0 !== e.combine ? e.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== e.reflectivity ? e.reflectivity : 1, this.refractionRatio = void 0 !== e.refractionRatio ? e.refractionRatio : .98, this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading, this.wireframe = void 0 !== e.wireframe && e.wireframe, this.wireframeLinewidth = void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== e.wireframeLinecap ? e.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== e.wireframeLinejoin ? e.wireframeLinejoin : "round", this.vertexColors = void 0 !== e.vertexColors && e.vertexColors, this.skinning = void 0 !== e.skinning && e.skinning, this.morphTargets = void 0 !== e.morphTargets && e.morphTargets
}, THREE.MeshLambertMaterial.prototype = new THREE.Material, THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial, THREE.MeshPhongMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.color = void 0 !== e.color ? new THREE.Color(e.color) : new THREE.Color(16777215), this.ambient = void 0 !== e.ambient ? new THREE.Color(e.ambient) : new THREE.Color(328965), this.specular = void 0 !== e.specular ? new THREE.Color(e.specular) : new THREE.Color(1118481), this.shininess = void 0 !== e.shininess ? e.shininess : 30, this.map = void 0 !== e.map ? e.map : null, this.lightMap = void 0 !== e.lightMap ? e.lightMap : null, this.envMap = void 0 !== e.envMap ? e.envMap : null, this.combine = void 0 !== e.combine ? e.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== e.reflectivity ? e.reflectivity : 1, this.refractionRatio = void 0 !== e.refractionRatio ? e.refractionRatio : .98, this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading, this.wireframe = void 0 !== e.wireframe && e.wireframe, this.wireframeLinewidth = void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== e.wireframeLinecap ? e.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== e.wireframeLinejoin ? e.wireframeLinejoin : "round", this.vertexColors = void 0 !== e.vertexColors && e.vertexColors, this.skinning = void 0 !== e.skinning && e.skinning, this.morphTargets = void 0 !== e.morphTargets && e.morphTargets
}, THREE.MeshPhongMaterial.prototype = new THREE.Material, THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial, THREE.MeshDepthMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading, this.wireframe = void 0 !== e.wireframe && e.wireframe, this.wireframeLinewidth = void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1
}, THREE.MeshDepthMaterial.prototype = new THREE.Material, THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial, THREE.MeshNormalMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.shading = e.shading ? e.shading : THREE.FlatShading, this.wireframe = !!e.wireframe && e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth ? e.wireframeLinewidth : 1
}, THREE.MeshNormalMaterial.prototype = new THREE.Material, THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial, THREE.MeshFaceMaterial = function() {}, THREE.MeshShaderMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.fragmentShader = void 0 !== e.fragmentShader ? e.fragmentShader : "void main() {}", this.vertexShader = void 0 !== e.vertexShader ? e.vertexShader : "void main() {}", this.uniforms = void 0 !== e.uniforms ? e.uniforms : {}, this.attributes = e.attributes, this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading, this.wireframe = void 0 !== e.wireframe && e.wireframe, this.wireframeLinewidth = void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1, this.fog = void 0 !== e.fog && e.fog, this.lights = void 0 !== e.lights && e.lights, this.vertexColors = void 0 !== e.vertexColors && e.vertexColors, this.skinning = void 0 !== e.skinning && e.skinning, this.morphTargets = void 0 !== e.morphTargets && e.morphTargets
}, THREE.MeshShaderMaterial.prototype = new THREE.Material, THREE.MeshShaderMaterial.prototype.constructor = THREE.MeshShaderMaterial, THREE.ParticleBasicMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.color = void 0 !== e.color ? new THREE.Color(e.color) : new THREE.Color(16777215), this.map = void 0 !== e.map ? e.map : null, this.size = void 0 !== e.size ? e.size : 1, this.sizeAttenuation = void 0 === e.sizeAttenuation || e.sizeAttenuation, this.vertexColors = void 0 !== e.vertexColors && e.vertexColors
}, THREE.ParticleBasicMaterial.prototype = new THREE.Material, THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial, THREE.ShadowVolumeDynamicMaterial = function(e) {
    THREE.Material.call(this, e), e = e || {}, this.color = void 0 !== e.color ? new THREE.Color(e.color) : new THREE.Color(16777215), this.map = void 0 !== e.map ? e.map : null, this.lightMap = void 0 !== e.lightMap ? e.lightMap : null, this.envMap = void 0 !== e.envMap ? e.envMap : null, this.combine = void 0 !== e.combine ? e.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== e.reflectivity ? e.reflectivity : 1, this.refractionRatio = void 0 !== e.refractionRatio ? e.refractionRatio : .98, this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading, this.wireframe = void 0 !== e.wireframe && e.wireframe, this.wireframeLinewidth = void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== e.wireframeLinecap ? e.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== e.wireframeLinejoin ? e.wireframeLinejoin : "round", this.vertexColors = void 0 !== e.vertexColors && e.vertexColors, this.skinning = void 0 !== e.skinning && e.skinning, this.morphTargets = void 0 !== e.morphTargets && e.morphTargets
}, THREE.ShadowVolumeDynamicMaterial.prototype = new THREE.Material, THREE.ShadowVolumeDynamicMaterial.prototype.constructor = THREE.ShadowVolumeDynamicMaterial, THREE.Texture = function(e, t, i, n, r, o) {
    this.image = e, this.mapping = void 0 !== t ? t : new THREE.UVMapping, this.wrapS = void 0 !== i ? i : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== n ? n : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== r ? r : THREE.LinearFilter, this.minFilter = void 0 !== o ? o : THREE.LinearMipMapLinearFilter, this.needsUpdate = !1
}, THREE.Texture.prototype = {
    clone: function() {
        return new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter)
    }
}, THREE.MultiplyOperation = 0, THREE.MixOperation = 1, THREE.RepeatWrapping = 0, THREE.ClampToEdgeWrapping = 1, THREE.MirroredRepeatWrapping = 2, THREE.NearestFilter = 3, THREE.NearestMipMapNearestFilter = 4, THREE.NearestMipMapLinearFilter = 5, THREE.LinearFilter = 6, THREE.LinearMipMapNearestFilter = 7, THREE.LinearMipMapLinearFilter = 8, THREE.ByteType = 9, THREE.UnsignedByteType = 10, THREE.ShortType = 11, THREE.UnsignedShortType = 12, THREE.IntType = 13, THREE.UnsignedIntType = 14, THREE.FloatType = 15, THREE.AlphaFormat = 16, THREE.RGBFormat = 17, THREE.RGBAFormat = 18, THREE.LuminanceFormat = 19, THREE.LuminanceAlphaFormat = 20, THREE.Particle = function(e) {
    THREE.Object3D.call(this), this.materials = e instanceof Array ? e : [e]
}, THREE.Particle.prototype = new THREE.Object3D, THREE.Particle.prototype.constructor = THREE.Particle, THREE.ParticleSystem = function(e, t) {
    THREE.Object3D.call(this), this.geometry = e, this.materials = t instanceof Array ? t : [t], this.sortParticles = !1
}, THREE.ParticleSystem.prototype = new THREE.Object3D, THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem, THREE.Line = function(e, t, i) {
    THREE.Object3D.call(this), this.geometry = e, this.materials = t instanceof Array ? t : [t], this.type = void 0 != i ? i : THREE.LineStrip
}, THREE.LineStrip = 0, THREE.LinePieces = 1, THREE.Line.prototype = new THREE.Object3D, THREE.Line.prototype.constructor = THREE.Line, THREE.Mesh = function(e, t) {
    if (THREE.Object3D.call(this), this.geometry = e, this.materials = t && t.length ? t : [t], this.flipSided = !1, this.doubleSided = !1, this.overdraw = !1, this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = e.boundingSphere.radius, this.geometry.morphTargets.length)) {
        this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (var i = 0; i < this.geometry.morphTargets.length; i++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[i].name] = i
    }
}, THREE.Mesh.prototype = new THREE.Object3D, THREE.Mesh.prototype.constructor = THREE.Mesh, THREE.Mesh.prototype.supr = THREE.Object3D.prototype, THREE.Mesh.prototype.getMorphTargetIndexByName = function(e) {
    return void 0 !== this.morphTargetDictionary[e] ? this.morphTargetDictionary[e] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + e + " does not exist. Returning 0."), 0)
}, THREE.Bone = function(e) {
    THREE.Object3D.call(this), this.skin = e, this.skinMatrix = new THREE.Matrix4, this.hasNoneBoneChildren = !1
}, THREE.Bone.prototype = new THREE.Object3D, THREE.Bone.prototype.constructor = THREE.Bone, THREE.Bone.prototype.supr = THREE.Object3D.prototype, THREE.Bone.prototype.update = function(e, t, i) {
    this.matrixAutoUpdate && (t |= this.updateMatrix()), (t || this.matrixWorldNeedsUpdate) && (e ? this.skinMatrix.multiply(e, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
    var n, r = this.children.length;
    if (this.hasNoneBoneChildren)
        for (this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix), n = 0; n < r; n++)(e = this.children[n]) instanceof THREE.Bone ? e.update(this.skinMatrix, t, i) : e.update(this.matrixWorld, !0, i);
    else
        for (n = 0; n < r; n++) this.children[n].update(this.skinMatrix, t, i)
}, THREE.Bone.prototype.addChild = function(e) {
    -1 === this.children.indexOf(e) && (void 0 !== e.parent && e.parent.removeChild(e), e.parent = this, this.children.push(e), e instanceof THREE.Bone || (this.hasNoneBoneChildren = !0))
}, THREE.SkinnedMesh = function(e, t) {
    THREE.Mesh.call(this, e, t), this.identityMatrix = new THREE.Matrix4, this.bones = [], this.boneMatrices = [];
    var i, n, r, o, a, s;
    if (void 0 !== this.geometry.bones) {
        for (i = 0; i < this.geometry.bones.length; i++) o = (r = this.geometry.bones[i]).pos, a = r.rotq, s = r.scl, (n = this.addBone()).name = r.name, n.position.set(o[0], o[1], o[2]), n.quaternion.set(a[0], a[1], a[2], a[3]), n.useQuaternion = !0, void 0 !== s ? n.scale.set(s[0], s[1], s[2]) : n.scale.set(1, 1, 1);
        for (i = 0; i < this.bones.length; i++) r = this.geometry.bones[i], n = this.bones[i], -1 === r.parent ? this.addChild(n) : this.bones[r.parent].addChild(n);
        this.boneMatrices = new Float32Array(16 * this.bones.length), this.pose()
    }
}, THREE.SkinnedMesh.prototype = new THREE.Mesh, THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh, THREE.SkinnedMesh.prototype.update = function(e, t, i) {
    if (this.visible) {
        this.matrixAutoUpdate && (t |= this.updateMatrix()), (t || this.matrixWorldNeedsUpdate) && (e ? this.matrixWorld.multiply(e, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
        var n, r = this.children.length;
        for (n = 0; n < r; n++)(e = this.children[n]) instanceof THREE.Bone ? e.update(this.identityMatrix, !1, i) : e.update(this.matrixWorld, t, i);
        for (i = this.bones.length, ba = this.bones, bm = this.boneMatrices, t = 0; t < i; t++) ba[t].skinMatrix.flattenToArrayOffset(bm, 16 * t)
    }
}, THREE.SkinnedMesh.prototype.addBone = function(e) {
    return void 0 === e && (e = new THREE.Bone(this)), this.bones.push(e), e
}, THREE.SkinnedMesh.prototype.pose = function() {
    this.update(void 0, !0);
    for (var e, t = [], i = 0; i < this.bones.length; i++) e = this.bones[i], t.push(THREE.Matrix4.makeInvert(e.skinMatrix)), e.skinMatrix.flattenToArrayOffset(this.boneMatrices, 16 * i);
    if (void 0 === this.geometry.skinVerticesA) {
        this.geometry.skinVerticesA = [], this.geometry.skinVerticesB = [];
        var n;
        for (e = 0; e < this.geometry.skinIndices.length; e++) {
            i = this.geometry.vertices[e].position;
            var r = this.geometry.skinIndices[e].x,
                o = this.geometry.skinIndices[e].y;
            n = new THREE.Vector3(i.x, i.y, i.z), this.geometry.skinVerticesA.push(t[r].multiplyVector3(n)), n = new THREE.Vector3(i.x, i.y, i.z), this.geometry.skinVerticesB.push(t[o].multiplyVector3(n)), this.geometry.skinWeights[e].x + this.geometry.skinWeights[e].y !== 1 && (i = .5 * (1 - (this.geometry.skinWeights[e].x + this.geometry.skinWeights[e].y)), this.geometry.skinWeights[e].x += i, this.geometry.skinWeights[e].y += i)
        }
    }
}, THREE.Ribbon = function(e, t) {
    THREE.Object3D.call(this), this.geometry = e, this.materials = t instanceof Array ? t : [t], this.flipSided = !1, this.doubleSided = !1
}, THREE.Ribbon.prototype = new THREE.Object3D, THREE.Ribbon.prototype.constructor = THREE.Ribbon, THREE.Sound = function(e, t, i, n) {
    THREE.Object3D.call(this), this.isLoaded = !1, this.isAddedToDOM = !1, this.isPlaying = !1, this.duration = -1, this.radius = void 0 !== t ? Math.abs(t) : 100, this.volume = Math.min(1, Math.max(0, void 0 !== i ? i : 1)), this.domElement = document.createElement("audio"), this.domElement.volume = 0, this.domElement.pan = 0, this.domElement.loop = void 0 === n || n, this.sources = e instanceof Array ? e : [e];
    var r;
    for (i = this.sources.length, e = 0; e < i; e++)
        if ((t = this.sources[e]).toLowerCase(), -1 !== t.indexOf(".mp3") ? r = "audio/mpeg" : -1 !== t.indexOf(".ogg") ? r = "audio/ogg" : -1 !== t.indexOf(".wav") && (r = "audio/wav"), this.domElement.canPlayType(r)) {
            (r = document.createElement("source")).src = this.sources[e], this.domElement.THREESound = this, this.domElement.appendChild(r), this.domElement.addEventListener("canplay", this.onLoad, !0), this.domElement.load();
            break
        }
}, THREE.Sound.prototype = new THREE.Object3D, THREE.Sound.prototype.constructor = THREE.Sound, THREE.Sound.prototype.supr = THREE.Object3D.prototype, THREE.Sound.prototype.onLoad = function() {
    var e = this.THREESound;
    e.isLoaded || (this.removeEventListener("canplay", this.onLoad, !0), e.isLoaded = !0, e.duration = this.duration, e.isPlaying && e.play())
}, THREE.Sound.prototype.addToDOM = function(e) {
    this.isAddedToDOM = !0, e.appendChild(this.domElement)
}, THREE.Sound.prototype.play = function(e) {
    this.isPlaying = !0, this.isLoaded && (this.domElement.play(), e && (this.domElement.currentTime = e % this.duration))
}, THREE.Sound.prototype.pause = function() {
    this.isPlaying = !1, this.domElement.pause()
}, THREE.Sound.prototype.stop = function() {
    this.isPlaying = !1, this.domElement.pause(), this.domElement.currentTime = 0
}, THREE.Sound.prototype.calculateVolumeAndPan = function(e) {
    e = e.length(), this.domElement.volume = e <= this.radius ? this.volume * (1 - e / this.radius) : 0
}, THREE.Sound.prototype.update = function(e, t, i) {
    this.matrixAutoUpdate && (this.matrix.setPosition(this.position), t = !0), (t || this.matrixWorldNeedsUpdate) && (e ? this.matrixWorld.multiply(e, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
    var n = this.children.length;
    for (e = 0; e < n; e++) this.children[e].update(this.matrixWorld, t, i)
}, THREE.LOD = function() {
    THREE.Object3D.call(this), this.LODs = []
}, THREE.LOD.prototype = new THREE.Object3D, THREE.LOD.prototype.constructor = THREE.LOD, THREE.LOD.prototype.supr = THREE.Object3D.prototype, THREE.LOD.prototype.add = function(e, t) {
    void 0 === t && (t = 0), t = Math.abs(t);
    for (var i = 0; i < this.LODs.length && !(t < this.LODs[i].visibleAtDistance); i++);
    this.LODs.splice(i, 0, {
        visibleAtDistance: t,
        object3D: e
    }), this.addChild(e)
}, THREE.LOD.prototype.update = function(e, t, i) {
    if (this.matrixAutoUpdate && (t |= this.updateMatrix()), (t || this.matrixWorldNeedsUpdate) && (e ? this.matrixWorld.multiply(e, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0), this.LODs.length > 1) {
        e = -((e = i.matrixWorldInverse).n31 * this.position.x + e.n32 * this.position.y + e.n33 * this.position.z + e.n34), this.LODs[0].object3D.visible = !0;
        for (var n = 1; n < this.LODs.length && e >= this.LODs[n].visibleAtDistance; n++) this.LODs[n - 1].object3D.visible = !1, this.LODs[n].object3D.visible = !0;
        for (; n < this.LODs.length; n++) this.LODs[n].object3D.visible = !1
    }
    for (e = 0; e < this.children.length; e++) this.children[e].update(this.matrixWorld, t, i)
}, THREE.ShadowVolume = function(e, t) {
    e instanceof THREE.Mesh ? (THREE.Mesh.call(this, e.geometry, [new THREE.ShadowVolumeDynamicMaterial]), e.addChild(this)) : THREE.Mesh.call(this, e, [new THREE.ShadowVolumeDynamicMaterial]), this.calculateShadowVolumeGeometry()
}, THREE.ShadowVolume.prototype = new THREE.Mesh, THREE.ShadowVolume.prototype.constructor = THREE.ShadowVolume, THREE.ShadowVolume.prototype.supr = THREE.Mesh.prototype, THREE.ShadowVolume.prototype.calculateShadowVolumeGeometry = function() {
    if (this.geometry.edges && this.geometry.edges.length) {
        var e, t, i, n, r, o, a, s, l, h, c, u, f, d, E = new THREE.Geometry;
        E.vertices = this.geometry.vertices, n = E.faces = this.geometry.faces;
        var p = E.egdes = this.geometry.edges,
            m = E.edgeFaces = [];
        r = 0;
        var v = [];
        for (e = 0, t = n.length; e < t; e++) i = n[e], v.push(r), r += i instanceof THREE.Face3 ? 3 : 4, i.vertexNormals[0] = i.normal, i.vertexNormals[1] = i.normal, i.vertexNormals[2] = i.normal, i instanceof THREE.Face4 && (i.vertexNormals[3] = i.normal);
        for (e = 0, t = p.length; e < t; e++) i = (s = p[e]).faces[0], n = s.faces[1], r = s.faceIndices[0], o = s.faceIndices[1], a = s.vertexIndices[0], s = s.vertexIndices[1], i.a === a ? (l = "a", c = v[r] + 0) : i.b === a ? (l = "b", c = v[r] + 1) : i.c === a ? (l = "c", c = v[r] + 2) : i.d === a && (l = "d", c = v[r] + 3), i.a === s ? (l += "a", u = v[r] + 0) : i.b === s ? (l += "b", u = v[r] + 1) : i.c === s ? (l += "c", u = v[r] + 2) : i.d === s && (l += "d", u = v[r] + 3), n.a === a ? (h = "a", f = v[o] + 0) : n.b === a ? (h = "b", f = v[o] + 1) : n.c === a ? (h = "c", f = v[o] + 2) : n.d === a && (h = "d", f = v[o] + 3), n.a === s ? (h += "a", d = v[o] + 0) : n.b === s ? (h += "b", d = v[o] + 1) : n.c === s ? (h += "c", d = v[o] + 2) : n.d === s && (h += "d", d = v[o] + 3), "ac" === l || "ad" === l || "ca" === l || "da" === l ? c > u && (i = c, c = u, u = i) : c < u && (i = c, c = u, u = i), "ac" === h || "ad" === h || "ca" === h || "da" === h ? f > d && (i = f, f = d, d = i) : f < d && (i = f, f = d, d = i), (i = new THREE.Face4(c, u, f, d)).normal.set(1, 0, 0), m.push(i);
        this.geometry = E
    } else this.calculateShadowVolumeGeometryWithoutEdgeInfo(this.geometry)
}, THREE.ShadowVolume.prototype.calculateShadowVolumeGeometryWithoutEdgeInfo = function(e) {
    this.geometry = new THREE.Geometry, this.geometry.boundingSphere = e.boundingSphere, this.geometry.edgeFaces = [];
    var t = this.geometry.vertices,
        i = this.geometry.faces,
        n = this.geometry.edgeFaces,
        r = e.faces;
    e = e.vertices;
    var o, a, s, l, h, c = r.length,
        u = ["a", "b", "c", "d"];
    for (s = 0; s < c; s++)
        for (a = t.length, (o = r[s]) instanceof THREE.Face4 ? (l = 4, a = new THREE.Face4(a, a + 1, a + 2, a + 3)) : (l = 3, a = new THREE.Face3(a, a + 1, a + 2)), a.normal.copy(o.normal), i.push(a), a = 0; a < l; a++) h = e[o[u[a]]], t.push(new THREE.Vertex(h.position.clone()));
    for (c = 0; c < r.length - 1; c++)
        for (e = i[c], o = c + 1; o < r.length; o++) a = i[o], void 0 !== (a = this.facesShareEdge(t, e, a)) && ((a = new THREE.Face4(a.indices[0], a.indices[3], a.indices[2], a.indices[1])).normal.set(1, 0, 0), n.push(a))
}, THREE.ShadowVolume.prototype.facesShareEdge = function(e, t, i) {
    var n, r, o, a, s, l, h, c, u, f, d, E, p, m = 0,
        v = ["a", "b", "c", "d"];
    for (n = t instanceof THREE.Face4 ? 4 : 3, r = i instanceof THREE.Face4 ? 4 : 3, E = 0; E < n; E++)
        for (s = e[o = t[v[E]]], p = 0; p < r; p++)
            if (a = i[v[p]], l = e[a], Math.abs(s.position.x - l.position.x) < 1e-4 && Math.abs(s.position.y - l.position.y) < 1e-4 && Math.abs(s.position.z - l.position.z) < 1e-4 && (1 == ++m && (h = s, c = l, u = o, f = a, d = v[E]), 2 === m)) return d += v[E], "ad" === d || "ac" === d ? {
                faces: [t, i],
                vertices: [h, c, l, s],
                indices: [u, f, a, o],
                vertexTypes: [1, 2, 2, 1],
                extrudable: !0
            } : {
                faces: [t, i],
                vertices: [h, s, l, c],
                indices: [u, o, a, f],
                vertexTypes: [1, 1, 2, 2],
                extrudable: !0
            }
}, THREE.Scene = function() {
    THREE.Object3D.call(this), this.matrixAutoUpdate = !1, this.collisions = this.fog = null, this.objects = [], this.lights = [], this.sounds = [], this.__objectsAdded = [], this.__objectsRemoved = []
}, THREE.Scene.prototype = new THREE.Object3D, THREE.Scene.prototype.constructor = THREE.Scene, THREE.Scene.prototype.supr = THREE.Object3D.prototype, THREE.Scene.prototype.addChild = function(e) {
    this.supr.addChild.call(this, e), this.addChildRecurse(e)
}, THREE.Scene.prototype.addChildRecurse = function(e) {
    e instanceof THREE.Light ? -1 === this.lights.indexOf(e) && this.lights.push(e) : e instanceof THREE.Sound ? -1 === this.sounds.indexOf(e) && this.sounds.push(e) : e instanceof THREE.Camera || e instanceof THREE.Bone || -1 !== this.objects.indexOf(e) || (this.objects.push(e), this.__objectsAdded.push(e));
    for (var t = 0; t < e.children.length; t++) this.addChildRecurse(e.children[t])
}, THREE.Scene.prototype.removeChild = function(e) {
    this.supr.removeChild.call(this, e), this.removeChildRecurse(e)
}, THREE.Scene.prototype.removeChildRecurse = function(e) {
    if (e instanceof THREE.Light) {
        var t = this.lights.indexOf(e); - 1 !== t && this.lights.splice(t, 1)
    } else e instanceof THREE.Sound ? -1 !== (t = this.sounds.indexOf(e)) && this.sounds.splice(t, 1) : e instanceof THREE.Camera || -1 !== (t = this.objects.indexOf(e)) && (this.objects.splice(t, 1), this.__objectsRemoved.push(e));
    for (t = 0; t < e.children.length; t++) this.removeChildRecurse(e.children[t])
}, THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild, THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild, THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild, THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild, THREE.Fog = function(e, t, i) {
    this.color = new THREE.Color(e), this.near = t || 1, this.far = i || 1e3
}, THREE.FogExp2 = function(e, t) {
    this.color = new THREE.Color(e), this.density = void 0 !== t ? t : 25e-5
}, THREE.Projector = function() {
    function e() {
        var e = p[a] = p[a] || new THREE.RenderableVertex;
        return a++, e
    }

    function t(e, t) {
        return t.z - e.z
    }

    function i(e, t) {
        var i = 0,
            n = 1,
            r = e.z + e.w,
            o = t.z + t.w,
            a = -e.z + e.w,
            s = -t.z + t.w;
        return r >= 0 && o >= 0 && a >= 0 && s >= 0 || !(r < 0 && o < 0 || a < 0 && s < 0) && (r < 0 ? i = Math.max(i, r / (r - o)) : o < 0 && (n = Math.min(n, r / (r - o))), a < 0 ? i = Math.max(i, a / (a - s)) : s < 0 && (n = Math.min(n, a / (a - s))), !(n < i || (e.lerpSelf(t, i), t.lerpSelf(e, 1 - n), 0)))
    }
    var n, r, o, a, s, l, h, c, u, f, d, E = [],
        p = [],
        m = [],
        v = [],
        g = [],
        T = [],
        y = new THREE.Vector4,
        R = new THREE.Vector4,
        x = new THREE.Matrix4,
        _ = new THREE.Matrix4,
        b = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4],
        H = new THREE.Vector4,
        w = new THREE.Vector4;
    this.projectVector = function(e, t) {
        return x.multiply(t.projectionMatrix, t.matrixWorldInverse), x.multiplyVector3(e), e
    }, this.unprojectVector = function(e, t) {
        return x.multiply(t.matrixWorld, THREE.Matrix4.makeInvert(t.projectionMatrix)), x.multiplyVector3(e), e
    }, this.projectObjects = function(e, i, o) {
        i = [];
        var a, s, l;
        for (r = 0, s = e.objects, e = 0, a = s.length; e < a; e++) {
            var h;
            if (!(h = !(l = s[e]).visible) && (h = l instanceof THREE.Mesh)) {
                e: {
                    h = void 0;
                    for (var c = l.matrixWorld, u = -l.geometry.boundingSphere.radius * Math.max(l.scale.x, Math.max(l.scale.y, l.scale.z)), f = 0; f < 6; f++)
                        if ((h = b[f].x * c.n14 + b[f].y * c.n24 + b[f].z * c.n34 + b[f].w) <= u) {
                            h = !1;
                            break e
                        }
                    h = !0
                }
                h = !h
            }
            h || (h = E[r] = E[r] || new THREE.RenderableObject, r++, n = h, y.copy(l.position), x.multiplyVector3(y), n.object = l, n.z = y.z, i.push(n))
        }
        return o && i.sort(t), i
    }, this.projectScene = function(n, r, E) {
        var y, M, S, A, C, L, F, z, V, U, B, k, D, P, N, I, O, W = [],
            j = r.near,
            G = r.far;
        for (d = u = h = l = 0, r.matrixAutoUpdate && r.update(void 0, !0), n.update(void 0, !1, r), x.multiply(r.projectionMatrix, r.matrixWorldInverse), b[0].set(x.n41 - x.n11, x.n42 - x.n12, x.n43 - x.n13, x.n44 - x.n14), b[1].set(x.n41 + x.n11, x.n42 + x.n12, x.n43 + x.n13, x.n44 + x.n14), b[2].set(x.n41 + x.n21, x.n42 + x.n22, x.n43 + x.n23, x.n44 + x.n24), b[3].set(x.n41 - x.n21, x.n42 - x.n22, x.n43 - x.n23, x.n44 - x.n24), b[4].set(x.n41 - x.n31, x.n42 - x.n32, x.n43 - x.n33, x.n44 - x.n34), b[5].set(x.n41 + x.n31, x.n42 + x.n32, x.n43 + x.n33, x.n44 + x.n34), y = 0; y < 6; y++)(V = b[y]).divideScalar(Math.sqrt(V.x * V.x + V.y * V.y + V.z * V.z));
        for (V = this.projectObjects(n, r, !0), n = 0, y = V.length; n < y; n++)
            if ((U = V[n].object).visible)
                if (B = U.matrixWorld, k = U.matrixRotationWorld, D = U.materials, P = U.overdraw, a = 0, U instanceof THREE.Mesh) {
                    for (A = (N = U.geometry).vertices, I = N.faces, N = N.faceVertexUvs, M = 0, S = A.length; M < S; M++)(o = e()).positionWorld.copy(A[M].position), B.multiplyVector3(o.positionWorld), o.positionScreen.copy(o.positionWorld), x.multiplyVector4(o.positionScreen), o.positionScreen.x /= o.positionScreen.w, o.positionScreen.y /= o.positionScreen.w, o.visible = o.positionScreen.z > j && o.positionScreen.z < G;
                    for (A = 0, M = I.length; A < M; A++) {
                        if ((S = I[A]) instanceof THREE.Face3) {
                            if (C = p[S.a], L = p[S.b], F = p[S.c], !(C.visible && L.visible && F.visible) || !U.doubleSided && U.flipSided == (F.positionScreen.x - C.positionScreen.x) * (L.positionScreen.y - C.positionScreen.y) - (F.positionScreen.y - C.positionScreen.y) * (L.positionScreen.x - C.positionScreen.x) < 0) continue;
                            z = m[l] = m[l] || new THREE.RenderableFace3, l++, (s = z).v1.copy(C), s.v2.copy(L), s.v3.copy(F)
                        } else if (S instanceof THREE.Face4) {
                            if (C = p[S.a], L = p[S.b], F = p[S.c], z = p[S.d], !(C.visible && L.visible && F.visible && z.visible) || !U.doubleSided && U.flipSided == ((z.positionScreen.x - C.positionScreen.x) * (L.positionScreen.y - C.positionScreen.y) - (z.positionScreen.y - C.positionScreen.y) * (L.positionScreen.x - C.positionScreen.x) < 0 || (L.positionScreen.x - F.positionScreen.x) * (z.positionScreen.y - F.positionScreen.y) - (L.positionScreen.y - F.positionScreen.y) * (z.positionScreen.x - F.positionScreen.x) < 0)) continue;
                            O = v[h] = v[h] || new THREE.RenderableFace4, h++, (s = O).v1.copy(C), s.v2.copy(L), s.v3.copy(F), s.v4.copy(z)
                        }
                        for (s.normalWorld.copy(S.normal), k.multiplyVector3(s.normalWorld), s.centroidWorld.copy(S.centroid), B.multiplyVector3(s.centroidWorld), s.centroidScreen.copy(s.centroidWorld), x.multiplyVector3(s.centroidScreen), C = 0, L = (F = S.vertexNormals).length; C < L; C++)(z = s.vertexNormalsWorld[C]).copy(F[C]), k.multiplyVector3(z);
                        for (C = 0, L = N.length; C < L; C++)
                            if (O = N[C][A])
                                for (F = 0, z = O.length; F < z; F++) s.uvs[C][F] = O[F];
                        s.meshMaterials = D, s.faceMaterials = S.materials, s.overdraw = P, s.z = s.centroidScreen.z, W.push(s)
                    }
                } else if (U instanceof THREE.Line)
                    for (_.multiply(x, B), A = U.geometry.vertices, (C = e()).positionScreen.copy(A[0].position), _.multiplyVector4(C.positionScreen), M = 1, S = A.length; M < S; M++)(C = e()).positionScreen.copy(A[M].position), _.multiplyVector4(C.positionScreen), L = p[a - 2], H.copy(C.positionScreen), w.copy(L.positionScreen), i(H, w) && (H.multiplyScalar(1 / H.w), w.multiplyScalar(1 / w.w), B = g[u] = g[u] || new THREE.RenderableLine, u++, (c = B).v1.positionScreen.copy(H), c.v2.positionScreen.copy(w), c.z = Math.max(H.z, w.z), c.materials = U.materials, W.push(c));
                else U instanceof THREE.Particle && (R.set(U.matrixWorld.n14, U.matrixWorld.n24, U.matrixWorld.n34, 1), x.multiplyVector4(R), R.z /= R.w, R.z > 0 && R.z < 1 && (B = T[d] = T[d] || new THREE.RenderableParticle, d++, (f = B).x = R.x / R.w, f.y = R.y / R.w, f.z = R.z, f.rotation = U.rotation.z, f.scale.x = U.scale.x * Math.abs(f.x - (R.x + r.projectionMatrix.n11) / (R.w + r.projectionMatrix.n14)), f.scale.y = U.scale.y * Math.abs(f.y - (R.y + r.projectionMatrix.n22) / (R.w + r.projectionMatrix.n24)), f.materials = U.materials, W.push(f)));
        return E && W.sort(t), W
    }
}, THREE.SoundRenderer = function() {
    this.volume = 1, this.domElement = document.createElement("div"), this.domElement.id = "THREESound", this.cameraPosition = new THREE.Vector3, this.soundPosition = new THREE.Vector3, this.render = function(e, t, i) {
        i && e.update(void 0, !1, t);
        var n, r = (i = e.sounds).length;
        for (n = 0; n < r; n++) e = i[n], this.soundPosition.set(e.matrixWorld.n14, e.matrixWorld.n24, e.matrixWorld.n34), this.soundPosition.subSelf(t.position), e.isPlaying && e.isLoaded && (e.isAddedToDOM || e.addToDOM(this.domElement), e.calculateVolumeAndPan(this.soundPosition))
    }
}, THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\n#endif",
    map_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",
    map_vertex: "#ifdef USE_MAP\nvUv = uv;\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_pars_vertex: "uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
    lights_vertex: "if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}",
    lights_pars_fragment: "#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + vViewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\nvColor = color;\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif"
}, THREE.UniformsUtils = {
    merge: function(e) {
        var t, i, n, r = {};
        for (t = 0; t < e.length; t++) {
            n = this.clone(e[t]);
            for (i in n) r[i] = n[i]
        }
        return r
    },
    clone: function(e) {
        var t, i, n, r = {};
        for (t in e) {
            r[t] = {};
            for (i in e[t]) n = e[t][i], r[t][i] = n instanceof THREE.Color || n instanceof THREE.Vector3 || n instanceof THREE.Texture ? n.clone() : n
        }
        return r
    }
}, THREE.UniformsLib = {
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
            value: 0,
            texture: null
        },
        lightMap: {
            type: "t",
            value: 2,
            texture: null
        },
        envMap: {
            type: "t",
            value: 1,
            texture: null
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
            value: .98
        },
        combine: {
            type: "i",
            value: 0
        },
        fogDensity: {
            type: "f",
            value: 25e-5
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    lights: {
        enableLighting: {
            type: "i",
            value: 1
        },
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
            value: 0,
            texture: null
        },
        fogDensity: {
            type: "f",
            value: 25e-5
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    }
}, THREE.ShaderLib = {
    lensFlareVertexTexture: {
        vertexShader: "uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nuniform\tsampler2D\tocclusionMap;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvarying\tfloat\tvVisibility;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ));\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvarying\tfloat\t\tvVisibility;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * vVisibility;\ngl_FragColor = color;\n}\n}"
    },
    lensFlare: {
        vertexShader: "uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tsampler2D\tocclusionMap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 )).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * visibility;\ngl_FragColor = color;\n}\n}"
    },
    sprite: {
        vertexShader: "uniform\tint\t\tuseScreenCoordinates;\nuniform    int     affectedByDistance;\nuniform\tvec3\tscreenPosition;\nuniform \tmat4 \tmodelViewMatrix;\nuniform \tmat4 \tprojectionMatrix;\nuniform    float   rotation;\nuniform    vec2    scale;\nuniform    vec2    alignment;\nuniform    vec2    uvOffset;\nuniform\tvec2    uvScale;\nattribute \tvec2 \tposition;\nattribute  vec2\tuv;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity;\ngl_FragColor = color;\n}"
    },
    shadowPost: {
        vertexShader: "uniform \tmat4 \tprojectionMatrix;\nattribute \tvec3 \tposition;\nvoid main(void)\n{\ngl_Position = projectionMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform \tfloat \tdarkness;\nvoid main( void )\n{\ngl_FragColor = vec4( 0, 0, 0, darkness );\n}"
    },
    shadowVolumeDynamic: {
        uniforms: {
            directionalLightDirection: {
                type: "fv",
                value: []
            }
        },
        vertexShader: "uniform \tvec3 \tdirectionalLightDirection;\nvoid main() {\nvec4 pos      = objectMatrix * vec4( position, 1.0 );\nvec3 norm     = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nvec4 extruded = vec4( directionalLightDirection * 5000.0 * step( 0.0, dot( directionalLightDirection, norm )), 0.0 );\ngl_Position   = projectionMatrix * viewMatrix * ( pos + extruded );\n}",
        fragmentShader: "void main() {\ngl_FragColor = vec4( 1.0 );\n}"
    },
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2e3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}"
    },
    basic: {
        uniforms: THREE.UniformsLib.common,
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights]),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );\ngl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["varying vec3 vLightWeighting;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "vec3 transformedNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, {
            ambient: {
                type: "c",
                value: new THREE.Color(328965)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            }
        }]),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_pars_fragment, "void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.lights_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsLib.particle,
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n")
    }
}, THREE.WebGLRenderer = function(e) {
    function t(e, t, i) {
        var n, r, o, a = e.vertices,
            s = a.length,
            l = e.colors,
            h = l.length,
            c = e.__vertexArray,
            u = e.__colorArray,
            f = e.__sortArray,
            d = e.__dirtyVertices,
            E = e.__dirtyColors;
        if (i.sortParticles) {
            for (G.multiplySelf(i.matrixWorld), n = 0; n < s; n++) r = a[n].position, q.copy(r), G.multiplyVector3(q), f[n] = [q.z, n];
            for (f.sort(function(e, t) {
                return t[0] - e[0]
            }), n = 0; n < s; n++) r = a[f[n][1]].position, c[o = 3 * n] = r.x, c[o + 1] = r.y, c[o + 2] = r.z;
            for (n = 0; n < h; n++) o = 3 * n, color = l[f[n][1]], u[o] = color.r, u[o + 1] = color.g, u[o + 2] = color.b
        } else {
            if (d)
                for (n = 0; n < s; n++) r = a[n].position, c[o = 3 * n] = r.x, c[o + 1] = r.y, c[o + 2] = r.z;
            if (E)
                for (n = 0; n < h; n++) color = l[n], u[o = 3 * n] = color.r, u[o + 1] = color.g, u[o + 2] = color.b
        }(d || i.sortParticles) && (A.bindBuffer(A.ARRAY_BUFFER, e.__webglVertexBuffer), A.bufferData(A.ARRAY_BUFFER, c, t)), (E || i.sortParticles) && (A.bindBuffer(A.ARRAY_BUFFER, e.__webglColorBuffer), A.bufferData(A.ARRAY_BUFFER, u, t))
    }

    function i(e, t, i, n, r) {
        n.program || C.initMaterial(n, t, i, r);
        var o = n.program,
            a = o.uniforms,
            s = n.uniforms;
        if (o != z && (A.useProgram(o), z = o), A.uniformMatrix4fv(a.projectionMatrix, !1, X), i && (n instanceof THREE.MeshBasicMaterial || n instanceof THREE.MeshLambertMaterial || n instanceof THREE.MeshPhongMaterial || n instanceof THREE.LineBasicMaterial || n instanceof THREE.ParticleBasicMaterial || n.fog) && (s.fogColor.value = i.color, i instanceof THREE.Fog ? (s.fogNear.value = i.near, s.fogFar.value = i.far) : i instanceof THREE.FogExp2 && (s.fogDensity.value = i.density)), n instanceof THREE.MeshPhongMaterial || n instanceof THREE.MeshLambertMaterial || n.lights) {
            var l, h, c, u, f, d, E = 0,
                p = 0,
                m = 0,
                v = K,
                g = v.directional.colors,
                T = v.directional.positions,
                y = v.point.colors,
                R = v.point.positions,
                x = v.point.distances,
                H = 0,
                w = 0;
            for (i = h = d = 0, l = t.length; i < l; i++) c = (h = t[i]).color, u = h.position, f = h.intensity, d = h.distance, h instanceof THREE.AmbientLight ? (E += c.r, p += c.g, m += c.b) : h instanceof THREE.DirectionalLight ? (g[d = 3 * H] = c.r * f, g[d + 1] = c.g * f, g[d + 2] = c.b * f, T[d] = u.x, T[d + 1] = u.y, T[d + 2] = u.z, H += 1) : h instanceof THREE.PointLight && (y[h = 3 * w] = c.r * f, y[h + 1] = c.g * f, y[h + 2] = c.b * f, R[h] = u.x, R[h + 1] = u.y, R[h + 2] = u.z, x[w] = d, w += 1);
            for (i = 3 * H; i < g.length; i++) g[i] = 0;
            for (i = 3 * w; i < y.length; i++) y[i] = 0;
            v.point.length = w, v.directional.length = H, v.ambient[0] = E, v.ambient[1] = p, v.ambient[2] = m, i = K, s.enableLighting.value = i.directional.length + i.point.length, s.ambientLightColor.value = i.ambient, s.directionalLightColor.value = i.directional.colors, s.directionalLightDirection.value = i.directional.positions, s.pointLightColor.value = i.point.colors, s.pointLightPosition.value = i.point.positions, s.pointLightDistance.value = i.point.distances
        }(n instanceof THREE.MeshBasicMaterial || n instanceof THREE.MeshLambertMaterial || n instanceof THREE.MeshPhongMaterial) && (s.diffuse.value = n.color, s.opacity.value = n.opacity, s.map.texture = n.map, s.lightMap.texture = n.lightMap, s.envMap.texture = n.envMap, s.reflectivity.value = n.reflectivity, s.refractionRatio.value = n.refractionRatio, s.combine.value = n.combine, s.useRefract.value = n.envMap && n.envMap.mapping instanceof THREE.CubeRefractionMapping), n instanceof THREE.LineBasicMaterial ? (s.diffuse.value = n.color, s.opacity.value = n.opacity) : n instanceof THREE.ParticleBasicMaterial ? (s.psColor.value = n.color, s.opacity.value = n.opacity, s.size.value = n.size, s.scale.value = L.height / 2, s.map.texture = n.map) : n instanceof THREE.MeshPhongMaterial ? (s.ambient.value = n.ambient, s.specular.value = n.specular, s.shininess.value = n.shininess) : n instanceof THREE.MeshDepthMaterial ? (s.mNear.value = e.near, s.mFar.value = e.far, s.opacity.value = n.opacity) : n instanceof THREE.MeshNormalMaterial && (s.opacity.value = n.opacity);
        for (var M in s)
            if (p = o.uniforms[M])
                if (l = s[M], E = l.type, i = l.value, "i" == E) A.uniform1i(p, i);
                else if ("f" == E) A.uniform1f(p, i);
                else if ("fv1" == E) A.uniform1fv(p, i);
                else if ("fv" == E) A.uniform3fv(p, i);
                else if ("v2" == E) A.uniform2f(p, i.x, i.y);
                else if ("v3" == E) A.uniform3f(p, i.x, i.y, i.z);
                else if ("v4" == E) A.uniform4f(p, i.x, i.y, i.z, i.w);
                else if ("c" == E) A.uniform3f(p, i.r, i.g, i.b);
                else if ("t" == E && (A.uniform1i(p, i), l = l.texture))
                    if (l.image instanceof Array && 6 == l.image.length) {
                        if (6 == l.image.length) {
                            if (l.needsUpdate) {
                                if (l.__webglInit)
                                    for (A.bindTexture(A.TEXTURE_CUBE_MAP, l.image.__webglTextureCube), E = 0; E < 6; ++E) A.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + E, 0, 0, 0, A.RGBA, A.UNSIGNED_BYTE, l.image[E]);
                                else {
                                    for (l.image.__webglTextureCube = A.createTexture(), A.bindTexture(A.TEXTURE_CUBE_MAP, l.image.__webglTextureCube), E = 0; E < 6; ++E) A.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + E, 0, A.RGBA, A.RGBA, A.UNSIGNED_BYTE, l.image[E]);
                                    l.__webglInit = !0
                                }
                                _(A.TEXTURE_CUBE_MAP, l, l.image[0]), A.bindTexture(A.TEXTURE_CUBE_MAP, null), l.needsUpdate = !1
                            }
                            A.activeTexture(A.TEXTURE0 + i), A.bindTexture(A.TEXTURE_CUBE_MAP, l.image.__webglTextureCube)
                        }
                    } else b(l, i);
        return A.uniformMatrix4fv(a.modelViewMatrix, !1, r._modelViewMatrixArray), A.uniformMatrix3fv(a.normalMatrix, !1, r._normalMatrixArray), (n instanceof THREE.MeshShaderMaterial || n instanceof THREE.MeshPhongMaterial || n.envMap) && null !== a.cameraPosition && A.uniform3f(a.cameraPosition, e.position.x, e.position.y, e.position.z), (n instanceof THREE.MeshShaderMaterial || n.envMap || n.skinning) && null !== a.objectMatrix && A.uniformMatrix4fv(a.objectMatrix, !1, r._objectMatrixArray), (n instanceof THREE.MeshPhongMaterial || n instanceof THREE.MeshLambertMaterial || n instanceof THREE.MeshShaderMaterial || n.skinning) && null !== a.viewMatrix && A.uniformMatrix4fv(a.viewMatrix, !1, Y), n instanceof THREE.ShadowVolumeDynamicMaterial && ((e = s.directionalLightDirection.value)[0] = -t[1].position.x, e[1] = -t[1].position.y, e[2] = -t[1].position.z, A.uniform3fv(a.directionalLightDirection, e), A.uniformMatrix4fv(a.objectMatrix, !1, r._objectMatrixArray), A.uniformMatrix4fv(a.viewMatrix, !1, Y)), n.skinning && (A.uniformMatrix4fv(a.cameraInverseMatrix, !1, Y), A.uniformMatrix4fv(a.boneGlobalMatrices, !1, r.boneMatrices)), o
    }

    function n(e, t, n, r, o, a) {
        if (0 != r.opacity) {
            var s;
            if (e = i(e, t, n, r, a).attributes, !r.morphTargets && e.position >= 0) A.bindBuffer(A.ARRAY_BUFFER, o.__webglVertexBuffer), A.vertexAttribPointer(e.position, 3, A.FLOAT, !1, 0, 0);
            else {
                if (t = r.program.attributes, -1 !== a.morphTargetBase ? (A.bindBuffer(A.ARRAY_BUFFER, o.__webglMorphTargetsBuffers[a.morphTargetBase]), A.vertexAttribPointer(t.position, 3, A.FLOAT, !1, 0, 0)) : t.position >= 0 && (A.bindBuffer(A.ARRAY_BUFFER, o.__webglVertexBuffer), A.vertexAttribPointer(t.position, 3, A.FLOAT, !1, 0, 0)), a.morphTargetForcedOrder.length) {
                    n = 0;
                    for (var l = a.morphTargetForcedOrder, h = a.morphTargetInfluences; n < r.numSupportedMorphTargets && n < l.length;) A.bindBuffer(A.ARRAY_BUFFER, o.__webglMorphTargetsBuffers[l[n]]), A.vertexAttribPointer(t["morphTarget" + n], 3, A.FLOAT, !1, 0, 0), a.__webglMorphTargetInfluences[n] = h[l[n]], n++
                } else {
                    l = [];
                    var c, u = -1,
                        f = 0,
                        d = (h = a.morphTargetInfluences).length;
                    for (n = 0, -1 !== a.morphTargetBase && (l[a.morphTargetBase] = !0); n < r.numSupportedMorphTargets;) {
                        for (c = 0; c < d; c++) !l[c] && h[c] > u && (u = h[f = c]);
                        A.bindBuffer(A.ARRAY_BUFFER, o.__webglMorphTargetsBuffers[f]), A.vertexAttribPointer(t["morphTarget" + n], 3, A.FLOAT, !1, 0, 0), a.__webglMorphTargetInfluences[n] = u, l[f] = 1, u = -1, n++
                    }
                }
                null !== r.program.uniforms.morphTargetInfluences && A.uniform1fv(r.program.uniforms.morphTargetInfluences, a.__webglMorphTargetInfluences)
            }
            if (r.attributes)
                for (s in r.attributes) e[s] >= 0 && (t = r.attributes[s], A.bindBuffer(A.ARRAY_BUFFER, t.buffer), A.vertexAttribPointer(e[s], t.size, A.FLOAT, !1, 0, 0));
            e.color >= 0 && (A.bindBuffer(A.ARRAY_BUFFER, o.__webglColorBuffer), A.vertexAttribPointer(e.color, 3, A.FLOAT, !1, 0, 0)), e.normal >= 0 && (A.bindBuffer(A.ARRAY_BUFFER, o.__webglNormalBuffer), A.vertexAttribPointer(e.normal, 3, A.FLOAT, !1, 0, 0)), e.tangent >= 0 && (A.bindBuffer(A.ARRAY_BUFFER, o.__webglTangentBuffer), A.vertexAttribPointer(e.tangent, 4, A.FLOAT, !1, 0, 0)), e.uv >= 0 && (o.__webglUVBuffer ? (A.bindBuffer(A.ARRAY_BUFFER, o.__webglUVBuffer), A.vertexAttribPointer(e.uv, 2, A.FLOAT, !1, 0, 0), A.enableVertexAttribArray(e.uv)) : A.disableVertexAttribArray(e.uv)), e.uv2 >= 0 && (o.__webglUV2Buffer ? (A.bindBuffer(A.ARRAY_BUFFER, o.__webglUV2Buffer), A.vertexAttribPointer(e.uv2, 2, A.FLOAT, !1, 0, 0), A.enableVertexAttribArray(e.uv2)) : A.disableVertexAttribArray(e.uv2)), r.skinning && e.skinVertexA >= 0 && e.skinVertexB >= 0 && e.skinIndex >= 0 && e.skinWeight >= 0 && (A.bindBuffer(A.ARRAY_BUFFER, o.__webglSkinVertexABuffer), A.vertexAttribPointer(e.skinVertexA, 4, A.FLOAT, !1, 0, 0), A.bindBuffer(A.ARRAY_BUFFER, o.__webglSkinVertexBBuffer), A.vertexAttribPointer(e.skinVertexB, 4, A.FLOAT, !1, 0, 0), A.bindBuffer(A.ARRAY_BUFFER, o.__webglSkinIndicesBuffer), A.vertexAttribPointer(e.skinIndex, 4, A.FLOAT, !1, 0, 0), A.bindBuffer(A.ARRAY_BUFFER, o.__webglSkinWeightsBuffer), A.vertexAttribPointer(e.skinWeight, 4, A.FLOAT, !1, 0, 0)), a instanceof THREE.Mesh ? (r.wireframe ? (A.lineWidth(r.wireframeLinewidth), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, o.__webglLineBuffer), A.drawElements(A.LINES, o.__webglLineCount, A.UNSIGNED_SHORT, 0)) : (A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, o.__webglFaceBuffer), A.drawElements(A.TRIANGLES, o.__webglFaceCount, A.UNSIGNED_SHORT, 0)), C.data.vertices += o.__webglFaceCount, C.data.faces += o.__webglFaceCount / 3, C.data.drawCalls++) : a instanceof THREE.Line ? (a = a.type == THREE.LineStrip ? A.LINE_STRIP : A.LINES, A.lineWidth(r.linewidth), A.drawArrays(a, 0, o.__webglLineCount), C.data.drawCalls++) : a instanceof THREE.ParticleSystem ? (A.drawArrays(A.POINTS, 0, o.__webglParticleCount), C.data.drawCalls++) : a instanceof THREE.Ribbon && (A.drawArrays(A.TRIANGLE_STRIP, 0, o.__webglVertexCount), C.data.drawCalls++)
        }
    }

    function r(e, t, i) {
        if (e.__webglVertexBuffer || (e.__webglVertexBuffer = A.createBuffer()), e.__webglNormalBuffer || (e.__webglNormalBuffer = A.createBuffer()), e.hasPos && (A.bindBuffer(A.ARRAY_BUFFER, e.__webglVertexBuffer), A.bufferData(A.ARRAY_BUFFER, e.positionArray, A.DYNAMIC_DRAW), A.enableVertexAttribArray(t.attributes.position), A.vertexAttribPointer(t.attributes.position, 3, A.FLOAT, !1, 0, 0)), e.hasNormal) {
            if (A.bindBuffer(A.ARRAY_BUFFER, e.__webglNormalBuffer), i == THREE.FlatShading) {
                var n, r, o, a, s, l, h, c = 3 * e.count;
                for (h = 0; h < c; h += 9) n = (i = e.normalArray)[h], r = i[h + 1], o = i[h + 2], a = i[h + 3], s = i[h + 4], l = i[h + 5], n = (n + a + i[h + 6]) / 3, r = (r + s + i[h + 7]) / 3, o = (o + l + i[h + 8]) / 3, i[h] = n, i[h + 1] = r, i[h + 2] = o, i[h + 3] = n, i[h + 4] = r, i[h + 5] = o, i[h + 6] = n, i[h + 7] = r, i[h + 8] = o
            }
            A.bufferData(A.ARRAY_BUFFER, e.normalArray, A.DYNAMIC_DRAW), A.enableVertexAttribArray(t.attributes.normal), A.vertexAttribPointer(t.attributes.normal, 3, A.FLOAT, !1, 0, 0)
        }
        A.drawArrays(A.TRIANGLES, 0, e.count), e.count = 0
    }

    function o(e) {
        B != e.doubleSided && (e.doubleSided ? A.disable(A.CULL_FACE) : A.enable(A.CULL_FACE), B = e.doubleSided), k != e.flipSided && (e.flipSided ? A.frontFace(A.CW) : A.frontFace(A.CCW), k = e.flipSided)
    }

    function s(e) {
        P != e && (e ? A.enable(A.DEPTH_TEST) : A.disable(A.DEPTH_TEST), P = e)
    }

    function h(e) {
        j[0].set(e.n41 - e.n11, e.n42 - e.n12, e.n43 - e.n13, e.n44 - e.n14), j[1].set(e.n41 + e.n11, e.n42 + e.n12, e.n43 + e.n13, e.n44 + e.n14), j[2].set(e.n41 + e.n21, e.n42 + e.n22, e.n43 + e.n23, e.n44 + e.n24), j[3].set(e.n41 - e.n21, e.n42 - e.n22, e.n43 - e.n23, e.n44 - e.n24), j[4].set(e.n41 - e.n31, e.n42 - e.n32, e.n43 - e.n33, e.n44 - e.n34), j[5].set(e.n41 + e.n31, e.n42 + e.n32, e.n43 + e.n33, e.n44 + e.n34);
        var t;
        for (e = 0; e < 6; e++)(t = j[e]).divideScalar(Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z))
    }

    function c(e) {
        for (var t = e.matrixWorld, i = -e.geometry.boundingSphere.radius * Math.max(e.scale.x, Math.max(e.scale.y, e.scale.z)), n = 0; n < 6; n++)
            if ((e = j[n].x * t.n14 + j[n].y * t.n24 + j[n].z * t.n34 + j[n].w) <= i) return !1;
        return !0
    }

    function u(e, t) {
        e.list[e.count] = t, e.count += 1
    }

    function f(e) {
        var t, i, n = e.object,
            r = e.opaque,
            o = e.transparent;
        for (o.count = 0, e = r.count = 0, t = n.materials.length; e < t; e++)(i = n.materials[e]).transparent ? u(o, i) : u(r, i)
    }

    function d(e) {
        var t, i, n, r, o = e.object,
            a = e.buffer,
            s = e.opaque,
            l = e.transparent;
        for (l.count = 0, e = s.count = 0, n = o.materials.length; e < n; e++)
            if ((t = o.materials[e]) instanceof THREE.MeshFaceMaterial)
                for (t = 0, i = a.materials.length; t < i; t++)(r = a.materials[t]) && (r.transparent ? u(l, r) : u(s, r));
            else(r = t) && (r.transparent ? u(l, r) : u(s, r))
    }

    function E(e, t) {
        return t.z - e.z
    }

    function p(e) {
        A.enable(A.POLYGON_OFFSET_FILL), A.polygonOffset(.1, 1), A.enable(A.STENCIL_TEST), A.enable(A.DEPTH_TEST), A.depthMask(!1), A.colorMask(!1, !1, !1, !1), A.stencilFunc(A.ALWAYS, 1, 255), A.stencilOpSeparate(A.BACK, A.KEEP, A.INCR, A.KEEP), A.stencilOpSeparate(A.FRONT, A.KEEP, A.DECR, A.KEEP);
        var t, i, n, r, o, a, s, l = e.lights.length,
            h = e.lights,
            c = [],
            u = e.__webglShadowVolumes.length;
        for (t = 0; t < l; t++)
            if ((i = e.lights[t]) instanceof THREE.DirectionalLight && i.castShadow)
                for (c[0] = -i.position.x, c[1] = -i.position.y, c[2] = -i.position.z, s = 0; s < u; s++) i = e.__webglShadowVolumes[s].object, n = e.__webglShadowVolumes[s].buffer, (r = i.materials[0]).program || C.initMaterial(r, h, void 0, i), o = (r = r.program).uniforms, a = r.attributes, z !== r && (A.useProgram(r), z = r, A.uniformMatrix4fv(o.projectionMatrix, !1, X), A.uniformMatrix4fv(o.viewMatrix, !1, Y), A.uniform3fv(o.directionalLightDirection, c)), i.matrixWorld.flattenToArray(i._objectMatrixArray), A.uniformMatrix4fv(o.objectMatrix, !1, i._objectMatrixArray), A.bindBuffer(A.ARRAY_BUFFER, n.__webglVertexBuffer), A.vertexAttribPointer(a.position, 3, A.FLOAT, !1, 0, 0), A.bindBuffer(A.ARRAY_BUFFER, n.__webglNormalBuffer), A.vertexAttribPointer(a.normal, 3, A.FLOAT, !1, 0, 0), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, n.__webglFaceBuffer), A.cullFace(A.FRONT), A.drawElements(A.TRIANGLES, n.__webglFaceCount, A.UNSIGNED_SHORT, 0), A.cullFace(A.BACK), A.drawElements(A.TRIANGLES, n.__webglFaceCount, A.UNSIGNED_SHORT, 0);
        A.disable(A.POLYGON_OFFSET_FILL), A.colorMask(!0, !0, !0, !0), A.stencilFunc(A.NOTEQUAL, 0, 255), A.stencilOp(A.KEEP, A.KEEP, A.KEEP), A.disable(A.DEPTH_TEST), D = "", z = Q.program, A.useProgram(Q.program), A.uniformMatrix4fv(Q.projectionLocation, !1, X), A.uniform1f(Q.darknessLocation, Q.darkness), A.bindBuffer(A.ARRAY_BUFFER, Q.vertexBuffer), A.vertexAttribPointer(Q.vertexLocation, 3, A.FLOAT, !1, 0, 0), A.enableVertexAttribArray(Q.vertexLocation), A.blendFunc(A.ONE, A.ONE_MINUS_SRC_ALPHA), A.blendEquation(A.FUNC_ADD), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, Q.elementBuffer), A.drawElements(A.TRIANGLES, 6, A.UNSIGNED_SHORT, 0), A.disable(A.STENCIL_TEST), A.enable(A.DEPTH_TEST), A.depthMask(U)
    }

    function m(e, t) {
        var i, n, r;
        i = _sprite.attributes;
        var o, a = _sprite.uniforms,
            s = W / O,
            l = [],
            h = .5 * O,
            c = .5 * W,
            u = !0;
        for (A.useProgram(_sprite.program), z = _sprite.program, D = "", $ || (A.enableVertexAttribArray(_sprite.attributes.position), A.enableVertexAttribArray(_sprite.attributes.uv), $ = !0), A.disable(A.CULL_FACE), A.enable(A.BLEND), A.depthMask(!0), A.bindBuffer(A.ARRAY_BUFFER, _sprite.vertexBuffer), A.vertexAttribPointer(i.position, 2, A.FLOAT, !1, 16, 0), A.vertexAttribPointer(i.uv, 2, A.FLOAT, !1, 16, 8), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer), A.uniformMatrix4fv(a.projectionMatrix, !1, X), A.activeTexture(A.TEXTURE0), A.uniform1i(a.map, 0), i = 0, n = e.__webglSprites.length; i < n; i++)(r = e.__webglSprites[i]).useScreenCoordinates ? r.z = -r.position.z : (r._modelViewMatrix.multiplyToArray(t.matrixWorldInverse, r.matrixWorld, r._modelViewMatrixArray), r.z = -r._modelViewMatrix.n34);
        for (e.__webglSprites.sort(E), i = 0, n = e.__webglSprites.length; i < n; i++) void 0 === (r = e.__webglSprites[i]).material && r.map && r.map.image && r.map.image.width && (r.useScreenCoordinates ? (A.uniform1i(a.useScreenCoordinates, 1), A.uniform3f(a.screenPosition, (r.position.x - h) / h, (c - r.position.y) / c, Math.max(0, Math.min(1, r.position.z)))) : (A.uniform1i(a.useScreenCoordinates, 0), A.uniform1i(a.affectedByDistance, r.affectedByDistance ? 1 : 0), A.uniformMatrix4fv(a.modelViewMatrix, !1, r._modelViewMatrixArray)), o = r.map.image.width / (r.affectedByDistance ? 1 : W), l[0] = o * s * r.scale.x, l[1] = o * r.scale.y, A.uniform2f(a.uvScale, r.uvScale.x, r.uvScale.y), A.uniform2f(a.uvOffset, r.uvOffset.x, r.uvOffset.y), A.uniform2f(a.alignment, r.alignment.x, r.alignment.y), A.uniform1f(a.opacity, r.opacity), A.uniform1f(a.rotation, r.rotation), A.uniform2fv(a.scale, l), r.mergeWith3D && !u ? (A.enable(A.DEPTH_TEST), u = !0) : !r.mergeWith3D && u && (A.disable(A.DEPTH_TEST), u = !1), x(r.blending), b(r.map, 0), A.drawElements(A.TRIANGLES, 6, A.UNSIGNED_SHORT, 0));
        A.enable(A.CULL_FACE), A.enable(A.DEPTH_TEST), A.depthMask(U)
    }

    function v(e, t) {
        var i, n, r, o, a, s = e.__webglLensFlares.length,
            l = new THREE.Vector3,
            h = W / O,
            c = .5 * O,
            u = .5 * W,
            f = 16 / W,
            d = [f * h, f],
            E = [1, 1, 0],
            p = [1, 1],
            m = Z.uniforms;
        for (i = Z.attributes, A.useProgram(Z.program), z = Z.program, D = "", J || (A.enableVertexAttribArray(Z.attributes.vertex), A.enableVertexAttribArray(Z.attributes.uv), J = !0), A.uniform1i(m.occlusionMap, 0), A.uniform1i(m.map, 1), A.bindBuffer(A.ARRAY_BUFFER, Z.vertexBuffer), A.vertexAttribPointer(i.vertex, 2, A.FLOAT, !1, 16, 0), A.vertexAttribPointer(i.uv, 2, A.FLOAT, !1, 16, 8), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, Z.elementBuffer), A.disable(A.CULL_FACE), A.depthMask(!1), A.activeTexture(A.TEXTURE0), A.bindTexture(A.TEXTURE_2D, Z.occlusionTexture), A.activeTexture(A.TEXTURE1), n = 0; n < s; n++)
            if (i = e.__webglLensFlares[n].object, l.set(i.matrixWorld.n14, i.matrixWorld.n24, i.matrixWorld.n34), t.matrixWorldInverse.multiplyVector3(l), t.projectionMatrix.multiplyVector3(l), E[0] = l.x, E[1] = l.y, E[2] = l.z, p[0] = E[0] * c + c, p[1] = E[1] * u + u, Z.hasVertexTexture || p[0] > 0 && p[0] < O && p[1] > 0 && p[1] < W)
                for (A.bindTexture(A.TEXTURE_2D, Z.tempTexture), A.copyTexImage2D(A.TEXTURE_2D, 0, A.RGB, p[0] - 8, p[1] - 8, 16, 16, 0), A.uniform1i(m.renderType, 0), A.uniform2fv(m.scale, d), A.uniform3fv(m.screenPosition, E), A.disable(A.BLEND), A.enable(A.DEPTH_TEST), A.drawElements(A.TRIANGLES, 6, A.UNSIGNED_SHORT, 0), A.bindTexture(A.TEXTURE_2D, Z.occlusionTexture), A.copyTexImage2D(A.TEXTURE_2D, 0, A.RGBA, p[0] - 8, p[1] - 8, 16, 16, 0), A.uniform1i(m.renderType, 1), A.disable(A.DEPTH_TEST), A.bindTexture(A.TEXTURE_2D, Z.tempTexture), A.drawElements(A.TRIANGLES, 6, A.UNSIGNED_SHORT, 0), i.positionScreen.x = E[0], i.positionScreen.y = E[1], i.positionScreen.z = E[2], i.customUpdateCallback ? i.customUpdateCallback(i) : i.updateLensFlares(), A.uniform1i(m.renderType, 2), A.enable(A.BLEND), r = 0, o = i.lensFlares.length; r < o; r++)(a = i.lensFlares[r]).opacity > .001 && a.scale > .001 && (E[0] = a.x, E[1] = a.y, E[2] = a.z, f = a.size * a.scale / W, d[0] = f * h, d[1] = f, A.uniform3fv(m.screenPosition, E), A.uniform2fv(m.scale, d), A.uniform1f(m.rotation, a.rotation), A.uniform1f(m.opacity, a.opacity), x(a.blending), b(a.texture, 1), A.drawElements(A.TRIANGLES, 6, A.UNSIGNED_SHORT, 0));
        A.enable(A.CULL_FACE), A.enable(A.DEPTH_TEST), A.depthMask(U)
    }

    function g(e, t) {
        e._modelViewMatrix.multiplyToArray(t.matrixWorldInverse, e.matrixWorld, e._modelViewMatrixArray), THREE.Matrix4.makeInvert3x3(e._modelViewMatrix).transposeIntoArray(e._normalMatrixArray)
    }

    function T(e) {
        var i, n, r, o, a;
        if (e instanceof THREE.Mesh) {
            n = e.geometry;
            for (i in n.geometryGroups) {
                r = n.geometryGroups[i], a = !1;
                for (o in r.__webglCustomAttributes)
                    if (r.__webglCustomAttributes[o].needsUpdate) {
                        a = !0;
                        break
                    }
                if (n.__dirtyVertices || n.__dirtyMorphTargets || n.__dirtyElements || n.__dirtyUvs || n.__dirtyNormals || n.__dirtyColors || n.__dirtyTangents || a) {
                    a = A.DYNAMIC_DRAW;
                    var s = void 0,
                        l = void 0,
                        h = void 0,
                        c = void 0;
                    h = void 0;
                    var u = void 0,
                        f = void 0,
                        d = void 0,
                        E = void 0,
                        p = void 0,
                        m = void 0,
                        v = void 0,
                        g = void 0,
                        T = void 0,
                        y = void 0,
                        R = void 0,
                        x = void 0,
                        _ = void 0;
                    f = void 0, d = void 0, c = void 0, E = void 0, c = void 0;
                    var b = void 0,
                        H = void 0;
                    f = void 0, b = void 0, H = void 0;
                    var w = void 0,
                        M = void 0;
                    b = void 0, H = void 0, w = void 0, M = void 0, b = void 0, H = void 0, w = void 0, M = void 0, b = void 0, H = void 0, w = void 0, c = void 0, E = void 0, u = void 0, h = void 0, h = void 0, b = void 0, H = void 0, w = void 0;
                    var S = void 0,
                        C = 0,
                        L = 0,
                        F = 0,
                        z = 0,
                        V = 0,
                        U = 0,
                        B = 0,
                        k = 0,
                        D = 0,
                        P = 0,
                        N = 0;
                    H = b = 0;
                    var I = r.__vertexArray,
                        O = r.__uvArray,
                        W = r.__uv2Array,
                        j = r.__normalArray,
                        G = r.__tangentArray,
                        X = r.__colorArray,
                        Y = r.__skinVertexAArray,
                        q = r.__skinVertexBArray,
                        K = r.__skinIndexArray,
                        Q = r.__skinWeightArray,
                        Z = r.__morphTargetsArrays,
                        J = r.__webglCustomAttributes;
                    w = void 0;
                    var $ = r.__faceArray,
                        ee = r.__lineArray,
                        te = r.__needsSmoothNormals;
                    m = r.__vertexColorType, p = r.__uvType, v = r.__normalType;
                    var ie = e.geometry,
                        ne = ie.__dirtyVertices,
                        re = ie.__dirtyElements,
                        oe = ie.__dirtyUvs,
                        ae = ie.__dirtyNormals,
                        se = ie.__dirtyTangents,
                        le = ie.__dirtyColors,
                        he = ie.__dirtyMorphTargets,
                        ce = ie.vertices,
                        ue = r.faces,
                        fe = ie.faces,
                        de = ie.faceVertexUvs[0],
                        Ee = ie.faceVertexUvs[1],
                        pe = ie.skinVerticesA,
                        me = ie.skinVerticesB,
                        ve = ie.skinIndices,
                        ge = ie.skinWeights,
                        Te = e instanceof THREE.ShadowVolume ? ie.edgeFaces : void 0;
                    if (morphTargets = ie.morphTargets, J)
                        for (S in J) J[S].offset = 0, J[S].offsetSrc = 0;
                    for (s = 0, l = ue.length; s < l; s++)
                        if (h = ue[s], c = fe[h], de && (g = de[h]), Ee && (T = Ee[h]), h = c.vertexNormals, u = c.normal, f = c.vertexColors, d = c.color, E = c.vertexTangents, c instanceof THREE.Face3) {
                            if (ne && (y = ce[c.a].position, R = ce[c.b].position, x = ce[c.c].position, I[L] = y.x, I[L + 1] = y.y, I[L + 2] = y.z, I[L + 3] = R.x, I[L + 4] = R.y, I[L + 5] = R.z, I[L + 6] = x.x, I[L + 7] = x.y, I[L + 8] = x.z, L += 9), J)
                                for (S in J)(w = J[S]).needsUpdate && (b = w.offset, H = w.offsetSrc, 1 === w.size ? (void 0 === w.boundTo || "vertices" === w.boundTo ? (w.array[b + 0] = w.value[c.a], w.array[b + 1] = w.value[c.b], w.array[b + 2] = w.value[c.c]) : "faces" === w.boundTo ? (w.array[b + 0] = w.value[H], w.array[b + 1] = w.value[H], w.array[b + 2] = w.value[H], w.offsetSrc++) : "faceVertices" === w.boundTo && (w.array[b + 0] = w.value[H + 0], w.array[b + 1] = w.value[H + 1], w.array[b + 2] = w.value[H + 2], w.offsetSrc += 3), w.offset += 3) : (void 0 === w.boundTo || "vertices" === w.boundTo ? (y = w.value[c.a], R = w.value[c.b], x = w.value[c.c]) : "faces" === w.boundTo ? (y = w.value[H], R = w.value[H], x = w.value[H], w.offsetSrc++) : "faceVertices" === w.boundTo && (y = w.value[H + 0], R = w.value[H + 1], x = w.value[H + 2], w.offsetSrc += 3), 2 === w.size ? (w.array[b + 0] = y.x, w.array[b + 1] = y.y, w.array[b + 2] = R.x, w.array[b + 3] = R.y, w.array[b + 4] = x.x, w.array[b + 5] = x.y, w.offset += 6) : 3 === w.size ? ("c" === w.type ? (w.array[b + 0] = y.r, w.array[b + 1] = y.g, w.array[b + 2] = y.b, w.array[b + 3] = R.r, w.array[b + 4] = R.g, w.array[b + 5] = R.b, w.array[b + 6] = x.r, w.array[b + 7] = x.g, w.array[b + 8] = x.b) : (w.array[b + 0] = y.x, w.array[b + 1] = y.y, w.array[b + 2] = y.z, w.array[b + 3] = R.x, w.array[b + 4] = R.y, w.array[b + 5] = R.z, w.array[b + 6] = x.x, w.array[b + 7] = x.y, w.array[b + 8] = x.z), w.offset += 9) : (w.array[b + 0] = y.x, w.array[b + 1] = y.y, w.array[b + 2] = y.z, w.array[b + 3] = y.w, w.array[b + 4] = R.x, w.array[b + 5] = R.y, w.array[b + 6] = R.z, w.array[b + 7] = R.w, w.array[b + 8] = x.x, w.array[b + 9] = x.y, w.array[b + 10] = x.z, w.array[b + 11] = x.w, w.offset += 12)));
                            if (he) {
                                for (b = 0, H = morphTargets.length; b < H; b++) y = morphTargets[b].vertices[c.a].position, R = morphTargets[b].vertices[c.b].position, x = morphTargets[b].vertices[c.c].position, (w = Z[b])[N + 0] = y.x, w[N + 1] = y.y, w[N + 2] = y.z, w[N + 3] = R.x, w[N + 4] = R.y, w[N + 5] = R.z, w[N + 6] = x.x, w[N + 7] = x.y, w[N + 8] = x.z;
                                N += 9
                            }
                            if (ge.length && (b = ge[c.a], H = ge[c.b], w = ge[c.c], Q[P] = b.x, Q[P + 1] = b.y, Q[P + 2] = b.z, Q[P + 3] = b.w, Q[P + 4] = H.x, Q[P + 5] = H.y, Q[P + 6] = H.z, Q[P + 7] = H.w, Q[P + 8] = w.x, Q[P + 9] = w.y, Q[P + 10] = w.z, Q[P + 11] = w.w, b = ve[c.a], H = ve[c.b], w = ve[c.c], K[P] = b.x, K[P + 1] = b.y, K[P + 2] = b.z, K[P + 3] = b.w, K[P + 4] = H.x, K[P + 5] = H.y, K[P + 6] = H.z, K[P + 7] = H.w, K[P + 8] = w.x, K[P + 9] = w.y, K[P + 10] = w.z, K[P + 11] = w.w, b = pe[c.a], H = pe[c.b], w = pe[c.c], Y[P] = b.x, Y[P + 1] = b.y, Y[P + 2] = b.z, Y[P + 3] = 1, Y[P + 4] = H.x, Y[P + 5] = H.y, Y[P + 6] = H.z, Y[P + 7] = 1, Y[P + 8] = w.x, Y[P + 9] = w.y, Y[P + 10] = w.z, Y[P + 11] = 1, b = me[c.a], H = me[c.b], w = me[c.c], q[P] = b.x, q[P + 1] = b.y, q[P + 2] = b.z, q[P + 3] = 1, q[P + 4] = H.x, q[P + 5] = H.y, q[P + 6] = H.z, q[P + 7] = 1, q[P + 8] = w.x, q[P + 9] = w.y, q[P + 10] = w.z, q[P + 11] = 1, P += 12), le && m && (3 == f.length && m == THREE.VertexColors ? (c = f[0], b = f[1], H = f[2]) : H = b = c = d, X[D] = c.r, X[D + 1] = c.g, X[D + 2] = c.b, X[D + 3] = b.r, X[D + 4] = b.g, X[D + 5] = b.b, X[D + 6] = H.r, X[D + 7] = H.g, X[D + 8] = H.b, D += 9), se && ie.hasTangents && (f = E[0], d = E[1], c = E[2], G[B] = f.x, G[B + 1] = f.y, G[B + 2] = f.z, G[B + 3] = f.w, G[B + 4] = d.x, G[B + 5] = d.y, G[B + 6] = d.z, G[B + 7] = d.w, G[B + 8] = c.x, G[B + 9] = c.y, G[B + 10] = c.z, G[B + 11] = c.w, B += 12), ae && v)
                                if (3 == h.length && te)
                                    for (E = 0; E < 3; E++) u = h[E], j[U] = u.x, j[U + 1] = u.y, j[U + 2] = u.z, U += 3;
                                else
                                    for (E = 0; E < 3; E++) j[U] = u.x, j[U + 1] = u.y, j[U + 2] = u.z, U += 3;
                            if (oe && void 0 !== g && p)
                                for (E = 0; E < 3; E++) h = g[E], O[F] = h.u, O[F + 1] = h.v, F += 2;
                            if (oe && void 0 !== T && p)
                                for (E = 0; E < 3; E++) h = T[E], W[z] = h.u, W[z + 1] = h.v, z += 2;
                            re && ($[V] = C, $[V + 1] = C + 1, $[V + 2] = C + 2, V += 3, ee[k] = C, ee[k + 1] = C + 1, ee[k + 2] = C, ee[k + 3] = C + 2, ee[k + 4] = C + 1, ee[k + 5] = C + 2, k += 6, C += 3)
                        } else if (c instanceof THREE.Face4) {
                            if (ne && (y = ce[c.a].position, R = ce[c.b].position, x = ce[c.c].position, _ = ce[c.d].position, I[L] = y.x, I[L + 1] = y.y, I[L + 2] = y.z, I[L + 3] = R.x, I[L + 4] = R.y, I[L + 5] = R.z, I[L + 6] = x.x, I[L + 7] = x.y, I[L + 8] = x.z, I[L + 9] = _.x, I[L + 10] = _.y, I[L + 11] = _.z, L += 12), J)
                                for (S in J)(w = J[S]).needsUpdate && (b = w.offset, H = w.offsetSrc, 1 === w.size ? (void 0 === w.boundTo || "vertices" === w.boundTo ? (w.array[b + 0] = w.value[c.a], w.array[b + 1] = w.value[c.b], w.array[b + 2] = w.value[c.c], w.array[b + 3] = w.value[c.d]) : "faces" === w.boundTo ? (w.array[b + 0] = w.value[H], w.array[b + 1] = w.value[H], w.array[b + 2] = w.value[H], w.array[b + 3] = w.value[H], w.offsetSrc++) : "faceVertices" === w.boundTo && (w.array[b + 0] = w.value[H + 0], w.array[b + 1] = w.value[H + 1], w.array[b + 2] = w.value[H + 2], w.array[b + 3] = w.value[H + 3], w.offsetSrc += 4), w.offset += 4) : (void 0 === w.boundTo || "vertices" === w.boundTo ? (y = w.value[c.a], R = w.value[c.b], x = w.value[c.c], _ = w.value[c.d]) : "faces" === w.boundTo ? (y = w.value[H], R = w.value[H], x = w.value[H], _ = w.value[H], w.offsetSrc++) : "faceVertices" === w.boundTo && (y = w.value[H + 0], R = w.value[H + 1], x = w.value[H + 2], _ = w.value[H + 3], w.offsetSrc += 4), 2 === w.size ? (w.array[b + 0] = y.x, w.array[b + 1] = y.y, w.array[b + 2] = R.x, w.array[b + 3] = R.y, w.array[b + 4] = x.x, w.array[b + 5] = x.y, w.array[b + 6] = _.x, w.array[b + 7] = _.y, w.offset += 8) : 3 === w.size ? ("c" === w.type ? (w.array[b + 0] = y.r, w.array[b + 1] = y.g, w.array[b + 2] = y.b, w.array[b + 3] = R.r, w.array[b + 4] = R.g, w.array[b + 5] = R.b, w.array[b + 6] = x.r, w.array[b + 7] = x.g, w.array[b + 8] = x.b, w.array[b + 9] = _.r, w.array[b + 10] = _.g, w.array[b + 11] = _.b) : (w.array[b + 0] = y.x, w.array[b + 1] = y.y, w.array[b + 2] = y.z, w.array[b + 3] = R.x, w.array[b + 4] = R.y, w.array[b + 5] = R.z, w.array[b + 6] = x.x, w.array[b + 7] = x.y, w.array[b + 8] = x.z, w.array[b + 9] = _.x, w.array[b + 10] = _.y, w.array[b + 11] = _.z), w.offset += 12) : (w.array[b + 0] = y.x, w.array[b + 1] = y.y, w.array[b + 2] = y.z, w.array[b + 3] = y.w, w.array[b + 4] = R.x, w.array[b + 5] = R.y, w.array[b + 6] = R.z, w.array[b + 7] = R.w, w.array[b + 8] = x.x, w.array[b + 9] = x.y, w.array[b + 10] = x.z, w.array[b + 11] = x.w, w.array[b + 12] = _.x, w.array[b + 13] = _.y, w.array[b + 14] = _.z, w.array[b + 15] = _.w, w.offset += 16)));
                            if (he) {
                                for (b = 0, H = morphTargets.length; b < H; b++) y = morphTargets[b].vertices[c.a].position, R = morphTargets[b].vertices[c.b].position, x = morphTargets[b].vertices[c.c].position, _ = morphTargets[b].vertices[c.d].position, (w = Z[b])[N + 0] = y.x, w[N + 1] = y.y, w[N + 2] = y.z, w[N + 3] = R.x, w[N + 4] = R.y, w[N + 5] = R.z, w[N + 6] = x.x, w[N + 7] = x.y, w[N + 8] = x.z, w[N + 9] = _.x, w[N + 10] = _.y, w[N + 11] = _.z;
                                N += 12
                            }
                            if (ge.length && (b = ge[c.a], H = ge[c.b], w = ge[c.c], M = ge[c.d], Q[P] = b.x, Q[P + 1] = b.y, Q[P + 2] = b.z, Q[P + 3] = b.w, Q[P + 4] = H.x, Q[P + 5] = H.y, Q[P + 6] = H.z, Q[P + 7] = H.w, Q[P + 8] = w.x, Q[P + 9] = w.y, Q[P + 10] = w.z, Q[P + 11] = w.w, Q[P + 12] = M.x, Q[P + 13] = M.y, Q[P + 14] = M.z, Q[P + 15] = M.w, b = ve[c.a], H = ve[c.b], w = ve[c.c], M = ve[c.d], K[P] = b.x, K[P + 1] = b.y, K[P + 2] = b.z, K[P + 3] = b.w, K[P + 4] = H.x, K[P + 5] = H.y, K[P + 6] = H.z, K[P + 7] = H.w, K[P + 8] = w.x, K[P + 9] = w.y, K[P + 10] = w.z, K[P + 11] = w.w, K[P + 12] = M.x, K[P + 13] = M.y, K[P + 14] = M.z, K[P + 15] = M.w, b = pe[c.a], H = pe[c.b], w = pe[c.c], M = pe[c.d], Y[P] = b.x, Y[P + 1] = b.y, Y[P + 2] = b.z, Y[P + 3] = 1, Y[P + 4] = H.x, Y[P + 5] = H.y, Y[P + 6] = H.z, Y[P + 7] = 1, Y[P + 8] = w.x, Y[P + 9] = w.y, Y[P + 10] = w.z, Y[P + 11] = 1, Y[P + 12] = M.x, Y[P + 13] = M.y, Y[P + 14] = M.z, Y[P + 15] = 1, b = me[c.a], H = me[c.b], w = me[c.c], c = me[c.d], q[P] = b.x, q[P + 1] = b.y, q[P + 2] = b.z, q[P + 3] = 1, q[P + 4] = H.x, q[P + 5] = H.y, q[P + 6] = H.z, q[P + 7] = 1, q[P + 8] = w.x, q[P + 9] = w.y, q[P + 10] = w.z, q[P + 11] = 1, q[P + 12] = c.x, q[P + 13] = c.y, q[P + 14] = c.z, q[P + 15] = 1, P += 16), le && m && (4 == f.length && m == THREE.VertexColors ? (c = f[0], b = f[1], H = f[2], f = f[3]) : f = H = b = c = d, X[D] = c.r, X[D + 1] = c.g, X[D + 2] = c.b, X[D + 3] = b.r, X[D + 4] = b.g, X[D + 5] = b.b, X[D + 6] = H.r, X[D + 7] = H.g, X[D + 8] = H.b, X[D + 9] = f.r, X[D + 10] = f.g, X[D + 11] = f.b, D += 12), se && ie.hasTangents && (f = E[0], d = E[1], c = E[2], E = E[3], G[B] = f.x, G[B + 1] = f.y, G[B + 2] = f.z, G[B + 3] = f.w, G[B + 4] = d.x, G[B + 5] = d.y, G[B + 6] = d.z, G[B + 7] = d.w, G[B + 8] = c.x, G[B + 9] = c.y, G[B + 10] = c.z, G[B + 11] = c.w, G[B + 12] = E.x, G[B + 13] = E.y, G[B + 14] = E.z, G[B + 15] = E.w, B += 16), ae && v)
                                if (4 == h.length && te)
                                    for (E = 0; E < 4; E++) u = h[E], j[U] = u.x, j[U + 1] = u.y, j[U + 2] = u.z, U += 3;
                                else
                                    for (E = 0; E < 4; E++) j[U] = u.x, j[U + 1] = u.y, j[U + 2] = u.z, U += 3;
                            if (oe && void 0 !== g && p)
                                for (E = 0; E < 4; E++) h = g[E], O[F] = h.u, O[F + 1] = h.v, F += 2;
                            if (oe && void 0 !== T && p)
                                for (E = 0; E < 4; E++) h = T[E], W[z] = h.u, W[z + 1] = h.v, z += 2;
                            re && ($[V] = C, $[V + 1] = C + 1, $[V + 2] = C + 3, $[V + 3] = C + 1, $[V + 4] = C + 2, $[V + 5] = C + 3, V += 6, ee[k] = C, ee[k + 1] = C + 1, ee[k + 2] = C, ee[k + 3] = C + 3, ee[k + 4] = C + 1, ee[k + 5] = C + 2, ee[k + 6] = C + 2, ee[k + 7] = C + 3, k += 8, C += 4)
                        }
                    if (Te)
                        for (s = 0, l = Te.length; s < l; s++) $[V] = Te[s].a, $[V + 1] = Te[s].b, $[V + 2] = Te[s].c, $[V + 3] = Te[s].a, $[V + 4] = Te[s].c, $[V + 5] = Te[s].d, V += 6;
                    if (ne && (A.bindBuffer(A.ARRAY_BUFFER, r.__webglVertexBuffer), A.bufferData(A.ARRAY_BUFFER, I, a)), J)
                        for (S in J)(w = J[S]).needsUpdate && (A.bindBuffer(A.ARRAY_BUFFER, w.buffer), A.bufferData(A.ARRAY_BUFFER, w.array, a), w.needsUpdate = !1);
                    if (he)
                        for (b = 0, H = morphTargets.length; b < H; b++) A.bindBuffer(A.ARRAY_BUFFER, r.__webglMorphTargetsBuffers[b]), A.bufferData(A.ARRAY_BUFFER, Z[b], a);
                    le && D > 0 && (A.bindBuffer(A.ARRAY_BUFFER, r.__webglColorBuffer), A.bufferData(A.ARRAY_BUFFER, X, a)), ae && (A.bindBuffer(A.ARRAY_BUFFER, r.__webglNormalBuffer), A.bufferData(A.ARRAY_BUFFER, j, a)), se && ie.hasTangents && (A.bindBuffer(A.ARRAY_BUFFER, r.__webglTangentBuffer), A.bufferData(A.ARRAY_BUFFER, G, a)), oe && F > 0 && (A.bindBuffer(A.ARRAY_BUFFER, r.__webglUVBuffer), A.bufferData(A.ARRAY_BUFFER, O, a)), oe && z > 0 && (A.bindBuffer(A.ARRAY_BUFFER, r.__webglUV2Buffer), A.bufferData(A.ARRAY_BUFFER, W, a)), re && (A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, r.__webglFaceBuffer), A.bufferData(A.ELEMENT_ARRAY_BUFFER, $, a), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, r.__webglLineBuffer), A.bufferData(A.ELEMENT_ARRAY_BUFFER, ee, a)), P > 0 && (A.bindBuffer(A.ARRAY_BUFFER, r.__webglSkinVertexABuffer), A.bufferData(A.ARRAY_BUFFER, Y, a), A.bindBuffer(A.ARRAY_BUFFER, r.__webglSkinVertexBBuffer), A.bufferData(A.ARRAY_BUFFER, q, a), A.bindBuffer(A.ARRAY_BUFFER, r.__webglSkinIndicesBuffer), A.bufferData(A.ARRAY_BUFFER, K, a), A.bindBuffer(A.ARRAY_BUFFER, r.__webglSkinWeightsBuffer), A.bufferData(A.ARRAY_BUFFER, Q, a))
                }
            }
            n.__dirtyVertices = !1, n.__dirtyMorphTargets = !1, n.__dirtyElements = !1, n.__dirtyUvs = !1, n.__dirtyNormals = !1, n.__dirtyTangents = !1, n.__dirtyColors = !1
        } else if (e instanceof THREE.Ribbon) {
            if ((n = e.geometry).__dirtyVertices || n.__dirtyColors) {
                if (e = n, i = A.DYNAMIC_DRAW, m = e.vertices, r = e.colors, v = m.length, a = r.length, g = e.__vertexArray, s = e.__colorArray, T = e.__dirtyColors, e.__dirtyVertices) {
                    for (l = 0; l < v; l++) p = m[l].position, g[o = 3 * l] = p.x, g[o + 1] = p.y, g[o + 2] = p.z;
                    A.bindBuffer(A.ARRAY_BUFFER, e.__webglVertexBuffer), A.bufferData(A.ARRAY_BUFFER, g, i)
                }
                if (T) {
                    for (l = 0; l < a; l++) color = r[l], s[o = 3 * l] = color.r, s[o + 1] = color.g, s[o + 2] = color.b;
                    A.bindBuffer(A.ARRAY_BUFFER, e.__webglColorBuffer), A.bufferData(A.ARRAY_BUFFER, s, i)
                }
            }
            n.__dirtyVertices = !1, n.__dirtyColors = !1
        } else if (e instanceof THREE.Line) {
            if ((n = e.geometry).__dirtyVertices || n.__dirtyColors) {
                if (e = n, i = A.DYNAMIC_DRAW, m = e.vertices, r = e.colors, v = m.length, a = r.length, g = e.__vertexArray, s = e.__colorArray, T = e.__dirtyColors, e.__dirtyVertices) {
                    for (l = 0; l < v; l++) p = m[l].position, g[o = 3 * l] = p.x, g[o + 1] = p.y, g[o + 2] = p.z;
                    A.bindBuffer(A.ARRAY_BUFFER, e.__webglVertexBuffer), A.bufferData(A.ARRAY_BUFFER, g, i)
                }
                if (T) {
                    for (l = 0; l < a; l++) color = r[l], s[o = 3 * l] = color.r, s[o + 1] = color.g, s[o + 2] = color.b;
                    A.bindBuffer(A.ARRAY_BUFFER, e.__webglColorBuffer), A.bufferData(A.ARRAY_BUFFER, s, i)
                }
            }
            n.__dirtyVertices = !1, n.__dirtyColors = !1
        } else e instanceof THREE.ParticleSystem && (((n = e.geometry).__dirtyVertices || n.__dirtyColors || e.sortParticles) && t(n, A.DYNAMIC_DRAW, e), n.__dirtyVertices = !1, n.__dirtyColors = !1)
    }

    function y(e) {
        var t, i, n, r, o, a, s, l, h = {},
            c = void 0 !== e.morphTargets ? e.morphTargets.length : 0;
        for (e.geometryGroups = {}, n = 0, r = e.faces.length; n < r; n++) void 0 == h[s = function(e) {
            var n = [];
            for (t = 0, i = e.length; t < i; t++) void 0 == e[t] ? n.push("undefined") : n.push(e[t].id);
            return n.join("_")
        }(a = (o = e.faces[n]).materials)] && (h[s] = {
            hash: s,
            counter: 0
        }), l = h[s].hash + "_" + h[s].counter, void 0 == e.geometryGroups[l] && (e.geometryGroups[l] = {
            faces: [],
            materials: a,
            vertices: 0,
            numMorphTargets: c
        }), o = o instanceof THREE.Face3 ? 3 : 4, e.geometryGroups[l].vertices + o > 65535 && (h[s].counter += 1, l = h[s].hash + "_" + h[s].counter, void 0 == e.geometryGroups[l] && (e.geometryGroups[l] = {
            faces: [],
            materials: a,
            vertices: 0,
            numMorphTargets: c
        })), e.geometryGroups[l].faces.push(n), e.geometryGroups[l].vertices += o
    }

    function R(e, t, i) {
        e.push({
            buffer: t,
            object: i,
            opaque: {
                list: [],
                count: 0
            },
            transparent: {
                list: [],
                count: 0
            }
        })
    }

    function x(e) {
        if (e != D) {
            switch (e) {
                case THREE.AdditiveBlending:
                    A.blendEquation(A.FUNC_ADD), A.blendFunc(A.SRC_ALPHA, A.ONE);
                    break;
                case THREE.SubtractiveBlending:
                    A.blendEquation(A.FUNC_ADD), A.blendFunc(A.ZERO, A.ONE_MINUS_SRC_COLOR);
                    break;
                case THREE.MultiplyBlending:
                    A.blendEquation(A.FUNC_ADD), A.blendFunc(A.ZERO, A.SRC_COLOR);
                    break;
                default:
                    A.blendEquationSeparate(A.FUNC_ADD, A.FUNC_ADD), A.blendFuncSeparate(A.SRC_ALPHA, A.ONE_MINUS_SRC_ALPHA, A.ONE, A.ONE_MINUS_SRC_ALPHA)
            }
            D = e
        }
    }

    function _(e, t, i) {
        0 == (i.width & i.width - 1) && 0 == (i.height & i.height - 1) ? (A.texParameteri(e, A.TEXTURE_WRAP_S, S(t.wrapS)), A.texParameteri(e, A.TEXTURE_WRAP_T, S(t.wrapT)), A.texParameteri(e, A.TEXTURE_MAG_FILTER, S(t.magFilter)), A.texParameteri(e, A.TEXTURE_MIN_FILTER, S(t.minFilter)), A.generateMipmap(e)) : (A.texParameteri(e, A.TEXTURE_WRAP_S, A.CLAMP_TO_EDGE), A.texParameteri(e, A.TEXTURE_WRAP_T, A.CLAMP_TO_EDGE), A.texParameteri(e, A.TEXTURE_MAG_FILTER, M(t.magFilter)), A.texParameteri(e, A.TEXTURE_MIN_FILTER, M(t.minFilter)))
    }

    function b(e, t) {
        e.needsUpdate && (e.__webglInit ? (A.bindTexture(A.TEXTURE_2D, e.__webglTexture), A.texSubImage2D(A.TEXTURE_2D, 0, 0, 0, A.RGBA, A.UNSIGNED_BYTE, e.image)) : (e.__webglTexture = A.createTexture(), A.bindTexture(A.TEXTURE_2D, e.__webglTexture), A.texImage2D(A.TEXTURE_2D, 0, A.RGBA, A.RGBA, A.UNSIGNED_BYTE, e.image), e.__webglInit = !0), _(A.TEXTURE_2D, e, e.image), A.bindTexture(A.TEXTURE_2D, null), e.needsUpdate = !1), A.activeTexture(A.TEXTURE0 + t), A.bindTexture(A.TEXTURE_2D, e.__webglTexture)
    }

    function H(e) {
        e && !e.__webglFramebuffer && (void 0 === e.depthBuffer && (e.depthBuffer = !0), void 0 === e.stencilBuffer && (e.stencilBuffer = !0), e.__webglFramebuffer = A.createFramebuffer(), e.__webglRenderbuffer = A.createRenderbuffer(), e.__webglTexture = A.createTexture(), A.bindTexture(A.TEXTURE_2D, e.__webglTexture), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, S(e.wrapS)), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, S(e.wrapT)), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MAG_FILTER, S(e.magFilter)), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MIN_FILTER, S(e.minFilter)), A.texImage2D(A.TEXTURE_2D, 0, S(e.format), e.width, e.height, 0, S(e.format), S(e.type), null), A.bindRenderbuffer(A.RENDERBUFFER, e.__webglRenderbuffer), A.bindFramebuffer(A.FRAMEBUFFER, e.__webglFramebuffer), A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, e.__webglTexture, 0), e.depthBuffer && !e.stencilBuffer ? (A.renderbufferStorage(A.RENDERBUFFER, A.DEPTH_COMPONENT16, e.width, e.height), A.framebufferRenderbuffer(A.FRAMEBUFFER, A.DEPTH_ATTACHMENT, A.RENDERBUFFER, e.__webglRenderbuffer)) : e.depthBuffer && e.stencilBuffer ? (A.renderbufferStorage(A.RENDERBUFFER, A.DEPTH_STENCIL, e.width, e.height), A.framebufferRenderbuffer(A.FRAMEBUFFER, A.DEPTH_STENCIL_ATTACHMENT, A.RENDERBUFFER, e.__webglRenderbuffer)) : A.renderbufferStorage(A.RENDERBUFFER, A.RGBA4, e.width, e.height), A.bindTexture(A.TEXTURE_2D, null), A.bindRenderbuffer(A.RENDERBUFFER, null), A.bindFramebuffer(A.FRAMEBUFFER, null));
        var t, i;
        e ? (t = e.__webglFramebuffer, i = e.width, e = e.height) : (t = null, i = O, e = W), t != V && (A.bindFramebuffer(A.FRAMEBUFFER, t), A.viewport(N, I, i, e), V = t)
    }

    function w(e, t) {
        var i;
        return "fragment" == e ? i = A.createShader(A.FRAGMENT_SHADER) : "vertex" == e && (i = A.createShader(A.VERTEX_SHADER)), A.shaderSource(i, t), A.compileShader(i), A.getShaderParameter(i, A.COMPILE_STATUS) ? i : (console.error(A.getShaderInfoLog(i)), console.error(t), null)
    }

    function M(e) {
        switch (e) {
            case THREE.NearestFilter:
            case THREE.NearestMipMapNearestFilter:
            case THREE.NearestMipMapLinearFilter:
                return A.NEAREST;
            default:
                return A.LINEAR
        }
    }

    function S(e) {
        switch (e) {
            case THREE.RepeatWrapping:
                return A.REPEAT;
            case THREE.ClampToEdgeWrapping:
                return A.CLAMP_TO_EDGE;
            case THREE.MirroredRepeatWrapping:
                return A.MIRRORED_REPEAT;
            case THREE.NearestFilter:
                return A.NEAREST;
            case THREE.NearestMipMapNearestFilter:
                return A.NEAREST_MIPMAP_NEAREST;
            case THREE.NearestMipMapLinearFilter:
                return A.NEAREST_MIPMAP_LINEAR;
            case THREE.LinearFilter:
                return A.LINEAR;
            case THREE.LinearMipMapNearestFilter:
                return A.LINEAR_MIPMAP_NEAREST;
            case THREE.LinearMipMapLinearFilter:
                return A.LINEAR_MIPMAP_LINEAR;
            case THREE.ByteType:
                return A.BYTE;
            case THREE.UnsignedByteType:
                return A.UNSIGNED_BYTE;
            case THREE.ShortType:
                return A.SHORT;
            case THREE.UnsignedShortType:
                return A.UNSIGNED_SHORT;
            case THREE.IntType:
                return A.INT;
            case THREE.UnsignedShortType:
                return A.UNSIGNED_INT;
            case THREE.FloatType:
                return A.FLOAT;
            case THREE.AlphaFormat:
                return A.ALPHA;
            case THREE.RGBFormat:
                return A.RGB;
            case THREE.RGBAFormat:
                return A.RGBA;
            case THREE.LuminanceFormat:
                return A.LUMINANCE;
            case THREE.LuminanceAlphaFormat:
                return A.LUMINANCE_ALPHA
        }
        return 0
    }
    var A, C = this,
        L = document.createElement("canvas"),
        F = [],
        z = null,
        V = null,
        U = !0,
        B = null,
        k = null,
        D = null,
        P = null,
        N = 0,
        I = 0,
        O = 0,
        W = 0,
        j = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4],
        G = new THREE.Matrix4,
        X = new Float32Array(16),
        Y = new Float32Array(16),
        q = new THREE.Vector4,
        K = {
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
            }
        };
    if (e = e || {}, stencil = void 0 === e.stencil || e.stencil, antialias = void 0 !== e.antialias && e.antialias, clearColor = void 0 !== e.clearColor ? new THREE.Color(e.clearColor) : new THREE.Color(0), clearAlpha = void 0 !== e.clearAlpha ? e.clearAlpha : 0, this.data = {
        vertices: 0,
        faces: 0,
        drawCalls: 0
    }, this.maxMorphTargets = 8, this.domElement = L, this.autoClear = !0, this.sortObjects = !0, function(e, t, i, n) {
        try {
            if (!(A = L.getContext("experimental-webgl", {
                antialias: e,
                stencil: n
            }))) throw "Error creating WebGL context."
        } catch (e) {
            console.error(e)
        }
        console.log(navigator.userAgent + " | " + A.getParameter(A.VERSION) + " | " + A.getParameter(A.VENDOR) + " | " + A.getParameter(A.RENDERER) + " | " + A.getParameter(A.SHADING_LANGUAGE_VERSION)), A.clearColor(0, 0, 0, 1), A.clearDepth(1), A.enable(A.DEPTH_TEST), A.depthFunc(A.LEQUAL), A.frontFace(A.CCW), A.cullFace(A.BACK), A.enable(A.CULL_FACE), A.enable(A.BLEND), A.blendEquation(A.FUNC_ADD), A.blendFunc(A.SRC_ALPHA, A.ONE_MINUS_SRC_ALPHA), A.clearColor(t.r, t.g, t.b, i)
    }(antialias, clearColor, clearAlpha, stencil), this.context = A, stencil) {
        var Q = {};
        Q.vertices = new Float32Array(12), Q.faces = new Uint16Array(6), Q.darkness = .5, Q.vertices[0] = -20, Q.vertices[1] = -20, Q.vertices[2] = -1, Q.vertices[3] = 20, Q.vertices[4] = -20, Q.vertices[5] = -1, Q.vertices[6] = 20, Q.vertices[7] = 20, Q.vertices[8] = -1, Q.vertices[9] = -20, Q.vertices[10] = 20, Q.vertices[11] = -1, Q.faces[0] = 0, Q.faces[1] = 1, Q.faces[2] = 2, Q.faces[3] = 0, Q.faces[4] = 2, Q.faces[5] = 3, Q.vertexBuffer = A.createBuffer(), Q.elementBuffer = A.createBuffer(), A.bindBuffer(A.ARRAY_BUFFER, Q.vertexBuffer), A.bufferData(A.ARRAY_BUFFER, Q.vertices, A.STATIC_DRAW), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, Q.elementBuffer), A.bufferData(A.ELEMENT_ARRAY_BUFFER, Q.faces, A.STATIC_DRAW), Q.program = A.createProgram(), A.attachShader(Q.program, w("fragment", THREE.ShaderLib.shadowPost.fragmentShader)), A.attachShader(Q.program, w("vertex", THREE.ShaderLib.shadowPost.vertexShader)), A.linkProgram(Q.program), Q.vertexLocation = A.getAttribLocation(Q.program, "position"), Q.projectionLocation = A.getUniformLocation(Q.program, "projectionMatrix"), Q.darknessLocation = A.getUniformLocation(Q.program, "darkness")
    }
    var Z = {};
    Z.vertices = new Float32Array(16), Z.faces = new Uint16Array(6), e = 0, Z.vertices[e++] = -1, Z.vertices[e++] = -1, Z.vertices[e++] = 0, Z.vertices[e++] = 0, Z.vertices[e++] = 1, Z.vertices[e++] = -1, Z.vertices[e++] = 1, Z.vertices[e++] = 0, Z.vertices[e++] = 1, Z.vertices[e++] = 1, Z.vertices[e++] = 1, Z.vertices[e++] = 1, Z.vertices[e++] = -1, Z.vertices[e++] = 1, Z.vertices[e++] = 0, Z.vertices[e++] = 1, e = 0, Z.faces[e++] = 0, Z.faces[e++] = 1, Z.faces[e++] = 2, Z.faces[e++] = 0, Z.faces[e++] = 2, Z.faces[e++] = 3, Z.vertexBuffer = A.createBuffer(), Z.elementBuffer = A.createBuffer(), Z.tempTexture = A.createTexture(), Z.occlusionTexture = A.createTexture(), A.bindBuffer(A.ARRAY_BUFFER, Z.vertexBuffer), A.bufferData(A.ARRAY_BUFFER, Z.vertices, A.STATIC_DRAW), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, Z.elementBuffer), A.bufferData(A.ELEMENT_ARRAY_BUFFER, Z.faces, A.STATIC_DRAW), A.bindTexture(A.TEXTURE_2D, Z.tempTexture), A.texImage2D(A.TEXTURE_2D, 0, A.RGB, 16, 16, 0, A.RGB, A.UNSIGNED_BYTE, null), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, A.CLAMP_TO_EDGE), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, A.CLAMP_TO_EDGE), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MAG_FILTER, A.NEAREST), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MIN_FILTER, A.NEAREST), A.bindTexture(A.TEXTURE_2D, Z.occlusionTexture), A.texImage2D(A.TEXTURE_2D, 0, A.RGBA, 16, 16, 0, A.RGBA, A.UNSIGNED_BYTE, null), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, A.CLAMP_TO_EDGE), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, A.CLAMP_TO_EDGE), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MAG_FILTER, A.NEAREST), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MIN_FILTER, A.NEAREST), A.getParameter(A.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0 ? (Z.hasVertexTexture = !1, Z.program = A.createProgram(), A.attachShader(Z.program, w("fragment", THREE.ShaderLib.lensFlare.fragmentShader)), A.attachShader(Z.program, w("vertex", THREE.ShaderLib.lensFlare.vertexShader))) : (Z.hasVertexTexture = !0, Z.program = A.createProgram(), A.attachShader(Z.program, w("fragment", THREE.ShaderLib.lensFlareVertexTexture.fragmentShader)), A.attachShader(Z.program, w("vertex", THREE.ShaderLib.lensFlareVertexTexture.vertexShader))), A.linkProgram(Z.program), Z.attributes = {}, Z.uniforms = {}, Z.attributes.vertex = A.getAttribLocation(Z.program, "position"), Z.attributes.uv = A.getAttribLocation(Z.program, "UV"), Z.uniforms.renderType = A.getUniformLocation(Z.program, "renderType"), Z.uniforms.map = A.getUniformLocation(Z.program, "map"), Z.uniforms.occlusionMap = A.getUniformLocation(Z.program, "occlusionMap"), Z.uniforms.opacity = A.getUniformLocation(Z.program, "opacity"), Z.uniforms.scale = A.getUniformLocation(Z.program, "scale"), Z.uniforms.rotation = A.getUniformLocation(Z.program, "rotation"), Z.uniforms.screenPosition = A.getUniformLocation(Z.program, "screenPosition");
    var J = !1;
    _sprite = {}, _sprite.vertices = new Float32Array(16), _sprite.faces = new Uint16Array(6), e = 0, _sprite.vertices[e++] = -1, _sprite.vertices[e++] = -1, _sprite.vertices[e++] = 0, _sprite.vertices[e++] = 0, _sprite.vertices[e++] = 1, _sprite.vertices[e++] = -1, _sprite.vertices[e++] = 1, _sprite.vertices[e++] = 0, _sprite.vertices[e++] = 1, _sprite.vertices[e++] = 1, _sprite.vertices[e++] = 1, _sprite.vertices[e++] = 1, _sprite.vertices[e++] = -1, _sprite.vertices[e++] = 1, _sprite.vertices[e++] = 0, _sprite.vertices[e++] = 1, e = 0, _sprite.faces[e++] = 0, _sprite.faces[e++] = 1, _sprite.faces[e++] = 2, _sprite.faces[e++] = 0, _sprite.faces[e++] = 2, _sprite.faces[e++] = 3, _sprite.vertexBuffer = A.createBuffer(), _sprite.elementBuffer = A.createBuffer(), A.bindBuffer(A.ARRAY_BUFFER, _sprite.vertexBuffer), A.bufferData(A.ARRAY_BUFFER, _sprite.vertices, A.STATIC_DRAW), A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer), A.bufferData(A.ELEMENT_ARRAY_BUFFER, _sprite.faces, A.STATIC_DRAW), _sprite.program = A.createProgram(), A.attachShader(_sprite.program, w("fragment", THREE.ShaderLib.sprite.fragmentShader)), A.attachShader(_sprite.program, w("vertex", THREE.ShaderLib.sprite.vertexShader)), A.linkProgram(_sprite.program), _sprite.attributes = {}, _sprite.uniforms = {}, _sprite.attributes.position = A.getAttribLocation(_sprite.program, "position"), _sprite.attributes.uv = A.getAttribLocation(_sprite.program, "uv"), _sprite.uniforms.uvOffset = A.getUniformLocation(_sprite.program, "uvOffset"), _sprite.uniforms.uvScale = A.getUniformLocation(_sprite.program, "uvScale"), _sprite.uniforms.rotation = A.getUniformLocation(_sprite.program, "rotation"), _sprite.uniforms.scale = A.getUniformLocation(_sprite.program, "scale"), _sprite.uniforms.alignment = A.getUniformLocation(_sprite.program, "alignment"), _sprite.uniforms.map = A.getUniformLocation(_sprite.program, "map"), _sprite.uniforms.opacity = A.getUniformLocation(_sprite.program, "opacity"), _sprite.uniforms.useScreenCoordinates = A.getUniformLocation(_sprite.program, "useScreenCoordinates"), _sprite.uniforms.affectedByDistance = A.getUniformLocation(_sprite.program, "affectedByDistance"), _sprite.uniforms.screenPosition = A.getUniformLocation(_sprite.program, "screenPosition"), _sprite.uniforms.modelViewMatrix = A.getUniformLocation(_sprite.program, "modelViewMatrix"), _sprite.uniforms.projectionMatrix = A.getUniformLocation(_sprite.program, "projectionMatrix");
    var $ = !1;
    this.setSize = function(e, t) {
        L.width = e, L.height = t, this.setViewport(0, 0, L.width, L.height)
    }, this.setViewport = function(e, t, i, n) {
        N = e, I = t, O = i, W = n, A.viewport(N, I, O, W)
    }, this.setScissor = function(e, t, i, n) {
        A.scissor(e, t, i, n)
    }, this.enableScissorTest = function(e) {
        e ? A.enable(A.SCISSOR_TEST) : A.disable(A.SCISSOR_TEST)
    }, this.enableDepthBufferWrite = function(e) {
        U = e, A.depthMask(e)
    }, this.setClearColorHex = function(e, t) {
        var i = new THREE.Color(e);
        A.clearColor(i.r, i.g, i.b, t)
    }, this.setClearColor = function(e, t) {
        A.clearColor(e.r, e.g, e.b, t)
    }, this.clear = function() {
        A.clear(A.COLOR_BUFFER_BIT | A.DEPTH_BUFFER_BIT | A.STENCIL_BUFFER_BIT)
    }, this.setStencilShadowDarkness = function(e) {
        Q.darkness = e
    }, this.getContext = function() {
        return A
    }, this.initMaterial = function(e, t, i, n) {
        var r, o, a;
        if (e instanceof THREE.MeshDepthMaterial ? a = "depth" : e instanceof THREE.ShadowVolumeDynamicMaterial ? a = "shadowVolumeDynamic" : e instanceof THREE.MeshNormalMaterial ? a = "normal" : e instanceof THREE.MeshBasicMaterial ? a = "basic" : e instanceof THREE.MeshLambertMaterial ? a = "lambert" : e instanceof THREE.MeshPhongMaterial ? a = "phong" : e instanceof THREE.LineBasicMaterial ? a = "basic" : e instanceof THREE.ParticleBasicMaterial && (a = "particle_basic"), a) {
            var s = THREE.ShaderLib[a];
            e.uniforms = THREE.UniformsUtils.clone(s.uniforms), e.vertexShader = s.vertexShader, e.fragmentShader = s.fragmentShader
        }
        var l, h, c;
        for (l = c = s = 0, h = t.length; l < h; l++)(o = t[l]) instanceof THREE.DirectionalLight && c++, o instanceof THREE.PointLight && s++;
        s + c <= 4 ? t = c : s = 4 - (t = Math.ceil(4 * c / (s + c))), o = {
            directional: t,
            point: s
        }, c = 50, void 0 !== n && n instanceof THREE.SkinnedMesh && (c = n.bones.length);
        var u;
        e: {
            l = e.fragmentShader, h = e.vertexShader, s = e.uniforms, t = e.attributes, i = {
                map: !!e.map,
                envMap: !!e.envMap,
                lightMap: !!e.lightMap,
                vertexColors: e.vertexColors,
                fog: i,
                sizeAttenuation: e.sizeAttenuation,
                skinning: e.skinning,
                morphTargets: e.morphTargets,
                maxMorphTargets: this.maxMorphTargets,
                maxDirLights: o.directional,
                maxPointLights: o.point,
                maxBones: c
            };
            var f;
            o = [], a ? o.push(a) : (o.push(l), o.push(h));
            for (f in i) o.push(f), o.push(i[f]);
            for (a = o.join(), f = 0, o = F.length; f < o; f++)
                if (F[f].code == a) {
                    u = F[f].program;
                    break e
                }
            f = A.createProgram(), prefix_fragment = ["#ifdef GL_ES\nprecision highp float;\n#endif", "#define MAX_DIR_LIGHTS " + i.maxDirLights, "#define MAX_POINT_LIGHTS " + i.maxPointLights, i.fog ? "#define USE_FOG" : "", i.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.vertexColors ? "#define USE_COLOR" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n"), prefix_vertex = [A.getParameter(A.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0 ? "#define VERTEX_TEXTURES" : "", "#define MAX_DIR_LIGHTS " + i.maxDirLights, "#define MAX_POINT_LIGHTS " + i.maxPointLights, "#define MAX_BONES " + i.maxBones, i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.vertexColors ? "#define USE_COLOR" : "", i.skinning ? "#define USE_SKINNING" : "", i.morphTargets ? "#define USE_MORPHTARGETS" : "", i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n"), A.attachShader(f, w("fragment", prefix_fragment + l)), A.attachShader(f, w("vertex", prefix_vertex + h)), A.linkProgram(f), A.getProgramParameter(f, A.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + A.getProgramParameter(f, A.VALIDATE_STATUS) + ", gl error [" + A.getError() + "]"), f.uniforms = {}, f.attributes = {};
            var d;
            l = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "cameraInverseMatrix", "boneGlobalMatrices", "morphTargetInfluences"];
            for (d in s) l.push(d);
            for (s = 0, l = (d = l).length; s < l; s++) h = d[s], f.uniforms[h] = A.getUniformLocation(f, h);
            for (l = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"], d = 0; d < i.maxMorphTargets; d++) l.push("morphTarget" + d);
            for (u in t) l.push(u);
            for (d = 0, t = (u = l).length; d < t; d++) i = u[d], f.attributes[i] = A.getAttribLocation(f, i);
            F.push({
                program: f,
                code: a
            }), u = f
        }
        e.program = u, u = e.program.attributes, A.enableVertexAttribArray(u.position), u.color >= 0 && A.enableVertexAttribArray(u.color), u.normal >= 0 && A.enableVertexAttribArray(u.normal), u.tangent >= 0 && A.enableVertexAttribArray(u.tangent), e.skinning && u.skinVertexA >= 0 && u.skinVertexB >= 0 && u.skinIndex >= 0 && u.skinWeight >= 0 && (A.enableVertexAttribArray(u.skinVertexA), A.enableVertexAttribArray(u.skinVertexB), A.enableVertexAttribArray(u.skinIndex), A.enableVertexAttribArray(u.skinWeight));
        for (r in e.attributes) u[r] >= 0 && A.enableVertexAttribArray(u[r]);
        if (e.morphTargets)
            for (e.numSupportedMorphTargets = 0, u.morphTarget0 >= 0 && (A.enableVertexAttribArray(u.morphTarget0), e.numSupportedMorphTargets++), u.morphTarget1 >= 0 && (A.enableVertexAttribArray(u.morphTarget1), e.numSupportedMorphTargets++), u.morphTarget2 >= 0 && (A.enableVertexAttribArray(u.morphTarget2), e.numSupportedMorphTargets++), u.morphTarget3 >= 0 && (A.enableVertexAttribArray(u.morphTarget3), e.numSupportedMorphTargets++), u.morphTarget4 >= 0 && (A.enableVertexAttribArray(u.morphTarget4), e.numSupportedMorphTargets++), u.morphTarget5 >= 0 && (A.enableVertexAttribArray(u.morphTarget5), e.numSupportedMorphTargets++), u.morphTarget6 >= 0 && (A.enableVertexAttribArray(u.morphTarget6), e.numSupportedMorphTargets++), u.morphTarget7 >= 0 && (A.enableVertexAttribArray(u.morphTarget7), e.numSupportedMorphTargets++), n.__webglMorphTargetInfluences = new Float32Array(this.maxMorphTargets), e = 0, r = this.maxMorphTargets; e < r; e++) n.__webglMorphTargetInfluences[e] = 0
    }, this.render = function(e, t, a, l) {
        var u, T, y, R, _, b, w, M, S = e.lights,
            L = e.fog;
        for (C.data.vertices = 0, C.data.faces = 0, C.data.drawCalls = 0, t.matrixAutoUpdate && t.update(void 0, !0), e.update(void 0, !1, t), t.matrixWorldInverse.flattenToArray(Y), t.projectionMatrix.flattenToArray(X), G.multiply(t.projectionMatrix, t.matrixWorldInverse), h(G), this.initWebGLObjects(e), H(a), (this.autoClear || l) && this.clear(), _ = e.__webglObjects.length, l = 0; l < _; l++)(w = (u = e.__webglObjects[l]).object).visible ? w instanceof THREE.Mesh && !c(w) ? u.render = !1 : (w.matrixWorld.flattenToArray(w._objectMatrixArray), g(w, t), d(u), u.render = !0, this.sortObjects && (q.copy(w.position), G.multiplyVector3(q), u.z = q.z)) : u.render = !1;
        for (this.sortObjects && e.__webglObjects.sort(E), b = e.__webglObjectsImmediate.length, l = 0; l < b; l++)(w = (u = e.__webglObjectsImmediate[l]).object).visible && (w.matrixAutoUpdate && w.matrixWorld.flattenToArray(w._objectMatrixArray), g(w, t), f(u));
        for (x(THREE.NormalBlending), l = 0; l < _; l++)
            if ((u = e.__webglObjects[l]).render)
                for (w = u.object, M = u.buffer, y = u.opaque, o(w), u = 0; u < y.count; u++) s((R = y.list[u]).depthTest), n(t, S, L, R, M, w);
        for (l = 0; l < b; l++)
            if (u = e.__webglObjectsImmediate[l], (w = u.object).visible)
                for (y = u.opaque, o(w), u = 0; u < y.count; u++) s((R = y.list[u]).depthTest), T = i(t, S, L, R, w), w.render(function(e) {
                    r(e, T, R.shading)
                });
        for (l = 0; l < _; l++)
            if ((u = e.__webglObjects[l]).render)
                for (w = u.object, M = u.buffer, y = u.transparent, o(w), u = 0; u < y.count; u++) x((R = y.list[u]).blending), s(R.depthTest), n(t, S, L, R, M, w);
        for (l = 0; l < b; l++)
            if (u = e.__webglObjectsImmediate[l], (w = u.object).visible)
                for (y = u.transparent, o(w), u = 0; u < y.count; u++) x((R = y.list[u]).blending), s(R.depthTest), T = i(t, S, L, R, w), w.render(function(e) {
                    r(e, T, R.shading)
                });
        e.__webglSprites.length && m(e, t), stencil && e.__webglShadowVolumes.length && e.lights.length && p(e), e.__webglLensFlares.length && v(e, t), a && a.minFilter !== THREE.NearestFilter && a.minFilter !== THREE.LinearFilter && (A.bindTexture(A.TEXTURE_2D, a.__webglTexture), A.generateMipmap(A.TEXTURE_2D), A.bindTexture(A.TEXTURE_2D, null))
    }, this.initWebGLObjects = function(e) {
        for (e.__webglObjects || (e.__webglObjects = [], e.__webglObjectsImmediate = [], e.__webglShadowVolumes = [], e.__webglLensFlares = [], e.__webglSprites = []); e.__objectsAdded.length;) {
            var t = e.__objectsAdded[0],
                i = e,
                n = void 0,
                r = void 0,
                o = void 0;
            if (void 0 == t._modelViewMatrix && (t._modelViewMatrix = new THREE.Matrix4, t._normalMatrixArray = new Float32Array(9), t._modelViewMatrixArray = new Float32Array(16), t._objectMatrixArray = new Float32Array(16), t.matrixWorld.flattenToArray(t._objectMatrixArray)), t instanceof THREE.Mesh) {
                void 0 == (r = t.geometry).geometryGroups && y(r);
                for (n in r.geometryGroups) {
                    if (!(o = r.geometryGroups[n]).__webglVertexBuffer) {
                        var s = o;
                        if (s.__webglVertexBuffer = A.createBuffer(), s.__webglNormalBuffer = A.createBuffer(), s.__webglTangentBuffer = A.createBuffer(), s.__webglColorBuffer = A.createBuffer(), s.__webglUVBuffer = A.createBuffer(), s.__webglUV2Buffer = A.createBuffer(), s.__webglSkinVertexABuffer = A.createBuffer(), s.__webglSkinVertexBBuffer = A.createBuffer(), s.__webglSkinIndicesBuffer = A.createBuffer(), s.__webglSkinWeightsBuffer = A.createBuffer(), s.__webglFaceBuffer = A.createBuffer(), s.__webglLineBuffer = A.createBuffer(), s.numMorphTargets) {
                            var h = void 0,
                                c = void 0;
                            for (s.__webglMorphTargetsBuffers = [], h = 0, c = s.numMorphTargets; h < c; h++) s.__webglMorphTargetsBuffers.push(A.createBuffer())
                        }
                        s = o;
                        var u = void 0,
                            f = void 0,
                            d = void 0;
                        d = void 0;
                        var E = void 0,
                            p = void 0,
                            m = void 0,
                            v = m = c = 0;
                        f = void 0, d = void 0;
                        var g = void 0;
                        for (u = void 0, f = void 0, g = (E = (h = t).geometry).faces, u = 0, f = (p = s.faces).length; u < f; u++)(d = g[d = p[u]]) instanceof THREE.Face3 ? (c += 3, m += 1, v += 3) : d instanceof THREE.Face4 && (c += 4, m += 2, v += 4);
                        u = s, g = void 0, p = void 0;
                        var x = void 0,
                            _ = void 0;
                        for (x = void 0, d = [], g = 0, p = (f = h).materials.length; g < p; g++)
                            if ((x = f.materials[g]) instanceof THREE.MeshFaceMaterial)
                                for (x = 0, l = u.materials.length; x < l; x++)(_ = u.materials[x]) && d.push(_);
                            else(_ = x) && d.push(_);
                        e: {
                            for (f = void 0, g = void 0, p = (u = d).length, f = 0; f < p; f++)
                                if ((g = u[f]).map || g.lightMap || g instanceof THREE.MeshShaderMaterial) {
                                    f = !0;
                                    break e
                                }
                            f = !1
                        }
                        e: {
                            for (g = void 0, p = void 0, d = u.length, g = 0; g < d; g++)
                                if (!((p = u[g]) instanceof THREE.MeshBasicMaterial && !p.envMap || p instanceof THREE.MeshDepthMaterial)) {
                                    g = p && void 0 != p.shading && p.shading == THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading;
                                    break e
                                }
                            g = !1
                        }
                        e: {
                            for (p = void 0, d = void 0, x = u.length, p = 0; p < x; p++)
                                if ((d = u[p]).vertexColors) {
                                    d = d.vertexColors;
                                    break e
                                }
                            d = !1
                        }
                        if (s.__vertexArray = new Float32Array(3 * c), g && (s.__normalArray = new Float32Array(3 * c)), E.hasTangents && (s.__tangentArray = new Float32Array(4 * c)), d && (s.__colorArray = new Float32Array(3 * c)), f && ((E.faceUvs.length > 0 || E.faceVertexUvs.length > 0) && (s.__uvArray = new Float32Array(2 * c)), (E.faceUvs.length > 1 || E.faceVertexUvs.length > 1) && (s.__uv2Array = new Float32Array(2 * c))), h.geometry.skinWeights.length && h.geometry.skinIndices.length && (s.__skinVertexAArray = new Float32Array(4 * c), s.__skinVertexBArray = new Float32Array(4 * c), s.__skinIndexArray = new Float32Array(4 * c), s.__skinWeightArray = new Float32Array(4 * c)), s.__faceArray = new Uint16Array(3 * m + (h.geometry.edgeFaces ? 6 * h.geometry.edgeFaces.length : 0)), s.__lineArray = new Uint16Array(2 * v), s.numMorphTargets)
                            for (s.__morphTargetsArrays = [], E = 0, p = s.numMorphTargets; E < p; E++) s.__morphTargetsArrays.push(new Float32Array(3 * c));
                        for (s.__needsSmoothNormals = g == THREE.SmoothShading, s.__uvType = f, s.__vertexColorType = d, s.__normalType = g, s.__webglFaceCount = 3 * m + (h.geometry.edgeFaces ? 6 * h.geometry.edgeFaces.length : 0), s.__webglLineCount = 2 * v, E = 0, p = u.length; E < p; E++)
                            if (u[E].attributes) {
                                s.__webglCustomAttributes = {};
                                for (a in u[E].attributes)(f = u[E].attributes[a]).__webglInitialized && !f.createUniqueBuffers || (f.__webglInitialized = !0, m = 1, "v2" === f.type ? m = 2 : "v3" === f.type ? m = 3 : "v4" === f.type ? m = 4 : "c" === f.type && (m = 3), f.size = m, f.needsUpdate = !0, f.array = new Float32Array(c * m), f.buffer = A.createBuffer(), f.buffer.belongsToAttribute = a), s.__webglCustomAttributes[a] = f
                            }
                        r.__dirtyVertices = !0, r.__dirtyMorphTargets = !0, r.__dirtyElements = !0, r.__dirtyUvs = !0, r.__dirtyNormals = !0, r.__dirtyTangents = !0, r.__dirtyColors = !0
                    }
                    t instanceof THREE.ShadowVolume ? R(i.__webglShadowVolumes, o, t) : R(i.__webglObjects, o, t)
                }
            } else t instanceof THREE.LensFlare ? R(i.__webglLensFlares, void 0, t) : t instanceof THREE.Ribbon ? ((r = t.geometry).__webglVertexBuffer || ((n = r).__webglVertexBuffer = A.createBuffer(), n.__webglColorBuffer = A.createBuffer(), o = (n = r).vertices.length, n.__vertexArray = new Float32Array(3 * o), n.__colorArray = new Float32Array(3 * o), n.__webglVertexCount = o, r.__dirtyVertices = !0, r.__dirtyColors = !0), R(i.__webglObjects, r, t)) : t instanceof THREE.Line ? ((r = t.geometry).__webglVertexBuffer || ((n = r).__webglVertexBuffer = A.createBuffer(), n.__webglColorBuffer = A.createBuffer(), o = (n = r).vertices.length, n.__vertexArray = new Float32Array(3 * o), n.__colorArray = new Float32Array(3 * o), n.__webglLineCount = o, r.__dirtyVertices = !0, r.__dirtyColors = !0), R(i.__webglObjects, r, t)) : t instanceof THREE.ParticleSystem ? ((r = t.geometry).__webglVertexBuffer || ((n = r).__webglVertexBuffer = A.createBuffer(), n.__webglColorBuffer = A.createBuffer(), o = (n = r).vertices.length, n.__vertexArray = new Float32Array(3 * o), n.__colorArray = new Float32Array(3 * o), n.__sortArray = [], n.__webglParticleCount = o, r.__dirtyVertices = !0, r.__dirtyColors = !0), R(i.__webglObjects, r, t)) : void 0 !== THREE.MarchingCubes && t instanceof THREE.MarchingCubes ? i.__webglObjectsImmediate.push({
                object: t,
                opaque: {
                    list: [],
                    count: 0
                },
                transparent: {
                    list: [],
                    count: 0
                }
            }) : t instanceof THREE.Sprite && i.__webglSprites.push(t);
            e.__objectsAdded.splice(0, 1)
        }
        for (; e.__objectsRemoved.length;) {
            if (t = e.__objectsRemoved[0], i = e, r = void 0, n = void 0, t instanceof THREE.Mesh) {
                for (r = i.__webglObjects.length - 1; r >= 0; r--)
                    if (n = i.__webglObjects[r].object, t == n) {
                        i.__webglObjects.splice(r, 1);
                        break
                    }
            } else if (t instanceof THREE.Sprite)
                for (r = i.__webglSprites.length - 1; r >= 0; r--)
                    if (n = i.__webglSprites[r], t == n) {
                        i.__webglSprites.splice(r, 1);
                        break
                    }
            e.__objectsRemoved.splice(0, 1)
        }
        for (t = 0, i = e.__webglObjects.length; t < i; t++) T(e.__webglObjects[t].object);
        for (t = 0, i = e.__webglShadowVolumes.length; t < i; t++) T(e.__webglShadowVolumes[t].object);
        for (t = 0, i = e.__webglLensFlares.length; t < i; t++) T(e.__webglLensFlares[t].object)
    }, this.setFaceCulling = function(e, t) {
        e ? (t && "ccw" != t ? A.frontFace(A.CW) : A.frontFace(A.CCW), "back" == e ? A.cullFace(A.BACK) : "front" == e ? A.cullFace(A.FRONT) : A.cullFace(A.FRONT_AND_BACK), A.enable(A.CULL_FACE)) : A.disable(A.CULL_FACE)
    }, this.supportsVertexTextures = function() {
        return A.getParameter(A.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0
    }
}, THREE.WebGLRenderTarget = function(e, t, i) {
    this.width = e, this.height = t, i = i || {}, this.wrapS = void 0 !== i.wrapS ? i.wrapS : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== i.wrapT ? i.wrapT : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== i.magFilter ? i.magFilter : THREE.LinearFilter, this.minFilter = void 0 !== i.minFilter ? i.minFilter : THREE.LinearMipMapLinearFilter, this.format = void 0 !== i.format ? i.format : THREE.RGBAFormat, this.type = void 0 !== i.type ? i.type : THREE.UnsignedByteType, this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer, this.stencilBuffer = void 0 === i.stencilBuffer || i.stencilBuffer
}, THREE.AnimationHandler = function() {
    var e = [],
        t = {},
        i = {};
    i.update = function(t) {
        for (var i = 0; i < e.length; i++) e[i].update(t)
    }, i.addToUpdate = function(t) {
        -1 === e.indexOf(t) && e.push(t)
    }, i.removeFromUpdate = function(t) {
        -1 !== (t = e.indexOf(t)) && e.splice(t, 1)
    }, i.add = function(e) {
        if (void 0 !== t[e.name] && console.log("THREE.AnimationHandler.add: Warning! " + e.name + " already exists in library. Overwriting."), t[e.name] = e, !0 !== e.initialized) {
            for (var i = 0; i < e.hierarchy.length; i++) {
                for (var n = 0; n < e.hierarchy[i].keys.length; n++)
                    if (e.hierarchy[i].keys[n].time < 0 && (e.hierarchy[i].keys[n].time = 0), void 0 !== e.hierarchy[i].keys[n].rot && !(e.hierarchy[i].keys[n].rot instanceof THREE.Quaternion)) {
                        var r = e.hierarchy[i].keys[n].rot;
                        e.hierarchy[i].keys[n].rot = new THREE.Quaternion(r[0], r[1], r[2], r[3])
                    }
                if (void 0 !== e.hierarchy[i].keys[0].morphTargets) {
                    for (r = {}, n = 0; n < e.hierarchy[i].keys.length; n++)
                        for (var o = 0; o < e.hierarchy[i].keys[n].morphTargets.length; o++) {
                            var a = e.hierarchy[i].keys[n].morphTargets[o];
                            r[a] = -1
                        }
                    for (e.hierarchy[i].usedMorphTargets = r, n = 0; n < e.hierarchy[i].keys.length; n++) {
                        var s = {};
                        for (a in r) {
                            for (o = 0; o < e.hierarchy[i].keys[n].morphTargets.length; o++)
                                if (e.hierarchy[i].keys[n].morphTargets[o] === a) {
                                    s[a] = e.hierarchy[i].keys[n].morphTargetsInfluences[o];
                                    break
                                }
                            o === e.hierarchy[i].keys[n].morphTargets.length && (s[a] = 0)
                        }
                        e.hierarchy[i].keys[n].morphTargetsInfluences = s
                    }
                }
                for (n = 1; n < e.hierarchy[i].keys.length; n++) e.hierarchy[i].keys[n].time === e.hierarchy[i].keys[n - 1].time && (e.hierarchy[i].keys.splice(n, 1), n--);
                for (n = 1; n < e.hierarchy[i].keys.length; n++) e.hierarchy[i].keys[n].index = n
            }
            for (n = parseInt(e.length * e.fps, 10), e.JIT = {}, e.JIT.hierarchy = [], i = 0; i < e.hierarchy.length; i++) e.JIT.hierarchy.push(Array(n));
            e.initialized = !0
        }
    }, i.get = function(e) {
        if ("string" == typeof e) return t[e] ? t[e] : (console.log("THREE.AnimationHandler.get: Couldn't find animation " + e), null)
    }, i.parse = function(e) {
        var t = [];
        if (e instanceof THREE.SkinnedMesh)
            for (var i = 0; i < e.bones.length; i++) t.push(e.bones[i]);
        else n(e, t);
        return t
    };
    var n = function(e, t) {
        t.push(e);
        for (var i = 0; i < e.children.length; i++) n(e.children[i], t)
    };
    return i.LINEAR = 0, i.CATMULLROM = 1, i.CATMULLROM_FORWARD = 2, i
}(), THREE.Animation = function(e, t, i, n) {
    this.root = e, this.data = THREE.AnimationHandler.get(t), this.hierarchy = THREE.AnimationHandler.parse(e), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.isPaused = !0, this.loop = !0, this.interpolationType = void 0 !== i ? i : THREE.AnimationHandler.LINEAR, this.JITCompile = void 0 === n || n, this.points = [], this.target = new THREE.Vector3
}, THREE.Animation.prototype.play = function(e, t) {
    if (!this.isPlaying) {
        this.isPlaying = !0, this.loop = void 0 === e || e, this.currentTime = void 0 !== t ? t : 0;
        var i, n, r = this.hierarchy.length;
        for (i = 0; i < r; i++) {
            n = this.hierarchy[i], this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD && (n.useQuaternion = !0), n.matrixAutoUpdate = !0, void 0 === n.animationCache && (n.animationCache = {}, n.animationCache.prevKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, n.animationCache.nextKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, n.animationCache.originalMatrix = n instanceof THREE.Bone ? n.skinMatrix : n.matrix);
            var o = n.animationCache.prevKey;
            n = n.animationCache.nextKey, o.pos = this.data.hierarchy[i].keys[0], o.rot = this.data.hierarchy[i].keys[0], o.scl = this.data.hierarchy[i].keys[0], n.pos = this.getNextKeyWith("pos", i, 1), n.rot = this.getNextKeyWith("rot", i, 1), n.scl = this.getNextKeyWith("scl", i, 1)
        }
        this.update(0)
    }
    this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
}, THREE.Animation.prototype.pause = function() {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
}, THREE.Animation.prototype.stop = function() {
    this.isPlaying = !1, this.isPaused = !1, THREE.AnimationHandler.removeFromUpdate(this);
    for (var e = 0; e < this.hierarchy.length; e++) void 0 !== this.hierarchy[e].animationCache && (this.hierarchy[e] instanceof THREE.Bone ? this.hierarchy[e].skinMatrix = this.hierarchy[e].animationCache.originalMatrix : this.hierarchy[e].matrix = this.hierarchy[e].animationCache.originalMatrix, delete this.hierarchy[e].animationCache)
}, THREE.Animation.prototype.update = function(e) {
    if (this.isPlaying) {
        var t, i, n, r, o, a, s, l, h, c, u = ["pos", "rot", "scl"],
            f = this.data.JIT.hierarchy;
        this.currentTime += e * this.timeScale, c = this.currentTime, h = this.currentTime %= this.data.length, l = parseInt(Math.min(h * this.data.fps, this.data.length * this.data.fps), 10);
        for (var d = 0, E = this.hierarchy.length; d < E; d++)
            if (e = this.hierarchy[d], s = e.animationCache, this.JITCompile && void 0 !== f[d][l]) e instanceof THREE.Bone ? (e.skinMatrix = f[d][l], e.matrixAutoUpdate = !1, e.matrixWorldNeedsUpdate = !1) : (e.matrix = f[d][l], e.matrixAutoUpdate = !1, e.matrixWorldNeedsUpdate = !0);
            else {
                this.JITCompile && (e instanceof THREE.Bone ? e.skinMatrix = e.animationCache.originalMatrix : e.matrix = e.animationCache.originalMatrix);
                for (var p = 0; p < 3; p++) {
                    if (t = u[p], o = s.prevKey[t], (a = s.nextKey[t]).time <= c) {
                        if (h < c) {
                            if (!this.loop) return void this.stop();
                            for (o = this.data.hierarchy[d].keys[0], a = this.getNextKeyWith(t, d, 1); a.time < h;) o = a, a = this.getNextKeyWith(t, d, a.index + 1)
                        } else
                            do {
                                o = a, a = this.getNextKeyWith(t, d, a.index + 1)
                            } while (a.time < h);
                        s.prevKey[t] = o, s.nextKey[t] = a
                    }
                    e.matrixAutoUpdate = !0, e.matrixWorldNeedsUpdate = !0, i = (h - o.time) / (a.time - o.time), n = o[t], r = a[t], (i < 0 || i > 1) && (console.log("THREE.Animation.update: Warning! Scale out of bounds:" + i + " on bone " + d), i = i < 0 ? 0 : 1), "pos" === t ? (t = e.position, this.interpolationType === THREE.AnimationHandler.LINEAR ? (t.x = n[0] + (r[0] - n[0]) * i, t.y = n[1] + (r[1] - n[1]) * i, t.z = n[2] + (r[2] - n[2]) * i) : this.interpolationType !== THREE.AnimationHandler.CATMULLROM && this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD || (this.points[0] = this.getPrevKeyWith("pos", d, o.index - 1).pos, this.points[1] = n, this.points[2] = r, this.points[3] = this.getNextKeyWith("pos", d, a.index + 1).pos, i = .33 * i + .33, n = this.interpolateCatmullRom(this.points, i), t.x = n[0], t.y = n[1], t.z = n[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (i = this.interpolateCatmullRom(this.points, 1.01 * i), this.target.set(i[0], i[1], i[2]), this.target.subSelf(t), this.target.y = 0, this.target.normalize(), i = Math.atan2(this.target.x, this.target.z), e.rotation.set(0, i, 0)))) : "rot" === t ? THREE.Quaternion.slerp(n, r, e.quaternion, i) : "scl" === t && ((t = e.scale).x = n[0] + (r[0] - n[0]) * i, t.y = n[1] + (r[1] - n[1]) * i, t.z = n[2] + (r[2] - n[2]) * i)
                }
            }
        if (this.JITCompile && void 0 === f[0][l])
            for (this.hierarchy[0].update(void 0, !0), d = 0; d < this.hierarchy.length; d++) f[d][l] = this.hierarchy[d] instanceof THREE.Bone ? this.hierarchy[d].skinMatrix.clone() : this.hierarchy[d].matrix.clone()
    }
}, THREE.Animation.prototype.interpolateCatmullRom = function(e, t) {
    var i, n, r, o, a, s, l = [],
        h = [];
    return i = (e.length - 1) * t, n = Math.floor(i), i -= n, l[0] = 0 == n ? n : n - 1, l[1] = n, l[2] = n > e.length - 2 ? n : n + 1, l[3] = n > e.length - 3 ? n : n + 2, n = e[l[0]], o = e[l[1]], a = e[l[2]], s = e[l[3]], l = i * i, r = i * l, h[0] = this.interpolate(n[0], o[0], a[0], s[0], i, l, r), h[1] = this.interpolate(n[1], o[1], a[1], s[1], i, l, r), h[2] = this.interpolate(n[2], o[2], a[2], s[2], i, l, r), h
}, THREE.Animation.prototype.interpolate = function(e, t, i, n, r, o, a) {
    return e = .5 * (i - e), n = .5 * (n - t), (2 * (t - i) + e + n) * a + (-3 * (t - i) - 2 * e - n) * o + e * r + t
}, THREE.Animation.prototype.getNextKeyWith = function(e, t, i) {
    var n = this.data.hierarchy[t].keys;
    for (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? i = i < n.length - 1 ? i : n.length - 1 : i %= n.length; i < n.length; i++)
        if (void 0 !== n[i][e]) return n[i];
    return this.data.hierarchy[t].keys[0]
}, THREE.Animation.prototype.getPrevKeyWith = function(e, t, i) {
    var n = this.data.hierarchy[t].keys;
    for (i = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? i > 0 ? i : 0 : i >= 0 ? i : i + n.length; i >= 0; i--)
        if (void 0 !== n[i][e]) return n[i];
    return this.data.hierarchy[t].keys[n.length - 1]
}, THREE.ColorUtils = {
    adjustHSV: function(e, t, i, n) {
        var r = THREE.ColorUtils.__hsv;
        THREE.ColorUtils.rgbToHsv(e, r), r.h = THREE.ColorUtils.clamp(r.h + t, 0, 1), r.s = THREE.ColorUtils.clamp(r.s + i, 0, 1), r.v = THREE.ColorUtils.clamp(r.v + n, 0, 1), e.setHSV(r.h, r.s, r.v)
    },
    rgbToHsv: function(e, t) {
        var i = e.r,
            n = e.g,
            r = e.b,
            o = Math.max(Math.max(i, n), r),
            a = Math.min(Math.min(i, n), r);
        if (a == o) a = i = 0;
        else {
            var s = o - a;
            a = s / o, i = i == o ? (n - r) / s : n == o ? 2 + (r - i) / s : 4 + (i - n) / s, (i /= 6) < 0 && (i += 1), i > 1 && (i -= 1)
        }
        return void 0 === t && (t = {
            h: 0,
            s: 0,
            v: 0
        }), t.h = i, t.s = a, t.v = o, t
    },
    clamp: function(e, t, i) {
        return e < t ? t : e > i ? i : e
    }
}, THREE.ColorUtils.__hsv = {
    h: 0,
    s: 0,
    v: 0
};
var GeometryUtils = {
    merge: function(e, t) {
        var i = t instanceof THREE.Mesh,
            n = e.vertices.length,
            r = i ? t.geometry : t,
            o = e.vertices,
            a = r.vertices,
            s = e.faces,
            l = r.faces,
            h = e.faceVertexUvs[0];
        r = r.faceVertexUvs[0], i && t.matrixAutoUpdate && t.updateMatrix();
        for (var c = 0, u = a.length; c < u; c++) {
            var f = new THREE.Vertex(a[c].position.clone());
            i && t.matrix.multiplyVector3(f.position), o.push(f)
        }
        for (c = 0, u = l.length; c < u; c++) {
            var d, E, p = (a = l[c]).vertexNormals;
            for (f = a.vertexColors, a instanceof THREE.Face3 ? d = new THREE.Face3(a.a + n, a.b + n, a.c + n) : a instanceof THREE.Face4 && (d = new THREE.Face4(a.a + n, a.b + n, a.c + n, a.d + n)), d.normal.copy(a.normal), i = 0, o = p.length; i < o; i++) E = p[i], d.vertexNormals.push(E.clone());
            for (d.color.copy(a.color), i = 0, o = f.length; i < o; i++) E = f[i], d.vertexColors.push(E.clone());
            d.materials = a.materials.slice(), d.centroid.copy(a.centroid), s.push(d)
        }
        for (c = 0, u = r.length; c < u; c++) {
            for (s = [], i = 0, o = (n = r[c]).length; i < o; i++) s.push(new THREE.UV(n[i].u, n[i].v));
            h.push(s)
        }
    }
};
THREE.ImageUtils = {
    loadTexture: function(e, t, i) {
        var n = new Image,
            r = new THREE.Texture(n, t);
        return n.onload = function() {
            r.needsUpdate = !0, i && i(this)
        }, n.src = e, r
    },
    loadTextureCube: function(e, t, i) {
        var n, r = [],
            o = new THREE.Texture(r, t);
        for (t = r.loadCount = 0, n = e.length; t < n; ++t) r[t] = new Image, r[t].onload = function() {
            r.loadCount += 1, 6 == r.loadCount && (o.needsUpdate = !0), i && i(this)
        }, r[t].src = e[t];
        return o
    }
}, THREE.SceneUtils = {
    addMesh: function(e, t, i, n, r, o, a, s, l, h) {
        return t = new THREE.Mesh(t, h), t.scale.x = t.scale.y = t.scale.z = i, t.position.x = n, t.position.y = r, t.position.z = o, t.rotation.x = a, t.rotation.y = s, t.rotation.z = l, e.addObject(t), t
    },
    addPanoramaCubeWebGL: function(e, t, i) {
        var n = THREE.ShaderUtils.lib.cube;
        return n.uniforms.tCube.texture = i, i = new THREE.MeshShaderMaterial({
            fragmentShader: n.fragmentShader,
            vertexShader: n.vertexShader,
            uniforms: n.uniforms
        }), t = new THREE.Mesh(new THREE.Cube(t, t, t, 1, 1, 1, null, !0), i), e.addObject(t), t
    },
    addPanoramaCube: function(e, t, i) {
        var n = [];
        return n.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[0])
        })), n.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[1])
        })), n.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[2])
        })), n.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[3])
        })), n.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[4])
        })), n.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[5])
        })), t = new THREE.Mesh(new THREE.Cube(t, t, t, 1, 1, n, !0), new THREE.MeshFaceMaterial), e.addObject(t), t
    },
    addPanoramaCubePlanes: function(e, t, i) {
        var n = t / 2;
        t = new THREE.Plane(t, t);
        var r = Math.PI,
            o = Math.PI / 2;
        THREE.SceneUtils.addMesh(e, t, 1, 0, 0, -n, 0, 0, 0, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[5])
        })), THREE.SceneUtils.addMesh(e, t, 1, -n, 0, 0, 0, o, 0, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[0])
        })), THREE.SceneUtils.addMesh(e, t, 1, n, 0, 0, 0, -o, 0, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[1])
        })), THREE.SceneUtils.addMesh(e, t, 1, 0, n, 0, o, 0, r, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[2])
        })), THREE.SceneUtils.addMesh(e, t, 1, 0, -n, 0, -o, 0, r, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(i[3])
        }))
    },
    showHierarchy: function(e, t) {
        THREE.SceneUtils.traverseHierarchy(e, function(e) {
            e.visible = t
        })
    },
    traverseHierarchy: function(e, t) {
        var i, n, r = e.children.length;
        for (n = 0; n < r; n++) t(i = e.children[n]), THREE.SceneUtils.traverseHierarchy(i, t)
    }
}, THREE.ShaderUtils = {
    lib: {
        fresnel: {
            uniforms: {
                mRefractionRatio: {
                    type: "f",
                    value: 1.02
                },
                mFresnelBias: {
                    type: "f",
                    value: .1
                },
                mFresnelPower: {
                    type: "f",
                    value: 2
                },
                mFresnelScale: {
                    type: "f",
                    value: 1
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
            vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
        },
        normal: {
            uniforms: {
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
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                tNormal: {
                    type: "t",
                    value: 2,
                    texture: null
                },
                tSpecular: {
                    type: "t",
                    value: 3,
                    texture: null
                },
                tAO: {
                    type: "t",
                    value: 4,
                    texture: null
                },
                uNormalScale: {
                    type: "f",
                    value: 1
                },
                tDisplacement: {
                    type: "t",
                    value: 5,
                    texture: null
                },
                uDisplacementBias: {
                    type: "f",
                    value: -.5
                },
                uDisplacementScale: {
                    type: "f",
                    value: 2.5
                },
                uPointLightPos: {
                    type: "v3",
                    value: new THREE.Vector3
                },
                uPointLightColor: {
                    type: "c",
                    value: new THREE.Color(15658734)
                },
                uDirLightPos: {
                    type: "v3",
                    value: new THREE.Vector3
                },
                uDirLightColor: {
                    type: "c",
                    value: new THREE.Color(15658734)
                },
                uAmbientLightColor: {
                    type: "c",
                    value: new THREE.Color(328965)
                },
                uDiffuseColor: {
                    type: "c",
                    value: new THREE.Color(15658734)
                },
                uSpecularColor: {
                    type: "c",
                    value: new THREE.Color(1118481)
                },
                uAmbientColor: {
                    type: "c",
                    value: new THREE.Color(328965)
                },
                uShininess: {
                    type: "f",
                    value: 30
                }
            },
            fragmentShader: "uniform vec3 uDirLightPos;\nuniform vec3 uAmbientLightColor;\nuniform vec3 uDirLightColor;\nuniform vec3 uPointLightColor;\nuniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform float uNormalScale;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 diffuseTex = vec3( 1.0, 1.0, 1.0 );\nvec3 aoTex = vec3( 1.0, 1.0, 1.0 );\nvec3 specularTex = vec3( 1.0, 1.0, 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ndiffuseTex = texture2D( tDiffuse, vUv ).xyz;\nif( enableAO )\naoTex = texture2D( tAO, vUv ).xyz;\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 pointDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 pointSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec3 pointVector = normalize( vPointLightVector );\nvec3 pointHalfVector = normalize( vPointLightVector + vViewPosition );\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = specularTex.r * pow( pointDotNormalHalf, uShininess );\npointDiffuse  += vec4( uDiffuseColor, 1.0 ) * pointDiffuseWeight;\npointSpecular += vec4( uSpecularColor, 1.0 ) * pointSpecularWeight * pointDiffuseWeight;\nvec4 dirDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 dirSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = specularTex.r * pow( dirDotNormalHalf, uShininess );\ndirDiffuse  += vec4( uDiffuseColor, 1.0 ) * dirDiffuseWeight;\ndirSpecular += vec4( uSpecularColor, 1.0 ) * dirSpecularWeight * dirDiffuseWeight;\nvec4 totalLight = vec4( uAmbientLightColor * uAmbientColor, 1.0 );\ntotalLight += vec4( uDirLightColor, 1.0 ) * ( dirDiffuse + dirSpecular );\ntotalLight += vec4( uPointLightColor, 1.0 ) * ( pointDiffuse + pointSpecular );\ngl_FragColor = vec4( totalLight.xyz * aoTex * diffuseTex, 1.0 );\n}",
            vertexShader: "attribute vec4 tangent;\nuniform vec3 uPointLightPos;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv;\nvec4 lPosition = viewMatrix * vec4( uPointLightPos, 1.0 );\nvPointLightVector = normalize( lPosition.xyz - mvPosition.xyz );\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif\n}"
        },
        cube: {
            uniforms: {
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( - wPos.x, wPos.yz ) );\n}"
        },
        convolution: {
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                uImageIncrement: {
                    type: "v2",
                    value: new THREE.Vector2(.001953125, 0)
                },
                cKernel: {
                    type: "fv1",
                    value: []
                }
            },
            vertexShader: "varying vec2 vUv;\nuniform vec2 uImageIncrement;\nvoid main(void) {\nvUv = uv - ((KERNEL_SIZE - 1.0) / 2.0) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nuniform float cKernel[KERNEL_SIZE];\nvoid main(void) {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i=0; i<KERNEL_SIZE; ++i ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[i];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}"
        },
        film: {
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                time: {
                    type: "f",
                    value: 0
                },
                nIntensity: {
                    type: "f",
                    value: .5
                },
                sIntensity: {
                    type: "f",
                    value: .05
                },
                sCount: {
                    type: "f",
                    value: 4096
                },
                grayscale: {
                    type: "i",
                    value: 1
                }
            },
            vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nvoid main() {\nvec4 cTextureScreen = texture2D( tDiffuse, vUv );\nfloat x = vUv.x * vUv.y * time *  1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\nvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\nvec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );\ncResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\ncResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\nif( grayscale ) {\ncResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n}\ngl_FragColor =  vec4( cResult, cTextureScreen.a );\n}"
        },
        screen: {
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                opacity: {
                    type: "f",
                    value: 1
                }
            },
            vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float opacity;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\ngl_FragColor = opacity * texel;\n}"
        },
        basic: {
            uniforms: {},
            vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "void main() {\ngl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n}"
        }
    },
    buildKernel: function(e) {
        var t, i, n, r, o = 2 * Math.ceil(3 * e) + 1;
        for (o > 25 && (o = 25), r = .5 * (o - 1), i = Array(o), t = n = 0; t < o; ++t) i[t] = Math.exp(-(t - r) * (t - r) / (2 * e * e)), n += i[t];
        for (t = 0; t < o; ++t) i[t] /= n;
        return i
    }
}, THREE.QuakeCamera = function(e) {
    function t(e, t) {
        return function() {
            t.apply(e, arguments)
        }
    }
    THREE.Camera.call(this, e.fov, e.aspect, e.near, e.far, e.target), this.movementSpeed = 1, this.lookSpeed = .005, this.noFly = !1, this.lookVertical = !0, this.autoForward = !1, this.activeLook = !0, this.heightSpeed = !1, this.heightCoef = 1, this.heightMin = 0, this.constrainVertical = !1, this.verticalMin = 0, this.verticalMax = 3.14, this.domElement = document, this.lastUpdate = (new Date).getTime(), this.tdiff = 0, e && (void 0 !== e.movementSpeed && (this.movementSpeed = e.movementSpeed), void 0 !== e.lookSpeed && (this.lookSpeed = e.lookSpeed), void 0 !== e.noFly && (this.noFly = e.noFly), void 0 !== e.lookVertical && (this.lookVertical = e.lookVertical), void 0 !== e.autoForward && (this.autoForward = e.autoForward), void 0 !== e.activeLook && (this.activeLook = e.activeLook), void 0 !== e.heightSpeed && (this.heightSpeed = e.heightSpeed), void 0 !== e.heightCoef && (this.heightCoef = e.heightCoef), void 0 !== e.heightMin && (this.heightMin = e.heightMin), void 0 !== e.heightMax && (this.heightMax = e.heightMax), void 0 !== e.constrainVertical && (this.constrainVertical = e.constrainVertical), void 0 !== e.verticalMin && (this.verticalMin = e.verticalMin), void 0 !== e.verticalMax && (this.verticalMax = e.verticalMax), void 0 !== e.domElement && (this.domElement = e.domElement)), this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = this.autoSpeedFactor = 0, this.moveForward = !1, this.moveBackward = !1, this.moveLeft = !1, this.moveRight = !1, this.freeze = !1, this.mouseDragOn = !1, this.windowHalfX = window.innerWidth / 2, this.windowHalfY = window.innerHeight / 2, this.onMouseDown = function(e) {
        if (e.preventDefault(), e.stopPropagation(), this.activeLook) switch (e.button) {
            case 0:
                this.moveForward = !0;
                break;
            case 2:
                this.moveBackward = !0
        }
        this.mouseDragOn = !0
    }, this.onMouseUp = function(e) {
        if (e.preventDefault(), e.stopPropagation(), this.activeLook) switch (e.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
        }
        this.mouseDragOn = !1
    }, this.onMouseMove = function(e) {
        this.mouseX = e.clientX - this.windowHalfX, this.mouseY = e.clientY - this.windowHalfY
    }, this.onKeyDown = function(e) {
        switch (e.keyCode) {
            case 38:
            case 87:
                this.moveForward = !0;
                break;
            case 37:
            case 65:
                this.moveLeft = !0;
                break;
            case 40:
            case 83:
                this.moveBackward = !0;
                break;
            case 39:
            case 68:
                this.moveRight = !0;
                break;
            case 81:
                this.freeze = !this.freeze
        }
    }, this.onKeyUp = function(e) {
        switch (e.keyCode) {
            case 38:
            case 87:
                this.moveForward = !1;
                break;
            case 37:
            case 65:
                this.moveLeft = !1;
                break;
            case 40:
            case 83:
                this.moveBackward = !1;
                break;
            case 39:
            case 68:
                this.moveRight = !1
        }
    }, this.update = function() {
        var e = (new Date).getTime();
        if (this.tdiff = (e - this.lastUpdate) / 1e3, this.lastUpdate = e, !this.freeze) {
            this.autoSpeedFactor = this.heightSpeed ? this.tdiff * ((this.position.y < this.heightMin ? this.heightMin : this.position.y > this.heightMax ? this.heightMax : this.position.y) - this.heightMin) * this.heightCoef : 0;
            var t = this.tdiff * this.movementSpeed;
            (this.moveForward || this.autoForward && !this.moveBackward) && this.translateZ(-(t + this.autoSpeedFactor)), this.moveBackward && this.translateZ(t), this.moveLeft && this.translateX(-t), this.moveRight && this.translateX(t), t = this.tdiff * this.lookSpeed, this.activeLook || (t = 0), this.lon += this.mouseX * t, this.lookVertical && (this.lat -= this.mouseY * t), this.lat = Math.max(-85, Math.min(85, this.lat)), this.phi = (90 - this.lat) * Math.PI / 180, this.theta = this.lon * Math.PI / 180, e = this.target.position;
            var i = this.position;
            e.x = i.x + 100 * Math.sin(this.phi) * Math.cos(this.theta), e.y = i.y + 100 * Math.cos(this.phi), e.z = i.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)
        }
        this.lon += this.mouseX * t, this.lookVertical && (this.lat -= this.mouseY * t), this.lat = Math.max(-85, Math.min(85, this.lat)), this.phi = (90 - this.lat) * Math.PI / 180, this.theta = this.lon * Math.PI / 180, this.constrainVertical && (this.phi = (this.phi - 0) * (this.verticalMax - this.verticalMin) / 3.14 + this.verticalMin), e = this.target.position, i = this.position, e.x = i.x + 100 * Math.sin(this.phi) * Math.cos(this.theta), e.y = i.y + 100 * Math.cos(this.phi), e.z = i.z + 100 * Math.sin(this.phi) * Math.sin(this.theta), this.supr.update.call(this)
    }, this.domElement.addEventListener("contextmenu", function(e) {
        e.preventDefault()
    }, !1), this.domElement.addEventListener("mousemove", t(this, this.onMouseMove), !1), this.domElement.addEventListener("mousedown", t(this, this.onMouseDown), !1), this.domElement.addEventListener("mouseup", t(this, this.onMouseUp), !1), this.domElement.addEventListener("keydown", t(this, this.onKeyDown), !1), this.domElement.addEventListener("keyup", t(this, this.onKeyUp), !1)
}, THREE.QuakeCamera.prototype = new THREE.Camera, THREE.QuakeCamera.prototype.constructor = THREE.QuakeCamera, THREE.QuakeCamera.prototype.supr = THREE.Camera.prototype, THREE.QuakeCamera.prototype.translate = function(e, t) {
    this.matrix.rotateAxis(t), this.noFly && (t.y = 0), this.position.addSelf(t.multiplyScalar(e)), this.target.position.addSelf(t.multiplyScalar(e))
}, THREE.PathCamera = function(e) {
    function t(e, t, i, n) {
        var r, o = {
                name: i,
                fps: .6,
                length: n,
                hierarchy: []
            },
            a = t.getControlPointsArray(),
            s = t.getLength(),
            l = a.length,
            h = 0;
        for (r = l - 1, (t = {
            parent: -1,
            keys: []
        }).keys[0] = {
            time: 0,
            pos: a[0],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        }, t.keys[r] = {
            time: n,
            pos: a[r],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        }, r = 1; r < l - 1; r++) h = n * s.chunks[r] / s.total, t.keys[r] = {
            time: h,
            pos: a[r]
        };
        return o.hierarchy[0] = t, THREE.AnimationHandler.add(o), new THREE.Animation(e, i, THREE.AnimationHandler.CATMULLROM_FORWARD, !1)
    }

    function n(e, t) {
        var i, n, r = new THREE.Geometry;
        for (i = 0; i < e.points.length * t; i++) n = i / (e.points.length * t), n = e.getPoint(n), r.vertices[i] = new THREE.Vertex(new THREE.Vector3(n.x, n.y, n.z));
        return r
    }
    THREE.Camera.call(this, e.fov, e.aspect, e.near, e.far, e.target), this.id = "PathCamera" + THREE.PathCameraIdCounter++, this.duration = 1e4, this.waypoints = [], this.useConstantSpeed = !0, this.resamplingCoef = 50, this.debugPath = new THREE.Object3D, this.debugDummy = new THREE.Object3D, this.animationParent = new THREE.Object3D, this.lookSpeed = .005, this.lookVertical = !0, this.lookHorizontal = !0, this.verticalAngleMap = {
        srcRange: [0, 6.28],
        dstRange: [0, 6.28]
    }, this.horizontalAngleMap = {
        srcRange: [0, 6.28],
        dstRange: [0, 6.28]
    }, this.domElement = document, e && (void 0 !== e.duration && (this.duration = 1e3 * e.duration), void 0 !== e.waypoints && (this.waypoints = e.waypoints), void 0 !== e.useConstantSpeed && (this.useConstantSpeed = e.useConstantSpeed), void 0 !== e.resamplingCoef && (this.resamplingCoef = e.resamplingCoef), void 0 !== e.createDebugPath && (this.createDebugPath = e.createDebugPath), void 0 !== e.createDebugDummy && (this.createDebugDummy = e.createDebugDummy), void 0 !== e.lookSpeed && (this.lookSpeed = e.lookSpeed), void 0 !== e.lookVertical && (this.lookVertical = e.lookVertical), void 0 !== e.lookHorizontal && (this.lookHorizontal = e.lookHorizontal), void 0 !== e.verticalAngleMap && (this.verticalAngleMap = e.verticalAngleMap), void 0 !== e.horizontalAngleMap && (this.horizontalAngleMap = e.horizontalAngleMap), void 0 !== e.domElement && (this.domElement = e.domElement)), this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = 0, this.windowHalfX = window.innerWidth / 2, this.windowHalfY = window.innerHeight / 2;
    var r = 2 * Math.PI,
        o = Math.PI / 180;
    if (this.update = function(e, t, i) {
        var n, a;
        this.lookHorizontal && (this.lon += this.mouseX * this.lookSpeed), this.lookVertical && (this.lat -= this.mouseY * this.lookSpeed), this.lon = Math.max(0, Math.min(360, this.lon)), this.lat = Math.max(-85, Math.min(85, this.lat)), this.phi = (90 - this.lat) * o, this.theta = this.lon * o, n = this.phi % r, this.phi = n >= 0 ? n : n + r, n = this.verticalAngleMap.srcRange, a = this.verticalAngleMap.dstRange, this.phi = (this.phi - n[0]) * (a[1] - a[0]) / (n[1] - n[0]) + a[0], n = this.horizontalAngleMap.srcRange, a = this.horizontalAngleMap.dstRange, this.theta = (this.theta - n[0]) * (a[1] - a[0]) / (n[1] - n[0]) + a[0], (n = this.target.position).x = 100 * Math.sin(this.phi) * Math.cos(this.theta), n.y = 100 * Math.cos(this.phi), n.z = 100 * Math.sin(this.phi) * Math.sin(this.theta), this.supr.update.call(this, e, t, i)
    }, this.onMouseMove = function(e) {
        this.mouseX = e.clientX - this.windowHalfX, this.mouseY = e.clientY - this.windowHalfY
    }, this.spline = new THREE.Spline, this.spline.initFromArray(this.waypoints), this.useConstantSpeed && this.spline.reparametrizeByArcLength(this.resamplingCoef), this.createDebugDummy) {
        e = new THREE.MeshLambertMaterial({
            color: 30719
        });
        var a = new THREE.MeshLambertMaterial({
                color: 65280
            }),
            s = new THREE.Cube(10, 10, 20),
            l = new THREE.Cube(2, 2, 10);
        this.animationParent = new THREE.Mesh(s, e), (e = new THREE.Mesh(l, a)).position.set(0, 10, 0), this.animation = t(this.animationParent, this.spline, this.id, this.duration), this.animationParent.addChild(this), this.animationParent.addChild(this.target), this.animationParent.addChild(e)
    } else this.animation = t(this.animationParent, this.spline, this.id, this.duration), this.animationParent.addChild(this.target), this.animationParent.addChild(this);
    this.createDebugPath && function(e, t) {
        var r = n(t, 10),
            o = n(t, 10),
            a = new THREE.LineBasicMaterial({
                color: 16711680,
                linewidth: 3
            });
        for (lineObj = new THREE.Line(r, a), particleObj = new THREE.ParticleSystem(o, new THREE.ParticleBasicMaterial({
            color: 16755200,
            size: 3
        })), lineObj.scale.set(1, 1, 1), e.addChild(lineObj), particleObj.scale.set(1, 1, 1), e.addChild(particleObj), o = new THREE.Sphere(1, 16, 8), a = new THREE.MeshBasicMaterial({
            color: 65280
        }), i = 0; i < t.points.length; i++)(r = new THREE.Mesh(o, a)).position.copy(t.points[i]), r.updateMatrix(), e.addChild(r)
    }(this.debugPath, this.spline), this.domElement.addEventListener("mousemove", function(e, t) {
        return function() {
            t.apply(e, arguments)
        }
    }(this, this.onMouseMove), !1)
}, THREE.PathCamera.prototype = new THREE.Camera, THREE.PathCamera.prototype.constructor = THREE.PathCamera, THREE.PathCamera.prototype.supr = THREE.Camera.prototype, THREE.PathCameraIdCounter = 0, THREE.FlyCamera = function(e) {
    function t(e, t) {
        return function() {
            t.apply(e, arguments)
        }
    }
    THREE.Camera.call(this, e.fov, e.aspect, e.near, e.far, e.target), this.tmpQuaternion = new THREE.Quaternion, this.movementSpeed = 1, this.rollSpeed = .005, this.dragToLook = !1, this.autoForward = !1, this.domElement = document, e && (void 0 !== e.movementSpeed && (this.movementSpeed = e.movementSpeed), void 0 !== e.rollSpeed && (this.rollSpeed = e.rollSpeed), void 0 !== e.dragToLook && (this.dragToLook = e.dragToLook), void 0 !== e.autoForward && (this.autoForward = e.autoForward), void 0 !== e.domElement && (this.domElement = e.domElement)), this.useTarget = !1, this.useQuaternion = !0, this.mouseStatus = 0, this.moveState = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        forward: 0,
        back: 0,
        pitchUp: 0,
        pitchDown: 0,
        yawLeft: 0,
        yawRight: 0,
        rollLeft: 0,
        rollRight: 0
    }, this.moveVector = new THREE.Vector3(0, 0, 0), this.rotationVector = new THREE.Vector3(0, 0, 0), this.lastUpdate = -1, this.tdiff = 0, this.handleEvent = function(e) {
        "function" == typeof this[e.type] && this[e.type](e)
    }, this.keydown = function(e) {
        if (!e.altKey) {
            switch (e.keyCode) {
                case 16:
                    this.movementSpeedMultiplier = .1;
                    break;
                case 87:
                    this.moveState.forward = 1;
                    break;
                case 83:
                    this.moveState.back = 1;
                    break;
                case 65:
                    this.moveState.left = 1;
                    break;
                case 68:
                    this.moveState.right = 1;
                    break;
                case 82:
                    this.moveState.up = 1;
                    break;
                case 70:
                    this.moveState.down = 1;
                    break;
                case 38:
                    this.moveState.pitchUp = 1;
                    break;
                case 40:
                    this.moveState.pitchDown = 1;
                    break;
                case 37:
                    this.moveState.yawLeft = 1;
                    break;
                case 39:
                    this.moveState.yawRight = 1;
                    break;
                case 81:
                    this.moveState.rollLeft = 1;
                    break;
                case 69:
                    this.moveState.rollRight = 1
            }
            this.updateMovementVector(), this.updateRotationVector()
        }
    }, this.keyup = function(e) {
        switch (e.keyCode) {
            case 16:
                this.movementSpeedMultiplier = 1;
                break;
            case 87:
                this.moveState.forward = 0;
                break;
            case 83:
                this.moveState.back = 0;
                break;
            case 65:
                this.moveState.left = 0;
                break;
            case 68:
                this.moveState.right = 0;
                break;
            case 82:
                this.moveState.up = 0;
                break;
            case 70:
                this.moveState.down = 0;
                break;
            case 38:
                this.moveState.pitchUp = 0;
                break;
            case 40:
                this.moveState.pitchDown = 0;
                break;
            case 37:
                this.moveState.yawLeft = 0;
                break;
            case 39:
                this.moveState.yawRight = 0;
                break;
            case 81:
                this.moveState.rollLeft = 0;
                break;
            case 69:
                this.moveState.rollRight = 0
        }
        this.updateMovementVector(), this.updateRotationVector()
    }, this.mousedown = function(e) {
        if (e.preventDefault(), e.stopPropagation(), this.dragToLook) this.mouseStatus++;
        else switch (e.button) {
            case 0:
                this.moveForward = !0;
                break;
            case 2:
                this.moveBackward = !0
        }
    }, this.mousemove = function(e) {
        if (!this.dragToLook || this.mouseStatus > 0) {
            var t = this.getContainerDimensions(),
                i = t.size[0] / 2,
                n = t.size[1] / 2;
            this.moveState.yawLeft = -(e.clientX - t.offset[0] - i) / i, this.moveState.pitchDown = (e.clientY - t.offset[1] - n) / n, this.updateRotationVector()
        }
    }, this.mouseup = function(e) {
        if (e.preventDefault(), e.stopPropagation(), this.dragToLook) this.mouseStatus--, this.moveState.yawLeft = this.moveState.pitchDown = 0;
        else switch (e.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
        }
        this.updateRotationVector()
    }, this.update = function() {
        var e = (new Date).getTime(); - 1 == this.lastUpdate && (this.lastUpdate = e), this.tdiff = (e - this.lastUpdate) / 1e3, this.lastUpdate = e, e = this.tdiff * this.movementSpeed;
        var t = this.tdiff * this.rollSpeed;
        this.translateX(this.moveVector.x * e), this.translateY(this.moveVector.y * e), this.translateZ(this.moveVector.z * e), this.tmpQuaternion.set(this.rotationVector.x * t, this.rotationVector.y * t, this.rotationVector.z * t, 1).normalize(), this.quaternion.multiplySelf(this.tmpQuaternion), this.matrix.setPosition(this.position), this.matrix.setRotationFromQuaternion(this.quaternion), this.matrixWorldNeedsUpdate = !0, this.supr.update.call(this)
    }, this.updateMovementVector = function() {
        var e = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
        this.moveVector.x = -this.moveState.left + this.moveState.right, this.moveVector.y = -this.moveState.down + this.moveState.up, this.moveVector.z = -e + this.moveState.back
    }, this.updateRotationVector = function() {
        this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp, this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft, this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft
    }, this.getContainerDimensions = function() {
        return this.domElement != document ? {
            size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
            offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
        } : {
            size: [window.innerWidth, window.innerHeight],
            offset: [0, 0]
        }
    }, this.domElement.addEventListener("mousemove", t(this, this.mousemove), !1), this.domElement.addEventListener("mousedown", t(this, this.mousedown), !1), this.domElement.addEventListener("mouseup", t(this, this.mouseup), !1), window.addEventListener("keydown", t(this, this.keydown), !1), window.addEventListener("keyup", t(this, this.keyup), !1), this.updateMovementVector(), this.updateRotationVector()
}, THREE.FlyCamera.prototype = new THREE.Camera, THREE.FlyCamera.prototype.constructor = THREE.FlyCamera, THREE.FlyCamera.prototype.supr = THREE.Camera.prototype, THREE.RollCamera = function(e, t, i, n) {
    THREE.Camera.call(this, e, t, i, n), this.mouseLook = !0, this.autoForward = !1, this.rollSpeed = this.movementSpeed = this.lookSpeed = 1, this.constrainVertical = [-.9, .9], this.domElement = document, this.useTarget = !1, this.matrixAutoUpdate = !1, this.forward = new THREE.Vector3(0, 0, 1), this.roll = 0, this.lastUpdate = -1, this.delta = 0;
    var r = new THREE.Vector3,
        o = new THREE.Vector3,
        a = new THREE.Vector3,
        s = new THREE.Matrix4,
        l = !1,
        h = 1,
        c = 0,
        u = 0,
        f = 0,
        d = 0,
        E = 0,
        p = window.innerWidth / 2,
        m = window.innerHeight / 2;
    this.update = function() {
        var e = (new Date).getTime(); - 1 == this.lastUpdate && (this.lastUpdate = e), this.delta = (e - this.lastUpdate) / 1e3, this.lastUpdate = e, this.mouseLook && (e = this.delta * this.lookSpeed, this.rotateHorizontally(e * d), this.rotateVertically(e * E)), e = this.delta * this.movementSpeed, this.translateZ(e * (c > 0 || this.autoForward && !(c < 0) ? 1 : c)), this.translateX(e * u), this.translateY(e * f), l && (this.roll += this.rollSpeed * this.delta * h), this.forward.y > this.constrainVertical[1] ? (this.forward.y = this.constrainVertical[1], this.forward.normalize()) : this.forward.y < this.constrainVertical[0] && (this.forward.y = this.constrainVertical[0], this.forward.normalize()), a.copy(this.forward), o.set(0, 1, 0), r.cross(o, a).normalize(), o.cross(a, r).normalize(), this.matrix.n11 = r.x, this.matrix.n12 = o.x, this.matrix.n13 = a.x, this.matrix.n21 = r.y, this.matrix.n22 = o.y, this.matrix.n23 = a.y, this.matrix.n31 = r.z, this.matrix.n32 = o.z, this.matrix.n33 = a.z, s.identity(), s.n11 = Math.cos(this.roll), s.n12 = -Math.sin(this.roll), s.n21 = Math.sin(this.roll), s.n22 = Math.cos(this.roll), this.matrix.multiplySelf(s), this.matrixWorldNeedsUpdate = !0, this.matrix.n14 = this.position.x, this.matrix.n24 = this.position.y, this.matrix.n34 = this.position.z, this.supr.update.call(this)
    }, this.translateX = function(e) {
        this.position.x += this.matrix.n11 * e, this.position.y += this.matrix.n21 * e, this.position.z += this.matrix.n31 * e
    }, this.translateY = function(e) {
        this.position.x += this.matrix.n12 * e, this.position.y += this.matrix.n22 * e, this.position.z += this.matrix.n32 * e
    }, this.translateZ = function(e) {
        this.position.x -= this.matrix.n13 * e, this.position.y -= this.matrix.n23 * e, this.position.z -= this.matrix.n33 * e
    }, this.rotateHorizontally = function(e) {
        r.set(this.matrix.n11, this.matrix.n21, this.matrix.n31), r.multiplyScalar(e), this.forward.subSelf(r), this.forward.normalize()
    }, this.rotateVertically = function(e) {
        o.set(this.matrix.n12, this.matrix.n22, this.matrix.n32), o.multiplyScalar(e), this.forward.addSelf(o), this.forward.normalize()
    }, this.domElement.addEventListener("contextmenu", function(e) {
        e.preventDefault()
    }, !1), this.domElement.addEventListener("mousemove", function(e) {
        d = (e.clientX - p) / window.innerWidth, E = (e.clientY - m) / window.innerHeight
    }, !1), this.domElement.addEventListener("mousedown", function(e) {
        switch (e.preventDefault(), e.stopPropagation(), e.button) {
            case 0:
                c = 1;
                break;
            case 2:
                c = -1
        }
    }, !1), this.domElement.addEventListener("mouseup", function(e) {
        switch (e.preventDefault(), e.stopPropagation(), e.button) {
            case 0:
                c = 0;
                break;
            case 2:
                c = 0
        }
    }, !1), this.domElement.addEventListener("keydown", function(e) {
        switch (e.keyCode) {
            case 38:
            case 87:
                c = 1;
                break;
            case 37:
            case 65:
                u = -1;
                break;
            case 40:
            case 83:
                c = -1;
                break;
            case 39:
            case 68:
                u = 1;
                break;
            case 81:
                l = !0, h = 1;
                break;
            case 69:
                l = !0, h = -1;
                break;
            case 82:
                f = 1;
                break;
            case 70:
                f = -1
        }
    }, !1), this.domElement.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 38:
            case 87:
                c = 0;
                break;
            case 37:
            case 65:
                u = 0;
                break;
            case 40:
            case 83:
                c = 0;
                break;
            case 39:
            case 68:
                u = 0;
                break;
            case 81:
            case 69:
                l = !1;
                break;
            case 82:
                f = 0;
                break;
            case 70:
                f = 0
        }
    }, !1)
}, THREE.RollCamera.prototype = new THREE.Camera, THREE.RollCamera.prototype.constructor = THREE.RollCamera, THREE.RollCamera.prototype.supr = THREE.Camera.prototype, THREE.Cube = function(e, t, i, n, r, o, a, s, l) {
    function h(e, t, i, a, s, l, h, u) {
        var f, d, E = n || 1,
            p = r || 1,
            m = s / 2,
            v = l / 2,
            g = c.vertices.length;
        "x" == e && "y" == t || "y" == e && "x" == t ? f = "z" : "x" == e && "z" == t || "z" == e && "x" == t ? (f = "y", p = o || 1) : ("z" == e && "y" == t || "y" == e && "z" == t) && (f = "x", E = o || 1);
        var T = E + 1,
            y = p + 1;
        s /= E;
        var R = l / p;
        for (d = 0; d < y; d++)
            for (l = 0; l < T; l++) {
                var x = new THREE.Vector3;
                x[e] = (l * s - m) * i, x[t] = (d * R - v) * a, x[f] = h, c.vertices.push(new THREE.Vertex(x))
            }
        for (d = 0; d < p; d++)
            for (l = 0; l < E; l++) c.faces.push(new THREE.Face4(l + T * d + g, l + T * (d + 1) + g, l + 1 + T * (d + 1) + g, l + 1 + T * d + g, null, null, u)), c.faceVertexUvs[0].push([new THREE.UV(l / E, d / p), new THREE.UV(l / E, (d + 1) / p), new THREE.UV((l + 1) / E, (d + 1) / p), new THREE.UV((l + 1) / E, d / p)])
    }
    THREE.Geometry.call(this);
    var c = this,
        u = e / 2,
        f = t / 2,
        d = i / 2;
    if (s = s ? -1 : 1, void 0 !== a)
        if (a instanceof Array) this.materials = a;
        else {
            this.materials = [];
            for (var E = 0; E < 6; E++) this.materials.push([a])
        } else this.materials = [];
    if (this.sides = {
        px: !0,
        nx: !0,
        py: !0,
        ny: !0,
        pz: !0,
        nz: !0
    }, void 0 != l)
        for (var p in l) void 0 != this.sides[p] && (this.sides[p] = l[p]);
    this.sides.px && h("z", "y", 1 * s, -1, i, t, -u, this.materials[0]), this.sides.nx && h("z", "y", -1 * s, -1, i, t, u, this.materials[1]), this.sides.py && h("x", "z", 1 * s, 1, e, i, f, this.materials[2]), this.sides.ny && h("x", "z", 1 * s, -1, e, i, -f, this.materials[3]), this.sides.pz && h("x", "y", 1 * s, -1, e, t, d, this.materials[4]), this.sides.nz && h("x", "y", -1 * s, -1, e, t, -d, this.materials[5]),
        function() {
            for (var e = [], t = [], i = 0, n = c.vertices.length; i < n; i++) {
                for (var r = c.vertices[i], o = !1, a = 0, s = e.length; a < s; a++) {
                    var l = e[a];
                    if (r.position.x == l.position.x && r.position.y == l.position.y && r.position.z == l.position.z) {
                        t[i] = a, o = !0;
                        break
                    }
                }
                o || (t[i] = e.length, e.push(new THREE.Vertex(r.position.clone())))
            }
            for (i = 0, n = c.faces.length; i < n; i++)(r = c.faces[i]).a = t[r.a], r.b = t[r.b], r.c = t[r.c], r.d = t[r.d];
            c.vertices = e
        }(), this.computeCentroids(), this.computeFaceNormals()
}, THREE.Cube.prototype = new THREE.Geometry, THREE.Cube.prototype.constructor = THREE.Cube, THREE.Cylinder = function(e, t, i, n, r, o) {
    function a(e, t, i) {
        l.vertices.push(new THREE.Vertex(new THREE.Vector3(e, t, i)))
    }
    THREE.Geometry.call(this);
    var s, l = this,
        h = 2 * Math.PI,
        c = n / 2;
    for (s = 0; s < e; s++) a(Math.sin(h * s / e) * t, Math.cos(h * s / e) * t, -c);
    for (s = 0; s < e; s++) a(Math.sin(h * s / e) * i, Math.cos(h * s / e) * i, c);
    for (s = 0; s < e; s++) l.faces.push(new THREE.Face4(s, s + e, e + (s + 1) % e, (s + 1) % e));
    if (i > 0)
        for (a(0, 0, -c - (o || 0)), s = e; s < e + e / 2; s++) l.faces.push(new THREE.Face4(2 * e, (2 * s - 2 * e) % e, (2 * s - 2 * e + 1) % e, (2 * s - 2 * e + 2) % e));
    if (t > 0)
        for (a(0, 0, c + (r || 0)), s = e + e / 2; s < 2 * e; s++) l.faces.push(new THREE.Face4(2 * e + 1, (2 * s - 2 * e + 2) % e + e, (2 * s - 2 * e + 1) % e + e, (2 * s - 2 * e) % e + e));
    for (s = 0, e = this.faces.length; s < e; s++) {
        t = [], i = this.faces[s], r = this.vertices[i.a], o = this.vertices[i.b], c = this.vertices[i.c];
        var u = this.vertices[i.d];
        t.push(new THREE.UV(.5 + Math.atan2(r.position.x, r.position.y) / h, .5 + r.position.z / n)), t.push(new THREE.UV(.5 + Math.atan2(o.position.x, o.position.y) / h, .5 + o.position.z / n)), t.push(new THREE.UV(.5 + Math.atan2(c.position.x, c.position.y) / h, .5 + c.position.z / n)), i instanceof THREE.Face4 && t.push(new THREE.UV(.5 + Math.atan2(u.position.x, u.position.y) / h, .5 + u.position.z / n)), this.faceVertexUvs[0].push(t)
    }
    this.computeCentroids(), this.computeFaceNormals()
}, THREE.Cylinder.prototype = new THREE.Geometry, THREE.Cylinder.prototype.constructor = THREE.Cylinder, THREE.Icosahedron = function(e) {
    function t(e, t, i) {
        var n = Math.sqrt(e * e + t * t + i * i);
        return o.vertices.push(new THREE.Vertex(new THREE.Vector3(e / n, t / n, i / n))) - 1
    }

    function i(e, t, i, n) {
        n.faces.push(new THREE.Face3(e, t, i))
    }

    function n(e, i) {
        var n = o.vertices[e].position,
            r = o.vertices[i].position;
        return t((n.x + r.x) / 2, (n.y + r.y) / 2, (n.z + r.z) / 2)
    }
    var r, o = this,
        a = new THREE.Geometry;
    for (this.subdivisions = e || 0, THREE.Geometry.call(this), t(-1, e = (1 + Math.sqrt(5)) / 2, 0), t(1, e, 0), t(-1, -e, 0), t(1, -e, 0), t(0, -1, e), t(0, 1, e), t(0, -1, -e), t(0, 1, -e), t(e, 0, -1), t(e, 0, 1), t(-e, 0, -1), t(-e, 0, 1), i(0, 11, 5, a), i(0, 5, 1, a), i(0, 1, 7, a), i(0, 7, 10, a), i(0, 10, 11, a), i(1, 5, 9, a), i(5, 11, 4, a), i(11, 10, 2, a), i(10, 7, 6, a), i(7, 1, 8, a), i(3, 9, 4, a), i(3, 4, 2, a), i(3, 2, 6, a), i(3, 6, 8, a), i(3, 8, 9, a), i(4, 9, 5, a), i(2, 4, 11, a), i(6, 2, 10, a), i(8, 6, 7, a), i(9, 8, 1, a), e = 0; e < this.subdivisions; e++) {
        r = new THREE.Geometry;
        for (var s in a.faces) {
            var l = n(a.faces[s].a, a.faces[s].b),
                h = n(a.faces[s].b, a.faces[s].c),
                c = n(a.faces[s].c, a.faces[s].a);
            i(a.faces[s].a, l, c, r), i(a.faces[s].b, h, l, r), i(a.faces[s].c, c, h, r), i(l, h, c, r)
        }
        a.faces = r.faces
    }
    o.faces = a.faces, delete a, delete r, this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.Icosahedron.prototype = new THREE.Geometry, THREE.Icosahedron.prototype.constructor = THREE.Icosahedron, THREE.Lathe = function(e, t, i) {
    THREE.Geometry.call(this), this.steps = t || 12, this.angle = i || 2 * Math.PI, t = this.angle / this.steps, i = [];
    for (var n = [], r = [], o = [], a = (new THREE.Matrix4).setRotationZ(t), s = 0; s < e.length; s++) this.vertices.push(new THREE.Vertex(e[s])), i[s] = e[s].clone(), n[s] = this.vertices.length - 1;
    for (var l = 0; l <= this.angle + .001; l += t) {
        for (s = 0; s < i.length; s++) l < this.angle ? (i[s] = a.multiplyVector3(i[s].clone()), this.vertices.push(new THREE.Vertex(i[s])), r[s] = this.vertices.length - 1) : r = o;
        for (0 == l && (o = n), s = 0; s < n.length - 1; s++) this.faces.push(new THREE.Face4(r[s], r[s + 1], n[s + 1], n[s])), this.faceVertexUvs[0].push([new THREE.UV(1 - l / this.angle, s / e.length), new THREE.UV(1 - l / this.angle, (s + 1) / e.length), new THREE.UV(1 - (l - t) / this.angle, (s + 1) / e.length), new THREE.UV(1 - (l - t) / this.angle, s / e.length)]);
        n = r, r = []
    }
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.Lathe.prototype = new THREE.Geometry, THREE.Lathe.prototype.constructor = THREE.Lathe, THREE.Plane = function(e, t, i, n) {
    THREE.Geometry.call(this);
    var r, o = e / 2,
        a = t / 2,
        s = (i = i || 1) + 1,
        l = (n = n || 1) + 1;
    e /= i;
    var h = t / n;
    for (r = 0; r < l; r++)
        for (t = 0; t < s; t++) this.vertices.push(new THREE.Vertex(new THREE.Vector3(t * e - o, -(r * h - a), 0)));
    for (r = 0; r < n; r++)
        for (t = 0; t < i; t++) this.faces.push(new THREE.Face4(t + s * r, t + s * (r + 1), t + 1 + s * (r + 1), t + 1 + s * r)), this.faceVertexUvs[0].push([new THREE.UV(t / i, r / n), new THREE.UV(t / i, (r + 1) / n), new THREE.UV((t + 1) / i, (r + 1) / n), new THREE.UV((t + 1) / i, r / n)]);
    this.computeCentroids(), this.computeFaceNormals()
}, THREE.Plane.prototype = new THREE.Geometry, THREE.Plane.prototype.constructor = THREE.Plane, THREE.Sphere = function(e, t, i) {
    THREE.Geometry.call(this);
    var n, r = Math.PI,
        o = Math.max(3, t || 8),
        a = Math.max(2, i || 6);
    for (t = [], i = 0; i < a + 1; i++) {
        n = i / a;
        var s = e * Math.cos(n * r),
            l = e * Math.sin(n * r),
            h = [],
            c = 0;
        for (n = 0; n < o; n++) {
            var u = 2 * n / o,
                f = l * Math.sin(u * r);
            u = l * Math.cos(u * r), (0 == i || i == a) && n > 0 || (c = this.vertices.push(new THREE.Vertex(new THREE.Vector3(u, s, f))) - 1), h.push(c)
        }
        t.push(h)
    }
    var d, E, p;
    for (r = t.length, i = 0; i < r; i++)
        if (o = t[i].length, i > 0)
            for (n = 0; n < o; n++) {
                h = n == o - 1, a = t[i][h ? 0 : n + 1], s = t[i][h ? o - 1 : n], l = t[i - 1][h ? o - 1 : n], h = t[i - 1][h ? 0 : n + 1], f = i / (r - 1), d = (i - 1) / (r - 1), E = (n + 1) / o, u = n / o, c = new THREE.UV(1 - E, f), f = new THREE.UV(1 - u, f), u = new THREE.UV(1 - u, d);
                var m = new THREE.UV(1 - E, d);
                i < t.length - 1 && (d = this.vertices[a].position.clone(), E = this.vertices[s].position.clone(), p = this.vertices[l].position.clone(), d.normalize(), E.normalize(), p.normalize(), this.faces.push(new THREE.Face3(a, s, l, [new THREE.Vector3(d.x, d.y, d.z), new THREE.Vector3(E.x, E.y, E.z), new THREE.Vector3(p.x, p.y, p.z)])), this.faceVertexUvs[0].push([c, f, u])), i > 1 && (d = this.vertices[a].position.clone(), E = this.vertices[l].position.clone(), p = this.vertices[h].position.clone(), d.normalize(), E.normalize(), p.normalize(), this.faces.push(new THREE.Face3(a, l, h, [new THREE.Vector3(d.x, d.y, d.z), new THREE.Vector3(E.x, E.y, E.z), new THREE.Vector3(p.x, p.y, p.z)])), this.faceVertexUvs[0].push([c, u, m]))
            }
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals(), this.boundingSphere = {
        radius: e
    }
}, THREE.Sphere.prototype = new THREE.Geometry, THREE.Sphere.prototype.constructor = THREE.Sphere, THREE.Torus = function(e, t, i, n) {
    for (THREE.Geometry.call(this), this.radius = e || 100, this.tube = t || 40, this.segmentsR = i || 8, this.segmentsT = n || 6, e = [], t = 0; t <= this.segmentsR; ++t)
        for (i = 0; i <= this.segmentsT; ++i) {
            n = i / this.segmentsT * 2 * Math.PI;
            var r = t / this.segmentsR * 2 * Math.PI;
            this.vertices.push(new THREE.Vertex(new THREE.Vector3((this.radius + this.tube * Math.cos(r)) * Math.cos(n), (this.radius + this.tube * Math.cos(r)) * Math.sin(n), this.tube * Math.sin(r)))), e.push([i / this.segmentsT, 1 - t / this.segmentsR])
        }
    for (t = 1; t <= this.segmentsR; ++t)
        for (i = 1; i <= this.segmentsT; ++i) {
            n = (this.segmentsT + 1) * t + i, r = (this.segmentsT + 1) * t + i - 1;
            var o = (this.segmentsT + 1) * (t - 1) + i - 1,
                a = (this.segmentsT + 1) * (t - 1) + i;
            this.faces.push(new THREE.Face4(n, r, o, a)), this.faceVertexUvs[0].push([new THREE.UV(e[n][0], e[n][1]), new THREE.UV(e[r][0], e[r][1]), new THREE.UV(e[o][0], e[o][1]), new THREE.UV(e[a][0], e[a][1])])
        }
    delete e, this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.Torus.prototype = new THREE.Geometry, THREE.Torus.prototype.constructor = THREE.Torus, THREE.TorusKnot = function(e, t, i, n, r, o, a) {
    function s(e, t, i, n, r, o) {
        return t = i / n * e, i = Math.cos(t), new THREE.Vector3(r * (2 + i) * .5 * Math.cos(e), r * (2 + i) * Math.sin(e) * .5, o * r * Math.sin(t) * .5)
    }
    for (THREE.Geometry.call(this), this.radius = e || 200, this.tube = t || 40, this.segmentsR = i || 64, this.segmentsT = n || 8, this.p = r || 2, this.q = o || 3, this.heightScale = a || 1, this.grid = Array(this.segmentsR), i = new THREE.Vector3, n = new THREE.Vector3, o = new THREE.Vector3, e = 0; e < this.segmentsR; ++e)
        for (this.grid[e] = Array(this.segmentsT), t = 0; t < this.segmentsT; ++t) {
            var l = e / this.segmentsR * 2 * this.p * Math.PI;
            r = s(l, a = t / this.segmentsT * 2 * Math.PI, this.q, this.p, this.radius, this.heightScale), l = s(l + .01, a, this.q, this.p, this.radius, this.heightScale), i.x = l.x - r.x, i.y = l.y - r.y, i.z = l.z - r.z, n.x = l.x + r.x, n.y = l.y + r.y, n.z = l.z + r.z, o.cross(i, n), n.cross(o, i), o.normalize(), n.normalize(), l = -this.tube * Math.cos(a), a = this.tube * Math.sin(a), r.x += l * n.x + a * o.x, r.y += l * n.y + a * o.y, r.z += l * n.z + a * o.z, this.grid[e][t] = this.vertices.push(new THREE.Vertex(new THREE.Vector3(r.x, r.y, r.z))) - 1
        }
    for (e = 0; e < this.segmentsR; ++e)
        for (t = 0; t < this.segmentsT; ++t) {
            n = (e + 1) % this.segmentsR, o = (t + 1) % this.segmentsT, r = this.grid[e][t], i = this.grid[n][t], n = this.grid[n][o], o = this.grid[e][o], a = new THREE.UV(e / this.segmentsR, t / this.segmentsT), l = new THREE.UV((e + 1) / this.segmentsR, t / this.segmentsT);
            var h = new THREE.UV((e + 1) / this.segmentsR, (t + 1) / this.segmentsT),
                c = new THREE.UV(e / this.segmentsR, (t + 1) / this.segmentsT);
            this.faces.push(new THREE.Face4(r, i, n, o)), this.faceVertexUvs[0].push([a, l, h, c])
        }
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.TorusKnot.prototype = new THREE.Geometry, THREE.TorusKnot.prototype.constructor = THREE.TorusKnot, THREE.Loader = function(e) {
    this.statusDomElement = (this.showStatus = e) ? THREE.Loader.prototype.addStatusElement() : null, this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}
}, THREE.Loader.prototype = {
    addStatusElement: function() {
        var e = document.createElement("div");
        return e.style.position = "absolute", e.style.right = "0px", e.style.top = "0px", e.style.fontSize = "0.8em", e.style.textAlign = "left", e.style.background = "rgba(0,0,0,0.25)", e.style.color = "#fff", e.style.width = "120px", e.style.padding = "0.5em 0.5em 0.5em 0.5em", e.style.zIndex = 1e3, e.innerHTML = "Loading ...", e
    },
    updateProgress: function(e) {
        var t = "Loaded ";
        t += e.total ? (100 * e.loaded / e.total).toFixed(0) + "%" : (e.loaded / 1e3).toFixed(2) + " KB", this.statusDomElement.innerHTML = t
    },
    extractUrlbase: function(e) {
        return (e = e.split("/")).pop(), e.join("/")
    },
    init_materials: function(e, t, i) {
        e.materials = [];
        for (var n = 0; n < t.length; ++n) e.materials[n] = [THREE.Loader.prototype.createMaterial(t[n], i)]
    },
    createMaterial: function(e, t) {
        function i(e) {
            return e = Math.log(e) / Math.LN2, Math.floor(e) == e
        }

        function n(e, t) {
            var n = new Image;
            n.onload = function() {
                if (i(this.width) && i(this.height)) e.image = this;
                else {
                    var t = Math.pow(2, Math.round(Math.log(this.width) / Math.LN2)),
                        n = Math.pow(2, Math.round(Math.log(this.height) / Math.LN2));
                    e.image.width = t, e.image.height = n, e.image.getContext("2d").drawImage(this, 0, 0, t, n)
                }
                e.needsUpdate = !0
            }, n.src = t
        }
        var r, o, a;
        return r = "MeshLambertMaterial", o = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            wireframe: e.wireframe
        }, e.shading && ("Phong" == e.shading ? r = "MeshPhongMaterial" : "Basic" == e.shading && (r = "MeshBasicMaterial")), e.blending && ("Additive" == e.blending ? o.blending = THREE.AdditiveBlending : "Subtractive" == e.blending ? o.blending = THREE.SubtractiveBlending : "Multiply" == e.blending && (o.blending = THREE.MultiplyBlending)), (void 0 !== e.transparent || e.opacity < 1) && (o.transparent = e.transparent), void 0 !== e.depthTest && (o.depthTest = e.depthTest), void 0 !== e.vertexColors && ("face" == e.vertexColors ? o.vertexColors = THREE.FaceColors : e.vertexColors && (o.vertexColors = THREE.VertexColors)), e.mapDiffuse && t ? (a = document.createElement("canvas"), o.map = new THREE.Texture(a), o.map.sourceFile = e.mapDiffuse, n(o.map, t + "/" + e.mapDiffuse)) : e.colorDiffuse ? (a = (255 * e.colorDiffuse[0] << 16) + (255 * e.colorDiffuse[1] << 8) + 255 * e.colorDiffuse[2], o.color = a, o.opacity = e.transparency) : e.DbgColor && (o.color = e.DbgColor), e.mapLightmap && t && (a = document.createElement("canvas"), o.lightMap = new THREE.Texture(a), o.lightMap.sourceFile = e.mapLightmap, n(o.lightMap, t + "/" + e.mapLightmap)), new THREE[r](o)
    }
}, THREE.JSONLoader = function(e) {
    THREE.Loader.call(this, e)
}, THREE.JSONLoader.prototype = new THREE.Loader, THREE.JSONLoader.prototype.constructor = THREE.JSONLoader, THREE.JSONLoader.prototype.supr = THREE.Loader.prototype, THREE.JSONLoader.prototype.load = function(e) {
    var t = this,
        i = e.model,
        n = e.callback,
        r = e.texture_path ? e.texture_path : this.extractUrlbase(i);
    (e = new Worker(i)).onmessage = function(e) {
        t.createModel(e.data, n, r), t.onLoadComplete()
    }, this.onLoadStart(), e.postMessage((new Date).getTime())
}, THREE.JSONLoader.prototype.createModel = function(e, t, i) {
    var n = new THREE.Geometry,
        r = void 0 !== e.scale ? e.scale : 1;
    this.init_materials(n, e.materials, i),
        function(t) {
            if (void 0 === e.version || 2 != e.version) console.error("Deprecated file format.");
            else {
                var i, r, o, a, s, l, h, c, u, f, d, E, p, m, v = e.faces;
                l = e.vertices;
                var g = e.normals,
                    T = e.colors,
                    y = 0;
                for (i = 0; i < e.uvs.length; i++) e.uvs[i].length && y++;
                for (i = 0; i < y; i++) n.faceUvs[i] = [], n.faceVertexUvs[i] = [];
                for (a = 0, s = l.length; a < s;)(h = new THREE.Vertex).position.x = l[a++] / t, h.position.y = l[a++] / t, h.position.z = l[a++] / t, n.vertices.push(h);
                for (a = 0, s = v.length; a < s;) {
                    if (t = v[a++], l = 1 & t, o = 2 & t, i = 4 & t, r = 8 & t, c = 16 & t, h = 32 & t, f = 64 & t, t &= 128, l ? ((d = new THREE.Face4).a = v[a++], d.b = v[a++], d.c = v[a++], d.d = v[a++], l = 4) : ((d = new THREE.Face3).a = v[a++], d.b = v[a++], d.c = v[a++], l = 3), o && (o = v[a++], d.materials = n.materials[o]), o = n.faces.length, i)
                        for (i = 0; i < y; i++) m = (E = e.uvs[i])[2 * (u = v[a++])], u = E[2 * u + 1], n.faceUvs[i][o] = new THREE.UV(m, u);
                    if (r)
                        for (i = 0; i < y; i++) {
                            for (E = e.uvs[i], p = [], r = 0; r < l; r++) m = E[2 * (u = v[a++])], u = E[2 * u + 1], p[r] = new THREE.UV(m, u);
                            n.faceVertexUvs[i][o] = p
                        }
                    if (c && (c = 3 * v[a++], (r = new THREE.Vector3).x = g[c++], r.y = g[c++], r.z = g[c], d.normal = r), h)
                        for (i = 0; i < l; i++) c = 3 * v[a++], (r = new THREE.Vector3).x = g[c++], r.y = g[c++], r.z = g[c], d.vertexNormals.push(r);
                    if (f && (h = v[a++], h = new THREE.Color(T[h]), d.color = h), t)
                        for (i = 0; i < l; i++) h = v[a++], h = new THREE.Color(T[h]), d.vertexColors.push(h);
                    n.faces.push(d)
                }
            }
        }(r),
        function() {
            var t, i, r, o;
            if (e.skinWeights)
                for (t = 0, i = e.skinWeights.length; t < i; t += 2) r = e.skinWeights[t], o = e.skinWeights[t + 1], n.skinWeights.push(new THREE.Vector4(r, o, 0, 0));
            if (e.skinIndices)
                for (t = 0, i = e.skinIndices.length; t < i; t += 2) r = e.skinIndices[t], o = e.skinIndices[t + 1], n.skinIndices.push(new THREE.Vector4(r, o, 0, 0));
            n.bones = e.bones, n.animation = e.animation
        }(),
        function(t) {
            if (void 0 !== e.morphTargets) {
                var i, r, o, a, s, l, h, c, u;
                for (i = 0, r = e.morphTargets.length; i < r; i++)
                    for (n.morphTargets[i] = {}, n.morphTargets[i].name = e.morphTargets[i].name, n.morphTargets[i].vertices = [], c = n.morphTargets[i].vertices, o = 0, a = (u = e.morphTargets[i].vertices).length; o < a; o += 3) s = u[o] / t, l = u[o + 1] / t, h = u[o + 2] / t, c.push(new THREE.Vertex(new THREE.Vector3(s, l, h)))
            }
            if (void 0 !== e.morphColors)
                for (i = 0, r = e.morphColors.length; i < r; i++)
                    for (n.morphColors[i] = {}, n.morphColors[i].name = e.morphColors[i].name, n.morphColors[i].colors = [], a = n.morphColors[i].colors, t = 0, o = (s = e.morphColors[i].colors).length; t < o; t += 3)(l = new THREE.Color(16755200)).setRGB(s[t], s[t + 1], s[t + 2]), a.push(l)
        }(r),
        function() {
            if (void 0 !== e.edges) {
                var t, i, r;
                for (t = 0; t < e.edges.length; t += 2) i = e.edges[t], r = e.edges[t + 1], n.edges.push(new THREE.Edge(n.vertices[i], n.vertices[r], i, r))
            }
        }(), n.computeCentroids(), n.computeFaceNormals(), n.computeEdgeFaces(), t(n)
}, THREE.BinaryLoader = function(e) {
    THREE.Loader.call(this, e)
}, THREE.BinaryLoader.prototype = new THREE.Loader, THREE.BinaryLoader.prototype.constructor = THREE.BinaryLoader, THREE.BinaryLoader.prototype.supr = THREE.Loader.prototype, THREE.BinaryLoader.prototype = {
    load: function(e) {
        var t = e.model,
            i = e.callback,
            n = e.texture_path ? e.texture_path : THREE.Loader.prototype.extractUrlbase(t),
            r = e.bin_path ? e.bin_path : THREE.Loader.prototype.extractUrlbase(t);
        e = (new Date).getTime(), t = new Worker(t);
        var o = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
        t.onmessage = function(e) {
            THREE.BinaryLoader.prototype.loadAjaxBuffers(e.data.buffers, e.data.materials, i, r, n, o)
        }, t.onerror = function(e) {
            alert("worker.onerror: " + e.message + "\n" + e.data), e.preventDefault()
        }, t.postMessage(e)
    },
    loadAjaxBuffers: function(e, t, i, n, r, o) {
        var a = new XMLHttpRequest,
            s = n + "/" + e,
            l = 0;
        a.onreadystatechange = function() {
            4 == a.readyState ? 200 == a.status || 0 == a.status ? THREE.BinaryLoader.prototype.createBinModel(a.responseText, i, r, t) : alert("Couldn't load [" + s + "] [" + a.status + "]") : 3 == a.readyState ? o && (0 == l && (l = a.getResponseHeader("Content-Length")), o({
                total: l,
                loaded: a.responseText.length
            })) : 2 == a.readyState && (l = a.getResponseHeader("Content-Length"))
        }, a.open("GET", s, !0), a.overrideMimeType("text/plain; charset=x-user-defined"), a.setRequestHeader("Content-Type", "text/plain"), a.send(null)
    },
    createBinModel: function(e, t, i, n) {
        var r = function(t) {
            function i(e, t) {
                var i = s(e, t),
                    n = s(e, t + 1),
                    r = s(e, t + 2),
                    o = s(e, t + 3),
                    a = (o << 1 & 255 | r >> 7) - 127;
                return i |= (127 & r) << 16 | n << 8, 0 == i && -127 == a ? 0 : (1 - 2 * (o >> 7)) * (1 + i * Math.pow(2, -23)) * Math.pow(2, a)
            }

            function r(e, t) {
                var i = s(e, t),
                    n = s(e, t + 1),
                    r = s(e, t + 2);
                return (s(e, t + 3) << 24) + (r << 16) + (n << 8) + i
            }

            function o(e, t) {
                var i = s(e, t);
                return (s(e, t + 1) << 8) + i
            }

            function a(e, t) {
                var i = s(e, t);
                return i > 127 ? i - 256 : i
            }

            function s(e, t) {
                return 255 & e.charCodeAt(t)
            }

            function l(t) {
                var i, n, a;
                i = r(e, t), n = r(e, t + p), a = r(e, t + m), t = o(e, t + v), THREE.BinaryLoader.prototype.f3(N, i, n, a, t)
            }

            function h(t) {
                var i, n, a, s, l, h;
                i = r(e, t), n = r(e, t + p), a = r(e, t + m), s = o(e, t + v), l = r(e, t + g), h = r(e, t + T), t = r(e, t + y), THREE.BinaryLoader.prototype.f3n(N, O, i, n, a, s, l, h, t)
            }

            function c(t) {
                var i, n, a, s;
                i = r(e, t), n = r(e, t + R), a = r(e, t + x), s = r(e, t + _), t = o(e, t + b), THREE.BinaryLoader.prototype.f4(N, i, n, a, s, t)
            }

            function u(t) {
                var i, n, a, s, l, h, c, u;
                i = r(e, t), n = r(e, t + R), a = r(e, t + x), s = r(e, t + _), l = o(e, t + b), h = r(e, t + H), c = r(e, t + w), u = r(e, t + M), t = r(e, t + S), THREE.BinaryLoader.prototype.f4n(N, O, i, n, a, s, l, h, c, u, t)
            }

            function f(t) {
                var i, n;
                i = r(e, t), n = r(e, t + A), t = r(e, t + C), THREE.BinaryLoader.prototype.uv3(N.faceVertexUvs[0], W[2 * i], W[2 * i + 1], W[2 * n], W[2 * n + 1], W[2 * t], W[2 * t + 1])
            }

            function d(t) {
                var i, n, o;
                i = r(e, t), n = r(e, t + L), o = r(e, t + F), t = r(e, t + z), THREE.BinaryLoader.prototype.uv4(N.faceVertexUvs[0], W[2 * i], W[2 * i + 1], W[2 * n], W[2 * n + 1], W[2 * o], W[2 * o + 1], W[2 * t], W[2 * t + 1])
            }
            var E, p, m, v, g, T, y, R, x, _, b, H, w, M, S, A, C, L, F, z, V, U, B, k, D, P, N = this,
                I = 0,
                O = [],
                W = [];
            THREE.Geometry.call(this), THREE.Loader.prototype.init_materials(N, n, t), I += (E = {
                signature: e.substr(I, 8),
                header_bytes: s(e, I + 8),
                vertex_coordinate_bytes: s(e, I + 9),
                normal_coordinate_bytes: s(e, I + 10),
                uv_coordinate_bytes: s(e, I + 11),
                vertex_index_bytes: s(e, I + 12),
                normal_index_bytes: s(e, I + 13),
                uv_index_bytes: s(e, I + 14),
                material_index_bytes: s(e, I + 15),
                nvertices: r(e, I + 16),
                nnormals: r(e, I + 16 + 4),
                nuvs: r(e, I + 16 + 8),
                ntri_flat: r(e, I + 16 + 12),
                ntri_smooth: r(e, I + 16 + 16),
                ntri_flat_uv: r(e, I + 16 + 20),
                ntri_smooth_uv: r(e, I + 16 + 24),
                nquad_flat: r(e, I + 16 + 28),
                nquad_smooth: r(e, I + 16 + 32),
                nquad_flat_uv: r(e, I + 16 + 36),
                nquad_smooth_uv: r(e, I + 16 + 40)
            }).header_bytes, p = E.vertex_index_bytes, m = 2 * E.vertex_index_bytes, v = 3 * E.vertex_index_bytes, g = 3 * E.vertex_index_bytes + E.material_index_bytes, T = 3 * E.vertex_index_bytes + E.material_index_bytes + E.normal_index_bytes, y = 3 * E.vertex_index_bytes + E.material_index_bytes + 2 * E.normal_index_bytes, R = E.vertex_index_bytes, x = 2 * E.vertex_index_bytes, _ = 3 * E.vertex_index_bytes, b = 4 * E.vertex_index_bytes, H = 4 * E.vertex_index_bytes + E.material_index_bytes, w = 4 * E.vertex_index_bytes + E.material_index_bytes + E.normal_index_bytes, M = 4 * E.vertex_index_bytes + E.material_index_bytes + 2 * E.normal_index_bytes, S = 4 * E.vertex_index_bytes + E.material_index_bytes + 3 * E.normal_index_bytes, A = E.uv_index_bytes, C = 2 * E.uv_index_bytes, L = E.uv_index_bytes, F = 2 * E.uv_index_bytes, z = 3 * E.uv_index_bytes, t = 3 * E.vertex_index_bytes + E.material_index_bytes, P = 4 * E.vertex_index_bytes + E.material_index_bytes, V = E.ntri_flat * t, U = E.ntri_smooth * (t + 3 * E.normal_index_bytes), B = E.ntri_flat_uv * (t + 3 * E.uv_index_bytes), k = E.ntri_smooth_uv * (t + 3 * E.normal_index_bytes + 3 * E.uv_index_bytes), D = E.nquad_flat * P, t = E.nquad_smooth * (P + 4 * E.normal_index_bytes), P = E.nquad_flat_uv * (P + 4 * E.uv_index_bytes), I += function(t) {
                for (var n, r, o, a = 3 * E.vertex_coordinate_bytes, s = t + E.nvertices * a; t < s; t += a) n = i(e, t), r = i(e, t + E.vertex_coordinate_bytes), o = i(e, t + 2 * E.vertex_coordinate_bytes), THREE.BinaryLoader.prototype.v(N, n, r, o);
                return E.nvertices * a
            }(I), I += function(t) {
                for (var i, n, r, o = 3 * E.normal_coordinate_bytes, s = t + E.nnormals * o; t < s; t += o) i = a(e, t), n = a(e, t + E.normal_coordinate_bytes), r = a(e, t + 2 * E.normal_coordinate_bytes), O.push(i / 127, n / 127, r / 127);
                return E.nnormals * o
            }(I), P = (t = (D = (k = (B = (U = (V = (I += function(t) {
                for (var n, r, o = 2 * E.uv_coordinate_bytes, a = t + E.nuvs * o; t < a; t += o) n = i(e, t), r = i(e, t + E.uv_coordinate_bytes), W.push(n, r);
                return E.nuvs * o
            }(I)) + V) + U) + B) + k) + D) + t) + P,
                function(e) {
                    var t, i = 3 * E.vertex_index_bytes + E.material_index_bytes,
                        n = i + 3 * E.uv_index_bytes,
                        r = e + E.ntri_flat_uv * n;
                    for (t = e; t < r; t += n) l(t), f(t + i)
                }(U),
                function(e) {
                    var t, i = 3 * E.vertex_index_bytes + E.material_index_bytes + 3 * E.normal_index_bytes,
                        n = i + 3 * E.uv_index_bytes,
                        r = e + E.ntri_smooth_uv * n;
                    for (t = e; t < r; t += n) h(t), f(t + i)
                }(B),
                function(e) {
                    var t, i = 4 * E.vertex_index_bytes + E.material_index_bytes,
                        n = i + 4 * E.uv_index_bytes,
                        r = e + E.nquad_flat_uv * n;
                    for (t = e; t < r; t += n) c(t), d(t + i)
                }(t),
                function(e) {
                    var t, i = 4 * E.vertex_index_bytes + E.material_index_bytes + 4 * E.normal_index_bytes,
                        n = i + 4 * E.uv_index_bytes,
                        r = e + E.nquad_smooth_uv * n;
                    for (t = e; t < r; t += n) u(t), d(t + i)
                }(P),
                function(e) {
                    var t, i = 3 * E.vertex_index_bytes + E.material_index_bytes,
                        n = e + E.ntri_flat * i;
                    for (t = e; t < n; t += i) l(t)
                }(I),
                function(e) {
                    var t, i = 3 * E.vertex_index_bytes + E.material_index_bytes + 3 * E.normal_index_bytes,
                        n = e + E.ntri_smooth * i;
                    for (t = e; t < n; t += i) h(t)
                }(V),
                function(e) {
                    var t, i = 4 * E.vertex_index_bytes + E.material_index_bytes,
                        n = e + E.nquad_flat * i;
                    for (t = e; t < n; t += i) c(t)
                }(k),
                function(e) {
                    var t, i = 4 * E.vertex_index_bytes + E.material_index_bytes + 4 * E.normal_index_bytes,
                        n = e + E.nquad_smooth * i;
                    for (t = e; t < n; t += i) u(t)
                }(D), this.computeCentroids(), this.computeFaceNormals()
        };
        (r.prototype = new THREE.Geometry).constructor = r, t(new r(i))
    },
    v: function(e, t, i, n) {
        e.vertices.push(new THREE.Vertex(new THREE.Vector3(t, i, n)))
    },
    f3: function(e, t, i, n, r) {
        e.faces.push(new THREE.Face3(t, i, n, null, null, e.materials[r]))
    },
    f4: function(e, t, i, n, r, o) {
        e.faces.push(new THREE.Face4(t, i, n, r, null, null, e.materials[o]))
    },
    f3n: function(e, t, i, n, r, o, a, s, l) {
        o = e.materials[o];
        var h = t[3 * s],
            c = t[3 * s + 1];
        s = t[3 * s + 2];
        var u = t[3 * l],
            f = t[3 * l + 1];
        l = t[3 * l + 2], e.faces.push(new THREE.Face3(i, n, r, [new THREE.Vector3(t[3 * a], t[3 * a + 1], t[3 * a + 2]), new THREE.Vector3(h, c, s), new THREE.Vector3(u, f, l)], null, o))
    },
    f4n: function(e, t, i, n, r, o, a, s, l, h, c) {
        a = e.materials[a];
        var u = t[3 * l],
            f = t[3 * l + 1];
        l = t[3 * l + 2];
        var d = t[3 * h],
            E = t[3 * h + 1];
        h = t[3 * h + 2];
        var p = t[3 * c],
            m = t[3 * c + 1];
        c = t[3 * c + 2], e.faces.push(new THREE.Face4(i, n, r, o, [new THREE.Vector3(t[3 * s], t[3 * s + 1], t[3 * s + 2]), new THREE.Vector3(u, f, l), new THREE.Vector3(d, E, h), new THREE.Vector3(p, m, c)], null, a))
    },
    uv3: function(e, t, i, n, r, o, a) {
        var s = [];
        s.push(new THREE.UV(t, i)), s.push(new THREE.UV(n, r)), s.push(new THREE.UV(o, a)), e.push(s)
    },
    uv4: function(e, t, i, n, r, o, a, s, l) {
        var h = [];
        h.push(new THREE.UV(t, i)), h.push(new THREE.UV(n, r)), h.push(new THREE.UV(o, a)), h.push(new THREE.UV(s, l)), e.push(h)
    }
}, THREE.SceneLoader = function() {
    this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}, this.callbackSync = function() {}, this.callbackProgress = function() {}
}, THREE.SceneLoader.prototype = {
    load: function(e, t) {
        var i = this,
            n = new Worker(e);
        n.postMessage(0);
        var o = THREE.Loader.prototype.extractUrlbase(e);
        n.onmessage = function(e) {
            function n(e, t) {
                return "relativeToHTML" == t ? e : o + "/" + e
            }

            function a() {
                for (f in H.objects)
                    if (!L.objects[f])
                        if (void 0 !== (v = H.objects[f]).geometry) {
                            if (R = L.geometries[v.geometry]) {
                                for (b = [], V = 0; V < v.materials.length; V++) b[V] = L.materials[v.materials[V]];
                                if (g = v.position, r = v.rotation, q = v.quaternion, s = v.scale, q = 0, 0 == b.length && (b[0] = new THREE.MeshFaceMaterial), b.length > 1 && (b = [new THREE.MeshFaceMaterial]), object = new THREE.Mesh(R, b), object.name = f, object.position.set(g[0], g[1], g[2]), q ? (object.quaternion.set(q[0], q[1], q[2], q[3]), object.useQuaternion = !0) : object.rotation.set(r[0], r[1], r[2]), object.scale.set(s[0], s[1], s[2]), object.visible = v.visible, L.scene.addObject(object), L.objects[f] = object, v.meshCollider) {
                                    var e = THREE.CollisionUtils.MeshColliderWBox(object);
                                    L.scene.collisions.colliders.push(e)
                                }
                                v.castsShadow && (e = new THREE.ShadowVolume(R), L.scene.addChild(e), e.position = object.position, e.rotation = object.rotation, e.scale = object.scale), v.trigger && "none" != v.trigger.toLowerCase() && (L.triggers[object.name] = {
                                    type: v.trigger,
                                    object: v
                                })
                            }
                        } else g = v.position, r = v.rotation, q = v.quaternion, s = v.scale, q = 0, object = new THREE.Object3D, object.name = f, object.position.set(g[0], g[1], g[2]), q ? (object.quaternion.set(q[0], q[1], q[2], q[3]), object.useQuaternion = !0) : object.rotation.set(r[0], r[1], r[2]), object.scale.set(s[0], s[1], s[2]), object.visible = void 0 !== v.visible && v.visible, L.scene.addObject(object), L.objects[f] = object, L.empties[f] = object
            }

            function l(e) {
                return function(t) {
                    L.geometries[e] = t, a(), M -= 1, i.onLoadComplete(), h()
                }
            }

            function h() {
                i.callbackProgress({
                    totalModels: A,
                    totalTextures: C,
                    loadedModels: A - M,
                    loadedTextures: C - S
                }, L), i.onLoadProgress(), 0 == M && 0 == S && t(L)
            }
            var c, u, f, d, E, p, m, v, g, T, y, R, x, _, b, H, w, M, S, A, C, L;
            H = e.data, e = new THREE.BinaryLoader, w = new THREE.JSONLoader, S = M = 0, L = {
                scene: new THREE.Scene,
                geometries: {},
                materials: {},
                textures: {},
                objects: {},
                cameras: {},
                lights: {},
                fogs: {},
                triggers: {},
                empties: {}
            };
            var F = !1;
            for (f in H.objects)
                if ((v = H.objects[f]).meshCollider) {
                    F = !0;
                    break
                }
            if (F && (L.scene.collisions = new THREE.CollisionSystem), H.transform) {
                F = H.transform.position, T = H.transform.rotation;
                var z = H.transform.scale;
                F && L.scene.position.set(F[0], F[1], F[2]), T && L.scene.rotation.set(T[0], T[1], T[2]), z && L.scene.scale.set(z[0], z[1], z[2]), (F || T || z) && L.scene.updateMatrix()
            }
            F = function() {
                S -= 1, h(), i.onLoadComplete()
            };
            for (E in H.cameras) "perspective" == (T = H.cameras[E]).type ? x = new THREE.Camera(T.fov, T.aspect, T.near, T.far) : "ortho" == T.type && ((x = new THREE.Camera).projectionMatrix = THREE.Matrix4.makeOrtho(T.left, T.right, T.top, T.bottom, T.near, T.far)), g = T.position, T = T.target, x.position.set(g[0], g[1], g[2]), x.target.position.set(T[0], T[1], T[2]), L.cameras[E] = x;
            for (d in H.lights) x = void 0 !== (E = H.lights[d]).color ? E.color : 16777215, T = void 0 !== E.intensity ? E.intensity : 1, "directional" == E.type ? (g = E.direction, light = new THREE.DirectionalLight(x, T), light.position.set(g[0], g[1], g[2]), light.position.normalize()) : "point" == E.type && (g = E.position, light = new THREE.PointLight(x, T), light.position.set(g[0], g[1], g[2])), L.scene.addLight(light), L.lights[d] = light;
            for (p in H.fogs) "linear" == (d = H.fogs[p]).type ? _ = new THREE.Fog(0, d.near, d.far) : "exp2" == d.type && (_ = new THREE.FogExp2(0, d.density)), T = d.color, _.color.setRGB(T[0], T[1], T[2]), L.fogs[p] = _;
            L.cameras && H.defaults.camera && (L.currentCamera = L.cameras[H.defaults.camera]), L.fogs && H.defaults.fog && (L.scene.fog = L.fogs[H.defaults.fog]), T = H.defaults.bgcolor, L.bgColor = new THREE.Color, L.bgColor.setRGB(T[0], T[1], T[2]), L.bgColorAlpha = H.defaults.bgalpha;
            for (c in H.geometries) "bin_mesh" != (p = H.geometries[c]).type && "ascii_mesh" != p.type || (M += 1, i.onLoadStart());
            A = M;
            for (c in H.geometries) "cube" == (p = H.geometries[c]).type ? (R = new THREE.Cube(p.width, p.height, p.depth, p.segmentsWidth, p.segmentsHeight, p.segmentsDepth, null, p.flipped, p.sides), L.geometries[c] = R) : "plane" == p.type ? (R = new THREE.Plane(p.width, p.height, p.segmentsWidth, p.segmentsHeight), L.geometries[c] = R) : "sphere" == p.type ? (R = new THREE.Sphere(p.radius, p.segmentsWidth, p.segmentsHeight), L.geometries[c] = R) : "cylinder" == p.type ? (R = new THREE.Cylinder(p.numSegs, p.topRad, p.botRad, p.height, p.topOffset, p.botOffset), L.geometries[c] = R) : "torus" == p.type ? (R = new THREE.Torus(p.radius, p.tube, p.segmentsR, p.segmentsT), L.geometries[c] = R) : "icosahedron" == p.type ? (R = new THREE.Icosahedron(p.subdivisions), L.geometries[c] = R) : "bin_mesh" == p.type ? e.load({
                model: n(p.url, H.urlBaseType),
                callback: l(c)
            }) : "ascii_mesh" == p.type ? w.load({
                model: n(p.url, H.urlBaseType),
                callback: l(c)
            }) : "embedded_mesh" == p.type && (p = H.embeds[p.id]) && w.createModel(p, function(e) {
                return function(t) {
                    L.geometries[e] = t
                }
            }(c), "");
            for (m in H.textures)
                if ((c = H.textures[m]).url instanceof Array)
                    for (S += c.url.length, e = 0; e < c.url.length; e++) i.onLoadStart();
                else S += 1, i.onLoadStart();
            C = S;
            for (m in H.textures) {
                if (void 0 != (c = H.textures[m]).mapping && void 0 != THREE[c.mapping] && (c.mapping = new THREE[c.mapping]), c.url instanceof Array) {
                    e = [];
                    for (var V = 0; V < c.url.length; V++) e[V] = n(c.url[V], H.urlBaseType);
                    e = THREE.ImageUtils.loadTextureCube(e, c.mapping, F)
                } else e = THREE.ImageUtils.loadTexture(n(c.url, H.urlBaseType), c.mapping, F), void 0 != THREE[c.minFilter] && (e.minFilter = THREE[c.minFilter]), void 0 != THREE[c.magFilter] && (e.magFilter = THREE[c.magFilter]);
                L.textures[m] = e
            }
            for (u in H.materials) {
                m = H.materials[u];
                for (y in m.parameters) "envMap" == y || "map" == y || "lightMap" == y ? m.parameters[y] = L.textures[m.parameters[y]] : "shading" == y ? m.parameters[y] = "flat" == m.parameters[y] ? THREE.FlatShading : THREE.SmoothShading : "blending" == y ? m.parameters[y] = THREE[m.parameters[y]] ? THREE[m.parameters[y]] : THREE.NormalBlending : "combine" == y ? m.parameters[y] = "MixOperation" == m.parameters[y] ? THREE.MixOperation : THREE.MultiplyOperation : "vertexColors" == y && ("face" == m.parameters[y] ? m.parameters[y] = THREE.FaceColors : m.parameters[y] && (m.parameters[y] = THREE.VertexColors));
                void 0 !== m.parameters.opacity && m.parameters.opacity < 1 && (m.parameters.transparent = !0), m = new THREE[m.type](m.parameters), L.materials[u] = m
            }
            a(), i.callbackSync(L)
        }
    }
}, THREE.MarchingCubes = function(e, t) {
    THREE.Object3D.call(this), this.materials = t instanceof Array ? t : [t], this.init = function(e) {
        this.isolation = 80, this.size = e, this.size2 = this.size * this.size, this.size3 = this.size2 * this.size, this.halfsize = this.size / 2, this.delta = 2 / this.size, this.yd = this.size, this.zd = this.size2, this.field = new Float32Array(this.size3), this.normal_cache = new Float32Array(3 * this.size3), this.vlist = new Float32Array(36), this.nlist = new Float32Array(36), this.firstDraw = !0, this.maxCount = 4096, this.count = 0, this.hasPos = !1, this.hasNormal = !1, this.positionArray = new Float32Array(3 * this.maxCount), this.normalArray = new Float32Array(3 * this.maxCount)
    }, this.lerp = function(e, t, i) {
        return e + (t - e) * i
    }, this.VIntX = function(e, t, i, n, r, o, a, s, l, h) {
        r = (r - l) / (h - l), l = this.normal_cache, t[n] = o + r * this.delta, t[n + 1] = a, t[n + 2] = s, i[n] = this.lerp(l[e], l[e + 3], r), i[n + 1] = this.lerp(l[e + 1], l[e + 4], r), i[n + 2] = this.lerp(l[e + 2], l[e + 5], r)
    }, this.VIntY = function(e, t, i, n, r, o, a, s, l, h) {
        r = (r - l) / (h - l), l = this.normal_cache, t[n] = o, t[n + 1] = a + r * this.delta, t[n + 2] = s, t = e + 3 * this.yd, i[n] = this.lerp(l[e], l[t], r), i[n + 1] = this.lerp(l[e + 1], l[t + 1], r), i[n + 2] = this.lerp(l[e + 2], l[t + 2], r)
    }, this.VIntZ = function(e, t, i, n, r, o, a, s, l, h) {
        r = (r - l) / (h - l), l = this.normal_cache, t[n] = o, t[n + 1] = a, t[n + 2] = s + r * this.delta, t = e + 3 * this.zd, i[n] = this.lerp(l[e], l[t], r), i[n + 1] = this.lerp(l[e + 1], l[t + 1], r), i[n + 2] = this.lerp(l[e + 2], l[t + 2], r)
    }, this.compNorm = function(e) {
        var t = 3 * e;
        0 == this.normal_cache[t] && (this.normal_cache[t] = this.field[e - 1] - this.field[e + 1], this.normal_cache[t + 1] = this.field[e - this.yd] - this.field[e + this.yd], this.normal_cache[t + 2] = this.field[e - this.zd] - this.field[e + this.zd])
    }, this.polygonize = function(e, t, i, n, r, o) {
        var a = n + 1,
            s = n + this.yd,
            l = n + this.zd,
            h = a + this.yd,
            c = a + this.zd,
            u = n + this.yd + this.zd,
            f = a + this.yd + this.zd,
            d = 0,
            E = this.field[n],
            p = this.field[a],
            m = this.field[s],
            v = this.field[h],
            g = this.field[l],
            T = this.field[c],
            y = this.field[u],
            R = this.field[f];
        E < r && (d |= 1), p < r && (d |= 2), m < r && (d |= 8), v < r && (d |= 4), g < r && (d |= 16), T < r && (d |= 32), y < r && (d |= 128), R < r && (d |= 64);
        var x = THREE.edgeTable[d];
        if (0 == x) return 0;
        var _ = this.delta,
            b = e + _,
            H = t + _;
        for (_ = i + _, 1 & x && (this.compNorm(n), this.compNorm(a), this.VIntX(3 * n, this.vlist, this.nlist, 0, r, e, t, i, E, p)), 2 & x && (this.compNorm(a), this.compNorm(h), this.VIntY(3 * a, this.vlist, this.nlist, 3, r, b, t, i, p, v)), 4 & x && (this.compNorm(s), this.compNorm(h), this.VIntX(3 * s, this.vlist, this.nlist, 6, r, e, H, i, m, v)), 8 & x && (this.compNorm(n), this.compNorm(s), this.VIntY(3 * n, this.vlist, this.nlist, 9, r, e, t, i, E, m)), 16 & x && (this.compNorm(l), this.compNorm(c), this.VIntX(3 * l, this.vlist, this.nlist, 12, r, e, t, _, g, T)), 32 & x && (this.compNorm(c), this.compNorm(f), this.VIntY(3 * c, this.vlist, this.nlist, 15, r, b, t, _, T, R)), 64 & x && (this.compNorm(u), this.compNorm(f), this.VIntX(3 * u, this.vlist, this.nlist, 18, r, e, H, _, y, R)), 128 & x && (this.compNorm(l), this.compNorm(u), this.VIntY(3 * l, this.vlist, this.nlist, 21, r, e, t, _, g, y)), 256 & x && (this.compNorm(n), this.compNorm(l), this.VIntZ(3 * n, this.vlist, this.nlist, 24, r, e, t, i, E, g)), 512 & x && (this.compNorm(a), this.compNorm(c), this.VIntZ(3 * a, this.vlist, this.nlist, 27, r, b, t, i, p, T)), 1024 & x && (this.compNorm(h), this.compNorm(f), this.VIntZ(3 * h, this.vlist, this.nlist, 30, r, b, H, i, v, R)), 2048 & x && (this.compNorm(s), this.compNorm(u), this.VIntZ(3 * s, this.vlist, this.nlist, 33, r, e, H, i, m, y)), d <<= 4, r = n = 0; - 1 != THREE.triTable[d + r];) t = (e = d + r) + 1, i = e + 2, this.posnormtriv(this.vlist, this.nlist, 3 * THREE.triTable[e], 3 * THREE.triTable[t], 3 * THREE.triTable[i], o), r += 3, n++;
        return n
    }, this.posnormtriv = function(e, t, i, n, r, o) {
        var a = 3 * this.count;
        this.positionArray[a] = e[i], this.positionArray[a + 1] = e[i + 1], this.positionArray[a + 2] = e[i + 2], this.positionArray[a + 3] = e[n], this.positionArray[a + 4] = e[n + 1], this.positionArray[a + 5] = e[n + 2], this.positionArray[a + 6] = e[r], this.positionArray[a + 7] = e[r + 1], this.positionArray[a + 8] = e[r + 2], this.normalArray[a] = t[i], this.normalArray[a + 1] = t[i + 1], this.normalArray[a + 2] = t[i + 2], this.normalArray[a + 3] = t[n], this.normalArray[a + 4] = t[n + 1], this.normalArray[a + 5] = t[n + 2], this.normalArray[a + 6] = t[r], this.normalArray[a + 7] = t[r + 1], this.normalArray[a + 8] = t[r + 2], this.hasPos = !0, this.hasNormal = !0, this.count += 3, this.count >= this.maxCount - 3 && o(this)
    }, this.begin = function() {
        this.count = 0, this.hasPos = !1, this.hasNormal = !1
    }, this.end = function(e) {
        if (0 != this.count) {
            for (var t = 3 * this.count; t < this.positionArray.length; t++) this.positionArray[t] = 0;
            e(this)
        }
    }, this.addBall = function(e, t, i, n, r) {
        var o = this.size * Math.sqrt(n / r),
            a = i * this.size,
            s = t * this.size,
            l = e * this.size,
            h = Math.floor(a - o);
        h < 1 && (h = 1), (a = Math.floor(a + o)) > this.size - 1 && (a = this.size - 1);
        var c = Math.floor(s - o);
        c < 1 && (c = 1), (s = Math.floor(s + o)) > this.size - 1 && (s = this.size - 1);
        var u = Math.floor(l - o);
        u < 1 && (u = 1), (o = Math.floor(l + o)) > this.size - 1 && (o = this.size - 1);
        for (var f, d, E, p, m, v; h < a; h++)
            for (l = this.size2 * h, m = (d = h / this.size - i) * d, d = c; d < s; d++)
                for (E = l + this.size * d, v = (f = d / this.size - t) * f, f = u; f < o; f++)(p = n / (1e-6 + (p = f / this.size - e) * p + v + m) - r) > 0 && (this.field[E + f] += p)
    }, this.addPlaneX = function(e, t) {
        var i, n, r, o, a, s = this.size,
            l = this.yd,
            h = this.zd,
            c = this.field,
            u = s * Math.sqrt(e / t);
        for (u > s && (u = s), i = 0; i < u; i++)
            if (n = i / s, n *= n, (o = e / (1e-4 + n) - t) > 0)
                for (n = 0; n < s; n++)
                    for (a = i + n * l, r = 0; r < s; r++) c[h * r + a] += o
    }, this.addPlaneY = function(e, t) {
        var i, n, r, o, a, s, l = this.size,
            h = this.yd,
            c = this.zd,
            u = this.field,
            f = l * Math.sqrt(e / t);
        for (f > l && (f = l), n = 0; n < f; n++)
            if (i = n / l, i *= i, (o = e / (1e-4 + i) - t) > 0)
                for (a = n * h, i = 0; i < l; i++)
                    for (s = a + i, r = 0; r < l; r++) u[c * r + s] += o
    }, this.addPlaneZ = function(e, t) {
        var i, n, r, o, a, s;
        for (size = this.size, yd = this.yd, zd = this.zd, field = this.field, dist = size * Math.sqrt(e / t), dist > size && (dist = size), r = 0; r < dist; r++)
            if (i = r / size, i *= i, (o = e / (1e-4 + i) - t) > 0)
                for (a = zd * r, n = 0; n < size; n++)
                    for (s = a + n * yd, i = 0; i < size; i++) field[s + i] += o
    }, this.reset = function() {
        var e;
        for (e = 0; e < this.size3; e++) this.normal_cache[3 * e] = 0, this.field[e] = 0
    }, this.render = function(e) {
        this.begin();
        var t, i, n, r, o, a, s, l, h, c = this.size - 2;
        for (r = 1; r < c; r++)
            for (h = this.size2 * r, s = (r - this.halfsize) / this.halfsize, n = 1; n < c; n++)
                for (l = h + this.size * n, a = (n - this.halfsize) / this.halfsize, i = 1; i < c; i++) o = (i - this.halfsize) / this.halfsize, t = l + i, this.polygonize(o, a, s, t, this.isolation, e);
        this.end(e)
    }, this.generateGeometry = function() {
        var e = 0,
            t = new THREE.Geometry,
            i = [];
        return this.render(function(n) {
            var r, o, a, s, l, h, c, u;
            for (r = 0; r < n.count; r++) l = 1 + (c = 3 * r), u = c + 2, o = n.positionArray[c], a = n.positionArray[l], s = n.positionArray[u], h = new THREE.Vector3(o, a, s), o = n.normalArray[c], a = n.normalArray[l], s = n.normalArray[u], (c = new THREE.Vector3(o, a, s)).normalize(), l = new THREE.Vertex(h), t.vertices.push(l), i.push(c);
            for (nfaces = n.count / 3, r = 0; r < nfaces; r++) l = 1 + (c = 3 * (e + r)), u = c + 2, h = i[c], o = i[l], a = i[u], c = new THREE.Face3(c, l, u, [h, o, a]), t.faces.push(c);
            e += nfaces, n.count = 0
        }), t
    }, this.init(e)
}, THREE.MarchingCubes.prototype = new THREE.Object3D, THREE.MarchingCubes.prototype.constructor = THREE.MarchingCubes, THREE.edgeTable = new Int32Array([0, 265, 515, 778, 1030, 1295, 1541, 1804, 2060, 2309, 2575, 2822, 3082, 3331, 3593, 3840, 400, 153, 915, 666, 1430, 1183, 1941, 1692, 2460, 2197, 2975, 2710, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 1590, 1855, 1077, 1340, 2620, 2869, 2111, 2358, 3642, 3891, 3129, 3376, 928, 681, 419, 170, 1958, 1711, 1445, 1196, 2988, 2725, 2479, 2214, 4010, 3747, 3497, 3232, 1120, 1385, 1635, 1898, 102, 367, 613, 876, 3180, 3429, 3695, 3942, 2154, 2403, 2665, 2912, 1520, 1273, 2035, 1786, 502, 255, 1013, 764, 3580, 3317, 4095, 3830, 2554, 2291, 3065, 2800, 1616, 1881, 1107, 1370, 598, 863, 85, 348, 3676, 3925, 3167, 3414, 2650, 2899, 2137, 2384, 1984, 1737, 1475, 1226, 966, 719, 453, 204, 4044, 3781, 3535, 3270, 3018, 2755, 2505, 2240, 2240, 2505, 2755, 3018, 3270, 3535, 3781, 4044, 204, 453, 719, 966, 1226, 1475, 1737, 1984, 2384, 2137, 2899, 2650, 3414, 3167, 3925, 3676, 348, 85, 863, 598, 1370, 1107, 1881, 1616, 2800, 3065, 2291, 2554, 3830, 4095, 3317, 3580, 764, 1013, 255, 502, 1786, 2035, 1273, 1520, 2912, 2665, 2403, 2154, 3942, 3695, 3429, 3180, 876, 613, 367, 102, 1898, 1635, 1385, 1120, 3232, 3497, 3747, 4010, 2214, 2479, 2725, 2988, 1196, 1445, 1711, 1958, 170, 419, 681, 928, 3376, 3129, 3891, 3642, 2358, 2111, 2869, 2620, 1340, 1077, 1855, 1590, 314, 51, 825, 560, 3728, 3993, 3219, 3482, 2710, 2975, 2197, 2460, 1692, 1941, 1183, 1430, 666, 915, 153, 400, 3840, 3593, 3331, 3082, 2822, 2575, 2309, 2060, 1804, 1541, 1295, 1030, 778, 515, 265, 0]), THREE.triTable = new Int32Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 9, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 0, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, 3, 2, 10, 8, 10, 9, 8, -1, -1, -1, -1, -1, -1, -1, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 8, 11, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 11, 2, 1, 9, 11, 9, 8, 11, -1, -1, -1, -1, -1, -1, -1, 3, 10, 1, 11, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 10, 1, 0, 8, 10, 8, 11, 10, -1, -1, -1, -1, -1, -1, -1, 3, 9, 0, 3, 11, 9, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1, 9, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 7, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 9, 4, 7, 1, 7, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 7, 3, 0, 4, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 9, 0, 2, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4, -1, -1, -1, -1, 8, 4, 7, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 4, 7, 11, 2, 4, 2, 0, 4, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 8, 4, 7, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1, -1, -1, -1, -1, 3, 10, 1, 3, 11, 10, 7, 8, 4, -1, -1, -1, -1, -1, -1, -1, 1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4, -1, -1, -1, -1, 4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3, -1, -1, -1, -1, 4, 7, 11, 4, 11, 9, 9, 11, 10, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 1, 5, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 4, 8, 3, 5, 3, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 10, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 5, 2, 10, 5, 4, 2, 4, 0, 2, -1, -1, -1, -1, -1, -1, -1, 2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8, -1, -1, -1, -1, 9, 5, 4, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 0, 8, 11, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 0, 1, 5, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5, -1, -1, -1, -1, 10, 3, 11, 10, 1, 3, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10, -1, -1, -1, -1, 5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3, -1, -1, -1, -1, 5, 4, 8, 5, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 5, 7, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, 0, 9, 5, 3, 5, 7, 3, -1, -1, -1, -1, -1, -1, -1, 0, 7, 8, 0, 1, 7, 1, 5, 7, -1, -1, -1, -1, -1, -1, -1, 1, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 9, 5, 7, 10, 1, 2, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3, -1, -1, -1, -1, 8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2, -1, -1, -1, -1, 2, 10, 5, 2, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, 7, 9, 5, 7, 8, 9, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, 9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11, -1, -1, -1, -1, 2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7, -1, -1, -1, -1, 11, 2, 1, 11, 1, 7, 7, 1, 5, -1, -1, -1, -1, -1, -1, -1, 9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11, -1, -1, -1, -1, 5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0, -1, 11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0, -1, 11, 10, 5, 7, 11, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 1, 9, 8, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 2, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 1, 2, 6, 3, 0, 8, -1, -1, -1, -1, -1, -1, -1, 9, 6, 5, 9, 0, 6, 0, 2, 6, -1, -1, -1, -1, -1, -1, -1, 5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8, -1, -1, -1, -1, 2, 3, 11, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 0, 8, 11, 2, 0, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11, -1, -1, -1, -1, 6, 3, 11, 6, 5, 3, 5, 1, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6, -1, -1, -1, -1, 3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9, -1, -1, -1, -1, 6, 5, 9, 6, 9, 11, 11, 9, 8, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 4, 7, 3, 6, 5, 10, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 5, 10, 6, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4, -1, -1, -1, -1, 6, 1, 2, 6, 5, 1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, 1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7, -1, -1, -1, -1, 8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6, -1, -1, -1, -1, 7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9, -1, 3, 11, 2, 7, 8, 4, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11, -1, -1, -1, -1, 0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, 9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6, -1, 8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6, -1, -1, -1, -1, 5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11, -1, 0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7, -1, 6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9, -1, -1, -1, -1, 10, 4, 9, 6, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 10, 6, 4, 9, 10, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, 10, 0, 1, 10, 6, 0, 6, 4, 0, -1, -1, -1, -1, -1, -1, -1, 8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10, -1, -1, -1, -1, 1, 4, 9, 1, 2, 4, 2, 6, 4, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4, -1, -1, -1, -1, 0, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 2, 8, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, 10, 4, 9, 10, 6, 4, 11, 2, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6, -1, -1, -1, -1, 3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10, -1, -1, -1, -1, 6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1, -1, 9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3, -1, -1, -1, -1, 8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1, -1, 3, 11, 6, 3, 6, 0, 0, 6, 4, -1, -1, -1, -1, -1, -1, -1, 6, 4, 8, 11, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, 6, 7, 8, 10, 8, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10, -1, -1, -1, -1, 10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0, -1, -1, -1, -1, 10, 6, 7, 10, 7, 1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1, 1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9, -1, 7, 8, 0, 7, 0, 6, 6, 0, 2, -1, -1, -1, -1, -1, -1, -1, 7, 3, 2, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7, -1, 1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11, -1, 11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1, -1, -1, -1, -1, 8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6, -1, 0, 9, 1, 11, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0, -1, -1, -1, -1, 7, 11, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, 9, 8, 3, 1, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 8, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 2, 9, 0, 2, 10, 9, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8, -1, -1, -1, -1, 7, 2, 3, 6, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 0, 8, 7, 6, 0, 6, 2, 0, -1, -1, -1, -1, -1, -1, -1, 2, 7, 6, 2, 3, 7, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, 1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6, -1, -1, -1, -1, 10, 7, 6, 10, 1, 7, 1, 3, 7, -1, -1, -1, -1, -1, -1, -1, 10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8, -1, -1, -1, -1, 0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7, -1, -1, -1, -1, 7, 6, 10, 7, 10, 8, 8, 10, 9, -1, -1, -1, -1, -1, -1, -1, 6, 8, 4, 11, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 3, 0, 6, 0, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 6, 11, 8, 4, 6, 9, 0, 1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1, 6, 8, 4, 6, 11, 8, 2, 10, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6, -1, -1, -1, -1, 4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9, -1, -1, -1, -1, 10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3, -1, 8, 2, 3, 8, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, 0, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8, -1, -1, -1, -1, 1, 9, 4, 1, 4, 2, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1, -1, -1, -1, -1, 10, 1, 0, 10, 0, 6, 6, 0, 4, -1, -1, -1, -1, -1, -1, -1, 4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3, -1, 10, 9, 4, 6, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 5, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 5, 0, 1, 5, 4, 0, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5, -1, -1, -1, -1, 9, 5, 4, 10, 1, 2, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5, -1, -1, -1, -1, 7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2, -1, -1, -1, -1, 3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6, -1, 7, 2, 3, 7, 6, 2, 5, 4, 9, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7, -1, -1, -1, -1, 3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0, -1, -1, -1, -1, 6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8, -1, 9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7, -1, -1, -1, -1, 1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4, -1, 4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10, -1, 7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10, -1, -1, -1, -1, 6, 9, 5, 6, 11, 9, 11, 8, 9, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5, -1, -1, -1, -1, 0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11, -1, -1, -1, -1, 6, 11, 3, 6, 3, 5, 5, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6, -1, -1, -1, -1, 0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10, -1, 11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5, -1, 6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3, -1, -1, -1, -1, 5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2, -1, -1, -1, -1, 9, 5, 6, 9, 6, 0, 0, 6, 2, -1, -1, -1, -1, -1, -1, -1, 1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8, -1, 1, 5, 6, 2, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6, -1, 10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0, -1, -1, -1, -1, 0, 3, 8, 5, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 7, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 11, 7, 5, 8, 3, 0, -1, -1, -1, -1, -1, -1, -1, 5, 11, 7, 5, 10, 11, 1, 9, 0, -1, -1, -1, -1, -1, -1, -1, 10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1, -1, -1, -1, -1, 11, 1, 2, 11, 7, 1, 7, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11, -1, -1, -1, -1, 9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7, -1, -1, -1, -1, 7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2, -1, 2, 5, 10, 2, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, 8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5, -1, -1, -1, -1, 9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2, -1, -1, -1, -1, 9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2, -1, 1, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 7, 0, 7, 1, 1, 7, 5, -1, -1, -1, -1, -1, -1, -1, 9, 0, 3, 9, 3, 5, 5, 3, 7, -1, -1, -1, -1, -1, -1, -1, 9, 8, 7, 5, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 4, 5, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, 5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0, -1, -1, -1, -1, 0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5, -1, -1, -1, -1, 10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4, -1, 2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8, -1, -1, -1, -1, 0, 4, 11, 0, 11, 3, 4, 5, 11, 2, 11, 1, 5, 1, 11, -1, 0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5, -1, 9, 4, 5, 2, 11, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4, -1, -1, -1, -1, 5, 10, 2, 5, 2, 4, 4, 2, 0, -1, -1, -1, -1, -1, -1, -1, 3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9, -1, 5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 3, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 4, 5, 1, 0, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5, -1, -1, -1, -1, 9, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 11, 7, 4, 9, 11, 9, 10, 11, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11, -1, -1, -1, -1, 1, 10, 11, 1, 11, 4, 1, 4, 0, 7, 4, 11, -1, -1, -1, -1, 3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4, -1, 4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2, -1, -1, -1, -1, 9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3, -1, 11, 7, 4, 11, 4, 2, 2, 4, 0, -1, -1, -1, -1, -1, -1, -1, 11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4, -1, -1, -1, -1, 2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9, -1, -1, -1, -1, 9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7, -1, 3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10, -1, 1, 10, 2, 8, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 7, 1, 3, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1, -1, -1, -1, -1, 4, 0, 3, 7, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 11, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 1, 10, 0, 10, 8, 8, 10, 11, -1, -1, -1, -1, -1, -1, -1, 3, 1, 10, 11, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 11, 1, 11, 9, 9, 11, 8, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9, -1, -1, -1, -1, 0, 2, 11, 8, 0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 10, 8, 9, -1, -1, -1, -1, -1, -1, -1, 9, 10, 2, 0, 9, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8, -1, -1, -1, -1, 1, 10, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 8, 9, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]), THREE.Trident = function(e) {
    function t(t) {
        return new THREE.Mesh(new THREE.Cylinder(30, .1, e.length / 20, e.length / 5), new THREE.MeshBasicMaterial({
            color: t
        }))
    }

    function i(e, t) {
        var i = new THREE.Geometry;
        return i.vertices = [new THREE.Vertex, new THREE.Vertex(e)], new THREE.Line(i, new THREE.LineBasicMaterial({
            color: t
        }))
    }
    THREE.Object3D.call(this);
    var n, r = Math.PI / 2;
    if ((e = e || THREE.Trident.defaultParams) !== THREE.Trident.defaultParams)
        for (n in THREE.Trident.defaultParams) e.hasOwnProperty(n) || (e[n] = THREE.Trident.defaultParams[n]);
    this.scale = new THREE.Vector3(e.scale, e.scale, e.scale), this.addChild(i(new THREE.Vector3(e.length, 0, 0), e.xAxisColor)), this.addChild(i(new THREE.Vector3(0, e.length, 0), e.yAxisColor)), this.addChild(i(new THREE.Vector3(0, 0, e.length), e.zAxisColor)), e.showArrows && ((n = t(e.xAxisColor)).rotation.y = -r, n.position.x = e.length, this.addChild(n), (n = t(e.yAxisColor)).rotation.x = r, n.position.y = e.length, this.addChild(n), (n = t(e.zAxisColor)).rotation.y = Math.PI, n.position.z = e.length, this.addChild(n))
}, THREE.Trident.prototype = new THREE.Object3D, THREE.Trident.prototype.constructor = THREE.Trident, THREE.Trident.defaultParams = {
    xAxisColor: 16711680,
    yAxisColor: 65280,
    zAxisColor: 255,
    showArrows: !0,
    length: 100,
    scale: 1
}, THREE.PlaneCollider = function(e, t) {
    this.point = e, this.normal = t
}, THREE.SphereCollider = function(e, t) {
    this.center = e, this.radius = t, this.radiusSq = t * t
}, THREE.BoxCollider = function(e, t) {
    this.min = e, this.max = t, this.dynamic = !0, this.normal = new THREE.Vector3
}, THREE.MeshCollider = function(e, t, i, n) {
    this.vertices = e, this.faces = t, this.normals = i, this.box = n, this.numFaces = this.faces.length, this.normal = new THREE.Vector3
}, THREE.CollisionSystem = function() {
    this.collisionNormal = new THREE.Vector3, this.colliders = [], this.hits = []
}, THREE.Collisions = new THREE.CollisionSystem, THREE.CollisionSystem.prototype.merge = function(e) {
    this.colliders = this.colliders.concat(e.colliders), this.hits = this.hits.concat(e.hits)
}, THREE.CollisionSystem.prototype.rayCastAll = function(e) {
    e.direction.normalize(), this.hits.length = 0;
    var t, i, n, r, o = 0;
    for (t = 0, i = this.colliders.length; t < i; t++) r = this.colliders[t], (n = this.rayCast(e, r)) < Number.MAX_VALUE && (r.distance = n, n > o ? this.hits.push(r) : this.hits.unshift(r), o = n);
    return this.hits
}, THREE.CollisionSystem.prototype.rayCastNearest = function(e) {
    var t = this.rayCastAll(e);
    if (0 == t.length) return null;
    for (var i = 0; t[i] instanceof THREE.MeshCollider;) {
        var n = this.rayMesh(e, t[i]);
        if (n < Number.MAX_VALUE) {
            t[i].distance = n;
            break
        }
        i++
    }
    return i > t.length ? null : t[i]
}, THREE.CollisionSystem.prototype.rayCast = function(e, t) {
    return t instanceof THREE.PlaneCollider ? this.rayPlane(e, t) : t instanceof THREE.SphereCollider ? this.raySphere(e, t) : t instanceof THREE.BoxCollider ? this.rayBox(e, t) : t instanceof THREE.MeshCollider && t.box ? this.rayBox(e, t.box) : void 0
}, THREE.CollisionSystem.prototype.rayMesh = function(e, t) {
    for (var i = this.makeRayLocal(e, t.mesh), n = Number.MAX_VALUE, r = 0; r < t.numFaces / 3; r++) {
        var o = 3 * r;
        (o = this.rayTriangle(i, t.vertices[t.faces[o + 0]], t.vertices[t.faces[o + 1]], t.vertices[t.faces[o + 2]], n, this.collisionNormal)) < n && (n = o, t.normal.copy(this.collisionNormal), t.normal.normalize())
    }
    return n
}, THREE.CollisionSystem.prototype.rayTriangle = function(e, t, i, n, r, o) {
    var a = THREE.CollisionSystem.__v1,
        s = THREE.CollisionSystem.__v2;
    return o.set(0, 0, 0), a.sub(i, t), s.sub(n, i), o.cross(a, s), (s = o.dot(e.direction)) < 0 && (a = o.dot(t) - o.dot(e.origin)) <= 0 && a >= s * r ? (a /= s, (s = THREE.CollisionSystem.__v3).copy(e.direction), s.multiplyScalar(a), s.addSelf(e.origin), Math.abs(o.x) > Math.abs(o.y) ? Math.abs(o.x) > Math.abs(o.z) ? (e = s.y - t.y, o = i.y - t.y, r = n.y - t.y, s = s.z - t.z, i = i.z - t.z, n = n.z - t.z) : (e = s.x - t.x, o = i.x - t.x, r = n.x - t.x, s = s.y - t.y, i = i.y - t.y, n = n.y - t.y) : Math.abs(o.y) > Math.abs(o.z) ? (e = s.x - t.x, o = i.x - t.x, r = n.x - t.x, s = s.z - t.z, i = i.z - t.z, n = n.z - t.z) : (e = s.x - t.x, o = i.x - t.x, r = n.x - t.x, s = s.y - t.y, i = i.y - t.y, n = n.y - t.y), 0 == (t = o * n - i * r) ? Number.MAX_VALUE : (t = 1 / t, (n = (e * n - s * r) * t) >= 0 ? (t *= o * s - i * e, t >= 0 && 1 - n - t >= 0 ? a : Number.MAX_VALUE) : Number.MAX_VALUE)) : Number.MAX_VALUE
}, THREE.CollisionSystem.prototype.makeRayLocal = function(e, t) {
    var i = THREE.CollisionSystem.__m;
    THREE.Matrix4.makeInvert(t.matrixWorld, i);
    var n = THREE.CollisionSystem.__r;
    return n.origin.copy(e.origin), n.direction.copy(e.direction), i.multiplyVector3(n.origin), i.rotateAxis(n.direction), n.direction.normalize(), n
}, THREE.CollisionSystem.prototype.rayBox = function(e, t) {
    var i;
    t.dynamic && t.mesh && t.mesh.matrixWorld ? i = this.makeRayLocal(e, t.mesh) : ((i = THREE.CollisionSystem.__r).origin.copy(e.origin), i.direction.copy(e.direction));
    var n = 0,
        r = 0,
        o = 0,
        a = 0,
        s = 0,
        l = 0,
        h = !0;
    if (i.origin.x < t.min.x ? (n = t.min.x - i.origin.x, n /= i.direction.x, h = !1, a = -1) : i.origin.x > t.max.x && (n = t.max.x - i.origin.x, n /= i.direction.x, h = !1, a = 1), i.origin.y < t.min.y ? (r = t.min.y - i.origin.y, r /= i.direction.y, h = !1, s = -1) : i.origin.y > t.max.y && (r = t.max.y - i.origin.y, r /= i.direction.y, h = !1, s = 1), i.origin.z < t.min.z ? (o = t.min.z - i.origin.z, o /= i.direction.z, h = !1, l = -1) : i.origin.z > t.max.z && (o = t.max.z - i.origin.z, o /= i.direction.z, h = !1, l = 1), h) return -1;
    switch (h = 0, r > n && (h = 1, n = r), o > n && (h = 2, n = o), h) {
        case 0:
            if ((s = i.origin.y + i.direction.y * n) < t.min.y || s > t.max.y) return Number.MAX_VALUE;
            if ((i = i.origin.z + i.direction.z * n) < t.min.z || i > t.max.z) return Number.MAX_VALUE;
            t.normal.set(a, 0, 0);
            break;
        case 1:
            if ((a = i.origin.x + i.direction.x * n) < t.min.x || a > t.max.x) return Number.MAX_VALUE;
            if ((i = i.origin.z + i.direction.z * n) < t.min.z || i > t.max.z) return Number.MAX_VALUE;
            t.normal.set(0, s, 0);
            break;
        case 2:
            if ((a = i.origin.x + i.direction.x * n) < t.min.x || a > t.max.x) return Number.MAX_VALUE;
            if ((s = i.origin.y + i.direction.y * n) < t.min.y || s > t.max.y) return Number.MAX_VALUE;
            t.normal.set(0, 0, l)
    }
    return n
}, THREE.CollisionSystem.prototype.rayPlane = function(e, t) {
    var i = e.direction.dot(t.normal),
        n = t.point.dot(t.normal);
    return i < 0 ? (i = (n - e.origin.dot(t.normal)) / i, i > 0 ? i : Number.MAX_VALUE) : Number.MAX_VALUE
}, THREE.CollisionSystem.prototype.raySphere = function(e, t) {
    var i = t.center.clone().subSelf(e.origin);
    if (i.lengthSq < t.radiusSq) return -1;
    var n = i.dot(e.direction.clone());
    return n <= 0 ? Number.MAX_VALUE : (i = t.radiusSq - (i.lengthSq() - n * n), i >= 0 ? Math.abs(n) - Math.sqrt(i) : Number.MAX_VALUE)
}, THREE.CollisionSystem.__v1 = new THREE.Vector3, THREE.CollisionSystem.__v2 = new THREE.Vector3, THREE.CollisionSystem.__v3 = new THREE.Vector3, THREE.CollisionSystem.__nr = new THREE.Vector3, THREE.CollisionSystem.__m = new THREE.Matrix4, THREE.CollisionSystem.__r = new THREE.Ray, THREE.CollisionUtils = {}, THREE.CollisionUtils.MeshOBB = function(e) {
    e.geometry.computeBoundingBox();
    var t = e.geometry.boundingBox,
        i = new THREE.Vector3(t.x[0], t.y[0], t.z[0]);
    return t = new THREE.Vector3(t.x[1], t.y[1], t.z[1]), i = new THREE.BoxCollider(i, t), i.mesh = e, i
}, THREE.CollisionUtils.MeshAABB = function(e) {
    var t = THREE.CollisionUtils.MeshOBB(e);
    return t.min.addSelf(e.position), t.max.addSelf(e.position), t.dynamic = !1, t
}, THREE.CollisionUtils.MeshColliderWBox = function(e) {
    for (var t = e.geometry.vertices, i = t.length, n = e.geometry.faces, r = n.length, o = [], a = [], s = [], l = 0; l < i; l++) o.push(new THREE.Vector3(t[l].position.x, t[l].position.y, t[l].position.z));
    for (l = 0; l < r; l++) a.push(n[l].a, n[l].b, n[l].c), s.push(new THREE.Vector3(n[l].normal.x, n[l].normal.y, n[l].normal.z));
    return t = new THREE.MeshCollider(o, a, s, THREE.CollisionUtils.MeshOBB(e)), t.mesh = e, t
}, window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
    window.setTimeout(e, 1e3 / 60)
}), Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: function() {
        try {
            return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
        } catch (e) {
            return !1
        }
    }(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function() {
        var e = document.createElement("div");
        return e.style.fontFamily = "monospace", e.style.fontSize = "13px", e.style.textAlign = "center", e.style.background = "#eee", e.style.color = "#000", e.style.padding = "1em", e.style.width = "475px", e.style.margin = "5em auto 0", this.webgl || (e.innerHTML = window.WebGLRenderingContext ? ['Sorry, your graphics card doesn\'t support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>'].join("\n") : ['Sorry, your browser doesn\'t support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a><br/>', "Please try with", '<a href="http://www.google.com/chrome">Chrome</a>, ', '<a href="http://www.mozilla.com/en-US/firefox/new/">Firefox 4</a> or', '<a href="http://nightly.webkit.org/">Webkit Nightly (Mac)</a>'].join("\n")), e
    },
    addGetWebGLMessage: function(e) {
        var t, i, n;
        t = void 0 !== (e = e || {}).parent ? e.parent : document.body, i = void 0 !== e.id ? e.id : "oldie", (n = Detector.getWebGLErrorMessage()).id = i, t.appendChild(n)
    }
};
var TWEEN = TWEEN || function() {
    var e, t, i, n, r = [];
    return {
        start: function(e) {
            i = setInterval(this.update, 1e3 / (e || 60))
        },
        stop: function() {
            clearInterval(i)
        },
        add: function(e) {
            r.push(e)
        },
        remove: function(t) {
            -1 !== (e = r.indexOf(t)) && r.splice(e, 1)
        },
        update: function() {
            for (e = 0, t = r.length, n = (new Date).getTime(); e < t;) r[e].update(n) ? e++ : (r.splice(e, 1), t--)
        }
    }
}();
TWEEN.Tween = function(e) {
    var t = {},
        i = {},
        n = {},
        r = 1e3,
        o = 0,
        a = null,
        s = TWEEN.Easing.Linear.EaseNone,
        l = null,
        h = null,
        c = null;
    this.to = function(t, i) {
        null !== i && (r = i);
        for (var o in t) null !== e[o] && (n[o] = t[o]);
        return this
    }, this.start = function() {
        TWEEN.add(this), a = (new Date).getTime() + o;
        for (var r in n) null !== e[r] && (t[r] = e[r], i[r] = n[r] - e[r]);
        return this
    }, this.stop = function() {
        return TWEEN.remove(this), this
    }, this.delay = function(e) {
        return o = e, this
    }, this.easing = function(e) {
        return s = e, this
    }, this.chain = function(e) {
        l = e
    }, this.onUpdate = function(e) {
        return h = e, this
    }, this.onComplete = function(e) {
        return c = e, this
    }, this.update = function(n) {
        var o, u;
        if (n < a) return !0;
        u = s(n = (n = (n - a) / r) > 1 ? 1 : n);
        for (o in i) e[o] = t[o] + i[o] * u;
        return null !== h && h.call(e, u), 1 != n || (null !== c && c.call(e), null !== l && l.start(), !1)
    }
}, TWEEN.Easing = {
    Linear: {},
    Quadratic: {},
    Cubic: {},
    Quartic: {},
    Quintic: {},
    Sinusoidal: {},
    Exponential: {},
    Circular: {},
    Elastic: {},
    Back: {},
    Bounce: {}
}, TWEEN.Easing.Linear.EaseNone = function(e) {
    return e
}, TWEEN.Easing.Quadratic.EaseIn = function(e) {
    return e * e
}, TWEEN.Easing.Quadratic.EaseOut = function(e) {
    return -e * (e - 2)
}, TWEEN.Easing.Quadratic.EaseInOut = function(e) {
    return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
}, TWEEN.Easing.Cubic.EaseIn = function(e) {
    return e * e * e
}, TWEEN.Easing.Cubic.EaseOut = function(e) {
    return --e * e * e + 1
}, TWEEN.Easing.Cubic.EaseInOut = function(e) {
    return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
}, TWEEN.Easing.Quartic.EaseIn = function(e) {
    return e * e * e * e
}, TWEEN.Easing.Quartic.EaseOut = function(e) {
    return -(--e * e * e * e - 1)
}, TWEEN.Easing.Quartic.EaseInOut = function(e) {
    return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
}, TWEEN.Easing.Quintic.EaseIn = function(e) {
    return e * e * e * e * e
}, TWEEN.Easing.Quintic.EaseOut = function(e) {
    return (e -= 1) * e * e * e * e + 1
}, TWEEN.Easing.Quintic.EaseInOut = function(e) {
    return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
}, TWEEN.Easing.Sinusoidal.EaseIn = function(e) {
    return 1 - Math.cos(e * Math.PI / 2)
}, TWEEN.Easing.Sinusoidal.EaseOut = function(e) {
    return Math.sin(e * Math.PI / 2)
}, TWEEN.Easing.Sinusoidal.EaseInOut = function(e) {
    return -.5 * (Math.cos(Math.PI * e) - 1)
}, TWEEN.Easing.Exponential.EaseIn = function(e) {
    return 0 == e ? 0 : Math.pow(2, 10 * (e - 1))
}, TWEEN.Easing.Exponential.EaseOut = function(e) {
    return 1 == e ? 1 : 1 - Math.pow(2, -10 * e)
}, TWEEN.Easing.Exponential.EaseInOut = function(e) {
    return 0 == e ? 0 : 1 == e ? 1 : (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
}, TWEEN.Easing.Circular.EaseIn = function(e) {
    return -(Math.sqrt(1 - e * e) - 1)
}, TWEEN.Easing.Circular.EaseOut = function(e) {
    return Math.sqrt(1 - --e * e)
}, TWEEN.Easing.Circular.EaseInOut = function(e) {
    return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
}, TWEEN.Easing.Elastic.EaseIn = function(e) {
    var t, i = .1,
        n = .4;
    return 0 == e ? 0 : 1 == e ? 1 : (n || (n = .3), !i || i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), -i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n))
}, TWEEN.Easing.Elastic.EaseOut = function(e) {
    var t, i = .1,
        n = .4;
    return 0 == e ? 0 : 1 == e ? 1 : (n || (n = .3), !i || i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * e) * Math.sin(2 * (e - t) * Math.PI / n) + 1)
}, TWEEN.Easing.Elastic.EaseInOut = function(e) {
    var t, i = .1,
        n = .4;
    return 0 == e ? 0 : 1 == e ? 1 : (n || (n = .3), !i || i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), (e *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n) : i * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n) * .5 + 1)
}, TWEEN.Easing.Back.EaseIn = function(e) {
    return e * e * (2.70158 * e - 1.70158)
}, TWEEN.Easing.Back.EaseOut = function(e) {
    return (e -= 1) * e * (2.70158 * e + 1.70158) + 1
}, TWEEN.Easing.Back.EaseInOut = function(e) {
    return (e *= 2) < 1 ? .5 * e * e * (3.5949095 * e - 2.5949095) : .5 * ((e -= 2) * e * (3.5949095 * e + 2.5949095) + 2)
}, TWEEN.Easing.Bounce.EaseIn = function(e) {
    return 1 - TWEEN.Easing.Bounce.EaseOut(1 - e)
}, TWEEN.Easing.Bounce.EaseOut = function(e) {
    return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
}, TWEEN.Easing.Bounce.EaseInOut = function(e) {
    return e < .5 ? .5 * TWEEN.Easing.Bounce.EaseIn(2 * e) : .5 * TWEEN.Easing.Bounce.EaseOut(2 * e - 1) + .5
};
var SPIN_ID = 0,
    DAT = DAT || {};
DAT.Globe = function(e, t) {
    function i(e, t, i, n, r) {
        var o = (90 - e) * Math.PI / 180,
            a = (180 - t) * Math.PI / 180;
        for (x.position.x = 200 * Math.sin(o) * Math.cos(a), x.position.y = 200 * Math.cos(o), x.position.z = 200 * Math.sin(o) * Math.sin(a), x.lookAt(R.position), x.scale.z = .01, x.scale.x = .07 * i, x.scale.y = .07 * i, x.updateMatrix(), s = 0; s < x.geometry.faces.length; s++) x.geometry.faces[s].color = n;
        line.position.x = 200 * Math.sin(o) * Math.cos(a), line.position.y = 200 * Math.cos(o), line.position.z = 200 * Math.sin(o) * Math.sin(a), line.lookAt(R.position), line.scale.z = -i, line.scale.x = .01 * i, line.scale.y = .01 * i, line.updateMatrix();
        var s;
        for (s = 0; s < line.geometry.faces.length; s++) line.geometry.faces[s].color = n;
        GeometryUtils.merge(r, x), GeometryUtils.merge(r, line)
    }

    function n(t) {
        t.preventDefault(), e.addEventListener("mousemove", r, !1), e.addEventListener("mouseup", o, !1), e.addEventListener("mouseout", a, !1), S.x = -t.clientX, S.y = t.clientY, L.x = C.x, L.y = C.y, e.style.cursor = "move"
    }

    function r(e) {
        M.x = -e.clientX, M.y = e.clientY;
        var t = F / 1e3;
        C.x = L.x + .005 * (M.x - S.x) * t, C.y = L.y + .005 * (M.y - S.y) * t, C.y = C.y > V ? V : C.y, C.y = C.y < -V ? -V : C.y
    }

    function o(t) {
        e.removeEventListener("mousemove", r, !1), e.removeEventListener("mouseup", o, !1), e.removeEventListener("mouseout", a, !1), e.style.cursor = "auto"
    }

    function a(t) {
        e.removeEventListener("mousemove", r, !1), e.removeEventListener("mouseup", o, !1), e.removeEventListener("mouseout", a, !1)
    }

    function s(e) {
        return e.preventDefault(), _ && c(.3 * e.wheelDeltaY), !1
    }

    function l(e) {
        switch (e.keyCode) {
            case 38:
                c(100), e.preventDefault();
                break;
            case 40:
                c(-100), e.preventDefault()
        }
    }

    function h(e) {
        E.aspect = window.innerWidth / window.innerHeight, E.updateProjectionMatrix(), v.setSize(window.innerWidth, window.innerHeight)
    }

    function c(e) {
        z = (z = (z -= e) > 1e3 ? 1e3 : z) < 350 ? 350 : z
    }

    function u() {
        C.x -= .002
    }

    function f() {
        requestAnimationFrame(f), d()
    }

    function d() {
        c(w), A.x += .1 * (C.x - A.x), A.y += .1 * (C.y - A.y), F += .3 * (z - F), E.position.x = F * Math.sin(A.x) * Math.cos(A.y), E.position.y = F * Math.sin(A.y), E.position.z = F * Math.cos(A.x) * Math.cos(A.y), y.copy(E.position), v.clear(), v.render(p, E), v.render(m, E)
    }
    t = t || function(e) {
        var t = new THREE.Color;
        return t.setHSV(.93 - .09 * e, 1, 1), t
    };
    var E, p, m, v, g, T, y, R, x, _, b = {
            earth: {
                uniforms: {
                    texture: {
                        type: "t",
                        value: 0,
                        texture: null
                    }
                },
                vertexShader: ["varying vec3 vNormal;", "varying vec2 vUv;", "void main() {", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "vNormal = normalize( normalMatrix * normal );", "vUv = uv;", "}"].join("\n"),
                fragmentShader: ["uniform sampler2D texture;", "varying vec3 vNormal;", "varying vec2 vUv;", "void main() {", "vec3 diffuse = texture2D( texture, vUv ).xyz;", "float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );", "vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );", "gl_FragColor = vec4( diffuse + atmosphere, 1.0 );", "}"].join("\n")
            },
            atmosphere: {
                uniforms: {},
                vertexShader: ["varying vec3 vNormal;", "void main() {", "vNormal = normalize( normalMatrix * normal );", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
                fragmentShader: ["varying vec3 vNormal;", "void main() {", "float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );", "gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;", "}"].join("\n")
            }
        },
        H = "assets/img/",
        w = 0,
        M = {
            x: 0,
            y: 0
        },
        S = {
            x: 0,
            y: 0
        },
        A = {
            x: 0,
            y: 0
        },
        C = {
            x: .7 * Math.PI,
            y: Math.PI / 6
        },
        L = {
            x: 0,
            y: 0
        },
        F = 1e5,
        z = 1e5,
        V = Math.PI / 2;
    return addData = function(e, n) {
        var r, o, a, s, l, h;
        h = function(e, i) {
            return t(e[i + 2])
        };
        var c = new THREE.Geometry;
        for (l = 0; l < e.length; l += 3) r = e[l], o = e[l + 1], s = h(e, l), a = e[l + 2], i(r, o, a *= 10, s, c);
        this._baseGeometry = c
    },
        function() {
            e.style.color = "#fff", e.style.font = "13px/20px Arial, sans-serif";
            var t;
            g = e.offsetWidth || window.innerWidth, T = e.offsetHeight || window.innerHeight, (E = new THREE.Camera(30, g / T, 1, 1e4)).position.z = F, y = new THREE.Vector3, p = new THREE.Scene, m = new THREE.Scene;
            var i = new THREE.Sphere(200, 60, 40);
            d = b.earth, (t = THREE.UniformsUtils.clone(d.uniforms)).texture.texture = THREE.ImageUtils.loadTexture(H + "world.jpg"), w = new THREE.MeshShaderMaterial({
                uniforms: t,
                vertexShader: d.vertexShader,
                fragmentShader: d.fragmentShader
            }), (R = new THREE.Mesh(i, w)).matrixAutoUpdate = !1, p.addObject(R), d = b.atmosphere, t = THREE.UniformsUtils.clone(d.uniforms), w = new THREE.MeshShaderMaterial({
                uniforms: t,
                vertexShader: d.vertexShader,
                fragmentShader: d.fragmentShader
            }), (R = new THREE.Mesh(i, w)).scale.x = R.scale.y = R.scale.z = 1.09, R.flipSided = !0, R.matrixAutoUpdate = !1, R.updateMatrix(), m.addObject(R), i = new THREE.Cylinder(1, 1, .1, 1);
            for (var r = new THREE.Cylinder(5, .4, .2, 1.5), o = 0; o < i.vertices.length; o++)(a = i.vertices[o]).position.z += .5;
            for (o = 0; o < r.vertices.length; o++) {
                var a = r.vertices[o];
                a.position.z += .5
            }
            x = new THREE.Mesh(i), line = new THREE.Mesh(r);
            var c = [H + "stars.jpg", H + "stars.jpg", H + "stars.jpg", H + "stars.jpg", H + "stars.jpg", H + "stars.jpg"],
                f = THREE.ImageUtils.loadTextureCube(c),
                d = THREE.ShaderUtils.lib.cube;
            (t = THREE.UniformsUtils.clone(d.uniforms)).tCube.texture = f;
            var w = new THREE.MeshShaderMaterial({
                fragmentShader: d.fragmentShader,
                vertexShader: d.vertexShader,
                uniforms: t
            });
            skyboxMesh = new THREE.Mesh(new THREE.Cube(2e3, 2e3, 2e3, 1, 1, 1, null, !0), w), p.addObject(skyboxMesh), (v = new THREE.WebGLRenderer({
                antialias: !0
            })).autoClear = !1, v.setClearColorHex(0, 0), v.setSize(g, T), v.domElement.style.position = "absolute", e.appendChild(v.domElement), e.addEventListener("mousedown", n, !1), e.addEventListener("mousewheel", s, !1), document.addEventListener("keydown", l, !1), window.addEventListener("resize", h, !1), e.addEventListener("mouseover", function() {
                _ = !0
            }, !1), e.addEventListener("mouseout", function() {
                _ = !1
            }, !1), SPIN_ID = setInterval(function() {
                u()
            }, 1e3 / 60)
        }(), this.animate = f, this.addData = addData, this.createPoints = function() {
        void 0 !== this._baseGeometry && (this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
            color: 16777215,
            vertexColors: THREE.FaceColors,
            morphTargets: !1
        })), p.addObject(this.points))
    }, this.renderer = v, this.scene = p, this
};


var tempData, count = 20, newQuakes = 0, interval;


if (Detector.webgl) {
    // var container = document.getElementById("container"),
    //     xhr;
    // 	tempData = null, globe = new DAT.Globe(container), globe.animate(), updateData(), interval && clearInterval(interval), interval = setInterval(function() {
    //     // updateData()
    // }, 6e4)
} else Detector.addGetWebGLMessage();
$(document).ready(function() {
    ! function() {
        "use strict";
        // for (var e = document.querySelectorAll(".info"), t = e.length - 1; t >= 0; t--) e[t].addEventListener("click", function(e) {
        //     e.preventDefault(), !0 === this.classList.contains("is-active") ? closeMenu() : openMenu()
        // });
        //
        // for (var e = document.querySelectorAll(".info-2"), t = e.length - 1; t >= 0; t--) e[t].addEventListener("click", function(e) {
        //     e.preventDefault(), !0 === this.classList.contains("is-active") ? closeMenu() : openMenu()
        // });
        //
        // $("#fullpage").fullpage({
        //     navigation: !0,
        //     scrollingSpeed: 1e3
        //     // navigationTooltips: ["O QUE É?", "DIFERENCIAL", "COMO USAR?", "FIP MONITORAMENTO", "EQUIPE"]
        // });
        //
        // $(".section").removeClass("active")

        // $("#dpat-nav li a").each(function(e, t) {
        //     $(this).append('<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" id="Camada_1" data-name="Camada 1" viewBox="0 0 96 96"><polygon xmlns="http://www.w3.org/2000/svg" class="cls-6" points="57.52 13.47 43.67 13.47 36.75 25.46 43.67 37.45 57.52 37.45 64.44 25.46 57.52 13.47" /></svg>')
        //     // $(this).append('<svg width="30" height="30"><circle cx="15" cy="15" r="11.5"></circle></svg>')
        // })
    }()
});