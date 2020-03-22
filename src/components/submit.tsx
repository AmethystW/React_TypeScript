import React from 'react';

interface Istate{
    count:number
    fdir:string[]
}

interface Iprops{
    url:string
}

export default class Submit extends React.Component<Iprops,Istate>{
    public constructor(props:any) {
      super(props);
      this.clickHandler = this.clickHandler.bind(this);
    }
    
    public state:Readonly<Istate>={
        count:0,
        fdir:[]
    }

    public clickHandler(){
        // //fetch方法
        // var file =(document.getElementById("fileinput") as HTMLInputElement).files
        // var formData = new FormData(); //创建表单数据对象
        // if(file !== null && file.length !== 0){
        //     formData.append('file',file[0]); //将文件添加到表单对象中
        //     console.log(file[0]);
        // }
        
        // fetch(this.props.url,{       //传输
        //     method :"post",
        //     body: formData,
        //     headers:{
        //         "Content-Type": "multipart/form-data"
        //     }
        // }) 
        // .then((d:any)=>{
        //     // var percent = (d.loaded / d.total) * 100;
        //     // let progress = document.getElementById("progressBar") as HTMLProgressElement
        //     // console.log(percent);
        //     // progress.max = 100;
        //     // progress.value = percent;
        //     // progress.textContent = percent+'%';
        //     // console.log('result is',d);
        //     console.log("上传中");        
        // })
        
        var xhr = new XMLHttpRequest()
        var oloaded:any
        var ot:any

        var file = (document.getElementById("fileinput") as HTMLInputElement).files // js 获取文件对象
        var url = this.props.url  // 接收上传文件的服务器地址！！！

        var formData = new FormData(); // FormData 对象
        
        if(file !== null && file.length !== 0){
            for(var i=0;i<file.length;i++){
                console.log(file[i]);
                formData.append('file',file[i]); //将文件添加到表单对象中
            }
        }
        
        xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.onload = uploadComplete; //请求完成
        xhr.onerror =  uploadFailed; //请求失败

        xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
        xhr.upload.onloadstart = function(){//上传开始执行方法
            ot = new Date().getTime();   //设置上传开始时间
            oloaded = 0;//设置上传开始时，以上传的文件大小为0
        };

        xhr.send(formData);

        //上传成功响应
        function uploadComplete(evt:any) {
            alert("上传成功！");
        }
        //上传失败
        function uploadFailed(evt:any) {
            alert("上传失败！");
        }

        //上传进度实现方法，上传过程中会频繁调用该方法
        function progressFunction(evt:any) {
            var progressBar = document.getElementById("progressBar") as HTMLProgressElement;
            var percentageDiv = document.getElementById("percentage") as HTMLSpanElement;
            // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
            if (evt.lengthComputable) {//
                progressBar.max = evt.total;
                progressBar.value = evt.loaded;
                percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
            }
            var time = document.getElementById("time") as HTMLSpanElement;
            var nt = new Date().getTime();//获取当前时间
            var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
            ot = new Date().getTime(); //重新赋值时间，用于下次计算
            var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
            oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
            //上传速度计算
            var speed = perload/pertime;//单位b/s
            var bspeed = speed;
            var units = 'b/s';//单位名称
            if(speed/1024>1){
                speed = speed/1024;
                units = 'k/s';
            }
            if(speed/1024>1){
                speed = speed/1024;
                units = 'M/s';
            }
            speed = Number(speed.toFixed(1));
            //剩余时间
            var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
            time.innerHTML = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
            if(bspeed===0) time.innerHTML = '上传已取消';
        }
    }
    
    public render() {
      return (
        <div>
            <div>
                <input id="fileinput" name="file" type="file" multiple={true}/>
                <input type="submit" value="上传" onClick={this.clickHandler}/>
            </div>
            <div>
                <label >上传进度：</label>
                <progress id="progressBar" value="0" max="100" style={{width:300}}></progress>
                <span id="percentage"></span><span id="time"></span> 
            </div>
        </div>
      );
    }
  }