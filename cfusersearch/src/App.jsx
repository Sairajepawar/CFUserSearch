import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";

function App() {
    const [handle, setHandle] = useState('sairaj.pawar21');
    const [body, setBody] = useState({});
    const [loading, setLoading] = useState(true);
    const getRatingClass = (rating) => {
        if (rating >= 2900) return 'rating-legendary-grandmaster';
        if (rating >= 2600) return 'rating-international-grandmaster';
        if (rating >= 2400) return 'rating-grandmaster';
        if (rating >= 2300) return 'rating-international-master';
        if (rating >= 2100) return 'rating-master';
        if (rating >= 1900) return 'rating-candidate-master';
        if (rating >= 1600) return 'rating-expert';
        if (rating >= 1400) return 'rating-specialist';
        if (rating >= 1200) return 'rating-pupil';
        return 'rating-newbie';
    }
    const loadData = async () => {
        setLoading(true);
        const url = `https://codeforces.com/api/user.info?handles=${handle}`;
        try {
            const response = await axios.get(url);
            console.log(response.data);
            setBody(response.data.result[0]);
        } catch (error) {
            alert('User not found');
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="searchBox">
                <input type="text" onChange={(e) => { setHandle(e.target.value) }} />
                <button onClick={loadData}>Search</button>
            </div>
            {loading ? (
                <h1>Loading .......</h1>
            ) : (
                <div className="container">
                    {body.titlePhoto && <img className="profile-image" src={body.titlePhoto} alt="Profile" />}
                    <div className="personal-info">
                        <h1 className="username">{body.firstName+" "+body.lastName}</h1>
                        {/*<p className="">{body.age}</p>*/}
                    </div>
                    <h1 className={`${getRatingClass(body.rating)} current-score`}>{body.rank.toUpperCase()+" "+body.rating}</h1>
                    <div className="stats">
                        <div className="stats_info">
                            <h2 className={ `${getRatingClass(body.maxRating)} max-rating`}>{body.maxRating}</h2>
                            <h4 className="stats-attribute">Max Rating</h4>
                        </div>
                        <div className="stats_info">
                            <h2 className={ `${getRatingClass(body.maxRating)} max-title`}>{body.maxRank.toUpperCase()}</h2>
                            <h4 className="stats-attribute">Max Title</h4>
                        </div>
                        <div className="stats_info">
                            <h2 className="contribution">{body.contribution}</h2>
                            <h4 className="stats-attribute">Contribution</h4>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
