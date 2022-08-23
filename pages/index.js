import MeetupList from '../components/meetups/MeetupList';
import { MongoClient} from 'mongodb';


function MainPage(props) {
    
    return (
        <>
        <MeetupList meetups= {props.meetups} />
        </>
    )
}


export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://Mostafa_Habib:Mostafa_00000@cluster0.vbqxuvo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    
    const meetupsCollection = db.collection('meetupCollection');

    const result = await meetupsCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: result.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10
    }
}

export default MainPage;