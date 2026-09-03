export const siteConfig = {
  IOS_APP_DOWNLOAD_LINK: '',
  ANDROID_APP_DOWNLOAD_LINK: '',
  PARTNER_CONTACT_URL: '/contact',
  SOCIAL_INSTAGRAM: 'https://instagram.com/kyapehnu',
  SOCIAL_LINKEDIN: 'https://linkedin.com/company/kyapehnu',
  SOCIAL_X: 'https://x.com/kyapehnu',
  DELIVERY_ETA_START_MINUTES: 45,
  STATS_DELIVERIES_COUNT: '50,000+',
  STATS_SATISFACTION_RATE: '98%',
  STATS_AVERAGE_RATING: 4.9,
  REVIEWS: [
    { name: 'Priya S.', rating: 5, text: 'Outfit arrived in 38 minutes. Wore it to the party the same night.' },
    { name: 'Rohan M.', rating: 5, text: 'Zero effort, full look. Delivered in 35 minutes.' },
    { name: 'Anika T.', rating: 5, text: 'Finally, fashion that keeps up with my last-minute plans.' },
  ],
  FOOTER_LINKS: {
    explore: {
      shop: '/#shop',
      trending: '/#shop',
      howItWorks: '/#how-it-works',
    },
    company: {
      about: '/about',
      careers: '/careers',
      partners: '/partners',
      contact: '/contact',
    },
    help: {
      faqs: '/faqs',
      delivery: '/delivery',
      returns: '/returns',
      support: '/support',
    },
  },
} as const;
