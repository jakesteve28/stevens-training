expo build:web --no-pwa
Remove-Item "../../server/stevens-training/static/*" -Recurse
Copy-Item "./web-build/*" "../../server/stevens-training/static/" -Recurse