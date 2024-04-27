import { HStack, Image, Box } from '@northlight/ui'
import willysLogo from './assets/logo.jpg'

export const Header = () => {
  return (
    <HStack
      w='full'
      p='8'
      borderBottomWidth='xs'
      borderBottomStyle='solid'
      borderBottomColor='border.default'
    >
      <Box w='32'>
        <Image src={willysLogo} />
      </Box>
    </HStack>
  )
}
