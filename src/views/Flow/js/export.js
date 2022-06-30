//csv
export function handleDownloadCSV(data) {
  const tHeader = "名称,长,宽,高,坐标（X）,坐标（Y）,坐标（Z）";
  const filterVal = [
    "name",
    "width",
    "height",
    "depth",
    "x",
    "y",
    "z"
  ];
  // this.list.unshift(Headers)
  const list = data;
  let csvString = tHeader;
  csvString += '\r\n'
  list.map(item => {
    filterVal.map(key => {
      let value = item[key];
      csvString += value + ",";
    });
    csvString += "\r\n";
  });
  csvString = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(csvString);
  let link = document.createElement('a');
  link.href = csvString;
  //对下载的文件命名
  link.download = "数据.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
//json
export function saveJSON(data, filename) {
  if (!data) {
    alert('保存的数据为空');
    return;
  }
  if (!filename) filename = 'json.json';
  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4);
  }
  var blob = new Blob([data], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}
