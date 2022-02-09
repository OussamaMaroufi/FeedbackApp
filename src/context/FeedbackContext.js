
import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


const FeedbackContext = createContext();


export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    //Fetch Feedback

    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`);
        const data = await response.json();
        // console.log(data);
        setFeedback(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchFeedback();
    }, [])

    const deleteFeedback = async (id) => {
        if (window.confirm('Are You sure you want to delete ?')) {
            await fetch(`http://localhost:5000/feedback/${id}`, {
                method: 'DELETE'
            })
            setFeedback(feedback.filter((item) => item.id !== id))
        }

    }

    //Add Feedback 
    const addFeedback = async (newFeedback) => {
        const response = await fetch(`http://localhost:5000/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)

        })

        const data = await response.json();

        setFeedback([data, ...feedback])

    }


    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }


    //Function to update items 

    const updateFeedback = async (id, updItem) => {

        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json();



        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
        )

    }


    return <FeedbackContext.Provider
        value={{
            //Every thing we want to access it from context
            feedback,
            feedbackEdit,
            isLoading,
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback,
        }}>
        {children}
    </FeedbackContext.Provider>


}

export default FeedbackContext;