import { useState, useEffect } from 'react';
import { Get } from '../../../Services/publicApiService';
import MembersList from "./MembersList";
import './MembersAbout.css';

function MembersAbout() {

    const [firstMember, setFirstMember] = useState({});

    const getFirstMember = async () => {
        const response = await Get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_MEMBERS + '?limit=1');
        const member = await response.data.data[0];
        setFirstMember({...member});
    }
    
    useEffect(() => {
        getFirstMember();
    }, [])

    return ( 
        <div className="members">
            <div className="first-member">
                <div className="first-member__text-container">
                    <h3 className="first-member__name">{firstMember.name}</h3>
                    <div dangerouslySetInnerHTML={{__html: firstMember.description}} className="first-member__rol"></div>
                    <p className="first-member__description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <div className="first-member__btn-container">
                        <a href="/" role="button" className="first-member__button-cta">¡Quiero ser parte!</a>
                    </div>
                </div>
                <figure className="first-member__img-container">
                    <img className="first-member__img" alt="members of the ONG" src={firstMember.image}/>
                </figure>
            </div>

            <MembersList numberOfMembers={10}/>
        </div>
     );
}

export default MembersAbout;