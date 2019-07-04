<template>
    <div id="storeInfo">
        <div v-if="ok===-1">
            <h3>您还没有店铺，赶快创建一家店铺吧</h3>
            <el-button>创建店铺</el-button>
        </div>
        <div v-if="ok===1">
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">Id:</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{store.id}}</div></el-col>
            </el-row>
            <el-row >
                <el-col :span="8"><div class="grid-content bg-purple">名称</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{store.name|ifFalse}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"><el-button @click="alterTxt('name')">修改</el-button></div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">图片:</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"><img :src="store.img|img" height="70px" alt="无图片"/></div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">
                    <el-button @click="dialogFormVisible = true">修改</el-button>

                    <el-dialog title="修改图片" :visible.sync="dialogFormVisible">
                        <el-upload
                                ref="elUpload"
                                class="upload-demo"
                                :auto-upload="false"
                                action="http://127.0.0.1:3000/store/alter"
                                :name="'img'"
                                :file-list="fileList2"
                                :headers="{Authorization:this.$store.state.token}"
                                :limit="1"
                                :on-exceed="handleExceed"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="okClick">确 定</el-button>
                        </div>
                    </el-dialog>
                </div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">手机号:</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{store.phone|ifFalse}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"><el-button @click="alterTxt('phone')">修改</el-button></div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">地址:</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{store.addr|ifFalse}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"><el-button @click="alterTxt('addr')">修改</el-button></div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">创建时间:</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{store.createdAt|ifFalse}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">修改时间:</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{store.updatedAt|ifFalse}}</div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StoreInfo",
        data() {
            return {
                ok:-1,
                store:{},
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                fileList2:[]
                // fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            }
        },
        methods:{
            alterTxt(key) {
                this.$prompt('请输入新的值', '修改', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /.+/,
                    inputErrorMessage: '不允许为空'
                }).then(({ value }) => {
                    let data={[key]:value};
                    console.log(data);
                    this.$axios.post('/store/alter',data).then(data=>{
                        if (data.ok > 0) {
                            this.$message({
                                type: 'success',
                                message: '修改该成功: ' + value
                            });
                            this.getStore()
                        }
                    });
                });
            },
            okClick(){
                this.dialogFormVisible = false;
                console.log(this.$refs.hh);
                this.$refs.elUpload.submit();
                this.getStore();
            },
            getStore(){
                this.$axios.get('/store', {params: {type: 1}}).then(data => {
                    this.ok = data.ok;
                    if (data.ok === 1) {
                        this.store=data.store;
                    }
                    console.log(data)
                })
            },
            handleExceed() {
                this.$message.warning('只能上传一个文件');
            }
        },
        mounted() {
            this.getStore();
        }
    }
</script>

<style scoped>
    #storeInfo {
        text-align: center;
        margin: 0 auto;
    }
    .el-row{
        line-height: 60px;
    }
</style>