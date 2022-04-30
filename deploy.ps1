# https://vitejs.dev/guide/static-deploy.html#github-pages

$ErrorActionPreference = "Stop"

npm run build-gh-pages

$gitDescribe=$(git describe --tags --long --always)
$date=$(Get-Date -Format 'yyyy-MM-dd HH:mm')

cd dist

# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m "gh-pages deploy $($gitDescribe) at $($date)"

git push -f git@github.com:283375/quick-color-palettes.git main:gh-pages

cd -