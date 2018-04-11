var ary  = [1,2,3,1,2,1,4,1,1,2,4,1];
for (var i = 0; i < ary.length-1; i++) {
    var cur = ary[i];
    for (var j = i+1; j < ary.length;) {
        /*if(cur == ary[j]){
             ary.splice(j,1);
        }else{
            j++
        }*/
        cur == ary[j]?ary.splice(j,1) :j++;
    }
}
console.log(ary);
