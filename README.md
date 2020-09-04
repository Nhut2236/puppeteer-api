# Upload & Resize images

Nodejs upload and resize image with docker

## Installation

```bash
npm install
docker-compose build
docker-compose up
http://localhost:4000
Upload: POST: http://localhost:4000/upload
Resize: POST: http://localhost:4000/resize?name=acd&width=100
Capture: POST: http://localhost:4000/capture
    - body{
    "url":"https://google.com",
    "type":"pdf",
    "width":1336,
    "height":768,
    "deviceScaleFactor":4
}
```

## Usage

Cloudinary, Multer, Cors
