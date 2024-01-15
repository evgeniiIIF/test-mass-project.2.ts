export const useMediaSizes = () => {
  const { breakpoint } = useViewport();

  const isMobile = computed(() => breakpoint.value === 'mobile');
  const isTablet = computed(() => breakpoint.value === 'tablet');
  const isDesktop = computed(() => breakpoint.value === 'desktop');

  return {
    isDesktop,
    isMobile,
    isTablet,
  };
};
