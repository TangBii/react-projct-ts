const {override, fixBabelImports, addLessLoader} = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
        // 自定义主题
      "@brand-primary": "#F1A200",
      "@brand-primary-tap": "#CC8800"
  },
  }),
)