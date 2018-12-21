const {injectBabelPlugin, getLoader} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

const fileLoaderMatcher = function (rule) {
    return rule.loader && rule.loader.indexOf(`file-loader`) !== -1;
}

module.exports = function override(config, env) {
    //postcss
    require('react-app-rewire-postcss')(config, {
        plugins: loader => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
            require('postcss-aspect-ratio-mini')({}),
            require('postcss-px-to-viewport')({
                viewportWidth: 750, // (Number) The width of the viewport.
                viewportHeight: 1334, // (Number) The height of the viewport.
                unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                viewportUnit: 'vw', // (String) Expected units.
                selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                mediaQuery: false // (Boolean) Allow px to be converted in media queries.
            }),
            require('postcss-write-svg')({
                utf8: false
            }),
            require('postcss-viewport-units')({
                //https://blog.csdn.net/perryliu6/article/details/80965734
                filterRule: rule => rule.selector.indexOf('::after') === -1 &&
                    rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 &&
                    rule.selector.indexOf(':before') === -1
            }),
            require('cssnano')({
                preset: "advanced",
                autoprefixer: false,
                "postcss-zindex": false
            })
        ]
    });
    //按需加载antd-mobile组件
    config = injectBabelPlugin(['import', {
        libraryName: 'antd-mobile',
        //style: 'css',
        style: true,
    }], config);

    // customize theme
    //https://github.com/ant-design/antd-mobile-samples/blob/master/create-react-app/config-overrides.js
    config.module.rules[2].oneOf.unshift(
        {
            test: /\.less$/,
            use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            // require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ],
                    },
                },
                // {
                //     loader: require.resolve('less-loader'),
                //     options: {
                //         // theme vars, also can use theme.js instead of this.
                //         modifyVars: {
                //             "@brand-primary": "#1DA57A",
                //             "@brand-primary-tap": "#49A591",
                //             "@primary-color": "#1890ff",                         // 全局主色
                //             "@link-color": "#1890ff",                            // 链接色
                //             "@success-color": "#52c41a",                         // 成功色
                //             "@warning-color": "#faad14",                         // 警告色
                //             "@error-color": "#f5222d",                           // 错误色
                //             "@font-size-base": "14px",                           // 主字号
                //             "@heading-color": "rgba(0, 0, 0, .85)",              // 标题色
                //             "@text-color": "rgba(0, 0, 0, .65)",                 // 主文本色
                //             "@text-color-secondary": "rgba(0, 0, 0, .45)",       // 次文本色
                //             "@disabled-color" : "rgba(0, 0, 0, .25)",            // 失效色
                //             "@border-radius-base": "4px",                        // 组件/浮层圆角
                //             "@border-color-base": "#d9d9d9",                     // 边框色
                //             "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, .15)",  // 浮层阴影
                //         },
                //     },
                // },
            ]
        }
    );

    // file-loader exclude
    let l = getLoader(config.module.rules, fileLoaderMatcher);
    l.exclude.push(/\.less$/);

    //自定义主题
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@brand-primary": "#1DA57A",
            "@brand-primary-tap": "#49A591",
            "@primary-color": "#1890ff",                         // 全局主色
            "@link-color": "#1890ff",                            // 链接色
            "@success-color": "#52c41a",                         // 成功色
            "@warning-color": "#faad14",                         // 警告色
            "@error-color": "#f5222d",                           // 错误色
            "@font-size-base": "14px",                           // 主字号
            "@heading-color": "rgba(0, 0, 0, .85)",              // 标题色
            "@text-color": "rgba(0, 0, 0, .65)",                 // 主文本色
            "@text-color-secondary": "rgba(0, 0, 0, .45)",       // 次文本色
            "@disabled-color" : "rgba(0, 0, 0, .25)",            // 失效色
            "@border-radius-base": "4px",                        // 组件/浮层圆角
            "@border-color-base": "#d9d9d9",                     // 边框色
            "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, .15)",  // 浮层阴影
        },
        javascriptEnabled: true,
    })(config, env);

    //添加对装饰器支持
    config = injectBabelPlugin(["@babel/plugin-proposal-decorators", {legacy:true}], config);


    return config;
};