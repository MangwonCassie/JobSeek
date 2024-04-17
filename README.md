
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
- 함수를 인수로 받아 express 미들웨어구조에 맞게 함수를 구성하고, Promise를 이용해서 비동기 함수 구현, 비동기 작업이 실패하면 catch를 통해 next로 함수에 오류를 전달하여 express의 오류처리 미들웨어로 이동시킴.
<br</br>

```export const catchAsyncError = (theFunction) => {
    return (req, res, next)=>{
        Promise.resolve(theFunction(req, res, next)).catch(next);
    }

}
```
<br>
[추가 참고 자료:] (https://velog.io/@tastestar/Express-error-handling)
<br>
- http요청과 별도로 jwt를 보낸다. jwt를 생성하는로직과 별도로 클라이언트에게 보내는 logic sendToken 함수 설정. <br>
- statusCode는 Express.js에서 내장된 메서드인 res.status()의 매개변수를 이용해서 res.status(statusCode)로 응답상태 코드를 설정하고, res.cookie 메서드를 사용하여 클라이언트에게 jwt를 담을 쿠키를 설정한다. 이 때 json형식으로 응답을 보내터 클라이언트에게 성공 및 "사용자 정보"와 함께 "토큰"을 보낸다. <br>
- JSON Web Token(JWT)을 생성할 때 사용되는 시크릿 키(secretOrPrivateKey)를 정의하는 것은 jsonwebtoken 라이브러리를 사용하여 JWT를 생성할 때 필요하므로 env파일에 JWT_SECRET_KEY=임의로 지정 <br>
- env 파일 s 오타 같은 거 나지 않도록 주의 (에러 사진) <br>




