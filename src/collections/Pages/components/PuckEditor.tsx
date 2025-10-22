'use client'

import { Puck } from '@measured/puck'
import { useField, useForm, useTheme } from '@payloadcms/ui'
import '@measured/puck/puck.css'
import { config } from '../editor/puck-config'
import './PuckEditor.scss'
import './dark-mode.css'

const initialData = {}

const PuckEditor = () => {
  const { value, setValue } = useField<any>({ path: 'page' })
  const { theme } = useTheme()
  const { value: title, setValue: setTitle } = useField<any>({
    path: 'title',
  })
  const { value: handle, setValue: setHandle } = useField<any>({
    path: 'handle',
  })
  const { submit } = useForm()
  const save = () => {
    submit()
  }
  const onChange = (data: any) => {
    setValue(data)
    if (data.root?.props?.title !== title) {
      setTitle(data.root?.props?.title)
    }
    if (data.root?.props?.handle !== handle) {
      setHandle(data.root?.props?.handle)
    }
  }
  return (
    <div
      className={`twp h-screen w-full overflow-auto ${theme === 'dark' ? 'dark' : ''}`}
      data-theme={theme}
    >
      <Puck
        config={config}
        data={value || initialData}
        onPublish={save}
        onChange={onChange}
        overrides={{
          headerActions: () => <></>,
        }}
      />
    </div>
  )
}

export default PuckEditor
