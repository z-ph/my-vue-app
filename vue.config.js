module.exports = {
  // ...existing code...
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-vue-app/' // 这里的路径应该是你的仓库名称
    : '/'
  // ...existing code...
}
