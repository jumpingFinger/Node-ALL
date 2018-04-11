let url = 'http://www.zhufengpeixun.cn/stu?name=lucy&age=28&lx=#teacher';

/*==START ES6==*/
let obj = {},
    link = document.createElement('a');
link.href = url;
let {hash, search} = link;
hash.length > 0 ? obj['HASH'] = hash.substring(1) : null;
if (search.length > 0) {
    search = search.substring(1);
    search.split('&').forEach(item => {
        let [key, val] = item.split('=');
        obj[key] = val;
    });
}
console.log(obj);

