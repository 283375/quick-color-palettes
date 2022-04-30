# https://vitejs.dev/guide/static-deploy.html#github-pages

$ErrorActionPreference = "Stop"

npm run build-gh-pages

$commit=$(git rev-parse --short HEAD)
$date=$(Get-Date -Format 'yyyy-MM-dd HH:mm')

cd dist

# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m "gh-pages deploy commit $($commit) at $($date)"

git push -f git@github.com:283375/quick-color-palettes.git main:gh-pages

cd -