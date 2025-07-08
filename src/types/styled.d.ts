import 'styled-components'
import { FlattenSimpleInterpolation } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    mixins: {
      inlineLink: FlattenSimpleInterpolation
      button: FlattenSimpleInterpolation
      // add more mixins here as needed
    }
  }
}
