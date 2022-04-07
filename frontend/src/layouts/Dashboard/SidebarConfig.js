// components
import { Iconify } from '../../components'

const getIcon = (name) => (
  <Iconify icon={name} sx={{ width: '100%', height: '100%' }} />
)

const ICONS = {
  practice: getIcon('eva:book-open-fill'),
  contribute: getIcon('eva:plus-square-fill'),
  about: getIcon('eva:info-fill')
}

const sidebarConfig = [
  // TRAINING
  // ----------------------------------------------------------------------
  {
    subheader: 'Training',
    items: [
      {
        title: 'practice',
        path: '/study',
        icon: ICONS.practice
      },
      {
        title: 'contribute',
        path: '/contribute',
        icon: ICONS.contribute
      }
    ]
  },

  // EXTRA
  // ----------------------------------------------------------------------
  {
    subheader: 'extra',
    items: [
      // Company Info
      {
        title: 'company',
        icon: ICONS.about,
        children: [
          { title: 'about', path: '/about' },
          { title: 'blog', path: '/blog' },
          { title: 'contact', path: '/contact' }
        ]
      }
    ]
  }
]

export default sidebarConfig
