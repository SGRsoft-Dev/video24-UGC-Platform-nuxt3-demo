/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        extend: {},
        screens: {
            'tablet': '800px',
            // => @media (min-width: 640px) { ... }

            'laptop': '1440px',
            // => @media (min-width: 1024px) { ... }

            'desktop': '1680px',
            // => @media (min-width: 1280px) { ... }
        },
    },
    plugins: [require('tailwindcss-safe-area')],
}
