/**
 * @name vofill.js
 * @version 1.0.0
 * @author vofill
 * @description 前端开发通用、常用数据处理、页面处理类
 * @email 517202113@qq.com
 * 
 * 
 * 1.0.0 (2020/05/14)
 *   
 */

var vofill = {
    _console: {
        debug:true,
        start:"color:#fff;line-height:32px;padding:0 15px;border-radius:3px;font-size:16px;letter-spacing:5px;font-family:微软雅黑;font-weight:bold;background:linear-gradient(to right bottom, #8876f9, #7685f8)",
        log:"color:#00baff;font-size:14px;",
        warn:"color:#f0a92c;font-size:14px;",
        error:"color:#ff0000;font-weight:bold;font-size:16px;",        
    }, 
    path: {//网络请求路径
        api:"http://192.168.1.11:8081/twf/api/service",
        file:"http://192.168.1.11:8081/twfFile/",
        fileApi:"http://192.168.1.11:8081/twf/fileApi/file/common"
    },
    _body: document.querySelector("body"),
    Init() {
        document.onselectstart =function(){return false;}
        console.log("%c欢迎使用vofill_1.0.js由tianwf发布", this._console.start)
    },
    getBrowserInfo(domId) {
        let domObj = document.getElementById(domId);
        var width = domObj.clientWidth;
        var height = domObj.clientHeight;

        return {Width: width, Height: height};
    },
    //小数点保留位数
    changeDecimal(num, val) {
        let fVal = parseFloat(val), times = Math.pow(10, num);
        if(isNaN(fVal)) {
            return false;
        }
        fVal = Math.round(fVal * times) / times;

        return fVal;
    },
    //生成guid
    generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },
    //根据文件名称获取文件后缀
    getSuffixOfFile(name) {
        return name.substring(name.lastIndexOf(".") + 1, name.length);
    },
    //根据文件名称返回文件类型(1--图片；2--音频；3--视频；4--word；5--excel；6--ppt；7--pdf；8--txt；9--压缩文件；10--其他；)
    judgeFileType(name) {
        let suffix = this.getSuffixOfFile(name);
        suffix = suffix.toUpperCase();
        if(suffix == "JPG" || suffix == "JEPG" || suffix == "PNG" || suffix == "GIF" || suffix =="BMP") {
            return 1;
        } else if(suffix == "MP3" || suffix == "WAV" || suffix == "RA" || suffix == "RMA" || suffix == "WMA"
                    || suffix == "ASF" || suffix == "OGG" || suffix == "VQF" || suffix == "TVQ" || suffix == "MOD"
                    || suffix == "APE" || suffix == "AIFF" || suffix == "AU" || suffix == "MIDI") {
            return 2;
        } else if(suffix == "MP4" || suffix == "AVI" || suffix == "MOV" || suffix == "QT" || suffix == "ASF"
                    || suffix == "RM" || suffix == "NAVI" || suffix == "DIVX" || suffix == "MPEG" || suffix == "MPG"
                    || suffix == "DAT") {
            return 3;
        } else if(suffix == "DOC" || suffix == "DOCX") {
            return 4;
        } else if(suffix == "XLS" || suffix == "XLSX" || suffix == "CSV") {
            return 5;
        } else if(suffix == "PPT" || suffix == "PPTX") {
            return 6;
        } else if(suffix == "PDF") {
            return 7;
        } else if(suffix == "TXT") {
            return 8;
        } else if(suffix == "RAR" || suffix == "ZIP" || suffix == "GZ" || suffix == "ARJ" || suffix == "Z"
                    || suffix == "7Z") {
            return 9;
        } else {
            return 10;
        }
    },
    //去除数组中已存在的元素
    mergeArray(arr1, arr2){
        var _arr = new Array();
        for(var i = 0; i < arr1.length; i++){
            var flag = true;
            for(var j = 0;j < arr2.length; j++){
                if(arr1[i] == arr2[j]){
                    flag = false;
                    break;
                }
            }
            if(flag){
                _arr.push(arr1[i]);
            }
        }
        return _arr;
    },
    //数组转换为树状数据
    listToTree(list, id, pid, child) {
        let tree = [], hash = {}, len = list.length;    
        for(let i = 0; i < len; i++){    
            hash[list[i][id]] = list[i];    
        }    
        for(let j = 0; j < len; j++){    
            var aVal = list[j], hashVP = hash[aVal[pid]];    
            if(hashVP){    
                !hashVP[child] && (hashVP[child] = []);    
                hashVP[child].push(aVal);    
            }else{    
                tree.push(aVal);   
            }    
        }    
        return tree; 
    }
}

export default vofill;