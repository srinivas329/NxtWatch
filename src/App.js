import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import VideoPage from './components/VideoPage'
import SavedVideosPage from './components/SavedVideosPage'
import SavedVideosContext from './Context/videoContext'
import TrendingPage from './components/TrendingPage'
import GamingPage from './components/GamingPage'
import NotFound from './components/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
class App extends Component {
  state = {savedVideoList: []}

  addSavedVideo = video => {
    this.setState(prevState => ({
      savedVideoList: [...prevState.savedVideoList, video],
    }))
  }

  render() {
    const {savedVideoList} = this.state
    return (
      <>
        <SavedVideosContext.Provider
          value={{
            savedVideoList,
            addSavedVideo: this.addSavedVideo,
          }}
        >
          <Switch>
            <ProtectedRoute exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/videos/:id" component={VideoPage} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideosPage}
            />
            <ProtectedRoute exact path="/trending" component={TrendingPage} />
            <ProtectedRoute exact path="/gaming" component={GamingPage} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </SavedVideosContext.Provider>
      </>
    )
  }
}

export default App
