const httpState = { }
httpState.hpptError= (res, e, descrip) => {
    console.log(e)
    res.status(500).json({state:false , message:descrip, info:e})
}
httpState.httpRespose= (res, resCallback,descrip) => {
    console.log(resCallback)
    res.status(200).json({state:true, info:resCalback, message:descrip})
}
module.exports.httpResult =  httpState 