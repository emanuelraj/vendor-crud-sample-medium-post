import { css } from 'styled-components'
/**
 * MIXINS FOR STYLED COMPONENTS
 */

const SCREEN_MOBILESM_MIN = '320px'
const SCREEN_MOBILEM_MIN = '375px'
const SCREEN_MOBILEL_MIN = '770px'
const SCREEN_LAPTOP_MIN = '1024px'
const SCREEN_LAPTOPL_MIN = '1440px'
const SCREEN_DESKTOP_MIN = '2560px'

export const mobileSM = content => css`
  @media (max-width: ${SCREEN_MOBILESM_MIN}) {
    ${content}
  }
`

export const mobileM = content => css`
  @media (max-width: ${SCREEN_MOBILEM_MIN}) {
    ${content}
  }
`

export const mobileL = content => css`
  @media (max-width: ${SCREEN_MOBILEL_MIN}) {
    ${content}
  }
`

export const tablet = content => css`
  @media (min-width: ${SCREEN_MOBILEL_MIN}) {
    ${content}
  }
`

export const laptop = content => css`
  @media (max-width: ${SCREEN_LAPTOP_MIN}) {
    ${content}
  }
`
export const laptopL = content => css`
  @media (max-width: ${SCREEN_LAPTOPL_MIN}) {
    ${content}
  }
`

export const desktop = content => css`
  @media (max-width: ${SCREEN_DESKTOP_MIN}) {
    ${content}
  }
`
