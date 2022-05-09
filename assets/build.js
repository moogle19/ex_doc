const esbuild = require("esbuild")
const { default: hbsPlugin } = require("@lighthousesystems/esbuild-plugin-handlebars");

esbuild.build({
    entryPoints: [
        "entrypoints/epub/dist/app.js",
        "entrypoints/epub/dist/elixir.css",
        "entrypoints/epub/dist/erlang.css",
        "entrypoints/html/dist/app.js",
        "entrypoints/html/dist/elixir.css",
        "entrypoints/html/dist/erlang.css",
    ],
    bundle: true,
    loader: {
        '.woff2': 'dataurl'
    },
    plugins: [
        hbsPlugin({
            filter: /\.(hbs|handlebars)$/i,
            additionalHelpers: {
                groupChanged: "../template-helpers/groupChanged.js",
                isArray: "../template-helpers/isArray.js",
                isLocal: "../template-helpers/isLocal.js",
                isNonEmptyArray: "../template-helpers/isNonEmptyArray.js",
                nestingChanged: "../template-helpers/nestingChanged.js",
                showSections: "../template-helpers/showSections.js",
                showSummary: "../template-helpers/showummary.js",
            },
            precompileOptions: {}
        })
    ],
    outdir: "../formatters",
    entryNames: '[dir]/[name]-[hash]'
})