# 使用稳定版的 Nginx 镜像
FROM nginx:stable-alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 将构建好的静态文件复制到 Nginx 的服务目录
# 注意：这里假设您的构建输出目录是 'dist'，请根据您的实际情况进行调整
COPY dist/ .

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 设置启动命令
CMD ["nginx", "-g", "daemon off;"]
