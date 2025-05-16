import { ButtonDefault, ButtonSuccess } from "@components/buttons"
import { Flex, Form, Modal, ModalProps } from "antd"
import { Store } from "antd/es/form/interface"
import { FormProps } from "react-router-dom"

export const FormModal = (props: FormProps & Omit<ModalProps, "onFinish"> & {
    initialValues?: Store,
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void,
    onFinish: (values: any) => void,
}) => {

    const { name, title, open, width, loading, initialValues, children, onClose, onFinish } = props

    return (
        <Modal
            title={<div className="fs-4 fw-lighter">{title}</div>}
            centered
            open={open}
            closable={false}
            onCancel={onClose}
            getContainer={false}
            width={width}
            footer={
                <Flex justify="space-between">
                    <ButtonDefault key="1" htmlType="button" onClick={onClose}>Cerrar</ButtonDefault>
                    <ButtonSuccess key="2" shape="round" type="primary" htmlType="submit" form={name} loading={loading}>Guardar</ButtonSuccess>
                </Flex>
            }
            styles={{
                header: {
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderBottom: '1px solid #dddddd',
                }
            }}>
            <Form
                name={name}
                layout="vertical"
                autoComplete="off"
                size="large"
                initialValues={initialValues}
                onFinish={onFinish}>
                {children}
            </Form>
        </Modal>
    )
}
