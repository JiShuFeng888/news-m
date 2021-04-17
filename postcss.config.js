module.exports = {
  plugins: {
    autoprefixer: {
      // 自动添加前缀,兼容不同的浏览器
      //vue cli 已经配置过了
      // browsers: ['Android >= 4.0', 'iOS >= 8'],
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],

    },
  },
};

