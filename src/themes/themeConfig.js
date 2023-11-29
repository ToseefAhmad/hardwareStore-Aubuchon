const resolveConfig = require('tailwindcss/resolveConfig');

const tailwindConfigFile = require('../../tailwind.config.js');

const tailwindConfig = resolveConfig(tailwindConfigFile).theme;

// Remove 'px' from breakpoint values and parse to number
Object.keys(tailwindConfig.screens).forEach(key => {
    tailwindConfig.screens[key] = parseInt(
        tailwindConfig.screens[key].replace('px', '')
    );
});

module.exports = tailwindConfig;
