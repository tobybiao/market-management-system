import axios from 'axios'
import qs from 'qs'
/**
 * 通过用户名、密码、用户类型登录
 */
export const accountLogin = (username, password, userType) => {
    return axios.post('/api/user/login', qs.stringify({
        username,
        password,
        userType
    }))
}
/**
 * 用户请求退出登录系统
 */
export const accountLogout = () => {
    return axios.post('/api/user/logout')
}
/**
 * 添加商场商品新分类信息
 */
export const marketGoodsNewCategoryAdd = (marketGoodsNewCategory) => {
    return axios.post('/api/market/category', {
        parent_ids: marketGoodsNewCategory.parent_ids,
        name: marketGoodsNewCategory.name,
        description: marketGoodsNewCategory.description,
        param_templates: marketGoodsNewCategory.param_template
    })
}

/**
 * 获取商场所有商品分类信息
 */
export const getAllMarketGoodsCategories = () => {
    return axios.get('/api/market/category')
}

/**
 * 根据商场商品分类获取商品规格参数模板信息
 */
export const getMarketGoodsCategoryParamsTemplateInformationByCategoryId = (categoryId) => {
    return axios.get('/api/market/paramsTemplate?categoryId=' + categoryId)
}

/**
 * 添加商场商品
 */
export const marketGoodsNewGoodsAdd = (marketGoods) => {
    return axios.post('/api/market/goods', marketGoods)
}

/**
 * 获取商场所有商品信息
 */
export const getAllMarketGoods = () => {
    return axios.get('/api/market/allGoods')
}

/**
 * 分页查找商场所有商品信息
 */
export const getAllMarketGoodsByPage = (pageIndex, pageSize) => {
    return axios.get('/api/market/page', {
        params: {
            pageIndex,
            pageSize
        }
    })
}

/**
 * 通过商品名称查找商场商品信息，分页展示
 */
export const getAllMarketGoodsByNameAndPage = (name, pageIndex, pageSize) => {
    return axios.get('/api/market/pageByName', {
        params: {
            name,
            pageIndex,
            pageSize
        }
    })
}

/**
 * 添加商场管理员
 */
export const addMarketManager = (marketManager) => {
    return axios.post('/api/user/marketManager', marketManager)
}
/**
 * 分页查找商场所有商场管理员信息
 */
export const getAllMarketManagersByPage = (pageIndex, pageSize) => {
    return axios.get('/api/user/marketManager/page', {
        params: {
            pageIndex,
            pageSize
        }
    })
}
/**
 * 通过用户名查找商场所有商场管理员信息
 */
export const getAllMarketManagersByNameAndPage = (username, pageIndex, pageSize) => {
    return axios.get('/api/user/marketManager/page/username', {
        params: {
            username,
            pageIndex,
            pageSize
        }
    })
}

/**
 * 添加商场收银员
 */
export const addMarketCashier = (marketCashier) => {
    return axios.post('/api/user/marketCashier', marketCashier)
}

/**
 * 分页查找商场所有收银员信息
 */
export const getAllmarketCashiersByPage = (pageIndex, pageSize) => {
    return axios.get('/api/user/marketCashier/page', {
        params: {
            pageIndex,
            pageSize
        }
    })
}

/**
 * 通过用户名查找商场所有收银员信息
 */
export const getAllmarketCashiersByNameAndPage = (username, pageIndex, pageSize) => {
    return axios.get('/api/user/marketCashier/page/username', {
        params: {
            username,
            pageIndex,
            pageSize
        }
    })
}

/**
 * 添加入住商家新分类信息
 */
export const businessCategoryAdd = (businessCategory) => {
    return axios.post('/api/business/category', businessCategory)
}

/**
 * 获取商场所有入住商家分类信息
 */
export const getAllBusinessCategories = () => {
    return axios.get('/api/business/category')
}

/**
 * 添加入住商家
 */
export const addBusiness = (business) => {
    return axios.post('/api/user/business', business)
}

/**
 * 分页查找商场所有入住商家信息
 */
export const getAllBusinessByPage = (pageIndex, pageSize) => {
    return axios.get('/api/user/business/page', {
        params: {
            pageIndex,
            pageSize
        }
    })
}

/**
 * 通过用户名查找商场所有入住商家信息
 */
export const getAllBusinessByNameAndPage = (username, pageIndex, pageSize) => {
    return axios.get('/api/user/business/page/username', {
        params: {
            username,
            pageIndex,
            pageSize
        }
    })
}

/**
 * 修改入住商家
 */
export const updateBusiness = (business) => {
    return axios.put('/api/user/business', business)
}
