/*
 * 发现乘法表的计算规律，使用JS动态的把内容（包含了HTML标签）添加到页面中
 *  1、通过CREATE-ELEMENT动态创建元素完成
 *  2、也可以通过字符串拼接完成
 *  3、还可以通过ES6中的模板字符串完成
 *  ...
 */
// window.multiBox：直接通过ID获取元素对象使用

/*
9行（9个LI）
  1行 1列（一个SPAN）
  2行 2列
  3行 3列
  ...
  当前是第几行，我们这一行就有多少列

INNER-HTML
  通过此属性我们可以获取容器中的内容，也可以向容器中追加内容，追加的内容是字符串格式的，但是即使字符串中包含HTML标签字符，浏览器也可以自动识别，当做正常的标签来渲染

  所以我们只需要把九行九列需要的标签及内容拼接成一个字符串，最后把字符串整体通过INNER-HTML插入到页面中即可

  INNER-TEXT和其类似，但是它只能识别普通文本，不能识别出HTML标签字符
*/
// window.multiBox.innerHTML = '<li><span>1 * 1 = 1</span></li>';

//=>字符串拼接
let str = '';
for (let i = 1; i <= 9; i++) {
    //=>i行
    str += '<li>';
    for (let j = 1; j <= i; j++) {
        //=>j列
        str += '<span>';
        str += j + ' * ' + i + ' = ' + (j * i);//=>例如：3行2列 =>'2 * 3 = 6'
        str += '</span>';
    }
    str += '</li>';
}
window.multiBox.innerHTML = str;





