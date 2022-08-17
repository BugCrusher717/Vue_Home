import GoogleAuth from './../plugins/GoogleAuth';

export default {
    install (Vue, params) {
        Vue.GoogleAuth = GoogleAuth.load(params);
    }
}