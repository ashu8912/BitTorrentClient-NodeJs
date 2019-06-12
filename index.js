const fs=require("fs");
const bencode=require("bencode");
const torrent=bencode.decode(fs.readFileSync("puppy.torrent"));

const tracker=require("./tracker");

tracker.getPeers(torrent,(peers)=>{
    console.log("peers are ",peers);
})