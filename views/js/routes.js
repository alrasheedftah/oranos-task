let routes=[
    {path:'/',component:require('./pages/index.vue').default},
    {path:'/contact',component:require('./pages/contact/contact.vue').default},
    {path:'/login',component:require('./pages/auth/login.vue').default},
    {path:'/orders',component:require('./pages/orders/orders.vue').default,meta:{
        requiresAuth:true
    }},
    {path:'/skills',component:require('./pages/skills/sills.vue').default},
    {path:'/users',component:require('./pages/users/users.vue').default,meta:{
        requiresAuth:true
    }},
    {path:'/products',component:require('./pages/products/products.vue').default,meta:{
        requiresAuth:true
    }},
 
];


export default routes;