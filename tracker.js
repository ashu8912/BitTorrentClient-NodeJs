const dgram=require("dgram");
const Buffer =require("buffer").Buffer;
const urlParse=require("url").parse;
const crypto=require("crypto");
module.exports.getPeers=(torrent,callback)=>{
   const socket=dgram.createSocket("udp4");
   const url=torrent.announce.toString("utf8");
   //send connect request
   udpSend(socket,buildConnReq(),url);
   socket.on("message",(response)=>{
       if(respType(response)=="connect")
       {
           //receive and parse connect response
           const connResp=parseConnResp(response);
          //send announce request
          const announceReq=buildAnnounceReq(connResp.connectionId);
       }else if(respType(response)=="announce")
       {
           //parse announce response
           const announceResp=parseAnnounceResp(response);
           //parse peers to callback
           callback(announceResp.peers);
       }
   }) 
}
function udpSend(socket,message,rawUrl,callback=()=>{})
{
    const url=urlParse(rawUrl);
    socket.send(message,0,message.length,url.port,url.host,callback);

}
function respType(response){

}
function buildConnReq(){
const buf=Buffer.alloc(16);
//connection Id
buf.writeUInt32BE(0x417,0);
buf.writeUInt32BE(0x27101980,4);
//action
buf.writeUInt32BE(0,8);
//transaction_id
crypto.randomBytes(4).copy(buf,12);
return buf;
}
function parseConnResp(){

}
function buildAnnounceReq(connId)
{

}
function parseAnnounceResp(resp)
{

}