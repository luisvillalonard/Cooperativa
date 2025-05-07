import { IconSearch } from "@hooks/useIconos"
import { ControlProps } from '@interfaces/global'
import type { InputProps } from 'antd'
import { Button, Input, Space, Tooltip } from "antd"
import { useEffect, useState } from "react"

export const Searcher = (props: Omit<InputProps, "onChange"> & Pick<ControlProps, "onChange">) => {

    const { onChange, style } = props
    const [query, setQuery] = useState('');  // The search query typed by user
    const [debouncedQuery, setDebouncedQuery] = useState(query);  // Debounced value

    useEffect(() => {
        // Set a timeout to update debounced value after 500ms
        const handler = setTimeout(() => { setDebouncedQuery(query) }, 400)

        // Cleanup the timeout if `query` changes before 500ms
        return () => { clearTimeout(handler) }
    }, [query]);

    // Whenever debouncedQuery changes, simulate an API call
    useEffect(() => { onChange?.(debouncedQuery) }, [debouncedQuery]);

    return (
        <Tooltip title="Escriba aqui para buscar, presione escape para limpiar la busqueda">
            <Space.Compact style={{ width: '100%' }}>
                <Input
                    {...props}
                    allowClear
                    placeholder={props.placeholder || "escriba aqui para buscar"}
                    value={query}
                    style={{ width: '100%', ...style }}
                    onClear={() => setQuery('')}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={(evt) => { if (evt.code.toLowerCase() === 'escape') setQuery('') }} />
                <Button
                    size={props.size}
                    style={{
                        borderStyle: style?.borderStyle,
                        borderWidth: style?.borderWidth,
                        borderColor: style?.borderColor,
                    }}
                    icon={<IconSearch />}
                    onClick={() => onChange?.(query)}>
                </Button>
            </Space.Compact>
        </Tooltip>
    )
}