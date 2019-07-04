export default {
    filters:{
        date: function (v) {
            let time = new Date(v);
            return time.getFullYear() + "-" +
                (time.getMonth() + 1).toString().padStart(2, "0") + "-" +
                time.getDate().toString().padStart(2, "0") + " " +
                time.getHours().toString().padStart(2, "0") + ":" +
                time.getMinutes().toString().padStart(2, "0") + ":" +
                time.getSeconds().toString().padStart(2, "0");
        },
        currency(v,n=2){
            return "￥"+v.toFixed(n);
        },
        img(v){
            return "http://127.0.0.1:3000/"+v;
        },
        ifFalse(v){
            if (v === null||v===undefined){
                v='未定义'
            }
            return v
        }

    },
    install(Vue){
        for(let key in this.filters){
            Vue.filter(key,this.filters[key])
        }
    }

}
