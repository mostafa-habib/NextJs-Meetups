import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetup() {
    const router = useRouter();
    async function meetupHandler(enterdData) {

        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enterdData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        router.push('/');
        
    }

    return <NewMeetupForm onAddMeetup={meetupHandler}/>
}
export default NewMeetup;