export const domain=()=>{
    let urlPath=window.location.href
    console.log(urlPath)
    if(urlPath.includes("localhost:3000")){
        return "http://localhost:9000/"
    }
   return "/"
}