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
        extend: {
            aspectRatio: {
                '9/10': '9 / 10',
                '9/16': '9 / 16'
            },
        }

    },
    plugins: [require('tailwindcss-safe-area')],
}
