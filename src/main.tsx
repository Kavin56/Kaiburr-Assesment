import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import 'antd/dist/reset.css'
import { TaskApp } from './ui/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#B86B00',
          colorBgLayout: '#FAEDCD',
          colorText: '#0f172a',
          borderRadius: 8
        },
        components: {
          Layout: {
            headerBg: '#7C3F00',
            headerColor: '#ffffff'
          },
          Button: {
            colorPrimary: '#B86B00',
            colorPrimaryHover: '#cf7c0a'
          },
          Table: {
            headerBg: '#FFF6E5'
          }
        }
      }}
    >
      <TaskApp />
    </ConfigProvider>
  </React.StrictMode>
)


