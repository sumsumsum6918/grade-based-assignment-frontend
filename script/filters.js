let filters = [];

export function toggleFilter(filterToToggle) {
  if (!filters.includes(filterToToggle)) filters.push(filterToToggle);
  else filters = filters.filter((filter) => filter !== filterToToggle);
}

export function getFilters() {
  return filters;
}

export function clearFilters() {
  filters = [];
  const filterElements = document.querySelectorAll(".filter-element");
  filterElements.forEach((filterElement) => {
    filterElement.classList.remove("active");
  });
}
