
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

```
export const catchAsyncError = (theFunction) => {
    return (req, res, next)=>{
        Promise.resolve(theFunction(req, res, next)).catch(next);
    }

}
```
<br>
[추가 참고 자료:] (https://velog.io/@tastestar/Express-error-handling)
<br>
<h4>http요청과 별도로 jwt를 보낸다. jwt를 생성하는로직과 별도로 클라이언트에게 보내는 logic sendToken 함수 설정. </h4><br>
- statusCode는 Express.js에서 내장된 메서드인 res.status()의 매개변수를 이용해서 res.status(statusCode)로 응답상태 코드를 설정하고, res.cookie 메서드를 사용하여 클라이언트에게 jwt를 담을 쿠키를 설정한다. <br>
- 이 때 json형식으로 응답을 보내터 클라이언트에게 성공 및 "사용자 정보"와 함께 "토큰"을 보낸다. <br>
- JSON Web Token(JWT)을 생성할 때 사용되는 시크릿 키(secretOrPrivateKey)를 정의하는 것은 jsonwebtoken 라이브러리를 사용하여 JWT를 생성할 때 필요하므로 env파일에 JWT_SECRET_KEY=임의로 지정 <br>
- env 파일 s 오타 같은 거 나지 않도록 주의 (에러 사진) <br>


![register token](https://github.com/MangwonCassie/JobSeek/assets/129250487/42a48de7-bb0f-4b1c-b780-c73c4c77f3c7)
![expiresin](https://github.com/MangwonCassie/JobSeek/assets/129250487/b106cfbf-fe56-4e88-95cc-b33798b4b12a)
<br>
<h4>http요청과 별도로 jwt를 보낸다. jwt를 생성하는로직과 별도로 클라이언트에게 보내는 logic sendToken 함수 설정. </h4><br>
- 로그아웃 로직에서는 쿠키의 token을 빈 문자열로 설정하여 브라우저에서 해당 쿠키를 삭제하고, 만료일을 현재 시간으로 설정하여 쿠키를 즉시 만료시켜 로그아웃으로 처리합니다.
<br>
-코드 <br>

```
export const logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
        .json({
            success: true,
            message: "User Logged Out Successfully"
        })
})
```

<br><br>




![logout](https://github.com/MangwonCassie/JobSeek/assets/129250487/7b1087ac-7f01-41df-a64a-b1d99219f317)

![token 쿠키 설정](https://github.com/MangwonCassie/JobSeek/assets/129250487/f75db2d3-0fcb-4aad-a659-45abab202066)


<br>
<h4>role에 접근 안되는 이유</h4><br>
- +를 사용하지 않으면 해당 필드는 기본적으로 조회되지 않습니다. 즉, 해당 필드는 결과에 포함되지 않습니다. 따라서 +를 사용하여 해당 필드를 명시적으로 선택하여 조회해야 합니다. 그렇지 않으면 해당 필드에 접근할 때 undefined가 반환되거나 오류가 발생할 수 있습니다.<br>
<br>
- 관련 코드
<br>

```
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(
            new ErrorHandler("Please provide email ,password and role.", 400)
        );
    }
    const user = await User.findOne({ email }).select("password");;

    if (!user) {
        return next(new ErrorHandler("Invalid Email or password"));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }

    if (user.role !== role) {
        return next(
            new ErrorHandler(`User with provided email and ${role}, user.role ${user.role} not found!`, 404)
        );
    }
    sendToken(user, 201, res, "User Logged In!");
   });
```

<br>





![post a job](https://github.com/MangwonCassie/JobSeek/assets/129250487/3655c3cd-b744-48c9-b94f-feecc0e296f6)
<br>
- 해당 오류
<br>

![role is not defined](https://github.com/MangwonCassie/JobSeek/assets/129250487/7c43f0ec-f796-4137-8664-82073805285c)


<br>


<h4>Cloudinary (resume 저장소) 사용법</h4><br>
- .env 파일 설정<br>

```
CLOUDINARY_CLIENT_NAME=fffffff
CLOUDINARY_CLIENT_API=541233sss86232323
CLOUDINARY_CLIENT_SECRET=ubOH3VHq임의 코드
```
<br><br>
- server.js 설정<br>

```
import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`);
    });
```
<br>
<br>
-cloudinary resume 업로드 로직<br>
<br>

```
export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(
            new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Resume File Required!", 400));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(
            new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
        );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
    }
    const { name, email, coverLetter, phone, address, jobId } = req.body;

    console.log("Job ID:", jobId);

    const applicantID = {
        user: req.user._id,
        role: "Job Seeker",
    };
    if (!jobId) {
        return next(new ErrorHandler("Job not found!", 404));
    }
    const jobDetails = await Job.findById(jobId);

    if (!jobDetails) {
        return next(new ErrorHandler("Job not found!", 404));
    }

    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    };
    if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
    ) {
        return next(new ErrorHandler("Please fill all fields.", 400));
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
   });
