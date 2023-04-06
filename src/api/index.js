//引入封装好的axios拦截文件
import request from "./request";

//验证用户信息
export function LoginApi(data){
    return request({
        url: '/login',
        method: 'get',
        data
    })
}

//注册用户信息
export function RegisterApi(data){
    return request({
        url: '/register',
        method: 'post',
        data
    })
}

//用户退出
export function LogoutApi(){
    return request({
        url: '/logout',
        method: 'get'
    })
}

//获取用户信息
export function getInfoApi(){
    return request({
        url: '/getInfo',
        method: 'get',
    })
}

//显示主页信息
export function getHomeInfo(){
    return request({
        url: '/getHomeInfo',
        method: 'get'
    })
}

//添加或者更新主页信息
export function addOrUpdateHomeInfo(data){
    return request({
        url: '/addOrUpdateHomeInfo',
        method: 'post',
        data
    })
}

//删除主页信息
export function deleteHomeInfo(data){
    return request({
        url: '/deleteHomeInfo',
        method: 'delete',
        data
    })
}

//添加或者更新横幅信息
export function addOrUpdateBannerInfo(data){
    return request({
        url: '/addOrUpdateBannerInfo',
        method: 'post',
        data
    })
}

//删除横幅信息
export function deleteBannerInfo(data){
    return request({
        url: '/deleteBannerInfo',
        method: 'delete',
        data
    })
}

//搜索商品
export function getSearchApi(data){
    return request({
        url: '/getSearchList',
        method: 'get',
        data
    })
}

//获取商品列表
export function getGoodsListApi(type, data){
    return request({
        url: `/getGoodsList/${type}`,
        method: 'get',
        data
    })
}

//显示商品详情信息
export function getDetailInfoApi(data){
    return request({
        url: '/getDetailInfo',
        method: 'get',
        data
    })
}

//添加商品信息
export function addOrUpdateGoodsInfoApi(data){
    return request({
        url: '/addOrUpdateGoodsInfo',
        method: 'post',
        data
    })
}

//删除商品信息
export function deleteGoodsInfoApi(data){
    return request({
        url: '/deleteGoodsInfo',
        method: 'get',
        data
    })
}

//显示顾客的购物车
export function getCartList(){
    return request({
        url: '/getCartList',
        method: 'get'
    })
}

//添加商品到购物车
export function addCartApi(data){
    return request({
        url: '/addCart',
        method: 'post',
        data
    })
}

//从购物车删除商品
export function deleteCartApi(data){
    return request({
        url: '/deleteCart',
        method: 'post',
        data
    })
}

//保存购物车数据
export function updateCartApi(data){
    return request({
        url: '/updateCart',
        method: 'post',
        data
    })
}

//获取收藏商品信息
export function getCollectionApi(){
    return request({
        url: '/getCollection',
        method: 'get'
    })
}

//添加收藏
export function addCollectionApi(data){
    return request({
        url: '/addCollection',
        method: 'get',
        data
    })
}

//删除收藏
export function deleteCollectionApi(data){
    return request({
        url: '/deleteCollection',
        method: 'post',
        data
    })
}

//历史浏览记录数据
export function getHistoryApi(){
    return request({
        url: '/getHistory',
        method: 'get'
    })
}

//添加历史浏览记录
export function addHistoryApi(data){
    return request({
        url: '/addHistory',
        method: 'get',
        data
    })
}

//删除历史浏览记录
export function deleteHistoryApi(data){
    return request({
        url: '/deleteHistory',
        method: 'delete',
        data
    })
}
