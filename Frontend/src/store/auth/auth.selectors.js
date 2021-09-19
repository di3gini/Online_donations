export const selectAccessToken = ({ auth }) => auth.accessToken
export const selectCurrentUser = ({ auth }) => auth.user
export const selectCurrentUserId = ({ auth }) => auth.user?.id
export const selectIsLogout = ({ auth }) => auth.logout
