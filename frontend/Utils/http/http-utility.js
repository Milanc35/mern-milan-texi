import axios from "axios";
import NProgress from "nprogress";
import { toast } from 'react-toastify';

class HttpUtility {
    constructor(options) {
        this.options = {
            baseURL: "",
        };
        this.requestMessager = {};
        options && this.initOptions(options);
        const axiosInsance = this.initHttp();

        return axiosInsance;
    }

    initOptions (options) {
        if (!options) {
            options = {};
        }
        options.prefix = options.prefix || "/api";
        options.baseURL = options.baseURL || "";
        options.prefix = options.prefix || "api";
        if (process.env.NODE_ENV === "production") {
            if (options.baseURL && !(/http(s)?:\/\/|^\/\//).test(options.baseURL)) {
                options.baseURL = "";
            }
        }else {
            options.API_PORT = 8006;
        }
        if (options.prefix) {
            options.baseURL = options.prefix
        }
        console.log(options);
        this.options = options;
    }


    initHttp () {
        const instance = axios.create(this.options);
        instance.defaults.timeout = 10000;
        instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
        // 请求拦截器
        instance.interceptors.request.use(config => {
            this.requestMessager = Object.assign({// 请求判断（默认展示“错误”，隐藏“成功”）
                success: false,
                fail: true
            }, config.messager);

            NProgress.start();
            return config;
        }, error => {
            console.error("request error", error);
            return Promise.reject(error);
        });

        // 返回状态判断(添加响应拦截器)
        instance.interceptors.response.use(res => {
            NProgress.done();

            // 对响应数据错误的处理
            if((!res.status && !res.data) || res.status !== 200) { // 网络状态非200
                this.errorMsg(res, this.requestMessager);
                return false;
            }

            // 常规结构处理
            if(res.data.code !== undefined && res.data.code !== 0) {
                this.errorMsg(res, this.requestMessager);
                return false;
            }

            this.requestMessager.success && toast.success(typeof this.requestMessager.success === "string" ? this.requestMessager.success : "Success");

            return res.data.data || res.data.results;
        }, error => {
            NProgress.done();
            this.errorMsg(error, this.requestMessager);
            return Promise.reject(error);
        });

        return instance;
    }

    errorMsg(error, requestMessager) {
        if (error.data) {
            requestMessager.fail && toast.error( // 是否展示
                typeof requestMessager.fail === "string" ?
                    requestMessager.fail : error.data.message || error.data.msg || "Error" // 接收自定义字串信息
            );
        } else {
            const errorRes = JSON.parse(JSON.stringify(error)).response;
            toast.error(`Network Went Wrong<${errorRes.statusText}--${errorRes.status}>`);
        }
    }
}

export default HttpUtility;
