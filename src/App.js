import React, { Fragment, useState } from 'react'
import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import AbouIconLink from './components/AbouIconLink'

//React Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//Context Api

import { FeedbackProvider } from './context/FeedbackContext';

function App() {

    const [feedback, setFeedback] = useState(FeedbackData)


    return (

        <FeedbackProvider>
            <Router>

                <Header />

                <div className='container'>
                    <Routes>
                        <Route exact path='/' element={

                            <Fragment>
                                <FeedbackForm />
                                <FeedbackStats feedback={feedback} />
                                <FeedbackList />
                            </Fragment>
                        }>

                        </Route>

                        <Route path='/about' element={<AboutPage />} />
                    </Routes>
                    <AbouIconLink />
                </div>


            </Router>
        </FeedbackProvider>

    )
}

export default App
