import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptPolicy } from '../actions/authActions';
import AddPostForm from './AddPostForm';
const Policy = () => {
    const dispatch = useDispatch();
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        // Check if the user has already accepted the policy
        if (user && user.policyAccepted) {
            setPolicyAccepted(true);
        }
    }, [user]);

    const handleAcceptPolicy = () => {
        dispatch(acceptPolicy());
        setPolicyAccepted(true);
    };

    return (
        <div>
            {!policyAccepted ? (
                <div>
                    <h2>Welcome to HogwartsEdx</h2>
                    <p>
                        Before you can submit a post, please read and accept our privacy policy.
                    </p>
                    <p>
                        This website collects user-submitted content, including code snippets, which are subject to our privacy policy. We use DOMPurify to filter out malicious content from user inputs to maintain a safe environment for all users.
                    </p>
                    <button onClick={handleAcceptPolicy}>Accept Policy</button>
                </div>
            ) : (
                <AddPostForm />
            )}
        </div>
    );
};

export default Policy;
