#!/bin/bash

# S3にアップロード
aws s3 sync ./ s3://hirokit-prod/siteStaticContents/ --delete

# CloudFrontのキャッシュを無効化
DISTRIBUTION_ID="E3JJQAFI7J0YYX"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" 