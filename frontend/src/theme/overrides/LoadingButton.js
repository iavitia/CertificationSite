export default function LoadingButton(theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0
            }
          }
        },
        containedInherit: {
          color: theme.palette.grey[800],
          '&:hover': {
            backgroundColor: theme.palette.grey[400]
          }
        }
      }
    }
  }
}
