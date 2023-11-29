const plugin = require('tailwindcss/plugin');

const globalUtilities = plugin(function({ addUtilities, theme }) {
    const newUtilities = {
        '.list-unordered > li': {
            position: 'relative',
            'padding-left': '23px',
            '&::before': {
                content: "''",
                position: 'absolute',
                left: 0,
                top: '0.688rem',
                display: 'block',
                height: '2px',
                width: '8px',
                'background-color': theme('colors.primary'),
                '@media (min-width: 1024px)': {
                    top: '0.75rem'
                }
            }
        },
        '.list-ordered': {
            'counter-reset': 'ol-counter'
        },
        '.list-ordered > li::before': {
            'counter-increment': 'ol-counter',
            content: "counter(ol-counter) '. '",
            'font-weight': theme('fontWeight.semibold'),
            color: theme('colors.primary')
        },
        '.link-secondary': {
            outline: 'none',
            'font-weight': theme('fontWeight.semibold'),
            color: theme('colors.black.DEFAULT'),
            'text-decoration': `underline dotted`,
            'text-underline-offset': '3px',
            'text-decoration-thickness': '1px',
            'text-decoration-color': theme('colors.gray'),
            '&:focus': {
                color: theme('colors.primary'),
                'text-decoration-color': theme('colors.primary')
            },
            '@media (min-width: 1024px)': {
                '&:hover': {
                    color: theme('colors.primaryHover'),
                    'text-decoration-color': theme('colors.primaryHover')
                }
            }
        },
        '.link-primary': {
            outline: 'none',
            '&:focus': {
                color: theme('colors.gray.dark'),
                'text-decoration': `underline dotted`,
                'text-underline-offset': '3px',
                'text-decoration-thickness': '1px',
                'text-decoration-color': theme('colors.gray.DEFAULT')
            },
            '@media (min-width: 1024px)': {
                '&:hover': {
                    color: theme('colors.black.DEFAULT'),
                    'text-decoration': `underline dotted`,
                    'text-underline-offset': '3px',
                    'text-decoration-thickness': '1px',
                    'text-decoration-color': theme('colors.black.DEFAULT')
                }
            }
        },
        '.clickable': {
            display: 'inline-flex',
            'align-items': 'center',
            'text-align': 'center',
            'line-height': 1,
            '@media (min-width: 1024px)': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        '.full-bleed': {
            width: 'calc(100vw - var(--scrollBarWidth))',
            'margin-left': '50%',
            transform: 'translateX(-50%)'
        },
        '.no-full-bleed': {
            width: '100%',
            'margin-left': 0,
            transform: 'translateX(0)'
        },
        '.no-scrollbar::-webkit-scrollbar': {
            display: 'none'
        },
        '.no-scrollbar': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
        },
        '.scrollable': {
            'overflow-y': 'auto',
            '@media (min-width: 1024px)': {
                'padding-right': '6px'
            }
        },
        '.bg-circles': {
            '&::before': {
                content: "''",
                position: 'absolute',
                left: '50%',
                'z-index': 1,
                display: 'block',
                transform: 'translateX(-50%)',
                'background-color': theme('colors.white.DEFAULT'),
                opacity: 0.05,
                'border-radius': theme('borderRadius.full'),
                top: '20px',
                height: '500px',
                width: '500px',
                '@media (min-width: 480px)': {
                    height: '136vw',
                    width: '136vw'
                },
                '@media (min-width: 1280px)': {
                    top: '50px',
                    left: 'auto',
                    transform: 'translateX(0)',
                    height: '960px',
                    width: '960px'
                }
            },
            '&::after': {
                content: "''",
                position: 'absolute',
                left: '50%',
                'z-index': 1,
                display: 'block',
                transform: 'translateX(-50%)',
                'background-color': theme('colors.white.DEFAULT'),
                opacity: 0.05,
                'border-radius': theme('borderRadius.full'),
                top: '60px',
                height: '420px',
                width: '420px',
                '@media (min-width: 480px)': {
                    height: '110vw',
                    width: '110vw'
                },
                '@media (min-width: 1280px)': {
                    top: '130px',
                    left: 'auto',
                    transform: 'translateX(0)',
                    height: '800px',
                    width: '800px'
                }
            }
        }
    };

    addUtilities(newUtilities);
});

module.exports = globalUtilities;
