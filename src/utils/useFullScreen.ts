import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'


function useFullScreen() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down(1023));
    return fullScreen
}

export default useFullScreen;

