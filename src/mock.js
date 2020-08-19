import Mock from 'mockjs';


let users = [
  { id: 'admin', name: '留言板大大', password: 'admin' },
  { id: '001', name: '鲁班', password: '001' },
  { id: '002', name: '吕布', password: '002' },
  { id: '003', name: '貂蝉', password: '003' },
  { id: '004', name: '章雨婷', password: '004'}
];

let messageBoard = [
  { userName: '吕布', date: '2019/03/02', message: '我的貂蝉在哪里' },
  { userName: '貂婵', date: '2019/03/02', message: '子龙哥哥，纵使天各一方，小婵依然...' },
  { userName: '赵云', date: '2019/03/02', message: '枪尖在燃烧' },
  { userName: '李白', date: '2019/03/02', message: '一剑光寒耀九州' },
  { userName: '盾山', date: '2019/03/02', message: '%*(*$@$^&%#*(^%$$((&4754@$^&##%^&*$@@%&**%#$*^^:>":>":' }
]


/**
 * 添加messageBoard
 * @param {*} options 
 */
let messageBoardAdd = function (options) {
  let mes = JSON.parse(options.body);
  console.log('添加的留言==>', mes);
  messageBoard.unshift(mes);
  console.log('添加之后的留言==>', messageBoard)
  return {
    messageBoard
  }
}

/**
 * 删除,查询messageBoard
 * @param {*} options 
 */
let messageBoardSel = function (options) {
  if (options.body) {
    let key = JSON.parse(options.body).index;
    messageBoard.splice(key, 1);
  }
  console.log('查询或删除之后的数据==>', messageBoard);
  return {
    messageBoard
  }
}
/**
 * 根据用户id 查找用户名
 * @param {*} id 
 */
function selectLoginUser(id) {
  let user = users.filter(item => {
    return item.id === id;
  });
  // console.log(user[0].name)
  return user[0].name;
}

/**
 * 验证登录
 * @param {*} options 
 */
let verifyLoginUser = function (options) {
  let idFlag;
  let passwordFlag;
  let flag;
  let user = JSON.parse(options.body);
  console.log('请求登录的用户==>', user);
  try {
    users.forEach(item => {
      console.log(item.id);
      console.log(user.id);
      if ((idFlag = item.id === user.id ? true : false)) {
        throw new Error('==>id匹配成功');
      } else {
        console.log('===>找不到id', idFlag);
      }
    });
  } catch (error) {
    console.log(error.message, idFlag);
  }
  if (idFlag) {
    let isUser = users.filter(item => {
      return item.id === user.id;
    })[0];

    passwordFlag = isUser.password === user.password ? true : false;
    console.log(
      passwordFlag ? '===>密码匹配成功' : '===>密码错误',
      passwordFlag
    );
  }
  flag = idFlag &&
    passwordFlag &&
    (idFlag || passwordFlag != false);
  console.log('发送登录是否成功==>', flag);
  return {
    flag: flag,
    id: flag ? user.id : '',
    name: flag ? selectLoginUser(user.id) : ''
  };
}

/**
 * 修改数据
 */
let userUpdate = function (options) {
  console.log('请求数据==>', options);
  let user = JSON.parse(options.body);
  console.log('修改的数据==>', user);
  let index = users.findIndex(item => {
    return item.id === user.id;
  });
  console.log(index)
  users.splice(index, 1, user);
  return {
    users: users
  };
}


/**
 * 添加数据
 * @param {} options 
 */

let userAdd = function (options) {
  console.log('请求数据==>', options);
  let user = JSON.parse(options.body);
  console.log('添加的数据==>', user)
  users.unshift(user);
  return {
    users: users
  };
}


/**
 * 删除功能
 * 
 */
let userSel = function (options) {
  console.log('请求数据==>', options);
  let id = JSON.parse(options.body).id;// JSON.parse(options.body) 将json数据转为js对象类型
  users = users.filter(user => {
    return user.id != id;
  })
  return {
    users: users
  };
}
Mock.mock('api/messageBoardAdd', /get|post/i, messageBoardAdd);
Mock.mock('api/messageBoardSel', /get|post/i, messageBoardSel);
Mock.mock('api/verifyLoginUser', /get|post/i, verifyLoginUser);
Mock.mock('api/userUpdate', /get|post/i, userUpdate);
Mock.mock('api/userAdd', /get|post/i, userAdd);
Mock.mock(RegExp('api/userSel' + '.*'), /get|post/i, userSel);