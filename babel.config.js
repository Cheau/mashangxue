module.exports = {
  plugins: [
      ['wildcard', {
          'noModifyCase': true,
      }],
  ],
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
};
