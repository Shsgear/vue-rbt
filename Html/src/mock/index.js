import Mock from 'mockjs';


const loginData = Mock.mock('/SexyRobot/login', {
  "code": 2,                                       // Code
  "UUID": "1d6c0810-2bd6-45f3-9890-0268422a6f14",   // UUID
  "msg": "UUID 不合法"
}
)

export default loginData;
