/**
 * Created by anmol on 3/8/17.
 */

const express=require('express');
const request=require('request');
const cheerio=require('cheerio');
const osmosis=require('osmosis');
const app=express();

let Url="https://www.google.co.in/search?q=";
let Url1="&start=";

let q="abcd";

app.get('/',function (req,res) {

   res.send("Hello")

});


app.get('/h',(req,res)=>{

    let start1=0;
    let start=0;

    dataa(start1);

    let done=false;
    let Str=req.query.q;

    console.log(Str);

    function dataa(start1) {

        if (start==5){

            return data2();

        }


        osmosis.get(Url + q + Url1 + start1)
            .find('#rso')
            .set({'PageSearch': ['._NId .srg .g cite']})
            .data(function (data) {

                console.log(data);

                for (i in data.PageSearch) {

                    console.log(data.PageSearch[i]);

                    if (data.PageSearch[i] == Str) {

                        done = true;

                    }

                    else if (data.PageSearch.length-1 == i && done == false) {

                        start=(+start+1);
                        console.log("Start  : "+start);
                        start1=start+"0";

                        return dataa(start1);

                    }

                    if (done == true) {

                        return data1(start);

                    }



                }


            });
    }



    function data1(start) {

        console.log(+start+1)

        res.send("Page No. "+ (+start+1))

    }


    function data2(){

        console.log("No result found");

    }


});




app.listen(1234,function () {

   console.log("Server Started");

});