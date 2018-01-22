const XLSX = require('xlsx');
const filePath = __dirname + '/../data/asset-location.xls';
const SHEET_NAME = 'sheet1';

function readRows() {
    let book = XLSX.readFileSync(filePath), result = [];
    //拿到指定 sheet 页对象
    let sheet = book.Sheets[SHEET_NAME],
        //得到当前页内数据范围
        range = XLSX.utils.decode_range(sheet['!ref']),
        //保存数据范围数据
        row_start = range.s.r, row_end = range.e.r,
        col_start = range.s.c, col_end = range.e.c,
        rows = [], row_data, i, addr, cell;
    //按行对 sheet 内的数据循环,去除标题行
    for (row_start = 1; row_start <= row_end; row_start++) {
        row_data = [];
        //读取当前行里面各个列的数据
        for (i = col_start; i <= col_end; i++) {
            addr = XLSX.utils.encode_col(i) + XLSX.utils.encode_row(row_start);
            cell = sheet[addr];
            row_data.push(cell ? cell.v : undefined);
        }
        rows.push(row_data);
    }
    //保存当前页内的数据
    Array.prototype.push.apply(result, rows);
    return result;
}

console.log(readRows());