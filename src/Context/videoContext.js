import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideoList: [],
  addSavedVideo: () => {},
})

export default SavedVideosContext
