const plugin = require('tailwindcss/plugin');

const textDecorationDotted = plugin(
    function({ addUtilities, theme, variants, e }) {
        const values = theme('textDecorationDotted');

        addUtilities(
            [
                Object.entries(values).map(([key, value]) => {
                    return {
                        [`.${e(`text-decoration-${key}`)}`]: {
                            textDecorationColor: `${value}`
                        }
                    };
                }),
                {
                    '.text-decoration-dotted': {
                        textDecoration: `underline dotted`,
                        textUnderlineOffset: '3px',
                        textDecorationThickness: '1px'
                    }
                }
            ],
            variants('textDecorationDotted')
        );
    },
    {
        theme: {
            textDecorationDotted: theme => ({
                black: theme('colors.black.DEFAULT'),
                gray: theme('colors.gray.DEFAULT'),
                green: theme('colors.green.DEFAULT'),
                'green-dark': theme('colors.green.dark'),
                primary: theme('colors.primary'),
                primaryHover: theme('colors.primaryHover'),
                white: theme('colors.white.DEFAULT')
            })
        },
        variants: {
            textDecorationDotted: ['responsive, hover', 'focus']
        }
    }
);

module.exports = textDecorationDotted;
