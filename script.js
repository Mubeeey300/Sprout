document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ORDER PANEL
    ===================================================== */

    const marginInput = document.getElementById("margin-input");
    const positionSize = document.getElementById("position-size");
    const entryPrice = document.getElementById("entry-price");
    const selectedLeverage = document.getElementById("selected-leverage");
    const selectedSide = document.getElementById("selected-side");
    const tradeButton = document.getElementById("trade-button");

    const leverageButtons =
        document.querySelectorAll(".leverage-options button");

    const sideButtons =
        document.querySelectorAll(".position-tabs button");

    const orderTypeButtons =
        document.querySelectorAll(".order-tabs button");


    let leverage = 5;
    let side = "Long";
    let orderType = "Market";
    let currentPrice = 112482.50;


    function formatPrice(value) {

        return "$" + Number(value).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    }


    function updateOrder() {

        const margin =
            parseFloat(marginInput?.value) || 0;

        const size = margin * leverage;


        if (positionSize) {
            positionSize.textContent =
                formatPrice(size);
        }


        if (entryPrice) {
            entryPrice.textContent =
                formatPrice(currentPrice);
        }


        if (selectedLeverage) {
            selectedLeverage.textContent =
                leverage + "x";
        }


        if (selectedSide) {
            selectedSide.textContent =
                side;
        }


        if (tradeButton) {

            tradeButton.textContent =
                side === "Long"
                    ? `Long ${formatPrice(size)}`
                    : `Short ${formatPrice(size)}`;

        }

    }


    /* =====================================================
       LEVERAGE
    ===================================================== */

    leverageButtons.forEach(button => {

        button.addEventListener("click", () => {

            leverageButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            leverage =
                Number(
                    button.textContent
                        .replace("x", "")
                        .trim()
                );

            updateOrder();

        });

    });


    /* =====================================================
       LONG / SHORT
    ===================================================== */

    sideButtons.forEach(button => {

        button.addEventListener("click", () => {

            sideButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            side =
                button.textContent.trim();

            updateOrder();

        });

    });


    /* =====================================================
       ORDER TYPE
    ===================================================== */

    orderTypeButtons.forEach(button => {

        button.addEventListener("click", () => {

            orderTypeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            orderType =
                button.textContent.trim();

            console.log(
                "Order type:",
                orderType
            );

        });

    });


    /* =====================================================
       MARGIN INPUT
    ===================================================== */

    marginInput?.addEventListener(
        "input",
        updateOrder
    );


    /* =====================================================
       WALLET BUTTONS
    ===================================================== */

    const connectButtons =
        document.querySelectorAll(
            ".connect-wallet, .launch-btn"
        );


    connectButtons.forEach(button => {

        button.addEventListener("click", () => {

            alert(
                "Wallet connection will be available when the Sprout trading system is connected."
            );

        });

    });


    /* =====================================================
       CHART TIMEFRAMES
    ===================================================== */

    const timeframeButtons =
        document.querySelectorAll(
            ".chart-timeframes button"
        );


    timeframeButtons.forEach(button => {

        button.addEventListener("click", () => {

            timeframeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            updateChart(
                button.textContent.trim()
            );

        });

    });


    /* =====================================================
       CHART TOOLS
    ===================================================== */

    const chartTools =
        document.querySelectorAll(
            ".chart-tools button"
        );


    chartTools.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

        });

    });


    /* =====================================================
       PRICE UPDATE
    ===================================================== */

    function updatePrice() {

        const movement =
            (Math.random() - 0.5) * 90;

        currentPrice += movement;

        currentPrice =
            Math.max(1000, currentPrice);


        const priceElement =
            document.querySelector(
                ".current-price"
            );


        if (priceElement) {

            priceElement.textContent =
                formatPrice(currentPrice);

        }


        updateOrder();

    }


    setInterval(
        updatePrice,
        3000
    );


    /* =====================================================
       CHART
    ===================================================== */

    function updateChart(timeframe) {

        const chart =
            document.querySelector(
                ".trading-chart-line"
            );

        const fill =
            document.querySelector(
                ".trading-chart-fill"
            );


        if (!chart || !fill) {
            return;
        }


        const paths = {

            "1m":
                `M0 330
                 C50 320,80 290,120 305
                 C160 320,190 270,230 280
                 C270 290,300 230,350 245
                 C390 255,430 190,470 205
                 C510 220,540 165,580 180
                 C620 195,660 125,700 145
                 C750 165,800 80,850 100
                 C875 105,890 45,900 35`,

            "5m":
                `M0 345
                 C50 330,80 335,120 295
                 C160 260,200 300,240 255
                 C280 210,320 250,360 205
                 C400 165,440 195,480 145
                 C520 110,560 145,600 105
                 C640 65,680 95,720 70
                 C760 45,810 70,850 35
                 C875 25,890 20,900 10`,

            "15m":
                `M0 350
                 C60 320,90 340,140 285
                 C190 235,220 275,270 225
                 C320 175,350 220,400 170
                 C450 120,500 155,545 115
                 C590 75,630 110,675 80
                 C720 50,760 75,805 45
                 C850 25,880 35,900 12`,

            "1H":
                `M0 360
                 C70 330,110 350,170 280
                 C230 210,270 250,330 200
                 C390 150,430 180,490 135
                 C550 90,600 120,660 85
                 C720 50,770 70,830 35
                 C860 20,885 18,900 10`,

            "4H":
                `M0 370
                 C80 340,130 355,210 285
                 C290 215,340 245,420 175
                 C500 105,560 145,640 95
                 C720 45,800 75,900 15`,

            "1D":
                `M0 375
                 C100 350,160 360,250 295
                 C340 230,400 260,500 180
                 C600 100,680 135,760 75
                 C820 35,860 40,900 10`

        };


        const newPath =
            paths[timeframe];


        if (!newPath) {
            return;
        }


        chart.setAttribute(
            "d",
            newPath
        );


        fill.setAttribute(
            "d",
            newPath +
            " L900 430 L0 430 Z"
        );

    }


    /* =====================================================
       TRADE BUTTON
    ===================================================== */

    tradeButton?.addEventListener(
        "click",
        () => {

            const margin =
                parseFloat(
                    marginInput?.value
                ) || 0;


            if (margin <= 0) {

                alert(
                    "Enter a margin amount first."
                );

                marginInput?.focus();

                return;

            }


            alert(
                `${orderType} ${side} order selected\n\n` +
                `Margin: $${margin.toFixed(2)}\n` +
                `Leverage: ${leverage}x\n` +
                `Position Size: $${(margin * leverage).toFixed(2)}`
            );

        }
    );


    /* =====================================================
       MARKET SELECTOR
    ===================================================== */

    const marketSelector =
        document.getElementById(
            "market-selector"
        );

    const marketDropdown =
        document.getElementById(
            "market-dropdown"
        );

    const marketSearch =
        document.getElementById(
            "market-search"
        );

    const marketOptions =
        document.querySelectorAll(
            ".market-option"
        );

    const activeMarket =
        document.getElementById(
            "active-market"
        );

    const terminalPrice =
        document.getElementById(
            "terminal-price"
        );

    const terminalChange =
        document.getElementById(
            "terminal-change"
        );

    const markPrice =
        document.getElementById(
            "mark-price"
        );


    marketSelector?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            marketDropdown?.classList.toggle(
                "open"
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                marketDropdown &&
                !marketDropdown.contains(
                    event.target
                ) &&
                !marketSelector?.contains(
                    event.target
                )
            ) {

                marketDropdown.classList.remove(
                    "open"
                );

            }

        }
    );


    marketOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                marketOptions.forEach(item => {
                    item.classList.remove(
                        "active"
                    );
                });


                option.classList.add(
                    "active"
                );


                const market =
                    option.dataset.market;

                const price =
                    Number(
                        option.dataset.price
                    );

                const change =
                    option.dataset.change;


                if (activeMarket) {
                    activeMarket.textContent =
                        market;
                }


                if (terminalPrice) {
                    terminalPrice.textContent =
                        formatPrice(price);
                }


                if (markPrice) {
                    markPrice.textContent =
                        formatPrice(
                            price - 6.7
                        );
                }


                if (terminalChange) {

                    terminalChange.textContent =
                        change;

                    terminalChange.style.color =
                        change.startsWith("-")
                            ? "#ff7777"
                            : "var(--green)";

                }


                currentPrice =
                    price;


                marketDropdown?.classList.remove(
                    "open"
                );


                updateOrder();

            }
        );

    });


    /* =====================================================
       MARKET SEARCH
    ===================================================== */

    marketSearch?.addEventListener(
        "input",
        () => {

            const query =
                marketSearch.value
                    .toLowerCase()
                    .trim();


            marketOptions.forEach(option => {

                const name =
                    option.dataset.market
                        .toLowerCase();


                option.style.display =
                    name.includes(query)
                        ? "grid"
                        : "none";

            });

        }
    );


    /* =====================================================
       THEME
    ===================================================== */

    const themeToggle =
        document.getElementById(
            "theme-toggle"
        );

    const themeIcon =
        themeToggle?.querySelector("i");


    function updateThemeIcon(theme) {

        if (!themeIcon) {
            return;
        }


        themeIcon.className =
            theme === "light"
                ? "bi bi-moon-fill"
                : "bi bi-sun-fill";

    }


    const savedTheme =
        localStorage.getItem(
            "sprout-theme"
        );


    if (savedTheme === "light") {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        updateThemeIcon("light");

    } else {

        document.documentElement.removeAttribute(
            "data-theme"
        );

        updateThemeIcon("dark");

    }


    themeToggle?.addEventListener(
        "click",
        () => {

            const currentTheme =
                document.documentElement
                    .getAttribute(
                        "data-theme"
                    );


            if (
                currentTheme === "light"
            ) {

                document.documentElement
                    .removeAttribute(
                        "data-theme"
                    );

                localStorage.setItem(
                    "sprout-theme",
                    "dark"
                );

                updateThemeIcon("dark");

            } else {

                document.documentElement
                    .setAttribute(
                        "data-theme",
                        "light"
                    );

                localStorage.setItem(
                    "sprout-theme",
                    "light"
                );

                updateThemeIcon("light");

            }

        }
    );


    /* =====================================================
       MOBILE HAMBURGER MENU
    ===================================================== */

    const mobileMenuButton =
        document.getElementById(
            "mobileMenuButton"
        );

    const mobileNav =
        document.getElementById(
            "mobileNav"
        );

    const mobileClose =
        document.getElementById(
            "mobileClose"
        );

    const mobileMenuIcon =
        mobileMenuButton?.querySelector(
            "i"
        );


    /* =====================================================
       OPEN MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!mobileNav) {
            return;
        }


        mobileNav.classList.add(
            "active"
        );


        document.body.classList.add(
            "menu-open"
        );


        mobileNav.setAttribute(
            "aria-hidden",
            "false"
        );


        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "true"
        );


        mobileMenuButton?.setAttribute(
            "aria-label",
            "Close menu"
        );


        if (mobileMenuIcon) {

            mobileMenuIcon.classList.remove(
                "bi-list"
            );

            mobileMenuIcon.classList.add(
                "bi-x-lg"
            );

        }

    }


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!mobileNav) {
            return;
        }


        mobileNav.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "menu-open"
        );


        mobileNav.setAttribute(
            "aria-hidden",
            "true"
        );


        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "false"
        );


        mobileMenuButton?.setAttribute(
            "aria-label",
            "Open menu"
        );


        if (mobileMenuIcon) {

            mobileMenuIcon.classList.remove(
                "bi-x-lg"
            );

            mobileMenuIcon.classList.add(
                "bi-list"
            );

        }

    }


    /* =====================================================
       HAMBURGER CLICK
    ===================================================== */

    mobileMenuButton?.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            if (
                mobileNav?.classList.contains(
                    "active"
                )
            ) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    mobileClose?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeMobileMenu();

        }
    );


    /* =====================================================
       CLOSE WHEN LINK IS CLICKED
    ===================================================== */

    mobileNav
        ?.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        });


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                mobileNav?.classList.contains(
                    "active"
                ) &&
                !mobileNav.contains(
                    event.target
                ) &&
                !mobileMenuButton?.contains(
                    event.target
                )
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN RETURNING TO DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateOrder();

});