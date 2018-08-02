let Mock = require('mockjs');
Mock.mock('/getCheckCode', 'get', function() {
    return Mock.mock({"checkCode":/[a-zA-Z0-9]{4}/});
});

Mock.mock('/getGoods', 'get', function() {
    return Mock.mock({"goodsIndex|10":[
        {
            "index|0-9":1
        }
    ]});
});