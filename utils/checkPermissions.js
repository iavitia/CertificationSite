import { unAuthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return
  // if (req.user === res.toString()) return
  throw new unAuthenticatedError(
    'You are not authorized to perform this action'
  )
}

export default checkPermissions
