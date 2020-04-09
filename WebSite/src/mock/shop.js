import Mock from 'mockjs'

const url = {
    shopList: `/v1/b/shop/list`,
    shopAdd: `/v1/b/shop/add`,
    shopUpdate: `/v1/b/shop/update`,
    shopDelete: `/v1/b/shop/delete`,
}

let usersListData = Mock.mock({
  'data|10-20': [
    {
      id: '@id',
      name: '@name',
      contactMan: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      status: '@boolean',
      email: '@email',
      createAt: '@datetime',
      updateAt: '@datetime',
    },
  ],
})

let database = usersListData.data

export default [
    Mock.mock(url.shopList, function(options) {
      let body = options.body;
      return {
        "code": "SUCCESS",
        "data": {
          "shopList": database,
          "page": 1,
          "size": 10,
          "total": database.length
        },
        "message": "string",
        "success": true
      }
    }),
    Mock.mock(RegExp(url.shopAdd + ".*"), function(options) {
      let newData = options.body;

      let p = {
        createAt:Mock.mock('@now'),
        id : Mock.mock('@id'),
        status : 1,
        email: Mock.mock('@email'),
        updateAt: Mock.mock('@now'),
      }

      let data = Object.assign({},JSON.parse(newData),p)

      database.unshift(data)

      return {
        "code": "SUCCESS",
        "data": {},
        "message": "string",
        "success": true
      }
    
    }),
    Mock.mock(RegExp(url.shopUpdate + ".*"), function(options) {
      let newData = options.body;

      let params = JSON.parse(newData);

      let id = params.id ;

      let isExist = false

      database = database.map(item => {
        if (item.id === id) {
          isExist = true
          return Object.assign({}, item, params)
        }
        return item
      })

      return {
        "code": "SUCCESS",
        "data": {},
        "message": "string",
        "success": true
      }
    
    }),
     Mock.mock(RegExp(url.shopDelete + ".*"), function(options) {
      let data = options.body;

      let id = JSON.parse(data).id

      database = database.filter(item => id !== item.id)

      return {
        "code": "SUCCESS",
        "data": {},
        "message": "string",
        "success": true
      }
    
    }),
    
]