```

<br><br>

- 일반적으로 파일 업로드를 처리하는 경우, 클라이언트 측에서 파일을 서버에 전송할 때는 파일을 multipart/form-data 형식으로 보냅니다. 이때 클라이언트가 전송한 파일은 서버의 라우트 핸들러에서 해당 요청(request) 객체의 req.files 속성에 자동으로 포함됩니다. <br>

- 이는 주로 파일 업로드를 위해 사용되는 라이브러리(예: multer)가 이 역할을 수행하기 때문입니다. multer 브라우저가 보낸 파일 데이터를 파싱하고 req.files에 적절한 형식으로 저장합니다.<br>
- Object.keys() 메서드는 주어진 객체의 열거 가능한 속성 이름들을 배열로 반환합니다. 이 배열은 객체의 속성 이름(key)을 포함하게 됩니다. 따라서 Object.keys(obj).length는 해당 객체 obj의 속성의 개수를 나타냅니다.<br>
- { resume } = req.files;  // req.files 객체에서 resume 속성에 해당하는 파일을 가져온 것.<br>
-image/png: PNG 형식의 이미지 파일을 나타냅니다., image/jpeg: JPEG 형식의 이미지 파일을 나타냅니다., image/webp: WebP 형식의 이미지 파일을 나타냅니다.<br>
-!allowedFormats.includes(resume.mimetype) 조건문은 resume 파일의 mimetype이 allowedFormats 배열에 포함되지 않을 때를 조건문으로 표현한 것입니다. <br>
- cloudinary.uploader.upload()는 cloudinary를 사용하여 resume 파일을 클라우드에 업로드합니다.
- resume.tempFilePath는 업로드할 파일의 임시 경로입니다.
- 업로드된 파일의 정보를 cloudinaryResponse 변수에 할당
- applicationID 객체를 만들 때 req.user._id는 현재 요청을 보내는 사용자 ID를 나타내는데 로그인 후 Express 세션 미들웨어가 사용자 정보를 세션에 저장하고 "요청 객체(req)에 사용자정보를 추가한다." 


![cloudinary config](https://github.com/MangwonCassie/JobSeek/assets/129250487/6f271835-9347-4e0e-b31e-054fd9dd2050)


<br><br>

![cloudinary media library](https://github.com/MangwonCassie/JobSeek/assets/129250487/eead3722-9e8d-4303-8b78-5432d16b05c0)

<br><br>

<h4>Job getall api res.status는 200이지만 console로 확인할 경우 html 응답으로 처리되는 거 오류 해결하는 방법 정리</h4><br>

![getall error](https://github.com/MangwonCassie/JobSeek/assets/129250487/d6330ace-1db0-45bf-8ca5-6c750d4c9159)

-axios 요청에서 Accept 헤더를 명시적으로 설정하지 않으면 서버가 HTML 대신 JSON 응답을 보내더라도, 클라이언트가 HTML로 응답을 받아들일 수 있음.<br>

- 관련 코드 <br>
```
const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const { isAuthorized } = useContext(Context);
    const navigateTo = useNavigate();
    useEffect(() => {
        try {
            axios
                .get("http://localhost:4000/api/v1/job/getall", {
                    withCredentials: true,
                    headers: {
                        "Accept": "application/json",
                    }
                })
                .then((res) => {
                    console.log("res.status", res.status);
                    console.log("Res.data", res.data); // res.data 출력
                    console.log("Res.data.data", res.data.data); // res.data 출력
                    console.log("Res.data.jobs", res.data.jobs); // res.data 출력
                    setJobs(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    if (!isAuthorized) {
        navigateTo("/");
    }
```
<br>
- console.log로 res.status는 200인 것을 확인했지만 res.data는 html형식, res.data.jobs 는 undefined가 뜬다는 사실 확인
- post요청이면 "Content-Type": "application/json" 까지 설정해줘야하지만 getall api는 get요청이므로 accept 헤더 타입만 기입해주면 됨.

<br>
<h4>500 error 처리 </h4><br>
![post job 500 error 해결](https://github.com/MangwonCassie/JobSeek/assets/129250487/e61d78ff-ce3f-4927-bec7-426b3bd0efa7)
- post job api 모델스키마와 controller 순서 맞춰야함. <br>


