const path = require('path');
const HTMLwebpackPugin =require('html-webpack-plugin')


module.export = {
     entry:'./src/index.js',
     output:{
        path:path.join(_dirname,'/dist'),
        filename :'bundle.js'
     },
     plugins:[
        new HTMLwebpackPugin({
            template:'./src/index.html'
        })
     ],
     module:{
        rues:[
            {
                test:/.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/prese-env','@babel/preset-react']
                    }
                }
            }
        ]
     }
}