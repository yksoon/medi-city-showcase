"use strict";
(self.webpackChunkkr_co_medi_city_showcase =
  self.webpackChunkkr_co_medi_city_showcase || []).push([
  [65],
  {
    6065: function (e, s, n) {
      n.r(s),
        n.d(s, {
          default: function () {
            return E;
          },
        });
      var i = n(9439),
        a = n(7313),
        t = n(4488),
        l = n(5281),
        r = n(2705),
        c = n(8625),
        d = n(2135),
        o = n(2213),
        j = n(8418),
        h = n(8804),
        u = n(5749),
        x = n(6417),
        m = function () {
          var e = (0, c.Z)().alert,
            s = (0, r.jn)(),
            n = (0, h.Zl)(u.BY),
            m = (0, h.sJ)(u.pp),
            p = (0, a.useState)([]),
            g = (0, i.Z)(p, 2),
            f = g[0],
            _ = g[1],
            b = (0, a.useState)(!1),
            v = (0, i.Z)(b, 2),
            w = v[0],
            N = v[1],
            k = (0, a.useState)(""),
            y = (0, i.Z)(k, 2),
            U = y[0],
            C = y[1],
            Z = (0, a.useState)(!1),
            S = (0, i.Z)(Z, 2),
            M = S[0],
            F = S[1],
            I = (0, a.useState)(null),
            D = (0, i.Z)(I, 2),
            B = D[0],
            E = D[1],
            O = (0, a.useState)(!0),
            R = (0, i.Z)(O, 2),
            A = R[0],
            L = R[1],
            H = (0, a.useState)(!1),
            J = (0, i.Z)(H, 2),
            T = J[0],
            z = J[1];
          (0, a.useLayoutEffect)(
            function () {
              Y(1, 5);
            },
            [m],
          );
          var Y = function (e, n) {
            var i = {
              method: "post",
              url: j.H.api_admin_boards,
              data: {
                page_num: e,
                page_size: n,
                board_type: "000",
                admin_type: "N",
              },
              err: s,
              callback: function (e) {
                return a(e);
              },
            };
            (0, r.eO)(i);
            var a = function (e) {
              var s = e.headers.result_code;
              if (s === o.B.success || s === o.B.noData) {
                var n = e.data.result_info;
                _(n), L(!1);
              } else (0, r.lQ)("log", e);
            };
          };
          return (0, x.jsxs)(x.Fragment, {
            children: [
              (0, x.jsx)("div", {
                className: "section03",
                children: (0, x.jsxs)("div", {
                  className: "notice",
                  children: [
                    (0, x.jsx)("h3", { children: "\uacf5\uc9c0\uc0ac\ud56d" }),
                    (0, x.jsx)("ul", {
                      children: A
                        ? (0, x.jsxs)(x.Fragment, {
                            children: [
                              (0, x.jsx)("li", {
                                children: (0, x.jsx)(t.Z, {}),
                              }),
                              (0, x.jsx)("li", {
                                children: (0, x.jsx)(t.Z, {}),
                              }),
                              (0, x.jsx)("li", {
                                children: (0, x.jsx)(t.Z, {}),
                              }),
                            ],
                          })
                        : 0 !== f.length
                        ? f.map(function (i, a) {
                            return (0, x.jsxs)(
                              "li",
                              {
                                children: [
                                  (0, x.jsx)(d.rU, {
                                    id: "main_notice_".concat(a),
                                    onClick: function (a) {
                                      !(function (i, a) {
                                        z(!0);
                                        var t = String(i),
                                          l = {
                                            method: "get",
                                            url:
                                              j.H.api_admin_get_board +
                                              "/".concat(t),
                                            data: {},
                                            err: s,
                                            callback: function (e) {
                                              return c(e);
                                            },
                                          };
                                        (0, r.eO)(l);
                                        var c = function (s) {
                                          var i = s.headers.result_code,
                                            a = s.data.result_info;
                                          i === o.B.success
                                            ? (z(!1), E(a), C(a.subject), N(!0))
                                            : ((0, r.lQ)("log", s),
                                              n(!1),
                                              (0, r.o5)({
                                                type: "alert",
                                                hook: e,
                                                message:
                                                  s.headers.result_message_ko,
                                              }));
                                        };
                                      })(i.board_idx),
                                        a.preventDefault();
                                    },
                                    children: i.subject,
                                  }),
                                  (0, x.jsx)("span", {
                                    className: "date",
                                    children: i.reg_dttm.split(" ")[0],
                                  }),
                                ],
                              },
                              "main_notice_".concat(a),
                            );
                          })
                        : (0, x.jsx)("li", {
                            children: (0, x.jsx)("p", {
                              className: "notice_no",
                              children:
                                "\uacf5\uc9c0\uc0ac\ud56d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.",
                            }),
                          }),
                    }),
                  ],
                }),
              }),
              (0, x.jsx)(r.WK, {
                isOpen: w,
                title: U,
                width: "1400",
                handleModalClose: function () {
                  E(null), N(!1);
                },
                component: "MainContentsNoticeModal",
                handleNeedUpdate: function () {
                  F(!M);
                },
                modNotice: B,
              }),
              T &&
                (0, x.jsx)("div", {
                  className: "spinner",
                  children: (0, x.jsx)(l.Z, {}),
                }),
            ],
          });
        },
        p = n(4165),
        g = n(5861),
        f = n(281),
        _ = function () {
          var e = (0, a.useState)([]),
            s = (0, i.Z)(e, 2),
            n = s[0],
            t = s[1];
          (0, a.useEffect)(function () {
            l();
          }, []);
          var l = (function () {
            var e = (0, g.Z)(
              (0, p.Z)().mark(function e() {
                var s, n;
                return (0, p.Z)().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          "/jobara_company_list.xlsx",
                          (e.next = 3),
                          fetch("/jobara_company_list.xlsx")
                        );
                      case 3:
                        return (e.next = 5), e.sent.arrayBuffer();
                      case 5:
                        (s = e.sent),
                          (n = {
                            label: "companyLabel",
                            "\ubd80\uc2a4\ucc38\uc5ec\ubc88\ud638": "boothnum",
                            "\ubc29\uc2dd": "type",
                            "\uae30\uc5c5\uba85": "companyName",
                            "\ud648\ud398\uc774\uc9c0": "homepageUrl",
                          }),
                          (0, f.Z)(s, { map: n }).then(function (e) {
                            for (
                              var s = e.rows, n = [], i = s.length, a = 0;
                              a < i;
                              a++
                            )
                              s[a].companyLabel && n.push(s[a]);
                            t(n);
                          });
                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e);
              }),
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
          return (0, x.jsx)(x.Fragment, {
            children: (0, x.jsxs)("div", {
              className: "section02",
              children: [
                (0, x.jsx)("div", {
                  className: "bar01",
                  "data-aos": "fade-right",
                  "data-aos-delay": "400",
                  "data-aos-easing": "linear",
                  children: (0, x.jsx)("img", {
                    src: "img/web/main/bar_green.png",
                    alt: "",
                  }),
                }),
                (0, x.jsx)("div", {
                  className: "bar02",
                  "data-aos": "fade-left",
                  "data-aos-delay": "800",
                  "data-aos-easing": "linear",
                  children: (0, x.jsx)("img", {
                    src: "img/web/main/bar_blue.png",
                    alt: "",
                  }),
                }),
                (0, x.jsx)("div", {
                  className: "cloud",
                  children: (0, x.jsx)("img", {
                    src: "img/web/main/cloud_pink.png",
                    alt: "",
                  }),
                }),
                (0, x.jsxs)("div", {
                  className: "program",
                  children: [
                    (0, x.jsx)("h3", { children: "\ud504\ub85c\uadf8\ub7a8" }),
                    (0, x.jsxs)("ul", {
                      children: [
                        (0, x.jsxs)("li", {
                          className: "p01",
                          "data-aos": "flip-left",
                          children: [
                            (0, x.jsx)("span", {
                              className: "num",
                              children: "01",
                            }),
                            "\uc9c4\ub85c\ud0d0\uc0c9",
                            (0, x.jsx)("span", {
                              className: "icon",
                              children: (0, x.jsx)("img", {
                                src: "img/web/main/picon01.png",
                                alt: "",
                              }),
                            }),
                            (0, x.jsxs)("div", {
                              children: [
                                (0, x.jsx)("h5", {
                                  children:
                                    "\ub098\ub97c \uc54c\uc544\uc57c \ubc31\uc804\ubc31\uc2b9!",
                                }),
                                (0, x.jsx)("p", {
                                  children:
                                    "\ub0b4\uac00 \ud558\uace0\uc2f6\uc740 \uc9c1\ubb34 \ub610\ub294 \ub0b4\uac00 \uc798 \ud560 \uc218 \uc788\ub294 \uc9c1\ubb34\uac00 \ubb34\uc5c7\uc778\uc9c0 \uad81\uae08\ud558\ub2e4\uba74 \ud604\uc7a5\uc5d0\uc11c \uac80\uc0ac\ud574\ubcf4\uc790",
                                }),
                                (0, x.jsx)("h5", {
                                  children:
                                    "\uc774\ub825\uc11c \ubc0f \uc790\uae30\uc18c\uac1c\uc11c \ucee8\uc124\ud305!",
                                }),
                                (0, x.jsx)("p", {
                                  children:
                                    "\uc790\uc18c\uc11c\ub3c4 \uc798 \uc368\uc57c \uc5b4\ud544\ud560 \uc218 \uc788\ub2e4 \uc804\ubb38\uac00 \ucee8\uc124\ud134\ud2b8\ubd84\ub4e4\uaed8 \uc0c1\ub2f4\ubc1b\uace0 \uc11c\ub958 \ubc14\ub85c \ud1b5\uacfc\ud574\ubcf4\uc790~!",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, x.jsxs)("li", {
                          className: "p02",
                          "data-aos": "flip-left",
                          "data-aos-delay": "300",
                          children: [
                            (0, x.jsx)("span", {
                              className: "num",
                              children: "02",
                            }),
                            "\uae30\uc5c5\ud0d0\uc0c9",
                            (0, x.jsx)("span", {
                              className: "icon",
                              children: (0, x.jsx)("img", {
                                src: "img/web/main/picon02.png",
                                alt: "",
                              }),
                            }),
                            (0, x.jsxs)("div", {
                              children: [
                                (0, x.jsx)("h5", {
                                  children:
                                    "\ucc44\uc6a9\uc815\ubcf4 \ubc0f \uc0c1\ub2f4",
                                }),
                                (0, x.jsx)("p", {
                                  children:
                                    "\ub3c4\ub0b4\uc678 \uae30\uc5c5\ub4e4\uc758 \uc815\ubcf4\ub97c \ud655\uc778\ud558\uace0 \ucc44\uc6a9\uacc4\ud68d\ub3c4 \uc0b4\ud3b4\ubcf4\uae30",
                                }),
                                (0, x.jsx)("h5", {
                                  children: "\uae00\ub85c\ubc8c JOB FAIR",
                                }),
                                (0, x.jsx)("p", {
                                  children:
                                    "\uae00\ub85c\ubc8c \ucc44\uc6a9 \uc0c1\ub2f4 \ubc0f \uc778\ud134\uc2ed\uc5d0 \uad00\uc2ec\uc774 \uc788\ub2e4\uba74",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, x.jsxs)("li", {
                          className: "p03",
                          "data-aos": "flip-left",
                          "data-aos-delay": "600",
                          children: [
                            (0, x.jsx)("span", {
                              className: "num",
                              children: "03",
                            }),
                            "AI \uba74\uc811\uccb4\ud5d8",
                            (0, x.jsx)("span", {
                              className: "icon",
                              children: (0, x.jsx)("img", {
                                src: "img/web/main/picon03.png",
                                alt: "",
                              }),
                            }),
                            (0, x.jsxs)("div", {
                              children: [
                                (0, x.jsx)("h5", {
                                  children:
                                    "\uc2e4\uc804 AI\uba74\uc811 \uccb4\ud5d8",
                                }),
                                (0, x.jsx)("p", {
                                  children:
                                    "AI\uba74\uc811 \uccb4\ud5d8\uc744 \ud558\uace0 \uba74\uc811 \ubd84\uc11d\uacb0\uacfc\uae4c\uc9c0 \ubc1b\uc544\ubcf4\uc790",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, x.jsxs)("li", {
                          className: "p04",
                          "data-aos": "flip-left",
                          "data-aos-delay": "900",
                          children: [
                            (0, x.jsx)("span", {
                              className: "num",
                              children: "04",
                            }),
                            "NCS \ubaa8\uc758\uace0\uc0ac",
                            (0, x.jsx)("span", {
                              className: "icon",
                              children: (0, x.jsx)("img", {
                                src: "img/web/main/picon04.png",
                                alt: "",
                              }),
                            }),
                            (0, x.jsxs)("div", {
                              children: [
                                (0, x.jsx)("h5", {
                                  children:
                                    "NCS \uc804\ub7b5 \ud2b9\uac15 \ubc0f \ubaa8\uc758\uace0\uc0ac",
                                }),
                                (0, x.jsxs)("p", {
                                  children: [
                                    "\uacf5\uacf5\uae30\uad00 \ubc0f \ub300\uae30\uc5c5 \ucde8\uc5c5 \ud76c\ub9dd\uc790\ub294 \ud544\uc218\ucf54\uc2a4\uc778 NCS \uc804\ub7b5 \ud2b9\uac15 \ubc1b\uace0 \ubaa8\uc758\uace0\uc0ac \ud480\uc5b4\ubcf4\uace0 \uc6b0\uc218\uc790\ub294 \uacbd\ud488\uae4c\uc9c0! ",
                                    (0, x.jsx)("br", {}),
                                    "\uc0ac\uc804 \uc2e0\uccad\ud558\uc138\uc694!",
                                    (0, x.jsx)("span", {
                                      children:
                                        "\uc2e0\uccad\uae30\uac04: ~ 9. 5.",
                                    }),
                                    (0, x.jsx)(d.rU, {
                                      to: j.j.web_signup_url,
                                      children:
                                        "\uc0ac\uc804\ub4f1\ub85d \ubc14\ub85c\uac00\uae30",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, x.jsxs)("li", {
                          className: "p05",
                          "data-aos": "flip-left",
                          "data-aos-delay": "1200",
                          children: [
                            (0, x.jsx)("span", {
                              className: "num",
                              children: "05",
                            }),
                            "\ud604\uc9c1\uc790 \ud1a0\ud06c\ucf58\uc11c\ud2b8",
                            (0, x.jsx)("span", {
                              className: "icon",
                              children: (0, x.jsx)("img", {
                                src: "img/web/main/picon05.png",
                                alt: "",
                              }),
                            }),
                            (0, x.jsx)("div", {
                              children: (0, x.jsxs)("p", {
                                children: [
                                  "\ub300\uae30\uc5c5 \ubc0f \uae00\ub85c\ubc8c\uae30\uc5c5\uc758 \ud604\uc9c1\uc790\ub97c \ub9cc\ub098\ubcfc \uc218 \uc788\ub294\uae30\ud68c!",
                                  (0, x.jsx)("br", {}),
                                  "\uc9c1\ubb34\ubcc4 \ub2e4\uc591\ud55c \uc774\uc57c\uae30\ub97c \ub4e4\uc5b4\ubcf4\uc790 ~!",
                                  (0, x.jsx)("br", {}),
                                  "\ud1a0\ud06c\ucf58\uc11c\ud2b8 \ud6c4 \uc18c\uaddc\ubaa8 \uba58\ud1a0\ub9c1\uae4c\uc9c0!",
                                  (0, x.jsx)("br", {}),
                                  "\uc0ac\uc804 \uc2e0\uccad\ud558\uc138\uc694!",
                                  (0, x.jsx)("span", {
                                    children:
                                      "\uc2e0\uccad\uae30\uac04: ~ 9. 5.",
                                  }),
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_signup_url,
                                    children:
                                      "\uc0ac\uc804\ub4f1\ub85d \ubc14\ub85c\uac00\uae30",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, x.jsxs)("li", {
                          className: "p06",
                          "data-aos": "flip-left",
                          "data-aos-delay": "1500",
                          children: [
                            (0, x.jsx)("span", {
                              className: "num",
                              children: "06",
                            }),
                            "\ubc14\ub85c \ucc44\uc6a9\uba74\uc811",
                            (0, x.jsx)("span", {
                              className: "icon",
                              children: (0, x.jsx)("img", {
                                src: "img/web/main/picon06.png",
                                alt: "",
                              }),
                            }),
                            (0, x.jsx)("div", {
                              children: (0, x.jsxs)("p", {
                                children: [
                                  "\ud604\uc7a5\uc5d0\uc11c \ubc14\ub85c \ucc44\uc6a9\ub418\uace0 \uc2f6\ub2e4\uba74 \uc11c\ub458\ub7ec \uc2e0\uccad\ud558\uc138\uc694!",
                                  (0, x.jsx)("br", {}),
                                  "\uc0ac\uc804 \uc11c\ub958 \uc2e0\uccad \ud558\ub098\ub85c \ucc44\uc6a9\uae4c\uc9c0 \ucb49~",
                                  (0, x.jsx)("br", {}),
                                  (0, x.jsx)("b", {
                                    children:
                                      "\uc0ac\uc804 \uc11c\ub958\uc2e0\uccad \u2192 \ud604\uc7a5\uba74\uc811(\uc11c\ub958 \ud1b5\uacfc\uc790) \u2192 \ubc14\ub85c\ucc44\uc6a9",
                                  }),
                                  (0, x.jsx)("span", {
                                    children:
                                      "\uc2e0\uccad\uae30\uac04: ~ 9. 5.",
                                  }),
                                  (0, x.jsxs)("span", {
                                    children: [
                                      "\uc81c\ucd9c\ucc98: \ud648\ud398\uc774\uc9c0 \uc0ac\uc804\ub4f1\ub85d \ub610\ub294 \uc774\uba54\uc77c(linc21@naver.com)",
                                      " ",
                                    ],
                                  }),
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_signup_url,
                                    children:
                                      "\uc0ac\uc804\ub4f1\ub85d \ubc14\ub85c\uac00\uae30",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, x.jsxs)("div", {
                  className: "company",
                  children: [
                    (0, x.jsx)("h3", { children: "\ucc38\uc5ec\uae30\uc5c5" }),
                    (0, x.jsx)("p", {
                      children:
                        "\ud074\ub9ad\uc2dc \uae30\uc5c5 \uacf5\uc2dd \ud648\ud398\uc774\uc9c0\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4.",
                    }),
                    (0, x.jsx)("div", {
                      className: "logobox",
                      "data-aos": "fade-up",
                      "data-aos-duration": "800",
                      children:
                        0 !== n.length &&
                        n.map(function (e, s) {
                          return (0, x.jsx)(
                            d.rU,
                            {
                              onClick: function (s) {
                                (0, r.cj)(e.homepageUrl), s.preventDefault();
                              },
                              children: (0, x.jsx)("img", {
                                src: "img/web/logo/logo_".concat(
                                  e.companyLabel,
                                  ".png",
                                ),
                                alt: e.companyName,
                              }),
                            },
                            "company_main_".concat(s),
                          );
                        }),
                    }),
                  ],
                }),
              ],
            }),
          });
        },
        b = (n(1413), n(2094)),
        v = /^[0-9]{1,3}$/,
        w = /^[0-9]{1,4}$/,
        N = /^.{1,60}$/,
        k = n(6666),
        y = n.n(k),
        U = function () {
          (0, c.Z)().alert;
          var e = (0, r.jn)(),
            s = (0, h.Zl)(u.BY),
            n = (0, h.sJ)(u.pp),
            l = (0, a.useState)([]),
            m = (0, i.Z)(l, 2),
            p = m[0],
            g = m[1],
            f = (0, a.useState)({}),
            _ = (0, i.Z)(f, 2),
            k = _[0],
            U = _[1],
            C = (0, a.useState)(!1),
            Z = (0, i.Z)(C, 2),
            S = Z[0],
            M = (Z[1], (0, a.useState)(!0)),
            F = (0, i.Z)(M, 2),
            I = F[0],
            D = F[1],
            B = j.H.api_captcha_img,
            E = {
              inputUserFirstName: (0, a.useRef)(null),
              inputUserLastName: (0, a.useRef)(null),
              inputMobile1: (0, a.useRef)(null),
              inputMobile2: (0, a.useRef)(null),
              inputMobile3: (0, a.useRef)(null),
              inputContent: (0, a.useRef)(null),
              inputCaptcha: (0, a.useRef)(null),
            };
          (0, a.useEffect)(
            function () {
              U({ imageSrc: B, imageHash: Date.now() }), O(1, 40);
            },
            [S],
          ),
            (0, a.useEffect)(
              function () {
                O(1, 40);
              },
              [n],
            ),
            (0, a.useEffect)(function () {
              y()(function () {
                y()(window).width() < 640 &&
                  y()(".input_btn_box").insertAfter(".talk_txt_box");
              });
            }, []);
          var O = function (n, i) {
              D(!0);
              var a = {
                method: "post",
                url: j.H.api_admin_boards,
                data: {
                  page_num: n,
                  page_size: i,
                  board_type: "400",
                  admin_type: "N",
                },
                err: e,
                callback: function (e) {
                  return t(e);
                },
              };
              (0, r.eO)(a);
              var t = function (e) {
                var n = e.headers.result_code;
                if (n === o.B.success || n === o.B.noData) {
                  var i = e.data.result_info;
                  g(i), D(!1);
                } else (0, r.lQ)("log", e), s(!1);
              };
            },
            R = function (e) {
              var s = e.target.id,
                n = e.target.value;
              switch (s) {
                case "mobile1":
                  v.test(n) || (E.inputMobile1.current.value = n.slice(0, -1)),
                    n.length >= 3 && E.inputMobile2.current.focus();
                  break;
                case "mobile2":
                  w.test(n) || (E.inputMobile2.current.value = n.slice(0, -1)),
                    n.length >= 4 && E.inputMobile3.current.focus();
                  break;
                case "mobile3":
                  w.test(n) || (E.inputMobile3.current.value = n.slice(0, -1));
              }
            };
          return (0, x.jsx)(x.Fragment, {
            children: (0, x.jsxs)("div", {
              className: "section04",
              children: [
                (0, x.jsx)("div", {
                  className: "bar01",
                  "data-aos": "fade-right",
                  "data-aos-delay": "400",
                  "data-aos-easing": "linear",
                  children: (0, x.jsx)("img", {
                    src: "img/main/bar_green.png",
                    alt: "",
                  }),
                }),
                (0, x.jsxs)("div", {
                  className: "talk",
                  children: [
                    (0, x.jsxs)("div", {
                      className: "title",
                      children: [
                        (0, x.jsxs)("h3", {
                          "data-aos": "fade-up",
                          children: [
                            (0, x.jsx)("span", {
                              children:
                                "2023 \uc7a1\uc544\ub77c \ud398\uc2a4\ud2f0\ubc8c",
                            }),
                            " \uc751\uc6d0\uae00 \ud55c\uc904\ub85c \uce58\ud0a8\uc744 \uc7a1\uc544\ub77c!!",
                          ],
                        }),
                        (0, x.jsx)("p", {
                          children:
                            "2023 \uc7a1\uc544\ub77c \ud398\uc2a4\ud2f0\ubc8c\uc5d0 \ucc38\uc11d\ud558\uc2dc\ub294 \ubaa8\ub4e0 \uccad\ub144\ub4e4\uc744 \uc704\ud574 \ub530\ub73b\ud55c \uc751\uc6d0\uc758 \ud55c\ub9c8\ub514\ub97c \ub0a8\uaca8\uc8fc\uc138\uc694!",
                        }),
                      ],
                    }),
                    (0, x.jsx)("div", {
                      className: "talkbox",
                      children: (0, x.jsx)("ul", {
                        children: I
                          ? (0, x.jsxs)(x.Fragment, {
                              children: [
                                (0, x.jsx)("li", {
                                  style: {
                                    display: "flex",
                                    alignItems: "center",
                                  },
                                  children: (0, x.jsx)("p", {
                                    style: {
                                      width: "100%",
                                      marginBottom: "20px",
                                    },
                                    children: (0, x.jsx)(t.Z, { height: 30 }),
                                  }),
                                }),
                                (0, x.jsx)("li", {
                                  style: {
                                    display: "flex",
                                    alignItems: "center",
                                  },
                                  children: (0, x.jsx)("p", {
                                    style: {
                                      width: "100%",
                                      marginBottom: "20px",
                                    },
                                    children: (0, x.jsx)(t.Z, { height: 30 }),
                                  }),
                                }),
                                (0, x.jsx)("li", {
                                  style: {
                                    display: "flex",
                                    alignItems: "center",
                                  },
                                  children: (0, x.jsx)("p", {
                                    style: {
                                      width: "100%",
                                      marginBottom: "20px",
                                    },
                                    children: (0, x.jsx)(t.Z, { height: 30 }),
                                  }),
                                }),
                                (0, x.jsx)("li", {
                                  style: {
                                    display: "flex",
                                    alignItems: "center",
                                  },
                                  children: (0, x.jsx)("p", {
                                    style: {
                                      width: "100%",
                                      marginBottom: "20px",
                                    },
                                    children: (0, x.jsx)(t.Z, { height: 30 }),
                                  }),
                                }),
                              ],
                            })
                          : 0 !== p.length
                          ? p.map(function (e, s) {
                              return (0, x.jsxs)(
                                "li",
                                {
                                  children: [
                                    (0, x.jsx)("span", {
                                      children: e.user_name_ko,
                                    }),
                                    (0, x.jsx)("p", { children: e.subject }),
                                  ],
                                },
                                "main_oneline_".concat(s),
                              );
                            })
                          : (0, x.jsx)("li", {
                              children: (0, x.jsx)("p", {
                                children:
                                  "\uc544\uc9c1 \uc751\uc6d0 \ub313\uae00\uc774 \uc5c6\uc5b4\uc694 ;(",
                              }),
                            }),
                      }),
                    }),
                    (0, x.jsxs)("div", {
                      className: "talkinput",
                      children: [
                        (0, x.jsxs)("div", {
                          className: "talk_input_wrap",
                          children: [
                            (0, x.jsxs)("div", {
                              className: "input_box",
                              children: [
                                (0, x.jsxs)("div", {
                                  className: "talk_name",
                                  children: [
                                    (0, x.jsx)("p", {
                                      children: "\uc774\ub984",
                                    }),
                                    (0, x.jsx)("input", {
                                      type: "text",
                                      className: "input",
                                      placeholder: "\uc131",
                                      ref: E.inputUserFirstName,
                                    }),
                                    (0, x.jsx)("input", {
                                      type: "text",
                                      className: "input",
                                      placeholder: "\uc774\ub984",
                                      ref: E.inputUserLastName,
                                    }),
                                  ],
                                }),
                                (0, x.jsxs)("div", {
                                  className: "tel_input",
                                  children: [
                                    (0, x.jsx)("p", {
                                      children: "\uc804\ud654\ubc88\ud638",
                                    }),
                                    (0, x.jsx)("input", {
                                      type: "text",
                                      className: "input",
                                      placeholder: "010",
                                      id: "mobile1",
                                      ref: E.inputMobile1,
                                      onChange: function (e) {
                                        return R(e);
                                      },
                                    }),
                                    " ",
                                    "-",
                                    " ",
                                    (0, x.jsx)("input", {
                                      type: "text",
                                      className: "input",
                                      placeholder: "0000",
                                      id: "mobile2",
                                      ref: E.inputMobile2,
                                      onChange: function (e) {
                                        return R(e);
                                      },
                                    }),
                                    " ",
                                    "-",
                                    " ",
                                    (0, x.jsx)("input", {
                                      type: "text",
                                      className: "input",
                                      placeholder: "0000",
                                      id: "mobile3",
                                      ref: E.inputMobile3,
                                      onChange: function (e) {
                                        return R(e);
                                      },
                                    }),
                                  ],
                                }),
                                (0, x.jsxs)("div", {
                                  className: "talk_cap",
                                  children: [
                                    (0, x.jsx)("p", {
                                      children:
                                        "\uc790\ub3d9\uc785\ub825\ubc29\uc9c0",
                                    }),
                                    (0, x.jsxs)("div", {
                                      className: "cap_wrap",
                                      children: [
                                        (0, x.jsxs)("div", {
                                          children: [
                                            (0, x.jsx)("span", {
                                              className: "cap",
                                              children: (0, x.jsx)("img", {
                                                className: "imgClass",
                                                id: "captchaImg",
                                                src: ""
                                                  .concat(k.imageSrc, "?")
                                                  .concat(k.imageHash),
                                                alt: "",
                                                decoding: "async",
                                                style: { background: "white" },
                                              }),
                                            }),
                                            (0, x.jsx)("span", {
                                              className: "cap_refresh",
                                              children: (0, x.jsxs)(d.rU, {
                                                onClick: function (e) {
                                                  U({
                                                    imageSrc: B,
                                                    imageHash: Date.now(),
                                                  }),
                                                    e.preventDefault();
                                                },
                                                children: [
                                                  (0, x.jsx)(b.Z, {}),
                                                  "\uc0c8\ub85c\uace0\uce68",
                                                ],
                                              }),
                                            }),
                                          ],
                                        }),
                                        (0, x.jsx)("input", {
                                          type: "text",
                                          className: "input_s",
                                          ref: E.inputCaptcha,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, x.jsx)("div", {
                              className: "input_btn_box",
                              children: (0, x.jsx)(d.rU, {
                                className: "input_btn hold",
                                onClick: function (e) {
                                  e.preventDefault();
                                },
                                children: "\uc751\uc6d0\ud558\uae30",
                              }),
                            }),
                          ],
                        }),
                        (0, x.jsx)("div", {
                          className: "talk_txt_box",
                          children: (0, x.jsx)("textarea", {
                            name: "",
                            id: "",
                            className: "talk_txt",
                            placeholder:
                              "\uae00\uc790\uc218\ub294 60\uc790\uae4c\uc9c0 \uc785\ub825 \uac00\ub2a5\ud569\ub2c8\ub2e4.",
                            ref: E.inputContent,
                            onChange: function (e) {
                              !(function (e) {
                                var s = e.target.value;
                                (" " !== s.charAt(0) &&
                                  "\u3000" !== s.charAt(0)) ||
                                  (E.inputContent.current.value = s.slice(
                                    0,
                                    -1,
                                  )),
                                  N.test(s) ||
                                    (E.inputContent.current.value = s.slice(
                                      0,
                                      -1,
                                    ));
                              })(e);
                            },
                          }),
                        }),
                        (0, x.jsx)("br", {}),
                        (0, x.jsx)("p", {
                          children:
                            "\u203b \ub2f9\ucca8\uc790 \ubc1c\ud45c\ub294 9\uc6d4 20\uc77c \ud648\ud398\uc774\uc9c0\uc5d0\uc11c \ud655\uc778 \uac00\ub2a5\ud569\ub2c8\ub2e4.",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          });
        },
        C = function () {
          return (0, x.jsx)(x.Fragment, {
            children: (0, x.jsxs)("div", {
              id: "container",
              children: [
                (0, x.jsx)(U, {}),
                (0, x.jsx)(_, {}),
                (0, x.jsx)(m, {}),
              ],
            }),
          });
        },
        Z = n(2789),
        S = n.n(Z),
        M = (0, a.forwardRef)(function (e, s) {
          var n = {
              isOpen: e.isOpen,
              title: e.title,
              handleModalClose: e.handleModalClose,
              width: e.width,
            },
            i = s;
          return (0, x.jsx)(x.Fragment, {
            children:
              n.isOpen &&
              (0, x.jsx)("div", {
                className: "popup_wrap",
                id: "modal_wrap",
                children: (0, x.jsxs)("div", {
                  className: "popup w600",
                  children: [
                    (0, x.jsx)("div", {
                      className: "form",
                      children: (0, x.jsx)("div", {
                        id: "transition-modal-description",
                        children: (0, x.jsx)(d.rU, {
                          to: j.j.web_notice_url,
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/main_popup_event.jpg",
                            alt: "",
                          }),
                        }),
                      }),
                    }),
                    (0, x.jsxs)("div", {
                      className: "popup_btm",
                      children: [
                        (0, x.jsxs)("div", {
                          children: [
                            (0, x.jsx)("input", {
                              type: "checkbox",
                              id: "popup_24",
                              ref: i,
                            }),
                            (0, x.jsx)("label", {
                              htmlFor: "popup_24",
                              children:
                                "24\uc2dc\uac04\ub3d9\uc548 \ubcf4\uc9c0 \uc54a\uae30",
                            }),
                          ],
                        }),
                        (0, x.jsx)("div", {
                          onClick: n.handleModalClose,
                          children: (0, x.jsx)("img", {
                            src: "img/common_old/modal_close.png",
                            alt: "",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          });
        });
      var F = function () {
        (0, a.useEffect)(function () {
          y()("#nav").hide();
        }, []);
        var e = function (e) {
          e.preventDefault(),
            y()(".nav_2depth").slideUp(),
            y()(e.target).siblings(".nav_2depth").slideToggle();
        };
        return (0, x.jsx)(x.Fragment, {
          children: (0, x.jsxs)("div", {
            id: "top_right",
            children: [
              (0, x.jsxs)("div", {
                id: "menu-icon2",
                className: "all_menu",
                onClick: function (e) {
                  return (
                    y()("#nav").slideToggle(),
                    void y()("#menu-icon2").toggleClass("open")
                  );
                },
                children: [
                  (0, x.jsx)("span", {}),
                  (0, x.jsx)("span", {}),
                  (0, x.jsx)("span", { className: "short" }),
                ],
              }),
              (0, x.jsx)("nav", {
                children: (0, x.jsxs)("ul", {
                  id: "nav",
                  children: [
                    (0, x.jsx)("li", {
                      children: (0, x.jsx)(d.rU, {
                        to: j.j.web_main_url,
                        id: "nav5",
                        children: "\ud648",
                      }),
                    }),
                    (0, x.jsxs)("li", {
                      children: [
                        (0, x.jsx)(d.rU, {
                          id: "nav1",
                          onClick: function (s) {
                            e(s), s.preventDefault();
                          },
                          children: "\ubc15\ub78c\ud68c\uc548\ub0b4",
                        }),
                        (0, x.jsxs)("ul", {
                          className: "nav_2depth",
                          children: [
                            (0, x.jsx)("li", {
                              children: (0, x.jsx)(d.rU, {
                                to: j.j.web_intro_url,
                                children: "\ud589\uc0ac\uc18c\uac1c",
                              }),
                            }),
                            (0, x.jsx)("li", {
                              children: (0, x.jsx)(d.rU, {
                                to: j.j.web_intro_location_url,
                                children: "\ud589\uc0ac\uc7a5\uc18c",
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, x.jsxs)("li", {
                      children: [
                        (0, x.jsx)(d.rU, {
                          id: "nav2",
                          onClick: function (s) {
                            e(s), s.preventDefault();
                          },
                          children: "\ud504\ub85c\uadf8\ub7a8",
                        }),
                        (0, x.jsxs)("ul", {
                          className: "nav_2depth",
                          children: [
                            (0, x.jsx)("li", {
                              children: (0, x.jsx)(d.rU, {
                                to: j.j.web_program_url,
                                children: "\ud589\uc0ac\uc77c\uc815",
                              }),
                            }),
                            (0, x.jsx)("li", {
                              children: (0, x.jsx)(d.rU, {
                                to: j.j.web_program_detail_url,
                                children:
                                  "\uc138\ubd80 \ud504\ub85c\uadf8\ub7a8",
                              }),
                            }),
                            (0, x.jsx)("li", {
                              children: (0, x.jsx)(d.rU, {
                                to: j.j.web_program_event_url,
                                children:
                                  "\uc774\ubca4\ud2b8 \ud504\ub85c\uadf8\ub7a8",
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, x.jsxs)("li", {
                      children: [
                        (0, x.jsx)(d.rU, {
                          id: "nav3",
                          onClick: function (s) {
                            e(s), s.preventDefault();
                          },
                          children: "\uc0ac\uc804\ub4f1\ub85d",
                        }),
                        (0, x.jsxs)("ul", {
                          className: "nav_2depth",
                          children: [
                            (0, x.jsx)("li", {
                              children: (0, x.jsx)(d.rU, {
                                to: j.j.web_signup_url,
                                children: "\uc0ac\uc804\ub4f1\ub85d",
                              }),
                            }),
                            (0, x.jsx)("li", {
                              children: (0, x.jsx)(d.rU, {
                                to: j.j.web_signupchk_url,
                                children:
                                  "\uc0ac\uc804\ub4f1\ub85d\ud655\uc778",
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, x.jsx)("li", {
                      children: (0, x.jsx)(d.rU, {
                        to: "".concat(j.j.web_company_url, "/list"),
                        id: "nav4",
                        children: "\ucc38\uc5ec\uae30\uc5c5",
                      }),
                    }),
                    (0, x.jsx)("li", {
                      children: (0, x.jsx)(d.rU, {
                        to: j.j.web_notice_url,
                        id: "nav5",
                        children: "\uacf5\uc9c0\uc0ac\ud56d",
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        });
      };
      var I = function () {
          return (0, x.jsx)(x.Fragment, {
            children: (0, x.jsx)("div", {
              id: "header",
              children: (0, x.jsxs)("div", {
                id: "header_content",
                children: [
                  (0, x.jsxs)("h1", {
                    className: "logo",
                    children: [
                      (0, x.jsx)(d.rU, {
                        to: j.j.web_main_url,
                        children: (0, x.jsx)("img", {
                          src: "img/web/main/logo_job.png",
                          alt: "",
                        }),
                      }),
                      (0, x.jsx)(d.rU, {
                        onClick: function (e) {
                          return (0, r.cj)(
                            "https://lincplus.jejunu.ac.kr/index.htm",
                          );
                        },
                        children: (0, x.jsx)("img", {
                          src: "img/web/main/logo_linc.png",
                          alt: "",
                        }),
                      }),
                    ],
                  }),
                  (0, x.jsx)(F, {}),
                ],
              }),
            }),
          });
        },
        D = function () {
          var e = (0, h.sJ)(u.sM),
            s = (0, a.useState)(""),
            n = (0, i.Z)(s, 2),
            l = n[0],
            c = n[1],
            o = (0, a.useState)(""),
            m = (0, i.Z)(o, 2),
            p = m[0],
            g = m[1],
            f = (0, a.useState)(""),
            _ = (0, i.Z)(f, 2),
            b = _[0],
            v = _[1],
            w = (0, a.useState)(""),
            N = (0, i.Z)(w, 2),
            k = N[0],
            y = N[1],
            U = (0, a.useState)(""),
            C = (0, i.Z)(U, 2),
            Z = C[0],
            S = C[1],
            M = (0, a.useState)(""),
            F = (0, i.Z)(M, 2),
            I = F[0],
            D = F[1],
            B = (0, a.useState)(""),
            E = (0, i.Z)(B, 2),
            O = E[0],
            R = E[1],
            A = (0, a.useState)(!1),
            L = (0, i.Z)(A, 2),
            H = L[0],
            J = L[1];
          (0, a.useEffect)(
            function () {
              if (0 !== Object.keys(e).length) {
                var s = e.start_date.split("-");
                c(s[0]), g(s[1]), v(s[2]), y(e.start_week);
                var n = e.start_time.split(":");
                S(n[0] + ":" + n[1]);
                var i = e.end_time.split(":");
                D(i[0] + ":" + i[1]), R(e.spot);
              }
            },
            [e],
          );
          return (0, x.jsx)(x.Fragment, {
            children: (0, x.jsx)("div", {
              id: "mainvisual",
              children: (0, x.jsxs)("div", {
                className: "main_txt",
                children: [
                  (0, x.jsx)("h2", {
                    children: (0, x.jsx)("img", {
                      src: "img/web/main/maintxt.png",
                      alt: "\uc7a1\uc544\ub77c \ud398\uc2a4\ud2f0\ubc8c",
                      "data-aos": "zoom-in",
                      "data-aos-duration": "800",
                      onLoad: function (e) {
                        J(!0);
                      },
                    }),
                  }),
                  (0, x.jsxs)("p", {
                    className: "txt1",
                    children: [
                      (0, x.jsx)("span", { children: "2023" }),
                      " \uccad\ub144\ucde8\uc5c5 \uc77c\uc790\ub9ac\ubc15\ub78c\ud68c",
                    ],
                  }),
                  H &&
                    (l
                      ? (0, x.jsxs)("p", {
                          className: "date",
                          children: [
                            l && l,
                            ".",
                            " ",
                            (0, x.jsxs)("span", {
                              className: "pink",
                              children: [p && p, ".", " ", b && b],
                            }),
                            " ",
                            "(",
                            k,
                            ")",
                            " ",
                            (0, x.jsxs)("span", {
                              className: "blue",
                              children: [Z, " ~ ", I],
                            }),
                            (0, x.jsx)("br", {}),
                            O,
                          ],
                        })
                      : (0, x.jsx)("div", {
                          className: "date",
                          style: { display: "flex", justifyContent: "center" },
                          children: (0, x.jsxs)("div", {
                            children: [
                              (0, x.jsx)("p", {
                                style: {
                                  display: "flex",
                                  justifyContent: "center",
                                },
                                children: (0, x.jsx)(t.Z, {
                                  variant: "text",
                                  sx: { fontSize: "1.5rem" },
                                  width: 350,
                                }),
                              }),
                              (0, x.jsx)("p", {
                                style: {
                                  display: "flex",
                                  justifyContent: "center",
                                },
                                children: (0, x.jsx)(t.Z, {
                                  variant: "text",
                                  sx: { fontSize: "1rem", textAlign: "center" },
                                  width: 300,
                                }),
                              }),
                            ],
                          }),
                        })),
                  H &&
                    (0, x.jsxs)("p", {
                      className: "host",
                      children: [
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("https://www.moe.go.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host01.png",
                            alt: "\uad50\uc721\ubd80",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("https://www.nrf.re.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host02.png",
                            alt: "\ud55c\uad6d\uc5f0\uad6c\uc7ac\ub2e8",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("https://www.jeju.go.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host03.png",
                            alt: "\uc81c\uc8fc\ud2b9\ubcc4\uc790\uce58\ub3c4",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("https://www.jejunu.ac.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host04.png",
                            alt: "\uc81c\uc8fc\ub300\ud559\uad50",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("https://lincplus.jejunu.ac.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host05.png",
                            alt: "\uc81c\uc8fc\ub300\ud559\uad50LINC\uc0ac\uc5c5\ub2e8",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          href: "",
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host06.png",
                            alt: "\ub300\ud559\uc77c\uc790\ub9ac\uc13c\ud130",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          href: "",
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host07.png",
                            alt: "\uc5b4\uc6b8\ub9bc",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("http://www.jejuiucc.or.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host08.png",
                            alt: "\uc81c\uc8fc\uc0b0\ud559\uc735\ud569\uc6d0",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("https://www.chu.ac.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host09_1.png",
                            alt: "\uc81c\uc8fc\ud55c\ub77c\ub300\ud559\uad50",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("https://www.jtu.ac.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host14.png",
                            alt: "\uc81c\uc8fc\uad00\uad11\ub300\ud559\uad50",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)(
                              "https://www.komipo.co.kr/kor/main/main.do",
                            );
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host12.png",
                            alt: "\ud55c\uad6d\uc911\ubd80\ubc1c\uc804",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)(
                              "https://www.komipo.co.kr/kor/main/main.do",
                            );
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host13.png",
                            alt: "\uc81c\uc8fc\uad00\uad11\ub300\ud559\uad50",
                          }),
                        }),
                        (0, x.jsx)(d.rU, {
                          onClick: function () {
                            return (0, r.cj)("https://www.hrdkorea.or.kr/");
                          },
                          children: (0, x.jsx)("img", {
                            src: "img/web/main/host15.png",
                            alt: "\ud55c\uad6d\uc0b0\uc5c5\uc778\ub825\uacf5\ub2e8",
                          }),
                        }),
                      ],
                    }),
                  (0, x.jsxs)("div", {
                    className: "menu",
                    "data-aos": "fade-left",
                    "data-aos-auration": "800",
                    "data-aos-delay": "500",
                    children: [
                      (0, x.jsx)(d.rU, { className: "m00", children: "MENU" }),
                      (0, x.jsxs)("ul", {
                        children: [
                          (0, x.jsxs)("li", {
                            children: [
                              (0, x.jsx)(d.rU, {
                                to: j.j.web_intro_url,
                                className: "m01",
                                children: "\ubc15\ub78c\ud68c\uc548\ub0b4",
                              }),
                              (0, x.jsxs)("div", {
                                className: "submenu",
                                children: [
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_intro_url,
                                    children: "\ud589\uc0ac\uc18c\uac1c",
                                  }),
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_intro_location_url,
                                    children: "\ud589\uc0ac\uc7a5\uc18c",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, x.jsxs)("li", {
                            children: [
                              (0, x.jsx)(d.rU, {
                                to: j.j.web_program_url,
                                className: "m02",
                                children: "\ud504\ub85c\uadf8\ub7a8",
                              }),
                              (0, x.jsxs)("div", {
                                className: "submenu",
                                children: [
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_program_url,
                                    children: "\ud589\uc0ac\uc77c\uc815",
                                  }),
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_program_detail_url,
                                    children:
                                      "\uc138\ubd80\ud504\ub85c\uadf8\ub7a8",
                                  }),
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_program_event_url,
                                    children:
                                      "\uc774\ubca4\ud2b8\ud504\ub85c\uadf8\ub7a8",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, x.jsxs)("li", {
                            children: [
                              (0, x.jsx)(d.rU, {
                                to: j.j.web_signup_url,
                                className: "m03",
                                children: "\uc0ac\uc804\ub4f1\ub85d",
                              }),
                              (0, x.jsxs)("div", {
                                className: "submenu",
                                children: [
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_signup_url,
                                    children: "\uc0ac\uc804\ub4f1\ub85d",
                                  }),
                                  (0, x.jsx)(d.rU, {
                                    to: j.j.web_signupchk_url,
                                    children:
                                      "\uc0ac\uc804\ub4f1\ub85d \ud655\uc778",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, x.jsx)("li", {
                            children: (0, x.jsx)(d.rU, {
                              to: "".concat(j.j.web_company_url, "/list"),
                              className: "m04",
                              children: "\ucc38\uc5ec\uae30\uc5c5",
                            }),
                          }),
                          (0, x.jsx)("li", {
                            children: (0, x.jsx)(d.rU, {
                              to: j.j.web_notice_url,
                              children: "\uacf5\uc9c0\uc0ac\ud56d",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        };
      var B = function () {
        var e = (0, h.sJ)(u.BY);
        return (0, x.jsxs)(x.Fragment, {
          children: [
            (0, x.jsx)("div", {
              id: "footer",
              children: (0, x.jsx)("div", {
                id: "footer_content",
                children: (0, x.jsxs)("address", {
                  children: [
                    (0, x.jsx)("p", {
                      className: "flogo",
                      children: (0, x.jsx)("img", {
                        src: "img/web/main/logo.png",
                        alt: "",
                      }),
                    }),
                    "63243 \uc81c\uc8fc\ud2b9\ubcc4\uc790\uce58\ub3c4 \uc81c\uc8fc\uc2dc \uc81c\uc8fc\ub300\ud559\ub85c 102 \uc0b0\ud559\ud611\ub825\uad00 4\uce35 410-1\ud638 Tel. 064)754-3125~6, 064)754-4412~5 Fax. 064-751-3127, 070-4170-4127",
                    (0, x.jsx)("br", {}),
                    "Copyright \xa9 2013 JEJU NATIONAL UNIVERSITY Leaders in INdustry-university Cooperation.",
                    (0, x.jsx)("br", {}),
                    "\ubcf8 \uc6f9\uc0ac\uc774\ud2b8\uc5d0 \uac8c\uc2dc\ub41c \uc774\uba54\uc77c \uc8fc\uc18c\uac00 \uc804\uc790\uc6b0\ud3b8 \uc218\uc9d1 \ud504\ub85c\uadf8\ub7a8\uc774\ub098 \uadf8 \ubc16\uc758 \uae30\uc220\uc801 \uc7a5\uce58\ub97c \uc774\uc6a9\ud558\uc5ec \ubb34\ub2e8\uc73c\ub85c \uc218\uc9d1\ub418\ub294 \uac83\uc744 \uac70\ubd80\ud558\uba70, \uc774\ub97c \uc704\ubc18\uc2dc \uc815\ubcf4\ud1b5\uc2e0\ub9dd\ubc95\uc5d0 \uc758\ud574 \ud615\uc0ac \ucc98\ubc8c\ub428\uc744 \uc720\ub150\ud558\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4.",
                  ],
                }),
              }),
            }),
            e && (0, x.jsx)(r.eI, {}),
          ],
        });
      };
      var E = function () {
        (0, a.useEffect)(function () {
          S().init();
        });
        var e = localStorage.getItem("popupTime"),
          s = (0, a.useState)(!1),
          n = (0, i.Z)(s, 2),
          t = n[0],
          l = n[1],
          r = (0, a.useRef)(null);
        (0, a.useEffect)(function () {
          c();
        }, []);
        var c = function () {
          if (new Date() > new Date("2023-09-20 00:00:00")) {
            var s = new Date();
            if (e && e > s) return void l(!1);
            (!e || e < s) && l(!0);
          } else l(!1);
        };
        return (0, x.jsxs)(x.Fragment, {
          children: [
            (0, x.jsx)(I, {}),
            (0, x.jsx)(D, {}),
            (0, x.jsx)(C, {}),
            (0, x.jsx)(B, {}),
            (0, x.jsx)(M, {
              isOpen: t,
              title: "",
              width: "1000",
              handleModalClose: function () {
                if (r.current.checked) {
                  var e = new Date();
                  (e = e.setHours(e.getHours() + 24)),
                    localStorage.setItem("popupTime", e),
                    l(!1);
                } else l(!1);
              },
              ref: r,
            }),
          ],
        });
      };
    },
  },
]);
