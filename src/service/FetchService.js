import { BASE_URL } from "../constants/FetchConstants";


const FetchService = {
    fetchNoAuth:(dto,url,method,action200,actionNot200)=>{
        fetch(BASE_URL+url,{
            method:method,
            headers:{
                "Content-type":"application/json",
                "Access-Control-Allow-Origin":"*",
                "mode":"cors"
            },
            body:dto
        }).then((res)=>{
            if(res.status === 200){
                res.body.getReader().read().then(result=>{            
                    const data = result.value;
                    const str = String.fromCharCode(...data)
                    const jsonObject = JSON.parse(str);
                    action200(jsonObject);
                }) 
            }
            else{
                res.body.getReader().read().then(result=>{            
                    const data = result.value;
                    const str = String.fromCharCode(...data)
                    actionNot200(str);
                })
            }
        });
    },
    fetch:(dto,url,method,token,action200,actionNot200)=>{
        fetch(BASE_URL+url,{
            method:method,
            headers:{
                "Content-type":"application/json",
                "Access-Control-Allow-Origin":"*",
                "mode":"cors",
                "Authorization":"Bearer " + token
            },
            body:dto
        }).then((res)=>{
            if(res.status === 200){
                res.body.getReader().read().then(result=>{
                    const data = result.value;
                    if(data === undefined){
                        return
                    }
                    const str = String.fromCharCode(...data)
                    const jsonObject = JSON.parse(str);
                    action200(jsonObject);
                }) 
            }
            else{
                res.body.getReader().read().then(result=>{            
                    const data = result.value;
                    const str = String.fromCharCode(...data)
                    actionNot200(str);
                })
            }
        });
    }
}

export default FetchService;