// components
import { Iconify } from '../../components'
// routes
import { PATH_DASHBOARD, PATH_COMPANY } from '../../routes/paths'

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
        path: PATH_DASHBOARD.practice.study,
        icon: ICONS.practice
      },
      {
        title: 'contribute',
        path: PATH_DASHBOARD.practice.contribute,
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
          { title: 'about', path: PATH_COMPANY.about },
          { title: 'blog', path: PATH_COMPANY.blog },
          { title: 'contact', path: PATH_COMPANY.contact }
        ]
      }
    ]
  }
]

export default sidebarConfig
