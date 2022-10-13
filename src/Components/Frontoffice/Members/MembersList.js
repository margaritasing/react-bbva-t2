import { useState, useEffect } from 'react';
import { Get } from '../../../Services/privateApiService';
import './MembersList.css';

function MembersList({ numberOfMembers = 5 }) {

    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        const response = await Get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_MEMBERS + `?skip=1&limit=${numberOfMembers}`);
        const membersList = await response.data.data;
        setMembers([...membersList]);
    }
    
    useEffect(() => {
        getMembers();
    }, [])

    return ( 
        <div className="members-list">
            {
                members.map(member => (
                    <div className="member" key={member.id}>
                        <img className="member__img" src={member.image} alt={`Foto de ${member.name}`} />
                        <div className="member__body">
                            <h4 className="member__name">{member.name}</h4>
                            <div className="member__description" dangerouslySetInnerHTML={{__html: member.description}}></div>
                        </div>
                    </div>
                ))
            }
        </div>
     );
}

export default MembersList;