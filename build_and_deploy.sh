#!/bin/sh
npm run build

# 获取当前时间，格式为 yyyyMMdd_HH:mm:ss
version=$(date "+%Y%m%d%H%M%S")
echo "The version is $version"

# 构建镜像
docker build . -t registry.ap-southeast-1.aliyuncs.com/pdfgpt/seals-admin:$version
docker push registry.ap-southeast-1.aliyuncs.com/pdfgpt/seals-admin:$version

# 部署到k8s
ssh ali "kubectl set image deployment/seals-admin seals-admin=registry.ap-southeast-1.aliyuncs.com/pdfgpt/seals-admin:$version"
