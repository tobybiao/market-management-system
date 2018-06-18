/**
 * 入住商家服务
 */
import axios from 'axios'

/**
 * 添加入住商家商品新分类信息
 */
export const businessGoodsNewCategoryAdd = (businessGoodsNewCategory) => {
    return axios.post('/api/businessGoods/category', businessGoodsNewCategory)
}

/**
 * 获取指定商家商品分类信息
 */
export const getAllBusinessGoodsCategories = (businessId) => {
    return axios.get('/api/businessGoods/category', {
        params: {
            businessId
        }
    })
}

/**
 * 根据入住商家商品分类获取商品规格参数模板信息
 */
export const getBusinessGoodsCategoryParamsTemplateInformationByCategoryId = (categoryId) => {
    return axios.get('/api/businessGoods/paramsTemplate?categoryId=' + categoryId)
}

/**
 * 入住商家添加自己的商品
 */
export const businessGoodsNewGoodsAdd = (businessGoods) => {
    return axios.post('/api/business/goods', businessGoods)
}

/**
 * 分页展示商场商家自家所有商品信息
 */
export const getAllBusinessGoodsByPage = (businessId, pageIndex, pageSize) => {
    return axios.get('/api/business/goods/page', {
        params: {
            businessId,
            pageIndex,
            pageSize
        }
    })
}

/**
 * 通过商品名称查找商家自家商品信息，分页展示
 */
export const getAllBusinessGoodsByNameAndPage = (name, businessId, pageIndex, pageSize) => {
    return axios.get('/api/business/goods/pageByName', {
        params: {
            name,
            businessId,
            pageIndex,
            pageSize
        }
    })
}

/**
 * 修改入住商家商品信息
 */
export const updateBusinessGoods = (businessGoods) => {
    return axios.put('/api/business/goods', {
        id: businessGoods.id,
        name: businessGoods.name,
        description: businessGoods.description,
        category: businessGoods.categoryIdAndName
    })
}

/**
 * 通过商品id 来删除商品
 * 商品id mongoDB ObjectId
 */
export const deleteBusinessGoods = (id) => {
    return axios.delete('/api/business/goods/' + id)
}

/**
 * 通过唯一的商品sku 编码查找商品信息
 */
export const getBusinessGoodsBySku = (sku) => {
    return axios.get('/api/business/goods/' + sku)
}

/**
 * 商家提交订单服务
 */
export const businessOrder = (order) => {
    return axios.post('/api/business/order', order)
}

/**
 * 通过商家id 分页查看商家订单
 */
export const getBusinessOrderByPage = (businessId, pageIndex, pageSize) => {
    return axios.get('/api/business/order/page', {
        params: {
            businessId,
            pageIndex,
            pageSize
        }
    })
}
