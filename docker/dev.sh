docker build --no-cache -t omnistudy/app -f ./docker/Dockerfile.dev .

docker run \
    -dp 3000:3000 \
    --name app \
    -v $(pwd):/app \
    omnistudy/app