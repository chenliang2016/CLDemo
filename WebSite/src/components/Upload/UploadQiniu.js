import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd';
import * as qiniu from 'qiniu-js'
import request from '../../utils/request'

export default class UploadFile extends Component {

  static getDerivedStateFromProps(nextProps){
    // Should be a controlled component.
    if ('value' in nextProps) {
      let newFileList = nextProps.value.map((item,i) => {
        return {
          uid:-i,
          name:item.name,
          status: 'done',
          url: item.url,
        }
      })
      return {
        ...(nextProps.value || {}),
        fileList:newFileList,
      };
    }
    return null;
  }

    constructor(props) {
      super(props);

      const value = props.value || {};
      this.state = {
        fileList:this.convertValueToFileList(value),
      };
    }

    convertValueToFileList = (value) => {
      return value.map((item,i) => {
        return {
          uid:-i,
          name:item.name,
          status: 'done',
          url: item.url,
        }
      })
    }

    convertFileListToValue = (changedValue) => {
      return changedValue.map((item,i) => {
        return {
          name:item.name,
          url: item.url,
        }
      })
    }    

    triggerChange = changedValue => {
      // Should provide an event to pass value to Form.
      const { onChange } = this.props;
      if (onChange) {
        console.log(this.convertFileListToValue(changedValue));
        onChange(this.convertFileListToValue(changedValue));
      }
    };

    // 处理删除逻辑
    onChange = (info) => {
        let fileList = this.state.fileList;
        if (info.file.status === 'removed') {
          message.error(`${info.file.name} 删除成功`);
          fileList = fileList.filter(item => {
            return item.uid != info.file.uid
          })
          console.log(fileList)
          this.triggerChange(fileList);
        }
    }

    upload = (params) => {
      console.log(params);
      let config = {
        useCdnDomain: true,
        region: qiniu.region.z0
      };
      
      let key = this.props.key
      if (this.props.key == undefined){
        key = params.file.name
      }

      let putExtra = {
        fname: key,
        params: {},
        mimeType: null
      };

      const that = this;
      let newFileList = this.state.fileList;
      

      request({
          method:'post',
          url:this.props.tokenUrl,
        }).then(data => {
          var observable = qiniu.upload(params.file, key, data, putExtra, config)
          var observer = {
            next(res){
              console.log("qiniu-next")
              console.log(res)
            },
            error(err){
              console.log("qiniu-err")
              console.log(err)
              message.error(`${params.file.name} 上传失败`);
            }, 
            complete(res){
              console.log("qiniu-complete")
              message.success(`${params.file.name} 上传成功`);

              newFileList.push({
                uid:key,
                name:key,
                url:key,
                status:'done'
              })
              that.triggerChange(newFileList)
            }
          }
          var subscription = observable.subscribe(observer) // 上传开始
        })
    }

    get uploadProps() {
       return {
        name: 'file',
        listType: this.props.listType,
        fileList: this.state.fileList,
        customRequest:this.upload,
        onRemove: this.onRemove,
        onChange: this.onChange,
        headers: {
          authorization: 'authorization-text',
        },
      }
    }

      render() {
        return <Upload {...this.uploadProps}>
          <Button>
            <Icon type="upload" /> 上传文件
          </Button>
        </Upload>
      }

}