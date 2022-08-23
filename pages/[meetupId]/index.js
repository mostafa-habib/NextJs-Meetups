import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId} from 'mongodb';

function MeetupDetial(props) {
    return <MeetupDetails
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      desc={props.meetupData.desc}
    />
}
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://Mostafa_Habib:Mostafa_00000@cluster0.vbqxuvo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    
    const meetupsCollection = db.collection('meetupCollection');

    const result = await meetupsCollection.find({}, {_id : 1}).toArray();

    client.close();
  return {
    fallback: 'blocking',
    paths: result.map(meetup => ({params : {meetupId: meetup._id.toString()}}))
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect('mongodb+srv://Mostafa_Habib:Mostafa_00000@cluster0.vbqxuvo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    
    const meetupsCollection = db.collection('meetupCollection');

    const selectedMeetup = await meetupsCollection.findOne({_id : ObjectId(meetupId)});

    client.close();

  return {
      props: {
        meetupData: {
          id: selectedMeetup._id.toString(),
          title:selectedMeetup.title,
          image:selectedMeetup.image,
          address:selectedMeetup.address,
          desc:selectedMeetup.description
        }
      },
      revalidate: 10
  }
}
export default MeetupDetial;