# express-react-webpack-app-demo
A express-react-webpack app demo for dianjia admin


####Start App
```
  npm install
  npm run build
  npm start
```


####Dev Mode
```
  npm run dev // full stack live reload
```


####(:3 っ)3≡･◦∴* ◦º. *.•。[][▓▓]
```
- app
-- bin //启动项
-- lib //express和webpack的依赖项
---- public //静态资源
------ javascripts //js资源
-------- client //客户端用
-------- lib //js依赖
------ images //图片资源
------ stylesheets //样式资源
---- routers //注册路由
------ index.js //分类注册
------ dashbroad.js
---- server //服务端用，存放打包后的资源名称
------ fileName.json //每次webpack打包后生成
---- source //react源代码，客户端与服务端公用
---- views //视图模板
```


####fileName.json
It's a json about js and css names which will create after webpack pack those resource.
```
{
  [name]: {
    "js": [.., .., ..,]
    "css": [.., .., ..]
  }
}
```
