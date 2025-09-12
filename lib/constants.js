export const DEFAULT_PAGE = () => ({
  id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Math.random()),
  layout: 1,
  banner: {},
  content: {
    left: { image: null, title: '', text: '' },
    rightTop: { image: null, title: '', text: '' },
    rightBottom: { image: null, title: '', text: '' },

    // Layout 2: start with ONE empty block
    blocks: [{ image: null, title: '', text: '' }],

    // Layout 3
    topLeft:  { image: null, title: '', text: '' },
    topRight: { image: null, title: '', text: '' },
    bottom:   { image: null, title: '', text: '' }
  },
  bottom: {
    socials: {}
  }
});