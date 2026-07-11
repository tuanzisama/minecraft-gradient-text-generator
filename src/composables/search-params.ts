export function useSearchParams() {
  return new URLSearchParams(location.search);
}
