package com.lmm.order.controller;

import com.lmm.common.api.BaseResponse;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.Region;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import lombok.Builder;
import lombok.Data;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/v2/base/upload")
public class UploadController {

    private static String QNAK = "t1wbKb47Zlgmen1uLZj7GaGAGaMFhkbRoXCjrDeF";
    private static String QNSK = "L6Ky9R5v2tbfvQMsK3_JGDNWEi91M1TzlPzEqqfq";
    private static String QN_BUCKET = "ybimage";
    private static String QN_URL = "https://ybimage.yishouyun.net/";

    private static Logger logger = LoggerFactory.getLogger(UploadController.class);
    /**
     * 单文件上传
     * @param file
     * @return
     */
   /* @RequestMapping(value = "/uploadCert", method = RequestMethod.POST)
    @ResponseBody
    public BaseResponse singleFileUpload(@RequestParam(value="file",required=false) MultipartFile file,
                                         HttpServletRequest request) {
        if (!file.isEmpty()) {
            //获取源文件名
            String orgName = file.getOriginalFilename();
            try {
                file.transferTo(new File("/mnt/cert/" + orgName));
                logger.info("orgName:"+orgName);
                logger.info("desk:"+"/mnt/cert/" + orgName);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
            logger.info("download address:" + request.getContextPath().toString()+"/"+"v2/base/upload/download/"+orgName);
            return new BaseResponse(request.getContextPath().toString()+"/"+"v2/base/upload/download/"+orgName);
        } else {
            return new BaseResponse("fail");
        }
    }*/

    @RequestMapping(value = "/uploadCert", method = RequestMethod.POST)
    @ResponseBody
    public BaseResponse uploadCertSingle(@RequestParam(value="file",required=false) MultipartFile file,
                                         HttpServletRequest request) {
        String absoluteRoute = "/mnt/cert/";
        //String absoluteRoute = "E:/";
        if (!file.isEmpty()) {
            //获取源文件名
            String orgName = file.getOriginalFilename();
            logger.info("orgName:"+orgName);
            //File dest = new File(new File(absoluteRoute).getAbsolutePath() +"/" + orgName);
            File dest = new File("/mnt/cert/" + orgName);
            logger.info("desk:"+dest);
            // 创建路径
            if(!dest.getParentFile().exists()){
                dest.getParentFile().mkdirs();
            }
            try {
                FileUtils.copyInputStreamToFile(file.getInputStream(), dest);
                logger.info("in FileUtils.copyInputStreamToFile");
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
            logger.info("download address:" + request.getContextPath().toString()+"/"+"v2/base/upload/download/"+orgName);
            //return new BaseResponse(request.getContextPath().toString()+"/"+"v2/base/upload/download/"+orgName);
            return new BaseResponse().builder().message("/mnt/cert/" + orgName).build();
        } else {
            return new BaseResponse().builder().message("fail").build();
        }
    }

    @RequestMapping(value = "/uploadToQiniu", method = RequestMethod.POST)
    @ResponseBody
    public UploadResponse uploadToQiniu(@RequestParam(value="file",required=false) MultipartFile file,
                                        HttpServletRequest request) {
        //构造一个带指定 Region 对象的配置类
        Configuration cfg = new Configuration(Region.region0());
        //...其他参数参考类注释
        UploadManager uploadManager = new UploadManager(cfg);
        //...生成上传凭证，然后准备上传
        String accessKey = QNAK;
        String secretKey = QNSK;
        String bucket = QN_BUCKET;
        //默认不指定key的情况下，以文件内容的hash值作为文件名
        String key = null;
        String mimeType = ".jpg";
        String contentType = file.getContentType();
        if (contentType.equals("image/png")){
            mimeType = ".png";
        }else if (contentType.equals("video/mp4")){
            mimeType = ".mp4";
        }
        key = new SimpleDateFormat("YYYYMMDDHHmmss").format(new Date()) + mimeType;
        Auth auth = Auth.create(accessKey, secretKey);
        String upToken = auth.uploadToken(bucket);
        try {
            InputStream inputStream = file.getInputStream();
            Response response = uploadManager.put(inputStream, key, upToken,null,null);
            //解析上传成功的结果
            //DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
//            System.out.println(putRet.key);
//            System.out.println(putRet.hash);
        } catch (QiniuException ex) {
            Response r = ex.response;
            System.err.println(r.toString());
            try {
                System.err.println(r.bodyString());
            } catch (QiniuException ex2) {
                //ignore
                return new UploadResponse("error","");
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return new UploadResponse("error","");
        } catch (IOException e) {
            e.printStackTrace();
            return new UploadResponse("error","");
        }
        return new UploadResponse("success",QN_URL + key);
    }

    @RequestMapping(value = "/qiniuToken", method = RequestMethod.POST)
    @ResponseBody
    public BaseResponse qiniuToken() {
        //构造一个带指定 Region 对象的配置类
        Configuration cfg = new Configuration(Region.region0());
        //...其他参数参考类注释
        UploadManager uploadManager = new UploadManager(cfg);
        //...生成上传凭证，然后准备上传
        String accessKey = QNAK;
        String secretKey = QNSK;
        String bucket = QN_BUCKET;
        Auth auth = Auth.create(accessKey, secretKey);
        String upToken = auth.uploadToken(bucket);
        return BaseResponse.builder().data(upToken).build();
    }

    //文件下载
    @RequestMapping(value = "/download/{fileName}", method = RequestMethod.GET)
    @ResponseBody
    public void downloadFile(@PathVariable(value = "fileName") String fileName, HttpServletResponse response) {
        String absoluteRoute = "/mnt/cert/";
        String fileFullPath = absoluteRoute + "/" +fileName;
        logger.info("fileFullPath:" + fileFullPath);
        OutputStream os = null;
        FileInputStream fis = null;
        try {
            os = response.getOutputStream();
            response.reset();
            response.setContentType("application/octet-stream; charset=utf-8");
            fis = new FileInputStream(fileFullPath);
            final int bufferLength = 16384;
            if (fis != null && fis.available() > -1) {
                byte[] buffer = new byte[bufferLength];
                int flag = -1;
                while ((flag = fis.read(buffer)) != -1) {
                    os.write(buffer, 0, flag);
                }
                os.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                    fis = null;
                }
                if (os != null) {
                    os.close();
                    os = null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


}

@Data
@Builder
class UploadResponse {
    private String status;
    private String url;
}
