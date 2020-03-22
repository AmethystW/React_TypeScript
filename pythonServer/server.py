import os
from flask_cors import *
from flask import Flask, make_response,request,send_from_directory,jsonify
from werkzeug.utils import secure_filename # 获取上传文件的文件名

UPLOAD_FOLDER = r'.\uploads'   # 上传路径
ALLOWED_EXTENSIONS = set(['mp4'])   # 允许上传的文件类型
# 实例化app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 300* 1024 * 1024

def allowed_file(filename):   # 验证上传的文件名是否符合要求，文件名必须带点并且符合允许上传的文件类型要求，两者都满足则返回 true
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':   # 如果是 POST 请求方式
        list=request.files.getlist('file')
        global cnt
        for file in list:  #可存储多份文件
            if file and allowed_file(file.filename):
                # filename = secure_filename(file.filename)     #上传文件本身的文件名
                cnt = cnt+1
                filename = str(cnt)+".mp4"
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return 'upload successed!'    # 返回保存成功的信息
    # 使用 GET 方式请求页面时或是上传文件失败时返回上传文件的表单页面
    return '''
    <!doctype html>
    <title>Server</title>
    '''

@app.route('/uploads', methods=['GET'])
def get_filelist():
    directory = './uploads'
    for root, dirs, files in os.walk(directory):
        filelist = files
    try:
        return str(filelist)
    except Exception as e:
        return jsonify({"code": "异常", "message": "{}".format(e)})

@app.route('/uploads/<file_name>', methods=['GET'])
def get_file(file_name):
    directory = './uploads/'
    filename = file_name+'.mp4'
    try:
        response = make_response(
            send_from_directory(directory, filename, as_attachment=True))
        return response
    except Exception as e:
        return jsonify({"code": "异常", "message": "{}".format(e)})

if __name__ == '__main__':
    cnt = 0
    CORS(app, supports_credentials=True)
    app.run(port=8080)