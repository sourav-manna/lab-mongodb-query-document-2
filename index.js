var express=require('express');
var app=express()

const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient

app.use(express.json())

let dburl='mongodb+srv://iasourav:passadmin@cluster.lsepcqg.mongodb.net/?retryWrites=true&w=majority'

app.get('/', async function(req, res){

  res.send(`<h2>Progression 2 [Query]</h2>
  <ul>
  <li><a href="/q1">Query 1 </a></li><br>
  <li><a href="/q2">Query 2</a></li><br>
  <li><a href="/q3">Query 3</a></li><br>
  <li><a href="/q4">Query 4</a></li><br>
  <li><a href="/q5">Query 5</a></li><br>
  <li><a href="/q6">Query 6</a></li><br>
  <li><a href="/q7">Query 7</a></li><br>
  <li><a href="/q8">Query 8</a></li><br>
  <li><a href="/q9">Query 9</a></li><br>
  <li><a href="/q10">Query 10</a></li><br>
  <li><a href="/q11">Query 11</a></li><br>
  <li><a href="/q12">Query 12</a></li>
  </ul>`)   

})




app.get('/q1', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query1= await db.collection('companies').find({name: 'Facebook'}).toArray();
     

       res.json({
          message:'Query 1',
          query1
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})



app.get('/q2', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query2=await db.collection('comapnies').find({category_code: 'web'},{name: 1, _id: 0});
    
        res.json({
            message:'Query 2',
            query2
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.get('/q3', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query3= await db.collection('companies').findOne({name:'Twitter'},{name:1,category_code:1,founded_year:1});
        res.json({
            message:'Query 3',
            name:query3.name,
            category_code:query3.category_code,
            founded_year:query3.founded_year
        })

      
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.get('/q4', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query4= await db.collection('companies').find({category_code:'web'}).limit(50).toArray()
        
        res.json({
            message:'Query 4',
            query4
        })
      
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.get('/q5', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query5= await db.collection('companies').find({category_code:"enterprise"},{name:1,category_code:1,founded_year:1}).toArray();
        let name=[]
        let category_code=[]
        let founded_year=[]

        for (let index = 0; index < query5.length; index++) {
             name[index]=query5[index].name
             category_code[index]=query5[index].category_code
             founded_year[index]=query5[index].founded_year
            
        }
     

       res.json({
          message:'Query 5',
          names:name,
          category_codes: category_code,
          founded_years:founded_year
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})
app.get('/q6', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query6= await db.collection('companies').find({$or: [{number_of_employees: 20}, {founded_year: 2000}]}).sort({number_of_employees: -1}).toArray();
     

       res.json({
          message:'Query 6',
          query6
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.get('/q7', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query7= await db.collection('companies').find({$nor: [{category_code: 'web'}, {category_code: 'social'}]},{name: 1, category_code: 1, _id: 0}).limit(20).toArray();
     
        let name=[]
        let category_code=[]

        for (let index = 0; index < query7.length; index++) {
             name[index]=query7[index].name
             category_code[index]=query7[index].category_code
            
        }

       res.json({
          message:'Query 7',
          names:name,
          category_codes:category_code
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})


app.get('/q8', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query8=await db.collection('comapnies').find({founded_month:{$not:{$eq:6}}},{name: 1, founded_month: 1, _id: 0}).skip(50).toArray();
        
        
        let name=[]
        let founded_month=[]

        for (let index = 0; index < query8.length; index++) {
             name[index]=query8[index].name
             founded_month[index]=query8[index].founded_month
            
        }


        res.json({
            message:'Query 8',
            names:name,
            founded_months:founded_month
            
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.get('/q9', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query9=await db.collection('comapnies').find({number_of_employees:50,category_code:{$ne:'web'}});
        


        res.json({
            message:'Query 9',
            query9
            
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.get('/q10', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query10=await db.collection('comapnies').find().sort({number_of_employees:-1}).limit(10).toArray();
        


        res.json({
            message:'Query 10',
            query10
            
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.get('/q11', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query11=await db.collection('comapnies').find({founded_day:1,$nor:[{number_of_employees:50},{category_code:"web"}]},{founded_day: 1, name: 1, _id: 0}).limit(5).toArray();
        let name=[]
        let founded_year=[]

        for (let index = 0; index < query11.length; index++) {
             name[index]=query11[index].name
             founded_year[index]=query11[index].founded_year
            
        }


        res.json({
            message:'Query 11',
            names:name,
            founded_years:founded_year
            
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.get('/q12', async function(req, res){

    let client=await mongoClient.connect(dburl)

    try {
        let db=await client.db('companiesDB');
        let query12=await db.collection('comapnies').find({"acquisition.acquired_month":1,"acquisition.acquired_year":2014},{acquisition: 1, name: 1, _id: 0}).toArray();
        
        let name=[]
        let acquisition=[]

        for (let index = 0; index < query12.length; index++) {
             name[index]=query12[index].name
             acquisition[index]=query12[index].acquisition
            
        }

        res.json({
            message:'Query 12',
            acquisitions:acquisition,
            names:name
            
        })
    } 
    
    catch (error) {
        console.log(error)
    }

    finally{
      client.close()
    }


})

app.listen(process.env.PORT,()=>console.log('Server running'))