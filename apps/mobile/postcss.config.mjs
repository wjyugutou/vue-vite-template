import postcssPresetEnv from 'postcss-preset-env'
// import PxToRem from 'postcss-pxtorem'

export default {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    // PxToRem({
    //   rootValue: 37.5, // Vant 官方根字体大小是 37.5
    //   propList: ['*'],
    //   selectorBlackList: ['.norem', /.*px$/], // 过滤掉.norem-开头/px结尾 的class，不进行rem转换
    //   minPixelValue: 2, // 最小转换的像素值，小于该值的 px 不转换
    // }),
  ],
}
