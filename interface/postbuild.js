let fse=require("fs-extra")

let srcFolder="build"
let destiFolder="../service/src/main/resources/static"

fse.copy(srcFolder,destiFolder,err=>{
    if(err){
        console.error(err)
    }
    console.log(srcFolder+"contents are copied to "+destiFolder)
})