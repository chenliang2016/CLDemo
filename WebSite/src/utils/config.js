import rekitLogo from '../images/rekit-logo.svg';

export const config = {
  siteName: '管理后台',
  copyright: 'Ant Design Admin  ©2019 zuiidea',
  logoPath: rekitLogo,
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    },
  ],
}
