import Activity from './Activity'
import { useState, useEffect } from 'react'
import { Get } from '../../../Services/privateApiService';
import Alert from '../../Alerts/Alerts.js';
import Spinner from '../../Spinner/Spinner.js';

const Activities = () => {

    const [activities, setActivities] = useState([]);
    const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ACTIVITIES;
    const [loader, setLoader] = useState(true);

    const getActivities = async () => {
        setLoader(true);
        try {
            const res = await Get(endpoint);
            setActivities(res.data.data);
            setLoader(false);
        } catch (err) {
            Alert("Something went wrong. Please try again", "There was an error loading the Activities List", "error");
            setLoader(false);
        }
    }

    useEffect(() => {
        getActivities()
    },[setActivities])
    
  return (
    <div className="general-container-activities"><br /><br />
        {loader? <Spinner /> : (
            activities.map((activity) => {
                return (
                    <Activity 
                        id={activity.id} 
                        name={activity.name} 
                        image={activity.image} 
                        key={activity.id} 
                    />
                )
            }))
        }       
    </div>
  )
}
export default Activities;