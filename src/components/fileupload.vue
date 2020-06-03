/**
**文件上传组件
**vofill
**2020-05-16
**/

<template>
    <div class="file-upload">
        <div class="fu-btn">
            <input type="file" multiple="multiple" @change="uploadChange" title="" />
            <div class="fub-style">请选择文件</div>
        </div>
        <div class="fu-list">
            <div class="ful-item ful-file" v-for="(o, i) in notImageList" :key="i">
                {{o.Name}}({{o.Size}})
                <span class="fuli-down" v-if="o.AddFlag!=1"><a src="" download="o.Name" target="_blank">下载</a></span>
                <span class="fuli-del" @click="delFile(o)">删除</span>
            </div>
            <div class="ful-item ful-image" v-for="(o, i) in imageList" :key="i" @click="previewImgClick(i)">
                <img :src="o.Url" alt="" />
                <span class="fuli-del" @click.stop="delFile(o)"></span>
            </div>
        </div>
        <vofill-preview-img :list="previewImageList" :index="currIndex" :show.sync="previewImgFlag" :autoplay.sync="autoplayImgFlag"></vofill-preview-img>
    </div>
</template>

<script>
    import vofillPreviewImg from './previewimg'
    import vofill from "../js/common/vofill.js";

    export default {
        name: "vofill-fileupload",
        components: {
            vofillPreviewImg
        },
        props: {              //prop接收传过来的参数
            "name": String,
            "list": Array
        },
        data () {
            return {
                currIndex: 0,
                previewImgFlag: false,
                autoplayImgFlag: false,
                fileList: this.list ? this.list : []
            }
        },
        computed: {
            imageList() {
                return this.fileList.filter(o=> o.Type == 1);
            },
            notImageList() {
                return this.fileList.filter(o=> o.Type > 1);
            },
            previewImageList() {
                var prevImgList = [];
                this.imageList.forEach(o=> {
                    prevImgList.push(o.Url);
                });
                return prevImgList;
            }
        },
        methods: {
            //文件选择
            uploadChange(e) {
                let obj = this;
                // 获取文件信息
                // 返回值是一个 FileList 对象,这个对象是一个包含了许多 File 文件的列表(你也可以像列表一样操作它).
                // 每个 File 对象包含了下列信息: 
                    // name: 文件名.
        　　        // lastModified: UNIX timestamp 形式的最后修改时间.
        　　        // lastModifiedDate: Date 形式的最后修改时间.
        　　        // size: 文件的字节大小.
        　　        // type: 文件类型.
                // 获取单个文件信息
                let files = e.target.files;
                for(let i = 0; i < e.target.files.length; i++) {
                    let file = e.target.files[i], fileTemp = {};
                    fileTemp.AddFlag = 1;
                    fileTemp.File = file;
                    fileTemp.Guid = vofill.generateGuid() + "." + vofill.getSuffixOfFile(file.name);
                    fileTemp.Name = file.name;
                    fileTemp.Type = vofill.judgeFileType(file.name);
                    if(file.size/1024/1024/1024 > 1) {//文件大小超过1G
                        fileTemp.Size = vofill.changeDecimal(2, file.size/1024/1024/1024) + "G";
                    } else if(file.size/1024/1024 > 1) {//文件大小超过1M
                        fileTemp.Size = vofill.changeDecimal(1, file.size/1024/1024) + "M";
                    } else if(file.size/1024 > 1) {//文件大小超过1KB
                        fileTemp.Size = vofill.changeDecimal(0, file.size/1024) + "KB";
                    } else {//文件大小不足1KB
                        fileTemp.Size = file.size + "B";
                    }
                    if(window.FileReader) {
                        var fr = new FileReader();
                        fr.readAsDataURL(file);
                        //fr.onprogress = function(ee) {
                            console.log("111111111")
                            //alert("fucjk===" + ee.loaded)
                            //fileTemp.Progress = (vofill.changeDecimal(0, ee.loaded/ee.total)) * 100
                            //console.log(ee.lengthComputable)
                            //console.log(ee.total)
                            //console.log("22222222", ee.loaded)
                            //console.log((ee.loaded/file.size)*100);
                        //};
                        fr.onload = function(ee) {
                            console.log("2222222222")
                            if(fileTemp.Type == 1) {
                                fileTemp.Url = ee.target.result;
                            }
                            obj.fileList.push(fileTemp);
                        }
                    }
                    //obj.fileList.push(fileTemp);
                }
                this.$emit("update:list",obj.fileList);
                // 文件信息获取后根据file.type判断类型，根据file.size限制判断大小,最后上传，建议上传单独一个写button
                //const formdata = new FormData();
                //formdata.append("file", file);
                // 调接口，data为formdata
            },
            //删除文件
            delFile(item) {
                let i_index = 0;
                this.fileList.forEach((o, i)=> {
                    if(o.Name==item.Name) {
                        i_index = i; 
                    }
                });
                this.fileList.splice(i_index, 1);
            },
            //图片查看事件
            previewImgClick(index) {
                this.previewImgFlag = true;
                this.autoplayImgFlag = true;
                this.currIndex = index;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .file-upload {
        width: 100%;
        color: var(--font-color);
    }

    .file-upload .fu-btn {
        width: 200px;
        height: 40px;
        position: relative;
    }
    
    .fu-btn input {
        top: 0;
        z-index: 1;
        padding: 0;
        opacity: 0;
        cursor: pointer;
        position: absolute;
    }

    .fu-btn .fub-style {
        top: 0;
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
        position: absolute;
        color: var(--white);
        background: var(--blue);
    }

    .file-upload .fu-list {
        width: 100p%;
        padding-top: 10px;
    }

    .fu-list .ful-item {
        width: 100%;
        height: 40px;
        text-align: left;
        line-height: 40px;
        position: relative;
    }

    .ful-item .fuli-down,
    .ful-item .fuli-del {
        top: 10px;
        right: 20px;
        cursor: pointer;
        font-size: 12px;
        line-height: 14px;
        padding: 3px 10px;
        border-radius: 2px;
        position: absolute;
        color: var(--white);
        background: var(--red);
    }

    .ful-item .fuli-down {
        right: 70px;
        background: var(--blue);
    }

    .fu-list .ful-item.ful-image {
        width: 100px;
        height: 100px;
        cursor: pointer;
        display: inline-block;
        margin: 0px 20px 20px 0;
    }

    .ful-item.ful-image img {
        width: 100%;
        height: 100%;
    }

    .ful-item.ful-image .fuli-del {
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        padding: 0px;
        border-radius: 50%;
        background: var(--red);
        transform: rotate(45deg);
    }

    .ful-item.ful-image .fuli-del:before,
    .ful-item.ful-image .fuli-del:after {
        top: 9px;
        left: 3px;
        width: 14px;
        height: 2px;
        content: "";
        position: absolute;
        background: var(--white);
    }

    .ful-item.ful-image .fuli-del:after {
        top: 3px;
        left: 9px;
        width: 2px;
        height: 14px;
    }
    
</style>