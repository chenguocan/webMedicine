export default  {
    navBar: {
        active: '0',
        list: [
            {
                name: '首页',
                subActive: '0',
                subMenu: [
                    {
                        name: '后台首页',
                        icon: 'el-icon-s-order',
                        pathname: 'index'
                    },
                    {

                        name: '图片列表',
                        icon: 'el-icon-s-grid',
                        pathname: 'images'
                    },
                    {
                        name: '商品列表',
                        icon: 'el-icon-s-claim',
                        pathname:'goods'
                    },
                ]
            },
            {
                name: '商品',
                subActive: '0',
                subMenu: [
                    {

                        name: '订单列表',
                        icon: 'el-icon-s-claim',
                        pathname:'orders'
                    },
                    {

                        name: '3',
                        icon: ''
                    },
                    {

                        name: '4',
                        icon: ''
                    }
                ]
            },
            {
                name: '订单'
            },
            {
                name: '会员'
            },
            {
                name: '设置'
            }
        ]
    }
}
