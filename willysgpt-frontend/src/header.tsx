import { HStack, Image, Box } from '@northlight/ui'
import willysLogo from './assets/logo.jpg'

export const Header = () => {
  return (
    <HStack
      w='full'
      p='8'
      borderBottomWidth='xs'
      borderBottomStyle='solid'
      borderBottomColor='red.500'
      position="sticky"
      top="0"
      bgColor="mono.white"
      zIndex="maxnus"
    >
      <Box w='32'>
        <Image src={willysLogo} />
      </Box>
    </HStack>
  )
}
