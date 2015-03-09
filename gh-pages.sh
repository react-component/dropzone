npm run less
npm run example
cd ../dropzone-gh-pages
rm -rf build/
mkdir build
cp -r ../dropzone/build/ build
git add --all
git commit -am "update examples"
git push origin gh-pages:gh-pages