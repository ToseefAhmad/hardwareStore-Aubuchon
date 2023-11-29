module.exports = {
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('./plugins/textDecorationDotted'),
        require('./plugins/globalUtilities')
    ],
    theme: {
        fontFamily: {
            sans: ['Proxima Nova', 'sans-serif'],
            roboto: ['Roboto', 'sans-serif']
        },
        extend: {
            animation: {
                loader: 'loaderPulse 1.8s infinite ease-in-out',
                productCardImage: 'opacity 512ms ease-out',
                membershipBigCircle:
                    'bigCircleKeyframes 3s ease-in-out infinite',
                membershipBigCircleDesktop:
                    'bigCircleDesktopKeyframes 3s ease-in-out infinite',
                membershipSmallCircle:
                    'smallCircleKeyframes 3s ease-in-out infinite',
                membershipSmallCircleDesktop:
                    'smallCircleDesktopKeyframes 3s ease-in-out infinite',
                reviewImageLoader: 'loaderProgress 4s forwards ease',
                searchBarDots:
                    'dotsPulse 1200ms cubic-bezier(0.4, 0, 0.6, 1) infinite',
                toastMobile: 'slideInFromTop 0.5s ease-in-out',
                toastDesktop: 'slideInFromRight 0.5s ease-in-out',
                blinkCaret: 'blinkCaret 0.75s step-end infinite',
                searchBoxFromTop: 'modal-slide 0.5s ease-in-out forwards'
            },
            backgroundImage: {
                'bricks-mobile': "url('/assets/patterns/bricks-mobile.svg')",
                'bricks-desktop': "url('/assets/patterns/bricks-desktop.svg')",
                'store-details':
                    'linear-gradient(179.93deg, #FFFFFF 70.34%, rgba(255, 255, 255, 0) 108.88%)',
                'store-details-current':
                    'linear-gradient(179.93deg, #FFFFFF 59%, rgb(255 255 255 / 0%) 108.88%)',
                'paint-selection-swatch': "url('/assets/cms/color-swatch.png')",
                'select-color':
                    'linear-gradient(white, white),\n' +
                    'linear-gradient(270deg, #FF2F8E 0.28%, #FF9E4C 21.06%, #FFD600 40.79%, #66DF48 60.01%, #6A77DD 79.74%, #9803CE 100%)'
            },
            backgroundPosition: {
                'right-center': '90% center'
            },
            borderColor: theme => ({
                ...theme('colors'),
                faqSection: {
                    open:
                        '#EEEFF0 transparent ' +
                        theme('colors.primary') +
                        ' transparent'
                }
            }),
            borderRadius: {
                DEFAULT: '5px',
                px: '1px',
                large: '10px',
                '3.75': '15px'
            },
            borderWidth: {
                6: '6px',
                7: '7px'
            },
            boxShadow: theme => ({
                b: '0 5px 20px 0 ' + theme('colors.black.DEFAULT') + '1a',
                t: '0 -5px 20px 0 ' + theme('colors.black.DEFAULT') + '1a',
                't-wide':
                    '0 -5px 40px 0 ' + theme('colors.black.DEFAULT') + '1a'
            }),
            colors: {
                primary: 'var(--brand-primary-color)',
                'primary-light': 'var(--brand-primary-light-color)',
                primaryHover: 'var(--brand-primary-hover-color)',
                primaryActive: 'var(--brand-primary-active-color)',
                white: {
                    DEFAULT: '#FFFFFF'
                },
                black: {
                    DEFAULT: '#1D201F',
                    light: '#a5a6a5',
                    small: '#000A12'
                },
                gray: {
                    DEFAULT: '#D7D8D9',
                    lighter: '#EFF0F0',
                    light: '#EEEFF0',
                    lightest: '#E4E5E5',
                    dark: '#414042',
                    silver: '#000a1280'
                },
                red: {
                    DEFAULT: '#F41010',
                    dark: '#C10230',
                    light: '#FDE8E7'
                },
                green: {
                    DEFAULT: '#006940',
                    light: '#12724C',
                    lighter: '#F2F7F5',
                    lightest: '#1B9350',
                    dark: '#0A5839',
                    darker: '#094D32'
                },
                yellow: {
                    DEFAULT: '#E5C44D',
                    light: '#FCFAED',
                    dark: '#E57A35'
                },
                orange: {
                    DEFAULT: '#F58220'
                },
                blue: {
                    sky: '#1A73E8'
                },
                inherit: 'inherit'
            },
            cursor: {
                grab: 'grab'
            },
            fontSize: {
                '2xs': ['0.625rem', '1.125rem'],
                xs: ['0.75rem', '1.25rem'],
                sm: ['0.875rem', '1.5rem'],
                base: ['1rem', '1.625rem'],
                lg: ['1.125rem', '1.875rem'],
                xl: ['1.25rem', '2.125rem'],
                '2xl': ['1.375rem', '2.25rem'],
                '3xl': ['1.5rem', '2.375rem'],
                '4xl': ['1.75rem', '2.625rem'],
                '5xl': ['2rem', '2.875rem'],
                '6xl': ['2.125rem', '2.875rem'],
                '7xl': ['2.75rem', '3.5rem']
            },
            gridTemplateColumns: {
                categoryContainer: 'minmax(0, 1fr)',
                categoryPageColumns: '270px minmax(0, 1fr)',
                'items-1': '1fr',
                filterHeader: '1fr auto',
                filterInputs: 'auto 1fr',
                'max-content': 'max-content',
                membershipPageColumns: '1fr 17fr',
                'auto-1fr': 'auto 1fr',
                menuItem: '1fr max-content',
                menuItemMembership: '50px 1fr max-content',
                miniCartCouponMobile: '1fr 134px',
                miniCartCouponDesktop: '1fr 144px',
                miniCartItemMobile: '140px 1fr',
                miniCartItemDesktop: '80px 1fr',
                navHeader: 'max-content 1fr max-content',
                priceFilter: 'minmax(0, 1fr) auto minmax(0, 1fr)',
                productCardBottom: '30px auto',
                productCardBottomLg: '34px auto',
                productCardColumns: '140px auto',
                productCardInfo: 'minmax(0, max-content) auto 1fr',
                addressesTable:
                    'repeat(2, 90px) 155px 90px 100px repeat(2, 90px) 115px',
                'repeat-2-max': 'repeat(2, max-content)',
                'repeat-3-max': 'repeat(3, max-content)',
                'repeat-5-max': 'repeat(5, max-content)',
                rewardInformation: '52px 1fr 228px',
                ordersTableRow: '5fr 6fr 4fr 4fr 4fr 4fr',
                ordersTableRowXXL: '7.5fr 13fr 6fr 6fr 6fr 3.8fr',
                productFullDetailAddToCartMobile: '1fr 140px',
                productFullDetailAddToCartDesktop: '162px 1fr',
                productFullDetailsQuantity: '1fr 1.5fr 1fr',
                reviewFilters: '1fr 310px',
                reviewItemsDesktop: '19fr 50fr',
                reviewProductInfoMobile: '80px auto',
                reviewsAddMediaImage: '80px 1fr',
                reviewsRatingBreakdown: '30px auto 30px',
                pickupStoreDropdownInfo: '156px 1fr',
                currentStorePopupInfoBlock: '140px 1fr',
                pageBuilderProducts: 'repeat(5, 1fr)',
                pageBuilderProductsMob: 'repeat(2, 1fr)',
                qaTabSort: '1fr 150px',
                qaTabAnswerDesktop: '16px 1fr auto',
                productAvailableInfo: 'auto minmax(0, 1fr)',
                optionButtonSheen: 'repeat(auto-fit, 165px)',
                optionButtonSheenLg: 'repeat(auto-fit, 170px)',
                colorSizeItem: 'minmax(0, 1fr) max-content',
                colorSizeItemLg: 'minmax(0, 1fr) 154px',
                searchResultsDesktop: '30.5% 1fr',
                searchResultsSmallDesktop: '40% 1fr',
                'auto-maxContent': 'auto max-content',
                popularBrands: 'auto 16px;',
                checkoutContent: '1fr 350px',
                checkoutFooter: '1fr 188px 191px',
                storesListItem: '1fr 99px',
                storesListItemSm: '1fr 108px',
                storesListItemLg: '1fr 115px',
                storeInfoPage: '400px 3fr',
                storeInfoPageManager: '60px auto',
                storeInfoTitle: '30px auto',
                storeInfoBreadcrumbs: '38px 5px 84px;',
                storeSearchBar: '1fr 40px',
                storeSearchBarL: '1fr 50px',
                storeLocatorPage: '400px 1fr',
                servicesList: '1fr 1fr',
                creditCardInput: '1fr 46px 38px',
                creditCardInputXl: '1fr 126px 88px',
                storeBlockTitle: 'max-content minmax(0, 1fr)',
                minMaxContent: 'minmax(0, max-content) max-content',
                savedPaymentsRow: '1fr repeat(2, 150px) 14px',
                checkoutSuccessPage: '400px minmax(0, 1fr)',
                checkoutSuccessPageLg: '300px minmax(0, 1fr)',
                maxContentFull: 'max-content minmax(0, 1fr)',
                createAccountForm: 'minmax(0, 1fr) 192px',
                minContentMax: 'min-content minmax(0, 1fr)',
                orderItemsRowFull: '140px minmax(0, 1fr)',
                orderItemsInfoFull: 'minmax(0, 1fr) 120px 80px',
                orderItemsInfoFullLg: 'minmax(0, 1fr) 80px 80px',
                orderItemsRowFullLg: 'min-content minmax(0, 1fr)',
                orderViewPageStoreBlock: '41fr 59fr',
                orderProductsItems: '80px 1fr',
                orderProductsItemsLg: '85px 1fr 80px 80px 80px 80px',
                minMaxAuto: 'minmax(0, 1fr) auto',
                rewardCard: 'minmax(0, 1fr) 117px',
                rewardCardInfo: '50px minmax(0, 1fr)',
                nearestStorePopupQuantityMobile: 'repeat(3, 40px)',
                nearestStorePopupQuantity: 'repeat(3, 50px)',
                nearestStorePopupFormMobile: '120px 1fr',
                nearestStorePopupForm: '150px 210px',
                nearestStorePopupFilterBlock: '1fr 150px',
                storeIndexesCardsDesk: 'repeat(auto-fit, minmax(270px, 1fr))',
                storeIndexesCardsMob: 'repeat(auto-fit, minmax(333px, 1fr))',
                preCartAddedItemMobile: '110px 1fr'
            },
            gridTemplateRows: {
                'max-content': 'max-content',
                nav: 'auto 1fr auto',
                menuBrands: 'auto 1fr',
                productImageCarousel: '71fr 16fr',
                productCardRowsMobile: '165px auto',
                productCardRowsDesktop: '270px auto',
                colorStep: 'max-content minmax(0, 1fr)',
                shortForm: '1fr auto',
                'maxContent-2': 'max-content max-content',
                productCardContentMobile: 'auto 60px 50px 40px'
            },
            gridAutoColumns: {
                checkoutFooterPaymentsMobile: '35px',
                checkoutFooterPayments: '44px',
                supportedCards: '34px'
            },
            width: {
                '7.5': '1.875rem', // 30px
                15: '3.75rem', // 60px
                45: '11.25rem', // 180px
                48: '12rem', // 192px
                50: '12.5rem', // 200px
                100: '25rem', // 400px
                105: '26.25rem', // 420px
                150: '37.5rem', // 600px
                250: '62.5rem', // 1000px
                430: '107.5rem', // 1720px
                480: '120rem', // 1920px
                fit: 'fit-content',
                filled: 'calc(100% + 40px)',
                newsletterFormMobile: 'min(100%, 335px)'
            },
            height: {
                '9.5': '2.375rem', // 38px
                11: '2.75rem', // 44px
                12: '3rem', // 48px
                15: '3.75rem', // 60px
                45: '11.25rem', // 180px
                48: '12rem', // 192px
                50: '12.5rem', // 200px
                80: '20rem', // 320px
                100: '25rem', // 400px
                150: '37.5rem', // 600px
                250: '62.5rem', // 1000px
                fit: 'fit-content',
                max: 'max-content',
                min: 'min-content',
                addReviewModal: 'calc(100vh - 160px)',
                membershipPageImageDesktop:
                    'min(calc((100vw - 200px) * 0.28), 280px)',
                membershipPageImageMobile:
                    'max(calc((100vw - 40px) * 0.28), 150px)'
            },
            flex: {
                '140': '0 0 140px'
            },
            keyframes: theme => ({
                loaderPulse: {
                    '0%, 80%, 100%': { boxShadow: '0 2em 0 -1.3em' },
                    '40%': { boxShadow: '0 2em 0 0' }
                },
                bigCircleKeyframes: {
                    '0%': { top: '20px' },
                    '50%': { top: '50px' }
                },
                bigCircleDesktopKeyframes: {
                    '0%': { top: '50px' },
                    '50%': { top: '90px' }
                },
                smallCircleKeyframes: {
                    '0%': { top: '60px' },
                    '50%': { top: '86px' }
                },
                smallCircleDesktopKeyframes: {
                    '0%': { top: '130px' },
                    '50%': { top: '180px' }
                },
                loaderProgress: {
                    '0%': { width: '0%' },
                    '20%': { width: '20%' },
                    '71%': { width: '75%' },
                    '75%': { width: '87%' },
                    '94%': { width: '90%' },
                    '100%': { width: '96%' }
                },
                dotsPulse: {
                    '0%, 50%': { opacity: 0 },
                    '100%': { opacity: 1 }
                },
                slideInFromTop: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' }
                },
                slideInFromRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateY(0)' }
                },
                blinkCaret: {
                    '0%, 100%': {
                        backgroundColor: theme('colors.primary-light')
                    },
                    '50%': { backgroundColor: theme('colors.primary') }
                }
            }),
            placeholderColor: {
                gray: '#414042'
            },
            minWidth: {
                45: '11.25rem', // 180px
                48: '12rem', // 192px
                50: '12.5rem', // 200px
                430: '107.5rem', // 1720px
                480: '120rem' // 1920px
            },
            minHeight: {
                10: '2.5rem', // 40px
                48: '12rem' // 192px
            },
            maxWidth: {
                27.5: '6.875rem', // 110px
                38: '9.5rem', // 152px
                48: '12rem', // 192px
                50: '12.5rem', // 200px
                70: '17.5rem', // 280px
                80: '20rem', // 320px
                137.5: '34.375rem', // 550px
                250: '62.5rem', // 1000px
                430: '107.5rem', // 1720px
                480: '120rem', // 1920px
                screen: '100vw',
                fit: 'fit-content'
            },
            maxHeight: {
                48: '12rem', // 192px
                70: '17.5rem', // 280px
                '83.752': '20.938rem', // 335px
                137.5: '34.375rem', // 550px
                simpleModalLg: 'calc(100vh - 60px)'
            },
            outline: {
                gray: '2px solid #EEEFF0',
                primary: '1px solid var(--brand-primary-color)'
            },
            screens: {
                xs: '480px',
                xxl: '1536px', // There's a linter issue using default '2xl' value with composes
                xxxl: '1697px',
                xxxxl: '1860px'
            },
            spacing: {
                inputMsg: 'calc(-100% - 5px)',
                tabsMobile: 'calc(100vw - 20px)',
                productCarouselThumbnail: 'min(80px, calc(100vw/24))',
                productCarouselImageDesktop:
                    'min(670px, calc((100vw - 540px)/2))',
                productCarouselContainerDesktop:
                    'min(710px, calc((100vw - 500px)/2))',
                videoMobile: '177.6%',
                videoDesktop: '56.2%',
                '0.25': '0.625rem', // 1px
                '0.75': '0.188rem', // 3px
                '1.25': '0.313rem', // 5px
                '1.75': '0.438rem', // 7px
                '2.25': '0.563rem', // 9px
                '2.5': '0.625rem', // 10px
                '3.25': '0.813rem', // 13px
                '3.75': '0.938rem', // 15px
                '4.5': '1.125rem', // 18px
                '5': '1.25rem', // 20px
                '5.5': '1.375rem', // 22px
                '7.5': '1.875rem', // 30px
                10: '2.5rem', // 40px
                '10.5': '2.625rem', // 42px
                '12.5': '3.125rem', // 50px
                '15': '3.75rem', // 60px
                17: '4.25rem', // 68px
                '17.5': '4.375rem', // 70px
                25: '6.25rem' // 100px
            },
            transitionDuration: {
                200: '200ms',
                400: '400ms'
            },
            transitionTimingFunction: {
                menu: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            },
            zIndex: {
                '-1': -1,
                1: 1,
                2: 2,
                3: 3,
                8: 8,
                toast: 1000
            },
            transitionProperty: {
                tabUnderline: 'left, width',
                width: 'width',
                visibility: 'visibility, opacity'
            }
        }
    }
};
