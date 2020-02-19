
export default {
// 时间格式转换
    timeFormatConversion:function(temp) {
        let date = new Date(temp);
        let segmentation = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return year + segmentation + month + segmentation + strDate;
    }
}
