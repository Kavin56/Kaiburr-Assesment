import React, { useEffect, useMemo, useState } from 'react'
import { Layout, Typography, Space, Input, Button, Table, Modal, Form, message, Tag, App, Card, theme } from 'antd'
import axios from 'axios'

// Error Boundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Something went wrong.</h2>
        <p>Please refresh the page to try again.</p>
      </div>
    }

    return this.props.children
  }
}

type TaskExecution = {
  startTime: string
  endTime: string
  output: string
}

type Task = {
  id?: string
  name: string
  owner: string
  command: string
  taskExecutions?: TaskExecution[]
}

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

export function TaskApp() {
  const { token } = theme.useToken()
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm<Task>()
  const [messageApi, contextHolder] = message.useMessage()

  async function loadAll() {
    setLoading(true)
    try {
      const { data } = await axios.get<Task[]>('/tasks')
      setTasks(data)
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || e?.response?.data || e?.message || 'Failed to load tasks'
      messageApi.error(typeof errorMessage === 'string' ? errorMessage : 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  async function search() {
    if (!q) return loadAll()
    setLoading(true)
    try {
      const { data } = await axios.get<Task[]>(`/tasks?name=${encodeURIComponent(q)}`)
      setTasks(data)
    } catch (e: any) {
      if (e?.response?.status === 404) {
        setTasks([])
      } else {
        messageApi.error('Search failed')
      }
    } finally { setLoading(false) }
  }

  async function remove(id: string) {
    setLoading(true)
    try {
      await axios.delete(`/tasks?id=${encodeURIComponent(id)}`)
      await loadAll()
      messageApi.success('Deleted')
    } catch (e: any) { 
      console.error('Delete error:', e)
      const errorMessage = e?.response?.data?.message || e?.response?.data || e?.message || 'Delete failed'
      messageApi.error(typeof errorMessage === 'string' ? errorMessage : 'Delete failed') 
    } finally { setLoading(false) }
  }

  async function run(id: string) {
    setLoading(true)
    try {
      const { data } = await axios.put<Task>(`/tasks/${encodeURIComponent(id)}/execute`)
      setTasks(prev => prev.map(t => t.id === data.id ? data : t))
      
      // Show the complete task JSON with executions
      const latestExecution = data.taskExecutions?.[data.taskExecutions.length - 1]
      Modal.info({
        title: 'Command Execution Result',
        width: 760,
        content: (
          <div>
            <h4 style={{ marginBottom: 8 }}>Task JSON</h4>
            <pre style={{ 
              whiteSpace: 'pre-wrap',
              backgroundColor: '#f8fafc',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '12px',
              maxHeight: '360px',
              overflow: 'auto'
            }}>
              {JSON.stringify(data, null, 2)}
            </pre>
            {latestExecution && (
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ marginBottom: 8 }}>Latest Execution Output</h4>
                <pre style={{ 
                  whiteSpace: 'pre-wrap',
                  backgroundColor: '#eef4ff',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #dbeafe'
                }}>
                  {latestExecution.output}
                </pre>
              </div>
            )}
          </div>
        )
      })
    } catch (e: any) { 
      console.error('Run error:', e)
      const errorMessage = e?.response?.data?.message || e?.response?.data || e?.message || 'Run failed'
      messageApi.error(typeof errorMessage === 'string' ? errorMessage : 'Run failed') 
    } finally { setLoading(false) }
  }

  async function submit() {
    const value = await form.validateFields()
    setLoading(true)
    try {
      await axios.put('/tasks', value)
      setOpen(false)
      form.resetFields()
      await loadAll()
      messageApi.success('Saved')
    } catch (e: any) { 
      console.error('Save error:', e)
      const errorMessage = e?.response?.data?.message || e?.response?.data || e?.message || 'Save failed'
      messageApi.error(typeof errorMessage === 'string' ? errorMessage : 'Save failed') 
    } finally { setLoading(false) }
  }

  useEffect(() => { loadAll() }, [])

  const columns = useMemo(() => [
    { title: 'ID', dataIndex: 'id', width: 180, ellipsis: true },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Owner', dataIndex: 'owner' },
    { title: 'Command', dataIndex: 'command', ellipsis: true },
    {
      title: 'Recent Runs',
      dataIndex: 'taskExecutions',
      render: (execs: TaskExecution[] | undefined) => execs && execs.length > 0 ? (
        <Space size={4} wrap>
          {execs.slice(-3).reverse().map((e, i) => (
            <Tag key={i} color="geekblue">{new Date(e.startTime).toLocaleString()}</Tag>
          ))}
        </Space>
      ) : <Text type="secondary">—</Text>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, row: Task) => (
        <Space size={8}>
          <Button onClick={() => run(row.id!)} type="primary" size="small">Run</Button>
          <Button onClick={() => remove(row.id!)} danger ghost size="small">Delete</Button>
        </Space>
      )
    }
  ], [q])

  return (
    <ErrorBoundary>
      <App>
        {contextHolder}
        <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Title level={3} style={{ color: 'white', margin: 0 }}>Task Management System</Title>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <Input.Search placeholder="Search by name" value={q} onChange={e => setQ(e.target.value)} onSearch={search} allowClear style={{ maxWidth: 320 }} />
            <Button type="primary" onClick={() => setOpen(true)}>New Task</Button>
          </div>
        </Header>
        <Content style={{ padding: 24 }}>
          <Card bordered style={{ background: token.colorBgContainer }}>
            <Table
              rowKey="id"
              loading={loading}
              dataSource={tasks}
              columns={columns}
              pagination={{ pageSize: 8, showSizeChanger: false }}
            />
          </Card>
        </Content>

        <Modal title="New Task" open={open} onOk={submit} onCancel={() => setOpen(false)} okText="Save">
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input placeholder="Print Hello" />
            </Form.Item>
            <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
              <Input placeholder="John Smith" />
            </Form.Item>
            <Form.Item name="command" label="Command" rules={[{ required: true }]}>
              <Input placeholder="echo Hello World!" />
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    </App>
    </ErrorBoundary>
  )
}


