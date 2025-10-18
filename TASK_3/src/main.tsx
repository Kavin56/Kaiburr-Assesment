import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import 'antd/dist/reset.css'
import { TaskApp } from './ui/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{ algorithm: theme.defaultAlgorithm }}
    >
      <TaskApp />
    </ConfigProvider>
  </React.StrictMode>
)


