import {useEffect, useRef, useState} from "react";
import './App.css';
import axios from "axios";

function App() {
    const [handle, setHandle] = useState('');
    const [body, setBody] = useState(null);
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
        if (!handle) return;
        setLoading(true);
        setTimeout(async () => {
            const url = `https://codeforces.com/api/user.info?handles=${handle}`;
            try {
                const response = await axios.get(url);
                setBody(response.data.result[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
                setBody(null);
            } finally {
                setLoading(false);
            }
        }, 3000); // 3 seconds delay
    }

    useEffect(() => {
        alert("As codeforces api has a limit, due to which only request can be made in 2 seconds, so please wait for some time after a request")
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
                body ? (
                    <div className="container">
                        {body.titlePhoto && <img className="profile-image" src={body.titlePhoto} alt="Profile" />}
                        <div className="personal-info">
                            <h1 className="username">{body.firstName + " " + body.lastName}</h1>
                        </div>
                        <h1 className={`${getRatingClass(body.rating)} current-score`}>{body.rank.toUpperCase() + " " + body.rating}</h1>
                        <div className="stats">
                            <div className="stats_info">
                                <h2 className={`${getRatingClass(body.maxRating)} max-rating`}>{body.maxRating}</h2>
                                <h4 className="stats-attribute">Max Rating</h4>
                            </div>
                            <div className="stats_info">
                                <h2 className={`${getRatingClass(body.maxRating)} max-title`}>{body.maxRank.toUpperCase()}</h2>
                                <h4 className="stats-attribute">Max Title</h4>
                            </div>
                            <div className="stats_info">
                                <h2 className="contribution">{body.contribution}</h2>
                                <h4 className="stats-attribute">Contribution</h4>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>Not Found</h1>
                )
            )}
        </>
    );
}

export default App;
