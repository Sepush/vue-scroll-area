import type { InjectionKey } from 'vue'
import type { ScrollAreaInjection } from './public-types'

export const scrollAreaInjectionKey: InjectionKey<ScrollAreaInjection> = Symbol('scroll-area')
