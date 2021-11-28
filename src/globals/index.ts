export const BASE_API_PATH: string = 'https://wookie.codesubmit.io/movies';

export enum LoadingState {
  loading = 'loading',
  failed = 'failed',
  completed = 'completed'
}

export const showLoadingSpinner = (state: LoadingState): boolean => {
  return state === LoadingState.loading || state === LoadingState.failed;
}

export const PAGE_BREAKPOINTS = {
  small: 752,
  medium: 1009,
  large: 1425,
  xlarge: 1905
}