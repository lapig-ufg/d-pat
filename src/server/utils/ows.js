module.exports = class Ows {

    constructor(
        url = "https://ows.lapig.iesa.ufg.br/ows",
        request = "GetFeature",
        service = "wfs",
        version = "1.0.0",
        outPutFormat = "shape-zip") {
        this._url          = url;
        this._request      = request;
        this._service      = service;
        this._version      = version;
        this._outPutFormat = outPutFormat;
        this._typeName     = null;
        this._msFilter     = [];
        this._width        = 1;
        this._height       = 1;

    }

    getUrl() {
        return this._url;
    }

    setUrl(value) {
        this._url = value;
        return this;
    }

    getRequest() {
        return this._request;
    }

    setRequest(value) {
        this._request = value;
        return this;
    }

    getService() {
        return this._service;
    }

    setService(value) {
        this._service = value;
        return this;
    }

    getVersion() {
        return this._version;
    }

    setVersion(value) {
        this._version = value;
        return this;
    }

    getOutPutFormat() {
        return this._outPutFormat;
    }

    setOutPutFormat(value) {
        this._outPutFormat = value;
        return this;
    }

    getTypeName() {
        return this._typeName;
    }

    setTypeName(value) {
        this._typeName = value;
        return this;
    }

    getMsFilter() {
        return this._msFilter;
    }

    addFilter(attribute, value){
         this._msFilter.push({"_attr": attribute, "_value": value});
         return this;
    }

    getWidth() {
        return this._width;
    }

    setWidth(value) {
        this._width = value;
        return this;
    }

    getHeight() {
        return this._height;
    }

    setHeight(value) {
        this._height = value;
        return this;
    }

    get(){
        let url = "";

        if(this._typeName == undefined || this._typeName ==  null){
             new Error('The type name is required');
             return
        }

        url  = (this._url != null || this._url != undefined) ? this._url + "?" : "";
        url += (this._request != null || this._request != undefined) ? "REQUEST=" + this._request  : "";
        url += (this._service != null || this._service != undefined) ? "&SERVICE=" + this._service : "";
        url += (this._version != null || this._version != undefined) ? "&VERSION=" + this._version : "";
        url += (this._typeName != null || this._typeName != undefined) ? "&TYPENAME=" + this._typeName : "";
        url += (this._outPutFormat != null || this._outPutFormat != undefined) ? "&OUTPUTFORMAT=" + this._outPutFormat : "";

        if(this._msFilter.length > 0){

            url += "&MSFILTER=";

            let length = this._msFilter.length - 1;

            this._msFilter.forEach(function(item, index) {
                if(index < length){
                    url += item._attr+"="+item._value + "%20AND%20";
                }else{
                    url += item._attr+"="+item._value;
                }
            });
        }

        url += (this._width != null || this._width != undefined) ? "&WIDTH=" + this._width : "";
        url += (this._height != null || this._height != undefined) ? "&HEIGHT=" + this._height : "";

        return url;
    }

}