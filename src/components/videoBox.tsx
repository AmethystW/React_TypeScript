import React from 'react';
import Video from './video';

interface Istate{
    position:number
    width:number
    items:JSX.Element[]
    videonum:number
}


export default class VideoBox extends React.Component<any,Istate>{
    public constructor(props:any) {
      super(props);
      this.clickHandler = this.clickHandler.bind(this);
      this.clickLeft = this.clickLeft.bind(this);
      this.clickRight = this.clickRight.bind(this);
    }

    public state:Readonly<Istate>={
        position:0,
        width:document.body.clientWidth,
        items:[],
        videonum:0
    }
    
    public clickHandler(){
        var filelist=""         //获取uploads下文件列表
        var xhr = new XMLHttpRequest(); 
        xhr.open("get", "http://127.0.0.1:8080/uploads", false); 
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                filelist=xhr.responseText
                console.log(filelist);
            }
        };
        xhr.send();

        var num=filelist.split(".").length-1;   //判断传回的字符串中有多少个后缀，即有多少文件（后端文件存储名为顺序数字）
        console.log(num);

        var itemstemp=[]
        var autoplay:boolean
        for(var i=1;i<=num;i++){
            var id="videoplay"+i
            var src = "http://127.0.0.1:8080/uploads/"+i
            if(i===1){
                autoplay=true
            }
            else{
                autoplay=false
            }
            itemstemp.push(<Video key={i} id={id} autoplay={autoplay} src={src}/>)
        }
        this.setState({
            items:itemstemp,
            videonum:num
        })
        

    }

    public clickLeft(){
        var id=0
        var ulist = document.getElementById("videobox") as HTMLUListElement
        if(this.state.position!==0){
            var mov=this.state.position-this.state.width
            this.setState({
                position:mov
            })
            ulist.scrollTo(mov,0)
            for(var i=0;i<this.state.videonum;i++){
                if(mov===this.state.width*i){
                    id = i+1
                }
            }

            for(var j=1;j<this.state.videonum;j++){
                if(id!==0){
                    var videoid = "videoplay"+i
                    var video = document.getElementById(videoid) as HTMLVideoElement
                    console.log(id);
                    if(id===i){
                        video.play()
                    }
                    else{
                        video.pause()
                    }
                }
            }
        }
    }
    public clickRight(){
        var ulist = document.getElementById("videobox") as HTMLUListElement        
        if(this.state.position!==this.state.width*(this.state.videonum-1)){
            var id=0
            var mov=this.state.position+this.state.width
            this.setState({
                position:mov
            })
            ulist.scrollTo(mov,0)
            for(var i=0;i<this.state.videonum;i++){
                if(mov===this.state.width*i){
                    id = i+1
                }
            }
            for(var j=1;j<this.state.videonum;j++){
                if(id!==0){
                    var videoid = "videoplay"+i
                    var video = document.getElementById(videoid) as HTMLVideoElement
                    console.log(id);
                    if(id===i){
                        video.play()
                    }
                    else{
                        video.pause()
                    }
                }
            }
        }
    }

    public render() {
        return (
            <div>
                <div>
                    {/* 读取本地文件并播放 */}
                    {/* <p>请在下方选择本地视频：</p>
                    <input id="videofile" type="file" multiple/>
                    <input type="button" id="btplay" onClick={this.clickHandler} value="播放"/>     */}
                    <button onClick={this.clickHandler}>加载</button>
                </div>
                <div>
                    <ul id="videobox" style={{marginLeft:"0",overflowX:"hidden", listStyle:"none", width:"100%", whiteSpace:"nowrap", position:"absolute"}}>
                        {this.state.items}
                    </ul>
                    <div style={{position:"relative", width:"100%"}}>
                        <button onClick={this.clickLeft} style={{position:"absolute", left:"0px", top:"150px", width:"20px",height:"40px",borderStyle:"none"}}>◀</button>
                        <button onClick={this.clickRight} style={{position:"absolute", right:"0px", top:"150px", width:"20px",height:"40px",borderStyle:"none"}}>▶</button>
                    </div>
                </div>
            </div>
        );
        }
  }