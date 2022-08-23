import { MongoClient} from 'mongodb';

 async function handler(req, res) { 
    if(req.method === 'POST') {
        const data = req.body;


        const client = await MongoClient.connect('mongodb+srv://Mostafa_Habib:Mostafa_00000@cluster0.vbqxuvo.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        
        const meetupsCollection = db.collection('meetupCollection');

        const result = await meetupsCollection.insertOne(data);

        client.close();

        res.status(201).json({message: "Data Inserted sucessfully"});

    }

}

export default handler;