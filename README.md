
<h3>Job Seeking Homepage</h3>

React, Node, MongoDB, Express<br/>

Library bcrypt cloudinary cookie-parser cors dotenv express express-fileupload jsonwebtoken mongoose validator<br/><br/>

⭐Git Configuration <br/>
git init git remote add origin https://github.com/MangwonCassie/JobSeekingApp.git <br/>
⭐⭐⭐⭐⭐(node_modules/ in .gitignore)⭐⭐⭐⭐<br/>
git add .<br/>
git commit -m "commit message"<br/>
git push -u origin master<br/>

<h3>구현해야할 기능</h3>
1. cloudinary 연결 및 관련 storage 구성


<br>
<h3>주요 코드</h3>
함수를 인수로 받아 express 미들웨어구조에 맞게 함수를 구성하고, Promise를 이용해서 비동기 함수 구현, 비동기 작업이 실패하면 catch를 통해 next로 함수에 오류를 전달하여 express의 오류처리 미들웨어로 이동시킴.
<br</br>

```export const catchAsyncError = (theFunction) => {
    return (req, res, next)=>{
        Promise.resolve(theFunction(req, res, next)).catch(next);
    }

}
```
<br>
[추가 참고 자료:] (https://velog.io/@tastestar/Express-error-handling)

