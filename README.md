# Samasth's stuff

## Edit

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/editor/editor.html in Chrome or Edge, write, then click **Save posts.json**. The first time, save over `site/posts.json`.

Preview at http://localhost:8000/site/

## Publish

```bash
./deploy.sh
```

Set `BUCKET` in `deploy.sh` first.

## S3 setup (once)

```bash
aws s3 mb s3://BUCKET
aws s3api put-public-access-block --bucket BUCKET --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false
aws s3api put-bucket-policy --bucket BUCKET --policy '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::BUCKET/*"}]}'
aws s3 website s3://BUCKET --index-document index.html
```
