import { extendTheme } from '@chakra-ui/react'
import { theme } from '@northlight/ui'
import { palette} from '@northlight/tokens'

const overrides = {
    colors: {
        ...palette,
        'red': {
            ...palette['red'],
            500: 'rgb(230, 0, 25)',
        },
    }
}

export const willysTheme = extendTheme(overrides, theme)