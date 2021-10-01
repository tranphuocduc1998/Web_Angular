import { MatPaginatorIntl } from '@angular/material/paginator';
const customRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 Trên tổng ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} Trên tổng ${length}`;
};

export function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = 'Số lượng dòng hiển thị:';
    customPaginatorIntl.firstPageLabel = 'Trang đầu';
    customPaginatorIntl.nextPageLabel = 'Trang kế';
    customPaginatorIntl.previousPageLabel = 'Trang trước';
    customPaginatorIntl.lastPageLabel = 'Trang cuối';
    customPaginatorIntl.getRangeLabel = customRangeLabel;

    return customPaginatorIntl;
}