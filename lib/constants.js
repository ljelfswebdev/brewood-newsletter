export const DEFAULT_PAGE = () => ({
  id: (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : String(Math.random()),
  layout: 1,
  banner: {},
  content: {
    // LAYOUT 1
    left: { image: null, title: '', text: '' },
    rightBlocks: [{ image: null, title: '', text: '' }], // 👈 dynamic list

    // LAYOUT 2
    blocks: [{ image: null, title: '', text: '' }],

    // LAYOUT 3
    topLeft:  { image: null, title: '', text: '' },
    topRight: { image: null, title: '', text: '' },
    bottom:   { image: null, title: '', text: '' }
  },
  bottom: { socials: {} }
});