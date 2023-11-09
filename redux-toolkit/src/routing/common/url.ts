import { AppRoutes, RouteName } from './routes'
import { getQueryParamsString, replaceParams } from './routing-helpers'
import { Category } from '../../api-interface/models/site'
import { BreadcrumbItem } from '@benbeck764/react-components'

export const getPoemsUrl = (queryStringParams: { tag?: string }): string => {
  const params = []
  if (queryStringParams.tag) params.push(['tag', queryStringParams.tag])
  return `${AppRoutes[RouteName.Poems].path}${getQueryParamsString(params)}`
}

export type CategoryPoemsState = {
  category: Category
}

export const getCategoryPoemsUrl = (categorySlug: string): string => {
  return replaceParams(RouteName.CategoryPoems, [categorySlug])
}

export type PoemState = {
  breadcrumbs: BreadcrumbItem[]
  poemId: string
  jumpToComments?: boolean
}

export const getPoemUrl = (poemSlug: string): string => {
  return replaceParams(RouteName.Poem, [poemSlug])
}
