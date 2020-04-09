import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd';

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

    convertFileListToValue = () => {
      const fileList = this.state.fileList;
      return fileList.map((item,i) => {
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
        onChange(this.convertFileListToValue(changedValue));
      }
    };

    get uploadProps() {
       return {
        name: 'file',
        listType: this.props.listType,
        fileList: this.state.fileList,
        action: this.props.action,
        headers: {
          authorization: 'authorization-text',
        },
        onChange : (info) => {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
          }

          

          let newFileList = info.fileList
            .filter(item => {
              return item.status == "done" || item.status == "uploading"
            })
            .map(item => {
              if (item.response != undefined){
                let url = "";
                if (item.response.status == "success"){
                  url = item.response.url;
                }
                  let newItem = {
                    uid:item.uid,
                    name:item.name,
                    url:url,
                    status:'done'
                  }
                  return newItem;
              }else{
                return item;
              }
            })
          
            // 独立的文件
          if (this.props.single != undefined){
            let singleFileList = [];
            singleFileList = newFileList.filter(item => {
              return item.uid == info.file.uid
            })
            this.setState({fileList:singleFileList})
            this.triggerChange(singleFileList);
            return;
          }

          this.setState({fileList:newFileList})
          this.triggerChange(newFileList);
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