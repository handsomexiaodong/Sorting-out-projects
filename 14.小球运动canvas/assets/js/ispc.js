/*
 @判断是否是PC段还是移动端
 @函数返回true，则为PC端
 @函数返回false，则为移动端
 */
var phoneSystem=["iOS","Android","Symbian","iPhone","iPad","iPod"];
function isPC(){
	var str=navigator.userAgent;
	for (var i=0;i<phoneSystem.length;i++){
		var s=phoneSystem[i];
		if (str.indexOf(s)!=-1){
			return false;
		}
	}
	return true;
}
