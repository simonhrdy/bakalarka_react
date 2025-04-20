export function paginate(array, currentPage, itemsPerPage) {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return array.slice(indexOfFirstItem, indexOfLastItem);
}
