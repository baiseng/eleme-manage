<template>
    <div id="main">
        <div id="switch">
            <span>登录</span>
            <el-switch
                    v-model="switchValue"
                    inactive-color="#409eff"
                    active-color="#13ce66">
            </el-switch>
            <span>注册</span>
        </div>
        <div id="login" v-show="!switchValue">
            <el-form :model="myForm" status-icon :rules="rules" ref="myForm" label-width="100px" class="demo-myForm">
                <el-form-item label="账号" prop="phone">
                    <el-input type="text" v-model="myForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="myForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('myForm')">登录</el-button>
                    <el-button @click="resetForm('myForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="logup" v-show="switchValue">
            <el-form :model="myForm" status-icon :rules="rules" ref="myForm" label-width="100px" class="demo-myForm">
                <el-form-item label="账号" prop="phone">
                    <el-input type="text" v-model="myForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="myForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="myForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :style="{backgroundColor:'#13ce66',borderColor:'#13ce66'}" @click="submitForm('myForm')">注册</el-button>
                    <el-button @click="resetForm('myForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }else {
                    callback()
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.myForm.checkPass !== '') {
                        this.$refs.myForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (this.switchValue) {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.myForm.pass) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                }else {
                    callback()
                }

            };
            return {
                switchValue:false,
                myForm: {
                    phone:'',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    phone: [
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.switchValue) {
                            this.logup(this.myForm)
                        }else {
                            this.login(this.myForm)
                        }
                    } else {
                        this.$message.error('无效的表单');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            login({phone,pass}){
                this.$axios.post('/user/login',{phone,pass,type:2}).then(data=>{
                    if (data.ok>0){
                        this.$store.state.token=localStorage.token=data.token
                    }
                })
            },
            logup({phone,pass}){
                this.$axios.post('/user',{phone,pass,type:2}).then(data=>{
                    console.log(data)
                })
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    #main{
        text-align: center;
        width: 400px;
        margin: 200px auto;
        border: 1px solid #42b983;
        padding: 30px 30px 30px 0;
        box-shadow: 0 0 10px 5px hotpink;
    }
    #switch{
        margin: 0 auto;
    }
</style>