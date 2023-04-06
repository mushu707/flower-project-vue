export function format(timestamp){
  let time = new Date(timestamp);
  let Y = time.getFullYear() + '-';
  let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
  let D = time.getDate() + ' ';
  let h = time.getHours() + ':';
  let m = time.getMinutes() + ':';
  let s = time.getSeconds();
  return Y + M + D + h + m + s;
}